var $loaderOverlay = $('.overlay-loader');

/*Load Genres*/

function loadGenres() {
  $.ajax({
      url: 'http://www.youlovemymusic.com/genresService',
      type: 'GET',
      success: function(data) {
        genres = '';
        for (var i = 0; i < data.length; i++) {

          if (data[i].name === 'ROCK') {
            
            genres += 
            '<a href="musicbygenres.html?type=ROCK">'+
            '<li class="'+data[i].color+'">'+
            '<div class="info-area text-center">'+
            '<h2>'+data[i].name+'</h2>'+
            '</div>'+
            '</li>'+
            '</a>';

          }
          if (data[i].name === 'POP') {
            genres += 
              '<a href="musicbygenres.html?type=POP">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'ELECTRONICA') {
            genres += 
              '<a href="musicbygenres.html?type=ELECTRONIC">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'FOLCLORE') {
            genres += 
              '<a href="musicbygenres.html?type=FOLCLORE">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'HIP HOP') {
            genres += 
              '<a href="musicbygenres.html?type=HIPHOP">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'JAZZ') {
            genres += 
              '<a href="musicbygenres.html?type=JAZZ">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'TANGO') {
            genres += 
              '<a href="musicbygenres.html?type=TANGO">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'REGGAE') {
            genres += 
              '<a href="musicbygenres.html?type=REGGAE">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'URBANA') {
            genres += 
              '<a href="musicbygenres.html?type=URBANA">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'HEAVY METAL') {
            genres += 
              '<a href="musicbygenres.html?type=HEAVYMETAL">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }
          if (data[i].name === 'CUMBIA') {
            genres += 
              '<a href="musicbygenres.html?type=CUMBIA">'+
              '<li class="'+data[i].color+'">'+
              '<div class="info-area text-center">'+
              '<h2>'+data[i].name+'</h2>'+
              '</div>'+
              '</li>'+
              '</a>';
          }

        }
        genres += 
          '<a href="musicbygenres.html?type=OTHER">'+
          '<li class="genres-other">'+
          '<div class="info-area text-center">'+
          '<h2>OTROS</h2>'+
          '</div>'+
          '</li>'+
          '</a>';

        $("#load_genres").append(genres);
      },
  }).done(function(){
      setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
      },3000);
  });
}

/*Hover genres div*/

$('#load_genres li').mouseenter(function() {
  $(this).addClass('active');
});

/*Funtion Calls*/
  loadGenres();
