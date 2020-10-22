const express = require('express');
const {
    login,mainlogin
  } = require('./index');
module.exports = () => {
    const routes = express.Router();
    routes.post('/login', (req, res) => {
      return login(req, res);
    });
    routes.post('/mainlogin', (req, res) => {
        return mainlogin(req, res);
      });
    routes.get('/test', (req, res) => {
      return res.status(200).send("Working....");
    });
    return routes;
  }