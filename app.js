const express = require('express');
const app = express();
const pdf = require('./controller/pdf')

app.get('/pdf', (req, res) => {
  pdf.create(req, res);
});

app.listen(3000, () => {
  console.log('Listening port 3000! :)');
});
