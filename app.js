const express = require('express');
const app = express();
const pdf = require('./controller/pdf')

app.get('/pdf', function (req, res) {
  pdf.create(req, res);
});

app.listen(3000, function () {
  console.log('Listening port 3000! :)');
});
