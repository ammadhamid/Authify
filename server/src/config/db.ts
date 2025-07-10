import mongoose from "mongoose";

async function connectDB() {
    try {
        const DB_NAME = "Authify";
        const mongodbURI =  process.env.MONGODB_URI;
        if(!mongodbURI){
            throw new Error("MONGODB_URI is missing in environment variables.")
        }
        const connection = await mongoose.connect(`${mongodbURI}/${DB_NAME}`);
        if(connection){
            console.log("MongoDB Connected Succesfully!!");
        } 
    } catch (error) {
        console.log("Error in Connection of MongoDB");
        console.error(error);
    }
}
export default connectDB;