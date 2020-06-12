

const db = require('../../models/payfairModels');

const statsResolver = {};

statsResolver.stats = async (args) => {
  const { linkedin_id, job_title } = args
  return await getJobStats(linkedin_id, job_title)
}

const getJobStats = (linkedin_id, job_title, statsData = {}) => {
  const queryText = `
    SELECT s.job_title, round(avg(s.base_salary), 0) AS avg_salary, round(avg(s.annual_bonus), 0) AS avg_bonus, round(avg(s.stock_options), 0) AS avg_stock_options, count(*)
    FROM salary s 
    LEFT JOIN users u ON s._id = u.salary
    LEFT JOIN company c ON c._id = s.company_id
    WHERE c.linkedin_id = $1 AND s.active = 'true' AND s.job_title = $2
    GROUP BY s.job_title
    ORDER BY s.job_title
  `

  const values = [linkedin_id, job_title]

  return db.query(queryText, values)
    .then(data => {
      return getRaceStats(linkedin_id, job_title, {
        ...statsData,
        jobStats: data.rows
      })
    })
    .catch(err => {
      return err
    })
}

const getRaceStats = (linkedin_id, job_title, statsData = {}) => {
  const queryText = `
    select u.race, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*)
    from salary s
    left join users u on s._id = u.salary
    left join company c on c._id = s.company_id where c.linkedin_id = $1 and s.active = 'true' and s.job_title = $2 group by u.race order by u.race
  `

  const values = [linkedin_id, job_title]

  return db.query(queryText, values)
    .then(data => {
      return getAgeStats(linkedin_id, job_title, {
        ...statsData,
        raceStats: data.rows
      })
    })
    .catch(err => {
      return err
    })
}

const getAgeStats = (linkedin_id, job_title, statsData = {}) => {
  const queryText = `select u.age, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = $1 and s.active = 'true' and s.job_title = $2 group by u.age order by u.age`

  const values = [linkedin_id, job_title]

  return db.query(queryText, values)
    .then(data => {
      return getGenderStats(linkedin_id, job_title, {
        ...statsData,
        ageStats: data.rows
      })
    })
    .catch(err => {
      return err
    })
}

const getGenderStats = (linkedin_id, job_title, statsData = {}) => {
  const queryText = `select u.gender, round(avg(s.base_salary), 0) as avg_salary, round(avg(s.annual_bonus), 0) as avg_bonus, round(avg(s.stock_options), 0) as avg_stock_options, count(*) from salary s left join users u on s._id = u.salary left join company c on c._id = s.company_id where c.linkedin_id = $1 and s.job_title = $2 and s.active = 'true' group by u.gender order by u.gender`

  const values = [linkedin_id, job_title]

  return db.query(queryText, values)
    .then(data => {
      return {
        ...statsData,
        genderStats: data.rows
      }
    })
    .catch(err => {
      return err
    })
}

module.exports = statsResolver