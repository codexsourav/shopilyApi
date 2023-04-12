const Orders = require('../../model/orderSchema');
const Product = require('../../model/productsSchema');


module.exports = {
    // show place orders 
    showorders: async (req, res) => {
        try {
            const getorders = await Orders.aggregate([
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "productId",
                        "foreignField": "_id",
                        "as": "product",
                        pipeline: [
                            {
                                $project: {
                                    "desc": 0,
                                    "images": 0,

                                }
                            }
                        ],
                    }
                },
                { "$unwind": "$product" },

            ]);
            res.send(getorders)
        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }
    },
    // set status
    setstatus: async (req, res) => {
        try {
            let orderId = req.params.oid;
            const status = req.body.status.toLowerCase();

            if (!status) {
                res.send({ "error": "Invalid Request" });
                return false;
            }

            const response = await Orders.findByIdAndUpdate({ _id: orderId }, { $set: { status } });
            if (status == "delivered") {
                const getproduct = await Product.findById(response.productId);
                const respon = await Product.updateOne({ _id: getproduct._id }, { $set: { "sell": getproduct.sell + 1 } });
                console.log(respon);
            }
            res.send({ "success": true, response });

        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }
    },
    // show stsus by type 
    showstatusbBy: async (req, res) => {
        try {
            const status = req.body.status.toLowerCase();
            if (!status) {
                res.send({ "error": "Invalid Request" });
                return false;
            }
            const getorders = await Orders.aggregate([
                { "$match": { status } },
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "productId",
                        "foreignField": "_id",
                        "as": "product",
                        pipeline: [
                            {
                                $project: {
                                    "desc": 0,
                                    "images": 0,

                                }
                            }
                        ],
                    },

                },

                { "$unwind": "$product" },

            ]);
            res.send(getorders)
        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
            return false;
        }
    }
}