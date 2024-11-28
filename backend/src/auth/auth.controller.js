const pool = require('../../db.js');
const queries = require('./auth.queries.js');
const { encryptData } = require('../service/encryptDecryptService.js'); 
const validator = require('./auth.validator.js')
const { 
  validateEmail, 
  validatePassword, 
  isEmailExist 
} = require('./auth.validator.js'); 

const createAccount = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ Message: "Invalid email format." });
  }

  if (await isEmailExist(email)) {
    return res.status(400).json({ Message: "Email already exists." });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ Message: "Password must be at least 6 characters long and contain both letters and numbers." });
  }

  try {
    const encryptedPassword = encryptData(password);

    await pool.query(queries.createAccount, [userName, email, encryptedPassword]);

    res.status(200).json({ Message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  createAccount
};
