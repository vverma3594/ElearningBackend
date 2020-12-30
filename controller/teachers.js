const mongoose = require("mongoose");
// const  delete  = require("../routes/admin");
const Teacher = mongoose.model("Teacher");
const Registration = mongoose.model("registration");
//get all teacher
module.exports = {
 
getAllTeacher :async (req, res, next) => {
  const teacher = await Teacher.findOne({});
  //console.log('teacher :>>', res.send(teacher))
  res.send("Featched all teacher !\n"+teacher);
},
//get teacher by id
getteacherInfoByID: async (req, res) => {
try{
  const teacherData = await Registration.findOne({_id:req.params.id});
  if(teacherData){
    return res.status(200).json({ success: true, message: 'Success', data:teacherData })
  }else{
    return res.status(404).json({ success: false, message: 'failed',})
  }
}catch(err){
  return res.status(404).json({ success: false, message: 'failed',})
}

},



//add teacher
addTeacher : async (req, res) => {
  const teacher = new Teacher();
  teacher.firstName = req.body.firstName;
  teacher.lastName = req.body.lastName;
  teacher.user_name = req.body.user_name;
  teacher.category = req.body.category;
  teacher.DOB = req.body.DOB;
  teacher.email = req.body.email;
  teacher.password = req.body.password;
  teacher.termAndCondition = req.body.termAndCondition;
  teacher.mob_no = req.body.mob_no;
  teacher.date = req.body.date;

  await teacher.save();

  res.send("Added following teacher !\n"+teacher);
},

//gat a teacher
getAnTeacher : async (req, res) => {
  const teacher = await Teacher.findOne({ _id: req.params.teacherId });
  res.send("Featched following teacher !\n"+teacher);
},

//update an teacher
updateAnTeacher : async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(
    {
      _id: req.params.teacherId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.send("Updated following teacher !\n"+teacher);
},
//delete an teacher
deleteAnTeacher :async (req, res) => {
  const teacher = await Teacher.findByIdAndRemove({
    _id: req.params.teacherId,
  });
  res.send("Deleted following teacher !\n"+teacher);
}
  }