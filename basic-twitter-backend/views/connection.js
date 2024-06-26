const mongoose = require('mongoose');

const connectMongoDB = async () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((e) => console.log("mongobd connected"));

}

module.exports = {
    connectMongoDB
}