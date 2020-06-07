const db = require("../models/payfairModels");

const fairpayController = {};

// responds to GET /api/user with all user data
fairpayController.getUser = (req, res, next) => {
  console.log("creating query");
  let queryString = `SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode
                    FROM public.users AS u
                    LEFT OUTER JOIN public.company AS c
                    ON u.company_id = c._id
                    LEFT OUTER JOIN public.salary AS s
                    ON u.salary = s._id
                    WHERE u.linkedin_user_id = $1;`;

  let params = [req.body.linkedin_user_id];

  db.query(queryString, params, (err, response) => {
    console.log("checking for error in query response");
    if (err) {
      console.log("Error in query for user: ", err);
    }
    console.log("in query handler");
    res.locals.userData = response.rows;
    console.log(res.locals.userData);
    next();
  });
};

// POST /api/user
fairpayController.createUser = (req, res, next) => {
  console.log("creating user, verifying if request is proper");
  if (
    !req.body.linkedin_user_id ||
    !req.body.name ||
    !req.body.company_name ||
    !req.body.job_title ||
    req.body.company_linkedin_id
  ) {
    res.status(418).json(`Invalid create user request: must include 
                          linkedin_user_id, name, company_name, and job_title`);
  }

  let companyKey;
  let salaryKey;
  // upsert company into company table
  let queryString = `INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) 
                      VALUES($1, $2, $3, $4, $5, $6) 
                      ON CONFLICT (linkedin_id) 
                      DO UPDATE SET 
                        name=EXCLUDED.name
                      RETURNING _id as key`;
  let params = [
    req.body.company_linkedin_id,
    req.body.company_name,
    req.body.company_city,
    req.body.industry,
    req.body.region,
    req.body.company_zipcode,
  ];
  db.query(queryString, params, (err, response) => {
    if (err) {
      console.log("Error in query for creating new company: ", err);
    }
    companyKey = response.rows[0].key;
    // insert new job_title into salary table
    queryString = `INSERT INTO salary (company_id, job_title)
                   VALUES ($1, $2)
                   RETURNING _id as key`;
    let params = [companyKey, req.body.job_title];
    db.query(queryString, params, (err, response) => {
      if (err) {
        console.log("Error in query for creating new salary entry: ", err);
      }
      salaryKey = response.rows[0].key;

      // then insert user into user table, including name, company foreign key and salary foreign key
      queryString = `INSERT INTO users (name, linkedin_user_id, company_id, salary)
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`;
      let params = [
        req.body.name,
        req.body.linkedin_user_id,
        companyKey,
        salaryKey,
      ];
      db.query(queryString, params, (err, response) => {
        if (err) {
          console.log("Error in query for creating new user entry: ", err);
        }
        res.locals.insertedUser = response.rows;
        next();
      });
    });
  });

  db.query(queryString, params, (err, response) => {
    if (err) {
      console.log("Error in query for user: ", err);
    }
    res.locals.userData = response.rows;
    next();
  });
};

//PUT /api/user
fairpayController.updateUser = (req, res, next) => {};

// get /api/company/:linkedin_user_id retrieves current user data to be used in subsequent middleware that will retrieve company data
fairpayController.getCurrentUser = (req, res, next) => {
  const { linkedin_user_id } = req.params;
  let queryString = `select u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.company_id = c._id inner join users u on s._id = u.salary where u.linkedin_user_id = '${linkedin_user_id}'`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getCurrentUser: ERROR: ${err}`,
        message: {
          err:
            "fairpayController.getCurrentUser: ERROR: Check server logs for details",
        },
      });
    }
    res.locals.currentUser = response.rows[0];
    // console.log('res.locals.currentUser is', res.locals.currentUser);
    return next();
  });
};

// second middleware to fire after get to /api/company/:linkedin_user_id; sends company data with all same job titles at same company of user

fairpayController.getCompanyData = (req, res, next) => {
  const { job_title, linkedin_id } = res.locals.currentUser;
  // console.log(
  //   'inside getcompanydata, res.locals.currentUser is',
  //   res.locals.currentUser
  // );
  const params = [job_title, linkedin_id];
  console.log("params is", params);
  let queryString = `select u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus from salary s inner join company c on s.job_title = $1 and c.linkedin_id = $2 and s.company_id = c._id inner join users u on s._id = u.salary`;
  db.query(queryString, params, (err, response) => {
    // console.log('inside get company, rows is ', response.rows);
    if (err) {
      return next({
        log: `fairpayController.getCompanyData: ERROR: ${err}`,
        message: {
          err:
            "fairpayController.getCompanyData: ERROR: Check server logs for details",
        },
      });
    }
    res.locals.companyData = response;
    return next();
  });
};

// middleware gets avg race stats of current user's company
fairpayController.getRaceStats = (req, res, next) => {
  const { linkedin_id } = res.locals.currentUser;
  const queryString = `select u.race, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '${linkedin_id}' and s.active = 'true' group by u.race order by u.race`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getRaceStats: ERROR: ${err}`,
        message: {
          err:
            "fairpayController.getRaceStats: ERROR: Check server logs for details",
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
  const { linkedin_id } = res.locals.currentUser;
  const queryString = `select u.age, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '${linkedin_id}' and s.active = 'true' group by u.age order by u.age`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getAgeStats: ERROR: ${err}`,
        message: {
          err:
            "fairpayController.getAgeStats: ERROR: Check server logs for details",
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
  const { linkedin_id } = res.locals.currentUser;
  const queryString = `select u.gender, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = '${linkedin_id}' and s.active = 'true' group by u.gender order by u.gender`;
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: `fairpayController.getGenderStats: ERROR: ${err}`,
        message: {
          err:
            "fairpayController.getGenderStats: ERROR: Check server logs for details",
        },
      });
    }
    res.locals.genderStats = response.rows;
    //console.log('response.rows in getgenderstats', response.rows);
    return next();
  });
};

module.exports = fairpayController;
