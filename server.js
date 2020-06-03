const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Request type: ${req.method}`)
  console.log(`URL: ${req.url}`)
  console.log(Date())
  next();
}
server.use(logger);

module.exports = server;
