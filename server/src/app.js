const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/resume', require('./routes/resume.routes'));
app.use('/api/interview', require('./routes/interview.routes'));

app.use(require('./middleware/errorHandler'));
module.exports = app;