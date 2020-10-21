
const express = require('express');
const {
  sqlcall
} = require('./index');


module.exports = () => {
  const routes = express.Router();
  routes.get('/sql', (req, res) => {
    return sqlcall(req, res);
  });
//   routes.get('/apiSet', (req, res) => {
//     return apiSet(req, res);
//   });
//   routes.get('/apiUpdate', (req, res) => {
//     return apiUpdate(req, res);
//   });
//   routes.get('/apiView', (req, res) => {
//     return apiView(req, res);
//   });
  routes.get('/test', (req, res) => {
    return res.status(200).send("Working....");
  });
  return routes;
}