const stdModel = require('../models/Student')
const adminModel = require('../models/admin')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config()

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id ,email ,  adminRole) => {
  return jwt.sign({ user_id: id , user_email :email, adminRole:adminRole },"token_key_secret" , {
    expiresIn: maxAge
  });
};

//signup
let signup = async (req, res) => {
  try {
    const user = await stdModel.create({...req.body});
    const token = createToken(user._id , user.email, user.adminRole);
    res.header({"x-auth-token":token})
    
    res.status(201).json({message:"Ok"});
  
  }
  catch(err) {
        for(let e in err.errors){
           console.log(err.errors[0].message);
         res.status(400).send("Bad Request .. Some Fields")
        }
  }
 
}
/////////////Login//////////////////
let login = async (req, res) => {
  const { email, password} = req.body;

  try {
    //check email in admin 
  const admin = await adminModel.findOne({email:req.body.email})
  //console.log(admin)

   //check email in student
   const student = await stdModel.findOne({email:req.body.email})

 if(!student && !admin) return res.status(400).send("Invalid email or password")
    if (student !=null){
     let std = await stdModel.login(email, password);
    //  create token
    const token = createToken(std._id ,std.email, std.adminRole); 
    res.header({"x-auth-token":token})
    //res.json(token)
    res.status(201).json({message:"Ok"});
   }
    else if (admin !=null){
      const token = createToken(admin._id ,admin.email, admin.adminRole); 
      res.header({"x-auth-token":token})
      res.status(201).json({message:"Ok"});
    }
  } 
  catch(err) {
    for(let e in err.errors){
       console.log(err.errors[0].message);
     res.status(400).send("Bad Request .. Some Fields")
    }
}
}
module.exports = {
    signup,
    login
}