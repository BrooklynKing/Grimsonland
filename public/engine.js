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
	        ctx = config.ctx,
	        lastTime = 0;

	    var game = new _objects2.default(config),
	        mouse = (0, _mouse2.default)(canvas),
	        input = (0, _input2.default)(game);

	    canvas.addEventListener('click', function (e) {
	        game.triggerAction('eclick', e, mouse.getMousePosition(e));
	    });
	    canvas.addEventListener('mousemove', function (e) {
	        game.parameters.mouseposition = mouse.getMousePosition(e);
	    });

	    function gameTimer() {
	        var now = Date.now(),
	            dt = (now - lastTime) / 1000.0;

	        input.triggerGameActions(dt);
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
	var resources = (function () {
	    var resourceCache = {};
	    var loading = [];
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

	    return {
	        load: load,
	        get: get,
	        onReady: onReady,
	        isReady: isReady
	    };
	})();

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
	        htmlLeft = html.offsetLeft;

	    function getMousePosition(e) {
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
	    };
	    return {
	        'getMousePosition': getMousePosition
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
	function input(game) {
	    var pressedKeys = {},
	        currentGame = game;

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

	    return {
	        isDown: function isDown(key) {
	            return pressedKeys[key];
	        },

	        triggerGameActions: function triggerGameActions(frameTime) {
	            for (var i in pressedKeys) {
	                if (pressedKeys.hasOwnProperty(i)) {
	                    if (pressedKeys[i]) {
	                        currentGame.triggerAction('key_' + i, { 'dt': frameTime, 'keyStatus': true });
	                    } else {
	                        currentGame.triggerAction('key_' + i, { 'dt': frameTime, 'keyStatus': false });
	                        delete pressedKeys[i];
	                    }
	                }
	            }
	        }
	    };
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
		this._parameters = _utils2.default.clone(this.parameters);

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
		function checkHitBox(mouse) {
			var flag = false;
			pos[0] < mouse.x && pos[0] + sprite.size[0] > mouse.x && pos[1] < mouse.y && pos[1] + sprite.size[1] > mouse.y && (flag = true);
			return flag;
		}
		switch (action) {
			case 'click':
				checkHitBox(mouse) && this.callbacks['click'] && this.callbacks['click'](this, event);
				break;
			case 'mousemove':
				checkHitBox(mouse) && this.callbacks['mousemove'] && this.callbacks['mousemove'](this, event);
				!checkHitBox(mouse) && this.callbacks['mouseleave'] && this.callbacks['mouseleave'](this, event);
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
	}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Jlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL21vdXNlLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9vYmplY3RzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvc3ByaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbW91c2VNb2R1bGUgZnJvbSAnLi9tb3VzZSc7XHJcbmltcG9ydCBpbnB1dE1vZHVsZSBmcm9tICcuL2lucHV0JztcclxuaW1wb3J0IEdhbWVXaW5kb3cgZnJvbSAnLi9vYmplY3RzJztcclxuXHJcbi8vIEEgY3Jvc3MtYnJvd3NlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuLy8gU2VlIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMS8wOC9hbmltYXRpbmctd2l0aC1qYXZhc2NyaXB0LWZyb20tc2V0aW50ZXJ2YWwtdG8tcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xyXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gbG9hZFJlc291cmNlcyhsaXN0LCBjYWxsYmFjaykge1xyXG4gICAgcmVzb3VyY2VzLmxvYWQobGlzdCk7XHJcblxyXG4gICAgLy9UaGlzIG9uZSBpcyBtb2NrIGZvciBBSkFYLCBpZiB3ZSB3aWxsIGhhdmUgcmVhbCBBSkFYLCB3ZSBqdXN0IG5lZWQgdG8gcHV0IHRoaXMgb25lIGludG8gY2FsbGJhY2sgd2l0aG91dCB0aW1lb3V0XHJcbiAgICByZXNvdXJjZXMub25SZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnKSB7XHJcbiAgICB2YXIgY2FudmFzID0gY29uZmlnLmNhbnZhcyxcclxuICAgICAgICBjdHggPSBjb25maWcuY3R4LFxyXG4gICAgICAgIGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lV2luZG93KGNvbmZpZyksXHJcbiAgICAgICAgbW91c2UgPSBtb3VzZU1vZHVsZShjYW52YXMpLFxyXG4gICAgICAgIGlucHV0ID0gaW5wdXRNb2R1bGUoZ2FtZSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUudHJpZ2dlckFjdGlvbignZWNsaWNrJywgZSwgbW91c2UuZ2V0TW91c2VQb3NpdGlvbihlKSk7XHJcbiAgICB9KTtcclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24gPSBtb3VzZS5nZXRNb3VzZVBvc2l0aW9uKGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2FtZVRpbWVyKCkge1xyXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBkdCA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwLjA7XHJcblxyXG4gICAgICAgIGlucHV0LnRyaWdnZXJHYW1lQWN0aW9ucyhkdCk7XHJcbiAgICAgICAgZ2FtZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIGdhbWUucmVuZGVyKGR0KTtcclxuXHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xyXG4gICAgICAgIGxvYWRSZXNvdXJjZXMoY29uZmlnLnJlc291cmNlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmluaXQoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlbDogZ2FtZSxcclxuICAgICAgICBpbml0OiBpbml0R2FtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2luZGV4LmpzXG4gKiovIiwidmFyIHJlc291cmNlcyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmVzb3VyY2VDYWNoZSA9IHt9O1xyXG4gICAgdmFyIGxvYWRpbmcgPSBbXTtcclxuICAgIHZhciByZWFkeUNhbGxiYWNrO1xyXG5cclxuLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG4gICAgZnVuY3Rpb24gbG9hZCh1cmxPckFycikge1xyXG4gICAgICAgIGlmICh1cmxPckFyciBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHVybE9yQXJyLmZvckVhY2goZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICAgICAgX2xvYWQodXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfbG9hZCh1cmxPckFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9sb2FkKHVybCkge1xyXG4gICAgICAgIGlmIChyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGltZztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlDYWxsYmFjaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlc291cmNlQ2FjaGVbdXJsXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1JlYWR5KCkge1xyXG4gICAgICAgIHZhciByZWFkeSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiByZXNvdXJjZUNhY2hlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWFkeTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgICAgICByZWFkeUNhbGxiYWNrID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvYWQ6IGxvYWQsXHJcbiAgICAgICAgZ2V0OiBnZXQsXHJcbiAgICAgICAgb25SZWFkeTogb25SZWFkeSxcclxuICAgICAgICBpc1JlYWR5OiBpc1JlYWR5XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzb3VyY2VzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9yZXNvdXJjZXMuanNcbiAqKi8iLCJmdW5jdGlvbiBtb3VzZShjYW52YXMpIHtcclxuLy8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG4vLyBCRUdJTiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMTQ0NjUvZ2V0dGluZy1tb3VzZS1sb2NhdGlvbi1pbi1jYW52YXNcclxuICAgIHZhciBzdHlsZVBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nTGVmdCddLCAxMCkgfHwgMCxcclxuICAgICAgICBzdHlsZVBhZGRpbmdUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ3BhZGRpbmdUb3AnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydib3JkZXJMZWZ0V2lkdGgnXSwgMTApIHx8IDAsXHJcbiAgICAgICAgc3R5bGVCb3JkZXJUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlclRvcFdpZHRoJ10sIDEwKSB8fCAwLFxyXG4vLyBTb21lIHBhZ2VzIGhhdmUgZml4ZWQtcG9zaXRpb24gYmFycyAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKSBhdCB0aGUgdG9wIG9yIGxlZnQgb2YgdGhlIHBhZ2VcclxuLy8gVGhleSB3aWxsIG1lc3MgdXAgbW91c2UgY29vcmRpbmF0ZXMgYW5kIHRoaXMgZml4ZXMgdGhhdFxyXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUsXHJcbiAgICAgICAgaHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG4gICAgICAgIGh0bWxMZWZ0ID0gaHRtbC5vZmZzZXRMZWZ0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb24oZSkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gY2FudmFzLFxyXG4gICAgICAgICAgICBvZmZzZXRYID0gMCxcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IDAsXHJcbiAgICAgICAgICAgIG14LCBteTtcclxuXHJcbi8vIENvbXB1dGUgdGhlIHRvdGFsIG9mZnNldC4gSXQncyBwb3NzaWJsZSB0byBjYWNoZSB0aGlzIGlmIHlvdSB3YW50XHJcbiAgICAgICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XHJcbiAgICAgICAgfVxyXG5cclxuLy8gQWRkIHBhZGRpbmcgYW5kIGJvcmRlciBzdHlsZSB3aWR0aHMgdG8gb2Zmc2V0XHJcbi8vIEFsc28gYWRkIHRoZSA8aHRtbD4gb2Zmc2V0cyBpbiBjYXNlIHRoZXJlJ3MgYSBwb3NpdGlvbjpmaXhlZCBiYXIgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcilcclxuLy8gVGhpcyBwYXJ0IGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnksIGl0IGRlcGVuZHMgb24geW91ciBzdHlsaW5nXHJcbiAgICAgICAgb2Zmc2V0WCArPSBzdHlsZVBhZGRpbmdMZWZ0ICsgc3R5bGVCb3JkZXJMZWZ0ICsgaHRtbExlZnQ7XHJcbiAgICAgICAgb2Zmc2V0WSArPSBzdHlsZVBhZGRpbmdUb3AgKyBzdHlsZUJvcmRlclRvcCArIGh0bWxUb3A7XHJcblxyXG4gICAgICAgIG14ID0gZS5wYWdlWCAtIG9mZnNldFg7XHJcbiAgICAgICAgbXkgPSBlLnBhZ2VZIC0gb2Zmc2V0WTtcclxuXHJcbi8vIFdlIHJldHVybiBhIHNpbXBsZSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIHggYW5kIHkgZGVmaW5lZFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG14LFxyXG4gICAgICAgICAgICB5OiBteVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAnZ2V0TW91c2VQb3NpdGlvbic6IGdldE1vdXNlUG9zaXRpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW91c2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL21vdXNlLmpzXG4gKiovIiwiZnVuY3Rpb24gaW5wdXQoZ2FtZSkge1xyXG4gICAgdmFyIHByZXNzZWRLZXlzID0ge30sXHJcbiAgICAgICAgY3VycmVudEdhbWUgPSBnYW1lO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldEtleShldmVudCwgc3RhdHVzKSB7XHJcbiAgICAgICAgcHJlc3NlZEtleXNbZXZlbnQua2V5Q29kZV0gPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgc2V0S2V5KGUsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHNldEtleShlLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpc0Rvd246IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByZXNzZWRLZXlzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgICxcclxuICAgICAgICB0cmlnZ2VyR2FtZUFjdGlvbnM6IGZ1bmN0aW9uIChmcmFtZVRpbWUpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwcmVzc2VkS2V5cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXNzZWRLZXlzLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXNzZWRLZXlzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHYW1lLnRyaWdnZXJBY3Rpb24oJ2tleV8nICsgaSwgeydkdCc6IGZyYW1lVGltZSwgJ2tleVN0YXR1cyc6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50R2FtZS50cmlnZ2VyQWN0aW9uKCdrZXlfJyArIGksIHsnZHQnOiBmcmFtZVRpbWUsICdrZXlTdGF0dXMnOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcHJlc3NlZEtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlucHV0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9pbnB1dC5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xyXG5cclxuZnVuY3Rpb24gR2FtZU9iamVjdChjb25maWcpIHtcclxuXHR0aGlzLnBvcyA9IHV0aWxzLmNsb25lKGNvbmZpZy5wb3MpO1xyXG5cdHRoaXMuaWQgPSBjb25maWcuaWQgfHwgJ29iamVjdCcgKyB0aGlzLnBvc1swXSArIHRoaXMucG9zWzFdO1xyXG5cdHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZShjb25maWcuc3ByaXRlWzBdLCBjb25maWcuc3ByaXRlWzFdLGNvbmZpZy5zcHJpdGVbMl0sY29uZmlnLnNwcml0ZVszXSxjb25maWcuc3ByaXRlWzRdLGNvbmZpZy5zcHJpdGVbNV0sY29uZmlnLnNwcml0ZVs2XSxjb25maWcuc3ByaXRlWzddKTtcclxuXHR0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuXHR0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8fCB0aGlzLnNwcml0ZS5zaXplO1xyXG5cclxuXHR0aGlzLmNhbGxiYWNrcyA9IGNvbmZpZy5jYWxsYmFja3MgfHwge307XHJcblx0dGhpcy56SW5kZXggPSBjb25maWcuekluZGV4IHx8IDA7XHJcblx0dGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcblx0dGhpcy5fcGFyYW1ldGVycyA9IHV0aWxzLmNsb25lKHRoaXMucGFyYW1ldGVycyk7XHJcblxyXG5cdHRoaXMucnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcblx0dGhpcy5fdXBkYXRlID0gY29uZmlnLnVwZGF0ZTtcclxuXHR0aGlzLmN1c3RvbVJlbmRlciA9IGNvbmZpZy5yZW5kZXI7XHJcblx0dGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cclxuXHR0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG5cclxufVxyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihkdCl7XHJcblx0dmFyIGN0eCA9IHRoaXMubGF5ZXIuY3R4O1xyXG5cdGN0eC5zYXZlKCk7XHJcblx0aWYgKHRoaXMuY3VzdG9tUmVuZGVyICkge1xyXG5cdFx0dGhpcy5jdXN0b21SZW5kZXIoZHQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjdHgudHJhbnNsYXRlKHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSk7XHJcblx0XHRkdCAmJiB0aGlzLnNwcml0ZS51cGRhdGUoZHQpO1xyXG5cdFx0dGhpcy5zcHJpdGUucmVuZGVyKGN0eCk7XHJcblx0fVxyXG5cdGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRpZiAoIXRoaXMuaW5pdGVkKSB7XHJcblx0XHR0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcblx0XHR2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzO1xyXG5cdFx0dGhpcy5ydWxlcyA9IFtdO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gcnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuYWRkUnVsZSh0aGlzLmxheWVyLmdhbWUucnVsZXNEZWZpbml0aW9uW3J1bGVzW2ldXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5pbml0ZWQgPSB0cnVlO1xyXG5cdH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuc2V0TGF5ZXIgPSBmdW5jdGlvbihsYXllcil7XHJcblx0dGhpcy5sYXllciA9IGxheWVyO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkdCl7XHJcblx0dGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZSgpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ydWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dGhpcy5ydWxlc1tpXS51cGRhdGUoZHQsIHRoaXMpO1xyXG5cdH1cclxuXHRpZiAodGhpcy5fcmVtb3ZlSW5OZXh0VGljaykge1xyXG5cdFx0dGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcblx0XHR0aGlzLl9yZW1vdmVJbk5leHRUaWNrID0gZmFsc2U7XHJcblx0fVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKHBvaW50KSB7XHJcblx0dGhpcy5wb3NbMF0gPSBwb2ludFswXTtcclxuXHR0aGlzLnBvc1sxXSA9IHBvaW50WzFdO1xyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS50cmlnZ2VyQWN0aW9uID0gZnVuY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuXHRmdW5jdGlvbiBjaGVja0hpdEJveChtb3VzZSkge1xyXG5cdFx0dmFyIGZsYWcgPSBmYWxzZTtcclxuXHRcdChwb3NbMF0gPCBtb3VzZS54KSAmJiAocG9zWzBdICsgc3ByaXRlLnNpemVbMF0gPiBtb3VzZS54KSAmJiAocG9zWzFdIDwgbW91c2UueSkgJiYgKHBvc1sxXSArIHNwcml0ZS5zaXplWzFdID4gbW91c2UueSkgJiYgKGZsYWcgPSB0cnVlKTtcclxuXHRcdHJldHVybiBmbGFnO1xyXG5cdH1cclxuXHRzd2l0Y2goYWN0aW9uKSB7XHJcblx0XHRjYXNlICdjbGljayc6XHJcblx0XHRcdGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSAmJiB0aGlzLmNhbGxiYWNrc1snY2xpY2snXSh0aGlzLCBldmVudCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnbW91c2Vtb3ZlJyA6XHJcblx0XHRcdGNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10gJiYgdGhpcy5jYWxsYmFja3NbJ21vdXNlbW92ZSddKHRoaXMsIGV2ZW50KTtcclxuXHRcdFx0IWNoZWNrSGl0Qm94KG1vdXNlKSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2VsZWF2ZSddICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10odGhpcywgZXZlbnQpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHRoaXMuY2FsbGJhY2tzLmhhc093blByb3BlcnR5KGFjdGlvbikgJiYgdGhpcy5jYWxsYmFja3NbYWN0aW9uXSh0aGlzLCBldmVudClcclxuXHR9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbihpZCkge1xyXG5cdGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSl7XHJcblx0XHR0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcblx0XHRkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcblx0fVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0aWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignUnVsZSB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyJyk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBydWxlID0gbmV3IEdhbWVSdWxlKGNvbmZpZyk7XHJcblx0XHRydWxlLnNldENvbnRleHQodGhpcyk7XHJcblx0XHR0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZFJ1bGVzID0gZnVuY3Rpb24oY29uZmlncykge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KGNvbmZpZ3MpKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwLCBqID0gY29uZmlncy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGRSdWxlKGNvbmZpZ3NbaV0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdhZGRSdWxlcyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gR2FtZVJ1bGUoY29uZmlnKSB7XHJcblx0dGhpcy5pZCA9IGNvbmZpZy5pZDtcclxuXHR0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG5cdHRoaXMucGFyYW1ldGVycyA9IChjb25maWcucGFyYW1ldGVycyAmJiB1dGlscy5jbG9uZShjb25maWcucGFyYW1ldGVycykpIHx8IHt9O1xyXG5cdHRoaXMuX3BhcmFtZXRlcnMgPSB1dGlscy5jbG9uZSh0aGlzLnBhcmFtZXRlcnMpO1xyXG59XHJcbkdhbWVSdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkdCwgb2JqKSB7XHJcblx0dGhpcy5fdXBkYXRlICYmIHRoaXMuX3VwZGF0ZShkdCwgb2JqKTtcclxufTtcclxuR2FtZVJ1bGUucHJvdG90eXBlLnNldENvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XHJcblx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEdhbWVMYXllcihjb25maWcpIHtcclxuXHR0aGlzLmlkID0gY29uZmlnLmlkO1xyXG5cdHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuXHR0aGlzLmdhbWUgPSBjb25maWcuZ2FtZTtcclxuXHR0aGlzLmJhY2tncm91bmQgPSB0aGlzLmN0eC5jcmVhdGVQYXR0ZXJuKHJlc291cmNlcy5nZXQoY29uZmlnLmJhY2tncm91bmQpLCAncmVwZWF0Jyk7XHJcblx0dGhpcy5wb3MgPSBjb25maWcucG9zIHx8IFswLDBdO1xyXG5cdHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IFtjb25maWcuY3R4LmNhbnZhcy53aWR0aCwgY29uZmlnLmN0eC5jYW52YXMuaGVpZ2h0XTtcclxuXHR0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcblx0XHQnZGVmYXVsdCcgOiBbXVxyXG5cdH07XHJcblx0Ly9jdHggPSBjb25maWcuY3R4LFxyXG5cdHRoaXMub2JqZWN0cyA9IHt9O1xyXG5cdHRoaXMuX3J1bGVzID0gY29uZmlnLnJ1bGVzIHx8IFtdO1xyXG5cdHRoaXMubWFwID0gW107XHJcblx0dGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG5cdHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcbn1cclxuR2FtZUxheWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0aWYgKCF0aGlzLmluaXRlZCkge1xyXG5cdFx0dGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcblxyXG5cdFx0dmFyIHJ1bGVzID0gdGhpcy5fcnVsZXM7XHJcblx0XHR0aGlzLnJ1bGVzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBydWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGRSdWxlKHRoaXMuZ2FtZS5ydWxlc0RlZmluaXRpb25bcnVsZXNbaV1dKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluaXRlZCA9IHRydWU7XHJcblx0fVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGR0KXtcclxuXHR2YXIgYXJyID0gW10sXHJcblx0XHRjdHggPSB0aGlzLmN0eCxcclxuXHRcdGNhbnZhcyA9IGN0eC5jYW52YXM7XHJcblxyXG5cdGN0eC5zYXZlKCk7XHJcblx0Y3R4LmJlZ2luUGF0aCgpO1xyXG5cdGN0eC5yZWN0KHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSwgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG5cdGN0eC5jbGlwKCk7XHJcblx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcclxuXHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuXHRcdGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuXHRcdFx0KGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSkgfHwgKGFyclt0aGlzLm9iamVjdHNbaV0uekluZGV4XSA9IFtdKTtcclxuXHRcdFx0YXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdLnB1c2godGhpcy5vYmplY3RzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Zm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRpZiAoYXJyW2ldKXtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDAsIGsgPSBhcnJbaV0ubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcblx0XHRcdFx0YXJyW2ldW2pdLnJlbmRlcihkdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0Y3R4LmJlZ2luUGF0aCgpO1xyXG5cdGN0eC5zdHJva2VTdHlsZSA9ICdibGFjayc7XHJcblx0Y3R4LnNoYWRvd0JsdXIgPSAxNTtcclxuXHRjdHguc2hhZG93Q29sb3IgPSAnYmxhY2snO1xyXG5cdGN0eC5saW5lV2lkdGggPSAyO1xyXG5cdGN0eC5zaGFkb3dPZmZzZXRYID0gMDtcclxuXHRjdHguc2hhZG93T2Zmc2V0WSA9IDA7XHJcblx0Y3R4LnJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcblx0Y3R4LnN0cm9rZSgpO1xyXG5cdGN0eC5yZXN0b3JlKCk7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZHQpe1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG5cdFx0dGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLnJ1bGVzW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcblx0fVxyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcblx0XHR2YXIgb2JqZWN0ID0gdGhpcy5vYmplY3RzW2ldO1xyXG5cclxuXHRcdG9iamVjdC51cGRhdGUoZHQpO1xyXG5cdH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVSdWxlID0gZnVuY3Rpb24oaWQpIHtcclxuXHRpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpZCkpe1xyXG5cdFx0dGhpcy5ydWxlc1tpZF0ubGF5ZXIgPSBudWxsO1xyXG5cdFx0ZGVsZXRlIHRoaXMucnVsZXNbaWRdO1xyXG5cdH1cclxufVxyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuXHRcdHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuXHRcdHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuXHR9XHJcblx0cmV0dXJuIHRoaXMucnVsZXNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRSdWxlcyA9IGZ1bmN0aW9uKHJ1bGUpIHtcclxuXHRpZiAoQXJyYXkuaXNBcnJheShydWxlKSkge1xyXG5cdFx0Zm9yKHZhciBpID0gMCwgaiA9IHJ1bGUubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcblx0XHRcdHRoaXMuYWRkUnVsZShydWxlW2ldKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5lcnJvcignYWRkUnVsZXMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuXHR9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVtb3ZlT2JqZWN0ID0gZnVuY3Rpb24oaWQpIHtcclxuXHRpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGlkKSl7XHJcblx0XHR0aGlzLm9iamVjdHNbaWRdLmxheWVyID0gbnVsbDtcclxuXHRcdGlmICh0aGlzLm9iamVjdHNbaWRdLnR5cGUgJiYgdGhpcy5vYmplY3RzW2lkXS50eXBlICE9ICdkZWZhdWx0Jykge1xyXG5cdFx0XHR0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzW3RoaXMub2JqZWN0c1tpZF0udHlwZV0uaW5kZXhPZihpZCksIDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uc3BsaWNlKHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLmluZGV4T2YoaWQpLCAxKTtcclxuXHRcdH1cclxuXHRcdGRlbGV0ZSB0aGlzLm9iamVjdHNbaWRdO1xyXG5cdH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRPYmplY3QgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRpZiAodGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ09iamVjdCB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIGxheWVyOiAnLCBjb25maWcuaWQpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRjb25maWcuaWQgPSBjb25maWcuaWQgKyBNYXRoLnJvdW5kKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpICogMTAwMDAwMSk7XHJcblxyXG5cdFx0dmFyIF9vYmogPSBuZXcgR2FtZU9iamVjdChjb25maWcpO1xyXG5cdFx0X29iai5zZXRMYXllcih0aGlzKTtcclxuXHRcdF9vYmouaW5pdCgpO1xyXG5cdFx0aWYgKGNvbmZpZy50eXBlICYmIGNvbmZpZy50eXBlICE9ICdkZWZhdWx0Jykge1xyXG5cdFx0XHQoIXRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0pICYmICh0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdID0gW10pO1xyXG5cdFx0XHR0aGlzLnNvcnRlZE9iamVjdHNbY29uZmlnLnR5cGVdLnB1c2goY29uZmlnLmlkKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc29ydGVkT2JqZWN0c1snZGVmYXVsdCddLnB1c2goY29uZmlnLmlkKTtcclxuXHRcdH1cclxuXHRcdHRoaXMub2JqZWN0c1tjb25maWcuaWRdID0gX29iajtcclxuXHJcblxyXG5cdHJldHVybiB0aGlzLm9iamVjdHNbY29uZmlnLmlkXTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5hZGRPYmplY3RzID0gZnVuY3Rpb24ob2JqKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0Zm9yKHZhciBpID0gMCwgaiA9IG9iai5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGRPYmplY3Qob2JqW2ldKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5lcnJvcignYWRkT2JqZWN0cyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG5cdH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRPYmplY3RzQnlUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG5cdHZhciBvYmplY3RzSWQgPSB0aGlzLnNvcnRlZE9iamVjdHNbdHlwZV0gfHwgW10sXHJcblx0XHRyZXN1bHQgPSBbXTtcclxuXHRmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHNJZC5sZW5ndGg7IGkgPCBsOyBpKyspe1xyXG5cdFx0cmVzdWx0LnB1c2godGhpcy5vYmplY3RzW29iamVjdHNJZFtpXV0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbihhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5vYmplY3RzKSB7XHJcblx0XHR0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5vYmplY3RzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG5cdH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24oKSB7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuXHRcdHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5vYmplY3RzW2ldO1xyXG5cdH1cclxuXHR0aGlzLnNvcnRlZE9iamVjdHMgPSB7XHJcblx0XHQnZGVmYXVsdCcgOiBbXSxcclxuXHR9O1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5ydWxlcykge1xyXG5cdFx0dGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBkZWxldGUgdGhpcy5ydWxlc1tpXTtcclxuXHR9XHJcblx0dGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5nZXRDb29yZGluYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBbdGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnBvc1swXSArIHRoaXMuc2l6ZVswXSwgdGhpcy5wb3NbMV0gKyB0aGlzLnNpemVbMV1dO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZVdpbmRvdyhjb25maWcpIHtcclxuXHR0aGlzLmxheWVycyA9IHt9O1xyXG5cdHRoaXMuY3R4ID0gY29uZmlnLmN0eDtcclxuXHR0aGlzLm9iamVjdHNEZWZpbml0aW9uID0gY29uZmlnLm9iamVjdHM7XHJcblx0dGhpcy5sb2dpY0RlZmluaXRpb24gPSBjb25maWcubG9naWM7XHJcblx0dGhpcy5ydWxlc0RlZmluaXRpb24gPSBjb25maWcucnVsZXM7XHJcblx0dGhpcy5sYXllcnNEZWZpbml0aW9uID0gY29uZmlnLmxheWVycztcclxuXHR0aGlzLl9oYW5kbGVycyA9IHt9O1xyXG5cdHRoaXMucGFyYW1ldGVycyA9IHt9O1xyXG5cdHRoaXMuX2luaXQgPSBjb25maWcuaW5pdDtcclxufVxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0dGhpcy5faW5pdCAmJiB0aGlzLl9pbml0KCk7XHJcbn07XHJcblxyXG5HYW1lV2luZG93LnByb3RvdHlwZS5iaW5kR2xvYmFsRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuXHQoIXRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0pICYmICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdID0gW10pO1xyXG5cdHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnRyaWdnZXJHbG9iYWxFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZlbnRPYmplY3QpIHtcclxuXHRmb3IgKCB2YXIgaSA9IDAsIGwgPSAodGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSk/dGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXS5sZW5ndGg6MCA7IGkgPCBsOyBpKyspIHtcclxuXHRcdHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKSB7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLmxheWVycyl7XHJcblx0XHR0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmxheWVyc1tpXS50cmlnZ2VyQWN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKTtcclxuXHR9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXMubGF5ZXJzO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkdCkge1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuXHRcdHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnVwZGF0ZShkdCk7XHJcblx0fVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihkdCkge1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcy5sYXllcnMpIHtcclxuXHRcdHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnJlbmRlcihkdCk7XHJcblx0fVxyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5yZW1vdmVMYXllciA9IGZ1bmN0aW9uKGlkKSB7XHJcblx0dGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaWQpICYmIGRlbGV0ZSB0aGlzLmxheWVyc1tpZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmFkZExheWVycyA9IGZ1bmN0aW9uKG9iaikge1xyXG5cdHZhciBhcnIgPSBbXTtcclxuXHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG5cdFx0XHRhcnIucHVzaCh0aGlzLmFkZExheWVyKG9ialtpXSkpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdhZGRMYXllcnMgZXhwZWN0IGFycmF5IGluIHBhcmFtZXRlcnMnKTtcclxuXHR9XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXIgPSBmdW5jdGlvbihvYmopIHtcclxuXHRpZiAodGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkob2JqLmlkKSkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignTGF5ZXIgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyB3aW5kb3cnKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0b2JqLmN0eCA9IHRoaXMuY3R4O1xyXG5cdFx0b2JqLmdhbWUgPSB0aGlzO1xyXG5cdFx0dGhpcy5sYXllcnNbb2JqLmlkXSA9IG5ldyBHYW1lTGF5ZXIob2JqKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzLmxheWVyc1tvYmouaWRdO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbihpZCkge1xyXG5cdHZhciBvYmogPSB1dGlscy5jbG9uZSh0aGlzLm9iamVjdHNEZWZpbml0aW9uW2lkXSksXHJcblx0XHRsb2dpYyA9IHRoaXMubG9naWNEZWZpbml0aW9uW2lkXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBsb2dpYykge1xyXG5cdFx0bG9naWMuaGFzT3duUHJvcGVydHkoaSkgJiYgKG9ialtpXSA9IGxvZ2ljW2ldKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldExheWVyQ29uZmlnID0gZnVuY3Rpb24oaWQpIHtcclxuXHR2YXIgbGF5ZXIgPSB0aGlzLmxheWVyc0RlZmluaXRpb25baWRdO1xyXG5cclxuXHRyZXR1cm4gbGF5ZXI7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVXaW5kb3dcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvb2JqZWN0cy5qc1xuICoqLyIsImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5cclxuZnVuY3Rpb24gU3ByaXRlKHVybCwgcG9zLCBzaXplLCBzcGVlZCwgZnJhbWVzLCBkaXIsIG9uY2UsIGRlZ3JlZSkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV07XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgdGhpcy5zcGVlZCA9IHR5cGVvZiBzcGVlZCA9PT0gJ251bWJlcicgPyBzcGVlZCA6IDA7XHJcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcclxuICAgIHRoaXMuX2luZGV4ID0gMDtcclxuICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgdGhpcy5kaXIgPSBkaXIgfHwgJ2hvcml6b250YWwnO1xyXG4gICAgdGhpcy5vbmNlID0gb25jZTtcclxuICAgIHRoaXMuZGVncmVlID0gZGVncmVlIHx8IDA7XHJcbn1cclxuXHJcblxyXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgdGhpcy5faW5kZXggKz0gdGhpcy5zcGVlZCAqIGR0O1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZUNvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIGlmIChjb25maWcpIHtcclxuICAgICAgICBjb25maWcucG9zICYmICh0aGlzLnBvcyA9IGNvbmZpZy5wb3MpO1xyXG4gICAgICAgIGNvbmZpZy5zaXplICYmICh0aGlzLnNpemUgPSBjb25maWcuc2l6ZSk7XHJcbiAgICAgICAgY29uZmlnLnNwZWVkICYmICh0aGlzLnNwZWVkID0gdHlwZW9mIGNvbmZpZy5zcGVlZCA9PT0gJ251bWJlcicgPyBjb25maWcuc3BlZWQgOiAwKTtcclxuICAgICAgICBjb25maWcuZnJhbWVzICYmICh0aGlzLmZyYW1lcyA9IGNvbmZpZy5mcmFtZXMpO1xyXG4gICAgICAgIGNvbmZpZy51cmwgJiYgKHRoaXMudXJsID0gY29uZmlnLnVybCk7XHJcbiAgICAgICAgY29uZmlnLmRpciAmJiAodGhpcy5kaXIgPSBjb25maWcuZGlyKTtcclxuICAgICAgICBjb25maWcub25jZSAmJiAodGhpcy5vbmNlID0gY29uZmlnLm9uY2UpO1xyXG4gICAgICAgIGNvbmZpZy5kZWdyZWUgJiYgKHRoaXMuZGVncmVlID0gY29uZmlnLmRlZ3JlZSk7XHJcbiAgICB9XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUucm90YXRlVG9EaXJlY3Rpb24gPSBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XHJcbiAgICB2YXIgcG9zID0gdGhpcy5kZWZhdWx0UG9zaXRpb24sXHJcbiAgICAgICAgc3ByaXRlUG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24uZGlyID09IDEpIHtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXSk7XHJcbiAgICAgICAgKChkaXJlY3Rpb24uayA8IDEpICYmIChkaXJlY3Rpb24uayA+PSAtMSkpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIDIgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoZGlyZWN0aW9uLmsgPCAtMSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdICsgMyAqIHRoaXMuc2l6ZVsxXV0pO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24uZGlyID09IC0xKSB7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rID49IDEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXSArIDMgKiB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAoKGRpcmVjdGlvbi5rIDwgMSkgJiYgKGRpcmVjdGlvbi5rID49IC0xKSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdICsgdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlQ29uZmlnKHtcclxuICAgICAgICAncG9zJzogc3ByaXRlUG9zaXRpb25cclxuICAgIH0pO1xyXG59O1xyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjdHgpIHtcclxuICAgIHZhciBmcmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcclxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBpZHggPSBNYXRoLmZsb29yKHRoaXMuX2luZGV4KTtcclxuICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWVzW2lkeCAlIG1heF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uY2UgJiYgaWR4ID49IG1heCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZnJhbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgeCA9IHRoaXMucG9zWzBdO1xyXG4gICAgdmFyIHkgPSB0aGlzLnBvc1sxXTtcclxuXHJcbiAgICBpZiAodGhpcy5kaXIgPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHkgKz0gZnJhbWUgKiB0aGlzLnNpemVbMV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB4ICs9IGZyYW1lICogdGhpcy5zaXplWzBdO1xyXG4gICAgfVxyXG4gICAgY3R4LnJvdGF0ZSh0aGlzLmRlZ3JlZSk7XHJcbiAgICBjdHguZHJhd0ltYWdlKHJlc291cmNlcy5nZXQodGhpcy51cmwpLFxyXG4gICAgICAgIHgsIHksXHJcbiAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0sXHJcbiAgICAgICAgLXRoaXMuc2l6ZVswXSAvIDIsIC10aGlzLnNpemVbMV0gLyAyLFxyXG4gICAgICAgIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxufTtcclxuU3ByaXRlLnByb3RvdHlwZS5zZXRkZWdyZWUgPSBmdW5jdGlvbiAoZGVncmVlKSB7XHJcbiAgICB0aGlzLmRlZ3JlZSA9IGRlZ3JlZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvc3ByaXRlLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNURBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=