  
const db = require('../models/payfairModels');

const upsertCompany = {};

// Inserts company or updates company information
// Returns company _id
upsertCompany.upsert = (req, res) => {
  let params = [req.body.company_name, 
                req.body.company_name, 
                req.body.company_city, 
                req.body.industry, 
                req.body.region, 
                req.body.company_zipcode];

  // upsert company into company table         
  let queryString =  `INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) 
                      VALUES($1, $2, $3, $4, $5, $6) 
                      ON CONFLICT (linkedin_id) 
                      DO UPDATE SET 
                        name=EXCLUDED.name
                      RETURNING _id as key`;

  return db.query(queryString, params)
  .then(response => response.rows[0].key)
  .catch(err => console.log('Error in query for upserting company: ', err));
};

  module.exports = upsertCompany;