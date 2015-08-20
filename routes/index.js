var express = require('express');
var router = express.Router();

/* GET home page. */
var notes = require('../models/notes');
exports.index = function(req, res) {
  res.render('index', { title: 'Notes', notes: notes });
};

module.exports = router;
