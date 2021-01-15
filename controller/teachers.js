const mongoose = require("mongoose");
const Teacher = mongoose.model("Teacher");
const Materials = mongoose.model("materialDetail");
const FilessPath = mongoose.model("materialPath");
const Registration = mongoose.model("registration");

module.exports = {
  saveFiles: async (req, res) => {
    const filesPath = await FilessPath.find({ teacherId: req.params.teacherId }, { filePaths: 1, _id: 0 });
    console.log('filesPathfilesPathfilesPathfilesPathfilesPath :>>', filesPath[0].filePaths)
    const materials = new Materials();
    materials.category = req.body.category;
    materials.subCategory = req.body.subCategory;
    materials.teacherId = req.body.teacherId;
    materials.videoPath = filesPath[0].filePaths;
    await materials.save();
    res.send(materials)
  },

  getAllTeacher: async (req, res, next) => {
    const teacher = await Teacher.findOne({});
    //console.log('teacher :>>', res.send(teacher))
    res.send("Featched all teacher !\n" + teacher);
  },

  getteacherInfoByID: async (req, res) => {
    try {
      const teacherData = await Registration.findOne({ _id: req.params.id });
      if (teacherData) {
        return res.status(200).json({ success: true, message: 'Success', data: teacherData })
      } else {
        return res.status(404).json({ success: false, message: 'failed', })
      }
    } catch (err) {
      return res.status(404).json({ success: false, message: 'failed', })
    }

  },

  
  addTeacher: async (req, res) => {
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
    res.send(teacher);
  },

  getAllPathByTeacherId: async (req, res) => {
    const materialPath = await MaterialPath.find({ teacherId: "5ffebf0c5814e47cbc15fe17" }, { filePaths: 1, _id: 0 })
    console.log('materialPathmaterialPathmaterialPath :>>', materialPath)
  },

 
  getAnTeacher: async (req, res) => {
    const teacher = await Teacher.findOne({ _id: req.params.teacherId });
    res.send("Featched following teacher !\n" + teacher);
  },

  updateAnTeacher: async (req, res) => {
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
    res.send("Updated following teacher !\n" + teacher);
  },
  
  deleteAnTeacher: async (req, res) => {
    const teacher = await Teacher.findByIdAndRemove({
      _id: req.params.teacherId,
    });
    res.send("Deleted following teacher !\n" + teacher);
  },
}