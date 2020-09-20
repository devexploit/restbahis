const mongoose = require("mongoose");

mongoose.set("debug",true);
mongoose.Promise = Promise;

const uyelerSchema = mongoose.Schema({


    username : String,
    password : String


})

module.exports = mongoose.model("Uyeler",uyelerSchema);