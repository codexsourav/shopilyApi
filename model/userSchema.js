require("./db");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 40,
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    dpic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    token: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

users.pre("save", function (next) {
    if (!this.isModified("pass")) {
        var hash = bcrypt.hashSync(pass, 10);
        this.pass = hash;
        next();
    }

    this.pass = bcrypt.hashSync(this.pass, 10);
    next();
});
const Usersmdl = mongoose.model("users", users);

module.exports = Usersmdl;
