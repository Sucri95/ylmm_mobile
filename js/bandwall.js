var host = 'http://www.youlovemymusic.com/';

/*Close messages*/

$('.close-messages').on('click', function () {
  
  $('.messages').css('display', 'none');
  
});


/*Load Sponsors*/
function loadSponsors() {
  $.ajax({
      url: host+'sponsorsService',
      type: 'GET',
      success: function(data) {
        html = '';
        for (var i = 0; i < data.length; i++) {
          html +=
            '<li>'+
              '<a href="'+data[i].url+'" target="_blank">'+
                '<img class="logo" src="../..'+data[i].image+'" alt=" " />'+
              '</a>'+
            '</li>';
          }

        $(".sponsors-list").append(html);
      },
  });
}

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

  includeHtml("includes/navlogin.html","nav");
  includeHtml("includes/footer.html","footer");
  includeHtml("includes/containerwalluser.html", "#append_container");
  includeHtml("includes/twitterwidget.html", "#append_widget");
  includeHtml("includes/user_wall.html", "#wall_appended");
  //includeHtml("includes/user_music.html", "#wall_appended");
  //includeHtml("includes/user_about.html", "#wall_appended");
  //includeHtml("includes/musicianvideos.html", "#wall_appended");    
  
}


function includeHtml(route,container){

  $.get(route, function (data) {
      $(container).append(data);
  });

}

/*Navigate site*/
$(document).on('click', '#stat_1' ,function() {
  $('#wall_appended').empty();
  setTimeout(function() {
    includeHtml("includes/user_wall.html", "#wall_appended");
  }, 400);
  setTimeout(function() {
    loadPost();
  }, 400);

});
$(document).on('click', '#stat_3' ,function() {
  $('#wall_appended').empty();
  setTimeout(function() {
    includeHtml("includes/user_music.html", "#wall_appended");
  }, 400);
    setTimeout(function() {
    loadMusic();
  }, 400);
});
$(document).on('click', '#stat_4' ,function() {
  $('#wall_appended').empty();
  setTimeout(function() {
    includeHtml("includes/user_about.html", "#wall_appended");  
  }, 400);
});
$(document).on('click', '#video_comment' ,function() {
  $('#wall_appended').empty();
  setTimeout(function() {
    includeHtml("includes/musicianvideos.html", "#wall_appended");  
  }, 400);
});


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


          setTimeout(function() {

	          $('.my-inline.profile-info').attr('href', host+'mobile_app/layout_user.html?id='+user.id_wall+'');
	          $('#wall_link').attr('href', host+'mobile_app/layout_user.html?id='+user.id_wall+'');

	          $('nav .items ul li .avatar').css({
	            'background' : 'url('+user.profile_pic+')no-repeat',
	            'background-size' : 'cover'
	          });

	          $('#auth_profile_pic').css({
	            'background' : 'url('+user.profile_pic+')no-repeat',
	            'background-size' : 'cover'
	          });

	          $('#authuser_name').text(user.name);
	          $('#user_name').text(user.name);

	          if (user.user_level == 4 || user.user_level == 1) {

	            $('#firstoptionmenu')
	              .text('¿Sos Músico?')
	              .attr('href', host+'musicianregistration');

	            $('#optionmenumobile')
	              .text('¿Sos Músico?');
	            $('#option_link')
	              .attr('href', host+'musicianregistration');  
	          }
	          if (user.user_level == 5) {

	            $('#firstoptionmenu')
	              .text('Crear Banda')
	              .attr('href', host+'bandsregistration');

	            $('#optionmenumobile')
	              .text('Crear Banda');
	            $('#option_link')
	              .attr('href', host+'bandsregistration');   
	          }

            if ($('#firstoptionmenu').text() === '' || $('#optionmenumobile').text() === '') {
              $('#firstoptionmenu_li').css('display', 'none');
              $('#mobile_li_first').css('display', 'none');
            }
          	
          }, 400);


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


/*Search user wall*/

function wallUser() {

  var id = getUrlParameter('id');

  $.ajax({
      url: host+'band/wall?id='+id,
      type: 'GET',
      success: function(data) {

          localStorage.setItem("band", data);

      },
  });
}

