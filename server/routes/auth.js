const express = require("express");
const router = express.Router();
const passport = require("passport");
const fairpayController = require("../controllers/fairpayControllers.js");

// auth with linkedin
router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: true }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin"),
  fairpayController.getUser,
  (req, res) => {
    const result = {
      linkedin_id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value,
      image_url: req.user.photos[0].value,
    };

    if (process.env.NODE_ENV === "development") {
      console.log("res.locals.userData", res.locals.userData);
      if (res.locals.userData[0].salary) {
        res.status(200).redirect("http://localhost:8080/home");
      }
      res.status(200).redirect("http://localhost:8080/getstarted");
    } else if (res.locals.userData[0].salary) {
      res.status(200).redirect("http://localhost:3000/home");
    }
    res.status(200).redirect("http://localhost:3000/getstarted");
  }
);

module.exports = router;
