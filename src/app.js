const createError = require('http-errors');
const express = require('express');
import { mongoDbConnection } from './models/mongoConnect';


const indexRouter = require('./indexRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  return res.status(500).json({ error: err.message });
});

module.exports = app;
