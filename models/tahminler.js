const mongoose = require("mongoose");

mongoose.set("debug",true);
mongoose.Promise = Promise;

const tahminSchema = mongoose.Schema({

  kupon : [
      {
        lig : String,
        macTarih : String,
        birinciTakim : String,
        ikinciTakim : String,
        tahmin : String,
        oran : Number,
        macYorum : String,
        durum : String
      }
  ],
  kuponDurum : String,
  kuponYorum : String,
  kuponOran : Number,
  kuponEkleyen : String,
  kuponTarih : {
    type : Date,
    default : Date.now 
  },
  kuponTarih2 : String

})

module.exports = mongoose.model("Tahminler",tahminSchema);