/*Load Wall Container*/

function loadContainer() {
  
  var authCheck = localStorage.getItem("auth");

  //Note: must very if the auth user.idWall is the same of the wall you're visiting

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , bandwall = localStorage.getItem("band");

    var band = JSON.parse(bandwall);
    var user = JSON.parse(user);

    setTimeout(function() {

      $('.band-name-type-1')
      .text(band.name);

    if (user.id_band == band.id) {

      $('.band-name-type-1').css('cursor', 'pointer');

      $('#name_edit').children('.input-type-1').val(band.name);

    }
    
    if (band.background_pic != null) {

      $('#image-1').css({
                        'background' : 'url('+band.background_pic+')no-repeat',
                        'background-size' : 'cover'
                      });
    }

    $('.btn-follow').attr('onclick', 'makeFan('+band.id+')');



      if (user.id_band === band.id) {
      	$('.update-background').css("cssText", "display: block!important;");
      }
      

    }, 4000);

  }
}

/*Load Followers & Followings*/

function getFollows() {
	
	var id = getUrlParameter('id');

	bandwall = localStorage.getItem("band");

    var band = JSON.parse(bandwall);

		$.ajax({
		url: host+'band/wall/follows?id='+id,
		type: 'GET',
			success: function(data) {

				var data1 = JSON.parse(data);

				setTimeout(function() {

					$('#count-following')
						.attr('href', host+'bands/followers?id='+band.id+'')
						.text('FOLLOWING: '+data1.following+'');
				
				}, 500);

			},
		});
}

/*Check Followers*/

function checkFollowers() {
	
	var id = getUrlParameter('id');

	var bandwall = localStorage.getItem("band");

	var authuser = localStorage.getItem("user");

    var band = JSON.parse(bandwall);

    var user = JSON.parse(authuser);

	$.ajax({
	url: host+'band/check/follows?id='+id,
	type: 'GET',
		success: function(response) {

			var data = JSON.parse(response);

			if (band.id != user.id_band) {
				
					$('#fan_btn').attr('onclick', 'makefan('+band.id+')');				

				if (data.followers === null) {

					$('#fan_btn').text('FOLLOW').css("cssText", "display: block;");

				}else{

					$('#fan_btn').text('UNFOLLOW').css("cssText", "display: block;");

				}
			}
		},
	});
}

/*Load Twitter Widget container*/

function loadTwitterWidget() {
  
  var authCheck = localStorage.getItem("auth");

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , bandwall = localStorage.getItem("band");

    var band = JSON.parse(bandwall);
    var user = JSON.parse(user);

    
    setTimeout(function() {

    $('#stat_1')
    	//.attr('href', host+'wall?id='+userWall.id+'')
    	.css("cssText", "display: block !important;");
    
    $('#sub1')
    	.attr('href', host+'wall?id='+band.id+'')
    	.css("cssText", "display: block !important;");


    $('#drop_option1').attr('href', host+'wall?id='+band.id+'');

    $('#drop_option2')
    .attr('href', host+'bands/comments?id='+band.id+'')
    .css("cssText", "display: block !important;");

    $('#sub2')
    .attr('href', host+'bands/comments?id='+band.id+'')
    .css("cssText", "display: block !important;");

    $('#stat_3')
    	.css("cssText", "display: block !important;");

    $('#sub4')
    	.attr('href', host+'/bands/home_band?idband='+band.id+'')
    	.css("cssText", "display: block !important;");
      
    $('#stat_4')
    	.css("cssText", "display: block !important;");

    $('#sub5')
    	.attr('href', host+'/bands/about?id='+band.id+'')
    	.css("cssText", "display: block !important;");

    if (band.id != user.id_id_band) {
    	
    	$('#img-avatar').attr('src', band.profile_pic).css('cursor', 'default');
    	$('#id_confirmation').val("NO");

    }else{

    	$('#img-avatar').attr('src', band.profile_pic);
    	$('#img-avatar').after('<div class="container-avatar">'+
          						'<img class="edit-avatar image" src="../../images/white_camara.png">'+
          						'</div>');
    	$('#id_confirmation').val("YES");
    }

    }, 1000);

  }
}

