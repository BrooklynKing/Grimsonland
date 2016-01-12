var engine =
webpackJsonp_name_([2,4],[
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
	    this.layer = config.layer;
	    if (config.pos instanceof _utils2.default.Point) {
	        this.pos = config.pos.clone();
	    } else {
	        this.pos = new _utils2.default.Point(config.pos);
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
	    var _parameters = config.parameters || {},
	        parameters = config.parameters && _utils2.default.clone(config.parameters) || {};

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
	    }
	    this._init = config.init;

	    this.inited = false;
	}
	GameObject.prototype.objectCount = 0;
	GameObject.prototype.render = function (dt) {
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
	    this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
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
	    this.active = true;
	}
	GameLayer.prototype.activate = function () {
	    this.active = true;
	};
	GameLayer.prototype.stop = function () {
	    this.active = false;
	};
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
	    var arr = {},
	        ctx = this.ctx;

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
	    for (var i in arr) {
	        if (arr[i]) {
	            for (var j = 0, k = arr[i].length; j < k; j++) {
	                ctx.save();
	                ctx.translate(Math.round(arr[i][j].pos.x), Math.round(arr[i][j].pos.y));

	                arr[i][j].render(dt);

	                ctx.restore();
	            }
	        }
	    }
	    ctx.translate(-this.translate.x, -this.translate.y);
	    ctx.restore();
	};
	GameLayer.prototype.update = function (dt) {
	    if (!this.inited || !this.active) return;
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
	    if (this.objects.hasOwnProperty(config.id)) {
	        console.error('Object with such id already exist in this layer: ', config.id);
	        return false;
	    }
	    config.layer = this;
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

	function GameWindow(config) {
	    this.layers = {};
	    this.cache = config.cache;
	    this.ctx = config.ctx;
	    this.canvas = config.canvas;
	    this.rules = config.rules || [];
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
	GameWindow.prototype.update = function (dt) {
	    for (var i in this.layers) {
	        this.layers.hasOwnProperty(i) && this.layers[i].update(dt);
	    }
	};
	GameWindow.prototype.render = function (dt) {
	    for (var i in this.layers) {
	        this.layers.hasOwnProperty(i) && this.layers[i].render(dt);
	    }
	};
	GameWindow.prototype.removeLayer = function (id) {
	    this.layers.hasOwnProperty(id) && delete this.layers[id];
	};
	GameWindow.prototype.addLayer = function (obj) {
	    if (this.layers.hasOwnProperty(obj.id)) {
	        console.error('Layer with such id already exist in this window');
	        return false;
	    } else {
	        obj.ctx = this.ctx;
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
	GameWindow.prototype.addRule = function (config) {
	    if (this.rules.hasOwnProperty(config.id)) {
	        console.error('Rule with such id already exist in this layer');
	        return false;
	    } else {
	        var rule = new GameRule(config);
	        rule.setContext(this);
	        this.rules.push(rule);
	    }

	    return this.rules[config.id];
	};
	GameWindow.prototype.addRules = function (configs) {
	    if (Array.isArray(configs)) {
	        for (var i = 0, j = configs.length; i < j; i++) {
	            this.addRule(configs[i]);
	        }
	    } else {
	        console.error('addRules expect array in parameters');
	    }
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
	function expBar(obj) {
	    var x = -22,
	        y = 17,
	        width = 200,
	        height = 40,
	        ctx = obj.layer.ctx;

	    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
	    ctx.globalAlpha = 0.3;
	    ctx.fillStyle = "rgb(0, 0, 0)";
	    ctx.fillRect(x, y, width, height);
	    ctx.globalAlpha = 1;
	    ctx.fillStyle = "#DAA520";

	    var player = obj.layer.getObjectsByType('player')[0];

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
	            ctx.drawImage(obj.layer.game.cache.getImage('frostEffect'), -obj.sprite.size[0] / 2, -8, 32, 32);
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
	    expBar: expBar,
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

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Sprite(cache, url, pos, size, speed, frames, dir, once, degree) {
	    this.cache = cache;
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
	    ctx.drawImage(this.cache.getImage(this.url), x, y, this.size[0], this.size[1], Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2), this.size[0], this.size[1]);
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

	    function updateObject(object) {
	        var pos = object.pos,
	            size = object.size,
	            cells = [],
	            oldCells = object.getParameter('collisions').cells,
	            xIndex = size[0] >> n,
	            yIndex = size[1] >> n;

	        for (var i = 0; i < 2 + xIndex; i++) {
	            for (var j = 0; j < 2 + yIndex; j++) {
	                cells.push(getCell([pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex)) >> n, pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex)) >> n]));
	            }
	        }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzPzFkYzYiLCJ3ZWJwYWNrOi8vLy4uL34vdmljdG9yL2luZGV4LmpzP2E1NzYiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2lucHV0LmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2NvbGxpc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaG93bGVyL2hvd2xlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IG1vdXNlTW9kdWxlIGZyb20gJy4vbW91c2UnO1xyXG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XHJcbmltcG9ydCBHYW1lV2luZG93IGZyb20gJy4vb2JqZWN0cyc7XHJcbmltcG9ydCBjb2xsaXNpb25zIGZyb20gJy4vY29sbGlzaW9ucyc7XHJcbmltcG9ydCB7SG93bH0gZnJvbSAnaG93bGVyJztcclxuXHJcblxyXG4vLyBBIGNyb3NzLWJyb3dzZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbi8vIFNlZSBodHRwczovL2hhY2tzLm1vemlsbGEub3JnLzIwMTEvMDgvYW5pbWF0aW5nLXdpdGgtamF2YXNjcmlwdC1mcm9tLXNldGludGVydmFsLXRvLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cclxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XHJcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcclxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XHJcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRSZXNvdXJjZXMobGlzdCwgY2FsbGJhY2spIHtcclxuICAgIHJlc291cmNlcy5sb2FkKGxpc3QpO1xyXG5cclxuICAgIC8vVGhpcyBvbmUgaXMgbW9jayBmb3IgQUpBWCwgaWYgd2Ugd2lsbCBoYXZlIHJlYWwgQUpBWCwgd2UganVzdCBuZWVkIHRvIHB1dCB0aGlzIG9uZSBpbnRvIGNhbGxiYWNrIHdpdGhvdXQgdGltZW91dFxyXG4gICAgcmVzb3VyY2VzLm9uUmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnKSB7XHJcbiAgICB2YXIgY2FudmFzID0gY29uZmlnLmNhbnZhcyxcclxuICAgICAgICBsYXN0VGltZSA9IDA7XHJcblxyXG4gICAgdmFyIG1vdXNlID0gbW91c2VNb2R1bGUoY2FudmFzKTtcclxuICAgIGNvbmZpZy5pbnB1dCA9IGlucHV0O1xyXG4gICAgY29uZmlnLm1vdXNlID0gbW91c2U7XHJcbiAgICBjb25maWcuY29sbGlzaW9ucyA9IGNvbGxpc2lvbnMoe1xyXG4gICAgICAgIG46IDcsXHJcbiAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCArIDIwMCxcclxuICAgICAgICBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQgKyAyMDBcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lV2luZG93KGNvbmZpZyk7XHJcblxyXG4gICAgdmFyIHNvdW5kID0gbmV3IEhvd2woe1xyXG4gICAgICAgIHVybHM6IFsnbXVzaWMvbWFpbi5tcDMnLCAnbXVzaWMvbWFpbi5vZ2cnXSxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIHZvbHVtZTogMC41XHJcbiAgICB9KS5wbGF5KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2FtZVRpbWVyKCkge1xyXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBkdCA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwLjA7XHJcblxyXG4gICAgICAgIGdhbWUudXBkYXRlKGR0KTtcclxuICAgICAgICBnYW1lLnJlbmRlcihkdCk7XHJcblxyXG4gICAgICAgIGxhc3RUaW1lID0gbm93O1xyXG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUoZ2FtZVRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcclxuICAgICAgICBsb2FkUmVzb3VyY2VzKGNvbmZpZy5yZXNvdXJjZXMsICgpID0+IHtcclxuICAgICAgICAgICAgZ2FtZS5pbml0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUoZ2FtZVRpbWVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vZGVsOiBnYW1lLFxyXG4gICAgICAgIGluaXQ6IGluaXRHYW1lXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWU7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvaW5kZXguanNcbiAqKi8iLCJ2YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG5mdW5jdGlvbiBjb2xsaWRlcyh4LCB5LCByLCBiLCB4MiwgeTIsIHIyLCBiMikge1xyXG4gICAgcmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuICAgIGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdO1xyXG4gICAgICAgIHRoaXMueSA9IHhbMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuUG9pbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIExpbmUocG9pbnQsIHZlY3Rvcil7XHJcblxyXG4gICAgLyppZiAocG9pbnQueCA9PSB2ZWN0b3IueCkge1xyXG4gICAgICAgIHRoaXMuayA9ICd2ZXJ0JztcclxuICAgICAgICB0aGlzLmIgPSB2ZWN0b3IueDtcclxuICAgICAgICB0aGlzLmRpciA9ICh2ZWN0b3IueSA+PSBwb2ludC55KSA/IDEgOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5rID0gKHZlY3Rvci55IC0gcG9pbnQueSkgLyAodmVjdG9yLnggLSBwb2ludC54KTtcclxuICAgICAgICB0aGlzLmIgPSBwb2ludC55IC0gcG9pbnQueCAqIHRoaXMuaztcclxuICAgICAgICB0aGlzLmRpciA9ICh2ZWN0b3IueCA+PSBwb2ludC54KSA/IDEgOiAtMTtcclxuICAgIH0qL1xyXG4gICAgdmFyIF92ZWN0b3IgPSB2ZWN0b3I7XHJcblxyXG4gICAgaWYgKHZlY3RvciBpbnN0YW5jZW9mIFBvaW50KSB7XHJcbiAgICAgICAgX3ZlY3RvciA9IGdldFZlY3RvckJ5VHdvUG9pbnRzKHBvaW50LCB2ZWN0b3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKF92ZWN0b3IueCAhPSAwICYmIF92ZWN0b3IueSAhPSAwKSB7XHJcbiAgICAgICAgdGhpcy5rID0gKF92ZWN0b3IueCAvIF92ZWN0b3IueSk7XHJcbiAgICAgICAgdGhpcy5iID0gKHBvaW50LnggLSBfdmVjdG9yLnggKiBwb2ludC55IC8gX3ZlY3Rvci55KTtcclxuICAgICAgICB0aGlzLmRpciA9IChfdmVjdG9yLnkgPj0gMCkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2UgaWYgKF92ZWN0b3IueCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5rID0gJ3ZlcnRpY2FsJztcclxuICAgICAgICB0aGlzLmIgPSBfdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy5kaXIgPSAoX3ZlY3Rvci55ID49IDApID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmsgPSAnaG9yaXpvbnRhbCc7XHJcbiAgICAgICAgdGhpcy5iID0gX3ZlY3Rvci55O1xyXG4gICAgICAgIHRoaXMuZGlyID0gKF92ZWN0b3IueCA+PSAwKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHRoaXMudmVjdG9yID0gX3ZlY3Rvci8vZ2V0VmVjdG9yQnlUd29Qb2ludHMocG9pbnQsIHZlY3Rvcik7XHJcbn1cclxuXHJcbkxpbmUucHJvdG90eXBlLmdldERlc3RpbmF0aW9uID0gZnVuY3Rpb24ocG9pbnQsIHNwZWVkKSB7XHJcbiAgICB2YXIgeCwgeTtcclxuXHJcbiAgICBpZiAodGhpcy5rID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB4ID0gcG9pbnQueDtcclxuICAgICAgICB5ID0gcG9pbnQueSArIHRoaXMuZGlyICogc3BlZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuayA9PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICB4ID0gcG9pbnQueCArIHRoaXMuZGlyICogc3BlZWQ7XHJcbiAgICAgICAgeSA9IHBvaW50Lnk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50LnggKyB0aGlzLmRpciAqIHNwZWVkICogdGhpcy5rIC8gKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgdGhpcy5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5rLCAyKSArIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRWZWN0b3JCeVR3b1BvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gICAgcmV0dXJuIG5ldyBWaWN0b3IocG9pbnQyLnggLSBwb2ludDEueCwgcG9pbnQyLnkgLSBwb2ludDEueSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3MueCArIHNpemVbMF0gLyAyLCBwb3MueSArIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvcy54ICAtIHNpemVbMF0gLyAyLCBwb3MueSAgLSBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3MyLnggICsgc2l6ZTJbMF0gLyAyLCBwb3MyLnkgICsgc2l6ZTJbMV0gLyAyLFxyXG4gICAgICAgIHBvczIueCAgLSBzaXplMlswXSAvIDIsIHBvczIueSAgLSBzaXplMlsxXSAvIDIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJhZGlhbnMoZGVncmVlKSB7XHJcbiAgICByZXR1cm4gZGVncmVlICogTWF0aC5QSSAvIDE4MDtcclxufTtcclxuZnVuY3Rpb24gZ2V0RGVncmVlQmV0d2VlbkRpcmVjdGlvbnMoZGlyMSwgZGlyMil7XHJcbiAgICBpZiAoZGlyMi5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiBnZXREZWdyZWVzKE1hdGguYXRhbigxIC8gZGlyMS5rKmRpcjEuZGlyKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXREZWdyZWVzKE1hdGguYXRhbigoZGlyMi5rICogZGlyMi5kaXIgLSBkaXIxLmsgKiBkaXIxLmRpcikgLyAoMSAtIGRpcjEuayAqIGRpcjEuZGlyICogZGlyMi5rICogZGlyMi5kaXIpKSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlcyhyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gMTgwICogcmFkaWFucyAvIE1hdGguUEk7XHJcbn07XHJcbmZ1bmN0aW9uIGdldERlZ3JlZShwb2ludDEsIHBvaW50MiwgcHJldkRlZ3JlZSwgc3BlZWQpIHtcclxuICAgIHZhciBkZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDIueCAtIHBvaW50MS54KSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyLnggLSBwb2ludDEueCwgMikgKyBNYXRoLnBvdyhwb2ludDIueSAtIHBvaW50MS55LCAyKSkpO1xyXG4gICAgKHBvaW50MS55ID4gcG9pbnQyLnkpICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50Mi54IC0gcG9pbnQxLngpKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDIueCAtIHBvaW50MS54LCAyKSArIE1hdGgucG93KHBvaW50Mi55IC0gcG9pbnQxLnksIDIpKSk7XHJcblxyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDEueSA+IHBvaW50Mi55KSAmJiAobmV3RGVncmVlID0gMzYwIC0gbmV3RGVncmVlKTtcclxuICAgIG5ld0RlZ3JlZSArPSBkZWdyZWU7XHJcbiAgICAobmV3RGVncmVlIDwgMCkgJiYgKG5ld0RlZ3JlZSArPSAzNjApO1xyXG4gICAgKG5ld0RlZ3JlZSA+IDM2MCkgJiYgKG5ld0RlZ3JlZSAtPSAzNjApO1xyXG5cclxuICAgIHZhciBkaXIgPSAoKG5ld0RlZ3JlZSA+IDAgJiYgbmV3RGVncmVlIDw9IDkwKSB8fCAobmV3RGVncmVlID4gMjcwICYmIG5ld0RlZ3JlZSA8PSAzNjApKSA/IDEgOiAtMTtcclxuXHJcbiAgICB2YXIgZGlyZWN0aW9uID0ge1xyXG4gICAgICAgIGRpcjogZGlyLFxyXG4gICAgICAgIGs6IE1hdGgudGFuKG5ld0RlZ3JlZSAqIE1hdGguUEkgLyAxODApXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBnZXREZXN0aW5hdGlvbihwb2ludDEsIGRpcmVjdGlvbiwgTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50Mi54IC0gcG9pbnQxLngsIDIpICsgTWF0aC5wb3cocG9pbnQyLnkgLSBwb2ludDEueSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHZhciBrLCBiLCBkaXI7XHJcblxyXG4gICAgaWYgKHBvaW50MVswXSA9PSBwb2ludDJbMF0pIHtcclxuICAgICAgICBrID0gJ3ZlcnQnO1xyXG4gICAgICAgIGIgPSBwb2ludDJbMF07XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldERpc3RhbmNlKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MS54IC0gcG9pbnQyLngsMikgKyBNYXRoLnBvdyhwb2ludDEueSAtIHBvaW50Mi55LDIpKVxyXG59XHJcbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBvaW50LCBsaW5lLCBzcGVlZCkge1xyXG4gICAgdmFyIHgsIHk7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHggPSBwb2ludC54O1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50LnggKyBsaW5lLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgbGluZS5kaXIgKiBzcGVlZCAqIGxpbmUuayAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0U3BlZWQoc3RhcnQsIGRlc3RpbmF0aW9uLCBsaW5lKSB7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiAoIGRlc3RpbmF0aW9uLnkgLSBzdGFydC55ICkgLyBsaW5lLmRpcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICggZGVzdGluYXRpb24ueSAtIHN0YXJ0LnkgKSAqIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKSAvKGxpbmUuZGlyICogbGluZS5rKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlbGxpcHNlKGNvbnRleHQsIGN4LCBjeSwgcngsIHJ5LCByb3QsIGFTdGFydCwgYUVuZCl7XHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKGN4LCBjeSk7XHJcbiAgICBjb250ZXh0LnJvdGF0ZShyb3QpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoLXJ4LCAtcnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUocngsIHJ5KTtcclxuICAgIGNvbnRleHQuYXJjKDEsIDEsIDEsIGFTdGFydCwgYUVuZCwgZmFsc2UpO1xyXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbn1cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF4KSB7XHJcbiAgICAgICAgICAgIHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHkgLSAxIDogeSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcclxufVxyXG5mdW5jdGlvbiBnZXRQb2ludE9mSW50ZXJjZXB0aW9uKGRpcmVjdGlvbjEsIGRpcmVjdGlvbjIpIHtcclxuICAgIHZhciB4LCB5O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24yLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IGRpcmVjdGlvbjIuYjtcclxuICAgICAgICB5ID0gZGlyZWN0aW9uMS5rICogZGlyZWN0aW9uMS5kaXIgKiB4ICsgZGlyZWN0aW9uMS5iO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gKGRpcmVjdGlvbjIuYiAtIGRpcmVjdGlvbjEuYikgLyAoZGlyZWN0aW9uMS5kaXIgKiBkaXJlY3Rpb24xLmsgLSBkaXJlY3Rpb24yLmRpciAqIGRpcmVjdGlvbjIuayk7XHJcbiAgICAgICAgeSA9IGRpcmVjdGlvbjEuayAqIGRpcmVjdGlvbjEuZGlyICogeCArIGRpcmVjdGlvbjEuYjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgKCFvYmopICYmIChvYmogPSB7fSk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgTGluZSA6IExpbmUsXHJcbiAgICBQb2ludCA6IFBvaW50LFxyXG4gICAgZWxsaXBzZTogZWxsaXBzZSxcclxuICAgIGdldFJhZGlhbnM6IGdldFJhZGlhbnMsXHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICBnZXRTcGVlZDogZ2V0U3BlZWQsXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICBnZXREZWdyZWVzOiBnZXREZWdyZWVzLFxyXG4gICAgZ2V0RGlzdGFuY2UgOiBnZXREaXN0YW5jZSxcclxuICAgIGdldFBvaW50T2ZJbnRlcmNlcHRpb24sZ2V0UG9pbnRPZkludGVyY2VwdGlvbixcclxuICAgIGdldERlZ3JlZUJldHdlZW5EaXJlY3Rpb25zOiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyxcclxuICAgIGNsb25lOiBjbG9uZSxcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWVcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFZpY3RvcjtcblxuLyoqXG4gKiAjIFZpY3RvciAtIEEgSmF2YVNjcmlwdCAyRCB2ZWN0b3IgY2xhc3Mgd2l0aCBtZXRob2RzIGZvciBjb21tb24gdmVjdG9yIG9wZXJhdGlvbnNcbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdG9yLiBXaWxsIGFsc28gd29yayB3aXRob3V0IHRoZSBgbmV3YCBrZXl3b3JkXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IFZpY3Rvcig0MiwgMTMzNyk7XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggVmFsdWUgb2YgdGhlIHggYXhpc1xuICogQHBhcmFtIHtOdW1iZXJ9IHkgVmFsdWUgb2YgdGhlIHkgYXhpc1xuICogQHJldHVybiB7VmljdG9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVmljdG9yICh4LCB5KSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBWaWN0b3IpKSB7XG5cdFx0cmV0dXJuIG5ldyBWaWN0b3IoeCwgeSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFggYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy54O1xuXHQgKiAgICAgLy8gPT4gNDJcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueCA9IHggfHwgMDtcblxuXHQvKipcblx0ICogVGhlIFkgYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy55O1xuXHQgKiAgICAgLy8gPT4gMjFcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueSA9IHkgfHwgMDtcbn07XG5cbi8qKlxuICogIyBTdGF0aWNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBhcnJheVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gVmljdG9yLmZyb21BcnJheShbNDIsIDIxXSk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NDIsIHk6MjFcbiAqXG4gKiBAbmFtZSBWaWN0b3IuZnJvbUFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBBcnJheSB3aXRoIHRoZSB4IGFuZCB5IHZhbHVlcyBhdCBpbmRleCAwIGFuZCAxIHJlc3BlY3RpdmVseVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuXHRyZXR1cm4gbmV3IFZpY3RvcihhcnJbMF0gfHwgMCwgYXJyWzFdIHx8IDApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGZyb20gYW4gb2JqZWN0XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbU9iamVjdCh7IHg6IDQyLCB5OiAyMSB9KTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB3aXRoIHRoZSB2YWx1ZXMgZm9yIHggYW5kIHlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gVGhlIG5ldyBpbnN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKG9iai54IHx8IDAsIG9iai55IHx8IDApO1xufTtcblxuLyoqXG4gKiAjIE1hbmlwdWxhdGlvblxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhcmUgY2hhaW5hYmxlLlxuICovXG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvcidzIFggYXhpcyB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGRYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggKz0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWSBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSArPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjQwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIGJvdGggdmVjdG9yIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKz0gc2NhbGFyO1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDMsIHk6IDJcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMSwgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgWCBheGlzIG9mIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0WCh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo4MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBZIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RZKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0KHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCAtPSB2ZWMueDtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSBib3RoIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXIoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAtPSBzY2FsYXI7XG5cdHRoaXMueSAtPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXJYKDIwKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiA4MCwgeTogMjAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclkoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDEwMCwgeTogMTgwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgeCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSB5IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IGEgYXhpcyB2YWx1ZXMgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAvPSB2ZWN0b3IueDtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHRcdHRoaXMueSAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueCA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHRpZiAoc2NhbGFyICE9PSAwKSB7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRYKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5OjUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRYID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBZIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRZKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6LTUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRZID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnkgKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6LTEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5pbnZlcnRYKCk7XG5cdHRoaXMuaW52ZXJ0WSgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IFggY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMiwgMCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVggPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAqPSB2ZWN0b3IueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSBZIGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlYKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55ICo9IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyBib3RoIHZlY3RvciBheGlzIGJ5IHZhbHVlcyBmcm9tIGEgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5KHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICo9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTm9ybWFsaXplXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdGlmIChsZW5ndGggPT09IDApIHtcblx0XHR0aGlzLnggPSAxO1xuXHRcdHRoaXMueSA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5kaXZpZGUoVmljdG9yKGxlbmd0aCwgbGVuZ3RoKSk7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm5vcm0gPSBWaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZTtcblxuLyoqXG4gKiBJZiB0aGUgYWJzb2x1dGUgdmVjdG9yIGF4aXMgaXMgZ3JlYXRlciB0aGFuIGBtYXhgLCBtdWx0aXBsaWVzIHRoZSBheGlzIGJ5IGBmYWN0b3JgXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGltaXQoODAsIDAuOSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo5MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggVGhlIG1heGltdW0gdmFsdWUgZm9yIGJvdGggeCBhbmQgeSBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0gZmFjdG9yIEZhY3RvciBieSB3aGljaCB0aGUgYXhpcyBhcmUgdG8gYmUgbXVsdGlwbGllZCB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxpbWl0ID0gZnVuY3Rpb24gKG1heCwgZmFjdG9yKSB7XG5cdGlmIChNYXRoLmFicyh0aGlzLngpID4gbWF4KXsgdGhpcy54ICo9IGZhY3RvcjsgfVxuXHRpZiAoTWF0aC5hYnModGhpcy55KSA+IG1heCl7IHRoaXMueSAqPSBmYWN0b3I7IH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgYm90aCB2ZWN0b3IgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemUobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjY3LCB5OjczXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemUgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVgobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjU1LCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemVYID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdHZhciBtaW4gPSBNYXRoLm1pbih0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgodG9wTGVmdC54LCBib3R0b21SaWdodC54KTtcblx0dGhpcy54ID0gcmFuZG9tKG1pbiwgbWF4KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgdGhlIHkgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemVZKG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODBgKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NjZcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVkgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LnksIGJvdHRvbVJpZ2h0LnkpO1xuXHR0aGlzLnkgPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9tbHkgcmFuZG9taXplcyBlaXRoZXIgYXhpcyBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZUFueShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NzdcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZUFueSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHRpZiAoISEgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSkge1xuXHRcdHRoaXMucmFuZG9taXplWCh0b3BMZWZ0LCBib3R0b21SaWdodCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUm91bmRzIGJvdGggYXhpcyB0byBhbiBpbnRlZ2VyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMC4yLCA1MC45KTtcbiAqXG4gKiAgICAgdmVjLnVuZmxvYXQoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo1MVxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudW5mbG9hdCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xuXHR0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGEgY2VydGFpbiBwcmVjaXNpb25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFByZWNpc2lvbiAoZGVmYXVsdDogOClcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9GaXhlZCA9IGZ1bmN0aW9uIChwcmVjaXNpb24pIHtcblx0aWYgKHR5cGVvZiBwcmVjaXNpb24gPT09ICd1bmRlZmluZWQnKSB7IHByZWNpc2lvbiA9IDg7IH1cblx0dGhpcy54ID0gdGhpcy54LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0dGhpcy55ID0gdGhpcy55LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWCBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WCA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnggPSAoMSAtIGFtb3VudCkgKiB0aGlzLnggKyBhbW91bnQgKiB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWSBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFkodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WSA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnkgPSAoMSAtIGFtb3VudCkgKiB0aGlzLnkgKyBhbW91bnQgKiB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiB0b3dhcmRzIGFub3RoZXIgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjMS5taXgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4ID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdHRoaXMubWl4WCh2ZWMsIGFtb3VudCk7XG5cdHRoaXMubWl4WSh2ZWMsIGFtb3VudCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAjIFByb2R1Y3RzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNsb25lKCk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBBIGNsb25lIG9mIHRoZSB2ZWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKHRoaXMueCwgdGhpcy55KTtcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBjb21wb25lbnQgaW4gdG8gaXRzIG93blxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDIwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY29weVgodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ID0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBZIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WSh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFggYW5kIFkgY29tcG9uZW50cyBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5KHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy5jb3B5WCh2ZWMpO1xuXHR0aGlzLmNvcHlZKHZlYyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2ZWN0b3IgdG8gemVybyAoMCwwKVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqXHRcdCB2YXIxLnplcm8oKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDowLCB5OjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnplcm8gPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCA9IHRoaXMueSA9IDA7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRvdCh2ZWMyKTtcbiAqICAgICAvLyA9PiAyMzAwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRG90IHByb2R1Y3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCAqIHZlYzIueCArIHRoaXMueSAqIHZlYzIueTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUuY3Jvc3MgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gKHRoaXMueCAqIHZlYzIueSApIC0gKHRoaXMueSAqIHZlYzIueCApO1xufTtcblxuLyoqXG4gKiBQcm9qZWN0cyBhIHZlY3RvciBvbnRvIGFub3RoZXIgdmVjdG9yLCBzZXR0aW5nIGl0c2VsZiB0byB0aGUgcmVzdWx0LlxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKlxuICogICAgIHZlYy5wcm9qZWN0T250byh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIHByb2plY3QgdGhpcyB2ZWN0b3Igb250b1xuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5wcm9qZWN0T250byA9IGZ1bmN0aW9uICh2ZWMyKSB7XG4gICAgdmFyIGNvZWZmID0gKCAodGhpcy54ICogdmVjMi54KSsodGhpcy55ICogdmVjMi55KSApIC8gKCh2ZWMyLngqdmVjMi54KSsodmVjMi55KnZlYzIueSkpO1xuICAgIHRoaXMueCA9IGNvZWZmICogdmVjMi54O1xuICAgIHRoaXMueSA9IGNvZWZmICogdmVjMi55O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLmhvcml6b250YWxBbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUudmVydGljYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy54LCB0aGlzLnkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlRGVnID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gcmFkaWFuMmRlZ3JlZXModGhpcy52ZXJ0aWNhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5hbmdsZSA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuVmljdG9yLnByb3RvdHlwZS5hbmdsZURlZyA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlRGVnO1xuVmljdG9yLnByb3RvdHlwZS5kaXJlY3Rpb24gPSBWaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYW5nbGUpIHtcblx0dmFyIG54ID0gKHRoaXMueCAqIE1hdGguY29zKGFuZ2xlKSkgLSAodGhpcy55ICogTWF0aC5zaW4oYW5nbGUpKTtcblx0dmFyIG55ID0gKHRoaXMueCAqIE1hdGguc2luKGFuZ2xlKSkgKyAodGhpcy55ICogTWF0aC5jb3MoYW5nbGUpKTtcblxuXHR0aGlzLnggPSBueDtcblx0dGhpcy55ID0gbnk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZURlZyA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHRhbmdsZSA9IGRlZ3JlZXMycmFkaWFuKGFuZ2xlKTtcblx0cmV0dXJuIHRoaXMucm90YXRlKGFuZ2xlKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG8gPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUocm90YXRpb24tdGhpcy5hbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG9EZWcgPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlVG8ocm90YXRpb24pO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeSA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHR2YXIgYW5nbGUgPSB0aGlzLmFuZ2xlKCkgKyByb3RhdGlvbjtcblxuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeURlZyA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlQnkocm90YXRpb24pO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBvZiB0aGUgWCBheGlzIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gLTEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy54IC0gdmVjLng7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWCgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuYWJzRGlzdGFuY2VYKHZlYzIpO1xuICogICAgIC8vID0+IDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVgodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBZIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0cmV0dXJuIHRoaXMueSAtIHZlYy55O1xufTtcblxuLyoqXG4gKiBTYW1lIGFzIGBkaXN0YW5jZVkoKWAgYnV0IGFsd2F5cyByZXR1cm5zIGFuIGFic29sdXRlIG51bWJlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVkodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2UodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwLjQ5ODc1NjIxMTIwODlcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlU3EodmVjMik7XG4gKiAgICAgLy8gPT4gMTAxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlU3EgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHZhciBkeCA9IHRoaXMuZGlzdGFuY2VYKHZlYyksXG5cdFx0ZHkgPSB0aGlzLmRpc3RhbmNlWSh2ZWMpO1xuXG5cdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9yIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoKCk7XG4gKiAgICAgLy8gPT4gMTExLjgwMzM5ODg3NDk4OTQ4XG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EoKSk7XG59O1xuXG4vKipcbiAqIFNxdWFyZWQgbGVuZ3RoIC8gbWFnbml0dWRlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoU3EoKTtcbiAqICAgICAvLyA9PiAxMjUwMFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoIC8gTWFnbml0dWRlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxlbmd0aFNxID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBWaWN0b3IucHJvdG90eXBlLmxlbmd0aDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJ1ZSBpZiB2ZWN0b3IgaXMgKDAsIDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYy56ZXJvKCk7XG4gKlxuICogICAgIC8vID0+IHRydWVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gMCAmJiB0aGlzLnkgPT09IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHRoaXMgdmVjdG9yIGlzIHRoZSBzYW1lIGFzIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2ZWMxLmlzRXF1YWxUbyh2ZWMyKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzRXF1YWxUbyA9IGZ1bmN0aW9uKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gdmVjMi54ICYmIHRoaXMueSA9PT0gdmVjMi55O1xufTtcblxuLyoqXG4gKiAjIFV0aWxpdHkgTWV0aG9kc1xuICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjIwXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuICd4OicgKyB0aGlzLnggKyAnLCB5OicgKyB0aGlzLnk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9BcnJheSgpO1xuICogICAgIC8vID0+IFsxMCwgMjBdXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBbIHRoaXMueCwgdGhpcy55IF07XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAsIDIwKTtcbiAqXG4gKiAgICAgdmVjLnRvT2JqZWN0KCk7XG4gKiAgICAgLy8gPT4geyB4OiAxMCwgeTogMjAgfVxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH07XG59O1xuXG5cbnZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZnVuY3Rpb24gcmFuZG9tIChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5mdW5jdGlvbiByYWRpYW4yZGVncmVlcyAocmFkKSB7XG5cdHJldHVybiByYWQgKiBkZWdyZWVzO1xufVxuXG5mdW5jdGlvbiBkZWdyZWVzMnJhZGlhbiAoZGVnKSB7XG5cdHJldHVybiBkZWcgLyBkZWdyZWVzO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3ZpY3Rvci9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMiAzXG4gKiovIiwidmFyIHJlc291cmNlQ2FjaGUgPSB7fSxcclxuICAgIHJlYWR5Q2FsbGJhY2s7XHJcblxyXG4vLyBMb2FkIGFuIGltYWdlIHVybCBvciBhbiBhcnJheSBvZiBpbWFnZSB1cmxzXHJcbmZ1bmN0aW9uIGxvYWQodXJsT3JBcnIpIHtcclxuICAgIGlmICh1cmxPckFyciBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgdXJsT3JBcnIuZm9yRWFjaChmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIF9sb2FkKHVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbG9hZCh1cmxPckFycik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9sb2FkKHVybCkge1xyXG4gICAgaWYgKHJlc291cmNlQ2FjaGVbdXJsXSkge1xyXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNhY2hlW3VybF07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gaW1nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlDYWxsYmFjaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGZhbHNlO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldCh1cmwpIHtcclxuICAgIHJldHVybiByZXNvdXJjZUNhY2hlW3VybF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgICB2YXIgcmVhZHkgPSB0cnVlO1xyXG4gICAgZm9yICh2YXIgayBpbiByZXNvdXJjZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKHJlc291cmNlQ2FjaGUuaGFzT3duUHJvcGVydHkoaykgJiYgIXJlc291cmNlQ2FjaGVba10pIHtcclxuICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVhZHk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uUmVhZHkoZnVuYykge1xyXG4gICAgcmVhZHlDYWxsYmFjayA9IGZ1bmM7XHJcbn1cclxuXHJcbnZhciByZXNvdXJjZXMgPSB7XHJcbiAgICBsb2FkOiBsb2FkLFxyXG4gICAgZ2V0OiBnZXQsXHJcbiAgICBvblJlYWR5OiBvblJlYWR5LFxyXG4gICAgaXNSZWFkeTogaXNSZWFkeVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzb3VyY2VzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9yZXNvdXJjZXMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBtb3VzZShjYW52YXMpIHtcclxuICAgICAgICAvLyBISVRURVNUOiBUbyBjb252ZXJ0IHRoZSBtb3VzZSBwb3NpdGlvbiB0byBiZSBjYW52YXMgcmVsYXRpdmUuXHJcbiAgICAgICAgLy8gQkVHSU4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTE0NDY1L2dldHRpbmctbW91c2UtbG9jYXRpb24taW4tY2FudmFzXHJcbiAgICB2YXIgc3R5bGVQYWRkaW5nTGVmdCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ0xlZnQnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVQYWRkaW5nVG9wID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nVG9wJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlQm9yZGVyTGVmdCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyTGVmdFdpZHRoJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlQm9yZGVyVG9wID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydib3JkZXJUb3BXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICAvLyBTb21lIHBhZ2VzIGhhdmUgZml4ZWQtcG9zaXRpb24gYmFycyAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKSBhdCB0aGUgdG9wIG9yIGxlZnQgb2YgdGhlIHBhZ2VcclxuICAgICAgICAvLyBUaGV5IHdpbGwgbWVzcyB1cCBtb3VzZSBjb29yZGluYXRlcyBhbmQgdGhpcyBmaXhlcyB0aGF0XHJcbiAgICAgICAgaHRtbCA9IGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZSxcclxuICAgICAgICBodG1sVG9wID0gaHRtbC5vZmZzZXRUb3AsXHJcbiAgICAgICAgaHRtbExlZnQgPSBodG1sLm9mZnNldExlZnQsXHJcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgdXRpbHMuUG9pbnQoMCwgMCksXHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBwb3MgPSBnZXRQcm9wZXJQb3NpdGlvbihlKTtcclxuXHJcbiAgICAgICAgcG9zaXRpb24ueCA9IHBvcy54O1xyXG4gICAgICAgIHBvc2l0aW9uLnkgPSBwb3MueTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIGdldFByb3BlclBvc2l0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGNhbnZhcyxcclxuICAgICAgICAgICAgb2Zmc2V0WCA9IDAsXHJcbiAgICAgICAgICAgIG9mZnNldFkgPSAwLFxyXG4gICAgICAgICAgICBteCwgbXk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHRvdGFsIG9mZnNldC4gSXQncyBwb3NzaWJsZSB0byBjYWNoZSB0aGlzIGlmIHlvdSB3YW50XHJcbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgcGFkZGluZyBhbmQgYm9yZGVyIHN0eWxlIHdpZHRocyB0byBvZmZzZXRcclxuICAgICAgICAvLyBBbHNvIGFkZCB0aGUgPGh0bWw+IG9mZnNldHMgaW4gY2FzZSB0aGVyZSdzIGEgcG9zaXRpb246Zml4ZWQgYmFyIChsaWtlIHRoZSBzdHVtYmxldXBvbiBiYXIpXHJcbiAgICAgICAgLy8gVGhpcyBwYXJ0IGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnksIGl0IGRlcGVuZHMgb24geW91ciBzdHlsaW5nXHJcbiAgICAgICAgb2Zmc2V0WCArPSBzdHlsZVBhZGRpbmdMZWZ0ICsgc3R5bGVCb3JkZXJMZWZ0ICsgaHRtbExlZnQ7XHJcbiAgICAgICAgb2Zmc2V0WSArPSBzdHlsZVBhZGRpbmdUb3AgKyBzdHlsZUJvcmRlclRvcCArIGh0bWxUb3A7XHJcblxyXG4gICAgICAgIG14ID0gZS5wYWdlWCAtIG9mZnNldFg7XHJcbiAgICAgICAgbXkgPSBlLnBhZ2VZIC0gb2Zmc2V0WTtcclxuXHJcbiAgICAgICAgLy8gV2UgcmV0dXJuIGEgc2ltcGxlIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggeCBhbmQgeSBkZWZpbmVkXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogbXgsXHJcbiAgICAgICAgICAgIHk6IG15XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc01vdXNlRG93bjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE1vdXNlUG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb3VzZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvbW91c2UuanNcbiAqKi8iLCJ2YXIgcHJlc3NlZEtleXMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHNldEtleShldmVudCwgc3RhdHVzKSB7XHJcbiAgICBwcmVzc2VkS2V5c1tldmVudC5rZXlDb2RlXSA9IHN0YXR1cztcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzZXRLZXkoZSwgdHJ1ZSk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2V0S2V5KGUsIGZhbHNlKTtcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHByZXNzZWRLZXlzID0ge307XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Rvd24oa2V5KSB7XHJcbiAgICByZXR1cm4gcHJlc3NlZEtleXNba2V5XTtcclxufVxyXG5cclxudmFyIGlucHV0ID0ge1xyXG4gICAgcHJlc3NlZEtleXM6IHByZXNzZWRLZXlzLFxyXG4gICAgcmVzZXQ6IHJlc2V0LFxyXG4gICAgaXNEb3duOiBpc0Rvd25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlucHV0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbnB1dC5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCByZW5kZXJzIGZyb20gJy4vcmVuZGVyZXJzJztcclxuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5mdW5jdGlvbiBHYW1lT2JqZWN0KGNvbmZpZykge1xyXG4gICAgdGhpcy5sYXllciA9IGNvbmZpZy5sYXllcjtcclxuICAgIGlmIChjb25maWcucG9zIGluc3RhbmNlb2YgdXRpbHMuUG9pbnQpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IGNvbmZpZy5wb3MuY2xvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoY29uZmlnLnBvcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkO1xyXG5cclxuICAgIGlmIChjb25maWcuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMubGF5ZXIuZ2FtZS5jYWNoZSwgY29uZmlnLnNwcml0ZVswXSwgY29uZmlnLnNwcml0ZVsxXSwgY29uZmlnLnNwcml0ZVsyXSwgY29uZmlnLnNwcml0ZVszXSwgY29uZmlnLnNwcml0ZVs0XSwgY29uZmlnLnNwcml0ZVs1XSwgY29uZmlnLnNwcml0ZVs2XSwgY29uZmlnLnNwcml0ZVs3XSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgdGhpcy5zcHJpdGUuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSBjb25maWcuY29sbGlzaW9ucztcclxuICAgIHRoaXMuY2FsbGJhY2tzID0gY29uZmlnLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgIHRoaXMuekluZGV4ID0gY29uZmlnLnpJbmRleCB8fCAwO1xyXG4gICAgdmFyIF9wYXJhbWV0ZXJzID0gY29uZmlnLnBhcmFtZXRlcnMgfHwge30sXHJcbiAgICAgICAgcGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG5cclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG5cclxuICAgIHRoaXMuZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICByZXR1cm4gcGFyYW1ldGVyc1tpZF07XHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihpZCwgdmFsdWUpIHtcclxuICAgICAgICBwYXJhbWV0ZXJzW2lkXSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJzW2lkXTtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldERlZmF1bHRQYXJhbWV0ZXIgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHJldHVybiBfcGFyYW1ldGVyc1tpZF07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcbiAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25maWcuY29uZGl0aW9ucyB8fCBbXTtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5yZW5kZXIpIHtcclxuICAgICAgICBpZiAocmVuZGVyc1tjb25maWcucmVuZGVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlciA9IHJlbmRlcnNbY29uZmlnLnJlbmRlcl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIgPSBjb25maWcucmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuXHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLm9iamVjdENvdW50ID0gMDtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBpZiAodGhpcy5jdXN0b21SZW5kZXIpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmN1c3RvbVJlbmRlcikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1c3RvbVJlbmRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXJbaV0odGhpcywgZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIodGhpcywgZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVuZGVycy5zcHJpdGUodGhpcywgZHQpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXMsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbnMgPSB0aGlzLmNvbmRpdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gbmV3IEdhbWVSdWxlKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bJ2NvbGxpc2lvbnMnXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucy5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBydWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bcnVsZXNbaV1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY29uZGl0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb25kaXRpb24odGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvbltjb25kaXRpb25zW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGVDb25kaXRpb25zID0gZnVuY3Rpb24oZHQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fcmVtb3ZlSW5OZXh0VGljaykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5nYW1lLmNvbGxpc2lvbnMucmVtb3ZlT2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLl9yZW1vdmVJbk5leHRUaWNrID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB0aGlzLnBvcy54ID0gcG9pbnQueDtcclxuICAgIHRoaXMucG9zLnkgPSBwb2ludC55O1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZENvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLmNvbmRpdGlvbnMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvbmRpdGlvbiA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIGNvbmRpdGlvbi5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIGNvbmRpdGlvbi5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zLnB1c2goY29uZGl0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGVDb2xsaXNpb25zID0gZnVuY3Rpb24oZHQpIHtcclxuICAgIHRoaXMuY29sbGlzaW9ucyAmJiB0aGlzLmNvbGxpc2lvbnMudXBkYXRlKGR0LCB0aGlzKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVSdWxlKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSB1dGlscy5jbG9uZSh0aGlzLnBhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lUnVsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZShkdCwgb2JqKTtcclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnNldENvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVMYXllcihjb25maWcpIHtcclxuICAgIHRoaXMub2JqZWN0Q291bnQgPSAwO1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMuaW5pdExpc3QgPSBjb25maWcuaW5pdExpc3Q7XHJcbiAgICB0aGlzLmdhbWUgPSBjb25maWcuZ2FtZTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5nYW1lLmNhY2hlLmdldEltYWdlKGNvbmZpZy5iYWNrZ3JvdW5kKSwgJ3JlcGVhdCcpO1xyXG4gICAgdGhpcy5wb3MgPSBjb25maWcucG9zID8gbmV3IHV0aWxzLlBvaW50KGNvbmZpZy5wb3MpIDogbmV3IHV0aWxzLlBvaW50KDAsIDApO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgW2NvbmZpZy5jdHguY2FudmFzLndpZHRoLCBjb25maWcuY3R4LmNhbnZhcy5oZWlnaHRdO1xyXG4gICAgdGhpcy50cmFuc2xhdGUgPSBjb25maWcudHJhbnNsYXRlIHx8IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMFxyXG4gICAgICAgIH07XHJcbiAgICB0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcbiAgICAgICAgJ2RlZmF1bHQnOiBbXVxyXG4gICAgfTtcclxuICAgIHRoaXMub2JqZWN0cyA9IHt9O1xyXG4gICAgdGhpcy5fcnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbml0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9iamVjdCh0aGlzLmdhbWUuZ2V0Q29uZmlnKHRoaXMuaW5pdExpc3RbaV0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcztcclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgYXJyID0ge30sXHJcbiAgICAgICAgY3R4ID0gdGhpcy5jdHg7XHJcblxyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxuICAgIGN0eC5jbGlwKCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlLngsIHRoaXMudHJhbnNsYXRlLnkpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLnNpemVbMF0gKyA1LCB0aGlzLnNpemVbMV0gKyA1ICk7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIChhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0pIHx8IChhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0gPSBbXSk7XHJcbiAgICAgICAgICAgIGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XS5wdXNoKHRoaXMub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSBpbiBhcnIpIHtcclxuICAgICAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gYXJyW2ldLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoTWF0aC5yb3VuZChhcnJbaV1bal0ucG9zLngpLCBNYXRoLnJvdW5kKGFycltpXVtqXS5wb3MueSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFycltpXVtqXS5yZW5kZXIoZHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHgudHJhbnNsYXRlKC10aGlzLnRyYW5zbGF0ZS54LCAtdGhpcy50cmFuc2xhdGUueSk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCB8fCAhdGhpcy5hY3RpdmUpIHJldHVybjtcclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlQ29sbGlzaW9ucyhkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nYW1lLmNvbGxpc2lvbnMuY2hlY2soKTtcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGVDb25kaXRpb25zKGR0KTtcclxuICAgIH1cclxuXHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVPYmplY3QgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpZF0udHlwZSAmJiB0aGlzLm9iamVjdHNbaWRdLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1t0aGlzLm9iamVjdHNbaWRdLnR5cGVdLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uc3BsaWNlKHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLmluZGV4T2YoaWQpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2lkXSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub2JqZWN0c1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignT2JqZWN0IHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXI6ICcsIGNvbmZpZy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uZmlnLmxheWVyID0gdGhpcztcclxuICAgIHZhciBfb2JqID0gbmV3IEdhbWVPYmplY3QoY29uZmlnKTtcclxuICAgIF9vYmouc2V0TGF5ZXIodGhpcyk7XHJcbiAgICBfb2JqLmluaXQoKTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgKCF0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdKSAmJiAodGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSA9IFtdKTtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goX29iai5pZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnB1c2goX29iai5pZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9iamVjdHNbX29iai5pZF0gPSBfb2JqO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm9iamVjdHNbX29iai5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0T2JqZWN0c0J5VHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICB2YXIgb2JqZWN0c0lkID0gdGhpcy5zb3J0ZWRPYmplY3RzW3R5cGVdIHx8IFtdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzSWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5vYmplY3RzW29iamVjdHNJZFtpXV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5ydWxlc1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lV2luZG93KGNvbmZpZykge1xyXG4gICAgdGhpcy5sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuY2FjaGUgPSBjb25maWcuY2FjaGU7XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNvbmZpZy5jYW52YXM7XHJcbiAgICB0aGlzLnJ1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29uZmlnLmNvbGxpc2lvbnM7XHJcbiAgICB0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcbiAgICB0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuICAgIHRoaXMubGF5ZXJzRGVmaW5pdGlvbiA9IGNvbmZpZy5sYXllcnM7XHJcbiAgICB0aGlzLmlucHV0ID0gY29uZmlnLmlucHV0O1xyXG4gICAgdGhpcy5tb3VzZSA9IGNvbmZpZy5tb3VzZTtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSA/IHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIDogMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnJlbmRlcihkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXIgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBpZiAodGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkob2JqLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0xheWVyIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgd2luZG93Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBvYmouY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgb2JqLmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubGF5ZXJzW29iai5pZF0gPSBuZXcgR2FtZUxheWVyKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzW29iai5pZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IHV0aWxzLmNsb25lKHRoaXMub2JqZWN0c0RlZmluaXRpb25baWRdKTtcclxuXHJcbiAgICAoIWNvbmZpZy5pZCkgJiYgKGNvbmZpZy5pZCA9IGlkKTtcclxuXHJcbiAgICBjb25maWcuaWQgKz0gKHRoaXMub2JqZWN0Q291bnQrKykgKyBNYXRoLnJvdW5kKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyBNYXRoLnJhbmRvbSgpICogMTAwMDAwMSk7XHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllckNvbmZpZyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRSdWxlcyA9IGZ1bmN0aW9uKGNvbmZpZ3MpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZ3MpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBjb25maWdzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUoY29uZmlnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRSdWxlcyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5vYmplY3RDb3VudCA9IDA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lV2luZG93XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL29iamVjdHMuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gaGVhbHRoQmFyKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4LFxyXG4gICAgICAgIHggPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiApLFxyXG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiAtIDcpLFxyXG4gICAgICAgIHdpZHRoID0gb2JqLnNwcml0ZS5zaXplWzBdLFxyXG4gICAgICAgIGhlaWdodCA9IDM7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1xyXG5cclxuICAgIGlmICgob2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykgPiAwKSAmJiAob2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpID4gb2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykpKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDI1MCwgMCwgMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDI1MCwgMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgTWF0aC5yb3VuZCh3aWR0aCAqIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAvIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkpLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gZXhwQmFyKG9iaikge1xyXG4gICAgdmFyIHggPSAtMjIsXHJcbiAgICAgICAgeSA9IDE3LFxyXG4gICAgICAgIHdpZHRoID0gMjAwLFxyXG4gICAgICAgIGhlaWdodCA9IDQwLFxyXG4gICAgICAgIGN0eCA9IG9iai5sYXllci5jdHg7XHJcblxyXG4gICAgY3R4LnRyYW5zbGF0ZSgtb2JqLmxheWVyLnRyYW5zbGF0ZS54LCAtb2JqLmxheWVyLnRyYW5zbGF0ZS55KTtcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAwLCAwKVwiO1xyXG4gICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNEQUE1MjBcIjtcclxuXHJcbiAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgIGlmICggcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW3BsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldICkge1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBNYXRoLm1pbih3aWR0aCwgTWF0aC5yb3VuZCh3aWR0aCAqIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdleHAnKSAvIHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXSkpKSwgaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC50cmFuc2xhdGUob2JqLmxheWVyLnRyYW5zbGF0ZS54LCBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG4gICAgdGV4dFJlbmRlcihvYmopO1xyXG59XHJcbmZ1bmN0aW9uIHNwcml0ZShvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgZHQgJiYgb2JqLnNwcml0ZS51cGRhdGUoZHQpO1xyXG4gICAgb2JqLnNwcml0ZS5yZW5kZXIoY3R4KTtcclxufVxyXG5mdW5jdGlvbiBzaGFkb3cob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHg7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIHV0aWxzLmVsbGlwc2UoY3R4LCAwICwgKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyIC0gMywgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiwgNSwgdXRpbHMuZ2V0UmFkaWFucygwKSwgdXRpbHMuZ2V0UmFkaWFucygwKSwgdXRpbHMuZ2V0UmFkaWFucygzNjApKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG59XHJcbmZ1bmN0aW9uIGVmZmVjdHMob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHgsXHJcbiAgICAgICAgZWZmZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2VmZmVjdHMnKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZWZmZWN0ID0gZWZmZWN0c1tpXTtcclxuICAgICAgICBpZiAoZWZmZWN0ID09ICdmcm96ZW4nKSB7XHJcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuODtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShvYmoubGF5ZXIuZ2FtZS5jYWNoZS5nZXRJbWFnZSgnZnJvc3RFZmZlY3QnKSwgLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyLCAtOCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9iamVjdFJlbmRlcmVyKG9iaiwgZHQpIHtcclxuICAgIHNoYWRvdyhvYmosIGR0KTtcclxuICAgIHNwcml0ZShvYmosIGR0KTtcclxufVxyXG5mdW5jdGlvbiB1bml0UmVuZGVyZXIob2JqLCBkdCkge1xyXG4gICAgc2hhZG93KG9iaiwgZHQpO1xyXG4gICAgaGVhbHRoQmFyKG9iaiwgZHQpO1xyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG4gICAgZWZmZWN0cyhvYmosIGR0KTtcclxufVxyXG5mdW5jdGlvbiBzcGVsbFJlbmRlcmVyKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4LFxyXG4gICAgICAgIHggPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiAtIDQpLFxyXG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiAtIDQpLFxyXG4gICAgICAgIHdpZHRoID0gb2JqLnNwcml0ZS5zaXplWzBdICsgOCxcclxuICAgICAgICBoZWlnaHQgPSBvYmouc3ByaXRlLnNpemVbMV0gKyA4O1xyXG5cclxuICAgIGN0eC50cmFuc2xhdGUoLW9iai5sYXllci50cmFuc2xhdGUueCwgLW9iai5sYXllci50cmFuc2xhdGUueSk7XHJcblxyXG4gICAgaWYgKG9iai5pZC5pbmRleE9mKG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXS5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpKSAhPSAtMSkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAyNTAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggLSAyLCB5IC0gMiwgd2lkdGggKyA0LCBoZWlnaHQgKyA0KTtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuXHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDAsIDApXCI7XHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICBzcHJpdGUob2JqLCBkdCk7XHJcblxyXG4gICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpID4gMCkge1xyXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuODtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjAsIDIwLCAyMClcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgTWF0aC5yb3VuZCh5ICsgaGVpZ2h0IC0gaGVpZ2h0ICogKG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpIC8gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC50cmFuc2xhdGUob2JqLmxheWVyLnRyYW5zbGF0ZS54LCBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG59XHJcbmZ1bmN0aW9uIHRleHRSZW5kZXIob2JqKSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICBmb250Q29uZmlnID0gJyc7XHJcblxyXG4gICAgY3R4LnRyYW5zbGF0ZSgtb2JqLmxheWVyLnRyYW5zbGF0ZS54LCAtb2JqLmxheWVyLnRyYW5zbGF0ZS55KTtcclxuXHJcbiAgICAob2JqLmdldFBhcmFtZXRlcignc3R5bGUnKSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLmdldFBhcmFtZXRlcignc3R5bGUnKSArIFwiIFwiKTtcclxuICAgIChvYmouZ2V0UGFyYW1ldGVyKCd3ZWlnaHQnKSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLmdldFBhcmFtZXRlcignd2VpZ2h0JykgKyBcIiBcIik7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmouZ2V0UGFyYW1ldGVyKCdzaXplJykgfHwgMzApICsgJ3B0ICc7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmouZ2V0UGFyYW1ldGVyKCdmb250JykgfHwgXCJBcmlhbFwiKTtcclxuXHJcbiAgICBpZiAob2JqLmdldFBhcmFtZXRlcignYWxpZ24nKSkge1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBvYmouZ2V0UGFyYW1ldGVyKCdhbGlnbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5mb250ID0gZm9udENvbmZpZztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xvcicpIHx8IFwiI0ZGRlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KG9iai5nZXRQYXJhbWV0ZXIoJ3RleHQnKSwgb2JqLnBvcy54LCBvYmoucG9zLnkpO1xyXG5cclxuICAgIGN0eC50cmFuc2xhdGUob2JqLmxheWVyLnRyYW5zbGF0ZS54LCBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG59XHJcbmZ1bmN0aW9uIGN1cnNvcihvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHgudHJhbnNsYXRlKC1vYmoubGF5ZXIudHJhbnNsYXRlLngsIC1vYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZShvYmoubGF5ZXIudHJhbnNsYXRlLngsIG9iai5sYXllci50cmFuc2xhdGUueSk7XHJcbn1cclxudmFyIHJlbmRlcnMgPSB7XHJcbiAgICBzaGFkb3c6IHNoYWRvdyxcclxuICAgIGV4cEJhcjogZXhwQmFyLFxyXG4gICAgaGVhbHRoQmFyOiBoZWFsdGhCYXIsXHJcbiAgICBjdXJzb3I6IGN1cnNvcixcclxuICAgIHNwcml0ZTogc3ByaXRlLFxyXG4gICAgZWZmZWN0czogZWZmZWN0cyxcclxuICAgIG9iamVjdCA6IG9iamVjdFJlbmRlcmVyLFxyXG4gICAgdGV4dDogdGV4dFJlbmRlcixcclxuICAgIHNwZWxsIDogc3BlbGxSZW5kZXJlcixcclxuICAgIHVuaXQ6IHVuaXRSZW5kZXJlclxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVycztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVuZGVyZXJzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gU3ByaXRlKGNhY2hlLCB1cmwsIHBvcywgc2l6ZSwgc3BlZWQsIGZyYW1lcywgZGlyLCBvbmNlLCBkZWdyZWUpIHtcclxuICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcclxuICAgIGlmIChwb3MgaW5zdGFuY2VvZiB1dGlscy5Qb2ludCkge1xyXG4gICAgICAgIHRoaXMucG9zID0gcG9zLmNsb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucG9zID0gbmV3IHV0aWxzLlBvaW50KHBvcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IHRoaXMucG9zLmNsb25lKCk7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgdGhpcy5zcGVlZCA9IHR5cGVvZiBzcGVlZCA9PT0gJ251bWJlcicgPyBzcGVlZCA6IDA7XHJcbiAgICB0aGlzLmZyYW1lcyA9IHV0aWxzLmNsb25lKGZyYW1lcyk7XHJcbiAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICB0aGlzLnVybCA9IHVybDtcclxuICAgIHRoaXMuZGlyID0gZGlyIHx8ICdob3Jpem9udGFsJztcclxuICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZSB8fCAwO1xyXG59XHJcblxyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX2luZGV4ICs9IHRoaXMuc3BlZWQgKiBkdDtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGVDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnBvcyAmJiAodGhpcy5wb3MgPSBjb25maWcucG9zKTtcclxuICAgICAgICBjb25maWcuc2l6ZSAmJiAodGhpcy5zaXplID0gY29uZmlnLnNpemUpO1xyXG4gICAgICAgIGNvbmZpZy5zcGVlZCAmJiAodGhpcy5zcGVlZCA9IHR5cGVvZiBjb25maWcuc3BlZWQgPT09ICdudW1iZXInID8gY29uZmlnLnNwZWVkIDogMCk7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lcyAmJiAodGhpcy5mcmFtZXMgPSBjb25maWcuZnJhbWVzKTtcclxuICAgICAgICBjb25maWcudXJsICYmICh0aGlzLnVybCA9IGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGNvbmZpZy5kaXIgJiYgKHRoaXMuZGlyID0gY29uZmlnLmRpcik7XHJcbiAgICAgICAgY29uZmlnLm9uY2UgJiYgKHRoaXMub25jZSA9IGNvbmZpZy5vbmNlKTtcclxuICAgICAgICBjb25maWcuZGVncmVlICYmICh0aGlzLmRlZ3JlZSA9IGNvbmZpZy5kZWdyZWUpO1xyXG4gICAgfVxyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJvdGF0ZVRvRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgdmFyIHBvcyA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24uZGlyID09IDEpIHtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKGNvbmZpZy5wb3MgPSBbcG9zLngsIHBvcy55XSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChjb25maWcucG9zID0gW3Bvcy54LCBwb3MueSArIDIgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPCAtMSkgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnkgKyB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoIGRpcmVjdGlvbi5rID09ICd2ZXJ0aWNhbCcpICAmJiAoY29uZmlnLnBvcyA9W3Bvcy54LCBwb3MueSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoIGRpcmVjdGlvbi5rID09ICdob3Jpem9udGFsJykgICYmIChjb25maWcucG9zID1bcG9zLngsIHBvcy55XSk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbi5kaXIgPT0gLTEpIHtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnkgKyB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnkgKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChjb25maWcucG9zID0gW3Bvcy54LCBwb3MueSArIDIgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoIGRpcmVjdGlvbi5rID09ICd2ZXJ0aWNhbCcpICAmJiAoY29uZmlnLnBvcyA9W3Bvcy54LCBwb3MueV0pO1xyXG4gICAgICAgICggZGlyZWN0aW9uLmsgPT0gJ2hvcml6b250YWwnKSAgJiYgKGNvbmZpZy5wb3MgPVtwb3MueCwgcG9zLnkgKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChjb25maWcucG9zKTtcclxuICAgIHRoaXMudXBkYXRlQ29uZmlnKGNvbmZpZyk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgdmFyIGZyYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnNwZWVkID4gMCkge1xyXG4gICAgICAgIHZhciBtYXggPSB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGlkeCA9IE1hdGguZmxvb3IodGhpcy5faW5kZXgpO1xyXG4gICAgICAgIGZyYW1lID0gdGhpcy5mcmFtZXNbaWR4ICUgbWF4XTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25jZSAmJiBpZHggPj0gbWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmcmFtZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHggPSB0aGlzLnBvcy54O1xyXG4gICAgdmFyIHkgPSB0aGlzLnBvcy55O1xyXG5cclxuICAgIGlmICh0aGlzLmRpciA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgeSArPSBmcmFtZSAqIHRoaXMuc2l6ZVsxXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHggKz0gZnJhbWUgKiB0aGlzLnNpemVbMF07XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLmRlZ3JlZSk7XHJcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuY2FjaGUuZ2V0SW1hZ2UodGhpcy51cmwpLFxyXG4gICAgICAgIHgsIHksXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0sXHJcbiAgICAgICAgTWF0aC5yb3VuZCgtdGhpcy5zaXplWzBdIC8gMiksIE1hdGgucm91bmQoLXRoaXMuc2l6ZVsxXSAvIDIpLFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5zZXREZWdyZWUgPSBmdW5jdGlvbiAoZGVncmVlKSB7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvc3ByaXRlLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnXHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZShjb25maWcpIHtcclxuICAgIHZhciBuID0gY29uZmlnLm4gfHwgNixcclxuICAgICAgICB3aWR0aCA9IGNvbmZpZy53aWR0aCB8fCA4MDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gY29uZmlnLmhlaWdodCB8fCA2MDAsXHJcbiAgICAgICAgc2l6ZVggPSAod2lkdGgpID4+IG4sXHJcbiAgICAgICAgc2l6ZVkgPSAoaGVpZ2h0KSA+PiBuLFxyXG4gICAgICAgIGNlbGxHcmlkID0gbmV3IEFycmF5KHNpemVYICogc2l6ZVkpO1xyXG5cclxuICAgIGdlbmVyYXRlTWFwKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsR3JpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjZWxsR3JpZFtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldENlbGwocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gKHBvaW50WzBdKSArIHBvaW50WzFdICogc2l6ZVk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlT2JqZWN0KG9iamVjdCl7XHJcbiAgICAgICAgdmFyIG9sZENlbGxzID0gb2JqZWN0LmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLmNlbGxzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZENlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNlbGxHcmlkW29sZENlbGxzW2ldXSAmJiBjZWxsR3JpZFtvbGRDZWxsc1tpXV0uc3BsaWNlKGNlbGxHcmlkW29sZENlbGxzW2ldXS5pbmRleE9mKG9iamVjdCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVPYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IG9iamVjdC5wb3MsXHJcbiAgICAgICAgICAgIHNpemUgPSBvYmplY3Quc2l6ZSxcclxuICAgICAgICAgICAgY2VsbHMgPSBbXSxcclxuICAgICAgICAgICAgb2xkQ2VsbHMgPSBvYmplY3QuZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJykuY2VsbHMsXHJcbiAgICAgICAgICAgIHhJbmRleCA9IHNpemVbMF0gPj4gbixcclxuICAgICAgICAgICAgeUluZGV4ID0gc2l6ZVsxXSA+PiBuO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKyB4SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDIgKyB5SW5kZXg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChnZXRDZWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAocG9zLnggLSBzaXplWzBdIC8gMiArIGkgKiAoc2l6ZVswXSAvICgxICsgeEluZGV4KSkpID4+IG4sXHJcbiAgICAgICAgICAgICAgICAgICAgKHBvcy55IC0gc2l6ZVsxXSAvIDIgKyBqICogKHNpemVbMV0gLyAoMSArIHlJbmRleCkpKSA+PiBuXHJcbiAgICAgICAgICAgICAgICBdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG9sZENlbGxzW2ldICE9IGNlbGxzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsR3JpZFtvbGRDZWxsc1tpXV0gJiYgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLnNwbGljZShjZWxsR3JpZFtvbGRDZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNlbGxHcmlkW2NlbGxzW2ldXSAmJiAoY2VsbEdyaWRbY2VsbHNbaV1dLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkgJiYgY2VsbEdyaWRbY2VsbHNbaV1dLnB1c2gob2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIG9sZENlbGxzW2ldID0gY2VsbHNbaV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsR3JpZFtjZWxsc1tpXV0gJiYgKGNlbGxHcmlkW2NlbGxzW2ldXS5pbmRleE9mKG9iamVjdCkgPT0gLTEpICYmIGNlbGxHcmlkW2NlbGxzW2ldXS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb2xsaXNpb25zKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNpemVYOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gc2l6ZVk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxHcmlkW2dldENlbGwoW2ksIGpdKV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IGNlbGxHcmlkW2dldENlbGwoW2ksIGpdKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG9iamVjdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGwgPSBrICsgMTsgbCA8IGxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqZWN0c1trXS5wb3MsIG9iamVjdHNba10uc2l6ZSwgb2JqZWN0c1tsXS5wb3MsIG9iamVjdHNbbF0uc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqZWN0c1trXS5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKS5pbmRleE9mKG9iamVjdHNbbF0pID09IC0xICkgJiYgb2JqZWN0c1trXS5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKS5wdXNoKG9iamVjdHNbbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3RzW2xdLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLmluZGV4T2Yob2JqZWN0c1trXSkgPT0gLTEgKSAmJiBvYmplY3RzW2xdLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLnB1c2gob2JqZWN0c1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjZWxsR3JpZDogY2VsbEdyaWQsXHJcbiAgICAgICAgdXBkYXRlT2JqZWN0OiB1cGRhdGVPYmplY3QsXHJcbiAgICAgICAgcmVtb3ZlT2JqZWN0OiByZW1vdmVPYmplY3QsXHJcbiAgICAgICAgY2hlY2s6IGNoZWNrQ29sbGlzaW9ucyxcclxuICAgICAgICBjbGVhcjogZ2VuZXJhdGVNYXBcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9jb2xsaXNpb25zLmpzXG4gKiovIiwiLyohXG4gKiAgaG93bGVyLmpzIHYxLjEuMjhcbiAqICBob3dsZXJqcy5jb21cbiAqXG4gKiAgKGMpIDIwMTMtMjAxNSwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxuICpcbiAqICBNSVQgTGljZW5zZVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gc2V0dXBcbiAgdmFyIGNhY2hlID0ge307XG5cbiAgLy8gc2V0dXAgdGhlIGF1ZGlvIGNvbnRleHRcbiAgdmFyIGN0eCA9IG51bGwsXG4gICAgdXNpbmdXZWJBdWRpbyA9IHRydWUsXG4gICAgbm9BdWRpbyA9IGZhbHNlO1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgQXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3R4ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN0eCA9IG5ldyB3ZWJraXRBdWRpb0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7XG4gICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCF1c2luZ1dlYkF1ZGlvKSB7XG4gICAgaWYgKHR5cGVvZiBBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBBdWRpbygpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIG5vQXVkaW8gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub0F1ZGlvID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYSBtYXN0ZXIgZ2FpbiBub2RlXG4gIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgdmFyIG1hc3RlckdhaW4gPSAodHlwZW9mIGN0eC5jcmVhdGVHYWluID09PSAndW5kZWZpbmVkJykgPyBjdHguY3JlYXRlR2Fpbk5vZGUoKSA6IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gMTtcbiAgICBtYXN0ZXJHYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBnbG9iYWwgY29udHJvbGxlclxuICB2YXIgSG93bGVyR2xvYmFsID0gZnVuY3Rpb24oY29kZWNzKSB7XG4gICAgdGhpcy5fdm9sdW1lID0gMTtcbiAgICB0aGlzLl9tdXRlZCA9IGZhbHNlO1xuICAgIHRoaXMudXNpbmdXZWJBdWRpbyA9IHVzaW5nV2ViQXVkaW87XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5ub0F1ZGlvID0gbm9BdWRpbztcbiAgICB0aGlzLl9ob3dscyA9IFtdO1xuICAgIHRoaXMuX2NvZGVjcyA9IGNvZGVjcztcbiAgICB0aGlzLmlPU0F1dG9FbmFibGUgPSB0cnVlO1xuICB9O1xuICBIb3dsZXJHbG9iYWwucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIGdsb2JhbCB2b2x1bWUgZm9yIGFsbCBzb3VuZHMuXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZvbCBWb2x1bWUgZnJvbSAwLjAgdG8gMS4wLlxuICAgICAqIEByZXR1cm4ge0hvd2xlci9GbG9hdH0gICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHZvbHVtZS5cbiAgICAgKi9cbiAgICB2b2x1bWU6IGZ1bmN0aW9uKHZvbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdm9sdW1lIGlzIGEgbnVtYmVyXG4gICAgICB2b2wgPSBwYXJzZUZsb2F0KHZvbCk7XG5cbiAgICAgIGlmICh2b2wgPj0gMCAmJiB2b2wgPD0gMSkge1xuICAgICAgICBzZWxmLl92b2x1bWUgPSB2b2w7XG5cbiAgICAgICAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSB2b2w7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRocm91Z2ggY2FjaGUgYW5kIGNoYW5nZSB2b2x1bWUgb2YgYWxsIG5vZGVzIHRoYXQgYXJlIHVzaW5nIEhUTUw1IEF1ZGlvXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICAgIGlmIChzZWxmLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNlbGYuX2hvd2xzW2tleV0uX3dlYkF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhdWRpbyBub2Rlc1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGVbaV0udm9sdW1lID0gc2VsZi5faG93bHNba2V5XS5fdm9sdW1lICogc2VsZi5fdm9sdW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsIHZvbHVtZVxuICAgICAgcmV0dXJuICh1c2luZ1dlYkF1ZGlvKSA/IG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA6IHNlbGYuX3ZvbHVtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXV0ZSBhbGwgc291bmRzLlxuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NldE11dGVkKHRydWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tdXRlIGFsbCBzb3VuZHMuXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zZXRNdXRlZChmYWxzZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbXV0aW5nIGFuZCB1bm11dGluZyBnbG9iYWxseS5cbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBtdXRlZCBJcyBtdXRlZCBvciBub3QuXG4gICAgICovXG4gICAgX3NldE11dGVkOiBmdW5jdGlvbihtdXRlZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBzZWxmLl9tdXRlZCA9IG11dGVkO1xuXG4gICAgICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSBtdXRlZCA/IDAgOiBzZWxmLl92b2x1bWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICBpZiAoc2VsZi5faG93bHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzZWxmLl9ob3dsc1trZXldLl93ZWJBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGF1ZGlvIG5vZGVzXG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlW2ldLm11dGVkID0gbXV0ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBjb2RlYyBzdXBwb3J0LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZXh0IEF1ZGlvIGZpbGUgZXh0ZW50aW9uLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgY29kZWNzOiBmdW5jdGlvbihleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2RlY3NbZXh0XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaU9TIHdpbGwgb25seSBhbGxvdyBhdWRpbyB0byBiZSBwbGF5ZWQgYWZ0ZXIgYSB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIEF0dGVtcHQgdG8gYXV0b21hdGljYWxseSB1bmxvY2sgYXVkaW8gb24gdGhlIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQ29uY2VwdCBmcm9tOiBodHRwOi8vcGF1bGJha2F1cy5jb20vdHV0b3JpYWxzL2h0bWw1L3dlYi1hdWRpby1vbi1pb3MvXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIF9lbmFibGVpT1NBdWRpbzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG9ubHkgcnVuIHRoaXMgb24gaU9TIGlmIGF1ZGlvIGlzbid0IGFscmVhZHkgZWFuYmxlZFxuICAgICAgaWYgKGN0eCAmJiAoc2VsZi5faU9TRW5hYmxlZCB8fCAhL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2lPU0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgLy8gY2FsbCB0aGlzIG1ldGhvZCBvbiB0b3VjaCBzdGFydCB0byBjcmVhdGUgYW5kIHBsYXkgYSBidWZmZXIsXG4gICAgICAvLyB0aGVuIGNoZWNrIGlmIHRoZSBhdWRpbyBhY3R1YWxseSBwbGF5ZWQgdG8gZGV0ZXJtaW5lIGlmXG4gICAgICAvLyBhdWRpbyBoYXMgbm93IGJlZW4gdW5sb2NrZWQgb24gaU9TXG4gICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBidWZmZXJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgMSwgMjIwNTApO1xuICAgICAgICB2YXIgc291cmNlID0gY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICBzb3VyY2UuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICAgIC8vIHBsYXkgdGhlIGVtcHR5IGJ1ZmZlclxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZS5zdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBzb3VyY2Uubm90ZU9uKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvdXJjZS5zdGFydCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHVwIGEgdGltZW91dCB0byBjaGVjayB0aGF0IHdlIGFyZSB1bmxvY2tlZCBvbiB0aGUgbmV4dCBldmVudCBsb29wXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKChzb3VyY2UucGxheWJhY2tTdGF0ZSA9PT0gc291cmNlLlBMQVlJTkdfU1RBVEUgfHwgc291cmNlLnBsYXliYWNrU3RhdGUgPT09IHNvdXJjZS5GSU5JU0hFRF9TVEFURSkpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdW5sb2NrZWQgc3RhdGUgYW5kIHByZXZlbnQgdGhpcyBjaGVjayBmcm9tIGhhcHBlbmluZyBhZ2FpblxuICAgICAgICAgICAgc2VsZi5faU9TRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmlPU0F1dG9FbmFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0b3VjaCBzdGFydCBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNldHVwIGEgdG91Y2ggc3RhcnQgbGlzdGVuZXIgdG8gYXR0ZW1wdCBhbiB1bmxvY2sgaW5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9jaywgZmFsc2UpO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2hlY2sgZm9yIGJyb3dzZXIgY29kZWMgc3VwcG9ydFxuICB2YXIgYXVkaW9UZXN0ID0gbnVsbDtcbiAgdmFyIGNvZGVjcyA9IHt9O1xuICBpZiAoIW5vQXVkaW8pIHtcbiAgICBhdWRpb1Rlc3QgPSBuZXcgQXVkaW8oKTtcbiAgICBjb2RlY3MgPSB7XG4gICAgICBtcDM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tcGVnOycpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBvcHVzOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgb2dnOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICB3YXY6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBhYWM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG00YTogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW00YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL200YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG1wNDogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW1wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL21wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIHdlYmE6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJylcbiAgICB9O1xuICB9XG5cbiAgLy8gYWxsb3cgYWNjZXNzIHRvIHRoZSBnbG9iYWwgYXVkaW8gY29udHJvbHNcbiAgdmFyIEhvd2xlciA9IG5ldyBIb3dsZXJHbG9iYWwoY29kZWNzKTtcblxuICAvLyBzZXR1cCB0aGUgYXVkaW8gb2JqZWN0XG4gIHZhciBIb3dsID0gZnVuY3Rpb24obykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIHNldHVwIHRoZSBkZWZhdWx0c1xuICAgIHNlbGYuX2F1dG9wbGF5ID0gby5hdXRvcGxheSB8fCBmYWxzZTtcbiAgICBzZWxmLl9idWZmZXIgPSBvLmJ1ZmZlciB8fCBmYWxzZTtcbiAgICBzZWxmLl9kdXJhdGlvbiA9IG8uZHVyYXRpb24gfHwgMDtcbiAgICBzZWxmLl9mb3JtYXQgPSBvLmZvcm1hdCB8fCBudWxsO1xuICAgIHNlbGYuX2xvb3AgPSBvLmxvb3AgfHwgZmFsc2U7XG4gICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgc2VsZi5fc3ByaXRlID0gby5zcHJpdGUgfHwge307XG4gICAgc2VsZi5fc3JjID0gby5zcmMgfHwgJyc7XG4gICAgc2VsZi5fcG9zM2QgPSBvLnBvczNkIHx8IFswLCAwLCAtMC41XTtcbiAgICBzZWxmLl92b2x1bWUgPSBvLnZvbHVtZSAhPT0gdW5kZWZpbmVkID8gby52b2x1bWUgOiAxO1xuICAgIHNlbGYuX3VybHMgPSBvLnVybHMgfHwgW107XG4gICAgc2VsZi5fcmF0ZSA9IG8ucmF0ZSB8fCAxO1xuXG4gICAgLy8gYWxsb3cgZm9yY2luZyBvZiBhIHNwZWNpZmljIHBhbm5pbmdNb2RlbCAoJ2VxdWFscG93ZXInIG9yICdIUlRGJyksXG4gICAgLy8gaWYgbm9uZSBpcyBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvICdlcXVhbHBvd2VyJyBhbmQgc3dpdGNoZXMgdG8gJ0hSVEYnXG4gICAgLy8gaWYgM2Qgc291bmQgaXMgdXNlZFxuICAgIHNlbGYuX21vZGVsID0gby5tb2RlbCB8fCBudWxsO1xuXG4gICAgLy8gc2V0dXAgZXZlbnQgZnVuY3Rpb25zXG4gICAgc2VsZi5fb25sb2FkID0gW28ub25sb2FkIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ubG9hZGVycm9yID0gW28ub25sb2FkZXJyb3IgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25lbmQgPSBbby5vbmVuZCB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBhdXNlID0gW28ub25wYXVzZSB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBsYXkgPSBbby5vbnBsYXkgfHwgZnVuY3Rpb24oKSB7fV07XG5cbiAgICBzZWxmLl9vbmVuZFRpbWVyID0gW107XG5cbiAgICAvLyBXZWIgQXVkaW8gb3IgSFRNTDUgQXVkaW8/XG4gICAgc2VsZi5fd2ViQXVkaW8gPSB1c2luZ1dlYkF1ZGlvICYmICFzZWxmLl9idWZmZXI7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byBIVE1MNSBBdWRpb1xuICAgIHNlbGYuX2F1ZGlvTm9kZSA9IFtdO1xuICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgc2VsZi5fc2V0dXBBdWRpb05vZGUoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbWF0aWNhbGx5IHRyeSB0byBlbmFibGUgYXVkaW8gb24gaU9TXG4gICAgaWYgKHR5cGVvZiBjdHggIT09ICd1bmRlZmluZWQnICYmIGN0eCAmJiBIb3dsZXIuaU9TQXV0b0VuYWJsZSkge1xuICAgICAgSG93bGVyLl9lbmFibGVpT1NBdWRpbygpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGlzIHRvIGFuIGFycmF5IG9mIEhvd2wncyB0byBhbGxvdyBnbG9iYWwgY29udHJvbFxuICAgIEhvd2xlci5faG93bHMucHVzaChzZWxmKTtcblxuICAgIC8vIGxvYWQgdGhlIHRyYWNrXG4gICAgc2VsZi5sb2FkKCk7XG4gIH07XG5cbiAgLy8gc2V0dXAgYWxsIG9mIHRoZSBtZXRob2RzXG4gIEhvd2wucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIExvYWQgYW4gYXVkaW8gZmlsZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB1cmwgPSBudWxsO1xuXG4gICAgICAvLyBpZiBubyBhdWRpbyBpcyBhdmFpbGFibGUsIHF1aXQgaW1tZWRpYXRlbHlcbiAgICAgIGlmIChub0F1ZGlvKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBzb3VyY2UgVVJMcyBhbmQgcGljayB0aGUgZmlyc3Qgb25lIHRoYXQgaXMgY29tcGF0aWJsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX3VybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGV4dCwgdXJsSXRlbTtcblxuICAgICAgICBpZiAoc2VsZi5fZm9ybWF0KSB7XG4gICAgICAgICAgLy8gdXNlIHNwZWNpZmllZCBhdWRpbyBmb3JtYXQgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgZXh0ID0gc2VsZi5fZm9ybWF0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIGZpbGV0eXBlICh3aGV0aGVyIGFuIGV4dGVuc2lvbiBvciBiYXNlNjQgZGF0YSlcbiAgICAgICAgICB1cmxJdGVtID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBleHQgPSAvXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKHVybEl0ZW0pO1xuICAgICAgICAgIGlmICghZXh0KSB7XG4gICAgICAgICAgICBleHQgPSAvXFwuKFteLl0rKSQvLmV4ZWModXJsSXRlbS5zcGxpdCgnPycsIDEpWzBdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXh0KSB7XG4gICAgICAgICAgICBleHQgPSBleHRbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGVjc1tleHRdKSB7XG4gICAgICAgICAgdXJsID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9zcmMgPSB1cmw7XG5cbiAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICBsb2FkQnVmZmVyKHNlbGYsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBBdWRpbygpO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIHdpdGggSFRNTDUgYXVkaW8gKGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvc3BlYy5odG1sI21lZGlhZXJyb3IpXG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG5ld05vZGUuZXJyb3IgJiYgbmV3Tm9kZS5lcnJvci5jb2RlID09PSA0KSB7XG4gICAgICAgICAgICBIb3dsZXJHbG9iYWwubm9BdWRpbyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJywge3R5cGU6IG5ld05vZGUuZXJyb3IgPyBuZXdOb2RlLmVycm9yLmNvZGUgOiAwfSk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBzZWxmLl9hdWRpb05vZGUucHVzaChuZXdOb2RlKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgbmV3IGF1ZGlvIG5vZGVcbiAgICAgICAgbmV3Tm9kZS5zcmMgPSB1cmw7XG4gICAgICAgIG5ld05vZGUuX3BvcyA9IDA7XG4gICAgICAgIG5ld05vZGUucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgbmV3Tm9kZS52b2x1bWUgPSAoSG93bGVyLl9tdXRlZCkgPyAwIDogc2VsZi5fdm9sdW1lICogSG93bGVyLnZvbHVtZSgpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBldmVudCBsaXN0ZW5lciB0byBzdGFydCBwbGF5aW5nIHRoZSBzb3VuZFxuICAgICAgICAvLyBhcyBzb29uIGFzIGl0IGhhcyBidWZmZXJlZCBlbm91Z2hcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gcm91bmQgdXAgdGhlIGR1cmF0aW9uIHdoZW4gdXNpbmcgSFRNTDUgQXVkaW8gdG8gYWNjb3VudCBmb3IgdGhlIGxvd2VyIHByZWNpc2lvblxuICAgICAgICAgIHNlbGYuX2R1cmF0aW9uID0gTWF0aC5jZWlsKG5ld05vZGUuZHVyYXRpb24gKiAxMCkgLyAxMDtcblxuICAgICAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLl9zcHJpdGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5fc3ByaXRlID0ge19kZWZhdWx0OiBbMCwgc2VsZi5fZHVyYXRpb24gKiAxMDAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgICAgIHNlbGYuX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLm9uKCdsb2FkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYuX2F1dG9wbGF5KSB7XG4gICAgICAgICAgICBzZWxmLnBsYXkoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjbGVhciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIG5ld05vZGUubG9hZCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgVVJMcyB0byBiZSBwdWxsZWQgZnJvbSB0byBwbGF5IGluIHRoaXMgc291cmNlLlxuICAgICAqIEBwYXJhbSAge0FycmF5fSB1cmxzICBBcnJ5IG9mIFVSTHMgdG8gbG9hZCBmcm9tXG4gICAgICogQHJldHVybiB7SG93bH0gICAgICAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCBVUkxzXG4gICAgICovXG4gICAgdXJsczogZnVuY3Rpb24odXJscykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodXJscykge1xuICAgICAgICBzZWxmLnN0b3AoKTtcbiAgICAgICAgc2VsZi5fdXJscyA9ICh0eXBlb2YgdXJscyA9PT0gJ3N0cmluZycpID8gW3VybHNdIDogdXJscztcbiAgICAgICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3VybHM7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgYSBzb3VuZCBmcm9tIHRoZSBjdXJyZW50IHRpbWUgKDAgYnkgZGVmYXVsdCkuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIHNwcml0ZSAgIChvcHRpb25hbCkgUGxheXMgZnJvbSB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSBzb3VuZCBzcHJpdGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBSZXR1cm5zIHRoZSB1bmlxdWUgcGxheWJhY2sgaWQgZm9yIHRoaXMgc291bmQgaW5zdGFuY2UuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwbGF5OiBmdW5jdGlvbihzcHJpdGUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIG5vIHNwcml0ZSB3YXMgcGFzc2VkIGJ1dCBhIGNhbGxiYWNrIHdhcywgdXBkYXRlIHRoZSB2YXJpYWJsZXNcbiAgICAgIGlmICh0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gc3ByaXRlO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIGRlZmF1bHQgc3ByaXRlIGlmIG5vbmUgaXMgcGFzc2VkXG4gICAgICBpZiAoIXNwcml0ZSB8fCB0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNwcml0ZSA9ICdfZGVmYXVsdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBsYXkoc3ByaXRlLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgc3ByaXRlIGRvZXNuJ3QgZXhpc3QsIHBsYXkgbm90aGluZ1xuICAgICAgaWYgKCFzZWxmLl9zcHJpdGVbc3ByaXRlXSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBub2RlIHRvIHBsYXliYWNrXG4gICAgICBzZWxmLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAvLyBwZXJzaXN0IHRoZSBzcHJpdGUgYmVpbmcgcGxheWVkXG4gICAgICAgIG5vZGUuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gc3RhcnQgcGxheWluZyBmcm9tXG4gICAgICAgIHZhciBwb3MgPSAobm9kZS5fcG9zID4gMCkgPyBub2RlLl9wb3MgOiBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDA7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyBsb25nIHRvIHBsYXkgZm9yXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IDA7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gbm9kZS5fcG9zO1xuICAgICAgICAgIGlmIChub2RlLl9wb3MgPiAwKSB7XG4gICAgICAgICAgICBwb3MgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDAgKyBwb3M7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gKHBvcyAtIHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBzb3VuZCBzaG91bGQgYmUgbG9vcGVkXG4gICAgICAgIHZhciBsb29wID0gISEoc2VsZi5fbG9vcCB8fCBzZWxmLl9zcHJpdGVbc3ByaXRlXVsyXSk7XG5cbiAgICAgICAgLy8gc2V0IHRpbWVyIHRvIGZpcmUgdGhlICdvbmVuZCcgZXZlbnRcbiAgICAgICAgdmFyIHNvdW5kSWQgPSAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykgPyBjYWxsYmFjayA6IE1hdGgucm91bmQoRGF0ZS5ub3coKSAqIE1hdGgucmFuZG9tKCkpICsgJycsXG4gICAgICAgICAgdGltZXJJZDtcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6IHNvdW5kSWQsXG4gICAgICAgICAgICBzcHJpdGU6IHNwcml0ZSxcbiAgICAgICAgICAgIGxvb3A6IGxvb3BcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgbG9vcGluZywgcmVzdGFydCB0aGUgdHJhY2tcbiAgICAgICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8gJiYgbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCkucGxheShzcHJpdGUsIGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgd2ViIGF1ZGlvIG5vZGUgdG8gcGF1c2VkIGF0IGVuZFxuICAgICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLl9wb3MgPSAwO1xuXG4gICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBlbmQgdGltZXJcbiAgICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZW5kIHRoZSB0cmFjayBpZiBpdCBpcyBIVE1MIGF1ZGlvIGFuZCBhIHNwcml0ZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbyAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpcmUgZW5kZWQgZXZlbnRcbiAgICAgICAgICAgIHNlbGYub24oJ2VuZCcsIHNvdW5kSWQpO1xuICAgICAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG5cbiAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVmZXJlbmNlIHRvIHRoZSB0aW1lclxuICAgICAgICAgIHNlbGYuX29uZW5kVGltZXIucHVzaCh7dGltZXI6IHRpbWVySWQsIGlkOiBkYXRhLmlkfSk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGxvb3BTdGFydCA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCxcbiAgICAgICAgICAgIGxvb3BFbmQgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDA7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHBsYXkgaWQgdG8gdGhpcyBub2RlIGFuZCBsb2FkIGludG8gY29udGV4dFxuICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgIG5vZGUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgcmVmcmVzaEJ1ZmZlcihzZWxmLCBbbG9vcCwgbG9vcFN0YXJ0LCBsb29wRW5kXSwgc291bmRJZCk7XG4gICAgICAgICAgc2VsZi5fcGxheVN0YXJ0ID0gY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgICAgIG5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBsb29wID8gbm9kZS5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCwgcG9zLCA4NjQwMCkgOiBub2RlLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLCBwb3MsIGR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9vcCA/IG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHBvcywgODY0MDApIDogbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQoMCwgcG9zLCBkdXJhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChub2RlLnJlYWR5U3RhdGUgPT09IDQgfHwgIW5vZGUucmVhZHlTdGF0ZSAmJiBuYXZpZ2F0b3IuaXNDb2Nvb25KUykge1xuICAgICAgICAgICAgbm9kZS5yZWFkeVN0YXRlID0gNDtcbiAgICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgICAgbm9kZS5jdXJyZW50VGltZSA9IHBvcztcbiAgICAgICAgICAgIG5vZGUubXV0ZWQgPSBIb3dsZXIuX211dGVkIHx8IG5vZGUubXV0ZWQ7XG4gICAgICAgICAgICBub2RlLnZvbHVtZSA9IHNlbGYuX3ZvbHVtZSAqIEhvd2xlci52b2x1bWUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IG5vZGUucGxheSgpOyB9LCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihzb3VuZElkKTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHZhciBzb3VuZCA9IHNlbGYsXG4gICAgICAgICAgICAgICAgcGxheVNwcml0ZSA9IHNwcml0ZSxcbiAgICAgICAgICAgICAgICBmbiA9IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG5ld05vZGUgPSBub2RlO1xuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzb3VuZC5wbGF5KHBsYXlTcHJpdGUsIGZuKTtcblxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcmUgdGhlIHBsYXkgZXZlbnQgYW5kIHNlbmQgdGhlIHNvdW5kSWQgYmFjayBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5vbigncGxheScpO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhzb3VuZElkKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGF1c2UgcGxheWJhY2sgYW5kIHNhdmUgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwYXVzZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgJ29uZW5kJyB0aW1lclxuICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihpZCk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHNlbGYucG9zKG51bGwsIGlkKTtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYub24oJ3BhdXNlJyk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHBsYXliYWNrIGFuZCByZXNldCB0byBzdGFydC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuc3RvcChpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciAnb25lbmQnIHRpbWVyXG4gICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGlkKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gMDtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oYWN0aXZlTm9kZS5kdXJhdGlvbikpIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlKCk7XG4gICAgICAgICAgYWN0aXZlTm9kZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubXV0ZSB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudW5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLm11dGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdm9sdW1lIG9mIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB2b2wgVm9sdW1lIGZyb20gMC4wIHRvIDEuMC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvRmxvYXR9ICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCB2b2x1bWUuXG4gICAgICovXG4gICAgdm9sdW1lOiBmdW5jdGlvbih2b2wsIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB2b2x1bWUgaXMgYSBudW1iZXJcbiAgICAgIHZvbCA9IHBhcnNlRmxvYXQodm9sKTtcblxuICAgICAgaWYgKHZvbCA+PSAwICYmIHZvbCA8PSAxKSB7XG4gICAgICAgIHNlbGYuX3ZvbHVtZSA9IHZvbDtcblxuICAgICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi52b2x1bWUodm9sLCBpZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHZvbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS52b2x1bWUgPSB2b2wgKiBIb3dsZXIudm9sdW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fdm9sdW1lO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHdoZXRoZXIgdG8gbG9vcCB0aGUgc291bmQuXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbG9vcCBUbyBsb29wIG9yIG5vdCB0byBsb29wLCB0aGF0IGlzIHRoZSBxdWVzdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Jvb2xlYW59ICAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgbG9vcGluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBsb29wOiBmdW5jdGlvbihsb29wKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgbG9vcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHNlbGYuX2xvb3AgPSBsb29wO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX2xvb3A7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgc291bmQgc3ByaXRlIGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBzcHJpdGUgRXhhbXBsZToge3Nwcml0ZU5hbWU6IFtvZmZzZXQsIGR1cmF0aW9uLCBsb29wXX1cbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0ludGVnZXJ9IG9mZnNldCAgIFdoZXJlIHRvIGJlZ2luIHBsYXliYWNrIGluIG1pbGxpc2Vjb25kc1xuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7SW50ZWdlcn0gZHVyYXRpb24gSG93IGxvbmcgdG8gcGxheSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgICAgIChvcHRpb25hbCkgU2V0IHRydWUgdG8gbG9vcCB0aGlzIHNwcml0ZVxuICAgICAqIEByZXR1cm4ge0hvd2x9ICAgICAgICBSZXR1cm5zIGN1cnJlbnQgc3ByaXRlIHNoZWV0IG9yIHNlbGYuXG4gICAgICovXG4gICAgc3ByaXRlOiBmdW5jdGlvbihzcHJpdGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBzcHJpdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNlbGYuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9zcHJpdGU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIHBvc2l0aW9uIG9mIHBsYXliYWNrLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgcG9zIFRoZSBwb3NpdGlvbiB0byBtb3ZlIGN1cnJlbnQgcGxheWJhY2sgdG8uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Zsb2F0fSAgICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHBvczogZnVuY3Rpb24ocG9zLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wb3MocG9zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwb3MgPT09ICdudW1iZXInID8gc2VsZiA6IHNlbGYuX3BvcyB8fCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIGRlYWxpbmcgd2l0aCBhIG51bWJlciBmb3IgcG9zXG4gICAgICBwb3MgPSBwYXJzZUZsb2F0KHBvcyk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHBvcztcbiAgICAgICAgICBzZWxmLnBsYXkoYWN0aXZlTm9kZS5fc3ByaXRlLCBpZCk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5fd2ViQXVkaW8gPyBhY3RpdmVOb2RlLl9wb3MgKyAoY3R4LmN1cnJlbnRUaW1lIC0gc2VsZi5fcGxheVN0YXJ0KSA6IGFjdGl2ZU5vZGUuY3VycmVudFRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocG9zID49IDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbmFjdGl2ZSBub2RlIHRvIHJldHVybiB0aGUgcG9zIGZvclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQgJiYgc2VsZi5fYXVkaW9Ob2RlW2ldLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi5fd2ViQXVkaW8pID8gc2VsZi5fYXVkaW9Ob2RlW2ldLl9wb3MgOiBzZWxmLl9hdWRpb05vZGVbaV0uY3VycmVudFRpbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIDNEIHBvc2l0aW9uIG9mIHRoZSBhdWRpbyBzb3VyY2UuXG4gICAgICogVGhlIG1vc3QgY29tbW9uIHVzYWdlIGlzIHRvIHNldCB0aGUgJ3gnIHBvc2l0aW9uXG4gICAgICogdG8gYWZmZWN0IHRoZSBsZWZ0L3JpZ2h0IGVhciBwYW5uaW5nLiBTZXR0aW5nIGFueSB2YWx1ZSBoaWdoZXIgdGhhblxuICAgICAqIDEuMCB3aWxsIGJlZ2luIHRvIGRlY3JlYXNlIHRoZSB2b2x1bWUgb2YgdGhlIHNvdW5kIGFzIGl0IG1vdmVzIGZ1cnRoZXIgYXdheS5cbiAgICAgKiBOT1RFOiBUaGlzIG9ubHkgd29ya3Mgd2l0aCBXZWIgQXVkaW8gQVBJLCBIVE1MNSBBdWRpbyBwbGF5YmFja1xuICAgICAqIHdpbGwgbm90IGJlIGFmZmVjdGVkLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeCAgVGhlIHgtcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHkgIFRoZSB5LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB6ICBUaGUgei1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0FycmF5fSAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCAzRCBwb3NpdGlvbjogW3gsIHksIHpdXG4gICAgICovXG4gICAgcG9zM2Q6IGZ1bmN0aW9uKHgsIHksIHosIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHNldCBhIGRlZmF1bHQgZm9yIHRoZSBvcHRpb25hbCAneScgJiAneidcbiAgICAgIHkgPSAodHlwZW9mIHkgPT09ICd1bmRlZmluZWQnIHx8ICF5KSA/IDAgOiB5O1xuICAgICAgeiA9ICh0eXBlb2YgeiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXopID8gLTAuNSA6IHo7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBvczNkKHgsIHksIHosIGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIGlmICh4ID49IDAgfHwgeCA8IDApIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgICAgICBzZWxmLl9wb3MzZCA9IFt4LCB5LCB6XTtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUucGFubmVyLnNldFBvc2l0aW9uKHgsIHksIHopO1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5wYW5uZXIucGFubmluZ01vZGVsID0gc2VsZi5fbW9kZWwgfHwgJ0hSVEYnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3BvczNkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRmFkZSBhIGN1cnJlbnRseSBwbGF5aW5nIHNvdW5kIGJldHdlZW4gdHdvIHZvbHVtZXMuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGZyb20gICAgIFRoZSB2b2x1bWUgdG8gZmFkZSBmcm9tICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgdG8gICAgICAgVGhlIHZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBGaXJlZCB3aGVuIHRoZSBmYWRlIGlzIGNvbXBsZXRlLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZTogZnVuY3Rpb24oZnJvbSwgdG8sIGxlbiwgY2FsbGJhY2ssIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGRpZmYgPSBNYXRoLmFicyhmcm9tIC0gdG8pLFxuICAgICAgICBkaXIgPSBmcm9tID4gdG8gPyAnZG93bicgOiAndXAnLFxuICAgICAgICBzdGVwcyA9IGRpZmYgLyAwLjAxLFxuICAgICAgICBzdGVwVGltZSA9IGxlbiAvIHN0ZXBzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5mYWRlKGZyb20sIHRvLCBsZW4sIGNhbGxiYWNrLCBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIHZvbHVtZSB0byB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgIHNlbGYudm9sdW1lKGZyb20sIGlkKTtcblxuICAgICAgZm9yICh2YXIgaT0xOyBpPD1zdGVwczsgaSsrKSB7XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2hhbmdlID0gc2VsZi5fdm9sdW1lICsgKGRpciA9PT0gJ3VwJyA/IDAuMDEgOiAtMC4wMSkgKiBpLFxuICAgICAgICAgICAgdm9sID0gTWF0aC5yb3VuZCgxMDAwICogY2hhbmdlKSAvIDEwMDAsXG4gICAgICAgICAgICB0b1ZvbCA9IHRvO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudm9sdW1lKHZvbCwgaWQpO1xuXG4gICAgICAgICAgICBpZiAodm9sID09PSB0b1ZvbCkge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgc3RlcFRpbWUgKiBpKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogW0RFUFJFQ0FURURdIEZhZGUgaW4gdGhlIGN1cnJlbnQgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgVm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlSW46IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy52b2x1bWUoMCkucGxheSgpLmZhZGUoMCwgdG8sIGxlbiwgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBbREVQUkVDQVRFRF0gRmFkZSBvdXQgdGhlIGN1cnJlbnQgc291bmQgYW5kIHBhdXNlIHdoZW4gZmluaXNoZWQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgIFZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gc2VsZi5mYWRlKHNlbGYuX3ZvbHVtZSwgdG8sIGxlbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgc2VsZi5wYXVzZShpZCk7XG5cbiAgICAgICAgLy8gZmlyZSBlbmRlZCBldmVudFxuICAgICAgICBzZWxmLm9uKCdlbmQnKTtcbiAgICAgIH0sIGlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGF1ZGlvIG5vZGUgYnkgSUQuXG4gICAgICogQHJldHVybiB7SG93bH0gQXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfbm9kZUJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbMF07XG5cbiAgICAgIC8vIGZpbmQgdGhlIG5vZGUgd2l0aCB0aGlzIElEXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBhY3RpdmUgYXVkaW8gbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSBBdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9hY3RpdmVOb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IHBsYXlpbmcgbm9kZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIHNlbGYuX2RyYWluUG9vbCgpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBpbmFjdGl2ZSBhdWRpbyBub2RlLlxuICAgICAqIElmIHRoZXJlIGlzIG5vbmUsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcG9vbC5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBhdWRpbyBub2RlIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIF9pbmFjdGl2ZU5vZGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBudWxsO1xuXG4gICAgICAvLyBmaW5kIGZpcnN0IGluYWN0aXZlIG5vZGUgdG8gcmVjeWNsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCAmJiBzZWxmLl9hdWRpb05vZGVbaV0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIC8vIHNlbmQgdGhlIG5vZGUgYmFjayBmb3IgdXNlIGJ5IHRoZSBuZXcgcGxheSBpbnN0YW5jZVxuICAgICAgICAgIGNhbGxiYWNrKHNlbGYuX2F1ZGlvTm9kZVtpXSk7XG4gICAgICAgICAgbm9kZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgc2VsZi5fZHJhaW5Qb29sKCk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIG5ldyBub2RlIGlmIHRoZXJlIGFyZSBubyBpbmFjdGl2ZXNcbiAgICAgIHZhciBuZXdOb2RlO1xuICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgIG5ld05vZGUgPSBzZWxmLl9zZXR1cEF1ZGlvTm9kZSgpO1xuICAgICAgICBjYWxsYmFjayhuZXdOb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuICAgICAgICBuZXdOb2RlID0gc2VsZi5fYXVkaW9Ob2RlW3NlbGYuX2F1ZGlvTm9kZS5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIHRoZSBjb3JyZWN0IGxvYWQgZXZlbnQgYW5kIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgIHZhciBsaXN0ZW5lckV2ZW50ID0gbmF2aWdhdG9yLmlzQ29jb29uSlMgPyAnY2FucGxheXRocm91Z2gnIDogJ2xvYWRlZG1ldGFkYXRhJztcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyRXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgY2FsbGJhY2sobmV3Tm9kZSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lckV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSBhcmUgbW9yZSB0aGFuIDUgaW5hY3RpdmUgYXVkaW8gbm9kZXMgaW4gdGhlIHBvb2wsIGNsZWFyIG91dCB0aGUgcmVzdC5cbiAgICAgKi9cbiAgICBfZHJhaW5Qb29sOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5hY3RpdmUgPSAwLFxuICAgICAgICBpO1xuXG4gICAgICAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIGluYWN0aXZlIG5vZGVzXG4gICAgICBmb3IgKGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBpbmFjdGl2ZSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIGZvciAoaT1zZWxmLl9hdWRpb05vZGUubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICBpZiAoaW5hY3RpdmUgPD0gNSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBhdWRpbyBzb3VyY2UgaWYgdXNpbmcgV2ViIEF1ZGlvXG4gICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBzZWxmLl9hdWRpb05vZGVbaV0uZGlzY29ubmVjdCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbmFjdGl2ZS0tO1xuICAgICAgICAgIHNlbGYuX2F1ZGlvTm9kZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgJ29uZW5kJyB0aW1lb3V0IGJlZm9yZSBpdCBlbmRzLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gc291bmRJZCAgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICovXG4gICAgX2NsZWFyRW5kVGltZXI6IGZ1bmN0aW9uKHNvdW5kSWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHRpbWVycyB0byBmaW5kIHRoZSBvbmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc291bmRcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9vbmVuZFRpbWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9vbmVuZFRpbWVyW2ldLmlkID09PSBzb3VuZElkKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lciA9IHNlbGYuX29uZW5kVGltZXJbaW5kZXhdO1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lci50aW1lcik7XG4gICAgICAgIHNlbGYuX29uZW5kVGltZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGdhaW4gbm9kZSBhbmQgcGFubmVyIGZvciBhIFdlYiBBdWRpbyBpbnN0YW5jZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgYXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfc2V0dXBBdWRpb05vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlLFxuICAgICAgICBpbmRleCA9IHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7XG5cbiAgICAgIC8vIGNyZWF0ZSBnYWluIG5vZGVcbiAgICAgIG5vZGVbaW5kZXhdID0gKHR5cGVvZiBjdHguY3JlYXRlR2FpbiA9PT0gJ3VuZGVmaW5lZCcpID8gY3R4LmNyZWF0ZUdhaW5Ob2RlKCkgOiBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgbm9kZVtpbmRleF0uZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhdXNlZCA9IHRydWU7XG4gICAgICBub2RlW2luZGV4XS5fcG9zID0gMDtcbiAgICAgIG5vZGVbaW5kZXhdLnJlYWR5U3RhdGUgPSA0O1xuICAgICAgbm9kZVtpbmRleF0uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYW5uZXJcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lciA9IGN0eC5jcmVhdGVQYW5uZXIoKTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5wYW5uaW5nTW9kZWwgPSBzZWxmLl9tb2RlbCB8fCAnZXF1YWxwb3dlcic7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuc2V0UG9zaXRpb24oc2VsZi5fcG9zM2RbMF0sIHNlbGYuX3BvczNkWzFdLCBzZWxmLl9wb3MzZFsyXSk7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuY29ubmVjdChub2RlW2luZGV4XSk7XG5cbiAgICAgIHJldHVybiBub2RlW2luZGV4XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbC9zZXQgY3VzdG9tIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgZXZlbnQgRXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZXZlbnRzID0gc2VsZlsnX29uJyArIGV2ZW50XTtcblxuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBldmVudHMucHVzaChmbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBldmVudHNbaV0uY2FsbChzZWxmLCBmbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50c1tpXS5jYWxsKHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgY3VzdG9tIGV2ZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBMaXN0ZW5lciB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBldmVudHMgPSBzZWxmWydfb24nICsgZXZlbnRdLFxuICAgICAgICBmblN0cmluZyA9IGZuID8gZm4udG9TdHJpbmcoKSA6IG51bGw7XG5cbiAgICAgIGlmIChmblN0cmluZykge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggZnVuY3Rpb25zIGluIHRoZSBldmVudCBmb3IgY29tcGFyaXNvblxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuU3RyaW5nID09PSBldmVudHNbaV0udG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZlsnX29uJyArIGV2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGFuZCBkZXN0cm95IHRoZSBjdXJyZW50IEhvd2wgb2JqZWN0LlxuICAgICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSBzdG9wIGFsbCBwbGF5IGluc3RhbmNlcyBhdHRhY2hlZCB0byB0aGlzIHNvdW5kLlxuICAgICAqL1xuICAgIHVubG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHN0b3AgcGxheWluZyBhbnkgYWN0aXZlIG5vZGVzXG4gICAgICB2YXIgbm9kZXMgPSBzZWxmLl9hdWRpb05vZGU7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIHN0b3AgdGhlIHNvdW5kIGlmIGl0IGlzIGN1cnJlbnRseSBwbGF5aW5nXG4gICAgICAgIGlmICghbm9kZXNbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgc2VsZi5zdG9wKG5vZGVzW2ldLmlkKTtcbiAgICAgICAgICBzZWxmLm9uKCdlbmQnLCBub2Rlc1tpXS5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzb3VyY2UgaWYgdXNpbmcgSFRNTDUgQXVkaW9cbiAgICAgICAgICBub2Rlc1tpXS5zcmMgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBvdXRwdXQgZnJvbSB0aGUgbWFzdGVyIGdhaW5cbiAgICAgICAgICBub2Rlc1tpXS5kaXNjb25uZWN0KDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgdGltZW91dHMgYXJlIGNsZWFyZWRcbiAgICAgIGZvciAoaT0wOyBpPHNlbGYuX29uZW5kVGltZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX29uZW5kVGltZXJbaV0udGltZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgdGhlIHJlZmVyZW5jZSBpbiB0aGUgZ2xvYmFsIEhvd2xlciBvYmplY3RcbiAgICAgIHZhciBpbmRleCA9IEhvd2xlci5faG93bHMuaW5kZXhPZihzZWxmKTtcbiAgICAgIGlmIChpbmRleCAhPT0gbnVsbCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgIEhvd2xlci5faG93bHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVsZXRlIHRoaXMgc291bmQgZnJvbSB0aGUgY2FjaGVcbiAgICAgIGRlbGV0ZSBjYWNoZVtzZWxmLl9zcmNdO1xuICAgICAgc2VsZiA9IG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gb25seSBkZWZpbmUgdGhlc2UgZnVuY3Rpb25zIHdoZW4gdXNpbmcgV2ViQXVkaW9cbiAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcblxuICAgIC8qKlxuICAgICAqIEJ1ZmZlciBhIHNvdW5kIGZyb20gVVJMIChvciBmcm9tIGNhY2hlKSBhbmQgZGVjb2RlIHRvIGF1ZGlvIHNvdXJjZSAoV2ViIEF1ZGlvIEFQSSkuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgdXJsKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgYnVmZmVyIGhhcyBhbHJlYWR5IGJlZW4gY2FjaGVkXG4gICAgICBpZiAodXJsIGluIGNhY2hlKSB7XG4gICAgICAgIC8vIHNldCB0aGUgZHVyYXRpb24gZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgb2JqLl9kdXJhdGlvbiA9IGNhY2hlW3VybF0uZHVyYXRpb247XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgc291bmQgaW50byB0aGlzIG9iamVjdFxuICAgICAgICBsb2FkU291bmQob2JqKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3QodXJsKSkge1xuICAgICAgICAvLyBEZWNvZGUgYmFzZTY0IGRhdGEtVVJJcyBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgY2Fubm90IGxvYWQgZGF0YS1VUklzIHdpdGggWE1MSHR0cFJlcXVlc3QuXG4gICAgICAgIHZhciBkYXRhID0gYXRvYih1cmwuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIHZhciBkYXRhVmlldyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBkYXRhVmlld1tpXSA9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVjb2RlQXVkaW9EYXRhKGRhdGFWaWV3LmJ1ZmZlciwgb2JqLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbG9hZCB0aGUgYnVmZmVyIGZyb20gdGhlIFVSTFxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlY29kZUF1ZGlvRGF0YSh4aHIucmVzcG9uc2UsIG9iaiwgdXJsKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciwgc3dpdGNoIHRoZSBzb3VuZCB0byBIVE1MIEF1ZGlvXG4gICAgICAgICAgaWYgKG9iai5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIG9iai5fYnVmZmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5fd2ViQXVkaW8gPSBmYWxzZTtcbiAgICAgICAgICAgIG9iai5fYXVkaW9Ob2RlID0gW107XG4gICAgICAgICAgICBkZWxldGUgb2JqLl9nYWluTm9kZTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVt1cmxdO1xuICAgICAgICAgICAgb2JqLmxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHhoci5vbmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIGF1ZGlvIGRhdGEgZnJvbSBhbiBhcnJheSBidWZmZXIuXG4gICAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IGFycmF5YnVmZmVyIFRoZSBhdWRpbyBkYXRhLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGUuXG4gICAgICovXG4gICAgdmFyIGRlY29kZUF1ZGlvRGF0YSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBvYmosIHVybCkge1xuICAgICAgLy8gZGVjb2RlIHRoZSBidWZmZXIgaW50byBhbiBhdWRpbyBzb3VyY2VcbiAgICAgIGN0eC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgIGFycmF5YnVmZmVyLFxuICAgICAgICBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICBjYWNoZVt1cmxdID0gYnVmZmVyO1xuICAgICAgICAgICAgbG9hZFNvdW5kKG9iaiwgYnVmZmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIG9iai5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmlzaGVzIGxvYWRpbmcgdGhlIFdlYiBBdWRpbyBBUEkgc291bmQgYW5kIGZpcmVzIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvYmogICAgVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtPYmplY2N0fSBidWZmZXIgVGhlIGRlY29kZWQgYnVmZmVyIHNvdW5kIHNvdXJjZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZFNvdW5kID0gZnVuY3Rpb24ob2JqLCBidWZmZXIpIHtcbiAgICAgIC8vIHNldCB0aGUgZHVyYXRpb25cbiAgICAgIG9iai5fZHVyYXRpb24gPSAoYnVmZmVyKSA/IGJ1ZmZlci5kdXJhdGlvbiA6IG9iai5fZHVyYXRpb247XG5cbiAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iai5fc3ByaXRlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb2JqLl9zcHJpdGUgPSB7X2RlZmF1bHQ6IFswLCBvYmouX2R1cmF0aW9uICogMTAwMF19O1xuICAgICAgfVxuXG4gICAgICAvLyBmaXJlIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgIGlmICghb2JqLl9sb2FkZWQpIHtcbiAgICAgICAgb2JqLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICBvYmoub24oJ2xvYWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5fYXV0b3BsYXkpIHtcbiAgICAgICAgb2JqLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgc291bmQgYmFjayBpbnRvIHRoZSBidWZmZXIgc291cmNlLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgVGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICBsb29wICBMb29wIGJvb2xlYW4sIHBvcywgYW5kIGR1cmF0aW9uLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKi9cbiAgICB2YXIgcmVmcmVzaEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgbG9vcCwgaWQpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlIHRvIGNvbm5lY3QgdG9cbiAgICAgIHZhciBub2RlID0gb2JqLl9ub2RlQnlJZChpZCk7XG5cbiAgICAgIC8vIHNldHVwIHRoZSBidWZmZXIgc291cmNlIGZvciBwbGF5YmFja1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5idWZmZXIgPSBjYWNoZVtvYmouX3NyY107XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5jb25uZWN0KG5vZGUucGFubmVyKTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3AgPSBsb29wWzBdO1xuICAgICAgaWYgKGxvb3BbMF0pIHtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0ID0gbG9vcFsxXTtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcEVuZCA9IGxvb3BbMV0gKyBsb29wWzJdO1xuICAgICAgfVxuICAgICAgbm9kZS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlID0gb2JqLl9yYXRlO1xuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc3VwcG9ydCBmb3IgQU1EIChBc3luY2hyb25vdXMgTW9kdWxlIERlZmluaXRpb24pIGxpYnJhcmllcyBzdWNoIGFzIHJlcXVpcmUuanMuXG4gICAqL1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSG93bGVyOiBIb3dsZXIsXG4gICAgICAgIEhvd2w6IEhvd2xcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHN1cHBvcnQgZm9yIENvbW1vbkpTIGxpYnJhcmllcyBzdWNoIGFzIGJyb3dzZXJpZnkuXG4gICAqL1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5Ib3dsZXIgPSBIb3dsZXI7XG4gICAgZXhwb3J0cy5Ib3dsID0gSG93bDtcbiAgfVxuXG4gIC8vIGRlZmluZSBnbG9iYWxseSBpbiBjYXNlIEFNRCBpcyBub3QgYXZhaWxhYmxlIG9yIGF2YWlsYWJsZSBidXQgbm90IHVzZWRcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuSG93bGVyID0gSG93bGVyO1xuICAgIHdpbmRvdy5Ib3dsID0gSG93bDtcbiAgfVxuXG59KSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hvd2xlci9ob3dsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzN5Q0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdmJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9