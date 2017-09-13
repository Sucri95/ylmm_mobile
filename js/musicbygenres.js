var $loaderOverlay = $('.overlay-loader');
var videos = '';
var videosF = '';

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

var type = getUrlParameter('type');

if (type === 'HIPHOP') {
  type = 'HIP HOP';
}
if (type === 'HEAVYMETAL') {
  type = 'HEAVY METAL';
}

/*Load Artists*/

var letter = '';

function loadByGenres() {

  var position = [];
  $.ajax({
      url: 'http://www.youlovemymusic.com/artists_genre',
      type: 'GET',
      success: function(data) {

          for (var i = 0; i < data.byAlf.length; i++) {
          
            for (var j = 0; j <  data.byAlf[i].genres.length; j++) {

              if (data.byAlf[i].genres[j] === type && type != 'OTHER') {


                if( letter != data.byAlf[i].letter) {
                    letter = data.byAlf[i].letter;
                    videos +=
	              '<li class="flex-to-left letter-title" id="'+letter+'">'+
	              '<div class="alf-globa">'+
	              '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
	              '</div>'+
	              '</li>';
                }


                videos += 
                '<div id="'+data.byAlf[i].letter+'">'+
                '<a href="'+data.byAlf[i].route+'"><li class="to-left">'+
                '<div class="image to-left" style="background: url('+data.byAlf[i].profile_pic+'); background-size: cover;">'+
                '</div>'+
                '<div class="info-area to-left">'+
                '<h2>'+data.byAlf[i].name+'</h2>'+
                '</div>'+
                '</li></a>'+
                '</div>';



              }else if (type === 'OTHER' && data.byAlf[i].genres[j] != 'ROCK'
                        && data.byAlf[i].genres[j] != 'POP' && data.byAlf[i].genres[j] != 'ELECTRONIC'
                        && data.byAlf[i].genres[j] != 'FOLCLORE' && data.byAlf[i].genres[j] != 'HIP HOP'
                        && data.byAlf[i].genres[j] != 'JAZZ' && data.byAlf[i].genres[j] != 'TANGO'
                        && data.byAlf[i].genres[j] != 'REGGAE' && data.byAlf[i].genres[j] != 'URBANA'
                        && data.byAlf[i].genres[j] != 'HEAVY METAL' && data.byAlf[i].genres[j] != 'CUMBIA') {

                if(position.length == 0) {
                  position = i;
                } else {
                    position = position+","+i;
                }

              }

            }
          }

          if (type === 'OTHER') {

            var artists = position.split(',');

            var uniqueNames = [];
            
            $.each(artists, function(i, el){
             if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            for (var i = 0; i < uniqueNames.length; i++) {

                if( letter != data.byAlf[uniqueNames[i]].letter) {
                    letter = data.byAlf[uniqueNames[i]].letter;
                    videos +=
	              '<li class="flex-to-left letter-title" id="'+letter+'">'+
	              '<div class="alf-globa">'+
	              '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
	              '</div>'+
	              '</li>';
                }

                  videos += 
                  '<div id="'+data.byAlf[uniqueNames[i]].letter+'">'+
                  '<a href="'+data.byAlf[i].route+'"><li class="to-left">'+
                  '<div class="image to-left" style="background: url('+data.byAlf[uniqueNames[i]].profile_pic+'); background-size: cover;">'+
                  '</div>'+
                  '<div class="info-area to-left">'+
                  '<h2>'+data.byAlf[uniqueNames[i]].name+'</h2>'+
                  '</div>'+
                  '</li></a>'+
                  '</div>';

            }
          }
    
    /*By Followers*/

           for (var i = 0; i < data.byFw.length; i++) {
          
            for (var j = 0; j <  data.byFw[i].genres.length; j++) {

              if (data.byFw[i].genres[j] === type && type != 'OTHER') {

                videosF += 
                '<a href="'+data.byFw[i].route+'"><li class="to-left">'+
                '<div class="image to-left" style="background: url('+data.byFw[i].profile_pic+'); background-size: cover;">'+
                '</div>'+
                '<div class="info-area to-left">'+
                '<h2>'+data.byFw[i].name+'</h2>'+
                '</div>'+
                '</li></a>';



              }else if (type === 'OTHER' && data.byFw[i].genres[j] != 'ROCK'
                        && data.byFw[i].genres[j] != 'POP' && data.byFw[i].genres[j] != 'ELECTRONIC'
                        && data.byFw[i].genres[j] != 'FOLCLORE' && data.byFw[i].genres[j] != 'HIP HOP'
                        && data.byFw[i].genres[j] != 'JAZZ' && data.byFw[i].genres[j] != 'TANGO'
                        && data.byFw[i].genres[j] != 'REGGAE' && data.byFw[i].genres[j] != 'URBANA'
                        && data.byFw[i].genres[j] != 'HEAVY METAL' && data.byFw[i].genres[j] != 'CUMBIA') {

                if(position.length == 0) {
                  position = i;
                } else {
                    position = position+","+i;
                }

              }

            }
          }

          if (type === 'OTHER') {

            var artists = position.split(',');

            var uniqueNames = [];
            
            $.each(artists, function(i, el){
             if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });

            for (var i = 0; i < uniqueNames.length; i++) {

                  videosF += 
                  '<a href="'+data.byFw[i].route+'"><li class="to-left">'+
                  '<div class="image to-left" style="background: url('+data.byFw[uniqueNames[i]].profile_pic+'); background-size: cover;">'+
                  '</div>'+
                  '<div class="info-area to-left">'+
                  '<h2>'+data.byFw[uniqueNames[i]].name+'</h2>'+
                  '</div>'+
                  '</li></a>';

            }
          }        
        

      },
  }).done(function(){

	if($.trim($(videos).html()) != '')
	{
		$("#append_music").append(videos);
		$('#title-genres').css("cssText", "display: block!important;");
      	$('#title-empty').css("cssText", "display: none!important;");

  	}else{
        $('#title-genres').css("cssText", "display: none!important;");
      	$('#title-empty').css("cssText", "display: block!important;");

    }
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });
}

/*Funtion Calls*/
  loadByGenres();

function byAlf() {
  $loaderOverlay.fadeIn('slow');
  setTimeout(function(){
    $("#append_music").empty();
    $("#append_music").append(videos);
    $('#wrapper').css('display', 'block');
    $('.icon-play').css('right', '12.5%')
    $loaderOverlay.fadeOut('slow');
  }, 600);
}


function byFw() {
  $loaderOverlay.fadeIn('slow');
  setTimeout(function(){
    $("#append_music").empty();
    $("#append_music").append(videosF);
    $('#wrapper').css('display', 'none');
    $('.icon-play').css('right', '5.5%')
    $loaderOverlay.fadeOut('slow');
  }, 600);
}