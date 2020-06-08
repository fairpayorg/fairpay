const path = require('path');
const express = require('express');
const passport = require('passport');
const authRouter = require('./routes/auth.js');
const fairpayController = require('./controllers/fairpayControllers');
const cookieSession = require('cookie-session');
require('./passport-setup');

const app = express();
const PORT = 3000;

app.use(express.json());

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['wonderpus']
}));

// initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// route handlers
app.use('/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
  );
}

app.get('/api/test', fairpayController.getUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

// Returns all user data
app.get('/api/user', fairpayController.getUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

// Updates user with his/her personal, salary, and company information
// If company does not exists in company table, it gets added
app.post('/api/onboardUser', fairpayController.onboardUser, (req, res) => {
  //res.status(200).json(res.locals.userData);
  res.status(200).redirect("http://localhost:3000/home");
});

// Returns a list of all job titles of users in the platform associated with
// a particular company. Used for display a list for the user to select his/her
// job title.
app.post('/api/jobTitles', fairpayController.getCommonJobTitles, (req, res) => {
  res.status(200).json(res.locals.commonJobTitles);
})

// app.put('/api/user', fairpayController.updateUser, (req, res) => {
//   res.status(200).json(res.locals.userData);
// });

app.use(
  '/api/company/:linkedin_user_id',
  fairpayController.getCurrentUser,
  fairpayController.getCompanyData,
  fairpayController.getJobStats,
  fairpayController.getRaceStats,
  fairpayController.getAgeStats,
  fairpayController.getGenderStats,
  (req, res) => {
    res.status(200).json({
      currentUser: res.locals.currentUser,
      companyData: res.locals.companyData.rows,
      jobStats: res.locals.jobStats,
      raceStats: res.locals.raceStats,
      ageStats: res.locals.ageStats,
      genderStats: res.locals.genderStats,
    });
  }
);

// route error handler
app.use('*', (req, res) => res.sendStatus(404));

// global middleware error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {
      err: 'An error occurred',
    },
  };
  const errorObj = Object.assign({}, defaultErr);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log('Server started on port ', PORT));

module.exports = app;
