require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');

console.log('env', process.env.DB_PASSWORD);

const server = express();

// morgan - used for logger
server.use(morgan('default'));
server.use(express.static(process.env.PUBLIC_DIR));
server.use(express.json());
server.use('/products', productRouter.router);
server.use('/users', usersRouter.router);

server.listen(process.env.PORT, () => {
  console.log('server started');
});
