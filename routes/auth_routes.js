const express = require('express');
const auth = require('../controller/users/AuthController');

const authrouter = express.Router();

authrouter.post('/api/auth/login', auth.login);
authrouter.post('/api/auth/signup', auth.signup);
// authrouter.post('/api/auth/signup', auth.forgetpass);


module.exports = authrouter;
