const express = require("express");
const mongoose =require('mongoose');
const dotenv= require('dotenv')
const mainRoute= require('./routes/index.js')


const app =express()
const port = 5001;
dotenv.config();

const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
       console.log("connected mongo");
    } catch (error) {
        throw error
    }
}
//middlewares
app.use(express.json());

app.use("/api",mainRoute)

app.listen(port,()=> {
    connect()
    console.log(`server started ${port}`);
})