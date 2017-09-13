    var $cropArea = $('.croppie-area');
    var $loadImage = $('.image-update');
    var $inputLoader = $('.file-avatar');
    var $cropImg = $('#my-image');
    var $rotate = $('.icon-rotate');
    var basic = $('#my-image');
    var avatarImg = $('.img-options');
    var cropPreview = $('.crop-area.preview');
    var $hiddeOverlay = $('.hidde-overlay');
    var $setImage = $('.setImage');
    var $backEdit = $('.back-icon');
    var $loaderOverlay = $('.overlay-loader');

    var demo = '<img id="my-image" src="" />';
          

    $inputLoader.change(function() {
      loadOneImage2(this, "my-image", 0);
      $cropArea.addClass('active');
    });


    $loadImage.on('click', function() {
      $inputLoader.trigger('click');
    });


    $setImage.on('click',function(){
        var $previewImg = $('.previewImage'); 
        var $img = $previewImg.attr('src');
        $previewImg.attr('src', '');
        cropPreview.removeClass('active');
        localStorage.setItem("backgroundImage", $img);
    });


    $backEdit.on('click',function(){
        $('.croppie-container').remove();
        $('.crop-container').append(demo);
        $cropArea.removeClass('active');
        $inputLoader.val('');
    });


    $hiddeOverlay.on('click', function(){
        cropPreview.removeClass('active');
        $('.fa-arrow-left').removeClass('hidden');
    });


    $rotate.on('click', function(ev) {
      basic.croppie('rotate', parseInt($(this).data('deg')));
    });


    function initCroppie() {
        basic = $('#my-image').croppie({
            viewport: {
                width: 200,
                height: 200
            },
            enableOrientation: true

        }); 
    }


    $('.basic-result').on('click', function() {

        var w = parseInt(400, 10),
            h = parseInt(400, 10),
            size = 'viewport';

        if (w || h) {
            size = { width: w, height: h};
        }

        basic.croppie('result', {
            type: 'canvas',
            size: size,
        }).then(function(resp) {

            var li = '<li class="img-options" style="background:url(' + resp + ')no-repeat; background-size:cover;"></li>';

           // $('.load_img ul').append(li);
            uploadBackground(resp);
            $('.croppie-container').remove();
            $('.crop-container').append(demo);

            $cropArea.removeClass('active');
            $inputLoader.val('');

        });
        

    });


    function loadOneImage2(elm, itemId, type) {

        var files = elm.files;

        initCroppie();

        console.log('bal bla');

        for (var i = 0; i < files.length; i++) {

            var file = files[i];

            var imageType = /image.*/;

            if (!file.type.match(imageType)) {
                continue;
            }

            var img = document.getElementById(itemId);

            img.file = file;

            var reader = new FileReader();

            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                    basic.croppie('bind', { 
                        url: e.target.result,
                    });   

                };

            })(img);

            reader.readAsDataURL(file);

        }

    }

    
    $(document).on('click','.img-options',function(){
        
        var $this = $(this);
        var $img = $this.css('background').split('("').pop().split('")')[0];
       

        $img = $img.replace('url(','').replace(')','').replace(/\"/gi, "");
        
        cropPreview.addClass('active');


        $('.previewImage').attr('src', $img)
    });


/*Register Service Funtion*/

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

function uploadBackground(src){

    //var src = $('.previewImage').attr('src');
    var user = localStorage.getItem("user");
    var user = JSON.parse(user);

    var type = $('#type').val()
    ,   change = $('#change').val();

    $loaderOverlay.fadeIn('slow');

  $.ajax({

      url: 'http://www.youlovemymusic.com/mobile/update/background?type='+type+'&change='+change,
      type: 'POST',
      dataType: 'json',
      contentType: "application/json",
      data:  JSON.stringify({ picture:src}
    ),
      
    success: function(data) {

        if (data == 'Success User') {
           window.location.href = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+user.id+"&type=U";
        }
        if (data == 'Success Band') {
           window.location.href = "http://www.youlovemymusic.com/mobile_app/profile.html?id="+user.id_band+"&type=B";
        }

      }
  });

}