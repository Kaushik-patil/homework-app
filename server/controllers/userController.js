const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User =require('../model/userModel')

/*@desc : Register new User
@route : POST/api/users
@access : public 
*/ 
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body

    if(!email || !name || !password){
        res.status(400)
        throw new Error("Please add all Fields")
    }
   
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error ("user already exists")
    }

    //Hasing password to encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const user = await  User.create({
        name,
        email,
        password: hashedPassword
    })

   if(user){
    res.status(201).json({
        _id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
    })
   }else{
    res.status(400)
    throw new Error('Invalid user data')
   }


   /*  Dont need this code now  
    res.json({ message : 'Register User'})
    */
})


/*@desc : Authenticate new User
@route : POST/api/login
@access : public 
*/ 
const LoginUser = asyncHandler(async(req,res)=>{

    const {email,password}=req.body
    //check for user email
    const user =await User.findOne({email})
    if(user&& (await bcrypt.compare(password,user.password))){
        res.json({
            _id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id) 
        })
    }else{
        res.status(400)
    throw new Error('Invalid credentials')
    }

/*dont need this now
    res.json({ message : 'Login User'})*/

})



/*@desc : Get Uesr Data
@route : GET/api/users/me
@access : private access
*/ 
const getMe = asyncHandler(async(req,res)=>{

  
    res.status(200).json(req.user)


  /* Dont need now:-> res.json({ message : 'User data Display'})*/
})

//Function to generate JWT Token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d',})
}

module.exports={
    registerUser,
    LoginUser,
    getMe
}