const db = require('../models/payfairModels');

const getCommonJobTitles = require('../helpers/getCommonJobTitles');
const upsertCompany = require('../helpers/upsertCompany');
const insertSalary = require('../helpers/insertSalary');

const fairpayController = {};

// GET /api/user: responds with all user data
fairpayController.getUser = (req, res, next) => {
  console.log('creating query');
  let queryString = `SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode
                    FROM public.users AS u
                    LEFT OUTER JOIN public.company AS c
                    ON u.company_id = c._id
                    LEFT OUTER JOIN public.salary AS s
                    ON u.salary = s._id
                    WHERE u.linkedin_user_id = $1;`;

  let params = [req.body.linkedin_user_id];
  
  db.query(queryString, params, (err, response) => {
    console.log('checking for error in query response');
    if (err) {
      console.log('Error in query for user: ', err);
    }
    console.log('in query handler');
    res.locals.userData = response.rows;
    console.log('Added new user:\n', res.locals.userData);
    next();
  });
};

// POST /api/company/jobTitles
fairpayController.getCommonJobTitles = async (req, res, next) => {
  res.locals.commonJobTitles = await getCommonJobTitles.get(req);
  next();
}

// POST /api/user
fairpayController.onboardUser = async (req, res, next) => {
  console.log('creating user, verifying if request is proper');
  //if (!req.body.linkedin_user_id || !req.body.name || !req.body.company_name || !req.body.job_title || !req.body.company_linkedin_id) {
  if (!req.body.linkedin_user_id) {
    res.status(418).json(`Invalid create user request: must include linkedin_user_id`);
  }

  let companyKey = await upsertCompany.upsert(req,res);

  let salaryKey = await insertSalary.insert(req, res, companyKey);
  
  // then insert user into user table, including name, company foreign key and salary foreign key
  let { linkedin_user_id, sexuality, age, gender, race, city, state } = req.body;
  queryString = `UPDATE users 
                SET company_id=$1, salary=$2, sexuality=$3,
                    age=$4, gender=$5, race=$6,
                    city=$7, state=$8
                WHERE linkedin_user_id=$9
                RETURNING *`;
  
  let params = [companyKey, salaryKey, sexuality, 
                age, gender, race,
                city, state, linkedin_user_id];

  db.query(queryString, params)
  .then(response => { 
    res.locals.userData = response.rows[0];
    next();
  })
  .catch(err => console.log('Error in query for creating new user entry:\n', err));
}

fairpayController.getCompanyData = (req, res, next) => {
  const { job_title, linkedin_id } = res.locals.currentUser;
  console.log(
    'inside getcompanydata, res.locals.currentUser is',
    res.locals.currentUser
  );
  const params = [job_title, linkedin_id];
  console.log('params is', params);
  let queryString = `select u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.job_title = $1 and c.linkedin_id = $2 and s.company_id = c._id inner join users u on s._id = u.salary`;
  db.query(queryString, params, (err, response) => {
    console.log('inside get company, rows is ', response.rows);
    if (err) {
      return next({
        log: `fairpayController.getCompanyData: ERROR: ${err}`,
        message: {
          err:
            'fairpayController.getCompanyData: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.companyData = response;
    return next();
  });
};

module.exports = fairpayController;
