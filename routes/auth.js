
const express = require('express');

const router = express.Router();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser((user, done) => {
  console.log('---serializeUser---');
  // console.log(user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  console.log('---deserializeUser---');
  // console.log(obj);
  done(null, obj);
});


passport.use(new GitHubStrategy(
  {
    clientID: '517ea4027af95e1823b1',
    clientSecret: 'c0f478694307952421267a739e4d9dafa61a4521',
    callbackURL: 'http://localhost:3000/auth/github/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ githubId: profile.id }, (err, user) => cb(err, user));
    done(null, profile);
  }),
));
router.get('/logout', (req, res) => {
  console.log(req.session.user);
  req.session.destroy();
  console.log('ddddd', 'dfagq');
  res.redirect('/');
});

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = {
      id: req.user.id,
      // username: req.user._json.login,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider,
    };
    res.redirect('/');
  },
);
router.get('/', (req, res, next) => {
  res.send('auth');
});
module.exports = router;
