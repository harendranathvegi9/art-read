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

	$('.figt').hover(function(){
		$(document).off('mousemove');
	}, function(){
		var $this = $(this),
			id = $this.data('id');
		fadeOut(id);
	});

	$('.fig').hover(function(e) {
		var $this = $(this),
			id = $this.data('id');
			console.log(id);

		$(document).off('mousemove');

		if (id !== activeID) fadeOut(id);

		
		$.data(this, "timer", setTimeout($.proxy(function() {
			fadeIn(id);
			console.log('fading in!');
			console.log(id);
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

