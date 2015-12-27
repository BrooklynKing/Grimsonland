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

	canvas.width = 600;
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
			id: 'player',
			sprite: ['img/sprites2.png', [0, 0], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 150,
				health: 1,
				cooldown: 10,
				fireCooldown: 10,
				bulletsFired: 0,
				direction: {}
			},
			type: 'player',
			rules: ['bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse']
		},
		explosion: {
			zIndex: 3,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true]
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
			rules: ['setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'rotateByDirection', 'canShoot']
		},
		bullet: {
			zIndex: 2,
			sprite: ['img/bsprite.png', [0, 0], [27, 27], 16, [0, 1]],
			size: [20, 20],
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 350
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
			sprite: ['img/cursor.png', [0, 0], [30, 30]]
		},
		blood: {
			zIndex: 0,
			sprite: ['img/blood.png', [0, 0], [32, 13]],
			parameters: {
				cooldown: 500
			}
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

	var config = {
		player: {
			callbacks: {
				'damage': function damage(obj, event) {
					obj.parameters.health -= event.damage;
				},
				'eclick': function eclick(obj, event) {
					if (obj.parameters.fireCooldown == 0) {
						var bulletConfig = obj.layer.game.getConfig('bullet'),
						    mainLayer = obj.layer,
						    destination = obj.layer.game.parameters.mouseposition ? [obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1] - 1],
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
				},
				'key_65': function key_65(obj, event) {
					obj.parameters.direction.left = event.keyStatus;
				},
				'key_87': function key_87(obj, event) {
					obj.parameters.direction.up = event.keyStatus;
				},
				'key_83': function key_83(obj, event) {
					obj.parameters.direction.down = event.keyStatus;
				},
				'key_68': function key_68(obj, event) {
					obj.parameters.direction.right = event.keyStatus;
				}
			},
			update: function update(dt) {
				var pos = _utils2.default.clone(this.pos);

				if (this.parameters.direction.right) {
					pos[0] = this.pos[0] + 1;
				}
				if (this.parameters.direction.left) {
					pos[0] = this.pos[0] - 1;
				}
				if (this.parameters.direction.down) {
					pos[1] = this.pos[1] + 1;
				}
				if (this.parameters.direction.up) {
					pos[1] = this.pos[1] - 1;
				}
				if (this.pos[0] == pos[0] && this.pos[1] == pos[1]) {
					this.parameters.direction.dir = null;
				} else {
					var direction = _utils2.default.getDirection(this.pos, pos);
					this.parameters.direction.k = direction.k;
					this.parameters.direction.dir = direction.dir;
				}
			}
		},
		explosion: {
			update: function update(dt) {
				if (this.sprite.done) {
					var bloodConfig = this.layer.game.getConfig('blood');
					bloodConfig.pos = this.pos;
					bloodConfig.id = 'blood_' + this.id;
					this.layer.addObject(bloodConfig);
					this.layer.removeObject(this.id);
				}
			}
		},
		monster: {
			callbacks: {
				'damage': function damage(obj, event) {
					obj.parameters.health -= event.damage;
				}
			}
		},
		monsterBoss: {
			callbacks: {
				'damage': function damage(obj, event) {
					obj.parameters.health -= event.damage;
				}
			},
			update: function update(dt, obj) {
				var player = this.layer.getObjectsByType('player')[0];
				if (this.parameters.fireCooldown == 0) {
					var bulletConfig = this.layer.game.getConfig('mbullet'),
					    direction = _utils2.default.getDirection(this.pos, player.pos);

					bulletConfig.pos = _utils2.default.clone(this.pos);
					bulletConfig.id = 'mbullet_' + this.id + '_' + this.parameters.bulletsFired;

					bulletConfig.parameters.direction = direction;
					this.layer.addObject(bulletConfig);

					this.parameters.bulletsFired++;
					this.parameters.fireCooldown = this.parameters.cooldown;
				}
			}
		},
		cursor: {
			update: function update(dt) {
				this.setPosition(this.layer.game.parameters.mouseposition ? [this.layer.game.parameters.mouseposition.x, this.layer.game.parameters.mouseposition.y] : [this.pos[0], this.pos[1]]);
			}
		},
		blood: {
			update: function update(dt) {
				if (this.parameters.cooldown == 0) {
					this.layer.removeObject(this.id);
				} else {
					this.parameters.cooldown--;
				}
			}
		}
	};

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
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < this.parameters.totalMonsters) {
	                if (this.parameters.currentMonsterCooldown == 0) {

	                    var monsterConfig = Math.random() * 100 > 95 ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
	                        randomStartPosition = Math.round(Math.random() * 3);

	                    switch (randomStartPosition) {
	                        case 0:
	                            monsterConfig.pos = [monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];break;
	                        case 1:
	                            monsterConfig.pos = [Math.round(Math.random() * 1280), monsterConfig.sprite[2][1]];break;
	                        case 2:
	                            monsterConfig.pos = [1280 - monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];break;
	                        case 3:
	                            monsterConfig.pos = [Math.round(Math.random() * 1280), 720 - monsterConfig.sprite[2][1]];break;
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
	                player.triggerAction('damage', {
	                    damage: obj.parameters.power
	                });
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
	                    monsters[i].triggerAction('damage', {
	                        damage: obj.parameters.power
	                    });

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
	            var destination = obj.layer.game.parameters.mouseposition ? [obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1] + 1],
	                directionToMouse = _utils2.default.getDirection(obj.pos, destination);

	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    canShoot: {
	        update: function update(dt, obj) {
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
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
	var list = ['img/sprites.png', 'img/blood.png', 'img/iceball.png', 'img/bsprite.png', 'img/cursor.png', 'img/sprites2.png', 'img/grass3.png'];

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
			size: [600, 600],
			background: 'img/grass3.png',
			init: function init() {
				var playerConfig = this.game.getConfig('player');
				playerConfig.pos = [300, 300];
				playerConfig.id = 'player';

				var cursorConfig = this.game.getConfig('cursor');
				cursorConfig.pos = [300, 300];
				cursorConfig.id = 'cursor';

				this.addObjects([cursorConfig, playerConfig]);
			},
			rules: ['spawn_monster']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vanMvb2JqZWN0c0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vanMvbG9naWNDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2pzL3J1bGVzQ29uZmlnLmpzIiwid2VicGFjazovLy9qcy9yZXNvdXJjZUxpc3QuanMiLCJ3ZWJwYWNrOi8vL2pzL2xheWVyQ29uZmlnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYmplY3RzIGZyb20gJy4vb2JqZWN0c0NvbmZpZyc7XHJcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljQ29uZmlnJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXNDb25maWcnO1xyXG5pbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VMaXN0JztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVyQ29uZmlnJztcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxyXG5cdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5jYW52YXMud2lkdGggPSA2MDA7XHJcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblx0Y2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xyXG5cdGNhbnZhcy5mb2N1cygpO1xyXG5cclxuXHR2YXIgZ2FtZSA9IGVuZ2luZS5kZWZhdWx0KHtcclxuXHRcdG9iamVjdHM6IG9iamVjdHMsXHJcblx0XHRsb2dpYzogbG9naWMsXHJcblx0XHRydWxlczogcnVsZXMsXHJcblx0XHRsYXllcnM6IGxheWVycyxcclxuXHRcdHJlc291cmNlczogcmVzb3VyY2VzLFxyXG5cdFx0Y2FudmFzOiBjYW52YXMsXHJcblx0XHRjdHg6IGN0eCxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZ2FtZSA9IHRoaXM7XHJcblx0XHRcdHZhciBtYWluTGF5ZXIgPSBnYW1lLmFkZExheWVyKHRoaXMuZ2V0TGF5ZXJDb25maWcoJ21haW5MYXllcicpKTtcclxuXHJcblx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdGdhbWUuYmluZEdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRtYWluTGF5ZXIuY2xlYXJMYXllcigpO1xyXG5cdFx0XHRcdG1haW5MYXllci5pbml0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRnYW1lLmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRcdHBsYXllciA6IHtcclxuXHRcdFx0ekluZGV4IDogMixcclxuXHRcdFx0aWQgOiAncGxheWVyJyxcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzMi5wbmcnLCBbMCwgMF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDE1MCxcclxuXHRcdFx0XHRoZWFsdGggOiAxLFxyXG5cdFx0XHRcdGNvb2xkb3duOiAxMCxcclxuXHRcdFx0XHRmaXJlQ29vbGRvd24gOiAxMCxcclxuXHRcdFx0XHRidWxsZXRzRmlyZWQ6IDAsXHJcblx0XHRcdFx0ZGlyZWN0aW9uIDoge31cclxuXHRcdFx0fSxcclxuXHRcdFx0dHlwZSA6ICdwbGF5ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdjYW5TaG9vdCcsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlVG9Nb3VzZSddXHJcblx0XHR9LFxyXG5cdFx0ZXhwbG9zaW9uIDoge1xyXG5cdFx0XHR6SW5kZXggOiAzLFxyXG5cdFx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMucG5nJywgWzAsIDExN10sIFszOSwgMzldLCAxNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdLCBudWxsLCB0cnVlXVxyXG5cdFx0fSxcclxuXHRcdG1vbnN0ZXIgOiB7XHJcblx0XHRcdHpJbmRleCA6IDEsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvc3ByaXRlczIucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDUwLFxyXG5cdFx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRcdGRlZ3JlZVJvdGF0aW9uIDogMSxcclxuXHRcdFx0XHRoZWFsdGggOiA2LFxyXG5cdFx0XHRcdHBvd2VyIDogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnY2FuU2hvb3QnXSxcclxuXHRcdH0sXHJcblx0XHRtb25zdGVyQm9zcyA6IHtcclxuXHRcdFx0ekluZGV4IDogMSxcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzMi5wbmcnLCBbMTkyLCAxMjhdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdFx0c2l6ZSA6IFszMCwzMF0sXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0c3BlZWQgOiAzMCxcclxuXHRcdFx0XHRkZWdyZWVTcGVlZDogMC4wMyxcclxuXHRcdFx0XHRkZWdyZWVSb3RhdGlvbiA6IDEsXHJcblx0XHRcdFx0YnVsbGV0c0ZpcmVkIDogMCxcclxuXHRcdFx0XHRjb29sZG93biA6IDcwICxcclxuXHRcdFx0XHRmaXJlQ29vbGRvd24gOiAyMCxcclxuXHRcdFx0XHRwb3dlciA6IDUsXHJcblx0XHRcdFx0aGVhbHRoIDogMzBcclxuXHRcdFx0fSxcclxuXHRcdFx0dHlwZSA6ICdtb25zdGVyJyxcclxuXHRcdFx0cnVsZXMgOiBbJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdtb25zdGVySGVhbHRoU3RhdHVzJywncm90YXRlQnlEaXJlY3Rpb24nLCAnY2FuU2hvb3QnXSxcclxuXHRcdH0sXHJcblx0XHRidWxsZXQgOiB7XHJcblx0XHRcdHpJbmRleCA6IDIsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvYnNwcml0ZS5wbmcnLFsgMCwgMF0sIFsyNywgMjddLCAxNiwgWzAsIDFdXSxcclxuXHRcdFx0c2l6ZSA6IFsyMCwgMjBdLFxyXG5cdFx0XHR0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0cG93ZXIgOiAxMCxcclxuXHRcdFx0XHRzcGVlZDogMzUwXHJcblx0XHRcdH0sXHJcblx0XHRcdHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2J1bGxldE1vbnN0ZXJDb2xsaXNpb24nXVxyXG5cdFx0fSxcclxuXHRcdG1idWxsZXQgOiB7XHJcblx0XHRcdHpJbmRleCA6IDIsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvaWNlYmFsbC5wbmcnLFswLCAwXSwgWzE1LCAxNl0sIDE2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG5cdFx0XHRzaXplIDogWzEyLCAxMl0sXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0cG93ZXIgOiAxLFxyXG5cdFx0XHRcdHNwZWVkOiAxNTBcclxuXHRcdFx0fSxcclxuXHRcdFx0cnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAnZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uJ11cclxuXHRcdH0sXHJcblx0XHRjdXJzb3IgOiB7XHJcblx0XHRcdHpJbmRleCA6IDk5OSxcclxuXHRcdFx0c3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dXHJcblx0XHR9LFxyXG5cdFx0Ymxvb2QgOiB7XHJcblx0XHRcdHpJbmRleCA6IDAsXHJcblx0XHRcdHNwcml0ZSA6IFsnaW1nL2Jsb29kLnBuZycsIFswLCAwXSwgWzMyLCAxM11dLFxyXG5cdFx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRcdGNvb2xkb3duIDogNTAwXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvb2JqZWN0c0NvbmZpZy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG5cdHBsYXllciA6IHtcclxuXHRcdGNhbGxiYWNrcyA6IHtcclxuXHRcdFx0J2RhbWFnZScgOiBmdW5jdGlvbihvYmosIGV2ZW50KSB7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuaGVhbHRoIC09IGV2ZW50LmRhbWFnZTtcclxuXHRcdFx0fSxcclxuXHRcdFx0J2VjbGljaycgOiBmdW5jdGlvbihvYmosIGV2ZW50KXtcclxuXHRcdFx0XHRpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuXHRcdFx0XHRcdHZhclx0YnVsbGV0Q29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdidWxsZXQnKSxcclxuXHRcdFx0XHRcdFx0bWFpbkxheWVyID0gb2JqLmxheWVyLFxyXG5cdFx0XHRcdFx0XHRkZXN0aW5hdGlvbiA9IChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24pP1tvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24ueCwgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gLSAxXSxcclxuXHRcdFx0XHRcdFx0ZGlyZWN0aW9uMSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbiksXHJcblx0XHRcdFx0XHRcdGRpcmVjdGlvbjIgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAyMCkpLFxyXG5cdFx0XHRcdFx0XHRkaXJlY3Rpb24zID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwKSk7XHJcblxyXG5cdFx0XHRcdFx0YnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cdFx0XHRcdFx0YnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuXHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24xO1xyXG5cdFx0XHRcdFx0b2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjI7XHJcblxyXG5cdFx0XHRcdFx0b2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjM7XHJcblxyXG5cdFx0XHRcdFx0b2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cdFx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQna2V5XzY1JyA6IGZ1bmN0aW9uKG9iaiwgZXZlbnQpIHtcclxuXHRcdFx0XHRvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ubGVmdCA9IGV2ZW50LmtleVN0YXR1cztcclxuXHRcdFx0fSxcclxuXHRcdFx0J2tleV84NycgOiBmdW5jdGlvbihvYmosIGV2ZW50KSB7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnVwID0gZXZlbnQua2V5U3RhdHVzO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQna2V5XzgzJyA6IGZ1bmN0aW9uKG9iaiwgZXZlbnQpIHtcclxuXHRcdFx0XHRvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93biA9IGV2ZW50LmtleVN0YXR1cztcclxuXHRcdFx0fSxcclxuXHRcdFx0J2tleV82OCcgOiBmdW5jdGlvbihvYmosIGV2ZW50KSB7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnJpZ2h0ID0gZXZlbnQua2V5U3RhdHVzO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlIDogZnVuY3Rpb24oZHQpIHtcclxuXHRcdFx0dmFyIHBvcyA9IHV0aWxzLmNsb25lKHRoaXMucG9zKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnJpZ2h0KSB7XHJcblx0XHRcdFx0cG9zWzBdID0gdGhpcy5wb3NbMF0gKyAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQpIHtcclxuXHRcdFx0XHRwb3NbMF0gPSB0aGlzLnBvc1swXSAtIDE7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93bikge1xyXG5cdFx0XHRcdHBvc1sxXSA9IHRoaXMucG9zWzFdICsgMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi51cCkge1xyXG5cdFx0XHRcdHBvc1sxXSA9IHRoaXMucG9zWzFdIC0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5wb3NbMF0gPT0gcG9zWzBdICYmIHRoaXMucG9zWzFdID09IHBvc1sxXSkge1xyXG5cdFx0XHRcdHRoaXMucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyID0gbnVsbDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKHRoaXMucG9zLCBwb3MpO1xyXG5cdFx0XHRcdHRoaXMucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG5cdFx0XHRcdHRoaXMucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyID0gZGlyZWN0aW9uLmRpcjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZXhwbG9zaW9uIDoge1xyXG5cdFx0dXBkYXRlIDogZnVuY3Rpb24gKGR0KSB7XHJcblx0XHRcdGlmKHRoaXMuc3ByaXRlLmRvbmUpIHtcclxuXHRcdFx0XHR2YXJcdGJsb29kQ29uZmlnID0gdGhpcy5sYXllci5nYW1lLmdldENvbmZpZygnYmxvb2QnKTtcclxuXHRcdFx0XHRibG9vZENvbmZpZy5wb3MgPSB0aGlzLnBvcztcclxuXHRcdFx0XHRibG9vZENvbmZpZy5pZCA9ICdibG9vZF8nICsgdGhpcy5pZDtcclxuXHRcdFx0XHR0aGlzLmxheWVyLmFkZE9iamVjdCggYmxvb2RDb25maWcpO1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIucmVtb3ZlT2JqZWN0KHRoaXMuaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRtb25zdGVyIDoge1xyXG5cdFx0Y2FsbGJhY2tzIDoge1xyXG5cdFx0XHQnZGFtYWdlJzogZnVuY3Rpb24gKG9iaiwgZXZlbnQpIHtcclxuXHRcdFx0XHRvYmoucGFyYW1ldGVycy5oZWFsdGggLT0gZXZlbnQuZGFtYWdlO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdG1vbnN0ZXJCb3NzIDoge1xyXG5cdFx0Y2FsbGJhY2tzIDoge1xyXG5cdFx0XHQnZGFtYWdlJzogZnVuY3Rpb24gKG9iaiwgZXZlbnQpIHtcclxuXHRcdFx0XHRvYmoucGFyYW1ldGVycy5oZWFsdGggLT0gZXZlbnQuZGFtYWdlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG5cdFx0XHR2YXIgcGxheWVyID0gdGhpcy5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHRcdFx0aWYgKHRoaXMucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG5cdFx0XHRcdHZhclx0YnVsbGV0Q29uZmlnID0gdGhpcy5sYXllci5nYW1lLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG5cdFx0XHRcdFx0ZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKHRoaXMucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcblx0XHRcdFx0YnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKHRoaXMucG9zKTtcclxuXHRcdFx0XHRidWxsZXRDb25maWcuaWQgPSAnbWJ1bGxldF8nICsgdGhpcy5pZCArICdfJyArIHRoaXMucGFyYW1ldGVycy5idWxsZXRzRmlyZWQ7XHJcblxyXG5cdFx0XHRcdGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuXHRcdFx0XHR0aGlzLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKys7XHJcblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3Vyc29yIDoge1xyXG5cdFx0dXBkYXRlIDogZnVuY3Rpb24oZHQpIHtcclxuXHRcdFx0dGhpcy5zZXRQb3NpdGlvbigodGhpcy5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbik/W3RoaXMubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24ueCwgdGhpcy5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbi55XSA6IFt0aGlzLnBvc1swXSwgdGhpcy5wb3NbMV1dKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGJsb29kIDoge1xyXG5cdFx0dXBkYXRlIDogZnVuY3Rpb24oZHQpIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyYW1ldGVycy5jb29sZG93biA9PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duLS07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvbG9naWNDb25maWcuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9lbmdpbmUvdXRpbHMnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgICAgICBzcGF3bl9tb25zdGVyIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCB0aGlzLnBhcmFtZXRlcnMudG90YWxNb25zdGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93biA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJcdG1vbnN0ZXJDb25maWcgPSAoTWF0aC5yYW5kb20oKSAqIDEwMCA+IDk1KT8gb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyQm9zcycpIDogb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21TdGFydFBvc2l0aW9uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJhbmRvbVN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMCA6IG1vbnN0ZXJDb25maWcucG9zID0gWyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVswXSwgTWF0aC5yb3VuZCggTWF0aC5yYW5kb20oKSAqIDcyMCldOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6IG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoICBNYXRoLnJhbmRvbSgpICogMTI4MCksIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzFdXTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIgOiBtb25zdGVyQ29uZmlnLnBvcyA9IFsxMjgwIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMF0sIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiA3MjApXTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMgOiBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKCAgTWF0aC5yYW5kb20oKSAqIDEyODApLCA3MjAgLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcuaWQgPSAnbW9uc3RlcicgKyB0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5sYXllciA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChtb25zdGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9uc3RlckNvb2xkb3duIDogMCxcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJDb29sZG93biA6IDUsXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyU3Bhd25lZCA6IDAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbE1vbnN0ZXJzIDogNTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsYXllckRlYXRoOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFtYWdlT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnRyaWdnZXJBY3Rpb24oJ2RhbWFnZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFtYWdlOiBvYmoucGFyYW1ldGVycy5wb3dlclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24gOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIHBsYXllci5wb3MsIHBsYXllci5zaXplKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhclx0ZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gcGxheWVyLnBvcztcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBwbGF5ZXIuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb25zdGVycyA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdtb25zdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtb25zdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIG1vbnN0ZXJzW2ldLnBvcywgbW9uc3RlcnNbaV0uc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlcnNbaV0udHJpZ2dlckFjdGlvbignZGFtYWdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFtYWdlOiBvYmoucGFyYW1ldGVycy5wb3dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhclx0ZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG1vbnN0ZXJzW2ldLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLmlkID0gJ2V4cF8nICsgbW9uc3RlcnNbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUG9zaXRpb25Ub0xheWVyIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA8IG9iai5sYXllci5wb3NbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYob2JqLnBvc1swXSArIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3NbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYob2JqLnBvc1sxXSArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5wb3NbMV0gPCAwIHx8IG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gfHwgb2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSB8fCBvYmoucG9zWzBdIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXREaXJlY3Rpb25Ub1BsYXllciA6IHtcclxuICAgICAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmVUb0RpcmVjdGlvbiA6IHtcclxuICAgICAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24odXRpbHMuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLCBvYmoucGFyYW1ldGVycy5zcGVlZCAqIGR0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vbnN0ZXJIZWFsdGhTdGF0dXMgOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudChvYmoudHlwZSArICdfa2lsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdGF0ZUJ5RGlyZWN0aW9uIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdGF0ZVRvTW91c2UgOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbik/W29iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbi54LCBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvTW91c2UgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oZGlyZWN0aW9uVG9Nb3VzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhblNob290OiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9ydWxlc0NvbmZpZy5qc1xuICoqLyIsInZhciBsaXN0ID0gW1xyXG4gICAgJ2ltZy9zcHJpdGVzLnBuZycsXHJcbiAgICAnaW1nL2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL2ljZWJhbGwucG5nJyxcclxuICAgICdpbWcvYnNwcml0ZS5wbmcnLFxyXG4gICAgJ2ltZy9jdXJzb3IucG5nJyxcclxuICAgICdpbWcvc3ByaXRlczIucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MzLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvcmVzb3VyY2VMaXN0LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRtYWluTGF5ZXIgOiB7XHJcblx0XHRpZDogJ21haW5MYXllcicsXHJcblx0XHRzaXplIDogWzYwMCw2MDBdLFxyXG5cdFx0YmFja2dyb3VuZDogJ2ltZy9ncmFzczMucG5nJyxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXJcdHBsYXllckNvbmZpZyA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3BsYXllcicpO1xyXG5cdFx0XHRwbGF5ZXJDb25maWcucG9zID0gWzMwMCwzMDBdO1xyXG5cdFx0XHRwbGF5ZXJDb25maWcuaWQgPSAncGxheWVyJztcclxuXHJcblx0XHRcdHZhclx0Y3Vyc29yQ29uZmlnID0gdGhpcy5nYW1lLmdldENvbmZpZygnY3Vyc29yJyk7XHJcblx0XHRcdGN1cnNvckNvbmZpZy5wb3MgPSBbMzAwLDMwMF07XHJcblx0XHRcdGN1cnNvckNvbmZpZy5pZCA9ICdjdXJzb3InO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRPYmplY3RzKFtjdXJzb3JDb25maWcsIHBsYXllckNvbmZpZ10pO1xyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3NwYXduX21vbnN0ZXInXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9sYXllckNvbmZpZy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUpBO0FBQ0E7QUFTQTs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==