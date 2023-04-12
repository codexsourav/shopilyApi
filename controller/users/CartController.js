const mongoose = require("mongoose");
const ManageCart = require('../../model/CartSchema');
module.exports = {
    // show the cart 
    cart: async (req, res) => {
        try {

            var userId = new mongoose.Types.ObjectId(req.authUser.id);

            var cart = await ManageCart.aggregate([
                { $match: { userId } },
                {
                    $lookup: {
                        from: "products", localField: "productId", foreignField: "_id", as: "product"
                        , pipeline: [
                            {
                                $project: { // the only fields i need
                                    "_id": 1,
                                    "title": 1,
                                    "price": 1,
                                    "rateing": 1,
                                    "poster": 1,
                                }
                            }
                        ],
                    }

                }, {
                    $unwind: "$product"
                }]);
            res.send(cart);
        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    // add a new cart 
    add: async (req, res) => {
        try {
            let { productId } = req.body;

            if (!productId) {
                res.send({ "error": "Invalid Request" });
                return false;
            }
            // get or set data 
            const id = req.authUser.id;
            productId = new mongoose.Types.ObjectId(productId);

            // chakc is product is alrady added 
            const isExist = await ManageCart.find({ "userId": id, productId }).count();
            if (isExist != 0) {
                res.send({ "error": "Product is Alrady Add to Cart" });
                return false;
            }

            // save on database 
            const addCart = new ManageCart({ "userId": id, productId });
            const response = await addCart.save();
            res.send({ "success": true, response });

        } catch (error) {
            res.send({ "error": "Invalid Request" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }
    },

    // update the cart 
    update: async (req, res) => {
        try {
            let { productId, quantity } = req.body;

            if (!productId && !quantity) {
                res.send({ "error": "Invalid Request" });
                return false;
            }
            // get or set data 
            const id = req.authUser.id;
            productId = new mongoose.Types.ObjectId(productId);

            const response = await ManageCart.findOneAndUpdate({ "userId": id, productId }, { quantity }, { returnOriginal: false });
            res.send({ "success": true, response });

        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }

    },

    // delete product of cart 
    delete: async (req, res) => {
        try {
            let productId = req.params.pid;

            if (!productId) {
                res.send({ "error": "Invalid Request" });
                return false;
            }
            // get or set data 
            const id = req.authUser.id;
            productId = new mongoose.Types.ObjectId(productId);

            // delete cart 

            const resdelete = await ManageCart.deleteOne({ "userId": id, productId })
            res.send({ "success": true, "response": resdelete });
        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }
    },
}