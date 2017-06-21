//FUNCIONALIDAD DE EXPRESS

'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const api = require('./routes');


//agg midleware-
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api',api);

module.exports = app

