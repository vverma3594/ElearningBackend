const mongoose = require("mongoose");

const categoryListSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
      categoryId: {
      type: String,
      required: true,   
    }
}
);
const categoryList = mongoose.model("categoryList", categoryListSchema);

module.exports = categoryList;
