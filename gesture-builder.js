var GestureBuilder = (function(_opts){
    var opts, elem, r, points = [], rblocks;
	function markPoint(data, done) {
		points.push(data);
		var X = data.X, Y = data.Y;
		rblocks[Y][X].attr('fill', opts.colors.active);
	}
	function pointsToString() {
		return _.map(points, function(pt){
			return [pt.X, pt.Y].join(',');
		}).join(';');
	}
	function init(_opts) {
		opts = _.extend({
	        size: {w: 15, h: 15},
	        square: 25,
	        elem: '#builder',
			listen: true,
			colors: {
				inactive: 'rgba(255,0,0,0.2)',
				active: 'rgba(255,0,0,0.7)'
			}
	    }, _opts);
		elem = $(opts.elem);
		var w = elem.width(), h = elem.height();
		r = Raphael(elem.get(0), w, h)
		var s = opts.square, lY;
		rblocks = [];
		_(s).times(function(ri){
			lY = [];
			_(s).times(function(ii){
				var cell = r.rect((ii*opts.size.w), (ri*opts.size.h), opts.size.w, opts.size.h);
				cell.attr("fill", opts.colors.inactive);
				cell.attr("stroke", '#fff');
				$(cell.node).data({ Y: ri, X: ii });
				lY.push(cell);
			});
			rblocks.push(lY);
		});
		if(opts.listen) {
	        listen()
	    }
		return true;
	}
	function displayPath(path) {
	    _.each(path.split(";"), function(a, b){
	            var c = a.split(","),
                    x = +c[0],
                    y = +c[1];
	            markPoint({
	                X: x, Y: y
	            });
	    });
	}
	function iterate(cb) {
	    var x = 0, y = 0, sq = opts.square, cell;
	    for( y=0; y < sq; y++ ) {
	        for( x=0; x < sq; x++ ) {
	            cell = rblocks[y][x];
	            cb.call(this, cell);
	        }
	    }
	}
	function listen() {
		iterate(function(cell){
			$(cell.node).click(function(){
				markPoint($(this).data());
			});
		});
	}
	function reset() {
		points = [];
		iterate(function(cell){
			cell.attr('fill', opts.colors.inactive);
		});
		return true;
	}
	return {
		init: init,
		pointsToString: pointsToString,
		listen: listen,
		reset: reset,
		clear: reset,
		markPoint: markPoint
	}
})();
