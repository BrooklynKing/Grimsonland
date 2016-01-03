var engine =
webpackJsonp_name_([2,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(18);

	var _resources2 = _interopRequireDefault(_resources);

	var _mouse = __webpack_require__(19);

	var _mouse2 = _interopRequireDefault(_mouse);

	var _input = __webpack_require__(20);

	var _input2 = _interopRequireDefault(_input);

	var _objects = __webpack_require__(21);

	var _objects2 = _interopRequireDefault(_objects);

	var _collisions = __webpack_require__(24);

	var _collisions2 = _interopRequireDefault(_collisions);

	var _howler = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// A cross-browser requestAnimationFrame
	// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	var requestAnimFrame = (function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();

	function loadResources(list, callback) {
	    _resources2.default.load(list);

	    //This one is mock for AJAX, if we will have real AJAX, we just need to put this one into callback without timeout
	    _resources2.default.onReady(function () {
	        callback && callback();
	    });
	}

	function createGame(config) {
	    var canvas = config.canvas,
	        lastTime = 0;

	    var mouse = (0, _mouse2.default)(canvas);
	    var _canvas = document.createElement('canvas');
	    _canvas.width = canvas.width;
	    _canvas.height = canvas.width;

	    config._canvas = _canvas;
	    config._ctx = _canvas.getContext("2d");
	    config.input = _input2.default;
	    config.mouse = mouse;
	    config.collisions = (0, _collisions2.default)({
	        n: 7,
	        width: canvas.width + 200,
	        height: canvas.height + 200
	    });
	    document.addEventListener('contextmenu', function (e) {
	        e.preventDefault();
	    });

	    var game = new _objects2.default(config);

	    var sound = new _howler.Howl({
	        urls: ['music/main.mp3', 'music/main.ogg'],
	        loop: true,
	        volume: 0.5
	    }).play();

	    function gameTimer() {
	        var now = Date.now(),
	            dt = (now - lastTime) / 1000.0;

	        game.update(dt);
	        game.render(dt);

	        lastTime = now;
	        requestAnimFrame(gameTimer);
	    }

	    function initGame() {
	        loadResources(config.resources, function () {
	            game.init();
	            requestAnimFrame(gameTimer);
	        });
	    }

	    return {
	        model: game,
	        init: initGame
	    };
	}

	exports.default = createGame;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Victor = __webpack_require__(10);

	function collides(x, y, r, b, x2, y2, r2, b2) {
	    return !(r >= x2 || x < r2 || b >= y2 || y < b2);
	}

	function Point(x, y) {
	    if (Array.isArray(x)) {
	        this.x = x[0];
	        this.y = x[1];
	    } else {
	        this.x = x;
	        this.y = y;
	    }
	}

	Point.prototype.clone = function () {
	    return new Point(this.x, this.y);
	};

	function Line(point, vector) {

	    /*if (point.x == vector.x) {
	        this.k = 'vert';
	        this.b = vector.x;
	        this.dir = (vector.y >= point.y) ? 1 : -1;
	    } else {
	        this.k = (vector.y - point.y) / (vector.x - point.x);
	        this.b = point.y - point.x * this.k;
	        this.dir = (vector.x >= point.x) ? 1 : -1;
	    }*/
	    var _vector = vector;

	    if (vector instanceof Point) {
	        _vector = getVectorByTwoPoints(point, vector);
	    }
	    if (_vector.x != 0 && _vector.y != 0) {
	        this.k = _vector.x / _vector.y;
	        this.b = point.x - _vector.x * point.y / _vector.y;
	        this.dir = _vector.y >= 0 ? 1 : -1;
	    } else if (_vector.x == 0) {
	        this.k = 'vertical';
	        this.b = _vector.x;
	        this.dir = _vector.y >= 0 ? 1 : -1;
	    } else {
	        this.k = 'horizontal';
	        this.b = _vector.y;
	        this.dir = _vector.x >= 0 ? 1 : -1;
	    }
	    this.vector = _vector; //getVectorByTwoPoints(point, vector);
	}

	Line.prototype.getDestination = function (point, speed) {
	    var x, y;

	    if (this.k == 'vertical') {
	        x = point.x;
	        y = point.y + this.dir * speed;
	    } else if (this.k == 'horizontal') {
	        x = point.x + this.dir * speed;
	        y = point.y;
	    } else {
	        x = point.x + this.dir * speed * this.k / Math.sqrt(Math.pow(this.k, 2) + 1);
	        y = point.y + this.dir * speed / Math.sqrt(Math.pow(this.k, 2) + 1);
	    }
	    return new Point(x, y);
	};

	function getVectorByTwoPoints(point1, point2) {
	    return new Victor(point2.x - point1.x, point2.y - point1.y);
	}

	function boxCollides(pos, size, pos2, size2) {
	    return collides(pos.x + size[0] / 2, pos.y + size[1] / 2, pos.x - size[0] / 2, pos.y - size[1] / 2, pos2.x + size2[0] / 2, pos2.y + size2[1] / 2, pos2.x - size2[0] / 2, pos2.y - size2[1] / 2);
	}
	function getRadians(degree) {
	    return degree * Math.PI / 180;
	};
	function getDegreeBetweenDirections(dir1, dir2) {
	    if (dir2.k == 'vert') {
	        return getDegrees(Math.atan(1 / dir1.k * dir1.dir));
	    } else {
	        return getDegrees(Math.atan((dir2.k * dir2.dir - dir1.k * dir1.dir) / (1 - dir1.k * dir1.dir * dir2.k * dir2.dir)));
	    }
	}
	function getDegrees(radians) {
	    return 180 * radians / Math.PI;
	};
	function getDegree(point1, point2, prevDegree, speed) {
	    var degree = Math.acos((point2.x - point1.x) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
	    point1.y > point2.y && (degree = -degree);
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
	    var newDegree = Math.acos((point2.x - point1.x) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));

	    newDegree = newDegree * 180 / Math.PI;
	    point1.y > point2.y && (newDegree = 360 - newDegree);
	    newDegree += degree;
	    newDegree < 0 && (newDegree += 360);
	    newDegree > 360 && (newDegree -= 360);

	    var dir = newDegree > 0 && newDegree <= 90 || newDegree > 270 && newDegree <= 360 ? 1 : -1;

	    var direction = {
	        dir: dir,
	        k: Math.tan(newDegree * Math.PI / 180)
	    };

	    return getDestination(point1, direction, Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
	}
	function getDirection(point1, point2) {
	    var k, b, dir;

	    if (point1[0] == point2[0]) {
	        k = 'vert';
	        b = point2[0];
	        dir = point2[1] >= point1[1] ? 1 : -1;
	    } else {
	        k = (point2[1] - point1[1]) / (point2[0] - point1[0]);
	        b = point1[1] - point1[0] * k;
	        dir = point2[0] >= point1[0] ? 1 : -1;
	    }
	    return {
	        'k': k,
	        'b': b,
	        'dir': dir
	    };
	}
	function getDistance(point1, point2) {
	    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
	}
	function getDestination(point, line, speed) {
	    var x, y;
	    if (line.k == 'vert') {
	        x = point.x;
	        y = point.y + line.dir * speed;
	    } else {
	        x = point.x + line.dir * speed / Math.sqrt(Math.pow(line.k, 2) + 1);
	        y = point.y + line.dir * speed * line.k / Math.sqrt(Math.pow(line.k, 2) + 1);
	    }
	    return new Point(x, y);
	}
	function getSpeed(start, destination, line) {
	    if (line.k == 'vert') {
	        return (destination.y - start.y) / line.dir;
	    } else {
	        return (destination.y - start.y) * Math.sqrt(Math.pow(line.k, 2) + 1) / (line.dir * line.k);
	    }
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
	function nextPosition(point1, point2 /*, speed, dt*/) {
	    var deltax = Math.abs(point2[0] - point1[0]),
	        deltay = Math.abs(point2[1] - point1[1]),
	        error = 0,
	        deltaerr = deltax > deltay ? deltay : deltax,
	        y = point1[1],
	        x = point1[0];

	    if (deltax > deltay) {
	        point1[0] > point2[0] ? x-- : x++;
	        error = error + deltaerr;
	        if (2 * error >= deltax) {
	            y = point1[1] > point2[1] ? y - 1 : y + 1;
	        }
	    } else {
	        point1[1] > point2[1] ? y-- : y++;
	        error = error + deltaerr;
	        if (2 * error >= deltay) {
	            x = point1[0] > point2[0] ? x - 1 : x + 1;
	        }
	    }
	    return new Point(x, y);
	}
	function getPointOfInterception(direction1, direction2) {
	    var x, y;

	    if (direction2.k == 'vert') {
	        x = direction2.b;
	        y = direction1.k * direction1.dir * x + direction1.b;
	    } else {
	        x = (direction2.b - direction1.b) / (direction1.dir * direction1.k - direction2.dir * direction2.k);
	        y = direction1.k * direction1.dir * x + direction1.b;
	    }

	    return [x, y];
	}
	function clone(obj) {
	    !obj && (obj = {});
	    return JSON.parse(JSON.stringify(obj));
	}

	exports.default = {
	    Line: Line,
	    Point: Point,
	    ellipse: ellipse,
	    getRadians: getRadians,
	    'collides': collides,
	    'boxCollides': boxCollides,
	    'getDegree': getDegree,
	    'nextPosition': nextPosition,
	    getSpeed: getSpeed,
	    'getDestination': getDestination,
	    'getDirection': getDirection,
	    getDegrees: getDegrees,
	    getDistance: getDistance,
	    getPointOfInterception: getPointOfInterception, getPointOfInterception: getPointOfInterception,
	    getDegreeBetweenDirections: getDegreeBetweenDirections,
	    clone: clone,
	    'getMovedPointByDegree': getMovedPointByDegree
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

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


/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var resourceCache = {},
	    readyCallback;

	// Load an image url or an array of image urls
	function load(urlOrArr) {
	    if (urlOrArr instanceof Array) {
	        urlOrArr.forEach(function (url) {
	            _load(url);
	        });
	    } else {
	        _load(urlOrArr);
	    }
	}

	function _load(url) {
	    if (resourceCache[url]) {
	        return resourceCache[url];
	    } else {
	        var img = new Image();
	        img.onload = function () {
	            resourceCache[url] = img;

	            if (isReady()) {
	                readyCallback();
	            }
	        };
	        resourceCache[url] = false;
	        img.src = url;
	    }
	}

	function get(url) {
	    return resourceCache[url];
	}

	function isReady() {
	    var ready = true;
	    for (var k in resourceCache) {
	        if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
	            ready = false;
	        }
	    }
	    return ready;
	}

	function onReady(func) {
	    readyCallback = func;
	}

	var resources = {
	    load: load,
	    get: get,
	    onReady: onReady,
	    isReady: isReady
	};

	exports.default = resources;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mouse(canvas) {
	    // HITTEST: To convert the mouse position to be canvas relative.
	    // BEGIN http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
	    var stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0,
	        stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0,
	        styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0,
	        styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0,

	    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
	    // They will mess up mouse coordinates and this fixes that
	    html = document.body.parentNode,
	        htmlTop = html.offsetTop,
	        htmlLeft = html.offsetLeft,
	        position = new _utils2.default.Point(0, 0),
	        _isMouseDown = false;

	    canvas.addEventListener('mousemove', function (e) {
	        var pos = getProperPosition(e);

	        position.x = pos.x;
	        position.y = pos.y;
	    });

	    window.addEventListener('mouseup', function () {
	        _isMouseDown = false;
	    });

	    canvas.addEventListener('mousedown', function () {
	        _isMouseDown = true;
	    });
	    window.addEventListener('blur', function () {
	        _isMouseDown = false;
	    });
	    function getProperPosition(e) {
	        var element = canvas,
	            offsetX = 0,
	            offsetY = 0,
	            mx,
	            my;

	        // Compute the total offset. It's possible to cache this if you want
	        if (element.offsetParent !== undefined) {
	            do {
	                offsetX += element.offsetLeft;
	                offsetY += element.offsetTop;
	            } while (element = element.offsetParent);
	        }

	        // Add padding and border style widths to offset
	        // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
	        // This part is not strictly necessary, it depends on your styling
	        offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
	        offsetY += stylePaddingTop + styleBorderTop + htmlTop;

	        mx = e.pageX - offsetX;
	        my = e.pageY - offsetY;

	        // We return a simple javascript object with x and y defined
	        return {
	            x: mx,
	            y: my
	        };
	    }

	    return {
	        reset: function reset() {
	            _isMouseDown = false;
	        },
	        isMouseDown: function isMouseDown() {
	            return _isMouseDown;
	        },
	        getMousePosition: function getMousePosition() {
	            return position;
	        }
	    };
	}

	exports.default = mouse;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var pressedKeys = {};

	function setKey(event, status) {
	    pressedKeys[event.keyCode] = status;
	}

	document.addEventListener('keydown', function (e) {
	    setKey(e, true);
	});

	document.addEventListener('keyup', function (e) {
	    setKey(e, false);
	});

	window.addEventListener('blur', function () {
	    pressedKeys = {};
	});

	function reset() {
	    pressedKeys = {};
	}

	function isDown(key) {
	    return pressedKeys[key];
	}

	var input = {
	    pressedKeys: pressedKeys,
	    reset: reset,
	    isDown: isDown
	};

	exports.default = input;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(18);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _renderers = __webpack_require__(22);

	var _renderers2 = _interopRequireDefault(_renderers);

	var _sprite = __webpack_require__(23);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function GameObject(config) {
	    if (config.pos instanceof _utils2.default.Point) {
	        this.pos = config.pos.clone();
	    } else {
	        this.pos = new _utils2.default.Point(config.pos);
	    }
	    this.id = config.id;

	    if (config.sprite) {
	        this.sprite = new _sprite2.default(config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
	    }

	    this.type = config.type;

	    if (config.size || this.sprite) {
	        this.size = config.size || this.sprite.size;
	    }
	    this.collisions = config.collisions;
	    this.callbacks = config.callbacks || {};
	    this.zIndex = config.zIndex || 0;
	    var parameters = config.parameters && _utils2.default.clone(config.parameters) || {},
	        _parameters = config.parameters || {};

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

	    /*this.parameters = (config.parameters && utils.clone(config.parameters)) || {};
	    this._parameters = config.parameters;*/
	    this.rules = config.rules || [];
	    this.conditions = config.conditions || [];
	    this._update = config.update;

	    if (config.render) {
	        if (_renderers2.default[config.render]) {
	            this.customRender = _renderers2.default[config.render];
	        } else {
	            this.customRender = config.render;
	        }
	    }
	    this._init = config.init;

	    this.inited = false;
	}
	GameObject.prototype.objectCount = 0;
	GameObject.prototype.render = function (dt) {
	    var ctx = this.layer.ctx;
	    ctx.save();
	    ctx.translate(Math.round(this.pos.x), Math.round(this.pos.y));

	    if (this.customRender) {
	        if (Array.isArray(this.customRender)) {
	            for (var i = 0; i < this.customRender.length; i++) {
	                this.customRender[i](this, dt);
	            }
	        } else {
	            this.customRender(this, dt);
	        }
	    } else {
	        _renderers2.default.sprite(this, dt);
	    }

	    ctx.restore();
	};
	GameObject.prototype.init = function () {
	    if (!this.inited) {
	        var rules = this.rules,
	            conditions = this.conditions;

	        this.rules = [];
	        this.conditions = [];

	        this._init && this._init();

	        if (this.collisions) {
	            this.collisions = new GameRule(this.layer.game.rulesDefinition['collisions']);
	            this.collisions.setContext(this);
	            this.collisions.init();
	        }

	        for (var i = 0, l = rules.length; i < l; i++) {
	            this.addRule(this.layer.game.rulesDefinition[rules[i]]);
	        }

	        for (var i = 0, l = conditions.length; i < l; i++) {
	            this.addCondition(this.layer.game.rulesDefinition[conditions[i]]);
	        }

	        this.inited = true;
	    }
	};
	GameObject.prototype.setLayer = function (layer) {
	    this.layer = layer;
	};
	GameObject.prototype.update = function (dt) {
	    this._update && this._update();
	    for (var i = 0; i < this.rules.length; i++) {
	        this.rules[i].update(dt, this);
	    }
	};
	GameObject.prototype.updateConditions = function (dt) {
	    for (var i = 0; i < this.conditions.length; i++) {
	        this.conditions[i].update(dt, this);
	    }
	    if (this._removeInNextTick) {
	        if (this.collisions) {
	            this.layer.game.collisions.removeObject(this);
	        }
	        this.layer.removeObject(this.id);
	        this._removeInNextTick = false;
	    }
	};
	GameObject.prototype.setPosition = function (point) {
	    this.pos.x = point.x;
	    this.pos.y = point.y;
	};
	GameObject.prototype.removeRule = function (id) {
	    if (this.rules.hasOwnProperty(id)) {
	        this.rules[id].layer = null;
	        delete this.rules[id];
	    }
	};
	GameObject.prototype.addRule = function (config) {
	    if (this.rules.hasOwnProperty(config.id)) {
	        console.error('Rule with such id already exist in this layer');
	        return false;
	    } else {
	        var rule = new GameRule(config);
	        rule.setContext(this);
	        rule.init();
	        this.rules.push(rule);
	    }

	    return this.rules[config.id];
	};
	GameObject.prototype.addCondition = function (config) {
	    if (this.conditions.hasOwnProperty(config.id)) {
	        console.error('Rule with such id already exist in this layer');
	        return false;
	    } else {
	        var condition = new GameRule(config);
	        condition.setContext(this);
	        condition.init();
	        this.conditions.push(condition);
	    }

	    return this.rules[config.id];
	};
	GameObject.prototype.updateCollisions = function (dt) {
	    this.collisions && this.collisions.update(dt, this);
	};

	function GameRule(config) {
	    this.id = config.id;
	    this._update = config.update;
	    this.parameters = config.parameters && _utils2.default.clone(config.parameters) || {};
	    this._parameters = _utils2.default.clone(this.parameters);
	    this._init = config.init;
	    this.inited = false;
	}
	GameRule.prototype.init = function () {
	    if (!this.inited) {
	        this._init && this._init();
	        this.inited = true;
	    }
	};
	GameRule.prototype.update = function (dt, obj) {
	    this._update && this._update(dt, obj);
	};
	GameRule.prototype.setContext = function (context) {
	    this.context = context;
	};

	function GameLayer(config) {
	    this.objectCount = 0;
	    this.id = config.id;
	    this.ctx = config.ctx;
	    this.initList = config.initList;
	    this.game = config.game;
	    this.background = this.ctx.createPattern(_resources2.default.get(config.background), 'repeat');
	    this.pos = config.pos ? new _utils2.default.Point(config.pos) : new _utils2.default.Point(0, 0);
	    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
	    this.translate = config.translate || {
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
	GameLayer.prototype.init = function () {
	    if (!this.inited) {
	        for (var i = 0; i < this.initList.length; i++) {
	            this.addObject(this.game.getConfig(this.initList[i]));
	        }

	        this._init && this._init();

	        var rules = this._rules;
	        this.rules = [];

	        for (var i = 0, l = rules.length; i < l; i++) {
	            this.addRule(this.game.rulesDefinition[rules[i]]);
	        }

	        this.inited = true;
	    }
	};
	GameLayer.prototype.render = function (dt) {
	    var arr = [],
	        ctx = this.ctx,
	        canvas = ctx.canvas;

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
	    for (var i = 0, l = arr.length; i < l; i++) {
	        if (arr[i]) {
	            for (var j = 0, k = arr[i].length; j < k; j++) {
	                arr[i][j].render(dt);
	            }
	        }
	    }
	    ctx.translate(-this.translate.x, -this.translate.y);
	    ctx.beginPath();
	    ctx.strokeStyle = 'black';
	    ctx.shadowColor = 'black';
	    ctx.lineWidth = 2;
	    ctx.shadowOffsetX = 0;
	    ctx.shadowOffsetY = 0;
	    ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
	    ctx.stroke();
	    ctx.restore();
	};
	GameLayer.prototype.update = function (dt) {
	    for (var i in this.rules) {
	        this.rules.hasOwnProperty(i) && this.rules[i].update(dt, this);
	    }

	    for (var i in this.objects) {
	        this.objects[i].update(dt);
	    }

	    for (var i in this.objects) {
	        this.objects[i].updateCollisions(dt);
	    }

	    this.game.collisions.check();

	    for (var i in this.objects) {
	        this.objects[i].updateConditions(dt);
	    }
	};
	GameLayer.prototype.removeRule = function (id) {
	    if (this.rules.hasOwnProperty(id)) {
	        this.rules[id].layer = null;
	        delete this.rules[id];
	    }
	};
	GameLayer.prototype.addRule = function (config) {
	    if (this.rules.hasOwnProperty(config.id)) {
	        console.error('Rule with such id already exist in this layer');
	        return false;
	    } else {
	        var rule = new GameRule(config);
	        rule.setContext(this);
	        rule.init();
	        this.rules.push(rule);
	    }
	    return this.rules[config.id];
	};
	GameLayer.prototype.removeObject = function (id) {
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
	};
	GameLayer.prototype.addObject = function (config) {
	    /*if (this.objects.hasOwnProperty(config.id)) {
	        console.error('Object with such id already exist in this layer: ', config.id);
	        return false;
	    }*/

	    var _obj = new GameObject(config);
	    _obj.setLayer(this);
	    _obj.init();

	    if (config.type && config.type != 'default') {
	        !this.sortedObjects[config.type] && (this.sortedObjects[config.type] = []);
	        this.sortedObjects[config.type].push(_obj.id);
	    } else {
	        this.sortedObjects['default'].push(_obj.id);
	    }
	    this.objects[_obj.id] = _obj;

	    return this.objects[_obj.id];
	};
	GameLayer.prototype.addObjects = function (obj) {
	    if (Array.isArray(obj)) {
	        for (var i = 0, j = obj.length; i < j; i++) {
	            this.addObject(obj[i]);
	        }
	    } else {
	        console.error('addObjects expect array in parameters');
	    }
	};
	GameLayer.prototype.getObjectsByType = function (type) {
	    var objectsId = this.sortedObjects[type] || [],
	        result = [];
	    for (var i = 0, l = objectsId.length; i < l; i++) {
	        result.push(this.objects[objectsId[i]]);
	    }
	    return result;
	};
	GameLayer.prototype.clearLayer = function () {
	    for (var i in this.objects) {
	        this.objects.hasOwnProperty(i) && delete this.objects[i];
	    }
	    this.sortedObjects = {
	        'default': []
	    };
	    for (var i in this.rules) {
	        this.rules.hasOwnProperty(i) && delete this.rules[i];
	    }
	    this.inited = false;
	};
	GameLayer.prototype.getCoordinates = function () {
	    return [this.pos.x, this.pos.y, this.pos.x + this.size[0], this.pos.y + this.size[1]];
	};

	function GameWindow(config) {
	    this.layers = {};
	    this.ctx = config.ctx;
	    this.canvas = config.canvas;
	    this._ctx = config._ctx;
	    this._canvas = config._canvas;
	    this.collisions = config.collisions;
	    this.objectsDefinition = config.objects;
	    this.rulesDefinition = config.rules;
	    this.layersDefinition = config.layers;
	    this.input = config.input;
	    this.mouse = config.mouse;
	    this._handlers = {};
	    this.parameters = {};
	    this._init = config.init;
	}
	GameWindow.prototype.init = function () {
	    this._init && this._init();
	};
	GameWindow.prototype.bindGlobalEvent = function (eventName, handler) {
	    !this._handlers[eventName] && (this._handlers[eventName] = []);
	    this._handlers[eventName].push(handler);

	    return this;
	};
	GameWindow.prototype.triggerGlobalEvent = function (eventName, eventObject) {
	    for (var i = 0, l = this._handlers[eventName] ? this._handlers[eventName].length : 0; i < l; i++) {
	        this._handlers[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1));
	    }

	    return this;
	};
	GameWindow.prototype.getLayer = function () {
	    return this.layers;
	};
	GameWindow.prototype.update = function (dt) {
	    for (var i in this.layers) {
	        this.layers.hasOwnProperty(i) && this.layers[i].update(dt);
	    }
	};
	GameWindow.prototype.render = function (dt) {
	    for (var i in this.layers) {
	        this.layers.hasOwnProperty(i) && this.layers[i].render(dt);
	    }
	    this.ctx.drawImage(this._canvas, 0, 0);
	};
	GameWindow.prototype.removeLayer = function (id) {
	    this.layers.hasOwnProperty(id) && delete this.layers[id];
	};
	GameWindow.prototype.addLayers = function (obj) {
	    var arr = [];
	    if (Array.isArray(obj)) {
	        for (var i = 0, j = obj.length; i < j; i++) {
	            arr.push(this.addLayer(obj[i]));
	        }
	    } else {
	        console.error('addLayers expect array in parameters');
	    }
	    return arr;
	};
	GameWindow.prototype.addLayer = function (obj) {
	    if (this.layers.hasOwnProperty(obj.id)) {
	        console.error('Layer with such id already exist in this window');
	        return false;
	    } else {
	        obj.ctx = this._ctx;
	        obj.game = this;
	        this.layers[obj.id] = new GameLayer(obj);
	    }

	    return this.layers[obj.id];
	};
	GameWindow.prototype.getConfig = function (id) {
	    var config = _utils2.default.clone(this.objectsDefinition[id]);

	    !config.id && (config.id = id);

	    config.id += this.objectCount++ + Math.round(new Date().getTime() + Math.random() * 1000001);
	    return config;
	};
	GameWindow.prototype.getLayerConfig = function (id) {
	    return this.layersDefinition[id];
	};
	GameWindow.prototype.objectCount = 0;
	exports.default = GameWindow;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(18);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function healthBar(obj, dt) {
	    var ctx = obj.layer.ctx,
	        x = Math.round(-obj.sprite.size[0] / 2),
	        y = Math.round(-obj.sprite.size[1] / 2 - 7),
	        width = obj.sprite.size[0],
	        height = 3;

	    ctx.globalAlpha = 0.5;

	    if (obj.getParameter('health') > 0 && obj.getDefaultParameter('health') > obj.getParameter('health')) {
	        ctx.fillStyle = "rgb(250, 0, 0)";
	        ctx.fillRect(x, y, width, height);
	        ctx.fillStyle = "rgb(0, 250, 0)";
	        ctx.fillRect(x, y, Math.round(width * (obj.getParameter('health') / obj.getDefaultParameter('health'))), height);
	    }

	    ctx.globalAlpha = 1;
	}
	function sprite(obj, dt) {
	    var ctx = obj.layer.ctx;

	    ctx.globalAlpha = 1;
	    dt && obj.sprite.update(dt);
	    obj.sprite.render(ctx);
	}
	function shadow(obj, dt) {
	    var ctx = obj.layer.ctx;

	    ctx.globalAlpha = 0.5;

	    ctx.beginPath();
	    _utils2.default.ellipse(ctx, 0, +obj.sprite.size[1] / 2 - 3, obj.sprite.size[0] / 2, 5, _utils2.default.getRadians(0), _utils2.default.getRadians(0), _utils2.default.getRadians(360));
	    ctx.fillStyle = 'black';
	    ctx.fill();

	    ctx.globalAlpha = 1;
	}
	function effects(obj, dt) {
	    var ctx = obj.layer.ctx,
	        effects = obj.getParameter('effects');

	    for (var i = 0; i < effects.length; i++) {
	        var effect = effects[i];
	        if (effect == 'frozen') {
	            ctx.globalAlpha = 0.8;
	            ctx.drawImage(_resources2.default.get('img/frosteffect.png'), -obj.sprite.size[0] / 2, -8, 32, 32);
	            ctx.globalAlpha = 1;
	        }
	    }
	}

	function objectRenderer(obj, dt) {
	    shadow(obj, dt);
	    sprite(obj, dt);
	}
	function unitRenderer(obj, dt) {
	    shadow(obj, dt);
	    healthBar(obj, dt);
	    sprite(obj, dt);
	    effects(obj, dt);
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
	function cursor(obj, dt) {
	    var ctx = obj.layer.ctx;

	    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
	    sprite(obj, dt);
	    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
	}
	var renders = {
	    shadow: shadow,
	    healthBar: healthBar,
	    cursor: cursor,
	    sprite: sprite,
	    effects: effects,
	    object: objectRenderer,
	    text: textRender,
	    spell: spellRenderer,
	    unit: unitRenderer
	};

	exports.default = renders;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(18);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Sprite(url, pos, size, speed, frames, dir, once, degree) {
	    if (pos instanceof _utils2.default.Point) {
	        this.pos = pos.clone();
	    } else {
	        this.pos = new _utils2.default.Point(pos);
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
	    var pos = this.defaultPosition,
	        config = {};

	    if (direction.dir == 1) {
	        direction.k < 1 && direction.k >= -1 && (config.pos = [pos.x, pos.y]);
	        direction.k >= 1 && (config.pos = [pos.x, pos.y + 2 * this.size[1]]);
	        direction.k < -1 && (config.pos = [pos.x, pos.y + this.size[1]]);
	        direction.k == 'vertical' && (config.pos = [pos.x, pos.y + 3 * this.size[1]]);
	        direction.k == 'horizontal' && (config.pos = [pos.x, pos.y]);
	    } else if (direction.dir == -1) {
	        direction.k >= 1 && (config.pos = [pos.x, pos.y + this.size[1]]);
	        direction.k < 1 && direction.k >= -1 && (config.pos = [pos.x, pos.y + 3 * this.size[1]]);
	        direction.k < -1 && (config.pos = [pos.x, pos.y + 2 * this.size[1]]);
	        direction.k == 'vertical' && (config.pos = [pos.x, pos.y]);
	        direction.k == 'horizontal' && (config.pos = [pos.x, pos.y + 3 * this.size[1]]);
	    }

	    config.pos = new _utils2.default.Point(config.pos);
	    this.updateConfig(config);
	};
	Sprite.prototype.render = function (ctx) {
	    var frame;

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

	    var x = this.pos.x;
	    var y = this.pos.y;

	    if (this.dir == 'vertical') {
	        y += frame * this.size[1];
	    } else {
	        x += frame * this.size[0];
	    }

	    ctx.rotate(this.degree);
	    ctx.drawImage(_resources2.default.get(this.url), x, y, this.size[0], this.size[1], Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2), this.size[0], this.size[1]);
	};
	Sprite.prototype.setDegree = function (degree) {
	    this.degree = degree;
	};

	exports.default = Sprite;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generate(config) {
	    var n = config.n || 6,
	        width = config.width || 800,
	        height = config.height || 600,
	        sizeX = width >> n,
	        sizeY = height >> n,
	        cellGrid = new Array(sizeX * sizeY);

	    for (var i = 0; i < cellGrid.length; i++) {
	        cellGrid[i] = [];
	    }
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

	    function updateObject(object) {
	        var pos = object.pos,
	            size = object.size,
	            point1 = [pos.x + size[0] / 2 >> n, pos.y + size[1] / 2 >> n],
	            point2 = [pos.x - size[0] / 2 >> n, pos.y - size[1] / 2 >> n],
	            point3 = [pos.x + size[0] / 2 >> n, pos.y - size[1] / 2 >> n],
	            point4 = [pos.x - size[0] / 2 >> n, pos.y + size[1] / 2 >> n],
	            point5 = [pos.x >> n, pos.y >> n],
	            cells = [getCell(point1), getCell(point2), getCell(point3), getCell(point4), getCell(point5)],
	            oldCells = object.getParameter('collisions').cells;

	        for (var i = 0; i < oldCells.length; i++) {
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
	                    var objects = cellGrid[getCell([i, j])],
	                        length = objects.length;

	                    for (var k = 0; k < length; k++) {
	                        for (var l = k + 1; l < length; l++) {
	                            if (_utils2.default.boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
	                                objects[k].getParameter('collisions').indexOf(objects[l]) == -1 && objects[k].getParameter('collisions').push(objects[l]);
	                                objects[l].getParameter('collisions').indexOf(objects[k]) == -1 && objects[l].getParameter('collisions').push(objects[k]);
	                            }
	                        }
	                    }
	                }
	            }
	        }
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

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 *  howler.js v1.1.28
	 *  howlerjs.com
	 *
	 *  (c) 2013-2015, James Simpson of GoldFire Studios
	 *  goldfirestudios.com
	 *
	 *  MIT License
	 */

	(function() {
	  // setup
	  var cache = {};

	  // setup the audio context
	  var ctx = null,
	    usingWebAudio = true,
	    noAudio = false;
	  try {
	    if (typeof AudioContext !== 'undefined') {
	      ctx = new AudioContext();
	    } else if (typeof webkitAudioContext !== 'undefined') {
	      ctx = new webkitAudioContext();
	    } else {
	      usingWebAudio = false;
	    }
	  } catch(e) {
	    usingWebAudio = false;
	  }

	  if (!usingWebAudio) {
	    if (typeof Audio !== 'undefined') {
	      try {
	        new Audio();
	      } catch(e) {
	        noAudio = true;
	      }
	    } else {
	      noAudio = true;
	    }
	  }

	  // create a master gain node
	  if (usingWebAudio) {
	    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
	    masterGain.gain.value = 1;
	    masterGain.connect(ctx.destination);
	  }

	  // create global controller
	  var HowlerGlobal = function(codecs) {
	    this._volume = 1;
	    this._muted = false;
	    this.usingWebAudio = usingWebAudio;
	    this.ctx = ctx;
	    this.noAudio = noAudio;
	    this._howls = [];
	    this._codecs = codecs;
	    this.iOSAutoEnable = true;
	  };
	  HowlerGlobal.prototype = {
	    /**
	     * Get/set the global volume for all sounds.
	     * @param  {Float} vol Volume from 0.0 to 1.0.
	     * @return {Howler/Float}     Returns self or current volume.
	     */
	    volume: function(vol) {
	      var self = this;

	      // make sure volume is a number
	      vol = parseFloat(vol);

	      if (vol >= 0 && vol <= 1) {
	        self._volume = vol;

	        if (usingWebAudio) {
	          masterGain.gain.value = vol;
	        }

	        // loop through cache and change volume of all nodes that are using HTML5 Audio
	        for (var key in self._howls) {
	          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	            // loop through the audio nodes
	            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
	              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
	            }
	          }
	        }

	        return self;
	      }

	      // return the current global volume
	      return (usingWebAudio) ? masterGain.gain.value : self._volume;
	    },

	    /**
	     * Mute all sounds.
	     * @return {Howler}
	     */
	    mute: function() {
	      this._setMuted(true);

	      return this;
	    },

	    /**
	     * Unmute all sounds.
	     * @return {Howler}
	     */
	    unmute: function() {
	      this._setMuted(false);

	      return this;
	    },

	    /**
	     * Handle muting and unmuting globally.
	     * @param  {Boolean} muted Is muted or not.
	     */
	    _setMuted: function(muted) {
	      var self = this;

	      self._muted = muted;

	      if (usingWebAudio) {
	        masterGain.gain.value = muted ? 0 : self._volume;
	      }

	      for (var key in self._howls) {
	        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	          // loop through the audio nodes
	          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
	            self._howls[key]._audioNode[i].muted = muted;
	          }
	        }
	      }
	    },

	    /**
	     * Check for codec support.
	     * @param  {String} ext Audio file extention.
	     * @return {Boolean}
	     */
	    codecs: function(ext) {
	      return this._codecs[ext];
	    },

	    /**
	     * iOS will only allow audio to be played after a user interaction.
	     * Attempt to automatically unlock audio on the first user interaction.
	     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
	     * @return {Howler}
	     */
	    _enableiOSAudio: function() {
	      var self = this;

	      // only run this on iOS if audio isn't already eanbled
	      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
	        return;
	      }

	      self._iOSEnabled = false;

	      // call this method on touch start to create and play a buffer,
	      // then check if the audio actually played to determine if
	      // audio has now been unlocked on iOS
	      var unlock = function() {
	        // create an empty buffer
	        var buffer = ctx.createBuffer(1, 1, 22050);
	        var source = ctx.createBufferSource();
	        source.buffer = buffer;
	        source.connect(ctx.destination);

	        // play the empty buffer
	        if (typeof source.start === 'undefined') {
	          source.noteOn(0);
	        } else {
	          source.start(0);
	        }

	        // setup a timeout to check that we are unlocked on the next event loop
	        setTimeout(function() {
	          if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
	            // update the unlocked state and prevent this check from happening again
	            self._iOSEnabled = true;
	            self.iOSAutoEnable = false;

	            // remove the touch start listener
	            window.removeEventListener('touchend', unlock, false);
	          }
	        }, 0);
	      };

	      // setup a touch start listener to attempt an unlock in
	      window.addEventListener('touchend', unlock, false);

	      return self;
	    }
	  };

	  // check for browser codec support
	  var audioTest = null;
	  var codecs = {};
	  if (!noAudio) {
	    audioTest = new Audio();
	    codecs = {
	      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
	      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
	      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
	      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
	      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
	      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
	    };
	  }

	  // allow access to the global audio controls
	  var Howler = new HowlerGlobal(codecs);

	  // setup the audio object
	  var Howl = function(o) {
	    var self = this;

	    // setup the defaults
	    self._autoplay = o.autoplay || false;
	    self._buffer = o.buffer || false;
	    self._duration = o.duration || 0;
	    self._format = o.format || null;
	    self._loop = o.loop || false;
	    self._loaded = false;
	    self._sprite = o.sprite || {};
	    self._src = o.src || '';
	    self._pos3d = o.pos3d || [0, 0, -0.5];
	    self._volume = o.volume !== undefined ? o.volume : 1;
	    self._urls = o.urls || [];
	    self._rate = o.rate || 1;

	    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
	    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
	    // if 3d sound is used
	    self._model = o.model || null;

	    // setup event functions
	    self._onload = [o.onload || function() {}];
	    self._onloaderror = [o.onloaderror || function() {}];
	    self._onend = [o.onend || function() {}];
	    self._onpause = [o.onpause || function() {}];
	    self._onplay = [o.onplay || function() {}];

	    self._onendTimer = [];

	    // Web Audio or HTML5 Audio?
	    self._webAudio = usingWebAudio && !self._buffer;

	    // check if we need to fall back to HTML5 Audio
	    self._audioNode = [];
	    if (self._webAudio) {
	      self._setupAudioNode();
	    }

	    // automatically try to enable audio on iOS
	    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
	      Howler._enableiOSAudio();
	    }

	    // add this to an array of Howl's to allow global control
	    Howler._howls.push(self);

	    // load the track
	    self.load();
	  };

	  // setup all of the methods
	  Howl.prototype = {
	    /**
	     * Load an audio file.
	     * @return {Howl}
	     */
	    load: function() {
	      var self = this,
	        url = null;

	      // if no audio is available, quit immediately
	      if (noAudio) {
	        self.on('loaderror');
	        return;
	      }

	      // loop through source URLs and pick the first one that is compatible
	      for (var i=0; i<self._urls.length; i++) {
	        var ext, urlItem;

	        if (self._format) {
	          // use specified audio format if available
	          ext = self._format;
	        } else {
	          // figure out the filetype (whether an extension or base64 data)
	          urlItem = self._urls[i];
	          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
	          if (!ext) {
	            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
	          }

	          if (ext) {
	            ext = ext[1].toLowerCase();
	          } else {
	            self.on('loaderror');
	            return;
	          }
	        }

	        if (codecs[ext]) {
	          url = self._urls[i];
	          break;
	        }
	      }

	      if (!url) {
	        self.on('loaderror');
	        return;
	      }

	      self._src = url;

	      if (self._webAudio) {
	        loadBuffer(self, url);
	      } else {
	        var newNode = new Audio();

	        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
	        newNode.addEventListener('error', function () {
	          if (newNode.error && newNode.error.code === 4) {
	            HowlerGlobal.noAudio = true;
	          }

	          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
	        }, false);

	        self._audioNode.push(newNode);

	        // setup the new audio node
	        newNode.src = url;
	        newNode._pos = 0;
	        newNode.preload = 'auto';
	        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

	        // setup the event listener to start playing the sound
	        // as soon as it has buffered enough
	        var listener = function() {
	          // round up the duration when using HTML5 Audio to account for the lower precision
	          self._duration = Math.ceil(newNode.duration * 10) / 10;

	          // setup a sprite if none is defined
	          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
	            self._sprite = {_default: [0, self._duration * 1000]};
	          }

	          if (!self._loaded) {
	            self._loaded = true;
	            self.on('load');
	          }

	          if (self._autoplay) {
	            self.play();
	          }

	          // clear the event listener
	          newNode.removeEventListener('canplaythrough', listener, false);
	        };
	        newNode.addEventListener('canplaythrough', listener, false);
	        newNode.load();
	      }

	      return self;
	    },

	    /**
	     * Get/set the URLs to be pulled from to play in this source.
	     * @param  {Array} urls  Arry of URLs to load from
	     * @return {Howl}        Returns self or the current URLs
	     */
	    urls: function(urls) {
	      var self = this;

	      if (urls) {
	        self.stop();
	        self._urls = (typeof urls === 'string') ? [urls] : urls;
	        self._loaded = false;
	        self.load();

	        return self;
	      } else {
	        return self._urls;
	      }
	    },

	    /**
	     * Play a sound from the current time (0 by default).
	     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
	     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
	     * @return {Howl}
	     */
	    play: function(sprite, callback) {
	      var self = this;

	      // if no sprite was passed but a callback was, update the variables
	      if (typeof sprite === 'function') {
	        callback = sprite;
	      }

	      // use the default sprite if none is passed
	      if (!sprite || typeof sprite === 'function') {
	        sprite = '_default';
	      }

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function() {
	          self.play(sprite, callback);
	        });

	        return self;
	      }

	      // if the sprite doesn't exist, play nothing
	      if (!self._sprite[sprite]) {
	        if (typeof callback === 'function') callback();
	        return self;
	      }

	      // get the node to playback
	      self._inactiveNode(function(node) {
	        // persist the sprite being played
	        node._sprite = sprite;

	        // determine where to start playing from
	        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;

	        // determine how long to play for
	        var duration = 0;
	        if (self._webAudio) {
	          duration = self._sprite[sprite][1] / 1000 - node._pos;
	          if (node._pos > 0) {
	            pos = self._sprite[sprite][0] / 1000 + pos;
	          }
	        } else {
	          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
	        }

	        // determine if this sound should be looped
	        var loop = !!(self._loop || self._sprite[sprite][2]);

	        // set timer to fire the 'onend' event
	        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
	          timerId;
	        (function() {
	          var data = {
	            id: soundId,
	            sprite: sprite,
	            loop: loop
	          };
	          timerId = setTimeout(function() {
	            // if looping, restart the track
	            if (!self._webAudio && loop) {
	              self.stop(data.id).play(sprite, data.id);
	            }

	            // set web audio node to paused at end
	            if (self._webAudio && !loop) {
	              self._nodeById(data.id).paused = true;
	              self._nodeById(data.id)._pos = 0;

	              // clear the end timer
	              self._clearEndTimer(data.id);
	            }

	            // end the track if it is HTML audio and a sprite
	            if (!self._webAudio && !loop) {
	              self.stop(data.id);
	            }

	            // fire ended event
	            self.on('end', soundId);
	          }, duration * 1000);

	          // store the reference to the timer
	          self._onendTimer.push({timer: timerId, id: data.id});
	        })();

	        if (self._webAudio) {
	          var loopStart = self._sprite[sprite][0] / 1000,
	            loopEnd = self._sprite[sprite][1] / 1000;

	          // set the play id to this node and load into context
	          node.id = soundId;
	          node.paused = false;
	          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
	          self._playStart = ctx.currentTime;
	          node.gain.value = self._volume;

	          if (typeof node.bufferSource.start === 'undefined') {
	            loop ? node.bufferSource.noteGrainOn(0, pos, 86400) : node.bufferSource.noteGrainOn(0, pos, duration);
	          } else {
	            loop ? node.bufferSource.start(0, pos, 86400) : node.bufferSource.start(0, pos, duration);
	          }
	        } else {
	          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
	            node.readyState = 4;
	            node.id = soundId;
	            node.currentTime = pos;
	            node.muted = Howler._muted || node.muted;
	            node.volume = self._volume * Howler.volume();
	            setTimeout(function() { node.play(); }, 0);
	          } else {
	            self._clearEndTimer(soundId);

	            (function(){
	              var sound = self,
	                playSprite = sprite,
	                fn = callback,
	                newNode = node;
	              var listener = function() {
	                sound.play(playSprite, fn);

	                // clear the event listener
	                newNode.removeEventListener('canplaythrough', listener, false);
	              };
	              newNode.addEventListener('canplaythrough', listener, false);
	            })();

	            return self;
	          }
	        }

	        // fire the play event and send the soundId back in the callback
	        self.on('play');
	        if (typeof callback === 'function') callback(soundId);

	        return self;
	      });

	      return self;
	    },

	    /**
	     * Pause playback and save the current position.
	     * @param {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    pause: function(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function() {
	          self.pause(id);
	        });

	        return self;
	      }

	      // clear 'onend' timer
	      self._clearEndTimer(id);

	      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        activeNode._pos = self.pos(null, id);

	        if (self._webAudio) {
	          // make sure the sound has been created
	          if (!activeNode.bufferSource || activeNode.paused) {
	            return self;
	          }

	          activeNode.paused = true;
	          if (typeof activeNode.bufferSource.stop === 'undefined') {
	            activeNode.bufferSource.noteOff(0);
	          } else {
	            activeNode.bufferSource.stop(0);
	          }
	        } else {
	          activeNode.pause();
	        }
	      }

	      self.on('pause');

	      return self;
	    },

	    /**
	     * Stop playback and reset to start.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl}
	     */
	    stop: function(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function() {
	          self.stop(id);
	        });

	        return self;
	      }

	      // clear 'onend' timer
	      self._clearEndTimer(id);

	      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        activeNode._pos = 0;

	        if (self._webAudio) {
	          // make sure the sound has been created
	          if (!activeNode.bufferSource || activeNode.paused) {
	            return self;
	          }

	          activeNode.paused = true;

	          if (typeof activeNode.bufferSource.stop === 'undefined') {
	            activeNode.bufferSource.noteOff(0);
	          } else {
	            activeNode.bufferSource.stop(0);
	          }
	        } else if (!isNaN(activeNode.duration)) {
	          activeNode.pause();
	          activeNode.currentTime = 0;
	        }
	      }

	      return self;
	    },

	    /**
	     * Mute this sound.
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    mute: function(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function() {
	          self.mute(id);
	        });

	        return self;
	      }

	      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (self._webAudio) {
	          activeNode.gain.value = 0;
	        } else {
	          activeNode.muted = true;
	        }
	      }

	      return self;
	    },

	    /**
	     * Unmute this sound.
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl}
	     */
	    unmute: function(id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function() {
	          self.unmute(id);
	        });

	        return self;
	      }

	      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (self._webAudio) {
	          activeNode.gain.value = self._volume;
	        } else {
	          activeNode.muted = false;
	        }
	      }

	      return self;
	    },

	    /**
	     * Get/set volume of this sound.
	     * @param  {Float}  vol Volume from 0.0 to 1.0.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl/Float}     Returns self or current volume.
	     */
	    volume: function(vol, id) {
	      var self = this;

	      // make sure volume is a number
	      vol = parseFloat(vol);

	      if (vol >= 0 && vol <= 1) {
	        self._volume = vol;

	        // if the sound hasn't been loaded, add it to the event queue
	        if (!self._loaded) {
	          self.on('play', function() {
	            self.volume(vol, id);
	          });

	          return self;
	        }

	        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	        if (activeNode) {
	          if (self._webAudio) {
	            activeNode.gain.value = vol;
	          } else {
	            activeNode.volume = vol * Howler.volume();
	          }
	        }

	        return self;
	      } else {
	        return self._volume;
	      }
	    },

	    /**
	     * Get/set whether to loop the sound.
	     * @param  {Boolean} loop To loop or not to loop, that is the question.
	     * @return {Howl/Boolean}      Returns self or current looping value.
	     */
	    loop: function(loop) {
	      var self = this;

	      if (typeof loop === 'boolean') {
	        self._loop = loop;

	        return self;
	      } else {
	        return self._loop;
	      }
	    },

	    /**
	     * Get/set sound sprite definition.
	     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
	     *                @param {Integer} offset   Where to begin playback in milliseconds
	     *                @param {Integer} duration How long to play in milliseconds
	     *                @param {Boolean} loop     (optional) Set true to loop this sprite
	     * @return {Howl}        Returns current sprite sheet or self.
	     */
	    sprite: function(sprite) {
	      var self = this;

	      if (typeof sprite === 'object') {
	        self._sprite = sprite;

	        return self;
	      } else {
	        return self._sprite;
	      }
	    },

	    /**
	     * Get/set the position of playback.
	     * @param  {Float}  pos The position to move current playback to.
	     * @param  {String} id  (optional) The play instance ID.
	     * @return {Howl/Float}      Returns self or current playback position.
	     */
	    pos: function(pos, id) {
	      var self = this;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function() {
	          self.pos(pos);
	        });

	        return typeof pos === 'number' ? self : self._pos || 0;
	      }

	      // make sure we are dealing with a number for pos
	      pos = parseFloat(pos);

	      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	      if (activeNode) {
	        if (pos >= 0) {
	          self.pause(id);
	          activeNode._pos = pos;
	          self.play(activeNode._sprite, id);

	          return self;
	        } else {
	          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
	        }
	      } else if (pos >= 0) {
	        return self;
	      } else {
	        // find the first inactive node to return the pos for
	        for (var i=0; i<self._audioNode.length; i++) {
	          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
	          }
	        }
	      }
	    },

	    /**
	     * Get/set the 3D position of the audio source.
	     * The most common usage is to set the 'x' position
	     * to affect the left/right ear panning. Setting any value higher than
	     * 1.0 will begin to decrease the volume of the sound as it moves further away.
	     * NOTE: This only works with Web Audio API, HTML5 Audio playback
	     * will not be affected.
	     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
	     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
	     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
	     * @param  {String} id (optional) The play instance ID.
	     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
	     */
	    pos3d: function(x, y, z, id) {
	      var self = this;

	      // set a default for the optional 'y' & 'z'
	      y = (typeof y === 'undefined' || !y) ? 0 : y;
	      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('play', function() {
	          self.pos3d(x, y, z, id);
	        });

	        return self;
	      }

	      if (x >= 0 || x < 0) {
	        if (self._webAudio) {
	          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
	          if (activeNode) {
	            self._pos3d = [x, y, z];
	            activeNode.panner.setPosition(x, y, z);
	            activeNode.panner.panningModel = self._model || 'HRTF';
	          }
	        }
	      } else {
	        return self._pos3d;
	      }

	      return self;
	    },

	    /**
	     * Fade a currently playing sound between two volumes.
	     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
	     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len      Time in milliseconds to fade.
	     * @param  {Function} callback (optional) Fired when the fade is complete.
	     * @param  {String}   id       (optional) The play instance ID.
	     * @return {Howl}
	     */
	    fade: function(from, to, len, callback, id) {
	      var self = this,
	        diff = Math.abs(from - to),
	        dir = from > to ? 'down' : 'up',
	        steps = diff / 0.01,
	        stepTime = len / steps;

	      // if the sound hasn't been loaded, add it to the event queue
	      if (!self._loaded) {
	        self.on('load', function() {
	          self.fade(from, to, len, callback, id);
	        });

	        return self;
	      }

	      // set the volume to the start position
	      self.volume(from, id);

	      for (var i=1; i<=steps; i++) {
	        (function() {
	          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
	            vol = Math.round(1000 * change) / 1000,
	            toVol = to;

	          setTimeout(function() {
	            self.volume(vol, id);

	            if (vol === toVol) {
	              if (callback) callback();
	            }
	          }, stepTime * i);
	        })();
	      }
	    },

	    /**
	     * [DEPRECATED] Fade in the current sound.
	     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len     Time in milliseconds to fade.
	     * @param  {Function} callback
	     * @return {Howl}
	     */
	    fadeIn: function(to, len, callback) {
	      return this.volume(0).play().fade(0, to, len, callback);
	    },

	    /**
	     * [DEPRECATED] Fade out the current sound and pause when finished.
	     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
	     * @param  {Number}   len      Time in milliseconds to fade.
	     * @param  {Function} callback
	     * @param  {String}   id       (optional) The play instance ID.
	     * @return {Howl}
	     */
	    fadeOut: function(to, len, callback, id) {
	      var self = this;

	      return self.fade(self._volume, to, len, function() {
	        if (callback) callback();
	        self.pause(id);

	        // fire ended event
	        self.on('end');
	      }, id);
	    },

	    /**
	     * Get an audio node by ID.
	     * @return {Howl} Audio node.
	     */
	    _nodeById: function(id) {
	      var self = this,
	        node = self._audioNode[0];

	      // find the node with this ID
	      for (var i=0; i<self._audioNode.length; i++) {
	        if (self._audioNode[i].id === id) {
	          node = self._audioNode[i];
	          break;
	        }
	      }

	      return node;
	    },

	    /**
	     * Get the first active audio node.
	     * @return {Howl} Audio node.
	     */
	    _activeNode: function() {
	      var self = this,
	        node = null;

	      // find the first playing node
	      for (var i=0; i<self._audioNode.length; i++) {
	        if (!self._audioNode[i].paused) {
	          node = self._audioNode[i];
	          break;
	        }
	      }

	      // remove excess inactive nodes
	      self._drainPool();

	      return node;
	    },

	    /**
	     * Get the first inactive audio node.
	     * If there is none, create a new one and add it to the pool.
	     * @param  {Function} callback Function to call when the audio node is ready.
	     */
	    _inactiveNode: function(callback) {
	      var self = this,
	        node = null;

	      // find first inactive node to recycle
	      for (var i=0; i<self._audioNode.length; i++) {
	        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	          // send the node back for use by the new play instance
	          callback(self._audioNode[i]);
	          node = true;
	          break;
	        }
	      }

	      // remove excess inactive nodes
	      self._drainPool();

	      if (node) {
	        return;
	      }

	      // create new node if there are no inactives
	      var newNode;
	      if (self._webAudio) {
	        newNode = self._setupAudioNode();
	        callback(newNode);
	      } else {
	        self.load();
	        newNode = self._audioNode[self._audioNode.length - 1];

	        // listen for the correct load event and fire the callback
	        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
	        var listener = function() {
	          newNode.removeEventListener(listenerEvent, listener, false);
	          callback(newNode);
	        };
	        newNode.addEventListener(listenerEvent, listener, false);
	      }
	    },

	    /**
	     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
	     */
	    _drainPool: function() {
	      var self = this,
	        inactive = 0,
	        i;

	      // count the number of inactive nodes
	      for (i=0; i<self._audioNode.length; i++) {
	        if (self._audioNode[i].paused) {
	          inactive++;
	        }
	      }

	      // remove excess inactive nodes
	      for (i=self._audioNode.length-1; i>=0; i--) {
	        if (inactive <= 5) {
	          break;
	        }

	        if (self._audioNode[i].paused) {
	          // disconnect the audio source if using Web Audio
	          if (self._webAudio) {
	            self._audioNode[i].disconnect(0);
	          }

	          inactive--;
	          self._audioNode.splice(i, 1);
	        }
	      }
	    },

	    /**
	     * Clear 'onend' timeout before it ends.
	     * @param  {String} soundId  The play instance ID.
	     */
	    _clearEndTimer: function(soundId) {
	      var self = this,
	        index = 0;

	      // loop through the timers to find the one associated with this sound
	      for (var i=0; i<self._onendTimer.length; i++) {
	        if (self._onendTimer[i].id === soundId) {
	          index = i;
	          break;
	        }
	      }

	      var timer = self._onendTimer[index];
	      if (timer) {
	        clearTimeout(timer.timer);
	        self._onendTimer.splice(index, 1);
	      }
	    },

	    /**
	     * Setup the gain node and panner for a Web Audio instance.
	     * @return {Object} The new audio node.
	     */
	    _setupAudioNode: function() {
	      var self = this,
	        node = self._audioNode,
	        index = self._audioNode.length;

	      // create gain node
	      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
	      node[index].gain.value = self._volume;
	      node[index].paused = true;
	      node[index]._pos = 0;
	      node[index].readyState = 4;
	      node[index].connect(masterGain);

	      // create the panner
	      node[index].panner = ctx.createPanner();
	      node[index].panner.panningModel = self._model || 'equalpower';
	      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
	      node[index].panner.connect(node[index]);

	      return node[index];
	    },

	    /**
	     * Call/set custom events.
	     * @param  {String}   event Event type.
	     * @param  {Function} fn    Function to call.
	     * @return {Howl}
	     */
	    on: function(event, fn) {
	      var self = this,
	        events = self['_on' + event];

	      if (typeof fn === 'function') {
	        events.push(fn);
	      } else {
	        for (var i=0; i<events.length; i++) {
	          if (fn) {
	            events[i].call(self, fn);
	          } else {
	            events[i].call(self);
	          }
	        }
	      }

	      return self;
	    },

	    /**
	     * Remove a custom event.
	     * @param  {String}   event Event type.
	     * @param  {Function} fn    Listener to remove.
	     * @return {Howl}
	     */
	    off: function(event, fn) {
	      var self = this,
	        events = self['_on' + event],
	        fnString = fn ? fn.toString() : null;

	      if (fnString) {
	        // loop through functions in the event for comparison
	        for (var i=0; i<events.length; i++) {
	          if (fnString === events[i].toString()) {
	            events.splice(i, 1);
	            break;
	          }
	        }
	      } else {
	        self['_on' + event] = [];
	      }

	      return self;
	    },

	    /**
	     * Unload and destroy the current Howl object.
	     * This will immediately stop all play instances attached to this sound.
	     */
	    unload: function() {
	      var self = this;

	      // stop playing any active nodes
	      var nodes = self._audioNode;
	      for (var i=0; i<self._audioNode.length; i++) {
	        // stop the sound if it is currently playing
	        if (!nodes[i].paused) {
	          self.stop(nodes[i].id);
	          self.on('end', nodes[i].id);
	        }

	        if (!self._webAudio) {
	          // remove the source if using HTML5 Audio
	          nodes[i].src = '';
	        } else {
	          // disconnect the output from the master gain
	          nodes[i].disconnect(0);
	        }
	      }

	      // make sure all timeouts are cleared
	      for (i=0; i<self._onendTimer.length; i++) {
	        clearTimeout(self._onendTimer[i].timer);
	      }

	      // remove the reference in the global Howler object
	      var index = Howler._howls.indexOf(self);
	      if (index !== null && index >= 0) {
	        Howler._howls.splice(index, 1);
	      }

	      // delete this sound from the cache
	      delete cache[self._src];
	      self = null;
	    }

	  };

	  // only define these functions when using WebAudio
	  if (usingWebAudio) {

	    /**
	     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
	     * @param  {Object} obj The Howl object for the sound to load.
	     * @param  {String} url The path to the sound file.
	     */
	    var loadBuffer = function(obj, url) {
	      // check if the buffer has already been cached
	      if (url in cache) {
	        // set the duration from the cache
	        obj._duration = cache[url].duration;

	        // load the sound into this object
	        loadSound(obj);
	        return;
	      }
	      
	      if (/^data:[^;]+;base64,/.test(url)) {
	        // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
	        var data = atob(url.split(',')[1]);
	        var dataView = new Uint8Array(data.length);
	        for (var i=0; i<data.length; ++i) {
	          dataView[i] = data.charCodeAt(i);
	        }
	        
	        decodeAudioData(dataView.buffer, obj, url);
	      } else {
	        // load the buffer from the URL
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url, true);
	        xhr.responseType = 'arraybuffer';
	        xhr.onload = function() {
	          decodeAudioData(xhr.response, obj, url);
	        };
	        xhr.onerror = function() {
	          // if there is an error, switch the sound to HTML Audio
	          if (obj._webAudio) {
	            obj._buffer = true;
	            obj._webAudio = false;
	            obj._audioNode = [];
	            delete obj._gainNode;
	            delete cache[url];
	            obj.load();
	          }
	        };
	        try {
	          xhr.send();
	        } catch (e) {
	          xhr.onerror();
	        }
	      }
	    };

	    /**
	     * Decode audio data from an array buffer.
	     * @param  {ArrayBuffer} arraybuffer The audio data.
	     * @param  {Object} obj The Howl object for the sound to load.
	     * @param  {String} url The path to the sound file.
	     */
	    var decodeAudioData = function(arraybuffer, obj, url) {
	      // decode the buffer into an audio source
	      ctx.decodeAudioData(
	        arraybuffer,
	        function(buffer) {
	          if (buffer) {
	            cache[url] = buffer;
	            loadSound(obj, buffer);
	          }
	        },
	        function(err) {
	          obj.on('loaderror');
	        }
	      );
	    };

	    /**
	     * Finishes loading the Web Audio API sound and fires the loaded event
	     * @param  {Object}  obj    The Howl object for the sound to load.
	     * @param  {Objecct} buffer The decoded buffer sound source.
	     */
	    var loadSound = function(obj, buffer) {
	      // set the duration
	      obj._duration = (buffer) ? buffer.duration : obj._duration;

	      // setup a sprite if none is defined
	      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
	        obj._sprite = {_default: [0, obj._duration * 1000]};
	      }

	      // fire the loaded event
	      if (!obj._loaded) {
	        obj._loaded = true;
	        obj.on('load');
	      }

	      if (obj._autoplay) {
	        obj.play();
	      }
	    };

	    /**
	     * Load the sound back into the buffer source.
	     * @param  {Object} obj   The sound to load.
	     * @param  {Array}  loop  Loop boolean, pos, and duration.
	     * @param  {String} id    (optional) The play instance ID.
	     */
	    var refreshBuffer = function(obj, loop, id) {
	      // determine which node to connect to
	      var node = obj._nodeById(id);

	      // setup the buffer source for playback
	      node.bufferSource = ctx.createBufferSource();
	      node.bufferSource.buffer = cache[obj._src];
	      node.bufferSource.connect(node.panner);
	      node.bufferSource.loop = loop[0];
	      if (loop[0]) {
	        node.bufferSource.loopStart = loop[1];
	        node.bufferSource.loopEnd = loop[1] + loop[2];
	      }
	      node.bufferSource.playbackRate.value = obj._rate;
	    };

	  }

	  /**
	   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	   */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return {
	        Howler: Howler,
	        Howl: Howl
	      };
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }

	  /**
	   * Add support for CommonJS libraries such as browserify.
	   */
	  if (true) {
	    exports.Howler = Howler;
	    exports.Howl = Howl;
	  }

	  // define globally in case AMD is not available or available but not used

	  if (typeof window !== 'undefined') {
	    window.Howler = Howler;
	    window.Howl = Howl;
	  }

	})();


