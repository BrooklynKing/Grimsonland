var app =
webpackJsonp_name_([0,3],[
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _configs = configs.default;
	var _engine = engine.default;

	var canvas = document.createElement("canvas"),
	    ctx = canvas.getContext("2d");

	canvas.width = 1024;
	canvas.height = 768;

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
				game.parameters.bestTime = localStorage.getItem('bestTime') || 0;
				game.parameters.bestScore = localStorage.getItem('bestScore') || 0;
				mainLayer.init();
				game.bindGlobalEvent('player_dead', function (e) {
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

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2NvbmZpZ3MgPSBjb25maWdzLmRlZmF1bHQ7XHJcbnZhciBfZW5naW5lID0gZW5naW5lLmRlZmF1bHQ7XHJcblxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcclxuXHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuY2FudmFzLndpZHRoID0gMTAyNDtcclxuY2FudmFzLmhlaWdodCA9IDc2ODtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblx0Y2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xyXG5cdGNhbnZhcy5mb2N1cygpO1xyXG5cclxuXHR2YXIgZ2FtZSA9IF9lbmdpbmUoe1xyXG5cdFx0b2JqZWN0czogX2NvbmZpZ3Mub2JqZWN0cyxcclxuXHRcdHJ1bGVzOiBfY29uZmlncy5ydWxlcyxcclxuXHRcdGxheWVyczogX2NvbmZpZ3MubGF5ZXJzLFxyXG5cdFx0cmVzb3VyY2VzOiBfY29uZmlncy5yZXNvdXJjZXMsXHJcblx0XHRjYW52YXM6IGNhbnZhcyxcclxuXHRcdGN0eDogY3R4LFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBnYW1lID0gdGhpcztcclxuXHRcdFx0dmFyIG1haW5MYXllciA9IGdhbWUuYWRkTGF5ZXIodGhpcy5nZXRMYXllckNvbmZpZygnbWFpbkxheWVyJykpO1xyXG5cdFx0XHRnYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmVzdFRpbWUnKSB8fCAwO1xyXG5cdFx0XHRnYW1lLnBhcmFtZXRlcnMuYmVzdFNjb3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jlc3RTY29yZScpIHx8IDA7XHJcblx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdGdhbWUuYmluZEdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lciA+IGdhbWUucGFyYW1ldGVycy5iZXN0VGltZSkge1xyXG5cdFx0XHRcdFx0Z2FtZS5wYXJhbWV0ZXJzLmJlc3RUaW1lID0gZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcjtcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZXN0VGltZScsIGdhbWUucGFyYW1ldGVycy5iZXN0VGltZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChnYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPiBnYW1lLnBhcmFtZXRlcnMuYmVzdFNjb3JlKSB7XHJcblx0XHRcdFx0XHRnYW1lLnBhcmFtZXRlcnMuYmVzdFNjb3JlID0gZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkO1xyXG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jlc3RTY29yZScsIGdhbWUucGFyYW1ldGVycy5iZXN0U2NvcmUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRnYW1lLmNvbGxpc2lvbnMuY2xlYXIoKTtcclxuXHRcdFx0XHRtYWluTGF5ZXIuY2xlYXJMYXllcigpO1xyXG5cdFx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdHdpbmRvdy5nYW1lID0gZ2FtZTtcclxuXHRnYW1lLmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==