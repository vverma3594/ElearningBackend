const router = require("express").Router();
const mongoose = require("mongoose");
var multer = require('multer');
const MaterialPath = mongoose.model("materialPath");
var path = require('path');
var checkAuth = require("../middleware/auth");

const teacherController = require("../controller/teachers");

var storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
      cb(null, __dirname + '/public/uploads')
  },
  filename(req, file, cb) {
      cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });
 
router.post("/teacherInfobyID/:id",teacherController.getteacherInfoByID),

router.get("/getAllTeacher", teacherController.getAllTeacher);

router.post("/addTeacher", checkAuth, teacherController.addTeacher);

router.get("/getAnTeacher/:teacherId", checkAuth, teacherController.getAnTeacher);

router.put("/updateAnTeacher/:teacherId", checkAuth, teacherController.updateAnTeacher);

router.delete(
  "/deleteAnTeacher/:teacherId",
  checkAuth,
  teacherController.deleteAnTeacher
);

router.post("/saveMaterials/:teacherId",teacherController.saveFiles),

//------------------------------MULTER------------UPLOAD_FILE-----------------------------------------------------

router.post('/:teacherId/UploadFile',upload.array('material', 50), async (req, res, next) => {
  const filePathArray = [];
  for (var i = 0; i < req.files.length; i++) {
      var filePath = req.files[i].path;
      filePathArray.push(filePath);    
  }
  var materials = await new MaterialPath({
    filePaths: filePathArray,
    teacherId: req.params.teacherId,
})         
materials.save((err, data) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('data', data)
    }
})
  res.send(materials);
}),

module.exports = router;
