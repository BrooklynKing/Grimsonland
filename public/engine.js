var engine =
webpackJsonp_name_([2,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(7);

	var _resources2 = _interopRequireDefault(_resources);

	var _mouse = __webpack_require__(8);

	var _mouse2 = _interopRequireDefault(_mouse);

	var _input = __webpack_require__(9);

	var _input2 = _interopRequireDefault(_input);

	var _objects = __webpack_require__(10);

	var _objects2 = _interopRequireDefault(_objects);

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

	    var game = new _objects2.default(config);

	    /*anvas.addEventListener('click', function(e) {
	        game.triggerGlobalEvent('eclick', e, mouse.getMousePosition(e));
	    });
	    canvas.addEventListener('mousemove', function(e) {
	        game.parameters.mouseposition = mouse.getMousePosition(e);
	    });*/

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
/* 3 */
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

	exports.default = {
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var resourceCache = {};
	var readyCallback;

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
/* 8 */
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

	    canvas.addEventListener('mouseup', function (e) {
	        _isMouseDown = false;
	    });

	    canvas.addEventListener('mousedown', function (e) {
	        _isMouseDown = true;
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
/* 9 */
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
	    reset: reset,
	    isDown: isDown
	};

	exports.default = input;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(7);

	var _resources2 = _interopRequireDefault(_resources);

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	var _renderers = __webpack_require__(11);

	var _renderers2 = _interopRequireDefault(_renderers);

	var _sprite = __webpack_require__(12);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function GameObject(config) {
	    this.pos = _utils2.default.clone(config.pos);
	    this.id = config.id || 'object' + Date.now().toString();

	    if (config.sprite) {
	        this.sprite = new _sprite2.default(config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
	    }

	    this.type = config.type;

	    if (config.size || this.sprite) {
	        this.size = config.size || this.sprite.size;
	    }

	    this.callbacks = config.callbacks || {};
	    this.zIndex = config.zIndex || 0;
	    this.parameters = config.parameters && _utils2.default.clone(config.parameters) || {};
	    this._parameters = config.parameters;
	    this.rules = config.rules || [];
	    this._update = config.update;
	    if (config.render) {
	        if (_renderers2.default[config.render]) {
	            this.customRender = _renderers2.default[config.render];
	        }
	    }
	    this._init = config.init;

	    this.inited = false;
	}
	GameObject.prototype.render = function (dt) {
	    var ctx = this.layer.ctx;
	    ctx.save();
	    ctx.translate(this.pos[0], this.pos[1]);

	    if (this.customRender) {
	        this.customRender(this);
	    } else {
	        dt && this.sprite.update(dt);
	        this.sprite.render(ctx);
	    }

	    ctx.restore();
	};
	GameObject.prototype.init = function () {
	    if (!this.inited) {
	        this._init && this._init();

	        var rules = this.rules;
	        this.rules = [];

	        for (var i = 0, l = rules.length; i < l; i++) {
	            this.addRule(this.layer.game.rulesDefinition[rules[i]]);
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
	    if (this._removeInNextTick) {
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
	        var flag = false,
	            hitbox = object.hitbox || object.sprite;

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
	GameObject.prototype.addRules = function (configs) {
	    if (Array.isArray(configs)) {
	        for (var i = 0, j = configs.length; i < j; i++) {
	            this.addRule(configs[i]);
	        }
	    } else {
	        console.error('addRules expect array in parameters');
	    }
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
	    this.id = config.id;
	    this.ctx = config.ctx;
	    this.game = config.game;
	    this.background = this.ctx.createPattern(_resources2.default.get(config.background), 'repeat');
	    this.pos = config.pos || [0, 0];
	    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
	    this.sortedObjects = {
	        'default': []
	    };
	    //ctx = config.ctx,
	    this.objects = {};
	    this._rules = config.rules || [];
	    this.map = [];
	    this._init = config.init;
	    this.inited = false;
	}
	GameLayer.prototype.init = function () {
	    if (!this.inited) {
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
	        var object = this.objects[i];

	        object.update(dt);
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
	GameLayer.prototype.addRules = function (rule) {
	    if (Array.isArray(rule)) {
	        for (var i = 0, j = rule.length; i < j; i++) {
	            this.addRule(rule[i]);
	        }
	    } else {
	        console.error('addRules expect array in parameters');
	    }
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
	    if (this.objects.hasOwnProperty(config.id)) {
	        console.error('Object with such id already exist in this layer: ', config.id);
	        return false;
	    }
	    config.id = config.id + Math.round(Date.now() + Math.random() * 1000001);

	    var _obj = new GameObject(config);
	    _obj.setLayer(this);
	    _obj.init();
	    if (config.type && config.type != 'default') {
	        !this.sortedObjects[config.type] && (this.sortedObjects[config.type] = []);
	        this.sortedObjects[config.type].push(config.id);
	    } else {
	        this.sortedObjects['default'].push(config.id);
	    }
	    this.objects[config.id] = _obj;

	    return this.objects[config.id];
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
	    var obj = _utils2.default.clone(this.objectsDefinition[id]);

	    return obj;
	};
	GameWindow.prototype.getLayerConfig = function (id) {
	    var layer = this.layersDefinition[id];

	    return layer;
	};

	exports.default = GameWindow;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	    text: textRender
	};

	exports.default = renders;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resources = __webpack_require__(7);

	var _resources2 = _interopRequireDefault(_resources);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Sprite(url, pos, size, speed, frames, dir, once, degree) {
	    this.pos = pos;
	    this.defaultPosition = [pos[0], pos[1]];
	    this.size = size;
	    this.speed = typeof speed === 'number' ? speed : 0;
	    this.frames = frames;
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
	        spritePosition = null;

	    if (direction.dir == 1) {
	        direction.k >= 1 && (spritePosition = [pos[0], pos[1]]);
	        direction.k < 1 && direction.k >= -1 && (spritePosition = [pos[0], pos[1] + 2 * this.size[1]]);
	        direction.k < -1 && (spritePosition = [pos[0], pos[1] + 3 * this.size[1]]);
	    } else if (direction.dir == -1) {
	        direction.k >= 1 && (spritePosition = [pos[0], pos[1] + 3 * this.size[1]]);
	        direction.k < 1 && direction.k >= -1 && (spritePosition = [pos[0], pos[1] + this.size[1]]);
	        direction.k < -1 && (spritePosition = [pos[0], pos[1]]);
	    }

	    this.updateConfig({
	        'pos': spritePosition
	    });
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
	    ctx.drawImage(_resources2.default.get(this.url), x, y, this.size[0], this.size[1], -this.size[0] / 2, -this.size[1] / 2, this.size[0], this.size[1]);
	};
	Sprite.prototype.setdegree = function (degree) {
	    this.degree = degree;
	};

	exports.default = Sprite;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvbW91c2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZW5kZXJlcnMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9zcHJpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCBtb3VzZU1vZHVsZSBmcm9tICcuL21vdXNlJztcclxuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xyXG5pbXBvcnQgR2FtZVdpbmRvdyBmcm9tICcuL29iamVjdHMnO1xyXG5cclxuLy8gQSBjcm9zcy1icm93c2VyIHJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4vLyBTZWUgaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8yMDExLzA4L2FuaW1hdGluZy13aXRoLWphdmFzY3JpcHQtZnJvbS1zZXRpbnRlcnZhbC10by1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXHJcbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XHJcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcclxuICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgIH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBsb2FkUmVzb3VyY2VzKGxpc3QsIGNhbGxiYWNrKSB7XHJcbiAgICByZXNvdXJjZXMubG9hZChsaXN0KTtcclxuXHJcbiAgICAvL1RoaXMgb25lIGlzIG1vY2sgZm9yIEFKQVgsIGlmIHdlIHdpbGwgaGF2ZSByZWFsIEFKQVgsIHdlIGp1c3QgbmVlZCB0byBwdXQgdGhpcyBvbmUgaW50byBjYWxsYmFjayB3aXRob3V0IHRpbWVvdXRcclxuICAgIHJlc291cmNlcy5vblJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHYW1lKGNvbmZpZykge1xyXG4gICAgdmFyIGNhbnZhcyA9IGNvbmZpZy5jYW52YXMsXHJcbiAgICAgICAgbGFzdFRpbWUgPSAwO1xyXG5cclxuICAgIHZhciBtb3VzZSA9IG1vdXNlTW9kdWxlKGNhbnZhcyk7XHJcblxyXG4gICAgY29uZmlnLmlucHV0ID0gaW5wdXQ7XHJcbiAgICBjb25maWcubW91c2UgPSBtb3VzZTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lV2luZG93KGNvbmZpZyk7XHJcblxyXG4gICAgLyphbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBnYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgnZWNsaWNrJywgZSwgbW91c2UuZ2V0TW91c2VQb3NpdGlvbihlKSk7XHJcbiAgICB9KTtcclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24gPSBtb3VzZS5nZXRNb3VzZVBvc2l0aW9uKGUpO1xyXG4gICAgfSk7Ki9cclxuXHJcbiAgICBmdW5jdGlvbiBnYW1lVGltZXIoKSB7XHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGR0ID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDAuMDtcclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIGdhbWUucmVuZGVyKGR0KTtcclxuXHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xyXG4gICAgICAgIGxvYWRSZXNvdXJjZXMoY29uZmlnLnJlc291cmNlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmluaXQoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlbDogZ2FtZSxcclxuICAgICAgICBpbml0OiBpbml0R2FtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2luZGV4LmpzXG4gKiovIiwiZnVuY3Rpb24gY29sbGlkZXMoeCwgeSwgciwgYiwgeDIsIHkyLCByMiwgYjIpIHtcclxuICAgIHJldHVybiAhKHIgPj0geDIgfHwgeCA8IHIyIHx8XHJcbiAgICBiID49IHkyIHx8IHkgPCBiMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zWzBdIC0gc2l6ZVswXSAvIDIsIHBvc1sxXSAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gKyBzaXplMlswXSAvIDIsIHBvczJbMV0gKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAoZGVncmVlID0gLWRlZ3JlZSk7XHJcbiAgICBpZiAoZGVncmVlID09IHByZXZEZWdyZWUpIHtcclxuICAgICAgICByZXR1cm4gW2RlZ3JlZSwgMF07XHJcbiAgICB9IGVsc2UgaWYgKCgoZGVncmVlIDwgMCAmJiBwcmV2RGVncmVlID4gMCkgfHwgKGRlZ3JlZSA+IDAgJiYgcHJldkRlZ3JlZSA8IDApKSAmJiAoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBNYXRoLlBJKSkge1xyXG4gICAgICAgIHZhciBkZWdyZWVXaXRoU3BlZWQgPSAoKHByZXZEZWdyZWUgPiAwKSA/IHByZXZEZWdyZWUgKyBzcGVlZCA6IHByZXZEZWdyZWUgLSBzcGVlZCk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZWdyZWVXaXRoU3BlZWQgPCAtTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSBNYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCArIE1hdGguUEkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBvaW50MSwgcG9pbnQyLCBkZWdyZWUpIHtcclxuICAgIHZhciBuZXdEZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2V0RGVzdGluYXRpb24ocG9pbnQxLCBkaXJlY3Rpb24sIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbi8vXHRcdFx0cyA9IHNwZWVkICogZHQsXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbi8vXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKSB7XHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyXHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXgpIHtcclxuICAgICAgICAgICAgeSA9IChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geSAtIDEgOiB5ICsgMTtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheFxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5LS0gOiB5Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyXHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbi8vfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2Yob2JqKSAhPSAnb2JqZWN0JylcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG5cclxuICAgIHZhciB0ZW1wID0gb2JqLmNvbnN0cnVjdG9yKCk7IC8vIGNoYW5nZWRcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG4gICAgICAgIHRlbXBba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICAnZ2V0TW92ZWRQb2ludEJ5RGVncmVlJzogZ2V0TW92ZWRQb2ludEJ5RGVncmVlLFxyXG4gICAgJ2Nsb25lJzogY2xvbmVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iLCJ2YXIgcmVzb3VyY2VDYWNoZSA9IHt9O1xyXG52YXIgcmVhZHlDYWxsYmFjaztcclxuXHJcbi8vIExvYWQgYW4gaW1hZ2UgdXJsIG9yIGFuIGFycmF5IG9mIGltYWdlIHVybHNcclxuZnVuY3Rpb24gbG9hZCh1cmxPckFycikge1xyXG4gICAgaWYgKHVybE9yQXJyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICB1cmxPckFyci5mb3JFYWNoKGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgX2xvYWQodXJsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9sb2FkKHVybE9yQXJyKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2xvYWQodXJsKSB7XHJcbiAgICBpZiAocmVzb3VyY2VDYWNoZVt1cmxdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBpbWc7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeUNhbGxiYWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gZmFsc2U7XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCkge1xyXG4gICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNSZWFkeSgpIHtcclxuICAgIHZhciByZWFkeSA9IHRydWU7XHJcbiAgICBmb3IgKHZhciBrIGluIHJlc291cmNlQ2FjaGUpIHtcclxuICAgICAgICBpZiAocmVzb3VyY2VDYWNoZS5oYXNPd25Qcm9wZXJ0eShrKSAmJiAhcmVzb3VyY2VDYWNoZVtrXSkge1xyXG4gICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZWFkeTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25SZWFkeShmdW5jKSB7XHJcbiAgICByZWFkeUNhbGxiYWNrID0gZnVuYztcclxufVxyXG5cclxudmFyIHJlc291cmNlcyA9IHtcclxuICAgIGxvYWQ6IGxvYWQsXHJcbiAgICBnZXQ6IGdldCxcclxuICAgIG9uUmVhZHk6IG9uUmVhZHksXHJcbiAgICBpc1JlYWR5OiBpc1JlYWR5XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXNvdXJjZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3Jlc291cmNlcy5qc1xuICoqLyIsImZ1bmN0aW9uIG1vdXNlKGNhbnZhcykge1xyXG4gICAgICAgIC8vIEhJVFRFU1Q6IFRvIGNvbnZlcnQgdGhlIG1vdXNlIHBvc2l0aW9uIHRvIGJlIGNhbnZhcyByZWxhdGl2ZS5cclxuICAgICAgICAvLyBCRUdJTiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMTQ0NjUvZ2V0dGluZy1tb3VzZS1sb2NhdGlvbi1pbi1jYW52YXNcclxuICAgIHZhciBzdHlsZVBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nTGVmdCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZVBhZGRpbmdUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdUb3AnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydib3JkZXJMZWZ0V2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlclRvcFdpZHRoJ10sIDEwKSB8fCAwLFxyXG4gICAgICAgIC8vIFNvbWUgcGFnZXMgaGF2ZSBmaXhlZC1wb3NpdGlvbiBiYXJzIChsaWtlIHRoZSBzdHVtYmxldXBvbiBiYXIpIGF0IHRoZSB0b3Agb3IgbGVmdCBvZiB0aGUgcGFnZVxyXG4gICAgICAgIC8vIFRoZXkgd2lsbCBtZXNzIHVwIG1vdXNlIGNvb3JkaW5hdGVzIGFuZCB0aGlzIGZpeGVzIHRoYXRcclxuICAgICAgICBodG1sID0gZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLFxyXG4gICAgICAgIGh0bWxUb3AgPSBodG1sLm9mZnNldFRvcCxcclxuICAgICAgICBodG1sTGVmdCA9IGh0bWwub2Zmc2V0TGVmdCxcclxuICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTowXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGdldFByb3BlclBvc2l0aW9uKGUpO1xyXG5cclxuICAgICAgICBwb3NpdGlvbi54ID0gcG9zLng7XHJcbiAgICAgICAgcG9zaXRpb24ueSA9IHBvcy55O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVyUG9zaXRpb24oZSkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gY2FudmFzLFxyXG4gICAgICAgICAgICBvZmZzZXRYID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IDAsXHJcbiAgICAgICAgICAgIG14LCBteTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgdG90YWwgb2Zmc2V0LiBJdCdzIHBvc3NpYmxlIHRvIGNhY2hlIHRoaXMgaWYgeW91IHdhbnRcclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBwYWRkaW5nIGFuZCBib3JkZXIgc3R5bGUgd2lkdGhzIHRvIG9mZnNldFxyXG4gICAgICAgIC8vIEFsc28gYWRkIHRoZSA8aHRtbD4gb2Zmc2V0cyBpbiBjYXNlIHRoZXJlJ3MgYSBwb3NpdGlvbjpmaXhlZCBiYXIgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcilcclxuICAgICAgICAvLyBUaGlzIHBhcnQgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSwgaXQgZGVwZW5kcyBvbiB5b3VyIHN0eWxpbmdcclxuICAgICAgICBvZmZzZXRYICs9IHN0eWxlUGFkZGluZ0xlZnQgKyBzdHlsZUJvcmRlckxlZnQgKyBodG1sTGVmdDtcclxuICAgICAgICBvZmZzZXRZICs9IHN0eWxlUGFkZGluZ1RvcCArIHN0eWxlQm9yZGVyVG9wICsgaHRtbFRvcDtcclxuXHJcbiAgICAgICAgbXggPSBlLnBhZ2VYIC0gb2Zmc2V0WDtcclxuICAgICAgICBteSA9IGUucGFnZVkgLSBvZmZzZXRZO1xyXG5cclxuICAgICAgICAvLyBXZSByZXR1cm4gYSBzaW1wbGUgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCB4IGFuZCB5IGRlZmluZWRcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBteCxcclxuICAgICAgICAgICAgeTogbXlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNNb3VzZURvd24gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTW91c2VEb3duO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TW91c2VQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vdXNlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9tb3VzZS5qc1xuICoqLyIsInZhciBwcmVzc2VkS2V5cyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gc2V0S2V5KGV2ZW50LCBzdGF0dXMpIHtcclxuICAgIHByZXNzZWRLZXlzW2V2ZW50LmtleUNvZGVdID0gc3RhdHVzO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCB0cnVlKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzZXRLZXkoZSwgZmFsc2UpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcHJlc3NlZEtleXMgPSB7fTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZXNldCgpIHtcclxuICAgIHByZXNzZWRLZXlzID0ge307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRG93bihrZXkpIHtcclxuICAgIHJldHVybiBwcmVzc2VkS2V5c1trZXldO1xyXG59XHJcblxyXG52YXIgaW5wdXQgPSB7XHJcbiAgICByZXNldDogcmVzZXQsXHJcbiAgICBpc0Rvd246IGlzRG93blxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5wdXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2lucHV0LmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHJlbmRlcnMgZnJvbSAnLi9yZW5kZXJlcnMnO1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmZ1bmN0aW9uIEdhbWVPYmplY3QoY29uZmlnKSB7XHJcbiAgICB0aGlzLnBvcyA9IHV0aWxzLmNsb25lKGNvbmZpZy5wb3MpO1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZCB8fCAoJ29iamVjdCcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIGlmIChjb25maWcuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKGNvbmZpZy5zcHJpdGVbMF0sIGNvbmZpZy5zcHJpdGVbMV0sIGNvbmZpZy5zcHJpdGVbMl0sIGNvbmZpZy5zcHJpdGVbM10sIGNvbmZpZy5zcHJpdGVbNF0sIGNvbmZpZy5zcHJpdGVbNV0sIGNvbmZpZy5zcHJpdGVbNl0sIGNvbmZpZy5zcHJpdGVbN10pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG5cclxuICAgIGlmIChjb25maWcuc2l6ZSB8fCB0aGlzLnNwcml0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlLnNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYWxsYmFja3MgPSBjb25maWcuY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgdGhpcy56SW5kZXggPSBjb25maWcuekluZGV4IHx8IDA7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBjb25maWcucGFyYW1ldGVycztcclxuICAgIHRoaXMucnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgaWYgKGNvbmZpZy5yZW5kZXIpIHtcclxuICAgICAgICBpZiAocmVuZGVyc1tjb25maWcucmVuZGVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlciA9IHJlbmRlcnNbY29uZmlnLnJlbmRlcl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gdGhpcy5sYXllci5jdHg7XHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG5cclxuICAgIGlmICh0aGlzLmN1c3RvbVJlbmRlcikge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tUmVuZGVyKHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkdCAmJiB0aGlzLnNwcml0ZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlLnJlbmRlcihjdHgpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXM7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ydWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9yZW1vdmVJbk5leHRUaWNrKSB7XHJcbiAgICAgICAgdGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSW5OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy5wb3NbMF0gPSBwb2ludFswXTtcclxuICAgIHRoaXMucG9zWzFdID0gcG9pbnRbMV07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIHZhciBvYmplY3QgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSGl0Qm94KG1vdXNlKSB7XHJcbiAgICAgICAgdmFyIGZsYWcgPSBmYWxzZSxcclxuICAgICAgICAgICAgaGl0Ym94ID0gb2JqZWN0LmhpdGJveCB8fCBvYmplY3Quc3ByaXRlO1xyXG5cclxuICAgICAgICAob2JqZWN0LnBvc1swXSA8IG1vdXNlLngpICYmIChvYmplY3QucG9zWzBdICsgb2JqZWN0LnNwcml0ZS5zaXplWzBdID4gbW91c2UueCkgJiYgKG9iamVjdC5wb3NbMV0gPCBtb3VzZS55KSAmJiAob2JqZWN0LnBvc1sxXSArIG9iamVjdC5zcHJpdGUuc2l6ZVsxXSA+IG1vdXNlLnkpICYmIChmbGFnID0gdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydjbGljayddICYmIGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21vdXNlbW92ZScgOlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10gJiYgY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10gJiYgIWNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2VsZWF2ZSddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MuaGFzT3duUHJvcGVydHkoYWN0aW9uKSAmJiB0aGlzLmNhbGxiYWNrc1thY3Rpb25dKHRoaXMsIGV2ZW50KVxyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbiAoY29uZmlncykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlncykpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGNvbmZpZ3MubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZShjb25maWdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZFJ1bGVzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdhbWVSdWxlKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSB1dGlscy5jbG9uZSh0aGlzLnBhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lUnVsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZShkdCwgb2JqKTtcclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnNldENvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVMYXllcihjb25maWcpIHtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmdhbWUgPSBjb25maWcuZ2FtZTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4ocmVzb3VyY2VzLmdldChjb25maWcuYmFja2dyb3VuZCksICdyZXBlYXQnKTtcclxuICAgIHRoaXMucG9zID0gY29uZmlnLnBvcyB8fCBbMCwgMF07XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCBbY29uZmlnLmN0eC5jYW52YXMud2lkdGgsIGNvbmZpZy5jdHguY2FudmFzLmhlaWdodF07XHJcbiAgICB0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcbiAgICAgICAgJ2RlZmF1bHQnOiBbXVxyXG4gICAgfTtcclxuLy9jdHggPSBjb25maWcuY3R4LFxyXG4gICAgdGhpcy5vYmplY3RzID0ge307XHJcbiAgICB0aGlzLl9ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMubWFwID0gW107XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXM7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdmFyIGFyciA9IFtdLFxyXG4gICAgICAgIGN0eCA9IHRoaXMuY3R4LFxyXG4gICAgICAgIGNhbnZhcyA9IGN0eC5jYW52YXM7XHJcblxyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LmNsaXAoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmQ7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSkgfHwgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSA9IFtdKTtcclxuICAgICAgICAgICAgYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdLnB1c2godGhpcy5vYmplY3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gYXJyW2ldLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2ldW2pdLnJlbmRlcihkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcclxuICAgIGN0eC5zaGFkb3dCbHVyID0gMTU7XHJcbiAgICBjdHguc2hhZG93Q29sb3IgPSAnYmxhY2snO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICBjdHguc2hhZG93T2Zmc2V0WCA9IDA7XHJcbiAgICBjdHguc2hhZG93T2Zmc2V0WSA9IDA7XHJcbiAgICBjdHgucmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdCA9IHRoaXMub2JqZWN0c1tpXTtcclxuXHJcbiAgICAgICAgb2JqZWN0LnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuICAgIH1cclxufVxyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcnVsZSA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBydWxlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZFJ1bGVzID0gZnVuY3Rpb24gKHJ1bGUpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHJ1bGUpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBydWxlLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUocnVsZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRSdWxlcyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbW92ZU9iamVjdCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5vYmplY3RzW2lkXS50eXBlICYmIHRoaXMub2JqZWN0c1tpZF0udHlwZSAhPSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uc3BsaWNlKHRoaXMuc29ydGVkT2JqZWN0c1t0aGlzLm9iamVjdHNbaWRdLnR5cGVdLmluZGV4T2YoaWQpLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgdGhpcy5vYmplY3RzW2lkXTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRPYmplY3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdPYmplY3Qgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcjogJywgY29uZmlnLmlkKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25maWcuaWQgPSBjb25maWcuaWQgKyBNYXRoLnJvdW5kKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpICogMTAwMDAwMSk7XHJcblxyXG4gICAgdmFyIF9vYmogPSBuZXcgR2FtZU9iamVjdChjb25maWcpO1xyXG4gICAgX29iai5zZXRMYXllcih0aGlzKTtcclxuICAgIF9vYmouaW5pdCgpO1xyXG4gICAgaWYgKGNvbmZpZy50eXBlICYmIGNvbmZpZy50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICghdGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSkgJiYgKHRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0gPSBbXSk7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXS5wdXNoKGNvbmZpZy5pZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnB1c2goY29uZmlnLmlkKTtcclxuICAgIH1cclxuICAgIHRoaXMub2JqZWN0c1tjb25maWcuaWRdID0gX29iajtcclxuXHJcblxyXG4gICAgcmV0dXJuIHRoaXMub2JqZWN0c1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkT2JqZWN0KG9ialtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRPYmplY3RzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0T2JqZWN0c0J5VHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICB2YXIgb2JqZWN0c0lkID0gdGhpcy5zb3J0ZWRPYmplY3RzW3R5cGVdIHx8IFtdLFxyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzSWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5vYmplY3RzW29iamVjdHNJZFtpXV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS50cmlnZ2VyQWN0aW9uID0gZnVuY3Rpb24gKGFjdGlvbiwgZXZlbnQsIG1vdXNlKSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLm9iamVjdHNbaV0udHJpZ2dlckFjdGlvbihhY3Rpb24sIGV2ZW50LCBtb3VzZSk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuY2xlYXJMYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIGRlbGV0ZSB0aGlzLm9iamVjdHNbaV07XHJcbiAgICB9XHJcbiAgICB0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcbiAgICAgICAgJ2RlZmF1bHQnOiBbXSxcclxuICAgIH07XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucnVsZXMpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIGRlbGV0ZSB0aGlzLnJ1bGVzW2ldO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRDb29yZGluYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnBvc1swXSArIHRoaXMuc2l6ZVswXSwgdGhpcy5wb3NbMV0gKyB0aGlzLnNpemVbMV1dO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZVdpbmRvdyhjb25maWcpIHtcclxuICAgIHRoaXMubGF5ZXJzID0ge307XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcbiAgICB0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuICAgIHRoaXMubGF5ZXJzRGVmaW5pdGlvbiA9IGNvbmZpZy5sYXllcnM7XHJcbiAgICB0aGlzLmlucHV0ID0gY29uZmlnLmlucHV0O1xyXG4gICAgdGhpcy5tb3VzZSA9IGNvbmZpZy5tb3VzZTtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSA/IHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIDogMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnJlbmRlcihkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXJzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmFkZExheWVyKG9ialtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkTGF5ZXJzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmICh0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShvYmouaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTGF5ZXIgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyB3aW5kb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9iai5jdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBvYmouZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sYXllcnNbb2JqLmlkXSA9IG5ldyBHYW1lTGF5ZXIob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNbb2JqLmlkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgb2JqID0gdXRpbHMuY2xvbmUodGhpcy5vYmplY3RzRGVmaW5pdGlvbltpZF0pO1xyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldExheWVyQ29uZmlnID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVyc0RlZmluaXRpb25baWRdO1xyXG5cclxuICAgIHJldHVybiBsYXllcjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVXaW5kb3dcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvb2JqZWN0cy5qc1xuICoqLyIsImZ1bmN0aW9uIHRleHRSZW5kZXIob2JqKSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICBmb250Q29uZmlnID0gJyc7XHJcblxyXG4gICAgKG9iai5wYXJhbWV0ZXJzLnN0eWxlKSAmJiAoZm9udENvbmZpZyArPSBvYmoucGFyYW1ldGVycy5zdHlsZSArIFwiIFwiKTtcclxuICAgIChvYmoucGFyYW1ldGVycy53ZWlnaHQpICYmIChmb250Q29uZmlnICs9IG9iai5wYXJhbWV0ZXJzLndlaWdodCArIFwiIFwiKTtcclxuICAgIGZvbnRDb25maWcgKz0gKG9iai5wYXJhbWV0ZXJzLnNpemUgfHwgMzApICsgJ3B0ICc7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmoucGFyYW1ldGVycy5mb250IHx8IFwiQXJpYWxcIik7XHJcblxyXG4gICAgaWYgKG9iai5wYXJhbWV0ZXJzLmFsaWduKSB7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9IG9iai5wYXJhbWV0ZXJzLmFsaWduO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5mb250ID0gZm9udENvbmZpZztcclxuICAgIGN0eC5maWxsU3R5bGUgPSBvYmoucGFyYW1ldGVycy5jb2xvciB8fCBcIiNGRkZcIjtcclxuICAgIGN0eC5maWxsVGV4dChvYmoucGFyYW1ldGVycy50ZXh0LCBvYmoucG9zWzBdLCBvYmoucG9zWzFdKTtcclxufVxyXG5cclxuXHJcbnZhciByZW5kZXJzID0ge1xyXG4gICAgdGV4dDogdGV4dFJlbmRlclxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVycztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVuZGVyZXJzLmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcblxyXG5mdW5jdGlvbiBTcHJpdGUodXJsLCBwb3MsIHNpemUsIHNwZWVkLCBmcmFtZXMsIGRpciwgb25jZSwgZGVncmVlKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLnNwZWVkID0gdHlwZW9mIHNwZWVkID09PSAnbnVtYmVyJyA/IHNwZWVkIDogMDtcclxuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgdGhpcy5faW5kZXggPSAwO1xyXG4gICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB0aGlzLmRpciA9IGRpciB8fCAnaG9yaXpvbnRhbCc7XHJcbiAgICB0aGlzLm9uY2UgPSBvbmNlO1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWUgfHwgMDtcclxufVxyXG5cclxuXHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB0aGlzLl9pbmRleCArPSB0aGlzLnNwZWVkICogZHQ7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5wb3MgJiYgKHRoaXMucG9zID0gY29uZmlnLnBvcyk7XHJcbiAgICAgICAgY29uZmlnLnNpemUgJiYgKHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplKTtcclxuICAgICAgICBjb25maWcuc3BlZWQgJiYgKHRoaXMuc3BlZWQgPSB0eXBlb2YgY29uZmlnLnNwZWVkID09PSAnbnVtYmVyJyA/IGNvbmZpZy5zcGVlZCA6IDApO1xyXG4gICAgICAgIGNvbmZpZy5mcmFtZXMgJiYgKHRoaXMuZnJhbWVzID0gY29uZmlnLmZyYW1lcyk7XHJcbiAgICAgICAgY29uZmlnLnVybCAmJiAodGhpcy51cmwgPSBjb25maWcudXJsKTtcclxuICAgICAgICBjb25maWcuZGlyICYmICh0aGlzLmRpciA9IGNvbmZpZy5kaXIpO1xyXG4gICAgICAgIGNvbmZpZy5vbmNlICYmICh0aGlzLm9uY2UgPSBjb25maWcub25jZSk7XHJcbiAgICAgICAgY29uZmlnLmRlZ3JlZSAmJiAodGhpcy5kZWdyZWUgPSBjb25maWcuZGVncmVlKTtcclxuICAgIH1cclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yb3RhdGVUb0RpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIHZhciBwb3MgPSB0aGlzLmRlZmF1bHRQb3NpdGlvbixcclxuICAgICAgICBzcHJpdGVQb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbi5kaXIgPT0gMSkge1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dKTtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdICsgMiAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbi5kaXIgPT0gLTEpIHtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPCAtMSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVDb25maWcoe1xyXG4gICAgICAgICdwb3MnOiBzcHJpdGVQb3NpdGlvblxyXG4gICAgfSk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgdmFyIGZyYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnNwZWVkID4gMCkge1xyXG4gICAgICAgIHZhciBtYXggPSB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGlkeCA9IE1hdGguZmxvb3IodGhpcy5faW5kZXgpO1xyXG4gICAgICAgIGZyYW1lID0gdGhpcy5mcmFtZXNbaWR4ICUgbWF4XTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25jZSAmJiBpZHggPj0gbWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmcmFtZSA9IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHZhciB4ID0gdGhpcy5wb3NbMF07XHJcbiAgICB2YXIgeSA9IHRoaXMucG9zWzFdO1xyXG5cclxuICAgIGlmICh0aGlzLmRpciA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgeSArPSBmcmFtZSAqIHRoaXMuc2l6ZVsxXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHggKz0gZnJhbWUgKiB0aGlzLnNpemVbMF07XHJcbiAgICB9XHJcbiAgICBjdHgucm90YXRlKHRoaXMuZGVncmVlKTtcclxuICAgIGN0eC5kcmF3SW1hZ2UocmVzb3VyY2VzLmdldCh0aGlzLnVybCksXHJcbiAgICAgICAgeCwgeSxcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSxcclxuICAgICAgICAtdGhpcy5zaXplWzBdIC8gMiwgLXRoaXMuc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnNldGRlZ3JlZSA9IGZ1bmN0aW9uIChkZWdyZWUpIHtcclxuICAgIHRoaXMuZGVncmVlID0gZGVncmVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9zcHJpdGUuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBREE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekRBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDelpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9