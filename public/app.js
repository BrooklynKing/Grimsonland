var app =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _objectsConfig = __webpack_require__(1);

	var _objectsConfig2 = _interopRequireDefault(_objectsConfig);

	var _logicConfig = __webpack_require__(2);

	var _logicConfig2 = _interopRequireDefault(_logicConfig);

	var _rulesConfig = __webpack_require__(4);

	var _rulesConfig2 = _interopRequireDefault(_rulesConfig);

	var _resourceList = __webpack_require__(5);

	var _resourceList2 = _interopRequireDefault(_resourceList);

	var _layerConfig = __webpack_require__(6);

	var _layerConfig2 = _interopRequireDefault(_layerConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.createElement("canvas"),
	    ctx = canvas.getContext("2d");

	canvas.width = 800;
	canvas.height = 600;

	document.addEventListener("DOMContentLoaded", function () {
		document.body.appendChild(canvas);
		canvas = document.getElementsByTagName('canvas')[0];
		canvas.focus();

		var game = engine.default({
			objects: _objectsConfig2.default,
			logic: _logicConfig2.default,
			rules: _rulesConfig2.default,
			layers: _layerConfig2.default,
			resources: _resourceList2.default,
			canvas: canvas,
			ctx: ctx,
			init: function init() {
				var game = this;
				var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));

				mainLayer.init();
				game.bindGlobalEvent('player_dead', function (e) {
					mainLayer.clearLayer();
					mainLayer.init();
				});
			}
		});

		game.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var config = {
		player: {
			zIndex: 2,
			sprite: ['img/sprites2.png', [0, 0], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 150,
				health: 1,
				cooldown: 15,
				fireCooldown: 15,
				bulletsFired: 0,
				direction: {}
			},
			type: 'player',
			rules: ['playerLogic', 'shootOnMouseDown', 'moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse']
		},
		explosion: {
			zIndex: 3,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
			rules: ['explosionLogic']
		},
		monster: {
			zIndex: 1,
			sprite: ['img/sprites2.png', [0, 128], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 50,
				degreeSpeed: 0.03,
				degreeRotation: 1,
				health: 6,
				power: 1
			},
			type: 'monster',
			rules: ['setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'damageOnPlayerCollision', 'rotateByDirection', 'canShoot']
		},
		monsterBoss: {
			zIndex: 1,
			sprite: ['img/sprites2.png', [192, 128], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 30,
				degreeSpeed: 0.03,
				degreeRotation: 1,
				bulletsFired: 0,
				cooldown: 70,
				fireCooldown: 20,
				power: 5,
				health: 30
			},
			type: 'monster',
			rules: ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'rotateByDirection', 'canShoot']
		},
		bullet: {
			zIndex: 2,
			sprite: ['img/bsprite.png', [0, 0], [27, 27], 16, [0, 1]],
			size: [20, 20],
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 400
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'bulletMonsterCollision']
		},
		mbullet: {
			zIndex: 2,
			sprite: ['img/iceball.png', [0, 0], [15, 16], 16, [0, 1, 2]],
			type: 'monsterSpellElement',
			size: [12, 12],
			parameters: {
				power: 1,
				speed: 150
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision']
		},
		cursor: {
			zIndex: 999,
			sprite: ['img/cursor.png', [0, 0], [30, 30]],
			rules: ['cursorLogic']
		},
		blood: {
			zIndex: 0,
			sprite: ['img/blood.png', [0, 0], [32, 13]],
			parameters: {
				cooldown: 500
			},
			rules: ['bloodLogic']
		}
	};

	exports.default = config;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {};

	exports.default = config;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    playerShootOnMouseClick: {
	        init: function init() {
	            var obj = this.context;
	            this.context.layer.game.bindGlobalEvent('eclick', function () {
	                if (obj.parameters.fireCooldown == 0) {
	                    var bulletConfig = obj.layer.game.getConfig('bullet'),
	                        mousePosition = obj.layer.game.mouse.getMousePosition(),
	                        destination = mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] - 1],
	                        direction1 = _utils2.default.getDirection(obj.pos, destination),
	                        direction2 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20)),
	                        direction3 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20));

	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;

	                    bulletConfig.parameters.direction = direction1;
	                    obj.layer.addObject(bulletConfig);

	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.parameters.direction = direction2;

	                    obj.layer.addObject(bulletConfig);

	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.parameters.direction = direction3;

	                    obj.layer.addObject(bulletConfig);
	                    obj.parameters.fireCooldown = obj.parameters.cooldown;
	                }
	            });
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < this.parameters.totalMonsters) {
	                if (this.parameters.currentMonsterCooldown == 0) {

	                    var monsterConfig = Math.random() * 100 > 95 ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
	                        randomStartPosition = Math.round(Math.random() * 3);

	                    switch (randomStartPosition) {
	                        case 0:
	                            monsterConfig.pos = [0 - monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];
	                            break;
	                        case 1:
	                            monsterConfig.pos = [Math.round(Math.random() * 1280), 0 - monsterConfig.sprite[2][1]];
	                            break;
	                        case 2:
	                            monsterConfig.pos = [1280 + monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];
	                            break;
	                        case 3:
	                            monsterConfig.pos = [Math.round(Math.random() * 1280), 720 + monsterConfig.sprite[2][1]];
	                            break;
	                    }
	                    monsterConfig.id = 'monster' + this.parameters.monsterSpawned++;
	                    monsterConfig.layer = this.context;

	                    this.context.addObject(monsterConfig);

	                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	                } else {
	                    this.parameters.currentMonsterCooldown--;
	                }
	            }
	        },
	        parameters: {
	            currentMonsterCooldown: 0,
	            monsterCooldown: 5,
	            monsterSpawned: 0,
	            totalMonsters: 500
	        }
	    },
	    playerDeath: {
	        update: function update(dt, obj) {
	            if (obj.parameters.health <= 0) {
	                obj.layer.game.triggerGlobalEvent('player_dead');
	            }
	        }
	    },
	    damageOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                player.parameters.health -= obj.parameters.power;
	            }
	        }
	    },
	    destroyOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                var explosionConfig = obj.layer.game.getConfig('explosion');
	                explosionConfig.pos = player.pos;
	                explosionConfig.id = 'exp_' + player.id;

	                obj.layer.addObject(explosionConfig);

	                obj._removeInNextTick = true;
	            }
	        }
	    },
	    bulletMonsterCollision: {
	        update: function update(dt, obj) {
	            var monsters = obj.layer.getObjectsByType('monster');

	            for (var i = 0, l = monsters.length; i < l; i++) {
	                if (_utils2.default.boxCollides(obj.pos, obj.size, monsters[i].pos, monsters[i].size)) {
	                    monsters[i].parameters.health -= obj.parameters.power;

	                    var explosionConfig = obj.layer.game.getConfig('explosion');
	                    explosionConfig.pos = monsters[i].pos;
	                    explosionConfig.id = 'exp_' + monsters[i].id;

	                    obj.layer.addObject(explosionConfig);

	                    obj._removeInNextTick = true;

	                    break;
	                }
	            }
	        }
	    },
	    bindPositionToLayer: {
	        update: function update(dt, obj) {

	            if (obj.pos[0] - obj.sprite.size[0] / 2 < obj.layer.pos[0]) {
	                obj.pos[0] = obj.sprite.size[0] / 2;
	            } else if (obj.pos[0] + obj.sprite.size[0] / 2 > obj.layer.pos[0] + obj.layer.size[0]) {
	                obj.pos[0] = obj.layer.pos[0] + obj.layer.size[0] - obj.sprite.size[0] / 2;
	            }

	            if (obj.pos[1] - obj.sprite.size[1] / 2 < obj.layer.pos[1]) {
	                obj.pos[1] = obj.sprite.size[1] / 2;
	            } else if (obj.pos[1] + obj.sprite.size[1] / 2 > obj.layer.pos[1] + obj.layer.size[1]) {
	                obj.pos[1] = obj.layer.pos[1] + obj.layer.size[1] - obj.sprite.size[1] / 2;
	            }
	        }
	    },
	    destroyAfterLeavingLayer: {
	        update: function update(dt, obj) {
	            if (obj.pos[1] < 0 || obj.pos[1] - obj.sprite.size[1] > obj.layer.pos[1] + obj.layer.size[1] || obj.pos[0] - obj.sprite.size[0] > obj.layer.pos[0] + obj.layer.size[0] || obj.pos[0] < 0) {
	                obj._removeInNextTick = true;
	                return false;
	            }
	        }
	    },
	    setDirectionToPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.parameters.direction = _utils2.default.getDirection(obj.pos, player.pos);
	        }
	    },
	    moveToDirection: {
	        update: function update(dt, obj) {
	            if (obj.parameters.direction.dir) {
	                obj.setPosition(_utils2.default.getDestination(obj.pos, obj.parameters.direction, obj.parameters.speed * dt));
	            }
	        }
	    },
	    monsterHealthStatus: {
	        update: function update(dt, obj) {
	            if (obj.parameters.health <= 0) {
	                obj._removeInNextTick = true;
	                obj.layer.game.triggerGlobalEvent(obj.type + '_killed');
	            }
	        }
	    },
	    rotateByDirection: {
	        update: function update(dt, obj) {
	            obj.sprite.rotateToDirection(obj.parameters.direction);
	        }
	    },
	    rotateToMouse: {
	        update: function update(dt, obj) {
	            var mousePosition = obj.layer.game.mouse.getMousePosition();

	            var destination = mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] + 1],
	                directionToMouse = _utils2.default.getDirection(obj.pos, destination);

	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    canShoot: {
	        update: function update(dt, obj) {
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	        }
	    },
	    playerLogic: {
	        update: function update(dt, obj) {
	            var pos = _utils2.default.clone(obj.pos);

	            if (obj.parameters.direction.right) {
	                pos[0] = obj.pos[0] + 1;
	            }
	            if (obj.parameters.direction.left) {
	                pos[0] = obj.pos[0] - 1;
	            }
	            if (obj.parameters.direction.down) {
	                pos[1] = obj.pos[1] + 1;
	            }
	            if (obj.parameters.direction.up) {
	                pos[1] = obj.pos[1] - 1;
	            }
	            if (obj.pos[0] == pos[0] && obj.pos[1] == pos[1]) {
	                obj.parameters.direction.dir = null;
	            } else {
	                var direction = _utils2.default.getDirection(obj.pos, pos);
	                obj.parameters.direction.k = direction.k;
	                obj.parameters.direction.dir = direction.dir;
	            }
	        }
	    },
	    monsterBossLogic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];
	            if (obj.parameters.fireCooldown == 0) {
	                var bulletConfig = obj.layer.game.getConfig('mbullet'),
	                    direction = _utils2.default.getDirection(obj.pos, player.pos);

	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.id = 'mbullet_' + obj.id + '_' + obj.parameters.bulletsFired;

	                bulletConfig.parameters.direction = direction;
	                obj.layer.addObject(bulletConfig);

	                obj.parameters.bulletsFired++;
	                obj.parameters.fireCooldown = obj.parameters.cooldown;
	            }
	        }
	    },
	    cursorLogic: {
	        update: function update(dt, obj) {
	            var mousePosition = obj.layer.game.mouse.getMousePosition();
	            obj.setPosition(mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1]]);
	        }
	    },
	    bloodLogic: {
	        update: function update(dt, obj) {
	            if (obj.parameters.cooldown == 0) {
	                obj.layer.removeObject(obj.id);
	            } else {
	                obj.parameters.cooldown--;
	            }
	        }
	    },
	    explosionLogic: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                var bloodConfig = obj.layer.game.getConfig('blood');
	                bloodConfig.pos = obj.pos;
	                bloodConfig.id = 'blood_' + obj.id;
	                obj.layer.addObject(bloodConfig);
	                obj.layer.removeObject(obj.id);
	            }
	        }
	    },
	    shootOnMouseDown: {
	        update: function update(dt, obj) {
	            if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
	                var bulletConfig = obj.layer.game.getConfig('bullet'),
	                    mousePosition = obj.layer.game.mouse.getMousePosition(),
	                    destination = mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] - 1],
	                    direction1 = _utils2.default.getDirection(obj.pos, destination),
	                    direction2 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20)),
	                    direction3 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20));

	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;

	                bulletConfig.parameters.direction = direction1;
	                obj.layer.addObject(bulletConfig);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction2;

	                obj.layer.addObject(bulletConfig);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction3;

	                obj.layer.addObject(bulletConfig);
	                obj.parameters.fireCooldown = obj.parameters.cooldown;
	            }
	        }
	    },
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.parameters.direction.left = obj.layer.game.input.isDown(65);
	            obj.parameters.direction.up = obj.layer.game.input.isDown(87);
	            obj.parameters.direction.down = obj.layer.game.input.isDown(83);
	            obj.parameters.direction.right = obj.layer.game.input.isDown(68);
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var list = ['img/sprites.png', 'img/grass2.png', 'img/blood.png', 'img/desert.png', 'img/iceball.png', 'img/bsprite.png', 'img/cursor.png', 'img/sprites2.png', 'img/grass3.png'];

		exports.default = list;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var config = {
		mainLayer: {
			id: 'mainLayer',
			size: [800, 600],
			background: 'img/grass2.png',
			init: function init() {
				var playerConfig = this.game.getConfig('player');
				playerConfig.pos = [400, 300];
				playerConfig.id = 'player';

				var cursorConfig = this.game.getConfig('cursor');
				cursorConfig.pos = [400, 350];
				cursorConfig.id = 'cursor';

				this.addObjects([cursorConfig, playerConfig]);
			},
			rules: ['spawn_monster']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vanMvb2JqZWN0c0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vanMvbG9naWNDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2pzL3J1bGVzQ29uZmlnLmpzIiwid2VicGFjazovLy9qcy9yZXNvdXJjZUxpc3QuanMiLCJ3ZWJwYWNrOi8vL2pzL2xheWVyQ29uZmlnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYmplY3RzIGZyb20gJy4vb2JqZWN0c0NvbmZpZyc7XHJcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljQ29uZmlnJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXNDb25maWcnO1xyXG5pbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VMaXN0JztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVyQ29uZmlnJztcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxyXG5cdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5jYW52YXMud2lkdGggPSA4MDA7XHJcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblx0Y2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xyXG5cdGNhbnZhcy5mb2N1cygpO1xyXG5cclxuXHR2YXIgZ2FtZSA9IGVuZ2luZS5kZWZhdWx0KHtcclxuXHRcdG9iamVjdHM6IG9iamVjdHMsXHJcblx0XHRsb2dpYzogbG9naWMsXHJcblx0XHRydWxlczogcnVsZXMsXHJcblx0XHRsYXllcnM6IGxheWVycyxcclxuXHRcdHJlc291cmNlczogcmVzb3VyY2VzLFxyXG5cdFx0Y2FudmFzOiBjYW52YXMsXHJcblx0XHRjdHg6IGN0eCxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZ2FtZSA9IHRoaXM7XHJcblx0XHRcdHZhciBtYWluTGF5ZXIgPSBnYW1lLmFkZExheWVyKHRoaXMuZ2V0TGF5ZXJDb25maWcoJ21haW5MYXllcicpKTtcclxuXHJcblx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdGdhbWUuYmluZEdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRtYWluTGF5ZXIuY2xlYXJMYXllcigpO1xyXG5cdFx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRnYW1lLmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRcdHBsYXllciA6IHtcclxuXHRcdFx0ekluZGV4IDogMixcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzMi5wbmcnLCBbMCwgMF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDE1MCxcclxuXHRcdFx0XHRoZWFsdGggOiAxLFxyXG5cdFx0XHRcdGNvb2xkb3duOiAxNSxcclxuXHRcdFx0XHRmaXJlQ29vbGRvd24gOiAxNSxcclxuXHRcdFx0XHRidWxsZXRzRmlyZWQ6IDAsXHJcblx0XHRcdFx0ZGlyZWN0aW9uIDoge31cclxuXHRcdFx0fSxcclxuXHRcdFx0dHlwZSA6ICdwbGF5ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsncGxheWVyTG9naWMnLCdzaG9vdE9uTW91c2VEb3duJywgJ21vdmVXaXRoS2V5Ym9hcmQnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdjYW5TaG9vdCcsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlVG9Nb3VzZSddXHJcblx0XHR9LFxyXG5cdFx0ZXhwbG9zaW9uIDoge1xyXG5cdFx0XHR6SW5kZXggOiAzLFxyXG5cdFx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMucG5nJywgWzAsIDExN10sIFszOSwgMzldLCAxNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdLCBudWxsLCB0cnVlXSxcclxuXHRcdFx0cnVsZXM6IFsnZXhwbG9zaW9uTG9naWMnXVxyXG5cdFx0fSxcclxuXHRcdG1vbnN0ZXIgOiB7XHJcblx0XHRcdHpJbmRleCA6IDEsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvc3ByaXRlczIucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDUwLFxyXG5cdFx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRcdGRlZ3JlZVJvdGF0aW9uIDogMSxcclxuXHRcdFx0XHRoZWFsdGggOiA2LFxyXG5cdFx0XHRcdHBvd2VyIDogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnY2FuU2hvb3QnXVxyXG5cdFx0fSxcclxuXHRcdG1vbnN0ZXJCb3NzIDoge1xyXG5cdFx0XHR6SW5kZXggOiAxLFxyXG5cdFx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMyLnBuZycsIFsxOTIsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDMwLFxyXG5cdFx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRcdGRlZ3JlZVJvdGF0aW9uIDogMSxcclxuXHRcdFx0XHRidWxsZXRzRmlyZWQgOiAwLFxyXG5cdFx0XHRcdGNvb2xkb3duIDogNzAgLFxyXG5cdFx0XHRcdGZpcmVDb29sZG93biA6IDIwLFxyXG5cdFx0XHRcdHBvd2VyIDogNSxcclxuXHRcdFx0XHRoZWFsdGggOiAzMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsnbW9uc3RlckJvc3NMb2dpYycsICdzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnbW9uc3RlckhlYWx0aFN0YXR1cycsJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ2NhblNob290J11cclxuXHRcdH0sXHJcblx0XHRidWxsZXQgOiB7XHJcblx0XHRcdHpJbmRleCA6IDIsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvYnNwcml0ZS5wbmcnLFsgMCwgMF0sIFsyNywgMjddLCAxNiwgWzAsIDFdXSxcclxuXHRcdFx0c2l6ZSA6IFsyMCwgMjBdLFxyXG5cdFx0XHR0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0cG93ZXIgOiAxMCxcclxuXHRcdFx0XHRzcGVlZDogNDAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2J1bGxldE1vbnN0ZXJDb2xsaXNpb24nXVxyXG5cdFx0fSxcclxuXHRcdG1idWxsZXQgOiB7XHJcblx0XHRcdHpJbmRleCA6IDIsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvaWNlYmFsbC5wbmcnLFswLCAwXSwgWzE1LCAxNl0sIDE2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG5cdFx0XHRzaXplIDogWzEyLCAxMl0sXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0cG93ZXIgOiAxLFxyXG5cdFx0XHRcdHNwZWVkOiAxNTBcclxuXHRcdFx0fSxcclxuXHRcdFx0cnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAnZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uJ11cclxuXHRcdH0sXHJcblx0XHRjdXJzb3IgOiB7XHJcblx0XHRcdHpJbmRleCA6IDk5OSxcclxuXHRcdFx0c3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG5cdFx0XHRydWxlczogWydjdXJzb3JMb2dpYyddXHJcblx0XHR9LFxyXG5cdFx0Ymxvb2QgOiB7XHJcblx0XHRcdHpJbmRleCA6IDAsXHJcblx0XHRcdHNwcml0ZSA6IFsnaW1nL2Jsb29kLnBuZycsIFswLCAwXSwgWzMyLCAxM11dLFxyXG5cdFx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRcdGNvb2xkb3duIDogNTAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHJ1bGVzOiBbJ2Jsb29kTG9naWMnXVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9vYmplY3RzQ29uZmlnLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7fTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9sb2dpY0NvbmZpZy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcGxheWVyU2hvb3RPbk1vdXNlQ2xpY2s6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxheWVyLmdhbWUuYmluZEdsb2JhbEV2ZW50KCdlY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhclx0YnVsbGV0Q29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdidWxsZXQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSAobW91c2VQb3NpdGlvbik/W21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjEgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24yID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgMjApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMyA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIC0yMCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMTtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIChvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX21vbnN0ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCB0aGlzLnBhcmFtZXRlcnMudG90YWxNb25zdGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXJDb25maWcgPSAoTWF0aC5yYW5kb20oKSAqIDEwMCA+IDk1KSA/IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlckJvc3MnKSA6IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21TdGFydFBvc2l0aW9uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tU3RhcnRQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbMCAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3MjApXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTI4MCksIDAgLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gWzEyODAgKyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzIwKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEyODApLCA3MjAgKyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5pZCA9ICdtb25zdGVyJyArIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcubGF5ZXIgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QobW9uc3RlckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgY3VycmVudE1vbnN0ZXJDb29sZG93bjogMCxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiA1LFxyXG4gICAgICAgICAgICBtb25zdGVyU3Bhd25lZDogMCxcclxuICAgICAgICAgICAgdG90YWxNb25zdGVyczogNTAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXllckRlYXRoOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iai5wb3MsIG9iai5zaXplLCBwbGF5ZXIucG9zLCBwbGF5ZXIuc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IHBsYXllci5wb3M7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBwbGF5ZXIuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vbnN0ZXJzID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9uc3RlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIG1vbnN0ZXJzW2ldLnBvcywgbW9uc3RlcnNbaV0uc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyc1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG1vbnN0ZXJzW2ldLnBvcztcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBtb25zdGVyc1tpXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDwgb2JqLmxheWVyLnBvc1swXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1swXSA9IG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvc1swXSArIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1sxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPCBvYmoubGF5ZXIucG9zWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zWzFdICsgb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1sxXSA9IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1sxXSA8IDAgfHwgb2JqLnBvc1sxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSB8fCBvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdID4gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIHx8IG9iai5wb3NbMF0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVG9EaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24odXRpbHMuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLCBvYmoucGFyYW1ldGVycy5zcGVlZCAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUudHJpZ2dlckdsb2JhbEV2ZW50KG9iai50eXBlICsgJ19raWxsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVCeURpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZS5yb3RhdGVUb0RpcmVjdGlvbihvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVUb01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9Nb3VzZSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW5TaG9vdDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdID09IHBvc1swXSAmJiBvYmoucG9zWzFdID09IHBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IGRpcmVjdGlvbi5kaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3NMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnbWJ1bGxldF8nICsgb2JqLmlkICsgJ18nICsgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGN1cnNvckxvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmxvb2RMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5yZW1vdmVPYmplY3Qob2JqLmlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIHZhclx0Ymxvb2RDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZENvbmZpZy5wb3MgPSBvYmoucG9zO1xyXG4gICAgICAgICAgICAgICAgYmxvb2RDb25maWcuaWQgPSAnYmxvb2RfJyArIG9iai5pZDtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2RDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLnJlbW92ZU9iamVjdChvYmouaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob290T25Nb3VzZURvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gLSAxXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24xID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIGRlc3RpbmF0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24yID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgMjApKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24zID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24xO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjI7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjM7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNjUpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXAgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oODcpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93biA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Myk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2OCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL3J1bGVzQ29uZmlnLmpzXG4gKiovIiwidmFyIGxpc3QgPSBbXHJcbiAgICAnaW1nL3Nwcml0ZXMucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MyLnBuZycsXHJcbiAgICAnaW1nL2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL2Rlc2VydC5wbmcnLFxyXG4gICAgJ2ltZy9pY2ViYWxsLnBuZycsXHJcbiAgICAnaW1nL2JzcHJpdGUucG5nJyxcclxuICAgICdpbWcvY3Vyc29yLnBuZycsXHJcbiAgICAnaW1nL3Nwcml0ZXMyLnBuZycsXHJcbiAgICAnaW1nL2dyYXNzMy5wbmcnXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL3Jlc291cmNlTGlzdC5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblx0bWFpbkxheWVyIDoge1xyXG5cdFx0aWQ6ICdtYWluTGF5ZXInLFxyXG5cdFx0c2l6ZSA6IFs4MDAsNjAwXSxcclxuXHRcdGJhY2tncm91bmQ6ICdpbWcvZ3Jhc3MyLnBuZycsXHJcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyXHRwbGF5ZXJDb25maWcgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdwbGF5ZXInKTtcclxuXHRcdFx0cGxheWVyQ29uZmlnLnBvcyA9IFs0MDAsMzAwXTtcclxuXHRcdFx0cGxheWVyQ29uZmlnLmlkID0gJ3BsYXllcic7XHJcblxyXG5cdFx0XHR2YXJcdGN1cnNvckNvbmZpZyA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2N1cnNvcicpO1xyXG5cdFx0XHRjdXJzb3JDb25maWcucG9zID0gWzQwMCwzNTBdO1xyXG5cdFx0XHRjdXJzb3JDb25maWcuaWQgPSAnY3Vyc29yJztcclxuXHJcblx0XHRcdHRoaXMuYWRkT2JqZWN0cyhbY3Vyc29yQ29uZmlnLCBwbGF5ZXJDb25maWddKTtcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydzcGF3bl9tb25zdGVyJ11cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvbGF5ZXJDb25maWcuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25UQTtBQUNBO0FBV0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=