const mongoose = require("mongoose");
const Registration = mongoose.model("registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res, next) => {
    console.log('req.body :>> ', req.body);

  let obj={
    user_name:req.body.email
  }
  await Registration.find({ user_name: obj.user_name })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(404).json({ message: "Authentication failed", });
      } else {
          
        bcrypt.compare(
          req.body.password,
          user[0].Password,
          function (err, result) {
            if (err) {
              return res.status(404).json({ success: false,  message: "Authentication failed"});
            }
            if (result) {
              var token = jwt.sign(
                {
                  user_name: user[0].user_name,
                  email: user[0].email,
                },
                "secret",
                {
                  expiresIn: "1h",
                }
              );
              res.status(200).json({
                success: true, 
                message: "login successfull",
                token: token,
                data: user[0]._id
              });
            } else {
              res.status(404).json({
                success: false, 
                message: "Authentication failed",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
        console.log('err -------------------------------:>>', err)
      res.json({
        error: err,
      });
    });
};
