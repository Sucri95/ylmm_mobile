var host = 'http://www.youlovemymusic.com/';

var $gearIcon = $('.gear-area');
var $loaderOverlay = $('.overlay-loader');


/*$gearIcon.on('click', function(){
  $('.desplegable').toggleClass('active');
});*/


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

function loadAuthUser() {
    $.ajax({
        url: host + 'auth/user',
        type: 'GET',
        success: function(data) {

            if (data != '') {

                localStorage.setItem("auth", "true");
                localStorage.setItem("user", data);

            }
        },
    });
}

var type = getUrlParameter('type');
var id = getUrlParameter('id');


function bandWall() {

    var id = getUrlParameter('id');

    $.ajax({
        url: host + 'band/wall?id=' + id,
        type: 'GET',
        success: function(data) {

            localStorage.setItem("band", data);
            loadPost();

        },
    });
}


function wallUser() {

    var id = getUrlParameter('id');

    $.ajax({
        url: host + 'user/wall?id=' + id,
        type: 'GET',
        success: function(data) {
            localStorage.setItem("user_wall", data);
            loadPost();
        },
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

/*Share vars*/

$(document).on('click', '.share-band.media', function() {

    var idcomment = $(this).parents('.history-post').children('.post-item').attr('id');
    var name = $('.class-'+idcomment).children('h1').children('a').text();
    var title = $('.class-'+idcomment).children('h1').children('span').text();
    var media = $('#history-list-'+idcomment).children('.post-item').children('.user-post').children('.media-post').children('img').attr('src');
    if (media == null) {
        media = $('#video_'+idcomment).children('source').attr('src');
    }
    var pic = media.split('../../');
    pic = pic[1];
    picUrl = 'http://www.youlovemymusic.com/'+pic;

    addthis.update('share', 'url', 'http://www.youlovemymusic.com/mobile_app/profile.html?id='+id+'&type='+type+'&id_comment='+idcomment); 
    addthis.url = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+id+"&type="+type+'&id_comment='+idcomment;
    addthis.update('share', 'title', name); 
    addthis.title = name;
    addthis.update('share', 'description', title); 
    addthis.description = title;
    addthis.update('share', 'media', picUrl); 
    addthis.media = picUrl;                     
    addthis.toolbox("#share-post");

});

/*Search user wall*/

function loadPost() {

    var id = getUrlParameter('id'),
        type = getUrlParameter('type'),
        authCheck = localStorage.getItem("auth");

    $('.type').val(type);

    if (authCheck === 'true') {

        if (type === 'M' || type === 'U') {

            var getuser = localStorage.getItem("user"),
                wall = localStorage.getItem("user_wall"),
                userWall = JSON.parse(wall),
                user = JSON.parse(getuser);


            $.ajax({
                url: host + 'userWallService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        html = '',
                        video = '',
                        respo = '';

                    $('#wall_name_user').text(userWall.name);

                    $('#img-avatar').css({
                        'background': 'url(' + userWall.profile_pic + ')no-repeat',
                        'background-size': 'cover'
                    });

                    if (userWall.background_pic != null) {

                        $('#background_img').css({
                            'background': 'url(' + userWall.background_pic + ')no-repeat',
                            'background-size': 'cover'
                        });

                    }

                    if (user.id == userWall.id) {
                        $('#wall_name_user').css('cursor', 'pointer');
                        $('#name_edit').children('.input-type-1').val(userWall.name);
                        $('#btn-follow-2').css("cssText", "display: none !important;");
                    } else {

                        $('.edit-avatar-profile').css('display', 'none');
                        $('.gear-area.gear').css('display', 'none');
                        $('#btn-follow-2').css('display', 'block');

                    }

                    if (userWall.id_musician == null) {

                        $('.btn-follow').attr('onclick', 'addfollower(' + userWall.id + ')');

                    } else {

                        $('.btn-follow').attr('onclick', 'makefanmusician(' + userWall.id_musician + ')');

                    }


                    $('#count-followers').text(data.followers);
                    $('#count-following').text(data.following);
                    $('#followers_redirect').attr('href', host + 'mobile_app/follow.html?id=' + userWall.id + '&type=F1')
                    $('#following_redirect').attr('href', host + 'mobile_app/follow.html?id=' + userWall.id + '&type=F2')

                    /*Stat configurations*/

                    $('#stat_1')
                        .attr('href', '/mobile_app/profile.html?id=' + userWall.id + '&type=M')
                        .css("cssText", "display: block !important;");

                    if (userWall.id_band != null) {
                        $('#stat_2').attr('href', '/mobile_app/profile.html?id=' + userWall.id_band + '&type=B');
                    } else {
                        swiperOptionsRemove('stat_2');
                    }

                    $('#stat_3').css("cssText", "display: block !important;");
                    $(document).on('click', '#stat_3', function() {
                        $('#wall_appended').empty();
                        $('#append_music').empty();
                        loadFavorites();
                    });


                    if (userWall.id_musician != null) {

                        $('#stat_4').css("cssText", "display: block !important;");
                        $(document).on('click', '#stat_4', function() {
                            $('#wall_appended').empty();
                            $('#append_music').empty();
                            $('.container.list').removeClass('hidden');
                            loadMusic();
                        });

                    } else {
                        swiperOptionsRemove('stat_4');
                    }

                    $('#stat_5').css("cssText", "display: block !important;");
                    $(document).on('click', '#stat_5', function() {
                        $('#wall_appended').empty();
                        $('#append_music').empty();
                        loadInformation();
                    });

                    if (userWall.user_level === '4') {
                    	swiperOptionsRemove('stat_5');
                    }

                    /*End Stat Config*/

                    for (var i = 0; i < data.comments.length; i++) {
                        if (data.comments[i].type === 'com') {
                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1><a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + '</a></h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="post-content">' +
                                '<span id="' + data.comments[i].id + '">' + data.comments[i].comment + '</span>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="'+data.comments[i].id+'" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'pic') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<img src="' + data.comments[i].comment + '" style="width: 100%; height: auto;">' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="'+data.comments[i].id+'" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'video') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<div class="media-post-content">' +
                                '<div class="overlay-icon-play">' +
                                '<div class="icon-play"></div>' +
                                '</div>' +
                                '<video id="video_' + data.comments[i].id + '" width="100%">' +
                                '<source src="' + data.comments[i].comment + '" type="video/mp4">' +
                                '</video>' +
                                '</div>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="'+data.comments[i].id+'" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;"> 0 </a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'album') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].album_name + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<ul class="multi-image" style="text-align: center;" id="multi-image-' + data.comments[i].id + '">' +
                                '</ul>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="'+data.comments[i].id+'" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                    }

                    $('.main-post').after(html);

                    for (var i = 0; i < data.comments.length; i++) {

                        for (var j = 0; j < data.comments[i].responses.length; j++) {

                            $('<li class="response_id_' + data.comments[i].responses[j].id + '">' +
                                '<div class="comment-options responses">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].responses[j].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].responses[j].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].responses[j].profile_pic + '); background-size: cover;"></div>' +
                                '<span class="name_user"><a>' + data.comments[i].responses[j].username + '</a></span>' +
                                '<span class="data_response" id="' + data.comments[i].responses[j].id + '">' + data.comments[i].responses[j].response + '</span> ' +
                                '<div class="tool-bar comment">' +
                                '<ul>' +
                                '<li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="'+data.comments[i].responses[j].id+'" class="like-band like-band-res like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].responses[j].id + ')"> </a></li>' +
                                '<li><a class="comment-like counter-like-' + data.comments[i].responses[j].id + '" href="javascript:;">' + data.comments[i].responses[j].like + '</a></li>' +
                                '<li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>').appendTo('#list-comment-' + data.comments[i].id + '');
                        }

                        if (data.comments[i].type === 'album') {

                            for (var j = 0; j < data.comments[i].pictures.length; j++) {

                                $('<img src="' + data.comments[i].pictures[j] + '" style="width: 40%; height: auto;">').appendTo('#multi-image-' + data.comments[i].id + '');

                            }
                        }
                    }

                    for (var i = 0; i < data.videos.length; i++) {

                        if (data.videos[i].type === 'B') {

                            video += '<li class="video-section">' +
                                '<a href="' + data.videos[i].route + '">' +
                                '<span class="thrumb" style="background: url(\'' + data.videos[i].img + '\'); background-size: cover;"></span>' +
                                '<div class="info">' +
                                '<a href="' + data.videos[i].route + '" class="video-info">' +
                                '<h3>' + data.videos[i].song + '</h3>' +
                                '</a>' +
                                '<a href="/bands/comments?id=' + data.videos[i].id_band + '" class="video-info">' +
                                '<p>' + data.videos[i].artist + '</p>' +
                                '</a>' +
                                '<small>Vistas: ' + data.videos[i].views + '</small>' +
                                '</div>' +
                                '</a>' +
                                '</li>';

                        } else {

                            video += '<li class="video-section">' +
                                '<a href="' + data.videos[i].route + '">' +
                                '<span class="thrumb" style="background: url(\'' + data.videos[i].img + '\'); background-size: cover;"></span>' +
                                '<div class="info">' +
                                '<a href="' + data.videos[i].route + '" class="video-info">' +
                                '<h3>' + data.videos[i].song + '</h3>' +
                                '</a>' +
                                '<a href="/users/wall?id=' + data.videos[i].id_wall + '" class="video-info">' +
                                '<p>' + data.videos[i].artist + '</p>' +
                                '</a>' +
                                '<small>Vistas: ' + data.videos[i].views + '</small>' +
                                '</div>' +
                                '</a>' +
                                '</li>';

                        }
                    }

                    $('#last-item-video').before(video);

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

                $(".like-comments").each(function( index ) {  checkLikeComment($( this ).attr("id"));  });
                activeSwipper($('.swiper-slide').length);
                $loaderOverlay.fadeOut('slow');
            });

        } else if (type === 'B') {

            var getuser = localStorage.getItem("user"),
                bandwall = localStorage.getItem("band"),
                band = JSON.parse(bandwall),
                user = JSON.parse(getuser);

            $.ajax({
                url: host + 'bandWallService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        html = '',
                        video = '',
                        respo = '';

                    $('#wall_name_user').text(band.name);

                    $('#img-avatar').css({
                        'background': 'url(' + band.profile_pic + ')no-repeat',
                        'background-size': 'cover'
                    });

                    if (band.background_pic != null) {

                        $('#background_img').css({
                            'background': 'url(' + band.background_pic + ')no-repeat',
                            'background-size': 'cover'
                        });

                    }

                    if (user.id_band == band.id) {
                        $('#wall_name_user').css('cursor', 'pointer');
                        $('#name_edit').children('.input-type-1').val(band.name);
                        $('#btn-follow-2').css("cssText", "display: none !important;");
                    } else {

                        $('.edit-avatar-profile').css('display', 'none');
                        $('.gear-area.gear').css('display', 'none');
                        $('#btn-follow-2').css('display', 'block');

                    }

                    $('.btn-follow').attr('onclick', 'makeFan(' + band.id + ')');


                    $('#count-followers').text(data.followers);
                    $('#followers_redirect').attr('href', host + 'mobile_app/follow.html?id=' + band.id + '&type=F1B');
                    $('#following_redirect').parents('.border-radius-20').css('display', 'none');
                    $('.flex-list.user-follow').css({
                        'width': '8em',
                        'margin-left': '3.9em'
                    });

                    /*Stat configurations*/

                    $('#stat_1')
                    .attr('href', '/mobile_app/profile.html?id=' + band.id + '&type=B')
                    .css("cssText", "display: block !important;");
                       
                    swiperOptionsRemove('stat_2');
                    swiperOptionsRemove('stat_3');


                    $('#stat_4').css("cssText", "display: block !important;");

                    $(document).on('click', '#stat_4', function() {
                        $('#wall_appended').empty();
                        $('#append_music').empty();
                        loadMusic();
                    });

                    $('#stat_5').css("cssText", "display: block !important;");
                    $(document).on('click', '#stat_5', function() {
                        $('#wall_appended').empty();
                        $('#append_music').empty();
                        loadInformation();
                    });


                    /*End Stat Config*/

                    for (var i = 0; i < data.comments.length; i++) {
                        if (data.comments[i].type === 'com') {
                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1><a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=M">' + data.comments[i].username + '</a></h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="post-content">' +
                                '<span id="' + data.comments[i].id + '">' + data.comments[i].comment + '</span>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + 'like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + band.id + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'pic') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=M">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<img src="' + data.comments[i].comment + '" style="width: 100%; height: auto;">' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + band.id + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'video') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=M">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<div class="media-post-content">' +
                                '<div class="overlay-icon-play">' +
                                '<div class="icon-play"></div>' +
                                '</div>' +
                                '<video id="video_' + data.comments[i].id + '" width="100%">' +
                                '<source src="' + data.comments[i].comment + '" type="video/mp4">' +
                                '</video>' +
                                '</div>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;"> 0 </a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + band.id + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'album') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=M">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].album_name + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<ul class="multi-image" style="text-align: center;" id="multi-image-' + data.comments[i].id + '">' +
                                '</ul>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + band.id + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                    }

                    $('.main-post').after(html);

                    for (var i = 0; i < data.comments.length; i++) {

                        for (var j = 0; j < data.comments[i].responses.length; j++) {

                            $('<li class="response_id_' + data.comments[i].responses[j].id + '">' +
                                '<div class="comment-options responses">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].responses[j].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].responses[j].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].responses[j].profile_pic + '); background-size: cover;"></div>' +
                                '<span class="name_user"><a>' + data.comments[i].responses[j].username + '</a></span>' +
                                '<span class="data_response" id="' + data.comments[i].responses[j].id + '">' + data.comments[i].responses[j].response + '</span> ' +
                                '<div class="tool-bar comment">' +
                                '<ul>' +
                                '<li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].responses[j].id + '" class="like-band like-band-res like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].responses[j].id + ')"> </a></li>' +
                                '<li><a class="comment-like counter-like-' + data.comments[i].responses[j].id + '" href="javascript:;">' + data.comments[i].responses[j].like + '</a></li>' +
                                '<li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>').appendTo('#list-comment-' + data.comments[i].id + '');
                        }

                        if (data.comments[i].type === 'album') {

                            for (var j = 0; j < data.comments[i].pictures.length; j++) {

                                $('<img src="' + data.comments[i].pictures[j] + '" style="width: 40%; height: auto;">').appendTo('#multi-image-' + data.comments[i].id + '');

                            }
                        }
                    }

                    for (var i = 0; i < data.videos.length; i++) {

                        video += '<li class="video-section">' +
                            '<a href="' + data.videos[i].route + '">' +
                            '<span class="thrumb" style="background: url(\'' + data.videos[i].img + '\'); background-size: cover;"></span>' +
                            '<div class="info">' +
                            '<a href="' + data.videos[i].route + '" class="video-info">' +
                            '<h3>' + data.videos[i].song + '</h3>' +
                            '</a>' +
                            '<a href="/mobile_app/profile.html?id=' + data.videos[i].id_band + '&type=B" class="video-info">' +
                            '<p>' + data.videos[i].artist + '</p>' +
                            '</a>' +
                            '<small>Vistas: ' + data.videos[i].views + '</small>' +
                            '</div>' +
                            '</a>' +
                            '</li>';

                    }

                    $('#last-item-video').before(video);

                    var id_band = getUrlParameter('id');

                    $('#auth_profile_pic').css({
                        'background': 'url(' + user.profile_pic + ')no-repeat',
                        'background-size': 'cover'
                    });


                    $('#profile_pic').val(user.profile_pic);
                    $('#username').val(user.name);
                    $('.id_user').val(user.id);
                    $('.id_band').val(id_band);
                },

            }).done(function() {

                $(".like-comments").each(function( index ) {  checkLikeComment($( this ).attr("id"));  });

            	activeSwipper($('.swiper-slide').length);
                $loaderOverlay.fadeOut('slow');
            });

        } else if (type == 'G') {

            var getuser = localStorage.getItem("user"),
                wall = localStorage.getItem("user_wall"),
                userWall = JSON.parse(wall),
                user = JSON.parse(getuser);

            $.ajax({

                url: host + 'generalWallService?id='+id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                    //var data = response,
                        html = '',
                        video = '',
                        respo = '';

                    $('#wall_name_user').text(userWall.name);

                    $('#img-avatar').css({
                        'background': 'url(' + userWall.profile_pic + ')no-repeat',
                        'background-size': 'cover'
                    });

                    if (userWall.background_pic != null) {

                        $('#background_img').css({
                            'background': 'url(' + userWall.background_pic + ')no-repeat',
                            'background-size': 'cover'
                        });

                    }

                    if (user.id == userWall.id) {
                        $('#wall_name_user').css('cursor', 'pointer');
                        $('#name_edit').children('.input-type-1').val(userWall.name);
                        $('#btn-follow-2').css("cssText", "display: none !important;");
                    } else {

                        $('.edit-avatar-profile').css('display', 'none');
                        $('.gear-area.gear').css('display', 'none');
                        $('#btn-follow-2').css('display', 'block');

                    }

                    if (userWall.id_musician == null) {

                        $('.btn-follow').attr('onclick', 'addfollower(' + userWall.id + ')');

                    } else {

                        $('.btn-follow').attr('onclick', 'makefanmusician(' + userWall.id_musician + ')');

                    }


                    $('#count-followers').text(data.followers);
                    $('#count-following').text(data.following);
                    $('#followers_redirect').attr('href', host + 'mobile_app/follow.html?id=' + userWall.id + '&type=F1')
                    $('#following_redirect').attr('href', host + 'mobile_app/follow.html?id=' + userWall.id + '&type=F2')

                    /*Stat configurations*/

                    $('#stat_1')
                        .attr('href', '/mobile_app/profile.html?id=' + userWall.id + '&type=M')
                        .css("cssText", "display: block !important;");

                    if (userWall.id_band != null) {
                        $('#stat_2').attr('href', '/mobile_app/profile.html?id=' + userWall.id_band + '&type=B');
                    } else {
                        swiperOptionsRemove('stat_2');
                    }

                    $('#stat_3').css("cssText", "display: block !important;");
                    $(document).on('click', '#stat_3', function() {
                        $('#wall_appended').empty();
                        loadFavorites();
                    });


                    if (userWall.id_musician != null) {

                        $('#stat_4').css("cssText", "display: block !important;");
                        $(document).on('click', '#stat_4', function() {
                            $('#wall_appended').empty();
                            $('#append_music').empty();
                            loadMusic();
                        });

                    } else {
                        swiperOptionsRemove('stat_4');
                    }

                    $('#stat_5').css("cssText", "display: block !important;");
                    $(document).on('click', '#stat_5', function() {
                        $('#wall_appended').empty();
                        $('#append_music').empty();
                        loadInformation();
                    });

                    if (userWall.user_level === '4') {
                    	swiperOptionsRemove('stat_5');
                    }
                    /*End Stat Config*/

                    for (var i = 0; i < data.comments.length; i++) {
                        if (data.comments[i].type === 'com') {
                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1><a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + '</a></h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="post-content">' +
                                '<span id="' + data.comments[i].id + '">' + data.comments[i].comment + '</span>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'pic') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<img src="' + data.comments[i].comment + '" style="width: 100%; height: auto;">' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'video') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].title + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<div class="media-post-content">' +
                                '<div class="overlay-icon-play">' +
                                '<div class="icon-play"></div>' +
                                '</div>' +
                                '<video id="video_' + data.comments[i].id + '" width="100%">' +
                                '<source src="' + data.comments[i].comment + '" type="video/mp4">' +
                                '</video>' +
                                '</div>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band media" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;"> 0 </a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                        if (data.comments[i].type === 'album') {

                            html += '<!-- Text Post -->' +
                                '<div class="history-post" id="history-list-' + data.comments[i].id + '">' +
                                '<div class="post-item" id="' + data.comments[i].id + '">' +
                                '<div class="user-area">' +
                                ' <div class="comment-options">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].profile_pic + '); background-size: cover;"></div>' +
                                '<div class="data class-' + data.comments[i].id + '">' +
                                '<h1>' +
                                '<a href="/mobile_app/profile.html?id=' + data.comments[i].id_user + '&type=U">' + data.comments[i].username + ': </a>' +
                                '<span class="span-edit" style="font-size: 10px;">' + data.comments[i].album_name + '</span>' +
                                '<input type="hidden" class="input-edit" name="title">' +
                                '</h1>' +
                                '<p>' + data.comments[i].date + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="user-post">' +
                                '<div class="media-post">' +
                                '<ul class="multi-image" style="text-align: center;" id="multi-image-' + data.comments[i].id + '">' +
                                '</ul>' +
                                '</div>' +
                                '<div class="tool-bar">' +
                                '<span class="reply-counter">Respuestas: ' + data.comments[i].responses.length + '</span>' +
                                ' <ul>' +
                                ' <li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].id + '" class="like-band like-band-' + data.comments[i].id + ' like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].id + ')"> </a></li>' +
                                ' <li><a class="comment-like counter-like-' + data.comments[i].id + '" href="javascript:;">' + data.comments[i].like + '</a></li>' +
                                ' <li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                ' </ul>' +
                                '</div>' +
                                '<!-- Responses Text Post -->' +
                                '<div class="list-comment">' +
                                '<ul id="list-comment-' + data.comments[i].id + '">' +
                                '<li class="comment-post-area">' +
                                '<div class="avatar" style="background: url(' + user.profile_pic + '); background-size: cover;"></div>' +
                                '<div class="text-area responses">' +
                                '<div class="input-text" contenteditable="true" style="outline:0px;"></div>' +
                                '</div>' +
                                '<input type="hidden" class="id_user" value="' + user.id + '">' +
                                '<input type="hidden" class="id_wall" value="' + userWall.id_wall + '">' +
                                '<input type="hidden" class="username" value="' + user.name + '">' +
                                '<input type="hidden" class="id_comment" name="id_comment" value="' + data.comments[i].id + '">' +
                                '<div class="tool-bar">' +
                                '<ul>' +
                                '<li class="post-new-coment"><a href="javascript:;">PUBLICAR</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>' +
                                '</ul>' +
                                '</div>' +
                                '<!-- End Responses Text Post -->' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<!--End Text Post -->';
                        }
                    }

                    $('.main-post').after(html);

                    for (var i = 0; i < data.comments.length; i++) {

                        for (var j = 0; j < data.comments[i].responses.length; j++) {

                            $('<li class="response_id_' + data.comments[i].responses[j].id + '">' +
                                '<div class="comment-options responses">' +
                                '<ul>' +
                                '<li><a href="javascript:;" onclick="onEdit(' + data.comments[i].responses[j].id + ')">Editar</a></li>' +
                                '<li><a href="javascript:;" onclick="onDelete(' + data.comments[i].responses[j].id + ')">Eliminar</a></li>' +
                                '</ul>' +
                                '</div>' +
                                '<div class="avatar" style="background: url(' + data.comments[i].responses[j].profile_pic + '); background-size: cover;"></div>' +
                                '<span class="name_user"><a>' + data.comments[i].responses[j].username + '</a></span>' +
                                '<span class="data_response" id="' + data.comments[i].responses[j].id + '">' + data.comments[i].responses[j].response + '</span> ' +
                                '<div class="tool-bar comment">' +
                                '<ul>' +
                                '<li><a class="share-band" href="javascript:;"> </a></li>' +
                                '<li><a class="create-comment" href="javascript:;"></a></li>' +
                                '<li><a id="' + data.comments[i].responses[j].id + '" class="like-band like-band-res like-comments" href="javascript:;" onclick="onLike(' + data.comments[i].responses[j].id + ')"> </a></li>' +
                                '<li><a class="comment-like counter-like-' + data.comments[i].responses[j].id + '" href="javascript:;">' + data.comments[i].responses[j].like + '</a></li>' +
                                '<li style="float: left;"><div class="addthis_inline_share_toolbox"></div></li>' +
                                '</ul>' +
                                '</div>' +
                                '</li>').appendTo('#list-comment-' + data.comments[i].id + '');
                        }

                        if (data.comments[i].type === 'album') {

                            for (var j = 0; j < data.comments[i].pictures.length; j++) {

                                $('<img src="' + data.comments[i].pictures[j] + '" style="width: 40%; height: auto;">').appendTo('#multi-image-' + data.comments[i].id + '');

                            }
                        }
                    }

                    for (var i = 0; i < data.videos.length; i++) {

                        if (data.videos[i].type === 'B') {

                            video += '<li class="video-section">' +
                                '<a href="' + data.videos[i].route + '">' +
                                '<span class="thrumb" style="background: url(\'' + data.videos[i].img + '\'); background-size: cover;"></span>' +
                                '<div class="info">' +
                                '<a href="' + data.videos[i].route + '" class="video-info">' +
                                '<h3>' + data.videos[i].song + '</h3>' +
                                '</a>' +
                                '<a href="/bands/comments?id=' + data.videos[i].id_band + '" class="video-info">' +
                                '<p>' + data.videos[i].artist + '</p>' +
                                '</a>' +
                                '<small>Vistas: ' + data.videos[i].views + '</small>' +
                                '</div>' +
                                '</a>' +
                                '</li>';

                        } else {

                            video += '<li class="video-section">' +
                                '<a href="' + data.videos[i].route + '">' +
                                '<span class="thrumb" style="background: url(\'' + data.videos[i].img + '\'); background-size: cover;"></span>' +
                                '<div class="info">' +
                                '<a href="' + data.videos[i].route + '" class="video-info">' +
                                '<h3>' + data.videos[i].song + '</h3>' +
                                '</a>' +
                                '<a href="/users/wall?id=' + data.videos[i].id_wall + '" class="video-info">' +
                                '<p>' + data.videos[i].artist + '</p>' +
                                '</a>' +
                                '<small>Vistas: ' + data.videos[i].views + '</small>' +
                                '</div>' +
                                '</a>' +
                                '</li>';

                        }
                    }

                    $('#last-item-video').before(video);

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

                $(".like-comments").each(function( index ) {  checkLikeComment($( this ).attr("id"));  });

            	activeSwipper($('.swiper-slide').length);
                $loaderOverlay.fadeOut('slow');
            });

        }


    }


}


