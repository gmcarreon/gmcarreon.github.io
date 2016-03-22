$(document).ready(function () {
 	
    $('materialboxed').materialbox();

    $('.parallax').parallax();

    $("#submit").click(function () {
        alert("Not yet Functioning");
    });


    $(window).scroll(function() { 

    	var yad = document.getElementById("body");
    	var y = yad.scrollTop;

    	if(y >=750){
    		$('.card').fadeIn(1000);
    	}else if(y < 700){
    		$('.card').fadeOut(1000);
    	}
	});
});