(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Game", [], factory);
	else if(typeof exports === 'object')
		exports["Game"] = factory();
	else
		root["Game"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	__webpack_require__.p = typeof window !== 'undefined' && window.__STATICS_BASE_URL__ || __webpack_require__.p;
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!****************************!*\
  !*** ./js/engine/utils.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function moveWithSpeed(point, destination, speed) {
    if (!point || !destination) {
        return null;
    }

    var _destination = destination.clone().normalize().multiply(speed, speed);

    return Phaser.Point.add(point, _destination);
}

function clone(obj) {
    !obj && (obj = {});

    return JSON.parse(JSON.stringify(obj));
}

exports.default = {
    clone: clone,
    moveWithSpeed: moveWithSpeed
};

/***/ }),
/* 1 */
/*!*****************************!*\
  !*** ./js/configs/index.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(/*! ./objects/index */ 14);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./rules/index */ 21);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRuleConfig(id) {
    return _index4.default[id];
}

function getConfig(id) {
    var config = JSON.parse(JSON.stringify(_index2.default[id]));

    !config.id && (config.id = id);

    return config;
}

exports.default = {
    getRuleConfig: getRuleConfig,
    getConfig: getConfig
};

/***/ }),
/* 2 */
/*!***************************************!*\
  !*** ../node_modules/victor/index.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor (x, y) {
	if (!(this instanceof Victor)) {
		return new Victor(x, y);
	}

	/**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */
	this.x = x || 0;

	/**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */
	this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
	return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
	return new Victor(obj.x || 0, obj.y || 0);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
	this.x += vec.x;
	return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
	this.y += vec.y;
	return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalar = function (scalar) {
	this.x += scalar;
	this.y += scalar;
	return this;
};

/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarX = function (scalar) {
	this.x += scalar;
	return this;
};

/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarY = function (scalar) {
	this.y += scalar;
	return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
	this.x -= vec.x;
	return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalar = function (scalar) {
	this.x -= scalar;
	this.y -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarX = function (scalar) {
	this.x -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarY = function (scalar) {
	this.y -= scalar;
	return this;
};

/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (vector) {
	this.x /= vector.x;
	return this;
};

/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (vector) {
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (vector) {
	this.x /= vector.x;
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalar = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
		this.y /= scalar;
	} else {
		this.x = 0;
		this.y = 0;
	}

	return this;
};

/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarX = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
	} else {
		this.x = 0;
	}
	return this;
};

/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarY = function (scalar) {
	if (scalar !== 0) {
		this.y /= scalar;
	} else {
		this.y = 0;
	}
	return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
	this.x *= -1;
	return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
	this.y *= -1;
	return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
	this.invertX();
	this.invertY();
	return this;
};

/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (vector) {
	this.x *= vector.x;
	return this;
};

/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (vector) {
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (vector) {
	this.x *= vector.x;
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalar = function (scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarX = function (scalar) {
	this.x *= scalar;
	return this;
};

/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarY = function (scalar) {
	this.y *= scalar;
	return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
	var length = this.length();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(Victor(length, length));
	}
	return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
	if (Math.abs(this.x) > max){ this.x *= factor; }
	if (Math.abs(this.y) > max){ this.y *= factor; }
	return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
	if (!! Math.round(Math.random())) {
		this.randomizeX(topLeft, bottomRight);
	} else {
		this.randomizeY(topLeft, bottomRight);
	}
	return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	return this;
};

/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.toFixed = function (precision) {
	if (typeof precision === 'undefined') { precision = 8; }
	this.x = this.x.toFixed(precision);
	this.y = this.y.toFixed(precision);
	return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.x = (1 - amount) * this.x + amount * vec.x;
	return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.y = (1 - amount) * this.y + amount * vec.y;
	return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
	this.mixX(vec, amount);
	this.mixY(vec, amount);
	return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
	return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
	this.x = vec.x;
	return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
	this.y = vec.y;
	return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
	this.copyX(vec);
	this.copyY(vec);
	return this;
};

/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.zero = function () {
	this.x = this.y = 0;
	return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
	return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
	return (this.x * vec2.y ) - (this.y * vec2.x );
};

/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.projectOnto = function (vec2) {
    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};


Victor.prototype.horizontalAngle = function () {
	return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
	return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
	return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
	return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
	var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	this.x = nx;
	this.y = ny;

	return this;
};

Victor.prototype.rotateDeg = function (angle) {
	angle = degrees2radian(angle);
	return this.rotate(angle);
};

Victor.prototype.rotateTo = function(rotation) {
	return this.rotate(rotation-this.angle());
};

Victor.prototype.rotateToDeg = function(rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateTo(rotation);
};

Victor.prototype.rotateBy = function (rotation) {
	var angle = this.angle() + rotation;

	return this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
	return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
	return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
	return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
	return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
	return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
	var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

	return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
	return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
	return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};

/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isEqualTo = function(vec2) {
	return this.x === vec2.x && this.y === vec2.y;
};

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
	return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
	return [ this.x, this.y ];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
	return { x: this.x, y: this.y };
};


var degrees = 180 / Math.PI;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees (rad) {
	return rad * degrees;
}

function degrees2radian (deg) {
	return deg / degrees;
}


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ../node_modules/string-template/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var nargs = /\{([0-9a-zA-Z]+)\}/g
var slice = Array.prototype.slice

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}


/***/ }),
/* 4 */
/*!********************************!*\
  !*** ./js/engine/core/rule.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameRule = function () {
  function GameRule(config) {
    _classCallCheck(this, GameRule);

    this.id = config.id;
    this._update = config.update;
    this.parameters = config.parameters && _utils2.default.clone(config.parameters) || {};
    this._init = config.init;
    this.inited = false;
  }

  _createClass(GameRule, [{
    key: 'init',
    value: function init() {
      if (!this.inited) {
        this._init && this._init();
        this.inited = true;
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this._update && this._update(dt);
    }
  }, {
    key: 'setContext',
    value: function setContext(context) {
      this.context = context;
    }
  }]);

  return GameRule;
}();

exports.default = GameRule;

/***/ }),
/* 5 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./js/phaser/states/index */ 6);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'main', null, false, false);

window.game = game;

game.state.add('preloading', _index2.default.preLoading, true);
game.state.add('loading', _index2.default.loading);
game.state.add('battle', _index2.default.battle);
game.state.add('mainMenu', _index2.default.mainMenu);

/***/ }),
/* 6 */
/*!***********************************!*\
  !*** ./js/phaser/states/index.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preloading = __webpack_require__(/*! ./preloading */ 7);

var _preloading2 = _interopRequireDefault(_preloading);

var _loading = __webpack_require__(/*! ./loading */ 8);

var _loading2 = _interopRequireDefault(_loading);

var _mainMenu = __webpack_require__(/*! ./mainMenu */ 10);

var _mainMenu2 = _interopRequireDefault(_mainMenu);

var _battle = __webpack_require__(/*! ./battle */ 11);

var _battle2 = _interopRequireDefault(_battle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    preLoading: _preloading2.default,
    loading: _loading2.default,
    mainMenu: _mainMenu2.default,
    battle: _battle2.default
};

/***/ }),
/* 7 */
/*!****************************************!*\
  !*** ./js/phaser/states/preloading.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreLoading = function (_Phaser$State) {
    _inherits(PreLoading, _Phaser$State);

    function PreLoading() {
        _classCallCheck(this, PreLoading);

        return _possibleConstructorReturn(this, (PreLoading.__proto__ || Object.getPrototypeOf(PreLoading)).apply(this, arguments));
    }

    _createClass(PreLoading, [{
        key: 'preload',
        value: function preload() {
            this.game.stage.backgroundColor = 0x0e0e0e;
            this.game.load.image('loading', './assets/img/loading.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.state.start('loading');
        }
    }]);

    return PreLoading;
}(Phaser.State);

exports.default = PreLoading;

/***/ }),
/* 8 */
/*!*************************************!*\
  !*** ./js/phaser/states/loading.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log(__webpack_require__(/*! ../../../assets/img/mainhero.png */ 9));

var Loading = function (_Phaser$State) {
    _inherits(Loading, _Phaser$State);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'preload',
        value: function preload() {
            this.game.stage.backgroundColor = 0x0e0e0e;

            this.text = this.add.text(460, 250, 'LOADING', {
                fill: '#efefef'
            });

            this.game.load.setPreloadSprite(this.game.add.image(400, 300, 'loading'));

            this.game.load.spritesheet('button', './assets/img/buttons.png', 293, 54);

            this.game.load.image('mainmenu', './assets/img/mainmenu.jpeg');
            this.game.load.image('deathmenu', './assets/img/deathbackground.jpg');
            this.game.load.image('bigMonsters', './assets/img/bigMonsters.png');
            this.game.load.image('boss', './assets/img/boss.png');
            this.game.load.image('bossSpell', './assets/img/bossSpell.png');
            this.game.load.image('monsterBlood', './assets/img/sblood.png');
            this.game.load.image('bloodEffect', './assets/img/bloods.png');
            this.game.load.image('cursor', './assets/img/cursor.png');
            this.game.load.image('darkblast', './assets/img/darkblast.png');
            this.game.load.image('demons', './assets/img/demons.png');
            this.game.load.image('effects', './assets/img/effects.png');
            this.game.load.image('explosions', './assets/img/explosions.png');
            this.game.load.image('fireball', './assets/img/fireballsprite.png');
            this.game.load.image('hellfire', './assets/img/hellfire.png');
            this.game.load.image('frostEffect', './assets/img/frosteffect.png');
            this.game.load.image('pumpkin', './assets/img/heart.png');
            this.game.load.image('hero', './assets/img/mainhero.png');
            this.game.load.image('powerUp', './assets/img/powerup2.png');
            this.game.load.image('arcaneGate', './assets/img/spell.png');
            this.game.load.image('spellIcons', './assets/img/spellicons.png');
            this.game.load.image('stone', './assets/img/stones.png');
            this.game.load.image('terrain', './assets/img/terrain.png');
            this.game.load.image('tree1', './assets/img/tree1.png');
            this.game.load.image('tree2', './assets/img/tree2.png');

            this.game.load.audio('menuTheme', './assets/music/menu.mp3');
            this.game.load.audio('deathTheme', './assets/music/death.mp3');
            this.game.load.audio('battleTheme', './assets/music/battle.mp3');
        }
    }, {
        key: 'create',
        value: function create() {
            this.text.destroy();
            this.game.state.start('mainMenu');
        }
    }]);

    return Loading;
}(Phaser.State);

exports.default = Loading;

