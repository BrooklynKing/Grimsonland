var engine =
webpackJsonp_name_([1],[
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
/* 3 */,
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

	var input = {
	    isDown: function isDown(key) {
	        return pressedKeys[key];
	    }
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

	var _sprite = __webpack_require__(11);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function GameObject(config) {
	    this.pos = _utils2.default.clone(config.pos);
	    this.id = config.id || 'object' + this.pos[0] + this.pos[1];
	    this.sprite = new _sprite2.default(config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
	    this.type = config.type;
	    this.size = config.size || this.sprite.size;

	    this.callbacks = config.callbacks || {};
	    this.zIndex = config.zIndex || 0;
	    this.parameters = config.parameters && _utils2.default.clone(config.parameters) || {};

	    this.rules = config.rules || [];
	    this._update = config.update;
	    this.customRender = config.render;
	    this._init = config.init;

	    this.inited = false;
	}
	GameObject.prototype.render = function (dt) {
	    var ctx = this.layer.ctx;
	    ctx.save();
	    if (this.customRender) {
	        this.customRender(dt);
	    } else {
	        ctx.translate(this.pos[0], this.pos[1]);
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
	    this.logicDefinition = config.logic;
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
	    var obj = _utils2.default.clone(this.objectsDefinition[id]),
	        logic = this.logicDefinition[id];

	    for (var i in logic) {
	        logic.hasOwnProperty(i) && (obj[i] = logic[i]);
	    }

	    return obj;
	};
	GameWindow.prototype.getLayerConfig = function (id) {
	    var layer = this.layersDefinition[id];

	    return layer;
	};
	exports.default = GameWindow;

/***/ },
/* 11 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Jlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL21vdXNlLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9vYmplY3RzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvc3ByaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbW91c2VNb2R1bGUgZnJvbSAnLi9tb3VzZSc7XHJcbmltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcclxuaW1wb3J0IEdhbWVXaW5kb3cgZnJvbSAnLi9vYmplY3RzJztcclxuXHJcbi8vIEEgY3Jvc3MtYnJvd3NlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuLy8gU2VlIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMS8wOC9hbmltYXRpbmctd2l0aC1qYXZhc2NyaXB0LWZyb20tc2V0aW50ZXJ2YWwtdG8tcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xyXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gbG9hZFJlc291cmNlcyhsaXN0LCBjYWxsYmFjaykge1xyXG4gICAgcmVzb3VyY2VzLmxvYWQobGlzdCk7XHJcblxyXG4gICAgLy9UaGlzIG9uZSBpcyBtb2NrIGZvciBBSkFYLCBpZiB3ZSB3aWxsIGhhdmUgcmVhbCBBSkFYLCB3ZSBqdXN0IG5lZWQgdG8gcHV0IHRoaXMgb25lIGludG8gY2FsbGJhY2sgd2l0aG91dCB0aW1lb3V0XHJcbiAgICByZXNvdXJjZXMub25SZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR2FtZShjb25maWcpIHtcclxuICAgIHZhciBjYW52YXMgPSBjb25maWcuY2FudmFzLFxyXG4gICAgICAgIGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICB2YXIgbW91c2UgPSBtb3VzZU1vZHVsZShjYW52YXMpO1xyXG5cclxuICAgIGNvbmZpZy5pbnB1dCA9IGlucHV0O1xyXG4gICAgY29uZmlnLm1vdXNlID0gbW91c2U7XHJcblxyXG4gICAgdmFyIGdhbWUgPSBuZXcgR2FtZVdpbmRvdyhjb25maWcpO1xyXG5cclxuICAgIC8qYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZ2FtZS50cmlnZ2VyR2xvYmFsRXZlbnQoJ2VjbGljaycsIGUsIG1vdXNlLmdldE1vdXNlUG9zaXRpb24oZSkpO1xyXG4gICAgfSk7XHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uID0gbW91c2UuZ2V0TW91c2VQb3NpdGlvbihlKTtcclxuICAgIH0pOyovXHJcblxyXG4gICAgZnVuY3Rpb24gZ2FtZVRpbWVyKCkge1xyXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBkdCA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwLjA7XHJcblxyXG4gICAgICAgIGdhbWUudXBkYXRlKGR0KTtcclxuICAgICAgICBnYW1lLnJlbmRlcihkdCk7XHJcblxyXG4gICAgICAgIGxhc3RUaW1lID0gbm93O1xyXG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUoZ2FtZVRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0R2FtZSgpIHtcclxuICAgICAgICBsb2FkUmVzb3VyY2VzKGNvbmZpZy5yZXNvdXJjZXMsICgpID0+IHtcclxuICAgICAgICAgICAgZ2FtZS5pbml0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUoZ2FtZVRpbWVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW9kZWw6IGdhbWUsXHJcbiAgICAgICAgaW5pdDogaW5pdEdhbWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbmRleC5qc1xuICoqLyIsInZhciByZXNvdXJjZUNhY2hlID0ge307XHJcbnZhciByZWFkeUNhbGxiYWNrO1xyXG5cclxuLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG5mdW5jdGlvbiBsb2FkKHVybE9yQXJyKSB7XHJcbiAgICBpZiAodXJsT3JBcnIgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHVybE9yQXJyLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBfbG9hZCh1cmwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX2xvYWQodXJsT3JBcnIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfbG9hZCh1cmwpIHtcclxuICAgIGlmIChyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGltZztcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5Q2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXNvdXJjZUNhY2hlW3VybF0gPSBmYWxzZTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gICAgdmFyIHJlYWR5ID0gdHJ1ZTtcclxuICAgIGZvciAodmFyIGsgaW4gcmVzb3VyY2VDYWNoZSkge1xyXG4gICAgICAgIGlmIChyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlYWR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgIHJlYWR5Q2FsbGJhY2sgPSBmdW5jO1xyXG59XHJcblxyXG52YXIgcmVzb3VyY2VzID0ge1xyXG4gICAgbG9hZDogbG9hZCxcclxuICAgIGdldDogZ2V0LFxyXG4gICAgb25SZWFkeTogb25SZWFkeSxcclxuICAgIGlzUmVhZHk6IGlzUmVhZHlcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc291cmNlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVzb3VyY2VzLmpzXG4gKiovIiwiZnVuY3Rpb24gbW91c2UoY2FudmFzKSB7XHJcbiAgICAgICAgLy8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG4gICAgICAgIC8vIEJFR0lOIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExNDQ2NS9nZXR0aW5nLW1vdXNlLWxvY2F0aW9uLWluLWNhbnZhc1xyXG4gICAgdmFyIHN0eWxlUGFkZGluZ0xlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdMZWZ0J10sIDEwKSB8fCAwLFxyXG4gICAgICAgIHN0eWxlUGFkZGluZ1RvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ1RvcCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlckxlZnQgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlckxlZnRXaWR0aCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZUJvcmRlclRvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyVG9wV2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgLy8gU29tZSBwYWdlcyBoYXZlIGZpeGVkLXBvc2l0aW9uIGJhcnMgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcikgYXQgdGhlIHRvcCBvciBsZWZ0IG9mIHRoZSBwYWdlXHJcbiAgICAgICAgLy8gVGhleSB3aWxsIG1lc3MgdXAgbW91c2UgY29vcmRpbmF0ZXMgYW5kIHRoaXMgZml4ZXMgdGhhdFxyXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUsXHJcbiAgICAgICAgaHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG4gICAgICAgIGh0bWxMZWZ0ID0gaHRtbC5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgcG9zID0gZ2V0UHJvcGVyUG9zaXRpb24oZSk7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uLnggPSBwb3MueDtcclxuICAgICAgICBwb3NpdGlvbi55ID0gcG9zLnk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJQb3NpdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjYW52YXMsXHJcbiAgICAgICAgICAgIG9mZnNldFggPSAwLFxyXG4gICAgICAgICAgICBvZmZzZXRZID0gMCxcclxuICAgICAgICAgICAgbXgsIG15O1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlIHRoZSB0b3RhbCBvZmZzZXQuIEl0J3MgcG9zc2libGUgdG8gY2FjaGUgdGhpcyBpZiB5b3Ugd2FudFxyXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBhZGRpbmcgYW5kIGJvcmRlciBzdHlsZSB3aWR0aHMgdG8gb2Zmc2V0XHJcbiAgICAgICAgLy8gQWxzbyBhZGQgdGhlIDxodG1sPiBvZmZzZXRzIGluIGNhc2UgdGhlcmUncyBhIHBvc2l0aW9uOmZpeGVkIGJhciAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKVxyXG4gICAgICAgIC8vIFRoaXMgcGFydCBpcyBub3Qgc3RyaWN0bHkgbmVjZXNzYXJ5LCBpdCBkZXBlbmRzIG9uIHlvdXIgc3R5bGluZ1xyXG4gICAgICAgIG9mZnNldFggKz0gc3R5bGVQYWRkaW5nTGVmdCArIHN0eWxlQm9yZGVyTGVmdCArIGh0bWxMZWZ0O1xyXG4gICAgICAgIG9mZnNldFkgKz0gc3R5bGVQYWRkaW5nVG9wICsgc3R5bGVCb3JkZXJUb3AgKyBodG1sVG9wO1xyXG5cclxuICAgICAgICBteCA9IGUucGFnZVggLSBvZmZzZXRYO1xyXG4gICAgICAgIG15ID0gZS5wYWdlWSAtIG9mZnNldFk7XHJcblxyXG4gICAgICAgIC8vIFdlIHJldHVybiBhIHNpbXBsZSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIHggYW5kIHkgZGVmaW5lZFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG14LFxyXG4gICAgICAgICAgICB5OiBteVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpc01vdXNlRG93biA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNNb3VzZURvd247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRNb3VzZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW91c2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL21vdXNlLmpzXG4gKiovIiwidmFyIHByZXNzZWRLZXlzID0ge307XHJcblxyXG5mdW5jdGlvbiBzZXRLZXkoZXZlbnQsIHN0YXR1cykge1xyXG4gICAgcHJlc3NlZEtleXNbZXZlbnQua2V5Q29kZV0gPSBzdGF0dXM7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgc2V0S2V5KGUsIHRydWUpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHNldEtleShlLCBmYWxzZSk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG59KTtcclxuXHJcbnZhciBpbnB1dCA9IHtcclxuICAgIGlzRG93bjogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiBwcmVzc2VkS2V5c1trZXldO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlucHV0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbnB1dC5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xyXG5cclxuZnVuY3Rpb24gR2FtZU9iamVjdChjb25maWcpIHtcclxuICAgIHRoaXMucG9zID0gdXRpbHMuY2xvbmUoY29uZmlnLnBvcyk7XHJcbiAgICB0aGlzLmlkID0gY29uZmlnLmlkIHx8ICdvYmplY3QnICsgdGhpcy5wb3NbMF0gKyB0aGlzLnBvc1sxXTtcclxuICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZShjb25maWcuc3ByaXRlWzBdLCBjb25maWcuc3ByaXRlWzFdLCBjb25maWcuc3ByaXRlWzJdLCBjb25maWcuc3ByaXRlWzNdLCBjb25maWcuc3ByaXRlWzRdLCBjb25maWcuc3ByaXRlWzVdLCBjb25maWcuc3ByaXRlWzZdLCBjb25maWcuc3ByaXRlWzddKTtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgdGhpcy5zcHJpdGUuc2l6ZTtcclxuXHJcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNvbmZpZy5jYWxsYmFja3MgfHwge307XHJcbiAgICB0aGlzLnpJbmRleCA9IGNvbmZpZy56SW5kZXggfHwgMDtcclxuICAgIHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG5cclxuICAgIHRoaXMucnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcbiAgICB0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG4gICAgdGhpcy5jdXN0b21SZW5kZXIgPSBjb25maWcucmVuZGVyO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cclxuICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICB2YXIgY3R4ID0gdGhpcy5sYXllci5jdHg7XHJcbiAgICBjdHguc2F2ZSgpO1xyXG4gICAgaWYgKHRoaXMuY3VzdG9tUmVuZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jdXN0b21SZW5kZXIoZHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcbiAgICAgICAgZHQgJiYgdGhpcy5zcHJpdGUudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLnNwcml0ZS5yZW5kZXIoY3R4KTtcclxuICAgIH1cclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXM7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5sYXllci5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX3VwZGF0ZSAmJiB0aGlzLl91cGRhdGUoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ydWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9yZW1vdmVJbk5leHRUaWNrKSB7XHJcbiAgICAgICAgdGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlSW5OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy5wb3NbMF0gPSBwb2ludFswXTtcclxuICAgIHRoaXMucG9zWzFdID0gcG9pbnRbMV07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIHZhciBvYmplY3QgPSB0aGlzO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSGl0Qm94KG1vdXNlKSB7XHJcbiAgICAgICAgdmFyIGZsYWcgPSBmYWxzZSxcclxuICAgICAgICAgICAgaGl0Ym94ID0gb2JqZWN0LmhpdGJveCB8fCBvYmplY3Quc3ByaXRlO1xyXG5cclxuICAgICAgICAob2JqZWN0LnBvc1swXSA8IG1vdXNlLngpICYmIChvYmplY3QucG9zWzBdICsgb2JqZWN0LnNwcml0ZS5zaXplWzBdID4gbW91c2UueCkgJiYgKG9iamVjdC5wb3NbMV0gPCBtb3VzZS55KSAmJiAob2JqZWN0LnBvc1sxXSArIG9iamVjdC5zcHJpdGUuc2l6ZVsxXSA+IG1vdXNlLnkpICYmIChmbGFnID0gdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydjbGljayddICYmIGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21vdXNlbW92ZScgOlxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10gJiYgY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10gJiYgIWNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2VsZWF2ZSddKHRoaXMsIGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MuaGFzT3duUHJvcGVydHkoYWN0aW9uKSAmJiB0aGlzLmNhbGxiYWNrc1thY3Rpb25dKHRoaXMsIGV2ZW50KVxyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgaWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuICAgICAgICBydWxlLnNldENvbnRleHQodGhpcyk7XHJcbiAgICAgICAgcnVsZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbiAoY29uZmlncykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlncykpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGNvbmZpZ3MubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZShjb25maWdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZFJ1bGVzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdhbWVSdWxlKGNvbmZpZykge1xyXG4gICAgdGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuICAgIHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSB1dGlscy5jbG9uZSh0aGlzLnBhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG4gICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lUnVsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVSdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgdGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZShkdCwgb2JqKTtcclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnNldENvbnRleHQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVMYXllcihjb25maWcpIHtcclxuICAgIHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbmZpZy5jdHg7XHJcbiAgICB0aGlzLmdhbWUgPSBjb25maWcuZ2FtZTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4ocmVzb3VyY2VzLmdldChjb25maWcuYmFja2dyb3VuZCksICdyZXBlYXQnKTtcclxuICAgIHRoaXMucG9zID0gY29uZmlnLnBvcyB8fCBbMCwgMF07XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCBbY29uZmlnLmN0eC5jYW52YXMud2lkdGgsIGNvbmZpZy5jdHguY2FudmFzLmhlaWdodF07XHJcbiAgICB0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcbiAgICAgICAgJ2RlZmF1bHQnOiBbXVxyXG4gICAgfTtcclxuLy9jdHggPSBjb25maWcuY3R4LFxyXG4gICAgdGhpcy5vYmplY3RzID0ge307XHJcbiAgICB0aGlzLl9ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuICAgIHRoaXMubWFwID0gW107XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICB0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5fcnVsZXM7XHJcbiAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdmFyIGFyciA9IFtdLFxyXG4gICAgICAgIGN0eCA9IHRoaXMuY3R4LFxyXG4gICAgICAgIGNhbnZhcyA9IGN0eC5jYW52YXM7XHJcblxyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LmNsaXAoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmQ7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSkgfHwgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSA9IFtdKTtcclxuICAgICAgICAgICAgYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdLnB1c2godGhpcy5vYmplY3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyW2ldKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gYXJyW2ldLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2ldW2pdLnJlbmRlcihkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcclxuICAgIGN0eC5zaGFkb3dDb2xvciA9ICdibGFjayc7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRYID0gMDtcclxuICAgIGN0eC5zaGFkb3dPZmZzZXRZID0gMDtcclxuICAgIGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5vYmplY3RzW2ldO1xyXG5cclxuICAgICAgICBvYmplY3QudXBkYXRlKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICB0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG4gICAgfVxyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcbiAgICAgICAgcnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG4gICAgICAgIHJ1bGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbiAocnVsZSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocnVsZSkpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHJ1bGUubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUnVsZShydWxlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZFJ1bGVzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcbiAgICB9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlT2JqZWN0ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICBpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1tpZF0ubGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm9iamVjdHNbaWRdLnR5cGUgJiYgdGhpcy5vYmplY3RzW2lkXS50eXBlICE9ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdHNbaWRdO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ09iamVjdCB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyOiAnLCBjb25maWcuaWQpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbmZpZy5pZCA9IGNvbmZpZy5pZCArIE1hdGgucm91bmQoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkgKiAxMDAwMDAxKTtcclxuXHJcbiAgICB2YXIgX29iaiA9IG5ldyBHYW1lT2JqZWN0KGNvbmZpZyk7XHJcbiAgICBfb2JqLnNldExheWVyKHRoaXMpO1xyXG4gICAgX29iai5pbml0KCk7XHJcbiAgICBpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgKCF0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdKSAmJiAodGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSA9IFtdKTtcclxuICAgICAgICB0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goY29uZmlnLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10ucHVzaChjb25maWcuaWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vYmplY3RzW2NvbmZpZy5pZF0gPSBfb2JqO1xyXG5cclxuXHJcbiAgICByZXR1cm4gdGhpcy5vYmplY3RzW2NvbmZpZy5pZF07XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkT2JqZWN0cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IG9iai5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRPYmplY3Qob2JqW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FkZE9iamVjdHMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRPYmplY3RzQnlUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgIHZhciBvYmplY3RzSWQgPSB0aGlzLnNvcnRlZE9iamVjdHNbdHlwZV0gfHwgW10sXHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNJZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICByZXN1bHQucHVzaCh0aGlzLm9iamVjdHNbb2JqZWN0c0lkW2ldXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMub2JqZWN0c1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuICAgIH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMub2JqZWN0c1tpXTtcclxuICAgIH1cclxuICAgIHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IFtdLFxyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG4gICAgICAgIHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgZGVsZXRlIHRoaXMucnVsZXNbaV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMucG9zWzBdICsgdGhpcy5zaXplWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMuc2l6ZVsxXV07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lV2luZG93KGNvbmZpZykge1xyXG4gICAgdGhpcy5sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuICAgIHRoaXMub2JqZWN0c0RlZmluaXRpb24gPSBjb25maWcub2JqZWN0cztcclxuICAgIHRoaXMubG9naWNEZWZpbml0aW9uID0gY29uZmlnLmxvZ2ljO1xyXG4gICAgdGhpcy5ydWxlc0RlZmluaXRpb24gPSBjb25maWcucnVsZXM7XHJcbiAgICB0aGlzLmxheWVyc0RlZmluaXRpb24gPSBjb25maWcubGF5ZXJzO1xyXG4gICAgdGhpcy5pbnB1dCA9IGNvbmZpZy5pbnB1dDtcclxuICAgIHRoaXMubW91c2UgPSBjb25maWcubW91c2U7XHJcbiAgICB0aGlzLl9oYW5kbGVycyA9IHt9O1xyXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0ge307XHJcbiAgICB0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcbn1cclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG59O1xyXG5cclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYmluZEdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG4gICAgKCF0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKSAmJiAodGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdKTtcclxuICAgIHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckdsb2JhbEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRPYmplY3QpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0pID8gdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXS5sZW5ndGggOiAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG4gICAgfVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0udXBkYXRlKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGR0KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0ucmVuZGVyKGR0KTtcclxuICAgIH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUucmVtb3ZlTGF5ZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGlkKSAmJiBkZWxldGUgdGhpcy5sYXllcnNbaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllcnMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgYXJyID0gW107XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuYWRkTGF5ZXIob2JqW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdhZGRMYXllcnMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KG9iai5pZCkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdMYXllciB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIHdpbmRvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqLmN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIG9iai5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLmxheWVyc1tvYmouaWRdID0gbmV3IEdhbWVMYXllcihvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxheWVyc1tvYmouaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBvYmogPSB1dGlscy5jbG9uZSh0aGlzLm9iamVjdHNEZWZpbml0aW9uW2lkXSksXHJcbiAgICAgICAgbG9naWMgPSB0aGlzLmxvZ2ljRGVmaW5pdGlvbltpZF07XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBsb2dpYykge1xyXG4gICAgICAgIGxvZ2ljLmhhc093blByb3BlcnR5KGkpICYmIChvYmpbaV0gPSBsb2dpY1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXJDb25maWcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBsYXllciA9IHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcblxyXG4gICAgcmV0dXJuIGxheWVyO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBHYW1lV2luZG93XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL29iamVjdHMuanNcbiAqKi8iLCJpbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuXHJcbmZ1bmN0aW9uIFNwcml0ZSh1cmwsIHBvcywgc2l6ZSwgc3BlZWQsIGZyYW1lcywgZGlyLCBvbmNlLCBkZWdyZWUpIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy5kZWZhdWx0UG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMuc3BlZWQgPSB0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInID8gc3BlZWQgOiAwO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICB0aGlzLnVybCA9IHVybDtcclxuICAgIHRoaXMuZGlyID0gZGlyIHx8ICdob3Jpem9udGFsJztcclxuICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZSB8fCAwO1xyXG59XHJcblxyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpIHtcclxuICAgIHRoaXMuX2luZGV4ICs9IHRoaXMuc3BlZWQgKiBkdDtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGVDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnBvcyAmJiAodGhpcy5wb3MgPSBjb25maWcucG9zKTtcclxuICAgICAgICBjb25maWcuc2l6ZSAmJiAodGhpcy5zaXplID0gY29uZmlnLnNpemUpO1xyXG4gICAgICAgIGNvbmZpZy5zcGVlZCAmJiAodGhpcy5zcGVlZCA9IHR5cGVvZiBjb25maWcuc3BlZWQgPT09ICdudW1iZXInID8gY29uZmlnLnNwZWVkIDogMCk7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lcyAmJiAodGhpcy5mcmFtZXMgPSBjb25maWcuZnJhbWVzKTtcclxuICAgICAgICBjb25maWcudXJsICYmICh0aGlzLnVybCA9IGNvbmZpZy51cmwpO1xyXG4gICAgICAgIGNvbmZpZy5kaXIgJiYgKHRoaXMuZGlyID0gY29uZmlnLmRpcik7XHJcbiAgICAgICAgY29uZmlnLm9uY2UgJiYgKHRoaXMub25jZSA9IGNvbmZpZy5vbmNlKTtcclxuICAgICAgICBjb25maWcuZGVncmVlICYmICh0aGlzLmRlZ3JlZSA9IGNvbmZpZy5kZWdyZWUpO1xyXG4gICAgfVxyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJvdGF0ZVRvRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgdmFyIHBvcyA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uLFxyXG4gICAgICAgIHNwcml0ZVBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uLmRpciA9PSAxKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uLmRpciA9PSAtMSkge1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV1dKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7XHJcbiAgICAgICAgJ3Bvcyc6IHNwcml0ZVBvc2l0aW9uXHJcbiAgICB9KTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICB2YXIgZnJhbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XHJcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbmRleCk7XHJcbiAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lc1tpZHggJSBtYXhdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbmNlICYmIGlkeCA+PSBtYXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHggPSB0aGlzLnBvc1swXTtcclxuICAgIHZhciB5ID0gdGhpcy5wb3NbMV07XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB5ICs9IGZyYW1lICogdGhpcy5zaXplWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeCArPSBmcmFtZSAqIHRoaXMuc2l6ZVswXTtcclxuICAgIH1cclxuICAgIGN0eC5yb3RhdGUodGhpcy5kZWdyZWUpO1xyXG4gICAgY3R4LmRyYXdJbWFnZShyZXNvdXJjZXMuZ2V0KHRoaXMudXJsKSxcclxuICAgICAgICB4LCB5LFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdLFxyXG4gICAgICAgIC10aGlzLnNpemVbMF0gLyAyLCAtdGhpcy5zaXplWzFdIC8gMixcclxuICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUuc2V0ZGVncmVlID0gZnVuY3Rpb24gKGRlZ3JlZSkge1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3Nwcml0ZS5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFEQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9