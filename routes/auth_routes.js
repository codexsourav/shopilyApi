const express = require('express');
const auth = require('../controller/users/AuthController');
const middleware = require('../middleware/chack-auth');

const authrouter = express.Router();

authrouter.post('/api/auth/login', auth.login);
authrouter.post('/api/auth/signup', auth.signup);
userRoutes.get('/api/profile', middleware, auth.profile);
// authrouter.post('/api/auth/signup', auth.forgetpass);


module.exports = authrouter;
