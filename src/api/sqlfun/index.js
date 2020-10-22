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
        let passivepriority=5;
        let activepriority=3;
        const opt = {
          database: 'MySQL' // MySQL is the default database
        }
        var bodyjson=req.body;
        // console.log(bodyjson.users.mobile.active);
        // console.log(req.body);
          console.log("                   ");

      //  SELECT Teachers.id as teacher_id, Students.id as student_id FROM Teachers FULL OUTER JOIN Students ON Teachers.id = Students.teacher_id;
        const ast = parser.astify('SELECT Teachers.id as teacher_id, Students.id as student_id FROM Teachers FULL OUTER JOIN Students ON Teachers.id = Students.teacher_id;',opt); // mysql sql grammer parsed by default

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
          // console.log(element.table);
          let table=element.table;
          let column=element.column;
          let temp1=bodyjson[table];
          let temp2=temp1[column];
          console.log(Number(passivepriority));

          if((temp2.passive) >= (passivepriority)){
            return res.status(400).send("JOIN NOT ALLOWED");
          }
          // console.log(temp2);
          // console.log(bodyjson);
        });
        let finalcol=[];
        const selectquery= ast[0].columns;
        // console.log(selectquery);
        selectquery.forEach(element =>{
          // console.log(element);
          let table=element.expr.table;
          let column=element.expr.column;
          let temp1=bodyjson[table];
          let temp2=temp1[column];
          // console.log(temp2);
          if((temp2.active) <= (activepriority)){
            finalcol.push(element);
            // return res.status(400).send("dont include this");
          }
        });
        console.log(finalcol);
        console.log("             ");
        console.log(ast);
        ast[0].columns=finalcol;
        console.log("             ");
        console.log(ast);

        const sql = parser.sqlify(ast, opt);
        return res.status(200).send(sql);

    }
}