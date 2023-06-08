const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const server = express();

// morgan - used for logger
server.use(morgan('default'));
server.use(express.static('public'));

// middleware --> we uses these type of middleware to keep logs of users visiting our app
// server.use((req, res, next) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get('User-Agent')
//   );
//   next();
// });

server.use(express.json());

const auth = (req, res, next) => {
  // console.log(req.query);
  if (req.body.password === '123') {
    next();
  } else {
    res.sendStatus(401);
  }
};

// product/:id -- here :id is a variable in leyman terms -- It is termed as url parameter
server.get('/product/:id', (req, res) => {
  console.log(req.params);
  res.json({ type: 'GET' });
});

// API - EndPoint - Route
server.get('/', auth, (req, res) => {
  res.json({ type: 'GET' });
});
server.post('/', auth, (req, res) => {
  res.json({ type: 'POST' });
});
server.put('/', (req, res) => {
  res.json({ type: 'PUT' });
});
server.delete('/', (req, res) => {
  res.json({ type: 'DELETE' });
});
server.patch('/', (req, res) => {
  res.json({ type: 'PATCH' });
});

server.listen(8080, () => {
  console.log('server started');
});
