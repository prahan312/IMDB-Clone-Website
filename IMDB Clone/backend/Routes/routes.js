import bcrypt from 'bcrypt';
import express from 'express';
import {User} from '../models/users.js';

const router=express.Router();

//Updating favorite movies of the user 
router.post("/changefavorite",async (req, res) => {
    const id=req.body._id;
    
    console.log(id);
    try{
        if(!req.body.email){
            return res.status(400).send({message:err.message});
        }
        const mess=await User.findByIdAndUpdate(id,req.body)
        return res.status(404).send({message:"Done"});
    }
    catch(err){
        return res.status(400).send({message:err.message});
    }
});

//Request all users data
router.get("/data",async(req,res)=>{
    try{
        const data=await User.find({});
        return res.status(200).send(data);
    }
    catch(err){
        return res.status(400).send({message:err.message});
    }
});

//Register a new user
router.post("/register",async (req,res)=>{
    try{
        if(!req.body.email){
            return res.status(400).send({message:err.message});
        }
        const data=await User.findOne({email:req.body.email})
        if(data){
            console.log(data);
            return res.status(400).send({message:"user already exists"});
        }
        if(!req.body.first||!req.body.last||!req.body.email||!req.body.password){
            return res.status(400).send({
                message:'send all required fields'
            });

        }
        bcrypt.hash(req.body.password,10,async(err,hashed_password)=>
        {
        const newuser={
            email:req.body.email,
            last:req.body.last,
            first:req.body.first,
            password:hashed_password,
            fav_list:[],
        };
        const n= await User.create(newuser);
        console.log(newuser);
        return res.status(201).send({message:"success"});
    });
    }catch(err){
        return res.status(400).send({message:err.message});
    }
});

//Login of the user
router.post("/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const check= await User.findOne({email:email});
    if(check){  
        
        bcrypt.compare(password,check.password,(err,result)=>
        {
            if(err)
            {
                return res.status(403).send({"message":"password not matched "})
            }

            if(!result)
            {
                return res.send({message:"password not matched "})
            }
            else
            {
                return res.status(200).send({"message":"success","user":check})
            }
        })
    }
    else{
        return res.send({message:"user not found"});
    }
});

export default router;