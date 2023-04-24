const mongoose = require('mongoose');
const ProductDB = require('../../model/productsSchema');
module.exports = {
    // for show home page popular products 
    showProducts: async (req, res) => {
        try {
            res.send(await ProductDB.find({ "public": true }, { "desc": 0, 'images': 0 }).limit(30).sort({ sell: -1 }));
        } catch (error) {
            res.send({ 'error': "Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    //and any paginations
    showProductsLimit: async (req, res) => {
        try {
            const skip = req.params.skip;
            res.send(await ProductDB.find({ "public": true }, { "desc": 0, 'images': 0 }).skip(skip).limit(20).sort({ sell: -1 }));
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    // search by title 
    searchProducts: async (req, res) => {
        try {
            const skip = req.params.skip;
            const search = req.params.query;
            const data = req.body;
            const fld = data.filter ?? 'sell';
            const sort = data.sort ? -1 : 1;
            // console.log(fld, sort);
            res.send(await ProductDB.find({ 'title': { '$regex': search }, "public": true }, { desc: 0, images: 0 }).sort({ [fld]: sort }).skip(data.skip ?? 0).limit(20));

        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    // only one product 
    product: async (req, res) => {
        try {
            const id = req.params.id;

            res.send(await ProductDB.findById(id));
        } catch (error) {
            res.send({ 'error': "Invalid Requset" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }

}