const statsSchema = {}

statsSchema.Stats = `

  type JobStats {
    job_title: String
    avg_salary: Int
    avg_bonus: Int
    avg_stock_options: Int
  }

  type RaceStats {
    race: String
    avg_salary: Int
    avg_bonus: Int
    avg_stock_options: Int
  }

  type AgeStats {
    age: String
    avg_salary: Int
    avg_bonus: Int
    avg_stock_options: Int
  }

  type GenderStats {
    gender: String
    avg_salary: Int
    avg_bonus: Int
    avg_stock_options: Int
  }

  type Stats {
    jobStats: [JobStats!]!
    raceStats: [RaceStats!]!
    ageStats: [AgeStats!]!
    genderStats: [GenderStats!]!
  }
`

statsSchema.Queries = `
  stats(linkedin_id: String!, job_title: String!): Stats!
`

module.exports = statsSchema