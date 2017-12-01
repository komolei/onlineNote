const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const loginData = {};
  console.log(req.session.user);
  if (req.session.user) {
    loginData.isLogin = true;
    loginData.user = {
      username: req.session.user.username,
      avatar: req.session.user.avatar,
    };
  } else {
    loginData.isLogin = false;
  }
  console.log('loginData', loginData);
  res.render('index', loginData);
});

module.exports = router;
