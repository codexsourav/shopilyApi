require("./db");
const mongoose = require("mongoose");

const productSch = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
    },
    desc: {
        type: String,
        required: true,
        lowercase: true,
    },
    mainprice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rateing: {
        type: Number,
        required: true,
        default: 0,
    },
    poster: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
    },
    sell: {
        type: Number,
        required: true,
        default: 0,
    },

    public: {
        type: Boolean,
        required: true,
        default: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    deliveryDays: {
        type: Number,
        required: true,
        default: 7,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Products = mongoose.model("products", productSch);
module.exports = Products;