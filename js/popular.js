var $loaderOverlay = $('.overlay-loader');

/*Find url variables*/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var typeToShow = getUrlParameter('type');

/*Load Content*/

function loadContent(type) {
 
  var artists = ''
  ,   bands = ''
  ,   all = ''
  ,   popular = '';

  $.ajax({
      url: 'http://www.youlovemymusic.com/showartists',
      type: 'GET',
      success: function(data) {
        var letter = '';

        for (var i = 0; i < data.artists.length; i++) {


          if( letter != data.artists[i].letter) {
              letter = data.artists[i].letter;
              artists +=
              '<li class="flex-to-left letter-title" id="'+letter+'">'+
              '<div class="alf-globa">'+
              '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
              '</div>'+
              '</li>';
          }


          artists +=
          '<div id="'+data.artists[i].letter+'">'+ 
          '<li class="to-left">'+
          '<a href="#'+data.artists[i].letter+'">'+
          '<a href="'+data.artists[i].route+'">'+
          '<div class="info-area to-left full-width">'+
          '<div class="artist-avatar-medium to-left" style="background: url('+data.artists[i].profile_pic+'); background-size: cover;"></div>'+
          '<h2 class="to-left artist-name">'+data.artists[i].name+'</h2>'+
          '</div>'+
          '</a>'+
          '</a>'+
          '</li>'+
          '</div>';

        }

        for (var i = 0; i < data.bands.length; i++) {


          if( letter != data.bands[i].letter) {
              letter = data.bands[i].letter;
              bands +=
              '<li class="flex-to-left letter-title" id="'+letter+'">'+
              '<div class="alf-globa">'+
              '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
              '</div>'+
              '</li>';
          }


          bands +=
          '<div id="'+data.bands[i].letter+'">'+
          '<li class="to-left">'+
          '<a href="#'+data.bands[i].letter+'">'+
          '<a href="'+data.bands[i].route+'">'+
          '<div class="info-area to-left full-width">'+
          '<div class="artist-avatar-medium to-left" style="background: url('+data.bands[i].profile_pic+'); background-size: cover;"></div>'+
          '<h2 class="to-left artist-name">'+data.bands[i].name+'</h2>'+
          '</div>'+
          '</a>'+
          '</a>'+
          '</li>'+
          '</div>';

        }

        for (var i = 0; i < data.all.length; i++) {


          if( letter != data.all[i].letter) {
              letter = data.all[i].letter;
              all +=
              '<li class="flex-to-left letter-title" id="'+letter+'">'+
              '<div class="alf-globa">'+
              '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
              '</div>'+
              '</li>';
          }


          all +=
          '<div id="'+data.all[i].letter+'">'+ 
          '<li class="to-left">'+
          '<a href="#'+data.all[i].letter+'">'+
          '<a href="'+data.all[i].route+'">'+
          '<div class="info-area to-left full-width">'+
          '<div class="artist-avatar-medium to-left" style="background: url('+data.all[i].profile_pic+'); background-size: cover;"></div>'+
          '<h2 class="to-left artist-name">'+data.all[i].name+'</h2>'+
          '</div>'+
          '</a>'+
          '</a>'+
          '</li>'+
          '</div>';

        }
        
        for (var i = 0; i < data.top3.length; i++) {

          popular += 
          '<li class="to-left">'+
          '<a href="'+data.top3[i].route+'">'+
          '<div class="info-area to-left full-width">'+
          '<div class="artist-avatar-medium to-left" style="background: url('+data.top3[i].profile_pic+'); background-size: cover;"></div>'+
          '<h2 class="to-left artist-name">'+data.top3[i].name+'</h2>'+
          '</div>'+
          '</a>'+
          '</li>';

        }


      },
  }).done(function(){

  
    if (type === 'S') {
      $('#title').text("Solistas");
      $("#append_artists").append(artists);
      $("#artists_list").removeClass("hidden");
      $('#wrapper').css('display', 'block');
    }
    if (type === 'B') {
      $('#title').text("Bandas");
      $("#append_bands").append(bands);
      $("#bands_list").removeClass("hidden");
	  $('#wrapper').css('display', 'block');
    }
    if (type === 'A') {
      $('#title').text("Todos");
      $("#append_all").append(all);
      $("#all_list").removeClass("hidden");
      $('#wrapper').css('display', 'block');
    }
    if (type === 'P') {
      $('#title').text("Más populares");
      $("#append_popular").append(popular);
      $("#popular_list").removeClass("hidden");
      $('#wrapper').css('display', 'none');
 
    }
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });
}

/*Funtion Calls*/
  loadContent(typeToShow);
