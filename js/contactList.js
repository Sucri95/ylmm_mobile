$(document).ready(function(){

  'use strict';

        $('#guid ul li a').on('click', function(evt) {
        	var $this = $(this);
            if (evt.target.nodeName == "A") {
                var newTop = ($this.attr('href')).toUpperCase();
                newTop = newTop.substring(1);
                moduleScrollTo(newTop);    
            }
        });

		function moduleScrollTo(t) {
			
			$('.letter-title').removeClass('active');
			$("#"+t).addClass('active');

		   $("html, body").animate({
		        scrollTop:  $("#"+t).offset().top-60
		    }, 800); 
		}

});