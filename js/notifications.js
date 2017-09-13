var $loaderOverlay = $('.overlay-loader');
 var notif = '';
/*Load Notifications*/

function loadnotificaciones() {

  $.ajax({
      url: 'http://www.youlovemymusic.com/mobile/notifications/test',
      type: 'GET',
      success: function(data) {

        var not = JSON.parse(data)
        ,   check = 0
        ,   count = 0;

        console.log(data);
        
           	if (data == '[]') {

      		notif += 
    			'<li class="to-left">'+
    			'<a href="javascript:;">'+
    			'<div class="info-area to-left full-width">'+
    			'<h2 class="to-left artist-name">No tiene notificaciones</h2>'+
    			'</div>'+
    			'</a>'+
    			'</li>';

          $('.icon.notification').addClass('active');


      	}else{

      			for (var i = 0; i < not.length; i++) {
      				if (not[i].seen === 'N') {
      					check = 1;
                count++;
      				}
      			}

      			if (check == 1) {

      				$('.icon.notification').addClass('active');
      				$('#msj-notification').text(count);

      			}else{

              $('.icon.notification').addClass('active');

      				$('#msj-notification').css('display', 'none');

      			}

      		for (var i = 0; i < not.length; i++) {

            if (not[i].route == null) {

              notif += 
              '<li class="to-left">'+
              '<a href="javascript:;">'+
              '<div class="info-area to-left full-width">'+
              '<h2 class="to-left artist-name">'+not[i].text+'</h2>'+
              '</div>'+
              '</a>'+
              '</li>';

            }else{

              notif += 
              '<li class="to-left">'+
              '<a href="'+not[i].route+'">'+
              '<div class="info-area to-left full-width">'+
              '<h2 class="to-left artist-name">'+not[i].text+'</h2>'+
              '</div>'+
              '</a>'+
              '</li>';

            }



	        }



      	}


      }
  }).done(function(){


    $("#append_notifications").append(notif);
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });
}

/*Funtion Calls*/
  loadnotificaciones();

/*Seen notifications*/


$(document).ready( function () {

  setTimeout(function(){

    $.get('/notifications/seen', function(response){});

  },400);
});
