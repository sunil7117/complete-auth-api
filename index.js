import express from "express";
import dotenv from 'dotenv'
import { connect } from "./config/connection.js";
dotenv.config()
const app=express()
const PORT=process.env.PORT
const DATABASE=process.env.DATABASE_URL

app.get('/',(req,res)=>{
    res.send("Welcome to site")
})


connect(DATABASE)

app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})