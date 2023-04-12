const mongoose = require("mongoose");
const Orders = require('../../model/orderSchema');
const Product = require('../../model/productsSchema');
const userAdress = require('../../model/userAdressSchema');


module.exports = {
    placeOrder: async (req, res) => {
        try {
            const productId = req.params.id;
            const quantity = req.params.quantity;
            const userId = req.authUser.id;
            // paymentType comming soon
            const getbuyPrice = await Product.findById(productId, { price: 1 });
            const buyPrice = getbuyPrice.price;
            // get use radress 
            const address = await userAdress.findOne({ userId }, { userId: 0, _id: 0 });
            if (!address) {
                res.send({ "error": "Please Set Your Adress First" });
                return false;
            }
            const newOrder = new Orders({ productId, userId, quantity, paymentType: "COD", buyPrice, address });
            const response = await newOrder.save();

            res.send({ "success": true, response });

        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }


    },
    cancelOrder: async (req, res) => {
        try {
            const cancelOrder = await Orders.updateOne({ _id: req.params.id }, { "status": "cancel", date: Date.now() });
            res.send({ "success": true, cancelOrder });

        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    showOrders: async (req, res) => {
        try {
            var userId = new mongoose.Types.ObjectId(req.authUser.id);
            var orderget = await Orders.aggregate([
                { $match: { userId } },
                {
                    $lookup: {
                        from: "products", localField: "productId", foreignField: "_id", as: "product"
                    }
                }, {
                    $unwind: "$product"
                }]);
            res.send(orderget);

        } catch (error) {

            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
}