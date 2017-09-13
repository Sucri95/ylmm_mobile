var $loaderOverlay = $('.overlay-loader');
/*Close messages alerts*/

$('.close-messages').on('click', function () {
  $('.messages').css('display', 'none');
});

/*Return to Home*/

$('.bottom-back').on('click', function () {
  window.history.back();
});

$('#register-pais').on('change', function (){

  var z = $( "#register-pais option:selected" ).text();

  if (z === 'Argentina') {

    $('#register-provincia').css('display', 'block');
    $('#departamentos').css('display', 'none');
    $('#selectedcountry').val('Argentina'); 
  
  }else if(z === 'Uruguay'){
  
    $('#departamentos').css('display', 'block');
    $('#register-provincia').css('display', 'none');
    $('#selectedcountry').val('Uruguay');
  }

});


$('#register-provincia').on('change', function (){

  var y = $( "#register-provincia option:selected" ).text();

    $('#selectedprovince').val(y); 
  

});

$('#departamentos').on('change', function (){

  var x = $( "#departamentos option:selected" ).text();

    $('#selectedprovince').val(x);

});

$(".js-example-basic-multiple").select2({
  placeholder:'Géneros Musicales'
});

  $('.load-avatar').on('click',function(){
     $('.load_img').trigger('click'); 
  });

  $(".load_img").change(function(){
      showMyImage(this);
  });

var roles = 0;
var this_input = '';

$(".js-example-basic-multiple2").select2({
  placeholder:'¿Cuál es su rol en la banda?'
});

$(".js-example-basic-multiple3").select2({
  placeholder:'¿Cuál es tu rol como músico?'
});

agregar();

function agregar(){

  $(".integrante")
  .append('<div class="contenedor">'+
    '<select class="js-example-basic-multiple2" multiple="multiple" id="role-'+roles+'" name="role_'+roles+'[]">'+
    '<option value="VOZ">Voz</option>'+
    '<option value="CORO">Coro</option>'+
    '<option value="PIANO">Piano</option>'+
    '<option value="TECLADOS">Teclados</option>'+
    '<option value="GUITARRA">Guitarra</option>'+
    '<option value="BAJO">Bajo</option>'+
    '<option value="BATERÍA">Batería</option>'+
    '<option value="PERCUSIÓN">Percusión</option>'+
    '<option value="CUERDA">Cuerda</option>'+
    '<option value="VIENTO">Viento</option>'+
    '<option value="OTRO">Otro</option>'+
    '<option value="PRODUCTOR MUSICAL">Productor musical</option>'+
    '</select>'+
    '<input class="input-type-1 hidden inputs-hidden" id="cuerda" name="cuerda_'+roles+'" placeholder="¿Qué tipo de cuerda?">'+
    '<input class="input-type-1 hidden inputs-hidden" id="viento" name="viento_'+roles+'" placeholder="¿Qué tipo de viento?">'+
    '<input class="input-type-1 hidden inputs-hidden" id="otro" name="otro_'+roles+'" placeholder="¿Cuál?">'+
    '<input class="input-type-search-members input-type-1" type="text" name="id_user" placeholder="Sumar Integrante" autocomplete="off">'+
    '<div class="buscador buscador-integrantes" style="border-top: none; ">'+
    '<div class="boton" onclick="agregar();"></div><ul></ul></div>'+
    '</div>');

      roles += 1;

      $(".js-example-basic-multiple2").select2({
        placeholder:'¿Cuál es su rol en la banda?'
      }); 


      $(".input-type-search-members").keyup(function (e) {
          e.preventDefault();
          search_members(this);
          this_input = this;
      });

      $(".input-type-search-members").focusin(function (e) {
         e.preventDefault();
         search_members($(this));
         this_input = this;
      });

      $(".input-type-search-members").focusout(function(){
         setTimeout(function(){$('.buscador ul').empty();},400);
      });

}


    function getData(inte) {
      
      $(this_input).val('').val(inte); 
     
      var x = document.getElementsByName("id_user");
      var z = document.getElementsByClassName("js-example-basic-multiple2");

      var qroles  = $(z).length;
      var members = '';

      $(x).each( function(index, item) {
        if(members === '') {
            members = $(item).val();
          } else {
            members = members+"__"+$(item).val();
          }
      });

      $('#user_array').val('');
      $('#user_array').val(members);

      $('#number_array').val('');
      $('#number_array').val(qroles);

    }

