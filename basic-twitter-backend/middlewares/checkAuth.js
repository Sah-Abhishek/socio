const jwt = require('jsonwebtoken');
const secretKey = require('../secrets');

const checkAuth = (req, res, next) => {
    // Get the token from Authorisation headers
    const token = req.headers.authorization;

    // Check if token is not provided

    if(!token){
        return res.status(401).json({
            message: "Unauthorised: No token provided, You are not logged in"
        })
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) return res.status(401).json({ message: "Unauthorized: invalid token provided"});
        else{
            req.userId = decoded.userId;
            // console.log(req);
            // console.log(req.userId);
            
            next();
        }
    })
};

module.exports = checkAuth;

