const Token = require("./lib/token");

const middleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        console.log(req.method,":", req.url);
        console.log('token: ', token);
        const user = await Token.verifyToken(token)
        console.log('user: ', JSON.stringify(user));
        if (user) {
            return next()
        } else {
            throw Error("Token not valid")
        }
    } catch (error) {
        if (req.url != "/token-verify") {
            return next()
        } else {
            return res.status(400).json({ message: error.message, logout: true })
        }
    }
}

module.exports = middleware