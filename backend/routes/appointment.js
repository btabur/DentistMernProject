const express = require('express')
const router = express.Router();


//tüm randevuları getirme

router.get('/',async(req,res)=> {
    res.send('randevular getirlii')

})


module.exports=router;