/*Load Posted Items*/

function loadPost() {

  var id = getUrlParameter('id');
  
  var authCheck = localStorage.getItem("auth");

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , bandwall = localStorage.getItem("band");

    var band = JSON.parse(bandwall);
    var user = JSON.parse(user);

    $.ajax({
    url: host+'bandWallService?id='+id,
    type: 'GET',
    success: function(response) {

      var data  = JSON.parse(response)
      ,   html  = ''
      ,   video = ''
      ,   respo = '';


      $('#auth_profile_pic').css({
        'background' : 'url('+user.profile_pic+')no-repeat',
        'background-size' : 'cover'
      });

      $('#title_slide').text('');
      $('#title_slide').text('MIS VIDEOS MÁS VOTADOS');

      for (var i = 0; i < data.comments.length; i++) {
        if (data.comments[i].type === 'com') {
		
          html += '<!-- Text Post -->'+
            '<div class="history-post" id="history-list-'+data.comments[i].id+'">'+
              '<div class="post-item" id="'+data.comments[i].id+'">'+
                '<div class="user-area">'+
                 ' <div class="comment-options">'+
                    '<ul>'+
                      '<li><a href="javascript:;" onclick="onEdit('+data.comments[i].id+')">Editar</a></li>'+
                      '<li><a href="javascript:;" onclick="onDelete('+data.comments[i].id+')">Eliminar</a></li>'+
                    '</ul>'+
                  '</div>'+
                  '<div class="avatar" style="background: url('+data.comments[i].profile_pic+'); background-size: cover;"></div>'+
                  '<div class="data class-'+data.comments[i].id+'">'+
                   '<h1><a href="/mobile_app/layout_user.html?id='+data.comments[i].id_user+'">'+data.comments[i].username+'</a></h1>'+
                    '<p>'+data.comments[i].date+'</p>'+
                  '</div>'+
                '</div>'+
                '<div class="user-post">'+
                  '<div class="post-content">'+
                    '<span id="'+data.comments[i].id+'">'+data.comments[i].comment+'</span>'+
                  '</div>'+
                  '<div class="tool-bar">'+
                    '<span class="reply-counter">Respuestas: '+data.comments[i].responses.length+'</span>'+
                     ' <ul>'+
                       ' <li><a class="share-band" href="javascript:;"> </a></li>'+
                        '<li><a class="create-comment" href="javascript:;"></a></li>'+
                        '<li><a class="like-band like-band-'+data.comments[i].id+'" href="javascript:;" onclick="onLike('+data.comments[i].id+')"> </a></li>'+
                       ' <li><a class="comment-like counter-like-'+data.comments[i].id+'" href="javascript:;">'+data.comments[i].like+'</a></li>'+
                       ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>'+
                     ' </ul>'+
                  '</div>'+
                  '<!-- Responses Text Post -->'+
        					 '<div class="list-comment">'+
        					 '<ul id="list-comment-'+data.comments[i].id+'">'+
        					 '</ul>'+
        					 '</div>'+
        				  '<!-- End Responses Text Post -->'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<!--End Text Post -->';
        }
        if (data.comments[i].type === 'pic') {

          html += '<!-- Text Post -->'+
            '<div class="history-post" id="history-list-'+data.comments[i].id+'">'+
              '<div class="post-item" id="'+data.comments[i].id+'">'+
                '<div class="user-area">'+
                 ' <div class="comment-options">'+
                    '<ul>'+
                      '<li><a href="javascript:;" onclick="onEdit('+data.comments[i].id+')">Editar</a></li>'+
                      '<li><a href="javascript:;" onclick="onDelete('+data.comments[i].id+')">Eliminar</a></li>'+
                    '</ul>'+
                  '</div>'+
                  '<div class="avatar" style="background: url('+data.comments[i].profile_pic+'); background-size: cover;"></div>'+
                  '<div class="data class-'+data.comments[i].id+'">'+
                    '<h1>'+
                      '<a href="/mobile_app/layout_user.html?id='+data.comments[i].id_user+'">'+data.comments[i].username+': </a>'+
                      '<span class="span-edit" style="font-size: 14px;">'+data.comments[i].title+'</span>'+
                      '<input type="hidden" class="input-edit" name="title">'+
                    '</h1>'+
                    '<p>'+data.comments[i].date+'</p>'+
                  '</div>'+
                '</div>'+
                '<div class="user-post">'+
                  '<div class="media-post">'+
                    '<img src="'+data.comments[i].comment+'" style="width: 100%; height: auto;">'+
                  '</div>'+
                  '<div class="tool-bar">'+
                    '<span class="reply-counter">Respuestas: '+data.comments[i].responses.length+'</span>'+
                     ' <ul>'+
                       ' <li><a class="share-band" href="javascript:;"> </a></li>'+
                        '<li><a class="create-comment" href="javascript:;"></a></li>'+
                        '<li><a class="like-band like-band-'+data.comments[i].id+'" href="javascript:;" onclick="onLike('+data.comments[i].id+')"> </a></li>'+
                       ' <li><a class="comment-like counter-like-'+data.comments[i].id+'" href="javascript:;">'+data.comments[i].like+'</a></li>'+
                       ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>'+
                     ' </ul>'+
                  '</div>'+
                  '<!-- Responses Text Post -->'+
          					'<div class="list-comment">'+
          					'<ul id="list-comment-'+data.comments[i].id+'">'+
          					'</ul>'+
          					'</div>'+
				          '<!-- End Responses Text Post -->'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<!--End Text Post -->';
        }
        if (data.comments[i].type === 'video') {

          html += '<!-- Text Post -->'+
            '<div class="history-post" id="history-list-'+data.comments[i].id+'">'+
              '<div class="post-item" id="'+data.comments[i].id+'">'+
                '<div class="user-area">'+
                 ' <div class="comment-options">'+
                    '<ul>'+
                      '<li><a href="javascript:;" onclick="onEdit('+data.comments[i].id+')">Editar</a></li>'+
                      '<li><a href="javascript:;" onclick="onDelete('+data.comments[i].id+')">Eliminar</a></li>'+
                    '</ul>'+
                  '</div>'+
                  '<div class="avatar" style="background: url('+data.comments[i].profile_pic+'); background-size: cover;"></div>'+
                  '<div class="data class-'+data.comments[i].id+'">'+
                    '<h1>'+
                      '<a href="/mobile_app/layout_user.html?id='+data.comments[i].id_user+'">'+data.comments[i].username+': </a>'+
                      '<span class="span-edit" style="font-size: 14px;">'+data.comments[i].title+'</span>'+
                      '<input type="hidden" class="input-edit" name="title">'+
                    '</h1>'+
                    '<p>'+data.comments[i].date+'</p>'+
                  '</div>'+
                '</div>'+
                '<div class="user-post">'+
                  '<div class="media-post">'+
                    '<div class="media-post-content">'+
                      '<div class="overlay-icon-play">'+
                        '<div class="icon-play"></div>'+
                      '</div>'+
                      '<video id="video_'+data.comments[i].id+'" width="100%">'+
                        '<source src="'+data.comments[i].comment+'" type="video/mp4">'+
                      '</video>'+
                    '</div>'+
                  '</div>'+
                  '<div class="tool-bar">'+
                    '<span class="reply-counter">Respuestas: '+data.comments[i].responses.length+'</span>'+
                     ' <ul>'+
                       ' <li><a class="share-band" href="javascript:;"> </a></li>'+
                        '<li><a class="create-comment" href="javascript:;"></a></li>'+
                        '<li><a class="like-band like-band-'+data.comments[i].id+'" href="javascript:;" onclick="onLike('+data.comments[i].id+')"> </a></li>'+
                       ' <li><a class="comment-like counter-like-'+data.comments[i].id+'" href="javascript:;"> 0 </a></li>'+
                       ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>'+
                     ' </ul>'+
                  '</div>'+
                  '<!-- Responses Text Post -->'+
          					'<div class="list-comment">'+
          					'<ul id="list-comment-'+data.comments[i].id+'">'+
          					'</ul>'+
          					'</div>'+
          				'<!-- End Responses Text Post -->'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<!--End Text Post -->';
        }
		if (data.comments[i].type === 'album') {

          html += '<!-- Text Post -->'+
            '<div class="history-post" id="history-list-'+data.comments[i].id+'">'+
              '<div class="post-item" id="'+data.comments[i].id+'">'+
                '<div class="user-area">'+
                 ' <div class="comment-options">'+
                    '<ul>'+
                      '<li><a href="javascript:;" onclick="onEdit('+data.comments[i].id+')">Editar</a></li>'+
                      '<li><a href="javascript:;" onclick="onDelete('+data.comments[i].id+')">Eliminar</a></li>'+
                    '</ul>'+
                  '</div>'+
                  '<div class="avatar" style="background: url('+data.comments[i].profile_pic+'); background-size: cover;"></div>'+
                  '<div class="data class-'+data.comments[i].id+'">'+
                    '<h1>'+
                      '<a href="/mobile_app/layout_user.html?id='+data.comments[i].id_user+'">'+data.comments[i].username+': </a>'+
                      '<span class="span-edit" style="font-size: 14px;">'+data.comments[i].album_name+'</span>'+
                      '<input type="hidden" class="input-edit" name="title">'+
                    '</h1>'+
                    '<p>'+data.comments[i].date+'</p>'+
                  '</div>'+
                '</div>'+
                '<div class="user-post">'+
                  '<div class="media-post">'+
					         '<ul class="multi-image" style="text-align: center;" id="multi-image-'+data.comments[i].id+'">'+
					         '</ul>'+
                  '</div>'+
                  '<div class="tool-bar">'+
                    '<span class="reply-counter">Respuestas: '+data.comments[i].responses.length+'</span>'+
                     ' <ul>'+
                       ' <li><a class="share-band" href="javascript:;"> </a></li>'+
                        '<li><a class="create-comment" href="javascript:;"></a></li>'+
                        '<li><a class="like-band like-band-'+data.comments[i].id+'" href="javascript:;" onclick="onLike('+data.comments[i].id+')"> </a></li>'+
                       ' <li><a class="comment-like counter-like-'+data.comments[i].id+'" href="javascript:;">'+data.comments[i].like+'</a></li>'+
                       ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>'+
                     ' </ul>'+
                  '</div>'+
                  '<!-- Responses Text Post -->'+
          					'<div class="list-comment">'+
          					'<ul id="list-comment-'+data.comments[i].id+'">'+
          					'</ul>'+
          					'</div>'+
          				'<!-- End Responses Text Post -->'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<!--End Text Post -->';
        }
      }

    $('.main-post').after(html);

	for (var i = 0; i < data.comments.length; i++) {

    	for (var j = 0; j < data.comments[i].responses.length; j++) {


    		$('<li class="response_id_'+data.comments[i].responses[j].id+'">'+
    			'<div class="comment-options responses">'+
    			'<ul>'+
    			'<li><a href="javascript:;" onclick="onEdit('+data.comments[i].responses[j].id+')">Editar</a></li>'+
    			'<li><a href="javascript:;" onclick="onDelete('+data.comments[i].responses[j].id+')">Eliminar</a></li>'+
    			'</ul>'+
    			'</div>'+
    			'<div class="avatar" style="background: url('+data.comments[i].responses[j].profile_pic+'); background-size: cover;"></div>'+
    			'<span class="name_user"><a>'+data.comments[i].responses[j].username+'</a></span>'+
    			'<span class="data_response" id="'+data.comments[i].responses[j].id+'">'+data.comments[i].responses[j].response+'</span> '+
    			'<div class="tool-bar comment">'+
    			'<ul>'+
    			'<li><a class="share-band" href="javascript:;"> </a></li>'+
    			'<li><a class="create-comment" href="javascript:;"></a></li>'+
    			'<li><a class="like-band like-band-res" href="javascript:;" onclick="onLike('+data.comments[i].responses[j].id+')"> </a></li>'+
    			'<li><a class="comment-like counter-like-'+data.comments[i].responses[j].id+'" href="javascript:;">'+data.comments[i].responses[j].like+'</a></li>'+
    			'<li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>'+
    			'</ul>'+
    			'</div>'+
    			'</li>'+
    			'<li class="comment-post-area">'+
    			'<div class="avatar" style="background: url('+user.profile_pic+'); background-size: cover;"></div>'+
    			'<div class="text-area responses">'+
    			'<textarea></textarea>'+
    			'</div>'+
    			'<input type="hidden" class="id_user" name="'+user.id+'">'+
    			'<input type="hidden" class="id_band" name="'+band.id+'">'+
    			'<input type="hidden" class="username" name="'+user.name+'">'+
    			'<input type="hidden" class="id_comment" name="'+data.comments[i].responses[j].id_comment+'">'+
    			'<div class="tool-bar">'+
    			'<ul>'+
    			'<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>'+
    			'</ul>'+
    			'</div>'+
    			'</li>').appendTo('#list-comment-'+data.comments[i].id+'');
		}

		if (data.comments[i].type === 'album') {
    	
    	for (var j = 0; j < data.comments[i].pictures.length; j++) {


    		$('<img src="'+data.comments[i].pictures[j]+'" style="width: 40%; height: auto;">').appendTo('#multi-image-'+data.comments[i].id+'');
		}


		}
	}

  for (var i = 0; i < data.videos.length; i++) {

        if (data.videos[i].type === 'B') {

            video += '<li class="video-section">'+
            '<a href="'+data.videos[i].route+'">'+
              '<span class="thrumb" style="background: url(\''+data.videos[i].img+'\'); background-size: cover;"></span>'+
              '<div class="info">'+
                '<a href="'+data.videos[i].route+'" class="video-info">'+
                  '<h3>'+data.videos[i].song+'</h3>'+
                '</a>'+
                '<a href="/bands/comments?id='+data.videos[i].id_band+'" class="video-info">'+
                  '<p>'+data.videos[i].artist+'</p>'+
                '</a>'+
                '<small>Vistas: '+data.videos[i].views+'</small>'+
              '</div>'+
           '</a>'+
          '</li>';

        }else{

            video += '<li class="video-section">'+
            '<a href="'+data.videos[i].route+'">'+
              '<span class="thrumb" style="background: url(\''+data.videos[i].img+'\'); background-size: cover;"></span>'+
              '<div class="info">'+
                '<a href="'+data.videos[i].route+'" class="video-info">'+
                  '<h3>'+data.videos[i].song+'</h3>'+
                '</a>'+
                '<a href="/users/wall?id='+data.videos[i].id_band+'" class="video-info">'+
                  '<p>'+data.videos[i].artist+'</p>'+
                '</a>'+
                '<small>Vistas: '+data.videos[i].views+'</small>'+
              '</div>'+
           '</a>'+
          '</li>';

        }

       }

       $('#last-item-video').before(video);

    },
  });

  }
}

