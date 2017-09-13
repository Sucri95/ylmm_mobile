var $loaderOverlay = $('.overlay-loader');

/*Close messages alerts*/

$('.close-messages').on('click', function () {
  $('.messages').css('display', 'none');
});

/*Return to Home*/

$('.bottom-back').on('click', function () {
  window.location.href = "http://www.youlovemymusic.com/mobile_app/login.html";
});

/*Login Service Funtion*/

/*Show hidden inputs*/

$('#country').on('change', function (){

  var z = $( "#country option:selected" ).text();

  if (z === 'Argentina') {

    $('#argprovince').css('display', 'block');
    $('#departamentos').css('display', 'none');
    $('#selectedcountry').val('Argentina'); 

  }else if(z === 'Uruguay'){

    $('#departamentos').css('display', 'block');
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

        $("#id_genre").append(genres);
      },
  });
}

/*Funtion Calls*/

  setTimeout(function(){
    loadGenres();
    $loaderOverlay.fadeOut('slow');
  }, 3000);

/*Register Service Funtion*/

function registerService(){

  $.ajax({

          url: 'http://www.youlovemymusic.com/mobile/register/app',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data:  JSON.stringify({
            name    : $('#name').val(),
            email   : $('#email').val(),
            type    : $('#type').val(),
            id_genre: $('#id_genre').val(),
            zipcode : $('#zipcode').val(), 
            password: $('#password').val(),
            country : $('#selectedcountry').val(),
            province: $('#selectedprovince').val()
          }),
          
          success: function(data) {

            if (data === 'Success') {
              $('#msg3').css('display', 'block');
                setTimeout(function(){
                  window.location.href = "http://www.youlovemymusic.com/mobile_app/login.html";
                }, 5000);
            }else if (data === 'msg1') {
              $('#msg1').css('display', 'block');
            }else if (data === 'msg2') {
              $('#msg2').css('display', 'block');
            }
           
          }
  }).done(function() {
      $loaderOverlay.fadeOut('slow');
  });
}