const mongoose = require("mongoose");
const BanksDetails = mongoose.model("banksDetails");



exports.addTeacherBankDetails = async (req, res, next) => {
     let alreadyCurentData = await BanksDetails.findOne({
          TeacherId: req.body.TeacherId
     })
     if (alreadyCurentData) { 
          
          console.log("coming in allready bankdetails")
          let obj = {
               bankFirstName: req.body.bankFirstName,
               bankLastName: req.body.bankLastName,
               bankName: req.body.bankName,
               BranchName: req.body.BranchName,
               accountNo: req.body.accountNo,
               ReAccountNo: req.body.ReAccountNo,
               IfscCode: req.body.IfscCode,
               TeacherId: req.body.TeacherId
          }
          BanksDetails.findOneAndUpdate({TeacherId: req.body.TeacherId}, obj).then((user, err) => {
               if (err) {
                    console.log(err)
                    return res.status(200).json({
                         success: false,
                         message: 'failed'
                    })
               } else {
                    return res.status(200).json({
                         success: true,
                         message: 'Success',
                         data: user
                    })
               }
          })
     } else {
          console.log("coming in new bankdetails")
          const banksDetails = new BanksDetails();
          banksDetails.bankFirstName = req.body.bankFirstName;
          banksDetails.bankLastName = req.body.bankLastName;
          banksDetails.bankName = req.body.bankName;
          banksDetails.BranchName = req.body.BranchName;
          banksDetails.accountNo = req.body.accountNo;
          banksDetails.ReAccountNo = req.body.ReAccountNo;
          banksDetails.IfscCode = req.body.IfscCode;
          banksDetails.TeacherId = req.body.TeacherId;
          banksDetails.save();
          if (banksDetails) {
               return res.status(200).json({
                    success: true,
                    message: 'Success',
                    data: banksDetails
               })
          } else {
               return res.status(404).json({
                    success: false,
                    message: 'err'
               });
          }
     }
};


exports.getTeacherBankDetails = async (req, res, next) => {
     console.log('req :>> ', req.params);
     let alreadyCurentData = await BanksDetails.findOne({
          TeacherId: req.params.teacherId
     })
   if(alreadyCurentData){
     return res.status(200).json({
          success: true,
          message: 'Success',
          data: alreadyCurentData
     })
   }else{
     return res.status(200).json({
          success: false,
          message: 'detail not found'
     });
   }
};