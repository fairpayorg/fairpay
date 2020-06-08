const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;
console.log("Server address variable is: ", process.env.PG_URI);
const pool = new Pool({
  connectionString: PG_URI
});

// Schema for the database can be found below:
// https://github.com/fairpay/fairpay/...

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};