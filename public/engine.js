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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL3Jlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vanMvZW5naW5lL21vdXNlLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS9vYmplY3RzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvc3ByaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbW91c2VNb2R1bGUgZnJvbSAnLi9tb3VzZSc7XHJcbmltcG9ydCBpbnB1dE1vZHVsZSBmcm9tICcuL2lucHV0JztcclxuaW1wb3J0IEdhbWVXaW5kb3cgZnJvbSAnLi9vYmplY3RzJztcclxuXHJcbi8vIEEgY3Jvc3MtYnJvd3NlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuLy8gU2VlIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMS8wOC9hbmltYXRpbmctd2l0aC1qYXZhc2NyaXB0LWZyb20tc2V0aW50ZXJ2YWwtdG8tcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xyXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcclxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxyXG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XHJcbiAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gbG9hZFJlc291cmNlcyhsaXN0LCBjYWxsYmFjaykge1xyXG4gICAgcmVzb3VyY2VzLmxvYWQobGlzdCk7XHJcblxyXG4gICAgLy9UaGlzIG9uZSBpcyBtb2NrIGZvciBBSkFYLCBpZiB3ZSB3aWxsIGhhdmUgcmVhbCBBSkFYLCB3ZSBqdXN0IG5lZWQgdG8gcHV0IHRoaXMgb25lIGludG8gY2FsbGJhY2sgd2l0aG91dCB0aW1lb3V0XHJcbiAgICByZXNvdXJjZXMub25SZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnKSB7XHJcbiAgICB2YXIgY2FudmFzID0gY29uZmlnLmNhbnZhcyxcclxuICAgICAgICBjdHggPSBjb25maWcuY3R4LFxyXG4gICAgICAgIGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lV2luZG93KGNvbmZpZyksXHJcbiAgICAgICAgbW91c2UgPSBtb3VzZU1vZHVsZShjYW52YXMpLFxyXG4gICAgICAgIGlucHV0ID0gaW5wdXRNb2R1bGUoZ2FtZSk7XHJcblxyXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUudHJpZ2dlckFjdGlvbignZWNsaWNrJywgZSwgbW91c2UuZ2V0TW91c2VQb3NpdGlvbihlKSk7XHJcbiAgICB9KTtcclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24gPSBtb3VzZS5nZXRNb3VzZVBvc2l0aW9uKGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2FtZVRpbWVyKCkge1xyXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBkdCA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwLjA7XHJcblxyXG4gICAgICAgIGlucHV0LnRyaWdnZXJHYW1lQWN0aW9ucyhkdCk7XHJcbiAgICAgICAgZ2FtZS51cGRhdGUoZHQpO1xyXG4gICAgICAgIGdhbWUucmVuZGVyKGR0KTtcclxuXHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRHYW1lKCkge1xyXG4gICAgICAgIGxvYWRSZXNvdXJjZXMoY29uZmlnLnJlc291cmNlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYW1lLmluaXQoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShnYW1lVGltZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RlbDogZ2FtZSxcclxuICAgICAgICBpbml0OiBpbml0R2FtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2luZGV4LmpzXG4gKiovIiwidmFyIHJlc291cmNlcyA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXNvdXJjZUNhY2hlID0ge307XHJcbiAgICB2YXIgbG9hZGluZyA9IFtdO1xyXG4gICAgdmFyIHJlYWR5Q2FsbGJhY2s7XHJcblxyXG4gICAgLy8gTG9hZCBhbiBpbWFnZSB1cmwgb3IgYW4gYXJyYXkgb2YgaW1hZ2UgdXJsc1xyXG4gICAgZnVuY3Rpb24gbG9hZCh1cmxPckFycikge1xyXG4gICAgICAgIGlmKHVybE9yQXJyIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgdXJsT3JBcnIuZm9yRWFjaChmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICAgICAgICAgIF9sb2FkKHVybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgX2xvYWQodXJsT3JBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfbG9hZCh1cmwpIHtcclxuICAgICAgICBpZihyZXNvdXJjZUNhY2hlW3VybF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlQ2FjaGVbdXJsXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gaW1nO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkeUNhbGxiYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzb3VyY2VDYWNoZVt1cmxdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldCh1cmwpIHtcclxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDYWNoZVt1cmxdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzUmVhZHkoKSB7XHJcbiAgICAgICAgdmFyIHJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IodmFyIGsgaW4gcmVzb3VyY2VDYWNoZSkge1xyXG4gICAgICAgICAgICBpZihyZXNvdXJjZUNhY2hlLmhhc093blByb3BlcnR5KGspICYmXHJcbiAgICAgICAgICAgICAgICFyZXNvdXJjZUNhY2hlW2tdKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWFkeTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvblJlYWR5KGZ1bmMpIHtcclxuICAgICAgICByZWFkeUNhbGxiYWNrID0gZnVuYztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgICBsb2FkOiBsb2FkLFxyXG4gICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgIG9uUmVhZHk6IG9uUmVhZHksXHJcbiAgICAgICAgaXNSZWFkeTogaXNSZWFkeVxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc291cmNlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvcmVzb3VyY2VzLmpzXG4gKiovIiwiZnVuY3Rpb24gbW91c2UoY2FudmFzKSB7XHJcblx0Ly8gSElUVEVTVDogVG8gY29udmVydCB0aGUgbW91c2UgcG9zaXRpb24gdG8gYmUgY2FudmFzIHJlbGF0aXZlLlxyXG5cdC8vIEJFR0lOIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExNDQ2NS9nZXR0aW5nLW1vdXNlLWxvY2F0aW9uLWluLWNhbnZhc1xyXG5cdHZhciBzdHlsZVBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMsIG51bGwpWydwYWRkaW5nTGVmdCddLCAxMCkgfHwgMCxcclxuXHRcdHN0eWxlUGFkZGluZ1RvcCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsncGFkZGluZ1RvcCddLCAxMCkgfHwgMCxcclxuXHRcdHN0eWxlQm9yZGVyTGVmdCA9IHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoY2FudmFzLCBudWxsKVsnYm9yZGVyTGVmdFdpZHRoJ10sIDEwKSB8fCAwLFxyXG5cdFx0c3R5bGVCb3JkZXJUb3AgPSBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcywgbnVsbClbJ2JvcmRlclRvcFdpZHRoJ10sIDEwKSB8fCAwLFxyXG5cdFx0Ly8gU29tZSBwYWdlcyBoYXZlIGZpeGVkLXBvc2l0aW9uIGJhcnMgKGxpa2UgdGhlIHN0dW1ibGV1cG9uIGJhcikgYXQgdGhlIHRvcCBvciBsZWZ0IG9mIHRoZSBwYWdlXHJcblx0XHQvLyBUaGV5IHdpbGwgbWVzcyB1cCBtb3VzZSBjb29yZGluYXRlcyBhbmQgdGhpcyBmaXhlcyB0aGF0XHJcblx0XHRodG1sID0gZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlLFxyXG5cdFx0aHRtbFRvcCA9IGh0bWwub2Zmc2V0VG9wLFxyXG5cdFx0aHRtbExlZnQgPSBodG1sLm9mZnNldExlZnQ7XHJcblxyXG5cdGZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb24oZSkge1xyXG5cdFx0dmFyIGVsZW1lbnQgPSBjYW52YXMsXHJcblx0XHRcdG9mZnNldFggPSAwLFxyXG5cdFx0XHRvZmZzZXRZID0gMCxcclxuXHRcdFx0bXgsIG15O1xyXG5cclxuXHRcdC8vIENvbXB1dGUgdGhlIHRvdGFsIG9mZnNldC4gSXQncyBwb3NzaWJsZSB0byBjYWNoZSB0aGlzIGlmIHlvdSB3YW50XHJcblx0XHRpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0b2Zmc2V0WCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcblx0XHRcdFx0b2Zmc2V0WSArPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuXHRcdFx0fSB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBwYWRkaW5nIGFuZCBib3JkZXIgc3R5bGUgd2lkdGhzIHRvIG9mZnNldFxyXG5cdFx0Ly8gQWxzbyBhZGQgdGhlIDxodG1sPiBvZmZzZXRzIGluIGNhc2UgdGhlcmUncyBhIHBvc2l0aW9uOmZpeGVkIGJhciAobGlrZSB0aGUgc3R1bWJsZXVwb24gYmFyKVxyXG5cdFx0Ly8gVGhpcyBwYXJ0IGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnksIGl0IGRlcGVuZHMgb24geW91ciBzdHlsaW5nXHJcblx0XHRvZmZzZXRYICs9IHN0eWxlUGFkZGluZ0xlZnQgKyBzdHlsZUJvcmRlckxlZnQgKyBodG1sTGVmdDtcclxuXHRcdG9mZnNldFkgKz0gc3R5bGVQYWRkaW5nVG9wICsgc3R5bGVCb3JkZXJUb3AgKyBodG1sVG9wO1xyXG5cclxuXHRcdG14ID0gZS5wYWdlWCAtIG9mZnNldFg7XHJcblx0XHRteSA9IGUucGFnZVkgLSBvZmZzZXRZO1xyXG5cclxuXHRcdC8vIFdlIHJldHVybiBhIHNpbXBsZSBqYXZhc2NyaXB0IG9iamVjdCB3aXRoIHggYW5kIHkgZGVmaW5lZFxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogbXgsXHJcblx0XHRcdHk6IG15XHJcblx0XHR9O1xyXG5cdH07XHJcblx0cmV0dXJuIHtcclxuXHRcdCdnZXRNb3VzZVBvc2l0aW9uJyA6IGdldE1vdXNlUG9zaXRpb25cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vdXNlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9tb3VzZS5qc1xuICoqLyIsImZ1bmN0aW9uIGlucHV0KGdhbWUpIHtcclxuICAgIHZhciBwcmVzc2VkS2V5cyA9IHt9LFxyXG5cdFx0Y3VycmVudEdhbWUgPSBnYW1lO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldEtleShldmVudCwgc3RhdHVzKSB7XHJcbiAgICAgICAgcHJlc3NlZEtleXNbZXZlbnQua2V5Q29kZV0gPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBzZXRLZXkoZSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBzZXRLZXkoZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwcmVzc2VkS2V5cyA9IHt9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpc0Rvd246IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJlc3NlZEtleXNba2V5XTtcclxuICAgICAgICB9XHJcblx0XHQsXHJcblx0XHR0cmlnZ2VyR2FtZUFjdGlvbnMgOiBmdW5jdGlvbihmcmFtZVRpbWUpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBwcmVzc2VkS2V5cykge1xyXG5cdFx0XHRcdGlmIChwcmVzc2VkS2V5cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG5cdFx0XHRcdFx0aWYgKHByZXNzZWRLZXlzW2ldKSB7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRHYW1lLnRyaWdnZXJBY3Rpb24oJ2tleV8nICsgaSwgeydkdCcgOiBmcmFtZVRpbWUsICdrZXlTdGF0dXMnIDogdHJ1ZX0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y3VycmVudEdhbWUudHJpZ2dlckFjdGlvbigna2V5XycgKyBpLCB7J2R0JyA6IGZyYW1lVGltZSwgJ2tleVN0YXR1cycgOiBmYWxzZX0pO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgcHJlc3NlZEtleXNbaV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5wdXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL2lucHV0LmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5mdW5jdGlvbiBHYW1lT2JqZWN0KGNvbmZpZykge1xyXG5cdHRoaXMucG9zID0gdXRpbHMuY2xvbmUoY29uZmlnLnBvcyk7XHJcblx0dGhpcy5pZCA9IGNvbmZpZy5pZCB8fCAnb2JqZWN0JyArIHRoaXMucG9zWzBdICsgdGhpcy5wb3NbMV07XHJcblx0dGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKGNvbmZpZy5zcHJpdGVbMF0sIGNvbmZpZy5zcHJpdGVbMV0sY29uZmlnLnNwcml0ZVsyXSxjb25maWcuc3ByaXRlWzNdLGNvbmZpZy5zcHJpdGVbNF0sY29uZmlnLnNwcml0ZVs1XSxjb25maWcuc3ByaXRlWzZdLGNvbmZpZy5zcHJpdGVbN10pO1xyXG5cdHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG5cdHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHx8IHRoaXMuc3ByaXRlLnNpemU7XHJcblxyXG5cdHRoaXMuY2FsbGJhY2tzID0gY29uZmlnLmNhbGxiYWNrcyB8fCB7fTtcclxuXHR0aGlzLnpJbmRleCA9IGNvbmZpZy56SW5kZXggfHwgMDtcclxuXHR0aGlzLnBhcmFtZXRlcnMgPSAoY29uZmlnLnBhcmFtZXRlcnMgJiYgdXRpbHMuY2xvbmUoY29uZmlnLnBhcmFtZXRlcnMpKSB8fCB7fTtcclxuXHR0aGlzLl9wYXJhbWV0ZXJzID0gdXRpbHMuY2xvbmUodGhpcy5wYXJhbWV0ZXJzKTtcclxuXHJcblx0dGhpcy5ydWxlcyA9IGNvbmZpZy5ydWxlcyB8fCBbXTtcclxuXHR0aGlzLl91cGRhdGUgPSBjb25maWcudXBkYXRlO1xyXG5cdHRoaXMuY3VzdG9tUmVuZGVyID0gY29uZmlnLnJlbmRlcjtcclxuXHR0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcblxyXG5cdHRoaXMuaW5pdGVkID0gZmFsc2U7XHJcblxyXG59XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGR0KXtcclxuXHR2YXIgY3R4ID0gdGhpcy5sYXllci5jdHg7XHJcblx0Y3R4LnNhdmUoKTtcclxuXHRpZiAodGhpcy5jdXN0b21SZW5kZXIgKSB7XHJcblx0XHR0aGlzLmN1c3RvbVJlbmRlcihkdCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGN0eC50cmFuc2xhdGUodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdKTtcclxuXHRcdGR0ICYmIHRoaXMuc3ByaXRlLnVwZGF0ZShkdCk7XHJcblx0XHR0aGlzLnNwcml0ZS5yZW5kZXIoY3R4KTtcclxuXHR9XHJcblx0Y3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmICghdGhpcy5pbml0ZWQpIHtcclxuXHRcdHRoaXMuX2luaXQgJiYgdGhpcy5faW5pdCgpO1xyXG5cclxuXHRcdHZhciBydWxlcyA9IHRoaXMucnVsZXM7XHJcblx0XHR0aGlzLnJ1bGVzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBydWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGRSdWxlKHRoaXMubGF5ZXIuZ2FtZS5ydWxlc0RlZmluaXRpb25bcnVsZXNbaV1dKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmluaXRlZCA9IHRydWU7XHJcblx0fVxyXG59O1xyXG5HYW1lT2JqZWN0LnByb3RvdHlwZS5zZXRMYXllciA9IGZ1bmN0aW9uKGxheWVyKXtcclxuXHR0aGlzLmxheWVyID0gbGF5ZXI7XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0KXtcclxuXHR0aGlzLl91cGRhdGUgJiYgdGhpcy5fdXBkYXRlKCk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR0aGlzLnJ1bGVzW2ldLnVwZGF0ZShkdCwgdGhpcyk7XHJcblx0fVxyXG5cdGlmICh0aGlzLl9yZW1vdmVJbk5leHRUaWNrKSB7XHJcblx0XHR0aGlzLmxheWVyLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuXHRcdHRoaXMuX3JlbW92ZUluTmV4dFRpY2sgPSBmYWxzZTtcclxuXHR9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24ocG9pbnQpIHtcclxuXHR0aGlzLnBvc1swXSA9IHBvaW50WzBdO1xyXG5cdHRoaXMucG9zWzFdID0gcG9pbnRbMV07XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLnRyaWdnZXJBY3Rpb24gPSBmdW5jdGlvbihhY3Rpb24sIGV2ZW50LCBtb3VzZSkge1xyXG5cdGZ1bmN0aW9uIGNoZWNrSGl0Qm94KG1vdXNlKSB7XHJcblx0XHR2YXIgZmxhZyA9IGZhbHNlO1xyXG5cdFx0KHBvc1swXSA8IG1vdXNlLngpICYmIChwb3NbMF0gKyBzcHJpdGUuc2l6ZVswXSA+IG1vdXNlLngpICYmIChwb3NbMV0gPCBtb3VzZS55KSAmJiAocG9zWzFdICsgc3ByaXRlLnNpemVbMV0gPiBtb3VzZS55KSAmJiAoZmxhZyA9IHRydWUpO1xyXG5cdFx0cmV0dXJuIGZsYWc7XHJcblx0fVxyXG5cdHN3aXRjaChhY3Rpb24pIHtcclxuXHRcdGNhc2UgJ2NsaWNrJzpcclxuXHRcdFx0Y2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydjbGljayddICYmIHRoaXMuY2FsbGJhY2tzWydjbGljayddKHRoaXMsIGV2ZW50KTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdtb3VzZW1vdmUnIDpcclxuXHRcdFx0Y2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZW1vdmUnXSAmJiB0aGlzLmNhbGxiYWNrc1snbW91c2Vtb3ZlJ10odGhpcywgZXZlbnQpO1xyXG5cdFx0XHQhY2hlY2tIaXRCb3gobW91c2UpICYmIHRoaXMuY2FsbGJhY2tzWydtb3VzZWxlYXZlJ10gJiYgdGhpcy5jYWxsYmFja3NbJ21vdXNlbGVhdmUnXSh0aGlzLCBldmVudCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0dGhpcy5jYWxsYmFja3MuaGFzT3duUHJvcGVydHkoYWN0aW9uKSAmJiB0aGlzLmNhbGxiYWNrc1thY3Rpb25dKHRoaXMsIGV2ZW50KVxyXG5cdH1cclxufTtcclxuR2FtZU9iamVjdC5wcm90b3R5cGUucmVtb3ZlUnVsZSA9IGZ1bmN0aW9uKGlkKSB7XHJcblx0aWYgKHRoaXMucnVsZXMuaGFzT3duUHJvcGVydHkoaWQpKXtcclxuXHRcdHRoaXMucnVsZXNbaWRdLmxheWVyID0gbnVsbDtcclxuXHRcdGRlbGV0ZSB0aGlzLnJ1bGVzW2lkXTtcclxuXHR9XHJcbn07XHJcbkdhbWVPYmplY3QucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRpZiAodGhpcy5ydWxlcy5oYXNPd25Qcm9wZXJ0eShjb25maWcuaWQpKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdSdWxlIHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXInKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIHJ1bGUgPSBuZXcgR2FtZVJ1bGUoY29uZmlnKTtcclxuXHRcdHJ1bGUuc2V0Q29udGV4dCh0aGlzKTtcclxuXHRcdHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzLnJ1bGVzW2NvbmZpZy5pZF07XHJcbn1cclxuR2FtZU9iamVjdC5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbihjb25maWdzKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkoY29uZmlncykpIHtcclxuXHRcdGZvcih2YXIgaSA9IDAsIGogPSBjb25maWdzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkZFJ1bGUoY29uZmlnc1tpXSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ2FkZFJ1bGVzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBHYW1lUnVsZShjb25maWcpIHtcclxuXHR0aGlzLmlkID0gY29uZmlnLmlkO1xyXG5cdHRoaXMuX3VwZGF0ZSA9IGNvbmZpZy51cGRhdGU7XHJcblx0dGhpcy5wYXJhbWV0ZXJzID0gKGNvbmZpZy5wYXJhbWV0ZXJzICYmIHV0aWxzLmNsb25lKGNvbmZpZy5wYXJhbWV0ZXJzKSkgfHwge307XHJcblx0dGhpcy5fcGFyYW1ldGVycyA9IHV0aWxzLmNsb25lKHRoaXMucGFyYW1ldGVycyk7XHJcbn1cclxuR2FtZVJ1bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuXHR0aGlzLl91cGRhdGUgJiYgdGhpcy5fdXBkYXRlKGR0LCBvYmopO1xyXG59O1xyXG5HYW1lUnVsZS5wcm90b3R5cGUuc2V0Q29udGV4dCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gR2FtZUxheWVyKGNvbmZpZykge1xyXG5cdHRoaXMuaWQgPSBjb25maWcuaWQ7XHJcblx0dGhpcy5jdHggPSBjb25maWcuY3R4O1xyXG5cdHRoaXMuZ2FtZSA9IGNvbmZpZy5nYW1lO1xyXG5cdHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuY3R4LmNyZWF0ZVBhdHRlcm4ocmVzb3VyY2VzLmdldChjb25maWcuYmFja2dyb3VuZCksICdyZXBlYXQnKTtcclxuXHR0aGlzLnBvcyA9IGNvbmZpZy5wb3MgfHwgWzAsMF07XHJcblx0dGhpcy5zaXplID0gY29uZmlnLnNpemUgfHwgW2NvbmZpZy5jdHguY2FudmFzLndpZHRoLCBjb25maWcuY3R4LmNhbnZhcy5oZWlnaHRdO1xyXG5cdHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuXHRcdCdkZWZhdWx0JyA6IFtdXHJcblx0fTtcclxuXHQvL2N0eCA9IGNvbmZpZy5jdHgsXHJcblx0dGhpcy5vYmplY3RzID0ge307XHJcblx0dGhpcy5fcnVsZXMgPSBjb25maWcucnVsZXMgfHwgW107XHJcblx0dGhpcy5tYXAgPSBbXTtcclxuXHR0aGlzLl9pbml0ID0gY29uZmlnLmluaXQ7XHJcblx0dGhpcy5pbml0ZWQgPSBmYWxzZTtcclxufVxyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRpZiAoIXRoaXMuaW5pdGVkKSB7XHJcblx0XHR0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxuXHJcblx0XHR2YXIgcnVsZXMgPSB0aGlzLl9ydWxlcztcclxuXHRcdHRoaXMucnVsZXMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkZFJ1bGUodGhpcy5nYW1lLnJ1bGVzRGVmaW5pdGlvbltydWxlc1tpXV0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuXHR9XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oZHQpe1xyXG5cdHZhciBhcnIgPSBbXSxcclxuXHRcdGN0eCA9IHRoaXMuY3R4LFxyXG5cdFx0Y2FudmFzID0gY3R4LmNhbnZhcztcclxuXHJcblx0Y3R4LnNhdmUoKTtcclxuXHRjdHguYmVnaW5QYXRoKCk7XHJcblx0Y3R4LnJlY3QodGhpcy5wb3NbMF0sIHRoaXMucG9zWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XHJcblx0Y3R4LmNsaXAoKTtcclxuXHRjdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kO1xyXG5cdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xyXG5cdFx0aWYgKHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG5cdFx0XHQoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdKSB8fCAoYXJyW3RoaXMub2JqZWN0c1tpXS56SW5kZXhdID0gW10pO1xyXG5cdFx0XHRhcnJbdGhpcy5vYmplY3RzW2ldLnpJbmRleF0ucHVzaCh0aGlzLm9iamVjdHNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdGlmIChhcnJbaV0pe1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMCwgayA9IGFycltpXS5sZW5ndGg7IGogPCBrOyBqKyspIHtcclxuXHRcdFx0XHRhcnJbaV1bal0ucmVuZGVyKGR0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjdHguYmVnaW5QYXRoKCk7XHJcblx0Y3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcclxuXHRjdHguc2hhZG93Qmx1ciA9IDE1O1xyXG5cdGN0eC5zaGFkb3dDb2xvciA9ICdibGFjayc7XHJcblx0Y3R4LmxpbmVXaWR0aCA9IDI7XHJcblx0Y3R4LnNoYWRvd09mZnNldFggPSAwO1xyXG5cdGN0eC5zaGFkb3dPZmZzZXRZID0gMDtcclxuXHRjdHgucmVjdCh0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMuc2l6ZVswXSwgdGhpcy5zaXplWzFdKTtcclxuXHRjdHguc3Ryb2tlKCk7XHJcblx0Y3R4LnJlc3RvcmUoKTtcclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkdCl7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcblx0XHR0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMucnVsZXNbaV0udXBkYXRlKGR0LCB0aGlzKTtcclxuXHR9XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuXHRcdHZhciBvYmplY3QgPSB0aGlzLm9iamVjdHNbaV07XHJcblxyXG5cdFx0b2JqZWN0LnVwZGF0ZShkdCk7XHJcblx0fVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLnJlbW92ZVJ1bGUgPSBmdW5jdGlvbihpZCkge1xyXG5cdGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGlkKSl7XHJcblx0XHR0aGlzLnJ1bGVzW2lkXS5sYXllciA9IG51bGw7XHJcblx0XHRkZWxldGUgdGhpcy5ydWxlc1tpZF07XHJcblx0fVxyXG59XHJcbkdhbWVMYXllci5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdGlmICh0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGNvbmZpZy5pZCkpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ1J1bGUgd2l0aCBzdWNoIGlkIGFscmVhZHkgZXhpc3QgaW4gdGhpcyBsYXllcicpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgcnVsZSA9IG5ldyBHYW1lUnVsZShjb25maWcpO1xyXG5cdFx0cnVsZS5zZXRDb250ZXh0KHRoaXMpO1xyXG5cdFx0dGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG5cdH1cclxuXHRyZXR1cm4gdGhpcy5ydWxlc1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZFJ1bGVzID0gZnVuY3Rpb24ocnVsZSkge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KHJ1bGUpKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwLCBqID0gcnVsZS5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGRSdWxlKHJ1bGVbaV0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdhZGRSdWxlcyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG5cdH1cclxufTtcclxuR2FtZUxheWVyLnByb3RvdHlwZS5yZW1vdmVPYmplY3QgPSBmdW5jdGlvbihpZCkge1xyXG5cdGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoaWQpKXtcclxuXHRcdHRoaXMub2JqZWN0c1tpZF0ubGF5ZXIgPSBudWxsO1xyXG5cdFx0aWYgKHRoaXMub2JqZWN0c1tpZF0udHlwZSAmJiB0aGlzLm9iamVjdHNbaWRdLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcblx0XHRcdHRoaXMuc29ydGVkT2JqZWN0c1t0aGlzLm9iamVjdHNbaWRdLnR5cGVdLnNwbGljZSh0aGlzLnNvcnRlZE9iamVjdHNbdGhpcy5vYmplY3RzW2lkXS50eXBlXS5pbmRleE9mKGlkKSwgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNvcnRlZE9iamVjdHNbJ2RlZmF1bHQnXS5zcGxpY2UodGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10uaW5kZXhPZihpZCksIDEpO1xyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIHRoaXMub2JqZWN0c1tpZF07XHJcblx0fVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdGlmICh0aGlzLm9iamVjdHMuaGFzT3duUHJvcGVydHkoY29uZmlnLmlkKSkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignT2JqZWN0IHdpdGggc3VjaCBpZCBhbHJlYWR5IGV4aXN0IGluIHRoaXMgbGF5ZXI6ICcsIGNvbmZpZy5pZCk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGNvbmZpZy5pZCA9IGNvbmZpZy5pZCArIE1hdGgucm91bmQoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkgKiAxMDAwMDAxKTtcclxuXHJcblx0XHR2YXIgX29iaiA9IG5ldyBHYW1lT2JqZWN0KGNvbmZpZyk7XHJcblx0XHRfb2JqLnNldExheWVyKHRoaXMpO1xyXG5cdFx0X29iai5pbml0KCk7XHJcblx0XHRpZiAoY29uZmlnLnR5cGUgJiYgY29uZmlnLnR5cGUgIT0gJ2RlZmF1bHQnKSB7XHJcblx0XHRcdCghdGhpcy5zb3J0ZWRPYmplY3RzW2NvbmZpZy50eXBlXSkgJiYgKHRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0gPSBbXSk7XHJcblx0XHRcdHRoaXMuc29ydGVkT2JqZWN0c1tjb25maWcudHlwZV0ucHVzaChjb25maWcuaWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3J0ZWRPYmplY3RzWydkZWZhdWx0J10ucHVzaChjb25maWcuaWQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5vYmplY3RzW2NvbmZpZy5pZF0gPSBfb2JqO1xyXG5cclxuXHJcblx0cmV0dXJuIHRoaXMub2JqZWN0c1tjb25maWcuaWRdO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmFkZE9iamVjdHMgPSBmdW5jdGlvbihvYmopIHtcclxuXHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwLCBqID0gb2JqLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkZE9iamVjdChvYmpbaV0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdhZGRPYmplY3RzIGV4cGVjdCBhcnJheSBpbiBwYXJhbWV0ZXJzJyk7XHJcblx0fVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmdldE9iamVjdHNCeVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XHJcblx0dmFyIG9iamVjdHNJZCA9IHRoaXMuc29ydGVkT2JqZWN0c1t0eXBlXSB8fCBbXSxcclxuXHRcdHJlc3VsdCA9IFtdO1xyXG5cdGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0c0lkLmxlbmd0aDsgaSA8IGw7IGkrKyl7XHJcblx0XHRyZXN1bHQucHVzaCh0aGlzLm9iamVjdHNbb2JqZWN0c0lkW2ldXSk7XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcbkdhbWVMYXllci5wcm90b3R5cGUudHJpZ2dlckFjdGlvbiA9IGZ1bmN0aW9uKGFjdGlvbiwgZXZlbnQsIG1vdXNlKSB7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLm9iamVjdHMpIHtcclxuXHRcdHRoaXMub2JqZWN0cy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLm9iamVjdHNbaV0udHJpZ2dlckFjdGlvbihhY3Rpb24sIGV2ZW50LCBtb3VzZSk7XHJcblx0fVxyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmNsZWFyTGF5ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRmb3IgKHZhciBpIGluIHRoaXMub2JqZWN0cykge1xyXG5cdFx0dGhpcy5vYmplY3RzLmhhc093blByb3BlcnR5KGkpICYmIGRlbGV0ZSB0aGlzLm9iamVjdHNbaV07XHJcblx0fVxyXG5cdHRoaXMuc29ydGVkT2JqZWN0cyA9IHtcclxuXHRcdCdkZWZhdWx0JyA6IFtdLFxyXG5cdH07XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLnJ1bGVzKSB7XHJcblx0XHR0aGlzLnJ1bGVzLmhhc093blByb3BlcnR5KGkpICYmIGRlbGV0ZSB0aGlzLnJ1bGVzW2ldO1xyXG5cdH1cclxuXHR0aGlzLmluaXRlZCA9IGZhbHNlO1xyXG59O1xyXG5HYW1lTGF5ZXIucHJvdG90eXBlLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV0sIHRoaXMucG9zWzBdICsgdGhpcy5zaXplWzBdLCB0aGlzLnBvc1sxXSArIHRoaXMuc2l6ZVsxXV07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBHYW1lV2luZG93KGNvbmZpZykge1xyXG5cdHRoaXMubGF5ZXJzID0ge307XHJcblx0dGhpcy5jdHggPSBjb25maWcuY3R4O1xyXG5cdHRoaXMub2JqZWN0c0RlZmluaXRpb24gPSBjb25maWcub2JqZWN0cztcclxuXHR0aGlzLmxvZ2ljRGVmaW5pdGlvbiA9IGNvbmZpZy5sb2dpYztcclxuXHR0aGlzLnJ1bGVzRGVmaW5pdGlvbiA9IGNvbmZpZy5ydWxlcztcclxuXHR0aGlzLmxheWVyc0RlZmluaXRpb24gPSBjb25maWcubGF5ZXJzO1xyXG5cdHRoaXMuX2hhbmRsZXJzID0ge307XHJcblx0dGhpcy5wYXJhbWV0ZXJzID0ge307XHJcblx0dGhpcy5faW5pdCA9IGNvbmZpZy5pbml0O1xyXG59XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLl9pbml0ICYmIHRoaXMuX2luaXQoKTtcclxufTtcclxuXHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmJpbmRHbG9iYWxFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xyXG5cdCghdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSkgJiYgKHRoaXMuX2hhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXSk7XHJcblx0dGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUudHJpZ2dlckdsb2JhbEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBldmVudE9iamVjdCkge1xyXG5cdGZvciAoIHZhciBpID0gMCwgbCA9ICh0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdKT90aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLmxlbmd0aDowIDsgaSA8IGw7IGkrKykge1xyXG5cdFx0dGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS50cmlnZ2VyQWN0aW9uID0gZnVuY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpIHtcclxuXHRmb3IgKHZhciBpIGluIHRoaXMubGF5ZXJzKXtcclxuXHRcdHRoaXMubGF5ZXJzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMubGF5ZXJzW2ldLnRyaWdnZXJBY3Rpb24oYWN0aW9uLCBldmVudCwgbW91c2UpO1xyXG5cdH1cclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcy5sYXllcnM7XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0KSB7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG5cdFx0dGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0udXBkYXRlKGR0KTtcclxuXHR9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGR0KSB7XHJcblx0Zm9yICh2YXIgaSBpbiB0aGlzLmxheWVycykge1xyXG5cdFx0dGhpcy5sYXllcnMuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5sYXllcnNbaV0ucmVuZGVyKGR0KTtcclxuXHR9XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24oaWQpIHtcclxuXHR0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShpZCkgJiYgZGVsZXRlIHRoaXMubGF5ZXJzW2lkXTtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuYWRkTGF5ZXJzID0gZnVuY3Rpb24ob2JqKSB7XHJcblx0dmFyIGFyciA9IFtdO1xyXG5cdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuXHRcdGZvcih2YXIgaSA9IDAsIGogPSBvYmoubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcblx0XHRcdGFyci5wdXNoKHRoaXMuYWRkTGF5ZXIob2JqW2ldKSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ2FkZExheWVycyBleHBlY3QgYXJyYXkgaW4gcGFyYW1ldGVycycpO1xyXG5cdH1cclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5HYW1lV2luZG93LnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uKG9iaikge1xyXG5cdGlmICh0aGlzLmxheWVycy5oYXNPd25Qcm9wZXJ0eShvYmouaWQpKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdMYXllciB3aXRoIHN1Y2ggaWQgYWxyZWFkeSBleGlzdCBpbiB0aGlzIHdpbmRvdycpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRvYmouY3R4ID0gdGhpcy5jdHg7XHJcblx0XHRvYmouZ2FtZSA9IHRoaXM7XHJcblx0XHR0aGlzLmxheWVyc1tvYmouaWRdID0gbmV3IEdhbWVMYXllcihvYmopO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXMubGF5ZXJzW29iai5pZF07XHJcbn07XHJcbkdhbWVXaW5kb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uKGlkKSB7XHJcblx0dmFyIG9iaiA9IHV0aWxzLmNsb25lKHRoaXMub2JqZWN0c0RlZmluaXRpb25baWRdKSxcclxuXHRcdGxvZ2ljID0gdGhpcy5sb2dpY0RlZmluaXRpb25baWRdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIGxvZ2ljKSB7XHJcblx0XHRsb2dpYy5oYXNPd25Qcm9wZXJ0eShpKSAmJiAob2JqW2ldID0gbG9naWNbaV0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG9iajtcclxufTtcclxuR2FtZVdpbmRvdy5wcm90b3R5cGUuZ2V0TGF5ZXJDb25maWcgPSBmdW5jdGlvbihpZCkge1xyXG5cdHZhciBsYXllciA9IHRoaXMubGF5ZXJzRGVmaW5pdGlvbltpZF07XHJcblxyXG5cdHJldHVybiBsYXllcjtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgR2FtZVdpbmRvd1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS9vYmplY3RzLmpzXG4gKiovIiwiaW1wb3J0IHJlc291cmNlcyBmcm9tICcuL3Jlc291cmNlcyc7XHJcblxyXG5mdW5jdGlvbiBTcHJpdGUodXJsLCBwb3MsIHNpemUsIHNwZWVkLCBmcmFtZXMsIGRpciwgb25jZSwgZGVncmVlKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXTtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICB0aGlzLnNwZWVkID0gdHlwZW9mIHNwZWVkID09PSAnbnVtYmVyJyA/IHNwZWVkIDogMDtcclxuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgdGhpcy5faW5kZXggPSAwO1xyXG4gICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB0aGlzLmRpciA9IGRpciB8fCAnaG9yaXpvbnRhbCc7XHJcbiAgICB0aGlzLm9uY2UgPSBvbmNlO1xyXG4gICAgdGhpcy5kZWdyZWUgPSBkZWdyZWUgfHwgMDtcclxufVxyXG5cclxuXHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZHQpIHtcclxuICAgIHRoaXMuX2luZGV4ICs9IHRoaXMuc3BlZWQqZHQ7XHJcbn07XHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlQ29uZmlnID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgICAgICBjb25maWcucG9zICYmICh0aGlzLnBvcyA9IGNvbmZpZy5wb3MpO1xyXG4gICAgICAgICAgICBjb25maWcuc2l6ZSAmJiAodGhpcy5zaXplID0gY29uZmlnLnNpemUpO1xyXG4gICAgICAgICAgICBjb25maWcuc3BlZWQgJiYgKHRoaXMuc3BlZWQgPSB0eXBlb2YgY29uZmlnLnNwZWVkID09PSAnbnVtYmVyJyA/IGNvbmZpZy5zcGVlZCA6IDApO1xyXG4gICAgICAgICAgICBjb25maWcuZnJhbWVzICYmICh0aGlzLmZyYW1lcyA9IGNvbmZpZy5mcmFtZXMpO1xyXG4gICAgICAgICAgICBjb25maWcudXJsICYmICh0aGlzLnVybCA9IGNvbmZpZy51cmwpO1xyXG4gICAgICAgICAgICBjb25maWcuZGlyICYmICh0aGlzLmRpciA9IGNvbmZpZy5kaXIpO1xyXG4gICAgICAgICAgICBjb25maWcub25jZSAmJiAodGhpcy5vbmNlID0gY29uZmlnLm9uY2UpO1xyXG4gICAgICAgICAgICBjb25maWcuZGVncmVlICYmICh0aGlzLmRlZ3JlZSA9IGNvbmZpZy5kZWdyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblNwcml0ZS5wcm90b3R5cGUucm90YXRlVG9EaXJlY3Rpb24gPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5kZWZhdWx0UG9zaXRpb24sXHJcbiAgICAgICAgICAgIHNwcml0ZVBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbi5kaXIgPT0gMSkge1xyXG4gICAgICAgICAgICAoZGlyZWN0aW9uLmsgPj0gMSkgJiYgKHNwcml0ZVBvc2l0aW9uID0gW3Bvc1swXSwgcG9zWzFdXSk7XHJcbiAgICAgICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAyICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgIChkaXJlY3Rpb24uayA8IC0xKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24uZGlyID09IC0xKSB7XHJcbiAgICAgICAgICAgIChkaXJlY3Rpb24uayA+PSAxKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyAzICogdGhpcy5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICgoZGlyZWN0aW9uLmsgPCAxKSAmJiAoZGlyZWN0aW9uLmsgPj0gLTEpKSAmJiAoc3ByaXRlUG9zaXRpb24gPSBbcG9zWzBdLCBwb3NbMV0gKyB0aGlzLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgKGRpcmVjdGlvbi5rIDwgLTEpICYmIChzcHJpdGVQb3NpdGlvbiA9IFtwb3NbMF0sIHBvc1sxXV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDb25maWcoe1xyXG4gICAgICAgICAgICAncG9zJyA6IHNwcml0ZVBvc2l0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGN0eCkge1xyXG4gICAgICAgIHZhciBmcmFtZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zcGVlZCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG1heCA9IHRoaXMuZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IE1hdGguZmxvb3IodGhpcy5faW5kZXgpO1xyXG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWVzW2lkeCAlIG1heF07XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm9uY2UgJiYgaWR4ID49IG1heCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZnJhbWUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHZhciB4ID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLnBvc1sxXTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXIgPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB5ICs9IGZyYW1lICogdGhpcy5zaXplWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgeCArPSBmcmFtZSAqIHRoaXMuc2l6ZVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmRlZ3JlZSk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShyZXNvdXJjZXMuZ2V0KHRoaXMudXJsKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHgsIHksXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgIC10aGlzLnNpemVbMF0vMiwgLXRoaXMuc2l6ZVsxXS8yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV0pO1xyXG4gICAgfTtcclxuU3ByaXRlLnByb3RvdHlwZS5zZXRkZWdyZWUgPSBmdW5jdGlvbihkZWdyZWUpe1xyXG4gICAgICAgIHRoaXMuZGVncmVlID0gZGVncmVlO1xyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvc3ByaXRlLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=