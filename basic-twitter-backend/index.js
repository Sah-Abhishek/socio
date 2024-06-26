require("dotenv").config()
const express = require('express');
const cors = require('cors');
const { createPost, deletePost, createUser, loginUser } = require('./types')
const Post  = require('./models/post');
// const requiew { }
const jwt = require('jsonwebtoken');
const secretKey = require('./secrets');
const checkAuth = require('./middlewares/checkAuth')
const authRouter = require('./routes/authentication')
const userRouter = require('./routes/user')
const { connectMongoDB } = require('./views/connection');
const { default: mongoose } = require("mongoose");
const  User = require("./models/user");
connectMongoDB();




const app = express();
app.use(cors(
    {
        origin: ["https://socio-cli.vercel.app/"],
        methods: ['POST', 'GET'],
        // credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));

/*

body {
    user: String,
    content: String
}
 */


// This will apply this middleware to all the routes that will parse the json sent in the body and make it available in the req.body
app.use(express.json());


// This endpoint signs up a new user


// This endpoint logs in a user

app.use('/', authRouter);
app.use('/users', userRouter);


// This endpoint lets the user to upload a post
app.post("/post", checkAuth, async (req, res) => {
    const createPayload = req.body;
    console.log(createPayload);

    const parsedPayload = createPost.safeParse(createPayload);
    // console.log("This is the parsed Payload",parsedPayload);
    const user = await User.findOne({ userName: req.userId})
    // console.log("This is ther userId", user._id);

    if(!parsedPayload.success){
        res.status(401).json({
            message: "You've sent the wrong inputs"
        })
        return;
    }
    // Put in the mongo database
    try{
        await Post.create({
            postedBy: user._id,
            content: createPayload.content
        });
        res.json({
            message: "post Created"
        });
    }catch(error){
        console.log("Error creating a post", Error);
        // Handle database error
        res.status(401).json({
            message: "Failed to create a post"
        })

    }
    


})

// This endpoint let the user to delete a post
app.delete("/posts/:postId", async(req, res) => {
    const postId = req.params.postId;

    try{
    //     const createPayload = await Post.findByIdAndDelete(postId);
    //     const parsedPayload = deletePost.safeParse(deletePost)
        if(deletePost){
            res.status(411).json({
                message: "Deleted"
            })
        }else{
            res.status(411).json({
                message: "Post with this id was not found"
            })
        }  

    }catch(error){
        console.log("Error deleting this post", error);
        res.status(500).json({
            message: "There was a error in deleting this post"
        });
    }
})

// This endpoint shows all the post
app.get("/", checkAuth, async(req, res) => {
    try{
        const posts = await Post.find().populate({
            path: "postedBy",
            select: 'userName year'
        }).exec();
        const reversedPost = posts.reverse();
        // console.log(posts);
        // console.log(req.userId);
        const userName = req.userId;
        const user = await User.findOne({ userName: userName});
        const { firstName, lastName, email } = user;
        // console.log("This is the firstname and lastName", firstName, lastName, email);
        
        // console.log("this is the thing", postedBy);
        // console.log(postedBy);
        res.json({
            post: reversedPost,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email
            // 
            
        })
    }catch(error){
        console.log("There was an error while fetching post", error);
    }
})



app.put("/update/:postId", async(req, res) => {
    const postId = req.params.postId; // It is the postId sent in the parameters
    const updateData = req.body; // It is the update data sent in the body

    try{
        const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

        if(updatedPost){
            res.json({
                message: "post updated successfully",
                post: updatedPost
            });
        }else{
            res.json({
                message: "post with postId not found",
            });
        }

    }catch(error){
        console.log("Error while updating the data", error);
        res.status(411).json({
            message: "Failed to update post"
        });
    }

})

app.get("/posts/:userName", checkAuth, async(req, res) => {
    try{
        const userName = req.params.userName;
        console.log(userName);

        // Find the user by username

        const user = await User.findOne({ userName: userName});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        
        // Find all the post by the userName
        const postByUser = await Post.find({ userName: userName });
        res.json({postByUser});

    }catch(err){
        console.log("Error fetching posts", err);
        res.status(411).json({
            message: "Internal server error"
        })
    }
})

const port = 3000;

app.listen(port,() => console.log(`Listening at port ${port}`));
