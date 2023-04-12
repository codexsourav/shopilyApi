const mongoose = require('mongoose');
const Rating = require('../../model/ratingSchema');
const ProductDB = require('../../model/productsSchema');


module.exports = {
    add: async (req, res) => {
        try {
            const productId = req.params.pid;
            const userId = req.authUser.id;
            const msg = req.body.msg;
            const stars = req.body.stars;
            if (!stars) {
                res.send({ "error": "Invalid Request Add Requird Data" });
                return false;
            }
            // chack if user alrady a rate on this product 
            const checkexist = await Rating.find({ productId, userId }).count();
            if (checkexist != 0) {
                res.send({ "error": "You Are Alrady Give a Rating" });
                return false;
            }
            const newrating = new Rating({ productId, userId, msg, stars });
            const response = await newrating.save();
            // here set a compari 5 star rating 
            const rateingresponse = await Rating.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$stars"
                        },
                        sum: {
                            $sum: 1
                        }
                    }
                }
            ]);

            // calculate rating 5 stars and update
            const score = rateingresponse[0];
            const newratingscore = score.total / score.sum;
            await ProductDB.updateOne({ _id: productId }, { $set: { rating: newratingscore } });

            res.send({ "success": true, response })
        } catch (error) {
            res.send({ "error": "Invalid Request / Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    // show reting users 
    show: async (req, res) => {
        try {
            const id = req.params.pid;
            const productId = new mongoose.Types.ObjectId(id);
            const getRating = await Rating.aggregate(
                [
                    { $match: { productId } },
                    {
                        $lookup: {
                            from: "users", localField: "userId", foreignField: "_id", as: "user"
                            , pipeline: [
                                {
                                    $project: {
                                        "_id": 1,
                                        "name": 1,
                                        "dpic": 1,
                                    }
                                }
                            ],
                        }

                    }, {
                        $unwind: "$user"
                    }]);
            res.send(getRating);
        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }
}