import express from "express";
const app=express()

app.get('/',(req,res)=>{
    res.send("Welcome to site")
})

app.listen(8080,()=>{console.log(`server started at http://localhost:8080`)})