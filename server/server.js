const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const dotenv = require('dotenv');
dotenv.config();

const fairpayController = require('./controllers/fairpayControllers')

app.use(express.json());


if (process.env.NODE_ENV === 'production') {

    app.use('/build', express.static(path.resolve(__dirname, '../build')))
    
    app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

}

// Returns all user data
app.get('/api/user', fairpayController.getUser, (req, res) => {
    res.status(200).json(res.locals.userData);
});

// Updates user with his/her personal, salary, and company information
// If company does not exists in company table, it gets added
app.post('/api/onboardUser', fairpayController.onboardUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

// Returns a list of all job titles of users in the platform associated with
// a particular company. Used for display a list for the user to select his/her
// job title.
app.post('/api/company/jobTitles', fairpayController.getCommonJobTitles, (req, res) => {
  res.status(200).json(res.locals.commonJobTitles);
})

// app.put('/api/user', fairpayController.updateUser, (req, res) => {
//   res.status(200).json(res.locals.userData);
// });


// route error handler
app.use('*', (req, res) => res.sendStatus(404))

// global middleware error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {
            err: 'An error occurred'
        }
    };
    const errorObj = Object.assign({}, defaultErr)
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log("Server started on port ", PORT));

module.exports = app