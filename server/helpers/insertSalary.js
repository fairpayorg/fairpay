const db = require('../models/payfairModels');

const insertSalary = {};

// Inserts company or updates company information
// Returns company _id
insertSalary.insert = (req, res, companyKey) => {
  let { company_name, job_title, employee_type, years_at_company, years_of_experience,
    base_salary, annual_bonus, stock_options,
    signing_bonus, full_time_status, active } = req.body;

  if (!company_name) {
    res.status(418).json("Error inserting salary, request must contain company_name");
  }
    
// if PUT request includes salary/employment info, inserts salary table entry
  if (employee_type || years_at_company || years_of_experience ||
    base_salary || annual_bonus || stock_options ||
    signing_bonus || full_time_status || active) {
    // insert new job_title into salary table
    queryString = `INSERT INTO salary (company_id, job_title, employee_type, 
                                      years_at_company, years_of_experience, base_salary,
                                      annual_bonus, stock_options, signing_bonus, 
                                      full_time_status, active)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                   RETURNING _id as key`;
    let params = [companyKey, job_title, employee_type, years_at_company, years_of_experience,
                  base_salary, annual_bonus, stock_options, signing_bonus, full_time_status,
                  active];
    
    return db.query(queryString, params)
    .then(response =>  response.rows[0].key)
    .catch ((err) => console.log('Error in query for creating new salary entry: ', err));
  }
}

module.exports = insertSalary;