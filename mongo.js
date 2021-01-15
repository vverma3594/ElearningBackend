// require("dotenv").config();
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URI);
var mongodbErrorHandler = require("mongoose-mongodb-errors");
mongoose.Promise = global.Promise;
mongoose.plugin(mongodbErrorHandler);
mongoose.connect('mongodb://127.0.0.1:27017/eduruclasses',(error, client) => {
    if (error) {
        console.log('error :', error)
    }
else{
    console.log("db conected succesfully")
}
})