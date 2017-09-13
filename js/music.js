var $loaderOverlay = $('.overlay-loader')
,   videos = ''
,   user = localStorage.getItem("user")
,   user = JSON.parse(user)
,   letter = '';

/*Load Top 3*/

function videosFavoritos() {

  $.ajax({
      url: 'http://www.youlovemymusic.com/favoritesVideosService?id='+user.id,
      type: 'GET',
      success: function(data) {

       data = JSON.parse(data);

       if (data.videos.length != null) {

        $('#wrapper').css('cssText', 'display: block !important;');

        for (var i = 0; i < data.videos.length; i++) {

          if( letter != data.videos[i].letter) {
          letter = data.videos[i].letter;
          videos +=
          '<li class="flex-to-left letter-title border-bottom" id="'+letter+'">'+
          '<div class="alf-globa">'+
          '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
          '</div>'+
          '</li>';
          }

          videos += 
          '<li class="to-left border-bottom">'+
          '<div class="image to-left">'+
          '<img src="'+data.videos[i].img+'" style="width: 100%;">'+
          '</div>'+
          '<div class="info-area to-left">'+
          '<h2>'+data.videos[i].song+'</h2>'+
          '<a href="'+data.videos[i].route_art+'">'+
          '<span>'+data.videos[i].artist+'</span>'+
          '</a>'+
          '</div>'+
          '<a href="'+data.videos[i].route+'"><div class="icon-play"></div></a>'+
          '</li>';

        }

       }

      if (data.length == null) {

          $('#wrapper').css('cssText', 'display: none !important;');

       }

      },
  }).done(function(){

  	  $("#append_videos").append(videos);
      $('.icon-play').css('right', '12.5%');
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });
}

/*Funtion Calls*/
  videosFavoritos();
