const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController.js');
apiRouter.get('/', apiController.populateIndustrySalary, apiController.getIndustrySalary, (req, res) => {
    // send over data from usaJobsSalary db, which is polauted with data from usaJobs external API 
    res.status(200).json(res.locals.industrySalaries);
  } );

module.exports = apiRouter;