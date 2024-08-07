import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {   
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to mongoDB");
    } catch(error) {
        console.log("Error connecting to mongoDB", error.message);
    }
}

export default connectToMongoDB;