/***/ }),
/* 9 */
/*!*********************************!*\
  !*** ./assets/img/mainhero.png ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACACAYAAAD03Gy6AAAaa0lEQVR42u1d+5NcxXUekd/CywKDVgOqVGJYaR/S8pCNFAGhbORgG1dRKVWBysAKeYWE8y/wQ6qoFJJYrXZ2V7urFyvAEg+DhJAwhh8ACbHS6rE7+9Jbu5J5GOKkEjuOU0kl1emv7z095/Z037kz0zuzm+RWdc3rTp9zvnO6b9++3+lOpabhsWzJEkHF/G3hggWisbZWNNx+u6iXpUG+X7hgvmiqrxc31XxT1NxysyimvtSMA6CuThkMw1Ea588XAAUA3Dz3JjHnljllAYBzhs5eEBs6OsScdA7MZbJ+yFmxcqUC/9nnnhOfDg6LT4eG1XuUZQ0N6nfUkZ43V/8X71/o7BRD5y4m1qFa9quTByUAGwEAq6xJATBfGVh3+23K4CODQwoEAgDn5ACo0f+dKwFo7eoS2QIAQJ4CP9OhjFH6NDaqekkGCmQcPjGoyicnByPfU4GcubfWaHk1su6NoRNqLCBNB/uVkhC+oT2TA0BGVVN9XQSAh378sDh0/JQsJyUIp5wAoL4IANIoADzXAcAckp8J5AN8qk8ZfGpIyfv+j34oPjp2XJWPB05o+Q21Qct4tq1N64CCloSCVjV07oLTATXpytjvDICaMALXSwXQn9oAgODlP/yB+PDogCoAQQMQRgYpYwUgRgGci3Mg//n2drEsjHz0+XiFsR9Led976K/V564dL+ny3WV/Keq+9RdR+RK85zdvVjrAqagbxRWFcEA17U+RouszUQAaCADp8Y+ODYjvPvT9hADUB/UsaVRGQYGNMQDge/wPOuD1kYcfZvX9OHxtFn/z6ONKJh1nz/9WfX7q6b9VheTj/x98MqBeVb1SNgETGwBVsj8hAE/mA3AhDoBjOQAy8QDU1qUF6YDow/9+dahf1wsZp899reWOjn+hXhc0NqjfLk3+s5i88jux6419+j/vh/J1vfK1tq5WVMP+jQUCIFU7jwGwJADgPQOAMxyA0w4AXo8HIC2Bdl2H4AScN3j2vPof6rjy2R/Epcv/Is5f/EcdcaPjn0cc0NC0SJ3b99pb4vJnvxdXPv+D+PzLP6rvUA/6dtRbGyM7XVcZ++N0KA4AUmChBOCO8gEI5NcqJe9YfJtstu3igeXLIwBQGZOyx05/qeTXLWoUjXc2qXN2vb5XvPTG2/o/+P+GTLus747Y6J8u9hcHwBn/AJAOOH9jRyYq/9U3tfwz577S0dhwR5NYdPed6pyXf/G2eOXNdyLy0fRRX1LZ1ba/qgBw+Rg7c/kvyb6ddEA0ouBYdPdd+pyfv3VA7Nl3MCIf9ZQiv1r2TxsA0HRJvvxaLF66ROmAZg49JmS3gOPO73xby9vz9rvqPzif5KOemRQA0wYAUz6Vu+75thzp7FV9LQ5uLD/Pt/xK2T+tAKB6vv7tf0XqLlT+4Z/+e8YGQNUB4DqQ/Nff+ZU2Nk4ufsfxxsH39bmlyq6m/VUDgM8cYthGdarmLfvWz+TQ7srn/ypsxxe/+Xfx5df/IV575z39H/yfTwsknZKuWgBUEwCSuWnLFn7HqLsB9K+vvPWO6ocnf/17ddPDuwA65zUJFu8SdL3dW+LvRKsdACS0rbs7AQC/Kx6ALd1OAOickQsTqnAdSP6r+38pfr73gHhJDvUw3lY6SEdw+a/Jc9448L6Wz20auTghhmXdhXQw9MzZv+9dNcQk+yeKtL+tu8cdAHTS6MVJMXppUrT19BQG4ErgBK7Aqw4ANgGAC5NOAPB5UwgSn9blOpAeGOphvI1IxB0nl09yuWxeUD/k2OTj92EVAJPqnDz73/6lko0brT5p/4TFfmcASDxHL16W8iftTsAX6qSJywkAeEc54fJnEgBZigEABrbKrsAWBegn6U6Uy+bfcz0+/80fVaHPXG6humwBCL0oQOLsf6UM+8cuXRabJc7WVlAsAOgPMd9RPABp4ZoCoMKAUoU+o565t87RsniprZsbzrfY/2vWb5sHitPZn/21IhUHAP+zDQA8+LYBgGevcQDETQeTou29vaJ961abwlonAuOFzg6RPXchojerPw8E1Iv6Xf0wPzfOhmLtNzF1zgm5otAEIC0jLXh4kVFPeEwA+LlkUGbbNpFhwLqGfrZChmA8nfs+cMKmLV15uv4kHL9z4Cx1Oq+D0BP68tEL6RG8D+ynR4yFAiBJ64sFgCpM/1lT7rt5gRKY5zABWNHSIrp27siro5ACFGEA+mh2XDSvadGgk3wq9JCDCj7z3wkAOAP1oD76T5x8W/ChdO3YEYluCoCc/Wn9G5dfTABoB6x6+mlZ1kY8CeXJSDIE43Uas9NvHKiB0bPq+y07d1JEFrz5wfn9AL9lZR6gzWtWagOvvbFJXHODLLOD1+tubNIBAsBNh6G+/tAJCW+KlN44f2DkbESPPAy6oxgQVhw/4AlcCzqgu69PHB89J7pf7ItUsKIlF2kUAWiKXJgZqT19QR2P57qERHegXTu2a6A1+FJ+5/ZtrBXOVd0PSpssFIH4HefhfK4LrzfhZIDSG+fDDrNl8aAMZKf1d6pVtqyM4Ac8Fa59fQV1iBhPXQr1jUdOjYhrw8iD5w+fyIpPTg6r3wJPr9FCf/rMOt6HFzUNwvt+Ar9/aFRFOuRDn0PHB2UX0Kle8fnasCXgPO4EDlqRHLXAjnU5O1atWaPew17YDfvbJA7AA/KBT2ZbcK1rlriZWCbFIqI4vNkhKz0yOKo+Q9jVs5tUFB4+mVXjWt4/rpYKG3MkJR90XegIjSLn4/3HA6CpnFKv+Ewg8PNLAN2JxerQEaQT7Ib9iH7qCvEbcOrARTx0QNlYoJL+oTFVGfW9EAzP0zNUfhE0IjjlwwGZrb0aXJS0vBdo7exUDsArmGj0G1qBRwekeAsyBwGwHzgAD+ACfBRe2TFfsnNAkBc3h7fpFAU0RHyEDf98gG/KVrf08qJ36PiQ6npwQ5a+tUYVXAsOye6AdCPQPFJmI8NhspVaP8diCmRHFYFw1QJ6uqcMdGckhjc7AJ3J09+Hd9lTrgd3BoDH9eCRIgYbZStAXq+UQJILlvNHA4PiBdkCuAMwHEQLQFBUWqcqYVE9ynyhUvCGZ0YC0NhYFQAWLVggFtUFeQFgPZ8cP6Opi+ZsI+UFqDvU8AaxIBFqugfAwvnzxaIwMQKcxxOFAAhv0be++HLZoxDQzf9+Y6s4mh0WR4dH1XvUSfp09GwVHb25ORviXlJewPD5S2U7ATkBC4uxPwyATToAynACZaL0D0kAsiOadKod0vaceHZzWx4ANR4AqGdU7wfvu1c8eP992lDlFOmQYyNjor07mN08efpsZPIM75EQ0fviruSMNIcOsL+f2b+wgP06AMJnCyUFQP1tDIB7owDgu2MhAKSUFYDzF1VXUCwA199wbUgFzDHR9n/woXIEOQCgUIugYSGlKKEgEaNn566SHRCxHwFwX/H2IwBLsd8NwL33agX6w9ysCACNOQAQfS90dannq8UocMNN3xCPPPBXml1AB6d/kw5KtjwXB2jsfIa0Z2efBP+lgpT0Yuz/3r3LirK/tQT7Swfg8NEIABgutjJ2Q1IFFtXV5cmn92AoTxjPYHFQpHIauPkUKin41ba/IACTUwxAkyEfnPuFd90Z4V/iWSwVnhTxvOyPb1vwLd0HlzIaqbb9TgCaLABcyQNgs7htsQQgHAmUAgAS4ub9+S1aPviXdyy+O8K/fPnN/eLlX+xXr5998W/qwTy+X9++WUeh5dnyjLC/eAC+9AvAjTfPlvJv1fJhKLiYdy+5R8vfvfeAeGD50ghpKuDhZ4zHlhUIAM/2OwD4TsUAwDH7m9dr+eD/LF56j5LnIsByHj51A4mewU5T+6sKAB0wGEccDxM0QC4fFz4f8qeD/ckA+GpqAMCxWMp/RTbxOAIsaIAR+V2dOhWobPlLl1QtAJIDsG/qAOBBwA/0tyDB7tl7MI+NRpkovhxQbAD4lF8QgN1TDAAO9L04fm3wP0GN5PIhexabFnbwdLzYD9tVAOzLtx/zP14dUAwAqSkEAJHI5eMiaOZhwQGKVd3THRl/+5CPoW7U/gNityH/qlkpnYjh3QG4EOUpsNcBQHfuEV25AODCB1km+RVdH5jKXPasWSknqarUycgHli6NCYB3DQfM8h6A8jqwJJJyyRMVXg37P4r+WalUnuCyhCsHLNdA2wqBT8YjB4DT6sudj0f9e/baA+C1/e9Fov9PrrpKUftN+WXpgMp3G32dCQCB36oYYvnNv9znETYSrEn/BvDIaQD1e2zismjv3RpphaXIJQY2+P5x9ivwZQBM2QOZOAACal5XkNUSJnZsDtnHfikhaRVd5FzevUFee29PhMmdYq2x1CCAzLnzakSSAOCsat+tUB3g3IxcuJSX66SE5bJNvBlv4+Rwp/JXk0LvoNiXRIXhMobPX9REXP60i4AHM2JUtkAE4ahKwvAYiBwAMo4bzxUxrwE+OEE2YFOW5IuAEbdNdG7frlhp5UQg1Yt8ArwCVN4CuZ2Ud8DxMFnhZTnBclHNS1pQ/H9ZOkJevW9WAjeECtHX+fyLAmhNi7/mb2mBHAtbICbOiikHAOI9mp4uN/Li5IP4S+RYCoJjI2fU56PDp6P5C57kt96/ULjyBlKOFCjVEmUr7NyxQwbJGj94mNRzGK4SKaThxJn0Nfx0yTc5+or3Lw2EHiYT2QdJyuS6kl3NYRAQJqQDYcHzLLyB37urz2r4CgsF2xcxlx+uHAQCg14NKrgXB6QMyr6tHAuTUZrDJIxU6ZR4uwPAkWeRpftdngmCgpQgKj4dAIo8EiyODo/ndX2rwmDgXcKTjz3mlZqOutDqcd3hgfCff/eswmXV2gD4p9auizjAVyCKJx59NJLtwrNEUix/DP00OcD3RRhJF0ezY/piaLY66LZ6bZBa1bzyMW/yCXzkvZEDeFdoRLvts5dDp+ygb0P+F3KozKapjH96TTG5WEUNhftDB5gy4fCnJPg9fbu8R5+yqaUlLxFQRfy6tWL1M+vEE7LFPbly5dQ4QOVJ7dqlDKRuBuCj39X5VzI6cBEy+mqvBzcKToA8MxfLyEjxJje4yI6rwluByggKHUCyM3Lk5FUH19DL7CMpSlMV4udXQybJbQ5z4WJKxQ7NBDhyarRiYATyRvit/pTLRJoWzxRN/W/OB7C1vmIo4v8PgBfZab1+D6e+m8wz+u7U6XOKHIX3IFiB5TajAyA5AMEq4yfHz+Yo7ABgwQJRruzh8xN6LwC1/nJnh9YBC2MTPRyEKs5cJjo9cgzKHXltChnOxP13BQAY0rR0/qL68uzPAXDBAKCDASCjTQtkSQxHs6OaT18KABRteMhDOQZRQ89pWQMjYxGauOqj779PUcqJswmev7cAcNlflwuAo8Mj0v7h0gNAA9DlAuBsLtoAgIw4DsCDZQJA8tHyaOcJHXGNDXoG1EYVh9z9H3zElhl+Uz29AuW8ePu7Cto/MAX2ewDgQy8AoD60AhCe+KoooILjAImWU8X5Gs/8UAtoy3NBPS/O/i0qx6EY+5FDUK79VQfA1IH3t3xNf3PBPOQOXApXszXp5ZCf9KKcb39Xxe2vKgC20Qco36B+q35XyiaZVyy5AqCSg1IOajmX31Sk/GLtn/Ro/7QAwHzIAeNBAacF+0AN51Rxkg8qOSjlEwwMUM4xUpop9k8rAPjMKyjgfEXzlFrXc6kiS9F3YLSBVAZQcvJvFaCezxT7pwUA5s0N5GMYaMqnklu9cKmilIPRR/JBOS/1Bqwa9k8LAGzyMSDg8kERj5sUwwFAyiEiVMP+5AB8VTkAQHwFBZ7LB0U8blFt8DoXe3RAKQEAqntqygDYVzkAbLtaKB32HlSUcfTL5lGK84uRnygAfDrABsDuKQTAxrWZxZo7yQdlnusESj0O9MU+HYCbs7wA2HdQ5w34sj8WgFQFAYjwLnu6FQ/VdAAA2G2wmBF5U9EC0A2BkBuxf9/BPBo9cgq8OYCAB/ffBkDggKgCdAEq1QG2kQgBgVwArgMo7Jyvz/MYwmxGrwEIOrzZDbsCADkGZc2F2zj/s4yrPnIF9lho7MgtWFzm3Hi0BfTofQUAghkIZoFjQgp9WQEQXYJ+UuUC8FaAXAFbAOxR6azLy3s2YHYDyAHA/IjpBFtB0ywXAIo6cP7B/R8LGcjmBg+uMlUPZJATYHZFZkFuAX5HrkHKBwjg4sN45AKgK0JuAL6fKgCMJ0wR+jtyAjaHjGROkqVNKHws3udqfabMOPuRY1DWql1xIPD8AN5PIpeA7yhdbutzsbN5ggR/9fGgPhJ4Pb0G978nzxH01Cx4hnDRtgx+eQ6w5QCYIPALlQ9eEGdcg/PfwZaUL8RQLsdwGxWe24tcACxdbMNFtUDpJJ5bUHZuQG754G06D8C1yYFvdrSN888XzuZcTS/JECn3TiJxgWeOGL3SVmzcf3O/AJ8AxF0IwUYjGjj4mtz5IOmCm+rDAbADzD9w/MH1d6yA4tyoAe9bA4acPwdQxUTJIyoigDCp3L5JURHuaZgZQ9RIM2fAZ/fH1/znNkM2B58czx3EdCsfALNSinwbEMgl8E3MjToglxPgWtffZ8vTLUw6A7xYEJPjcgXMHIayFTE4/5FdNThFnYSy9fa9gMC4/jo3YRXLUtHRmR1XFPYVwb4B3gKPXmn5elDgbY5HKxgIU6ZSvniiRP1GoWZGgs2sFaKvI5cg5ZMaHnL9V69bq2XktcaQut4pBwgeW18s7593fdQ1giXOnOAHgJ+wiDObGmjqaJLUVz7ufwVxbTBR5MnxXBflgKExnwniVgc0y/rRIn/6zDO6RZibCzXnNm7wOwqhRDTsKESCA6/v1N3QKiRJSKCmYu1+s0/moKd85mRZZHf8YGEu/Um2yNXPrIsMSAA65Q/4Tk7RitjG/ikjV6BCK5e7dJnKw/nUq9nXViVJjMb+KMQQSFWPH6+3Tvn4+FC11+6P7J50ZGh05ucNxNG84yjhNbfMUSTaYuqbmQBg6XaUhgbFlaSl3OdKAEDhLgcA13wSn+xrqq9X5Kjjo+OynA6Yam1tSg++jLxtYi2pDokCQNlNhewvMwCiAKSjAISrk4OKHvDwc9RwlGUNOQBqSwAA+Qe05DsBSIqvD6ngxMME/79/aETnAdD3yBkgCjltNxjokNb7CcdND8faHzoYFEOyf2Bk3BoA/L+JA6BWAXDJCgBR8sjQT4eGxaeDw5oZrAGQ5+UAqLUDYGklygHye7Xke1eXXv9ZLxkvDYSxoIIr+VL2kVNZ+ZqNyMd5G6QTonM3wU53mDLGc4xY+Y4AyLN/MIn9tgCYVIkudgckAAARFyTIDYlPTg4pEEwA1mcy8QA4FCBKOOSbs5BafugAyIMOVvmGA6gu2vvSFYXpeWmn/c/n2Z8t2X6nAygrJRaALAPApsBzpQNgspFfCBdIou9JTi4KsyoKc7KfszpgE9v3LK4bcAaA7FoS218oACzbqU8bAMyHG62GfK6DTR9awdwMHrA5LA+Tpp39VQeAX7D4AoBceboQ04VQDwDkyAiyyXgzAmktu0Kyq22/BwAyJQNgA8GUr+tm+8XQrka27EVeR5KHRdUMgGkBgPkAyCbbBowrfbTYFWyng/1VBcAEIa6YD8N9y6+W/dMGgP+r8mdEBMbJj9ticEY5oNoAOPvfmAm5SsifavurDoBNBz0nJEcZGG08375ZzfusDwtytzZ0dKgMFt+yq2F/YQDC4hsAlzEbOjJadqGuwTYMLHZKumoBUE0AeHY6/YcvFaCmf+V4W63EEm5xaw4FI3s5XpzQt/5mvUXbn6lAABQDAO0oGguAYlAnAyD3n0uq0HwMfY8ZxsEz59V2sngOECySEUwH45kAvj915pzaxJM20eT/xzxMUPdEQR24bEQ06swLgAT2jxgBwG/unODjTwFwW/IAgIEBAKfDVVLsANAuqvz/rQUAoMVB6HdXJPFpYThhQDoDCdDqwZCFy2nWxYPCHgATekbUbf94rP3DFvshE9iiWJ1Acxa0Tn8SAEgBRIR6OpYAAB4VdvZF2rH4dTrcszej1+k5MSYNHztjle0i2AZTw7XW6IdeBFDiAJD2NxVhv9plw2Z/3iLcDmPQF5IS9EhwWUO9XjXLBUChnSXMDBQXIYqicUMmuPgNyqgzDS1EXXddFG0YmAEQ2N8W2n+a2Z80ABwYuE62AYALshoFSEWweBEH3wTAdiFyRaBaBn/rVlnseQC2G6TWrk7X7qV5IKBe1O/qh10jn1xdwVMtCsIk9tv0do6KXMu0xwGwIZOJBUAnWOzYHqF5F4pAc2lk1+4Yru9Ih6R7O0Y3gdgebgLhsKcI+13U9cSUcFcFtIBd9LGbncaeNHuFk3271Mq8T0cIsGbd14WFUyVNGbTCeteOnSaZ2Op8WwDm151W7IdC9vP/l8oVcma/XDO7SVz9jSbxp9fLIl+vuaHJChIHpxBvlCjntDS+i3HnWkre1mo5cYrqLhCBmgCcjnHu1bND268PcLj2hiZnLlvK1/rReZkxsskdOj4kRw9bxCcnh/OM58qDzJokbcfRTSgOKroxzoa+ziDnEmhdO4JVzrmsIiiTEX1tNHSUwyezaqh+KGTmlb2FbSFQYFT/0DgTlg4dkJXDqsAB9BuY0k88+rBmE6/52c/KyZkKCMAS/P7seARwPBBv7+lWr3xFdRBkcf4qwwnF0g1bpN7NIe0R9hADHLJgb5tyQDbigIAwPK4JzN4cgIsSRhBoykFzSyt+DaIA0cAzAtGEjYgvuRkGzOOVKvFC9/03NoUgZHVRDrgx1+LIAWWAEOnCYA/PTYC9h08ErQA4AA/gAnyAE/Dy6gC+aLVqglL4Yel9CKa8Wccy8uXLDh1AEQ4HQG7Q8rJS/hYlj3dJcEDzmhavOymZ1HjYDT2AA/DgIzfPeQrRPpQAN0FngHtfv59kYMX0I6eGpQ7duisMIrJHRl6vTSff9PRI0kg0obunIvT8XB/Y3SP74N5KrpkfyYo3AangUvbaIbAfONA1sBKyFcWCexoJ3JUyGlFOkc4dgH6XMukrpUtHmI+me4be3qJl/w/LjcXNbe51yQAAAABJRU5ErkJggg=="

/***/ }),
/* 10 */
/*!**************************************!*\
  !*** ./js/phaser/states/mainMenu.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenu = function (_Phaser$State) {
    _inherits(MainMenu, _Phaser$State);

    function MainMenu() {
        _classCallCheck(this, MainMenu);

        return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
    }

    _createClass(MainMenu, [{
        key: 'init',
        value: function init() {
            this.menuTheme = this.sound.add('menuTheme', 0.3, true);
            this.background = this.game.add.image(512, 768, 'mainmenu');
            this.background.anchor.set(0.5, 1);
            this.background.alpha = 0.8;
        }
    }, {
        key: 'create',
        value: function create() {
            this.generateControls();

            this.menuTheme.play();
        }
    }, {
        key: 'generateControls',
        value: function generateControls() {
            var button = this.add.button(512, 384, 'button', this.startGame, this, 2, 0, 1, 2);
            var start = this.add.text(0, 3, 'START', {
                fill: '#efefef'
            });
            var info = this.add.text(-300, -300, ' MOVING: WASD\n AIM: MOUSE\n CAST SPELL: MOUSE CLICK OR SPACE\n SELECT SPELL: 1, 2, 3.', {
                fontSize: '20px',
                fill: '#efefef'
            });

            start.anchor.setTo(0.5, 0.5);
            info.anchor.setTo(0.5, 0.5);
            button.anchor.setTo(0.5, 0.5);

            button.addChild(start);
            button.addChild(info);
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.game.state.start('battle');
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {
            this.menuTheme.stop();
        }
    }]);

    return MainMenu;
}(Phaser.State);

exports.default = MainMenu;

/***/ }),
/* 11 */
/*!************************************!*\
  !*** ./js/phaser/states/battle.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collisions = __webpack_require__(/*! ../../engine/collisions */ 12);

