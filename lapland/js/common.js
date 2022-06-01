$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
   // $spinner.fadeOut();
	//setTimeout(function(){$spinner.fadeOut();}, 6000);
   $preloader.delay(350).fadeOut('slow');

	$( ".intro" ).addClass("on");
	$( ".top_line" ).addClass("on");
//
/*var i = 1;

    setInterval(function () {
        $("#stopWatch").html(i);
        i++;
    }, 1000);*/
//	
	introAnimation();
//
});
//
function introAnimation() {
	
	window.introTimeout = setTimeout(function() {
	  $('.count .ago').fadeOut(500);
	  setTimeout(function(){window.myFullpage.silentMoveTo('intro', 0);}, 4000);
	  setTimeout(function(){$( ".intro" ).fadeOut( 1500 );}, 5000);
	  setTimeout(function(){$( ".intro" ).removeClass("on");}, 5500);
	  setTimeout(function(){$(".top_line").removeClass("on");}, 5000);
	  setTimeout(function(){$(".top_slide").addClass("on");}, 5000);
	  setTimeout(function(){$(".intro-block").addClass("on");}, 5000);
	  //setTimeout(function(){$("#stopWatch").addClass("red");}, 5000);
	}, 35000);
}
//
$(document).ready(function(){

//						   
$( ".lang .en" ).click(function()  {
	$( ".lang a" ).removeClass("active");
	$(this).addClass("active");						
	$( "body" ).addClass("en");
	$( "body" ).removeClass("fi");
	$( "body" ).removeClass("cn");
});
$( ".lang .fi" ).click(function() {
	$( ".lang a" ).removeClass("active");
	$(this).addClass("active");
	$( "body" ).removeClass("en");
	$( "body" ).addClass("fi");
	$( "body" ).removeClass("cn");
});
$( ".lang .cn" ).click(function() {
	$( ".lang a" ).removeClass("active");
	$(this).addClass("active");
	$( "body" ).removeClass("en");
	$( "body" ).removeClass("fi");
	$( "body" ).addClass("cn");
});
//
$( "#replay" ).click(function() {
    $( ".intro" ).fadeIn();
	$( ".intro" ).addClass("on");
	$('.count .ago').fadeIn();
	$(".top_slide").removeClass("on");
	$(".intro-block").removeClass("on");
	$( ".top_line" ).addClass("on");
	$("#stopWatch").removeClass("red");
//	
	introAnimation();
//
});
//
$( "#skip" ).click(function() {
	clearTimeout(window.introTimeout);
	
	$( ".intro" ).removeClass("on");
	$( ".intro" ).fadeOut(1500);
	$('.count .ago').fadeOut(500);
	$(".top_slide").addClass("on");
	$(".intro-block").addClass("on");
	$( ".top_line" ).removeClass("on");
	setTimeout(function(){window.myFullpage.silentMoveTo('intro', 0);}, 0);
	//$("#stopWatch").removeClass("red");
    
});
//

	window.myFullpage = new fullpage('#fullpage', {
		navigation: true,
        anchors: ['intro', 'sizes', 'features1', 'features2', 'features3', 'features4', 'features5', 'footer'],
        responsiveWidth: 900,
        afterResponsive: function(isResponsive){}
    });
								
});
////////////////////////


