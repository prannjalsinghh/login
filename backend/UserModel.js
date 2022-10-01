const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    visitorId:String
})

userSchema.statics.findByCredentials = async function (email,password){
    const user = await User.findOne({email})
    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Unable to login");
    }

    return user;
}

userSchema.statics.findByVisitorToken = async function(visitorId){
    const user = User.findOne({visitorId: visitorId})
    if(!user){
        throw new Error("Please Login")
    }
    return user;
}

userSchema.pre("save",async function (next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;