/*Include HTMLs*/

function loadIncludes() {

    includeHtml("includes/user_wall.html", "#wall_appended");

}


function includeHtml(route, container) {

    $.get(route, function(data) {
        $(container).append(data);
    });

}

/*Load Favorite Videos*/
function loadFavorites() {

	$('#append_music').empty();

    var id = getUrlParameter('id')
    ,   letter = '';

    var authCheck = localStorage.getItem("auth");

    if (authCheck === 'true') {

        var user = localStorage.getItem("user"),
            wall = localStorage.getItem("user_wall");

        var userWall = JSON.parse(wall);
        var user = JSON.parse(user);

        $('#idmusic').val(userWall.id);

        $.ajax({
            url: host + 'favoritesVideosService?id=' + id,
            type: 'GET',
            success: function(data) {

                var video = '';

                data = JSON.parse(data);

                if (data.videosA.length != null) {
                    for (var i = 0; i < data.videosA.length; i++) {

                       if( letter != data.videosA[i].letterA) {
                          letter = data.videosA[i].letterA;
                          video +=
                          '<li class="flex-to-left letter-title" id="'+letter+'">'+
                          '<div class="alf-globa">'+
                          '<a href="javascript:;" class="text-pink-light">'+letter+'</a>'+
                          '</div>'+
                          '</li>';
                      }

                      video += 
                      '<li class="to-left">'+
                      '<div class="image to-left" style="background: url(\''+data.videosA[i].img+'\'); background-size: cover;"></div>'+
                      '<div class="info-area to-left">'+
                      '<a href="'+data.videosA[i].route_art+'">'+
                      '<h2>'+data.videosA[i].artist+'</h2>'+
                      '</a>'+
                      '<span>'+data.videosA[i].song+'</span>'+
                      '</div>'+
                      '<a href="'+data.videosA[i].route+'"><div class="icon-play1"></div></a>'+
                      '</li>';


                }

                $('#append_music').append(video);
                $('.icon-play1').css('right', '12.5%');
                $('#wrapper').removeClass('hidden');

                }else if (data.length == null) {
                 $('#wrapper').addClass('hidden');   
                }


            },
        });


    }
}


