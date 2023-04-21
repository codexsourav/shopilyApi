require("./db");
const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;