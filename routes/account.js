const express = require("express");
const routes = express.Router();
const User = require("../controllers/account")

routes.get("/loginpage",User.getLoginPage);
routes.post("/login",User.postLoginPage);
routes.get("/uyeler",User.getUyelik);
routes.post("/deleteuser",User.deleteUser);
routes.get('/logout',User.getLogout);
routes.post("/userekle",User.addUser);
routes.get("/user/:id",User.getUserDetails);
routes.post("/edituser",User.editUser);


module.exports = routes;