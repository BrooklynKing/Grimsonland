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
	    var k, b, dir;

	    if (point1[0] == point2[0]) {
	        k = 'vert';
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
	    'getDestination': getDestination,
	    'getDirection': getDirection,
	    'getMovedPointByDegree': getMovedPointByDegree,
	    'clone': clone
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvbW91c2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZW5kZXJlcnMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9jb2xsaXNpb25zLmpzIiwid2VicGFjazovLy8uLi9+L2hvd2xlci9ob3dsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCBtb3VzZU1vZHVsZSBmcm9tICcuL21vdXNlJztcclxuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xyXG5pbXBvcnQgR2FtZVdpbmRvdyBmcm9tICcuL29iamVjdHMnO1xyXG5pbXBvcnQgY29sbGlzaW9ucyBmcm9tICcuL2NvbGxpc2lvbnMnO1xyXG5pbXBvcnQge0hvd2x9IGZyb20gJ2hvd2xlcic7XHJcblxyXG4vLyBBIGNyb3NzLWJyb3dzZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbi8vIFNlZSBodHRwczovL2hhY2tzLm1vemlsbGEub3JnLzIwMTEvMDgvYW5pbWF0aW5nLXdpdGgtamF2YXNjcmlwdC1mcm9tLXNldGludGVydmFsLXRvLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cclxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XHJcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcclxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XHJcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRSZXNvdXJjZXMobGlzdCwgY2FsbGJhY2spIHtcclxuICAgIHJlc291cmNlcy5sb2FkKGxpc3QpO1xyXG5cclxuICAgIC8vVGhpcyBvbmUgaXMgbW9jayBmb3IgQUpBWCwgaWYgd2Ugd2lsbCBoYXZlIHJlYWwgQUpBWCwgd2UganVzdCBuZWVkIHRvIHB1dCB0aGlzIG9uZSBpbnRvIGNhbGxiYWNrIHdpdGhvdXQgdGltZW91dFxyXG4gICAgcmVzb3VyY2VzLm9uUmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnKSB7XHJcbiAgICB2YXIgY2FudmFzID0gY29uZmlnLmNhbnZhcyxcclxuICAgICAgICBsYXN0VGltZSA9IDA7XHJcblxyXG4gICAgdmFyIG1vdXNlID0gbW91c2VNb2R1bGUoY2FudmFzKTtcclxuXHJcbiAgICBjb25maWcuaW5wdXQgPSBpbnB1dDtcclxuICAgIGNvbmZpZy5tb3VzZSA9IG1vdXNlO1xyXG4gICAgY29uZmlnLmNvbGxpc2lvbnMgPSBjb2xsaXNpb25zKHtcclxuICAgICAgICBuOiA3LFxyXG4gICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGggKyAxMDAsXHJcbiAgICAgICAgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0ICsgMTAwXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lV2luZG93KGNvbmZpZyk7XHJcblxyXG4gICAgdmFyIHNvdW5kID0gbmV3IEhvd2woe1xyXG4gICAgICAgIHVybHM6IFsnbXVzaWMvbWFpbi5tcDMnLCAnbXVzaWMvbWFpbi5vZ2cnXSxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIHZvbHVtZTogMC41XHJcbiAgICB9KS8vLnBsYXkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnYW1lVGltZXIoKSB7XHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGR0ID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDAuMDtcclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIGdhbWUucmVuZGVyKGR0KTtcclxuXHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xyXG4gICAgICAgIGxvYWRSZXNvdXJjZXMoY29uZmlnLnJlc291cmNlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmluaXQoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW9kZWw6IGdhbWUsXHJcbiAgICAgICAgaW5pdDogaW5pdEdhbWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbmRleC5qc1xuICoqLyIsImZ1bmN0aW9uIGNvbGxpZGVzKHgsIHksIHIsIGIsIHgyLCB5MiwgcjIsIGIyKSB7XHJcbiAgICByZXR1cm4gIShyID49IHgyIHx8IHggPCByMiB8fFxyXG4gICAgYiA+PSB5MiB8fCB5IDwgYjIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBib3hDb2xsaWRlcyhwb3MsIHNpemUsIHBvczIsIHNpemUyKSB7XHJcbiAgICByZXR1cm4gY29sbGlkZXMocG9zWzBdICsgc2l6ZVswXSAvIDIsIHBvc1sxXSArIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvc1swXSAtIHNpemVbMF0gLyAyLCBwb3NbMV0gLSBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdICsgc2l6ZTJbMF0gLyAyLCBwb3MyWzFdICsgc2l6ZTJbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gLSBzaXplMlswXSAvIDIsIHBvczJbMV0gLSBzaXplMlsxXSAvIDIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJhZGlhbnMoZGVncmVlKSB7XHJcbiAgICByZXR1cm4gZGVncmVlICogTWF0aC5QSSAvIDE4MDtcclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWUocG9pbnQxLCBwb2ludDIsIHByZXZEZWdyZWUsIHNwZWVkKSB7XHJcbiAgICB2YXIgZGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKG5ld0RlZ3JlZSA9IDM2MCAtIG5ld0RlZ3JlZSk7XHJcbiAgICBuZXdEZWdyZWUgKz0gZGVncmVlO1xyXG4gICAgKG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuICAgIChuZXdEZWdyZWUgPiAzNjApICYmIChuZXdEZWdyZWUgLT0gMzYwKTtcclxuXHJcbiAgICB2YXIgZGlyID0gKChuZXdEZWdyZWUgPiAwICYmIG5ld0RlZ3JlZSA8PSA5MCkgfHwgKG5ld0RlZ3JlZSA+IDI3MCAmJiBuZXdEZWdyZWUgPD0gMzYwKSkgPyAxIDogLTE7XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHtcclxuICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICBrOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0RGVzdGluYXRpb24ocG9pbnQxLCBkaXJlY3Rpb24sIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IChwb2ludFswXSArIGxpbmUuZGlyICogc3BlZWQgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkpO1xyXG4gICAgICAgIHkgPSAocG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gZWxsaXBzZShjb250ZXh0LCBjeCwgY3ksIHJ4LCByeSwgcm90LCBhU3RhcnQsIGFFbmQpe1xyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShjeCwgY3kpO1xyXG4gICAgY29udGV4dC5yb3RhdGUocm90KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC1yeCwgLXJ5KTtcclxuXHJcbiAgICBjb250ZXh0LnNjYWxlKHJ4LCByeSk7XHJcbiAgICBjb250ZXh0LmFyYygxLCAxLCAxLCBhU3RhcnQsIGFFbmQsIGZhbHNlKTtcclxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG59XHJcbmZ1bmN0aW9uIG5leHRQb3NpdGlvbihwb2ludDEsIHBvaW50Mi8qLCBzcGVlZCwgZHQqLykge1xyXG4gICAgdmFyIGRlbHRheCA9IE1hdGguYWJzKHBvaW50MlswXSAtIHBvaW50MVswXSksXHJcbiAgICAgICAgZGVsdGF5ID0gTWF0aC5hYnMocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSxcclxuICAgICAgICBlcnJvciA9IDAsXHJcbiAgICAgICAgZGVsdGFlcnIgPSAoZGVsdGF4ID4gZGVsdGF5KSA/IGRlbHRheSA6IGRlbHRheCxcclxuICAgICAgICB5ID0gcG9pbnQxWzFdLFxyXG4gICAgICAgIHggPSBwb2ludDFbMF07XHJcblxyXG4gICAgaWYgKGRlbHRheCA+IGRlbHRheSkge1xyXG4gICAgICAgIChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geC0tIDogeCsrO1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YWVycjtcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG4gICAgICAgICAgICB5ID0gKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5IC0gMSA6IHkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5LS0gOiB5Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF5KSB7XHJcbiAgICAgICAgICAgIHggPSAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHggLSAxIDogeCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZW9mKG9iaikgIT0gJ29iamVjdCcpXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuXHJcbiAgICB2YXIgdGVtcCA9IG9iai5jb25zdHJ1Y3RvcigpOyAvLyBjaGFuZ2VkXHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIG9iailcclxuICAgICAgICB0ZW1wW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XHJcbiAgICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZWxsaXBzZTogZWxsaXBzZSxcclxuICAgIGdldFJhZGlhbnM6IGdldFJhZGlhbnMsXHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICAnZ2V0TW92ZWRQb2ludEJ5RGVncmVlJzogZ2V0TW92ZWRQb2ludEJ5RGVncmVlLFxyXG4gICAgJ2Nsb25lJzogY2xvbmVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iLCJ2YXIgcmVzb3VyY2VDYWNoZSA9IHt9LFxyXG4gICAgcmVhZHlDYWxsYmFjaztcclxuXHJcbi8vIExvYWQgYW4gaW1hZ2UgdXJsIG9yIGFuIGFycmF5IG9mIGltYWdlIHVybHNcclxuZnVuY3Rpb24gbG9hZCh1cmxPckFycikge1xyXG4gICAgaWYgKHVybE9yQXJyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICB1cmxPckFyci5mb3JFYWNoKGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgX2xvYWQodXJsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9sb2FkKHVybE9yQXJyKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2xvYWQodXJsKSB7XHJcbiAgICBpZiAocmVzb3VyY2VDYWNoZVt1cmxdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBpbWc7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeUNhbGxiYWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gZmFsc2U7XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCkge1xyXG4gICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNSZWFkeSgpIHtcclxuICAgIHZhciByZWFkeSA9IHRydWU7XHJcbiAgICBmb3IgKHZhciBrIGluIHJlc291cmNlQ2FjaGUpIHtcclxuICAgICAgICBpZiAocmVzb3VyY2VDYWNoZS5oYXNPd25Qcm9wZXJ0eShrKSAmJiAhcmVzb3VyY2VDYWNoZVtrXSkge1xyXG4gICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZWFkeTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25SZWFkeShmdW5jKSB7XHJcbiAgICByZWFkeUNhbGxiYWNrID0gZnVuYztcclxufVxyXG5cclxudmFyIHJlc291cmNlcyA9IHtcclxuICAgIGxvYWQ6IGxvYWQsXHJcbiAgICBnZXQ6IGdldCxcclxuICAgIG9uUmVhZHk6IG9uUmVhZHksXHJcbiAgICBpc1JlYWR5OiBpc1JlYWR5XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXNvdXJjZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3Jlc291cmNlcy5qc1xuICoqLyIsImZ1bmN0aW9uIG1vdXNlKGNhbnZhcykge1xyXG4gICAgICAgIC8vIEhJVFRFU1Q6IFRvIGNvbnZlcnQgdGhlIG1vdXNlIHBvc2l0aW9uIHRvIGJlIGNhbnZhcyByZWxhdGl2ZS5cclxuICAgICAgICAvLyBCRUdJTiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMTQ0NjUvZ2V0dGluZy1tb3VzZS1sb2NhdGlvbi1pbi1jYW52YXNcclxuICAgIHZhciBzdHlsZVBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nTGVmdCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZVBhZGRpbmdUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdUb3AnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydib3JkZXJMZWZ0V2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlclRvcFdpZHRoJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIC8vIFNvbWUgcGFnZXMgaGF2ZSBmaXhlZC1wb3NpdGlvbiBiYXJzIChsaWtlIHRoZSBzdHVtYmxldXBvbiBiYXIpIGF0IHRoZSB0b3Agb3IgbGVmdCBvZiB0aGUgcGFnZVxyXG4gICAgICAgIC8vIFRoZXkgd2lsbCBtZXNzIHVwIG1vdXNlIGNvb3JkaW5hdGVzIGFuZCB0aGlzIGZpeGVzIHRoYXRcclxuICAgICAgICBodG1sID0gZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLFxyXG4gICAgICAgIGh0bWxUb3AgPSBodG1sLm9mZnNldFRvcCxcclxuICAgICAgICBodG1sTGVmdCA9IGh0bWwub2Zmc2V0TGVmdCxcclxuICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTowXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGdldFByb3BlclBvc2l0aW9uKGUpO1xyXG5cclxuICAgICAgICBwb3NpdGlvbi54ID0gcG9zLng7XHJcbiAgICAgICAgcG9zaXRpb24ueSA9IHBvcy55O1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVyUG9zaXRpb24oZSkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gY2FudmFzLFxyXG4gICAgICAgICAgICBvZmZzZXRYID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IDAsXHJcbiAgICAgICAgICAgIG14LCBteTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgdG90YWwgb2Zmc2V0LiBJdCdzIHBvc3NpYmxlIHRvIGNhY2hlIHRoaXMgaWYgeW91IHdhbnRcclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBwYWRkaW5nIGFuZCBib3JkZXIgc3R5bGUgd2lkdGhzIHRvIG9mZnNldFxyXG4gICAgICAgIC8vIEFsc28gYWRkIHRoZSA8aHRtbD4gb2Zmc2V0cyBpbiBjYXNlIHRoZXJlJ3MgYSBwb3NpdGlvbjpmaXhlZCBiYXIgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcilcclxuICAgICAgICAvLyBUaGlzIHBhcnQgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSwgaXQgZGVwZW5kcyBvbiB5b3VyIHN0eWxpbmdcclxuICAgICAgICBvZmZzZXRYICs9IHN0eWxlUGFkZGluZ0xlZnQgKyBzdHlsZUJvcmRlckxlZnQgKyBodG1sTGVmdDtcclxuICAgICAgICBvZmZzZXRZICs9IHN0eWxlUGFkZGluZ1RvcCArIHN0eWxlQm9yZGVyVG9wICsgaHRtbFRvcDtcclxuXHJcbiAgICAgICAgbXggPSBlLnBhZ2VYIC0gb2Zmc2V0WDtcclxuICAgICAgICBteSA9IGUucGFnZVkgLSBvZmZzZXRZO1xyXG5cclxuICAgICAgICAvLyBXZSByZXR1cm4gYSBzaW1wbGUgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCB4IGFuZCB5IGRlZmluZWRcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBteCxcclxuICAgICAgICAgICAgeTogbXlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNNb3VzZURvd24gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTW91c2VEb3duO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TW91c2VQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vdXNlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9tb3VzZS5qc1xuICoqLyIsInZhciBwcmVzc2VkS2V5cyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gc2V0S2V5KGV2ZW50LCBzdGF0dXMpIHtcclxuICAgIHByZXNzZWRLZXlzW2V2ZW50LmtleUNvZGVdID0gc3RhdHVzO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCB0cnVlKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzZXRLZXkoZSwgZmFsc2UpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcHJlc3NlZEtleXMgPSB7fTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZXNldCgpIHtcclxuICAgIHByZXNzZWRLZXlzID0ge307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRG93bihrZXkpIHtcclxuICAgIHJldHVybiBwcmVzc2VkS2V5c1trZXldO1xyXG59XHJcblxyXG52YXIgaW5wdXQgPSB7XHJcbiAgICBwcmVzc2VkS2V5czogcHJlc3NlZEtleXMsXHJcbiAgICByZXNldDogcmVzZXQsXHJcbiAgICBpc0Rvd246IGlzRG93blxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5wdXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2lucHV0LmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHJlbmRlcnMgZnJvbSAnLi9yZW5kZXJlcnMnO1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmZ1bmN0aW9uIEdhbWVPYmplY3QoY29uZmlnKSB7XHJcbiAgICB0aGlzLnBvcyA9IHV0aWxzLmNsb25lKGNvbmZpZy5wb3MpO1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuXHJcbiAgICBpZiAoY29uZmlnLnNwcml0ZSkge1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZShjb25maWcuc3ByaXRlWzBdLCBjb25maWcuc3ByaXRlWzFdLCBjb25maWcuc3ByaXRlWzJdLCBjb25maWcuc3ByaXRlWzNdLCBjb25maWcuc3ByaXRlWzRdLCBjb25maWcuc3ByaXRlWzVdLCBjb25maWcuc3ByaXRlWzZdLCBjb25maWcuc3ByaXRlWzddKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnNpemUgfHwgdGhpcy5zcHJpdGUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCB0aGlzLnNwcml0ZS5zaXplO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29uZmlnLmNvbGxpc2lvbnM7XHJcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNvbmZpZy5jYWxsYmFja3MgfHwge307XHJcbiAgICB0aGlzLnpJbmRleCA9IGNvbmZpZy56SW5kZXggfHwgMDtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IGNvbmZpZy5wYXJhbWV0ZXJzO1xyXG4gICAgdGhpcy5ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmZpZy5jb25kaXRpb25zIHx8IFtdO1xyXG4gICAgdGhpcy5fdXBkYXRlID0gY29uZmlnLnVwZGF0ZTtcclxuICAgIGlmIChjb25maWcucmVuZGVyKSB7XHJcbiAgICAgICAgaWYgKHJlbmRlcnNbY29uZmlnLnJlbmRlcl0pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIgPSByZW5kZXJzW2NvbmZpZy5yZW5kZXJdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUmVuZGVyID0gY29uZmlnLnJlbmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcblxyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5vYmplY3RDb3VudCA9IDA7XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdmFyIGN0eCA9IHRoaXMubGF5ZXIuY3R4O1xyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXN0b21SZW5kZXIpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmN1c3RvbVJlbmRlcikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1c3RvbVJlbmRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXJbaV0odGhpcywgZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIodGhpcywgZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVuZGVycy5zcHJpdGUodGhpcywgZHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5ydWxlcyxcclxuICAgICAgICAgICAgY29uZGl0aW9ucyA9IHRoaXMuY29uZGl0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBuZXcgR2FtZVJ1bGUodGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvblsnY29sbGlzaW9ucyddKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjb25kaXRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbmRpdGlvbih0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uW2NvbmRpdGlvbnNbaV1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuc2V0TGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB0aGlzLl91cGRhdGUgJiYgdGhpcy5fdXBkYXRlKCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucnVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZUNvbmRpdGlvbnMgPSBmdW5jdGlvbihkdCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbmRpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbnNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9yZW1vdmVJbk5leHRUaWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jb2xsaXNpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnJlbW92ZU9iamVjdCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSW5OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy5wb3NbMF0gPSBwb2ludFswXTtcclxuICAgIHRoaXMucG9zWzFdID0gcG9pbnRbMV07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIHZhciBvYmplY3QgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSGl0Qm94KG1vdXNlKSB7XHJcbiAgICAgICAgdmFyIGZsYWc7XHJcblxyXG4gICAgICAgIChvYmplY3QucG9zWzBdIDwgbW91c2UueCkgJiYgKG9iamVjdC5wb3NbMF0gKyBvYmplY3Quc3ByaXRlLnNpemVbMF0gPiBtb3VzZS54KSAmJiAob2JqZWN0LnBvc1sxXSA8IG1vdXNlLnkpICYmIChvYmplY3QucG9zWzFdICsgb2JqZWN0LnNwcml0ZS5zaXplWzFdID4gbW91c2UueSkgJiYgKGZsYWcgPSB0cnVlKTtcclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbJ2NsaWNrJ10gJiYgY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydjbGljayddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJyA6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSAmJiBjaGVja0hpdEJveChtb3VzZSkgJiYgdGhpcy5jYWxsYmFja3NbJ21vdXNlbW92ZSddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbJ21vdXNlbGVhdmUnXSAmJiAhY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10odGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShhY3Rpb24pICYmIHRoaXMuY2FsbGJhY2tzW2FjdGlvbl0odGhpcywgZXZlbnQpXHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcnVsZSA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBydWxlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkQ29uZGl0aW9uID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMuY29uZGl0aW9ucy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgY29uZGl0aW9uID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgY29uZGl0aW9uLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgY29uZGl0aW9uLmluaXQoKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbnMucHVzaChjb25kaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZUNvbGxpc2lvbnMgPSBmdW5jdGlvbihkdCkge1xyXG4gICAgdGhpcy5jb2xsaXNpb25zICYmIHRoaXMuY29sbGlzaW9ucy51cGRhdGUoZHQsIHRoaXMpO1xyXG59O1xyXG5mdW5jdGlvbiBHYW1lUnVsZShjb25maWcpIHtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gdXRpbHMuY2xvbmUodGhpcy5wYXJhbWV0ZXJzKTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZVJ1bGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lUnVsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoZHQsIG9iaik7XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS5zZXRDb250ZXh0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lTGF5ZXIoY29uZmlnKSB7XHJcbiAgICB0aGlzLm9iamVjdENvdW50ID0gMDtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmluaXRMaXN0ID0gY29uZmlnLmluaXRMaXN0O1xyXG4gICAgdGhpcy5nYW1lID0gY29uZmlnLmdhbWU7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmN0eC5jcmVhdGVQYXR0ZXJuKHJlc291cmNlcy5nZXQoY29uZmlnLmJhY2tncm91bmQpLCAncmVwZWF0Jyk7XHJcbiAgICB0aGlzLnBvcyA9IGNvbmZpZy5wb3MgfHwgWzAsIDBdO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgW2NvbmZpZy5jdHguY2FudmFzLndpZHRoLCBjb25maWcuY3R4LmNhbnZhcy5oZWlnaHRdO1xyXG4gICAgdGhpcy5zb3J0ZWRPYmplY3RzID0ge1xyXG4gICAgICAgICdkZWZhdWx0JzogW11cclxuICAgIH07XHJcbiAgICB0aGlzLm9iamVjdHMgPSB7fTtcclxuICAgIHRoaXMuX3J1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmluaXRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT2JqZWN0KHRoaXMuZ2FtZS5nZXRDb25maWcodGhpcy5pbml0TGlzdFtpXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMuX3J1bGVzO1xyXG4gICAgICAgIHRoaXMucnVsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBydWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKHRoaXMuZ2FtZS5ydWxlc0RlZmluaXRpb25bcnVsZXNbaV1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHZhciBhcnIgPSBbXSxcclxuICAgICAgICBjdHggPSB0aGlzLmN0eCxcclxuICAgICAgICBjYW52YXMgPSBjdHguY2FudmFzO1xyXG5cclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgucmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxuICAgIGN0eC5jbGlwKCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIChhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0pIHx8IChhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0gPSBbXSk7XHJcbiAgICAgICAgICAgIGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XS5wdXNoKHRoaXMub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFycltpXSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IGFycltpXS5sZW5ndGg7IGogPCBrOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGFycltpXVtqXS5yZW5kZXIoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdibGFjayc7XHJcbiAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xyXG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ2JsYWNrJztcclxuICAgIGN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFggPSAwO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFkgPSAwO1xyXG4gICAgY3R4LnJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLnJ1bGVzW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGVDb2xsaXNpb25zKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbWUuY29sbGlzaW9ucy5jaGVjaygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZUNvbmRpdGlvbnMoZHQpO1xyXG4gICAgfVxyXG5cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcnVsZSA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBydWxlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbW92ZU9iamVjdCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3RzW2lkXS50eXBlICYmIHRoaXMub2JqZWN0c1tpZF0udHlwZSAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uc3BsaWNlKHRoaXMuc29ydGVkT2JqZWN0c1t0aGlzLm9iamVjdHNbaWRdLnR5cGVdLmluZGV4T2YoaWQpLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgdGhpcy5vYmplY3RzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRPYmplY3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAvKmlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09iamVjdCB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyOiAnLCBjb25maWcuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0qL1xyXG5cclxuICAgIHZhciBfb2JqID0gbmV3IEdhbWVPYmplY3QoY29uZmlnKTtcclxuICAgIF9vYmouc2V0TGF5ZXIodGhpcyk7XHJcbiAgICBfb2JqLmluaXQoKTtcclxuXHJcbiAgICBpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgKCF0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdKSAmJiAodGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSA9IFtdKTtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goX29iai5pZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnB1c2goX29iai5pZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9iamVjdHNbX29iai5pZF0gPSBfb2JqO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm9iamVjdHNbX29iai5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IG9iai5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPYmplY3Qob2JqW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZE9iamVjdHMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRPYmplY3RzQnlUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgIHZhciBvYmplY3RzSWQgPSB0aGlzLnNvcnRlZE9iamVjdHNbdHlwZV0gfHwgW10sXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNJZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICByZXN1bHQucHVzaCh0aGlzLm9iamVjdHNbb2JqZWN0c0lkW2ldXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMub2JqZWN0c1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5ydWxlc1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5wb3NbMF0gKyB0aGlzLnNpemVbMF0sIHRoaXMucG9zWzFdICsgdGhpcy5zaXplWzFdXTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVXaW5kb3coY29uZmlnKSB7XHJcbiAgICB0aGlzLmxheWVycyA9IHt9O1xyXG4gICAgdGhpcy5jdHggPSBjb25maWcuY3R4O1xyXG4gICAgdGhpcy5jYW52YXMgPSBjb25maWcuY2FudmFzO1xyXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29uZmlnLmNvbGxpc2lvbnM7XHJcbiAgICB0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcbiAgICB0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuICAgIHRoaXMubGF5ZXJzRGVmaW5pdGlvbiA9IGNvbmZpZy5sYXllcnM7XHJcbiAgICB0aGlzLmlucHV0ID0gY29uZmlnLmlucHV0O1xyXG4gICAgdGhpcy5tb3VzZSA9IGNvbmZpZy5tb3VzZTtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSA/IHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIDogMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnJlbmRlcihkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXJzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmFkZExheWVyKG9ialtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkTGF5ZXJzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmICh0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShvYmouaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTGF5ZXIgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyB3aW5kb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9iai5jdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBvYmouZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sYXllcnNbb2JqLmlkXSA9IG5ldyBHYW1lTGF5ZXIob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNbb2JqLmlkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgY29uZmlnID0gdXRpbHMuY2xvbmUodGhpcy5vYmplY3RzRGVmaW5pdGlvbltpZF0pO1xyXG5cclxuICAgICghY29uZmlnLmlkKSAmJiAoY29uZmlnLmlkID0gaWQpO1xyXG5cclxuICAgIGNvbmZpZy5pZCArPSAodGhpcy5vYmplY3RDb3VudCsrKSArIE1hdGgucm91bmQoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArIE1hdGgucmFuZG9tKCkgKiAxMDAwMDAxKTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldExheWVyQ29uZmlnID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNEZWZpbml0aW9uW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUub2JqZWN0Q291bnQ9IDA7XHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVXaW5kb3dcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvb2JqZWN0cy5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBoZWFsdGhCYXIob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHgsXHJcbiAgICAgICAgeCA9IE1hdGgucm91bmQoLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyICksXHJcbiAgICAgICAgeSA9IE1hdGgucm91bmQoLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIC0gNyksXHJcbiAgICAgICAgd2lkdGggPSBvYmouc3ByaXRlLnNpemVbMF0sXHJcbiAgICAgICAgaGVpZ2h0ID0gMztcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjU7XHJcblxyXG4gICAgaWYgKChvYmoucGFyYW1ldGVycy5oZWFsdGggPiAwKSAmJiAob2JqLl9wYXJhbWV0ZXJzLmhlYWx0aCA+IG9iai5wYXJhbWV0ZXJzLmhlYWx0aCkpIHtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjUwLCAwLCAwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMjUwLCAwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBNYXRoLnJvdW5kKHdpZHRoICogKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCAvIG9iai5fcGFyYW1ldGVycy5oZWFsdGgpKSwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG59XHJcbmZ1bmN0aW9uIHNwcml0ZShvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eDtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgZHQgJiYgb2JqLnNwcml0ZS51cGRhdGUoZHQpO1xyXG4gICAgb2JqLnNwcml0ZS5yZW5kZXIoY3R4KTtcclxufVxyXG5mdW5jdGlvbiBzaGFkb3cob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHg7XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIHV0aWxzLmVsbGlwc2UoY3R4LCAwICwgKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyIC0gMywgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiwgNSwgdXRpbHMuZ2V0UmFkaWFucygwKSwgdXRpbHMuZ2V0UmFkaWFucygwKSwgdXRpbHMuZ2V0UmFkaWFucygzNjApKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuXHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG59XHJcbmZ1bmN0aW9uIGVmZmVjdHMob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHg7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoucGFyYW1ldGVycy5lZmZlY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGVmZmVjdCA9IG9iai5wYXJhbWV0ZXJzLmVmZmVjdHNbaV07XHJcbiAgICAgICAgaWYgKGVmZmVjdCA9PSAnZnJvemVuJykge1xyXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjg7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocmVzb3VyY2VzLmdldCgnaW1nL2Zyb3N0ZWZmZWN0LnBuZycpLCAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIsIC04LCAzMiwgMzIpO1xyXG4gICAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb2JqZWN0UmVuZGVyZXIob2JqLCBkdCkge1xyXG4gICAgc2hhZG93KG9iaiwgZHQpO1xyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG59XHJcbmZ1bmN0aW9uIHVuaXRSZW5kZXJlcihvYmosIGR0KSB7XHJcbiAgICBzaGFkb3cob2JqLCBkdCk7XHJcbiAgICBoZWFsdGhCYXIob2JqLCBkdCk7XHJcbiAgICBzcHJpdGUob2JqLCBkdCk7XHJcbiAgICBlZmZlY3RzKG9iaiwgZHQpO1xyXG59XHJcbmZ1bmN0aW9uIHNwZWxsUmVuZGVyZXIob2JqLCBkdCkge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHgsXHJcbiAgICAgICAgeCA9IE1hdGgucm91bmQoLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIC0gNCksXHJcbiAgICAgICAgeSA9IE1hdGgucm91bmQoLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIC0gNCksXHJcbiAgICAgICAgd2lkdGggPSBvYmouc3ByaXRlLnNpemVbMF0gKyA4LFxyXG4gICAgICAgIGhlaWdodCA9IG9iai5zcHJpdGUuc2l6ZVsxXSArIDg7XHJcblxyXG4gICAgaWYgKG9iai5pZC5pbmRleE9mKG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXS5wYXJhbWV0ZXJzLmN1cnJlbnRTcGVsbCkgIT0gLTEpIHtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMjUwLCAwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4IC0gMiwgeSAtIDIsIHdpZHRoICsgNCwgaGVpZ2h0ICsgNCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC40O1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDAsIDAsIDApXCI7XHJcblxyXG4gICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAwLCAwKVwiO1xyXG4gICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcblxyXG4gICAgc3ByaXRlKG9iaiwgZHQpO1xyXG5cclxuICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPiAwKSB7XHJcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC44O1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigyMCwgMjAsIDIwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCBNYXRoLnJvdW5kKHkgKyBoZWlnaHQgLSBoZWlnaHQgKiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duIC8gb2JqLnBhcmFtZXRlcnMuY29vbGRvd24pKSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB0ZXh0UmVuZGVyKG9iaikge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHgsXHJcbiAgICAgICAgZm9udENvbmZpZyA9ICcnO1xyXG5cclxuICAgIChvYmoucGFyYW1ldGVycy5zdHlsZSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLnBhcmFtZXRlcnMuc3R5bGUgKyBcIiBcIik7XHJcbiAgICAob2JqLnBhcmFtZXRlcnMud2VpZ2h0KSAmJiAoZm9udENvbmZpZyArPSBvYmoucGFyYW1ldGVycy53ZWlnaHQgKyBcIiBcIik7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmoucGFyYW1ldGVycy5zaXplIHx8IDMwKSArICdwdCAnO1xyXG4gICAgZm9udENvbmZpZyArPSAob2JqLnBhcmFtZXRlcnMuZm9udCB8fCBcIkFyaWFsXCIpO1xyXG5cclxuICAgIGlmIChvYmoucGFyYW1ldGVycy5hbGlnbikge1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBvYmoucGFyYW1ldGVycy5hbGlnbjtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZm9udCA9IGZvbnRDb25maWc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gb2JqLnBhcmFtZXRlcnMuY29sb3IgfHwgXCIjRkZGXCI7XHJcbiAgICBjdHguZmlsbFRleHQob2JqLnBhcmFtZXRlcnMudGV4dCwgb2JqLnBvc1swXSwgb2JqLnBvc1sxXSk7XHJcbn1cclxudmFyIHJlbmRlcnMgPSB7XHJcbiAgICBzaGFkb3c6IHNoYWRvdyxcclxuICAgIGhlYWx0aEJhcjogaGVhbHRoQmFyLFxyXG4gICAgc3ByaXRlOiBzcHJpdGUsXHJcbiAgICBlZmZlY3RzOiBlZmZlY3RzLFxyXG4gICAgb2JqZWN0IDogb2JqZWN0UmVuZGVyZXIsXHJcbiAgICB0ZXh0OiB0ZXh0UmVuZGVyLFxyXG4gICAgc3BlbGwgOiBzcGVsbFJlbmRlcmVyLFxyXG4gICAgdW5pdDogdW5pdFJlbmRlcmVyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXJzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9yZW5kZXJlcnMuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gU3ByaXRlKHVybCwgcG9zLCBzaXplLCBzcGVlZCwgZnJhbWVzLCBkaXIsIG9uY2UsIGRlZ3JlZSkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV07XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgdGhpcy5zcGVlZCA9IHR5cGVvZiBzcGVlZCA9PT0gJ251bWJlcicgPyBzcGVlZCA6IDA7XHJcbiAgICB0aGlzLmZyYW1lcyA9IHV0aWxzLmNsb25lKGZyYW1lcyk7XHJcbiAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICB0aGlzLnVybCA9IHVybDtcclxuICAgIHRoaXMuZGlyID0gZGlyIHx8ICdob3Jpem9udGFsJztcclxuICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZSB8fCAwO1xyXG59XHJcblxyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX2luZGV4ICs9IHRoaXMuc3BlZWQgKiBkdDtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGVDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnBvcyAmJiAodGhpcy5wb3MgPSBjb25maWcucG9zKTtcclxuICAgICAgICBjb25maWcuc2l6ZSAmJiAodGhpcy5zaXplID0gY29uZmlnLnNpemUpO1xyXG4gICAgICAgIGNvbmZpZy5zcGVlZCAmJiAodGhpcy5zcGVlZCA9IHR5cGVvZiBjb25maWcuc3BlZWQgPT09ICdudW1iZXInID8gY29uZmlnLnNwZWVkIDogMCk7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lcyAmJiAodGhpcy5mcmFtZXMgPSBjb25maWcuZnJhbWVzKTtcclxuICAgICAgICBjb25maWcudXJsICYmICh0aGlzLnVybCA9IGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGNvbmZpZy5kaXIgJiYgKHRoaXMuZGlyID0gY29uZmlnLmRpcik7XHJcbiAgICAgICAgY29uZmlnLm9uY2UgJiYgKHRoaXMub25jZSA9IGNvbmZpZy5vbmNlKTtcclxuICAgICAgICBjb25maWcuZGVncmVlICYmICh0aGlzLmRlZ3JlZSA9IGNvbmZpZy5kZWdyZWUpO1xyXG4gICAgfVxyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJvdGF0ZVRvRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgdmFyIHBvcyA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uLFxyXG4gICAgICAgIGNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24uZGlyID09IDEpIHtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKGNvbmZpZy5wb3MgPSBbcG9zWzBdLCBwb3NbMV1dKTtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKGNvbmZpZy5wb3MgPSBbcG9zWzBdLCBwb3NbMV0gKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChjb25maWcucG9zID1bcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbi5kaXIgPT0gLTEpIHtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKGNvbmZpZy5wb3MgPVtwb3NbMF0sIHBvc1sxXSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKGNvbmZpZy5wb3MgPVtwb3NbMF0sIHBvc1sxXSArIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoY29uZmlnLnBvcyA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlQ29uZmlnKGNvbmZpZyk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgdmFyIGZyYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnNwZWVkID4gMCkge1xyXG4gICAgICAgIHZhciBtYXggPSB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGlkeCA9IE1hdGguZmxvb3IodGhpcy5faW5kZXgpO1xyXG4gICAgICAgIGZyYW1lID0gdGhpcy5mcmFtZXNbaWR4ICUgbWF4XTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25jZSAmJiBpZHggPj0gbWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmcmFtZSA9IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHZhciB4ID0gdGhpcy5wb3NbMF07XHJcbiAgICB2YXIgeSA9IHRoaXMucG9zWzFdO1xyXG5cclxuICAgIGlmICh0aGlzLmRpciA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgeSArPSBmcmFtZSAqIHRoaXMuc2l6ZVsxXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHggKz0gZnJhbWUgKiB0aGlzLnNpemVbMF07XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLmRlZ3JlZSk7XHJcbiAgICBjdHguZHJhd0ltYWdlKHJlc291cmNlcy5nZXQodGhpcy51cmwpLFxyXG4gICAgICAgIHgsIHksXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0sXHJcbiAgICAgICAgTWF0aC5yb3VuZCgtdGhpcy5zaXplWzBdIC8gMiksIE1hdGgucm91bmQoLXRoaXMuc2l6ZVsxXSAvIDIpLFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5zZXREZWdyZWUgPSBmdW5jdGlvbiAoZGVncmVlKSB7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvc3ByaXRlLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnXHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZShjb25maWcpIHtcclxuICAgIHZhciBuID0gY29uZmlnLm4gfHwgNixcclxuICAgICAgICB3aWR0aCA9IGNvbmZpZy53aWR0aCB8fCA4MDAsXHJcbiAgICAgICAgaGVpZ2h0ID0gY29uZmlnLmhlaWdodCB8fCA2MDAsXHJcbiAgICAgICAgc2l6ZVggPSAod2lkdGgpID4+IG4sXHJcbiAgICAgICAgc2l6ZVkgPSAoaGVpZ2h0KSA+PiBuLFxyXG4gICAgICAgIGNlbGxHcmlkID0gbmV3IEFycmF5KHNpemVYICogc2l6ZVkpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbEdyaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjZWxsR3JpZFtpXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsR3JpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjZWxsR3JpZFtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldENlbGwocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gKHBvaW50WzBdKSArIHBvaW50WzFdICogc2l6ZVk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlT2JqZWN0KG9iamVjdCl7XHJcbiAgICAgICAgdmFyIG9sZENlbGxzID0gb2JqZWN0LnBhcmFtZXRlcnMuY29sbGlzaW9ucy5jZWxscztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRDZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjZWxsR3JpZFtvbGRDZWxsc1tpXV0gJiYgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLnNwbGljZShjZWxsR3JpZFtvbGRDZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBvYmplY3QucG9zLFxyXG4gICAgICAgICAgICBzaXplID0gb2JqZWN0LnNpemUsXHJcbiAgICAgICAgICAgIHBvaW50MSA9IFsocG9zWzBdICsgc2l6ZVswXSAvIDIpID4+IG4sIChwb3NbMV0gKyBzaXplWzFdIC8gMikgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50MiA9IFsocG9zWzBdIC0gc2l6ZVswXSAvIDIpID4+IG4sIChwb3NbMV0gLSBzaXplWzFdIC8gMikgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50MyA9IFsocG9zWzBdICsgc2l6ZVswXSAvIDIpID4+IG4sIChwb3NbMV0gLSBzaXplWzFdIC8gMikgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50NCA9IFsocG9zWzBdIC0gc2l6ZVswXSAvIDIpID4+IG4sIChwb3NbMV0gKyBzaXplWzFdIC8gMikgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50NSA9IFtwb3NbMF0gPj4gbiwgcG9zWzFdID4+IG5dLFxyXG4gICAgICAgICAgICBjZWxscyA9IFtnZXRDZWxsKHBvaW50MSksIGdldENlbGwocG9pbnQyKSwgZ2V0Q2VsbChwb2ludDMpLCBnZXRDZWxsKHBvaW50NCksIGdldENlbGwocG9pbnQ1KV0sXHJcbiAgICAgICAgICAgIG9sZENlbGxzID0gb2JqZWN0LnBhcmFtZXRlcnMuY29sbGlzaW9ucy5jZWxscztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRDZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAob2xkQ2VsbHNbaV0gIT0gY2VsbHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIGNlbGxHcmlkW29sZENlbGxzW2ldXSAmJiBjZWxsR3JpZFtvbGRDZWxsc1tpXV0uc3BsaWNlKGNlbGxHcmlkW29sZENlbGxzW2ldXS5pbmRleE9mKG9iamVjdCksIDEpO1xyXG4gICAgICAgICAgICAgICAgY2VsbEdyaWRbY2VsbHNbaV1dICYmIChjZWxsR3JpZFtjZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpID09IC0xKSAmJiBjZWxsR3JpZFtjZWxsc1tpXV0ucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgb2xkQ2VsbHNbaV0gPSBjZWxsc1tpXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNlbGxHcmlkW2NlbGxzW2ldXSAmJiAoY2VsbEdyaWRbY2VsbHNbaV1dLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkgJiYgY2VsbEdyaWRbY2VsbHNbaV1dLnB1c2gob2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbGxpc2lvbnMoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2l6ZVg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBzaXplWTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbEdyaWRbZ2V0Q2VsbChbaSwgal0pXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gY2VsbEdyaWRbZ2V0Q2VsbChbaSwgal0pXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gb2JqZWN0cy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IGsgKyAxOyBsIDwgbGVuZ3RoOyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmplY3RzW2tdLnBvcywgb2JqZWN0c1trXS5zaXplLCBvYmplY3RzW2xdLnBvcywgb2JqZWN0c1tsXS5zaXplKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYmplY3RzW2tdLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5pbmRleE9mKG9iamVjdHNbbF0pID09IC0xICkgJiYgb2JqZWN0c1trXS5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMucHVzaChvYmplY3RzW2xdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqZWN0c1tsXS5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMuaW5kZXhPZihvYmplY3RzW2tdKSA9PSAtMSApICYmIG9iamVjdHNbbF0ucGFyYW1ldGVycy5jb2xsaXNpb25zLnB1c2gob2JqZWN0c1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjZWxsR3JpZDogY2VsbEdyaWQsXHJcbiAgICAgICAgdXBkYXRlT2JqZWN0OiB1cGRhdGVPYmplY3QsXHJcbiAgICAgICAgcmVtb3ZlT2JqZWN0OiByZW1vdmVPYmplY3QsXHJcbiAgICAgICAgY2hlY2s6IGNoZWNrQ29sbGlzaW9ucyxcclxuICAgICAgICBjbGVhcjogZ2VuZXJhdGVNYXBcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9jb2xsaXNpb25zLmpzXG4gKiovIiwiLyohXG4gKiAgaG93bGVyLmpzIHYxLjEuMjhcbiAqICBob3dsZXJqcy5jb21cbiAqXG4gKiAgKGMpIDIwMTMtMjAxNSwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxuICpcbiAqICBNSVQgTGljZW5zZVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gc2V0dXBcbiAgdmFyIGNhY2hlID0ge307XG5cbiAgLy8gc2V0dXAgdGhlIGF1ZGlvIGNvbnRleHRcbiAgdmFyIGN0eCA9IG51bGwsXG4gICAgdXNpbmdXZWJBdWRpbyA9IHRydWUsXG4gICAgbm9BdWRpbyA9IGZhbHNlO1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgQXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3R4ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN0eCA9IG5ldyB3ZWJraXRBdWRpb0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7XG4gICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCF1c2luZ1dlYkF1ZGlvKSB7XG4gICAgaWYgKHR5cGVvZiBBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBBdWRpbygpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIG5vQXVkaW8gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub0F1ZGlvID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYSBtYXN0ZXIgZ2FpbiBub2RlXG4gIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgdmFyIG1hc3RlckdhaW4gPSAodHlwZW9mIGN0eC5jcmVhdGVHYWluID09PSAndW5kZWZpbmVkJykgPyBjdHguY3JlYXRlR2Fpbk5vZGUoKSA6IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gMTtcbiAgICBtYXN0ZXJHYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBnbG9iYWwgY29udHJvbGxlclxuICB2YXIgSG93bGVyR2xvYmFsID0gZnVuY3Rpb24oY29kZWNzKSB7XG4gICAgdGhpcy5fdm9sdW1lID0gMTtcbiAgICB0aGlzLl9tdXRlZCA9IGZhbHNlO1xuICAgIHRoaXMudXNpbmdXZWJBdWRpbyA9IHVzaW5nV2ViQXVkaW87XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5ub0F1ZGlvID0gbm9BdWRpbztcbiAgICB0aGlzLl9ob3dscyA9IFtdO1xuICAgIHRoaXMuX2NvZGVjcyA9IGNvZGVjcztcbiAgICB0aGlzLmlPU0F1dG9FbmFibGUgPSB0cnVlO1xuICB9O1xuICBIb3dsZXJHbG9iYWwucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIGdsb2JhbCB2b2x1bWUgZm9yIGFsbCBzb3VuZHMuXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZvbCBWb2x1bWUgZnJvbSAwLjAgdG8gMS4wLlxuICAgICAqIEByZXR1cm4ge0hvd2xlci9GbG9hdH0gICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHZvbHVtZS5cbiAgICAgKi9cbiAgICB2b2x1bWU6IGZ1bmN0aW9uKHZvbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdm9sdW1lIGlzIGEgbnVtYmVyXG4gICAgICB2b2wgPSBwYXJzZUZsb2F0KHZvbCk7XG5cbiAgICAgIGlmICh2b2wgPj0gMCAmJiB2b2wgPD0gMSkge1xuICAgICAgICBzZWxmLl92b2x1bWUgPSB2b2w7XG5cbiAgICAgICAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSB2b2w7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRocm91Z2ggY2FjaGUgYW5kIGNoYW5nZSB2b2x1bWUgb2YgYWxsIG5vZGVzIHRoYXQgYXJlIHVzaW5nIEhUTUw1IEF1ZGlvXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICAgIGlmIChzZWxmLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNlbGYuX2hvd2xzW2tleV0uX3dlYkF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhdWRpbyBub2Rlc1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGVbaV0udm9sdW1lID0gc2VsZi5faG93bHNba2V5XS5fdm9sdW1lICogc2VsZi5fdm9sdW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsIHZvbHVtZVxuICAgICAgcmV0dXJuICh1c2luZ1dlYkF1ZGlvKSA/IG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA6IHNlbGYuX3ZvbHVtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXV0ZSBhbGwgc291bmRzLlxuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NldE11dGVkKHRydWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tdXRlIGFsbCBzb3VuZHMuXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zZXRNdXRlZChmYWxzZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbXV0aW5nIGFuZCB1bm11dGluZyBnbG9iYWxseS5cbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBtdXRlZCBJcyBtdXRlZCBvciBub3QuXG4gICAgICovXG4gICAgX3NldE11dGVkOiBmdW5jdGlvbihtdXRlZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBzZWxmLl9tdXRlZCA9IG11dGVkO1xuXG4gICAgICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSBtdXRlZCA/IDAgOiBzZWxmLl92b2x1bWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICBpZiAoc2VsZi5faG93bHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzZWxmLl9ob3dsc1trZXldLl93ZWJBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGF1ZGlvIG5vZGVzXG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlW2ldLm11dGVkID0gbXV0ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBjb2RlYyBzdXBwb3J0LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZXh0IEF1ZGlvIGZpbGUgZXh0ZW50aW9uLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgY29kZWNzOiBmdW5jdGlvbihleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2RlY3NbZXh0XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaU9TIHdpbGwgb25seSBhbGxvdyBhdWRpbyB0byBiZSBwbGF5ZWQgYWZ0ZXIgYSB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIEF0dGVtcHQgdG8gYXV0b21hdGljYWxseSB1bmxvY2sgYXVkaW8gb24gdGhlIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQ29uY2VwdCBmcm9tOiBodHRwOi8vcGF1bGJha2F1cy5jb20vdHV0b3JpYWxzL2h0bWw1L3dlYi1hdWRpby1vbi1pb3MvXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIF9lbmFibGVpT1NBdWRpbzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG9ubHkgcnVuIHRoaXMgb24gaU9TIGlmIGF1ZGlvIGlzbid0IGFscmVhZHkgZWFuYmxlZFxuICAgICAgaWYgKGN0eCAmJiAoc2VsZi5faU9TRW5hYmxlZCB8fCAhL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2lPU0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgLy8gY2FsbCB0aGlzIG1ldGhvZCBvbiB0b3VjaCBzdGFydCB0byBjcmVhdGUgYW5kIHBsYXkgYSBidWZmZXIsXG4gICAgICAvLyB0aGVuIGNoZWNrIGlmIHRoZSBhdWRpbyBhY3R1YWxseSBwbGF5ZWQgdG8gZGV0ZXJtaW5lIGlmXG4gICAgICAvLyBhdWRpbyBoYXMgbm93IGJlZW4gdW5sb2NrZWQgb24gaU9TXG4gICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBidWZmZXJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgMSwgMjIwNTApO1xuICAgICAgICB2YXIgc291cmNlID0gY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICBzb3VyY2UuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICAgIC8vIHBsYXkgdGhlIGVtcHR5IGJ1ZmZlclxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZS5zdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBzb3VyY2Uubm90ZU9uKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvdXJjZS5zdGFydCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHVwIGEgdGltZW91dCB0byBjaGVjayB0aGF0IHdlIGFyZSB1bmxvY2tlZCBvbiB0aGUgbmV4dCBldmVudCBsb29wXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKChzb3VyY2UucGxheWJhY2tTdGF0ZSA9PT0gc291cmNlLlBMQVlJTkdfU1RBVEUgfHwgc291cmNlLnBsYXliYWNrU3RhdGUgPT09IHNvdXJjZS5GSU5JU0hFRF9TVEFURSkpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdW5sb2NrZWQgc3RhdGUgYW5kIHByZXZlbnQgdGhpcyBjaGVjayBmcm9tIGhhcHBlbmluZyBhZ2FpblxuICAgICAgICAgICAgc2VsZi5faU9TRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmlPU0F1dG9FbmFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0b3VjaCBzdGFydCBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNldHVwIGEgdG91Y2ggc3RhcnQgbGlzdGVuZXIgdG8gYXR0ZW1wdCBhbiB1bmxvY2sgaW5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9jaywgZmFsc2UpO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2hlY2sgZm9yIGJyb3dzZXIgY29kZWMgc3VwcG9ydFxuICB2YXIgYXVkaW9UZXN0ID0gbnVsbDtcbiAgdmFyIGNvZGVjcyA9IHt9O1xuICBpZiAoIW5vQXVkaW8pIHtcbiAgICBhdWRpb1Rlc3QgPSBuZXcgQXVkaW8oKTtcbiAgICBjb2RlY3MgPSB7XG4gICAgICBtcDM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tcGVnOycpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBvcHVzOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgb2dnOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICB3YXY6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBhYWM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG00YTogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW00YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL200YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG1wNDogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW1wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL21wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIHdlYmE6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJylcbiAgICB9O1xuICB9XG5cbiAgLy8gYWxsb3cgYWNjZXNzIHRvIHRoZSBnbG9iYWwgYXVkaW8gY29udHJvbHNcbiAgdmFyIEhvd2xlciA9IG5ldyBIb3dsZXJHbG9iYWwoY29kZWNzKTtcblxuICAvLyBzZXR1cCB0aGUgYXVkaW8gb2JqZWN0XG4gIHZhciBIb3dsID0gZnVuY3Rpb24obykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIHNldHVwIHRoZSBkZWZhdWx0c1xuICAgIHNlbGYuX2F1dG9wbGF5ID0gby5hdXRvcGxheSB8fCBmYWxzZTtcbiAgICBzZWxmLl9idWZmZXIgPSBvLmJ1ZmZlciB8fCBmYWxzZTtcbiAgICBzZWxmLl9kdXJhdGlvbiA9IG8uZHVyYXRpb24gfHwgMDtcbiAgICBzZWxmLl9mb3JtYXQgPSBvLmZvcm1hdCB8fCBudWxsO1xuICAgIHNlbGYuX2xvb3AgPSBvLmxvb3AgfHwgZmFsc2U7XG4gICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgc2VsZi5fc3ByaXRlID0gby5zcHJpdGUgfHwge307XG4gICAgc2VsZi5fc3JjID0gby5zcmMgfHwgJyc7XG4gICAgc2VsZi5fcG9zM2QgPSBvLnBvczNkIHx8IFswLCAwLCAtMC41XTtcbiAgICBzZWxmLl92b2x1bWUgPSBvLnZvbHVtZSAhPT0gdW5kZWZpbmVkID8gby52b2x1bWUgOiAxO1xuICAgIHNlbGYuX3VybHMgPSBvLnVybHMgfHwgW107XG4gICAgc2VsZi5fcmF0ZSA9IG8ucmF0ZSB8fCAxO1xuXG4gICAgLy8gYWxsb3cgZm9yY2luZyBvZiBhIHNwZWNpZmljIHBhbm5pbmdNb2RlbCAoJ2VxdWFscG93ZXInIG9yICdIUlRGJyksXG4gICAgLy8gaWYgbm9uZSBpcyBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvICdlcXVhbHBvd2VyJyBhbmQgc3dpdGNoZXMgdG8gJ0hSVEYnXG4gICAgLy8gaWYgM2Qgc291bmQgaXMgdXNlZFxuICAgIHNlbGYuX21vZGVsID0gby5tb2RlbCB8fCBudWxsO1xuXG4gICAgLy8gc2V0dXAgZXZlbnQgZnVuY3Rpb25zXG4gICAgc2VsZi5fb25sb2FkID0gW28ub25sb2FkIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ubG9hZGVycm9yID0gW28ub25sb2FkZXJyb3IgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25lbmQgPSBbby5vbmVuZCB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBhdXNlID0gW28ub25wYXVzZSB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBsYXkgPSBbby5vbnBsYXkgfHwgZnVuY3Rpb24oKSB7fV07XG5cbiAgICBzZWxmLl9vbmVuZFRpbWVyID0gW107XG5cbiAgICAvLyBXZWIgQXVkaW8gb3IgSFRNTDUgQXVkaW8/XG4gICAgc2VsZi5fd2ViQXVkaW8gPSB1c2luZ1dlYkF1ZGlvICYmICFzZWxmLl9idWZmZXI7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byBIVE1MNSBBdWRpb1xuICAgIHNlbGYuX2F1ZGlvTm9kZSA9IFtdO1xuICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgc2VsZi5fc2V0dXBBdWRpb05vZGUoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbWF0aWNhbGx5IHRyeSB0byBlbmFibGUgYXVkaW8gb24gaU9TXG4gICAgaWYgKHR5cGVvZiBjdHggIT09ICd1bmRlZmluZWQnICYmIGN0eCAmJiBIb3dsZXIuaU9TQXV0b0VuYWJsZSkge1xuICAgICAgSG93bGVyLl9lbmFibGVpT1NBdWRpbygpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGlzIHRvIGFuIGFycmF5IG9mIEhvd2wncyB0byBhbGxvdyBnbG9iYWwgY29udHJvbFxuICAgIEhvd2xlci5faG93bHMucHVzaChzZWxmKTtcblxuICAgIC8vIGxvYWQgdGhlIHRyYWNrXG4gICAgc2VsZi5sb2FkKCk7XG4gIH07XG5cbiAgLy8gc2V0dXAgYWxsIG9mIHRoZSBtZXRob2RzXG4gIEhvd2wucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIExvYWQgYW4gYXVkaW8gZmlsZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB1cmwgPSBudWxsO1xuXG4gICAgICAvLyBpZiBubyBhdWRpbyBpcyBhdmFpbGFibGUsIHF1aXQgaW1tZWRpYXRlbHlcbiAgICAgIGlmIChub0F1ZGlvKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBzb3VyY2UgVVJMcyBhbmQgcGljayB0aGUgZmlyc3Qgb25lIHRoYXQgaXMgY29tcGF0aWJsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX3VybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGV4dCwgdXJsSXRlbTtcblxuICAgICAgICBpZiAoc2VsZi5fZm9ybWF0KSB7XG4gICAgICAgICAgLy8gdXNlIHNwZWNpZmllZCBhdWRpbyBmb3JtYXQgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgZXh0ID0gc2VsZi5fZm9ybWF0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIGZpbGV0eXBlICh3aGV0aGVyIGFuIGV4dGVuc2lvbiBvciBiYXNlNjQgZGF0YSlcbiAgICAgICAgICB1cmxJdGVtID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBleHQgPSAvXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKHVybEl0ZW0pO1xuICAgICAgICAgIGlmICghZXh0KSB7XG4gICAgICAgICAgICBleHQgPSAvXFwuKFteLl0rKSQvLmV4ZWModXJsSXRlbS5zcGxpdCgnPycsIDEpWzBdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXh0KSB7XG4gICAgICAgICAgICBleHQgPSBleHRbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGVjc1tleHRdKSB7XG4gICAgICAgICAgdXJsID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9zcmMgPSB1cmw7XG5cbiAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICBsb2FkQnVmZmVyKHNlbGYsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBBdWRpbygpO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIHdpdGggSFRNTDUgYXVkaW8gKGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvc3BlYy5odG1sI21lZGlhZXJyb3IpXG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG5ld05vZGUuZXJyb3IgJiYgbmV3Tm9kZS5lcnJvci5jb2RlID09PSA0KSB7XG4gICAgICAgICAgICBIb3dsZXJHbG9iYWwubm9BdWRpbyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJywge3R5cGU6IG5ld05vZGUuZXJyb3IgPyBuZXdOb2RlLmVycm9yLmNvZGUgOiAwfSk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBzZWxmLl9hdWRpb05vZGUucHVzaChuZXdOb2RlKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgbmV3IGF1ZGlvIG5vZGVcbiAgICAgICAgbmV3Tm9kZS5zcmMgPSB1cmw7XG4gICAgICAgIG5ld05vZGUuX3BvcyA9IDA7XG4gICAgICAgIG5ld05vZGUucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgbmV3Tm9kZS52b2x1bWUgPSAoSG93bGVyLl9tdXRlZCkgPyAwIDogc2VsZi5fdm9sdW1lICogSG93bGVyLnZvbHVtZSgpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBldmVudCBsaXN0ZW5lciB0byBzdGFydCBwbGF5aW5nIHRoZSBzb3VuZFxuICAgICAgICAvLyBhcyBzb29uIGFzIGl0IGhhcyBidWZmZXJlZCBlbm91Z2hcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gcm91bmQgdXAgdGhlIGR1cmF0aW9uIHdoZW4gdXNpbmcgSFRNTDUgQXVkaW8gdG8gYWNjb3VudCBmb3IgdGhlIGxvd2VyIHByZWNpc2lvblxuICAgICAgICAgIHNlbGYuX2R1cmF0aW9uID0gTWF0aC5jZWlsKG5ld05vZGUuZHVyYXRpb24gKiAxMCkgLyAxMDtcblxuICAgICAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLl9zcHJpdGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5fc3ByaXRlID0ge19kZWZhdWx0OiBbMCwgc2VsZi5fZHVyYXRpb24gKiAxMDAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgICAgIHNlbGYuX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLm9uKCdsb2FkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYuX2F1dG9wbGF5KSB7XG4gICAgICAgICAgICBzZWxmLnBsYXkoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjbGVhciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIG5ld05vZGUubG9hZCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgVVJMcyB0byBiZSBwdWxsZWQgZnJvbSB0byBwbGF5IGluIHRoaXMgc291cmNlLlxuICAgICAqIEBwYXJhbSAge0FycmF5fSB1cmxzICBBcnJ5IG9mIFVSTHMgdG8gbG9hZCBmcm9tXG4gICAgICogQHJldHVybiB7SG93bH0gICAgICAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCBVUkxzXG4gICAgICovXG4gICAgdXJsczogZnVuY3Rpb24odXJscykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodXJscykge1xuICAgICAgICBzZWxmLnN0b3AoKTtcbiAgICAgICAgc2VsZi5fdXJscyA9ICh0eXBlb2YgdXJscyA9PT0gJ3N0cmluZycpID8gW3VybHNdIDogdXJscztcbiAgICAgICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3VybHM7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgYSBzb3VuZCBmcm9tIHRoZSBjdXJyZW50IHRpbWUgKDAgYnkgZGVmYXVsdCkuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIHNwcml0ZSAgIChvcHRpb25hbCkgUGxheXMgZnJvbSB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSBzb3VuZCBzcHJpdGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBSZXR1cm5zIHRoZSB1bmlxdWUgcGxheWJhY2sgaWQgZm9yIHRoaXMgc291bmQgaW5zdGFuY2UuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwbGF5OiBmdW5jdGlvbihzcHJpdGUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIG5vIHNwcml0ZSB3YXMgcGFzc2VkIGJ1dCBhIGNhbGxiYWNrIHdhcywgdXBkYXRlIHRoZSB2YXJpYWJsZXNcbiAgICAgIGlmICh0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gc3ByaXRlO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIGRlZmF1bHQgc3ByaXRlIGlmIG5vbmUgaXMgcGFzc2VkXG4gICAgICBpZiAoIXNwcml0ZSB8fCB0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNwcml0ZSA9ICdfZGVmYXVsdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBsYXkoc3ByaXRlLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgc3ByaXRlIGRvZXNuJ3QgZXhpc3QsIHBsYXkgbm90aGluZ1xuICAgICAgaWYgKCFzZWxmLl9zcHJpdGVbc3ByaXRlXSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBub2RlIHRvIHBsYXliYWNrXG4gICAgICBzZWxmLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAvLyBwZXJzaXN0IHRoZSBzcHJpdGUgYmVpbmcgcGxheWVkXG4gICAgICAgIG5vZGUuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gc3RhcnQgcGxheWluZyBmcm9tXG4gICAgICAgIHZhciBwb3MgPSAobm9kZS5fcG9zID4gMCkgPyBub2RlLl9wb3MgOiBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDA7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyBsb25nIHRvIHBsYXkgZm9yXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IDA7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gbm9kZS5fcG9zO1xuICAgICAgICAgIGlmIChub2RlLl9wb3MgPiAwKSB7XG4gICAgICAgICAgICBwb3MgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDAgKyBwb3M7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gKHBvcyAtIHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBzb3VuZCBzaG91bGQgYmUgbG9vcGVkXG4gICAgICAgIHZhciBsb29wID0gISEoc2VsZi5fbG9vcCB8fCBzZWxmLl9zcHJpdGVbc3ByaXRlXVsyXSk7XG5cbiAgICAgICAgLy8gc2V0IHRpbWVyIHRvIGZpcmUgdGhlICdvbmVuZCcgZXZlbnRcbiAgICAgICAgdmFyIHNvdW5kSWQgPSAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykgPyBjYWxsYmFjayA6IE1hdGgucm91bmQoRGF0ZS5ub3coKSAqIE1hdGgucmFuZG9tKCkpICsgJycsXG4gICAgICAgICAgdGltZXJJZDtcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6IHNvdW5kSWQsXG4gICAgICAgICAgICBzcHJpdGU6IHNwcml0ZSxcbiAgICAgICAgICAgIGxvb3A6IGxvb3BcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgbG9vcGluZywgcmVzdGFydCB0aGUgdHJhY2tcbiAgICAgICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8gJiYgbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCkucGxheShzcHJpdGUsIGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgd2ViIGF1ZGlvIG5vZGUgdG8gcGF1c2VkIGF0IGVuZFxuICAgICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLl9wb3MgPSAwO1xuXG4gICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBlbmQgdGltZXJcbiAgICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZW5kIHRoZSB0cmFjayBpZiBpdCBpcyBIVE1MIGF1ZGlvIGFuZCBhIHNwcml0ZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbyAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpcmUgZW5kZWQgZXZlbnRcbiAgICAgICAgICAgIHNlbGYub24oJ2VuZCcsIHNvdW5kSWQpO1xuICAgICAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG5cbiAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVmZXJlbmNlIHRvIHRoZSB0aW1lclxuICAgICAgICAgIHNlbGYuX29uZW5kVGltZXIucHVzaCh7dGltZXI6IHRpbWVySWQsIGlkOiBkYXRhLmlkfSk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGxvb3BTdGFydCA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCxcbiAgICAgICAgICAgIGxvb3BFbmQgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDA7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHBsYXkgaWQgdG8gdGhpcyBub2RlIGFuZCBsb2FkIGludG8gY29udGV4dFxuICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgIG5vZGUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgcmVmcmVzaEJ1ZmZlcihzZWxmLCBbbG9vcCwgbG9vcFN0YXJ0LCBsb29wRW5kXSwgc291bmRJZCk7XG4gICAgICAgICAgc2VsZi5fcGxheVN0YXJ0ID0gY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgICAgIG5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBsb29wID8gbm9kZS5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCwgcG9zLCA4NjQwMCkgOiBub2RlLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLCBwb3MsIGR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9vcCA/IG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHBvcywgODY0MDApIDogbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQoMCwgcG9zLCBkdXJhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChub2RlLnJlYWR5U3RhdGUgPT09IDQgfHwgIW5vZGUucmVhZHlTdGF0ZSAmJiBuYXZpZ2F0b3IuaXNDb2Nvb25KUykge1xuICAgICAgICAgICAgbm9kZS5yZWFkeVN0YXRlID0gNDtcbiAgICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgICAgbm9kZS5jdXJyZW50VGltZSA9IHBvcztcbiAgICAgICAgICAgIG5vZGUubXV0ZWQgPSBIb3dsZXIuX211dGVkIHx8IG5vZGUubXV0ZWQ7XG4gICAgICAgICAgICBub2RlLnZvbHVtZSA9IHNlbGYuX3ZvbHVtZSAqIEhvd2xlci52b2x1bWUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IG5vZGUucGxheSgpOyB9LCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihzb3VuZElkKTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHZhciBzb3VuZCA9IHNlbGYsXG4gICAgICAgICAgICAgICAgcGxheVNwcml0ZSA9IHNwcml0ZSxcbiAgICAgICAgICAgICAgICBmbiA9IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG5ld05vZGUgPSBub2RlO1xuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzb3VuZC5wbGF5KHBsYXlTcHJpdGUsIGZuKTtcblxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcmUgdGhlIHBsYXkgZXZlbnQgYW5kIHNlbmQgdGhlIHNvdW5kSWQgYmFjayBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5vbigncGxheScpO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhzb3VuZElkKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGF1c2UgcGxheWJhY2sgYW5kIHNhdmUgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwYXVzZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgJ29uZW5kJyB0aW1lclxuICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihpZCk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHNlbGYucG9zKG51bGwsIGlkKTtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYub24oJ3BhdXNlJyk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHBsYXliYWNrIGFuZCByZXNldCB0byBzdGFydC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuc3RvcChpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciAnb25lbmQnIHRpbWVyXG4gICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGlkKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gMDtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oYWN0aXZlTm9kZS5kdXJhdGlvbikpIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlKCk7XG4gICAgICAgICAgYWN0aXZlTm9kZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubXV0ZSB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudW5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLm11dGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdm9sdW1lIG9mIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB2b2wgVm9sdW1lIGZyb20gMC4wIHRvIDEuMC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvRmxvYXR9ICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCB2b2x1bWUuXG4gICAgICovXG4gICAgdm9sdW1lOiBmdW5jdGlvbih2b2wsIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB2b2x1bWUgaXMgYSBudW1iZXJcbiAgICAgIHZvbCA9IHBhcnNlRmxvYXQodm9sKTtcblxuICAgICAgaWYgKHZvbCA+PSAwICYmIHZvbCA8PSAxKSB7XG4gICAgICAgIHNlbGYuX3ZvbHVtZSA9IHZvbDtcblxuICAgICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi52b2x1bWUodm9sLCBpZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHZvbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS52b2x1bWUgPSB2b2wgKiBIb3dsZXIudm9sdW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fdm9sdW1lO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHdoZXRoZXIgdG8gbG9vcCB0aGUgc291bmQuXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbG9vcCBUbyBsb29wIG9yIG5vdCB0byBsb29wLCB0aGF0IGlzIHRoZSBxdWVzdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Jvb2xlYW59ICAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgbG9vcGluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBsb29wOiBmdW5jdGlvbihsb29wKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgbG9vcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHNlbGYuX2xvb3AgPSBsb29wO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX2xvb3A7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgc291bmQgc3ByaXRlIGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBzcHJpdGUgRXhhbXBsZToge3Nwcml0ZU5hbWU6IFtvZmZzZXQsIGR1cmF0aW9uLCBsb29wXX1cbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0ludGVnZXJ9IG9mZnNldCAgIFdoZXJlIHRvIGJlZ2luIHBsYXliYWNrIGluIG1pbGxpc2Vjb25kc1xuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7SW50ZWdlcn0gZHVyYXRpb24gSG93IGxvbmcgdG8gcGxheSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgICAgIChvcHRpb25hbCkgU2V0IHRydWUgdG8gbG9vcCB0aGlzIHNwcml0ZVxuICAgICAqIEByZXR1cm4ge0hvd2x9ICAgICAgICBSZXR1cm5zIGN1cnJlbnQgc3ByaXRlIHNoZWV0IG9yIHNlbGYuXG4gICAgICovXG4gICAgc3ByaXRlOiBmdW5jdGlvbihzcHJpdGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBzcHJpdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNlbGYuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9zcHJpdGU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIHBvc2l0aW9uIG9mIHBsYXliYWNrLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgcG9zIFRoZSBwb3NpdGlvbiB0byBtb3ZlIGN1cnJlbnQgcGxheWJhY2sgdG8uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Zsb2F0fSAgICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHBvczogZnVuY3Rpb24ocG9zLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wb3MocG9zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwb3MgPT09ICdudW1iZXInID8gc2VsZiA6IHNlbGYuX3BvcyB8fCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIGRlYWxpbmcgd2l0aCBhIG51bWJlciBmb3IgcG9zXG4gICAgICBwb3MgPSBwYXJzZUZsb2F0KHBvcyk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHBvcztcbiAgICAgICAgICBzZWxmLnBsYXkoYWN0aXZlTm9kZS5fc3ByaXRlLCBpZCk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5fd2ViQXVkaW8gPyBhY3RpdmVOb2RlLl9wb3MgKyAoY3R4LmN1cnJlbnRUaW1lIC0gc2VsZi5fcGxheVN0YXJ0KSA6IGFjdGl2ZU5vZGUuY3VycmVudFRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocG9zID49IDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbmFjdGl2ZSBub2RlIHRvIHJldHVybiB0aGUgcG9zIGZvclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQgJiYgc2VsZi5fYXVkaW9Ob2RlW2ldLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi5fd2ViQXVkaW8pID8gc2VsZi5fYXVkaW9Ob2RlW2ldLl9wb3MgOiBzZWxmLl9hdWRpb05vZGVbaV0uY3VycmVudFRpbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIDNEIHBvc2l0aW9uIG9mIHRoZSBhdWRpbyBzb3VyY2UuXG4gICAgICogVGhlIG1vc3QgY29tbW9uIHVzYWdlIGlzIHRvIHNldCB0aGUgJ3gnIHBvc2l0aW9uXG4gICAgICogdG8gYWZmZWN0IHRoZSBsZWZ0L3JpZ2h0IGVhciBwYW5uaW5nLiBTZXR0aW5nIGFueSB2YWx1ZSBoaWdoZXIgdGhhblxuICAgICAqIDEuMCB3aWxsIGJlZ2luIHRvIGRlY3JlYXNlIHRoZSB2b2x1bWUgb2YgdGhlIHNvdW5kIGFzIGl0IG1vdmVzIGZ1cnRoZXIgYXdheS5cbiAgICAgKiBOT1RFOiBUaGlzIG9ubHkgd29ya3Mgd2l0aCBXZWIgQXVkaW8gQVBJLCBIVE1MNSBBdWRpbyBwbGF5YmFja1xuICAgICAqIHdpbGwgbm90IGJlIGFmZmVjdGVkLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeCAgVGhlIHgtcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHkgIFRoZSB5LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB6ICBUaGUgei1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0FycmF5fSAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCAzRCBwb3NpdGlvbjogW3gsIHksIHpdXG4gICAgICovXG4gICAgcG9zM2Q6IGZ1bmN0aW9uKHgsIHksIHosIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHNldCBhIGRlZmF1bHQgZm9yIHRoZSBvcHRpb25hbCAneScgJiAneidcbiAgICAgIHkgPSAodHlwZW9mIHkgPT09ICd1bmRlZmluZWQnIHx8ICF5KSA/IDAgOiB5O1xuICAgICAgeiA9ICh0eXBlb2YgeiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXopID8gLTAuNSA6IHo7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBvczNkKHgsIHksIHosIGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIGlmICh4ID49IDAgfHwgeCA8IDApIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgICAgICBzZWxmLl9wb3MzZCA9IFt4LCB5LCB6XTtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUucGFubmVyLnNldFBvc2l0aW9uKHgsIHksIHopO1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5wYW5uZXIucGFubmluZ01vZGVsID0gc2VsZi5fbW9kZWwgfHwgJ0hSVEYnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3BvczNkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRmFkZSBhIGN1cnJlbnRseSBwbGF5aW5nIHNvdW5kIGJldHdlZW4gdHdvIHZvbHVtZXMuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGZyb20gICAgIFRoZSB2b2x1bWUgdG8gZmFkZSBmcm9tICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgdG8gICAgICAgVGhlIHZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBGaXJlZCB3aGVuIHRoZSBmYWRlIGlzIGNvbXBsZXRlLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZTogZnVuY3Rpb24oZnJvbSwgdG8sIGxlbiwgY2FsbGJhY2ssIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGRpZmYgPSBNYXRoLmFicyhmcm9tIC0gdG8pLFxuICAgICAgICBkaXIgPSBmcm9tID4gdG8gPyAnZG93bicgOiAndXAnLFxuICAgICAgICBzdGVwcyA9IGRpZmYgLyAwLjAxLFxuICAgICAgICBzdGVwVGltZSA9IGxlbiAvIHN0ZXBzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5mYWRlKGZyb20sIHRvLCBsZW4sIGNhbGxiYWNrLCBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIHZvbHVtZSB0byB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgIHNlbGYudm9sdW1lKGZyb20sIGlkKTtcblxuICAgICAgZm9yICh2YXIgaT0xOyBpPD1zdGVwczsgaSsrKSB7XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2hhbmdlID0gc2VsZi5fdm9sdW1lICsgKGRpciA9PT0gJ3VwJyA/IDAuMDEgOiAtMC4wMSkgKiBpLFxuICAgICAgICAgICAgdm9sID0gTWF0aC5yb3VuZCgxMDAwICogY2hhbmdlKSAvIDEwMDAsXG4gICAgICAgICAgICB0b1ZvbCA9IHRvO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudm9sdW1lKHZvbCwgaWQpO1xuXG4gICAgICAgICAgICBpZiAodm9sID09PSB0b1ZvbCkge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgc3RlcFRpbWUgKiBpKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogW0RFUFJFQ0FURURdIEZhZGUgaW4gdGhlIGN1cnJlbnQgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgVm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlSW46IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy52b2x1bWUoMCkucGxheSgpLmZhZGUoMCwgdG8sIGxlbiwgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBbREVQUkVDQVRFRF0gRmFkZSBvdXQgdGhlIGN1cnJlbnQgc291bmQgYW5kIHBhdXNlIHdoZW4gZmluaXNoZWQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgIFZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gc2VsZi5mYWRlKHNlbGYuX3ZvbHVtZSwgdG8sIGxlbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgc2VsZi5wYXVzZShpZCk7XG5cbiAgICAgICAgLy8gZmlyZSBlbmRlZCBldmVudFxuICAgICAgICBzZWxmLm9uKCdlbmQnKTtcbiAgICAgIH0sIGlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGF1ZGlvIG5vZGUgYnkgSUQuXG4gICAgICogQHJldHVybiB7SG93bH0gQXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfbm9kZUJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbMF07XG5cbiAgICAgIC8vIGZpbmQgdGhlIG5vZGUgd2l0aCB0aGlzIElEXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBhY3RpdmUgYXVkaW8gbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSBBdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9hY3RpdmVOb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IHBsYXlpbmcgbm9kZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIHNlbGYuX2RyYWluUG9vbCgpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBpbmFjdGl2ZSBhdWRpbyBub2RlLlxuICAgICAqIElmIHRoZXJlIGlzIG5vbmUsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcG9vbC5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBhdWRpbyBub2RlIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIF9pbmFjdGl2ZU5vZGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBudWxsO1xuXG4gICAgICAvLyBmaW5kIGZpcnN0IGluYWN0aXZlIG5vZGUgdG8gcmVjeWNsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCAmJiBzZWxmLl9hdWRpb05vZGVbaV0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIC8vIHNlbmQgdGhlIG5vZGUgYmFjayBmb3IgdXNlIGJ5IHRoZSBuZXcgcGxheSBpbnN0YW5jZVxuICAgICAgICAgIGNhbGxiYWNrKHNlbGYuX2F1ZGlvTm9kZVtpXSk7XG4gICAgICAgICAgbm9kZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgc2VsZi5fZHJhaW5Qb29sKCk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIG5ldyBub2RlIGlmIHRoZXJlIGFyZSBubyBpbmFjdGl2ZXNcbiAgICAgIHZhciBuZXdOb2RlO1xuICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgIG5ld05vZGUgPSBzZWxmLl9zZXR1cEF1ZGlvTm9kZSgpO1xuICAgICAgICBjYWxsYmFjayhuZXdOb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuICAgICAgICBuZXdOb2RlID0gc2VsZi5fYXVkaW9Ob2RlW3NlbGYuX2F1ZGlvTm9kZS5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIHRoZSBjb3JyZWN0IGxvYWQgZXZlbnQgYW5kIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgIHZhciBsaXN0ZW5lckV2ZW50ID0gbmF2aWdhdG9yLmlzQ29jb29uSlMgPyAnY2FucGxheXRocm91Z2gnIDogJ2xvYWRlZG1ldGFkYXRhJztcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyRXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgY2FsbGJhY2sobmV3Tm9kZSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lckV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSBhcmUgbW9yZSB0aGFuIDUgaW5hY3RpdmUgYXVkaW8gbm9kZXMgaW4gdGhlIHBvb2wsIGNsZWFyIG91dCB0aGUgcmVzdC5cbiAgICAgKi9cbiAgICBfZHJhaW5Qb29sOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5hY3RpdmUgPSAwLFxuICAgICAgICBpO1xuXG4gICAgICAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIGluYWN0aXZlIG5vZGVzXG4gICAgICBmb3IgKGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBpbmFjdGl2ZSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIGZvciAoaT1zZWxmLl9hdWRpb05vZGUubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICBpZiAoaW5hY3RpdmUgPD0gNSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBhdWRpbyBzb3VyY2UgaWYgdXNpbmcgV2ViIEF1ZGlvXG4gICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBzZWxmLl9hdWRpb05vZGVbaV0uZGlzY29ubmVjdCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbmFjdGl2ZS0tO1xuICAgICAgICAgIHNlbGYuX2F1ZGlvTm9kZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgJ29uZW5kJyB0aW1lb3V0IGJlZm9yZSBpdCBlbmRzLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gc291bmRJZCAgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICovXG4gICAgX2NsZWFyRW5kVGltZXI6IGZ1bmN0aW9uKHNvdW5kSWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHRpbWVycyB0byBmaW5kIHRoZSBvbmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc291bmRcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9vbmVuZFRpbWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9vbmVuZFRpbWVyW2ldLmlkID09PSBzb3VuZElkKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lciA9IHNlbGYuX29uZW5kVGltZXJbaW5kZXhdO1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lci50aW1lcik7XG4gICAgICAgIHNlbGYuX29uZW5kVGltZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGdhaW4gbm9kZSBhbmQgcGFubmVyIGZvciBhIFdlYiBBdWRpbyBpbnN0YW5jZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgYXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfc2V0dXBBdWRpb05vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlLFxuICAgICAgICBpbmRleCA9IHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7XG5cbiAgICAgIC8vIGNyZWF0ZSBnYWluIG5vZGVcbiAgICAgIG5vZGVbaW5kZXhdID0gKHR5cGVvZiBjdHguY3JlYXRlR2FpbiA9PT0gJ3VuZGVmaW5lZCcpID8gY3R4LmNyZWF0ZUdhaW5Ob2RlKCkgOiBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgbm9kZVtpbmRleF0uZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhdXNlZCA9IHRydWU7XG4gICAgICBub2RlW2luZGV4XS5fcG9zID0gMDtcbiAgICAgIG5vZGVbaW5kZXhdLnJlYWR5U3RhdGUgPSA0O1xuICAgICAgbm9kZVtpbmRleF0uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYW5uZXJcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lciA9IGN0eC5jcmVhdGVQYW5uZXIoKTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5wYW5uaW5nTW9kZWwgPSBzZWxmLl9tb2RlbCB8fCAnZXF1YWxwb3dlcic7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuc2V0UG9zaXRpb24oc2VsZi5fcG9zM2RbMF0sIHNlbGYuX3BvczNkWzFdLCBzZWxmLl9wb3MzZFsyXSk7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuY29ubmVjdChub2RlW2luZGV4XSk7XG5cbiAgICAgIHJldHVybiBub2RlW2luZGV4XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbC9zZXQgY3VzdG9tIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgZXZlbnQgRXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZXZlbnRzID0gc2VsZlsnX29uJyArIGV2ZW50XTtcblxuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBldmVudHMucHVzaChmbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBldmVudHNbaV0uY2FsbChzZWxmLCBmbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50c1tpXS5jYWxsKHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgY3VzdG9tIGV2ZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBMaXN0ZW5lciB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBldmVudHMgPSBzZWxmWydfb24nICsgZXZlbnRdLFxuICAgICAgICBmblN0cmluZyA9IGZuID8gZm4udG9TdHJpbmcoKSA6IG51bGw7XG5cbiAgICAgIGlmIChmblN0cmluZykge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggZnVuY3Rpb25zIGluIHRoZSBldmVudCBmb3IgY29tcGFyaXNvblxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuU3RyaW5nID09PSBldmVudHNbaV0udG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZlsnX29uJyArIGV2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGFuZCBkZXN0cm95IHRoZSBjdXJyZW50IEhvd2wgb2JqZWN0LlxuICAgICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSBzdG9wIGFsbCBwbGF5IGluc3RhbmNlcyBhdHRhY2hlZCB0byB0aGlzIHNvdW5kLlxuICAgICAqL1xuICAgIHVubG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHN0b3AgcGxheWluZyBhbnkgYWN0aXZlIG5vZGVzXG4gICAgICB2YXIgbm9kZXMgPSBzZWxmLl9hdWRpb05vZGU7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIHN0b3AgdGhlIHNvdW5kIGlmIGl0IGlzIGN1cnJlbnRseSBwbGF5aW5nXG4gICAgICAgIGlmICghbm9kZXNbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgc2VsZi5zdG9wKG5vZGVzW2ldLmlkKTtcbiAgICAgICAgICBzZWxmLm9uKCdlbmQnLCBub2Rlc1tpXS5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzb3VyY2UgaWYgdXNpbmcgSFRNTDUgQXVkaW9cbiAgICAgICAgICBub2Rlc1tpXS5zcmMgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBvdXRwdXQgZnJvbSB0aGUgbWFzdGVyIGdhaW5cbiAgICAgICAgICBub2Rlc1tpXS5kaXNjb25uZWN0KDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgdGltZW91dHMgYXJlIGNsZWFyZWRcbiAgICAgIGZvciAoaT0wOyBpPHNlbGYuX29uZW5kVGltZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX29uZW5kVGltZXJbaV0udGltZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgdGhlIHJlZmVyZW5jZSBpbiB0aGUgZ2xvYmFsIEhvd2xlciBvYmplY3RcbiAgICAgIHZhciBpbmRleCA9IEhvd2xlci5faG93bHMuaW5kZXhPZihzZWxmKTtcbiAgICAgIGlmIChpbmRleCAhPT0gbnVsbCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgIEhvd2xlci5faG93bHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVsZXRlIHRoaXMgc291bmQgZnJvbSB0aGUgY2FjaGVcbiAgICAgIGRlbGV0ZSBjYWNoZVtzZWxmLl9zcmNdO1xuICAgICAgc2VsZiA9IG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gb25seSBkZWZpbmUgdGhlc2UgZnVuY3Rpb25zIHdoZW4gdXNpbmcgV2ViQXVkaW9cbiAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcblxuICAgIC8qKlxuICAgICAqIEJ1ZmZlciBhIHNvdW5kIGZyb20gVVJMIChvciBmcm9tIGNhY2hlKSBhbmQgZGVjb2RlIHRvIGF1ZGlvIHNvdXJjZSAoV2ViIEF1ZGlvIEFQSSkuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgdXJsKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgYnVmZmVyIGhhcyBhbHJlYWR5IGJlZW4gY2FjaGVkXG4gICAgICBpZiAodXJsIGluIGNhY2hlKSB7XG4gICAgICAgIC8vIHNldCB0aGUgZHVyYXRpb24gZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgb2JqLl9kdXJhdGlvbiA9IGNhY2hlW3VybF0uZHVyYXRpb247XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgc291bmQgaW50byB0aGlzIG9iamVjdFxuICAgICAgICBsb2FkU291bmQob2JqKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3QodXJsKSkge1xuICAgICAgICAvLyBEZWNvZGUgYmFzZTY0IGRhdGEtVVJJcyBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgY2Fubm90IGxvYWQgZGF0YS1VUklzIHdpdGggWE1MSHR0cFJlcXVlc3QuXG4gICAgICAgIHZhciBkYXRhID0gYXRvYih1cmwuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIHZhciBkYXRhVmlldyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBkYXRhVmlld1tpXSA9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVjb2RlQXVkaW9EYXRhKGRhdGFWaWV3LmJ1ZmZlciwgb2JqLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbG9hZCB0aGUgYnVmZmVyIGZyb20gdGhlIFVSTFxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlY29kZUF1ZGlvRGF0YSh4aHIucmVzcG9uc2UsIG9iaiwgdXJsKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciwgc3dpdGNoIHRoZSBzb3VuZCB0byBIVE1MIEF1ZGlvXG4gICAgICAgICAgaWYgKG9iai5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIG9iai5fYnVmZmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5fd2ViQXVkaW8gPSBmYWxzZTtcbiAgICAgICAgICAgIG9iai5fYXVkaW9Ob2RlID0gW107XG4gICAgICAgICAgICBkZWxldGUgb2JqLl9nYWluTm9kZTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVt1cmxdO1xuICAgICAgICAgICAgb2JqLmxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHhoci5vbmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIGF1ZGlvIGRhdGEgZnJvbSBhbiBhcnJheSBidWZmZXIuXG4gICAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IGFycmF5YnVmZmVyIFRoZSBhdWRpbyBkYXRhLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGUuXG4gICAgICovXG4gICAgdmFyIGRlY29kZUF1ZGlvRGF0YSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBvYmosIHVybCkge1xuICAgICAgLy8gZGVjb2RlIHRoZSBidWZmZXIgaW50byBhbiBhdWRpbyBzb3VyY2VcbiAgICAgIGN0eC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgIGFycmF5YnVmZmVyLFxuICAgICAgICBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICBjYWNoZVt1cmxdID0gYnVmZmVyO1xuICAgICAgICAgICAgbG9hZFNvdW5kKG9iaiwgYnVmZmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIG9iai5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmlzaGVzIGxvYWRpbmcgdGhlIFdlYiBBdWRpbyBBUEkgc291bmQgYW5kIGZpcmVzIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvYmogICAgVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtPYmplY2N0fSBidWZmZXIgVGhlIGRlY29kZWQgYnVmZmVyIHNvdW5kIHNvdXJjZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZFNvdW5kID0gZnVuY3Rpb24ob2JqLCBidWZmZXIpIHtcbiAgICAgIC8vIHNldCB0aGUgZHVyYXRpb25cbiAgICAgIG9iai5fZHVyYXRpb24gPSAoYnVmZmVyKSA/IGJ1ZmZlci5kdXJhdGlvbiA6IG9iai5fZHVyYXRpb247XG5cbiAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iai5fc3ByaXRlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb2JqLl9zcHJpdGUgPSB7X2RlZmF1bHQ6IFswLCBvYmouX2R1cmF0aW9uICogMTAwMF19O1xuICAgICAgfVxuXG4gICAgICAvLyBmaXJlIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgIGlmICghb2JqLl9sb2FkZWQpIHtcbiAgICAgICAgb2JqLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICBvYmoub24oJ2xvYWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5fYXV0b3BsYXkpIHtcbiAgICAgICAgb2JqLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgc291bmQgYmFjayBpbnRvIHRoZSBidWZmZXIgc291cmNlLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgVGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICBsb29wICBMb29wIGJvb2xlYW4sIHBvcywgYW5kIGR1cmF0aW9uLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKi9cbiAgICB2YXIgcmVmcmVzaEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgbG9vcCwgaWQpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlIHRvIGNvbm5lY3QgdG9cbiAgICAgIHZhciBub2RlID0gb2JqLl9ub2RlQnlJZChpZCk7XG5cbiAgICAgIC8vIHNldHVwIHRoZSBidWZmZXIgc291cmNlIGZvciBwbGF5YmFja1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5idWZmZXIgPSBjYWNoZVtvYmouX3NyY107XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5jb25uZWN0KG5vZGUucGFubmVyKTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3AgPSBsb29wWzBdO1xuICAgICAgaWYgKGxvb3BbMF0pIHtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0ID0gbG9vcFsxXTtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcEVuZCA9IGxvb3BbMV0gKyBsb29wWzJdO1xuICAgICAgfVxuICAgICAgbm9kZS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlID0gb2JqLl9yYXRlO1xuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc3VwcG9ydCBmb3IgQU1EIChBc3luY2hyb25vdXMgTW9kdWxlIERlZmluaXRpb24pIGxpYnJhcmllcyBzdWNoIGFzIHJlcXVpcmUuanMuXG4gICAqL1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSG93bGVyOiBIb3dsZXIsXG4gICAgICAgIEhvd2w6IEhvd2xcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHN1cHBvcnQgZm9yIENvbW1vbkpTIGxpYnJhcmllcyBzdWNoIGFzIGJyb3dzZXJpZnkuXG4gICAqL1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5Ib3dsZXIgPSBIb3dsZXI7XG4gICAgZXhwb3J0cy5Ib3dsID0gSG93bDtcbiAgfVxuXG4gIC8vIGRlZmluZSBnbG9iYWxseSBpbiBjYXNlIEFNRCBpcyBub3QgYXZhaWxhYmxlIG9yIGF2YWlsYWJsZSBidXQgbm90IHVzZWRcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuSG93bGVyID0gSG93bGVyO1xuICAgIHdpbmRvdy5Ib3dsID0gSG93bDtcbiAgfVxuXG59KSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hvd2xlci9ob3dsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaGNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=