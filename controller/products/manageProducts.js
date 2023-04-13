const ProductDB = require('../../model/productsSchema');
const CartDB = require('../../model/CartSchema');
const Orders = require('../../model/orderSchema');

module.exports = {
    private: async (req, res) => {
        try {
            res.send(await ProductDB.find({ "public": false }));

        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    // for add new product
    addnew: async (req, res) => {
        try {
            const { title, desc, mainprice, price, poster, images } = req.body;

            if (title.length <= 5) {
                res.send({ 'error': "Title MIN 5 Latters " });
                return false;
            } else if (desc.length <= 20) {
                res.send({ 'error': "Descripton MIN 20 Latters " });
                return false;
            } else if (mainprice.length == 0) {
                res.send({ 'error': "Please Add Your Display Price" });
                return false;
            } else if (price.length == 0) {
                res.send({ 'error': "Add Your Main Selling Price" });
                return false;
            }
            else if (poster.length == 0) {
                res.send({ 'error': "Please Add Display Image" });
                return false;
            } else if (images.length == 0) {
                res.send({ 'error': "Please Add Images" });
                return false;
            }
            const newproduct = new ProductDB({ title, desc, mainprice, price, poster, images });
            const response = await newproduct.save();
            res.send({ "success": true, response });

            return false;

        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    // for upadte a product 
    update: async (req, res) => {
        try {
            const { title, desc, mainprice, price, poster, images, public } = req.body;
            let productId = req.params.pid;
            if (title.length <= 5) {
                res.send({ 'error': "Title MIN 5 Latters " });
                return false;
            } else if (desc.length <= 20) {
                res.send({ 'error': "Descripton MIN 20 Latters " });
                return false;
            } else if (mainprice.length == 0) {
                res.send({ 'error': "Please Add Your Display Price" });
                return false;
            } else if (price.length == 0) {
                res.send({ 'error': "Add Your Main Selling Price" });
                return false;
            }
            else if (poster.length == 0) {
                res.send({ 'error': "Please Add Display Image" });
                return false;
            } else if (images.length == 0) {
                res.send({ 'error': "Please Add Images" });
                return false;
            } else if (public == "") {
                res.send({ 'error': "Please Select Make Public Or Not" });
                return false;
            }
            const updateproduct = await ProductDB.updateOne({ _id: productId }, { title, desc, mainprice, price, poster, images, public }, { returnOriginal: false });

            res.send({ "success": true, "response": updateproduct });

        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },

    // for delete a product 
    delete: async (req, res) => {
        try {
            let productId = req.params.pid;
            const product = await ProductDB.deleteOne({ _id: productId });
            const cart = await CartDB.deleteMany({ productId });
            const Order = await Orders.deleteMany({ productId });
            res.send({ "success": true, "response": { product, cart } });
        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    // show private products 
    showPrivate: async (req, res) => {
        try {
            const response = await ProductDB.find({ public: false });
            res.send(response);
        } catch (error) {
            res.send({ "error": "Invalid Request / Server error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }
}