/*Load Musician's Music*/

function loadMusic() {

	$('#append_music').empty();
	$('.container.list').removeClass('hidden');

    var id = getUrlParameter('id');

    var authCheck = localStorage.getItem("auth");

    if (authCheck === 'true') {

        if (type === 'M' || type === 'G') {

            var user = localStorage.getItem("user"),
                wall = localStorage.getItem("user_wall");

            var userWall = JSON.parse(wall);
            var user = JSON.parse(user);

            $('#idmusic').val(userWall.id);

            $.ajax({
                url: host + 'videosMusicianService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        video = '';

                    if (user.id == userWall.id) {

                        $('<div class="top-toolbar base-white sub-menu-toolbar" style="display: block !important;" id="title-genres">'+
                        '<ul id="title-upload">'+
                        '<li class="flex-to-left">'+
                        '<span class="text-pink-light">Cargá tu música</span>'+
                        '<div id="upload-icon" class="icon-plus"></div>'+
                        '</li>'+
                        '</ul>'+
                        '</div>').appendTo('#append_music');

                    }

                    for (var i = 0; i < data.videos.length; i++) {


                      video += 
                      '<li class="to-left">'+
                      '<div class="image to-left" style="background: url(\''+data.videos[i].img+'\'); background-size: cover;"></div>'+
                      '<div class="info-area to-left">'+
                      '<a href="'+data.videos[i].route_art+'">'+
                      '<h2>'+data.videos[i].artist+'</h2>'+
                      '</a>'+
                      '<span>'+data.videos[i].song+'</span>'+
                      '</div>'+
                      '<a href="'+data.videos[i].route+'"><div class="icon-play1"></div></a>'+
                      '</li>';

                    }

                    $('#append_music').append(video);
                    $('#wrapper').addClass('hidden');

                },
            });

        } else if (type == 'B') {

            var user = localStorage.getItem("user"),
                bandwall = localStorage.getItem("band");

            var band = JSON.parse(bandwall);
            var user = JSON.parse(user);

            $('#idmusic').val(band.id);
            $('.container.list').removeClass('hidden');

            $.ajax({
                url: host + 'bandWallService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        video = '';

                    if (user.id_band == band.id) {


                        $('<div class="top-toolbar base-white sub-menu-toolbar" style="display: block !important;" id="title-genres">'+
                        '<ul id="title-upload">'+
                        '<li class="flex-to-left">'+
                        '<span class="text-pink-light">Cargá tu música</span>'+
                        '<div id="upload-icon" class="icon-plus"></div>'+
                        '</li>'+
                        '</ul>'+
                        '</div>').appendTo('#append_music');

                    }

                    for (var i = 0; i < data.videos.length; i++) {

                      video += 
                      '<li class="to-left">'+
                      '<div class="image to-left" style="background: url(\''+data.videos[i].img+'\'); background-size: cover;"></div>'+
                      '<div class="info-area to-left">'+
                      '<h2>'+data.videos[i].song+'</h2>'+
                      '<a href="'+data.videos[i].route_art+'">'+
                      '<span>'+data.videos[i].artist+'</span>'+
                      '</a>'+
                      '</div>'+
                      '<a href="'+data.videos[i].route+'"><div class="icon-play1"></div></a>'+
                      '</li>';
                    }

                    $('#append_music').append(video);

                },
            });
        }


    }
}

