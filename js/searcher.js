var host = 'http://www.youlovemymusic.com/';
var $arrowBack = $('.fa.fa-arrow-left');
var $customArrow = $('.back-area');
var $close = $('.close');

var $follow = $('.container-follow');

/*Var for taging*/

var $textArea = $('textarea');
var contactList = $('.contactList');
var contactListItem = $('.contactList ul li');
var $userArray = $('#userArray');
var checkArroba = 0;



$(document).on('click', function(e) {
    var item = e.target;
    var desplegable = $('.desplegable');

    if (!$(item).hasClass('desplegable')) {
        desplegable.removeClass('active');
    }

    if ($(item).hasClass('gear-area')) {
        if (!desplegable.hasClass('active')) {
            desplegable.addClass('active');
        }
    }

});



$close.on('click', function() {
    $('.overlay').css('display', 'none');
});

$customArrow.on('click', function() {
    previousPage();
});

$arrowBack.on('click', function() {
    navArrowOpt();
});


$follow.on('click', function() {
    $(this).toggleClass('active');
});


$(document).on('click', '.share-band', function() {
    $('.share-overlay').toggleClass('active');
});
$(document).on('click', '.share-overlay.active', function() {
    $(this).removeClass('active');
});


$(document).on('click', 'video', function() {
    this.pause();
    $(this).prev('.overlay-icon-play').css('display', 'block');
});

$(document).on('click', '.overlay-icon-play', function() {
    var video = $(this).next('video').attr('id');
    video = document.getElementById(video);
    video.play();
    $(this).css('display', 'none');
});

function previousPage() {
    parent.history.back();
    return false;
}

function navArrowOpt() {
    var $input = $('.search-input');
    var $inputVal = $input.val();
    var $overlay = $('.overlay');

    if ($inputVal.length > 1) {
        $overlay.css('display', 'none');
        $input.val('');
    } else {
        previousPage();
    }
}

function onDelete(id) {
    $.get('/deletecomment?id=' + id, function(response) {
        if (response == 1) {
            var counter = $('.response_id_' + id).parent('ul').parent('.list-comment.active').prev('.tool-bar').children('span');
            var num = parseInt(counter.text().split(': ').pop()) - 1;
            counter.text('Respuestas: ' + num);
            $('li.response_id_' + id).addClass('hidden');
            $('#history-list-' + id).addClass('hidden');
            $('#replay-area_' + id).addClass('hidden');
            $('li.response_id_' + id).siblings('.comment-post-area').removeClass('hidde');
            var numComment = parseInt($('.video-comment-content .header h2').text().split(' ').pop()) - 1;
            $('.video-comment-content .header h2').empty().append('<b>Comentarios </b>' + numComment);
            console.log('¡Comentario Eliminado!');
        } else {
            console.log(response);
        }
    });
}

$(document).on('click', '.create-comment', function() {
    $(this).closest('.tool-bar').next('.list-comment').toggleClass('active').find('textarea').val('');
});

function loadAuthUser() {
    $.ajax({
        url: host + 'auth/user',
        type: 'GET',
        success: function(data) {

            if (data != '') {

                localStorage.setItem("auth", "true");
                localStorage.setItem("user", data);

                var user = JSON.parse(data);

                $('#route_profile').attr('href', host + 'mobile_app/profile.html?id=' + user.id + '&type=G');

                if (user.user_level == 1 || user.user_level == 4) {
                    $('#wild_card').attr('href', host + 'mobile_app/musicianregistration.html?id=' + user.id);
                }
                if (user.user_level == 5) {
                    $('#wild_card').attr('href', host + 'mobile_app/bandregistration.html?id=' + user.id);
                }
            }

        },
    });
}

$(document).ready(function() {

    //Variables;
    var $lupeArea = $('.search-lupe');
    var $searchInput = $('.search-input');

    $lupeArea.on('click', function() {

    });


    $searchInput.keyup(function() {
        var $this = $(this).val();
        var $elm = $('.search-form .list-menu, .overlay-menu');


        if ($this.length > 0) {
            $elm.fadeIn('slow');
            $arrowBack.removeClass('hidden');

        } else {
            $elm.fadeOut('slow');
            $arrowBack.addClass('hidden');
        }

    });


    $arrowBack.on('click', function() {
        var $this = $(this);
        var $input = $("input.search-input");

        var $elm = $('.search-form .list-menu, .overlay-menu');

        $input.val("");
        $elm.fadeOut('slow');
        $this.addClass('hidden');

    });

});

