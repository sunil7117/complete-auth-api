import mongoose from "mongoose"

export const connect=async(DATABASE)=>{
    try {
        const DB_OPTION={
            dbName: "ecommerce",
        }
        await mongoose.connect(DATABASE,DB_OPTION)
        console.log("connection established...")
    } catch (error) {
        console.log(error)
        
    }
}