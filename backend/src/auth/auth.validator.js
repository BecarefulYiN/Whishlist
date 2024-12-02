const queries = require('./auth.queries.js')
const pool = require("../../db.js")

// auth.validator.js
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 6 characters long and contain at least one letter, one number, and one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};



const isEmailExist = async (email) => {
  try {
    const result = await pool.query(queries.isExistEmail, [email]);
    return result.rows.length > 0; 
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw new Error('Database query failed.');
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  isEmailExist
};