var _collisions2 = _interopRequireDefault(_collisions);

var _layer = __webpack_require__(/*! ../../engine/core/layer */ 13);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
    }

    _createClass(GameState, [{
        key: 'init',
        value: function init() {
            this.battleTheme = this.sound.add('battleTheme', 0.3, true);
            this.deathTheme = this.sound.add('deathTheme', 0.3, true);
        }
    }, {
        key: 'create',
        value: function create() {
            this.pauseFlag = false;

            this.collisions = (0, _collisions2.default)({
                n: 6,
                width: 1500,
                height: 1200
            });

            this.initGameParameters();
            this.initGameLayer();
            this.initControls();

            this.battleTheme.play();
        }
    }, {
        key: 'initControls',
        value: function initControls() {
            this.restartButton = this.add.button(512, 384, 'button', this.restart, this, 2, 0, 1, 2);

            this.restartButton.addChild(this.add.text(-65, -15, 'RESTART', {
                fill: '#efefef'
            }));
            this.restartButton.addChild(this.add.text(-70, -70, 'YOU DIED!', {
                fill: '#EF0000'
            }));

            this.restartButton.anchor.setTo(0.5, 0.5);
            this.restartButton.kill();
        }
    }, {
        key: 'initGameParameters',
        value: function initGameParameters() {
            this.parameters = {};
            this.parameters.bestTime = localStorage.getItem('bestTime') || 0;
            this.parameters.bestScore = localStorage.getItem('bestScore') || 0;
        }
    }, {
        key: 'initGameLayer',
        value: function initGameLayer() {
            this.bitmap = this.add.bitmapData(this.game.canvas.width, this.game.canvas.height, 'battleBitmap');

            this.image = this.add.image(0, 0, this.bitmap);

            var layerConfig = {
                id: 'mainLayer',
                size: [1324, 1068],
                background: 'terrain',
                initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'hellfireSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level', 'fog', 'monsterController'],
                init: function init() {
                    this.state.parameters.monstersKilled = 0;
                    this.state.parameters.gameTimer = 0;
                },
                translate: {
                    x: -150,
                    y: -150
                },
                state: this,
                ctx: this.bitmap.ctx,
                rules: ['random_trees', 'spawn_heart', 'spawn_powerup', 'goWithPlayer']
            };

            this.gameLayer = new _layer2.default(layerConfig);
            this.gameLayer.init();
        }
    }, {
        key: 'stopBattle',
        value: function stopBattle() {
            this.processGameParameters();
            this.battleTheme.stop();
            this.deathTheme.play();
            this.restartButton.revive();
            this.pauseFlag = true;
        }
    }, {
        key: 'processGameParameters',
        value: function processGameParameters() {
            if (this.parameters.gameTimer > this.parameters.bestTime) {
                this.parameters.bestTime = this.parameters.gameTimer;

                localStorage.setItem('bestTime', this.parameters.bestTime);
            }
            if (this.parameters.monstersKilled > this.parameters.bestScore) {
                this.parameters.bestScore = this.parameters.monstersKilled;

                localStorage.setItem('bestScore', this.parameters.bestScore);
            }
        }
    }, {
        key: 'prepareForRender',
        value: function prepareForRender() {
            if (this.pauseFlag === true) {
                this.gameLayer.render(0);
                this.bitmap.rect(0, 0, this.game.canvas.width, this.game.canvas.height, 'rgba(10,0,0,0.5)');
            } else {
                this.gameLayer.update(this.game.time.physicsElapsed);
                this.gameLayer.render(this.game.time.physicsElapsed);
            }
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.pauseFlag = false;

            this.battleTheme.play();
            this.deathTheme.stop();

            this.collisions.clear();

            this.restartButton.kill();

            this.gameLayer.clearLayer();
            this.gameLayer.init();
        }
    }, {
        key: 'update',
        value: function update() {
            this.prepareForRender();
        }
    }]);

    return GameState;
}(Phaser.State);

