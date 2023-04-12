const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {

        let token;
        const cookietoken = req.headers.cookie;
        const headerToken = req.headers.authorization;
        if (cookietoken) {
            token = cookietoken.split("=")[1];
        } else if (headerToken) {
            token = headerToken.split(" ")[1];
        } else {
            res.send({ "error": "You Are Not Authorized", "auth": false });
            return false;
        }

        const user = jwt.verify(token, process.env.KEY);
        const getUser = await User.findById(user.id).count();
        if (getUser != 1) {
            res.send({ "error": "You Are Not Authorized", "auth": false });
            return false;
        }
        req.authUser = user;
        next();
    } catch (error) {
        res.send({ "error": "You Are Not Authorized ", "auth": false });
        console.log("Error", error.message);
        console.log("Error", error.name);
        console.log("Error", error.stack);
        return false;
    }
}