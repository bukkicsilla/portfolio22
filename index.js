const path = require('path');

const express = require('express');

const portfolio = require('./routes/portfolio');
const db = require('./data/database')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(portfolio);
app.use(function (error, req, res, next) {
  // Default error handling function
  console.log(error);
  res.status(500).render('fivehundred');
});

db.connect().then(function(){
  app.listen(3000)
});