/*Load Band's Music*/

function loadMusic() {

  var id = getUrlParameter('id');
  
  var authCheck = localStorage.getItem("auth");

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , bandwall = localStorage.getItem("band");

    var band = JSON.parse(bandwall);
    var user = JSON.parse(user);

    $.ajax({
    url: host+'bandWallService?id='+id,
    type: 'GET',
    success: function(response) {

      var data  = JSON.parse(response)
      ,   video = '';

      if (user.id_band == band.id) {

        $('<li class="upload-li">'+
          '<div class="video uploadmore">'+
          '<div class="icon-plus"></div>'+
          '</div>'+
          '</li>').appendTo('#append_music');

      }

      for (var i = 0; i < data.videos.length; i++) {

            video += '<li>'+
                      '<div class="video">'+
                      '<div class="slider-video">'+
                      '<a id="video_comment" href="'+data.videos[i].route+'">'+
                      '<img src="'+data.videos[i].img+'">'+
                      '<input style="display: none;" type="text" class="ruta-video" value="https://www.youtube.com/embed/'+data.videos[i].id_url+'?autoplay=0">'+
                      '<iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>'+
                      '</a>'+
                      '</div>'+
                      '<div class="info-bottom">'+
                      '<ul class="ul-info">'+
                      '<li class="li-info">'+
                      '<a style="color: black;"><p class="my-left">'+data.videos[i].song+'</p></a><br>'+
                      '<a style="color: black;"><h5 class="my-left"><b>'+data.videos[i].artist+'</b></h5></a>'+
                      '</li>'+
                      '</ul>'+
                      '<ul class="ul-options">'+
                      '<li class="li-info"><a class="comment-like vlike-counter-'+data.videos[i].id+'" href="javascript:;">'+data.videos[i].likes+'</a></li>'+
                      '<li><a class="love-band like-band-" href="javascript:;"  onclick="videoLike('+data.videos[i].id+');"> </a></li>'+
                      '<li><a class="share-band" href="javascript:;" > </a></li>'+
                      '</ul>'+
                      '</div>'+
                      '</div>'+
                      '</li>';
      }

       $('#append_music').append(video);

    },
  });

  }
}

