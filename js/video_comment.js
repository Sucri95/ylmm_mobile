var $loaderOverlay = $('.overlay-loader');

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

/*Video Likes*/
function videoLike(id_video) {
    $.get('/videos/addLike?id_video=' + id_video, function(response) {

        if (response == 1) {

            $('.like-band-' + id_video).addClass('active');

            var like = $('.vlike-counter-' + id_video);
            var likeSum = parseInt($(like).text()) + 1;
            $(like).text(likeSum);

            console.log('¡Video Likeado!');

        } else {


            $('.like-band-' + id_video).removeClass('active');

            var like = $('.vlike-counter-' + id_video);
            var likeSum = parseInt($(like).text()) - 1;
            $(like).text(likeSum);


            console.log(response);
        }
    })
}
//-----------------------------------------------------------------------------------------------------------------
/* Comentar un comentario existente */
$(document).on('click','.create-comment', function(){

	var  id_user = $(this).parent('li').parent('ul').siblings('.id_user').val()
	, id_band = $(this).parent('li').parent('ul').siblings('.id_band').val()
	, id_video = $(this).parent('li').parent('ul').siblings('.id_video').val()
	, id_comment = $(this).parent('li').parent('ul').siblings('.id_comment').val()
	, userName = $('#username').val()
	, profile_pic = avatar = $('#profile_pic').val();

	var newPost = '<div class="comment-area" style="border: 0px!important;">'+
				'<div class="avatar" style="background: url('+profile_pic+'); background-size: cover;"></div>'+
				'<div class="text-area responses text-replay"><div class="input-text" contenteditable="true" style="outline:0px;"></div></div>'+
				'<div class="toolbox">'+
					'<ul class="right options-icons" style="margin-top: -3px;">'+
						'<input type="hidden" class="id_video" name="id_video" value="'+id_video+'">'+
                        '<input type="hidden" class="id_band" name="id_band" value="'+id_band+'">'+
                        '<input type="hidden" class="id_comment" name="id_comment" value="'+id_comment+'">'+
                        '<input type="hidden" class="id_user" name="id_user" value="'+id_user+'">'+
                        '<input type="hidden" id="profile_pic" name="profile_pic" value="'+profile_pic+'">'+
						'<li class="li-addreplay" style="margin: 0px!important;"><button class="addreplay">Publicar</button></li>'+
					'</ul>'+
				'</div>'+
			'</div>';

$(this).parents('.toolbox').children('.comment-area').remove();
$(this).parent('li').parent('ul').parent('.toolbox').append(newPost);
$(this).parent('li').parent('ul').parent('.toolbox').css("cssText", "width: 100% !important;");

});

//-----------------------------------------------------------------------------------------------------------------
		
