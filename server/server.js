const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const dotenv = require('dotenv');
dotenv.config();

const fairpayController = require('./controllers/fairpayControllers');

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/', (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
  );
}

app.get('/api/test', fairpayController.getUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

app.post('/api/user', fairpayController.createUser, (req, res) => {
  //res.status(200).json(res.locals.userData);
});

app.use(
  '/api/company/:linkedin_user_id',
  fairpayController.getCurrentUser,
  fairpayController.getCompanyData,
  fairpayController.getRaceStats,
  fairpayController.getAgeStats,
  fairpayController.getGenderStats,
  (req, res) => {
    res.status(200).json({
      currentUser: res.locals.currentUser,
      companyData: res.locals.companyData.rows,
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
