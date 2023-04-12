var validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require('../../model/userSchema');

module.exports = {
    chackauth: async (req, res) => {
        res.send({ auth: true });
    },
    login: async (req, res) => {
        try {
            const { email, pass } = req.body;

            if (!email && !pass) {
                res.send({ "error": "Please Enter UserName or Password" });
                return false;
            }
            // get data by this email 
            var userdata = await Auth.findOne({ email }, { email: 1, pass: 1, isadmin: 1 });
            if (!userdata) {
                res.send({ "error": "Invalid UserName or Password", });
                return false;
            }

            // chack password
            if (!bcrypt.compareSync(pass, userdata.pass)) {
                res.send({ "error": "Invalid UserName or Password" });
                return false;
            }
            // here set a jwt token for verify user 
            var token = jwt.sign({ id: userdata._id }, process.env.KEY);
            res.cookie("user", token, {
                expires: new Date(Date.now() + 90 * 24 * 3600000),
                // cookie for 90 days
            });
            // update this token on data base 
            await Auth.updateOne({ _id: userdata._id }, { token });

            res.send({ "success": true, "token": token, isadmin: userdata.isadmin });

        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    // for signup user 

    signup: async (req, res) => {
        try {
            const { name, email, pass } = req.body;

            if (!name && !email && !pass) {
                res.send({ "error": "Please Enter All Data" });
                return false;
            }

            if (validator.isEmpty(name)) {
                res.send({ "error": "Please Enter Your Name" });
                return false;
            }
            if (validator.isEmpty(email)) {
                res.send({ "error": "Please Enter Your Email ID" });
                return false;
            }
            if (!validator.isEmail(email)) {
                res.send({ "error": "Invalid Email ID" });
                return false;
            }
            if (validator.isEmpty(pass)) {
                res.send({ "error": "Please Enter Your Password" });
                return false;
            }

            // chack email is exist

            var isexistemail = await Auth.findOne({ email }).count();
            if (isexistemail != 0) {
                res.send({ "error": "Your Email Is Alrady Used" });
                return false;
            }

            // save user to database 
            const user = new Auth({ name, email, pass });
            const dbres = await user.save();
            res.send({ "success": true, "response": { "_id": dbres._id } })

        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }
}