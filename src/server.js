const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.listen(3333, () => {
  console.log('Server Started at http://localhost:3333');
});