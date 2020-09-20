const Iddaa = require("../models/tahminler");


exports.getKupon = ((req,res,next)  => {
    var arr = [];

   
    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    Iddaa.find().sort({_id:-1})
    .then((kuponlar) => {
       for(var i=0;i<kuponlar.length;i++){
          kupon = kuponlar[i].kupon;
          for(var j=0;j<kupon.length;j++){
              arr.push({kupon:kupon[j], id : kuponlar[i]._id});
          }
       }
        return res.render(
            "kuponlar", {title : "Kuponlar", kuponlar : kuponlar, kupon : arr, user : req.session.user}
        )
        // res.json({
        //     kupon : arr
        // })
    })

})

exports.getKuponEkle = ((req,res,next) => {

  
    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    res.render("kuponekle",  {title : "Kupon Mac Sayisi", user: req.session.user});


})


exports.postKuponEkle = ((req,res,next) => {

    
    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    var date = new Date();

    var yil = date.getFullYear();
    var ay = date.getMonth() +1;
    var gun = date.getDate();
    var saat = date.getHours();
    var dakika = date.getMinutes();


    if(ay < 10){
        ay = "0" + ay;
    }
    if(gun < 10) {
        gun = "0" + gun;
    }
    if(saat < 10) {
        saat = "0" + saat;
    }
    if(dakika < 10) {
        dakika = "0" + dakika;
    }

    tarih = `${gun}/${ay}/${yil} ${saat}:${dakika}`
    

    var kupon = req.body.kupon;
    var kuponYorum = req.body.kuponYorum;
    var kuponEkleyen = req.body.kuponEkleyen;

    var kuponOran = 1;
    kupon.forEach(element => {
        kuponOran *= element.oran;
    });
    
    const Kupon = new Iddaa({
        kupon : kupon,
        kuponYorum : kuponYorum,
        kuponEkleyen : kuponEkleyen,
        kuponDurum : 0,
        kuponOran : kuponOran,
        kuponTarih2 : tarih


    })
    Kupon.save();

        return res.json({
            redirect : "kuponekle"
        })
    
})


exports.getCouponsJson = ((req,res,next) => {
    Iddaa.find().sort({_id:-1})   
    .then((coupons) => {
        res.json({
            coupons : coupons
        })
    })
})



exports.getCouponsJsonParams = ((req,res,next) => {
   
    if(req.params.id.length !== 24){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    Iddaa.findOne({_id : req.params.id})
    
    .then((coupons) => {
        
        if(!coupons){
            return res.json({
                notification : "Kuponlar için /coupons get at"
              })
        }
        Iddaa.findById(req.params.id)
        .then((content) =>  {
        res.json({
            coupon : content
        })
    })
    })

})

exports.deleteKupon = ((req,res,next) => {

    var id = req.body.id;

    Iddaa.deleteOne({_id : id})
    .then(() => {
        return res.json({
            redirect : "kuponlar"
        })
    })

})

exports.getKuponDetails = ((req,res,next) => {

    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    if(req.params.id.length !== 24){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }


    Iddaa.findById(req.params.id)
    .then((kupon) => {
        if(!kupon){
            return res.json({
                notification : "Kuponlar için /coupons get at"
              })
        }
        return res.render("kupondetails", {title : "Kupon Detay", user:req.session.user,kupon : kupon })
    })

})

exports.editKuponDetails = ((req,res,next) => {

    var id = req.body.id;

    var kupon = req.body.kupon;

    Iddaa.findOne({_id : id})
    .then((kupons) => {
        kupons.kuponOran = 1;
      for(var i=0;i<kupons.kupon.length;i++){
           kupons.kupon[i].lig = kupon[i].lig;
           kupons.kupon[i].macTarih = kupon[i].macTarih;
           kupons.kupon[i].birinciTakim = kupon[i].birinciTakim;
           kupons.kupon[i].ikinciTakim = kupon[i].ikinciTakim;
           kupons.kupon[i].tahmin = kupon[i].tahmin;
           kupons.kupon[i].oran = kupon[i].oran;
           kupons.kupon[i].macYorum  = kupon[i].macYorum;
           kupons.kupon[i].durum = kupon[i].durum;

        kupons.kuponOran *= kupon[i].oran;

      }
    
      kupons.kuponYorum = req.body.kuponYorum;
      kupons.kuponEkleyen = req.body.kuponEkleyen;
      kupons.kuponDurum = req.body.kuponDurum;

     return kupons.save()
     .then(()  => {
        return res.json({
            redirect : "/kuponlar"
        })
     })

    })




})

