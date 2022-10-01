const User = require("./UserModel")

const signup = async (req,res)=>{
    try{
        const check = await User.findOne({email:req.body.email})
        if(check){
            res.status(201).send({message:"User already exists"})
        }

        const user = await User.create(req.body);
        res.status(201).send({message:"User created successfully",user});

    }
    catch(e){
        res.status(400).send(e)
    }
};

const login = async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        user.visitorId= req.body.visitorId;
        user.save();
        res.status(200).send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e);
    }
}

const autoLogin = async (req,res)=>{
    try{
        const user = await User.findByVisitorToken(req.body.visitorToken);
        if(!user){
            throw new Error("Not found")
        }
        res.status(200).send(user)
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
}
const logout = async (req,res)=>{
    try{
        const user = await User.findOneAndUpdate({email : req.body.email},{visitorId:''})
        res.send(user)
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {autoLogin,login,signup,logout};