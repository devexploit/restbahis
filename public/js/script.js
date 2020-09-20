$(document).ready(function() {

        $('#myTable').DataTable();


        $("#userChange").on("click",function(e) {

          e.preventDefault();

          var id = $("#userId").val();
          var username = $("#changeUsername").val();
          var password =  $("#changePassword").val();
  
          $.ajax(
            {
                url :  "/edituser",
                method : "POST",
                datatype : "json",
                data : {
                  id : id,
                   username : username,
                   password : password
                },
                success:  function(msg) {
                    if (msg.redirect){
                        alertify.success
                        ("User bilgileri başarılı bir şekilde değiştirildi");
                        setInterval(function(){ 
                            location.href = msg.redirect;
                         }, 1500);
                    }
                    else {
                        alertify.error("Böyle bir kullanıcı yok");
                    }
                }
            }
        )
          

        })


        $("#newUser").on("click",function(e) {

          e.preventDefault();

          var username = $("#newUserUsername").val();
          var password =  $("#newUserPassword").val();
          
          $.ajax(
            {
                url :  "/userekle",
                method : "POST",
                datatype : "json",
                data : {
                   username : username,
                   password : password
                },
                success:  function(msg) {
                    if (msg){
                        alertify.success
                        ("User başarılı bir şekilde eklendi");
                        setInterval(function(){ 
                            location.href = msg.redirect;
                         }, 1500);
                    }
                    else {
                        alertify.fail("islem basarisiz")
                    }
                }
            }
        )

        })

        $(".kuponedit").on("click",function(e) {
          
          e.preventDefault();
          location.href = `/kupon/${this.id}`;
        })


        $("#editKupon").on("click",function(e){
          var kupon = [];
          e.preventDefault();
         var destroy_id = $("#editKuponId").val();

         var length = Number($("#kuponUzunluk").val());

         
         

         for(var i=0;i<length;i++){
          var lig =$(`#macForm${i+1} #lig${i+1}`).val();
          var macTarih = $(`#macForm${i+1} #macTarih${i+1}`).val();
          var birinciTakim = $(`#macForm${i+1} #birinciTakim${i+1}`).val();
          var ikinciTakim = $(`#macForm${i+1} #ikinciTakim${i+1}`).val();
          var  tahmin = $(`#macForm${i+1} #tahmin${i+1}`).val();
          var  oran = $(`#macForm${i+1} #oran${i+1}`).val();
          var  macYorum = $(`#macForm${i+1} #macYorum${i+1}`).val();
          var  durum = $(`#macForm${i+1} #macDurum${i+1}`).val();
          kupon.push({
              lig : lig, macTarih : macTarih, birinciTakim : birinciTakim, ikinciTakim : ikinciTakim, tahmin : tahmin , oran : oran, macYorum : macYorum, durum :durum
          })
         }
         
         if(lig !== "" &&  macTarih !== "" && birinciTakim !== "" && ikinciTakim !==  "" && tahmin !== ""  && oran !== "" && oran !==  "" && macYorum !== "" ){
        
          var kuponYorum = $("#kuponYorum").val();
          var kuponEkleyen = $("#kuponEkleyen").val(); 
          var kuponDurum = $("#kuponDurum").val();
            
          if(kuponYorum !== "" && kuponEkleyen != ""){

            $.ajax(
              {
                  url :  "/editkupon",
                  method : "POST",
                  datatype : "json",
                  data : {
                      id : destroy_id,
                      kupon : kupon,
                      kuponYorum : kuponYorum,  
                      kuponEkleyen:kuponEkleyen,
                      kuponDurum : kuponDurum
                  },
                  success:  function(msg) {
                      if (msg){
                          alertify.success
                          ("Kupon başarılı bir şekilde güncellendi");
                          setInterval(function(){ 
                              location.href = msg.redirect;
                           }, 1500);
                      }
                      else {
                          alertify.fail("islem basarisiz")
                      }
                  }
              }
          )

          }

          else {
            alertify.error("Alanlar doldurulmalıdır");
        }


        }
        else {
          alertify.error("Alanlar doldurulmalıdır");

        }

        })

   
    $("#kuponMacSayisi").on("click",function(e) {        
        var macsayisi = $(".macSayisi").val();
        if(macsayisi){
            for(var i=0; i<macsayisi; i++){
                $(".containeric").append(`<form class="mt-5" id="macForm${i+1}">
                <h4>-------------------------------${i+1}.MAC-------------------------------</h4>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Lig</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" required="true" name="lig" id="lig${i+1}">
                  </div>
                </div>
            
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Mac Tarihi</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" required="true" name="macTarih" id="macTarih${i+1}">
                  </div>
                </div>
            
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">1. Takım</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" required="true" name="birinciTakim"  id="birinciTakim${i+1}">
                    </div>
                  </div>
            
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">2. Takım</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" required="true" name="ikinciTakim"  id="ikinciTakim${i+1}">
                    </div>
                  </div>
            
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Tahmin</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" required="true" name="tahmin"  id="tahmin${i+1}">
                    </div>
                  </div>
            
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Oran</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" required="true" name="oran"  id="oran${i+1}">
                    </div>
                  </div>
            
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Yorum</label>
                    <div class="col-sm-10">
                        <textarea style="max-width: 100%;" name="comment" form="usrform" placeholder="Yorum..." cols="125" rows="4" name="macYorum" id="macYorum${i+1}"></textarea>
                    </div>
                  </div>
            
            
              </form>`);  
            } 

            $(".containeric").append(`<form class="mt-5"> 
            <h4>-------------------------------KUPON-------------------------------</h4>

            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Kupon Yorumu</label>
                <div class="col-sm-10">
                    <textarea style="max-width: 100%;" name="comment" form="usrform" placeholder="Yorum..." cols="125" rows="4" required="true" name="kuponYorum" id="kuponYorum" required = "true"></textarea>
                </div>
              </div>
        
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Kupon Ekleyen</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" required="true" name="kuponEkleyen" id="kuponEkleyen">
              </div>
            </div>        
            <button type="submit" class="btn btn-primary mb-2"  id="kuponEkle">Kupon Ekle</button>

          </form>
`)

$("#kuponEkle").on('click', function(en){ 
    var kupon = [];
    var kuponEkleyen = $("#kuponEkleyen").val();
    for(var i=0;i<Number(macsayisi);i++){
       var lig =$(`#macForm${i+1} #lig${i+1}`).val();
        var macTarih = $(`#macForm${i+1} #macTarih${i+1}`).val();
        var birinciTakim = $(`#macForm${i+1} #birinciTakim${i+1}`).val();
        var ikinciTakim = $(`#macForm${i+1} #ikinciTakim${i+1}`).val();
        var  tahmin = $(`#macForm${i+1} #tahmin${i+1}`).val();
        var  oran = $(`#macForm${i+1} #oran${i+1}`).val();
        var  macYorum = $(`#macForm${i+1} #macYorum${i+1}`).val();
        var  durum = 0;

        kupon.push({
            lig : lig, macTarih : macTarih, birinciTakim : birinciTakim, ikinciTakim : ikinciTakim, tahmin : tahmin , oran : oran, macYorum : macYorum, durum :durum
        })
      }
      
      if(lig !== "" &&  macTarih !== "" && birinciTakim !== "" && ikinciTakim !==  "" && tahmin !== ""  && oran !== "" && oran !==  "" && macYorum !== "" ){
        var kuponYorum = $("#kuponYorum").val();
        var kuponEkleyen = $("#kuponEkleyen").val(); 
        
        if(kuponYorum !== "" && kuponEkleyen != ""){
            $.ajax(
                {
                    url :  "/kuponekle",
                    method : "POST",
                    datatype : "json",
                    data : {
                        kupon : kupon,
                        kuponYorum : kuponYorum,
                        kuponEkleyen:kuponEkleyen
                    },
                    success:  function(msg) {
                        if (msg){
                            alertify.success
                            ("Kupon başarılı bir şekilde eklendi");
                            setInterval(function(){ 
                                location.href = msg.redirect;
                             }, 2000);
                        }
                        else {
                            alertify.error("islem basarisiz")
                        }
                    }
                }
            )
        }
        else {
            alertify.error("Alanlar doldurulmalıdır");
        }

       
               
    }   
    else {
        alertify.error("Alanlar doldurulmalıdır");
    }
    en.preventDefault(); 
})


e.preventDefault();      

    }
                 
    })
 
    $(".uyelik").on("click",function (e) {

      var destroy_id = $(this).attr('id');
      e.preventDefault();

      $.ajax({
        method: 'POST',
        url: '/deleteuser',
        data : {id : destroy_id},
        success:  function(msg) {
          if (msg){
              alertify.success
              ("User başarılı bir şekilde silindi");
              setInterval(function(){ 
                  location.href = msg.redirect;
               }, 2000);
          }
          else {
              alertify.error("islem basarisiz")
          }
      }
       });
       

     
  });

  $(".kupon").on("click",function (e) {

    var destroy_id = $(this).attr('id');
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/deletekupon',
      data : {id : destroy_id},
      success:  function(msg) {
        if (msg){
            alertify.success
            ("Kupon başarılı bir şekilde silindi");
            setInterval(function(){ 
                location.href = msg.redirect;
             }, 2000);
        }
        else {
            alertify.fail("islem basarisiz")
        }
    }
     });
    
   
});

});