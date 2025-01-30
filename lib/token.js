const jwt = require("jsonwebtoken");

const SECRET_KEY = "skjnjhf"


const createToken =  (payload)=> jwt.sign(payload, SECRET_KEY, { expiresIn: '1D' })
const verifyToken = token => jwt.verify(token, SECRET_KEY);


const Token = { createToken, verifyToken }

module.exports = Token