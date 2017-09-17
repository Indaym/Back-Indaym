/**
 * Created by djavrell on 16/12/16.
 */

const express = require('express');
const config = require('../../config/config');

const newRouter = () => express.Router(config.routerConfig);

module.exports = {
  newRouter,
};
