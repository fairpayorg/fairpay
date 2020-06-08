const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth with linkedin 
router.get('/linkedin', passport.authenticate('linkedin', { state: true }), function (req, res) {
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {
  console.log('ROUTER FIRED');

  console.log('REQ USER IS', req.user);
  const result = {
    linkedin_id: req.user.id,
    name: req.user.displayName,
    email: req.user.emails[0].value,
    image_url: req.user.emails[0].value
  }
  res.status(200).json(result);

  //console.log('USER IS', req.user)
  //res.sendStatus(200);
});

module.exports = router;