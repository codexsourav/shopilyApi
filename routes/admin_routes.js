const express = require('express');
const middlewareAdmin = require('../middleware/chack-admin');
const manageProducts = require('../controller/products/manageProducts');
const manageOrders = require('../controller/products/manageOrders');
const { chackauth } = require('../controller/users/AuthController');
const offers = require('../controller/products/offers');

const adminrouter = express.Router();

adminrouter.post('/api/auth', middlewareAdmin, chackauth);

// for maneage product routes
adminrouter.post('/api/manageproduct/', middlewareAdmin, manageProducts.addnew);
adminrouter.put('/api/manageproduct/:pid', middlewareAdmin, manageProducts.update);
adminrouter.delete('/api/manageproduct/:pid', middlewareAdmin, manageProducts.delete);
adminrouter.get('/api/manageproduct/private', middlewareAdmin, manageProducts.showPrivate);

// manageorders 
adminrouter.get('/api/manageorders/', middlewareAdmin, manageOrders.showorders);
adminrouter.post('/api/manageorder/status', middlewareAdmin, manageOrders.showstatusbBy);
adminrouter.put('/api/manageorder/status/:oid', middlewareAdmin, manageOrders.setstatus);

// manage offers 
adminrouter.post('/api/offer', middlewareAdmin, offers.addOffer);
adminrouter.put('/api/offer/:id', middlewareAdmin, offers.updateOffer);
adminrouter.delete('/api/offer/:id', middlewareAdmin, offers.deleteOffer);

module.exports = adminrouter;
