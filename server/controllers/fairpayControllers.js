const db = require('../models/payfairModels');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const getCommonJobTitles = require('../helpers/getCommonJobTitles');
const upsertCompany = require('../helpers/upsertCompany');
const insertSalary = require('../helpers/insertSalary');
const getAllCompanyNames = require('../helpers/getAllCompanyNames');

const fairpayController = {};

// GET /api/user: responds with all user data
fairpayController.getUser = (req, res, next) => {
  let currentUserId;
  if (req.user.id) {
    // Coming from passport
    console.log('passport -> get user');
    currentUserId = req.user.id;
  } else {
    // Coming from /api/user ### where is this coming from???
    console.log('/api/user => passport');
    currentUserId = req.body.linkedin_user_id;
  }
  let queryString = `
    SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode
    FROM public.users AS u
    LEFT OUTER JOIN public.company AS c
    ON u.company_id = c._id
    LEFT OUTER JOIN public.salary AS s
    ON u.salary_id = s._id
    WHERE u.linkedin_user_id = $1;`;
  let params = [currentUserId];

  db.query(queryString, params, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getUser: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getUser: ERROR: Check server logs for details',
        },
      });
    }

    res.locals.userData = response.rows[0];

    return next();
  });
};

// POST /api/company/jobTitles
fairpayController.getCommonJobTitles = async (req, res, next) => {
  console.log('controller: get common job titles');
  res.locals.commonJobTitles = await getCommonJobTitles.get(req);
  return next();
};

// POST /api/user
fairpayController.onboardUser = async (req, res, next) => {
  console.log('controller: onboard user');
  //if (!req.body.linkedin_user_id || !req.body.name || !req.body.company_name || !req.body.job_title || !req.body.company_linkedin_id) {
  let userIdCookie = jwt.verify(req.cookies.jsonToken, process.env.LINKEDIN_SECRET);
  res.locals.usedId = userIdCookie;
  if (!userIdCookie) {
    res.status(418).json(`Invalid create user request: must include linkedin_user_id`);
  }

  let companyKey = await upsertCompany.upsert(req, res);

  let salaryKey = await insertSalary.insert(req, res, companyKey);

  // then insert user into user table, including name, company foreign key and salary foreign key
  let { userId, sexuality, age, gender, race, city, state } = req.body;
  queryString = `UPDATE users 
                SET company_id=$1, salary_id=$2, sexuality=$3,
                    age=$4, gender=$5, race=$6,
                    city=$7, state=$8
                WHERE linkedin_user_id=$9
                RETURNING *`;

  let params = [companyKey, salaryKey, sexuality, age, gender, race, city, state, userIdCookie];

  db.query(queryString, params)
    .then(response => {
      res.locals.userData = response.rows[0];
      return next();
    })
    .catch(err => console.log('Error in query for creating new user entry:\n', err));
};

// get /api/company/:linkedin_user_id retrieves current user data to be used in subsequent middleware that will retrieve company data
fairpayController.getCurrentUser = (req, res, next) => {
  console.log('controller: get current user');
  const linkedin_user_id = req.cookies.userId;
  console.log(linkedin_user_id);
  let queryString = `
    SELECT 
      u.name, s.job_title, c.linkedin_id, c.name as company_name, u.sexuality, u.age, u.gender, 
      u.race, s.employee_type, s.years_at_company, s.years_of_experience, 
      s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, 
      s.signing_bonus
    FROM salary s 
    INNER JOIN company c on s.company_id = c._id 
    INNER JOIN users u on s._id = u.salary_id where u.linkedin_user_id = '${linkedin_user_id}';`;

  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getCurrentUser: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getCurrentUser: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.currentUser = response.rows[0];
    return next();
  });
};

// second middleware to fire after get to /api/company/:linkedin_user_id; sends company data of users with all same job titles at same company of user

fairpayController.getAllCompanyNames = async (req, res, next) => {
  res.locals.companyNames = await getAllCompanyNames.get();
  next();
}

