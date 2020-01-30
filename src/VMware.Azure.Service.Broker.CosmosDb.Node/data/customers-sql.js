var tedious = require('tedious');
var cfenv = require('cfenv');

var Connection = tedious.Connection;
var Request = tedious.Request;

var appEnv = cfenv.getAppEnv();
var creds = appEnv.getServiceCreds('ey-demo-sqldb');

// var config = {
//   server: creds.hostname,
//   options: {
//     database: creds.sqldbName,
//     encrypt: true,
//     rowCollectionOnRequestCompletion: true
//   },
//   authentication: {
//     type: "default",
//     options: {
//       userName: creds.username,
//       password: creds.password
//     }
//   },
// };

var create = function(callback) {
  var connection = new Connection(config);
  connection.on('connect', function(err) {
    if(err) {
      callback(err);
    }
    else {
      var request = new Request(
        `
        INSERT INTO Customers (Name, Email) VALUES ('John Doe', 'john.doe@ey.com')
        INSERT INTO Customers (Name, Email) VALUES ('Jane Doe', 'jane.doe@ey.com')
        `,
        function(err, rowCount) {
          callback(err, rowCount);
        }
      );

      connection.execSql(request);
    }
  });
};

var get = function(callback) {
  var connection = new Connection(config);
  connection.on('connect', function(err) {
    if(err) {
      callback(err);
    }
    else {
      var request = new Request(
        'SELECT * FROM Customers',
        function(err, rowCount, rows, a) {
          callback(err, rowCount, rows);
        }
      );

      connection.execSql(request);
    }
  });
};

module.exports = {
  create: create,
  get: get
}