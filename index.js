const express = require("express");
const app = express();
const port = process.env.PORT || 7070;
const mongoose = require("mongoose");
const path = require("path");
var connectionString = "mongodb://localhost:27017/iddaa";
var bodyParser = require("body-parser");
const iddaaRouter = require("./routes/iddaa");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const userRouter = require("./routes/account");
const Iddaa = require("./models/tahminler");
const cron = require("node-cron");

var Store = new  mongoDbStore ({
    uri : connectionString,
    collection : 'mySessions'
  })




app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret : "keyboard cat",
    resave  : true,
    saveUninitialized : false,
    cookie:{
      maxAge  :  3600000
    },
    store : Store
  }))


mongoose
.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify : false})
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(expressEjsLayouts);
app.set("layout","./layout/layout");
app.set("view engine","ejs");

app.use(userRouter);
app.use(iddaaRouter);

app.get("*",(req,res,next) => {
  return res.json({
    notification : "Kuponlar için /coupons get at"
  })
})


cron.schedule('0 1 * * *', () => {

  Iddaa.countDocuments()
  .then((size) => {
    return size;
  })
  .then((size) => {

    if(size >= 20){
      Iddaa.deleteOne()
      .then(() => {
        console.log("oka");
      })
    } 

  })


});

  app.listen(port, () => {
      console.info(`app listening on port ${port}`);
  })