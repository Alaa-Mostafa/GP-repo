const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Ajv = require("ajv")
const dotenv = require("dotenv")
dotenv.config()
const cors = require ("cors")
app.use(cors())
app.use(express.json())

//auth Routes 
let authRouter = require("./routes/auth")
let studentRouter = require("./routes/Students")
let adminRouter = require("./routes/admin")

app.use("/api/auth",authRouter)
app.use("/api/students",studentRouter)
app.use("/api/admin",adminRouter)
app.use(express.static("upload_Imgs"))

let PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})
mongoose.connect("mongodb://127.0.0.1:27017/API")
//mongoose.connect(process.env.mongodb_Url)
//mongoose.connect("mongodb+srv://MennaMagdy:m01096757508@cluster0.vzfel0r.mongodb.net/API")
