const express = require('express');
const router = express.Router();
const passport = require('passport');
const fairpayController = require('../controllers/fairpayControllers.js');
const jwt = require('jsonwebtoken');

/*
The initial call to authenticate with linkedin
After completion (i.e. user validates credentials), the get route to /linkedin/callback (line 21) is invoked
*/
router.get(
  '/linkedin',
  passport.authenticate('linkedin', { state: true }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin'),
  fairpayController.getUser,
  (req, res) => {
    // Not being used ?
    // const result = {
    //   linkedin_id: req.user.id,
    //   name: req.user.displayName,
    //   email: req.user.emails[0].value,
    //   image_url: req.user.photos[0].value,
    // };

    const { linkedin_user_id, salary_id } = res.locals.userData;

    console.log('in the redirect call back');
    if (process.env.NODE_ENV === 'development') {
      // Create and send json web tokens before sending to the client
      let jwtToken;
      if (salary_id) {
        // Create JWT
        jwtToken = jwt.sign(linkedin_user_id, process.env.LINKEDIN_SECRET);
        res.cookie('jsonToken', jwtToken);
        res.cookie('userId', linkedin_user_id);
        return res.redirect('http://localhost:8080/home');
      }
      jwtToken = jwt.sign(linkedin_user_id, process.env.LINKEDIN_SECRET);
      res.cookie('jsonToken', jwtToken);
      res.cookie('userId', linkedin_user_id);
      return res.redirect('http://localhost:8080/getstarted');
    } else if (salary_id) {
      return res.redirect('http://localhost:3000/home');
    }
    return res.redirect('http://localhost:3000/getstarted');
  }
);

module.exports = router;