exports.default = GameState;

/***/ }),
/* 12 */
/*!*********************************!*\
  !*** ./js/engine/collisions.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function generate(config) {
    var n = config.n || 6;
    var width = config.width || 800;
    var height = config.height || 600;
    var sizeX = width >> n;
    var sizeY = height >> n;
    var cellGrid = new Array(sizeX * sizeY);

    generateMap();

    function generateMap() {
        for (var i = 0; i < cellGrid.length; i++) {
            cellGrid[i] = [];
        }
    }

    function getCell(point) {
        return point[0] + point[1] * sizeY;
    }

    function removeObject(object) {
        var oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < oldCells.length; i++) {
            cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
        }
    }

    function getPointsOfObject(object) {
        var pos = object.pos;
        var size = object.size;
        var cells = [];
        var xIndex = size[0] >> n;
        var yIndex = size[1] >> n;

        for (var i = 0; i < 2 + xIndex; i++) {
            for (var j = 0; j < 2 + yIndex; j++) {
                cells.push(getCell([pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex)) >> n, pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex)) >> n]));
            }
        }

        return cells;
    }

    function updateObject(object) {
        var cells = getPointsOfObject(object);
        var oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < cells.length; i++) {
            if (oldCells[i] != cells[i]) {
                cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
                cellGrid[cells[i]] && cellGrid[cells[i]].indexOf(object) == -1 && cellGrid[cells[i]].push(object);
                oldCells[i] = cells[i];
            } else {
                cellGrid[cells[i]] && cellGrid[cells[i]].indexOf(object) == -1 && cellGrid[cells[i]].push(object);
            }
        }
    }

    function checkCollisions() {
        for (var i = 0; i <= sizeX; i++) {
            for (var j = 0; j <= sizeY; j++) {
                if (cellGrid[getCell([i, j])]) {
                    var objects = cellGrid[getCell([i, j])];
                    var length = objects.length;

                    for (var k = 0; k < length; k++) {
                        for (var l = k + 1; l < length; l++) {
                            if (boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
                                objects[k].getParameter('collisions').indexOf(objects[l]) == -1 && objects[k].getParameter('collisions').push(objects[l]);
                                objects[l].getParameter('collisions').indexOf(objects[k]) == -1 && objects[l].getParameter('collisions').push(objects[k]);
                            }
                        }
                    }
                }
            }
        }
    }

    function boxCollides(pos, size, pos2, size2) {
        function collides(x, y, r, b, x2, y2, r2, b2) {
            return !(r >= x2 || x < r2 || b >= y2 || y < b2);
        }

        return collides(pos.x + size[0] / 2, pos.y + size[1] / 2, pos.x - size[0] / 2, pos.y - size[1] / 2, pos2.x + size2[0] / 2, pos2.y + size2[1] / 2, pos2.x - size2[0] / 2, pos2.y - size2[1] / 2);
    }

    return {
        cellGrid: cellGrid,
        updateObject: updateObject,
        removeObject: removeObject,
        check: checkCollisions,
        clear: generateMap
    };
}

exports.default = generate;

/***/ }),
/* 13 */
/*!*********************************!*\
  !*** ./js/engine/core/layer.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _configs = __webpack_require__(/*! ../../configs */ 1);

var _configs2 = _interopRequireDefault(_configs);

var _object = __webpack_require__(/*! ./object */ 28);

var _object2 = _interopRequireDefault(_object);

var _rule = __webpack_require__(/*! ./rule */ 4);

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLayer = function () {
  function GameLayer(config) {
    _classCallCheck(this, GameLayer);

    this.objectCount = 0;
    this.id = config.id;
    this.state = config.state;
    this.game = this.state.game;
    this.ctx = config.ctx;
    this.initList = config.initList;
    this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
    this.pos = config.pos ? new Phaser.Point(config.pos[0], config.pos[1]) : new Phaser.Point(0, 0);
    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
    this.defaultTranslate = config.translate || {
      x: 0,
      y: 0
    };
    this.sortedObjects = {
      'default': []
    };
    this.objects = {};
    this._rules = config.rules || [];
    this._init = config.init;
    this.inited = false;
  }

  _createClass(GameLayer, [{
    key: 'init',
    value: function init() {
      if (!this.inited) {
        this.translate = _utils2.default.clone(this.defaultTranslate);
        for (var i = 0; i < this.initList.length; i++) {
          this.addObject(_configs2.default.getConfig(this.initList[i]));
        }

        this._init && this._init();

        var rules = this._rules;
        this.rules = [];

        for (var _i = 0, l = rules.length; _i < l; _i++) {
          this.addRule(_configs2.default.getRuleConfig(rules[_i]));
        }

        this.inited = true;
      }
    }
  }, {
    key: 'render',
    value: function render(dt) {
      if (!this.inited) return;

      var arr = {};
      var ctx = this.ctx;

      ctx.save();
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
      ctx.clip();
      ctx.translate(this.translate.x, this.translate.y);
      ctx.fillStyle = this.background;
      ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);

      for (var i in this.objects) {
        if (this.objects.hasOwnProperty(i)) {
          arr[this.objects[i].zIndex] || (arr[this.objects[i].zIndex] = []);
          arr[this.objects[i].zIndex].push(this.objects[i]);
        }
      }
      for (var _i2 in arr) {
        if (arr[_i2]) {
          for (var j = 0, k = arr[_i2].length; j < k; j++) {
            ctx.save();
            ctx.translate(Math.round(arr[_i2][j].pos.x), Math.round(arr[_i2][j].pos.y));

            arr[_i2][j].render(dt);

            ctx.restore();
          }
        }
      }
      ctx.translate(-this.translate.x, -this.translate.y);
      ctx.restore();
    }
  }, {
    key: 'update',
    value: function update(dt) {
      if (!this.inited) return;

      for (var i in this.rules) {
        this.rules.hasOwnProperty(i) && this.rules[i].update(dt);
      }

      for (var _i3 in this.objects) {
        this.objects[_i3].update(dt);
      }

      for (var _i4 in this.objects) {
        this.objects[_i4].updateCollisions(dt);
      }

      this.state.collisions.check();

      for (var _i5 in this.objects) {
        this.objects[_i5].updateConditions(dt);
      }

      for (var _i6 in this.objects) {
        if (this.objects[_i6]._removeInNextTick) {
          this.objects[_i6].collisions && this.state.collisions.removeObject(this.objects[_i6]);
          this.removeObject(this.objects[_i6].id);
        }
      }
    }
  }, {
    key: 'addRule',
    value: function addRule(config) {
      var rule = new _rule2.default(config);
      rule.setContext(this);
      rule.init();
      this.rules.push(rule);
    }
  }, {
    key: 'removeObject',
    value: function removeObject(id) {
      if (this.objects.hasOwnProperty(id)) {
        this.objects[id].layer = null;

        if (this.objects[id].type && this.objects[id].type != 'default') {
          this.sortedObjects[this.objects[id].type].splice(this.sortedObjects[this.objects[id].type].indexOf(id), 1);
        } else {
          this.sortedObjects['default'].splice(this.sortedObjects['default'].indexOf(id), 1);
        }
        this.objects[id] = null;

        delete this.objects[id];
      }
    }
  }, {
    key: 'addObject',
    value: function addObject(config) {
      if (this.objects.hasOwnProperty(config.id)) {
        console.error('Object with such id already exist in this layer: ', config.id);
        return false;
      }
      config.layer = this;
      config.id += this.objectCount++ + Math.round(new Date().getTime() + Math.random() * 1000001);

      var _obj = new _object2.default(config);
      _obj.init();

      if (config.type && config.type != 'default') {
        !this.sortedObjects[config.type] && (this.sortedObjects[config.type] = []);
        this.sortedObjects[config.type].push(_obj.id);
      } else {
        this.sortedObjects['default'].push(_obj.id);
      }

      this.objects[_obj.id] = _obj;

      return this.objects[_obj.id];
    }
  }, {
    key: 'getObjectsByType',
    value: function getObjectsByType(type) {
      var objectsId = this.sortedObjects[type] || [];
      var result = [];

      for (var i = 0, l = objectsId.length; i < l; i++) {
        result.push(this.objects[objectsId[i]]);
      }
      return result;
    }
  }, {
    key: 'clearLayer',
    value: function clearLayer() {
      this.objects = [];

      this.sortedObjects = {
        default: []
      };

      this.rules = [];

      this.inited = false;
    }
  }]);

  return GameLayer;
}();

exports.default = GameLayer;

/***/ }),
/* 14 */
/*!*************************************!*\
  !*** ./js/configs/objects/index.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spells = __webpack_require__(/*! ./spells */ 15);

var _spells2 = _interopRequireDefault(_spells);

var _logic = __webpack_require__(/*! ./logic */ 16);

var _logic2 = _interopRequireDefault(_logic);

var _units = __webpack_require__(/*! ./units */ 17);

var _units2 = _interopRequireDefault(_units);

var _effects = __webpack_require__(/*! ./effects */ 18);

var _effects2 = _interopRequireDefault(_effects);

var _terrain = __webpack_require__(/*! ./terrain */ 19);

var _terrain2 = _interopRequireDefault(_terrain);

var _ui = __webpack_require__(/*! ./ui */ 20);

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objects = {};

Object.assign(objects, _logic2.default);
Object.assign(objects, _spells2.default);
Object.assign(objects, _units2.default);
Object.assign(objects, _effects2.default);
Object.assign(objects, _ui2.default);
Object.assign(objects, _terrain2.default);

exports.default = objects;

