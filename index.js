const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/check1', (req, res) => {
  res.send('check 1');
});

app.get('/check2', (req, res) => {
  res.send('check 2');
});

app.listen(4000);
