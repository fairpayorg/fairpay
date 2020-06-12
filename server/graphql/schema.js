const { buildSchema } = require('graphql');

// import schemas here, should be strings of schema description
const salarySchema = require('./schemas/salary.js');
const userSchema = require('./schemas/user.js');
const statsSchema = require('./schemas/stats.js');


module.exports = buildSchema(`
  ${salarySchema.Salary}
  ${userSchema.User}
  ${statsSchema.Stats}

  ${salarySchema.SalaryInputData}

  type RootQuery {
    ${salarySchema.Queries}
    ${userSchema.Queries}
    ${statsSchema.Queries}
  }

  type RootMutation {
    ${salarySchema.Mutations}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)