/* Crear Respuesta */
$(document).on('click','.addreplay', function(){

	var text = $(this).parents('.toolbox').prev('.text-area').children('.input-text').html()
	,   id_user = $(this).parent('li').siblings('.id_user').val()
	,   id_band = $(this).parent('li').siblings('.id_band').val()
	,   id_video = $(this).parent('li').siblings('.id_video').val()
	,   id_comment = $(this).parent('li').siblings('.id_comment').val()
	,   avatar = $('#profile_pic').val()
	,   userName = $('#username').val()
	,   f = new Date()
	,   users = $('#userArray').val();

  	if (users != '') {
	    
	    var check = 'true',
	    findCount = users.indexOf(',');

	    if (findCount > 0) {
	    
	      var findUser = users.split(',')
	      ,   number = findUser.length;
	    
	    }else{

	      var number = 1;

	    }

	  }else{
	    
	    var check = 'false';

	  }

		$.ajax({

		  url: 'http://www.youlovemymusic.com/mobile/comment/video',
		  type: 'POST',
		  dataType: 'json',
		  contentType: "application/json",
		  data:  JSON.stringify({
		    comment   : text,
		    id_user   : id_user,
		    id_video  : id_video,
		    type      : type,
		    check     : check, 
		    count     : number,
		    user      : users,
		    id_comment: id_comment
		  }),

		  success: function(response) {


			var newPost = '<div class="replay-area" id="replay-area_'+response+'">'+
			'<div class="avatar" style="background: url(\''+avatar+'\'); background-size: cover;"></div>'+
			'<div class="comment-options">'+
			'<ul>'+
			' <li><a href="javascript:;" onclick="onEdit('+response+')">Editar</a></li>'+
			'<li><a href="javascript:;" onclick="onDelete('+response+')">Eliminar</a></li>'+
			'</ul>'+
			'</div>'+
			'<p><b><a href="javascript:;">'+userName+'</a></b><br><small>'+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()+'</small> </p>'+
			'<p>'+text+' </p>'+
			'<div class="toolbox">'+
			'<input type="hidden" class="id_video" name="id_video" value="'+id_video+'">'+
			'<input type="hidden" class="id_band" name="id_band" value="'+id_band+'">'+
			'<input type="hidden" class="id_comment" name="id_comment" value="'+response+'">'+
			'<input type="hidden" class="id_user" name="id_user" value="'+id_user+'">'+
			'<input type="hidden" id="profile_pic" name="profile_pic" value="'+avatar+'">'+
			'<ul class="right options-icons">'+
			'<li style="position: relative;"><a class="share-band" style="" href="javascript:;"> </a></li>'+
			'<li><button class="create-comment" style="margin-top: 0px!important;"></button></li>'+
			'<li><a class="like-band like-band-'+response+' like-comments" href="javascript:;" onclick="onLike('+response+')"> </a></li>'+
			'<li><a class="comment-like counter-like-'+response+'" href="javascript:;"> 0 </a></li>'+
			'<li style="float: left;"></li>'+
			'</ul>'+
			'</div>'+
			'</div>'+
			'</div>';

			var areaAppend = $('.addreplay').parent('li').parent('ul').parent('div').parent('div').parent('div').parent('div').children('.replay-area:last-child');

			$(newPost).insertAfter(areaAppend);

			$('.addreplay').parents('.toolbox').prev('.text-area').children('textarea').val('');

			$('.addreplay').parent('li').parent('ul').parent('div.toolbox').parent('div.comment-area').remove();
		    $('.main-textarea').html("");
		    $('#userArray').val('');
		    console.log('¡Respuesta Publicada!');

		  }
		});

});


//-----------------------------------------------------------------------------------------------------------------

// Crear nuevo comentario en la publicacion.
$(document).on('click', '.top-publicacion', function(){
	
	var text =  $(this).parents('.toolbox').siblings('.text-area').children('.input-text').html()
	,   avatar = $('#profile_pic').val()
	,   id_user = $(this).parent('li').siblings('.id_user').val()
	,   id_band = $(this).parent('li').siblings('.id_band').val()
	,   id_video = $(this).parent('li').siblings('.id_video').val()
	,   userName = $('#username').val()
	,   f = new Date()
	,   users = $('#userArray').val();
  	
  	if (users != '') {
	    
	    var check = 'true',
	    findCount = users.indexOf(',');

	    if (findCount > 0) {
	    
	      var findUser = users.split(',')
	      ,   number = findUser.length;
	    
	    }else{

	      var number = 1;

	    }

	}else{
	    
	    var check = 'false';
	    
	}

	if(text != '') {
		
		$.ajax({

		  url: 'http://www.youlovemymusic.com/mobile/comment/video',
		  type: 'POST',
		  dataType: 'json',
		  contentType: "application/json",
		  data:  JSON.stringify({
		    comment   : text,
		    id_user   : id_user,
		    id_video  : id_video,
		    type      : type,
		    check     : check, 
		    count     : number,
		    user      : users,
		    id_comment: ''
		  }),

		  success: function(response) {

		    var  newPost  = 
		    '<div class="comment-history-list" id="history-list-'+response+'">'+
		    '<div class="parent-comment">'+
		    '<div class="top-comment">'+
		    '<div class="avatar" style="background: url(\''+avatar+'\'); background-size: cover;"></div>'+
		    '<div class="comment-options">'+
		    '<ul>'+
		    '<li><a href="javascript:;" onclick="onEdit('+response+')">Editar</a></li>'+
		    '<li><a href="javascript:;" onclick="onDelete('+response+')">Eliminar</a></li>'+
		    '</ul>'+
		    '</div>'+

		    '<p><b><a href="users/wall?id='+id_user+'">'+userName+'</a></b><br><small>'+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()+'</small> </p>'+
		    '<p class="text-comment" id="'+response+'"> '+text+' </p>'+
		    '<div class="toolbox">'+
		    '<input type="hidden" class="id_video" name="id_video" value="'+id_video+'">'+
		    '<input type="hidden" class="id_band" name="id_band" value="'+id_band+'">'+
		    '<input type="hidden" class="id_comment" name="id_comment" value="'+response+'">'+
		    '<input type="hidden" class="id_user" name="id_user" value="'+id_user+'">'+
		    '<input type="hidden" id="profile_pic" name="profile_pic" value="'+avatar+'">'+

		    '<ul class="right options-icons">'+
		    '<li style="position: relative;"><a class="share-band" style="" href="javascript:;"> </a></li>'+
		    '<li><button class="create-comment" style="margin-top: 0px!important;"></button></li>'+
		    '<li><a class="like-band like-band-'+response+' like-comments" href="javascript:;" onclick="onLike('+response+')"> </a></li>'+
		    '<li><a class="comment-like counter-like-'+response+'" href="javascript:;"> 0 </a></li>'+
		    '<li style="float: left;"></li>'+
		    '</ul>'+
		    '</div>'+
		    '<div class="replay-area"></div>'+
		    '</div>'+
		    '</div>';

		    $(newPost).insertBefore('.video-comment-content > .comment-history-list:nth-child(3)');
		    var numComment = parseInt($('.video-comment-content .header h2').text().split(' ').pop()) + 1;
		    $('.video-comment-content .header h2').empty().append('<b>Comentarios </b>'+numComment);
		    $('.input-text').html("");
		    $('#userArray').val('');
		    console.log('¡Comentario Publicado!');

		  }
		});

	}

});


