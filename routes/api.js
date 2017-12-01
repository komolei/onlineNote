const express = require('express');

const router = express.Router();

const Note = require('../model/note');

router.get('/', (req, res, next) => {
  res.send('api');
});

router.get('/notes', (req, res, next) => {
  if (!req.session.user) {
    Note.findAll({ raw: true }).then((r) => {
      res.json({ status: 0, notes: r });
    });
  } else {
    const id = req.session.user.id;
    console.log('notes username:', id, '\n');
    Note.findAll({ where: { uid: id } }).then((r) => {
      res.json({ status: 0, notes: r });
    });
  }
});
router.post('/notes/add', (req, res, next) => {
  if (!req.session.user) {
    return res.send({ status: 1, msg: 'please Login' });
  }
  const id = req.session.user.id;
  const note = req.body.note;
  Note.create({ uid: id, context: note }).then(() => {
    res.send({ status: 0 });
  }).catch(() => res.json({ status: 1, msg: 'dataBase create failed' }));
});
router.post('/notes/edit', (req, res, next) => {
  if (!req.session.user) {
    return res.send({ status: 1, msg: 'please Login' });
  }
  const id = req.session.user.id;
  console.log('req.session.user.id:', id, req.body);
  Note.update({ context: req.body.note }, { where: { id: req.body.id, uid: id } })
    .then(() => res.json({ status: 0 }))
    .catch(() => res.json({ status: 1, msg: 'dataBase update failed' }));
});
router.post('/notes/delete', (req, res, next) => {
  console.log('delete', req.body.id);
  if (!req.session.user) {
    return res.send({ status: 1, msg: 'please Login' });
  }
  const id = req.session.user.id;
  Note.destroy({ where: { id: req.body.id, uid: id } })
    .then(() => res.json({ status: 0 }))
    .catch(() => res.json({ status: 1, msg: 'dataBase delete failed' }));
});
module.exports = router;
