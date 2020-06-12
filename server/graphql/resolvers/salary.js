const db = require('../../models/payfairModels')

const salaryResolver = {};

salaryResolver.salaries = () => {
  const queryText = `
    SELECT * FROM salary
  `
  return db.query(queryText)
    .then(data => {
      return data.rows
    })
    .catch(err => {
      return err
    })
}

module.exports = salaryResolver