/***/ }),
/* 15 */
/*!**************************************!*\
  !*** ./js/configs/objects/spells.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    fireballSpell: {
        zIndex: 5000,
        sprite: ['spellIcons', [0, 0], [32, 32]],
        pos: [449, 748],

        size: [32, 32],
        render: 'spell',
        parameters: {
            bulletsFired: 0,
            cooldown: 20
        },
        type: 'spell',
        rules: ['fireball']
    },
    hellfireSpell: {
        zIndex: 5000,
        sprite: ['spellIcons', [96, 0], [32, 32]],
        pos: [491, 748],

        size: [32, 32],
        render: 'spell',
        parameters: {
            bulletsFired: 0,
            cooldown: 800
        },
        type: 'spell',
        rules: ['hellfire']
    },
    frostShardSpell: {
        zIndex: 5000,
        sprite: ['spellIcons', [224, 96], [32, 32]],
        pos: [533, 748],
        size: [32, 32],
        render: 'spell',
        parameters: {
            shardsFired: 0,
            cooldown: 500
        },
        type: 'spell',
        rules: ['frostShard']
    },
    teleportSpell: {
        zIndex: 5000,
        sprite: ['spellIcons', [64, 32], [32, 32]],
        pos: [575, 748],
        size: [32, 32],
        render: 'spell',
        parameters: {
            power: 200,
            teleportGates: 0,
            cooldown: 200
        },
        type: 'spell',
        rules: ['teleport']
    },
    teleportGate: {
        zIndex: 0,
        render: 'object',
        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
        pos: [466, 580],
        size: [32, 32],
        parameters: {
            cooldown: 200
        },
        type: 'spellElement',
        rules: ['removeOnCooldown', 'dynamicZIndex']
    },

    bullet: {
        zIndex: 3,
        collisions: true,
        render: 'object',
        sprite: ['fireball', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
        size: [25, 25],
        type: 'spellElement',
        parameters: {
            power: 10,
            cooldown: 100,
            speed: 300
        },
        conditions: ['bulletMonsterCollision'],
        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex', 'explosionOnCooldown']
    },
    hellfireTube: {
        zIndex: 3,
        collisions: true,
        render: 'object',
        sprite: ['hellfire', [0, 0], [21, 58], 14, [0, 1, 2, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4], null, true],
        size: [50, 50],
        type: 'spellElement',
        parameters: {
            power: 10,
            cooldown: 25,
            speed: 300
        },
        conditions: ['hellTubeMonsterCollision'],
        rules: ['dynamicZIndex', 'explosionAfterSpriteDone']
    },
    frostShard: {
        zIndex: 3,
        render: 'object',
        collisions: true,
        sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
        type: 'spellElement',
        size: [500, 500],
        parameters: {
            power: 60,
            cooldown: 200
        },
        conditions: ['slowEnemies'],
        rules: ['removeOnCooldown', 'dynamicZIndex']
    }
};

exports.default = config;

/***/ }),
/* 16 */
/*!*************************************!*\
  !*** ./js/configs/objects/logic.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    monsterController: {
        render: false,
        collisions: false,
        type: 'monsterController',
        rules: ['monsterController'],
        parameters: {
            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
            monsterCooldown: 7
        }
    }
};

exports.default = config;

/***/ }),
/* 17 */
/*!*************************************!*\
  !*** ./js/configs/objects/units.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    player: {
        zIndex: 20,
        sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
        pos: [662, 534],
        size: [25, 32],
        render: 'unit',
        collisions: true,
        parameters: {
            speed: 150,
            health: 50,
            spellPower: 1,
            level: 1,
            exp: 0,
            effects: [],
            currentSpell: 'fireball',
            direction: {},
            levelTable: {
                1: 600,
                2: 1200,
                3: 2000,
                4: 3000,
                5: 4500,
                6: 6500,
                7: 9000,
                8: 13000,
                9: 20000
            }
        },
        type: 'player',
        conditions: ['selectSpellWithKeyboard'],
        rules: ['moveWithKeyboard', 'rotateToMouse', 'bindPositionToLayer', 'playerDeath', 'moveToDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'playerLevelUp']
    },
    summonGate: {
        zIndex: 0,
        render: 'object',
        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
        pos: [466, 580],
        size: [25, 30],
        collisions: true,
        parameters: {
            cooldown: 80,
            exp: 3,
            chanceOfBoss: 5,
            chanceOfBoss2: 8,
            chanceOfBoomer: 20,
            health: 10
        },
        conditions: ['monsterHealthStatus'],
        type: 'monster',
        rules: ['summonOnCooldown', 'dynamicZIndex']
    },
    monster: {
        zIndex: 1,
        sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
        size: [20, 28],
        collisions: true,
        render: 'unit',
        parameters: {
            speed: 25,
            cooldown: 70,
            scentSpeed: 120,
            scentRange: 600,
            exp: 15,
            wanderCooldown: 500,
            effects: [],
            health: 20,
            power: 5
        },
        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type: 'monster',
        rules: ['moveToDirection', 'wandererAI', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetEffects', 'resetMeleeCooldown']
    },
    monsterBoomer: {
        zIndex: 1,
        sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
        size: [20, 28],
        collisions: true,
        render: 'unit',
        parameters: {
            speed: 100,
            exp: 30,
            effects: [],
            health: 10,
            power: 10
        },
        conditions: ['monsterHealthStatus', 'monsterExplosionCondition'],
        type: 'monster',
        rules: ['moveToDirection', 'rotateByPlayer', 'setDirectionToPlayerAdvance', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monsterBoss: {
        zIndex: 1,
        collisions: true,
        sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
        size: [25, 40],
        render: 'unit',
        parameters: {
            speed: 50,
            exp: 60,
            cooldown: 75,
            power: 10,
            health: 50,
            effects: []
        },
        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type: 'monster',
        rules: ['setDirectionToPlayer', 'monsterBossLogic', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
    },
    monsterBoss2: {
        zIndex: 1,
        collisions: true,
        sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
        size: [40, 45],
        render: 'unit',
        parameters: {
            speed: 15,
            cooldown: 200,
            exp: 120,
            fireRange: 300,
            power: 10,
            health: 30,
            effects: []
        },
        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type: 'monster',
        rules: ['setDirectionToPlayer', 'monsterBoss2Logic', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
    },
    heart: {
        zIndex: 3,
        render: 'object',
        collisions: true,
        size: [25, 25],
        sprite: ['pumpkin', [0, 0], [32, 32], 5, [0, 1]],
        conditions: ['triggerOnPlayerCollision'],
        rules: ['dynamicZIndex'],
        parameters: {
            power: 10
        }
    },
    powerup: {
        zIndex: 2,
        size: [25, 25],
        collisions: true,
        sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
        conditions: ['triggerOnPlayerCollisionPowerUp'],
        parameters: {
            exp: 250
        }
    }
};

exports.default = config;

/***/ }),
/* 18 */
/*!***************************************!*\
  !*** ./js/configs/objects/effects.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    mbullet: {
        zIndex: 3,
        collisions: true,
        sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
        type: 'monsterSpellElement',
        render: 'object',
        size: [32, 32],
        conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
        parameters: {
            power: 8,
            speed: 100
        },
        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
    },
    mbullet2: {
        zIndex: 3,
        collisions: true,
        sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
        type: 'monsterSpellElement',
        render: 'object',
        size: [28, 24],
        conditions: ['monsterBoss2Bullet'],
        parameters: {
            power: 15,
            cooldown: 100,
            speed: 200
        },
        rules: ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'rotateByDirection', 'moveToDirection', 'dynamicZIndex']
    },
    blood: {
        zIndex: 2,
        sprite: ['monsterBlood', [0, 0], [32, 13]],
        parameters: {
            cooldown: 500
        },
        rules: ['removeOnCooldown']
    },
    bloodSpray: {
        zIndex: 2,
        sprite: ['bloodEffect', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    explosion: {
        render: 'object',
        size: [39, 39],
        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    monsterExplosion: {
        render: 'object',
        collisions: true,
        type: 'spellEffect',
        conditions: ['monsterExplosion'],
        size: [39, 39],
        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    fog: {
        render: 'fog',
        zIndex: 2500,
        type: 'effect'
    }
};

exports.default = config;

/***/ }),
/* 19 */
/*!***************************************!*\
  !*** ./js/configs/objects/terrain.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    tree1: {
        sprite: ['tree1', [0, 0], [62, 87]],
        size: [62, 88],
        rules: ['dynamicZIndex']
    },
    tree2: {
        sprite: ['tree2', [0, 0], [59, 87]],
        size: [60, 88],
        rules: ['dynamicZIndex']
    },
    stones: {
        render: 'object',
        sprite: ['stone', [0, 0], [25, 22]],
        size: [15, 22],
        rules: ['dynamicZIndex']
    }
};

exports.default = config;

/***/ }),
/* 20 */
/*!**********************************!*\
  !*** ./js/configs/objects/ui.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    cursor: {
        zIndex: 3000,
        render: 'ui',
        pos: [400, 350],
        sprite: ['cursor', [0, 0], [30, 30]],
        rules: ['bindPositionToMouse']
    },
    counter: {
        zIndex: 3000,
        pos: [5, 13],
        render: "text",
        parameters: {
            weight: "bold",
            color: "#DAA520",
            template: "SCORE: {kills}",
            size: 14
        },
        rules: ['countMonsterKilled']
    },
    leftOnWaveLabel: {
        zIndex: 3000,
        pos: [5, 100],
        render: "text",
        parameters: {
            weight: "bold",
            color: "#DAA520",
            template: "LEFT ON THIS WAVE: {count}",
            size: 14
        }
    },
    level: {
        zIndex: 3000,
        pos: [35, 45],
        render: "expBar",
        parameters: {
            weight: "bold",
            color: "#EFEFEF",
            template: "LEVEL: {level}",
            size: 14
        },
        rules: ['level']
    },
    timer: {
        zIndex: 3000,
        pos: [5, 23],
        render: "text",
        parameters: {
            weight: "bold",
            color: "#DAA520",
            template: "TIMER: {time}",
            size: 14
        },
        rules: ['timer']
    },
    bestTime: {
        pos: [5, 370],
        zIndex: 3000,
        render: "text",
        parameters: {
            weight: "bold",
            color: "#DAA520",
            size: 14,
            template: "BEST TIME: {time}"
        },
        rules: ['bestTime']
    },
    bestScore: {
        pos: [5, 380],
        zIndex: 3000,
        render: "text",
        parameters: {
            weight: "bold",
            color: "#DAA520",
            size: 14,
            template: "BEST SCORE: {score}"
        },
        rules: ['bestScore']
    }
};

exports.default = config;

/***/ }),
/* 21 */
/*!***********************************!*\
  !*** ./js/configs/rules/index.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spells = __webpack_require__(/*! ./spells */ 22);

var _spells2 = _interopRequireDefault(_spells);

var _logic = __webpack_require__(/*! ./logic */ 23);

var _logic2 = _interopRequireDefault(_logic);

var _units = __webpack_require__(/*! ./units */ 24);

var _units2 = _interopRequireDefault(_units);

var _layers = __webpack_require__(/*! ./layers */ 25);

var _layers2 = _interopRequireDefault(_layers);

var _ui = __webpack_require__(/*! ./ui */ 26);

var _ui2 = _interopRequireDefault(_ui);

var _etc = __webpack_require__(/*! ./etc */ 27);

var _etc2 = _interopRequireDefault(_etc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rules = {};

Object.assign(rules, _logic2.default);
Object.assign(rules, _spells2.default);
Object.assign(rules, _units2.default);
Object.assign(rules, _layers2.default);
Object.assign(rules, _ui2.default);
Object.assign(rules, _etc2.default);

exports.default = rules;

/***/ }),
/* 22 */
/*!************************************!*\
  !*** ./js/configs/rules/spells.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(/*! ./../../engine/utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _index = __webpack_require__(/*! ../../configs/index */ 1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    fireball: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'fireball') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var createBullet = function createBullet(direction, destination) {
                            var bulletConfig = _index2.default.getConfig('bullet');
                            bulletConfig.pos = player.pos.clone();

                            var bull = obj.layer.addObject(bulletConfig);
                            bull.setParameter('direction', direction);
                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));
                            bull.sprite.setDegree(player.pos.angle(destination));
                        };

                        var destination = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                        var spellPower = player.getParameter('spellPower');
                        var startDegree = 10 * (spellPower - 1);

                        destination.x -= obj.layer.translate.x;
                        destination.y -= obj.layer.translate.y;

                        for (var i = 0; i < spellPower; i++) {
                            var movedPoint = destination.clone().rotate(player.pos.x, player.pos.y, startDegree, true);

                            createBullet(Phaser.Point.subtract(movedPoint, player.pos), movedPoint.clone());

                            startDegree -= 20;
                        }

                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }

    },
    hellfire: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'hellfire') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var createTube = function createTube(pos) {

                            var tubeConfig = _index2.default.getConfig('hellfireTube');
                            tubeConfig.pos = pos;

                            var tube = obj.layer.addObject(tubeConfig);
                            tube.setParameter('power', tube.getParameter('power') + 5 * (spellPower - 1));
                        };

                        var destination = new Phaser.Point(0, 1),
                            point1 = _utils2.default.moveWithSpeed(player.pos, destination, 100),
                            spellPower = player.getParameter('spellPower');

                        for (var i = -10; i < 10; i++) {
                            var movedPoint = point1.clone().rotate(player.pos.x, player.pos.y, 18 * i, true);

                            createTube(movedPoint);
                        }

                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }

    },
    slowEnemies: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'monster') {
                    var speed = objects[i].getParameter('speed');
                    var power = obj.getParameter('power');
                    var effects = objects[i].getParameter('effects') || [];

                    if (speed < power) {
                        objects[i].setParameter('speed', 0);
                    } else {
                        objects[i].setParameter('speed', speed - power);
                    }

                    if (effects.indexOf('frozen') == -1) {
                        effects.push('frozen');
                    }
                }
            }
        }
    },
    teleport: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'teleport') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var mouse = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

                        mouse.x -= obj.layer.translate.x;
                        mouse.y -= obj.layer.translate.y;

                        var direction = Phaser.Point.subtract(mouse, player.pos);
                        var spellPower = player.getParameter('spellPower');
                        var destination = _utils2.default.moveWithSpeed(player.pos, direction, obj.getParameter('power'));
                        var cooldown = obj.getDefaultParameter('cooldown', cooldown) - 30 * (spellPower - 1);
                        var teleportGate;

                        teleportGate = _index2.default.getConfig('teleportGate');
                        teleportGate.pos = player.pos.clone();

                        obj.layer.addObject(teleportGate);

                        teleportGate = _index2.default.getConfig('teleportGate');
                        teleportGate.pos = destination.clone();

                        obj.layer.addObject(teleportGate);

                        player.setPosition(destination);

                        obj.setParameter('cooldown', cooldown > 50 ? cooldown : 50);
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    frostShard: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'frostShard') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var frostShard = _index2.default.getConfig('frostShard');
                        var mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                        var spellPower = player.getParameter('spellPower');
                        var destination = mousePosition.clone();

                        destination.x -= obj.layer.translate.x;
                        destination.y -= obj.layer.translate.y;

                        frostShard.pos = destination.clone();

                        var spellPowerBoost = 0;

                        for (var i = 1; i < spellPower; i++) {
                            spellPowerBoost += 50;
                        }

                        var fs = obj.layer.addObject(frostShard);

                        fs.setParameter('cooldown', fs.getParameter('cooldown') + spellPowerBoost);

                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    bulletMonsterCollision: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                    var blood = _index2.default.getConfig('bloodSpray');

                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += -10;
                    obj.layer.addObject(blood);

                    obj._removeInNextTick = true;

                    break;
                }
            }
        }
    },
    hellTubeMonsterCollision: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                    var blood = _index2.default.getConfig('bloodSpray');

                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += -10;

                    obj.layer.addObject(blood);

                    break;
                }
            }
        }
    }
};

