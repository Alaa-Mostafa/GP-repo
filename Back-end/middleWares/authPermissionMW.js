const jwt = require("jsonwebtoken")
// const config = require("config");

module.exports = (req,res,nxt) => {
    // get x-auth-token header
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).json({message:"Access Denied"})

    try{
        const decodedPayload = jwt.verify(token , "token_key_secret");
        //check user role(Admin or not)
        if(!decodedPayload.adminRole) return res.status(401).json({message:"Access Denied.."})
        nxt()
    }
    catch(err){
        res.status(400).json({message:"Invalid Token"})
    }
}