require("./db");
const mongoose = require("mongoose");

const UserAddress = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    addr1: {
        type: String,
        required: true,
    },
    addr2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
});

const Address = mongoose.model("address", UserAddress);
module.exports = Address;