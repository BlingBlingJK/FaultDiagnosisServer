const mysql = require("mysql");
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  port: "3306",
  database: "fdd",
});
query = (sql, params, cb) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("连接mysql失败");
      pool.releaseConnection();
    }
    conn.query(sql, params, (err, res, fiel) => {
      if (err) {
        conn.release(); //释放连接
        console.log("执行mysql失败");
        return;
      }
      cb(res, fiel);
      conn.release();
    });
  });
};

// let sql = "SELECT * FROM rank";
// let params = [];
// let list = [];
// query(sql, params, function (res) {
//   // console.log(res[0].category);
//   res.forEach((e) => {
//     console.log(typeof e.categor);
//     // console.log(JSON.parse(str));
//   });
// });
// // console.log(list);

// var connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "123456",
//   port: "3306",
//   database: "fdd",
// });
// connection.connect();
// var userGetSql = "SELECT * FROM rank";
// //查 query
// const res = "";
// connection.query(userGetSql, function (err, result) {
//   if (err) {
//     console.log("[SELECT ERROR] - ", err.message);
//     return;
//   }
//   console.log("---------------SELECT----------------");
//   console.log(result);
//   console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
// });
// console.log(res);
// connection.end();
