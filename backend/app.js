require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logCollector');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

app.use(cors);


app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
