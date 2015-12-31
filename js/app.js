var _configs = configs.default;
var _engine = engine.default;

var canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

document.addEventListener("DOMContentLoaded", function() {
	document.body.appendChild(canvas);
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.focus();

	var game = _engine({
		objects: _configs.objects,
		rules: _configs.rules,
		layers: _configs.layers,
		resources: _configs.resources,
		canvas: canvas,
		ctx: ctx,
		init: function() {
			var game = this;
			var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));
			game.parameters.bestTime = 0;

			mainLayer.init();
			game.bindGlobalEvent('player_dead', function(e) {
				if (game.parameters.gameTimer > game.parameters.bestTime) {
					game.parameters.bestTime = game.parameters.gameTimer;
				}
				game.collisions.clear();
				mainLayer.clearLayer();
				mainLayer.init();
			});
		}
	});
	window.game = game;
	game.init();
});


