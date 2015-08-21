var express = require('express');
var router = express.Router();

var notes = require('../models/notes');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notes', notes: notes });
});

// This does the same as the above, only notable difference is that you dont need
// module.exports because there's exports.index
// exports.index = function(req, res) {
// res.render('index', { title: 'Notes', notes: notes });
// };

router.get('/noteadd', function(req, res, next) {
  res.render('noteedit', {
    title: "Add a Note",
    docreate: true,
    notekey: "",
    note: undefined
  });
});

router.post('/notesave', function(req, res, next) {
  if (req.body.docreate === "create") {
    notes.create(req.body.notekey,
                 req.body.title, req.body.body);
  } else {
    notes.update(req.body.notekey,
                 req.body.title, req.body.body);
  }
  res.redirect('/noteview?key='+req.body.notekey);
});

router.get('/noteview', function(req, res, next) {
  var note = undefined;
  if (req.query.key) {
    note = notes.read(req.query.key);
  }
  res.render('noteview', {
    title: note ? note.title : "",
    notekey: req.query.key,
    note: note
  });
});

router.get('/noteedit', function(req, res, next) {
  var note = undefined;
  if (req.query.key) {
    note = notes.read(req.query.key);
  }
  res.render('noteedit', {
    title: note ? ("Edit " + note.title) : "Add a Note",
    docreate: note ? false : true,
    notekey: req.query.key,
    note: note
  });
});

module.exports = router;
