var $loaderOverlay = $('.overlay-loader');
/*Close messages alerts*/

$('.close-messages').on('click', function () {
  $('.messages').css('display', 'none');
});

/*Return to Home*/

$('.bottom-back').on('click', function () {
  window.history.back();
});

/*Load Authentificated User*/

function loadAuthUser() {
  $.ajax({
      url: host+'auth/user',
      type: 'GET',
      success: function(data) {

        if (data != '') {

          localStorage.setItem("auth", "true");
          localStorage.setItem("user", data);

        }

      },
  });
}

/*Select placeholders*/

  $('select#register-genero').select2({
    placeholder: "Género Musicales",
    //maximumSelectionLength: 1,
    allowClear: true
  });

  $('select#register-rol').select2({
    placeholder: "Instrumentos",
    //maximumSelectionLength: 1,
    allowClear: true
  });

/*Hide caret from selects IE*/
$(document).on('ready', function() {
  
  $('.select2-search__field').mousedown(function(e){
    e.preventDefault();
    $(this).blur();
    return false;
  });

});

/*Display hidden inputs from rol select*/

  $("#register-rol").on("change", function () {

    $(this)
      .siblings('.select2')
      .children('.selection')
      .children('.select2-selection')
      .children('.select2-selection__rendered')
      .children('.select2-selection__choice')
      .css("cssText", "width: auto !important;");

    $(this)
      .siblings('.select2')
      .children('.selection')
      .children('.select2-selection')
      .children('.select2-selection__rendered')
      .children('.select2-search.select2-search--inline')
      .css("cssText", "width: auto !important;");


      var z = $(this)
              .siblings('.select2')
              .children('.selection')
              .children('.select2-selection')
              .children('.select2-selection__rendered')
              .children('.select2-search')
              .children('.select2-search__field');

      var li = $(this)
                .siblings('.select2')
                .children('.selection')
                .children('.select2-selection')
                .children('.select2-selection__rendered')
                .children('.select2-selection__choice');

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

          if (yus[1] === 'CUERDA') {

            $('#cuerda').css('display', 'block');

              if ($('#viento').val() === '') {

                $('#viento').css('display', 'none');

              }
            
              if ($('#otro').val() === '') {

                $('#otro').css('display', 'none');

              }

          }

          if (yus[1] === 'VIENTO') {

            $('#viento').css('display', 'block');

            if ($('#otro').val() === '') {

              $('#otro').css('display', 'none');

            }

            if ($('#cuerda').val() === '') {

              $('#cuerda').css('display', 'none');

            }
          }

          if (yus[1] === 'OTRO') {
          
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

/*Display hidden inputs from genres select*/

  $("#register-genero").on("change", function () {

    $(this)
      .siblings('.select2')
      .children('.selection')
      .children('.select2-selection')
      .children('.select2-selection__rendered')
      .children('.select2-selection__choice')
      .css("cssText", "width: auto !important;");

    $(this)
      .siblings('.select2')
      .children('.selection')
      .children('.select2-selection')
      .children('.select2-selection__rendered')
      .children('.select2-search.select2-search--inline')
      .css("cssText", "width: auto !important;");

    
    var z = $(this)
            .siblings('.select2')
            .children('.selection')
            .children('.select2-selection')
            .children('.select2-selection__rendered')
            .children('.select2-search')
            .children('.select2-search__field');

    var li = $(this)
              .siblings('.select2')
              .children('.selection')
              .children('.select2-selection')
              .children('.select2-selection__rendered')
              .children('.select2-selection__choice');

    
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


/*Close messages alerts*/

$('.close-messages').on('click', function () {
  $('.messages').css('display', 'none');
});

/*Login Service Funtion*/

/*Show hidden inputs*/

$('#country').on('change', function (){

  var z = $( "#country option:selected" ).text();

  if (z === 'Argentina') {

    $('#argprovince').css('display', 'block');
    $('#argprovince').toggleClass('hidden');
    $('#departamentos').css('display', 'none');
    $('#selectedcountry').val('Argentina'); 

  }else if(z === 'Uruguay'){

    $('#departamentos').css('display', 'block');
    $('#departamentos').toggleClass('hidden');
    $('#argprovince').css('display', 'none');
    $('#selectedcountry').val('Uruguay');

  }

  $('#zipcode').css('display', 'block');

});


$('#argprovince').on('change', function (){

  var y = $( "#argprovince option:selected" ).text();
  $('#selectedprovince').val(y); 


});

$('#departamentos').on('change', function (){

  var x = $( "#departamentos option:selected" ).text();
  $('#selectedprovince').val(x);

});

/*Load Genres*/

function loadGenres() {
  $.ajax({
      url: 'http://www.youlovemymusic.com/genresService',
      type: 'GET',
      success: function(data) {
        genres = '';
        for (var i = 0; i < data.length; i++) {
          genres += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
          }

        $("#register-genero").append(genres);
      },
  });
}

/*Funtion Calls*/

$(document).ready(function() {
  
  var authuser = localStorage.getItem("user");  
  user = JSON.parse(authuser);


  setTimeout(function(){
    $('#name').val(user.name);
    $loaderOverlay.fadeOut('slow');   
  }, 400);
});

/*Register Service Funtion*/

function registerMusicianService(){

  var authuser = localStorage.getItem("user");
    
  user = JSON.parse(authuser);
  $loaderOverlay.fadeIn('slow');

  $.ajax({

          url: 'http://www.youlovemymusic.com/mobile/update/musician',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data:  JSON.stringify({
            name    : $('#name').val(),
            id_genre: $('#register-genero').val(),
            other   : $('#other').val(),
            role    : $('#register-rol').val(),
            cuerda  : $('#cuerda').val(), 
            viento  : $('#viento').val(),
            otro    : $('#otro').val()
          }),
          
          success: function(data) {

            if (data == 'Success') {
              window.location.href = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+user.id_wall+"&type=M";
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