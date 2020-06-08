const path = require('path');

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });

const db = require('./models/payfairModels');

passport.serializeUser((user, done) => {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  console.log('SERIALIZER FIRED');
  console.log('USER IS', user);
  console.log('ID IS', user.id);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  
  /*
  console.log('HNNNNNNNG THE ID IS', id)
  const getUserQuery = `
    SELECT * 
    FROM users u
    WHERE u.linkedin_user_id = $1
  `
  db.query(getUserQuery, [id])
  .then((res) => done(null, res.rows[0]))
  */

  console.log('DESERIALIZER IS', id);
  done(null, id);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile']
}, function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  console.log('CB FIRED');

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
    console.log('THE USER QUERY RESULTS', user.rows)
    console.log('TRUTHY', user.rows.length === 0);
    if (user.rows.length === 0) {
      console.log('CREATING NEW USER');
      const addNewUser = await db.query(addNewUserQuery, [profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value])
      const newUser = await db.query(getUserQuery, [profile.id]);
      console.log('SENDING', newUser.rows[0])
      // done(null, newUser.rows[0]);
      done(null, profile);
    } else {
      console.log('USER EXISTS');
      console.log('SENDING', user.rows[0])
      // done(null, user.rows[0]);
      done(null, profile);
    }
  }
  executeQuery();
  //done(null, profile)
}));