var engine =
webpackJsonp_name_([2,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(17);

	var _resources2 = _interopRequireDefault(_resources);

	var _mouse = __webpack_require__(18);

	var _mouse2 = _interopRequireDefault(_mouse);

	var _input = __webpack_require__(19);

	var _input2 = _interopRequireDefault(_input);

	var _objects = __webpack_require__(20);

	var _objects2 = _interopRequireDefault(_objects);

	var _collisions = __webpack_require__(23);

	var _collisions2 = _interopRequireDefault(_collisions);

	var _howler = __webpack_require__(24);

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
	        width: canvas.width + 100,
	        height: canvas.height + 100
	    });

	    var game = new _objects2.default(config);

	    var sound = new _howler.Howl({
	        urls: ['music/main.mp3', 'music/main.ogg'],
	        loop: true,
	        volume: 0.5
	    }); //.play();

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

	function getSpeed(start, destination, line) {
	    if (line.k == 'vert') {
	        return (destination[1] - start[1]) / line.dir;
	    } else {
	        return (destination[1] - start[1]) * Math.sqrt(Math.pow(line.k, 2) + 1) / line.dir;
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
	    return [x, y];
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
	    if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') return obj;

	    var temp = obj.constructor(); // changed

	    for (var key in obj) {
	        temp[key] = clone(obj[key]);
	    }return temp;
	}

	exports.default = {
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
	    getPointOfInterception: getPointOfInterception, getPointOfInterception: getPointOfInterception,
	    getDegreeBetweenDirections: getDegreeBetweenDirections,
	    clone: clone,
	    'getMovedPointByDegree': getMovedPointByDegree
	};

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	        position = {
	        x: 0,
	        y: 0
	    },
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(17);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _renderers = __webpack_require__(21);

	var _renderers2 = _interopRequireDefault(_renderers);

	var _sprite = __webpack_require__(22);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function GameObject(config) {
	    this.pos = _utils2.default.clone(config.pos);
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
	    this.parameters = config.parameters && _utils2.default.clone(config.parameters) || {};
	    this._parameters = config.parameters;
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
	    ctx.translate(this.pos[0], this.pos[1]);

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
	        if (this.parameters.collisions) {
	            this.layer.game.collisions.removeObject(this);
	        }
	        this.layer.removeObject(this.id);
	        this._removeInNextTick = false;
	    }
	};
	GameObject.prototype.setPosition = function (point) {
	    this.pos[0] = point[0];
	    this.pos[1] = point[1];
	};
	GameObject.prototype.triggerAction = function (action, event, mouse) {
	    var object = this;

	    function checkHitBox(mouse) {
	        var flag;

	        object.pos[0] < mouse.x && object.pos[0] + object.sprite.size[0] > mouse.x && object.pos[1] < mouse.y && object.pos[1] + object.sprite.size[1] > mouse.y && (flag = true);
	        return flag;
	    }

	    switch (action) {
	        case 'click':
	            this.callbacks['click'] && checkHitBox(mouse) && this.callbacks['click'](this, event);
	            break;
	        case 'mousemove':
	            this.callbacks['mousemove'] && checkHitBox(mouse) && this.callbacks['mousemove'](this, event);
	            this.callbacks['mouseleave'] && !checkHitBox(mouse) && this.callbacks['mouseleave'](this, event);
	            break;
	        default:
	            this.callbacks.hasOwnProperty(action) && this.callbacks[action](this, event);
	    }
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
	    this.pos = config.pos || [0, 0];
	    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
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
	    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
	    ctx.clip();
	    ctx.fillStyle = this.background;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

	    ctx.beginPath();
	    ctx.strokeStyle = 'black';
	    ctx.shadowBlur = 15;
	    ctx.shadowColor = 'black';
	    ctx.lineWidth = 2;
	    ctx.shadowOffsetX = 0;
	    ctx.shadowOffsetY = 0;
	    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
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
	GameLayer.prototype.triggerAction = function (action, event, mouse) {
	    for (var i in this.objects) {
	        this.objects.hasOwnProperty(i) && this.objects[i].triggerAction(action, event, mouse);
	    }
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
	    return [this.pos[0], this.pos[1], this.pos[0] + this.size[0], this.pos[1] + this.size[1]];
	};

	function GameWindow(config) {
	    this.layers = {};
	    this.ctx = config.ctx;
	    this.canvas = config.canvas;
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
	GameWindow.prototype.triggerAction = function (action, event, mouse) {
	    for (var i in this.layers) {
	        this.layers.hasOwnProperty(i) && this.layers[i].triggerAction(action, event, mouse);
	    }
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
	GameWindow.prototype.objectCount = 0;
	exports.default = GameWindow;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(17);

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

	    if (obj.parameters.health > 0 && obj._parameters.health > obj.parameters.health) {
	        ctx.fillStyle = "rgb(250, 0, 0)";
	        ctx.fillRect(x, y, width, height);
	        ctx.fillStyle = "rgb(0, 250, 0)";
	        ctx.fillRect(x, y, Math.round(width * (obj.parameters.health / obj._parameters.health)), height);
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
	    var ctx = obj.layer.ctx;

	    for (var i = 0; i < obj.parameters.effects.length; i++) {
	        var effect = obj.parameters.effects[i];
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

	    if (obj.id.indexOf(obj.layer.getObjectsByType('player')[0].parameters.currentSpell) != -1) {
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

	    if (obj.parameters.fireCooldown > 0) {
	        ctx.globalAlpha = 0.8;
	        ctx.fillStyle = "rgb(20, 20, 20)";
	        ctx.fillRect(x, Math.round(y + height - height * (obj.parameters.fireCooldown / obj.parameters.cooldown)), width, height);
	        ctx.globalAlpha = 1;
	    }
	}
	function textRender(obj) {
	    var ctx = obj.layer.ctx,
	        fontConfig = '';

	    obj.parameters.style && (fontConfig += obj.parameters.style + " ");
	    obj.parameters.weight && (fontConfig += obj.parameters.weight + " ");
	    fontConfig += (obj.parameters.size || 30) + 'pt ';
	    fontConfig += obj.parameters.font || "Arial";

	    if (obj.parameters.align) {
	        ctx.textAlign = obj.parameters.align;
	    }

	    ctx.font = fontConfig;
	    ctx.fillStyle = obj.parameters.color || "#FFF";
	    ctx.fillText(obj.parameters.text, obj.pos[0], obj.pos[1]);
	}
	var renders = {
	    shadow: shadow,
	    healthBar: healthBar,
	    sprite: sprite,
	    effects: effects,
	    object: objectRenderer,
	    text: textRender,
	    spell: spellRenderer,
	    unit: unitRenderer
	};

	exports.default = renders;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(17);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Sprite(url, pos, size, speed, frames, dir, once, degree) {
	    this.pos = pos;
	    this.defaultPosition = [pos[0], pos[1]];
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
	        direction.k >= 1 && (config.pos = [pos[0], pos[1]]);
	        direction.k < 1 && direction.k >= -1 && (config.pos = [pos[0], pos[1] + 2 * this.size[1]]);
	        direction.k < -1 && (config.pos = [pos[0], pos[1] + 3 * this.size[1]]);
	    } else if (direction.dir == -1) {
	        direction.k >= 1 && (config.pos = [pos[0], pos[1] + 3 * this.size[1]]);
	        direction.k < 1 && direction.k >= -1 && (config.pos = [pos[0], pos[1] + this.size[1]]);
	        direction.k < -1 && (config.pos = [pos[0], pos[1]]);
	    }

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

	    var x = this.pos[0];
	    var y = this.pos[1];

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
/* 23 */
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
	        var oldCells = object.parameters.collisions.cells;

	        for (var i = 0; i < oldCells.length; i++) {
	            cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
	        }
	    }

	    function updateObject(object) {
	        var pos = object.pos,
	            size = object.size,
	            point1 = [pos[0] + size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
	            point2 = [pos[0] - size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
	            point3 = [pos[0] + size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
	            point4 = [pos[0] - size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
	            point5 = [pos[0] >> n, pos[1] >> n],
	            cells = [getCell(point1), getCell(point2), getCell(point3), getCell(point4), getCell(point5)],
	            oldCells = object.parameters.collisions.cells;

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
	                                objects[k].parameters.collisions.indexOf(objects[l]) == -1 && objects[k].parameters.collisions.push(objects[l]);
	                                objects[l].parameters.collisions.indexOf(objects[k]) == -1 && objects[l].parameters.collisions.push(objects[k]);
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
/* 24 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzPzFkYzYiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2lucHV0LmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2NvbGxpc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaG93bGVyL2hvd2xlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IG1vdXNlTW9kdWxlIGZyb20gJy4vbW91c2UnO1xyXG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XHJcbmltcG9ydCBHYW1lV2luZG93IGZyb20gJy4vb2JqZWN0cyc7XHJcbmltcG9ydCBjb2xsaXNpb25zIGZyb20gJy4vY29sbGlzaW9ucyc7XHJcbmltcG9ydCB7SG93bH0gZnJvbSAnaG93bGVyJztcclxuXHJcbi8vIEEgY3Jvc3MtYnJvd3NlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuLy8gU2VlIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMS8wOC9hbmltYXRpbmctd2l0aC1qYXZhc2NyaXB0LWZyb20tc2V0aW50ZXJ2YWwtdG8tcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xyXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gbG9hZFJlc291cmNlcyhsaXN0LCBjYWxsYmFjaykge1xyXG4gICAgcmVzb3VyY2VzLmxvYWQobGlzdCk7XHJcblxyXG4gICAgLy9UaGlzIG9uZSBpcyBtb2NrIGZvciBBSkFYLCBpZiB3ZSB3aWxsIGhhdmUgcmVhbCBBSkFYLCB3ZSBqdXN0IG5lZWQgdG8gcHV0IHRoaXMgb25lIGludG8gY2FsbGJhY2sgd2l0aG91dCB0aW1lb3V0XHJcbiAgICByZXNvdXJjZXMub25SZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR2FtZShjb25maWcpIHtcclxuICAgIHZhciBjYW52YXMgPSBjb25maWcuY2FudmFzLFxyXG4gICAgICAgIGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICB2YXIgbW91c2UgPSBtb3VzZU1vZHVsZShjYW52YXMpO1xyXG5cclxuICAgIGNvbmZpZy5pbnB1dCA9IGlucHV0O1xyXG4gICAgY29uZmlnLm1vdXNlID0gbW91c2U7XHJcbiAgICBjb25maWcuY29sbGlzaW9ucyA9IGNvbGxpc2lvbnMoe1xyXG4gICAgICAgIG46IDcsXHJcbiAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCArIDEwMCxcclxuICAgICAgICBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQgKyAxMDBcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWVXaW5kb3coY29uZmlnKTtcclxuXHJcbiAgICB2YXIgc291bmQgPSBuZXcgSG93bCh7XHJcbiAgICAgICAgdXJsczogWydtdXNpYy9tYWluLm1wMycsICdtdXNpYy9tYWluLm9nZyddLFxyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgdm9sdW1lOiAwLjVcclxuICAgIH0pLy8ucGxheSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdhbWVUaW1lcigpIHtcclxuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgZHQgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMC4wO1xyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgZ2FtZS5yZW5kZXIoZHQpO1xyXG5cclxuICAgICAgICBsYXN0VGltZSA9IG5vdztcclxuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XHJcbiAgICAgICAgbG9hZFJlc291cmNlcyhjb25maWcucmVzb3VyY2VzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdhbWUuaW5pdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlbDogZ2FtZSxcclxuICAgICAgICBpbml0OiBpbml0R2FtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2luZGV4LmpzXG4gKiovIiwiZnVuY3Rpb24gY29sbGlkZXMoeCwgeSwgciwgYiwgeDIsIHkyLCByMiwgYjIpIHtcclxuICAgIHJldHVybiAhKHIgPj0geDIgfHwgeCA8IHIyIHx8XHJcbiAgICBiID49IHkyIHx8IHkgPCBiMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zWzBdIC0gc2l6ZVswXSAvIDIsIHBvc1sxXSAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gKyBzaXplMlswXSAvIDIsIHBvczJbMV0gKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UmFkaWFucyhkZWdyZWUpIHtcclxuICAgIHJldHVybiBkZWdyZWUgKiBNYXRoLlBJIC8gMTgwO1xyXG59O1xyXG5mdW5jdGlvbiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyhkaXIxLCBkaXIyKXtcclxuICAgIGlmIChkaXIyLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKDEgLyBkaXIxLmsqZGlyMS5kaXIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKChkaXIyLmsgKiBkaXIyLmRpciAtIGRpcjEuayAqIGRpcjEuZGlyKSAvICgxIC0gZGlyMS5rICogZGlyMS5kaXIgKiBkaXIyLmsgKiBkaXIyLmRpcikpKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWVzKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiAxODAgKiByYWRpYW5zIC8gTWF0aC5QSTtcclxufTtcclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAoZGVncmVlID0gLWRlZ3JlZSk7XHJcbiAgICBpZiAoZGVncmVlID09IHByZXZEZWdyZWUpIHtcclxuICAgICAgICByZXR1cm4gW2RlZ3JlZSwgMF07XHJcbiAgICB9IGVsc2UgaWYgKCgoZGVncmVlIDwgMCAmJiBwcmV2RGVncmVlID4gMCkgfHwgKGRlZ3JlZSA+IDAgJiYgcHJldkRlZ3JlZSA8IDApKSAmJiAoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBNYXRoLlBJKSkge1xyXG4gICAgICAgIHZhciBkZWdyZWVXaXRoU3BlZWQgPSAoKHByZXZEZWdyZWUgPiAwKSA/IHByZXZEZWdyZWUgKyBzcGVlZCA6IHByZXZEZWdyZWUgLSBzcGVlZCk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZWdyZWVXaXRoU3BlZWQgPCAtTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSBNYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCArIE1hdGguUEkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBvaW50MSwgcG9pbnQyLCBkZWdyZWUpIHtcclxuICAgIHZhciBuZXdEZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGdldERlc3RpbmF0aW9uKHBvaW50MSwgZGlyZWN0aW9uLCBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHZhciBrLCBiLCBkaXI7XHJcblxyXG4gICAgaWYgKHBvaW50MVswXSA9PSBwb2ludDJbMF0pIHtcclxuICAgICAgICBrID0gJ3ZlcnQnO1xyXG4gICAgICAgIGIgPSBwb2ludDJbMF07XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3BlZWQoc3RhcnQsIGRlc3RpbmF0aW9uLCBsaW5lKSB7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiAoIGRlc3RpbmF0aW9uWzFdIC0gc3RhcnRbMV0gKSAvIGxpbmUuZGlyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKCBkZXN0aW5hdGlvblsxXSAtIHN0YXJ0WzFdICkgKiAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkgLyBsaW5lLmRpcjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlbGxpcHNlKGNvbnRleHQsIGN4LCBjeSwgcngsIHJ5LCByb3QsIGFTdGFydCwgYUVuZCl7XHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKGN4LCBjeSk7XHJcbiAgICBjb250ZXh0LnJvdGF0ZShyb3QpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoLXJ4LCAtcnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUocngsIHJ5KTtcclxuICAgIGNvbnRleHQuYXJjKDEsIDEsIDEsIGFTdGFydCwgYUVuZCwgZmFsc2UpO1xyXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbn1cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF4KSB7XHJcbiAgICAgICAgICAgIHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHkgLSAxIDogeSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5mdW5jdGlvbiBnZXRQb2ludE9mSW50ZXJjZXB0aW9uKGRpcmVjdGlvbjEsIGRpcmVjdGlvbjIpIHtcclxuICAgIHZhciB4LCB5O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24yLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IGRpcmVjdGlvbjIuYjtcclxuICAgICAgICB5ID0gZGlyZWN0aW9uMS5rICogZGlyZWN0aW9uMS5kaXIgKiB4ICsgZGlyZWN0aW9uMS5iO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gKGRpcmVjdGlvbjIuYiAtIGRpcmVjdGlvbjEuYikgLyAoZGlyZWN0aW9uMS5kaXIgKiBkaXJlY3Rpb24xLmsgLSBkaXJlY3Rpb24yLmRpciAqIGRpcmVjdGlvbjIuayk7XHJcbiAgICAgICAgeSA9IGRpcmVjdGlvbjEuayAqIGRpcmVjdGlvbjEuZGlyICogeCArIGRpcmVjdGlvbjEuYjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBvYmouY29uc3RydWN0b3IoKTsgLy8gY2hhbmdlZFxyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGVsbGlwc2U6IGVsbGlwc2UsXHJcbiAgICBnZXRSYWRpYW5zOiBnZXRSYWRpYW5zLFxyXG4gICAgJ2NvbGxpZGVzJzogY29sbGlkZXMsXHJcbiAgICAnYm94Q29sbGlkZXMnOiBib3hDb2xsaWRlcyxcclxuICAgICdnZXREZWdyZWUnOiBnZXREZWdyZWUsXHJcbiAgICAnbmV4dFBvc2l0aW9uJzogbmV4dFBvc2l0aW9uLFxyXG4gICAgZ2V0U3BlZWQ6IGdldFNwZWVkLFxyXG4gICAgJ2dldERlc3RpbmF0aW9uJzogZ2V0RGVzdGluYXRpb24sXHJcbiAgICAnZ2V0RGlyZWN0aW9uJzogZ2V0RGlyZWN0aW9uLFxyXG4gICAgZ2V0RGVncmVlczogZ2V0RGVncmVlcyxcclxuICAgIGdldFBvaW50T2ZJbnRlcmNlcHRpb24sZ2V0UG9pbnRPZkludGVyY2VwdGlvbixcclxuICAgIGdldERlZ3JlZUJldHdlZW5EaXJlY3Rpb25zOiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyxcclxuICAgIGNsb25lOiBjbG9uZSxcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWVcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsInZhciByZXNvdXJjZUNhY2hlID0ge30sXHJcbiAgICByZWFkeUNhbGxiYWNrO1xyXG5cclxuLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG5mdW5jdGlvbiBsb2FkKHVybE9yQXJyKSB7XHJcbiAgICBpZiAodXJsT3JBcnIgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHVybE9yQXJyLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBfbG9hZCh1cmwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX2xvYWQodXJsT3JBcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfbG9hZCh1cmwpIHtcclxuICAgIGlmIChyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGltZztcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5Q2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBmYWxzZTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gICAgdmFyIHJlYWR5ID0gdHJ1ZTtcclxuICAgIGZvciAodmFyIGsgaW4gcmVzb3VyY2VDYWNoZSkge1xyXG4gICAgICAgIGlmIChyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgIHJlYWR5Q2FsbGJhY2sgPSBmdW5jO1xyXG59XHJcblxyXG52YXIgcmVzb3VyY2VzID0ge1xyXG4gICAgbG9hZDogbG9hZCxcclxuICAgIGdldDogZ2V0LFxyXG4gICAgb25SZWFkeTogb25SZWFkeSxcclxuICAgIGlzUmVhZHk6IGlzUmVhZHlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc291cmNlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVzb3VyY2VzLmpzXG4gKiovIiwiZnVuY3Rpb24gbW91c2UoY2FudmFzKSB7XHJcbiAgICAgICAgLy8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG4gICAgICAgIC8vIEJFR0lOIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExNDQ2NS9nZXR0aW5nLW1vdXNlLWxvY2F0aW9uLWluLWNhbnZhc1xyXG4gICAgdmFyIHN0eWxlUGFkZGluZ0xlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdMZWZ0J10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlUGFkZGluZ1RvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ1RvcCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlckxlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlckxlZnRXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlclRvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyVG9wV2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgLy8gU29tZSBwYWdlcyBoYXZlIGZpeGVkLXBvc2l0aW9uIGJhcnMgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcikgYXQgdGhlIHRvcCBvciBsZWZ0IG9mIHRoZSBwYWdlXHJcbiAgICAgICAgLy8gVGhleSB3aWxsIG1lc3MgdXAgbW91c2UgY29vcmRpbmF0ZXMgYW5kIHRoaXMgZml4ZXMgdGhhdFxyXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUsXHJcbiAgICAgICAgaHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG4gICAgICAgIGh0bWxMZWZ0ID0gaHRtbC5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgcG9zID0gZ2V0UHJvcGVyUG9zaXRpb24oZSk7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uLnggPSBwb3MueDtcclxuICAgICAgICBwb3NpdGlvbi55ID0gcG9zLnk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJQb3NpdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjYW52YXMsXHJcbiAgICAgICAgICAgIG9mZnNldFggPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXRZID0gMCxcclxuICAgICAgICAgICAgbXgsIG15O1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlIHRoZSB0b3RhbCBvZmZzZXQuIEl0J3MgcG9zc2libGUgdG8gY2FjaGUgdGhpcyBpZiB5b3Ugd2FudFxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBhZGRpbmcgYW5kIGJvcmRlciBzdHlsZSB3aWR0aHMgdG8gb2Zmc2V0XHJcbiAgICAgICAgLy8gQWxzbyBhZGQgdGhlIDxodG1sPiBvZmZzZXRzIGluIGNhc2UgdGhlcmUncyBhIHBvc2l0aW9uOmZpeGVkIGJhciAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKVxyXG4gICAgICAgIC8vIFRoaXMgcGFydCBpcyBub3Qgc3RyaWN0bHkgbmVjZXNzYXJ5LCBpdCBkZXBlbmRzIG9uIHlvdXIgc3R5bGluZ1xyXG4gICAgICAgIG9mZnNldFggKz0gc3R5bGVQYWRkaW5nTGVmdCArIHN0eWxlQm9yZGVyTGVmdCArIGh0bWxMZWZ0O1xyXG4gICAgICAgIG9mZnNldFkgKz0gc3R5bGVQYWRkaW5nVG9wICsgc3R5bGVCb3JkZXJUb3AgKyBodG1sVG9wO1xyXG5cclxuICAgICAgICBteCA9IGUucGFnZVggLSBvZmZzZXRYO1xyXG4gICAgICAgIG15ID0gZS5wYWdlWSAtIG9mZnNldFk7XHJcblxyXG4gICAgICAgIC8vIFdlIHJldHVybiBhIHNpbXBsZSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIHggYW5kIHkgZGVmaW5lZFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG14LFxyXG4gICAgICAgICAgICB5OiBteVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc01vdXNlRG93biA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNb3VzZURvd247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNb3VzZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW91c2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL21vdXNlLmpzXG4gKiovIiwidmFyIHByZXNzZWRLZXlzID0ge307XHJcblxyXG5mdW5jdGlvbiBzZXRLZXkoZXZlbnQsIHN0YXR1cykge1xyXG4gICAgcHJlc3NlZEtleXNbZXZlbnQua2V5Q29kZV0gPSBzdGF0dXM7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2V0S2V5KGUsIHRydWUpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCBmYWxzZSk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgcHJlc3NlZEtleXMgPSB7fTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNEb3duKGtleSkge1xyXG4gICAgcmV0dXJuIHByZXNzZWRLZXlzW2tleV07XHJcbn1cclxuXHJcbnZhciBpbnB1dCA9IHtcclxuICAgIHByZXNzZWRLZXlzOiBwcmVzc2VkS2V5cyxcclxuICAgIHJlc2V0OiByZXNldCxcclxuICAgIGlzRG93bjogaXNEb3duXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnB1dDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvaW5wdXQuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgcmVuZGVycyBmcm9tICcuL3JlbmRlcmVycyc7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xyXG5cclxuZnVuY3Rpb24gR2FtZU9iamVjdChjb25maWcpIHtcclxuICAgIHRoaXMucG9zID0gdXRpbHMuY2xvbmUoY29uZmlnLnBvcyk7XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkO1xyXG5cclxuICAgIGlmIChjb25maWcuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKGNvbmZpZy5zcHJpdGVbMF0sIGNvbmZpZy5zcHJpdGVbMV0sIGNvbmZpZy5zcHJpdGVbMl0sIGNvbmZpZy5zcHJpdGVbM10sIGNvbmZpZy5zcHJpdGVbNF0sIGNvbmZpZy5zcHJpdGVbNV0sIGNvbmZpZy5zcHJpdGVbNl0sIGNvbmZpZy5zcHJpdGVbN10pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG5cclxuICAgIGlmIChjb25maWcuc2l6ZSB8fCB0aGlzLnNwcml0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlLnNpemU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSBjb25maWcuY29sbGlzaW9ucztcclxuICAgIHRoaXMuY2FsbGJhY2tzID0gY29uZmlnLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgIHRoaXMuekluZGV4ID0gY29uZmlnLnpJbmRleCB8fCAwO1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gY29uZmlnLnBhcmFtZXRlcnM7XHJcbiAgICB0aGlzLnJ1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZmlnLmNvbmRpdGlvbnMgfHwgW107XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgaWYgKGNvbmZpZy5yZW5kZXIpIHtcclxuICAgICAgICBpZiAocmVuZGVyc1tjb25maWcucmVuZGVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlciA9IHJlbmRlcnNbY29uZmlnLnJlbmRlcl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIgPSBjb25maWcucmVuZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuXHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLm9iamVjdENvdW50ID0gMDtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gdGhpcy5sYXllci5jdHg7XHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG5cclxuICAgIGlmICh0aGlzLmN1c3RvbVJlbmRlcikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY3VzdG9tUmVuZGVyKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VzdG9tUmVuZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlcltpXSh0aGlzLCBkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlcih0aGlzLCBkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZW5kZXJzLnNwcml0ZSh0aGlzLCBkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzLFxyXG4gICAgICAgICAgICBjb25kaXRpb25zID0gdGhpcy5jb25kaXRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb2xsaXNpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IG5ldyBHYW1lUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uWydjb2xsaXNpb25zJ10pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGNvbmRpdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29uZGl0aW9uKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bY29uZGl0aW9uc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ydWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudXBkYXRlQ29uZGl0aW9ucyA9IGZ1bmN0aW9uKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29uZGl0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3JlbW92ZUluTmV4dFRpY2spIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5nYW1lLmNvbGxpc2lvbnMucmVtb3ZlT2JqZWN0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLl9yZW1vdmVJbk5leHRUaWNrID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB0aGlzLnBvc1swXSA9IHBvaW50WzBdO1xyXG4gICAgdGhpcy5wb3NbMV0gPSBwb2ludFsxXTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgdmFyIG9iamVjdCA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tIaXRCb3gobW91c2UpIHtcclxuICAgICAgICB2YXIgZmxhZztcclxuXHJcbiAgICAgICAgKG9iamVjdC5wb3NbMF0gPCBtb3VzZS54KSAmJiAob2JqZWN0LnBvc1swXSArIG9iamVjdC5zcHJpdGUuc2l6ZVswXSA+IG1vdXNlLngpICYmIChvYmplY3QucG9zWzFdIDwgbW91c2UueSkgJiYgKG9iamVjdC5wb3NbMV0gKyBvYmplY3Quc3ByaXRlLnNpemVbMV0gPiBtb3VzZS55KSAmJiAoZmxhZyA9IHRydWUpO1xyXG4gICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSAmJiBjaGVja0hpdEJveChtb3VzZSkgJiYgdGhpcy5jYWxsYmFja3NbJ2NsaWNrJ10odGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdtb3VzZW1vdmUnIDpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbJ21vdXNlbW92ZSddICYmIGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10odGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1snbW91c2VsZWF2ZSddICYmICFjaGVja0hpdEJveChtb3VzZSkgJiYgdGhpcy5jYWxsYmFja3NbJ21vdXNlbGVhdmUnXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLmhhc093blByb3BlcnR5KGFjdGlvbikgJiYgdGhpcy5jYWxsYmFja3NbYWN0aW9uXSh0aGlzLCBldmVudClcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRDb25kaXRpb24gPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5jb25kaXRpb25zLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBjb25kaXRpb24gPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBjb25kaXRpb24uc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBjb25kaXRpb24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9ucy5wdXNoKGNvbmRpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudXBkYXRlQ29sbGlzaW9ucyA9IGZ1bmN0aW9uKGR0KSB7XHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgJiYgdGhpcy5jb2xsaXNpb25zLnVwZGF0ZShkdCwgdGhpcyk7XHJcbn07XHJcbmZ1bmN0aW9uIEdhbWVSdWxlKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSB1dGlscy5jbG9uZSh0aGlzLnBhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lUnVsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZShkdCwgb2JqKTtcclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnNldENvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVMYXllcihjb25maWcpIHtcclxuICAgIHRoaXMub2JqZWN0Q291bnQgPSAwO1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMuaW5pdExpc3QgPSBjb25maWcuaW5pdExpc3Q7XHJcbiAgICB0aGlzLmdhbWUgPSBjb25maWcuZ2FtZTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4ocmVzb3VyY2VzLmdldChjb25maWcuYmFja2dyb3VuZCksICdyZXBlYXQnKTtcclxuICAgIHRoaXMucG9zID0gY29uZmlnLnBvcyB8fCBbMCwgMF07XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCBbY29uZmlnLmN0eC5jYW52YXMud2lkdGgsIGNvbmZpZy5jdHguY2FudmFzLmhlaWdodF07XHJcbiAgICB0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcbiAgICAgICAgJ2RlZmF1bHQnOiBbXVxyXG4gICAgfTtcclxuICAgIHRoaXMub2JqZWN0cyA9IHt9O1xyXG4gICAgdGhpcy5fcnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5pdExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPYmplY3QodGhpcy5nYW1lLmdldENvbmZpZyh0aGlzLmluaXRMaXN0W2ldKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXM7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdmFyIGFyciA9IFtdLFxyXG4gICAgICAgIGN0eCA9IHRoaXMuY3R4LFxyXG4gICAgICAgIGNhbnZhcyA9IGN0eC5jYW52YXM7XHJcblxyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LmNsaXAoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmQ7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSkgfHwgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSA9IFtdKTtcclxuICAgICAgICAgICAgYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdLnB1c2godGhpcy5vYmplY3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gYXJyW2ldLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2ldW2pdLnJlbmRlcihkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcclxuICAgIGN0eC5zaGFkb3dCbHVyID0gMTU7XHJcbiAgICBjdHguc2hhZG93Q29sb3IgPSAnYmxhY2snO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICBjdHguc2hhZG93T2Zmc2V0WCA9IDA7XHJcbiAgICBjdHguc2hhZG93T2Zmc2V0WSA9IDA7XHJcbiAgICBjdHgucmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMucnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGUoZHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZUNvbGxpc2lvbnMoZHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2FtZS5jb2xsaXNpb25zLmNoZWNrKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlQ29uZGl0aW9ucyhkdCk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlT2JqZWN0ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHNbaWRdLnR5cGUgJiYgdGhpcy5vYmplY3RzW2lkXS50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdHNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIC8qaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignT2JqZWN0IHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXI6ICcsIGNvbmZpZy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSovXHJcblxyXG4gICAgdmFyIF9vYmogPSBuZXcgR2FtZU9iamVjdChjb25maWcpO1xyXG4gICAgX29iai5zZXRMYXllcih0aGlzKTtcclxuICAgIF9vYmouaW5pdCgpO1xyXG5cclxuICAgIGlmIChjb25maWcudHlwZSAmJiBjb25maWcudHlwZSAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAoIXRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0pICYmICh0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdID0gW10pO1xyXG4gICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0ucHVzaChfb2JqLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10ucHVzaChfb2JqLmlkKTtcclxuICAgIH1cclxuICAgIHRoaXMub2JqZWN0c1tfb2JqLmlkXSA9IF9vYmo7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMub2JqZWN0c1tfb2JqLmlkXTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRPYmplY3RzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9iamVjdChvYmpbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkT2JqZWN0cyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmdldE9iamVjdHNCeVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgdmFyIG9iamVjdHNJZCA9IHRoaXMuc29ydGVkT2JqZWN0c1t0eXBlXSB8fCBbXSxcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0c0lkLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMub2JqZWN0c1tvYmplY3RzSWRbaV1dKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5vYmplY3RzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmNsZWFyTGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5vYmplY3RzW2ldO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb3J0ZWRPYmplY3RzID0ge1xyXG4gICAgICAgICdkZWZhdWx0JzogW11cclxuICAgIH07XHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMucnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIGRlbGV0ZSB0aGlzLnJ1bGVzW2ldO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRDb29yZGluYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnBvc1swXSArIHRoaXMuc2l6ZVswXSwgdGhpcy5wb3NbMV0gKyB0aGlzLnNpemVbMV1dO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZVdpbmRvdyhjb25maWcpIHtcclxuICAgIHRoaXMubGF5ZXJzID0ge307XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNvbmZpZy5jYW52YXM7XHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSBjb25maWcuY29sbGlzaW9ucztcclxuICAgIHRoaXMub2JqZWN0c0RlZmluaXRpb24gPSBjb25maWcub2JqZWN0cztcclxuICAgIHRoaXMucnVsZXNEZWZpbml0aW9uID0gY29uZmlnLnJ1bGVzO1xyXG4gICAgdGhpcy5sYXllcnNEZWZpbml0aW9uID0gY29uZmlnLmxheWVycztcclxuICAgIHRoaXMuaW5wdXQgPSBjb25maWcuaW5wdXQ7XHJcbiAgICB0aGlzLm1vdXNlID0gY29uZmlnLm1vdXNlO1xyXG4gICAgdGhpcy5faGFuZGxlcnMgPSB7fTtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IHt9O1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG59XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYmluZEdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgKCF0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSAmJiAodGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdKTtcclxuICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRPYmplY3QpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0pID8gdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXS5sZW5ndGggOiAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0udXBkYXRlKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0ucmVuZGVyKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVtb3ZlTGF5ZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGlkKSAmJiBkZWxldGUgdGhpcy5sYXllcnNbaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllcnMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgYXJyID0gW107XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuYWRkTGF5ZXIob2JqW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRMYXllcnMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KG9iai5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdMYXllciB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIHdpbmRvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqLmN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIG9iai5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLmxheWVyc1tvYmouaWRdID0gbmV3IEdhbWVMYXllcihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxheWVyc1tvYmouaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBjb25maWcgPSB1dGlscy5jbG9uZSh0aGlzLm9iamVjdHNEZWZpbml0aW9uW2lkXSk7XHJcblxyXG4gICAgKCFjb25maWcuaWQpICYmIChjb25maWcuaWQgPSBpZCk7XHJcblxyXG4gICAgY29uZmlnLmlkICs9ICh0aGlzLm9iamVjdENvdW50KyspICsgTWF0aC5yb3VuZCgobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgTWF0aC5yYW5kb20oKSAqIDEwMDAwMDEpO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXJDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyc0RlZmluaXRpb25baWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5vYmplY3RDb3VudD0gMDtcclxuZXhwb3J0IGRlZmF1bHQgR2FtZVdpbmRvd1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9vYmplY3RzLmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuXHJcbmZ1bmN0aW9uIGhlYWx0aEJhcihvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICB4ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgKSxcclxuICAgICAgICB5ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgLSA3KSxcclxuICAgICAgICB3aWR0aCA9IG9iai5zcHJpdGUuc2l6ZVswXSxcclxuICAgICAgICBoZWlnaHQgPSAzO1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcclxuXHJcbiAgICBpZiAoKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA+IDApICYmIChvYmouX3BhcmFtZXRlcnMuaGVhbHRoID4gb2JqLnBhcmFtZXRlcnMuaGVhbHRoKSkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigyNTAsIDAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAyNTAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIE1hdGgucm91bmQod2lkdGggKiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIC8gb2JqLl9wYXJhbWV0ZXJzLmhlYWx0aCkpLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gc3ByaXRlKG9iaiwgZHQpIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4O1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICBkdCAmJiBvYmouc3ByaXRlLnVwZGF0ZShkdCk7XHJcbiAgICBvYmouc3ByaXRlLnJlbmRlcihjdHgpO1xyXG59XHJcbmZ1bmN0aW9uIHNoYWRvdyhvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjU7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgdXRpbHMuZWxsaXBzZShjdHgsIDAgLCArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgLSAzLCBvYmouc3ByaXRlLnNpemVbMF0gLyAyLCA1LCB1dGlscy5nZXRSYWRpYW5zKDApLCB1dGlscy5nZXRSYWRpYW5zKDApLCB1dGlscy5nZXRSYWRpYW5zKDM2MCkpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XHJcbiAgICBjdHguZmlsbCgpO1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbn1cclxuZnVuY3Rpb24gZWZmZWN0cyhvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5wYXJhbWV0ZXJzLmVmZmVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZWZmZWN0ID0gb2JqLnBhcmFtZXRlcnMuZWZmZWN0c1tpXTtcclxuICAgICAgICBpZiAoZWZmZWN0ID09ICdmcm96ZW4nKSB7XHJcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuODtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShyZXNvdXJjZXMuZ2V0KCdpbWcvZnJvc3RlZmZlY3QucG5nJyksIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiwgLTgsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvYmplY3RSZW5kZXJlcihvYmosIGR0KSB7XHJcbiAgICBzaGFkb3cob2JqLCBkdCk7XHJcbiAgICBzcHJpdGUob2JqLCBkdCk7XHJcbn1cclxuZnVuY3Rpb24gdW5pdFJlbmRlcmVyKG9iaiwgZHQpIHtcclxuICAgIHNoYWRvdyhvYmosIGR0KTtcclxuICAgIGhlYWx0aEJhcihvYmosIGR0KTtcclxuICAgIHNwcml0ZShvYmosIGR0KTtcclxuICAgIGVmZmVjdHMob2JqLCBkdCk7XHJcbn1cclxuZnVuY3Rpb24gc3BlbGxSZW5kZXJlcihvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICB4ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgLSA0KSxcclxuICAgICAgICB5ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgLSA0KSxcclxuICAgICAgICB3aWR0aCA9IG9iai5zcHJpdGUuc2l6ZVswXSArIDgsXHJcbiAgICAgICAgaGVpZ2h0ID0gb2JqLnNwcml0ZS5zaXplWzFdICsgODtcclxuXHJcbiAgICBpZiAob2JqLmlkLmluZGV4T2Yob2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsKSAhPSAtMSkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAyNTAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggLSAyLCB5IC0gMiwgd2lkdGggKyA0LCBoZWlnaHQgKyA0KTtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjQ7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuXHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDAsIDApXCI7XHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuXHJcbiAgICBzcHJpdGUob2JqLCBkdCk7XHJcblxyXG4gICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA+IDApIHtcclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjg7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDIwLCAyMCwgMjApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIE1hdGgucm91bmQoeSArIGhlaWdodCAtIGhlaWdodCAqIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gLyBvYmoucGFyYW1ldGVycy5jb29sZG93bikpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRleHRSZW5kZXIob2JqKSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICBmb250Q29uZmlnID0gJyc7XHJcblxyXG4gICAgKG9iai5wYXJhbWV0ZXJzLnN0eWxlKSAmJiAoZm9udENvbmZpZyArPSBvYmoucGFyYW1ldGVycy5zdHlsZSArIFwiIFwiKTtcclxuICAgIChvYmoucGFyYW1ldGVycy53ZWlnaHQpICYmIChmb250Q29uZmlnICs9IG9iai5wYXJhbWV0ZXJzLndlaWdodCArIFwiIFwiKTtcclxuICAgIGZvbnRDb25maWcgKz0gKG9iai5wYXJhbWV0ZXJzLnNpemUgfHwgMzApICsgJ3B0ICc7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmoucGFyYW1ldGVycy5mb250IHx8IFwiQXJpYWxcIik7XHJcblxyXG4gICAgaWYgKG9iai5wYXJhbWV0ZXJzLmFsaWduKSB7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9IG9iai5wYXJhbWV0ZXJzLmFsaWduO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5mb250ID0gZm9udENvbmZpZztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBvYmoucGFyYW1ldGVycy5jb2xvciB8fCBcIiNGRkZcIjtcclxuICAgIGN0eC5maWxsVGV4dChvYmoucGFyYW1ldGVycy50ZXh0LCBvYmoucG9zWzBdLCBvYmoucG9zWzFdKTtcclxufVxyXG52YXIgcmVuZGVycyA9IHtcclxuICAgIHNoYWRvdzogc2hhZG93LFxyXG4gICAgaGVhbHRoQmFyOiBoZWFsdGhCYXIsXHJcbiAgICBzcHJpdGU6IHNwcml0ZSxcclxuICAgIGVmZmVjdHM6IGVmZmVjdHMsXHJcbiAgICBvYmplY3QgOiBvYmplY3RSZW5kZXJlcixcclxuICAgIHRleHQ6IHRleHRSZW5kZXIsXHJcbiAgICBzcGVsbCA6IHNwZWxsUmVuZGVyZXIsXHJcbiAgICB1bml0OiB1bml0UmVuZGVyZXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbmRlcnM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3JlbmRlcmVycy5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBTcHJpdGUodXJsLCBwb3MsIHNpemUsIHNwZWVkLCBmcmFtZXMsIGRpciwgb25jZSwgZGVncmVlKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLnNwZWVkID0gdHlwZW9mIHNwZWVkID09PSAnbnVtYmVyJyA/IHNwZWVkIDogMDtcclxuICAgIHRoaXMuZnJhbWVzID0gdXRpbHMuY2xvbmUoZnJhbWVzKTtcclxuICAgIHRoaXMuX2luZGV4ID0gMDtcclxuICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgdGhpcy5kaXIgPSBkaXIgfHwgJ2hvcml6b250YWwnO1xyXG4gICAgdGhpcy5vbmNlID0gb25jZTtcclxuICAgIHRoaXMuZGVncmVlID0gZGVncmVlIHx8IDA7XHJcbn1cclxuXHJcblxyXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdGhpcy5faW5kZXggKz0gdGhpcy5zcGVlZCAqIGR0O1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZUNvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmIChjb25maWcpIHtcclxuICAgICAgICBjb25maWcucG9zICYmICh0aGlzLnBvcyA9IGNvbmZpZy5wb3MpO1xyXG4gICAgICAgIGNvbmZpZy5zaXplICYmICh0aGlzLnNpemUgPSBjb25maWcuc2l6ZSk7XHJcbiAgICAgICAgY29uZmlnLnNwZWVkICYmICh0aGlzLnNwZWVkID0gdHlwZW9mIGNvbmZpZy5zcGVlZCA9PT0gJ251bWJlcicgPyBjb25maWcuc3BlZWQgOiAwKTtcclxuICAgICAgICBjb25maWcuZnJhbWVzICYmICh0aGlzLmZyYW1lcyA9IGNvbmZpZy5mcmFtZXMpO1xyXG4gICAgICAgIGNvbmZpZy51cmwgJiYgKHRoaXMudXJsID0gY29uZmlnLnVybCk7XHJcbiAgICAgICAgY29uZmlnLmRpciAmJiAodGhpcy5kaXIgPSBjb25maWcuZGlyKTtcclxuICAgICAgICBjb25maWcub25jZSAmJiAodGhpcy5vbmNlID0gY29uZmlnLm9uY2UpO1xyXG4gICAgICAgIGNvbmZpZy5kZWdyZWUgJiYgKHRoaXMuZGVncmVlID0gY29uZmlnLmRlZ3JlZSk7XHJcbiAgICB9XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUucm90YXRlVG9EaXJlY3Rpb24gPSBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICB2YXIgcG9zID0gdGhpcy5kZWZhdWx0UG9zaXRpb24sXHJcbiAgICAgICAgY29uZmlnID0ge307XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbi5kaXIgPT0gMSkge1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoY29uZmlnLnBvcyA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoY29uZmlnLnBvcyA9IFtwb3NbMF0sIHBvc1sxXSArIDIgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPCAtMSkgJiYgKGNvbmZpZy5wb3MgPVtwb3NbMF0sIHBvc1sxXSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uLmRpciA9PSAtMSkge1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoY29uZmlnLnBvcyA9W3Bvc1swXSwgcG9zWzFdICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoY29uZmlnLnBvcyA9W3Bvc1swXSwgcG9zWzFdICsgdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChjb25maWcucG9zID0gW3Bvc1swXSwgcG9zWzFdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVDb25maWcoY29uZmlnKTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICB2YXIgZnJhbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XHJcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbmRleCk7XHJcbiAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lc1tpZHggJSBtYXhdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbmNlICYmIGlkeCA+PSBtYXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHggPSB0aGlzLnBvc1swXTtcclxuICAgIHZhciB5ID0gdGhpcy5wb3NbMV07XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB5ICs9IGZyYW1lICogdGhpcy5zaXplWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeCArPSBmcmFtZSAqIHRoaXMuc2l6ZVswXTtcclxuICAgIH1cclxuXHJcbiAgICBjdHgucm90YXRlKHRoaXMuZGVncmVlKTtcclxuICAgIGN0eC5kcmF3SW1hZ2UocmVzb3VyY2VzLmdldCh0aGlzLnVybCksXHJcbiAgICAgICAgeCwgeSxcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSxcclxuICAgICAgICBNYXRoLnJvdW5kKC10aGlzLnNpemVbMF0gLyAyKSwgTWF0aC5yb3VuZCgtdGhpcy5zaXplWzFdIC8gMiksXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnNldERlZ3JlZSA9IGZ1bmN0aW9uIChkZWdyZWUpIHtcclxuICAgIHRoaXMuZGVncmVlID0gZGVncmVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9zcHJpdGUuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscydcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlKGNvbmZpZykge1xyXG4gICAgdmFyIG4gPSBjb25maWcubiB8fCA2LFxyXG4gICAgICAgIHdpZHRoID0gY29uZmlnLndpZHRoIHx8IDgwMCxcclxuICAgICAgICBoZWlnaHQgPSBjb25maWcuaGVpZ2h0IHx8IDYwMCxcclxuICAgICAgICBzaXplWCA9ICh3aWR0aCkgPj4gbixcclxuICAgICAgICBzaXplWSA9IChoZWlnaHQpID4+IG4sXHJcbiAgICAgICAgY2VsbEdyaWQgPSBuZXcgQXJyYXkoc2l6ZVggKiBzaXplWSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsR3JpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNlbGxHcmlkW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hcCgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxHcmlkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNlbGxHcmlkW2ldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0Q2VsbChwb2ludCkge1xyXG4gICAgICAgIHJldHVybiAocG9pbnRbMF0pICsgcG9pbnRbMV0gKiBzaXplWTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVPYmplY3Qob2JqZWN0KXtcclxuICAgICAgICB2YXIgb2xkQ2VsbHMgPSBvYmplY3QucGFyYW1ldGVycy5jb2xsaXNpb25zLmNlbGxzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZENlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNlbGxHcmlkW29sZENlbGxzW2ldXSAmJiBjZWxsR3JpZFtvbGRDZWxsc1tpXV0uc3BsaWNlKGNlbGxHcmlkW29sZENlbGxzW2ldXS5pbmRleE9mKG9iamVjdCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVPYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IG9iamVjdC5wb3MsXHJcbiAgICAgICAgICAgIHNpemUgPSBvYmplY3Quc2l6ZSxcclxuICAgICAgICAgICAgcG9pbnQxID0gWyhwb3NbMF0gKyBzaXplWzBdIC8gMikgPj4gbiwgKHBvc1sxXSArIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQyID0gWyhwb3NbMF0gLSBzaXplWzBdIC8gMikgPj4gbiwgKHBvc1sxXSAtIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQzID0gWyhwb3NbMF0gKyBzaXplWzBdIC8gMikgPj4gbiwgKHBvc1sxXSAtIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQ0ID0gWyhwb3NbMF0gLSBzaXplWzBdIC8gMikgPj4gbiwgKHBvc1sxXSArIHNpemVbMV0gLyAyKSA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQ1ID0gW3Bvc1swXSA+PiBuLCBwb3NbMV0gPj4gbl0sXHJcbiAgICAgICAgICAgIGNlbGxzID0gW2dldENlbGwocG9pbnQxKSwgZ2V0Q2VsbChwb2ludDIpLCBnZXRDZWxsKHBvaW50MyksIGdldENlbGwocG9pbnQ0KSwgZ2V0Q2VsbChwb2ludDUpXSxcclxuICAgICAgICAgICAgb2xkQ2VsbHMgPSBvYmplY3QucGFyYW1ldGVycy5jb2xsaXNpb25zLmNlbGxzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZENlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRDZWxsc1tpXSAhPSBjZWxsc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dICYmIGNlbGxHcmlkW29sZENlbGxzW2ldXS5zcGxpY2UoY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLmluZGV4T2Yob2JqZWN0KSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjZWxsR3JpZFtjZWxsc1tpXV0gJiYgKGNlbGxHcmlkW2NlbGxzW2ldXS5pbmRleE9mKG9iamVjdCkgPT0gLTEpICYmIGNlbGxHcmlkW2NlbGxzW2ldXS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBvbGRDZWxsc1tpXSA9IGNlbGxzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2VsbEdyaWRbY2VsbHNbaV1dICYmIChjZWxsR3JpZFtjZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpID09IC0xKSAmJiBjZWxsR3JpZFtjZWxsc1tpXV0ucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzaXplWDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHNpemVZOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsR3JpZFtnZXRDZWxsKFtpLCBqXSldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBjZWxsR3JpZFtnZXRDZWxsKFtpLCBqXSldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBvYmplY3RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gayArIDE7IGwgPCBsZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iamVjdHNba10ucG9zLCBvYmplY3RzW2tdLnNpemUsIG9iamVjdHNbbF0ucG9zLCBvYmplY3RzW2xdLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdHNba10ucGFyYW1ldGVycy5jb2xsaXNpb25zLmluZGV4T2Yob2JqZWN0c1tsXSkgPT0gLTEgKSAmJiBvYmplY3RzW2tdLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5wdXNoKG9iamVjdHNbbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3RzW2xdLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5pbmRleE9mKG9iamVjdHNba10pID09IC0xICkgJiYgb2JqZWN0c1tsXS5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMucHVzaChvYmplY3RzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNlbGxHcmlkOiBjZWxsR3JpZCxcclxuICAgICAgICB1cGRhdGVPYmplY3Q6IHVwZGF0ZU9iamVjdCxcclxuICAgICAgICByZW1vdmVPYmplY3Q6IHJlbW92ZU9iamVjdCxcclxuICAgICAgICBjaGVjazogY2hlY2tDb2xsaXNpb25zLFxyXG4gICAgICAgIGNsZWFyOiBnZW5lcmF0ZU1hcFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2NvbGxpc2lvbnMuanNcbiAqKi8iLCIvKiFcbiAqICBob3dsZXIuanMgdjEuMS4yOFxuICogIGhvd2xlcmpzLmNvbVxuICpcbiAqICAoYykgMjAxMy0yMDE1LCBKYW1lcyBTaW1wc29uIG9mIEdvbGRGaXJlIFN0dWRpb3NcbiAqICBnb2xkZmlyZXN0dWRpb3MuY29tXG4gKlxuICogIE1JVCBMaWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAvLyBzZXR1cFxuICB2YXIgY2FjaGUgPSB7fTtcblxuICAvLyBzZXR1cCB0aGUgYXVkaW8gY29udGV4dFxuICB2YXIgY3R4ID0gbnVsbCxcbiAgICB1c2luZ1dlYkF1ZGlvID0gdHJ1ZSxcbiAgICBub0F1ZGlvID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3R4ID0gbmV3IHdlYmtpdEF1ZGlvQ29udGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1c2luZ1dlYkF1ZGlvID0gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoKGUpIHtcbiAgICB1c2luZ1dlYkF1ZGlvID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIXVzaW5nV2ViQXVkaW8pIHtcbiAgICBpZiAodHlwZW9mIEF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEF1ZGlvKCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbm9BdWRpbyA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vQXVkaW8gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG1hc3RlciBnYWluIG5vZGVcbiAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICB2YXIgbWFzdGVyR2FpbiA9ICh0eXBlb2YgY3R4LmNyZWF0ZUdhaW4gPT09ICd1bmRlZmluZWQnKSA/IGN0eC5jcmVhdGVHYWluTm9kZSgpIDogY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSAxO1xuICAgIG1hc3RlckdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICB9XG5cbiAgLy8gY3JlYXRlIGdsb2JhbCBjb250cm9sbGVyXG4gIHZhciBIb3dsZXJHbG9iYWwgPSBmdW5jdGlvbihjb2RlY3MpIHtcbiAgICB0aGlzLl92b2x1bWUgPSAxO1xuICAgIHRoaXMuX211dGVkID0gZmFsc2U7XG4gICAgdGhpcy51c2luZ1dlYkF1ZGlvID0gdXNpbmdXZWJBdWRpbztcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLm5vQXVkaW8gPSBub0F1ZGlvO1xuICAgIHRoaXMuX2hvd2xzID0gW107XG4gICAgdGhpcy5fY29kZWNzID0gY29kZWNzO1xuICAgIHRoaXMuaU9TQXV0b0VuYWJsZSA9IHRydWU7XG4gIH07XG4gIEhvd2xlckdsb2JhbC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgZ2xvYmFsIHZvbHVtZSBmb3IgYWxsIHNvdW5kcy5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdm9sIFZvbHVtZSBmcm9tIDAuMCB0byAxLjAuXG4gICAgICogQHJldHVybiB7SG93bGVyL0Zsb2F0fSAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgdm9sdW1lLlxuICAgICAqL1xuICAgIHZvbHVtZTogZnVuY3Rpb24odm9sKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB2b2x1bWUgaXMgYSBudW1iZXJcbiAgICAgIHZvbCA9IHBhcnNlRmxvYXQodm9sKTtcblxuICAgICAgaWYgKHZvbCA+PSAwICYmIHZvbCA8PSAxKSB7XG4gICAgICAgIHNlbGYuX3ZvbHVtZSA9IHZvbDtcblxuICAgICAgICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgICAgICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IHZvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBjYWNoZSBhbmQgY2hhbmdlIHZvbHVtZSBvZiBhbGwgbm9kZXMgdGhhdCBhcmUgdXNpbmcgSFRNTDUgQXVkaW9cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuX2hvd2xzKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2hvd2xzLmhhc093blByb3BlcnR5KGtleSkgJiYgc2VsZi5faG93bHNba2V5XS5fd2ViQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGF1ZGlvIG5vZGVzXG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZVtpXS52b2x1bWUgPSBzZWxmLl9ob3dsc1trZXldLl92b2x1bWUgKiBzZWxmLl92b2x1bWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIHJldHVybiB0aGUgY3VycmVudCBnbG9iYWwgdm9sdW1lXG4gICAgICByZXR1cm4gKHVzaW5nV2ViQXVkaW8pID8gbWFzdGVyR2Fpbi5nYWluLnZhbHVlIDogc2VsZi5fdm9sdW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNdXRlIGFsbCBzb3VuZHMuXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIG11dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc2V0TXV0ZWQodHJ1ZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgYWxsIHNvdW5kcy5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgdW5tdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NldE11dGVkKGZhbHNlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBtdXRpbmcgYW5kIHVubXV0aW5nIGdsb2JhbGx5LlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IG11dGVkIElzIG11dGVkIG9yIG5vdC5cbiAgICAgKi9cbiAgICBfc2V0TXV0ZWQ6IGZ1bmN0aW9uKG11dGVkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHNlbGYuX211dGVkID0gbXV0ZWQ7XG5cbiAgICAgIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IG11dGVkID8gMCA6IHNlbGYuX3ZvbHVtZTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuX2hvd2xzKSB7XG4gICAgICAgIGlmIChzZWxmLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNlbGYuX2hvd2xzW2tleV0uX3dlYkF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYXVkaW8gbm9kZXNcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGVbaV0ubXV0ZWQgPSBtdXRlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIGNvZGVjIHN1cHBvcnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBleHQgQXVkaW8gZmlsZSBleHRlbnRpb24uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjb2RlY3M6IGZ1bmN0aW9uKGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvZGVjc1tleHRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpT1Mgd2lsbCBvbmx5IGFsbG93IGF1ZGlvIHRvIGJlIHBsYXllZCBhZnRlciBhIHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IHVubG9jayBhdWRpbyBvbiB0aGUgZmlyc3QgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKiBDb25jZXB0IGZyb206IGh0dHA6Ly9wYXVsYmFrYXVzLmNvbS90dXRvcmlhbHMvaHRtbDUvd2ViLWF1ZGlvLW9uLWlvcy9cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgX2VuYWJsZWlPU0F1ZGlvOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gb25seSBydW4gdGhpcyBvbiBpT1MgaWYgYXVkaW8gaXNuJ3QgYWxyZWFkeSBlYW5ibGVkXG4gICAgICBpZiAoY3R4ICYmIChzZWxmLl9pT1NFbmFibGVkIHx8ICEvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5faU9TRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAvLyBjYWxsIHRoaXMgbWV0aG9kIG9uIHRvdWNoIHN0YXJ0IHRvIGNyZWF0ZSBhbmQgcGxheSBhIGJ1ZmZlcixcbiAgICAgIC8vIHRoZW4gY2hlY2sgaWYgdGhlIGF1ZGlvIGFjdHVhbGx5IHBsYXllZCB0byBkZXRlcm1pbmUgaWZcbiAgICAgIC8vIGF1ZGlvIGhhcyBub3cgYmVlbiB1bmxvY2tlZCBvbiBpT1NcbiAgICAgIHZhciB1bmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IGJ1ZmZlclxuICAgICAgICB2YXIgYnVmZmVyID0gY3R4LmNyZWF0ZUJ1ZmZlcigxLCAxLCAyMjA1MCk7XG4gICAgICAgIHZhciBzb3VyY2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHNvdXJjZS5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgLy8gcGxheSB0aGUgZW1wdHkgYnVmZmVyXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlLnN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHNvdXJjZS5ub3RlT24oMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc291cmNlLnN0YXJ0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dXAgYSB0aW1lb3V0IHRvIGNoZWNrIHRoYXQgd2UgYXJlIHVubG9ja2VkIG9uIHRoZSBuZXh0IGV2ZW50IGxvb3BcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoKHNvdXJjZS5wbGF5YmFja1N0YXRlID09PSBzb3VyY2UuUExBWUlOR19TVEFURSB8fCBzb3VyY2UucGxheWJhY2tTdGF0ZSA9PT0gc291cmNlLkZJTklTSEVEX1NUQVRFKSkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB1bmxvY2tlZCBzdGF0ZSBhbmQgcHJldmVudCB0aGlzIGNoZWNrIGZyb20gaGFwcGVuaW5nIGFnYWluXG4gICAgICAgICAgICBzZWxmLl9pT1NFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuaU9TQXV0b0VuYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRvdWNoIHN0YXJ0IGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2ssIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcblxuICAgICAgLy8gc2V0dXAgYSB0b3VjaCBzdGFydCBsaXN0ZW5lciB0byBhdHRlbXB0IGFuIHVubG9jayBpblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrLCBmYWxzZSk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICAvLyBjaGVjayBmb3IgYnJvd3NlciBjb2RlYyBzdXBwb3J0XG4gIHZhciBhdWRpb1Rlc3QgPSBudWxsO1xuICB2YXIgY29kZWNzID0ge307XG4gIGlmICghbm9BdWRpbykge1xuICAgIGF1ZGlvVGVzdCA9IG5ldyBBdWRpbygpO1xuICAgIGNvZGVjcyA9IHtcbiAgICAgIG1wMzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL21wZWc7JykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG9wdXM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cIm9wdXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBvZ2c6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIHdhdjogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIGFhYzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgbTRhOiAhIShhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbTRhOycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbTRhOycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgbXA0OiAhIShhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbXA0OycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbXA0OycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgd2ViYTogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sICcnKVxuICAgIH07XG4gIH1cblxuICAvLyBhbGxvdyBhY2Nlc3MgdG8gdGhlIGdsb2JhbCBhdWRpbyBjb250cm9sc1xuICB2YXIgSG93bGVyID0gbmV3IEhvd2xlckdsb2JhbChjb2RlY3MpO1xuXG4gIC8vIHNldHVwIHRoZSBhdWRpbyBvYmplY3RcbiAgdmFyIEhvd2wgPSBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gc2V0dXAgdGhlIGRlZmF1bHRzXG4gICAgc2VsZi5fYXV0b3BsYXkgPSBvLmF1dG9wbGF5IHx8IGZhbHNlO1xuICAgIHNlbGYuX2J1ZmZlciA9IG8uYnVmZmVyIHx8IGZhbHNlO1xuICAgIHNlbGYuX2R1cmF0aW9uID0gby5kdXJhdGlvbiB8fCAwO1xuICAgIHNlbGYuX2Zvcm1hdCA9IG8uZm9ybWF0IHx8IG51bGw7XG4gICAgc2VsZi5fbG9vcCA9IG8ubG9vcCB8fCBmYWxzZTtcbiAgICBzZWxmLl9sb2FkZWQgPSBmYWxzZTtcbiAgICBzZWxmLl9zcHJpdGUgPSBvLnNwcml0ZSB8fCB7fTtcbiAgICBzZWxmLl9zcmMgPSBvLnNyYyB8fCAnJztcbiAgICBzZWxmLl9wb3MzZCA9IG8ucG9zM2QgfHwgWzAsIDAsIC0wLjVdO1xuICAgIHNlbGYuX3ZvbHVtZSA9IG8udm9sdW1lICE9PSB1bmRlZmluZWQgPyBvLnZvbHVtZSA6IDE7XG4gICAgc2VsZi5fdXJscyA9IG8udXJscyB8fCBbXTtcbiAgICBzZWxmLl9yYXRlID0gby5yYXRlIHx8IDE7XG5cbiAgICAvLyBhbGxvdyBmb3JjaW5nIG9mIGEgc3BlY2lmaWMgcGFubmluZ01vZGVsICgnZXF1YWxwb3dlcicgb3IgJ0hSVEYnKSxcbiAgICAvLyBpZiBub25lIGlzIHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gJ2VxdWFscG93ZXInIGFuZCBzd2l0Y2hlcyB0byAnSFJURidcbiAgICAvLyBpZiAzZCBzb3VuZCBpcyB1c2VkXG4gICAgc2VsZi5fbW9kZWwgPSBvLm1vZGVsIHx8IG51bGw7XG5cbiAgICAvLyBzZXR1cCBldmVudCBmdW5jdGlvbnNcbiAgICBzZWxmLl9vbmxvYWQgPSBbby5vbmxvYWQgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25sb2FkZXJyb3IgPSBbby5vbmxvYWRlcnJvciB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbmVuZCA9IFtvLm9uZW5kIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ucGF1c2UgPSBbby5vbnBhdXNlIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ucGxheSA9IFtvLm9ucGxheSB8fCBmdW5jdGlvbigpIHt9XTtcblxuICAgIHNlbGYuX29uZW5kVGltZXIgPSBbXTtcblxuICAgIC8vIFdlYiBBdWRpbyBvciBIVE1MNSBBdWRpbz9cbiAgICBzZWxmLl93ZWJBdWRpbyA9IHVzaW5nV2ViQXVkaW8gJiYgIXNlbGYuX2J1ZmZlcjtcblxuICAgIC8vIGNoZWNrIGlmIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIEhUTUw1IEF1ZGlvXG4gICAgc2VsZi5fYXVkaW9Ob2RlID0gW107XG4gICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICBzZWxmLl9zZXR1cEF1ZGlvTm9kZSgpO1xuICAgIH1cblxuICAgIC8vIGF1dG9tYXRpY2FsbHkgdHJ5IHRvIGVuYWJsZSBhdWRpbyBvbiBpT1NcbiAgICBpZiAodHlwZW9mIGN0eCAhPT0gJ3VuZGVmaW5lZCcgJiYgY3R4ICYmIEhvd2xlci5pT1NBdXRvRW5hYmxlKSB7XG4gICAgICBIb3dsZXIuX2VuYWJsZWlPU0F1ZGlvKCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoaXMgdG8gYW4gYXJyYXkgb2YgSG93bCdzIHRvIGFsbG93IGdsb2JhbCBjb250cm9sXG4gICAgSG93bGVyLl9ob3dscy5wdXNoKHNlbGYpO1xuXG4gICAgLy8gbG9hZCB0aGUgdHJhY2tcbiAgICBzZWxmLmxvYWQoKTtcbiAgfTtcblxuICAvLyBzZXR1cCBhbGwgb2YgdGhlIG1ldGhvZHNcbiAgSG93bC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogTG9hZCBhbiBhdWRpbyBmaWxlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHVybCA9IG51bGw7XG5cbiAgICAgIC8vIGlmIG5vIGF1ZGlvIGlzIGF2YWlsYWJsZSwgcXVpdCBpbW1lZGlhdGVseVxuICAgICAgaWYgKG5vQXVkaW8pIHtcbiAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbG9vcCB0aHJvdWdoIHNvdXJjZSBVUkxzIGFuZCBwaWNrIHRoZSBmaXJzdCBvbmUgdGhhdCBpcyBjb21wYXRpYmxlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXh0LCB1cmxJdGVtO1xuXG4gICAgICAgIGlmIChzZWxmLl9mb3JtYXQpIHtcbiAgICAgICAgICAvLyB1c2Ugc3BlY2lmaWVkIGF1ZGlvIGZvcm1hdCBpZiBhdmFpbGFibGVcbiAgICAgICAgICBleHQgPSBzZWxmLl9mb3JtYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZmlndXJlIG91dCB0aGUgZmlsZXR5cGUgKHdoZXRoZXIgYW4gZXh0ZW5zaW9uIG9yIGJhc2U2NCBkYXRhKVxuICAgICAgICAgIHVybEl0ZW0gPSBzZWxmLl91cmxzW2ldO1xuICAgICAgICAgIGV4dCA9IC9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWModXJsSXRlbSk7XG4gICAgICAgICAgaWYgKCFleHQpIHtcbiAgICAgICAgICAgIGV4dCA9IC9cXC4oW14uXSspJC8uZXhlYyh1cmxJdGVtLnNwbGl0KCc/JywgMSlbMF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChleHQpIHtcbiAgICAgICAgICAgIGV4dCA9IGV4dFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZWNzW2V4dF0pIHtcbiAgICAgICAgICB1cmwgPSBzZWxmLl91cmxzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX3NyYyA9IHVybDtcblxuICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgIGxvYWRCdWZmZXIoc2VsZiwgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IEF1ZGlvKCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgd2l0aCBIVE1MNSBhdWRpbyAoaHR0cDovL2Rldi53My5vcmcvaHRtbDUvc3BlYy1hdXRob3Itdmlldy9zcGVjLmh0bWwjbWVkaWFlcnJvcilcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobmV3Tm9kZS5lcnJvciAmJiBuZXdOb2RlLmVycm9yLmNvZGUgPT09IDQpIHtcbiAgICAgICAgICAgIEhvd2xlckdsb2JhbC5ub0F1ZGlvID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InLCB7dHlwZTogbmV3Tm9kZS5lcnJvciA/IG5ld05vZGUuZXJyb3IuY29kZSA6IDB9KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHNlbGYuX2F1ZGlvTm9kZS5wdXNoKG5ld05vZGUpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBuZXcgYXVkaW8gbm9kZVxuICAgICAgICBuZXdOb2RlLnNyYyA9IHVybDtcbiAgICAgICAgbmV3Tm9kZS5fcG9zID0gMDtcbiAgICAgICAgbmV3Tm9kZS5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICBuZXdOb2RlLnZvbHVtZSA9IChIb3dsZXIuX211dGVkKSA/IDAgOiBzZWxmLl92b2x1bWUgKiBIb3dsZXIudm9sdW1lKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHN0YXJ0IHBsYXlpbmcgdGhlIHNvdW5kXG4gICAgICAgIC8vIGFzIHNvb24gYXMgaXQgaGFzIGJ1ZmZlcmVkIGVub3VnaFxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyByb3VuZCB1cCB0aGUgZHVyYXRpb24gd2hlbiB1c2luZyBIVE1MNSBBdWRpbyB0byBhY2NvdW50IGZvciB0aGUgbG93ZXIgcHJlY2lzaW9uXG4gICAgICAgICAgc2VsZi5fZHVyYXRpb24gPSBNYXRoLmNlaWwobmV3Tm9kZS5kdXJhdGlvbiAqIDEwKSAvIDEwO1xuXG4gICAgICAgICAgLy8gc2V0dXAgYSBzcHJpdGUgaWYgbm9uZSBpcyBkZWZpbmVkXG4gICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNlbGYuX3Nwcml0ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZWxmLl9zcHJpdGUgPSB7X2RlZmF1bHQ6IFswLCBzZWxmLl9kdXJhdGlvbiAqIDEwMDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICAgICAgc2VsZi5fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYub24oJ2xvYWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5fYXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHNlbGYucGxheSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNsZWFyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgbmV3Tm9kZS5sb2FkKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBVUkxzIHRvIGJlIHB1bGxlZCBmcm9tIHRvIHBsYXkgaW4gdGhpcyBzb3VyY2UuXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHVybHMgIEFycnkgb2YgVVJMcyB0byBsb2FkIGZyb21cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSAgICAgICAgUmV0dXJucyBzZWxmIG9yIHRoZSBjdXJyZW50IFVSTHNcbiAgICAgKi9cbiAgICB1cmxzOiBmdW5jdGlvbih1cmxzKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh1cmxzKSB7XG4gICAgICAgIHNlbGYuc3RvcCgpO1xuICAgICAgICBzZWxmLl91cmxzID0gKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykgPyBbdXJsc10gOiB1cmxzO1xuICAgICAgICBzZWxmLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fdXJscztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGxheSBhIHNvdW5kIGZyb20gdGhlIGN1cnJlbnQgdGltZSAoMCBieSBkZWZhdWx0KS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgc3ByaXRlICAgKG9wdGlvbmFsKSBQbGF5cyBmcm9tIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIHNvdW5kIHNwcml0ZSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIFJldHVybnMgdGhlIHVuaXF1ZSBwbGF5YmFjayBpZCBmb3IgdGhpcyBzb3VuZCBpbnN0YW5jZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHBsYXk6IGZ1bmN0aW9uKHNwcml0ZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgbm8gc3ByaXRlIHdhcyBwYXNzZWQgYnV0IGEgY2FsbGJhY2sgd2FzLCB1cGRhdGUgdGhlIHZhcmlhYmxlc1xuICAgICAgaWYgKHR5cGVvZiBzcHJpdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBzcHJpdGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCBzcHJpdGUgaWYgbm9uZSBpcyBwYXNzZWRcbiAgICAgIGlmICghc3ByaXRlIHx8IHR5cGVvZiBzcHJpdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc3ByaXRlID0gJ19kZWZhdWx0JztcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucGxheShzcHJpdGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzcHJpdGUgZG9lc24ndCBleGlzdCwgcGxheSBub3RoaW5nXG4gICAgICBpZiAoIXNlbGYuX3Nwcml0ZVtzcHJpdGVdKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIG5vZGUgdG8gcGxheWJhY2tcbiAgICAgIHNlbGYuX2luYWN0aXZlTm9kZShmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIC8vIHBlcnNpc3QgdGhlIHNwcml0ZSBiZWluZyBwbGF5ZWRcbiAgICAgICAgbm9kZS5fc3ByaXRlID0gc3ByaXRlO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB3aGVyZSB0byBzdGFydCBwbGF5aW5nIGZyb21cbiAgICAgICAgdmFyIHBvcyA9IChub2RlLl9wb3MgPiAwKSA/IG5vZGUuX3BvcyA6IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMDtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IGxvbmcgdG8gcGxheSBmb3JcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gMDtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgZHVyYXRpb24gPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDAgLSBub2RlLl9wb3M7XG4gICAgICAgICAgaWYgKG5vZGUuX3BvcyA+IDApIHtcbiAgICAgICAgICAgIHBvcyA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCArIHBvcztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHVyYXRpb24gPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDAgLSAocG9zIC0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiB0aGlzIHNvdW5kIHNob3VsZCBiZSBsb29wZWRcbiAgICAgICAgdmFyIGxvb3AgPSAhIShzZWxmLl9sb29wIHx8IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzJdKTtcblxuICAgICAgICAvLyBzZXQgdGltZXIgdG8gZmlyZSB0aGUgJ29uZW5kJyBldmVudFxuICAgICAgICB2YXIgc291bmRJZCA9ICh0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnKSA/IGNhbGxiYWNrIDogTWF0aC5yb3VuZChEYXRlLm5vdygpICogTWF0aC5yYW5kb20oKSkgKyAnJyxcbiAgICAgICAgICB0aW1lcklkO1xuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogc291bmRJZCxcbiAgICAgICAgICAgIHNwcml0ZTogc3ByaXRlLFxuICAgICAgICAgICAgbG9vcDogbG9vcFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiBsb29waW5nLCByZXN0YXJ0IHRoZSB0cmFja1xuICAgICAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbyAmJiBsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuc3RvcChkYXRhLmlkKS5wbGF5KHNwcml0ZSwgZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB3ZWIgYXVkaW8gbm9kZSB0byBwYXVzZWQgYXQgZW5kXG4gICAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8gJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5fbm9kZUJ5SWQoZGF0YS5pZCkucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5fbm9kZUJ5SWQoZGF0YS5pZCkuX3BvcyA9IDA7XG5cbiAgICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGVuZCB0aW1lclxuICAgICAgICAgICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlbmQgdGhlIHRyYWNrIGlmIGl0IGlzIEhUTUwgYXVkaW8gYW5kIGEgc3ByaXRlXG4gICAgICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuc3RvcChkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmlyZSBlbmRlZCBldmVudFxuICAgICAgICAgICAgc2VsZi5vbignZW5kJywgc291bmRJZCk7XG4gICAgICAgICAgfSwgZHVyYXRpb24gKiAxMDAwKTtcblxuICAgICAgICAgIC8vIHN0b3JlIHRoZSByZWZlcmVuY2UgdG8gdGhlIHRpbWVyXG4gICAgICAgICAgc2VsZi5fb25lbmRUaW1lci5wdXNoKHt0aW1lcjogdGltZXJJZCwgaWQ6IGRhdGEuaWR9KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICB2YXIgbG9vcFN0YXJ0ID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwLFxuICAgICAgICAgICAgbG9vcEVuZCA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMDtcblxuICAgICAgICAgIC8vIHNldCB0aGUgcGxheSBpZCB0byB0aGlzIG5vZGUgYW5kIGxvYWQgaW50byBjb250ZXh0XG4gICAgICAgICAgbm9kZS5pZCA9IHNvdW5kSWQ7XG4gICAgICAgICAgbm9kZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICByZWZyZXNoQnVmZmVyKHNlbGYsIFtsb29wLCBsb29wU3RhcnQsIGxvb3BFbmRdLCBzb3VuZElkKTtcbiAgICAgICAgICBzZWxmLl9wbGF5U3RhcnQgPSBjdHguY3VycmVudFRpbWU7XG4gICAgICAgICAgbm9kZS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGxvb3AgPyBub2RlLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLCBwb3MsIDg2NDAwKSA6IG5vZGUuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsIHBvcywgZHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb29wID8gbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQoMCwgcG9zLCA4NjQwMCkgOiBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCBwb3MsIGR1cmF0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG5vZGUucmVhZHlTdGF0ZSA9PT0gNCB8fCAhbm9kZS5yZWFkeVN0YXRlICYmIG5hdmlnYXRvci5pc0NvY29vbkpTKSB7XG4gICAgICAgICAgICBub2RlLnJlYWR5U3RhdGUgPSA0O1xuICAgICAgICAgICAgbm9kZS5pZCA9IHNvdW5kSWQ7XG4gICAgICAgICAgICBub2RlLmN1cnJlbnRUaW1lID0gcG9zO1xuICAgICAgICAgICAgbm9kZS5tdXRlZCA9IEhvd2xlci5fbXV0ZWQgfHwgbm9kZS5tdXRlZDtcbiAgICAgICAgICAgIG5vZGUudm9sdW1lID0gc2VsZi5fdm9sdW1lICogSG93bGVyLnZvbHVtZSgpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgbm9kZS5wbGF5KCk7IH0sIDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKHNvdW5kSWQpO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIHNvdW5kID0gc2VsZixcbiAgICAgICAgICAgICAgICBwbGF5U3ByaXRlID0gc3ByaXRlLFxuICAgICAgICAgICAgICAgIGZuID0gY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbmV3Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNvdW5kLnBsYXkocGxheVNwcml0ZSwgZm4pO1xuXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgcGxheSBldmVudCBhbmQgc2VuZCB0aGUgc291bmRJZCBiYWNrIGluIHRoZSBjYWxsYmFja1xuICAgICAgICBzZWxmLm9uKCdwbGF5Jyk7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKHNvdW5kSWQpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSBwbGF5YmFjayBhbmQgc2F2ZSB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wYXVzZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciAnb25lbmQnIHRpbWVyXG4gICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGlkKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gc2VsZi5wb3MobnVsbCwgaWQpO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc291bmQgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAgICAgIGlmICghYWN0aXZlTm9kZS5idWZmZXJTb3VyY2UgfHwgYWN0aXZlTm9kZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5vbigncGF1c2UnKTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3AgcGxheWJhY2sgYW5kIHJlc2V0IHRvIHN0YXJ0LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5zdG9wKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyICdvbmVuZCcgdGltZXJcbiAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoaWQpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSAwO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc291bmQgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAgICAgIGlmICghYWN0aXZlTm9kZS5idWZmZXJTb3VyY2UgfHwgYWN0aXZlTm9kZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2VkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AoMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihhY3RpdmVOb2RlLmR1cmF0aW9uKSkge1xuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2UoKTtcbiAgICAgICAgICBhY3RpdmVOb2RlLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXV0ZSB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG11dGU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLm11dGUoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tdXRlIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgdW5tdXRlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi51bm11dGUoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB2b2x1bWUgb2YgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHZvbCBWb2x1bWUgZnJvbSAwLjAgdG8gMS4wLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9GbG9hdH0gICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHZvbHVtZS5cbiAgICAgKi9cbiAgICB2b2x1bWU6IGZ1bmN0aW9uKHZvbCwgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gbWFrZSBzdXJlIHZvbHVtZSBpcyBhIG51bWJlclxuICAgICAgdm9sID0gcGFyc2VGbG9hdCh2b2wpO1xuXG4gICAgICBpZiAodm9sID49IDAgJiYgdm9sIDw9IDEpIHtcbiAgICAgICAgc2VsZi5fdm9sdW1lID0gdm9sO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnZvbHVtZSh2b2wsIGlkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gdm9sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnZvbHVtZSA9IHZvbCAqIEhvd2xlci52b2x1bWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl92b2x1bWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgd2hldGhlciB0byBsb29wIHRoZSBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb29wIFRvIGxvb3Agb3Igbm90IHRvIGxvb3AsIHRoYXQgaXMgdGhlIHF1ZXN0aW9uLlxuICAgICAqIEByZXR1cm4ge0hvd2wvQm9vbGVhbn0gICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCBsb29waW5nIHZhbHVlLlxuICAgICAqL1xuICAgIGxvb3A6IGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBsb29wID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgc2VsZi5fbG9vcCA9IGxvb3A7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fbG9vcDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCBzb3VuZCBzcHJpdGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHNwcml0ZSBFeGFtcGxlOiB7c3ByaXRlTmFtZTogW29mZnNldCwgZHVyYXRpb24sIGxvb3BdfVxuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7SW50ZWdlcn0gb2Zmc2V0ICAgV2hlcmUgdG8gYmVnaW4gcGxheWJhY2sgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtJbnRlZ2VyfSBkdXJhdGlvbiBIb3cgbG9uZyB0byBwbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAgICAgKG9wdGlvbmFsKSBTZXQgdHJ1ZSB0byBsb29wIHRoaXMgc3ByaXRlXG4gICAgICogQHJldHVybiB7SG93bH0gICAgICAgIFJldHVybnMgY3VycmVudCBzcHJpdGUgc2hlZXQgb3Igc2VsZi5cbiAgICAgKi9cbiAgICBzcHJpdGU6IGZ1bmN0aW9uKHNwcml0ZSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIHNwcml0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc2VsZi5fc3ByaXRlID0gc3ByaXRlO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3Nwcml0ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgcG9zaXRpb24gb2YgcGxheWJhY2suXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICBwb3MgVGhlIHBvc2l0aW9uIHRvIG1vdmUgY3VycmVudCBwbGF5YmFjayB0by5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvRmxvYXR9ICAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24uXG4gICAgICovXG4gICAgcG9zOiBmdW5jdGlvbihwb3MsIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBvcyhwb3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIHBvcyA9PT0gJ251bWJlcicgPyBzZWxmIDogc2VsZi5fcG9zIHx8IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgZGVhbGluZyB3aXRoIGEgbnVtYmVyIGZvciBwb3NcbiAgICAgIHBvcyA9IHBhcnNlRmxvYXQocG9zKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHBvcyA+PSAwKSB7XG4gICAgICAgICAgc2VsZi5wYXVzZShpZCk7XG4gICAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gcG9zO1xuICAgICAgICAgIHNlbGYucGxheShhY3RpdmVOb2RlLl9zcHJpdGUsIGlkKTtcblxuICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzZWxmLl93ZWJBdWRpbyA/IGFjdGl2ZU5vZGUuX3BvcyArIChjdHguY3VycmVudFRpbWUgLSBzZWxmLl9wbGF5U3RhcnQpIDogYWN0aXZlTm9kZS5jdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwb3MgPj0gMCkge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluYWN0aXZlIG5vZGUgdG8gcmV0dXJuIHRoZSBwb3MgZm9yXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCAmJiBzZWxmLl9hdWRpb05vZGVbaV0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIChzZWxmLl93ZWJBdWRpbykgPyBzZWxmLl9hdWRpb05vZGVbaV0uX3BvcyA6IHNlbGYuX2F1ZGlvTm9kZVtpXS5jdXJyZW50VGltZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgM0QgcG9zaXRpb24gb2YgdGhlIGF1ZGlvIHNvdXJjZS5cbiAgICAgKiBUaGUgbW9zdCBjb21tb24gdXNhZ2UgaXMgdG8gc2V0IHRoZSAneCcgcG9zaXRpb25cbiAgICAgKiB0byBhZmZlY3QgdGhlIGxlZnQvcmlnaHQgZWFyIHBhbm5pbmcuIFNldHRpbmcgYW55IHZhbHVlIGhpZ2hlciB0aGFuXG4gICAgICogMS4wIHdpbGwgYmVnaW4gdG8gZGVjcmVhc2UgdGhlIHZvbHVtZSBvZiB0aGUgc291bmQgYXMgaXQgbW92ZXMgZnVydGhlciBhd2F5LlxuICAgICAqIE5PVEU6IFRoaXMgb25seSB3b3JrcyB3aXRoIFdlYiBBdWRpbyBBUEksIEhUTUw1IEF1ZGlvIHBsYXliYWNrXG4gICAgICogd2lsbCBub3QgYmUgYWZmZWN0ZWQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB4ICBUaGUgeC1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeSAgVGhlIHktcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHogIFRoZSB6LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvQXJyYXl9ICAgUmV0dXJucyBzZWxmIG9yIHRoZSBjdXJyZW50IDNEIHBvc2l0aW9uOiBbeCwgeSwgel1cbiAgICAgKi9cbiAgICBwb3MzZDogZnVuY3Rpb24oeCwgeSwgeiwgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gc2V0IGEgZGVmYXVsdCBmb3IgdGhlIG9wdGlvbmFsICd5JyAmICd6J1xuICAgICAgeSA9ICh0eXBlb2YgeSA9PT0gJ3VuZGVmaW5lZCcgfHwgIXkpID8gMCA6IHk7XG4gICAgICB6ID0gKHR5cGVvZiB6ID09PSAndW5kZWZpbmVkJyB8fCAheikgPyAtMC41IDogejtcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucG9zM2QoeCwgeSwgeiwgaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgaWYgKHggPj0gMCB8fCB4IDwgMCkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgICAgIHNlbGYuX3BvczNkID0gW3gsIHksIHpdO1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5wYW5uZXIuc2V0UG9zaXRpb24oeCwgeSwgeik7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnBhbm5lci5wYW5uaW5nTW9kZWwgPSBzZWxmLl9tb2RlbCB8fCAnSFJURic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fcG9zM2Q7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBGYWRlIGEgY3VycmVudGx5IHBsYXlpbmcgc291bmQgYmV0d2VlbiB0d28gdm9sdW1lcy5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZnJvbSAgICAgVGhlIHZvbHVtZSB0byBmYWRlIGZyb20gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICB0byAgICAgICBUaGUgdm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIEZpcmVkIHdoZW4gdGhlIGZhZGUgaXMgY29tcGxldGUuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGlkICAgICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlOiBmdW5jdGlvbihmcm9tLCB0bywgbGVuLCBjYWxsYmFjaywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZGlmZiA9IE1hdGguYWJzKGZyb20gLSB0byksXG4gICAgICAgIGRpciA9IGZyb20gPiB0byA/ICdkb3duJyA6ICd1cCcsXG4gICAgICAgIHN0ZXBzID0gZGlmZiAvIDAuMDEsXG4gICAgICAgIHN0ZXBUaW1lID0gbGVuIC8gc3RlcHM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLmZhZGUoZnJvbSwgdG8sIGxlbiwgY2FsbGJhY2ssIGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgdm9sdW1lIHRvIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgc2VsZi52b2x1bWUoZnJvbSwgaWQpO1xuXG4gICAgICBmb3IgKHZhciBpPTE7IGk8PXN0ZXBzOyBpKyspIHtcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjaGFuZ2UgPSBzZWxmLl92b2x1bWUgKyAoZGlyID09PSAndXAnID8gMC4wMSA6IC0wLjAxKSAqIGksXG4gICAgICAgICAgICB2b2wgPSBNYXRoLnJvdW5kKDEwMDAgKiBjaGFuZ2UpIC8gMTAwMCxcbiAgICAgICAgICAgIHRvVm9sID0gdG87XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi52b2x1bWUodm9sLCBpZCk7XG5cbiAgICAgICAgICAgIGlmICh2b2wgPT09IHRvVm9sKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBzdGVwVGltZSAqIGkpO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBbREVQUkVDQVRFRF0gRmFkZSBpbiB0aGUgY3VycmVudCBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gICAgdG8gICAgICBWb2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGVJbjogZnVuY3Rpb24odG8sIGxlbiwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLnZvbHVtZSgwKS5wbGF5KCkuZmFkZSgwLCB0bywgbGVuLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFtERVBSRUNBVEVEXSBGYWRlIG91dCB0aGUgY3VycmVudCBzb3VuZCBhbmQgcGF1c2Ugd2hlbiBmaW5pc2hlZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gICAgdG8gICAgICAgVm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZU91dDogZnVuY3Rpb24odG8sIGxlbiwgY2FsbGJhY2ssIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBzZWxmLmZhZGUoc2VsZi5fdm9sdW1lLCB0bywgbGVuLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICBzZWxmLnBhdXNlKGlkKTtcblxuICAgICAgICAvLyBmaXJlIGVuZGVkIGV2ZW50XG4gICAgICAgIHNlbGYub24oJ2VuZCcpO1xuICAgICAgfSwgaWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXVkaW8gbm9kZSBieSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSBBdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9ub2RlQnlJZDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVswXTtcblxuICAgICAgLy8gZmluZCB0aGUgbm9kZSB3aXRoIHRoaXMgSURcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpcnN0IGFjdGl2ZSBhdWRpbyBub2RlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9IEF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX2FjdGl2ZU5vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gbnVsbDtcblxuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgcGxheWluZyBub2RlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgc2VsZi5fZHJhaW5Qb29sKCk7XG5cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpcnN0IGluYWN0aXZlIGF1ZGlvIG5vZGUuXG4gICAgICogSWYgdGhlcmUgaXMgbm9uZSwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwb29sLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGF1ZGlvIG5vZGUgaXMgcmVhZHkuXG4gICAgICovXG4gICAgX2luYWN0aXZlTm9kZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpbmQgZmlyc3QgaW5hY3RpdmUgbm9kZSB0byByZWN5Y2xlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkICYmIHNlbGYuX2F1ZGlvTm9kZVtpXS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgLy8gc2VuZCB0aGUgbm9kZSBiYWNrIGZvciB1c2UgYnkgdGhlIG5ldyBwbGF5IGluc3RhbmNlXG4gICAgICAgICAgY2FsbGJhY2soc2VsZi5fYXVkaW9Ob2RlW2ldKTtcbiAgICAgICAgICBub2RlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBzZWxmLl9kcmFpblBvb2woKTtcblxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgbmV3IG5vZGUgaWYgdGhlcmUgYXJlIG5vIGluYWN0aXZlc1xuICAgICAgdmFyIG5ld05vZGU7XG4gICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgbmV3Tm9kZSA9IHNlbGYuX3NldHVwQXVkaW9Ob2RlKCk7XG4gICAgICAgIGNhbGxiYWNrKG5ld05vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5sb2FkKCk7XG4gICAgICAgIG5ld05vZGUgPSBzZWxmLl9hdWRpb05vZGVbc2VsZi5fYXVkaW9Ob2RlLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgdGhlIGNvcnJlY3QgbG9hZCBldmVudCBhbmQgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgdmFyIGxpc3RlbmVyRXZlbnQgPSBuYXZpZ2F0b3IuaXNDb2Nvb25KUyA/ICdjYW5wbGF5dGhyb3VnaCcgOiAnbG9hZGVkbWV0YWRhdGEnO1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJFdmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICBjYWxsYmFjayhuZXdOb2RlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyRXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gNSBpbmFjdGl2ZSBhdWRpbyBub2RlcyBpbiB0aGUgcG9vbCwgY2xlYXIgb3V0IHRoZSByZXN0LlxuICAgICAqL1xuICAgIF9kcmFpblBvb2w6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBpbmFjdGl2ZSA9IDAsXG4gICAgICAgIGk7XG5cbiAgICAgIC8vIGNvdW50IHRoZSBudW1iZXIgb2YgaW5hY3RpdmUgbm9kZXNcbiAgICAgIGZvciAoaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIGluYWN0aXZlKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgZm9yIChpPXNlbGYuX2F1ZGlvTm9kZS5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgIGlmIChpbmFjdGl2ZSA8PSA1KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIC8vIGRpc2Nvbm5lY3QgdGhlIGF1ZGlvIHNvdXJjZSBpZiB1c2luZyBXZWIgQXVkaW9cbiAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIHNlbGYuX2F1ZGlvTm9kZVtpXS5kaXNjb25uZWN0KDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGluYWN0aXZlLS07XG4gICAgICAgICAgc2VsZi5fYXVkaW9Ob2RlLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGVhciAnb25lbmQnIHRpbWVvdXQgYmVmb3JlIGl0IGVuZHMuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBzb3VuZElkICBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKi9cbiAgICBfY2xlYXJFbmRUaW1lcjogZnVuY3Rpb24oc291bmRJZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgdGltZXJzIHRvIGZpbmQgdGhlIG9uZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBzb3VuZFxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX29uZW5kVGltZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX29uZW5kVGltZXJbaV0uaWQgPT09IHNvdW5kSWQpIHtcbiAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWVyID0gc2VsZi5fb25lbmRUaW1lcltpbmRleF07XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyLnRpbWVyKTtcbiAgICAgICAgc2VsZi5fb25lbmRUaW1lci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgZ2FpbiBub2RlIGFuZCBwYW5uZXIgZm9yIGEgV2ViIEF1ZGlvIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBhdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9zZXR1cEF1ZGlvTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGUsXG4gICAgICAgIGluZGV4ID0gc2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDtcblxuICAgICAgLy8gY3JlYXRlIGdhaW4gbm9kZVxuICAgICAgbm9kZVtpbmRleF0gPSAodHlwZW9mIGN0eC5jcmVhdGVHYWluID09PSAndW5kZWZpbmVkJykgPyBjdHguY3JlYXRlR2Fpbk5vZGUoKSA6IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICBub2RlW2luZGV4XS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuICAgICAgbm9kZVtpbmRleF0ucGF1c2VkID0gdHJ1ZTtcbiAgICAgIG5vZGVbaW5kZXhdLl9wb3MgPSAwO1xuICAgICAgbm9kZVtpbmRleF0ucmVhZHlTdGF0ZSA9IDQ7XG4gICAgICBub2RlW2luZGV4XS5jb25uZWN0KG1hc3RlckdhaW4pO1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIHBhbm5lclxuICAgICAgbm9kZVtpbmRleF0ucGFubmVyID0gY3R4LmNyZWF0ZVBhbm5lcigpO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLnBhbm5pbmdNb2RlbCA9IHNlbGYuX21vZGVsIHx8ICdlcXVhbHBvd2VyJztcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5zZXRQb3NpdGlvbihzZWxmLl9wb3MzZFswXSwgc2VsZi5fcG9zM2RbMV0sIHNlbGYuX3BvczNkWzJdKTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5jb25uZWN0KG5vZGVbaW5kZXhdKTtcblxuICAgICAgcmV0dXJuIG5vZGVbaW5kZXhdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxsL3NldCBjdXN0b20gZXZlbnRzLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBGdW5jdGlvbiB0byBjYWxsLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBldmVudHMgPSBzZWxmWydfb24nICsgZXZlbnRdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGZuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGV2ZW50c1tpXS5jYWxsKHNlbGYsIGZuKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRzW2ldLmNhbGwoc2VsZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjdXN0b20gZXZlbnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGV2ZW50IEV2ZW50IHR5cGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIExpc3RlbmVyIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGV2ZW50cyA9IHNlbGZbJ19vbicgKyBldmVudF0sXG4gICAgICAgIGZuU3RyaW5nID0gZm4gPyBmbi50b1N0cmluZygpIDogbnVsbDtcblxuICAgICAgaWYgKGZuU3RyaW5nKSB7XG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBmdW5jdGlvbnMgaW4gdGhlIGV2ZW50IGZvciBjb21wYXJpc29uXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZm5TdHJpbmcgPT09IGV2ZW50c1tpXS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICBldmVudHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmWydfb24nICsgZXZlbnRdID0gW107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmxvYWQgYW5kIGRlc3Ryb3kgdGhlIGN1cnJlbnQgSG93bCBvYmplY3QuXG4gICAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWx5IHN0b3AgYWxsIHBsYXkgaW5zdGFuY2VzIGF0dGFjaGVkIHRvIHRoaXMgc291bmQuXG4gICAgICovXG4gICAgdW5sb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gc3RvcCBwbGF5aW5nIGFueSBhY3RpdmUgbm9kZXNcbiAgICAgIHZhciBub2RlcyA9IHNlbGYuX2F1ZGlvTm9kZTtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gc3RvcCB0aGUgc291bmQgaWYgaXQgaXMgY3VycmVudGx5IHBsYXlpbmdcbiAgICAgICAgaWYgKCFub2Rlc1tpXS5wYXVzZWQpIHtcbiAgICAgICAgICBzZWxmLnN0b3Aobm9kZXNbaV0uaWQpO1xuICAgICAgICAgIHNlbGYub24oJ2VuZCcsIG5vZGVzW2ldLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIHNvdXJjZSBpZiB1c2luZyBIVE1MNSBBdWRpb1xuICAgICAgICAgIG5vZGVzW2ldLnNyYyA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpc2Nvbm5lY3QgdGhlIG91dHB1dCBmcm9tIHRoZSBtYXN0ZXIgZ2FpblxuICAgICAgICAgIG5vZGVzW2ldLmRpc2Nvbm5lY3QoMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBzdXJlIGFsbCB0aW1lb3V0cyBhcmUgY2xlYXJlZFxuICAgICAgZm9yIChpPTA7IGk8c2VsZi5fb25lbmRUaW1lci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5fb25lbmRUaW1lcltpXS50aW1lcik7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgcmVmZXJlbmNlIGluIHRoZSBnbG9iYWwgSG93bGVyIG9iamVjdFxuICAgICAgdmFyIGluZGV4ID0gSG93bGVyLl9ob3dscy5pbmRleE9mKHNlbGYpO1xuICAgICAgaWYgKGluZGV4ICE9PSBudWxsICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgSG93bGVyLl9ob3dscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWxldGUgdGhpcyBzb3VuZCBmcm9tIHRoZSBjYWNoZVxuICAgICAgZGVsZXRlIGNhY2hlW3NlbGYuX3NyY107XG4gICAgICBzZWxmID0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBvbmx5IGRlZmluZSB0aGVzZSBmdW5jdGlvbnMgd2hlbiB1c2luZyBXZWJBdWRpb1xuICBpZiAodXNpbmdXZWJBdWRpbykge1xuXG4gICAgLyoqXG4gICAgICogQnVmZmVyIGEgc291bmQgZnJvbSBVUkwgKG9yIGZyb20gY2FjaGUpIGFuZCBkZWNvZGUgdG8gYXVkaW8gc291cmNlIChXZWIgQXVkaW8gQVBJKS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBwYXRoIHRvIHRoZSBzb3VuZCBmaWxlLlxuICAgICAqL1xuICAgIHZhciBsb2FkQnVmZmVyID0gZnVuY3Rpb24ob2JqLCB1cmwpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBidWZmZXIgaGFzIGFscmVhZHkgYmVlbiBjYWNoZWRcbiAgICAgIGlmICh1cmwgaW4gY2FjaGUpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBkdXJhdGlvbiBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBvYmouX2R1cmF0aW9uID0gY2FjaGVbdXJsXS5kdXJhdGlvbjtcblxuICAgICAgICAvLyBsb2FkIHRoZSBzb3VuZCBpbnRvIHRoaXMgb2JqZWN0XG4gICAgICAgIGxvYWRTb3VuZChvYmopO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICgvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdCh1cmwpKSB7XG4gICAgICAgIC8vIERlY29kZSBiYXNlNjQgZGF0YS1VUklzIGJlY2F1c2Ugc29tZSBicm93c2VycyBjYW5ub3QgbG9hZCBkYXRhLVVSSXMgd2l0aCBYTUxIdHRwUmVxdWVzdC5cbiAgICAgICAgdmFyIGRhdGEgPSBhdG9iKHVybC5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgdmFyIGRhdGFWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGRhdGFWaWV3W2ldID0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkZWNvZGVBdWRpb0RhdGEoZGF0YVZpZXcuYnVmZmVyLCBvYmosIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb2FkIHRoZSBidWZmZXIgZnJvbSB0aGUgVVJMXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVjb2RlQXVkaW9EYXRhKHhoci5yZXNwb25zZSwgb2JqLCB1cmwpO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yLCBzd2l0Y2ggdGhlIHNvdW5kIHRvIEhUTUwgQXVkaW9cbiAgICAgICAgICBpZiAob2JqLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgb2JqLl9idWZmZXIgPSB0cnVlO1xuICAgICAgICAgICAgb2JqLl93ZWJBdWRpbyA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqLl9hdWRpb05vZGUgPSBbXTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX2dhaW5Ob2RlO1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW3VybF07XG4gICAgICAgICAgICBvYmoubG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgeGhyLm9uZXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYXVkaW8gZGF0YSBmcm9tIGFuIGFycmF5IGJ1ZmZlci5cbiAgICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gYXJyYXlidWZmZXIgVGhlIGF1ZGlvIGRhdGEuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZS5cbiAgICAgKi9cbiAgICB2YXIgZGVjb2RlQXVkaW9EYXRhID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsIG9iaiwgdXJsKSB7XG4gICAgICAvLyBkZWNvZGUgdGhlIGJ1ZmZlciBpbnRvIGFuIGF1ZGlvIHNvdXJjZVxuICAgICAgY3R4LmRlY29kZUF1ZGlvRGF0YShcbiAgICAgICAgYXJyYXlidWZmZXIsXG4gICAgICAgIGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgIGNhY2hlW3VybF0gPSBidWZmZXI7XG4gICAgICAgICAgICBsb2FkU291bmQob2JqLCBidWZmZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgb2JqLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluaXNoZXMgbG9hZGluZyB0aGUgV2ViIEF1ZGlvIEFQSSBzb3VuZCBhbmQgZmlyZXMgdGhlIGxvYWRlZCBldmVudFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gIG9iaiAgICBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge09iamVjY3R9IGJ1ZmZlciBUaGUgZGVjb2RlZCBidWZmZXIgc291bmQgc291cmNlLlxuICAgICAqL1xuICAgIHZhciBsb2FkU291bmQgPSBmdW5jdGlvbihvYmosIGJ1ZmZlcikge1xuICAgICAgLy8gc2V0IHRoZSBkdXJhdGlvblxuICAgICAgb2JqLl9kdXJhdGlvbiA9IChidWZmZXIpID8gYnVmZmVyLmR1cmF0aW9uIDogb2JqLl9kdXJhdGlvbjtcblxuICAgICAgLy8gc2V0dXAgYSBzcHJpdGUgaWYgbm9uZSBpcyBkZWZpbmVkXG4gICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqLl9zcHJpdGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvYmouX3Nwcml0ZSA9IHtfZGVmYXVsdDogWzAsIG9iai5fZHVyYXRpb24gKiAxMDAwXX07XG4gICAgICB9XG5cbiAgICAgIC8vIGZpcmUgdGhlIGxvYWRlZCBldmVudFxuICAgICAgaWYgKCFvYmouX2xvYWRlZCkge1xuICAgICAgICBvYmouX2xvYWRlZCA9IHRydWU7XG4gICAgICAgIG9iai5vbignbG9hZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLl9hdXRvcGxheSkge1xuICAgICAgICBvYmoucGxheSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBzb3VuZCBiYWNrIGludG8gdGhlIGJ1ZmZlciBzb3VyY2UuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogICBUaGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gIGxvb3AgIExvb3AgYm9vbGVhbiwgcG9zLCBhbmQgZHVyYXRpb24uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqL1xuICAgIHZhciByZWZyZXNoQnVmZmVyID0gZnVuY3Rpb24ob2JqLCBsb29wLCBpZCkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG5vZGUgdG8gY29ubmVjdCB0b1xuICAgICAgdmFyIG5vZGUgPSBvYmouX25vZGVCeUlkKGlkKTtcblxuICAgICAgLy8gc2V0dXAgdGhlIGJ1ZmZlciBzb3VyY2UgZm9yIHBsYXliYWNrXG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmJ1ZmZlciA9IGNhY2hlW29iai5fc3JjXTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmNvbm5lY3Qobm9kZS5wYW5uZXIpO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcCA9IGxvb3BbMF07XG4gICAgICBpZiAobG9vcFswXSkge1xuICAgICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQgPSBsb29wWzFdO1xuICAgICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wRW5kID0gbG9vcFsxXSArIGxvb3BbMl07XG4gICAgICB9XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSBvYmouX3JhdGU7XG4gICAgfTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzdXBwb3J0IGZvciBBTUQgKEFzeW5jaHJvbm91cyBNb2R1bGUgRGVmaW5pdGlvbikgbGlicmFyaWVzIHN1Y2ggYXMgcmVxdWlyZS5qcy5cbiAgICovXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIb3dsZXI6IEhvd2xlcixcbiAgICAgICAgSG93bDogSG93bFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc3VwcG9ydCBmb3IgQ29tbW9uSlMgbGlicmFyaWVzIHN1Y2ggYXMgYnJvd3NlcmlmeS5cbiAgICovXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLkhvd2xlciA9IEhvd2xlcjtcbiAgICBleHBvcnRzLkhvd2wgPSBIb3dsO1xuICB9XG5cbiAgLy8gZGVmaW5lIGdsb2JhbGx5IGluIGNhc2UgQU1EIGlzIG5vdCBhdmFpbGFibGUgb3IgYXZhaWxhYmxlIGJ1dCBub3QgdXNlZFxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ib3dsZXIgPSBIb3dsZXI7XG4gICAgd2luZG93Lkhvd2wgPSBIb3dsO1xuICB9XG5cbn0pKCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaG93bGVyL2hvd2xlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==