$(".search-input.to-left").keyup(function(e) {
    e.preventDefault();
    nav_search();
});

$(".search-input.to-left").focusin(function(e) {
    e.preventDefault();
    nav_search();
});


$(".search-input.to-left").focusout(function() {
    setTimeout(function() {
        $('.user-sub-menu.buscador').empty();
    }, 400);
});

$(".search-input.to-left").keypress(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

function nav_search() {
    var search = $(".search-input.to-left").val();
    $.get('http://www.youlovemymusic.com/search?search=' + search, function(data) {
        var cont = 0;
        $('#append_searcher li').remove();
        $.each(data, function(index, item) {
            $.each(item, function(index2, item2) {
                if (cont <= 4) {
                    var url = '',
                        type = '',
                        name = '',
                        image = '',
                        level = '';
                    /*- ----------------------------------- */
                    if (index === 'bands') {

                        url = 'http://www.youlovemymusic.com/mobile_app/profile.html?id=' + item2.id + '&type=B';
                        type = 'band';
                        img = item2.profile_pic;
                        name = item2.name;

                        $('#append_searcher').append(
                            '<a href="' + url + '">' +
                            '<li class="to-left">' +
                            '<div class="image img-rounded to-left" style="background: url(' + img + '); background-size: cover;">' +
                            '</div>' +
                            '<div class="info-area to-left">' +
                            '<h2>' + name + '</h2>' +
                            '<span>Banda</span>' +
                            '</div>' +
                            '</li>' +
                            '</a>'
                        );
                    }

                    /*- ----------------------------------- */

                    if (index === 'user') {
                        url = 'http://www.youlovemymusic.com/mobile_app/profile.html?id=' + item2.id + '&type=M';
                        type = 'User';
                        img = item2.profile_pic;
                        name = item2.name;
                        level = item2.user_level;

                        if (level === '3' || level === '5') {

                            $('#append_searcher').append(
                                '<a href="' + url + '">' +
                                '<li class="to-left">' +
                                '<div class="image img-rounded to-left" style="background: url(' + img + '); background-size: cover;">' +
                                '</div>' +
                                '<div class="info-area to-left">' +
                                '<h2>' + name + '</h2>' +
                                '<span>Músico</span>' +
                                '</div>' +
                                '</li>' +
                                '</a>'
                            );

                        } else {

                            $('#append_searcher').append(
                                '<a href="' + url + '">' +
                                '<li class="to-left">' +
                                '<div class="image img-rounded to-left" style="background: url(' + img + '); background-size: cover;">' +
                                '</div>' +
                                '<div class="info-area to-left">' +
                                '<h2>' + name + '</h2>' +
                                '<span>Fan</span>' +
                                '</div>' +
                                '</li>' +
                                '</a>'
                            );

                        }

                    }

                    /*- ----------------------------------- */

                    if (index === 'videos') {

                        url = 'http://www.youlovemymusic.com/mobile_app/video_reproductor.html?id=' + item2.id;

                        type = 'band';
                        name = item2.name;

                        var link = item2.url.split('=').pop();
                        link = '//img.youtube.com/vi/' + link + '/0.jpg';

                        $('#append_searcher').append(
                            '<a href="' + url + '">' +
                            '<li class="to-left">' +
                            '<div class="image img-rounded to-left" style="background: url(' + link + '); background-size: cover;">' +
                            '</div>' +
                            '<div class="info-area to-left">' +
                            '<h2>' + name + '</h2>' +
                            '<span>Video</span>' +
                            '</div>' +
                            '</li>' +
                            '</a>'
                        );
                    }
                    /*- ----------------------------------- */
                    cont = cont + 1;
                }
            });

        });

    });
}

function notificaciones() {

    var authCheck = localStorage.getItem("auth");

    if (authCheck === 'true') {

        
    $.ajax({
        url: 'http://www.youlovemymusic.com/notificationsService',
        type: 'GET',
        success: function(data) {

            var not = JSON.parse(data),
                check = 0;


            if (data == 0) {

                $('#msj-notification').css('display', 'none');

            } else {

                for (var i = 0; i < not.length; i++) {
                    if (not[i].seen === 'N') {
                        check = 1;
                    }
                }

                if (check == 1) {

                    $('.icon.notification').addClass('active');
                    $('#msj-notification').addClass('active');
                    $('#msj-notification').text(not.length);

                }

            }

        },
    });
    }
}

/*Tag funtions*/


/* New Tag Area  */

var auxArroba = 0,
    input = $('.input-text'),
    linkUser = $('.linkUser');


$(document).on('click', '.li-font', function() {

    var aux = ''
    ,   aux2 = ''
    ,   userArray = $('#userArray');

    checkArroba = 0;
    $this = "@"+$(this).text().trim();

    $("#user-" + auxArroba).text($this);

    $thisId = $(this).attr('id');

    var user = $('#user-' + auxArroba);
    var url = 'http://www.youlovemymusic.com/mobile_app/profile.html?id=' + $thisId + '&type=U';
    var $auxtextArea = $textArea.val();
    var $auxtextInput = userArray.val();

    user.attr('href', url);

    ($auxtextInput === '') ?
        $auxtextInput = $thisId :
        $auxtextInput = $auxtextInput + ',' + $thisId;
    

    auxArroba = auxArroba + 1;
    userArray.val($auxtextInput);


    $(this).parents('ul').parents('.contactList').removeClass('active');

});

/* ------------------------------------------------------- */


function setCaret(hrefId) {
    var el = hrefId;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}


/* ------------------------------------------------------- */

$(document).on('keyup', '.input-text', function(evt) {

    var $myInput = $(this);

    $('.text-area.responses').css('position', 'relative');
   
    var $this = $myInput.html();
    var user = $('#user-' + auxArroba);
    var findArroba = $this[$this.length - 1];

    var padre = $myInput.parents('.text-area.responses');
    var appendList = '<div class="contactList active"><ul class="full-width to-left"></ul></div>';


    padre.children('.contactList').remove();
    padre.append(appendList);
    

    if (findArroba === '@') {

        var elm = $this.slice(0, -1);
        var link = '<a class="taged" id="user-' + auxArroba + '" href="">@&nbsp;</a>';

        $myInput.html(elm + link);

        var hrefId = document.getElementById("user-" + auxArroba);

        hrefId.focus();
        setCaret(hrefId);
    }


    if (user.length > 0) {

        var result = user.html().slice(1, -1)
        tagsService(result);


    }

});



/* ------------------------------------------------------- */



function tagsService(search) {

    $.get('http://www.youlovemymusic.com/search?search=' + search, function(data) {
        var cont = 0;
        $('.contactList ul li').remove();
        $.each(data, function(index, item) {
            $.each(item, function(index2, item2) {
                if (cont <= 4) {
                    var url = '',
                        type = '',
                        name = '',
                        image = '',
                        level = '';

                    if (index === 'user') {

                        type = 'User';
                        img = item2.profile_pic;
                        name = item2.name;
                        level = item2.user_level;

                        console.log(item2.id);

                        if (level === '3' || level === '5') {

                            url = 'http://www.youlovemymusic.com/mobile_app/profile.html?id=' + item2.id + '&type=M';

                            $('.contactList ul').append(
                                '<li class="to-left full-width li-font" id="' + item2.id + '">' +
                                '<div class="image img-rounded to-left search-image" style="background: url(' + img + '); background-size: cover;">' +
                                '</div>' +
                                '<div class="info-area to-left search-info-div">' +
                                '<h2>' + name + '</h2>' +
                                '</div>' +
                                '</li>'
                            );

                        } else {

                            url = 'http://www.youlovemymusic.com/mobile_app/profile.html?id=' + item2.id + '&type=U';

                            $('.contactList ul').append(
                                '<li class="to-left full-width li-font" id="' + item2.id + '">' +
                                '<div class="image img-rounded to-left search-image" style="background: url(' + img + '); background-size: cover;">' +
                                '</div>' +
                                '<div class="info-area to-left search-info-div">' +
                                '<h2>' + name + '</h2>' +
                                '</div>' +
                                '</li>'
                            );

                        }

                    }
                    cont = cont + 1;
                }
            });

        });

    });
}

notificaciones();
loadAuthUser();