/*Load Musician's Music*/

function loadInformation() {

	$('#wall_appended').empty();
	$('#append_music').empty();

    var id = getUrlParameter('id'),
        authCheck = localStorage.getItem("auth"),
        wall = localStorage.getItem("user_wall"),
        userWall = JSON.parse(wall);

       $('.container.list').addClass('hidden');

    if (authCheck === 'true') {

        if (type === 'M' || type === 'G' && userWall.id_musician != null) {

            var user = localStorage.getItem("user"),
                wall = localStorage.getItem("user_wall"),
                userWall = JSON.parse(wall),
                user = JSON.parse(user);

            $('#idmusic').val(userWall.id);

            $.ajax({
                url: host + 'userWallService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        role = '',
                        genres = '';

                    $('<div class="container" style="padding-top: 0; margin-bottom: 15em;">' +
                        '<div class="inner my-text-center">' +
                        '<div class="inner-top">' +
                        '<h4 class="subtitle-about"><b class="about-title">Sobre el artista</b></h4>' +
                        '<div class="login-gradient-bar my-center"></div>' +
                        '<div class="social-container bands-informacion">' +
                        '<div class="text-band-container">' +
                        '<p class="text-band" id="text-musician-about">' +
                        '<span class="show-about"></span>'+
                        '<div class="btn-edit"></div>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<h4 class="subtitle-about"><b class="about-title">Instrumentos</b></h4>' +
                        '<div class="login-gradient-bar my-center"></div>' +
                        '<div class="text-band-container instrumentos" style="margin-bottom: 2%;">' +
                        '<p class="text-band roles">' +
                        '<br>' +
                        '<span class="show-role">' + data.musician.roles + '</span>' +
                        '<div class="btn-edit-role"></div>' +
                        '</p>' +
                        '</div>' +
                        '<h4 class="subtitle-about"><b class="about-title">Géneros</b></h4>' +
                        '<div class="login-gradient-bar my-center"></div>' +
                        '<div class="text-band-container genres" style="margin-top: 1em;">' +
                        '<div class="social-container genres">' +
                        '<span class="show-genres" id="genres_container">' + data.musician.genres + '</span>' +
                        '<div class="btn-edit-genre"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>').appendTo('#wall_appended');

                    if (data.musician.about != null && user.id != userWall.id) {
                        $('<span class="show-about">' + data.musician.about + '</span>').appendTo('#text-musician-about');
                    }

                    if (user.id == userWall.id) {

                        if (data.musician.about != null) {

                            $('<span class="show-about">' + data.musician.about + '</span>').appendTo('#text-musician-about');

                        }

                        $('<div class="edit-about hidden">' +
                            '<p><span class="subtitle-about">Comentanos sobre tus inicios</span></p>' +
                            '<input type="hidden" class="id_musician" value="' + data.musician.id + '">' +
                            '<div class="create-coment" style="height: 10.4em; width: 100%;">' +
                            '<textarea class="user-post-area" id="setabout" name="setabout"></textarea>' +
                            '<button class="submit_btn btn-setabout" type="submit">Finalizar</button>' +
                            '</div>' +
                            '</div>').appendTo('.social-container.bands-informacion');

                        $('<form id="editRolesForm" class="editRoles hidden">' +
                            '<input type="hidden" name="id_musician" class="id_musician" value="' + data.musician.id + '">' +
                            '<select class="js-example-disabled-results" id="register-rol" multiple="multiple" name="role[]" data-type="string">' +
                            '<option value="VOZ">VOZ</option>' +
                            '<option value="CORO">CORO</option>' +
                            '<option value="PIANO">PIANO</option>' +
                            '<option value="TECLADOS">TECLADOS</option>' +
                            '<option value="GUITARRA">GUITARRA</option>' +
                            '<option value="BAJO">BAJO</option>' +
                            '<option value="BATERÍA">BATERÍA</option>' +
                            '<option value="PERCUSIÓN">PERCUSIÓN</option>' +
                            '<option value="CUERDA">CUERDA</option>' +
                            '<option value="VIENTO">VIENTO</option>' +
                            '<option value="OTRO">OTRO</option>' +
                            '<option value="PRODUCTOR MUSICAL">PRODUCTOR MUSICAL</option>' +
                            '</select>' +
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="cuerda" name="cuerda" placeholder="¿Qué tipo de cuerda?">' +
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="viento" name="viento" placeholder="¿Qué tipo de viento?">' +
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="otro" name="otro" placeholder="¿Cuál?">' +
                            '<br>' +
                            '<button id="editRoleButton" class="btn-edit-member">Finalizar</button>' +
                            '</form>').appendTo('.text-band-container.instrumentos');

                        $('<form id="EditGenresForm" class="editGenres hidden">' +
                            '<input type="hidden" name="id_musician" class="id_musician" value="' + data.musician.id + '">' +
                            '<select class="js-example-basic-multiple" multiple="multiple" data-type="string" id="register-genero" name="id_genre[]" style="margin-top: 1.3em; font-size: 10px;">' +
                            '<option value="ROCK">ROCK</option>' +
                            '<option value="POP">POP</option>' +
                            '<option value="ELECTRONICA">ELECTRONICA</option>' +
                            '<option value="FOLCLORE">FOLCLORE</option>' +
                            '<option value="HIP HOP">HIP HOP</option>' +
                            '<option value="JAZZ">JAZZ</option>' +
                            '<option value="TANGO">TANGO</option>' +
                            '<option value="REGGAE">REGGAE</option>' +
                            '<option value="URBANA">URBANA</option>' +
                            '<option value="HEAVY METAL">HEAVY METAL</option>' +
                            '<option value="CUMBIA">CUMBIA</option>' +
                            '<option value="OTRO">OTRO</option>' +
                            '</select><br>' +
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="other" name="other" placeholder="¿Cuál?">' +
                            '<button id="EditGenreButton" class="btn-edit-member" type="button">Finalizar</button>' +
                            '</form>').appendTo('.text-band-container.genres');

                    }else{

                        $('.btn-edit').css('display', 'none');
                        $('.btn-edit-role').css('display', 'none');
                        $('.btn-edit-genre').css('display', 'none');
                    }
                },

            }).done(function(){
              

                $('select#register-genero').select2({
                    placeholder: "Géneros musicales",
                    //maximumSelectionLength: 1,
                    allowClear: true
                });

                $('select#register-rol').select2({
                    placeholder: "Instrumentos",
                    //maximumSelectionLength: 1,
                    allowClear: true
                });


                //---------------------Edit About ---------------------------//


                    $('.btn-edit-role').on('click', function (){
                        $('.text-band.roles').toggleClass('hidden');
                        $('.editRoles').toggleClass('hidden');

                        if ($('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').text() == '') {
                            $('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').css("cssText", "width: 100% !important;");
                        }
                   });

                //---------------------Edit Role ---------------------------//

                //---------------------Edit Genres ---------------------------//

                    $('.btn-edit-genre').on('click', function (){
                        $('.show-genres').toggleClass('hidden');
                        $('.editGenres').toggleClass('hidden');
                   });

                //---------------------Edit Genres ---------------------------//

                //---------------------Display role options ----------------//
                  $(document).on("change", "#register-rol" ,function () {

                    $('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').css("cssText", "width: auto !important;");


                    var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
                    var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

                    if ($(li).length > 0) {

                      $(z).css("cssText", "display: none !important;");

                    }else{

                      $(z).css("cssText", "display: block !important;");
                    }
                    
                    setTimeout(function(){
                    
                    var j = $(".select2-selection__choice");
                        $(j).each( function(index, item) {

                          var yu = $(item).text();
                           var yus = yu.split("×");

                           if (yus[1] === 'CUERDA') {
                                
                                $('#cuerda').css('display', 'block');
                                
                                if ($('#viento').val() === '') {

                                  $('#viento').css('display', 'none');

                                }
                                if ($('#otro').val() === '') {

                                  $('#otro').css('display', 'none');
                                  
                                }

                                
                              }

                               if (yus[1] === 'VIENTO') {

                                $('#viento').css('display', 'block');

                                if ($('#otro').val() === '') {

                                  $('#otro').css('display', 'none');
                                  
                                }
                                if ($('#cuerda').val() === '') {

                                  $('#cuerda').css('display', 'none');
                                  
                                }
                              }

                               if (yus[1] === 'OTRO') {
                                $('#otro').css('display', 'block');
                                
                                if ($('#viento').val() === '') {

                                  $('#viento').css('display', 'none');

                                }
                                
                                if ($('#cuerda').val() === '') {

                                  $('#cuerda').css('display', 'none');
                                  
                                }
                              }
                        });

                   }, 300);
                  });
                //---------------------Display role options----------------//

                //---------------------Display genres options ----------------//
                  $(document).on("change", "#register-genero" ,function () {

                    $('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').css("cssText", "width: auto !important;");

                    
                    var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
                    var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

                    if ($(li).length > 0) {

                      $(z).css("cssText", "display: none !important;");

                    }else{

                      $(z).css("cssText", "display: block !important;");
                    }
                    
                    setTimeout(function(){
                    
                    var j = $(".select2-selection__choice");
                        $(j).each( function(index, item) {

                          var yu = $(item).text();
                           var yus = yu.split("×");


                               if (yus[1] === 'OTRO') {
                                $('#other').css('display', 'block');
                                
                              }
                        });

                   }, 300);
                  });
                //---------------------Display genres options ----------------//

                /*-------------------------Delete Tags----------------------------*/
                    $(document).on('click', '.select2-selection__choice' ,function() {

                        var title = $(this).text();
                        title = title.split("×");

                        if (title[1] === 'OTRO') {

                            $('#other').css('display', 'none');
                            $('#other').val('');

                        }


                        if (title[1] === 'Otro') {

                            $('#otro').css('display', 'none');
                            $('#otro').val('');

                        }


                        if (title[1] === 'Cuerda') {

                            $('#cuerda').css('display', 'none');
                            $('#cuerda').val('');

                        }


                        if (title[1] === 'Viento') {

                            $('#viento').css('display', 'none');
                            $('#viento').val('');

                        }
                        
                    });
                /*-------------------------Delete Tags----------------------------*/

            });

        } else if (type == 'B') {

            var user = localStorage.getItem("user"),
                bandwall = localStorage.getItem("band"),
                band = JSON.parse(bandwall),
                user = JSON.parse(user);

            $('#idmusic').val(band.id);

            $.ajax({
                url: host + 'bandWallService?id=' + id,
                type: 'GET',
                success: function(response) {

                    var data = JSON.parse(response),
                        html = '',
                        members = '';

                    $('<div class="addmember_overlay">'+
                        '<div class="container">'+
                        '<div class="close-member"></div>'+
                        '<h4>Sumar Integrante</h4>'+
                        '<form id="addMember">'+
                        '<input type="hidden" name="id_band" value="'+band.id+'">'+
                        '<select class="input-type-1 select-type-1" required="required" name="id_user" style="width: 416px;" id="members_select">'+
                        '</select>'+
                        '<br>'+
                        '<select class="js-example-disabled-results" id="register-rol" multiple="multiple" name="role[]" data-type="string">'+
                        '<option value="VOZ">Voz</option>'+
                        '<option value="CORO">Coro</option>'+
                        '<option value="PIANO">Piano</option>'+
                        '<option value="TECLADOS">Teclados</option>'+
                        '<option value="GUITARRA">Guitarra</option>'+
                        '<option value="BAJO">Bajo</option>'+
                        '<option value="BATERÍA">Batería</option>'+
                        '<option value="PERCUSIÓN">Percusión</option>'+
                        '<option value="CUERDA">Cuerda</option>'+
                        '<option value="VIENTO">Viento</option>'+
                        '<option value="OTRO">Otro</option>'+
                        '<option value="PRODUCTOR MUSICAL">Productor musical</option>'+
                        '</select>'+
                        '<input class="input-type-1 input-type-4"  style="display: none;" id="cuerda" name="cuerda" placeholder="¿Qué tipo de cuerda?">'+
                        '<br>'+
                        '<input class="input-type-1 input-type-4"  style="display: none;" id="viento" name="viento" placeholder="¿Qué tipo de viento?">'+
                        '<br>'+
                        '<input class="input-type-1 input-type-4"  style="display: none;" id="otro" name="otro" placeholder="¿Cuál?">'+
                        '<br>'+
                        '<button class="btn-green-1" type="button" name="ingresar" id="button-add"><b>FINALIZAR</b></button>    '+
                        '</form>'+
                        '</div>'+
                        '</div>'+
                        '<div class="container" style="padding-top: 0px;margin-top: 0em;">' +
                        '<div class="inner my-text-center">' +
                        '<div class="inner-top">' +
                        '<h4 class="subtitle-about"><b class="about-title">Sobre la banda</b></h4>' +
                        '<div class="login-green-bar my-center"></div>' +
                        '<div class="social-container bands-informacion">' +
                        '<div class="text-band-container">' +
                        '<p class="text-band" id="text-band-about">' +
                        '</p>' +
                        '<div class="btn-edit"></div>' +
                        '</div>' +
                        '</div>' +
                        '<h4 class="subtitle-about"><b>Integrantes</b></h4>' +
                        '<div class="login-green-bar my-center"></div>' +
                        '<div id="append_members"></div>' +
                        '<div class="social-container genres">' +
                        '<h4 class="subtitle-about"><b>Géneros</b></h4>' +
                        '<div class="login-green-bar my-center"></div>' +
                        '<div class="text-band-container genres">' +
                        '<div class="social-container genres">' +
                        '<span class="show-about genres">' + data.genres + '</span>' +
                        '<div class="btn-edit-genre" id="editband-genre"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>').appendTo('#wall_appended');

                    if (data.band.about != null && user.id_band != band.id) {
                        $('<span class="show-about">' + data.band.about + '</span>').appendTo('#text-band-about');
                    }

                    for (var i = 0; i < data.members.length; i++) {

                        members += '<div class="text-band-container instrumentos" id="member_' + data.members[i].id_m + '" style="margin-bottom: 2%;">' +
                            '<p class="text-band roles" id="text-band-role-'+data.members[i].id_m+'">' +
                            '<a class="members-link" href="' + data.members[i].route + '">' + data.members[i].name + ': </a> ' +
                            '<span class="show-about" id="member-role-'+data.members[i].id_m+'">' + data.members[i].rol + '</span>' +
                            '<br>' +
                            '</p>' +
                            '<div class="btn-edit-role">' +
                            '<div class="dropdown-edit">' +
                            '<ul>' +
                            '<li class="dropdown-edit-option1" name="'+data.members[i].id_m+'"><a href="javascript:;">Editar</a></li>' +
                            '<li class="dropdown-edit-option3" id="option3"><a href="javascript:;">Agregar</a></li>' +
                            '<li class="dropdown-edit-option2"><a href="javascript:;" onclick="onDeleteMember(' + data.members[i].id_m + ', ' + data.members[i].id + ')">Eliminar</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>'+
                            '<form id="editRolesForm" class="editRoles hidden memberform_'+data.members[i].id_m+'" name="'+data.members[i].id_m+'">'+
                            '<input type="hidden" name="id_member" value="'+data.members[i].id_m+'" class="member">'+
                            '<select class="js-example-disabled-results select_member_'+data.members[i].id_m+' editmemberselect" id="register-rol" multiple="multiple" name="'+data.members[i].id+'_role[]" data-type="string">'+
                            '<option value="VOZ">Voz</option>'+
                            '<option value="CORO">Coro</option>'+
                            '<option value="PIANO">Piano</option>'+
                            '<option value="TECLADOS">Teclados</option>'+
                            '<option value="GUITARRA">Guitarra</option>'+
                            '<option value="BAJO">Bajo</option>'+
                            '<option value="BATERÍA">Batería</option>'+
                            '<option value="PERCUSIÓN">Percusión</option>'+
                            '<option value="CUERDA">Cuerda</option>'+
                            '<option value="VIENTO">Viento</option>'+
                            '<option value="OTRO">Otro</option>'+
                            '<option value="PRODUCTOR MUSICAL">Productor musical</option>'+
                            '</select>'+
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="cuerda_'+data.members[i].id_m+'" name="cuerda" placeholder="¿Qué tipo de cuerda?">'+
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="viento_'+data.members[i].id_m+'" name="viento" placeholder="¿Qué tipo de viento?">'+
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="otro_'+data.members[i].id_m+'" name="otro" placeholder="¿Cuál?">'+
                            '<button id="editRoleButtonBand" class="btn-edit-member" type="button">FINALIZAR</button>'+
                            '</form>';


                    }

                    $(members).appendTo('#append_members');

                    membersService();

                    if (user.id_band == band.id) {

                        if (data.band.about != null) {

                            $('<span class="show-about">' + data.band.about + '</span>').appendTo('#text-band-about');

                        }

                        $('<div class="edit-about hidden">' +
                            '<p><span class="subtitle-about">Comentanos sobre tus inicios</span></p>' +
                            '<input type="hidden" class="id_band" value="' + data.band.id + '">' +
                            '<div class="create-coment" style="height: 10.4em; width: 100%;">' +
                            '<textarea class="user-post-area" id="setabout" name="setabout"></textarea>' +
                            '<button class="submit_btn btn-setabout" type="submit">Finalizar</button>' +
                            '</div>' +
                            '</div>').appendTo('.social-container.bands-informacion');

                        $('<form id="EditGenresForm" class="editGenres hidden">' +
                            '<input type="hidden" name="id_band" class="id_band" value="' + data.band.id + '">' +
                            '<select class="js-example-basic-multiple" multiple="multiple" data-type="string" id="register-genero" name="id_genre[]" style="margin-top: 1.3em; font-size: 10px;">' +
                            '<option value="ROCK">ROCK</option>' +
                            '<option value="POP">POP</option>' +
                            '<option value="ELECTRONICA">ELECTRONICA</option>' +
                            '<option value="FOLCLORE">FOLCLORE</option>' +
                            '<option value="HIP HOP">HIP HOP</option>' +
                            '<option value="JAZZ">JAZZ</option>' +
                            '<option value="TANGO">TANGO</option>' +
                            '<option value="REGGAE">REGGAE</option>' +
                            '<option value="URBANA">URBANA</option>' +
                            '<option value="HEAVY METAL">HEAVY METAL</option>' +
                            '<option value="CUMBIA">CUMBIA</option>' +
                            '<option value="OTRO">OTRO</option>' +
                            '</select><br>' +
                            '<input class="input-type-1 input-type-4"  style="display: none; width: 100%;" id="other" name="other" placeholder="¿Cuál?">' +
                            '<button id="EditGenreButton" class="btn-edit-member" type="button">Finalizar</button>' +
                            '</form>').appendTo('.text-band-container.genres');

                    }else{
                        $('.btn-edit').css('display', 'none');
                        $('.btn-edit-role').css('display', 'none');
                        $('.btn-edit-genre').css('display', 'none');
                    }

                },
            }).done(function() {

                $('select#register-genero').select2({
                    placeholder: "Géneros musicales",
                    allowClear: true
                });

                $('select#register-rol').select2({
                    placeholder: "Instrumentos",
                    allowClear: true
                });

                //---------------------Edit Members ---------------------------//


                $(document).on('click', '.dropdown-edit-option1' ,function (){
                    var id = $(this).attr('name');
                    $('#text-band-role-'+id).toggleClass('hidden');
                    $('.memberform_'+id).toggleClass('hidden');

                });

                $(document).on('click', '.btn-edit-role' ,function() {
                    $(this).children('.dropdown-edit').toggleClass('active');
                });


                $(document).on('click', '#option3' ,function() {

                  $('.addmember_overlay').addClass('active')

                });

                $(document).on('click', '.close-member',function() {

                  $('.addmember_overlay').removeClass('active');

                });



                //---------------------Edit Members ---------------------------//

                //---------------------Edit Genres ---------------------------//

                    $(document).on('click', '.btn-edit-genre' ,function (){
                      $('.show-about.genres').toggleClass('hidden');
                      $('.editGenres').toggleClass('hidden');
                   });

                //---------------------Edit Genres ---------------------------//



                  $(document).on("change", ".editmemberselect" ,function () {

                    var id_member = $(".editmemberselect").attr('name').split('_')[0];

                    var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
                    var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

                    if ($(li).length > 0) {

                      $(z).css("cssText", "display: none !important;");

                    }else{

                      $(z).css("cssText", "display: block !important;");
                    }
                    
                    setTimeout(function(){

                      $('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').css("cssText", "width: auto !important;");
                    
                    var j = $(".select2-selection__choice");
                        $(j).each( function(index, item) {

                          var yu = $(item).text();
                           var yus = yu.split("×");

                           if (yus[1] === 'Cuerda') {
                                
                                $('#cuerda_'+id_member).css('display', 'block');
                                
                                if ($('#viento_'+id_member).val() === '') {

                                  $('#viento_'+id_member).css('display', 'none');

                                }
                                if ($('#otro_'+id_member).val() === '') {

                                  $('#otro_'+id_member).css('display', 'none');
                                  
                                }

                                
                              }

                               if (yus[1] === 'Viento') {

                                $('#viento_'+id_member).css('display', 'block');

                                if ($('#otro_'+id_member).val() === '') {

                                  $('#otro_'+id_member).css('display', 'none');
                                  
                                }
                                if ($('#cuerda_'+id_member).val() === '') {

                                  $('#cuerda_'+id_member).css('display', 'none');
                                  
                                }
                              }

                               if (yus[1] === 'Otro') {
                                $('#otro_'+id_member).css('display', 'block');
                                
                                if ($('#viento_'+id_member).val() === '') {

                                  $('#viento_'+id_member).css('display', 'none');

                                }
                                
                                if ($('#cuerda_'+id_member).val() === '') {

                                  $('#cuerda_'+id_member).css('display', 'none');
                                  
                                }
                              }
                        });

                   }, 300);
                  });
                  
                  $(document).on("change", "#register-genero" ,function () {

                    $('.select2-container--default .select2-selection--multiple .select2-selection__rendered li').css("cssText", "width: auto !important;");

                    var z = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-search').children('.select2-search__field');
                    var li = $(this).siblings('.select2').children('.selection').children('.select2-selection').children('.select2-selection__rendered').children('.select2-selection__choice');

                    if ($(li).length > 0) {

                      $(z).css("cssText", "display: none !important;");

                    }else{

                      $(z).css("cssText", "display: block !important;");
                    }
                    
                    setTimeout(function(){
                    
                    var j = $(".select2-selection__choice");
                        $(j).each( function(index, item) {

                          var yu = $(item).text();
                           var yus = yu.split("×");


                               if (yus[1] === 'OTRO') {
                                $('#other').css('display', 'block');
                                
                              }
                        });

                   }, 300);
                  });


                /*-------------------------Delete Tags----------------------------*/
                  $(document).on('click', '.select2-selection__choice' ,function() {

                    var title = $(this).text();
                    title = title.split("×");

                    if (title[1] === 'OTRO') {

                      $('#other').css('display', 'none');
                      $('#other').val('');

                    }


                    if (title[1] === 'Otro') {

                      $('#otro').css('display', 'none');
                      $('#otro').val('');

                    }


                    if (title[1] === 'Cuerda') {

                      $('#cuerda').css('display', 'none');
                      $('#cuerda').val('');

                    }


                    if (title[1] === 'Viento') {

                      $('#viento').css('display', 'none');
                      $('#viento').val('');

                    }
                    
                  });
                /*-------------------------Delete Tags----------------------------*/

            });

        }

    }


}

