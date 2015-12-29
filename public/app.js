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
			init: function init() {
				var game = this;
				var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));
				game.parameters.bestTime = 0;

				mainLayer.init();
				game.bindGlobalEvent('player_dead', function (e) {
					if (game.parameters.gameTimer > game.parameters.bestTime) {
						game.parameters.bestTime = game.parameters.gameTimer;
					}

					mainLayer.clearLayer();
					mainLayer.init();
				});
			}
		});

		game.init();
	});

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2NvbmZpZ3MgPSBjb25maWdzLmRlZmF1bHQ7XHJcbnZhciBfZW5naW5lID0gZW5naW5lLmRlZmF1bHQ7XHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuXHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuY2FudmFzLndpZHRoID0gODAwO1xyXG5jYW52YXMuaGVpZ2h0ID0gNjAwO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cdGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjYW52YXMnKVswXTtcclxuXHRjYW52YXMuZm9jdXMoKTtcclxuXHJcblx0dmFyIGdhbWUgPSBfZW5naW5lKHtcclxuXHRcdG9iamVjdHM6IF9jb25maWdzLm9iamVjdHMsXHJcblx0XHRydWxlczogX2NvbmZpZ3MucnVsZXMsXHJcblx0XHRsYXllcnM6IF9jb25maWdzLmxheWVycyxcclxuXHRcdHJlc291cmNlczogX2NvbmZpZ3MucmVzb3VyY2VzLFxyXG5cdFx0Y2FudmFzOiBjYW52YXMsXHJcblx0XHRjdHg6IGN0eCxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZ2FtZSA9IHRoaXM7XHJcblx0XHRcdHZhciBtYWluTGF5ZXIgPSBnYW1lLmFkZExheWVyKHRoaXMuZ2V0TGF5ZXJDb25maWcoJ21haW5MYXllcicpKTtcclxuXHRcdFx0Z2FtZS5wYXJhbWV0ZXJzLmJlc3RUaW1lID0gMDtcclxuXHJcblx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdGdhbWUuYmluZEdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lciA+IGdhbWUucGFyYW1ldGVycy5iZXN0VGltZSkge1xyXG5cdFx0XHRcdFx0Z2FtZS5wYXJhbWV0ZXJzLmJlc3RUaW1lID0gZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdG1haW5MYXllci5jbGVhckxheWVyKCk7XHJcblx0XHRcdFx0bWFpbkxheWVyLmluaXQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGdhbWUuaW5pdCgpO1xyXG59KTtcclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9