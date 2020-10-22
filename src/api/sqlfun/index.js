const {
  Parser
} = require('node-sql-parser');
const parser = new Parser()
const mysql = require('mysql');
const util = require('util');
const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const query = util.promisify(conn.query).bind(conn);
module.exports = {
  sqlcall: async (req, res) => {
    var rows;
    let passivepriority = 5;
    let activepriority = 3;
    const opt = {
      database: 'MySQL' // MySQL is the default database
    }
    var bodyjson = req.body;

    //  SELECT Teachers.id as teacher_id, Students.id as student_id FROM Teachers FULL OUTER JOIN Students ON Teachers.id = Students.teacher_id;
    try {
    var ast = parser.astify('SELECT Teachers.id as teacher_id, Students.student_id as student_id FROM Teachers JOIN Students ON Teachers.id = Students.teacher_id;', opt); // mysql sql grammer parsed by default
    }catch (e){
      return res.status(400).send(e);
    }

    let fromarr = ast[0].from;
    let joinarr = [];
    fromarr.forEach(element => {
      if (element.join !== undefined) {
        joinarr.push({
          "table": element.on.left.table,
          "column": element.on.left.column
        });
        joinarr.push({
          "table": element.on.right.table,
          "column": element.on.right.column
        });
      }
    });


    joinarr.forEach(element => {
      let table = element.table;
      let column = element.column;
      let temp1 = bodyjson[table];
      let temp2 = temp1[column];
      console.log(Number(passivepriority));

      if ((temp2.passive) >= (passivepriority)) {
        return res.status(400).send("JOIN NOT ALLOWED");
      }
    });
    let finalcol = [];
    const selectquery = ast[0].columns;
    selectquery.forEach(element => {
      let table = element.expr.table;
      let column = element.expr.column;
      let temp1 = bodyjson[table];
      let temp2 = temp1[column];

      if ((temp2.active) <= (activepriority)) {
        finalcol.push(element);
      }
    });
    ast[0].columns = finalcol;

    const sql = parser.sqlify(ast, opt);

    try {
      rows = await query(sql);
    } catch (e){
      return res.status(400).send(e);
    }
    finally {
      conn.end();
    }

    return res.status(200).send(rows);

  }
}