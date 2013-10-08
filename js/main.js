$(function() {

	var activeID = null;

	function fadeIn(id) {
		$('.fig.'+id).animate({color: "#313131"}, 500);
		$('.figt.'+id).fadeIn();
		activeID = id;
	}

	function fadeOut(id) {
		$('.fig.'+id).animate({color: "#aba9a3"}, 100);
		$('.figt.'+id).fadeOut();
		activeID = null;
	}

	$('.figt').hover(function(e){
		$(document).off('mousemove');

		function scale(percent) {
			var SHIFT = 320;
			var move = percent * SHIFT;
			$('article').css('margin-left', Math.floor(20 - move)).css('opacity', 1-.8*percent);
			$('aside').css('width', Math.floor(380+move));
		}

		$(document).mousemove($.proxy(function(e){
			var $this = $(this),
			parentOffset = $(this).parent().offset(),
			x = e.pageX - parentOffset.left,
			width = $this.width(),
			percent = x/width;
			scale(percent);
		}, this));

	}, function(){

		$(document).off('mousemove');
		

		var $this = $(this),
			id = $this.data('id');
		fadeOut(id);
		$('aside').animate({width: '380px'});
		$('article').animate({'margin-left': '20px', opacity: 1});		
		
	});

	$('.fig').hover(function(e) {
		var $this = $(this),
			id = $this.data('id');

		$(document).off('mousemove');

		if (id !== activeID) fadeOut(activeID);
		
		$.data(this, "timer", setTimeout($.proxy(function() {
			fadeIn(id);
  		}, this), 500));

	}, function(e){
		var $this = $(this),
			id = $this.data('id'),
			x = e.pageX,
			y = e.pageY;

		clearTimeout($.data(this, "timer"));

		if (!activeID) return;

		var mouseLocs = [];

		$(document).mousemove($.proxy(function(e){
			mouseLocs.push({x: e.pageX, y: e.pageY});
			if (mouseLocs.length > 3) {
				mouseLocs.shift();
			}

			var start = {x: x, y: y},
				$target = $('.figt.'+id),
				t_offset = $target.offset(),
				target = {x: t_offset.left + $target.width() /2, y: t_offset.top + $target.height() / 2}

				loc = mouseLocs[mouseLocs.length - 1],
				prevLoc = mouseLocs[0];

			if (!loc || !prevLoc) return;

			function angle(a,b) {
				return Math.acos( (a.x * b.x + a.y * b.y) / (Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)) * Math.sqrt(Math.pow(b.x,2)+Math.pow(b.y,2))) );
			}

			var a = angle({x: target.x - start.x , y: target.y -start.y}, {x: loc.x - prevLoc.x, y: loc.y - prevLoc.y});
			if(a > Math.PI/2) {
				$(document).off("mousemove");
				fadeOut(id);
			}

		}, this));
		
	});
});