/*Update Pictures*/
if (type === 'B') {

    $(document).on('click', '.changeImage', function() {

        $('#type').val('band');
        $('#change').val('background');
        $loadImage = $('.changeImage');
        //window.location.href = "http://www.youlovemymusic.com/mobile_app/load_image.html?change=background&type=band";
    });
    $(document).on('click', '.edit-avatar-profile', function() {
        
        $('#type').val('band');
        $('#change').val('profile');
        $loadImage = $('.edit-avatar-profile');
       // window.location.href = "http://www.youlovemymusic.com/mobile_app/load_image.html?change=profile&type=band";
    });


} else {

    $(document).on('click', '.changeImage', function() {
        
        $('#type').val('user');
        $('#change').val('background');
        $loadImage = $('.changeImage');
        //window.location.href = "http://www.youlovemymusic.com/mobile_app/load_image.html?change=background&type=user";
    });
    $(document).on('click', '.edit-avatar-profile', function() {
        
        $('#type').val('user');
        $('#change').val('profile');
        $loadImage = $('.edit-avatar-profile');
        //window.location.href = "http://www.youlovemymusic.com/mobile_app/load_image.html?change=profile&type=user";
    });

}

/*Upload videos*/

$(document).on('click', '.icon-plus', function() {
    $('.overlay').css('display', 'block');
});