fairpayController.getCompanyData = (req, res, next) => {
  const { job_title, company_name } = res.locals.currentUser;
  // console.log(
  //   'inside getcompanydata, res.locals.currentUser is',
  //   res.locals.currentUser
  // );
  const params = [job_title, company_name];
  //console.log("params is", params);
  let queryString = `
      SELECT u.name, c.name, s.job_title, c.linkedin_id, u.sexuality, 
      u.age, u.gender, u.race, s.employee_type, s.years_at_company, 
      s.years_of_experience, s.base_salary, s.full_time_status, 
      s.annual_bonus, s.stock_options, s.signing_bonus 
      FROM salary s 
      INNER JOIN company c 
          ON s.job_title = $1 
          AND c.name = $2 
          AND s.company_id = c._id 
      INNER JOIN users u 
          ON s._id = u.salary_id`;
  db.query(queryString, params, (err, response) => {
    // console.log('inside get company, rows is ', response.rows);
    if (err) {
      return next({
        log: `fairpayController.getCompanyData: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getCompanyData: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.companyData = response;
    return next();
  });
};

// middleware gets avg stats of current user's job title in company
fairpayController.getJobStats = (req, res, next) => {
  console.log('controller: get job stats');

  const { company_name, job_title } = res.locals.currentUser;
  const queryString = `select s.job_title, round(avg(s.base_salary), 0) as avg_salary, 
  round(avg(s.annual_bonus), 0) as avg_bonus, 
  round(avg(s.stock_options), 0) as avg_stock_options, 
  count(*) from salary s 
  left join users u on s._id = u.salary_id 
  left join company c on c._id = s.company_id 
  where c.name = $1 and s.active = 'true' 
  and s.job_title = $2 
  group by s.job_title 
  order by s.job_title`;

  const params = [company_name, job_title]
  db.query(queryString, params, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getJobStats: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getJobStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.jobStats = response.rows;
    //console.log('response.rows in getracestats', response.rows);
    return next();
  });
};

// middleware gets avg race stats of current user's company
fairpayController.getRaceStats = (req, res, next) => {
  console.log('controller: get race stats');

  const { company_name, job_title } = res.locals.currentUser;
  const queryString = `select u.race, round(avg(s.base_salary), 0) as avg_salary, 
  round(avg(s.annual_bonus), 0) as avg_bonus, 
  round(avg(s.stock_options), 0) as avg_stock_options, 
  count(*) from salary s 
  left join users u on s._id = u.salary_id 
  left join company c on c._id = s.company_id 
  where c.name = $1 
  and s.active = 'true' and s.job_title = $2 
  group by u.race 
  order by u.race`;

  const params = [company_name, job_title];
  db.query(queryString, params, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getRaceStats: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getRaceStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.raceStats = response.rows;
    //console.log('response.rows in getracestats', response.rows);
    return next();
  });
};

// middleware gets avg age stats of current user's company
fairpayController.getAgeStats = (req, res, next) => {
  console.log('controller: get age stats');

  const { company_name, job_title } = res.locals.currentUser;
  const queryString = `select u.age, round(avg(s.base_salary), 0) as avg_salary, 
  round(avg(s.annual_bonus), 0) as avg_bonus, 
  round(avg(s.stock_options), 0) as avg_stock_options, 
  count(*) from salary s 
  left join users u on s._id = u.salary_id 
  left join company c on c._id = s.company_id 
  where c.name = $1 and 
  s.active = 'true' and s.job_title = $2 
  group by u.age 
  order by u.age`;
  const params = [company_name, job_title];
  db.query(queryString, params, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getAgeStats: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getAgeStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.ageStats = response.rows;
    //console.log('response.rows in getagestats', response.rows);
    return next();
  });
};

// middleware gets avg gender stats of current user's company
fairpayController.getGenderStats = (req, res, next) => {
  console.log('controller: get gender stats');

  const { company_name, job_title } = res.locals.currentUser;
  const queryString = `select u.gender, round(avg(s.base_salary), 0) as avg_salary, 
  round(avg(s.annual_bonus), 0) as avg_bonus, 
  round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary
   s left join users u on s._id = u.salary_id left 
   join company c on c._id = s.company_id 
   where c.name = $1 and s.job_title = $2 
   and s.active = 'true' 
   group by u.gender 
   order by u.gender`;
  
  const params = [company_name, job_title];
  db.query(queryString, params, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getGenderStats: ERROR: ${err}`,
        message: {
          err: 'fairpayController.getGenderStats: ERROR: Check server logs for details',
        },
      });
    }
    res.locals.genderStats = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

module.exports = fairpayController;
