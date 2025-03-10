const jwt = require("jsonwebtoken");

const SECRET_KEY = "skjnjhfhgasdfghjkl"


const createToken =  (payload, expiresIn="1D")=> jwt.sign(payload, SECRET_KEY, { expiresIn })
const verifyToken = token => jwt.verify(token, SECRET_KEY);


const Token = { createToken, verifyToken }

module.exports = Token