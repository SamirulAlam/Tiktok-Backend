import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";
import dotenv from 'dotenv';
dotenv.config();




//GKS3edjvhJf7jptW


// app config
const app = express();
const port = process.env.PORT || 9000;


//middleware 
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*"),
    res.setHeader("Access-Control-Allow-Headers","*"),
    next()
})

//dbconfig
const password=process.env.PASSWORD;
const connection__url=`mongodb+srv://admin:${password}@cluster0.tl45d.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(connection__url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
//endpoints
app.get("/", (req, res) => {res.status(200).send("hello world")});
app.get("/v1/posts",(req,res) => {res.status(200).send(Data)});
app.post("/v2/posts",(req,res) => {
    const dbVideos=req.body

    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});
app.get("/v2/posts",(req,res)=>{
    Videos.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


//listener
app.listen(port,()=>console.log(`listening on port ${port}`));