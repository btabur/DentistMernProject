const express = require('express')
const router = express.Router();
const bcrypt=require('bcryptjs')

const User = require("../models/User.js")

//kullanıcı oluşturma ( create- register)

router.post("/register" ,async(req,res)=> {
    try {
        const {username,email,password,phone} = req.body; 
        const existingUser= await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({error:"Bu email ile kayıtlı bir kullanıcı bulunmaktadır."})
        }
        const hashedPassword=await bcrypt.hash(password,10);

      const newUser =  await new User({username,email,password:hashedPassword,phone})
      await newUser.save();
        res.status(201).json(newUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error"+error})

    }
})


//tüm kullanıcıları getirme

router.get('/',async(req,res)=> {
    res.send('randevular getirlii')

})


module.exports=router;