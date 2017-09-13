var host = 'http://www.youlovemymusic.com/';
var $loaderOverlay = $('.overlay-loader');
var $arrowBack = $('.fa.fa-arrow-left');

function loadAuthUser() {
  $.ajax({
      url: host+'auth/user',
      type: 'GET',
      success: function(data) {

      	if (data != '') {

          localStorage.setItem("auth", "true");
          localStorage.setItem("user", data);

          var user = JSON.parse(data);

          $('#route_profile').attr('href', host+'mobile_app/profile.html?id='+user.id+'&type=G');

          if (user.user_level == 1 || user.user_level == 4) {
          	$('#wild_card').attr('href', host+'mobile_app/musicianregistration.html?id='+user.id);
          }
          if (user.user_level == 5) {
          	$('#wild_card').attr('href', host+'mobile_app/bandregistration.html?id='+user.id);
          }
        }

      },
  });
}

/*Load Sliders*/
function loadSliders() {

  $.ajax({
      url: host+'/homeSliderServices',
      type: 'GET',
      success: function(data) {

      	var firstSlider  = ''
    		,	secondSlider   = ''
    		,	thirdSlider    = '';

        for (var i = 0; i < data.today.length; i++) {
          
          firstSlider +=
          '<li class="to-left">'+
          '<div class="image to-left">'+
          '<img src="'+data.today[i].img+'" style="width: 100%;">'+
          '</div>'+
          '<div class="info-area to-left">'+
          '<h2>'+data.today[i].song+'</h2>'+
          '<a href="'+data.today[i].route_art+'">'+
          '<span>'+data.today[i].artist+'</span>'+
          '</a>'+
          '</div>'+
          '<a href="'+data.today[i].route+'"><div class="icon-play"></div></a>'+
          '</li>';
        }


        for (var i = 0; i < data.weeks.length; i++) {
            
          secondSlider +=
          '<li class="to-left">'+
          '<div class="image to-left">'+
          '<img src="'+data.weeks[i].img+'" style="width: 100%;">'+
          '</div>'+
          '<div class="info-area to-left">'+
          '<h2>'+data.weeks[i].song+'</h2>'+
          '<a href="'+data.weeks[i].route_art+'">'+
          '<span>'+data.weeks[i].artist+'</span>'+
          '</a>'+
          '</div>'+
          '<a href="'+data.weeks[i].route+'"><div class="icon-play"></div></a>'+
          '</li>';
          
        }

        for (var i = 0; i < data.vistas.length; i++) {

          thirdSlider +=
          '<li class="to-left">'+
          '<div class="image to-left">'+
          '<img src="'+data.vistas[i].img+'" style="width: 100%;">'+
          '</div>'+
          '<div class="info-area to-left">'+
          '<h2>'+data.vistas[i].song+'</h2>'+
          '<a href="'+data.vistas[i].route_art+'">'+
          '<span>'+data.vistas[i].artist+'</span>'+
          '</a>'+
          '</div>'+
          '<a href="'+data.vistas[i].route+'"><div class="icon-play"></div></a>'+
          '</li>';
        }


      	$("#music_today").append(firstSlider);
        $("#slider_weeks").append(secondSlider);
        $("#slider_views").append(thirdSlider);

      }
 	
 	}).done(function(){
 		$loaderOverlay.fadeOut('slow');  	
   });
}

function notificaciones() {

  $.ajax({
      url: 'http://www.youlovemymusic.com/notificationsService',
      type: 'GET',
      success: function(data) {

        var not = JSON.parse(data)
        ,   check = 0;


        if (data == 0) {

          $('#msj-notification').css('display', 'none');

        }else{

          for (var i = 0; i < not.length; i++) {
            if (not[i].seen === 'N') {
              check = 1;
            }
          }

          if (check == 1) {

            $('.icon.notification').addClass('active');
            $('#msj-notification').css('display', 'block');
            $('#msj-notification').text(not.length);

          }else{

            $('#msj-notification').css('display', 'none');
          }
        }

      },
  });
}

$(document).ready(function(){
	
	//Variables
	var $footerItems = $('footer .footer-items li');
	var $secciones = $('.secciones li');
	var $gearIcon = $('.gear-area');
	var $swiperSlide  = $('.swiper-slide');
	var $loaderOverlay = $('.overlay-loader');
	var $lupeArea = $('.search-lupe');
	var $searchInput = $('.search-input');
	var $removeItems = $('.container-chart.removeitems');
	var $clasificados = $('.clasificados');


  $clasificados.on('click',function(){
    $('.container-chart.removeitems').toggleClass('hidden');
  });


	$footerItems.on('click',function(){
	    var $this = $(this).children('a').children('i');
	    var $checkHref = $(this).children('a');

	    if ($checkHref.attr('href') != 'javascript:;'){
	    	$this.toggleClass('active');
	    }
	});

	$swiperSlide.on('click',function(){
	    var $this = $(this).children('a');
		$swiperSlide.children('a').removeClass('active')
	    $this.addClass('active');
	});

	$secciones.on('click',function(){
	    $secciones.removeClass('active');
		$(this).addClass('active');

	});

	$gearIcon.on('click', function(){
		/*$(this).toggleClass('active');*/
	  $('.desplegable').toggleClass('active');
  });

	$lupeArea.on('click',function(){

	});


  $searchInput.keyup(function() {
    var $this = $(this).val();
    var $elm = $('.search-form .list-menu, .overlay-menu');
    

    if($this.length > 0) {
      $elm.fadeIn('slow');
      $arrowBack.removeClass('hidden');
        
    } else {
      $elm.fadeOut('slow');
      $arrowBack.addClass('hidden');  
    } 

  });

/*
  $arrowBack.on('click', function(){
    var $this = $(this);
    var $input = $("input.search-input");

    var $elm = $('.search-form .list-menu, .overlay-menu');
  
    $input.val("");
    $elm.fadeOut('slow');
    $this.addClass('hidden'); 
  
  });
*/



	/*Function calls*/
	
	loadSliders();
	loadAuthUser();
  notificaciones();

});

