var cfenv = require('cfenv');
var docdb = require('documentdb');
var async = require('async');
var products = require('./products');

// const CosmosClient = require('@azure/cosmos').CosmosClient;

var appEnv = cfenv.getAppEnv();
var creds = appEnv.getServiceCreds('asb-cosmosdb');

var config = {
  host: creds.cosmosdb_host_endpoint,
  auth: {
    masterKey: creds.cosmosdb_master_key
  },
  database: {
    id: 'asb-cosmosdb',
    uri: ''
  },
  container: {
    id: 'products',
    uri: ''
  },
  partitionKey: {
    kind: "Hash", 
    paths: ["/name"]
  }
};

var client = new docdb.DocumentClient(config.host, config.auth);
client.createDatabase({ id: config.database.id }, null, (error, resource, responseHeaders) => {
  config.database.uri = docdb.UriFactory.createDatabaseUri(config.database.id);
  client.createCollection(config.database.uri, { id: config.container.id}, { offerThroughput: 400 }, (error, resource, responseHeaders) => {
    config.container.uri = docdb.UriFactory.createDocumentCollectionUri(config.database.id, config.container.id);
  });
});

createProducts = function(callback) {
  var documents = [];
  async.forEachOf(products, (product, key, next) => {
    client.createDocument(config.container.uri, product, (err, document) => {
      if(err) 
      {
        return next(err);
      }
      documents.push(document);
      next();
    });
  }, err => callback(err, documents));
};

var getProducts = function(callback) {
  var queryConfig = {
    query: "SELECT * FROM c",
    parameters: []
  };
  client.queryDocuments(config.container.uri, queryConfig, { enableCrossPartitionQuery: true }).toArray((err, results) => {
    callback(err, results);
  });
};

module.exports = {
  createProducts: createProducts,
  getProducts: getProducts
};