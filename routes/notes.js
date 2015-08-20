var express = require('express');
var router = express.Router();

var notes = require('../models/notes');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notes', notes: notes });
});

module.exports = router;
// This does the same as the above, only notable difference is that you dont need
// module.exports because there's exports.index
// exports.index = function(req, res) {
// res.render('index', { title: 'Notes', notes: notes });
// };
