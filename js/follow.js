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
var id = getUrlParameter('id');

/*Load Content*/

function loadContent(type) {
 
  var fusers = '';

  if (typeToShow === 'F1' || typeToShow === 'F2') {

  $.ajax({
      url: 'http://www.youlovemymusic.com/user/follows?id='+id,
      type: 'GET',
      success: function(response) {

        var data = JSON.parse(response);

        if (typeToShow === 'F1') {

          $('#title').text('Followers');

          if (data.followers != '') {

            for (var i = 0; i < data.followers.length; i++) {

              fusers +=
              '<li class="to-left">'+
              '<div class="image to-left" style="background: url('+data.followers[i].profile_pic+'); background-size: cover;">'+
              '</div>'+
              '<div class="info-area to-left">'+
              '<a href="'+data.followers[i].route+'">'+
              '<h2>'+data.followers[i].name+'</h2>'+
              '</a>'+
              '<span>'+data.followers[i].type+'</span>'+
              '</div>'+
              '</li>';

            }

          }else{

              fusers +=
              '<li class="to-left">'+
              '<div class="info-area to-left">'+
              '<h2>...</h2>'+
              '</div>'+
              '</li>';

          }


        }else if (typeToShow === 'F2') {

          $('#title').text('Following');

          if (data.following != '') {

            for (var i = 0; i < data.following.length; i++) {

              fusers +=
              '<li class="to-left">'+
              '<div class="image to-left" style="background: url('+data.following[i].profile_pic+'); background-size: cover;">'+
              '</div>'+
              '<div class="info-area to-left">'+
              '<a href="'+data.following[i].route+'">'+
              '<h2>'+data.following[i].name+'</h2>'+
              '</a>'
              '<span>'+data.following[i].type+'</span>'+
              '</div>'+
              '</li>';

            } 

          }else{

              fusers +=
              '<li class="to-left">'+
              '<div class="info-area to-left">'+
              '<h2>...</h2>'+
              '</div>'+
              '</li>';

          }
         

        }


      },
    }).done(function(){

      $("#append_f").append(fusers);
      
      setTimeout(function(){ 
          $loaderOverlay.fadeOut('slow');
      },3000);

    });

  }else if(typeToShow === 'F1B') {

  $.ajax({
      url: 'http://www.youlovemymusic.com/band/followers?id='+id,
      type: 'GET',
      success: function(response) {

        var data = JSON.parse(response);

        if (typeToShow === 'F1B') {

          $('#title').text('Followers');

          if (data.followers != '') {

            for (var i = 0; i < data.followers.length; i++) {

              fusers +=
              '<li class="to-left">'+
              '<div class="image to-left" style="background: url('+data.followers[i].profile_pic+'); background-size: cover;">'+
              '</div>'+
              '<div class="info-area to-left">'+
              '<a href="'+data.followers[i].route+'">'+
              '<h2>'+data.followers[i].name+'</h2>'+
              '</a>'+
              '<span>'+data.followers[i].type+'</span>'+
              '</div>'+
              '</li>';

            }

          }else{

              fusers +=
              '<li class="to-left">'+
              '<div class="info-area to-left">'+
              '<h2>...</h2>'+
              '</div>'+
              '</li>';

          }


        }


      },
  }).done(function(){

    $("#append_f").append(fusers);
    
    setTimeout(function(){ 
        $loaderOverlay.fadeOut('slow');
    },3000);

  });

  }

}

/*Funtion Calls*/
  loadContent(typeToShow);