//------------------------------------------------Editar comentarios -----------------------------------------------------------------


$(document).on('click','.comment-options ul li:nth-child(1)',function(){

  var avatar = $('#profile_pic').val()
  ,   user = $(this).parent('ul').parent('div.comment-options').siblings('p').children('b').children('a').text()
  ,   data = $(this).parent('ul').parent('div.comment-options').siblings('p.text-comment')
  ,   tool = $(this).parent('ul').parent('div.comment-options').siblings('div.toolbox')

  $(data).addClass('hidde');
  $(tool).addClass('hidde');

   $(data).after( '<textarea class="edit-post">'+$(data).text().trim('  ')+'</textarea>'+
        '<div class="tool-bar"><ul><li class="btn-edit-post" style="margin-top: 5px!important; font-size: 11px!important;">'+
        '<a class="edit-a" href="javascript:;" style="position: inherit; line-height: 20px;">Finalizar</a></li></ul></div>');    

});


$(document).on('click','.btn-edit-post', function(){

  var data = $(this).parent('ul').parent('div.tool-bar').siblings('.edit-post')
  ,   tool = $(this).parent('ul').parent('div.tool-bar')
  ,   span = $(this).parent('ul').parent('div.tool-bar').siblings('p.text-comment')
  ,   visible_tool = $(this).parent('ul').parent('div.tool-bar').siblings('.toolbox')
  
   
    var idComment = $(span).attr('id');

    var postcomment = $(data).val();


    $.get('/editcomment?id='+idComment+'&comment='+postcomment, function (response) {
      if (response == 1) {
        console.log('¡Comentario Editado!');
      }else{
        console.log(response);
      }
    });

  $(visible_tool).removeClass('hidde');
  $(span).removeClass('hidde').text($(data).val());
  $(data).remove();
  $(tool).remove();

});

$(document).on('click', '.img-view', function() {

	var vote = $('.view-counter');
	var vote1 = parseInt($(vote).text()) + 1;      
	$(vote).text(vote1);

});

function onView(id)
{
$.get('/users/fan/addView?id='+id, function (response) {
  if (response == 1) {
    console.log('¡Video Visto!');
  }else{
    console.log(response);
  }
})
}

function onLike(id)
{

$.get('/bands/band_comments/addLike?id='+id, function (response) {

  if (response == 1) {

    $('.like-band-'+id).addClass('active');

    var like = $('.counter-like-'+id);
    var likeSum = parseInt($(like).text()) + 1;      
    $(like).text(likeSum);

    console.log('¡Comentario Likeado!');

  }else{

    $('.like-band-'+id).removeClass('active');

    var like = $('.counter-like-'+id);
    var likeSum = parseInt($(like).text()) - 1;      
    $(like).text(likeSum);

    console.log(response);
  }
  
});
}

/*Check video like*/