exports.default = config;

/***/ }),
/* 23 */
/*!***********************************!*\
  !*** ./js/configs/rules/logic.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringTemplate = __webpack_require__(/*! string-template */ 3);

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _index = __webpack_require__(/*! ../../configs/index */ 1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Victor = __webpack_require__(/*! victor */ 2);

var config = {
    monsterController: {
        init: function init() {
            var obj = this.context;

            obj.setParameter('currentWave', 1);
            obj.setParameter('monsterOnWave', this.parameters.monsterCount[obj.getParameter('currentWave') - 1]);
            obj.setParameter('monsterKilled', 0);
            obj.setParameter('monsterSpawned', 0);

            this.leftOnWave = this.context.layer.addObject(_index2.default.getConfig('leftOnWaveLabel'));
        },
        update: function update() {
            var obj = this.context;

            function createSpawn() {
                var topLeft = new Victor(100 - obj.layer.translate.x, 100 - obj.layer.translate.y);
                var bottomRight = new Victor(900 - obj.layer.translate.x, 650 - obj.layer.translate.y);
                var summonGate = _index2.default.getConfig('summonGate');
                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();

                summonGate.pos = new Phaser.Point(coords[0], coords[1]);
                summonGate.pos.x = Math.min(1100, Math.max(50, summonGate.pos.x));
                summonGate.pos.y = Math.min(900, Math.max(50, summonGate.pos.y));
                obj.layer.addObject(summonGate);
            }

            if (obj.getParameter('monsterSpawned') < obj.getParameter('monsterOnWave')) {
                if (!this.parameters.currentMonsterCooldown) {
                    createSpawn();

                    obj.setParameter('monsterSpawned', obj.getParameter('monsterSpawned') + 1);
                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
                } else {
                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
                }
            } else {
                if (obj.getParameter('monsterKilled') >= obj.getParameter('monsterOnWave')) {
                    obj.setParameter('currentWave', obj.getParameter('currentWave') + 1);
                    obj.setParameter('monsterSpawned', 0);
                    obj.setParameter('monsterOnWave', this.parameters.monsterCount[obj.getParameter('currentWave') - 1]);
                    obj.setParameter('monsterKilled', 0);
                }
            }

            this.leftOnWave.setParameter('text', (0, _stringTemplate2.default)(this.leftOnWave.getParameter('template'), {
                count: obj.getParameter('monsterKilled') + '/' + obj.getParameter('monsterOnWave')
            }));
        },
        parameters: {
            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
            monsterCooldown: 10
        }
    }
};

exports.default = config;

/***/ }),
/* 24 */
/*!***********************************!*\
  !*** ./js/configs/rules/units.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(/*! ./../../engine/utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _index = __webpack_require__(/*! ../../configs/index */ 1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    playerDeath: {
        update: function update() {
            var obj = this.context;

            if (obj.getParameter('health') <= 0) {
                obj.layer.state.stopBattle();
            }
        }
    },
    damageOnPlayerCollision: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
                    break;
                }
            }
        }
    },
    destroyOnPlayerCollision: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    var explosionConfig = _index2.default.getConfig('explosion');
                    explosionConfig.pos = obj.pos.clone();

                    obj.layer.addObject(explosionConfig);

                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    triggerOnPlayerCollision: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    if (objects[i].getParameter('health') < objects[i].getDefaultParameter('health')) {
                        if (objects[i].getParameter('health') + obj.getParameter('power') <= objects[i].getDefaultParameter('health')) {
                            objects[i].setParameter('health', objects[i].getParameter('health') + obj.getParameter('power'));
                        } else {
                            objects[i].setParameter('health', objects[i].getDefaultParameter('health'));
                        }
                    }

                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    meleeAttack: {
        update: function update() {
            var obj = this.context;

            if (!obj.getParameter('meleeCooldown')) {
                var objects = obj.getParameter('collisions');
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].type == 'player') {
                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                        var blood = _index2.default.getConfig('bloodSpray');
                        blood.pos = objects[i].pos.clone();
                        blood.pos.x += 2;
                        blood.pos.y += -10;
                        obj.layer.addObject(blood);

                        obj.setParameter('meleeCooldown', obj.getParameter('cooldown'));
                        break;
                    }
                }
            }
        }
    },
    monsterExplosion: {
        update: function update() {
            var obj = this.context;

            if (!obj.getParameter('exploded')) {
                var objects = obj.getParameter('collisions');
                for (var i = 0, l = objects.length; i < l; i++) {
                    if (objects[i].getParameter('health')) {
                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
                        break;
                    }
                }

                obj.setParameter('exploded', true);
            }
        }
    },
    monsterExplosionCondition: {
        update: function update() {
            var obj = this.context;

            function generateExplosions() {
                var pos = obj.pos.clone(),
                    explosionConfig,
                    power = obj.getParameter('power'),
                    expl;

                obj._removeInNextTick = true;

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x - obj.size[0], pos.y - obj.size[1]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x + obj.size[0], pos.y - obj.size[1]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x - obj.size[0], pos.y + obj.size[1]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x + obj.size[0], pos.y + obj.size[1]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x - 3 / 2 * obj.size[0], pos.y);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x + 3 / 2 * obj.size[0], pos.y);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);
            }

            if (obj.getParameter('health') <= 0) {
                generateExplosions();
            } else {
                var objects = obj.getParameter('collisions');
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].type == 'player') {
                        generateExplosions();

                        break;
                    }
                }
            }
        }
    },
    stopOnCollisionWithPlayer: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'player') {
                    obj.setParameter('speed', 0);
                    break;
                }
            }
        }
    },
    resetSpeed: {
        update: function update() {
            var obj = this.context;

            obj.setParameter('speed', obj.getDefaultParameter('speed'));
        }
    },
    resetEffects: {
        update: function update() {
            var obj = this.context;

            obj.getParameter('effects').splice(0);
        }
    },
    moveToDirection: {
        update: function update(dt) {
            var obj = this.context;
            var direction = obj.getParameter('direction');

            if (direction) {
                obj.setPosition(_utils2.default.moveWithSpeed(obj.pos, direction, obj.getParameter('speed') * dt));
            }
        }
    },
    playerLevelUp: {
        update: function update() {
            var obj = this.context;
            var levelExp = obj.getParameter('levelTable')[obj.getParameter('level')];

            if (obj.getParameter('levelTable')[obj.getParameter('level')]) {
                if (obj.getParameter('exp') > obj.getParameter('levelTable')[obj.getParameter('level')]) {
                    obj.setParameter('exp', obj.getParameter('exp') - levelExp);
                    obj.setParameter('level', obj.getParameter('level') + 1);
                    obj.setParameter('spellPower', obj.getParameter('spellPower') + 1);
                }
            } else {
                obj.setParameter('level', 'MAX');
            }
        }
    },
    monsterHealthStatus: {
        update: function update() {
            var obj = this.context;

            if (obj.getParameter('health') <= 0) {
                obj._removeInNextTick = true;

                var explosionConfig = _index2.default.getConfig('explosion');
                explosionConfig.pos = obj.pos.clone();

                obj.layer.addObject(explosionConfig);

                var blood = _index2.default.getConfig('blood');
                blood.pos = obj.pos.clone();
                obj.layer.addObject(blood);

                if (!obj.layer.state.parameters.monstersKilled) {
                    obj.layer.state.parameters.monstersKilled = 0;
                }

                var monsterController = obj.layer.getObjectsByType('monsterController')[0];
                monsterController.setParameter('monsterKilled', monsterController.getParameter('monsterKilled') + 1);

                obj.layer.state.parameters.monstersKilled++;

                var player = obj.layer.getObjectsByType('player')[0];
                player.setParameter('exp', player.getParameter('exp') + obj.getParameter('exp'));
            }
        }
    },
    resetRangeCooldown: {
        update: function update() {
            var obj = this.context;
            var fireCooldown = obj.getParameter('fireCooldown');

            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    resetMeleeCooldown: {
        update: function update() {
            var obj = this.context;
            var meleeCooldown = obj.getParameter('meleeCooldown');

            meleeCooldown && obj.setParameter('meleeCooldown', meleeCooldown - 1);
        }
    },
    monsterBossLogic: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];

            if (!obj.getParameter('fireCooldown')) {
                var bulletConfig = _index2.default.getConfig('mbullet');
                var direction = Phaser.Point.subtract(player.pos, obj.pos);

                bulletConfig.pos = obj.pos.clone();
                var bull = obj.layer.addObject(bulletConfig);
                bull.setParameter('direction', direction);

                bull.sprite.setDegree(obj.pos.angle(player.pos));

                obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
            }
        }
    },
    monsterBoss2Logic: {
        update: function update(dt) {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var directionToPlayer = obj.getParameter('direction');

            if (Phaser.Point.distance(obj.pos, player.pos) < obj.getParameter('fireRange')) {
                if (!obj.getParameter('fireCooldown')) {
                    var bulletConfig = _index2.default.getConfig('mbullet2');
                    bulletConfig.pos = obj.pos.clone();

                    var bull = obj.layer.addObject(bulletConfig);

                    bull.setParameter('direction', directionToPlayer);

                    obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                }
            } else {
                obj.setPosition(_utils2.default.moveWithSpeed(obj.pos, directionToPlayer, obj.getParameter('speed') * dt));
            }
        }
    },
    monsterBoss2Bullet: {
        update: function update() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');
            var objects = obj.getParameter('collisions');

            if (cooldown == 0) {
                obj._removeInNextTick = true;

                createExplosion();
                return;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    obj._removeInNextTick = true;

                    createExplosion();
                    break;
                }
            }

            function createExplosion() {
                var pos = obj.pos.clone();
                var explosionConfig;
                var power = obj.getParameter('power');
                var expl;

                explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(pos.x, pos.y);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);
            }
        }
    },
    moveWithKeyboard: {
        update: function update() {
            var obj = this.context;
            var pos = obj.pos.clone();
            var direction = {};

            direction.left = obj.layer.game.input.keyboard.isDown(65);
            direction.up = obj.layer.game.input.keyboard.isDown(87);
            direction.down = obj.layer.game.input.keyboard.isDown(83);
            direction.right = obj.layer.game.input.keyboard.isDown(68);

            if (direction.right) {
                pos.x = obj.pos.x + 1;
            }
            if (direction.left) {
                pos.x = obj.pos.x - 1;
            }
            if (direction.down) {
                pos.y = obj.pos.y + 1;
            }
            if (direction.up) {
                pos.y = obj.pos.y - 1;
            }

            if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
                obj.setParameter('direction', null);
            } else {
                obj.setParameter('direction', Phaser.Point.subtract(pos, obj.pos));
            }
        }
    },
    selectSpellWithKeyboard: {
        update: function update() {
            var obj = this.context;

            obj.layer.game.input.keyboard.isDown(49) && obj.setParameter('currentSpell', 'fireball');
            obj.layer.game.input.keyboard.isDown(50) && obj.setParameter('currentSpell', 'hellfire');
            obj.layer.game.input.keyboard.isDown(51) && obj.setParameter('currentSpell', 'frostShard');
            obj.layer.game.input.keyboard.isDown(52) && obj.setParameter('currentSpell', 'teleport');
        }
    },
    triggerOnPlayerCollisionPowerUp: {
        update: function update() {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    //objects[i].setParameter('spellPower', objects[i].getParameter('spellPower') + obj.getParameter('power'));
                    objects[i].setParameter('exp', objects[i].getParameter('exp') + obj.getParameter('exp'));
                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    summonOnCooldown: {
        update: function update() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');

            function getProperMonster() {
                var random = Math.random() * 100;
                var config;

                if (random <= obj.getParameter('chanceOfBoss')) {
                    config = _index2.default.getConfig('monsterBoss');
                } else {
                    random -= obj.getParameter('chanceOfBoss');
                }

                if (!config && random <= obj.getParameter('chanceOfBoss2')) {
                    config = _index2.default.getConfig('monsterBoss2');
                } else {
                    random -= obj.getParameter('chanceOfBoss2');
                }

                if (!config && random <= obj.getParameter('chanceOfBoomer')) {
                    config = _index2.default.getConfig('monsterBoomer');
                } else {
                    random -= obj.getParameter('monsterBoomer');
                }

                if (!config) {
                    config = _index2.default.getConfig('monster');
                }

                return config;
            }
            if (cooldown == 0) {
                var monsterConfig = getProperMonster();
                var player = obj.layer.getObjectsByType('player')[0];

                monsterConfig.pos = obj.pos.clone();

                var monster = obj.layer.addObject(monsterConfig);

                if (player.getParameter('level') > 1) {
                    monster.setParameter('health', monster.getParameter('health') * 0.75 * player.getParameter('level'));
                }

                obj._removeInNextTick = true;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    }
};

exports.default = config;

/***/ }),
/* 25 */
/*!************************************!*\
  !*** ./js/configs/rules/layers.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(/*! ../../configs/index */ 1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Victor = __webpack_require__(/*! victor */ 2);


