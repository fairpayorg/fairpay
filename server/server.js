const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

if (process.env.NODE_ENV === 'production') {

    app.use('/build', express.static(path.resolve(__dirname, '../build')))
    
    app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));
}





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
    console.log(errObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log("Server started on port ", PORT));

module.exports = app