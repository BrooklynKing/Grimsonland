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

	var _collisions = __webpack_require__(13);

	var _collisions2 = _interopRequireDefault(_collisions);

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
	        n: 6,
	        width: canvas.width,
	        height: canvas.height
	    });

	    var game = new _objects2.default(config);

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

	    canvas.addEventListener('mouseup', function () {
	        _isMouseDown = false;
	    });

	    canvas.addEventListener('mousedown', function () {
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
	        this.customRender(this, dt);
	    } else {
	        dt && this.sprite.update(dt);
	        this.sprite.render(ctx);
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
	    this.id = config.id;
	    this.ctx = config.ctx;
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

	    this.game.collisions.update();

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
	    return _utils2.default.clone(this.objectsDefinition[id]);
	};
	GameWindow.prototype.getLayerConfig = function (id) {
	    return this.layersDefinition[id];
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

	function unitRenderer(obj, dt) {
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
	    dt && obj.sprite.update(dt);
	    obj.sprite.render(ctx);
	}
	var renders = {
	    text: textRender,
	    unit: unitRenderer
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

	var _utils = __webpack_require__(3);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(3);

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
	            oldCells[i] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
	        }
	    }

	    function checkPlace(object) {
	        var pos = object.pos,
	            size = object.size,
	            point1 = [pos[0] + size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
	            point2 = [pos[0] - size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
	            point3 = [pos[0] + size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
	            point4 = [pos[0] - size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
	            cells = [getCell(point1), getCell(point2), getCell(point3), getCell(point4)],
	            oldCells = object.parameters.collisions.cells;

	        if (point1[0] < 0 || point1[1] < 0 || point2[0] < 0 || point2[1] < 0 || point3[0] < 0 || point3[1] < 0 || point4[0] < 0 || point4[1] < 0) {
	            return;
	        }
	        if (point1[0] > width || point1[1] > height || point2[0] > width || point2[1] > height || point3[0] > width || point3[1] > height || point4[0] > width || point4[1] > height) {
	            return;
	        }
	        for (var i = 0; i < oldCells.length; i++) {
	            if (oldCells[i] != cells[i]) {
	                oldCells[i] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
	                cellGrid[cells[i]].indexOf(object) == -1 && cellGrid[cells[i]].push(object);
	                oldCells[i] = cells[i];
	            } else {
	                cellGrid[cells[i]].indexOf(object) == -1 && cellGrid[cells[i]].push(object);
	            }
	        }
	    }

	    function update() {
	        for (var i = 0; i <= sizeX; i++) {
	            for (var j = 0; j <= sizeY; j++) {
	                var objects = cellGrid[getCell([i, j])],
	                    length = objects.length;

	                for (var k = 0; k < length; k++) {
	                    for (var l = k + 1; l < length; l++) {
	                        if (objects[k].pos && objects[k].size && objects[l].pos && objects[l].size) if (_utils2.default.boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
	                            objects[k].parameters.collisions.push(objects[l]);
	                            objects[l].parameters.collisions.push(objects[k]);
	                        }
	                    }
	                }
	            }
	        }
	    }

	    return {
	        cellGrid: cellGrid,
	        checkPlace: checkPlace,
	        removeObject: removeObject,
	        update: update,
	        clear: generateMap
	    };
	}

	exports.default = generate;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3V0aWxzLmpzPzFkYzYiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9tb3VzZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2lucHV0LmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL2NvbGxpc2lvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCBtb3VzZU1vZHVsZSBmcm9tICcuL21vdXNlJztcclxuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xyXG5pbXBvcnQgR2FtZVdpbmRvdyBmcm9tICcuL29iamVjdHMnO1xyXG5pbXBvcnQgY29sbGlzaW9ucyBmcm9tICcuL2NvbGxpc2lvbnMnO1xyXG5cclxuLy8gQSBjcm9zcy1icm93c2VyIHJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4vLyBTZWUgaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8yMDExLzA4L2FuaW1hdGluZy13aXRoLWphdmFzY3JpcHQtZnJvbS1zZXRpbnRlcnZhbC10by1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXHJcbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxyXG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XHJcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcclxuICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgIH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBsb2FkUmVzb3VyY2VzKGxpc3QsIGNhbGxiYWNrKSB7XHJcbiAgICByZXNvdXJjZXMubG9hZChsaXN0KTtcclxuXHJcbiAgICAvL1RoaXMgb25lIGlzIG1vY2sgZm9yIEFKQVgsIGlmIHdlIHdpbGwgaGF2ZSByZWFsIEFKQVgsIHdlIGp1c3QgbmVlZCB0byBwdXQgdGhpcyBvbmUgaW50byBjYWxsYmFjayB3aXRob3V0IHRpbWVvdXRcclxuICAgIHJlc291cmNlcy5vblJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHYW1lKGNvbmZpZykge1xyXG4gICAgdmFyIGNhbnZhcyA9IGNvbmZpZy5jYW52YXMsXHJcbiAgICAgICAgbGFzdFRpbWUgPSAwO1xyXG5cclxuICAgIHZhciBtb3VzZSA9IG1vdXNlTW9kdWxlKGNhbnZhcyk7XHJcblxyXG4gICAgY29uZmlnLmlucHV0ID0gaW5wdXQ7XHJcbiAgICBjb25maWcubW91c2UgPSBtb3VzZTtcclxuICAgIGNvbmZpZy5jb2xsaXNpb25zID0gY29sbGlzaW9ucyh7XHJcbiAgICAgICAgbjogNixcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogY2FudmFzLmhlaWdodFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSBuZXcgR2FtZVdpbmRvdyhjb25maWcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdhbWVUaW1lcigpIHtcclxuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgZHQgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMC4wO1xyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgZ2FtZS5yZW5kZXIoZHQpO1xyXG5cclxuICAgICAgICBsYXN0VGltZSA9IG5vdztcclxuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XHJcbiAgICAgICAgbG9hZFJlc291cmNlcyhjb25maWcucmVzb3VyY2VzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdhbWUuaW5pdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKGdhbWVUaW1lcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlbDogZ2FtZSxcclxuICAgICAgICBpbml0OiBpbml0R2FtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2luZGV4LmpzXG4gKiovIiwiZnVuY3Rpb24gY29sbGlkZXMoeCwgeSwgciwgYiwgeDIsIHkyLCByMiwgYjIpIHtcclxuICAgIHJldHVybiAhKHIgPj0geDIgfHwgeCA8IHIyIHx8XHJcbiAgICBiID49IHkyIHx8IHkgPCBiMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zWzBdIC0gc2l6ZVswXSAvIDIsIHBvc1sxXSAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gKyBzaXplMlswXSAvIDIsIHBvczJbMV0gKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAoZGVncmVlID0gLWRlZ3JlZSk7XHJcbiAgICBpZiAoZGVncmVlID09IHByZXZEZWdyZWUpIHtcclxuICAgICAgICByZXR1cm4gW2RlZ3JlZSwgMF07XHJcbiAgICB9IGVsc2UgaWYgKCgoZGVncmVlIDwgMCAmJiBwcmV2RGVncmVlID4gMCkgfHwgKGRlZ3JlZSA+IDAgJiYgcHJldkRlZ3JlZSA8IDApKSAmJiAoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBNYXRoLlBJKSkge1xyXG4gICAgICAgIHZhciBkZWdyZWVXaXRoU3BlZWQgPSAoKHByZXZEZWdyZWUgPiAwKSA/IHByZXZEZWdyZWUgKyBzcGVlZCA6IHByZXZEZWdyZWUgLSBzcGVlZCk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZWdyZWVXaXRoU3BlZWQgPCAtTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSBNYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCArIE1hdGguUEkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBvaW50MSwgcG9pbnQyLCBkZWdyZWUpIHtcclxuICAgIHZhciBuZXdEZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGdldERlc3RpbmF0aW9uKHBvaW50MSwgZGlyZWN0aW9uLCBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHZhciBrLCBiLCBkaXI7XHJcblxyXG4gICAgaWYgKHBvaW50MVswXSA9PSBwb2ludDJbMF0pIHtcclxuICAgICAgICBrID0gJ3ZlcnQnO1xyXG4gICAgICAgIGRpciA9IChwb2ludDJbMV0gPj0gcG9pbnQxWzFdKSA/IDEgOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgayA9IChwb2ludDJbMV0gLSBwb2ludDFbMV0pIC8gKHBvaW50MlswXSAtIHBvaW50MVswXSk7XHJcbiAgICAgICAgYiA9IHBvaW50MVsxXSAtIHBvaW50MVswXSAqIGs7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlswXSA+PSBwb2ludDFbMF0pID8gMSA6IC0xO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAnayc6IGssXHJcbiAgICAgICAgJ2InOiBiLFxyXG4gICAgICAgICdkaXInOiBkaXJcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVzdGluYXRpb24ocG9pbnQsIGxpbmUsIHNwZWVkKSB7XHJcbiAgICB2YXIgeCwgeTtcclxuICAgIGlmIChsaW5lLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IHBvaW50WzBdO1xyXG4gICAgICAgIHkgPSBwb2ludFsxXSArIGxpbmUuZGlyICogc3BlZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHggPSAocG9pbnRbMF0gKyBsaW5lLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpKTtcclxuICAgICAgICB5ID0gKHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZCAqIGxpbmUuayAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0UG9zaXRpb24ocG9pbnQxLCBwb2ludDIvKiwgc3BlZWQsIGR0Ki8pIHtcclxuICAgIHZhciBkZWx0YXggPSBNYXRoLmFicyhwb2ludDJbMF0gLSBwb2ludDFbMF0pLFxyXG4gICAgICAgIGRlbHRheSA9IE1hdGguYWJzKHBvaW50MlsxXSAtIHBvaW50MVsxXSksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIGRlbHRhZXJyID0gKGRlbHRheCA+IGRlbHRheSkgPyBkZWx0YXkgOiBkZWx0YXgsXHJcbiAgICAgICAgeSA9IHBvaW50MVsxXSxcclxuICAgICAgICB4ID0gcG9pbnQxWzBdO1xyXG5cclxuICAgIGlmIChkZWx0YXggPiBkZWx0YXkpIHtcclxuICAgICAgICAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHgtLSA6IHgrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXgpIHtcclxuICAgICAgICAgICAgeSA9IChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geSAtIDEgOiB5ICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geS0tIDogeSsrO1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YWVycjtcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheSkge1xyXG4gICAgICAgICAgICB4ID0gKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4IC0gMSA6IHggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBvYmouY29uc3RydWN0b3IoKTsgLy8gY2hhbmdlZFxyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgICdjb2xsaWRlcyc6IGNvbGxpZGVzLFxyXG4gICAgJ2JveENvbGxpZGVzJzogYm94Q29sbGlkZXMsXHJcbiAgICAnZ2V0RGVncmVlJzogZ2V0RGVncmVlLFxyXG4gICAgJ25leHRQb3NpdGlvbic6IG5leHRQb3NpdGlvbixcclxuICAgICdnZXREZXN0aW5hdGlvbic6IGdldERlc3RpbmF0aW9uLFxyXG4gICAgJ2dldERpcmVjdGlvbic6IGdldERpcmVjdGlvbixcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUsXHJcbiAgICAnY2xvbmUnOiBjbG9uZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsInZhciByZXNvdXJjZUNhY2hlID0ge307XHJcbnZhciByZWFkeUNhbGxiYWNrO1xyXG5cclxuLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG5mdW5jdGlvbiBsb2FkKHVybE9yQXJyKSB7XHJcbiAgICBpZiAodXJsT3JBcnIgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHVybE9yQXJyLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBfbG9hZCh1cmwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX2xvYWQodXJsT3JBcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfbG9hZCh1cmwpIHtcclxuICAgIGlmIChyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGltZztcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5Q2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBmYWxzZTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gICAgdmFyIHJlYWR5ID0gdHJ1ZTtcclxuICAgIGZvciAodmFyIGsgaW4gcmVzb3VyY2VDYWNoZSkge1xyXG4gICAgICAgIGlmIChyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgIHJlYWR5Q2FsbGJhY2sgPSBmdW5jO1xyXG59XHJcblxyXG52YXIgcmVzb3VyY2VzID0ge1xyXG4gICAgbG9hZDogbG9hZCxcclxuICAgIGdldDogZ2V0LFxyXG4gICAgb25SZWFkeTogb25SZWFkeSxcclxuICAgIGlzUmVhZHk6IGlzUmVhZHlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc291cmNlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVzb3VyY2VzLmpzXG4gKiovIiwiZnVuY3Rpb24gbW91c2UoY2FudmFzKSB7XHJcbiAgICAgICAgLy8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG4gICAgICAgIC8vIEJFR0lOIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExNDQ2NS9nZXR0aW5nLW1vdXNlLWxvY2F0aW9uLWluLWNhbnZhc1xyXG4gICAgdmFyIHN0eWxlUGFkZGluZ0xlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdMZWZ0J10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlUGFkZGluZ1RvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ1RvcCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlckxlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlckxlZnRXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlclRvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyVG9wV2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgLy8gU29tZSBwYWdlcyBoYXZlIGZpeGVkLXBvc2l0aW9uIGJhcnMgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcikgYXQgdGhlIHRvcCBvciBsZWZ0IG9mIHRoZSBwYWdlXHJcbiAgICAgICAgLy8gVGhleSB3aWxsIG1lc3MgdXAgbW91c2UgY29vcmRpbmF0ZXMgYW5kIHRoaXMgZml4ZXMgdGhhdFxyXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUsXHJcbiAgICAgICAgaHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG4gICAgICAgIGh0bWxMZWZ0ID0gaHRtbC5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgcG9zID0gZ2V0UHJvcGVyUG9zaXRpb24oZSk7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uLnggPSBwb3MueDtcclxuICAgICAgICBwb3NpdGlvbi55ID0gcG9zLnk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVyUG9zaXRpb24oZSkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gY2FudmFzLFxyXG4gICAgICAgICAgICBvZmZzZXRYID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IDAsXHJcbiAgICAgICAgICAgIG14LCBteTtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgdG90YWwgb2Zmc2V0LiBJdCdzIHBvc3NpYmxlIHRvIGNhY2hlIHRoaXMgaWYgeW91IHdhbnRcclxuICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBwYWRkaW5nIGFuZCBib3JkZXIgc3R5bGUgd2lkdGhzIHRvIG9mZnNldFxyXG4gICAgICAgIC8vIEFsc28gYWRkIHRoZSA8aHRtbD4gb2Zmc2V0cyBpbiBjYXNlIHRoZXJlJ3MgYSBwb3NpdGlvbjpmaXhlZCBiYXIgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcilcclxuICAgICAgICAvLyBUaGlzIHBhcnQgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSwgaXQgZGVwZW5kcyBvbiB5b3VyIHN0eWxpbmdcclxuICAgICAgICBvZmZzZXRYICs9IHN0eWxlUGFkZGluZ0xlZnQgKyBzdHlsZUJvcmRlckxlZnQgKyBodG1sTGVmdDtcclxuICAgICAgICBvZmZzZXRZICs9IHN0eWxlUGFkZGluZ1RvcCArIHN0eWxlQm9yZGVyVG9wICsgaHRtbFRvcDtcclxuXHJcbiAgICAgICAgbXggPSBlLnBhZ2VYIC0gb2Zmc2V0WDtcclxuICAgICAgICBteSA9IGUucGFnZVkgLSBvZmZzZXRZO1xyXG5cclxuICAgICAgICAvLyBXZSByZXR1cm4gYSBzaW1wbGUgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCB4IGFuZCB5IGRlZmluZWRcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBteCxcclxuICAgICAgICAgICAgeTogbXlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNNb3VzZURvd24gOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTW91c2VEb3duO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TW91c2VQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vdXNlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9tb3VzZS5qc1xuICoqLyIsInZhciBwcmVzc2VkS2V5cyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gc2V0S2V5KGV2ZW50LCBzdGF0dXMpIHtcclxuICAgIHByZXNzZWRLZXlzW2V2ZW50LmtleUNvZGVdID0gc3RhdHVzO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCB0cnVlKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBzZXRLZXkoZSwgZmFsc2UpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcHJlc3NlZEtleXMgPSB7fTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiByZXNldCgpIHtcclxuICAgIHByZXNzZWRLZXlzID0ge307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRG93bihrZXkpIHtcclxuICAgIHJldHVybiBwcmVzc2VkS2V5c1trZXldO1xyXG59XHJcblxyXG52YXIgaW5wdXQgPSB7XHJcbiAgICByZXNldDogcmVzZXQsXHJcbiAgICBpc0Rvd246IGlzRG93blxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5wdXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2lucHV0LmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHJlbmRlcnMgZnJvbSAnLi9yZW5kZXJlcnMnO1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmZ1bmN0aW9uIEdhbWVPYmplY3QoY29uZmlnKSB7XHJcbiAgICB0aGlzLnBvcyA9IHV0aWxzLmNsb25lKGNvbmZpZy5wb3MpO1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZCB8fCAoJ29iamVjdCcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIGlmIChjb25maWcuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKGNvbmZpZy5zcHJpdGVbMF0sIGNvbmZpZy5zcHJpdGVbMV0sIGNvbmZpZy5zcHJpdGVbMl0sIGNvbmZpZy5zcHJpdGVbM10sIGNvbmZpZy5zcHJpdGVbNF0sIGNvbmZpZy5zcHJpdGVbNV0sIGNvbmZpZy5zcHJpdGVbNl0sIGNvbmZpZy5zcHJpdGVbN10pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG5cclxuICAgIGlmIChjb25maWcuc2l6ZSB8fCB0aGlzLnNwcml0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlLnNpemU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbGxpc2lvbnMgPSBjb25maWcuY29sbGlzaW9ucztcclxuICAgIHRoaXMuY2FsbGJhY2tzID0gY29uZmlnLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgIHRoaXMuekluZGV4ID0gY29uZmlnLnpJbmRleCB8fCAwO1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gY29uZmlnLnBhcmFtZXRlcnM7XHJcbiAgICB0aGlzLnJ1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZmlnLmNvbmRpdGlvbnMgfHwgW107XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgaWYgKGNvbmZpZy5yZW5kZXIpIHtcclxuICAgICAgICBpZiAocmVuZGVyc1tjb25maWcucmVuZGVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJlbmRlciA9IHJlbmRlcnNbY29uZmlnLnJlbmRlcl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gdGhpcy5sYXllci5jdHg7XHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0pO1xyXG5cclxuICAgIGlmICh0aGlzLmN1c3RvbVJlbmRlcikge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tUmVuZGVyKHRoaXMsIGR0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHQgJiYgdGhpcy5zcHJpdGUudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLnNwcml0ZS5yZW5kZXIoY3R4KTtcclxuICAgIH1cclxuXHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXMsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbnMgPSB0aGlzLmNvbmRpdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMucnVsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gbmV3IEdhbWVSdWxlKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bJ2NvbGxpc2lvbnMnXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucy5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBydWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bcnVsZXNbaV1dKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY29uZGl0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb25kaXRpb24odGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvbltjb25kaXRpb25zW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGVDb25kaXRpb25zID0gZnVuY3Rpb24oZHQpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb25kaXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fcmVtb3ZlSW5OZXh0VGljaykge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY29sbGlzaW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmdhbWUuY29sbGlzaW9ucy5yZW1vdmVPYmplY3QodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5ZXIucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUluTmV4dFRpY2sgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgIHRoaXMucG9zWzBdID0gcG9pbnRbMF07XHJcbiAgICB0aGlzLnBvc1sxXSA9IHBvaW50WzFdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS50cmlnZ2VyQWN0aW9uID0gZnVuY3Rpb24gKGFjdGlvbiwgZXZlbnQsIG1vdXNlKSB7XHJcbiAgICB2YXIgb2JqZWN0ID0gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0hpdEJveChtb3VzZSkge1xyXG4gICAgICAgIHZhciBmbGFnO1xyXG5cclxuICAgICAgICAob2JqZWN0LnBvc1swXSA8IG1vdXNlLngpICYmIChvYmplY3QucG9zWzBdICsgb2JqZWN0LnNwcml0ZS5zaXplWzBdID4gbW91c2UueCkgJiYgKG9iamVjdC5wb3NbMV0gPCBtb3VzZS55KSAmJiAob2JqZWN0LnBvc1sxXSArIG9iamVjdC5zcHJpdGUuc2l6ZVsxXSA+IG1vdXNlLnkpICYmIChmbGFnID0gdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydjbGljayddICYmIGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21vdXNlbW92ZScgOlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10gJiYgY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10gJiYgIWNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2VsZWF2ZSddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MuaGFzT3duUHJvcGVydHkoYWN0aW9uKSAmJiB0aGlzLmNhbGxiYWNrc1thY3Rpb25dKHRoaXMsIGV2ZW50KVxyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZENvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLmNvbmRpdGlvbnMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvbmRpdGlvbiA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG4gICAgICAgIGNvbmRpdGlvbi5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIGNvbmRpdGlvbi5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25zLnB1c2goY29uZGl0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGVDb2xsaXNpb25zID0gZnVuY3Rpb24oZHQpIHtcclxuICAgIHRoaXMuY29sbGlzaW9ucyAmJiB0aGlzLmNvbGxpc2lvbnMudXBkYXRlKGR0LCB0aGlzKTtcclxufTtcclxuZnVuY3Rpb24gR2FtZVJ1bGUoY29uZmlnKSB7XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkO1xyXG4gICAgdGhpcy5fdXBkYXRlID0gY29uZmlnLnVwZGF0ZTtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG4gICAgdGhpcy5fcGFyYW1ldGVycyA9IHV0aWxzLmNsb25lKHRoaXMucGFyYW1ldGVycyk7XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVSdWxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICB0aGlzLl91cGRhdGUgJiYgdGhpcy5fdXBkYXRlKGR0LCBvYmopO1xyXG59O1xyXG5HYW1lUnVsZS5wcm90b3R5cGUuc2V0Q29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZUxheWVyKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMuZ2FtZSA9IGNvbmZpZy5nYW1lO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5jdHguY3JlYXRlUGF0dGVybihyZXNvdXJjZXMuZ2V0KGNvbmZpZy5iYWNrZ3JvdW5kKSwgJ3JlcGVhdCcpO1xyXG4gICAgdGhpcy5wb3MgPSBjb25maWcucG9zIHx8IFswLCAwXTtcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IFtjb25maWcuY3R4LmNhbnZhcy53aWR0aCwgY29uZmlnLmN0eC5jYW52YXMuaGVpZ2h0XTtcclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgdGhpcy5vYmplY3RzID0ge307XHJcbiAgICB0aGlzLl9ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZUxheWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcztcclxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgYXJyID0gW10sXHJcbiAgICAgICAgY3R4ID0gdGhpcy5jdHgsXHJcbiAgICAgICAgY2FudmFzID0gY3R4LmNhbnZhcztcclxuXHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbiAgICBjdHguY2xpcCgpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdKSB8fCAoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdID0gW10pO1xyXG4gICAgICAgICAgICBhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0ucHVzaCh0aGlzLm9iamVjdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnJbaV0pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBhcnJbaV0ubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbaV1bal0ucmVuZGVyKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcclxuICAgIGN0eC5zaGFkb3dDb2xvciA9ICdibGFjayc7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRYID0gMDtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRZID0gMDtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlQ29sbGlzaW9ucyhkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nYW1lLmNvbGxpc2lvbnMudXBkYXRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNbaV0udXBkYXRlQ29uZGl0aW9ucyhkdCk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaWRdLmxheWVyID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlT2JqZWN0ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHNbaWRdLnR5cGUgJiYgdGhpcy5vYmplY3RzW2lkXS50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdHNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09iamVjdCB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyOiAnLCBjb25maWcuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbmZpZy5pZCA9IGNvbmZpZy5pZCArIE1hdGgucm91bmQoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkgKiAxMDAwMDAxKTtcclxuXHJcbiAgICB2YXIgX29iaiA9IG5ldyBHYW1lT2JqZWN0KGNvbmZpZyk7XHJcbiAgICBfb2JqLnNldExheWVyKHRoaXMpO1xyXG4gICAgX29iai5pbml0KCk7XHJcbiAgICBpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgKCF0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdKSAmJiAodGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSA9IFtdKTtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goY29uZmlnLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10ucHVzaChjb25maWcuaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vYmplY3RzW2NvbmZpZy5pZF0gPSBfb2JqO1xyXG5cclxuXHJcbiAgICByZXR1cm4gdGhpcy5vYmplY3RzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IG9iai5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPYmplY3Qob2JqW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZE9iamVjdHMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRPYmplY3RzQnlUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgIHZhciBvYmplY3RzSWQgPSB0aGlzLnNvcnRlZE9iamVjdHNbdHlwZV0gfHwgW10sXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNJZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICByZXN1bHQucHVzaCh0aGlzLm9iamVjdHNbb2JqZWN0c0lkW2ldXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMub2JqZWN0c1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdXHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5ydWxlc1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuZ2V0Q29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5wb3NbMF0gKyB0aGlzLnNpemVbMF0sIHRoaXMucG9zWzFdICsgdGhpcy5zaXplWzFdXTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVXaW5kb3coY29uZmlnKSB7XHJcbiAgICB0aGlzLmxheWVycyA9IHt9O1xyXG4gICAgdGhpcy5jdHggPSBjb25maWcuY3R4O1xyXG4gICAgdGhpcy5jYW52YXMgPSBjb25maWcuY2FudmFzO1xyXG4gICAgdGhpcy5jb2xsaXNpb25zID0gY29uZmlnLmNvbGxpc2lvbnM7XHJcbiAgICB0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcbiAgICB0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuICAgIHRoaXMubGF5ZXJzRGVmaW5pdGlvbiA9IGNvbmZpZy5sYXllcnM7XHJcbiAgICB0aGlzLmlucHV0ID0gY29uZmlnLmlucHV0O1xyXG4gICAgdGhpcy5tb3VzZSA9IGNvbmZpZy5tb3VzZTtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50T2JqZWN0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSA/IHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ubGVuZ3RoIDogMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnVwZGF0ZShkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnJlbmRlcihkdCk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXJzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmFkZExheWVyKG9ialtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkTGF5ZXJzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmICh0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShvYmouaWQpKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTGF5ZXIgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyB3aW5kb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9iai5jdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBvYmouZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sYXllcnNbb2JqLmlkXSA9IG5ldyBHYW1lTGF5ZXIob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNbb2JqLmlkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuY2xvbmUodGhpcy5vYmplY3RzRGVmaW5pdGlvbltpZF0pO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllckNvbmZpZyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lV2luZG93XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL29iamVjdHMuanNcbiAqKi8iLCJmdW5jdGlvbiB0ZXh0UmVuZGVyKG9iaikge1xyXG4gICAgdmFyIGN0eCA9IG9iai5sYXllci5jdHgsXHJcbiAgICAgICAgZm9udENvbmZpZyA9ICcnO1xyXG5cclxuICAgIChvYmoucGFyYW1ldGVycy5zdHlsZSkgJiYgKGZvbnRDb25maWcgKz0gb2JqLnBhcmFtZXRlcnMuc3R5bGUgKyBcIiBcIik7XHJcbiAgICAob2JqLnBhcmFtZXRlcnMud2VpZ2h0KSAmJiAoZm9udENvbmZpZyArPSBvYmoucGFyYW1ldGVycy53ZWlnaHQgKyBcIiBcIik7XHJcbiAgICBmb250Q29uZmlnICs9IChvYmoucGFyYW1ldGVycy5zaXplIHx8IDMwKSArICdwdCAnO1xyXG4gICAgZm9udENvbmZpZyArPSAob2JqLnBhcmFtZXRlcnMuZm9udCB8fCBcIkFyaWFsXCIpO1xyXG5cclxuICAgIGlmIChvYmoucGFyYW1ldGVycy5hbGlnbikge1xyXG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBvYmoucGFyYW1ldGVycy5hbGlnbjtcclxuICAgIH1cclxuXHJcbiAgICBjdHguZm9udCA9IGZvbnRDb25maWc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gb2JqLnBhcmFtZXRlcnMuY29sb3IgfHwgXCIjRkZGXCI7XHJcbiAgICBjdHguZmlsbFRleHQob2JqLnBhcmFtZXRlcnMudGV4dCwgb2JqLnBvc1swXSwgb2JqLnBvc1sxXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuaXRSZW5kZXJlcihvYmosIGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gb2JqLmxheWVyLmN0eCxcclxuICAgICAgICB4ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgKSxcclxuICAgICAgICB5ID0gTWF0aC5yb3VuZCgtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgIC0gNyksXHJcbiAgICAgICAgd2lkdGggPSBvYmouc3ByaXRlLnNpemVbMF0sXHJcbiAgICAgICAgaGVpZ2h0ID0gMztcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcclxuXHJcbiAgICBpZiAoKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA+IDApICYmIChvYmouX3BhcmFtZXRlcnMuaGVhbHRoID4gb2JqLnBhcmFtZXRlcnMuaGVhbHRoKSkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigyNTAsIDAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAyNTAsIDApXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIE1hdGgucm91bmQod2lkdGggKiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIC8gb2JqLl9wYXJhbWV0ZXJzLmhlYWx0aCkpLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICBkdCAmJiBvYmouc3ByaXRlLnVwZGF0ZShkdCk7XHJcbiAgICBvYmouc3ByaXRlLnJlbmRlcihjdHgpO1xyXG59XHJcbnZhciByZW5kZXJzID0ge1xyXG4gICAgdGV4dDogdGV4dFJlbmRlcixcclxuICAgIHVuaXQ6IHVuaXRSZW5kZXJlclxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVycztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVuZGVyZXJzLmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuXHJcbmZ1bmN0aW9uIFNwcml0ZSh1cmwsIHBvcywgc2l6ZSwgc3BlZWQsIGZyYW1lcywgZGlyLCBvbmNlLCBkZWdyZWUpIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMuc3BlZWQgPSB0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInID8gc3BlZWQgOiAwO1xyXG4gICAgdGhpcy5mcmFtZXMgPSB1dGlscy5jbG9uZShmcmFtZXMpO1xyXG4gICAgdGhpcy5faW5kZXggPSAwO1xyXG4gICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB0aGlzLmRpciA9IGRpciB8fCAnaG9yaXpvbnRhbCc7XHJcbiAgICB0aGlzLm9uY2UgPSBvbmNlO1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWUgfHwgMDtcclxufVxyXG5cclxuXHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB0aGlzLl9pbmRleCArPSB0aGlzLnNwZWVkICogZHQ7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5wb3MgJiYgKHRoaXMucG9zID0gY29uZmlnLnBvcyk7XHJcbiAgICAgICAgY29uZmlnLnNpemUgJiYgKHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplKTtcclxuICAgICAgICBjb25maWcuc3BlZWQgJiYgKHRoaXMuc3BlZWQgPSB0eXBlb2YgY29uZmlnLnNwZWVkID09PSAnbnVtYmVyJyA/IGNvbmZpZy5zcGVlZCA6IDApO1xyXG4gICAgICAgIGNvbmZpZy5mcmFtZXMgJiYgKHRoaXMuZnJhbWVzID0gY29uZmlnLmZyYW1lcyk7XHJcbiAgICAgICAgY29uZmlnLnVybCAmJiAodGhpcy51cmwgPSBjb25maWcudXJsKTtcclxuICAgICAgICBjb25maWcuZGlyICYmICh0aGlzLmRpciA9IGNvbmZpZy5kaXIpO1xyXG4gICAgICAgIGNvbmZpZy5vbmNlICYmICh0aGlzLm9uY2UgPSBjb25maWcub25jZSk7XHJcbiAgICAgICAgY29uZmlnLmRlZ3JlZSAmJiAodGhpcy5kZWdyZWUgPSBjb25maWcuZGVncmVlKTtcclxuICAgIH1cclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yb3RhdGVUb0RpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgIHZhciBwb3MgPSB0aGlzLmRlZmF1bHRQb3NpdGlvbixcclxuICAgICAgICBjb25maWcgPSB7fTtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uLmRpciA9PSAxKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChjb25maWcucG9zID0gW3Bvc1swXSwgcG9zWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChjb25maWcucG9zID0gW3Bvc1swXSwgcG9zWzFdICsgMiAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoY29uZmlnLnBvcyA9W3Bvc1swXSwgcG9zWzFdICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24uZGlyID09IC0xKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChjb25maWcucG9zID1bcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChjb25maWcucG9zID1bcG9zWzBdLCBwb3NbMV0gKyB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPCAtMSkgJiYgKGNvbmZpZy5wb3MgPSBbcG9zWzBdLCBwb3NbMV1dKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUNvbmZpZyhjb25maWcpO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjdHgpIHtcclxuICAgIHZhciBmcmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcclxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBpZHggPSBNYXRoLmZsb29yKHRoaXMuX2luZGV4KTtcclxuICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWVzW2lkeCAlIG1heF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uY2UgJiYgaWR4ID49IG1heCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZnJhbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgeCA9IHRoaXMucG9zWzBdO1xyXG4gICAgdmFyIHkgPSB0aGlzLnBvc1sxXTtcclxuXHJcbiAgICBpZiAodGhpcy5kaXIgPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHkgKz0gZnJhbWUgKiB0aGlzLnNpemVbMV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB4ICs9IGZyYW1lICogdGhpcy5zaXplWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGN0eC5yb3RhdGUodGhpcy5kZWdyZWUpO1xyXG4gICAgY3R4LmRyYXdJbWFnZShyZXNvdXJjZXMuZ2V0KHRoaXMudXJsKSxcclxuICAgICAgICB4LCB5LFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdLFxyXG4gICAgICAgIE1hdGgucm91bmQoLXRoaXMuc2l6ZVswXSAvIDIpLCBNYXRoLnJvdW5kKC10aGlzLnNpemVbMV0gLyAyKSxcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUuc2V0RGVncmVlID0gZnVuY3Rpb24gKGRlZ3JlZSkge1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3Nwcml0ZS5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGUoY29uZmlnKSB7XHJcbiAgICB2YXIgbiA9IGNvbmZpZy5uIHx8IDYsXHJcbiAgICAgICAgd2lkdGggPSBjb25maWcud2lkdGggfHwgODAwLFxyXG4gICAgICAgIGhlaWdodCA9IGNvbmZpZy5oZWlnaHQgfHwgNjAwLFxyXG4gICAgICAgIHNpemVYID0gd2lkdGggPj4gbixcclxuICAgICAgICBzaXplWSA9IGhlaWdodCA+PiBuLFxyXG4gICAgICAgIGNlbGxHcmlkID0gbmV3IEFycmF5KHNpemVYICogc2l6ZVkpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbEdyaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjZWxsR3JpZFtpXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsR3JpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjZWxsR3JpZFtpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldENlbGwocG9pbnQpIHtcclxuICAgICAgICByZXR1cm4gcG9pbnRbMF0gKyBwb2ludFsxXSAqIHNpemVZO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZU9iamVjdChvYmplY3Qpe1xyXG4gICAgICAgIHZhciBvbGRDZWxscyA9IG9iamVjdC5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMuY2VsbHM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb2xkQ2VsbHNbaV0gJiYgY2VsbEdyaWRbb2xkQ2VsbHNbaV1dLnNwbGljZShjZWxsR3JpZFtvbGRDZWxsc1tpXV0uaW5kZXhPZihvYmplY3QpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tQbGFjZShvYmplY3QpIHtcclxuICAgICAgICB2YXIgcG9zID0gb2JqZWN0LnBvcyxcclxuICAgICAgICAgICAgc2l6ZSA9IG9iamVjdC5zaXplLFxyXG4gICAgICAgICAgICBwb2ludDEgPSBbcG9zWzBdICsgc2l6ZVswXSAvIDIgPj4gbiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIgPj4gbl0sXHJcbiAgICAgICAgICAgIHBvaW50MiA9IFtwb3NbMF0gLSBzaXplWzBdIC8gMiA+PiBuLCBwb3NbMV0gLSBzaXplWzFdIC8gMiA+PiBuXSxcclxuICAgICAgICAgICAgcG9pbnQzID0gW3Bvc1swXSArIHNpemVbMF0gLyAyID4+IG4sIHBvc1sxXSAtIHNpemVbMV0gLyAyID4+IG5dLFxyXG4gICAgICAgICAgICBwb2ludDQgPSBbcG9zWzBdIC0gc2l6ZVswXSAvIDIgPj4gbiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIgPj4gbl0sXHJcbiAgICAgICAgICAgIGNlbGxzID0gW2dldENlbGwocG9pbnQxKSwgZ2V0Q2VsbChwb2ludDIpLCBnZXRDZWxsKHBvaW50MyksIGdldENlbGwocG9pbnQ0KV0sXHJcbiAgICAgICAgICAgIG9sZENlbGxzID0gb2JqZWN0LnBhcmFtZXRlcnMuY29sbGlzaW9ucy5jZWxscztcclxuXHJcbiAgICAgICAgaWYgKHBvaW50MVswXSA8IDAgfHwgcG9pbnQxWzFdIDwgMCB8fCBwb2ludDJbMF0gPCAwIHx8IHBvaW50MlsxXSA8IDAgfHwgcG9pbnQzWzBdIDwgMCB8fCBwb2ludDNbMV0gPCAwIHx8IHBvaW50NFswXSA8MCB8fCBwb2ludDRbMV0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvaW50MVswXSA+IHdpZHRoIHx8IHBvaW50MVsxXSA+IGhlaWdodCB8fCBwb2ludDJbMF0gPiB3aWR0aCB8fCBwb2ludDJbMV0gPiBoZWlnaHQgfHwgcG9pbnQzWzBdID4gd2lkdGggfHwgcG9pbnQzWzFdID4gaGVpZ2h0IHx8IHBvaW50NFswXSA+IHdpZHRoIHx8IHBvaW50NFsxXSA+IGhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG9sZENlbGxzW2ldICE9IGNlbGxzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRDZWxsc1tpXSAmJiBjZWxsR3JpZFtvbGRDZWxsc1tpXV0uc3BsaWNlKGNlbGxHcmlkW29sZENlbGxzW2ldXS5pbmRleE9mKG9iamVjdCksIDEpO1xyXG4gICAgICAgICAgICAgICAgKGNlbGxHcmlkW2NlbGxzW2ldXS5pbmRleE9mKG9iamVjdCkgPT0gLTEpICYmIGNlbGxHcmlkW2NlbGxzW2ldXS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBvbGRDZWxsc1tpXSA9IGNlbGxzW2ldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKGNlbGxHcmlkW2NlbGxzW2ldXS5pbmRleE9mKG9iamVjdCkgPT0gLTEpICYmIGNlbGxHcmlkW2NlbGxzW2ldXS5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNpemVYOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gc2l6ZVk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBjZWxsR3JpZFtnZXRDZWxsKFtpLCBqXSldLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG9iamVjdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gayArIDE7IGwgPCBsZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1trXS5wb3MgJiYgb2JqZWN0c1trXS5zaXplICYmIG9iamVjdHNbbF0ucG9zICYmIG9iamVjdHNbbF0uc2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iamVjdHNba10ucG9zLCBvYmplY3RzW2tdLnNpemUsIG9iamVjdHNbbF0ucG9zLCBvYmplY3RzW2xdLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2tdLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5wdXNoKG9iamVjdHNbbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tsXS5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMucHVzaChvYmplY3RzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNlbGxHcmlkOiBjZWxsR3JpZCxcclxuICAgICAgICBjaGVja1BsYWNlOiBjaGVja1BsYWNlLFxyXG4gICAgICAgIHJlbW92ZU9iamVjdDogcmVtb3ZlT2JqZWN0LFxyXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgIGNsZWFyOiBnZW5lcmF0ZU1hcFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2NvbGxpc2lvbnMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkhBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekRBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=