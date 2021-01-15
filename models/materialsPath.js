const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    filePaths: { type : Array , "default" : [] },
    teacherId: String,
    },
  {
    timestamps: true,
  }
);
const materialPath = mongoose.model("materialPath", materialSchema);

module.exports = materialPath;
