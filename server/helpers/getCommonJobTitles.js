const db = require('../models/payfairModels');

const getCommonJobTitles = {};

getCommonJobTitles.get = async (req) => {
  let company = req.body.company_name;

  let queryString = `SELECT  job_title, count(*) as total FROM salary 
                    LEFT OUTER JOIN company 
                    ON salary.company_id = company._id 
                    WHERE company.name=$1
                    group by job_title
                    `
  let params = [req.body.company_name];
  return db.query(queryString, params)
         .then(result => result.rows);
}

module.exports = getCommonJobTitles;
