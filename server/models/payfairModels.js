const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

// Schema for the database can be found below:
// https://github.com/fairpay/fairpay/...

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
