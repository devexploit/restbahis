const express = require("express");
const routes = express.Router();
const Iddaa = require("../controllers/iddaa")

routes.get("/kuponekle", Iddaa.getKuponEkle)
routes.post("/kuponekle", Iddaa.postKuponEkle);
routes.get("/kuponlar",Iddaa.getKupon);
routes.get("/coupons",Iddaa.getCouponsJson)
routes.get("/coupons/:id",Iddaa.getCouponsJsonParams)
routes.post("/deletekupon",Iddaa.deleteKupon);

routes.post("/editkupon",Iddaa.editKuponDetails);
routes.get("/kupon/:id",Iddaa.getKuponDetails);


module.exports = routes;