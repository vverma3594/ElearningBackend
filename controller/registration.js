const mongoose = require("mongoose");
 const Registration = mongoose.model("registration");
// const Registration = require('../models/registration')
const bcrypt = require("bcrypt");
const bcryptp = require('../utility/password')


exports.Registration = async (req, res, next) => {
  try {
    let obj={
      FirstName:req.body.FirstName,
      lastName:req.body.lastName,
      user_name:req.body.user_name,
      category:req.body.category,
      DOB:req.body.DOB,
      email:req.body.email,
      Password:req.body.Password,
      rePassword:req.body.rePassword,
      termAndCondition:req.body.termandcondition,
      mob_no:req.body.Mob_no
    }
  
    console.log('obj :>> ', obj);
  
    if (!obj.FirstName ||!obj.lastName ||!obj.user_name ||!obj.category ||!obj.DOB ||!obj.email ||!obj.Password ||!obj.rePassword ||!obj.termAndCondition||!obj.mob_no) {
      res.send({ message: "please fill all the require field!" });
    }
  
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        String(obj.email).toLowerCase()
      ) != true
    ) {
      res.send({ message: "Please enter valid email!" });
      return;
    }
  
    if (obj.Password != obj.rePassword) {
      res.send({ message: "Password should be same!" });
    }
  
    if (obj.Password.length < 6) {
      errors.push({ msg: "password atleast 6 characters" });
    }
   else {
  
      await Registration.findOne({ email: obj.email }, async function (err, data) {
        var err;
        if (err) throw err;
        if (data) {
          console.log("User Exists");
          err = "User Already Exists with this Email...";
          return res.status(200).json({ success: false, message: err });
        } else {
         let encriptPass = await bcryptp.bcryptPass(obj.Password)
            if (encriptPass) {
                if (err) throw err;
                const registration = new Registration();
                registration.FirstName = obj.FirstName;
                registration.lastName = obj.lastName;
                registration.user_name = obj.user_name;
                registration.category = obj.category;
                registration.DOB = obj.DOB;
                registration.email = obj.email;
                registration.Password = encriptPass;
                registration.termAndCondition = obj.termAndCondition;
                registration.mob_no = obj.mob_no;
                registration.date = obj.date;
                registration.save();
                if(registration) {
                  return res.status(200).json({ success: true, message: 'Success', data:registration })
              } else {
                  return res.status(404).json({ success: false, message: 'err' });
              }
              }
          
         
        }
      });
    }    
} catch(e) {
    return res.status(500).json({ success: false, message: e.message });
}
 
};

exports.upDateTeacher = async (req, res, next) => {
     console.log('upDateTeacher :>> ', req.body);
let obj= {FirstName:req.body.First_Name,
  lastName:req.body.Last_Name,
  DOB:req.body.dob,
  email:req.body.Email,
  mob_no:req.body.mob_no,
  fewWord:req.body.fewWord}
 Registration.findByIdAndUpdate({ _id: req.body.id} , obj).then((user,err) => {
  if (err){ 
    console.log(err) 
    return res.status(200).json({ success: false, message: 'failed'})
} 
else{ 
  return res.status(200).json({ success: true, message: 'Success', data:user })
} 
})

};
