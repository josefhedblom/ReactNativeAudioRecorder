const mongoose  = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
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

export default connectDB;