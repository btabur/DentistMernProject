const express = require('express')
const router = express.Router();

const User = require("../models/User.js")

//kullanıcı oluşturma ( create- register)

router.post("/register" ,async(req,res)=> {
    try {
        const {username,email,password,phone} = req.body;
      const newUser =  await new User({username,email,password,phone})
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