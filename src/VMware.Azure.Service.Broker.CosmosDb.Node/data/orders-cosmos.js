var cfenv = require('cfenv');
var docdb = require('documentdb');
var async = require('async');
var courses = require('./courses');

const CosmosClient = require('@azure/cosmos').CosmosClient;

var appEnv = cfenv.getAppEnv();
var creds = appEnv.getServiceCreds('ey-demo-cosmos');

var config = {
  host: 'https://ey-demo-cosmos.documents.azure.com:443/', // creds.cosmosdb_host_endpoint,
  auth: {
    masterKey: 'p67tYtKsHsxEnPent0h2RSGfMufDMqYdwvedrcASGt0Vs99mneiVudb2oFWGhy41niY8hlo8mb45KSZgg79IuA==' // creds.cosmosdb_master_key
  },
  database: {
    id: 'customers'
  },
  container: {
    id: 'courses'
  },
  partitionKey: {
    kind: "Hash", 
    paths: ["/Title"]
  }
};

var url = config.host; //'https://ey-demo-cosmos.documents.azure.com:443/'; // creds.cosmosdb_host_endpoint;
var key = config.auth.masterKey; // 'p67tYtKsHsxEnPent0h2RSGfMufDMqYdwvedrcASGt0Vs99mneiVudb2oFWGhy41niY8hlo8mb45KSZgg79IuA=='; // creds.cosmosdb_master_key;
//const client = new CosmosClient({ url, key });

// async function initialize() {
//   const database = await client.databases.create({ id: 'customers' });
// }

// initialize();

var client = new docdb.DocumentClient(config.host, config.auth);
client.createDatabase({ id: 'customers' }, null, (error, resource, responseHeaders) => {});

var databaseLink = docdb.UriFactory.createDatabaseUri('ey-demo-cosmos'); //.createDocumentCollectionUri('ey-demo-cosmos', 'courses');
var coursesLink = docdb.UriFactory.createDocumentCollectionUri('ey-demo-cosmos', 'courses');

console.log(coursesLink);
client.createCollection(databaseLink, { id: 'courses'}, { offerThroughput: 400 }, (error, resource, responseHeaders) => {
  console.log(error);
});

// async function createDatabase() {
//   var databaseId = config.database.id;
//   const { database } = await client.databases.create({ id: 'blah' }); //IfNotExists({ id: databaseId }, { consistencyLevel: 'strong' });
//   console.log(`Created database:\n${database.id}\n`);
// }

// createDatabase();

// async function createContainer() {
//   var containerId = config.container.id;
//   const partitionKey = config.partitionKey;
//   const { container } = await client
//   .database('ey-demo-cosmos')
//   .containers.createIfNotExists(
//     { id: containerId, partitionKey },
//     { offerThroughput: 400 }
//   )
// }

// createContainer();

createOrders = function(callback) {
  var documents = [];
  async.forEachOf(courses, (course, key, next) => {
    client.createDocument(coursesLink, course, (err, document) => {
      if(err) 
      {
        return next(err);
      }
      documents.push(document);
      next();
    });
  }, err => callback(err, documents));
  //client.createDocument(ordersLink, )
};

var getOrders = function(callback) {
  var queryConfig = {
    query: "SELECT * FROM c",
    parameters: []
  };
  client.queryDocuments(coursesLink, queryConfig, { enableCrossPartitionQuery: true }).toArray((err, results) => {
    console.log("ERR: " + JSON.stringify(err));
    callback(err, results);
  });
};

module.exports = {
  createOrders: createOrders,
  getOrders: getOrders
};