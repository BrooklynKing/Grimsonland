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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzPzFkYzYiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2lucHV0LmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Nwcml0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IG1vdXNlTW9kdWxlIGZyb20gJy4vbW91c2UnO1xyXG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XHJcbmltcG9ydCBHYW1lV2luZG93IGZyb20gJy4vb2JqZWN0cyc7XHJcblxyXG4vLyBBIGNyb3NzLWJyb3dzZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbi8vIFNlZSBodHRwczovL2hhY2tzLm1vemlsbGEub3JnLzIwMTEvMDgvYW5pbWF0aW5nLXdpdGgtamF2YXNjcmlwdC1mcm9tLXNldGludGVydmFsLXRvLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cclxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XHJcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcclxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XHJcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRSZXNvdXJjZXMobGlzdCwgY2FsbGJhY2spIHtcclxuICAgIHJlc291cmNlcy5sb2FkKGxpc3QpO1xyXG5cclxuICAgIC8vVGhpcyBvbmUgaXMgbW9jayBmb3IgQUpBWCwgaWYgd2Ugd2lsbCBoYXZlIHJlYWwgQUpBWCwgd2UganVzdCBuZWVkIHRvIHB1dCB0aGlzIG9uZSBpbnRvIGNhbGxiYWNrIHdpdGhvdXQgdGltZW91dFxyXG4gICAgcmVzb3VyY2VzLm9uUmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnKSB7XHJcbiAgICB2YXIgY2FudmFzID0gY29uZmlnLmNhbnZhcyxcclxuICAgICAgICBsYXN0VGltZSA9IDA7XHJcblxyXG4gICAgdmFyIG1vdXNlID0gbW91c2VNb2R1bGUoY2FudmFzKTtcclxuXHJcbiAgICBjb25maWcuaW5wdXQgPSBpbnB1dDtcclxuICAgIGNvbmZpZy5tb3VzZSA9IG1vdXNlO1xyXG5cclxuICAgIHZhciBnYW1lID0gbmV3IEdhbWVXaW5kb3coY29uZmlnKTtcclxuXHJcbiAgICAvKmFudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUudHJpZ2dlckdsb2JhbEV2ZW50KCdlY2xpY2snLCBlLCBtb3VzZS5nZXRNb3VzZVBvc2l0aW9uKGUpKTtcclxuICAgIH0pO1xyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBnYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbiA9IG1vdXNlLmdldE1vdXNlUG9zaXRpb24oZSk7XHJcbiAgICB9KTsqL1xyXG5cclxuICAgIGZ1bmN0aW9uIGdhbWVUaW1lcigpIHtcclxuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgZHQgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMC4wO1xyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgZ2FtZS5yZW5kZXIoZHQpO1xyXG5cclxuICAgICAgICBsYXN0VGltZSA9IG5vdztcclxuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XHJcbiAgICAgICAgbG9hZFJlc291cmNlcyhjb25maWcucmVzb3VyY2VzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdhbWUuaW5pdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vZGVsOiBnYW1lLFxyXG4gICAgICAgIGluaXQ6IGluaXRHYW1lXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWU7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvaW5kZXguanNcbiAqKi8iLCJmdW5jdGlvbiBjb2xsaWRlcyh4LCB5LCByLCBiLCB4MiwgeTIsIHIyLCBiMikge1xyXG4gICAgcmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuICAgIGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94Q29sbGlkZXMocG9zLCBzaXplLCBwb3MyLCBzaXplMikge1xyXG4gICAgcmV0dXJuIGNvbGxpZGVzKHBvc1swXSArIHNpemVbMF0gLyAyLCBwb3NbMV0gKyBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3NbMF0gLSBzaXplWzBdIC8gMiwgcG9zWzFdIC0gc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSArIHNpemUyWzBdIC8gMiwgcG9zMlsxXSArIHNpemUyWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdIC0gc2l6ZTJbMF0gLyAyLCBwb3MyWzFdIC0gc2l6ZTJbMV0gLyAyKTtcclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWUocG9pbnQxLCBwb2ludDIsIHByZXZEZWdyZWUsIHNwZWVkKSB7XHJcbiAgICB2YXIgZGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKG5ld0RlZ3JlZSA9IDM2MCAtIG5ld0RlZ3JlZSk7XHJcbiAgICBuZXdEZWdyZWUgKz0gZGVncmVlO1xyXG4gICAgKG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuICAgIChuZXdEZWdyZWUgPiAzNjApICYmIChuZXdEZWdyZWUgLT0gMzYwKTtcclxuXHJcbiAgICB2YXIgZGlyID0gKChuZXdEZWdyZWUgPiAwICYmIG5ld0RlZ3JlZSA8PSA5MCkgfHwgKG5ld0RlZ3JlZSA+IDI3MCAmJiBuZXdEZWdyZWUgPD0gMzYwKSkgPyAxIDogLTE7XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHtcclxuICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICBrOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXREZXN0aW5hdGlvbihwb2ludDEsIGRpcmVjdGlvbiwgTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICB2YXIgaywgYiwgZGlyO1xyXG5cclxuICAgIGlmIChwb2ludDFbMF0gPT0gcG9pbnQyWzBdKSB7XHJcbiAgICAgICAgayA9ICd2ZXJ0JztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzFdID49IHBvaW50MVsxXSkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGsgPSAocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSAvIChwb2ludDJbMF0gLSBwb2ludDFbMF0pO1xyXG4gICAgICAgIGIgPSBwb2ludDFbMV0gLSBwb2ludDFbMF0gKiBrO1xyXG4gICAgICAgIGRpciA9IChwb2ludDJbMF0gPj0gcG9pbnQxWzBdKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgJ2snOiBrLFxyXG4gICAgICAgICdiJzogYixcclxuICAgICAgICAnZGlyJzogZGlyXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBvaW50LCBsaW5lLCBzcGVlZCkge1xyXG4gICAgdmFyIHgsIHk7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHggPSBwb2ludFswXTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF0gKyBsaW5lLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludFsxXSArIGxpbmUuZGlyICogc3BlZWQgKiBsaW5lLmsgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0UG9zaXRpb24ocG9pbnQxLCBwb2ludDIvKiwgc3BlZWQsIGR0Ki8pIHtcclxuICAgIHZhciBkZWx0YXggPSBNYXRoLmFicyhwb2ludDJbMF0gLSBwb2ludDFbMF0pLFxyXG4gICAgICAgIGRlbHRheSA9IE1hdGguYWJzKHBvaW50MlsxXSAtIHBvaW50MVsxXSksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIGRlbHRhZXJyID0gKGRlbHRheCA+IGRlbHRheSkgPyBkZWx0YXkgOiBkZWx0YXgsXHJcbiAgICAgICAgeSA9IHBvaW50MVsxXSxcclxuLy9cdFx0XHRzID0gc3BlZWQgKiBkdCxcclxuICAgICAgICB4ID0gcG9pbnQxWzBdO1xyXG5cclxuLy9cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcclxuICAgIGlmIChkZWx0YXggPiBkZWx0YXkpIHtcclxuICAgICAgICAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHgtLSA6IHgrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnJcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG4gICAgICAgICAgICB5ID0gKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5IC0gMSA6IHkgKyAxO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yIC0gZGVsdGF4XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnJcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheSkge1xyXG4gICAgICAgICAgICB4ID0gKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4IC0gMSA6IHggKyAxO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yIC0gZGVsdGF5XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuLy99XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBvYmouY29uc3RydWN0b3IoKTsgLy8gY2hhbmdlZFxyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgICdjb2xsaWRlcyc6IGNvbGxpZGVzLFxyXG4gICAgJ2JveENvbGxpZGVzJzogYm94Q29sbGlkZXMsXHJcbiAgICAnZ2V0RGVncmVlJzogZ2V0RGVncmVlLFxyXG4gICAgJ25leHRQb3NpdGlvbic6IG5leHRQb3NpdGlvbixcclxuICAgICdnZXREZXN0aW5hdGlvbic6IGdldERlc3RpbmF0aW9uLFxyXG4gICAgJ2dldERpcmVjdGlvbic6IGdldERpcmVjdGlvbixcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUsXHJcbiAgICAnY2xvbmUnOiBjbG9uZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsInZhciByZXNvdXJjZUNhY2hlID0ge307XHJcbnZhciByZWFkeUNhbGxiYWNrO1xyXG5cclxuLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG5mdW5jdGlvbiBsb2FkKHVybE9yQXJyKSB7XHJcbiAgICBpZiAodXJsT3JBcnIgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHVybE9yQXJyLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBfbG9hZCh1cmwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX2xvYWQodXJsT3JBcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfbG9hZCh1cmwpIHtcclxuICAgIGlmIChyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGltZztcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5Q2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBmYWxzZTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gICAgdmFyIHJlYWR5ID0gdHJ1ZTtcclxuICAgIGZvciAodmFyIGsgaW4gcmVzb3VyY2VDYWNoZSkge1xyXG4gICAgICAgIGlmIChyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgIHJlYWR5Q2FsbGJhY2sgPSBmdW5jO1xyXG59XHJcblxyXG52YXIgcmVzb3VyY2VzID0ge1xyXG4gICAgbG9hZDogbG9hZCxcclxuICAgIGdldDogZ2V0LFxyXG4gICAgb25SZWFkeTogb25SZWFkeSxcclxuICAgIGlzUmVhZHk6IGlzUmVhZHlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc291cmNlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVzb3VyY2VzLmpzXG4gKiovIiwiZnVuY3Rpb24gbW91c2UoY2FudmFzKSB7XHJcbiAgICAgICAgLy8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG4gICAgICAgIC8vIEJFR0lOIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExNDQ2NS9nZXR0aW5nLW1vdXNlLWxvY2F0aW9uLWluLWNhbnZhc1xyXG4gICAgdmFyIHN0eWxlUGFkZGluZ0xlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdMZWZ0J10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlUGFkZGluZ1RvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ1RvcCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlckxlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlckxlZnRXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlclRvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyVG9wV2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgLy8gU29tZSBwYWdlcyBoYXZlIGZpeGVkLXBvc2l0aW9uIGJhcnMgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcikgYXQgdGhlIHRvcCBvciBsZWZ0IG9mIHRoZSBwYWdlXHJcbiAgICAgICAgLy8gVGhleSB3aWxsIG1lc3MgdXAgbW91c2UgY29vcmRpbmF0ZXMgYW5kIHRoaXMgZml4ZXMgdGhhdFxyXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUsXHJcbiAgICAgICAgaHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG4gICAgICAgIGh0bWxMZWZ0ID0gaHRtbC5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgcG9zID0gZ2V0UHJvcGVyUG9zaXRpb24oZSk7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uLnggPSBwb3MueDtcclxuICAgICAgICBwb3NpdGlvbi55ID0gcG9zLnk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJQb3NpdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjYW52YXMsXHJcbiAgICAgICAgICAgIG9mZnNldFggPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXRZID0gMCxcclxuICAgICAgICAgICAgbXgsIG15O1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlIHRoZSB0b3RhbCBvZmZzZXQuIEl0J3MgcG9zc2libGUgdG8gY2FjaGUgdGhpcyBpZiB5b3Ugd2FudFxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBhZGRpbmcgYW5kIGJvcmRlciBzdHlsZSB3aWR0aHMgdG8gb2Zmc2V0XHJcbiAgICAgICAgLy8gQWxzbyBhZGQgdGhlIDxodG1sPiBvZmZzZXRzIGluIGNhc2UgdGhlcmUncyBhIHBvc2l0aW9uOmZpeGVkIGJhciAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKVxyXG4gICAgICAgIC8vIFRoaXMgcGFydCBpcyBub3Qgc3RyaWN0bHkgbmVjZXNzYXJ5LCBpdCBkZXBlbmRzIG9uIHlvdXIgc3R5bGluZ1xyXG4gICAgICAgIG9mZnNldFggKz0gc3R5bGVQYWRkaW5nTGVmdCArIHN0eWxlQm9yZGVyTGVmdCArIGh0bWxMZWZ0O1xyXG4gICAgICAgIG9mZnNldFkgKz0gc3R5bGVQYWRkaW5nVG9wICsgc3R5bGVCb3JkZXJUb3AgKyBodG1sVG9wO1xyXG5cclxuICAgICAgICBteCA9IGUucGFnZVggLSBvZmZzZXRYO1xyXG4gICAgICAgIG15ID0gZS5wYWdlWSAtIG9mZnNldFk7XHJcblxyXG4gICAgICAgIC8vIFdlIHJldHVybiBhIHNpbXBsZSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIHggYW5kIHkgZGVmaW5lZFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG14LFxyXG4gICAgICAgICAgICB5OiBteVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc01vdXNlRG93biA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNb3VzZURvd247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNb3VzZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW91c2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL21vdXNlLmpzXG4gKiovIiwidmFyIHByZXNzZWRLZXlzID0ge307XHJcblxyXG5mdW5jdGlvbiBzZXRLZXkoZXZlbnQsIHN0YXR1cykge1xyXG4gICAgcHJlc3NlZEtleXNbZXZlbnQua2V5Q29kZV0gPSBzdGF0dXM7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2V0S2V5KGUsIHRydWUpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCBmYWxzZSk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgcHJlc3NlZEtleXMgPSB7fTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNEb3duKGtleSkge1xyXG4gICAgcmV0dXJuIHByZXNzZWRLZXlzW2tleV07XHJcbn1cclxuXHJcbnZhciBpbnB1dCA9IHtcclxuICAgIHJlc2V0OiByZXNldCxcclxuICAgIGlzRG93bjogaXNEb3duXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnB1dDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvaW5wdXQuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgcmVuZGVycyBmcm9tICcuL3JlbmRlcmVycyc7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xyXG5cclxuZnVuY3Rpb24gR2FtZU9iamVjdChjb25maWcpIHtcclxuICAgIHRoaXMucG9zID0gdXRpbHMuY2xvbmUoY29uZmlnLnBvcyk7XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkIHx8ICgnb2JqZWN0JyArIERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zcHJpdGUpIHtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoY29uZmlnLnNwcml0ZVswXSwgY29uZmlnLnNwcml0ZVsxXSwgY29uZmlnLnNwcml0ZVsyXSwgY29uZmlnLnNwcml0ZVszXSwgY29uZmlnLnNwcml0ZVs0XSwgY29uZmlnLnNwcml0ZVs1XSwgY29uZmlnLnNwcml0ZVs2XSwgY29uZmlnLnNwcml0ZVs3XSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgdGhpcy5zcHJpdGUuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNvbmZpZy5jYWxsYmFja3MgfHwge307XHJcbiAgICB0aGlzLnpJbmRleCA9IGNvbmZpZy56SW5kZXggfHwgMDtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IGNvbmZpZy5wYXJhbWV0ZXJzO1xyXG4gICAgdGhpcy5ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcbiAgICBpZiAoY29uZmlnLnJlbmRlcikge1xyXG4gICAgICAgIGlmIChyZW5kZXJzW2NvbmZpZy5yZW5kZXJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tUmVuZGVyID0gcmVuZGVyc1tjb25maWcucmVuZGVyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcblxyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHZhciBjdHggPSB0aGlzLmxheWVyLmN0eDtcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VzdG9tUmVuZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGR0ICYmIHRoaXMuc3ByaXRlLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUucmVuZGVyKGN0eCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5ydWxlcztcclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3JlbW92ZUluTmV4dFRpY2spIHtcclxuICAgICAgICB0aGlzLmxheWVyLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLl9yZW1vdmVJbk5leHRUaWNrID0gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB0aGlzLnBvc1swXSA9IHBvaW50WzBdO1xyXG4gICAgdGhpcy5wb3NbMV0gPSBwb2ludFsxXTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgdmFyIG9iamVjdCA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tIaXRCb3gobW91c2UpIHtcclxuICAgICAgICB2YXIgZmxhZyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBoaXRib3ggPSBvYmplY3QuaGl0Ym94IHx8IG9iamVjdC5zcHJpdGU7XHJcblxyXG4gICAgICAgIChvYmplY3QucG9zWzBdIDwgbW91c2UueCkgJiYgKG9iamVjdC5wb3NbMF0gKyBvYmplY3Quc3ByaXRlLnNpemVbMF0gPiBtb3VzZS54KSAmJiAob2JqZWN0LnBvc1sxXSA8IG1vdXNlLnkpICYmIChvYmplY3QucG9zWzFdICsgb2JqZWN0LnNwcml0ZS5zaXplWzFdID4gbW91c2UueSkgJiYgKGZsYWcgPSB0cnVlKTtcclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbJ2NsaWNrJ10gJiYgY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydjbGljayddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJyA6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSAmJiBjaGVja0hpdEJveChtb3VzZSkgJiYgdGhpcy5jYWxsYmFja3NbJ21vdXNlbW92ZSddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbJ21vdXNlbGVhdmUnXSAmJiAhY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10odGhpcywgZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShhY3Rpb24pICYmIHRoaXMuY2FsbGJhY2tzW2FjdGlvbl0odGhpcywgZXZlbnQpXHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcnVsZSA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuICAgICAgICBydWxlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufVxyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlcyA9IGZ1bmN0aW9uIChjb25maWdzKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWdzKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gY29uZmlncy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKGNvbmZpZ3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkUnVsZXMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gR2FtZVJ1bGUoY29uZmlnKSB7XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkO1xyXG4gICAgdGhpcy5fdXBkYXRlID0gY29uZmlnLnVwZGF0ZTtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IHV0aWxzLmNsb25lKHRoaXMucGFyYW1ldGVycyk7XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVSdWxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICB0aGlzLl91cGRhdGUgJiYgdGhpcy5fdXBkYXRlKGR0LCBvYmopO1xyXG59O1xyXG5HYW1lUnVsZS5wcm90b3R5cGUuc2V0Q29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZUxheWVyKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMuZ2FtZSA9IGNvbmZpZy5nYW1lO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5jdHguY3JlYXRlUGF0dGVybihyZXNvdXJjZXMuZ2V0KGNvbmZpZy5iYWNrZ3JvdW5kKSwgJ3JlcGVhdCcpO1xyXG4gICAgdGhpcy5wb3MgPSBjb25maWcucG9zIHx8IFswLCAwXTtcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IFtjb25maWcuY3R4LmNhbnZhcy53aWR0aCwgY29uZmlnLmN0eC5jYW52YXMuaGVpZ2h0XTtcclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4vL2N0eCA9IGNvbmZpZy5jdHgsXHJcbiAgICB0aGlzLm9iamVjdHMgPSB7fTtcclxuICAgIHRoaXMuX3J1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG4gICAgdGhpcy5tYXAgPSBbXTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZUxheWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcztcclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgYXJyID0gW10sXHJcbiAgICAgICAgY3R4ID0gdGhpcy5jdHgsXHJcbiAgICAgICAgY2FudmFzID0gY3R4LmNhbnZhcztcclxuXHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbiAgICBjdHguY2xpcCgpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdKSB8fCAoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdID0gW10pO1xyXG4gICAgICAgICAgICBhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0ucHVzaCh0aGlzLm9iamVjdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnJbaV0pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBhcnJbaV0ubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbaV1bal0ucmVuZGVyKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcclxuICAgIGN0eC5zaGFkb3dDb2xvciA9ICdibGFjayc7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRYID0gMDtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRZID0gMDtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5vYmplY3RzW2ldO1xyXG5cclxuICAgICAgICBvYmplY3QudXBkYXRlKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbiAocnVsZSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocnVsZSkpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHJ1bGUubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZShydWxlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZFJ1bGVzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlT2JqZWN0ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHNbaWRdLnR5cGUgJiYgdGhpcy5vYmplY3RzW2lkXS50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdHNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09iamVjdCB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyOiAnLCBjb25maWcuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbmZpZy5pZCA9IGNvbmZpZy5pZCArIE1hdGgucm91bmQoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkgKiAxMDAwMDAxKTtcclxuXHJcbiAgICB2YXIgX29iaiA9IG5ldyBHYW1lT2JqZWN0KGNvbmZpZyk7XHJcbiAgICBfb2JqLnNldExheWVyKHRoaXMpO1xyXG4gICAgX29iai5pbml0KCk7XHJcbiAgICBpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgKCF0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdKSAmJiAodGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSA9IFtdKTtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goY29uZmlnLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10ucHVzaChjb25maWcuaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vYmplY3RzW2NvbmZpZy5pZF0gPSBfb2JqO1xyXG5cclxuXHJcbiAgICByZXR1cm4gdGhpcy5vYmplY3RzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IG9iai5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPYmplY3Qob2JqW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZE9iamVjdHMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRPYmplY3RzQnlUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgIHZhciBvYmplY3RzSWQgPSB0aGlzLnNvcnRlZE9iamVjdHNbdHlwZV0gfHwgW10sXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNJZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICByZXN1bHQucHVzaCh0aGlzLm9iamVjdHNbb2JqZWN0c0lkW2ldXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMub2JqZWN0c1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdLFxyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMucnVsZXNbaV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMucG9zWzBdICsgdGhpcy5zaXplWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMuc2l6ZVsxXV07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lV2luZG93KGNvbmZpZykge1xyXG4gICAgdGhpcy5sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMub2JqZWN0c0RlZmluaXRpb24gPSBjb25maWcub2JqZWN0cztcclxuICAgIHRoaXMucnVsZXNEZWZpbml0aW9uID0gY29uZmlnLnJ1bGVzO1xyXG4gICAgdGhpcy5sYXllcnNEZWZpbml0aW9uID0gY29uZmlnLmxheWVycztcclxuICAgIHRoaXMuaW5wdXQgPSBjb25maWcuaW5wdXQ7XHJcbiAgICB0aGlzLm1vdXNlID0gY29uZmlnLm1vdXNlO1xyXG4gICAgdGhpcy5faGFuZGxlcnMgPSB7fTtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IHt9O1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG59XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYmluZEdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgKCF0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSAmJiAodGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdKTtcclxuICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRPYmplY3QpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0pID8gdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXS5sZW5ndGggOiAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0udXBkYXRlKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0ucmVuZGVyKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVtb3ZlTGF5ZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGlkKSAmJiBkZWxldGUgdGhpcy5sYXllcnNbaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllcnMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgYXJyID0gW107XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuYWRkTGF5ZXIob2JqW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRMYXllcnMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KG9iai5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdMYXllciB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIHdpbmRvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqLmN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIG9iai5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLmxheWVyc1tvYmouaWRdID0gbmV3IEdhbWVMYXllcihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxheWVyc1tvYmouaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBvYmogPSB1dGlscy5jbG9uZSh0aGlzLm9iamVjdHNEZWZpbml0aW9uW2lkXSk7XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXJDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBsYXllciA9IHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcblxyXG4gICAgcmV0dXJuIGxheWVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVdpbmRvd1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9vYmplY3RzLmpzXG4gKiovIiwiZnVuY3Rpb24gdGV4dFJlbmRlcihvYmopIHtcclxuICAgIHZhciBjdHggPSBvYmoubGF5ZXIuY3R4LFxyXG4gICAgICAgIGZvbnRDb25maWcgPSAnJztcclxuXHJcbiAgICAob2JqLnBhcmFtZXRlcnMuc3R5bGUpICYmIChmb250Q29uZmlnICs9IG9iai5wYXJhbWV0ZXJzLnN0eWxlICsgXCIgXCIpO1xyXG4gICAgKG9iai5wYXJhbWV0ZXJzLndlaWdodCkgJiYgKGZvbnRDb25maWcgKz0gb2JqLnBhcmFtZXRlcnMud2VpZ2h0ICsgXCIgXCIpO1xyXG4gICAgZm9udENvbmZpZyArPSAob2JqLnBhcmFtZXRlcnMuc2l6ZSB8fCAzMCkgKyAncHQgJztcclxuICAgIGZvbnRDb25maWcgKz0gKG9iai5wYXJhbWV0ZXJzLmZvbnQgfHwgXCJBcmlhbFwiKTtcclxuXHJcbiAgICBpZiAob2JqLnBhcmFtZXRlcnMuYWxpZ24pIHtcclxuICAgICAgICBjdHgudGV4dEFsaWduID0gb2JqLnBhcmFtZXRlcnMuYWxpZ247XHJcbiAgICB9XHJcblxyXG4gICAgY3R4LmZvbnQgPSBmb250Q29uZmlnO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IG9iai5wYXJhbWV0ZXJzLmNvbG9yIHx8IFwiI0ZGRlwiO1xyXG4gICAgY3R4LmZpbGxUZXh0KG9iai5wYXJhbWV0ZXJzLnRleHQsIG9iai5wb3NbMF0sIG9iai5wb3NbMV0pO1xyXG59XHJcblxyXG5cclxudmFyIHJlbmRlcnMgPSB7XHJcbiAgICB0ZXh0OiB0ZXh0UmVuZGVyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXJzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9yZW5kZXJlcnMuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuXHJcbmZ1bmN0aW9uIFNwcml0ZSh1cmwsIHBvcywgc2l6ZSwgc3BlZWQsIGZyYW1lcywgZGlyLCBvbmNlLCBkZWdyZWUpIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMuc3BlZWQgPSB0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInID8gc3BlZWQgOiAwO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICB0aGlzLnVybCA9IHVybDtcclxuICAgIHRoaXMuZGlyID0gZGlyIHx8ICdob3Jpem9udGFsJztcclxuICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZSB8fCAwO1xyXG59XHJcblxyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX2luZGV4ICs9IHRoaXMuc3BlZWQgKiBkdDtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGVDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnBvcyAmJiAodGhpcy5wb3MgPSBjb25maWcucG9zKTtcclxuICAgICAgICBjb25maWcuc2l6ZSAmJiAodGhpcy5zaXplID0gY29uZmlnLnNpemUpO1xyXG4gICAgICAgIGNvbmZpZy5zcGVlZCAmJiAodGhpcy5zcGVlZCA9IHR5cGVvZiBjb25maWcuc3BlZWQgPT09ICdudW1iZXInID8gY29uZmlnLnNwZWVkIDogMCk7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lcyAmJiAodGhpcy5mcmFtZXMgPSBjb25maWcuZnJhbWVzKTtcclxuICAgICAgICBjb25maWcudXJsICYmICh0aGlzLnVybCA9IGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGNvbmZpZy5kaXIgJiYgKHRoaXMuZGlyID0gY29uZmlnLmRpcik7XHJcbiAgICAgICAgY29uZmlnLm9uY2UgJiYgKHRoaXMub25jZSA9IGNvbmZpZy5vbmNlKTtcclxuICAgICAgICBjb25maWcuZGVncmVlICYmICh0aGlzLmRlZ3JlZSA9IGNvbmZpZy5kZWdyZWUpO1xyXG4gICAgfVxyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJvdGF0ZVRvRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgdmFyIHBvcyA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uLFxyXG4gICAgICAgIHNwcml0ZVBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uLmRpciA9PSAxKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uLmRpciA9PSAtMSkge1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7XHJcbiAgICAgICAgJ3Bvcyc6IHNwcml0ZVBvc2l0aW9uXHJcbiAgICB9KTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICB2YXIgZnJhbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XHJcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbmRleCk7XHJcbiAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lc1tpZHggJSBtYXhdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbmNlICYmIGlkeCA+PSBtYXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHggPSB0aGlzLnBvc1swXTtcclxuICAgIHZhciB5ID0gdGhpcy5wb3NbMV07XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB5ICs9IGZyYW1lICogdGhpcy5zaXplWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeCArPSBmcmFtZSAqIHRoaXMuc2l6ZVswXTtcclxuICAgIH1cclxuICAgIGN0eC5yb3RhdGUodGhpcy5kZWdyZWUpO1xyXG4gICAgY3R4LmRyYXdJbWFnZShyZXNvdXJjZXMuZ2V0KHRoaXMudXJsKSxcclxuICAgICAgICB4LCB5LFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdLFxyXG4gICAgICAgIC10aGlzLnNpemVbMF0gLyAyLCAtdGhpcy5zaXplWzFdIC8gMixcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUuc2V0ZGVncmVlID0gZnVuY3Rpb24gKGRlZ3JlZSkge1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3Nwcml0ZS5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFEQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1SEE7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=