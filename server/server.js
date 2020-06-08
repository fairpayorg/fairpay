const path = require('path');
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');

const app = express();
const PORT = 3000;

// require routers
const authRouter = require('./routes/auth.js');

app.use(express.json());

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.resolve(__dirname, '../build')))  
    app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));
}

// route handlers
app.use('/auth', authRouter);

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