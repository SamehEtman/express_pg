const express = require('express');
const userRouter = require('./routes/user');

const app = express();

module.exports = () => {
  app.use(express.json());
  app.use(userRouter);
  return app;
};
