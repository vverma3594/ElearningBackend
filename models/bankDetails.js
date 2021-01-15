//USER.JS in MODELS/USER.JS
const mongoose = require("mongoose");
     
const banksDetails = new mongoose.Schema(
  {
     TeacherId: {
          type: String,
          required: true,
        },
        bankFirstName: {
      type: String,
      required: true,
    },
    bankLastName: {
        type: String,
        required: true,
      },
      bankName: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    BranchName: {
        type: String,
        required: true,
      },
      accountNo: {
        type: Number,
        required: true,
      },
      ReAccountNo: {
      type: Number,
      required: true,
      
    },
    IfscCode: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    //note: isko schema k bahar likhenge
  }
);
const BanksDetails = mongoose.model("banksDetails", banksDetails);
module.exports = BanksDetails;
