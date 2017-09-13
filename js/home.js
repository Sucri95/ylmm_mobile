/*Load Sliders*/
function loadSliders() {
  $.ajax({
      url: 'http://www.youlovemymusic.com/homeSliderServices',
      type: 'GET',
      success: function(data) {

      	firstSlider = '';
        secondSlider = '';
        thirdSlider = '';

        for (var i = 0; i < data.today.length; i++) {
          
          var id = data.today[i].url.split('=').pop();
          
          firstSlider +=
            '<div>'+
              '<div class="slick-slider__slide slider-video" onclick="playvideo(this)">'+
                '<a href="javascript:;">'+
                  '<img src="//img.youtube.com/vi/'+id+'/0.jpg" class="img-slider">'+
                  '<input style="display: none;" type="text" class="ruta-video" id="first-slider-'+i+'" value="https://www.youtube.com/embed/'+id+'?autoplay=1">'+
                  '<iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>'+
                '</a>'+
              '</div>'+
            '</div>';
        }

        for (var i = 0; i < data.weeks.length; i++) {
        
          var id = data.weeks[i].url.split('=').pop();
          
          secondSlider +=
            '<div>'+
              '<div class="slick-slider__slide slider-video">'+
                '<a href="javascript:;">'+
                  '<img src="//img.youtube.com/vi/'+id+'/0.jpg" class="img-slider">'+
                  '<input style="display: none;" type="text" class="ruta-video" id="second-slider-'+i+'" value="https://www.youtube.com/embed/'+id+'?autoplay=1">'+
                  '<iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>'+
                  '</a>'+
              '</div>'+
            '</div>';
          }

        for (var i = 0; i < data.vistas.length; i++) {
        
          var id = data.vistas[i].url.split('=').pop();
          
          thirdSlider +=
            '<div>'+
              '<div class="slick-slider__slide slider-video">'+
                '<a href="javascript:;">'+
                  '<img src="//img.youtube.com/vi/'+id+'/0.jpg" class="img-slider">'+
                  '<input style="display: none;" type="text" class="ruta-video" id="third-slider-'+i+'" value="https://www.youtube.com/embed/'+id+'?autoplay=1">'+
                  '<iframe width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>'+
                '</a>'+
              '</div>'+
            '</div>';

        }


      	$("#first-slider").append(firstSlider);
        $("#second-slider").append(secondSlider);
        $("#third-slider").append(thirdSlider);
      },
  });
}

/*Load Sponsors*/

function loadSponsors() {
  $.ajax({
      url: 'http://www.youlovemymusic.com/sponsorsService',
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

          setTimeout(function() {
            $(".sponsors-list").append(html);
          },400);
      },
  });
}

/*Load Include HTMLs*/

function loadIncludes() {

  includeHtml("includes/navlogout.html","nav");
  includeHtml("includes/footer.html","footer");
  
}


function includeHtml(route,container){

  $.get(route, function (data) {
      $(container).append(data);
  });

}


/*Function calls*/

$(document).on('ready', function(){
	loadIncludes();
  loadSliders();
  loadSponsors();
  playvideo();
});


/*Slider's arrow aline*/

$(document).on('ready change', function() {

  setTimeout(function(){

    var arrowHeight = $('.img-slider').height()/2 - $('.slick-arrow').height()/2;

    $('.slick-prev.slick-arrow').css({'top': arrowHeight, 'margin-top' : 0});
    $('.slick-next.slick-arrow').css({'top': arrowHeight, 'margin-top' : 0});

  }, 600);

});

$( window ).resize(function() {

    var arrowHeight = $('.img-slider').height()/2 - $('.slick-arrow').height()/2;

    $('.slick-prev.slick-arrow').css({'top': arrowHeight, 'margin-top' : 0});
    $('.slick-next.slick-arrow').css({'top': arrowHeight, 'margin-top' : 0});
});

/*Video reproductor*/

function playvideo() {


  var item   = $(this).children('a').children('input').val(),
      iframe = $(this).children('a').children('iframe').addClass('my-visible').attr('src', item);


  var imgSliderHeight = $(this).children('a').children('img').height();


  $(this).children('a').children('img').addClass('not-visible');  
  $(this).children('a').children('div').addClass('not-visible');  

  imgSliderHeight = imgSliderHeight + 20;

  iframe.css('max-height', imgSliderHeight+'px');


}

/*Seen notifications*/

function onSeen(id)
{     

  $.get('/seen?id='+id, function (response) {

    if (response == 1) {

      console.log('¡!');

    }else{

      console.log(response);

    }

  });


}