/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzPzFkYzYiLCJ3ZWJwYWNrOi8vLy4uL34vdmljdG9yL2luZGV4LmpzP2E1NzYiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2lucHV0LmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2NvbGxpc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaG93bGVyL2hvd2xlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IG1vdXNlTW9kdWxlIGZyb20gJy4vbW91c2UnO1xyXG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XHJcbmltcG9ydCBHYW1lV2luZG93IGZyb20gJy4vb2JqZWN0cyc7XHJcbmltcG9ydCBjb2xsaXNpb25zIGZyb20gJy4vY29sbGlzaW9ucyc7XHJcbmltcG9ydCB7SG93bH0gZnJvbSAnaG93bGVyJztcclxuXHJcbi8vIEEgY3Jvc3MtYnJvd3NlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuLy8gU2VlIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMS8wOC9hbmltYXRpbmctd2l0aC1qYXZhc2NyaXB0LWZyb20tc2V0aW50ZXJ2YWwtdG8tcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xyXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gbG9hZFJlc291cmNlcyhsaXN0LCBjYWxsYmFjaykge1xyXG4gICAgcmVzb3VyY2VzLmxvYWQobGlzdCk7XHJcblxyXG4gICAgLy9UaGlzIG9uZSBpcyBtb2NrIGZvciBBSkFYLCBpZiB3ZSB3aWxsIGhhdmUgcmVhbCBBSkFYLCB3ZSBqdXN0IG5lZWQgdG8gcHV0IHRoaXMgb25lIGludG8gY2FsbGJhY2sgd2l0aG91dCB0aW1lb3V0XHJcbiAgICByZXNvdXJjZXMub25SZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR2FtZShjb25maWcpIHtcclxuICAgIHZhciBjYW52YXMgPSBjb25maWcuY2FudmFzLFxyXG4gICAgICAgIGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICB2YXIgbW91c2UgPSBtb3VzZU1vZHVsZShjYW52YXMpO1xyXG4gICAgdmFyIF9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIF9jYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICBfY2FudmFzLmhlaWdodCA9IGNhbnZhcy53aWR0aDtcclxuXHJcbiAgICBjb25maWcuX2NhbnZhcyA9IF9jYW52YXM7XHJcbiAgICBjb25maWcuX2N0eCA9IF9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgY29uZmlnLmlucHV0ID0gaW5wdXQ7XHJcbiAgICBjb25maWcubW91c2UgPSBtb3VzZTtcclxuICAgIGNvbmZpZy5jb2xsaXNpb25zID0gY29sbGlzaW9ucyh7XHJcbiAgICAgICAgbjogNyxcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoICsgMjAwLFxyXG4gICAgICAgIGhlaWdodDogY2FudmFzLmhlaWdodCArIDIwMFxyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWVXaW5kb3coY29uZmlnKTtcclxuXHJcbiAgICB2YXIgc291bmQgPSBuZXcgSG93bCh7XHJcbiAgICAgICAgdXJsczogWydtdXNpYy9tYWluLm1wMycsICdtdXNpYy9tYWluLm9nZyddLFxyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgdm9sdW1lOiAwLjVcclxuICAgIH0pLnBsYXkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnYW1lVGltZXIoKSB7XHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGR0ID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDAuMDtcclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIGdhbWUucmVuZGVyKGR0KTtcclxuXHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xyXG4gICAgICAgIGxvYWRSZXNvdXJjZXMoY29uZmlnLnJlc291cmNlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmluaXQoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW9kZWw6IGdhbWUsXHJcbiAgICAgICAgaW5pdDogaW5pdEdhbWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbmRleC5qc1xuICoqLyIsInZhciBWaWN0b3IgPSByZXF1aXJlKCd2aWN0b3InKTtcclxuXHJcbmZ1bmN0aW9uIGNvbGxpZGVzKHgsIHksIHIsIGIsIHgyLCB5MiwgcjIsIGIyKSB7XHJcbiAgICByZXR1cm4gIShyID49IHgyIHx8IHggPCByMiB8fFxyXG4gICAgYiA+PSB5MiB8fCB5IDwgYjIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xyXG4gICAgICAgIHRoaXMueCA9IHhbMF07XHJcbiAgICAgICAgdGhpcy55ID0geFsxXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcblxyXG5Qb2ludC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gTGluZShwb2ludCwgdmVjdG9yKXtcclxuXHJcbiAgICAvKmlmIChwb2ludC54ID09IHZlY3Rvci54KSB7XHJcbiAgICAgICAgdGhpcy5rID0gJ3ZlcnQnO1xyXG4gICAgICAgIHRoaXMuYiA9IHZlY3Rvci54O1xyXG4gICAgICAgIHRoaXMuZGlyID0gKHZlY3Rvci55ID49IHBvaW50LnkpID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmsgPSAodmVjdG9yLnkgLSBwb2ludC55KSAvICh2ZWN0b3IueCAtIHBvaW50LngpO1xyXG4gICAgICAgIHRoaXMuYiA9IHBvaW50LnkgLSBwb2ludC54ICogdGhpcy5rO1xyXG4gICAgICAgIHRoaXMuZGlyID0gKHZlY3Rvci54ID49IHBvaW50LngpID8gMSA6IC0xO1xyXG4gICAgfSovXHJcbiAgICB2YXIgX3ZlY3RvciA9IHZlY3RvcjtcclxuXHJcbiAgICBpZiAodmVjdG9yIGluc3RhbmNlb2YgUG9pbnQpIHtcclxuICAgICAgICBfdmVjdG9yID0gZ2V0VmVjdG9yQnlUd29Qb2ludHMocG9pbnQsIHZlY3Rvcik7XHJcbiAgICB9XHJcbiAgICBpZiAoX3ZlY3Rvci54ICE9IDAgJiYgX3ZlY3Rvci55ICE9IDApIHtcclxuICAgICAgICB0aGlzLmsgPSAoX3ZlY3Rvci54IC8gX3ZlY3Rvci55KTtcclxuICAgICAgICB0aGlzLmIgPSAocG9pbnQueCAtIF92ZWN0b3IueCAqIHBvaW50LnkgLyBfdmVjdG9yLnkpO1xyXG4gICAgICAgIHRoaXMuZGlyID0gKF92ZWN0b3IueSA+PSAwKSA/IDEgOiAtMTtcclxuICAgIH0gZWxzZSBpZiAoX3ZlY3Rvci54ID09IDApIHtcclxuICAgICAgICB0aGlzLmsgPSAndmVydGljYWwnO1xyXG4gICAgICAgIHRoaXMuYiA9IF92ZWN0b3IueDtcclxuICAgICAgICB0aGlzLmRpciA9IChfdmVjdG9yLnkgPj0gMCkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuayA9ICdob3Jpem9udGFsJztcclxuICAgICAgICB0aGlzLmIgPSBfdmVjdG9yLnk7XHJcbiAgICAgICAgdGhpcy5kaXIgPSAoX3ZlY3Rvci54ID49IDApID8gMSA6IC0xO1xyXG4gICAgfVxyXG4gICAgdGhpcy52ZWN0b3IgPSBfdmVjdG9yLy9nZXRWZWN0b3JCeVR3b1BvaW50cyhwb2ludCwgdmVjdG9yKTtcclxufVxyXG5cclxuTGluZS5wcm90b3R5cGUuZ2V0RGVzdGluYXRpb24gPSBmdW5jdGlvbihwb2ludCwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG5cclxuICAgIGlmICh0aGlzLmsgPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHggPSBwb2ludC54O1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgdGhpcy5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5rID09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgIHggPSBwb2ludC54ICsgdGhpcy5kaXIgKiBzcGVlZDtcclxuICAgICAgICB5ID0gcG9pbnQueTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICB4ID0gcG9pbnQueCArIHRoaXMuZGlyICogc3BlZWQgKiB0aGlzLmsgLyAoTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuaywgMikgKyAxKSk7XHJcbiAgICAgICAgeSA9IHBvaW50LnkgKyB0aGlzLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldFZlY3RvckJ5VHdvUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICByZXR1cm4gbmV3IFZpY3Rvcihwb2ludDIueCAtIHBvaW50MS54LCBwb2ludDIueSAtIHBvaW50MS55KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94Q29sbGlkZXMocG9zLCBzaXplLCBwb3MyLCBzaXplMikge1xyXG4gICAgcmV0dXJuIGNvbGxpZGVzKHBvcy54ICsgc2l6ZVswXSAvIDIsIHBvcy55ICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zLnggIC0gc2l6ZVswXSAvIDIsIHBvcy55ICAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczIueCAgKyBzaXplMlswXSAvIDIsIHBvczIueSAgKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMi54ICAtIHNpemUyWzBdIC8gMiwgcG9zMi55ICAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UmFkaWFucyhkZWdyZWUpIHtcclxuICAgIHJldHVybiBkZWdyZWUgKiBNYXRoLlBJIC8gMTgwO1xyXG59O1xyXG5mdW5jdGlvbiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyhkaXIxLCBkaXIyKXtcclxuICAgIGlmIChkaXIyLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKDEgLyBkaXIxLmsqZGlyMS5kaXIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKChkaXIyLmsgKiBkaXIyLmRpciAtIGRpcjEuayAqIGRpcjEuZGlyKSAvICgxIC0gZGlyMS5rICogZGlyMS5kaXIgKiBkaXIyLmsgKiBkaXIyLmRpcikpKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWVzKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiAxODAgKiByYWRpYW5zIC8gTWF0aC5QSTtcclxufTtcclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50Mi54IC0gcG9pbnQxLngpKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDIueCAtIHBvaW50MS54LCAyKSArIE1hdGgucG93KHBvaW50Mi55IC0gcG9pbnQxLnksIDIpKSk7XHJcbiAgICAocG9pbnQxLnkgPiBwb2ludDIueSkgJiYgKGRlZ3JlZSA9IC1kZWdyZWUpO1xyXG4gICAgaWYgKGRlZ3JlZSA9PSBwcmV2RGVncmVlKSB7XHJcbiAgICAgICAgcmV0dXJuIFtkZWdyZWUsIDBdO1xyXG4gICAgfSBlbHNlIGlmICgoKGRlZ3JlZSA8IDAgJiYgcHJldkRlZ3JlZSA+IDApIHx8IChkZWdyZWUgPiAwICYmIHByZXZEZWdyZWUgPCAwKSkgJiYgKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gTWF0aC5QSSkpIHtcclxuICAgICAgICB2YXIgZGVncmVlV2l0aFNwZWVkID0gKChwcmV2RGVncmVlID4gMCkgPyBwcmV2RGVncmVlICsgc3BlZWQgOiBwcmV2RGVncmVlIC0gc3BlZWQpO1xyXG4gICAgICAgIGlmIChkZWdyZWVXaXRoU3BlZWQgPiBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IC1NYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCAtIE1hdGguUEkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVncmVlV2l0aFNwZWVkIDwgLU1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgKyBNYXRoLlBJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtkZWdyZWVXaXRoU3BlZWQsIE1hdGgucG93KE1hdGguUEksIDIpIC0gTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWyhNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IHNwZWVkKSA/ICgocHJldkRlZ3JlZSA+IGRlZ3JlZSkgPyBwcmV2RGVncmVlIC0gc3BlZWQgOiBwcmV2RGVncmVlICsgc3BlZWQpIDogZGVncmVlLCBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGdldE1vdmVkUG9pbnRCeURlZ3JlZShwb2ludDEsIHBvaW50MiwgZGVncmVlKSB7XHJcbiAgICB2YXIgbmV3RGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyLnggLSBwb2ludDEueCkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50Mi54IC0gcG9pbnQxLngsIDIpICsgTWF0aC5wb3cocG9pbnQyLnkgLSBwb2ludDEueSwgMikpKTtcclxuXHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MS55ID4gcG9pbnQyLnkpICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGdldERlc3RpbmF0aW9uKHBvaW50MSwgZGlyZWN0aW9uLCBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyLnggLSBwb2ludDEueCwgMikgKyBNYXRoLnBvdyhwb2ludDIueSAtIHBvaW50MS55LCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgYiA9IHBvaW50MlswXTtcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzFdID49IHBvaW50MVsxXSkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGsgPSAocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSAvIChwb2ludDJbMF0gLSBwb2ludDFbMF0pO1xyXG4gICAgICAgIGIgPSBwb2ludDFbMV0gLSBwb2ludDFbMF0gKiBrO1xyXG4gICAgICAgIGRpciA9IChwb2ludDJbMF0gPj0gcG9pbnQxWzBdKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgJ2snOiBrLFxyXG4gICAgICAgICdiJzogYixcclxuICAgICAgICAnZGlyJzogZGlyXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQxLnggLSBwb2ludDIueCwyKSArIE1hdGgucG93KHBvaW50MS55IC0gcG9pbnQyLnksMikpXHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVzdGluYXRpb24ocG9pbnQsIGxpbmUsIHNwZWVkKSB7XHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGlmIChsaW5lLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IHBvaW50Lng7XHJcbiAgICAgICAgeSA9IHBvaW50LnkgKyBsaW5lLmRpciAqIHNwZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gcG9pbnQueCArIGxpbmUuZGlyICogc3BlZWQgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSk7XHJcbiAgICAgICAgeSA9IHBvaW50LnkgKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcclxufVxyXG5mdW5jdGlvbiBnZXRTcGVlZChzdGFydCwgZGVzdGluYXRpb24sIGxpbmUpIHtcclxuICAgIGlmIChsaW5lLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgcmV0dXJuICggZGVzdGluYXRpb24ueSAtIHN0YXJ0LnkgKSAvIGxpbmUuZGlyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKCBkZXN0aW5hdGlvbi55IC0gc3RhcnQueSApICogKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpIC8obGluZS5kaXIgKiBsaW5lLmspO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGVsbGlwc2UoY29udGV4dCwgY3gsIGN5LCByeCwgcnksIHJvdCwgYVN0YXJ0LCBhRW5kKXtcclxuICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoY3gsIGN5KTtcclxuICAgIGNvbnRleHQucm90YXRlKHJvdCk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSgtcngsIC1yeSk7XHJcblxyXG4gICAgY29udGV4dC5zY2FsZShyeCwgcnkpO1xyXG4gICAgY29udGV4dC5hcmMoMSwgMSwgMSwgYVN0YXJ0LCBhRW5kLCBmYWxzZSk7XHJcbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxufVxyXG5mdW5jdGlvbiBuZXh0UG9zaXRpb24ocG9pbnQxLCBwb2ludDIvKiwgc3BlZWQsIGR0Ki8pIHtcclxuICAgIHZhciBkZWx0YXggPSBNYXRoLmFicyhwb2ludDJbMF0gLSBwb2ludDFbMF0pLFxyXG4gICAgICAgIGRlbHRheSA9IE1hdGguYWJzKHBvaW50MlsxXSAtIHBvaW50MVsxXSksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIGRlbHRhZXJyID0gKGRlbHRheCA+IGRlbHRheSkgPyBkZWx0YXkgOiBkZWx0YXgsXHJcbiAgICAgICAgeSA9IHBvaW50MVsxXSxcclxuICAgICAgICB4ID0gcG9pbnQxWzBdO1xyXG5cclxuICAgIGlmIChkZWx0YXggPiBkZWx0YXkpIHtcclxuICAgICAgICAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHgtLSA6IHgrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXgpIHtcclxuICAgICAgICAgICAgeSA9IChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geSAtIDEgOiB5ICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geS0tIDogeSsrO1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YWVycjtcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheSkge1xyXG4gICAgICAgICAgICB4ID0gKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4IC0gMSA6IHggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHgsIHkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFBvaW50T2ZJbnRlcmNlcHRpb24oZGlyZWN0aW9uMSwgZGlyZWN0aW9uMikge1xyXG4gICAgdmFyIHgsIHk7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbjIuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gZGlyZWN0aW9uMi5iO1xyXG4gICAgICAgIHkgPSBkaXJlY3Rpb24xLmsgKiBkaXJlY3Rpb24xLmRpciAqIHggKyBkaXJlY3Rpb24xLmI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHggPSAoZGlyZWN0aW9uMi5iIC0gZGlyZWN0aW9uMS5iKSAvIChkaXJlY3Rpb24xLmRpciAqIGRpcmVjdGlvbjEuayAtIGRpcmVjdGlvbjIuZGlyICogZGlyZWN0aW9uMi5rKTtcclxuICAgICAgICB5ID0gZGlyZWN0aW9uMS5rICogZGlyZWN0aW9uMS5kaXIgKiB4ICsgZGlyZWN0aW9uMS5iO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICAoIW9iaikgJiYgKG9iaiA9IHt9KTtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBMaW5lIDogTGluZSxcclxuICAgIFBvaW50IDogUG9pbnQsXHJcbiAgICBlbGxpcHNlOiBlbGxpcHNlLFxyXG4gICAgZ2V0UmFkaWFuczogZ2V0UmFkaWFucyxcclxuICAgICdjb2xsaWRlcyc6IGNvbGxpZGVzLFxyXG4gICAgJ2JveENvbGxpZGVzJzogYm94Q29sbGlkZXMsXHJcbiAgICAnZ2V0RGVncmVlJzogZ2V0RGVncmVlLFxyXG4gICAgJ25leHRQb3NpdGlvbic6IG5leHRQb3NpdGlvbixcclxuICAgIGdldFNwZWVkOiBnZXRTcGVlZCxcclxuICAgICdnZXREZXN0aW5hdGlvbic6IGdldERlc3RpbmF0aW9uLFxyXG4gICAgJ2dldERpcmVjdGlvbic6IGdldERpcmVjdGlvbixcclxuICAgIGdldERlZ3JlZXM6IGdldERlZ3JlZXMsXHJcbiAgICBnZXREaXN0YW5jZSA6IGdldERpc3RhbmNlLFxyXG4gICAgZ2V0UG9pbnRPZkludGVyY2VwdGlvbixnZXRQb2ludE9mSW50ZXJjZXB0aW9uLFxyXG4gICAgZ2V0RGVncmVlQmV0d2VlbkRpcmVjdGlvbnM6IGdldERlZ3JlZUJldHdlZW5EaXJlY3Rpb25zLFxyXG4gICAgY2xvbmU6IGNsb25lLFxyXG4gICAgJ2dldE1vdmVkUG9pbnRCeURlZ3JlZSc6IGdldE1vdmVkUG9pbnRCeURlZ3JlZVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3V0aWxzLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gVmljdG9yO1xuXG4vKipcbiAqICMgVmljdG9yIC0gQSBKYXZhU2NyaXB0IDJEIHZlY3RvciBjbGFzcyB3aXRoIG1ldGhvZHMgZm9yIGNvbW1vbiB2ZWN0b3Igb3BlcmF0aW9uc1xuICovXG5cbi8qKlxuICogQ29uc3RydWN0b3IuIFdpbGwgYWxzbyB3b3JrIHdpdGhvdXQgdGhlIGBuZXdgIGtleXdvcmRcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gVmljdG9yKDQyLCAxMzM3KTtcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBWYWx1ZSBvZiB0aGUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0geSBWYWx1ZSBvZiB0aGUgeSBheGlzXG4gKiBAcmV0dXJuIHtWaWN0b3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBWaWN0b3IgKHgsIHkpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFZpY3RvcikpIHtcblx0XHRyZXR1cm4gbmV3IFZpY3Rvcih4LCB5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgWCBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLng7XG5cdCAqICAgICAvLyA9PiA0MlxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy54ID0geCB8fCAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgWSBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLnk7XG5cdCAqICAgICAvLyA9PiAyMVxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy55ID0geSB8fCAwO1xufTtcblxuLyoqXG4gKiAjIFN0YXRpY1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBmcm9tIGFuIGFycmF5XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbUFycmF5KFs0MiwgMjFdKTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFycmF5IHdpdGggdGhlIHggYW5kIHkgdmFsdWVzIGF0IGluZGV4IDAgYW5kIDEgcmVzcGVjdGl2ZWx5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IFRoZSBuZXcgaW5zdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKGFyclswXSB8fCAwLCBhcnJbMV0gfHwgMCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBvYmplY3RcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IFZpY3Rvci5mcm9tT2JqZWN0KHsgeDogNDIsIHk6IDIxIH0pO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjQyLCB5OjIxXG4gKlxuICogQG5hbWUgVmljdG9yLmZyb21PYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHdpdGggdGhlIHZhbHVlcyBmb3IgeCBhbmQgeVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIG5ldyBWaWN0b3Iob2JqLnggfHwgMCwgb2JqLnkgfHwgMCk7XG59O1xuXG4vKipcbiAqICMgTWFuaXB1bGF0aW9uXG4gKlxuICogVGhlc2UgZnVuY3Rpb25zIGFyZSBjaGFpbmFibGUuXG4gKi9cblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWCBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFgodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6MTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IncyBZIGF4aXMgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkWSh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeTo0MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCB0byBhZGQgdG8gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGQodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ICs9IHZlYy54O1xuXHR0aGlzLnkgKz0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gYm90aCB2ZWN0b3IgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAzLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHRoaXMueSArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogMlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgdGhlIGdpdmVuIHNjYWxhciB0byB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEsIDIpO1xuICpcbiAqICAgICB2ZWMuYWRkU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAxLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBYIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggLT0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIFkgYXhpcyBvZiBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5zdWJ0cmFjdFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3QodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6ODAsIHk6MjBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhcigyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogODAsIHk6IDE4MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdFNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclgoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAyMDBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjLnN1YnRyYWN0U2NhbGFyWSgyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMTAwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSB4IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVYID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggLz0gdmVjdG9yLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIHRoZSBZIGF4aXMgYnkgdGhlIHkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5kaXZpZGVZKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgYSBheGlzIHZhbHVlcyBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6MjVcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnkgLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFgoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4Oi0xMDAsIHk6NTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFggPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFkoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFkgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueSAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgYm90aCBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuaW52ZXJ0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5Oi01MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLmludmVydFgoKTtcblx0dGhpcy5pbnZlcnRZKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgWCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5WCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IFkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdmFsdWVzIGZyb20gYSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHkodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggKj0gdmVjdG9yLng7XG5cdHRoaXMueSAqPSB2ZWN0b3IueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgYm90aCB2ZWN0b3IgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAqPSBzY2FsYXI7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMueCA9IDE7XG5cdFx0dGhpcy55ID0gMDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRpdmlkZShWaWN0b3IobGVuZ3RoLCBsZW5ndGgpKTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUubm9ybSA9IFZpY3Rvci5wcm90b3R5cGUubm9ybWFsaXplO1xuXG4vKipcbiAqIElmIHRoZSBhYnNvbHV0ZSB2ZWN0b3IgYXhpcyBpcyBncmVhdGVyIHRoYW4gYG1heGAsIG11bHRpcGxpZXMgdGhlIGF4aXMgYnkgYGZhY3RvcmBcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5saW1pdCg4MCwgMC45KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjkwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBmb3IgYm90aCB4IGFuZCB5IGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgRmFjdG9yIGJ5IHdoaWNoIHRoZSBheGlzIGFyZSB0byBiZSBtdWx0aXBsaWVkIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobWF4LCBmYWN0b3IpIHtcblx0aWYgKE1hdGguYWJzKHRoaXMueCkgPiBtYXgpeyB0aGlzLnggKj0gZmFjdG9yOyB9XG5cdGlmIChNYXRoLmFicyh0aGlzLnkpID4gbWF4KXsgdGhpcy55ICo9IGZhY3RvcjsgfVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyBib3RoIHZlY3RvciBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NjcsIHk6NzNcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR0aGlzLnJhbmRvbWl6ZVgodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21pemVzIHRoZSB5IGF4aXMgd2l0aCBhIHZhbHVlIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplWChuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTUsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVggPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueCwgYm90dG9tUmlnaHQueCk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR0aGlzLnggPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVkobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo2NlxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplWSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR2YXIgbWluID0gTWF0aC5taW4odG9wTGVmdC55LCBib3R0b21SaWdodC55KTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHRoaXMueSA9IHJhbmRvbShtaW4sIG1heCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21seSByYW5kb21pemVzIGVpdGhlciBheGlzIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplQW55KG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo3N1xuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplQW55ID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdGlmICghISBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpKSB7XG5cdFx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGFuIGludGVnZXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS51bmZsb2F0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG5cdHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdW5kcyBib3RoIGF4aXMgdG8gYSBjZXJ0YWluIHByZWNpc2lvblxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAuMiwgNTAuOSk7XG4gKlxuICogICAgIHZlYy51bmZsb2F0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NTFcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gUHJlY2lzaW9uIChkZWZhdWx0OiA4KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b0ZpeGVkID0gZnVuY3Rpb24gKHByZWNpc2lvbikge1xuXHRpZiAodHlwZW9mIHByZWNpc2lvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgcHJlY2lzaW9uID0gODsgfVxuXHR0aGlzLnggPSB0aGlzLngudG9GaXhlZChwcmVjaXNpb24pO1xuXHR0aGlzLnkgPSB0aGlzLnkudG9GaXhlZChwcmVjaXNpb24pO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBYIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhYID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueCA9ICgxIC0gYW1vdW50KSAqIHRoaXMueCArIGFtb3VudCAqIHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBZIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WSh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhZID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueSA9ICgxIC0gYW1vdW50KSAqIHRoaXMueSArIGFtb3VudCAqIHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXggPSBmdW5jdGlvbiAodmVjLCBhbW91bnQpIHtcblx0dGhpcy5taXhYKHZlYywgYW1vdW50KTtcblx0dGhpcy5taXhZKHZlYywgYW1vdW50KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICMgUHJvZHVjdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY2xvbmUoKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IEEgY2xvbmUgb2YgdGhlIHZlY3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIG5ldyBWaWN0b3IodGhpcy54LCB0aGlzLnkpO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBYIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WCh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFkgY29tcG9uZW50IGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHlZKHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSA9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBhbmQgWSBjb21wb25lbnRzIGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHkodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjIwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLmNvcHlYKHZlYyk7XG5cdHRoaXMuY29weVkodmVjKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZlY3RvciB0byB6ZXJvICgwLDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICpcdFx0IHZhcjEuemVybygpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjAsIHk6MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuemVybyA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gdGhpcy55ID0gMDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZG90KHZlYzIpO1xuICogICAgIC8vID0+IDIzMDAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEb3QgcHJvZHVjdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gdGhpcy54ICogdmVjMi54ICsgdGhpcy55ICogdmVjMi55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uICh2ZWMyKSB7XG5cdHJldHVybiAodGhpcy54ICogdmVjMi55ICkgLSAodGhpcy55ICogdmVjMi54ICk7XG59O1xuXG4vKipcbiAqIFByb2plY3RzIGEgdmVjdG9yIG9udG8gYW5vdGhlciB2ZWN0b3IsIHNldHRpbmcgaXRzZWxmIHRvIHRoZSByZXN1bHQuXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqXG4gKiAgICAgdmVjLnByb2plY3RPbnRvKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gcHJvamVjdCB0aGlzIHZlY3RvciBvbnRvXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnByb2plY3RPbnRvID0gZnVuY3Rpb24gKHZlYzIpIHtcbiAgICB2YXIgY29lZmYgPSAoICh0aGlzLnggKiB2ZWMyLngpKyh0aGlzLnkgKiB2ZWMyLnkpICkgLyAoKHZlYzIueCp2ZWMyLngpKyh2ZWMyLnkqdmVjMi55KSk7XG4gICAgdGhpcy54ID0gY29lZmYgKiB2ZWMyLng7XG4gICAgdGhpcy55ID0gY29lZmYgKiB2ZWMyLnk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZURlZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHJhZGlhbjJkZWdyZWVzKHRoaXMuaG9yaXpvbnRhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLngsIHRoaXMueSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnZlcnRpY2FsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLnZlcnRpY2FsQW5nbGUoKSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGU7XG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlRGVnID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWc7XG5WaWN0b3IucHJvdG90eXBlLmRpcmVjdGlvbiA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHR2YXIgbnggPSAodGhpcy54ICogTWF0aC5jb3MoYW5nbGUpKSAtICh0aGlzLnkgKiBNYXRoLnNpbihhbmdsZSkpO1xuXHR2YXIgbnkgPSAodGhpcy54ICogTWF0aC5zaW4oYW5nbGUpKSArICh0aGlzLnkgKiBNYXRoLmNvcyhhbmdsZSkpO1xuXG5cdHRoaXMueCA9IG54O1xuXHR0aGlzLnkgPSBueTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlRGVnID0gZnVuY3Rpb24gKGFuZ2xlKSB7XG5cdGFuZ2xlID0gZGVncmVlczJyYWRpYW4oYW5nbGUpO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUbyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJldHVybiB0aGlzLnJvdGF0ZShyb3RhdGlvbi10aGlzLmFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUb0RlZyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVUbyhyb3RhdGlvbik7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5ID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHZhciBhbmdsZSA9IHRoaXMuYW5nbGUoKSArIHJvdGF0aW9uO1xuXG5cdHJldHVybiB0aGlzLnJvdGF0ZShhbmdsZSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5RGVnID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVCeShyb3RhdGlvbik7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWCh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiB0aGlzLnggLSB2ZWMueDtcbn07XG5cbi8qKlxuICogU2FtZSBhcyBgZGlzdGFuY2VYKClgIGJ1dCBhbHdheXMgcmV0dXJucyBhbiBhYnNvbHV0ZSBudW1iZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5hYnNEaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWCh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgdGhlIFkgYXhpcyBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IC0xMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy55IC0gdmVjLnk7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWSgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IDEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDAuNDk4NzU2MjExMjA4OVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2UgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxKHZlYykpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VTcSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VTcSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dmFyIGR4ID0gdGhpcy5kaXN0YW5jZVgodmVjKSxcblx0XHRkeSA9IHRoaXMuZGlzdGFuY2VZKHZlYyk7XG5cblx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb3IgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGgoKTtcbiAqICAgICAvLyA9PiAxMTEuODAzMzk4ODc0OTg5NDhcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IExlbmd0aCAvIE1hZ25pdHVkZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKTtcbn07XG5cbi8qKlxuICogU3F1YXJlZCBsZW5ndGggLyBtYWduaXR1ZGVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGhTcSgpO1xuICogICAgIC8vID0+IDEyNTAwXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoU3EgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IFZpY3Rvci5wcm90b3R5cGUubGVuZ3RoO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHZlY3RvciBpcyAoMCwgMClcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmVjLnplcm8oKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgdGhlIHNhbWUgYXMgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYzEuaXNFcXVhbFRvKHZlYzIpO1xuICpcbiAqICAgICAvLyA9PiB0cnVlXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaXNFcXVhbFRvID0gZnVuY3Rpb24odmVjMikge1xuXHRyZXR1cm4gdGhpcy54ID09PSB2ZWMyLnggJiYgdGhpcy55ID09PSB2ZWMyLnk7XG59O1xuXG4vKipcbiAqICMgVXRpbGl0eSBNZXRob2RzXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gJ3g6JyArIHRoaXMueCArICcsIHk6JyArIHRoaXMueTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b0FycmF5KCk7XG4gKiAgICAgLy8gPT4gWzEwLCAyMF1cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9PYmplY3QoKTtcbiAqICAgICAvLyA9PiB7IHg6IDEwLCB5OiAyMCB9XG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfTtcbn07XG5cblxudmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5mdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmZ1bmN0aW9uIHJhZGlhbjJkZWdyZWVzIChyYWQpIHtcblx0cmV0dXJuIHJhZCAqIGRlZ3JlZXM7XG59XG5cbmZ1bmN0aW9uIGRlZ3JlZXMycmFkaWFuIChkZWcpIHtcblx0cmV0dXJuIGRlZyAvIGRlZ3JlZXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vdmljdG9yL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAyXG4gKiovIiwidmFyIHJlc291cmNlQ2FjaGUgPSB7fSxcclxuICAgIHJlYWR5Q2FsbGJhY2s7XHJcblxyXG4vLyBMb2FkIGFuIGltYWdlIHVybCBvciBhbiBhcnJheSBvZiBpbWFnZSB1cmxzXHJcbmZ1bmN0aW9uIGxvYWQodXJsT3JBcnIpIHtcclxuICAgIGlmICh1cmxPckFyciBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgdXJsT3JBcnIuZm9yRWFjaChmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIF9sb2FkKHVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbG9hZCh1cmxPckFycik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9sb2FkKHVybCkge1xyXG4gICAgaWYgKHJlc291cmNlQ2FjaGVbdXJsXSkge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNhY2hlW3VybF07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gaW1nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlDYWxsYmFjaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGZhbHNlO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldCh1cmwpIHtcclxuICAgIHJldHVybiByZXNvdXJjZUNhY2hlW3VybF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgICB2YXIgcmVhZHkgPSB0cnVlO1xyXG4gICAgZm9yICh2YXIgayBpbiByZXNvdXJjZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKHJlc291cmNlQ2FjaGUuaGFzT3duUHJvcGVydHkoaykgJiYgIXJlc291cmNlQ2FjaGVba10pIHtcclxuICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVhZHk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uUmVhZHkoZnVuYykge1xyXG4gICAgcmVhZHlDYWxsYmFjayA9IGZ1bmM7XHJcbn1cclxuXHJcbnZhciByZXNvdXJjZXMgPSB7XHJcbiAgICBsb2FkOiBsb2FkLFxyXG4gICAgZ2V0OiBnZXQsXHJcbiAgICBvblJlYWR5OiBvblJlYWR5LFxyXG4gICAgaXNSZWFkeTogaXNSZWFkeVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzb3VyY2VzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9yZXNvdXJjZXMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBtb3VzZShjYW52YXMpIHtcclxuICAgICAgICAvLyBISVRURVNUOiBUbyBjb252ZXJ0IHRoZSBtb3VzZSBwb3NpdGlvbiB0byBiZSBjYW52YXMgcmVsYXRpdmUuXHJcbiAgICAgICAgLy8gQkVHSU4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTE0NDY1L2dldHRpbmctbW91c2UtbG9jYXRpb24taW4tY2FudmFzXHJcbiAgICB2YXIgc3R5bGVQYWRkaW5nTGVmdCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ0xlZnQnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVQYWRkaW5nVG9wID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nVG9wJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlQm9yZGVyTGVmdCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyTGVmdFdpZHRoJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlQm9yZGVyVG9wID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydib3JkZXJUb3BXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICAvLyBTb21lIHBhZ2VzIGhhdmUgZml4ZWQtcG9zaXRpb24gYmFycyAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKSBhdCB0aGUgdG9wIG9yIGxlZnQgb2YgdGhlIHBhZ2VcclxuICAgICAgICAvLyBUaGV5IHdpbGwgbWVzcyB1cCBtb3VzZSBjb29yZGluYXRlcyBhbmQgdGhpcyBmaXhlcyB0aGF0XHJcbiAgICAgICAgaHRtbCA9IGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZSxcclxuICAgICAgICBodG1sVG9wID0gaHRtbC5vZmZzZXRUb3AsXHJcbiAgICAgICAgaHRtbExlZnQgPSBodG1sLm9mZnNldExlZnQsXHJcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgdXRpbHMuUG9pbnQoMCwgMCksXHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBwb3MgPSBnZXRQcm9wZXJQb3NpdGlvbihlKTtcclxuXHJcbiAgICAgICAgcG9zaXRpb24ueCA9IHBvcy54O1xyXG4gICAgICAgIHBvc2l0aW9uLnkgPSBwb3MueTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIGdldFByb3BlclBvc2l0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGNhbnZhcyxcclxuICAgICAgICAgICAgb2Zmc2V0WCA9IDAsXHJcbiAgICAgICAgICAgIG9mZnNldFkgPSAwLFxyXG4gICAgICAgICAgICBteCwgbXk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHRvdGFsIG9mZnNldC4gSXQncyBwb3NzaWJsZSB0byBjYWNoZSB0aGlzIGlmIHlvdSB3YW50XHJcbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgcGFkZGluZyBhbmQgYm9yZGVyIHN0eWxlIHdpZHRocyB0byBvZmZzZXRcclxuICAgICAgICAvLyBBbHNvIGFkZCB0aGUgPGh0bWw+IG9mZnNldHMgaW4gY2FzZSB0aGVyZSdzIGEgcG9zaXRpb246Zml4ZWQgYmFyIChsaWtlIHRoZSBzdHVtYmxldXBvbiBiYXIpXHJcbiAgICAgICAgLy8gVGhpcyBwYXJ0IGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnksIGl0IGRlcGVuZHMgb24geW91ciBzdHlsaW5nXHJcbiAgICAgICAgb2Zmc2V0WCArPSBzdHlsZVBhZGRpbmdMZWZ0ICsgc3R5bGVCb3JkZXJMZWZ0ICsgaHRtbExlZnQ7XHJcbiAgICAgICAgb2Zmc2V0WSArPSBzdHlsZVBhZGRpbmdUb3AgKyBzdHlsZUJvcmRlclRvcCArIGh0bWxUb3A7XHJcblxyXG4gICAgICAgIG14ID0gZS5wYWdlWCAtIG9mZnNldFg7XHJcbiAgICAgICAgbXkgPSBlLnBhZ2VZIC0gb2Zmc2V0WTtcclxuXHJcbiAgICAgICAgLy8gV2UgcmV0dXJuIGEgc2ltcGxlIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggeCBhbmQgeSBkZWZpbmVkXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogbXgsXHJcbiAgICAgICAgICAgIHk6IG15XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc01vdXNlRG93bjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1vdXNlUG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb3VzZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvbW91c2UuanNcbiAqKi8iLCJ2YXIgcHJlc3NlZEtleXMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHNldEtleShldmVudCwgc3RhdHVzKSB7XHJcbiAgICBwcmVzc2VkS2V5c1tldmVudC5rZXlDb2RlXSA9IHN0YXR1cztcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzZXRLZXkoZSwgdHJ1ZSk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2V0S2V5KGUsIGZhbHNlKTtcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHByZXNzZWRLZXlzID0ge307XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Rvd24oa2V5KSB7XHJcbiAgICByZXR1cm4gcHJlc3NlZEtleXNba2V5XTtcclxufVxyXG5cclxudmFyIGlucHV0ID0ge1xyXG4gICAgcHJlc3NlZEtleXM6IHByZXNzZWRLZXlzLFxyXG4gICAgcmVzZXQ6IHJlc2V0LFxyXG4gICAgaXNEb3duOiBpc0Rvd25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlucHV0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbnB1dC5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCByZW5kZXJzIGZyb20gJy4vcmVuZGVyZXJzJztcclxuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5mdW5jdGlvbiBHYW1lT2JqZWN0KGNvbmZpZykge1xyXG4gICAgaWYgKGNvbmZpZy5wb3MgaW5zdGFuY2VvZiB1dGlscy5Qb2ludCkge1xyXG4gICAgICAgIHRoaXMucG9zID0gY29uZmlnLnBvcy5jbG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBvcyA9IG5ldyB1dGlscy5Qb2ludChjb25maWcucG9zKTtcclxuICAgIH1cclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zcHJpdGUpIHtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoY29uZmlnLnNwcml0ZVswXSwgY29uZmlnLnNwcml0ZVsxXSwgY29uZmlnLnNwcml0ZVsyXSwgY29uZmlnLnNwcml0ZVszXSwgY29uZmlnLnNwcml0ZVs0XSwgY29uZmlnLnNwcml0ZVs1XSwgY29uZmlnLnNwcml0ZVs2XSwgY29uZmlnLnNwcml0ZVs3XSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgdGhpcy5zcHJpdGUuc2l6ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY29sbGlzaW9ucyA9IGNvbmZpZy5jb2xsaXNpb25zO1xyXG4gICAgdGhpcy5jYWxsYmFja3MgPSBjb25maWcuY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgdGhpcy56SW5kZXggPSBjb25maWcuekluZGV4IHx8IDA7XHJcbiAgICB2YXIgcGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9LFxyXG4gICAgICAgIF9wYXJhbWV0ZXJzID0gY29uZmlnLnBhcmFtZXRlcnMgfHwge307XHJcblxyXG4gICAgdGhpcy5nZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJzW2lkXTtcclxuICAgIH07XHJcbiAgICB0aGlzLnNldFBhcmFtZXRlciA9IGZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xyXG4gICAgICAgIHBhcmFtZXRlcnNbaWRdID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtZXRlcnNbaWRdO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0RGVmYXVsdFBhcmFtZXRlciA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9wYXJhbWV0ZXJzW2lkXTtcclxuICAgIH07XHJcblxyXG4gICAgLyp0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBjb25maWcucGFyYW1ldGVyczsqL1xyXG4gICAgdGhpcy5ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmZpZy5jb25kaXRpb25zIHx8IFtdO1xyXG4gICAgdGhpcy5fdXBkYXRlID0gY29uZmlnLnVwZGF0ZTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnJlbmRlcikge1xyXG4gICAgICAgIGlmIChyZW5kZXJzW2NvbmZpZy5yZW5kZXJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUmVuZGVyID0gcmVuZGVyc1tjb25maWcucmVuZGVyXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlciA9IGNvbmZpZy5yZW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUub2JqZWN0Q291bnQgPSAwO1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHZhciBjdHggPSB0aGlzLmxheWVyLmN0eDtcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKE1hdGgucm91bmQodGhpcy5wb3MueCksIE1hdGgucm91bmQodGhpcy5wb3MueSkpO1xyXG5cclxuICAgIGlmICh0aGlzLmN1c3RvbVJlbmRlcikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY3VzdG9tUmVuZGVyKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VzdG9tUmVuZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlcltpXSh0aGlzLCBkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlcih0aGlzLCBkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZW5kZXJzLnNwcml0ZSh0aGlzLCBkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzLFxyXG4gICAgICAgICAgICBjb25kaXRpb25zID0gdGhpcy5jb25kaXRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb2xsaXNpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IG5ldyBHYW1lUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uWydjb2xsaXNpb25zJ10pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGNvbmRpdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29uZGl0aW9uKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bY29uZGl0aW9uc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ydWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudXBkYXRlQ29uZGl0aW9ucyA9IGZ1bmN0aW9uKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29uZGl0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3JlbW92ZUluTmV4dFRpY2spIHtcclxuICAgICAgICBpZiAodGhpcy5jb2xsaXNpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnJlbW92ZU9iamVjdCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSW5OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy5wb3MueCA9IHBvaW50Lng7XHJcbiAgICB0aGlzLnBvcy55ID0gcG9pbnQueTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRDb25kaXRpb24gPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5jb25kaXRpb25zLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb25kaXRpb24gPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBjb25kaXRpb24uc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBjb25kaXRpb24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9ucy5wdXNoKGNvbmRpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudXBkYXRlQ29sbGlzaW9ucyA9IGZ1bmN0aW9uKGR0KSB7XHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgJiYgdGhpcy5jb2xsaXNpb25zLnVwZGF0ZShkdCwgdGhpcyk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lUnVsZShjb25maWcpIHtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gdXRpbHMuY2xvbmUodGhpcy5wYXJhbWV0ZXJzKTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZVJ1bGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lUnVsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoZHQsIG9iaik7XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS5zZXRDb250ZXh0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lTGF5ZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLm9iamVjdENvdW50ID0gMDtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmluaXRMaXN0ID0gY29uZmlnLmluaXRMaXN0O1xyXG4gICAgdGhpcy5nYW1lID0gY29uZmlnLmdhbWU7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmN0eC5jcmVhdGVQYXR0ZXJuKHJlc291cmNlcy5nZXQoY29uZmlnLmJhY2tncm91bmQpLCAncmVwZWF0Jyk7XHJcbiAgICB0aGlzLnBvcyA9IGNvbmZpZy5wb3MgPyBuZXcgdXRpbHMuUG9pbnQoY29uZmlnLnBvcykgOiBuZXcgdXRpbHMuUG9pbnQoMCwgMCk7XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCBbY29uZmlnLmN0eC5jYW52YXMud2lkdGgsIGNvbmZpZy5jdHguY2FudmFzLmhlaWdodF07XHJcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IGNvbmZpZy50cmFuc2xhdGUgfHwge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwXHJcbiAgICAgICAgfTtcclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgdGhpcy5vYmplY3RzID0ge307XHJcbiAgICB0aGlzLl9ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZUxheWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbml0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9iamVjdCh0aGlzLmdhbWUuZ2V0Q29uZmlnKHRoaXMuaW5pdExpc3RbaV0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcztcclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgYXJyID0gW10sXHJcbiAgICAgICAgY3R4ID0gdGhpcy5jdHgsXHJcbiAgICAgICAgY2FudmFzID0gY3R4LmNhbnZhcztcclxuXHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LmNsaXAoKTtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy50cmFuc2xhdGUueCwgdGhpcy50cmFuc2xhdGUueSk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuc2l6ZVswXSArIDUsIHRoaXMuc2l6ZVsxXSArIDUgKTtcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSkgfHwgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSA9IFtdKTtcclxuICAgICAgICAgICAgYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdLnB1c2godGhpcy5vYmplY3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gYXJyW2ldLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2ldW2pdLnJlbmRlcihkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnRyYW5zbGF0ZS54LCAtdGhpcy50cmFuc2xhdGUueSk7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ2JsYWNrJztcclxuICAgIGN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFggPSAwO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFkgPSAwO1xyXG4gICAgY3R4LnJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlQ29sbGlzaW9ucyhkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nYW1lLmNvbGxpc2lvbnMuY2hlY2soKTtcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGVDb25kaXRpb25zKGR0KTtcclxuICAgIH1cclxuXHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVPYmplY3QgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpZF0udHlwZSAmJiB0aGlzLm9iamVjdHNbaWRdLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1t0aGlzLm9iamVjdHNbaWRdLnR5cGVdLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uc3BsaWNlKHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLmluZGV4T2YoaWQpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2lkXSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub2JqZWN0c1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgLyppZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdPYmplY3Qgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcjogJywgY29uZmlnLmlkKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9Ki9cclxuXHJcbiAgICB2YXIgX29iaiA9IG5ldyBHYW1lT2JqZWN0KGNvbmZpZyk7XHJcbiAgICBfb2JqLnNldExheWVyKHRoaXMpO1xyXG4gICAgX29iai5pbml0KCk7XHJcblxyXG4gICAgaWYgKGNvbmZpZy50eXBlICYmIGNvbmZpZy50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICghdGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSkgJiYgKHRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0gPSBbXSk7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXS5wdXNoKF9vYmouaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5wdXNoKF9vYmouaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vYmplY3RzW19vYmouaWRdID0gX29iajtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5vYmplY3RzW19vYmouaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT2JqZWN0KG9ialtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRPYmplY3RzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0T2JqZWN0c0J5VHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICB2YXIgb2JqZWN0c0lkID0gdGhpcy5zb3J0ZWRPYmplY3RzW3R5cGVdIHx8IFtdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzSWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5vYmplY3RzW29iamVjdHNJZFtpXV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5ydWxlc1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucG9zLnggKyB0aGlzLnNpemVbMF0sIHRoaXMucG9zLnkgKyB0aGlzLnNpemVbMV1dO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZVdpbmRvdyhjb25maWcpIHtcclxuICAgIHRoaXMubGF5ZXJzID0ge307XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNvbmZpZy5jYW52YXM7XHJcbiAgICB0aGlzLl9jdHggPSBjb25maWcuX2N0eDtcclxuICAgIHRoaXMuX2NhbnZhcyA9IGNvbmZpZy5fY2FudmFzO1xyXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29uZmlnLmNvbGxpc2lvbnM7XHJcbiAgICB0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcbiAgICB0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuICAgIHRoaXMubGF5ZXJzRGVmaW5pdGlvbiA9IGNvbmZpZy5sYXllcnM7XHJcbiAgICB0aGlzLmlucHV0ID0gY29uZmlnLmlucHV0O1xyXG4gICAgdGhpcy5tb3VzZSA9IGNvbmZpZy5tb3VzZTtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSA/IHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIDogMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS51cGRhdGUoZHQpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS5yZW5kZXIoZHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuX2NhbnZhcywgMCwgMCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXJzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmFkZExheWVyKG9ialtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkTGF5ZXJzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmICh0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShvYmouaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTGF5ZXIgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyB3aW5kb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9iai5jdHggPSB0aGlzLl9jdHg7XHJcbiAgICAgICAgb2JqLmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubGF5ZXJzW29iai5pZF0gPSBuZXcgR2FtZUxheWVyKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzW29iai5pZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IHV0aWxzLmNsb25lKHRoaXMub2JqZWN0c0RlZmluaXRpb25baWRdKTtcclxuXHJcbiAgICAoIWNvbmZpZy5pZCkgJiYgKGNvbmZpZy5pZCA9IGlkKTtcclxuXHJcbiAgICBjb25maWcuaWQgKz0gKHRoaXMub2JqZWN0Q291bnQrKykgKyBNYXRoLnJvdW5kKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyBNYXRoLnJhbmRvbSgpICogMTAwMDAwMSk7XHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllckNvbmZpZyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLm9iamVjdENvdW50PSAwO1xyXG5leHBvcnQgZGVmYXVsdCBHYW1lV2luZG93XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL29iamVjdHMuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gaGVhbHRoQmFyKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4LFxyXG4gICAgICAgIHggPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiApLFxyXG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiAtIDcpLFxyXG4gICAgICAgIHdpZHRoID0gb2JqLnNwcml0ZS5zaXplWzBdLFxyXG4gICAgICAgIGhlaWdodCA9IDM7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1xyXG5cclxuICAgIGlmICgob2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykgPiAwKSAmJiAob2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpID4gb2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykpKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDI1MCwgMCwgMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDI1MCwgMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgTWF0aC5yb3VuZCh3aWR0aCAqIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAvIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkpLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gc3ByaXRlKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4O1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICBkdCAmJiBvYmouc3ByaXRlLnVwZGF0ZShkdCk7XHJcbiAgICBvYmouc3ByaXRlLnJlbmRlcihjdHgpO1xyXG59XHJcbmZ1bmN0aW9uIHNoYWRvdyhvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjU7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgdXRpbHMuZWxsaXBzZShjdHgsIDAgLCArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgLSAzLCBvYmouc3ByaXRlLnNpemVbMF0gLyAyLCA1LCB1dGlscy5nZXRSYWRpYW5zKDApLCB1dGlscy5nZXRSYWRpYW5zKDApLCB1dGlscy5nZXRSYWRpYW5zKDM2MCkpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XHJcbiAgICBjdHguZmlsbCgpO1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gZWZmZWN0cyhvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICBlZmZlY3RzID0gb2JqLmdldFBhcmFtZXRlcignZWZmZWN0cycpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWZmZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBlZmZlY3QgPSBlZmZlY3RzW2ldO1xyXG4gICAgICAgIGlmIChlZmZlY3QgPT0gJ2Zyb3plbicpIHtcclxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC44O1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJlc291cmNlcy5nZXQoJ2ltZy9mcm9zdGVmZmVjdC5wbmcnKSwgLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyLCAtOCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9iamVjdFJlbmRlcmVyKG9iaiwgZHQpIHtcclxuICAgIHNoYWRvdyhvYmosIGR0KTtcclxuICAgIHNwcml0ZShvYmosIGR0KTtcclxufVxyXG5mdW5jdGlvbiB1bml0UmVuZGVyZXIob2JqLCBkdCkge1xyXG4gICAgc2hhZG93KG9iaiwgZHQpO1xyXG4gICAgaGVhbHRoQmFyKG9iaiwgZHQpO1xyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG4gICAgZWZmZWN0cyhvYmosIGR0KTtcclxufVxyXG5mdW5jdGlvbiBzcGVsbFJlbmRlcmVyKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4LFxyXG4gICAgICAgIHggPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiAtIDQpLFxyXG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiAtIDQpLFxyXG4gICAgICAgIHdpZHRoID0gb2JqLnNwcml0ZS5zaXplWzBdICsgOCxcclxuICAgICAgICBoZWlnaHQgPSBvYmouc3ByaXRlLnNpemVbMV0gKyA4O1xyXG5cclxuICAgIGN0eC50cmFuc2xhdGUoLW9iai5sYXllci50cmFuc2xhdGUueCwgLW9iai5sYXllci50cmFuc2xhdGUueSk7XHJcblxyXG4gICAgaWYgKG9iai5pZC5pbmRleE9mKG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXS5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpKSAhPSAtMSkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAyNTAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggLSAyLCB5IC0gMiwgd2lkdGggKyA0LCBoZWlnaHQgKyA0KTtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuXHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDAsIDApXCI7XHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICBzcHJpdGUob2JqLCBkdCk7XHJcblxyXG4gICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpID4gMCkge1xyXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuODtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjAsIDIwLCAyMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgTWF0aC5yb3VuZCh5ICsgaGVpZ2h0IC0gaGVpZ2h0ICogKG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpIC8gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC50cmFuc2xhdGUob2JqLmxheWVyLnRyYW5zbGF0ZS54LCBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG59XHJcbmZ1bmN0aW9uIHRleHRSZW5kZXIob2JqKSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICBmb250Q29uZmlnID0gJyc7XHJcblxyXG4gICAgY3R4LnRyYW5zbGF0ZSgtb2JqLmxheWVyLnRyYW5zbGF0ZS54LCAtb2JqLmxheWVyLnRyYW5zbGF0ZS55KTtcclxuXHJcbiAgICAob2JqLmdldFBhcmFtZXRlcignc3R5bGUnKSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLmdldFBhcmFtZXRlcignc3R5bGUnKSArIFwiIFwiKTtcclxuICAgIChvYmouZ2V0UGFyYW1ldGVyKCd3ZWlnaHQnKSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLmdldFBhcmFtZXRlcignd2VpZ2h0JykgKyBcIiBcIik7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmouZ2V0UGFyYW1ldGVyKCdzaXplJykgfHwgMzApICsgJ3B0ICc7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmouZ2V0UGFyYW1ldGVyKCdmb250JykgfHwgXCJBcmlhbFwiKTtcclxuXHJcbiAgICBpZiAob2JqLmdldFBhcmFtZXRlcignYWxpZ24nKSkge1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBvYmouZ2V0UGFyYW1ldGVyKCdhbGlnbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5mb250ID0gZm9udENvbmZpZztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xvcicpIHx8IFwiI0ZGRlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KG9iai5nZXRQYXJhbWV0ZXIoJ3RleHQnKSwgb2JqLnBvcy54LCBvYmoucG9zLnkpO1xyXG5cclxuICAgIGN0eC50cmFuc2xhdGUob2JqLmxheWVyLnRyYW5zbGF0ZS54LCBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG59XHJcbmZ1bmN0aW9uIGN1cnNvcihvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHgudHJhbnNsYXRlKC1vYmoubGF5ZXIudHJhbnNsYXRlLngsIC1vYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZShvYmoubGF5ZXIudHJhbnNsYXRlLngsIG9iai5sYXllci50cmFuc2xhdGUueSk7XHJcbn1cclxudmFyIHJlbmRlcnMgPSB7XHJcbiAgICBzaGFkb3c6IHNoYWRvdyxcclxuICAgIGhlYWx0aEJhcjogaGVhbHRoQmFyLFxyXG4gICAgY3Vyc29yOiBjdXJzb3IsXHJcbiAgICBzcHJpdGU6IHNwcml0ZSxcclxuICAgIGVmZmVjdHM6IGVmZmVjdHMsXHJcbiAgICBvYmplY3QgOiBvYmplY3RSZW5kZXJlcixcclxuICAgIHRleHQ6IHRleHRSZW5kZXIsXHJcbiAgICBzcGVsbCA6IHNwZWxsUmVuZGVyZXIsXHJcbiAgICB1bml0OiB1bml0UmVuZGVyZXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbmRlcnM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3JlbmRlcmVycy5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBTcHJpdGUodXJsLCBwb3MsIHNpemUsIHNwZWVkLCBmcmFtZXMsIGRpciwgb25jZSwgZGVncmVlKSB7XHJcbiAgICBpZiAocG9zIGluc3RhbmNlb2YgdXRpbHMuUG9pbnQpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHBvcy5jbG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBvcyA9IG5ldyB1dGlscy5Qb2ludChwb3MpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSB0aGlzLnBvcy5jbG9uZSgpO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMuc3BlZWQgPSB0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInID8gc3BlZWQgOiAwO1xyXG4gICAgdGhpcy5mcmFtZXMgPSB1dGlscy5jbG9uZShmcmFtZXMpO1xyXG4gICAgdGhpcy5faW5kZXggPSAwO1xyXG4gICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB0aGlzLmRpciA9IGRpciB8fCAnaG9yaXpvbnRhbCc7XHJcbiAgICB0aGlzLm9uY2UgPSBvbmNlO1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWUgfHwgMDtcclxufVxyXG5cclxuXHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB0aGlzLl9pbmRleCArPSB0aGlzLnNwZWVkICogZHQ7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5wb3MgJiYgKHRoaXMucG9zID0gY29uZmlnLnBvcyk7XHJcbiAgICAgICAgY29uZmlnLnNpemUgJiYgKHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplKTtcclxuICAgICAgICBjb25maWcuc3BlZWQgJiYgKHRoaXMuc3BlZWQgPSB0eXBlb2YgY29uZmlnLnNwZWVkID09PSAnbnVtYmVyJyA/IGNvbmZpZy5zcGVlZCA6IDApO1xyXG4gICAgICAgIGNvbmZpZy5mcmFtZXMgJiYgKHRoaXMuZnJhbWVzID0gY29uZmlnLmZyYW1lcyk7XHJcbiAgICAgICAgY29uZmlnLnVybCAmJiAodGhpcy51cmwgPSBjb25maWcudXJsKTtcclxuICAgICAgICBjb25maWcuZGlyICYmICh0aGlzLmRpciA9IGNvbmZpZy5kaXIpO1xyXG4gICAgICAgIGNvbmZpZy5vbmNlICYmICh0aGlzLm9uY2UgPSBjb25maWcub25jZSk7XHJcbiAgICAgICAgY29uZmlnLmRlZ3JlZSAmJiAodGhpcy5kZWdyZWUgPSBjb25maWcuZGVncmVlKTtcclxuICAgIH1cclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yb3RhdGVUb0RpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIHZhciBwb3MgPSB0aGlzLmRlZmF1bHRQb3NpdGlvbixcclxuICAgICAgICBjb25maWcgPSB7fTtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uLmRpciA9PSAxKSB7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChjb25maWcucG9zID0gW3Bvcy54LCBwb3MueV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoY29uZmlnLnBvcyA9IFtwb3MueCwgcG9zLnkgKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChjb25maWcucG9zID1bcG9zLngsIHBvcy55ICsgdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKCBkaXJlY3Rpb24uayA9PSAndmVydGljYWwnKSAgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnkgKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKCBkaXJlY3Rpb24uayA9PSAnaG9yaXpvbnRhbCcpICAmJiAoY29uZmlnLnBvcyA9W3Bvcy54LCBwb3MueV0pO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24uZGlyID09IC0xKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChjb25maWcucG9zID1bcG9zLngsIHBvcy55ICsgdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChjb25maWcucG9zID1bcG9zLngsIHBvcy55ICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoY29uZmlnLnBvcyA9IFtwb3MueCwgcG9zLnkgKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKCBkaXJlY3Rpb24uayA9PSAndmVydGljYWwnKSAgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnldKTtcclxuICAgICAgICAoIGRpcmVjdGlvbi5rID09ICdob3Jpem9udGFsJykgICYmIChjb25maWcucG9zID1bcG9zLngsIHBvcy55ICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoY29uZmlnLnBvcyk7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbmZpZyhjb25maWcpO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjdHgpIHtcclxuICAgIHZhciBmcmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcclxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBpZHggPSBNYXRoLmZsb29yKHRoaXMuX2luZGV4KTtcclxuICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWVzW2lkeCAlIG1heF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uY2UgJiYgaWR4ID49IG1heCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZnJhbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgeCA9IHRoaXMucG9zLng7XHJcbiAgICB2YXIgeSA9IHRoaXMucG9zLnk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB5ICs9IGZyYW1lICogdGhpcy5zaXplWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeCArPSBmcmFtZSAqIHRoaXMuc2l6ZVswXTtcclxuICAgIH1cclxuXHJcbiAgICBjdHgucm90YXRlKHRoaXMuZGVncmVlKTtcclxuICAgIGN0eC5kcmF3SW1hZ2UocmVzb3VyY2VzLmdldCh0aGlzLnVybCksXHJcbiAgICAgICAgeCwgeSxcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSxcclxuICAgICAgICBNYXRoLnJvdW5kKC10aGlzLnNpemVbMF0gLyAyKSwgTWF0aC5yb3VuZCgtdGhpcy5zaXplWzFdIC8gMiksXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnNldERlZ3JlZSA9IGZ1bmN0aW9uIChkZWdyZWUpIHtcclxuICAgIHRoaXMuZGVncmVlID0gZGVncmVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9zcHJpdGUuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscydcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlKGNvbmZpZykge1xyXG4gICAgdmFyIG4gPSBjb25maWcubiB8fCA2LFxyXG4gICAgICAgIHdpZHRoID0gY29uZmlnLndpZHRoIHx8IDgwMCxcclxuICAgICAgICBoZWlnaHQgPSBjb25maWcuaGVpZ2h0IHx8IDYwMCxcclxuICAgICAgICBzaXplWCA9ICh3aWR0aCkgPj4gbixcclxuICAgICAgICBzaXplWSA9IChoZWlnaHQpID4+IG4sXHJcbiAgICAgICAgY2VsbEdyaWQgPSBuZXcgQXJyYXkoc2l6ZVggKiBzaXplWSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsR3JpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNlbGxHcmlkW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hcCgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxHcmlkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNlbGxHcmlkW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0Q2VsbChwb2ludCkge1xyXG4gICAgICAgIHJldHVybiAocG9pbnRbMF0pICsgcG9pbnRbMV0gKiBzaXplWTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVPYmplY3Qob2JqZWN0KXtcclxuICAgICAgICB2YXIgb2xkQ2VsbHMgPSBvYmplY3QuZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJykuY2VsbHM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dICYmIGNlbGxHcmlkW29sZENlbGxzW2ldXS5zcGxpY2UoY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLmluZGV4T2Yob2JqZWN0KSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICB2YXIgcG9zID0gb2JqZWN0LnBvcyxcclxuICAgICAgICAgICAgc2l6ZSA9IG9iamVjdC5zaXplLFxyXG4gICAgICAgICAgICBwb2ludDEgPSBbKHBvcy54ICsgc2l6ZVswXSAvIDIpID4+IG4sIChwb3MueSArIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQyID0gWyhwb3MueCAtIHNpemVbMF0gLyAyKSA+PiBuLCAocG9zLnkgLSBzaXplWzFdIC8gMikgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50MyA9IFsocG9zLnggKyBzaXplWzBdIC8gMikgPj4gbiwgKHBvcy55IC0gc2l6ZVsxXSAvIDIpID4+IG5dLFxyXG4gICAgICAgICAgICBwb2ludDQgPSBbKHBvcy54IC0gc2l6ZVswXSAvIDIpID4+IG4sIChwb3MueSArIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQ1ID0gW3Bvcy54ID4+IG4sIHBvcy55ID4+IG5dLFxyXG4gICAgICAgICAgICBjZWxscyA9IFtnZXRDZWxsKHBvaW50MSksIGdldENlbGwocG9pbnQyKSwgZ2V0Q2VsbChwb2ludDMpLCBnZXRDZWxsKHBvaW50NCksIGdldENlbGwocG9pbnQ1KV0sXHJcbiAgICAgICAgICAgIG9sZENlbGxzID0gb2JqZWN0LmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLmNlbGxzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZENlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRDZWxsc1tpXSAhPSBjZWxsc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dICYmIGNlbGxHcmlkW29sZENlbGxzW2ldXS5zcGxpY2UoY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLmluZGV4T2Yob2JqZWN0KSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjZWxsR3JpZFtjZWxsc1tpXV0gJiYgKGNlbGxHcmlkW2NlbGxzW2ldXS5pbmRleE9mKG9iamVjdCkgPT0gLTEpICYmIGNlbGxHcmlkW2NlbGxzW2ldXS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBvbGRDZWxsc1tpXSA9IGNlbGxzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2VsbEdyaWRbY2VsbHNbaV1dICYmIChjZWxsR3JpZFtjZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpID09IC0xKSAmJiBjZWxsR3JpZFtjZWxsc1tpXV0ucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzaXplWDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHNpemVZOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsR3JpZFtnZXRDZWxsKFtpLCBqXSldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBjZWxsR3JpZFtnZXRDZWxsKFtpLCBqXSldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBvYmplY3RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gayArIDE7IGwgPCBsZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iamVjdHNba10ucG9zLCBvYmplY3RzW2tdLnNpemUsIG9iamVjdHNbbF0ucG9zLCBvYmplY3RzW2xdLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdHNba10uZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJykuaW5kZXhPZihvYmplY3RzW2xdKSA9PSAtMSApICYmIG9iamVjdHNba10uZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJykucHVzaChvYmplY3RzW2xdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqZWN0c1tsXS5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKS5pbmRleE9mKG9iamVjdHNba10pID09IC0xICkgJiYgb2JqZWN0c1tsXS5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKS5wdXNoKG9iamVjdHNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2VsbEdyaWQ6IGNlbGxHcmlkLFxyXG4gICAgICAgIHVwZGF0ZU9iamVjdDogdXBkYXRlT2JqZWN0LFxyXG4gICAgICAgIHJlbW92ZU9iamVjdDogcmVtb3ZlT2JqZWN0LFxyXG4gICAgICAgIGNoZWNrOiBjaGVja0NvbGxpc2lvbnMsXHJcbiAgICAgICAgY2xlYXI6IGdlbmVyYXRlTWFwXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvY29sbGlzaW9ucy5qc1xuICoqLyIsIi8qIVxuICogIGhvd2xlci5qcyB2MS4xLjI4XG4gKiAgaG93bGVyanMuY29tXG4gKlxuICogIChjKSAyMDEzLTIwMTUsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvc1xuICogIGdvbGRmaXJlc3R1ZGlvcy5jb21cbiAqXG4gKiAgTUlUIExpY2Vuc2VcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gIC8vIHNldHVwXG4gIHZhciBjYWNoZSA9IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBhdWRpbyBjb250ZXh0XG4gIHZhciBjdHggPSBudWxsLFxuICAgIHVzaW5nV2ViQXVkaW8gPSB0cnVlLFxuICAgIG5vQXVkaW8gPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdHggPSBuZXcgd2Via2l0QXVkaW9Db250ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzaW5nV2ViQXVkaW8gPSBmYWxzZTtcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHVzaW5nV2ViQXVkaW8gPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghdXNpbmdXZWJBdWRpbykge1xuICAgIGlmICh0eXBlb2YgQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQXVkaW8oKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBub0F1ZGlvID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9BdWRpbyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbWFzdGVyIGdhaW4gbm9kZVxuICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgIHZhciBtYXN0ZXJHYWluID0gKHR5cGVvZiBjdHguY3JlYXRlR2FpbiA9PT0gJ3VuZGVmaW5lZCcpID8gY3R4LmNyZWF0ZUdhaW5Ob2RlKCkgOiBjdHguY3JlYXRlR2FpbigpO1xuICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IDE7XG4gICAgbWFzdGVyR2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gIH1cblxuICAvLyBjcmVhdGUgZ2xvYmFsIGNvbnRyb2xsZXJcbiAgdmFyIEhvd2xlckdsb2JhbCA9IGZ1bmN0aW9uKGNvZGVjcykge1xuICAgIHRoaXMuX3ZvbHVtZSA9IDE7XG4gICAgdGhpcy5fbXV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnVzaW5nV2ViQXVkaW8gPSB1c2luZ1dlYkF1ZGlvO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMubm9BdWRpbyA9IG5vQXVkaW87XG4gICAgdGhpcy5faG93bHMgPSBbXTtcbiAgICB0aGlzLl9jb2RlY3MgPSBjb2RlY3M7XG4gICAgdGhpcy5pT1NBdXRvRW5hYmxlID0gdHJ1ZTtcbiAgfTtcbiAgSG93bGVyR2xvYmFsLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBnbG9iYWwgdm9sdW1lIGZvciBhbGwgc291bmRzLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2b2wgVm9sdW1lIGZyb20gMC4wIHRvIDEuMC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXIvRmxvYXR9ICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCB2b2x1bWUuXG4gICAgICovXG4gICAgdm9sdW1lOiBmdW5jdGlvbih2b2wpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gbWFrZSBzdXJlIHZvbHVtZSBpcyBhIG51bWJlclxuICAgICAgdm9sID0gcGFyc2VGbG9hdCh2b2wpO1xuXG4gICAgICBpZiAodm9sID49IDAgJiYgdm9sIDw9IDEpIHtcbiAgICAgICAgc2VsZi5fdm9sdW1lID0gdm9sO1xuXG4gICAgICAgIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgICAgICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gdm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNhY2hlIGFuZCBjaGFuZ2Ugdm9sdW1lIG9mIGFsbCBub2RlcyB0aGF0IGFyZSB1c2luZyBIVE1MNSBBdWRpb1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5faG93bHMpIHtcbiAgICAgICAgICBpZiAoc2VsZi5faG93bHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzZWxmLl9ob3dsc1trZXldLl93ZWJBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYXVkaW8gbm9kZXNcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgc2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlW2ldLnZvbHVtZSA9IHNlbGYuX2hvd2xzW2tleV0uX3ZvbHVtZSAqIHNlbGYuX3ZvbHVtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbCB2b2x1bWVcbiAgICAgIHJldHVybiAodXNpbmdXZWJBdWRpbykgPyBtYXN0ZXJHYWluLmdhaW4udmFsdWUgOiBzZWxmLl92b2x1bWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgYWxsIHNvdW5kcy5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgbXV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zZXRNdXRlZCh0cnVlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubXV0ZSBhbGwgc291bmRzLlxuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICB1bm11dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc2V0TXV0ZWQoZmFsc2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIG11dGluZyBhbmQgdW5tdXRpbmcgZ2xvYmFsbHkuXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbXV0ZWQgSXMgbXV0ZWQgb3Igbm90LlxuICAgICAqL1xuICAgIF9zZXRNdXRlZDogZnVuY3Rpb24obXV0ZWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgc2VsZi5fbXV0ZWQgPSBtdXRlZDtcblxuICAgICAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gbXV0ZWQgPyAwIDogc2VsZi5fdm9sdW1lO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5faG93bHMpIHtcbiAgICAgICAgaWYgKHNlbGYuX2hvd2xzLmhhc093blByb3BlcnR5KGtleSkgJiYgc2VsZi5faG93bHNba2V5XS5fd2ViQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhdWRpbyBub2Rlc1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZVtpXS5tdXRlZCA9IG11dGVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgY29kZWMgc3VwcG9ydC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGV4dCBBdWRpbyBmaWxlIGV4dGVudGlvbi5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNvZGVjczogZnVuY3Rpb24oZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29kZWNzW2V4dF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlPUyB3aWxsIG9ubHkgYWxsb3cgYXVkaW8gdG8gYmUgcGxheWVkIGFmdGVyIGEgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKiBBdHRlbXB0IHRvIGF1dG9tYXRpY2FsbHkgdW5sb2NrIGF1ZGlvIG9uIHRoZSBmaXJzdCB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIENvbmNlcHQgZnJvbTogaHR0cDovL3BhdWxiYWthdXMuY29tL3R1dG9yaWFscy9odG1sNS93ZWItYXVkaW8tb24taW9zL1xuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICBfZW5hYmxlaU9TQXVkaW86IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBvbmx5IHJ1biB0aGlzIG9uIGlPUyBpZiBhdWRpbyBpc24ndCBhbHJlYWR5IGVhbmJsZWRcbiAgICAgIGlmIChjdHggJiYgKHNlbGYuX2lPU0VuYWJsZWQgfHwgIS9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9pT1NFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgIC8vIGNhbGwgdGhpcyBtZXRob2Qgb24gdG91Y2ggc3RhcnQgdG8gY3JlYXRlIGFuZCBwbGF5IGEgYnVmZmVyLFxuICAgICAgLy8gdGhlbiBjaGVjayBpZiB0aGUgYXVkaW8gYWN0dWFsbHkgcGxheWVkIHRvIGRldGVybWluZSBpZlxuICAgICAgLy8gYXVkaW8gaGFzIG5vdyBiZWVuIHVubG9ja2VkIG9uIGlPU1xuICAgICAgdmFyIHVubG9jayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gZW1wdHkgYnVmZmVyXG4gICAgICAgIHZhciBidWZmZXIgPSBjdHguY3JlYXRlQnVmZmVyKDEsIDEsIDIyMDUwKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgc291cmNlLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICAvLyBwbGF5IHRoZSBlbXB0eSBidWZmZXJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2Uuc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgc291cmNlLm5vdGVPbigwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2Uuc3RhcnQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR1cCBhIHRpbWVvdXQgdG8gY2hlY2sgdGhhdCB3ZSBhcmUgdW5sb2NrZWQgb24gdGhlIG5leHQgZXZlbnQgbG9vcFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgoc291cmNlLnBsYXliYWNrU3RhdGUgPT09IHNvdXJjZS5QTEFZSU5HX1NUQVRFIHx8IHNvdXJjZS5wbGF5YmFja1N0YXRlID09PSBzb3VyY2UuRklOSVNIRURfU1RBVEUpKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHVubG9ja2VkIHN0YXRlIGFuZCBwcmV2ZW50IHRoaXMgY2hlY2sgZnJvbSBoYXBwZW5pbmcgYWdhaW5cbiAgICAgICAgICAgIHNlbGYuX2lPU0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5pT1NBdXRvRW5hYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdG91Y2ggc3RhcnQgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9jaywgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBzZXR1cCBhIHRvdWNoIHN0YXJ0IGxpc3RlbmVyIHRvIGF0dGVtcHQgYW4gdW5sb2NrIGluXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2ssIGZhbHNlKTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNoZWNrIGZvciBicm93c2VyIGNvZGVjIHN1cHBvcnRcbiAgdmFyIGF1ZGlvVGVzdCA9IG51bGw7XG4gIHZhciBjb2RlY3MgPSB7fTtcbiAgaWYgKCFub0F1ZGlvKSB7XG4gICAgYXVkaW9UZXN0ID0gbmV3IEF1ZGlvKCk7XG4gICAgY29kZWNzID0ge1xuICAgICAgbXAzOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbXBlZzsnKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgb3B1czogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwib3B1c1wiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG9nZzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgd2F2OiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgYWFjOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBtNGE6ICEhKGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8veC1tNGE7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tNGE7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBtcDQ6ICEhKGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8veC1tcDQ7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tcDQ7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICB3ZWJhOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpXG4gICAgfTtcbiAgfVxuXG4gIC8vIGFsbG93IGFjY2VzcyB0byB0aGUgZ2xvYmFsIGF1ZGlvIGNvbnRyb2xzXG4gIHZhciBIb3dsZXIgPSBuZXcgSG93bGVyR2xvYmFsKGNvZGVjcyk7XG5cbiAgLy8gc2V0dXAgdGhlIGF1ZGlvIG9iamVjdFxuICB2YXIgSG93bCA9IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZXR1cCB0aGUgZGVmYXVsdHNcbiAgICBzZWxmLl9hdXRvcGxheSA9IG8uYXV0b3BsYXkgfHwgZmFsc2U7XG4gICAgc2VsZi5fYnVmZmVyID0gby5idWZmZXIgfHwgZmFsc2U7XG4gICAgc2VsZi5fZHVyYXRpb24gPSBvLmR1cmF0aW9uIHx8IDA7XG4gICAgc2VsZi5fZm9ybWF0ID0gby5mb3JtYXQgfHwgbnVsbDtcbiAgICBzZWxmLl9sb29wID0gby5sb29wIHx8IGZhbHNlO1xuICAgIHNlbGYuX2xvYWRlZCA9IGZhbHNlO1xuICAgIHNlbGYuX3Nwcml0ZSA9IG8uc3ByaXRlIHx8IHt9O1xuICAgIHNlbGYuX3NyYyA9IG8uc3JjIHx8ICcnO1xuICAgIHNlbGYuX3BvczNkID0gby5wb3MzZCB8fCBbMCwgMCwgLTAuNV07XG4gICAgc2VsZi5fdm9sdW1lID0gby52b2x1bWUgIT09IHVuZGVmaW5lZCA/IG8udm9sdW1lIDogMTtcbiAgICBzZWxmLl91cmxzID0gby51cmxzIHx8IFtdO1xuICAgIHNlbGYuX3JhdGUgPSBvLnJhdGUgfHwgMTtcblxuICAgIC8vIGFsbG93IGZvcmNpbmcgb2YgYSBzcGVjaWZpYyBwYW5uaW5nTW9kZWwgKCdlcXVhbHBvd2VyJyBvciAnSFJURicpLFxuICAgIC8vIGlmIG5vbmUgaXMgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byAnZXF1YWxwb3dlcicgYW5kIHN3aXRjaGVzIHRvICdIUlRGJ1xuICAgIC8vIGlmIDNkIHNvdW5kIGlzIHVzZWRcbiAgICBzZWxmLl9tb2RlbCA9IG8ubW9kZWwgfHwgbnVsbDtcblxuICAgIC8vIHNldHVwIGV2ZW50IGZ1bmN0aW9uc1xuICAgIHNlbGYuX29ubG9hZCA9IFtvLm9ubG9hZCB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbmxvYWRlcnJvciA9IFtvLm9ubG9hZGVycm9yIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29uZW5kID0gW28ub25lbmQgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25wYXVzZSA9IFtvLm9ucGF1c2UgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25wbGF5ID0gW28ub25wbGF5IHx8IGZ1bmN0aW9uKCkge31dO1xuXG4gICAgc2VsZi5fb25lbmRUaW1lciA9IFtdO1xuXG4gICAgLy8gV2ViIEF1ZGlvIG9yIEhUTUw1IEF1ZGlvP1xuICAgIHNlbGYuX3dlYkF1ZGlvID0gdXNpbmdXZWJBdWRpbyAmJiAhc2VsZi5fYnVmZmVyO1xuXG4gICAgLy8gY2hlY2sgaWYgd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gSFRNTDUgQXVkaW9cbiAgICBzZWxmLl9hdWRpb05vZGUgPSBbXTtcbiAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgIHNlbGYuX3NldHVwQXVkaW9Ob2RlKCk7XG4gICAgfVxuXG4gICAgLy8gYXV0b21hdGljYWxseSB0cnkgdG8gZW5hYmxlIGF1ZGlvIG9uIGlPU1xuICAgIGlmICh0eXBlb2YgY3R4ICE9PSAndW5kZWZpbmVkJyAmJiBjdHggJiYgSG93bGVyLmlPU0F1dG9FbmFibGUpIHtcbiAgICAgIEhvd2xlci5fZW5hYmxlaU9TQXVkaW8oKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhpcyB0byBhbiBhcnJheSBvZiBIb3dsJ3MgdG8gYWxsb3cgZ2xvYmFsIGNvbnRyb2xcbiAgICBIb3dsZXIuX2hvd2xzLnB1c2goc2VsZik7XG5cbiAgICAvLyBsb2FkIHRoZSB0cmFja1xuICAgIHNlbGYubG9hZCgpO1xuICB9O1xuXG4gIC8vIHNldHVwIGFsbCBvZiB0aGUgbWV0aG9kc1xuICBIb3dsLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBMb2FkIGFuIGF1ZGlvIGZpbGUuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdXJsID0gbnVsbDtcblxuICAgICAgLy8gaWYgbm8gYXVkaW8gaXMgYXZhaWxhYmxlLCBxdWl0IGltbWVkaWF0ZWx5XG4gICAgICBpZiAobm9BdWRpbykge1xuICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBsb29wIHRocm91Z2ggc291cmNlIFVSTHMgYW5kIHBpY2sgdGhlIGZpcnN0IG9uZSB0aGF0IGlzIGNvbXBhdGlibGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl91cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBleHQsIHVybEl0ZW07XG5cbiAgICAgICAgaWYgKHNlbGYuX2Zvcm1hdCkge1xuICAgICAgICAgIC8vIHVzZSBzcGVjaWZpZWQgYXVkaW8gZm9ybWF0IGlmIGF2YWlsYWJsZVxuICAgICAgICAgIGV4dCA9IHNlbGYuX2Zvcm1hdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmaWd1cmUgb3V0IHRoZSBmaWxldHlwZSAod2hldGhlciBhbiBleHRlbnNpb24gb3IgYmFzZTY0IGRhdGEpXG4gICAgICAgICAgdXJsSXRlbSA9IHNlbGYuX3VybHNbaV07XG4gICAgICAgICAgZXh0ID0gL15kYXRhOmF1ZGlvXFwvKFteOyxdKyk7L2kuZXhlYyh1cmxJdGVtKTtcbiAgICAgICAgICBpZiAoIWV4dCkge1xuICAgICAgICAgICAgZXh0ID0gL1xcLihbXi5dKykkLy5leGVjKHVybEl0ZW0uc3BsaXQoJz8nLCAxKVswXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV4dCkge1xuICAgICAgICAgICAgZXh0ID0gZXh0WzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlY3NbZXh0XSkge1xuICAgICAgICAgIHVybCA9IHNlbGYuX3VybHNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fc3JjID0gdXJsO1xuXG4gICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgbG9hZEJ1ZmZlcihzZWxmLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgQXVkaW8oKTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyB3aXRoIEhUTUw1IGF1ZGlvIChodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3NwZWMuaHRtbCNtZWRpYWVycm9yKVxuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChuZXdOb2RlLmVycm9yICYmIG5ld05vZGUuZXJyb3IuY29kZSA9PT0gNCkge1xuICAgICAgICAgICAgSG93bGVyR2xvYmFsLm5vQXVkaW8gPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicsIHt0eXBlOiBuZXdOb2RlLmVycm9yID8gbmV3Tm9kZS5lcnJvci5jb2RlIDogMH0pO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgc2VsZi5fYXVkaW9Ob2RlLnB1c2gobmV3Tm9kZSk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIG5ldyBhdWRpbyBub2RlXG4gICAgICAgIG5ld05vZGUuc3JjID0gdXJsO1xuICAgICAgICBuZXdOb2RlLl9wb3MgPSAwO1xuICAgICAgICBuZXdOb2RlLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIG5ld05vZGUudm9sdW1lID0gKEhvd2xlci5fbXV0ZWQpID8gMCA6IHNlbGYuX3ZvbHVtZSAqIEhvd2xlci52b2x1bWUoKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gc3RhcnQgcGxheWluZyB0aGUgc291bmRcbiAgICAgICAgLy8gYXMgc29vbiBhcyBpdCBoYXMgYnVmZmVyZWQgZW5vdWdoXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHJvdW5kIHVwIHRoZSBkdXJhdGlvbiB3aGVuIHVzaW5nIEhUTUw1IEF1ZGlvIHRvIGFjY291bnQgZm9yIHRoZSBsb3dlciBwcmVjaXNpb25cbiAgICAgICAgICBzZWxmLl9kdXJhdGlvbiA9IE1hdGguY2VpbChuZXdOb2RlLmR1cmF0aW9uICogMTApIC8gMTA7XG5cbiAgICAgICAgICAvLyBzZXR1cCBhIHNwcml0ZSBpZiBub25lIGlzIGRlZmluZWRcbiAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc2VsZi5fc3ByaXRlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNlbGYuX3Nwcml0ZSA9IHtfZGVmYXVsdDogWzAsIHNlbGYuX2R1cmF0aW9uICogMTAwMF19O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgICAgICBzZWxmLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5vbignbG9hZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLl9hdXRvcGxheSkge1xuICAgICAgICAgICAgc2VsZi5wbGF5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2xlYXIgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICBuZXdOb2RlLmxvYWQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIFVSTHMgdG8gYmUgcHVsbGVkIGZyb20gdG8gcGxheSBpbiB0aGlzIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gdXJscyAgQXJyeSBvZiBVUkxzIHRvIGxvYWQgZnJvbVxuICAgICAqIEByZXR1cm4ge0hvd2x9ICAgICAgICBSZXR1cm5zIHNlbGYgb3IgdGhlIGN1cnJlbnQgVVJMc1xuICAgICAqL1xuICAgIHVybHM6IGZ1bmN0aW9uKHVybHMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHVybHMpIHtcbiAgICAgICAgc2VsZi5zdG9wKCk7XG4gICAgICAgIHNlbGYuX3VybHMgPSAodHlwZW9mIHVybHMgPT09ICdzdHJpbmcnKSA/IFt1cmxzXSA6IHVybHM7XG4gICAgICAgIHNlbGYuX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBzZWxmLmxvYWQoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl91cmxzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IGEgc291bmQgZnJvbSB0aGUgY3VycmVudCB0aW1lICgwIGJ5IGRlZmF1bHQpLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBzcHJpdGUgICAob3B0aW9uYWwpIFBsYXlzIGZyb20gdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgc291bmQgc3ByaXRlIGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIChvcHRpb25hbCkgUmV0dXJucyB0aGUgdW5pcXVlIHBsYXliYWNrIGlkIGZvciB0aGlzIHNvdW5kIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgcGxheTogZnVuY3Rpb24oc3ByaXRlLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiBubyBzcHJpdGUgd2FzIHBhc3NlZCBidXQgYSBjYWxsYmFjayB3YXMsIHVwZGF0ZSB0aGUgdmFyaWFibGVzXG4gICAgICBpZiAodHlwZW9mIHNwcml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IHNwcml0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHNwcml0ZSBpZiBub25lIGlzIHBhc3NlZFxuICAgICAgaWYgKCFzcHJpdGUgfHwgdHlwZW9mIHNwcml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzcHJpdGUgPSAnX2RlZmF1bHQnO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wbGF5KHNwcml0ZSwgY2FsbGJhY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIHNwcml0ZSBkb2Vzbid0IGV4aXN0LCBwbGF5IG5vdGhpbmdcbiAgICAgIGlmICghc2VsZi5fc3ByaXRlW3Nwcml0ZV0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgbm9kZSB0byBwbGF5YmFja1xuICAgICAgc2VsZi5faW5hY3RpdmVOb2RlKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgLy8gcGVyc2lzdCB0aGUgc3ByaXRlIGJlaW5nIHBsYXllZFxuICAgICAgICBub2RlLl9zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHRvIHN0YXJ0IHBsYXlpbmcgZnJvbVxuICAgICAgICB2YXIgcG9zID0gKG5vZGUuX3BvcyA+IDApID8gbm9kZS5fcG9zIDogc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgbG9uZyB0byBwbGF5IGZvclxuICAgICAgICB2YXIgZHVyYXRpb24gPSAwO1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMCAtIG5vZGUuX3BvcztcbiAgICAgICAgICBpZiAobm9kZS5fcG9zID4gMCkge1xuICAgICAgICAgICAgcG9zID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwICsgcG9zO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMCAtIChwb3MgLSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHRoaXMgc291bmQgc2hvdWxkIGJlIGxvb3BlZFxuICAgICAgICB2YXIgbG9vcCA9ICEhKHNlbGYuX2xvb3AgfHwgc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMl0pO1xuXG4gICAgICAgIC8vIHNldCB0aW1lciB0byBmaXJlIHRoZSAnb25lbmQnIGV2ZW50XG4gICAgICAgIHZhciBzb3VuZElkID0gKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpID8gY2FsbGJhY2sgOiBNYXRoLnJvdW5kKERhdGUubm93KCkgKiBNYXRoLnJhbmRvbSgpKSArICcnLFxuICAgICAgICAgIHRpbWVySWQ7XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBzb3VuZElkLFxuICAgICAgICAgICAgc3ByaXRlOiBzcHJpdGUsXG4gICAgICAgICAgICBsb29wOiBsb29wXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGlmIGxvb3BpbmcsIHJlc3RhcnQgdGhlIHRyYWNrXG4gICAgICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvICYmIGxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5zdG9wKGRhdGEuaWQpLnBsYXkoc3ByaXRlLCBkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHdlYiBhdWRpbyBub2RlIHRvIHBhdXNlZCBhdCBlbmRcbiAgICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbyAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLl9ub2RlQnlJZChkYXRhLmlkKS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLl9ub2RlQnlJZChkYXRhLmlkKS5fcG9zID0gMDtcblxuICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgZW5kIHRpbWVyXG4gICAgICAgICAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVuZCB0aGUgdHJhY2sgaWYgaXQgaXMgSFRNTCBhdWRpbyBhbmQgYSBzcHJpdGVcbiAgICAgICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8gJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5zdG9wKGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaXJlIGVuZGVkIGV2ZW50XG4gICAgICAgICAgICBzZWxmLm9uKCdlbmQnLCBzb3VuZElkKTtcbiAgICAgICAgICB9LCBkdXJhdGlvbiAqIDEwMDApO1xuXG4gICAgICAgICAgLy8gc3RvcmUgdGhlIHJlZmVyZW5jZSB0byB0aGUgdGltZXJcbiAgICAgICAgICBzZWxmLl9vbmVuZFRpbWVyLnB1c2goe3RpbWVyOiB0aW1lcklkLCBpZDogZGF0YS5pZH0pO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIHZhciBsb29wU3RhcnQgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDAsXG4gICAgICAgICAgICBsb29wRW5kID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBwbGF5IGlkIHRvIHRoaXMgbm9kZSBhbmQgbG9hZCBpbnRvIGNvbnRleHRcbiAgICAgICAgICBub2RlLmlkID0gc291bmRJZDtcbiAgICAgICAgICBub2RlLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgIHJlZnJlc2hCdWZmZXIoc2VsZiwgW2xvb3AsIGxvb3BTdGFydCwgbG9vcEVuZF0sIHNvdW5kSWQpO1xuICAgICAgICAgIHNlbGYuX3BsYXlTdGFydCA9IGN0eC5jdXJyZW50VGltZTtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbG9vcCA/IG5vZGUuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsIHBvcywgODY0MDApIDogbm9kZS5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCwgcG9zLCBkdXJhdGlvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvb3AgPyBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCBwb3MsIDg2NDAwKSA6IG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHBvcywgZHVyYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobm9kZS5yZWFkeVN0YXRlID09PSA0IHx8ICFub2RlLnJlYWR5U3RhdGUgJiYgbmF2aWdhdG9yLmlzQ29jb29uSlMpIHtcbiAgICAgICAgICAgIG5vZGUucmVhZHlTdGF0ZSA9IDQ7XG4gICAgICAgICAgICBub2RlLmlkID0gc291bmRJZDtcbiAgICAgICAgICAgIG5vZGUuY3VycmVudFRpbWUgPSBwb3M7XG4gICAgICAgICAgICBub2RlLm11dGVkID0gSG93bGVyLl9tdXRlZCB8fCBub2RlLm11dGVkO1xuICAgICAgICAgICAgbm9kZS52b2x1bWUgPSBzZWxmLl92b2x1bWUgKiBIb3dsZXIudm9sdW1lKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBub2RlLnBsYXkoKTsgfSwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoc291bmRJZCk7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgc291bmQgPSBzZWxmLFxuICAgICAgICAgICAgICAgIHBsYXlTcHJpdGUgPSBzcHJpdGUsXG4gICAgICAgICAgICAgICAgZm4gPSBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBuZXdOb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc291bmQucGxheShwbGF5U3ByaXRlLCBmbik7XG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJlIHRoZSBwbGF5IGV2ZW50IGFuZCBzZW5kIHRoZSBzb3VuZElkIGJhY2sgaW4gdGhlIGNhbGxiYWNrXG4gICAgICAgIHNlbGYub24oJ3BsYXknKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soc291bmRJZCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHBsYXliYWNrIGFuZCBzYXZlIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgcGF1c2U6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBhdXNlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyICdvbmVuZCcgdGltZXJcbiAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoaWQpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSBzZWxmLnBvcyhudWxsLCBpZCk7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBzb3VuZCBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICAgICAgaWYgKCFhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZSB8fCBhY3RpdmVOb2RlLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgIGlmICh0eXBlb2YgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AoMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLm9uKCdwYXVzZScpO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBwbGF5YmFjayBhbmQgcmVzZXQgdG8gc3RhcnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnN0b3AoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgJ29uZW5kJyB0aW1lclxuICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihpZCk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IDA7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBzb3VuZCBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICAgICAgaWYgKCFhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZSB8fCBhY3RpdmVOb2RlLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKGFjdGl2ZU5vZGUuZHVyYXRpb24pKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZSgpO1xuICAgICAgICAgIGFjdGl2ZU5vZGUuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNdXRlIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgbXV0ZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYubXV0ZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUubXV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICB1bm11dGU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnVubXV0ZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5tdXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHZvbHVtZSBvZiB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgdm9sIFZvbHVtZSBmcm9tIDAuMCB0byAxLjAuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Zsb2F0fSAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgdm9sdW1lLlxuICAgICAqL1xuICAgIHZvbHVtZTogZnVuY3Rpb24odm9sLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdm9sdW1lIGlzIGEgbnVtYmVyXG4gICAgICB2b2wgPSBwYXJzZUZsb2F0KHZvbCk7XG5cbiAgICAgIGlmICh2b2wgPj0gMCAmJiB2b2wgPD0gMSkge1xuICAgICAgICBzZWxmLl92b2x1bWUgPSB2b2w7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudm9sdW1lKHZvbCwgaWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSB2b2w7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUudm9sdW1lID0gdm9sICogSG93bGVyLnZvbHVtZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3ZvbHVtZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB3aGV0aGVyIHRvIGxvb3AgdGhlIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvb3AgVG8gbG9vcCBvciBub3QgdG8gbG9vcCwgdGhhdCBpcyB0aGUgcXVlc3Rpb24uXG4gICAgICogQHJldHVybiB7SG93bC9Cb29sZWFufSAgICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IGxvb3BpbmcgdmFsdWUuXG4gICAgICovXG4gICAgbG9vcDogZnVuY3Rpb24obG9vcCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIGxvb3AgPT09ICdib29sZWFuJykge1xuICAgICAgICBzZWxmLl9sb29wID0gbG9vcDtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9sb29wO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHNvdW5kIHNwcml0ZSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gc3ByaXRlIEV4YW1wbGU6IHtzcHJpdGVOYW1lOiBbb2Zmc2V0LCBkdXJhdGlvbiwgbG9vcF19XG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtJbnRlZ2VyfSBvZmZzZXQgICBXaGVyZSB0byBiZWdpbiBwbGF5YmFjayBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0ludGVnZXJ9IGR1cmF0aW9uIEhvdyBsb25nIHRvIHBsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtCb29sZWFufSBsb29wICAgICAob3B0aW9uYWwpIFNldCB0cnVlIHRvIGxvb3AgdGhpcyBzcHJpdGVcbiAgICAgKiBAcmV0dXJuIHtIb3dsfSAgICAgICAgUmV0dXJucyBjdXJyZW50IHNwcml0ZSBzaGVldCBvciBzZWxmLlxuICAgICAqL1xuICAgIHNwcml0ZTogZnVuY3Rpb24oc3ByaXRlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3ByaXRlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBzZWxmLl9zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fc3ByaXRlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBwb3NpdGlvbiBvZiBwbGF5YmFjay5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHBvcyBUaGUgcG9zaXRpb24gdG8gbW92ZSBjdXJyZW50IHBsYXliYWNrIHRvLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9GbG9hdH0gICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwb3M6IGZ1bmN0aW9uKHBvcywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucG9zKHBvcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2YgcG9zID09PSAnbnVtYmVyJyA/IHNlbGYgOiBzZWxmLl9wb3MgfHwgMDtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBkZWFsaW5nIHdpdGggYSBudW1iZXIgZm9yIHBvc1xuICAgICAgcG9zID0gcGFyc2VGbG9hdChwb3MpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgICBzZWxmLnBhdXNlKGlkKTtcbiAgICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSBwb3M7XG4gICAgICAgICAgc2VsZi5wbGF5KGFjdGl2ZU5vZGUuX3Nwcml0ZSwgaWQpO1xuXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuX3dlYkF1ZGlvID8gYWN0aXZlTm9kZS5fcG9zICsgKGN0eC5jdXJyZW50VGltZSAtIHNlbGYuX3BsYXlTdGFydCkgOiBhY3RpdmVOb2RlLmN1cnJlbnRUaW1lO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBvcyA+PSAwKSB7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgaW5hY3RpdmUgbm9kZSB0byByZXR1cm4gdGhlIHBvcyBmb3JcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkICYmIHNlbGYuX2F1ZGlvTm9kZVtpXS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHNlbGYuX3dlYkF1ZGlvKSA/IHNlbGYuX2F1ZGlvTm9kZVtpXS5fcG9zIDogc2VsZi5fYXVkaW9Ob2RlW2ldLmN1cnJlbnRUaW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSAzRCBwb3NpdGlvbiBvZiB0aGUgYXVkaW8gc291cmNlLlxuICAgICAqIFRoZSBtb3N0IGNvbW1vbiB1c2FnZSBpcyB0byBzZXQgdGhlICd4JyBwb3NpdGlvblxuICAgICAqIHRvIGFmZmVjdCB0aGUgbGVmdC9yaWdodCBlYXIgcGFubmluZy4gU2V0dGluZyBhbnkgdmFsdWUgaGlnaGVyIHRoYW5cbiAgICAgKiAxLjAgd2lsbCBiZWdpbiB0byBkZWNyZWFzZSB0aGUgdm9sdW1lIG9mIHRoZSBzb3VuZCBhcyBpdCBtb3ZlcyBmdXJ0aGVyIGF3YXkuXG4gICAgICogTk9URTogVGhpcyBvbmx5IHdvcmtzIHdpdGggV2ViIEF1ZGlvIEFQSSwgSFRNTDUgQXVkaW8gcGxheWJhY2tcbiAgICAgKiB3aWxsIG5vdCBiZSBhZmZlY3RlZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHggIFRoZSB4LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB5ICBUaGUgeS1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeiAgVGhlIHotcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9BcnJheX0gICBSZXR1cm5zIHNlbGYgb3IgdGhlIGN1cnJlbnQgM0QgcG9zaXRpb246IFt4LCB5LCB6XVxuICAgICAqL1xuICAgIHBvczNkOiBmdW5jdGlvbih4LCB5LCB6LCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBzZXQgYSBkZWZhdWx0IGZvciB0aGUgb3B0aW9uYWwgJ3knICYgJ3onXG4gICAgICB5ID0gKHR5cGVvZiB5ID09PSAndW5kZWZpbmVkJyB8fCAheSkgPyAwIDogeTtcbiAgICAgIHogPSAodHlwZW9mIHogPT09ICd1bmRlZmluZWQnIHx8ICF6KSA/IC0wLjUgOiB6O1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wb3MzZCh4LCB5LCB6LCBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICBpZiAoeCA+PSAwIHx8IHggPCAwKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICAgICAgc2VsZi5fcG9zM2QgPSBbeCwgeSwgel07XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnBhbm5lci5zZXRQb3NpdGlvbih4LCB5LCB6KTtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUucGFubmVyLnBhbm5pbmdNb2RlbCA9IHNlbGYuX21vZGVsIHx8ICdIUlRGJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9wb3MzZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZhZGUgYSBjdXJyZW50bHkgcGxheWluZyBzb3VuZCBiZXR3ZWVuIHR3byB2b2x1bWVzLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBmcm9tICAgICBUaGUgdm9sdW1lIHRvIGZhZGUgZnJvbSAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIHRvICAgICAgIFRoZSB2b2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIChvcHRpb25hbCkgRmlyZWQgd2hlbiB0aGUgZmFkZSBpcyBjb21wbGV0ZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGU6IGZ1bmN0aW9uKGZyb20sIHRvLCBsZW4sIGNhbGxiYWNrLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkaWZmID0gTWF0aC5hYnMoZnJvbSAtIHRvKSxcbiAgICAgICAgZGlyID0gZnJvbSA+IHRvID8gJ2Rvd24nIDogJ3VwJyxcbiAgICAgICAgc3RlcHMgPSBkaWZmIC8gMC4wMSxcbiAgICAgICAgc3RlcFRpbWUgPSBsZW4gLyBzdGVwcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuZmFkZShmcm9tLCB0bywgbGVuLCBjYWxsYmFjaywgaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSB2b2x1bWUgdG8gdGhlIHN0YXJ0IHBvc2l0aW9uXG4gICAgICBzZWxmLnZvbHVtZShmcm9tLCBpZCk7XG5cbiAgICAgIGZvciAodmFyIGk9MTsgaTw9c3RlcHM7IGkrKykge1xuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNoYW5nZSA9IHNlbGYuX3ZvbHVtZSArIChkaXIgPT09ICd1cCcgPyAwLjAxIDogLTAuMDEpICogaSxcbiAgICAgICAgICAgIHZvbCA9IE1hdGgucm91bmQoMTAwMCAqIGNoYW5nZSkgLyAxMDAwLFxuICAgICAgICAgICAgdG9Wb2wgPSB0bztcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnZvbHVtZSh2b2wsIGlkKTtcblxuICAgICAgICAgICAgaWYgKHZvbCA9PT0gdG9Wb2wpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHN0ZXBUaW1lICogaSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFtERVBSRUNBVEVEXSBGYWRlIGluIHRoZSBjdXJyZW50IHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgICB0byAgICAgIFZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZUluOiBmdW5jdGlvbih0bywgbGVuLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMudm9sdW1lKDApLnBsYXkoKS5mYWRlKDAsIHRvLCBsZW4sIGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogW0RFUFJFQ0FURURdIEZhZGUgb3V0IHRoZSBjdXJyZW50IHNvdW5kIGFuZCBwYXVzZSB3aGVuIGZpbmlzaGVkLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgICB0byAgICAgICBWb2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGlkICAgICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlT3V0OiBmdW5jdGlvbih0bywgbGVuLCBjYWxsYmFjaywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgcmV0dXJuIHNlbGYuZmFkZShzZWxmLl92b2x1bWUsIHRvLCBsZW4sIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIHNlbGYucGF1c2UoaWQpO1xuXG4gICAgICAgIC8vIGZpcmUgZW5kZWQgZXZlbnRcbiAgICAgICAgc2VsZi5vbignZW5kJyk7XG4gICAgICB9LCBpZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBhdWRpbyBub2RlIGJ5IElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9IEF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX25vZGVCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlWzBdO1xuXG4gICAgICAvLyBmaW5kIHRoZSBub2RlIHdpdGggdGhpcyBJRFxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgYWN0aXZlIGF1ZGlvIG5vZGUuXG4gICAgICogQHJldHVybiB7SG93bH0gQXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfYWN0aXZlTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBudWxsO1xuXG4gICAgICAvLyBmaW5kIHRoZSBmaXJzdCBwbGF5aW5nIG5vZGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBzZWxmLl9kcmFpblBvb2woKTtcblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgaW5hY3RpdmUgYXVkaW8gbm9kZS5cbiAgICAgKiBJZiB0aGVyZSBpcyBub25lLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIHBvb2wuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgYXVkaW8gbm9kZSBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBfaW5hY3RpdmVOb2RlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gbnVsbDtcblxuICAgICAgLy8gZmluZCBmaXJzdCBpbmFjdGl2ZSBub2RlIHRvIHJlY3ljbGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQgJiYgc2VsZi5fYXVkaW9Ob2RlW2ldLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAvLyBzZW5kIHRoZSBub2RlIGJhY2sgZm9yIHVzZSBieSB0aGUgbmV3IHBsYXkgaW5zdGFuY2VcbiAgICAgICAgICBjYWxsYmFjayhzZWxmLl9hdWRpb05vZGVbaV0pO1xuICAgICAgICAgIG5vZGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIHNlbGYuX2RyYWluUG9vbCgpO1xuXG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBuZXcgbm9kZSBpZiB0aGVyZSBhcmUgbm8gaW5hY3RpdmVzXG4gICAgICB2YXIgbmV3Tm9kZTtcbiAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICBuZXdOb2RlID0gc2VsZi5fc2V0dXBBdWRpb05vZGUoKTtcbiAgICAgICAgY2FsbGJhY2sobmV3Tm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmxvYWQoKTtcbiAgICAgICAgbmV3Tm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtzZWxmLl9hdWRpb05vZGUubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciB0aGUgY29ycmVjdCBsb2FkIGV2ZW50IGFuZCBmaXJlIHRoZSBjYWxsYmFja1xuICAgICAgICB2YXIgbGlzdGVuZXJFdmVudCA9IG5hdmlnYXRvci5pc0NvY29vbkpTID8gJ2NhbnBsYXl0aHJvdWdoJyA6ICdsb2FkZWRtZXRhZGF0YSc7XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lckV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIGNhbGxiYWNrKG5ld05vZGUpO1xuICAgICAgICB9O1xuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXJFdmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgYXJlIG1vcmUgdGhhbiA1IGluYWN0aXZlIGF1ZGlvIG5vZGVzIGluIHRoZSBwb29sLCBjbGVhciBvdXQgdGhlIHJlc3QuXG4gICAgICovXG4gICAgX2RyYWluUG9vbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGluYWN0aXZlID0gMCxcbiAgICAgICAgaTtcblxuICAgICAgLy8gY291bnQgdGhlIG51bWJlciBvZiBpbmFjdGl2ZSBub2Rlc1xuICAgICAgZm9yIChpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgaW5hY3RpdmUrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBmb3IgKGk9c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgaWYgKGluYWN0aXZlIDw9IDUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgLy8gZGlzY29ubmVjdCB0aGUgYXVkaW8gc291cmNlIGlmIHVzaW5nIFdlYiBBdWRpb1xuICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgc2VsZi5fYXVkaW9Ob2RlW2ldLmRpc2Nvbm5lY3QoMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW5hY3RpdmUtLTtcbiAgICAgICAgICBzZWxmLl9hdWRpb05vZGUuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENsZWFyICdvbmVuZCcgdGltZW91dCBiZWZvcmUgaXQgZW5kcy5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHNvdW5kSWQgIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqL1xuICAgIF9jbGVhckVuZFRpbWVyOiBmdW5jdGlvbihzb3VuZElkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSB0aW1lcnMgdG8gZmluZCB0aGUgb25lIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNvdW5kXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fb25lbmRUaW1lci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fb25lbmRUaW1lcltpXS5pZCA9PT0gc291bmRJZCkge1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdGltZXIgPSBzZWxmLl9vbmVuZFRpbWVyW2luZGV4XTtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIudGltZXIpO1xuICAgICAgICBzZWxmLl9vbmVuZFRpbWVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBnYWluIG5vZGUgYW5kIHBhbm5lciBmb3IgYSBXZWIgQXVkaW8gaW5zdGFuY2UuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX3NldHVwQXVkaW9Ob2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZSxcbiAgICAgICAgaW5kZXggPSBzZWxmLl9hdWRpb05vZGUubGVuZ3RoO1xuXG4gICAgICAvLyBjcmVhdGUgZ2FpbiBub2RlXG4gICAgICBub2RlW2luZGV4XSA9ICh0eXBlb2YgY3R4LmNyZWF0ZUdhaW4gPT09ICd1bmRlZmluZWQnKSA/IGN0eC5jcmVhdGVHYWluTm9kZSgpIDogY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgIG5vZGVbaW5kZXhdLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG4gICAgICBub2RlW2luZGV4XS5wYXVzZWQgPSB0cnVlO1xuICAgICAgbm9kZVtpbmRleF0uX3BvcyA9IDA7XG4gICAgICBub2RlW2luZGV4XS5yZWFkeVN0YXRlID0gNDtcbiAgICAgIG5vZGVbaW5kZXhdLmNvbm5lY3QobWFzdGVyR2Fpbik7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgcGFubmVyXG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIgPSBjdHguY3JlYXRlUGFubmVyKCk7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIucGFubmluZ01vZGVsID0gc2VsZi5fbW9kZWwgfHwgJ2VxdWFscG93ZXInO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLnNldFBvc2l0aW9uKHNlbGYuX3BvczNkWzBdLCBzZWxmLl9wb3MzZFsxXSwgc2VsZi5fcG9zM2RbMl0pO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLmNvbm5lY3Qobm9kZVtpbmRleF0pO1xuXG4gICAgICByZXR1cm4gbm9kZVtpbmRleF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGwvc2V0IGN1c3RvbSBldmVudHMuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGV2ZW50IEV2ZW50IHR5cGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGV2ZW50cyA9IHNlbGZbJ19vbicgKyBldmVudF07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZXZlbnRzLnB1c2goZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZXZlbnRzW2ldLmNhbGwoc2VsZiwgZm4pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudHNbaV0uY2FsbChzZWxmKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGN1c3RvbSBldmVudC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgZXZlbnQgRXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgTGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZXZlbnRzID0gc2VsZlsnX29uJyArIGV2ZW50XSxcbiAgICAgICAgZm5TdHJpbmcgPSBmbiA/IGZuLnRvU3RyaW5nKCkgOiBudWxsO1xuXG4gICAgICBpZiAoZm5TdHJpbmcpIHtcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGZ1bmN0aW9ucyBpbiB0aGUgZXZlbnQgZm9yIGNvbXBhcmlzb25cbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChmblN0cmluZyA9PT0gZXZlbnRzW2ldLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGZbJ19vbicgKyBldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubG9hZCBhbmQgZGVzdHJveSB0aGUgY3VycmVudCBIb3dsIG9iamVjdC5cbiAgICAgKiBUaGlzIHdpbGwgaW1tZWRpYXRlbHkgc3RvcCBhbGwgcGxheSBpbnN0YW5jZXMgYXR0YWNoZWQgdG8gdGhpcyBzb3VuZC5cbiAgICAgKi9cbiAgICB1bmxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBzdG9wIHBsYXlpbmcgYW55IGFjdGl2ZSBub2Rlc1xuICAgICAgdmFyIG5vZGVzID0gc2VsZi5fYXVkaW9Ob2RlO1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBzdG9wIHRoZSBzb3VuZCBpZiBpdCBpcyBjdXJyZW50bHkgcGxheWluZ1xuICAgICAgICBpZiAoIW5vZGVzW2ldLnBhdXNlZCkge1xuICAgICAgICAgIHNlbGYuc3RvcChub2Rlc1tpXS5pZCk7XG4gICAgICAgICAgc2VsZi5vbignZW5kJywgbm9kZXNbaV0uaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgc291cmNlIGlmIHVzaW5nIEhUTUw1IEF1ZGlvXG4gICAgICAgICAgbm9kZXNbaV0uc3JjID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGlzY29ubmVjdCB0aGUgb3V0cHV0IGZyb20gdGhlIG1hc3RlciBnYWluXG4gICAgICAgICAgbm9kZXNbaV0uZGlzY29ubmVjdCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYWtlIHN1cmUgYWxsIHRpbWVvdXRzIGFyZSBjbGVhcmVkXG4gICAgICBmb3IgKGk9MDsgaTxzZWxmLl9vbmVuZFRpbWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzZWxmLl9vbmVuZFRpbWVyW2ldLnRpbWVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHRoZSByZWZlcmVuY2UgaW4gdGhlIGdsb2JhbCBIb3dsZXIgb2JqZWN0XG4gICAgICB2YXIgaW5kZXggPSBIb3dsZXIuX2hvd2xzLmluZGV4T2Yoc2VsZik7XG4gICAgICBpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICBIb3dsZXIuX2hvd2xzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlbGV0ZSB0aGlzIHNvdW5kIGZyb20gdGhlIGNhY2hlXG4gICAgICBkZWxldGUgY2FjaGVbc2VsZi5fc3JjXTtcbiAgICAgIHNlbGYgPSBudWxsO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIG9ubHkgZGVmaW5lIHRoZXNlIGZ1bmN0aW9ucyB3aGVuIHVzaW5nIFdlYkF1ZGlvXG4gIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG5cbiAgICAvKipcbiAgICAgKiBCdWZmZXIgYSBzb3VuZCBmcm9tIFVSTCAob3IgZnJvbSBjYWNoZSkgYW5kIGRlY29kZSB0byBhdWRpbyBzb3VyY2UgKFdlYiBBdWRpbyBBUEkpLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGUuXG4gICAgICovXG4gICAgdmFyIGxvYWRCdWZmZXIgPSBmdW5jdGlvbihvYmosIHVybCkge1xuICAgICAgLy8gY2hlY2sgaWYgdGhlIGJ1ZmZlciBoYXMgYWxyZWFkeSBiZWVuIGNhY2hlZFxuICAgICAgaWYgKHVybCBpbiBjYWNoZSkge1xuICAgICAgICAvLyBzZXQgdGhlIGR1cmF0aW9uIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIG9iai5fZHVyYXRpb24gPSBjYWNoZVt1cmxdLmR1cmF0aW9uO1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIHNvdW5kIGludG8gdGhpcyBvYmplY3RcbiAgICAgICAgbG9hZFNvdW5kKG9iaik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKC9eZGF0YTpbXjtdKztiYXNlNjQsLy50ZXN0KHVybCkpIHtcbiAgICAgICAgLy8gRGVjb2RlIGJhc2U2NCBkYXRhLVVSSXMgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGNhbm5vdCBsb2FkIGRhdGEtVVJJcyB3aXRoIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAgICB2YXIgZGF0YSA9IGF0b2IodXJsLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICB2YXIgZGF0YVZpZXcgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgZGF0YVZpZXdbaV0gPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRlY29kZUF1ZGlvRGF0YShkYXRhVmlldy5idWZmZXIsIG9iaiwgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxvYWQgdGhlIGJ1ZmZlciBmcm9tIHRoZSBVUkxcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWNvZGVBdWRpb0RhdGEoeGhyLnJlc3BvbnNlLCBvYmosIHVybCk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IsIHN3aXRjaCB0aGUgc291bmQgdG8gSFRNTCBBdWRpb1xuICAgICAgICAgIGlmIChvYmouX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBvYmouX2J1ZmZlciA9IHRydWU7XG4gICAgICAgICAgICBvYmouX3dlYkF1ZGlvID0gZmFsc2U7XG4gICAgICAgICAgICBvYmouX2F1ZGlvTm9kZSA9IFtdO1xuICAgICAgICAgICAgZGVsZXRlIG9iai5fZ2Fpbk5vZGU7XG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbdXJsXTtcbiAgICAgICAgICAgIG9iai5sb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB4aHIub25lcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZSBhdWRpbyBkYXRhIGZyb20gYW4gYXJyYXkgYnVmZmVyLlxuICAgICAqIEBwYXJhbSAge0FycmF5QnVmZmVyfSBhcnJheWJ1ZmZlciBUaGUgYXVkaW8gZGF0YS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBwYXRoIHRvIHRoZSBzb3VuZCBmaWxlLlxuICAgICAqL1xuICAgIHZhciBkZWNvZGVBdWRpb0RhdGEgPSBmdW5jdGlvbihhcnJheWJ1ZmZlciwgb2JqLCB1cmwpIHtcbiAgICAgIC8vIGRlY29kZSB0aGUgYnVmZmVyIGludG8gYW4gYXVkaW8gc291cmNlXG4gICAgICBjdHguZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICBhcnJheWJ1ZmZlcixcbiAgICAgICAgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgY2FjaGVbdXJsXSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxvYWRTb3VuZChvYmosIGJ1ZmZlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBvYmoub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5pc2hlcyBsb2FkaW5nIHRoZSBXZWIgQXVkaW8gQVBJIHNvdW5kIGFuZCBmaXJlcyB0aGUgbG9hZGVkIGV2ZW50XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgb2JqICAgIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7T2JqZWNjdH0gYnVmZmVyIFRoZSBkZWNvZGVkIGJ1ZmZlciBzb3VuZCBzb3VyY2UuXG4gICAgICovXG4gICAgdmFyIGxvYWRTb3VuZCA9IGZ1bmN0aW9uKG9iaiwgYnVmZmVyKSB7XG4gICAgICAvLyBzZXQgdGhlIGR1cmF0aW9uXG4gICAgICBvYmouX2R1cmF0aW9uID0gKGJ1ZmZlcikgPyBidWZmZXIuZHVyYXRpb24gOiBvYmouX2R1cmF0aW9uO1xuXG4gICAgICAvLyBzZXR1cCBhIHNwcml0ZSBpZiBub25lIGlzIGRlZmluZWRcbiAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmouX3Nwcml0ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG9iai5fc3ByaXRlID0ge19kZWZhdWx0OiBbMCwgb2JqLl9kdXJhdGlvbiAqIDEwMDBdfTtcbiAgICAgIH1cblxuICAgICAgLy8gZmlyZSB0aGUgbG9hZGVkIGV2ZW50XG4gICAgICBpZiAoIW9iai5fbG9hZGVkKSB7XG4gICAgICAgIG9iai5fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgb2JqLm9uKCdsb2FkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouX2F1dG9wbGF5KSB7XG4gICAgICAgIG9iai5wbGF5KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIHNvdW5kIGJhY2sgaW50byB0aGUgYnVmZmVyIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAgIFRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge0FycmF5fSAgbG9vcCAgTG9vcCBib29sZWFuLCBwb3MsIGFuZCBkdXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICovXG4gICAgdmFyIHJlZnJlc2hCdWZmZXIgPSBmdW5jdGlvbihvYmosIGxvb3AsIGlkKSB7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbm9kZSB0byBjb25uZWN0IHRvXG4gICAgICB2YXIgbm9kZSA9IG9iai5fbm9kZUJ5SWQoaWQpO1xuXG4gICAgICAvLyBzZXR1cCB0aGUgYnVmZmVyIHNvdXJjZSBmb3IgcGxheWJhY2tcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlID0gY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UuYnVmZmVyID0gY2FjaGVbb2JqLl9zcmNdO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UuY29ubmVjdChub2RlLnBhbm5lcik7XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wID0gbG9vcFswXTtcbiAgICAgIGlmIChsb29wWzBdKSB7XG4gICAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3BTdGFydCA9IGxvb3BbMV07XG4gICAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3BFbmQgPSBsb29wWzFdICsgbG9vcFsyXTtcbiAgICAgIH1cbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IG9iai5fcmF0ZTtcbiAgICB9O1xuXG4gIH1cblxuICAvKipcbiAgICogQWRkIHN1cHBvcnQgZm9yIEFNRCAoQXN5bmNocm9ub3VzIE1vZHVsZSBEZWZpbml0aW9uKSBsaWJyYXJpZXMgc3VjaCBhcyByZXF1aXJlLmpzLlxuICAgKi9cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhvd2xlcjogSG93bGVyLFxuICAgICAgICBIb3dsOiBIb3dsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzdXBwb3J0IGZvciBDb21tb25KUyBsaWJyYXJpZXMgc3VjaCBhcyBicm93c2VyaWZ5LlxuICAgKi9cbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMuSG93bGVyID0gSG93bGVyO1xuICAgIGV4cG9ydHMuSG93bCA9IEhvd2w7XG4gIH1cblxuICAvLyBkZWZpbmUgZ2xvYmFsbHkgaW4gY2FzZSBBTUQgaXMgbm90IGF2YWlsYWJsZSBvciBhdmFpbGFibGUgYnV0IG5vdCB1c2VkXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93Lkhvd2xlciA9IEhvd2xlcjtcbiAgICB3aW5kb3cuSG93bCA9IEhvd2w7XG4gIH1cblxufSkoKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9ob3dsZXIvaG93bGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzeUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzViQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==