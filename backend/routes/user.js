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
    try {
        const users= await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:`server error ${error}`})
    }
   

  
   

})
// kullanıcı girişi (login)

router.post("/login", async (req,res)=> {
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json({error:"Invalid email "})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid) {
            return res.status(401).json({error:"Invalid password"})
        }

        res.status(200).json({
            id:user._id,
            email:user.email,
            username:user.username,
            role: user.role,
            phone:user.phone,
            isHappy:user.isHappy,
            comment:user.comment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error"+error });
    }
})
 


module.exports=router;