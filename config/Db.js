const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Ecommerce")
    .then(async () => {
        console.log('mongoDB is connected');
    })
    .catch((err) => {
        console.log('failed to connect mongoDB',err);
    })