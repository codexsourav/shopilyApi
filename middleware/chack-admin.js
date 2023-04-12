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

        const userdata = jwt.verify(token, process.env.KEY);
        const admin = await User.findById(userdata.id, { isadmin: 1 });
        if (admin.isadmin != true) {
            res.send({ "error": "You Are Not Admin", "auth": false });
            return false;
        }
        req.authUser = userdata;
        next();
    } catch (error) {
        res.send({ "error": "You Are Not Authorized", "auth": false });
        console.log("Error", error.message);
        console.log("Error", error.name);
        console.log("Error", error.stack);
        return false;
    }
}