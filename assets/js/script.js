$(document).ready(function() {
  if (!is_touch_device()) {
    
    $(".dropdown, .dropdown-active").hover(function() {
      $(this).find('.dropdown-menu').eq(0).stop(true, true).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').eq(0).stop(true, true).fadeOut(200);
    });
    
  }
  else{
	$(".dropdown > a").click(function(e) {
      e.stopImmediatePropagation();
  		if($(this).hasClass('dropdown-toggle')){
      	$(this).parent('.dropdown').toggleClass('open');
      }
      else{
        e.preventDefault();
        $(this).next('.dropdown-menu').stop(true, true).fadeToggle(200);
        }
    });
    
  }
  
});

function is_touch_device() {
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}