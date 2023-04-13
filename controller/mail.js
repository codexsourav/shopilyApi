const nodemailer = require("nodemailer");
var validator = require('validator');

const mail = async (req, res) => {
    const { name, email, msg } = req.body;
    console.log(req.body);
    if (!name, !email, !msg) {
        res.send({ "error": "Please Fill All Fields" });
        return false;
    }
    if (name.length <= 2) {
        res.send({ "error": "Name Must Be 3 Lattes" });
        return false;
    } else if (!validator.isEmail(email)) {
        res.send({ "error": "Enter A Valid Email" });
        return false;
    } else if (msg.length <= 10) {
        res.send({ "error": "Your Message is Too Short" });
        return false;
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'sourav0w@gmail.com', // generated ethereal user
            pass: "clxxiycpnbuviava", // generated ethereal password
        },
    });

    // send mail with defined transport object
    try {
        let info = await transporter.sendMail({
            from: email,
            to: "sourav0w@gmail.com",
            subject: "Shopily App Contact",
            html: "<b>Hello world?</b>",
        });
        if (info) {
            res.send({ success: true });
        } else {
            res.send({ "error": "Your Message Not Sent ! Get Some Error" });
            return false;
        }
    } catch (error) {
        console.log(error);
        res.send({ "error": "Your Message Not Sent ! Get Some Error" });
        return false;
    }


}
module.exports = mail;