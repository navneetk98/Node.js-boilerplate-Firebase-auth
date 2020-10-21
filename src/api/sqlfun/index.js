const { Parser } = require('node-sql-parser');
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
        try {
             rows= await query('select * from version');
            console.log(rows);
          } finally {
            conn.end();
          }
        const parser = new Parser();
        const ast = parser.astify('SELECT lime,tree FROM t'); // mysql sql grammer parsed by default
        // console.log(ast);
        return res.status(200).send(rows);
    }
}