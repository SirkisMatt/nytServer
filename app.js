const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expect = require('chai').expect;

const app = express();

app.use(morgan('common')); //Let's see what common format looks like
app.use(cors());

const books = require('./book-data.js');

app.get('/books', (req, res) => {
    const { search = "", sort } = req.query;
  
    if (sort) {
      if (!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
  
    let results = books
          .filter(book =>
              book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  });

  module.exports = app;