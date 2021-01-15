const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
        type: String,
        required: true,
      },
    teacherId: {
      type: String,
      required: true,   
    },
    videoPath:{ type : Array , "default" : [] }
    },
  {
    timestamps: true,
  }
);
const material = mongoose.model("materialDetail", materialSchema);

module.exports = material;
