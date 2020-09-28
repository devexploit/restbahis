const User = require("../models/uyeler");

exports.getLoginPage = ((req,res,next) => {

    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;

    if(req.session.user){
       return res.redirect("/kuponlar");
    }

  return res.render("login" , {
        title : "Giris Sayfasi",
        errorMessage: errorMessage,
        user  : req.session.user
    });

})

exports.getLogout = ((req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/coupons');
    });
})

exports.postLoginPage = ((req,res,next)=> {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username : username, password:password})
    .then((user) => {
        if (!user) {
            req.session.errorMessage = 'Girilen bilgilerle eşleşen bir hesap bulunamamıştır.';
            req.session.save(function (err) {
                return res.redirect('/loginpage');
            })
        }
        else{
            req.session.user = user;
        return req.session.save(function (err) {
            return res.redirect("/kuponlar");  
         });
        }
        
       
    }).catch((err)=>next());

})


exports.getUyelik = ((req,res,next) => {


    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    User.find()
    .then((users) => {
        return res.render("uyelik",{title : "uyelik islemleri",users : users, user : req.session.user});

    })  

})


exports.deleteUser = ((req,res,next) => {
    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    
    User.deleteOne({_id : req.body.id})
    .then(() => {
        return res.json({
            redirect : "uyeler"
        })
    })
    
 

})


exports.addUser = ((req,res,next) => {
    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    User.findOne({username : req.body.username})
    .then((user) => {
        if(user){
            return res.json(
                {
                    message: "user zaten var"
                }
            )
        }

        const newUser = new User({
            username : req.body.username,
            password : req.body.password
        })

        newUser.save();

        return res.json({
            redirect : "uyeler"
        })
    })


       
  

})


exports.editUser = ((req,res,next) => {

    if(!req.session.user){
        return res.json({
            notification : "Kuponlar için /coupons get at"
          })
    }

    username = req.body.username;
    password = req.body.password;

    User.findOne({_id : req.body.id})
    .then((user) => {
        if(!user){
            return res.json({
                hata : "kullanici yok"
            })
        }
        user.username = username;
        user.password = password;

        user.save()
            return res.json({
                redirect : "/uyeler"
            })
        
    })

})

exports.getUserDetails = ((req,res,next) => {
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


    User.findById(req.params.id)
    .then((user) => {
        if(!user){
            return res.json({
                notification : "Kuponlar için /coupons get at"
              })
        }
        return res.render("uyelikdetails", {title : "Üye Detay", user:req.session.user, targetUser  : user})
    })
})