require("./db");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        default: "COD",
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        default: "Place Order",
    },
    address: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;