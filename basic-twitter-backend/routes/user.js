const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get("/", async(req, res) => {
    try{
        const users = await User.find();
        console.log(users);
        res.json({
            users: users
        })
    }catch(error){
        console.log("There was some error", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports = router;