function checkLikeV(id) {

$.get('/check/video/likes?id='+id, function (response) {

  if (response == 1) {

    $('.like-band-'+id).addClass('active');

  }else{

     $('.like-band-'+id).removeClass('active');

  }
});
	
}

/*Check comment likes*/
function checkLikeComment(id) {

$.get('/check/comment/likes?id='+id, function (response) {

  if (response == 1) {

    $('.like-band-'+id).addClass('active');


  }else{

     $('.like-band-'+id).removeClass('active');

  }
});
	
}


$(document).on('click','.comment-options',function(){
  $(this).children('ul').toggleClass('active');
});

$(document).on('click', '.share-band', function() {
  $('.share-overlay').css('display', 'block');
});

$(document).on('click', '.share-overlay.active', function() {
  $(this).css('display', 'none');
});

$(document).on('click', '.slider-video', function() {
    var item = $(this).children('a').children('input').val(),
    iframe = $(this).children('a').children('iframe').addClass('my-visible').attr('src', item);
  
    $(this).children('a').children('img').addClass('not-visible');  
    $(this).children('a').children('div').addClass('not-visible');  
});

//---------------------------------------------------------------------------------
/*Share funtion load*/
var videoId = 0
,   videoName = ''
,   videoAbout = ''
,   videoPic = ''
,   videoUrl = '';

function load_metaTags() {

    var id = getUrlParameter('id');

    $.ajax({
        url: host + 'videos/player?id_video=' + id,
        type: 'GET',
        success: function(response) {

            var data = JSON.parse(response);

            videoId    = data.video.id;
            videoName  = data.video.artist;
			videoAbout = data.video.about;
			videoPic   = data.video.profile_pic;
			var pic = videoPic.split('../../');
			pic = pic[1];
			videoPic = 'http://www.youlovemymusic.com/'+pic;
			videoUrl = 'http://www.youlovemymusic.com/mobile_app/video_reproductor.html?id='+videoId;

			$("meta[property='og\\:title']").attr("content", videoName);
			$("meta[property='og\\:description']").attr("content", videoAbout);
			$("meta[property='og\\:image']").attr("content", videoPic);
			$("meta[property='og\\:url']").attr("content", videoUrl);

			console.log('Title: '+videoName+' description: '+videoAbout+ ' image: '+videoPic+' url: '+videoUrl);

			console.log('Done');
			
			var lib = '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58d14bef0f66d9fe"></script> ';
			var div = '<div id="share-video" class="addthis_inline_share_toolbox active"></div>';
			

			$('#container-share').append(div);
			
			$('body').append(lib);
		},
	});
}	

/*Video reproductor*/


