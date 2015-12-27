/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"app","1":"engine"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function collides(x, y, r, b, x2, y2, r2, b2) {
		return !(r >= x2 || x < r2 || b >= y2 || y < b2);
	}

	function boxCollides(pos, size, pos2, size2) {
		return collides(pos[0] + size[0] / 2, pos[1] + size[1] / 2, pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos2[0] + size2[0] / 2, pos2[1] + size2[1] / 2, pos2[0] - size2[0] / 2, pos2[1] - size2[1] / 2);
	}
	function getDegree(point1, point2, prevDegree, speed) {
		var degree = Math.acos((point2[0] - point1[0]) / Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
		point1[1] > point2[1] && (degree = -degree);
		if (degree == prevDegree) {
			return [degree, 0];
		} else if ((degree < 0 && prevDegree > 0 || degree > 0 && prevDegree < 0) && Math.abs(prevDegree - degree) > Math.PI) {
			var degreeWithSpeed = prevDegree > 0 ? prevDegree + speed : prevDegree - speed;
			if (degreeWithSpeed > Math.PI) {
				degreeWithSpeed = -Math.PI + (degreeWithSpeed - Math.PI);
			} else if (degreeWithSpeed < -Math.PI) {
				degreeWithSpeed = Math.PI + (degreeWithSpeed + Math.PI);
			}
			return [degreeWithSpeed, Math.pow(Math.PI, 2) - Math.abs(prevDegree - degree)];
		} else {
			return [Math.abs(prevDegree - degree) > speed ? prevDegree > degree ? prevDegree - speed : prevDegree + speed : degree, Math.abs(prevDegree - degree)];
		}
	}
	function getMovedPointByDegree(point1, point2, degree) {
		var newDegree = Math.acos((point2[0] - point1[0]) / Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
		newDegree = newDegree * 180 / Math.PI;
		point1[1] > point2[1] && (newDegree = 360 - newDegree);
		newDegree += degree;
		newDegree < 0 && (newDegree += 360);
		newDegree > 360 && (newDegree -= 360);

		var dir = newDegree > 0 && newDegree <= 90 || newDegree > 270 && newDegree <= 360 ? 1 : -1;

		var direction = {
			dir: dir,
			k: Math.tan(newDegree * Math.PI / 180)
		};

		return getDestination(point1, direction, Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
	}
	function getDirection(point1, point2) {
		var k, b;

		if (point1[0] == point2[0]) {
			k = 'vert';
		} else {
			k = (point2[1] - point1[1]) / (point2[0] - point1[0]), b = point1[1] - point1[0] * k;
		}
		return {
			'k': k,
			'b': b,
			'dir': point2[0] > point1[0] ? 1 : -1
		};
	}

	function getDestination(point, line, speed) {
		var x, y;
		if (line.k == 'vert') {
			x = point[0];
			y = point[1] + line.dir * speed;
		} else {
			x = point[0] + line.dir * speed / Math.sqrt(Math.pow(line.k, 2) + 1);
			y = point[1] + line.dir * speed * line.k / Math.sqrt(Math.pow(line.k, 2) + 1);
		}
		return [x, y];
	}

	function nextPosition(point1, point2 /*, speed, dt*/) {
		var deltax = Math.abs(point2[0] - point1[0]),
		    deltay = Math.abs(point2[1] - point1[1]),
		    error = 0,
		    deltaerr = deltax > deltay ? deltay : deltax,
		    y = point1[1],
		   
		//			s = speed * dt,
		x = point1[0];

		//		for (var i = 0; i < s; i++) {
		if (deltax > deltay) {
			point1[0] > point2[0] ? x-- : x++;
			error = error + deltaerr;
			if (2 * error >= deltax) {
				y = point1[1] > point2[1] ? y - 1 : y + 1;
				error = error - deltax;
			}
		} else {
			point1[1] > point2[1] ? y-- : y++;
			error = error + deltaerr;
			if (2 * error >= deltay) {
				x = point1[0] > point2[0] ? x - 1 : x + 1;
				error = error - deltay;
			}
		}
		//}
		return [x, y];
	}
	function clone(obj) {
		if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') return obj;

		var temp = obj.constructor(); // changed

		for (var key in obj) {
			temp[key] = clone(obj[key]);
		}return temp;
	}

	var requestAnimFrame = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	exports.default = {
		'collides': collides,
		'boxCollides': boxCollides,
		'getDegree': getDegree,
		'nextPosition': nextPosition,
		'getDestination': getDestination,
		'getDirection': getDirection,
		'getMovedPointByDegree': getMovedPointByDegree,
		'clone': clone,
		'requestAnimFrame': requestAnimFrame
	};

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGVkZjEzZTgzZDg2OTY2Njk5MGIyIiwid2VicGFjazovLy9qcy9lbmdpbmUvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pXG4gXHRcdFx0XHRjYWxsYmFja3MucHVzaC5hcHBseShjYWxsYmFja3MsIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0aWYobW9yZU1vZHVsZXNbMF0pIHtcbiBcdFx0XHRpbnN0YWxsZWRNb2R1bGVzWzBdID0gMDtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MjowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyAoe1wiMFwiOlwiYXBwXCIsXCIxXCI6XCJlbmdpbmVcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIjtcbiBcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlZGYxM2U4M2Q4Njk2NjY5OTBiMlxuICoqLyIsImZ1bmN0aW9uIGNvbGxpZGVzKHgsIHksIHIsIGIsIHgyLCB5MiwgcjIsIGIyKSB7XHJcblx0cmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuXHRcdFx0IGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94Q29sbGlkZXMocG9zLCBzaXplLCBwb3MyLCBzaXplMikge1xyXG5cdHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcblx0XHRcdFx0XHRwb3NbMF0gLSBzaXplWzBdIC8gMiwgcG9zWzFdIC0gc2l6ZVsxXSAvIDIsXHJcblx0XHRcdFx0XHRwb3MyWzBdICsgc2l6ZTJbMF0gLyAyLCBwb3MyWzFdICsgc2l6ZTJbMV0gLyAyLFxyXG5cdFx0XHRcdFx0cG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG5cdHZhciBkZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKS9NYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuXHQocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAgKGRlZ3JlZSA9IC1kZWdyZWUpO1xyXG5cdGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG5cdFx0cmV0dXJuIFtkZWdyZWUsIDBdO1xyXG5cdH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcblx0XHR2YXIgZGVncmVlV2l0aFNwZWVkID0gKChwcmV2RGVncmVlID4gMCkgPyBwcmV2RGVncmVlICsgc3BlZWQgOiBwcmV2RGVncmVlIC0gc3BlZWQpO1xyXG5cdFx0aWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuXHRcdFx0ZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcblx0XHR9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcblx0XHRcdGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuXHR9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGdldE1vdmVkUG9pbnRCeURlZ3JlZShwb2ludDEsIHBvaW50MiwgZGVncmVlKSB7XHJcblx0dmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpL01hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG5cdG5ld0RlZ3JlZSA9IG5ld0RlZ3JlZSAqIDE4MCAvIE1hdGguUEk7XHJcblx0KHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG5cdG5ld0RlZ3JlZSArPSBkZWdyZWU7XHJcblx0KG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuXHQobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG5cdHZhciBkaXIgPSAoKG5ld0RlZ3JlZSA+IDAgJiYgbmV3RGVncmVlIDw9IDkwKSB8fCAobmV3RGVncmVlID4gMjcwICYmIG5ld0RlZ3JlZSA8PSAzNjApKSA/IDEgOiAtMTtcclxuXHJcblx0dmFyIGRpcmVjdGlvbiA9IHtcclxuXHRcdGRpciA6IGRpcixcclxuXHRcdGsgOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGdldERlc3RpbmF0aW9uKHBvaW50MSwgZGlyZWN0aW9uLCBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuXHR2YXIgayxiO1xyXG5cclxuXHRpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkgIHtcclxuXHRcdGsgPSAndmVydCc7XHJcblx0fSBlbHNlIHtcclxuXHRcdGsgPSAocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSAvIChwb2ludDJbMF0gLSBwb2ludDFbMF0pLFxyXG5cdFx0YiA9IHBvaW50MVsxXSAtIHBvaW50MVswXSprO1xyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0J2snIDogayxcclxuXHRcdCdiJyA6IGIsXHJcblx0XHQnZGlyJyA6IChwb2ludDJbMF0gPiBwb2ludDFbMF0pID8gMSA6IC0xXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuXHR2YXIgeCwgeTtcclxuXHRpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG5cdFx0eCA9IHBvaW50WzBdO1xyXG5cdFx0eSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0eCA9IHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSk7XHJcblx0XHR5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkKmxpbmUuayAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuXHR9XHJcblx0cmV0dXJuIFt4LHldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0UG9zaXRpb24ocG9pbnQxLCBwb2ludDIvKiwgc3BlZWQsIGR0Ki8pIHtcclxuXHR2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuXHRcdGRlbHRheSA9IE1hdGguYWJzKHBvaW50MlsxXSAtIHBvaW50MVsxXSksXHJcblx0XHRlcnJvciA9IDAsXHJcblx0XHRkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpPyBkZWx0YXkgOiBkZWx0YXgsXHJcblx0XHR5ID0gcG9pbnQxWzFdLFxyXG4vL1x0XHRcdHMgPSBzcGVlZCAqIGR0LFxyXG5cdFx0eCA9IHBvaW50MVswXTtcclxuXHJcbi8vXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKSB7XHJcblx0XHRpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcblx0XHRcdChwb2ludDFbMF0gPiBwb2ludDJbMF0pP3gtLTp4Kys7XHJcblx0XHRcdGVycm9yID0gZXJyb3IgKyBkZWx0YWVyclxyXG5cdFx0XHRpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG5cdFx0XHRcdHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKT8geSAtIDEgOiB5ICsgMTtcclxuXHRcdFx0XHRlcnJvciA9IGVycm9yIC0gZGVsdGF4XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdChwb2ludDFbMV0gPiBwb2ludDJbMV0pP3ktLTp5Kys7XHJcblx0XHRcdGVycm9yID0gZXJyb3IgKyBkZWx0YWVyclxyXG5cdFx0XHRpZiAoMiAqIGVycm9yID49IGRlbHRheSkge1xyXG5cdFx0XHRcdHggPSAocG9pbnQxWzBdID4gcG9pbnQyWzBdKT8geCAtIDEgOiB4ICsgMTtcclxuXHRcdFx0XHRlcnJvciA9IGVycm9yIC0gZGVsdGF5XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0Ly99XHJcblx0cmV0dXJuIFt4LHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iail7XHJcblx0aWYob2JqID09IG51bGwgfHwgdHlwZW9mKG9iaikgIT0gJ29iamVjdCcpXHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cclxuXHR2YXIgdGVtcCA9IG9iai5jb25zdHJ1Y3RvcigpOyAvLyBjaGFuZ2VkXHJcblxyXG5cdGZvcih2YXIga2V5IGluIG9iailcclxuXHRcdHRlbXBba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuXHRyZXR1cm4gdGVtcDtcclxufVxyXG5cclxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG5cdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG5cdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG5cdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxyXG5cdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxyXG5cdFx0ZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHRcdH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0J2NvbGxpZGVzJyA6IGNvbGxpZGVzLFxyXG5cdCdib3hDb2xsaWRlcycgOiBib3hDb2xsaWRlcyxcclxuXHQnZ2V0RGVncmVlJyA6IGdldERlZ3JlZSxcclxuXHQnbmV4dFBvc2l0aW9uJyA6IG5leHRQb3NpdGlvbixcclxuXHQnZ2V0RGVzdGluYXRpb24nIDogZ2V0RGVzdGluYXRpb24sXHJcblx0J2dldERpcmVjdGlvbicgOiBnZXREaXJlY3Rpb24sXHJcblx0J2dldE1vdmVkUG9pbnRCeURlZ3JlZScgOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUsXHJcblx0J2Nsb25lJyA6IGNsb25lLFxyXG5cdCdyZXF1ZXN0QW5pbUZyYW1lJyA6IHJlcXVlc3RBbmltRnJhbWVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzsiLCJzb3VyY2VSb290IjoiIn0=