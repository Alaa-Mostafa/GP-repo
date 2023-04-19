const express = require('express')
const app = express()
const stdModel = require('../models/Student')
const bcrypt = require("bcrypt")

app.use(express.json())

// get ALL Students
let getAllStudents = async(req,res) => {
    try{
        const students = await stdModel.find().select({_id:0,__v:0,password:0})
       res.status(200).json(students)
    }
    catch(err){
        for(let e in err.errors){
           console.log(err.errors[0].message);
           res.status(400).json({message:"Bad Request .. Some Fields"})
        }
    }
}

// get Student By email
let getStudentByEmail = async(req,res) => {
    let stdEmail = req.params.email;
   try{
    const student = await stdModel.findOne({email:stdEmail},{_id:0,__v:0,password:0})
    //const student = await stdModel.findById(req.params.studentId)
    if(!student) return res.status(400).json({message:"Student not found"})
    res.status(200).json(student)
   }
   catch(err){
    for(let e in err.errors){
       console.log(err.errors[0].message);
       res.status(400).json({message:"Bad Request .. Some Fields"})
    }
}
}

// Add Student
let createStudent = async(req,res) =>{

        var foundEmail = await stdModel.findOne({email:req.body.email}) 
        if(foundEmail){res.json({message:"this email Already Exist"})}
        else{
            console.log(req.file)
            let profile_img ;
            if(req.file==undefined){profile_img = "http://localhost:7000/544-5445462_default_Image.png"}
            else{profile_img=`http://localhost:7000/${req.file.filename}`}
              
            let std = new stdModel({
           ...req.body ,
            profile_Img:profile_img
            
            })
        await std.save();   
        res.status(200).json({message:"Added successfully"})
        }

}

//Update Student
let updateStudentByEmail =  async(req,res) => {
    let updataStudent = req.body;
   try{
       let newStd = await stdModel.findOneAndUpdate(req.params.email,updataStudent)
       if(newStd){res.status(200).json({message:"updated"})}
       else{res.status(404).json({message:"Student not found"})}
   }
   catch(err){
       for(let e in err.errors){
          console.log(err.errors[0].message);
          res.status(400).json({message:"Bad Request .. Some Fields"})
       }
   }
}

//Delete Student
let deleteStudent =  async(req,res) => {
  
    try{
        let deleteStd = await stdModel.findOneAndDelete(req.params.email)
        if(deleteStd){res.status(200).json({message:"deleted"})}
        else{res.status(404).json({message:"Student not found"})}
    } 
    catch(err){
        for(let e in err.errors){
           console.log(err.errors[0].message);
           res.status(400).json({message:"Bad Request .. Some Fields"})
        }
    }
}

module.exports = {
    getAllStudents,
    getStudentByEmail,
    createStudent,
    updateStudentByEmail,
    deleteStudent
}