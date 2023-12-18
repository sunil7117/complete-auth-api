import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./config/connection.js";
import authRouter from "./routeView/authRoute.js";
import updateRouter from "./routeView/updateRoute.js";
import userRouter from "./routeView/userRouter.js";
import morgan from "morgan";
import router from "./routeView/adddataRouter.js";
import imageRouter from './routeView/imageRouter.js'
import productRouter from './routeView/productRouter.js'

dotenv.config();


const app = express();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE_URL;
console.log(DATABASE)
console.log(PORT)
app.use(express.json());
app.use(cors());
app.use('/image',express.static('uploadphoto'));
app.use(morgan(":url :status"));
app.use(express.urlencoded({ extended: true }));

// To check server 
app.get("/", (req, res) => {
  res.send("Welcome to site");
});


//For user auth like login singup
app.use("/api/auth", authRouter);

// For upload image middleware
app.use("/api/image",imageRouter);


// all route related to product
app.use("/api/product", productRouter);


app.use("/api/adddata", router);
app.use("/api", updateRouter);

// user..........
app.use("/api/user",userRouter)

connect(DATABASE);

app.listen(PORT,()=>{console.log(`server started ${PORT}`)})
