const { Parser } = require('node-sql-parser');
const parser = new Parser()
const mysql = require('mysql'); // or use import if you use TS
const util = require('util');
const conn = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "newpassword",
    database: "sys"
});

// node native promisify
const query = util.promisify(conn.query).bind(conn);
  module.exports = {
    sqlcall: async (req, res) => {
        var rows;
        let passivepriority=3;
        const opt = {
          database: 'MySQL' // MySQL is the default database
        }
        var bodyjson=req.body;
        console.log(bodyjson.users.mobile.active);
        // console.log(req.body);
          console.log("                   ");
        // const parser = new Parser();
      //  SELECT Teachers.id as teacher_id, Students.id as student_id FROM Teachers FULL OUTER JOIN Students ON Teachers.id = Students.teacher_id;
        const ast = parser.astify('SELECT Teachers.id as teacher_id, Students.id as student_id FROM Teachers FULL OUTER JOIN Students ON Teachers.id = Students.teacher_id;',opt); // mysql sql grammer parsed by default
        // const sql = parser.sqlify(ast, opt);
          //       try {
          //    rows= await query(sql);
          //   console.log(rows);
          // } finally {
          //   conn.end();
          // }
          // console.log((ast[0].from));
          let fromarr=ast[0].from;
          let joinarr=[];
          fromarr.forEach(element => {
            if(element.join!==undefined){
              // console.log(element.join);
              joinarr.push({"table": element.on.left.table,"column":element.on.left.column});
              joinarr.push({"table": element.on.right.table,"column":element.on.right.column});
            }
          });
        // console.log(joinarr);
        joinarr.forEach(element =>{
          console.log(element.table);
        });
        // console.log(ast);
        return res.status(200).send(ast);
    }
}