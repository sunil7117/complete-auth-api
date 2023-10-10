import express from "express";
import dotenv from 'dotenv'
import { connect } from "./config/connection.js";
import authRouter from "./routeView/authRoute.js";
dotenv.config()
const app=express()
const PORT=process.env.PORT
const DATABASE=process.env.DATABASE_URL
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send("Welcome to site")
})
app.use('/api/auth',authRouter)

connect(DATABASE)

app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})