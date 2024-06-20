const mongoose= require('mongoose')

const UserSchema=mongoose.Schema(
    {
        username: { type: String,required: true},
        email: {type: String,required: true},
        password: {type: String,required: true},
        role: { type: String, default: "user", enum: ["user", "admin"] },
        comment:{type:String,default:"Henüz bir yorum yapmadınız"},
        phone:{type:String,required:true},
        isHappy:{type:Boolean,default:true}
    },{ timestamps: true }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;