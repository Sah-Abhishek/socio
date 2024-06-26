const express = require('express');
const { createUser, loginUser } = require('../types');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = require('../secrets');

const router = express.Router();


// This endpoint lets the user to signup
router.post("/signup", async(req, res) => {
    const createPayload = req.body;
    console.log(createPayload);
    const parsedPayload = createUser.safeParse(createPayload);
    console.log(parsedPayload);

    if(!parsedPayload.success){
        res.status(400).json({
            message: "You've sent the wrong inputs"
        })
        return;
    }

    //putting in mongodb
    try{
        await User.create({
            userName: createPayload.userName,
            firstName: createPayload.firstName,
            lastName: createPayload.lastName,
            year: createPayload.year,
            email: createPayload.email,
            password: createPayload.password
        })
        res.json({
            message: "User created"
        })
    }catch(error){
        console.log("Error while signing up", error);
        res.status(411).json({
            message: "There was an error while signing up"
        })
    }

})

// This endpoint lets the user to login
router.post("/login", async(req, res) => {
    const createPayload = req.body;
    console.log(createPayload);

    const parsedPayload = loginUser.safeParse(createPayload);
    console.log("This is the parsed Payload",parsedPayload);

    try{
        if(!parsedPayload.success){
            console.log("the parsing was not successful");
            res.status(411).json({
                message: "You've sent wrong inputs"
            });
        }

        const user = await User.findOne({userName: parsedPayload.data.userName}).catch(error => console.log(error));
        console.log("Check here");
        console.log(user);
        // console.log(user.password);
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        // Compare the provided password with the one stored in database
        // const passwordMatch = await bcrypt.compare(parsedPayload.password, user.password);

        if(parsedPayload.data.password == user.password){
            const token = jwt.sign({ userId: parsedPayload.data.userName }, secretKey);
            console.log("This is the token" ,token);
            res.status(200).json({
                message: "You are logged in",
                token: token
            })
        }else{
            res.status(500).json({
                message: "uesr not found"
            })
        }

        console.log("After this")
        
        // res.status(200).json({
        //     token
        // })
    }catch(err){
        console.log("Ther was some error", err);
        res.status(500).json({
            message: "Internal server error"
        })
    }

})

module.exports = router;
