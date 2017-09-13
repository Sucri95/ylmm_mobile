var $loaderOverlay = $('.overlay-loader');
 var top_3 = '';
/*Load Top 3*/

function loadTop3() {

  $.ajax({
      url: 'http://www.youlovemymusic.com/showartists',
      type: 'GET',
      success: function(data) {

        for (var i = 0; i < data.top3.length; i++) {

          top_3 += 
    			'<li>'+
    				'<a href="'+data.top3[i].route+'">'+
    					'<div class="artist-avatar" style="background: url('+data.top3[i].profile_pic+'); background-size: cover;"></div>'+
    					'<span>'+data.top3[i].name+'</span>'+
    				'</a>'+
    			'</li>';

          if (i == 2) { break; }

        }

      },
  }).done(function(){

  	$("#top3").append(top_3);
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });
}

/*Funtion Calls*/
  loadTop3();
