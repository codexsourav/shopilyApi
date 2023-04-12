require("./db");
const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    msg: {
        type: String,
    },
    stars: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Rating = mongoose.model("ratings", RatingSchema);
module.exports = Rating;