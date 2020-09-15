const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const server = express();


const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');


const { restrict } = require('../auth/authenticate-middleware.js');
const cookieParser = require('cookie-parser');


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());


server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict(), jokesRouter);

module.exports = server;
