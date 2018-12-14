const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const listsApiRouter = require('./controllers/lists');
const itemsApiRouter = require('./controllers/items');
const app = express();
const mongoose = require('mongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/lists',listsApiRouter);
app.use('/api/items',itemsApiRouter);

mongoose.connect('mongodb://localhost/itexico');

module.exports = app;