const userSchema = {}

userSchema.User = `
  type User {
    name: String!
    job_title: String!
    linkedin_id: String!
    sexuality: String!
    age: String!
    gender: String!
    employee_type: String!
    years_at_company: Int!
    years_of_experience: Int!
    base_salary: Int!
    full_time_status: String
    annual_bonus: Int!
    stock_options: Int!
    signing_bonus: Int
  }
`

userSchema.Queries = `
  user(linkedin_user_id: String!): User!
`

module.exports = userSchema