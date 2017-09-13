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

  setTimeout(function(){
    loadGenres();
  }, 3000);

/*Register Service Funtion*/

function updateFanService(){

  var authuser = localStorage.getItem("user");
    
  user = JSON.parse(authuser);

  $.ajax({

          url: 'http://www.youlovemymusic.com/mobile/update/fan',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data:  JSON.stringify({
            country : $('#selectedcountry').val(),
            province: $('#selectedprovince').val()
          }),
          
          success: function(data) {

            if (data === 'Success') {
              window.location.href = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+user.id_wall+"&type=U";
            }else{
              console.log(user);
            }

          },
  });
}