$(".js-example-basic-multiple2").on("change", function () {


  var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
  var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

  if ($(li).length > 0) {

    $(z).css("cssText", "display: none !important;");

  }else{

    $(z).css("cssText", "display: block !important;");
  }
  
  setTimeout(function(){
  
  var j = $(".select2-selection__choice");

      $(j).each( function(index, item) {

        var yu = $(item).text();
         var yus = yu.split("×");



         if (yus[1] === 'Cuerda') {
              
              $('#cuerda').css('display', 'block');
              
              if ($('#viento').val() === '') {

                $('#viento').css('display', 'none');

              }
              if ($('#otro').val() === '') {

                $('#otro').css('display', 'none');
                
              }

              
            }

             if (yus[1] === 'Viento') {

              $('#viento').css('display', 'block');

              if ($('#otro').val() === '') {

                $('#otro').css('display', 'none');
                
              }
              if ($('#cuerda').val() === '') {

                $('#cuerda').css('display', 'none');
                
              }
            }

             if (yus[1] === 'Otro') {
              $('#otro').css('display', 'block');
              
              if ($('#viento').val() === '') {

                $('#viento').css('display', 'none');

              }
              
              if ($('#cuerda').val() === '') {

                $('#cuerda').css('display', 'none');
                
              }
            }
      });

 }, 300);
   
});

/*-------------------------Delete Tags----------------------------*/
	$(document).on('click', '.select2-selection__choice' ,function() {

		var title = $(this).text();
		title = title.split("×");

		if (title[1] === 'OTRO') {

			$('#other').css('display', 'none');
			$('#other').val('');

		}


		if (title[1] === 'Otro') {

			$('#otro').css('display', 'none');
			$('#otro').val('');

		}


		if (title[1] === 'Cuerda') {

			$('#cuerda').css('display', 'none');
			$('#cuerda').val('');

		}


		if (title[1] === 'Viento') {

			$('#viento').css('display', 'none');
			$('#viento').val('');

		}
		
	});
/*-------------------------Delete Tags----------------------------*/

$("#register-genero").on("change", function () {

    var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
    var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

    if ($(li).length > 0) {

      $(z).css("cssText", "display: none !important;");

    }else{

      $(z).css("cssText", "display: block !important;");
    }
    
    setTimeout(function(){
    
    var j = $(".select2-selection__choice");
        $(j).each( function(index, item) {

          var yu = $(item).text();
           var yus = yu.split("×");


               if (yus[1] === 'OTRO') {
                $('#other').css('display', 'block');
                
              }
        });

   }, 300);
  });

    function search_members(elm) {
       
        var members = $(elm).val();

        $.get('http://www.youlovemymusic.com/search_members?members='+ members, function (data) { 
          
          var cont = 0;

          $('.buscador ul li').remove();

          $.each(data, function(index, item) {
           
            cont = 0;
            
            $.each(item, function(index2, item2) { 
              if (cont < 3) {
              
                  var type = ''
                    , name = ''
                    , image = ''
                    , email = '';
                  
                if (index === 'user') {
                      type = 'User';
                      img =  item2.profile_pic;
                      name = item2.name;
                      email = item2.email;

                   $(elm).next('.buscador').children('ul')
                   .append('<li onClick="getData(\'' + email + '\')"> <a href="javascript:;"> <div class="img-section"> <img src="'+img+'"> </div> <div class="data-section"><p>'+name+'</p><span>'+email+'</span></div></a></li>');
                  

                }

                cont = cont + 1;
              }

           });
            
          });      


    });

  }



  function showMyImage(fileInput) {
        var files = fileInput.files;

        $('.load-avatar').empty();
  

        for (var i = 0; i < files.length; i++) {           
            
            var file = files[i];
            
            var imageType = /image.*/;     
            
            if (!file.type.match(imageType)) {
                continue;
            }           
          
           
           var img=document.getElementById("load-avatar");      

            img.file = file;    
            var reader = new FileReader();
            reader.onload = (function(aImg) { 

                return function(e) { 
                  //aImg.src = e.target.result; 
                  $('#load-avatar').css({
                    'background': 'url('+e.target.result+')',
                    'background-size': 'cover'
                  })
                }; 
            })(img);
            reader.readAsDataURL(file);
        }    

    }

$('.close-messages').on('click', function () {
    
    $('.messages').css('display', 'none');

  });


function onSeen(id)
    {     

      $.get('/seen?id='+id, function (response) {

        if (response == 1) {

          console.log('¡!');

        }else{

          console.log(response);
        }
      });


    }

/*Register Service Funtion*/

function registerBandService(){

  var authuser = localStorage.getItem("user");
    
  user = JSON.parse(authuser);

  $loaderOverlay.fadeIn('slow');

  $.ajax({

          url: 'http://www.youlovemymusic.com/mobile/create/band',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data:  JSON.stringify({
            name        : $('#name').val(),
            id_genre    : $('#register-genero').val(),
            user_array  : $('#user_array').val(),
            qcuerdas    : $('#qcuerdas').val(),
            qvientos    : $('#qvientos').val(), 
            qotros      : $('#qotros').val(),
            number_array: $('#number_array').val()
          }),

          
          success: function(data) {

            if (data != 'msg1' && data != 'msg2') {
              window.location.href = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+data+"&type=B";
            }

            if (data == 'msg1') {
              $('#msg1').css('display', 'block');
            }

            if (data == 'msg2') {
              $('#msg2').css('display', 'block');
            }
           
          }
  });
}

/*Funtion Calls*/

$(document).ready(function() {

  setTimeout(function(){
    $loaderOverlay.fadeOut('slow');   
  }, 400);

});
