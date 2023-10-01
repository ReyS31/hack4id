const express = require('express');

const app = express();

module.exports = async (container) => {
  app.set(express.json());

  return app;
};
