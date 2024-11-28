const createAccount = 'INSERT INTO "User_Account"("userName", email, password) VALUES ($1, $2, $3);'

const isExistEmail = 'SELECT "userId", "userName", email, password FROM "User_Account" WHERE email = $1;'

const getUserByEmail = 'SELECT "userId", "userName", email, password FROM "User_Account" WHERE email = $1;'

module.exports={
  createAccount,
  isExistEmail,
  getUserByEmail
}