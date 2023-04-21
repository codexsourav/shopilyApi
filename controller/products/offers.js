const { default: mongoose } = require("mongoose");
const Offer = require("../../model/offerSchema")

module.exports = {
    showOffer: async (req, res) => {
        try {
            const offers = await Offer.find();
            res.send(offers);
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    addOffer: async (req, res) => {
        try {
            let { productId, image } = req.body;
            productId = new mongoose.Types.ObjectId(productId);
            if (!productId, !image) {
                res.send({ 'error': "Invalid Requset" });
                return false;
            }
            const newoffer = new Offer({ productId, image });
            const response = await newoffer.save();
            res.send({ "success": true, response });
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    updateOffer: async (req, res) => {
        try {
            let { productId, image } = req.body;
            productId = new mongoose.Types.ObjectId(productId);
            let id = req.params.id;

            if (!productId, !image) {
                res.send({ 'error': "Invalid Requset" });
                return false;
            }

            const offers = await Offer.updateOne({ _id: id }, { productId, image });
            res.send({ "success": true, "response": offers });
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    deleteOffer: async (req, res) => {
        try {
            let id = req.params.id;
            const respnse = await Offer.deleteOne({ _id: id });
            res.send({ "success": true, "response": respnse });
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }

}