const express = require("express");
const apiRoute = require("./api/apifun/route");
const sqlroute = require("./api/sqlfun/route");

module.exports = (app) => {
app.use("/apifun/", apiRoute());
app.use("/sqlfun/", sqlroute());
};