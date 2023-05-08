const express = require('express');
const managecart = require('../controller/users/CartController');
const middleware = require('../middleware/chack-auth');
const adress = require('../controller/users/userAdress');
const orders = require('../controller/users/Orders');
const mail = require('../controller/mail');
const path = require('path');
const offers = require('../controller/products/offers');



const userRoutes = express.Router();
userRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../view/client/index.html"))
});


// cart routes 
userRoutes.get('/api/cart', middleware, managecart.cart);
userRoutes.post('/api/cart', middleware, managecart.add);
userRoutes.put('/api/cart', middleware, managecart.update);
userRoutes.delete('/api/cart/:pid', middleware, managecart.delete);
// adress get 
userRoutes.get('/api/address', middleware, adress.getAddress);
userRoutes.put('/api/address', middleware, adress.updateAddress);
//orders Routes 
userRoutes.get('/api/order/', middleware, orders.showOrders);
userRoutes.post('/api/order/new/:id/:quantity', middleware, orders.placeOrder);
userRoutes.post('/api/order/:id/cancel/', middleware, orders.cancelOrder);
// for  contact 
userRoutes.post('/api/contact', mail);
// offers 
userRoutes.get('/api/offer', offers.showOffer);

module.exports = userRoutes;
