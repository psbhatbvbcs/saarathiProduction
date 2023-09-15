import { config } from "dotenv"
import { mongoose } from "mongoose"
    

export const connectDb = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            dbName: "campuscompass",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Database Connected")
        })
        .catch((err) => {
            console.log(err)
        });
}