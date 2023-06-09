const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/product');
const usersRouter = require('./routes/users');

const server = express();

// morgan - used for logger
server.use(morgan('default'));
server.use(express.static('public'));
server.use(express.json());
server.use('/products', productRouter.router);
server.use('/users', usersRouter.router);

server.listen(8080, () => {
  console.log('server started');
});