function loadVideoPlayer() {

    var id = getUrlParameter('id');

    var authCheck = localStorage.getItem("auth");

    if (authCheck === 'true') {

        var user = localStorage.getItem("user"),
            wall = localStorage.getItem("user_wall");

        var userWall = JSON.parse(wall);
        var user = JSON.parse(user);

        $.ajax({
            url: host + 'videos/player?id_video=' + id,
            type: 'GET',
            success: function(response) {

                var data = JSON.parse(response),
                    html = '',
                    video = '',
                    respo = '';

                $('<div class="main-inner-container bands-video">' +
                    '<div class="video-area" style="padding: 0; background: none;">' +
                    '<div class="video-content">' +
                    '<div class="slider-video" style="height: 100%;">' +
                    '<a href="javascript:;">' +
                    '<img src="' + data.video.img + '" style="height: 100%;" class="img-view" onclick="onView(' + data.video.id + ')">' +
                    '<input style="display: none;" type="text" class="ruta-video" value="https://www.youtube.com/embed/' + data.video.idurl + '?autoplay=1">' +
                    '<iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="video-info-content">' +
                    '<div class="video-data">' +
                    '<div class="title">' +
                    '<span style="float: left;">' + data.video.song + '</span>' +
                    '</div>' +
                    '<div class="user-info">' +
                    '<div class="avatar" style="background: url(\'' + data.video.profile_pic + '\'); background-size: cover;"></div>' +
                    '<input id="profile_pic" class="hidden">' +
                    '<div class="info-content">' +
                    '<a href="' + data.video.route + '">' +
                    '<h4>' + data.video.artist + '</h4>' +
                    '</a>' +
                    '</div>' +
                    '<div class="views">' +
                    '<span>Vistas: </span><span class="view-counter">' + data.video.views + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="video-toolbar main-toolbar">' +
                    '<ul class="left-items"></ul>' +
                    '<ul class="right-items right-items-main">' +
                    '<li><a class="comment-like vlike-counter-' + data.video.id + '" href="javascript:;" style="height: 100%;">' + data.video.likes + '</a></li>' +
                    '<li><a class="like-band like-band-' + data.video.id + '" href="javascript:;" onclick="videoLike(' + data.video.id + ');"> </a></li>' +
                    '<li><a class="share-band" href="javascript:;"> </a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="video-description-content hidden"></div>' +
                    '<div class="video-comment-content">' +
                    '<div class="header"><h2><b>Comentarios </b>' + data.video.counter + '</h2></div>' +
                    '<div class="comment-area" id="comment_append">' +
                    '<div class="avatar" style="background: url(\'' + user.profile_pic + '\'); background-size: cover;"></div>' +
                    '<div class="text-area responses"><div class="input-text" contenteditable="true" style="outline:0px;"></div></div>' +
                    '<input id="userArray" type="hidden" name="">' +
                    '<div class="toolbox">' +
                    '<ul class="right">' +
                    '<input type="hidden" class="id_video" name="id_video" value="' + data.video.id + '">' +
                    '<input type="hidden" class="id_musician" name="id_musician" value="0">' +
                    '<input type="hidden" class="id_user" name="id_user" value="' + user.id + '">' +
                    '<input type="hidden" id="username" name="username" value="' + user.name + '">' +
                    '<li class="li-top"><button class="top-publicacion">Publicar</button></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="comment-history-list">' +
                    '<div class="parent-comment">' +
                    '<div class="top-comment"></div>' +
                    '</div>' +
                    '</div>' +

                    '</div>' +
                    '</div>' +
                    '<div class="related-area">' +
                    '<div class="header">' +
                    '<p>MÚSICA RELACIONADA</p>' +
                    '</div>' +
                    '<ul>' +

                    '<li class="last-item-video" id="lastitem"></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>').appendTo('#append_video_reproductor');


                for (var i = 0; i < data.comments.length; i++) {

                    html +=
                        '<div class="comment-history-list" id="history-list-' + data.comments[i].id + '">' +
                        '<div class="parent-comment">' +
                        '<div class="top-comment">' +
                        '<div class="avatar" style="background: url(\'' + data.comments[i].profile_pic + '\'); background-size: cover;"></div>' +
                        '<div class="comment-options" style="top: 0px; right: 0px;">' +
                        '<ul>' +
                        '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                        '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                        '</ul>' +
                        '</div>' +
                        '<p>' +
                        '<b><a href="' + data.comments[i].route + '">' + data.comments[i].username + '</a></b><br>' +
                        '<small>' + data.comments[i].date + '</small>' +
                        '</p>' +
                        '<p class="text-comment" id="' + data.comments[i].id + '">' + data.comments[i].text + '</p>' +
                        '<div class="toolbox">' +
                        '<input type="hidden" name="id_user" class="id_user" value="' + data.comments[i].id_user + '">' +
                        '<input type="hidden" name="id_band" class="id_band" value="0">' +
                        '<input type="hidden" name="id_video" class="id_video" value="' + data.comments[i].id_video + '">' +
                        '<input type="hidden" name="id_comment" class="id_comment" value="' + data.comments[i].id + '">' +
                        '<ul class="right options-icons">' +
                        '<li style="position: relative;"><a class="share-band" style="" href="javascript:;"> </a></li>' +
                        '<li><button class="create-comment" style="margin-top: 0px!important;"></button></li>' +
                        '<li><a id="'+data.comments[i].id+'" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                        '<li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>     ' +
                        '<li style="float: left;"></li>' +
                        '</ul>' +
                        '</div>' +
                        '<div class="replay-area" style="height: 25px;" id="append_responses_' + data.comments[i].id + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                }

                $('#comment_append').after(html);

                for (var i = 0; i < data.comments.length; i++) {

                    for (var j = 0; j < data.comments[i].responses.length; j++) {


                        $('<div class="replay-area" id="replay-area_' + data.comments[i].responses[j].id + '">' +
                            '<div class="top-comment">' +
                            '<div class="avatar" style="background: url(\'' + data.comments[i].responses[j].profile_pic + '\'); background-size: cover;"></div>' +
                            '<div class="comment-options responses" style="top: 0px; right: 0px;">' +
                            '<ul>' +
                            '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].responses[j].id + ')">Editar</a></li>' +
                            '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].responses[j].id + ')">Eliminar</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '<p>' +
                            '<b><a href="' + data.comments[i].responses[j].route + '">' + data.comments[i].responses[j].username + '</a></b><br>' +
                            '<small>' + data.comments[i].responses[j].date + '</small>' +
                            '</p>' +
                            '<p class="text-comment" id="' + data.comments[i].responses[j].id + '">' + data.comments[i].responses[j].text + '</p>' +
                            '<div class="toolbox">' +
                            '<input type="hidden" name="id_user" class="id_user" value="' + data.comments[i].responses[j].id_user + '">' +
                            '<input type="hidden" name="id_band" class="id_band" value="0">' +
                            '<input type="hidden" name="id_video" class="id_video" value="' + data.comments[i].responses[j].id_video + '">' +
                            '<input type="hidden" name="id_comment" class="id_comment" value="' + data.comments[i].id + '">' +
                            '<!--ul class="right options-icons">' +
                            '<li style="position: relative;"><a class="share-band" style="" href="javascript:;"> </a></li>' +
                            '<li><button class="create-comment" style="margin-top: -2px;"></button></li>' +
                            '<li><a id="'+data.comments[i].responses[j].id+'" class="like-band like-band-' + data.comments[i].responses[j].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].responses[j].id + ')"> </a></li>' +
                            '<li><a class="comment-like counter-like-' + data.comments[i].responses[j].id + '" href="javascript:;">' + data.comments[i].responses[j].like + '</a></li> ' +
                            '</ul-->' +
                            '</div>' +
                            '<div class="replay-area" style="height: 25px;"></div>' +
                            '</div>' +
                            '</div>').appendTo('#append_responses_' + data.comments[i].id + '');
                    }

                }

                for (var i = 0; i < data.related.length; i++) {

                    if (data.related[i].type === 'B') {

                        video += '<li class="video-section">' +
                            '<a href="' + data.related[i].route + '">' +
                            '<span class="thrumb" style="background: url(\'' + data.related[i].img + '\'); background-size: cover;"></span>' +
                            '<div class="info">' +
                            '<a href="' + data.related[i].route + '" class="video-info">' +
                            '<h3>' + data.related[i].song + '</h3>' +
                            '</a>' +
                            '<a href="/bands/comments?id=' + data.related[i].id_band + '" class="video-info">' +
                            '<p>' + data.related[i].artist + '</p>' +
                            '</a>' +
                            '<small>Vistas: ' + data.related[i].views + '</small>' +
                            '</div>' +
                            '</a>' +
                            '</li>';

                    } else {

                        video += '<li class="video-section">' +
                            '<a href="' + data.related[i].route + '">' +
                            '<span class="thrumb" style="background: url(\'' + data.related[i].img + '\'); background-size: cover;"></span>' +
                            '<div class="info">' +
                            '<a href="' + data.related[i].route + '" class="video-info">' +
                            '<h3>' + data.related[i].song + '</h3>' +
                            '</a>' +
                            '<a href="/users/wall?id=' + data.related[i].id_wall + '" class="video-info">' +
                            '<p>' + data.related[i].artist + '</p>' +
                            '</a>' +
                            '<small>Vistas: ' + data.related[i].views + '</small>' +
                            '</div>' +
                            '</a>' +
                            '</li>';

                    }

                }

                $('#lastitem').before(video);

                var id_wall = getUrlParameter('id');

                $('#auth_profile_pic').css({
                    'background': 'url(' + user.profile_pic + ')no-repeat',
                    'background-size': 'cover'
                });


                $('#profile_pic').val(user.profile_pic);
                $('#username').val(user.name);
                $('.id_user').val(user.id);
                $('.id_wall').val(id_wall);

            },
        }).done(function() {

        	checkLikeV(videoId);

			$(".like-comments").each(function( index ) {

				checkLikeComment($( this ).attr("id"));

			});

			console.log('oldfuntions');

          
            $loaderOverlay.fadeOut('slow');

        });

    }
}



$(document).ready(function() {

	load_metaTags();
	loadVideoPlayer();
});