/*Load Wall Data*/
function loadWall() {

	var user     = localStorage.getItem("user")
  ,   bandwall = localStorage.getItem("band")
  ,   id_band  = getUrlParameter('id');

    var userWall = JSON.parse(bandwall);
    var user = JSON.parse(user);

	$('#profile_pic').val(user.profile_pic);
	$('#username').val(user.name);
	$('.id_user').val(user.id);
	$('.id_band').val(id_band);

}

/*On document ready funtions*/

$(document).ready(function(){

  wallUser();
  loadIncludes();
  loadContainer();
  loadAuthUser();
  getFollows();
  checkFollowers();
  loadTwitterWidget();
  loadWall();
  loadPost();
  loadMusic();
  loadNotifications();
  loadSponsors();

/*Drag background image*/
  var wrapperOffset = $(".slider-type-2").offset();

  var defaultImg = $('.slider-type-2 .image-1').attr('src');
  
  // Drag background image.
  // Verify default image.

  if(defaultImg) {
    $('.slider-type-2 .image-1').css('height', 'auto');
  } else {
    $('.slider-type-2 .image-1').css('height', '100%');
  }

  var imgSize = $('.slider-type-2 .image-1').height();

if ($('#id_confirmation').val() == 'YES') {
$('.slider-type-2 .image-1').css('cursor', '-webkit-grabbing');
$('.slider-type-2 .image-1').css('cursor', '-moz-grabbing');

  $('.slider-type-2 .image-1').draggable({

      axis: "y",
      cursor: "move",
      containment: [
      wrapperOffset.left,
      wrapperOffset.top - ( $('.slider-type-2 .image-1').height() + 500),
      wrapperOffset.left,
      wrapperOffset.top 
      ],

    drag:function(event,ui) {

      var offset =  $('.slider-type-2 .image-1').css('top');
      var wWidth = $(window).width();
      $('.img-coordenadasY-back').val(offset);
      $('.img-coordenadasX-back').val(wWidth);
      $('.update-background, .background-legend').removeClass('active');
      $('.save-position-image').addClass('active');

    },

    drop:function(event, ui){

      var offset =  $('.slider-type-2 .image-1').css('top');
      var wWidth = $(window).width();
      $('.slider-type-2 .image-1').css('cursor', 'pointer');
      $('.img-coordenadasY-back').val(offset);
      $('.img-coordenadasX-back').val(wWidth);
      $('.update-background, .background-legend').removeClass('active');
      $('.save-position-image').addClass('active');

    }
  });

}        

/*Save background position*/

  $('.save-position-image').on('click',function(){

    $('#background-pic').submit();
  
  });

/*Seen notifications*/

  setTimeout(function(){

    $.get('/notifications/seen', function(response){});

  },400);

/*Resize background image*/

  var $portadaImg = $('#image-1');
  var originalPortadaTop = $portadaImg.css('top');

  function portadaResize () {

    var wWidth = $(window).width();

    if (wWidth <= 753) {

      $portadaImg.css('top', '0px');

    } 

  }

  $(window).resize(function(){
    portadaResize();
  });

  portadaResize();


});