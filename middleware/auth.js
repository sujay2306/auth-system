//use the middleware
//check for token presence
//verify token
//extract info from the payload
//NEXT()

const jwt = require("jsonwebtoken")

//model is optional here 
const auth = (req,res,next) => {
    //grab the token
    const token  = req.cookies.token  ||  req.body.token || req.header("Authorization").replace("Bearer ", "")

    if(!token){
        return res.status(403).send("token is missing")
    }
    
    try {

       const decode =  jwt.verify(token, process.env.SECRET_KEY)
       console.log(decode);
       req.user = decode

    } catch (error) {
        return res.status(401).send("invalid Token");
    }

    return next()


}

module.exports = auth