$('#url').on('change', function() {

    var inputUrl = $(this).val();

    var urlType = inputUrl.split('v=').pop(),
        urlType2 = inputUrl.split('/').pop(),
        aux = '';

    if (urlType.indexOf('/') == -1 && urlType.length == 11) {

        aux = urlType;
        var url = "https://www.googleapis.com/youtube/v3/videos";
        var videoId = "id=" + aux;
        var apiKey = "key=AIzaSyADcD5dZ4hk6YkcGytR2sgAEFty8trhDzA";
        var part = "part=snippet";

        $.get(url + "?" + apiKey + "&" + videoId + "&" + part, function(response) {

            if (response.pageInfo.totalResults == 1) {

                var inputUrl = $('#url').val('');
                var inputUrl = $('#url').val('https://www.youtube.com/watch?v=' + aux);

                $('.btn-green-1').removeAttr('disabled');

            } else {

                $('.btn-green-1').attr('disabled', true);
                alert("El video está truncado")

            }
        });

    } else {


        aux = urlType2;
        var url = "https://www.googleapis.com/youtube/v3/videos";
        var videoId = "id=" + aux;
        var apiKey = "key=AIzaSyADcD5dZ4hk6YkcGytR2sgAEFty8trhDzA";
        var part = "part=snippet";

        $.get(url + "?" + apiKey + "&" + videoId + "&" + part, function(response) {

            if (response.pageInfo.totalResults == 1) {

                var inputUrl = $('#url').val('');
                var inputUrl = $('#url').val('https://www.youtube.com/watch?v=' + aux);

                $('.btn-green-1').removeAttr('disabled');

            } else {

                $('.btn-green-1').attr('disabled', true);
                alert("El video está truncado")

            }
        });
    }
});



