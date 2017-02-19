import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(logger('dev'));

// Mount routes
routes(app);

export default app;
