const path = require('path');

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// structure you follow to run .env file -> zero dependecy file 
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });

const db = require('./models/payfairModels');

// serializeUser determines which data of the user object should be stored in the session. 
passport.serializeUser((user, done) => {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
 // passport.serializeUser() is setting id as cookie in user’s browser
 // The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
  done(null, user);
});

passport.deserializeUser((user, done) => {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  PS: For this project, the entire user was passed
  */
  done(null, user);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile']
}, function (accessToken, refreshToken, profile, done) {

  const getUserQuery = `
    SELECT * 
    FROM users u
    WHERE u.linkedin_user_id = $1
  `
  const addNewUserQuery = `
    INSERT INTO users(linkedin_user_id, name, email, image_url)
    VALUES($1, $2, $3, $4)
  `
  async function executeQuery() {
    const user = await db.query(getUserQuery, [profile.id]);
    if (user.rows.length === 0) {
       const addNewUser = await db.query(addNewUserQuery, [profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value])
       const newUser = await db.query(getUserQuery, [profile.id]);
      done(null, profile);
    } else {
      done(null, profile);
    }
  }
  executeQuery();
}));