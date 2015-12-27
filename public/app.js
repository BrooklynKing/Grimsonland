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

	document.addEventListener("DOMContentLoaded",function () {
		document.body.appendChild(canvas);
		canvas = document.getElementsByTagName('canvas')[0];
		canvas.focus();

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
					console.log(event);
					obj.parameters.health -= event.damage;
					console.log(obj.parameters.health, event.damage);
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
					pos[0] = this.pos[0] - 0.01;
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
	                console.log('DAMAGE');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vanMvb2JqZWN0c0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vanMvbG9naWNDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2pzL3J1bGVzQ29uZmlnLmpzIiwid2VicGFjazovLy9qcy9yZXNvdXJjZUxpc3QuanMiLCJ3ZWJwYWNrOi8vL2pzL2xheWVyQ29uZmlnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYmplY3RzIGZyb20gJy4vb2JqZWN0c0NvbmZpZyc7XHJcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljQ29uZmlnJztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXNDb25maWcnO1xyXG5pbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VMaXN0JztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVyQ29uZmlnJztcclxuXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxyXG5cdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5jYW52YXMud2lkdGggPSA2MDA7XHJcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XHJcblxyXG52YXIgZ2FtZSA9IGVuZ2luZS5kZWZhdWx0KHtcclxuXHRvYmplY3RzOiBvYmplY3RzLFxyXG5cdGxvZ2ljOiBsb2dpYyxcclxuXHRydWxlczogcnVsZXMsXHJcblx0bGF5ZXJzOiBsYXllcnMsXHJcblx0cmVzb3VyY2VzOiByZXNvdXJjZXMsXHJcblx0Y2FudmFzOiBjYW52YXMsXHJcblx0Y3R4OiBjdHgsXHJcblx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZ2FtZSA9IHRoaXM7XHJcblx0XHR2YXIgbWFpbkxheWVyID0gZ2FtZS5hZGRMYXllcih0aGlzLmdldExheWVyQ29uZmlnKCdtYWluTGF5ZXInKSk7XHJcblxyXG5cdFx0bWFpbkxheWVyLmluaXQoKTtcclxuXHRcdGdhbWUuYmluZEdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0bWFpbkxheWVyLmNsZWFyTGF5ZXIoKTtcclxuXHRcdFx0bWFpbkxheWVyLmluaXQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cdGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjYW52YXMnKVswXTtcclxuXHRjYW52YXMuZm9jdXMoKTtcclxuXHJcblx0Z2FtZS5pbml0KCk7XHJcbn1cclxuXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdFx0cGxheWVyIDoge1xyXG5cdFx0XHR6SW5kZXggOiAyLFxyXG5cdFx0XHRpZCA6ICdwbGF5ZXInLFxyXG5cdFx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMyLnBuZycsIFswLCAwXSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcblx0XHRcdHNpemUgOiBbMzAsMzBdLFxyXG5cdFx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRcdHNwZWVkIDogMTUwLFxyXG5cdFx0XHRcdGhlYWx0aCA6IDEsXHJcblx0XHRcdFx0Y29vbGRvd246IDEwLFxyXG5cdFx0XHRcdGZpcmVDb29sZG93biA6IDEwLFxyXG5cdFx0XHRcdGJ1bGxldHNGaXJlZDogMCxcclxuXHRcdFx0XHRkaXJlY3Rpb24gOiB7fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlIDogJ3BsYXllcicsXHJcblx0XHRcdHJ1bGVzIDogWydiaW5kUG9zaXRpb25Ub0xheWVyJywgJ3BsYXllckRlYXRoJywgJ2NhblNob290JywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVUb01vdXNlJ11cclxuXHRcdH0sXHJcblx0XHRleHBsb3Npb24gOiB7XHJcblx0XHRcdHpJbmRleCA6IDMsXHJcblx0XHRcdHNwcml0ZTogWydpbWcvc3ByaXRlcy5wbmcnLCBbMCwgMTE3XSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdXHJcblx0XHR9LFxyXG5cdFx0bW9uc3RlciA6IHtcclxuXHRcdFx0ekluZGV4IDogMSxcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzMi5wbmcnLCBbMCwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcblx0XHRcdHNpemUgOiBbMzAsMzBdLFxyXG5cdFx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRcdHNwZWVkIDogNTAsXHJcblx0XHRcdFx0ZGVncmVlU3BlZWQ6IDAuMDMsXHJcblx0XHRcdFx0ZGVncmVlUm90YXRpb24gOiAxLFxyXG5cdFx0XHRcdGhlYWx0aCA6IDYsXHJcblx0XHRcdFx0cG93ZXIgOiAxXHJcblx0XHRcdH0sXHJcblx0XHRcdHR5cGUgOiAnbW9uc3RlcicsXHJcblx0XHRcdHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnbW9uc3RlckhlYWx0aFN0YXR1cycsICdkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCddLFxyXG5cdFx0fSxcclxuXHRcdG1vbnN0ZXJCb3NzIDoge1xyXG5cdFx0XHR6SW5kZXggOiAxLFxyXG5cdFx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMyLnBuZycsIFsxOTIsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRzcGVlZCA6IDMwLFxyXG5cdFx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRcdGRlZ3JlZVJvdGF0aW9uIDogMSxcclxuXHRcdFx0XHRidWxsZXRzRmlyZWQgOiAwLFxyXG5cdFx0XHRcdGNvb2xkb3duIDogNzAgLFxyXG5cdFx0XHRcdGZpcmVDb29sZG93biA6IDIwLFxyXG5cdFx0XHRcdHBvd2VyIDogNSxcclxuXHRcdFx0XHRoZWFsdGggOiAzMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlIDogJ21vbnN0ZXInLFxyXG5cdFx0XHRydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCddLFxyXG5cdFx0fSxcclxuXHRcdGJ1bGxldCA6IHtcclxuXHRcdFx0ekluZGV4IDogMixcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9ic3ByaXRlLnBuZycsWyAwLCAwXSwgWzI3LCAyN10sIDE2LCBbMCwgMV1dLFxyXG5cdFx0XHRzaXplIDogWzIwLCAyMF0sXHJcblx0XHRcdHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRwb3dlciA6IDEwLFxyXG5cdFx0XHRcdHNwZWVkOiAzNTBcclxuXHRcdFx0fSxcclxuXHRcdFx0cnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnYnVsbGV0TW9uc3RlckNvbGxpc2lvbiddXHJcblx0XHR9LFxyXG5cdFx0bWJ1bGxldCA6IHtcclxuXHRcdFx0ekluZGV4IDogMixcclxuXHRcdFx0c3ByaXRlOiBbJ2ltZy9pY2ViYWxsLnBuZycsWzAsIDBdLCBbMTUsIDE2XSwgMTYsIFswLCAxLCAyXV0sXHJcblx0XHRcdHR5cGUgOiAnbW9uc3RlclNwZWxsRWxlbWVudCcsXHJcblx0XHRcdHNpemUgOiBbMTIsIDEyXSxcclxuXHRcdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0XHRwb3dlciA6IDEsXHJcblx0XHRcdFx0c3BlZWQ6IDE1MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXVxyXG5cdFx0fSxcclxuXHRcdGN1cnNvciA6IHtcclxuXHRcdFx0ekluZGV4IDogOTk5LFxyXG5cdFx0XHRzcHJpdGUgOiBbJ2ltZy9jdXJzb3IucG5nJywgWzAsIDBdLCBbMzAsIDMwXV1cclxuXHRcdH0sXHJcblx0XHRibG9vZCA6IHtcclxuXHRcdFx0ekluZGV4IDogMCxcclxuXHRcdFx0c3ByaXRlIDogWydpbWcvYmxvb2QucG5nJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcblx0XHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdFx0Y29vbGRvd24gOiA1MDBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9vYmplY3RzQ29uZmlnLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcblx0cGxheWVyIDoge1xyXG5cdFx0Y2FsbGJhY2tzIDoge1xyXG5cdFx0XHQnZGFtYWdlJyA6IGZ1bmN0aW9uKG9iaiwgZXZlbnQpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhldmVudCk7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuaGVhbHRoIC09IGV2ZW50LmRhbWFnZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhvYmoucGFyYW1ldGVycy5oZWFsdGgsIGV2ZW50LmRhbWFnZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdCdlY2xpY2snIDogZnVuY3Rpb24ob2JqLCBldmVudCl7XHJcblx0XHRcdFx0aWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcblx0XHRcdFx0XHR2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0JyksXHJcblx0XHRcdFx0XHRcdG1haW5MYXllciA9IG9iai5sYXllcixcclxuXHRcdFx0XHRcdFx0ZGVzdGluYXRpb24gPSAob2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uKT9bb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uLngsIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdIC0gMV0sXHJcblx0XHRcdFx0XHRcdGRpcmVjdGlvbjEgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pLFxyXG5cdFx0XHRcdFx0XHRkaXJlY3Rpb24yID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgMjApKSxcclxuXHRcdFx0XHRcdFx0ZGlyZWN0aW9uMyA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIC0yMCkpO1xyXG5cclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuXHRcdFx0XHRcdGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKys7XHJcblxyXG5cdFx0XHRcdFx0YnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMTtcclxuXHRcdFx0XHRcdG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIChvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKyk7XHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24yO1xyXG5cclxuXHRcdFx0XHRcdG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIChvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKyk7XHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcblx0XHRcdFx0XHRidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24zO1xyXG5cclxuXHRcdFx0XHRcdG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHRcdFx0XHRcdG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0J2tleV82NScgOiBmdW5jdGlvbihvYmosIGV2ZW50KSB7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQgPSBldmVudC5rZXlTdGF0dXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdCdrZXlfODcnIDogZnVuY3Rpb24ob2JqLCBldmVudCkge1xyXG5cdFx0XHRcdG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi51cCA9IGV2ZW50LmtleVN0YXR1cztcclxuXHRcdFx0fSxcclxuXHRcdFx0J2tleV84MycgOiBmdW5jdGlvbihvYmosIGV2ZW50KSB7XHJcblx0XHRcdFx0b2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24gPSBldmVudC5rZXlTdGF0dXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdCdrZXlfNjgnIDogZnVuY3Rpb24ob2JqLCBldmVudCkge1xyXG5cdFx0XHRcdG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCA9IGV2ZW50LmtleVN0YXR1cztcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZSA6IGZ1bmN0aW9uKGR0KSB7XHJcblx0XHRcdHZhciBwb3MgPSB1dGlscy5jbG9uZSh0aGlzLnBvcyk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG5cdFx0XHRcdHBvc1swXSA9IHRoaXMucG9zWzBdICsgMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcblx0XHRcdFx0cG9zWzBdID0gdGhpcy5wb3NbMF0gLSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuXHRcdFx0XHRwb3NbMV0gPSB0aGlzLnBvc1sxXSArIDE7XHJcblx0XHRcdFx0cG9zWzBdID0gdGhpcy5wb3NbMF0gLSAwLjAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnVwKSB7XHJcblx0XHRcdFx0cG9zWzFdID0gdGhpcy5wb3NbMV0gLSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnBvc1swXSA9PSBwb3NbMF0gJiYgdGhpcy5wb3NbMV0gPT0gcG9zWzFdKSB7XHJcblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIgPSBudWxsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24odGhpcy5wb3MsIHBvcyk7XHJcblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5rID0gZGlyZWN0aW9uLms7XHJcblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIgPSBkaXJlY3Rpb24uZGlyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRleHBsb3Npb24gOiB7XHJcblx0XHR1cGRhdGUgOiBmdW5jdGlvbiAoZHQpIHtcclxuXHRcdFx0aWYodGhpcy5zcHJpdGUuZG9uZSkge1xyXG5cdFx0XHRcdHZhclx0Ymxvb2RDb25maWcgPSB0aGlzLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdibG9vZCcpO1xyXG5cdFx0XHRcdGJsb29kQ29uZmlnLnBvcyA9IHRoaXMucG9zO1xyXG5cdFx0XHRcdGJsb29kQ29uZmlnLmlkID0gJ2Jsb29kXycgKyB0aGlzLmlkO1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIuYWRkT2JqZWN0KCBibG9vZENvbmZpZyk7XHJcblx0XHRcdFx0dGhpcy5sYXllci5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdG1vbnN0ZXIgOiB7XHJcblx0XHRjYWxsYmFja3MgOiB7XHJcblx0XHRcdCdkYW1hZ2UnOiBmdW5jdGlvbiAob2JqLCBldmVudCkge1xyXG5cdFx0XHRcdG9iai5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBldmVudC5kYW1hZ2U7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0bW9uc3RlckJvc3MgOiB7XHJcblx0XHRjYWxsYmFja3MgOiB7XHJcblx0XHRcdCdkYW1hZ2UnOiBmdW5jdGlvbiAob2JqLCBldmVudCkge1xyXG5cdFx0XHRcdG9iai5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBldmVudC5kYW1hZ2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcblx0XHRcdHZhciBwbGF5ZXIgPSB0aGlzLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cdFx0XHRpZiAodGhpcy5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcblx0XHRcdFx0dmFyXHRidWxsZXRDb25maWcgPSB0aGlzLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtYnVsbGV0JyksXHJcblx0XHRcdFx0XHRkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24odGhpcy5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuXHRcdFx0XHRidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUodGhpcy5wb3MpO1xyXG5cdFx0XHRcdGJ1bGxldENvbmZpZy5pZCA9ICdtYnVsbGV0XycgKyB0aGlzLmlkICsgJ18nICsgdGhpcy5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZDtcclxuXHJcblx0XHRcdFx0YnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG5cdFx0XHRcdHRoaXMucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuXHRcdFx0XHR0aGlzLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRjdXJzb3IgOiB7XHJcblx0XHR1cGRhdGUgOiBmdW5jdGlvbihkdCkge1xyXG5cdFx0XHR0aGlzLnNldFBvc2l0aW9uKCh0aGlzLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uKT9bdGhpcy5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbi54LCB0aGlzLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb3VzZXBvc2l0aW9uLnldIDogW3RoaXMucG9zWzBdLCB0aGlzLnBvc1sxXV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Ymxvb2QgOiB7XHJcblx0XHR1cGRhdGUgOiBmdW5jdGlvbihkdCkge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duID09IDApIHtcclxuXHRcdFx0XHR0aGlzLmxheWVyLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnBhcmFtZXRlcnMuY29vbGRvd24tLTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9sb2dpY0NvbmZpZy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgICAgIHNwYXduX21vbnN0ZXIgOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmope1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCA8IHRoaXMucGFyYW1ldGVycy50b3RhbE1vbnN0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhclx0bW9uc3RlckNvbmZpZyA9IChNYXRoLnJhbmRvbSgpICogMTAwID4gOTUpPyBvYmouZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJCb3NzJykgOiBvYmouZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbVN0YXJ0UG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tU3RhcnRQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDogbW9uc3RlckNvbmZpZy5wb3MgPSBbIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKCBNYXRoLnJhbmRvbSgpICogNzIwKV07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDogbW9uc3RlckNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZCggIE1hdGgucmFuZG9tKCkgKiAxMjgwKSwgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMiA6IG1vbnN0ZXJDb25maWcucG9zID0gWzEyODAgLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVswXSwgTWF0aC5yb3VuZCggTWF0aC5yYW5kb20oKSAqIDcyMCldOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMyA6IG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoICBNYXRoLnJhbmRvbSgpICogMTI4MCksIDcyMCAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzFdXTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5pZCA9ICdtb25zdGVyJyArIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLmxheWVyID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNb25zdGVyQ29vbGRvd24gOiAwLFxyXG4gICAgICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duIDogNSxcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJTcGF3bmVkIDogMCxcclxuICAgICAgICAgICAgICAgIHRvdGFsTW9uc3RlcnMgOiA1MDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyRGVhdGg6IHtcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUudHJpZ2dlckdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iai5wb3MsIG9iai5zaXplLCBwbGF5ZXIucG9zLCBwbGF5ZXIuc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIudHJpZ2dlckFjdGlvbignZGFtYWdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U6IG9iai5wYXJhbWV0ZXJzLnBvd2VyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Ryb3lPblBsYXllckNvbGxpc2lvbiA6IHtcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHRleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBwbGF5ZXIucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5pZCA9ICdleHBfJyArIHBsYXllci5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidWxsZXRNb25zdGVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXJzID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1vbnN0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgbW9uc3RlcnNbaV0ucG9zLCBtb25zdGVyc1tpXS5zaXplKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyc1tpXS50cmlnZ2VyQWN0aW9uKCdkYW1hZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U6IG9iai5wYXJhbWV0ZXJzLnBvd2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyXHRleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbW9uc3RlcnNbaV0ucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBtb25zdGVyc1tpXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQb3NpdGlvblRvTGF5ZXIgOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmope1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDwgb2JqLmxheWVyLnBvc1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmoucG9zWzBdICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIDwgb2JqLmxheWVyLnBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihvYmoucG9zWzFdICsgb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBvc1sxXSA8IDAgfHwgb2JqLnBvc1sxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSB8fCBvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdID4gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIHx8IG9iai5wb3NbMF0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldERpcmVjdGlvblRvUGxheWVyIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZVRvRGlyZWN0aW9uIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24sIG9iai5wYXJhbWV0ZXJzLnNwZWVkICogZHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9uc3RlckhlYWx0aFN0YXR1cyA6IHtcclxuICAgICAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEQU1BR0UnKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudChvYmoudHlwZSArICdfa2lsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdGF0ZUJ5RGlyZWN0aW9uIDoge1xyXG4gICAgICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdGF0ZVRvTW91c2UgOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbik/W29iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW91c2Vwb3NpdGlvbi54LCBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vdXNlcG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvTW91c2UgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oZGlyZWN0aW9uVG9Nb3VzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhblNob290OiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9ydWxlc0NvbmZpZy5qc1xuICoqLyIsInZhciBsaXN0ID0gW1xyXG4gICAgJ2ltZy9zcHJpdGVzLnBuZycsXHJcbiAgICAnaW1nL2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL2ljZWJhbGwucG5nJyxcclxuICAgICdpbWcvYnNwcml0ZS5wbmcnLFxyXG4gICAgJ2ltZy9jdXJzb3IucG5nJyxcclxuICAgICdpbWcvc3ByaXRlczIucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MzLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvcmVzb3VyY2VMaXN0LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRtYWluTGF5ZXIgOiB7XHJcblx0XHRpZDogJ21haW5MYXllcicsXHJcblx0XHRzaXplIDogWzYwMCw2MDBdLFxyXG5cdFx0YmFja2dyb3VuZDogJ2ltZy9ncmFzczMucG5nJyxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXJcdHBsYXllckNvbmZpZyA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3BsYXllcicpO1xyXG5cdFx0XHRwbGF5ZXJDb25maWcucG9zID0gWzMwMCwzMDBdO1xyXG5cdFx0XHRwbGF5ZXJDb25maWcuaWQgPSAncGxheWVyJztcclxuXHJcblx0XHRcdHZhclx0Y3Vyc29yQ29uZmlnID0gdGhpcy5nYW1lLmdldENvbmZpZygnY3Vyc29yJyk7XHJcblx0XHRcdGN1cnNvckNvbmZpZy5wb3MgPSBbMzAwLDMwMF07XHJcblx0XHRcdGN1cnNvckNvbmZpZy5pZCA9ICdjdXJzb3InO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRPYmplY3RzKFtjdXJzb3JDb25maWcsIHBsYXllckNvbmZpZ10pO1xyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3NwYXduX21vbnN0ZXInXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9sYXllckNvbmZpZy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQVNBOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9