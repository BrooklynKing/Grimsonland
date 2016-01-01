var app =
webpackJsonp_name_([0,3],[
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _configs = configs.default;
	var _engine = engine.default;

	var canvas = document.createElement("canvas"),
	    ctx = canvas.getContext("2d");

	canvas.width = 800;
	canvas.height = 600;

	document.addEventListener("DOMContentLoaded", function () {

		document.getElementById('main').appendChild(canvas);
		canvas = document.getElementsByTagName('canvas')[0];
		canvas.focus();

		var game = _engine({
			objects: _configs.objects,
			rules: _configs.rules,
			layers: _configs.layers,
			resources: _configs.resources,
			canvas: canvas,
			ctx: ctx,
			init: function init() {
				var game = this;
				var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));
				game.parameters.bestTime = 0;

				mainLayer.init();
				game.bindGlobalEvent('player_dead', function (e) {
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

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2NvbmZpZ3MgPSBjb25maWdzLmRlZmF1bHQ7XHJcbnZhciBfZW5naW5lID0gZW5naW5lLmRlZmF1bHQ7XHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuXHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuY2FudmFzLndpZHRoID0gODAwO1xyXG5jYW52YXMuaGVpZ2h0ID0gNjAwO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuXHRjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnY2FudmFzJylbMF07XHJcblx0Y2FudmFzLmZvY3VzKCk7XHJcblxyXG5cdHZhciBnYW1lID0gX2VuZ2luZSh7XHJcblx0XHRvYmplY3RzOiBfY29uZmlncy5vYmplY3RzLFxyXG5cdFx0cnVsZXM6IF9jb25maWdzLnJ1bGVzLFxyXG5cdFx0bGF5ZXJzOiBfY29uZmlncy5sYXllcnMsXHJcblx0XHRyZXNvdXJjZXM6IF9jb25maWdzLnJlc291cmNlcyxcclxuXHRcdGNhbnZhczogY2FudmFzLFxyXG5cdFx0Y3R4OiBjdHgsXHJcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGdhbWUgPSB0aGlzO1xyXG5cdFx0XHR2YXIgbWFpbkxheWVyID0gZ2FtZS5hZGRMYXllcih0aGlzLmdldExheWVyQ29uZmlnKCdtYWluTGF5ZXInKSk7XHJcblx0XHRcdGdhbWUucGFyYW1ldGVycy5iZXN0VGltZSA9IDA7XHJcblxyXG5cdFx0XHRtYWluTGF5ZXIuaW5pdCgpO1xyXG5cdFx0XHRnYW1lLmJpbmRHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0aWYgKGdhbWUucGFyYW1ldGVycy5nYW1lVGltZXIgPiBnYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUpIHtcclxuXHRcdFx0XHRcdGdhbWUucGFyYW1ldGVycy5iZXN0VGltZSA9IGdhbWUucGFyYW1ldGVycy5nYW1lVGltZXI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGdhbWUuY29sbGlzaW9ucy5jbGVhcigpO1xyXG5cdFx0XHRcdG1haW5MYXllci5jbGVhckxheWVyKCk7XHJcblx0XHRcdFx0bWFpbkxheWVyLmluaXQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0d2luZG93LmdhbWUgPSBnYW1lO1xyXG5cdGdhbWUuaW5pdCgpO1xyXG59KTtcclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=