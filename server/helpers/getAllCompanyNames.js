const db = require('../models/payfairModels');

const getAllCompanyNames = {};

getAllCompanyNames.get = async () => {
  let queryString = `SELECT name, city FROM company
                     ORDER BY name`;

  return db.query(queryString).then((result) => result.rows);
};

module.exports = getAllCompanyNames;
