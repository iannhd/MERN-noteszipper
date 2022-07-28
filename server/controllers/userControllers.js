const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../util/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, pic} = req.body
    console.log(name);
    console.log(email);
    console.log(password, "==> ini dari req body");
    console.log(pic);
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User Already Exist')
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Error Occured")
    }

})

const authUser = asyncHandler(async(req, res, ) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Email or Password")
    }
})


module.exports = {registerUser, authUser}