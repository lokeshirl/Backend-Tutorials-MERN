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
server.use(express.json());

// API - EndPoint - Route

// Products
// API ROOT, base URL, example - google.com/api/v2/...(API ROOT)

// Create - POST /products      C  R  U  D
server.post('/products', (req, res) => {
  products.push(req.body);
  res.status(201).json(req.body);
});

// Read - GET /products
server.get('/products', (req, res) => {
  res.json(products);
});

// Read - GET /products/:id
server.get('/products/:id', (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

// Update - PUT /products/:id
server.put('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
});

// Update - PATCH /products/:id
server.patch('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
});

// Delete - DELETE /products/:id
server.delete('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json(product);
});

server.listen(8080, () => {
  console.log('server started');
});
