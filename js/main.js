$(function() {
	$(".fig").hover(function() {
		console.log('hovered!');
		$(this).animate({color: "#000000"}, 500)
		$.data(this, "timer", setTimeout($.proxy(function() {
			var fig = $(this).data('fig');
    		$(".figt"+fig).fadeIn();
  		}, this), 500));
	}, function(){
		clearTimeout($.data(this, "timer"));
		var fig = $(this).data('fig');
    	$(".figt"+fig).fadeOut();
    	$(this).animate({color: "#aba9a3"}, 100)
	});
});