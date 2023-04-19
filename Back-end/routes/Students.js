const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/Students')
const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")

const auth = require("../middleWares/authPermissionMW")
// get ALL Students
//role this for admin only
router.get('/',auth,studentsController.getAllStudents)

// get Student By email
router.get('/:email',studentsController.getStudentByEmail)

// Add Student
router.post('/' ,upload.single("image"),stdValidator,studentsController.createStudent)

//Update Student
router.put('/:email',studentsController.updateStudentByEmail)

//Delete Student
// role this for admin only 
router.delete('/:email' , auth,studentsController.deleteStudent)

module.exports = router