import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose'; 
import router from './Routes/routes.js';

const app=express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(express.json());

app.get('/',(req,res)=>{
    return res.status(234).send("welcome to node js");
});

//routes are added
app.use('/',router)

//Mongodb connection
mongoose.connect("mongodb+srv://bp7386:Bhanu648@bp.5bpxfjk.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("database is connected");
    app.listen(8000,()=>{
        console.log('listening on port 8000');
    });
}).catch((error)=>{
    console.log(error);
});
