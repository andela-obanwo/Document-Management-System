const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
// const router = express.Router();

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));

// Mount routes
require('./routes/index')(app);

module.exports = app;
