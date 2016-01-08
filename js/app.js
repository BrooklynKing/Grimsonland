var _configs = configs.default;
var _engine = engine.default;

var canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;

document.addEventListener("DOMContentLoaded", function() {

	document.getElementById('main').appendChild(canvas);
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.focus();

	var game = _engine({
		objects: _configs.objects,
		rules: _configs.rules,
		canvas: canvas,
		ctx: ctx,
		width: 1024,
		height: 768,
		layers: _configs.layers,
		resources: _configs.resources,
		wrapperID: 'main',
		init: function() {
			var game = this;
			var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));
			game.parameters.bestTime = localStorage.getItem('bestTime') || 0;
			game.parameters.bestScore = localStorage.getItem('bestScore') || 0;
			mainLayer.init();
			game.bindGlobalEvent('player_dead', function(e) {
				if (game.parameters.gameTimer > game.parameters.bestTime) {
					game.parameters.bestTime = game.parameters.gameTimer;
					localStorage.setItem('bestTime', game.parameters.bestTime);
				}
				if (game.parameters.monstersKilled > game.parameters.bestScore) {
					game.parameters.bestScore = game.parameters.monstersKilled;
					localStorage.setItem('bestScore', game.parameters.bestScore);
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