var config = {
    random_trees: {
        init: function init() {
            var obj = this.context;

            function getRandomPointInArea() {
                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
            }

            for (var i = 0; i < this.parameters.trees; i++) {
                var _config = _index2.default.getConfig('tree' + (Math.round(Math.random()) + 1));

                var point = getRandomPointInArea(this.parameters.area);
                _config.pos = new Phaser.Point(point[0], point[1]);

                this.context.addObject(_config);
            }

            for (var _i = 0; _i < this.parameters.stones; _i++) {
                var _config2 = _index2.default.getConfig('stones');
                var _point = getRandomPointInArea(this.parameters.area);
                _config2.pos = new Phaser.Point(_point[0], _point[1]);

                /*var stone = */this.context.addObject(_config2);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }
        },
        parameters: {
            trees: 100,
            stones: 100
        }
    },
    spawn_heart: {
        update: function update() {
            if (!this.parameters.currentCooldown) {
                var config = _index2.default.getConfig('heart');

                var topLeft = new Victor(50, 50);
                var bottomRight = new Victor(1154, 918);
                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();
                config.pos = new Phaser.Point(coords[0], coords[1]);

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;
            } else {
                this.parameters.currentCooldown--;
            }
        },
        parameters: {
            area: [[50, 50], [1154, 918]],
            cooldown: 400
        }
    },
    spawn_powerup: {
        update: function update() {
            if (!this.parameters.currentCooldown) {
                var config = _index2.default.getConfig('powerup');

                var topLeft = new Victor(100, 100);
                var bottomRight = new Victor(1100, 850);
                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();
                config.pos = new Phaser.Point(coords[0], coords[1]);

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;
            } else {
                this.parameters.currentCooldown--;
            }
        },
        parameters: {
            area: [[100, 100], [1100, 850]],
            currentCooldown: 1100,
            cooldown: 1100
        }
    },
    spawn_terrain: {
        init: function init() {
            var gateConfig = _index2.default.getConfig('gate'),
                wallConfig;

            for (var i = 0; i < 7; i++) {
                wallConfig = _index2.default.getConfig('wall');
                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1] / 2];
                var wall = this.context.addObject(wallConfig);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }
            gateConfig.pos = [wallConfig.pos.x + wallConfig.size[0] / 2 + gateConfig.size[0] / 2, (gateConfig.size[1] - 3) / 2];
            var gate = this.context.addObject(gateConfig);
        }
    },
    goWithPlayer: {
        update: function update(dt) {
            var obj = this.context;
            var player = obj.getObjectsByType('player')[0];
            var px = (player.pos.x + obj.translate.x) / 1024 * 100;
            var py = (player.pos.y + obj.translate.y) / 768 * 100;

            if (px < 30) {
                if (obj.translate.x < 0) {
                    obj.translate.x += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (px > 70) {
                if (obj.translate.x > -300) {
                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
                }
            }

            if (py < 25) {
                if (obj.translate.y < 0) {
                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (py > 75) {
                if (obj.translate.y > -300) {
                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
                }
            }
        }
    }
};

exports.default = config;

/***/ }),
/* 26 */
/*!********************************!*\
  !*** ./js/configs/rules/ui.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(/*! ./../../engine/utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _stringTemplate = __webpack_require__(/*! string-template */ 3);

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    countMonsterKilled: {
        update: function update() {
            var obj = this.context;
            var template = obj.getParameter('template');

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                kills: obj.layer.state.parameters.monstersKilled || 0
            }));
        }
    },
    timer: {
        update: function update() {
            var obj = this.context;
            var template = obj.getParameter('template');

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2)
            }));
        }
    },
    health: {
        update: function update() {
            var obj = this.context;
            var template = obj.getParameter('template');

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                health: obj.layer.getObjectsByType('player')[0].parameters.health
            }));
        }
    },
    level: {
        update: function update() {
            var obj = this.context;
            var template = obj.getParameter('template');
            var player = obj.layer.getObjectsByType('player')[0];

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                level: player.getParameter('level'),
                exp: player.getParameter('exp'),
                levelExp: player.getParameter('levelTable')[player.getParameter('level')]
            }));
        }
    },
    bestTime: {
        init: function init() {
            var obj = this.context;
            var template = obj.getParameter('template');

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                time: (obj.layer.state.parameters.bestTime / 60).toFixed(2)
            }));
        }
    },
    bestScore: {
        init: function init() {
            var obj = this.context;
            var template = obj.getParameter('template');

            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
                score: obj.layer.state.parameters.bestScore
            }));
        }
    }
};

exports.default = config;

/***/ }),
/* 27 */
/*!*********************************!*\
  !*** ./js/configs/rules/etc.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(/*! ./../../engine/utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _index = __webpack_require__(/*! ../../configs/index */ 1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Victor = __webpack_require__(/*! victor */ 2);

var config = {
    bindPositionToLayer: {
        update: function update() {
            var obj = this.context;

            if (obj.pos.x - obj.sprite.size[0] / 2 < obj.layer.pos.x) {
                obj.pos.x = obj.sprite.size[0] / 2;
            } else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.pos.x + obj.layer.size[0]) {
                obj.pos.x = obj.layer.pos.x + obj.layer.size[0] - obj.sprite.size[0] / 2;
            }

            if (obj.pos.y - obj.sprite.size[1] / 2 < obj.layer.pos.y) {
                obj.pos.y = obj.sprite.size[1] / 2;
            } else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.pos.y + obj.layer.size[1]) {
                obj.pos.y = obj.layer.pos.y + obj.layer.size[1] - obj.sprite.size[1] / 2;
            }
        }
    },
    destroyAfterLeavingLayer: {
        update: function update() {
            var obj = this.context;

            if (obj.pos.y < -100 || obj.pos.y - obj.sprite.size[1] - 100 > obj.layer.pos.y + obj.layer.size[1] || obj.pos.x - obj.sprite.size[0] - 100 > obj.layer.pos.x + obj.layer.size[0] || obj.pos.x < -100) {
                obj._removeInNextTick = true;
                return false;
            }
        }
    },
    setDirectionToPlayer: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];

            obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
        }
    },
    setDirectionToPlayerAdvance: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var playerDirection = player.getParameter('direction');
            var oldDirection = obj.getParameter('direction');

            if (!oldDirection) {
                oldDirection = Phaser.Point.subtract(player.pos, obj.pos);
            }

            if (playerDirection == null) {
                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
            } else {
                var speed = Math.abs(Math.min(player.getParameter('speed'), Phaser.Point.distance(obj.pos, player.pos)) - 10);
                var playerNextPlace = _utils2.default.moveWithSpeed(player.pos, playerDirection, speed);
                var _dv = Phaser.Point.subtract(playerNextPlace, obj.pos).normalize();
                var _odv = oldDirection.clone().normalize();
                var _ndv = Phaser.Point.add(_odv, _dv).normalize();

                obj.setParameter('direction', _ndv);
            }
        }
    },
    wandererAI: {
        init: function init() {
            var topLeft = new Victor(100, 100);
            var bottomRight = new Victor(1100, 850);
            var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();

            this.context.setParameter('direction', new Phaser.Point(coords[0], coords[1]));
        },
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var distance = Phaser.Point.distance(obj.pos, player.pos);

            if (distance <= obj.getParameter('scentRange')) {
                obj.setParameter('scent', true);
                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
                obj.setParameter('wanderCooldown', 0);
                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
            } else {
                obj.setParameter('speed', obj.getDefaultParameter('speed'));
                if (!obj.getParameter('wanderCooldown')) {
                    var topLeft = new Victor(100, 100);
                    var bottomRight = new Victor(1100, 850);
                    var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();

                    obj.setParameter('direction', Phaser.Point.subtract(new Phaser.Point(coords[0], coords[1]), obj.pos));
                    obj.setParameter('wanderCooldown', Math.round(Math.random() * (obj.getDefaultParameter('wanderCooldown') - 100) + 100));
                } else {
                    obj.getParameter('wanderCooldown') && obj.setParameter('wanderCooldown', obj.getParameter('wanderCooldown') - 1);
                }
            }
        }
    },
    dynamicZIndex: {
        update: function update() {
            var obj = this.context;
            var newZIndex = 0;

            obj.pos && (newZIndex += obj.pos.y);
            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

            obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
        }
    },
    collisions: {
        init: function init() {
            var obj = this.context;
            var collisions = obj.setParameter('collisions', []);

            collisions.cells = new Array();
            obj.layer.state.collisions.updateObject(obj);
        },
        update: function update() {
            var obj = this.context;

            obj.getParameter('collisions').splice(0);
            obj.layer.state.collisions.updateObject(obj);
        }
    },
    rotateToMouse: {
        update: function update() {
            var obj = this.context;
            var destination = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            var directionToMouse = Phaser.Point.subtract(destination, obj.pos);
            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    bindPositionToMouse: {
        update: function update() {
            var obj = this.context;
            var mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

            obj.setPosition(mousePosition.clone());
        }
    },
    removeOnCooldown: {
        update: function update() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    },
    explosionOnCooldown: {
        update: function update() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;

                var explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
                var expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', obj.getParameter('power'));
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    },
    explosionAfterSpriteDone: {
        update: function update() {
            var obj = this.context;

            if (obj.sprite.done) {
                obj._removeInNextTick = true;

                var explosionConfig = _index2.default.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
                var expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', obj.getParameter('power'));
            }
        }
    },
    destroyAfterSpriteDone: {
        update: function update() {
            var obj = this.context;

            if (obj.sprite.done) {
                obj._removeInNextTick = true;
            }
        }
    },
    rotateByDirection: {
        update: function update() {
            var obj = this.context;

            obj.sprite.rotateToDirection(obj.getParameter('direction'));
        }
    },
    rotateByPlayer: {
        update: function update() {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];

            obj.sprite.rotateToDirection(Phaser.Point.subtract(player.pos, obj.pos));
        }
    }
};

