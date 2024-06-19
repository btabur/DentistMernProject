const express = require('express')
const router = express.Router();

//diğer route ları içe aktarıyoruz

const appointmentRoute= require('./appointment.js');
const userRoute= require('./user.js');

//her rotayı ilgili yol altında kullanıyoruz

router.use("/appointment",appointmentRoute)
router.use("/user",userRoute)

module.exports=router