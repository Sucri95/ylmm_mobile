var host = 'http://www.youlovemymusic.com/';
var $loaderOverlay = $('.overlay-loader');
var videos_array = [];
var array_musicians = [];
/*Close messages*/

$('.close-messages').on('click', function () {
  
  $('.messages').css('display', 'none');
  
});

/*Load Notifications*/

function loadNotifications() {

    var user = localStorage.getItem("user")
    
    usernot = JSON.parse(user);

  $.ajax({
      url: host+'notificationsService',
      type: 'GET',
      success: function(data) {
        not = '';

        notif = JSON.parse(data);
        
        setTimeout(function() {
          
          if (notif == 0) {
        
            not += '<li><a href="javascript:;">No tiene notificaciones nuevas</a></li>';
            $('.msj').addClass('hidden');
            var count = notif;
        
          }else{
    
            for (var i = 0; i < notif.length; i++) {

              not += '<li>'+
                      '<a href="'+notif[i].route+'" onclick="onSeen('+notif[i].id+')">'+notif[i].text+'</a>'+
                      '</li>';


            }

          var count = notif.length;

          if (notif.length > 2) {
            not += '<li class="last"><a href="/notifications">VER MÁS</a></li>';
          }
          
          $('.msj').text(count);
  
        }

          $('#append_notifications').append(not);
          $('#append_mobile_not').append(not);

        }, 1000);

        
      },
  });
}

/*Include HTMLs*/

function loadIncludes() {

   var sPageURL = decodeURIComponent(window.location)
   ,   getDoc   = sPageURL.split("/mobile_app/")
   ,   doc      = getDoc[1].split(".html");

  includeHtml("includes/containerwalluser.html", "#append_container");
  
}


function includeHtml(route,container){

  $.get(route, function (data) {
      $(container).append(data);
  });

}

/*Get User Info*/

function loadAuthUser() {
  $.ajax({
      url: host+'auth/user',
      type: 'GET',
      success: function(data) {

        if (data != '') {

          localStorage.setItem("auth", "true");
          localStorage.setItem("user", data);

          var user = JSON.parse(data);

        }

      },
  });
}

/*Find Id*/

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

/*Load Ranking Data*/

