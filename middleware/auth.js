const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log('tttttttttttttttttttttttttttttttttttttttttttt :>> ', req.headers);
  try {
    var token = req.headers.authorization.split(" ")[1];
    var decode = jwt.verify(token, "secret");
    req.userData = decode;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
};