/*Search Events*/

$("nav .items ul.main-menu li:nth-child(1) input").keyup(function (e) {
  e.preventDefault();
  nav_search(0);
});

$("nav .items ul.main-menu li:nth-child(1) input ").focusin(function (e) {
  e.preventDefault();
  nav_search(0);
});


$("nav .items ul.main-menu li:nth-child(1) input").focusout(function(){

  setTimeout(function(){
    $('.user-sub-menu.buscador').empty();
  },400);

});


$(".search-area form input").keyup(function (e) {
  e.preventDefault();
  nav_search(1);
});

$(".search-area form input ").focusin(function (e) {
  e.preventDefault();
  nav_search(1);
});


$(".search-area form input").focusout(function(){
  setTimeout(function(){
    $('.user-sub-menu.buscador').empty();
  },400);
});

/*Search funtion*/

function nav_search(num) {

  if(num == 1) {
  
    var search = $(".modal-search.active form input ").val();
  
  } else {
  
    var search = $("nav .items ul.main-menu li:nth-child(1) input").val();
  
  }

  $.get('http://www.youlovemymusic.com/search?search='+ search, function (data) { 
    
    var cont = 0;

    $('.user-sub-menu.buscador li').remove();

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
          
            url =  'http://www.youlovemymusic.com/bands/comments?id='+item2.id;
            type = 'band';
            img =  item2.profile_pic;
            name = item2.name;

            $('.user-sub-menu.buscador').append(
              '<li>'+
                '<a href="'+url+'">'+
                  '<div class="user-item">'+
                    '<div class="avatar" style="background:url('+img+')no-repeat;background-size:cover;"></div>'+
                    '<div class="user-info">'+
                      '<h1>'+name+'</h1>'+
                      '<p>Banda</p>'+
                    '</div>'+
                  '</div>'+
                '</a>'+
              '</li>'
            );

          }

        /*- ----------------------------------- */

          if(index === 'user') {

            url =  'http://www.youlovemymusic.com/users/wall?id='+item2.id;
            type = 'User';
            img =  item2.profile_pic;
            name = item2.name;
            level = item2.user_level;

              if (level === '3' || level === '5') {

                $('.user-sub-menu.buscador').append(
                  '<li>'+
                    '<a href="'+url+'">'+
                      '<div class="user-item">'+
                        '<div class="avatar" style="background:url('+img+')no-repeat;background-size:cover;"></div>'+
                        '<div class="user-info">'+
                          '<h1>'+name+'</h1>'+
                          '<p>Músico</p>'+
                        '</div>'+
                      '</div>'+
                    '</a>'+
                  '</li>'

                );

              }else{

                $('.user-sub-menu.buscador').append(
                  '<li>'+
                    '<a href="'+url+'">'+
                      '<div class="user-item">'+
                        '<div class="avatar" style="background:url('+img+')no-repeat;background-size:cover;"></div>'+
                        '<div class="user-info">'+
                          '<h1>'+name+'</h1>'+
                          '<p>Fan</p>'+
                        '</div>'+
                      '</div>'+
                    '</a>'+
                  '</li>'

                );
              
              }

          }

        /*- ----------------------------------- */

          if(index === 'videos') {  

              if (item2.id_musician === ' ' ) {

                url =  'http://www.youlovemymusic.com/bands/band_comments?idvideo='+item2.id+'&idband='+item2.id_band;
              
              }else{
              
                url =  'http://www.youlovemymusic.com/musician/musician_comments?id='+item2.id_user+'&idvideo='+item2.id+'&idmusic='+item2.id_musician;
              
              }

              type = 'band';
              name = item2.name;

              var link =  item2.url.split('=').pop();
              link =  '//img.youtube.com/vi/'+link+'/0.jpg';

              $('.user-sub-menu.buscador').append(
                '<li>'+
                  '<a href="'+url+'">'+
                    '<div class="user-item">'+
                      '<div class="avatar" style="background:url('+link+')no-repeat;background-size:cover;"></div>'+
                      '<div class="user-info">'+
                        '<h1>'+name+'</h1>'+
                        '<p>Video</p>'+
                      '</div>'+
                    '</div>'+
                  '</a>'+
                '</li>'
              );
          }

        /*- ----------------------------------- */

          cont = cont + 1;
        }

      });

    });

  });
}

/*Close messages*/

$('.close-messages').on('click', function () {
  
  $('.messages').css('display', 'none');
  
});