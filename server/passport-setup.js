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
  PS: For this project, the entire user was passed
  */
  done(null, user);
});

passport.deserializeUser((user, done) => {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});

/*
Linkedin Passport Strategy
You must create an app on linkedin to retrieve the client id and secret
For basic users, you only have access to r_emailadress and r_liteprofile
*/
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      /*
  Note: there is a column for access and refresh tokens in our postgres db but was not needed since
  a higher privelage is needed (see linkedin partner program) to query additional fields
  */
      const getUserQuery = `
        SELECT * 
        FROM users u
        WHERE u.linkedin_user_id = $1`;
        
      const addNewUserQuery = `
        INSERT INTO users(linkedin_user_id, name, email, image_url)
        VALUES($1, $2, $3, $4)`;

      // Check that the linkedin user already exists in the database
      const user = await db.query(getUserQuery, [profile.id]);
      // If the user does not exist, add their info to the database
      if (user.rows.length === 0) {
        await db.query(addNewUserQuery, [
          profile.id,
          profile.displayName,
          profile.emails[0]
            ? profile.emails.value
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          profile.photos[0].value,
        ]);
        await db.query(getUserQuery, [profile.id]);
        done(null, profile);
      } else {
        // User exists
        done(null, profile);
      }
    }
  )
);
