const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
     // bcryptPass : async (req, res) => {
          bcryptPass:(pass)=>{
               return new Promise((resolve, reject) => {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                         bcrypt.hash(pass, salt, function (err, hash) {
                              if (err) {
                                   resolve(false)
                                   return
                              }
                              resolve(hash)
                         });
                    });
               })
          }



}