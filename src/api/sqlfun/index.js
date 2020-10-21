const { Parser } = require('node-sql-parser');

  module.exports = {
    sqlcall: async (req, res) => {
        const parser = new Parser();
        const ast = parser.astify('SELECT * FROM t'); // mysql sql grammer parsed by default
        console.log(ast);
        return res.status(200).send(ast);
    }
}