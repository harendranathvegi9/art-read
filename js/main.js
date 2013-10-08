$(function() {

	var activeID = null;

	function typeID(id) {
		switch (id.charAt(0)) {
			case 'r':
				return '.ref';
				break;
			case 'f':
				return '.fig';
				break;
			case 'd':
				return '.def';
				break;
			default:
		}
	}

	function fadeIn(id) {
		if (!id) return;
		var type = typeID(id),
			articleOffset = $('article').offset(),
			articleHeight = $('article').height(),
			$trigger = $(type+'.'+id),
			$target = $(type+'t.'+id),
			triggerOffset = $trigger.offset(),
			triggerHeight = triggerOffset.top - articleOffset.top,
			targetHeight = $target.height();
		var newTrigger = triggerHeight - (targetHeight/2);
		newTrigger = Math.max(newTrigger, 0);
		newTrigger = Math.min(newTrigger, articleHeight - targetHeight);
		$target.css('top', newTrigger);
		$trigger.animate({color: "#313131"}, 500);
		$target.fadeIn();
		activeID = id;
	}

	function fadeOut(id) {
		if (!id) return;
		var type = typeID(id);
		$(type+'.'+id).animate({color: "#aba9a3"}, 100);
		$(type+'t.'+id).fadeOut();
		activeID = null;
	}

	$('.figt').hover(function(e){
		$(document).off('mousemove');
		$('footer').animate({opacity: 0});

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
		$('footer').animate({opacity: 1});

		$(document).off('mousemove');
		

		var $this = $(this),
			id = $this.data('id');
		$('aside').animate({width: '380px'}, 700);
		$('article').animate({'margin-left': '20px', opacity: 1}, 700);
		fadeOut(id);
		
	});

	$('.reft').hover(function(){
		$(document).off('mousemove');
	}, function(){
		var $this = $(this),
			id = $this.data('id');
		fadeOut(id);
	});


	$('.ref').hover(function(e) {
		var $this = $(this),
			id = $this.data('id');

		$(document).off('mousemove');
		console.log(id, activeID);
		if (id !== activeID) fadeOut(activeID);
		
		$.data(this, "timer", setTimeout($.proxy(function() {
			console.log('here?');
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
				$target = $('.reft.'+id),
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

