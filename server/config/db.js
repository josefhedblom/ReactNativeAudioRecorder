require('dotenv').config()
const mongoose  = require('mongoose');

const dbString = process.env.DB
const connectDB = async () => {
    try {
        await mongoose.connect(dbString, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database...')
    } catch (error) {
            console.error(error.message);
            console.log("Error");
            process.exit(1);
    }
}

module.exports = connectDB;