var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASS,
  database: "playtime"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});
const query=`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), phone VARCHAR(255), mail VARCHAR(255));`
con.query(query,(err,result)=>{
  if (err) throw err;
  console.log("Crate DB:", result)
})
