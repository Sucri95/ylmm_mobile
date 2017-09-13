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
    
            for (var i = 0; i < 3; i++) {

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

        }, 1000);

        
      },
  });
}

/*Include HTMLs*/

function loadIncludes() {

  includeHtml("includes/navlogin.html","nav");
  includeHtml("includes/footer.html","footer");
  includeHtml("includes/twitterwidget.html", "#append_widget");
  includeHtml("includes/user_wall.html", "#wall_appended");
  
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
      url: host+'user/wall?id='+id,
      type: 'GET',
      success: function(data) {

          localStorage.setItem("user_wall", data);

      },
  });
}

/*Load Wall Container*/

function loadContainer() {
  
  var authCheck = localStorage.getItem("auth");

  //Note: must very if the auth user.idWall is the same of the wall you're visiting

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , wall = localStorage.getItem("user_wall");

    var userWall = JSON.parse(wall);
    var user = JSON.parse(user);

    setTimeout(function() {

      $('.band-name-type-1')
      .text(userWall.name);

    if (user.id == userWall.id) {

      $('.band-name-type-1').css('cursor', 'pointer');

      $('#name_edit').children('.input-type-1').val(userWall.name);

    }
    
    if (userWall.background_pic != null) {

      $('#image-1').css({
                        'background' : 'url('+userWall.background_pic+')no-repeat',
                        'background-size' : 'cover'
                      });
    }

      if(userWall.id_musician == null){

        $('.btn-follow').attr('onclick', 'addfollower('+userWall.id+')');

      }else{

        $('.btn-follow').attr('onclick', 'makefanmusician('+userWall.id_musician+')');

      }

      if (user.id === userWall.id) {
      	$('.update-background').css("cssText", "display: block!important;");
      }
      

    }, 4000);

  }
}

/*Load Followers & Followings*/

function getFollows() {
	
	var id = getUrlParameter('id');

	wall = localStorage.getItem("user_wall");

    var userWall = JSON.parse(wall);

		$.ajax({
		url: host+'user/wall/follows?id='+id,
		type: 'GET',
			success: function(data) {

				var data1 = JSON.parse(data);

				setTimeout(function() {
					
					$('#count-followers')
						.attr('href', host+'followers?id='+userWall.id+'')
						.text('FOLLOWERS: ' +data1.followers+'');

					$('#count-following')
						.attr('href', host+'followers?id='+userWall.id+'')
						.text('FOLLOWING: '+data1.following+'');
				
				}, 500);

			},
		});
}

/*Check Followers*/

function checkFollowers() {
	
	var id = getUrlParameter('id');

	var wall = localStorage.getItem("user_wall");

	var authuser = localStorage.getItem("user");

    var userWall = JSON.parse(wall);

    var user = JSON.parse(authuser);

	$.ajax({
	url: host+'user/check/follows?id='+id,
	type: 'GET',
		success: function(response) {

			var data = JSON.parse(response);

			if (userWall.id != user.id) {
				
				if (data.type === 'fan') {

					$('#fan_btn').attr('onclick', 'addfollower('+userWall.id+')');
				}else{

					$('#fan_btn').attr('onclick', 'makefanmusician('+userWall.id_musician+')');				
				}

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

  //Note: must very if the auth user.idWall is the same of the wall you're visiting

  if (authCheck === 'true') {

    var user = localStorage.getItem("user")
      , wall = localStorage.getItem("user_wall");

    var userWall = JSON.parse(wall);
    var user = JSON.parse(user);

    
    setTimeout(function() {

    $('#stat_1')
    	.attr('href', host+'wall?id='+userWall.id+'')
    	.css("cssText", "display: block !important;");
    
    $('#sub1')
    	.attr('href', host+'wall?id='+userWall.id+'')
    	.css("cssText", "display: block !important;");

    if (userWall.user_level == 4 || userWall.user_level == 1) {

      $('#stat_2')
        .attr('href', host+'wall/yourfavorites?id='+userWall.id+'')
        .css("cssText", "display: block !important;");

      $('#sub3')
        .attr('href', host+'wall/yourfavorites?id='+userWall.id+'')
        .css("cssText", "display: block !important;");

    }

    $('#drop_option1').attr('href', host+'wall?id='+userWall.id+'');

    if(userWall.id_band != null){

        $('#drop_option2')
        .attr('href', host+'bands/comments?id='+userWall.id_band+'')
        .css("cssText", "display: block !important;");

        $('#sub2')
        .attr('href', host+'bands/comments?id='+userWall.id_band+'')
        .css("cssText", "display: block !important;");

    }

    if(userWall.id_musician != null){

      $('#stat_3')
      	.attr('href', host+'musician/videos?id='+userWall.id+'&idmusic='+userWall.id_musician+'')
      	.css("cssText", "display: block !important;");

      $('#sub4')
      	.attr('href', host+'musician/videos?id='+userWall.id+'&idmusic='+userWall.id_musician+'')
      	.css("cssText", "display: block !important;");
      
      $('#stat_4')
      	.attr('href', host+'musician/about?id='+userWall.id+'&idmusic='+userWall.id_musician+'')
      	.css("cssText", "display: block !important;");

      $('#sub5')
      	.attr('href', host+'musician/about?id='+userWall.id+'&idmusic='+userWall.id_musician+'')
      	.css("cssText", "display: block !important;");
    }

    if (userWall.id != user.id) {
    	
    	$('#img-avatar').attr('src', userWall.profile_pic).css('cursor', 'default');
    	$('#id_confirmation').val("NO");

    }else{

    	$('#img-avatar').attr('src', userWall.profile_pic);
    	$('#img-avatar').after('<div class="container-avatar">'+
          						'<img class="edit-avatar image" src="../../images/white_camara.png">'+
          						'</div>');
    	$('#id_confirmation').val("YES");
    }

    }, 1000);

  }
}

/*Load Wall Data*/
function loadWall() {

	var user    = localStorage.getItem("user")
    ,   wall    = localStorage.getItem("user_wall")
    ,   id_wall = getUrlParameter('id');

    var userWall = JSON.parse(wall);
    var user = JSON.parse(user);

	$('#profile_pic').val(user.profile_pic);
	$('#username').val(user.name);
	$('.id_user').val(user.id);
	$('.id_wall').val(id_wall);

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

    //$.get('/notifications/seen', function(response){});

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