/*Navigate site*/
$(document).on('click', '#novedades' ,function() {
  $('#music_today').parent('.container.list').removeClass("hidden");
  $('#slider_weeks').parent('.container.list').addClass("hidden");
  $('#slider_views').parent('.container.list').addClass("hidden");

});
$(document).on('click', '#masescuchados' ,function() {
  $('#slider_weeks').parent('.container.list').removeClass("hidden");
  $('#music_today').parent('.container.list').addClass("hidden");
  $('#slider_views').parent('.container.list').addClass("hidden");

});
$(document).on('click', '#descubrimientos' ,function() {
  $('#slider_views').parent('.container.list').removeClass("hidden");
  $('#slider_weeks').parent('.container.list').addClass("hidden");
  $('#music_today').parent('.container.list').addClass("hidden");

});

$(".search-input.to-left").keyup(function (e) {
  e.preventDefault();
  nav_search();
});

$(".search-input.to-left").focusin(function (e) {
  e.preventDefault();
  nav_search();
});


$(".search-input.to-left").focusout(function(){
  setTimeout(function(){
    $('.user-sub-menu.buscador').empty();
  },400);
});

$(".search-input.to-left").keypress(function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
  }
});

function nav_search() {
  var search = $(".search-input.to-left").val();
    $.get('http://www.youlovemymusic.com/search?search='+ search, function (data) { 
      var cont = 0;
        $('#append_searcher li').remove();
          $.each(data, function(index, item) {
            $.each(item, function(index2, item2) { 
              if (cont <= 4) {
              var url = ''
                , type = ''
                , name = ''
                , image = ''
                , level = '';
              /*- ----------------------------------- */
              if(index === 'bands') {
                url =  'http://www.youlovemymusic.com/mobile_app/profile.html?id='+item2.id+'&type=B';
                type = 'band';
                img =  item2.profile_pic;
                name = item2.name;

                $('#append_searcher').append(
                  '<a href="'+url+'">'+
                  '<li class="to-left">'+
                  '<div class="image img-rounded to-left" style="background: url('+img+'); background-size: cover;">'+
                  '</div>'+
                  '<div class="info-area to-left">'+
                  '<h2>'+name+'</h2>'+
                  '<span>Banda</span>'+
                  '</div>'+
                  '</li>'+
                  '</a>'
                );
              }

              /*- ----------------------------------- */
              
              if(index === 'user') {
                url =  'http://www.youlovemymusic.com/mobile_app/profile.html?id='+item2.id+'&type=M';
                type = 'User';
                img =  item2.profile_pic;
                name = item2.name;
                level = item2.user_level;
            
                if (level === '3' || level === '5') {

                  $('#append_searcher').append(
                    '<a href="'+url+'">'+
                    '<li class="to-left">'+
                    '<div class="image img-rounded to-left" style="background: url('+img+'); background-size: cover;">'+
                    '</div>'+
                    '<div class="info-area to-left">'+
                    '<h2>'+name+'</h2>'+
                    '<span>Músico</span>'+
                    '</div>'+
                    '</li>'+
                    '</a>'
                  );
       
                }else{

                  $('#append_searcher').append(
                    '<a href="'+url+'">'+
                    '<li class="to-left">'+
                    '<div class="image img-rounded to-left" style="background: url('+img+'); background-size: cover;">'+
                    '</div>'+
                    '<div class="info-area to-left">'+
                    '<h2>'+name+'</h2>'+
                    '<span>Fan</span>'+
                    '</div>'+
                    '</li>'+
                    '</a>'
                  );

                }

              }

              /*- ----------------------------------- */

              if(index === 'videos') {  
                  
                url =  'http://www.youlovemymusic.com/mobile_app/video_reproductor.html?id='+item2.id;

                  type = 'band';
                  name = item2.name;

                  var link =  item2.url.split('=').pop();
                  link =  '//img.youtube.com/vi/'+link+'/0.jpg';

                  $('#append_searcher').append(
                    '<a href="'+url+'">'+
                    '<li class="to-left">'+
                    '<div class="image img-rounded to-left" style="background: url('+link+'); background-size: cover;">'+
                    '</div>'+
                    '<div class="info-area to-left">'+
                    '<h2>'+name+'</h2>'+
                    '<span>Video</span>'+
                    '</div>'+
                    '</li>'+
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

