const pool = require('../../db.js');
const queries = require('./auth.queries.js');
const { encryptData,decryptData } = require('../service/encryptDecryptService.js'); 
const { 
  validateEmail, 
  validatePassword, 
  isEmailExist 
} = require('./auth.validator.js'); 
require('dotenv').config();

const jwt = require('jsonwebtoken');  
const JWT_SECRET = process.env.JWT_SECRET; 

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

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ Message: "Invalid email format." });
  }

  if (!await isEmailExist(email)) {
    return res.status(400).json({ Message: "Email does not exist." });
  }

  try {
    const result = await pool.query(queries.getUserByEmail, [email]);
    const user = result.rows[0];

    const isPasswordValid = decryptData(user.password, password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ Message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email, userName: user.userName }, 
      JWT_SECRET, 
      { expiresIn: '10h' } 
    );

    // Return the token to the user
    res.status(200).json({ 
      Message: "Login successful", 
      token 
    });

  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  createAccount,
  loginAccount
};