exports.default = config;

/***/ }),
/* 28 */
/*!**********************************!*\
  !*** ./js/engine/core/object.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

var _renderers = __webpack_require__(/*! ../renderers */ 29);

var _renderers2 = _interopRequireDefault(_renderers);

var _sprite = __webpack_require__(/*! ../sprite */ 30);

var _sprite2 = _interopRequireDefault(_sprite);

var _configs = __webpack_require__(/*! ../../configs */ 1);

var _configs2 = _interopRequireDefault(_configs);

var _rule = __webpack_require__(/*! ./rule */ 4);

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
  function GameObject(config) {
    _classCallCheck(this, GameObject);

    this.layer = config.layer;
    if (config.pos instanceof Phaser.Point) {
      this.pos = config.pos.clone();
    } else {
      if (config.pos) {
        this.pos = new Phaser.Point(config.pos[0], config.pos[1]);
      } else {
        this.pos = new Phaser.Point();
      }
    }
    this.id = config.id;

    if (config.sprite) {
      this.sprite = new _sprite2.default(this.layer.game.cache, config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
    }

    this.type = config.type;

    if (config.size || this.sprite) {
      this.size = config.size || this.sprite.size;
    }

    this.collisions = config.collisions;
    this.callbacks = config.callbacks || {};
    this.zIndex = config.zIndex || 0;
    var _parameters = config.parameters || {};
    var parameters = config.parameters && _utils2.default.clone(config.parameters) || {};

    this.size = config.size;

    this.getParameter = function (id) {
      return parameters[id];
    };
    this.setParameter = function (id, value) {
      parameters[id] = value;
      return parameters[id];
    };
    this.getDefaultParameter = function (id) {
      return _parameters[id];
    };

    this.rules = config.rules || [];
    this.conditions = config.conditions || [];
    this._update = config.update;

    if (config.render) {
      if (_renderers2.default[config.render]) {
        this.customRender = _renderers2.default[config.render];
      } else {
        this.customRender = config.render;
      }
    } else {
      if (config.render === false) {
        this.noRender = true;
      }
    }

    this._init = config.init;

    this.inited = false;
  }

  _createClass(GameObject, [{
    key: 'render',
    value: function render(dt) {
      var _this = this;

      if (!this.noRender) {
        if (this.customRender) {
          if (Array.isArray(this.customRender)) {
            this.customRender.forEach(function (renderer) {
              return renderer(_this, dt);
            });
          } else {
            this.customRender(this, dt);
          }
        } else {
          _renderers2.default.sprite(this, dt);
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      if (!this.inited) {
        var rules = this.rules;
        var conditions = this.conditions;

        this.rules = [];
        this.conditions = [];

        this._init && this._init();

        if (this.collisions) {
          this.collisions = new _rule2.default(_configs2.default.getRuleConfig('collisions'));
          this.collisions.setContext(this);
          this.collisions.init();
        }

        for (var i = 0, l = rules.length; i < l; i++) {
          this.addRule(_configs2.default.getRuleConfig(rules[i]));
        }

        for (var _i = 0, _l = conditions.length; _i < _l; _i++) {
          this.addCondition(_configs2.default.getRuleConfig(conditions[_i]));
        }

        this.inited = true;
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this._update && this._update();
      this.rules.forEach(function (rule) {
        return rule.update(dt);
      });
    }
  }, {
    key: 'updateConditions',
    value: function updateConditions(dt) {
      this.conditions.forEach(function (condition) {
        return condition.update(dt);
      });
    }
  }, {
    key: 'setPosition',
    value: function setPosition(point) {
      this.pos.x = point.x;
      this.pos.y = point.y;
    }
  }, {
    key: 'addRule',
    value: function addRule(config) {
      var rule = new _rule2.default(config);
      rule.setContext(this);
      rule.init();

      this.rules.push(rule);
    }
  }, {
    key: 'addCondition',
    value: function addCondition(config) {
      var condition = new _rule2.default(config);
      condition.setContext(this);
      condition.init();

      this.conditions.push(condition);
    }
  }, {
    key: 'updateCollisions',
    value: function updateCollisions(dt) {
      this.collisions && this.collisions.update(dt, this);
    }
  }]);

  return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 29 */
/*!********************************!*\
  !*** ./js/engine/renderers.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function fog(obj) {
    var ctx = obj.layer.ctx;
    var x = obj.layer.getObjectsByType('player')[0].pos.x;
    var y = obj.layer.getObjectsByType('player')[0].pos.y;
    var grad = obj.layer.ctx.createRadialGradient(x, y, 0, x, y, 700);

    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.97)');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(x, y, 2000, 0, Math.PI * 2, false);
    ctx.closePath();

    ctx.fill();
}

function healthBar(obj) {
    var ctx = obj.layer.ctx;
    var x = Math.round(-obj.sprite.size[0] / 2);
    var y = Math.round(-obj.sprite.size[1] / 2 - 7);
    var width = obj.sprite.size[0];
    var height = 3;

    ctx.globalAlpha = 0.5;

    if (obj.getParameter('health') > 0 && obj.getDefaultParameter('health') > obj.getParameter('health')) {
        ctx.fillStyle = "rgb(250, 0, 0)";
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x, y, Math.round(width * (obj.getParameter('health') / obj.getDefaultParameter('health'))), height);
    }

    ctx.globalAlpha = 1;
}

function expBar(obj) {
    var x = -22;
    var y = 17;
    var width = 200;
    var height = 40;
    var ctx = obj.layer.ctx;
    var player = obj.layer.getObjectsByType('player')[0];

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(220, 220, 220)";
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#DAA520";
    if (player.getParameter('levelTable')[player.getParameter('level')]) {
        ctx.fillRect(x, y, Math.min(width, Math.round(width * (player.getParameter('exp') / player.getParameter('levelTable')[player.getParameter('level')]))), height);
    } else {
        ctx.fillRect(x, y, width, height);
    }

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);

    textRender(obj);
}

function sprite(obj, dt) {
    var ctx = obj.layer.ctx;

    ctx.globalAlpha = 1;
    obj.sprite.update(dt);
    obj.sprite.render(ctx);
}

function ellipse(context, cx, cy, rx, ry, rot, aStart, aEnd) {
    context.save();

    context.translate(cx, cy);
    context.rotate(rot);
    context.translate(-rx, -ry);

    context.scale(rx, ry);
    context.arc(1, 1, 1, aStart, aEnd, false);

    context.restore();
}

function shadow(obj) {
    if (obj.size) {
        var ctx = obj.layer.ctx;

        ctx.globalAlpha = 0.5;

        ctx.beginPath();
        ellipse(ctx, 0, +obj.sprite.size[1] / 2 - 3, Math.min(obj.sprite.size[0], obj.size[0]) / 2 + 8, 5, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();

        ctx.globalAlpha = 1;
    }
}

function effects(obj) {
    var ctx = obj.layer.ctx,
        effects = obj.getParameter('effects');

    for (var i = 0; i < effects.length; i++) {
        var effect = effects[i];
        if (effect == 'frozen') {
            ctx.globalAlpha = 0.8;
            ctx.drawImage(obj.layer.game.cache.getImage('frostEffect'), -16, +(obj.sprite.size[1] / 2) - 32, 32, 32);
            ctx.globalAlpha = 1;
        }
    }
}

function objectRenderer(obj, dt) {
    shadow(obj);
    sprite(obj, dt);
}

function unitRenderer(obj, dt) {
    shadow(obj);
    healthBar(obj);
    sprite(obj, dt);
    effects(obj);
}

function spellRenderer(obj, dt) {
    var ctx = obj.layer.ctx,
        x = Math.round(-obj.sprite.size[0] / 2 - 4),
        y = Math.round(-obj.sprite.size[1] / 2 - 4),
        width = obj.sprite.size[0] + 8,
        height = obj.sprite.size[1] + 8;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    if (obj.id.indexOf(obj.layer.getObjectsByType('player')[0].getParameter('currentSpell')) != -1) {
        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    }

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "rgb(0, 0, 0)";

    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 1;

    sprite(obj, dt);

    if (obj.getParameter('fireCooldown') > 0) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "rgb(20, 20, 20)";
        ctx.fillRect(x, Math.round(y + height - height * (obj.getParameter('fireCooldown') / obj.getParameter('cooldown'))), width, height);
        ctx.globalAlpha = 1;
    }

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}

function ui(obj, dt) {
    var ctx = obj.layer.ctx;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    sprite(obj, dt);
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}

function textRender(obj) {
    var ctx = obj.layer.ctx,
        fontConfig = '';

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    obj.getParameter('style') && (fontConfig += obj.getParameter('style') + " ");
    obj.getParameter('weight') && (fontConfig += obj.getParameter('weight') + " ");

    fontConfig += (obj.getParameter('size') || 30) + 'pt ';
    fontConfig += obj.getParameter('font') || "Arial";

    if (obj.getParameter('align')) {
        ctx.textAlign = obj.getParameter('align');
    }

    ctx.font = fontConfig;
    ctx.fillStyle = obj.getParameter('color') || "#FFF";
    ctx.fillText(obj.getParameter('text'), obj.pos.x, obj.pos.y);

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}

var renders = {
    shadow: shadow,
    fog: fog,
    expBar: expBar,
    healthBar: healthBar,
    sprite: sprite,
    effects: effects,
    ui: ui,
    object: objectRenderer,
    text: textRender,
    spell: spellRenderer,
    unit: unitRenderer
};

exports.default = renders;

/***/ }),
/* 30 */
/*!*****************************!*\
  !*** ./js/engine/sprite.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(/*! ./utils */ 0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Sprite(cache, url, pos, size, speed, frames, dir, once, degree) {
    this.cache = cache;
    if (pos instanceof Phaser.Point) {
        this.pos = pos.clone();
    } else {
        this.pos = new Phaser.Point(pos[0], pos[1]);
    }
    this.defaultPosition = this.pos.clone();
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = _utils2.default.clone(frames);
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.degree = degree || 0;
}

Sprite.prototype.update = function (dt) {
    this._index += this.speed * dt;
};

Sprite.prototype.updateConfig = function (config) {
    if (config) {
        config.pos && (this.pos = config.pos);
        config.size && (this.size = config.size);
        config.speed && (this.speed = typeof config.speed === 'number' ? config.speed : 0);
        config.frames && (this.frames = config.frames);
        config.url && (this.url = config.url);
        config.dir && (this.dir = config.dir);
        config.once && (this.once = config.once);
        config.degree && (this.degree = config.degree);
    }
};

Sprite.prototype.rotateToDirection = function (direction) {
    var pos = this.defaultPosition;
    var config = {};
    var angle = direction.angle(new Phaser.Point(0, 0), true);

    if (angle > 135 || angle < -135) {
        config.pos = [pos.x, pos.y + 2 * this.size[1]];
    } else if (angle < 135 && angle > 45) {
        config.pos = [pos.x, pos.y + 3 * this.size[1]];
    } else if (angle < 45 && angle > -45) {
        config.pos = [pos.x, pos.y + this.size[1]];
    } else {
        config.pos = [pos.x, pos.y];
    }

    config.pos = new Phaser.Point(config.pos[0], config.pos[1]);

    this.updateConfig(config);
};

Sprite.prototype.render = function (ctx) {
    var frame;
    var x = this.pos.x;
    var y = this.pos.y;

    if (this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);

        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
            this.done = true;
            return;
        }
    } else {
        frame = 0;
    }

    if (this.dir === 'vertical') {
        y += frame * this.size[1];
    } else {
        x += frame * this.size[0];
    }

    ctx.rotate(this.degree);
    ctx.drawImage(this.cache.getImage(this.url), x, y, this.size[0], this.size[1], Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2), this.size[0], this.size[1]);
};

Sprite.prototype.setDegree = function (degree) {
    this.degree = degree;
};

exports.default = Sprite;

/***/ })
/******/ ]);
});
//# sourceMappingURL=game.bundle.js.map