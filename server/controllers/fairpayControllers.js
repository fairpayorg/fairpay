const db = require('../models/payfairModels');

const fairpayController = {};

// responds to GET /api/user with all user data
fairpayController.getUser = (req, res, next) => {
  console.log('creating query');
  let queryString = `SELECT *, c.linkedin_id AS company_linkedin_id, c.name AS company_name, c.city AS company_city, c.zipcode AS company_zipcode
                    FROM public.users AS u
                    LEFT OUTER JOIN public.company AS c
                    ON u.company_id = c._id
                    LEFT OUTER JOIN public.salary AS s
                    ON u.salary = s._id
                    WHERE u.linkedin_user_id = $1;`

  let params = [req.body.linkedin_user_id];

  
  db.query(queryString, params, (err, response) => {
    console.log('checking for error in query response');
    if(err) {
      console.log('Error in query for user: ', err);
    }
    console.log('in query handler');
    res.locals.userData = response.rows;
    console.log(res.locals.userData);
    next();
  });
}

// POST /api/user
fairpayController.createUser = (req, res, next) => {
  console.log('creating user, verifying if request is proper');
  if (!req.body.linkedin_user_id || !req.body.name || !req.body.company_name || !req.body.job_title || req.body.company_linkedin_id) {
    res.status(418).json(`Invalid create user request: must include 
                          linkedin_user_id, name, company_name, and job_title`);
  }

  let companyKey;
  let salaryKey;
  // upsert company into company table         
  let queryString =  `INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) 
                      VALUES($1, $2, $3, $4, $5, $6) 
                      ON CONFLICT (linkedin_id) 
                      DO UPDATE SET 
                        name=EXCLUDED.name
                      RETURNING _id as key`;
  let params = [req.body.company_linkedin_id, 
                req.body.company_name, 
                req.body.company_city, 
                req.body.industry, 
                req.body.region, 
                req.body.company_zipcode];
  db.query(queryString, params, (err, response) => {
    if(err) {
      console.log('Error in query for creating new company: ', err);
    }
    companyKey = response.rows[0].key;
    // insert new job_title into salary table
    queryString = `INSERT INTO salary (company_id, job_title)
                   VALUES ($1, $2)
                   RETURNING _id as key`;
    let params = [companyKey, req.body.job_title];
    db.query(queryString, params, (err, response) => {
      if(err) {
        console.log('Error in query for creating new salary entry: ', err);
      }
      salaryKey = response.rows[0].key;

      // then insert user into user table, including name, company foreign key and salary foreign key
      queryString = `INSERT INTO users (name, linkedin_user_id, company_id, salary)
                     VALUES ($1, $2, $3, $4)
                     RETURNING *`;
      let params = [req.body.name, req.body.linkedin_user_id, companyKey, salaryKey];
      db.query(queryString, params, (err, response) => {
        if(err) {
          console.log('Error in query for creating new user entry: ', err);
        }
        res.locals.insertedUser = response.rows;
        next();
      });
    });
  });

  db.query(queryString, params, (err, response) => {
    if(err) {
      console.log('Error in query for user: ', err);
    }
    res.locals.userData = response.rows;
    next();
  });

}

//PUT /api/user
fairpayController.updateUser = (req, res, next) => {
  
}

// GET /api/company/:user_linkedin_id
// i need a get request :/api/company/user_linkedin_id for all the information of every person in the same company with the same position. I need 'name', 'job_title', 'sexuality', 'age', 'gender', 'race', 'employee_type', 'years at company', 'years of experience', 'base_salary', 'annual_bonus', 'stock_options', 'signing_bonus', 'fulltime status',
// select 
// u.race, -- can switch out for gender, income, etc as seperate queries
// sum(s.Income) as annual_income,
// sum(s.bonus) as bonus,
// sum(s.stocks) as stock_options,
// avg(s.hourly_wage) as hourly_wage,
// (count(*) filter (where s.ft_status ='Full-time'))::float/ count(*) as pct_full_time
// from salaries s 
// left join users u on s.user_id = u.id
// left join companies c on c.id=s.company_id 
// where c.company_name ='Company name of the user'
// group by u.race, -- can switch out for gender, income, etc as seperate queries
// order by u.race 

fairpayController.getCompanyData = (req, res, next) => {
  const { user_linkedin_id } = req.params;
  const params = [user_linkedin_id]
  let queryString = `select u.gender from user u `
}

module.exports = fairpayController;