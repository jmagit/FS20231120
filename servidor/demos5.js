
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sakila'
});

connection.connect();
connection.query('SELECT * FROM `sakila`.`category`', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
});
/*
const { Connection, Request } = require('tedious')
function executeStatement() {
  const request = new Request(`SELECT ProductCategoryID, Name FROM SalesLT.ProductCategory WHERE ParentProductCategoryID IS NULL`, (err) => {
    if (err) { console.log(err); }
  });
  request.on('row', (columns) => { console.log(columns.map(col => (col.value ?? 'NULL')).join(' ')); });
  request.on('done', (rowCount, more) => { console.log(rowCount + ' rows returned'); });
  request.on("requestCompleted", (rowCount, more) => { connection.close(); });
  connection.execSql(request);
}
const connection = new Connection({
  server: 'localhost',
  authentication: { type: 'default', options: { userName: 'sa', password: 'P@$$w0rd' } },
  options: { encrypt: false, database: 'AdventureWorksLT2022' }
});
connection.on('connect', (err) => {
  console.log("Connected");
  executeStatement();    
});

connection.connect();
*/