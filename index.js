const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routers = require('./routes/product_routes');
const authrouters = require('./routes/auth_routes');
const userrouters = require('./routes/user_routes');
const adminrouters = require('./routes/admin_routes');
const cors = require('cors');



const app = express()
app.use(express.json());
app.use(express.static('view/client'));

app.use(cors());

app.use(routers);
app.use(authrouters);
app.use(userrouters);
app.use(adminrouters);

app.listen(process.env.PORT, () => {
    console.log(`Your App Listening on port ${process.env.PORT}`)
})