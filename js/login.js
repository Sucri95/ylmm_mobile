/*Close messages alerts*/

$('.close-messages').on('click', function () {
  $('.messages').css('display', 'none');
});

/*Return to Home*/

$('.bottom-back').on('click', function () {
  window.location.href = "http://www.youlovemymusic.com/mobile_app/home.html";
});

/*Login Service Funtion*/

function loginService(){

  $.ajax({

          url: 'http://www.youlovemymusic.com/mobile/login/app',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data:  JSON.stringify({email: $('#email').val(), password: $('#password').val()}),
          
          success: function(data) {

            if (data != 'msg1' || data != 'msg2') {

              window.location.href = "http://www.youlovemymusic.com/mobile_app/index.html";
              localStorage.setItem("auth", "true");
              localStorage.setItem("user", data);

            }else if (data === 'msg1') {

              $('#msg1').css('display', 'block');

            }else if (data === 'msg2') {

              $('#msg2').css('display', 'block');

            }

          },
  });
}