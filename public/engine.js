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

