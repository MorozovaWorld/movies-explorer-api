require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const allRouter = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { options } = require('./middlewares/cors.js');
const { rateLimiter } = require('./middlewares/rateLimiter.js');

const app = express();

const { PORT = 3001, NODE_ENV, MONGO_URL } = process.env;
const mongoUrl = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb';

async function connect() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
connect();

app.use('*', cors(options));
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use('/', allRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
