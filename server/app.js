// app.js using ES6 modules

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Helper to define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { corsOptions } from './config/corsOptions.config.js';

// Import the route modules
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import sessionRouter from './routes/session.routes.js'

const app = express();

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use __dirname for serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session',sessionRouter)

// Use 'export default' for the main application object
export default app;