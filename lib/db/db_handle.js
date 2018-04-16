var fs = require('fs');
var mysql = require('mysql');

var config = JSON.parse(fs.readFileSync(__dirname + '/../../config.json'));

var db_handle = {};

db_handle.query = function (query, callback, failCallback) {
    var connection = mysql.createConnection(config.mysql);
    connection.connect();
    console.log('sql: ' + query);
    connection.query(query, function (error, results, fields) {
        if (error) {
			if (failCallback) {
				failCallback(error);
			}
            connection.end();
        }
        else {
			if (callback) {
				callback({
					results: results,
					fields: fields
				});
			}
            connection.end();
        }
    });
};

module.exports = db_handle;

// // test
// db_handle.query("select * from t_user", (result)=>{
//     console.log(JSON.stringify(result));
// }, (err)=>{
//     console.log("error:\r\n" + err);
// });



