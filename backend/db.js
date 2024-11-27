const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  name: process.env.DB_USER_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
})

module.exports = pool