$(document).on('click', '.btn-green-1', function() {

    var url = $('#url').val();
    var name = $('#name').val();

    if (url != '' && name != '') {

        $('.btn-green-1').removeAttr('disabled');
        $('#form-signup_v2').submit();

    }

});


/*Add follower Band*/
function makeFan(id_band) {

    $.get('/makefan?id_band=' + id_band, function(response) {

        if (response == 1) {

            console.log('¡SOS FAN!');

        } else {

            console.log(response);
        }
    })
}

/*Add follower Fan*/

function addfollower(iduser) {
    $.get('/addfollower?iduser=' + iduser, function(response) {
        if (response == 1) {
            $('.btn-green.dark.my-right.btn-sosfan').on('click', function() {
                $(this).addClass('active').text('UNFOLLOW');
            });
            console.log('¡SOS FAN!');
        } else {
            $('.btn-green.dark.my-right.btn-sosfan').on('click', function() {
                $(this).removeClass('active').text('FOLLOW');
            });
            console.log('YA NO SOS FAN');
        }
    })
}

$(document).on('click', '.btn-sosfan, .container-follow', function() {
    var likes = $('#count-followers');
    var num = parseInt(likes.text());
    ($(this).hasClass('active')) ? likes.text((num + 1)): likes.text((num - 1));
});

