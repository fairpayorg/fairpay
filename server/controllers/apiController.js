const request = require('request');  
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });

// get your own api keys from usaJobs site and add it to the .env file
const host = process.env.HOST;
const userAgent = process.env.USER_AGENT;
const authKey = process.env.AUTH_KEY;

const db = require('../models/payfairModels');
    
const apiController = {};

let item = '';
//currently unsused but allows you to compare user data to industry averages from usaJobs
// notice any specification have to be done directly throught the url 
// in order to sort by location you will need to add thsi to the url string and replace the database. 
// the location is currently set to Washington D.C. to have simple dummy data
// you will need to recieve location from front-end
apiController.populateIndustrySalary = (req, res, next) => {
    console.log('HOST', host, 'user Agent', userAgent, 'authKEY', authKey);
    // requesting data according to USAJobs site
    request({      
        // use url to search through stuff
        url: 'https://data.usajobs.gov/api/search?JobCategoryCode=2210&Keyword=Software Development&LocationName=Washington, DC',      
        method: 'GET',      
        headers: {          
            "Host": host,          
            "User-Agent": userAgent,          
            "Authorization-Key": authKey     
        }  
    }, function(error, response, body) {   
        if (error){
            return next({
                log: 'ERROR in apiController.industrySalaryAverage',
                message: {err: `ERROR, ${error}, in apiController.industrySalaryAverage`},
            })
        }   
        const data = JSON.parse(body);
        let salaryQuery = [];
        let renumeration = '';
        let minSalary = '';
        let maxSalary = '';
        let medianSalary = 0;
        // only taking the first 25. 
        // You can take more from the results
        // Check usaJobs docs but I believe they only serve up 29 or so unless you specify in the initial request,
        for (let i = 0; i < 25; i++){
            // create array with proper format for bulk psql statement.
            renumeration = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionRemuneration;
            minSalary = renumeration[0].MinimumRange;
            maxSalary = renumeration[0].MaximumRange;
            medianSalary = ((parseFloat(minSalary) + parseFloat(maxSalary))/2);
            salaryQuery.push(`(${minSalary}, ${maxSalary}, ${medianSalary})`);
        }
        // create string from array that is (bulk) insertable into db.query
        salaryQuery = salaryQuery.join();
        // ideally this should be changes to modify for sql injections
        // should also be an upsert statment
        // this is difficult to implement the way I have bulk inserted the values into on long string
        // so this would have to be refactored so that you can have 3 different values ($1, $2, $3)
        item = `INSERT INTO public.usaJobsSalary ("minSalary", "maxSalary", "salary")
         VALUES ${salaryQuery};`
        // bulk inserting values into public.usaJobsSalry
        db.query(item)
        .then(queryResult => {
            return next(); 
        })
        .catch(err => next({
            log: 'ERROR IN db.query in apiController.industrySalaryAverage',
            message: {err: `ERROR, ${err}, in query in apiController.industrySalaryAverage`}
        }))
    })
}

apiController.getIndustrySalary = (req, res, next) => {
    // delivering industry averages from usajobssalary db in populateIndustrySalary
    item = `SELECT * FROM usaJobsSalary;`
    //send over data from 
    db.query(item)
    .then(result => {
        res.locals.industrySalaries = result.rows;
        return next();
    })
    .catch(err => next({
        log: 'ERROR in apiController.getIndustrySalary',
        message: {err: `ERROR , ${err}, in apiController.getIndustrySalary`}
    }))
}


module.exports = apiController;