function loadRankingData() {

  var rank1 = ''
  ,   rank2 = ''
  ,   rank3 = ''
  ,   rank4 = ''
  ,   rank5 = ''
  ,   rank6 = '';

  $.ajax({
      url: host+'rankingService',
      type: 'GET',
      success: function(data) {


        if (data != '') {

          /*Music Performance*/

          for (var i = 0; i < data.search_music.length;  i++) {

            videos_array[i] = data.search_music[i];

          }

          for (var i = 0; i < data.musicians.length;  i++) {

            array_musicians[i] = data.musicians[i];

          }

          /*Artistas clasificados*/

          for (var i = 0; i < data.clasificated_artists.length;  i++) {

            var position = i + 1;

            if (data.clasificated_artists[i].type === 'B') {

              rank1 += '<div class="container-chart removeitems hidden" style="margin-top: 4%;">'+
                '<!-- Chart Section-->'+
                '<div class="section">'+     
                '<!-- Info Section -->'+
                '<div class="info">'+
                    '<span class="chart-position">'+position+'</span>'+
                    '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                   '<div class="main">'+
                        '<div class="artist-avatar performance"><img style="height: 100%; width: 100%;" src="'+data.clasificated_artists[i].profile_pic+'"></div>'+
                        '<div class="artist-song">'+
                            '<h2><a href="'+data.clasificated_artists[i].route_band+'">'+data.clasificated_artists[i].artist+'</a></h2> '+
                            '<h2><a href="'+data.clasificated_artists[i].route_song+'" style="font-size: 10px; color: #01b1e6;">'+data.clasificated_artists[i].song+'</a></h2>'+
                        '</div>'+
                        '<div class="artist-name">'+
                            '<span>Puesto '+position+'</span>'+
                       '</div>'+
                    '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                    '<div class="artist-vote-description">'+
                        '<h4>Nª VOTOS</h3>'+
                    '</div>'+
                   ' <div class="artist-vote-number">'+
                        '<h4 id="count-vote-'+data.clasificated_artists[i].id+'">'+data.clasificated_artists[i].votes+'</h4>'+
                    '</div>'+
                    '<div class="artist-vote-btn">'+
                        '<button id="button-vote-'+data.clasificated_artists[i].id+'" onclick="onVote('+data.clasificated_artists[i].id+')">Votá</button>'+
                    '</div>'+
                '</div>'+
                    '<!-- Vote Section -->'+
                '</div>'+
            '</div>';

            }else{

              rank1 += '<div class="container-chart removeitems hidden" style="margin-top: 4%;">'+
                '<!-- Chart Section-->'+
                '<div class="section">'+     
                '<!-- Info Section -->'+
                '<div class="info">'+
                    '<span class="chart-position">'+position+'</span>'+
                    '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                   '<div class="main">'+
                        '<div class="artist-avatar performance"><img style="height: 100%; width: 100%;" src="'+data.clasificated_artists[i].profile_pic+'"></div>'+
                        '<div class="artist-song">'+
                            '<h2><a href="'+data.clasificated_artists[i].route_musician+'">'+data.clasificated_artists[i].artist+'</a></h2> '+
                            '<h2><a href="'+data.clasificated_artists[i].route_song+'" style="font-size: 10px; color: #01b1e6;">'+data.clasificated_artists[i].song+'</a></h2>'+
                        '</div>'+
                        '<div class="artist-name">'+
                            '<span>Puesto '+position+'</span>'+
                       '</div>'+
                    '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                    '<div class="artist-vote-description">'+
                        '<h4>Nª VOTOS</h3>'+
                    '</div>'+
                   ' <div class="artist-vote-number">'+
                        '<h4 id="count-vote-'+data.clasificated_artists[i].id+'">'+data.clasificated_artists[i].votes+'</h4>'+
                    '</div>'+
                    '<div class="artist-vote-btn">'+
                        '<button id="button-vote-'+data.clasificated_artists[i].id+'" onclick="onVote('+data.clasificated_artists[i].id+')">Votá</button>'+
                    '</div>'+
                '</div>'+
                    '<!-- Vote Section -->'+
                '</div>'+
            '</div>';

            }

            

          }

          /*Artistas clasificados*/

          /*Canciones clasificados*/

          for (var i = 0; i < data.clasificated_songs.length;  i++) {

            

            var position = i + 1;

            if (data.clasificated_songs[i].type === 'B') {

                rank2 += '<!-- Chart Section  -->'+
                '<div class="section">'+
                '<!-- Info Section -->'+
                '<div class="info">'+
                '<span class="chart-position">'+position+'</span>'+
                '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                '<div class="main">'+
                '<div class="artist-avatar performance" style="background: url(\''+data.clasificated_songs[i].img+'\'); background-size: cover;">'+
                '<a href="'+data.clasificated_songs[i].img+'" target="_blank"></a>'+
                '</div>'+
                '<div class="artist-song">'+
                '<h2><a href="'+data.clasificated_songs[i].route_song+'">'+data.clasificated_songs[i].song+'</a></h2>'+
                '</div>'+
                '<div class="artist-name">'+
                '<p><a href="'+data.clasificated_songs[i].route_band+'">'+data.clasificated_songs[i].artist+'</a></p>'+
                '<span>Puesto '+position+'</span>'+
                '</div>'+
                '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                '<div class="artist-vote-description">'+
                '<h4>Nª VOTOS</h4>'+
                '</div>'+
                '<div class="artist-vote-number">'+
                '<h4 id="count-vote-'+data.clasificated_songs[i].id+'">'+data.clasificated_songs[i].votes+'</h4>'+
                '</div>'+
                '<div class="artist-vote-btn">'+
                '<button id="button-vote-'+data.clasificated_songs[i].id+'" onclick="onVote('+data.clasificated_songs[i].id+')">Votá</button>'+
                '</div>'+
                '</div>'+
                '<!-- Vote Section -->'+
                '</div>'+
                '<!-- Chart Section  -->';

            }else{

                rank2 += '<!-- Chart Section  -->'+
                '<div class="section">'+
                '<!-- Info Section -->'+
                '<div class="info">'+
                '<span class="chart-position">'+position+'</span>'+
                '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                '<div class="main">'+
                '<div class="artist-avatar performance" style="background: url(\''+data.clasificated_songs[i].img+'\'); background-size: cover;">'+
                '<a href="'+data.clasificated_songs[i].img+'" target="_blank"></a>'+
                '</div>'+
                '<div class="artist-song">'+
                '<h2><a href="'+data.clasificated_songs[i].route_song+'">'+data.clasificated_songs[i].song+'</a></h2>'+
                '</div>'+
                '<div class="artist-name">'+
                '<p><a href="'+data.clasificated_songs[i].route_musician+'">'+data.clasificated_songs[i].artist+'</a></p>'+
                '<span>Puesto '+position+'</span>'+
                '</div>'+
                '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                '<div class="artist-vote-description">'+
                '<h4>Nª VOTOS</h4>'+
                '</div>'+
                '<div class="artist-vote-number">'+
                '<h4 id="count-vote-'+data.clasificated_songs[i].id+'">'+data.clasificated_songs[i].votes+'</h4>'+
                '</div>'+
                '<div class="artist-vote-btn">'+
                '<button id="button-vote-'+data.clasificated_songs[i].id+'" onclick="onVote('+data.clasificated_songs[i].id+')">Votá</button>'+
                '</div>'+
                '</div>'+
                '<!-- Vote Section -->'+
                '</div>'+
                '<!-- Chart Section  -->';

            }

            

          }

          /*Canciones clasificados*/
          
          /*TOP 10*/

          for (var i = 0; i < data.top_10.length;  i++) {

            var position = i + 1;

            if (data.top_10[i].type === 'B') {

                rank3 += '<!-- Chart Section  -->'+
                '<div class="section">'+
                '<!-- Info Section -->'+
                '<div class="info">'+
                '<span class="chart-position">'+position+'</span>'+
                '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                '<div class="main">'+
                '<div class="artist-avatar performance" style="background: url(\''+data.top_10[i].img+'\'); background-size: cover;">'+
                '<a href="'+data.top_10[i].img+'" target="_blank"></a>'+
                '</div>'+
                '<div class="artist-song">'+
                '<h2><a href="'+data.top_10[i].route_song+'">'+data.top_10[i].song+'</a></h2>'+
                '</div>'+
                '<div class="artist-name">'+
                '<p><a href="'+data.top_10[i].route_band+'">'+data.top_10[i].artist+'</a></p>'+
                '<span>Puesto '+position+'</span>'+
                '</div>'+
                '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                '<div class="artist-vote-description">'+
                '<h4>Nª VOTOS</h4>'+
                '</div>'+
                '<div class="artist-vote-number">'+
                '<h4 id="count-vote-'+data.top_10[i].id+'">'+data.top_10[i].votes+'</h4>'+
                '</div>'+
                '<div class="artist-vote-btn">'+
                '<button id="button-vote-'+data.top_10[i].id+'" onclick="onVote('+data.top_10[i].id+')">Votá</button>'+
                '</div>'+
                '</div>'+
                '<!-- Vote Section -->'+
                '</div>'+
                '<!-- Chart Section  -->';

            }else{

                rank3 += '<!-- Chart Section  -->'+
                '<div class="section">'+
                '<!-- Info Section -->'+
                '<div class="info">'+
                '<span class="chart-position">'+position+'</span>'+
                '<span class="chart-time">Posición</spant>'+
                '</div>'+
                '<!-- Info Section -->'+
                '<!-- Main Section -->'+
                '<div class="main">'+
                '<div class="artist-avatar performance" style="background: url(\''+data.top_10[i].img+'\'); background-size: cover;">'+
                '<a href="'+data.top_10[i].img+'" target="_blank"></a>'+
                '</div>'+
                '<div class="artist-song">'+
                '<h2><a href="'+data.top_10[i].route_song+'">'+data.top_10[i].song+'</a></h2>'+
                '</div>'+
                '<div class="artist-name">'+
                '<p><a href="'+data.top_10[i].route_musician+'">'+data.top_10[i].artist+'</a></p>'+
                '<span>Puesto '+position+'</span>'+
                '</div>'+
                '</div>'+
                '<!-- Main Section -->'+
                '<!-- Vote Section -->'+
                '<div class="vote">'+
                '<div class="artist-vote-description">'+
                '<h4>Nª VOTOS</h4>'+
                '</div>'+
                '<div class="artist-vote-number">'+
                '<h4 id="count-vote-'+data.top_10[i].id+'">'+data.top_10[i].votes+'</h4>'+
                '</div>'+
                '<div class="artist-vote-btn">'+
                '<button id="button-vote-'+data.top_10[i].id+'" onclick="onVote('+data.top_10[i].id+')">Votá</button>'+
                '</div>'+
                '</div>'+
                '<!-- Vote Section -->'+
                '</div>'+
                '<!-- Chart Section  -->';

            }

            

            if (i == 9) { break; }

          }

          /*TOP 10*/

          /*TOP 10 ARTIST FOLLOWERS*/

          for (var i = 0; i < data.artist_followers.length;  i++) {

            var position = i + 1;

            if (data.artist_followers[i].type === 'B') {

              rank4 += '<li>'+
              '<div class="avatar" style="background: url(\''+data.artist_followers[i].profile_pic+'\'); background-size: cover;"></div>'+
              '<div class="art-name">'+
              '<a href="'+data.artist_followers[i].route+'"><h6>'+data.artist_followers[i].name+'</h6></a>'+
              '</div>'+
              '<div class="num-follows">'+
              '<h5>'+data.artist_followers[i].followers+'<span>followers</span></h5>'+
              '</div>'+
              '</li>';

            }else{

              rank4 += '<li>'+
              '<div class="avatar" style="background: url(\''+data.artist_followers[i].profile_pic+'\'); background-size: cover;"></div>'+
              '<div class="art-name">'+
              '<a href="'+data.artist_followers[i].route+'"><h6>'+data.artist_followers[i].name+'</h6></a>'+
              '</div>'+
              '<div class="num-follows">'+
              '<h5>'+data.artist_followers[i].followers+'<span>followers</span></h5>'+
              '</div>'+
              '</li>';

            }

            

          }

          /*TOP 10 ARTIST FOLLOWERS*/

          /*TOP 10 FAN FOLLOWERS*/

          for (var i = 0; i < data.fan_followers.length;  i++) {

            var position = i + 1;

              rank5 += '<li>'+
              '<div class="avatar" style="background: url(\''+data.fan_followers[i].profile_pic+'\'); background-size: cover;"></div>'+
              '<div class="art-name">'+
              '<a href="'+data.fan_followers[i].route+'"><h6>'+data.fan_followers[i].name+'</h6></a>'+
              '</div>'+
              '<div class="num-follows">'+
              '<h5>'+data.fan_followers[i].followers+'<span>followers</span></h5>'+
              '</div>'+
              '</li>';

              

          }

          /*TOP 10 FAN FOLLOWERS*/

        }

      },
  }).done(function() {

      $('#artistas_clasificados').append(rank1);
      $('#header_clasificated_songs').after(rank2);
      $('#header_top10').after(rank3);
      $('#append_followersA').append(rank4);
      $('#append_followersF').append(rank5);

      $loaderOverlay.fadeOut('slow');
  });
}

  $(".search-text-input").keyup(function (e) {
        e.preventDefault();
        search_artists();
    });

    $(".search-text-input").focusin(function (e) {
        e.preventDefault();
        search_artists();
    });

    $(".search-text-input").focusout(function(){
      setTimeout(function(){
       $('.search-list ul').empty();
      },400);
   });

    $('.search-text-input').keypress(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

  function search_artists() {

        var search = $(".search-text-input").val();
        
        $.get('http://www.youlovemymusic.com/battles/search_musicians?performance='+ search, function (data) { 
          var cont = 0;

          $('.search-list ul li').remove();

          $.each(data, function(index, item) {
            cont = 0;
            $.each(item, function(index2, item2) { 
              if (cont < 3) {
              
              var url = ''
                , type = ''
                , name = ''
                , image = ''
                , level = '';


                if (index === 'bands') {


                    
                    url =  'http://www.youlovemymusic.com/bands/comments?id='+item2.id;
                    name = item2.name;
                    image = item2.profile_pic;
                    type = 'banda';

                  $('.search-list ul').append('<li class="lisearch"> <a onclick=" show_results_artists(\''+item2.id+'\',\''+type+'\')"><div class="avatar-area"><div class="image-area" style="background: url('+image+'); background-size: cover;"></div></div><div class="data-area"><h2>'+name+'</h2><p>Banda</p></div></a></li>');

                }

                if (index === 'musicians') {

                    url =  'http://www.youlovemymusic.com/users/wall?id='+item2.id;
                    name = item2.artistic_name;
                    image = item2.profile_pic;
                    type = 'musician';

                  $('.search-list ul').append('<li class="lisearch"> <a onclick=" show_results_artists(\''+item2.id+'\',\''+type+'\')"><div class="avatar-area"><div class="image-area" style="background: url('+image+'); background-size: cover;"></div></div><div class="data-area"><h2>'+name+'</h2><p>Músico</p></div></a></li>');
                }

              cont = cont + 1;
            }
           });
            
          });
        
        
        });
    
    }

/*Show Artists Performance*/  

function show_results_artists(id,type) {

        $('#artists_searcher .todelete').remove();

        for (var i = 0, len = videos_array.length; i < len; i++) {

            var position = i + 1 ;

        if (videos_array[i].id_band == id && videos_array[i].id_user == null && type == 'banda'){

            var link =  videos_array[i].url.split('=').pop();
                link =  '//img.youtube.com/vi/'+link+'/0.jpg';
            var name = videos_array[i].name_video.split('-');


              $('#artists_searcher').append('<div class="container-chart todelete" style="margin-top: 4%;">'+
              '<!-- Chart Section-->'+
              '<div class="section">'+     
              '<!-- Info Section -->'+
              '<div class="info">'+
              '<span class="chart-position">'+position+'</span>'+
              '<span class="chart-time">Posición</spant>'+
              '</div>'+
              '<!-- Info Section -->'+
              '<!-- Main Section -->'+
              '<div class="main">'+
              '<div class="artist-avatar performance"><img style="height: 100%" src="'+link+'"></div>'+
              '<div class="artist-song">'+
              '<h2><a href="/mobile_app/video_reproductor.html?id='+videos_array[i].id+'">'+name[0]+'</a></h2>'+
              '</div>'+
              '<div class="artist-name">'+
              '<p><a href="/mobile_app/profile.html?id='+videos_array[i].id_band+'&type=B">'+name[1]+'</a></p> '+
              '<span>Puesto '+position+'</span>'+
              ' </div>'+
              '</div>'+
              '<!-- Main Section -->'+
              '<!-- Vote Section -->'+
              '<div class="vote">'+
              '<div class="artist-vote-description">'+
              '<h4>Nª VOTOS</h3>'+
              '</div>'+
              ' <div class="artist-vote-number">'+
              '<h4 id="count-vote-'+videos_array[i].id+'">'+videos_array[i].votes+'</h4>'+
              '</div>'+
              '<div class="artist-vote-btn">'+
              '<button id="button-vote-'+videos_array[i].id+'" onclick="onVote('+videos_array[i].id+')">Votá</button>'+
              '</div>'+
              '</div>'+
              '<!-- Vote Section -->'+
              '</div>'+
              '</div>');

        }
        if (videos_array[i].id_user == id && videos_array[i].id_band == null && type == 'musician'){

            var link =  videos_array[i].url.split('=').pop();
                link =  '//img.youtube.com/vi/'+link+'/0.jpg';
            var name = videos_array[i].name_video.split('-');
            
            for (var j = 0, len = array_musicians.length; j < len; j++) {
              if (array_musicians[j].id == videos_array[i].id_user) {
                var wall_id = array_musicians[j].id_user;
              }
            }


            $('#artists_searcher').append('<div class="container-chart todelete" style="margin-top: 4%;">'+
            '<!-- Chart Section-->'+
            '<div class="section">'+     
            '<!-- Info Section -->'+
            '<div class="info">'+
            '<span class="chart-position">'+position+'</span>'+
            '<span class="chart-time">Posición</spant>'+
            '</div>'+
            '<!-- Info Section -->'+
            '<!-- Main Section -->'+
            '<div class="main">'+
            '<div class="artist-avatar performance"><img style="height: 100%" src="'+link+'"></div>'+
            '<div class="artist-song">'+
            '<h2><a href="mobile_app/video_reproductor.html?id='+idvideo+'">'+name[0]+'</a></h2>'+
            '</div>'+
            '<div class="artist-name">'+
            '<p><a href="mobile_app/profile.html?id='+wall_id+'&type=M">'+name[1]+'</a></p>'+
            '<span>Puesto '+position+'</span>'+
            ' </div>'+
            '</div>'+
            '<!-- Main Section -->'+
            '<!-- Vote Section -->'+
            '<div class="vote">'+
            '<div class="artist-vote-description">'+
            '<h4>Nª VOTOS</h3>'+
            '</div>'+
            ' <div class="artist-vote-number">'+
            '<h4 id="count-vote-'+videos_array[i].id+'">'+videos_array[i].votes+'</h4>'+
            '</div>'+
            '<div class="artist-vote-btn">'+
            '<button id="button-vote-'+videos_array[i].id+'" onclick="onVote('+videos_array[i].id+')">Votá</button>'+
            '</div>'+
            '</div>'+
            '<!-- Vote Section -->'+
            '</div>'+
            '</div>');

        }
     // Return as soon as the object is found
    }
}

/*Vote function*/

  
 $(document).on('click', '.artist-vote-btn button', function() {
   var vote = $(this).parent('.artist-vote-btn').prev('.artist-vote-number').children('h4');
   var vote1 = parseInt($(vote).text()) + 1;
       
   $(vote).text(vote1);
   $(this).prop('disabled', true).text('Votaste');
   $(this).css('background', 'gray');

 });

  function onVote(id)
  {
    $.get('/battles/addVote?id='+id, function (response) {
      if (response == 1) {
        console.log("Votó");
      }else{
        console.log(response);
      }
    });
  }

/*On document ready funtions*/

$(document).ready(function(){

  loadIncludes();
  loadAuthUser();
  loadRankingData();
  loadNotifications();

/*Seen notifications*/

  setTimeout(function(){

    $.get('/notifications/seen', function(response){});

  },400);


});