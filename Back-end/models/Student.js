const mongoose = require ('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const studentSchema = mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    age:{type:Number},
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
      },
    courses_Enrolled:{type:Array},
    level:{type:String},
    is_Student:{type:Boolean},
    profile_Img:{type:String},
    adminRole:{type:Boolean,default:false},
    theme:{type:String}
    
})


// fire a function before doc saved to db
studentSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // static method to login user
  studentSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    //check email
    //if(!user) return resizeBy.status(400).send("Invalid email or password");
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
module.exports = mongoose.model('students',studentSchema)