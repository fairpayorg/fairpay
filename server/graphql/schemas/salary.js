const salarySchema = {}

salarySchema.Salary = `
  type Salary {
    _id: ID!
    company_id: Int
    job_title: String
    years_at_company: Int
    years_of_experience: Int
    base_salary: Int
    annual_bonus: Int
    stock_options: Int
    active: Boolean
  }
`

salarySchema.SalaryInputData = `
  input SalaryInputData {
    company_id: Int
    job_title: String
    years_at_company: Int
    years_of_experience: Int
    base_salary: Int
    annual_bonus: Int
    stock_options: Int
    active: Boolean
  }
`

salarySchema.Queries = `
  salaries: [Salary!]!
`

salarySchema.Mutations = `
  createSalary(salaryInput: SalaryInputData): Salary!
`

module.exports = salarySchema
