// import other resolvers
const salaryResolver = require('./resolvers/salary.js');
const userResolver = require('./resolvers/user.js');
const statsResolver = require('./resolvers/stats.js');

module.exports = {
  ...salaryResolver,
  ...userResolver,
  ...statsResolver
}