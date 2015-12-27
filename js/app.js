import objects from './objectsConfig';
import logic from './logicConfig';
import rules from './rulesConfig';
import resources from './resourceList';
import layers from './layerConfig';

var canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

var game = engine.default({
	objects: objects,
	logic: logic,
	rules: rules,
	layers: layers,
	resources: resources,
	canvas: canvas,
	ctx: ctx,
	init: function() {
		var game = this;
		var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));

		mainLayer.init();
		game.bindGlobalEvent('player_dead', function(e) {
			mainLayer.clearLayer();
			mainLayer.init();
		});
	}
});

window.onload = function() {
	document.body.appendChild(canvas);
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.focus();

	game.init();
}


