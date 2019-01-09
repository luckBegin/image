var mysql      = require('mysql');
let mysqlConfig = {
    host     : '192.168.40.231',
    user     : 'hujin8',
    password : '123456',
    database : 'image_manage',
    multipleStatements: true
}
let mysqlFnc = function(con){
    var connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    con(connection)
};
module.exports = mysqlFnc;