/*Check Followers*/

function checkFollowers() {

    var id = getUrlParameter('id');

    var wall = localStorage.getItem("user_wall");

    var authuser = localStorage.getItem("user");

    var userWall = JSON.parse(wall);

    var user = JSON.parse(authuser);

    $.ajax({
        url: host + 'user/check/follows?id=' + id + '&type=' + type,
        type: 'GET',
        success: function(response) {

            var data = JSON.parse(response);

            if (data.check === 'true') {

                $('#btn-follow-2').addClass("active");

            } else {

                $('#btn-follow-2').removeClass("active");
            }

        },
    });
}



/*On document ready funtions*/

$(document).ready(function() {

    loadAuthUser();

    (type === 'B') ? bandWall(): wallUser();

    //loadMusic();
    checkFollowers();

    /*Resize background image*/

    var $portadaImg = $('#image-1');
    var originalPortadaTop = $portadaImg.css('top');

    function portadaResize() {

        var wWidth = $(window).width();

        if (wWidth <= 753) {

            $portadaImg.css('top', '0px');
        }
    }

    portadaResize();

});



/* --------------------------------------  */
// Swiper Options

function swiperOptionsRemove(elm) {
    $('#' + elm).parent('.swiper-slide').remove();
}

function activeSwipper(num) {
	
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: (num >= 3) ? 3 : num,
        paginationClickable: true,
        spaceBetween: 10
    });

}

/* --------------------------------------  */


/*--------Load Users for Adding Members--------------*/

function membersService() {

    var options = '';
     $.ajax({
        url: host + 'usersService',
        type: 'GET',
        success: function(response) {

            var data = JSON.parse(response);

            options += '<option value disabled selected hidden>Integrante</option>';

            for (var i = 0; i < data.user.length; i++) {

                options += '<option value="'+data.user[i].email+'">'+data.user[i].name+' - '+data.user[i].email+'</option>';
                
            }

            $(options).appendTo('#members_select');

        },
    });
}