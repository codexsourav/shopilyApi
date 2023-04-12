const mongoose = require('mongoose');
mongoose.connect(process.env.DB).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log('DB Errro ' + err);
});

