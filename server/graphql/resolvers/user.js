const db = require('../../models/payfairModels')

const userResolver = {};

userResolver.user = (args) => {
  const queryText = `
    SELECT u.name, s.job_title, c.linkedin_id, u.sexuality, u.age, u.gender, u.race, s.employee_type, s.years_at_company, s.years_of_experience, s.base_salary, s.full_time_status, s.annual_bonus, s.stock_options, s.signing_bonus
    FROM salary s
    INNER JOIN company c on s.company_id = c._id
    INNER JOIN users u on s._id = u.salary
    WHERE u.linkedin_user_id = $1
  `;

  const values=[args.linkedin_user_id]

  return db.query(queryText, values)
    .then(data => {
      console.log('data: ', data.rows)
      return data.rows[0]
    })
    .catch(err => {
      return err
    })
}

module.exports = userResolver