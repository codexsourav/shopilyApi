const express = require('express');
const middlewareAdmin = require('../middleware/chack-admin');
const manageProducts = require('../controller/products/manageProducts');
const manageOrders = require('../controller/products/manageOrders');
const { chackauth } = require('../controller/users/AuthController');

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




module.exports = adminrouter;
