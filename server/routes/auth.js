const express = require('express');
const router = express.Router();
const passport = require('passport');
const fairpayController = require('../controllers/fairpayControllers.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
    const result = {
      linkedin_id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value,
      image_url: req.user.photos[0].value,
    };
    console.log('in the call back')
    if (process.env.NODE_ENV === 'development') {
      console.log('res.locals.userData', res.locals.userData);
      let jwtToken;
      if (res.locals.userData[0].salary_id) {
        console.log('existing user');
        jwtToken = jwt.sign(
          res.locals.userData[0].linkedin_user_id,
          process.env.LINKEDIN_SECRET
        );
        res.cookie('jsonToken', jwtToken);
        res.cookie('userId', res.locals.userData[0].linkedin_user_id);
        return res.redirect('http://localhost:8080/home');
      }
      console.log('user not found, will redirect to onboarding...');
       jwtToken = jwt.sign(
        res.locals.userData[0].linkedin_user_id,
        process.env.LINKEDIN_SECRET
      );
      res.cookie('jsonToken', jwtToken);
      res.cookie('userId', res.locals.userData[0].linkedin_user_id);
      console.log(
        'redirecting to get started, sending cookies for user id: ',
        res.locals.userData[0].linkedin_user_id
      );
      return res.redirect('http://localhost:8080/getstarted');
    } else if (res.locals.userData[0].salary_id) {
      return res.redirect('http://localhost:3000/home');
    }
    return res.redirect('http://localhost:3000/getstarted');
  }
);

module.exports = router;
