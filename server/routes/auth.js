const express = require('express');
const router = express.Router();
const passport = require('passport');

// auth with linkedin 
router.get('/linkedin', passport.authenticate('linkedin', { state: true }), function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;