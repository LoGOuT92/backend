const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

require('./db/mongoose');

app.use(express.json());
app.use(cors())

app.use('/api',require('./routes/api'));

module.exports = app;