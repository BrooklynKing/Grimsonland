var configs =
webpackJsonp_name_([1,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _objects = __webpack_require__(1);

	var _objects2 = _interopRequireDefault(_objects);

	var _rules = __webpack_require__(2);

	var _rules2 = _interopRequireDefault(_rules);

	var _resources = __webpack_require__(5);

	var _resources2 = _interopRequireDefault(_resources);

	var _layers = __webpack_require__(6);

	var _layers2 = _interopRequireDefault(_layers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    objects: _objects2.default,
	    rules: _rules2.default,
	    resources: _resources2.default,
	    layers: _layers2.default
	};

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
			sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
			pos: [400, 300],
			size: [25, 32],
			parameters: {
				speed: 150,
				health: 1,
				cooldown: 15,
				fireCooldown: 15,
				bulletsFired: 0,
				direction: {}
			},
			type: 'player',
			rules: ['playerLogic', 'shootOnMouseDown', 'moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex']
		},
		explosion: {
			zIndex: 10000,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
			//sprite: ['img/explosion.png', [0, 0], [33, 33], 5, [0, 1, 2], null, true],

			rules: ['explosionLogic']
		},
		monster: {
			zIndex: 1,
			id: 'monster',
			sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
			size: [25, 25],
			parameters: {
				speed: 50,
				degreeSpeed: 0.03,
				cooldown: 70,
				meleeCooldown: 70,
				degreeRotation: 1,
				health: 6,
				power: 1
			},
			type: 'monster',
			rules: ['stopOnCollisionWithPlayer', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'canMelee', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex']
		},
		monsterBoss: {
			//[288, 200]
			zIndex: 1,
			id: 'monster',
			sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
			size: [25, 40],
			parameters: {
				speed: 30,
				degreeSpeed: 0.03,
				degreeRotation: 1,
				bulletsFired: 0,
				cooldown: 150,
				fireCooldown: 150,
				power: 5,
				health: 30
			},
			type: 'monster',
			rules: ['stopOnCollisionWithPlayer', 'monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'rotateByDirection', 'canShoot', 'dynamicZIndex']
		},
		bullet: {
			zIndex: 3,
			id: 'bullet',
			//sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
			sprite: ['img/fireballsprite.png', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
			size: [20, 20],
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 400
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'bulletMonsterCollision', 'dynamicZIndex']
		},
		mbullet: {
			zIndex: 3,
			id: 'bullet',
			sprite: ['img/effects.png', [288, 128], [32, 32], 10, [0, 1, 2]],
			type: 'monsterSpellElement',
			size: [32, 32],
			parameters: {
				power: 1,
				speed: 100
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision', 'dynamicZIndex']
		},
		cursor: {
			zIndex: 999,
			id: 'cursor',
			pos: [400, 350],
			sprite: ['img/cursor.png', [0, 0], [30, 30]],
			rules: ['cursorLogic']
		},
		blood: {
			zIndex: 2,
			id: 'blood',
			sprite: ['img/blood.png', [0, 0], [32, 13]],
			parameters: {
				cooldown: 500
			},
			rules: ['removeOnCooldown']
		},
		skelet: {
			zIndex: 0,
			id: 'skelet',
			sprite: ['img/skeleton.png', [0, 0], [34, 34]],
			parameters: {
				cooldown: 300
			},
			rules: ['removeOnCooldown']
		},
		tree: {
			id: 'tree',
			sprite: ['img/tree.png', [0, 0], [76, 76]],
			size: [70, 70],
			rules: ['dynamicZIndex']
		},
		stones: {
			id: 'stones',
			sprite: ['img/stones.png', [0, 0], [36, 36]],
			size: [30, 30],
			zIndex: 0
		},
		heart: {
			zIndex: 2,
			id: 'heart',
			sprite: ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
			parameters: {
				health: 1
			},
			rules: ['triggerOnPlayerCollision']
		},
		counter: {
			id: 'counter',
			zIndex: 910,
			pos: [5, 13],
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				template: "DEMONS KILLED: {kills}",
				size: 14
			},
			rules: ['countMonsterKilled']
		},
		timer: {
			id: 'timer',
			zIndex: 910,
			pos: [5, 285],
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				template: "TIMER: {time}",
				size: 14
			},
			rules: ['timer']
		},
		bestTime: {
			id: 'bestTime',
			pos: [5, 295],
			zIndex: 900,
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				size: 14,
				template: "BEST TIME: {time}"
			},
			rules: ['bestTime']
		},
		health: {
			id: 'health',
			pos: [5, 23],
			zIndex: 900,
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				size: 14,
				template: "HEALTH: {health}"
			},
			rules: ['health']
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

	var _stringTemplate = __webpack_require__(4);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea(area) {
	                return [Math.round(Math.random() * area[1][0]) + area[0][0], Math.round(Math.random() * area[1][1]) + area[0][1]];
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var config = obj.game.getConfig('tree');

	                config.pos = getRandomPointInArea(this.parameters.area);

	                this.context.addObject(config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {

	                var config = obj.game.getConfig('stones');

	                config.pos = getRandomPointInArea(this.parameters.area);

	                var stone = this.context.addObject(config);
	                stone.sprite.setDegree(_utils2.default.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            area: [[50, 50], [700, 500]],
	            trees: 30,
	            stones: 20
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.currentMonsterCooldown == 0) {
	                var monsterConfig = Math.random() * 100 > 100 - this.parameters.chanceOfBoss ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
	                    startPosition = Math.round(Math.random() * 3);

	                switch (startPosition) {
	                    case 0:
	                        monsterConfig.pos = [this.parameters.area[0][0] - monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
	                        break;
	                    case 1:
	                        monsterConfig.pos = [Math.round(Math.random() * this.parameters.area[1][0]), this.parameters.area[0][1] - monsterConfig.sprite[2][1]];
	                        break;
	                    case 2:
	                        monsterConfig.pos = [this.parameters.area[1][0] + monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
	                        break;
	                    case 3:
	                        monsterConfig.pos = [Math.round(Math.random() * this.parameters.area[1][0]), this.parameters.area[1][1] + monsterConfig.sprite[2][1]];
	                        break;
	                }

	                this.context.addObject(monsterConfig);

	                this.parameters.monsterSpawned++;
	                this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	            } else {
	                this.parameters.currentMonsterCooldown--;
	            }
	        },
	        parameters: {
	            area: [[0, 0], [800, 600]],
	            currentMonsterCooldown: 0,
	            chanceOfBoss: 3,
	            monsterCooldown: 7,
	            monsterSpawned: 0
	        }
	    },
	    spawn_heart: {
	        update: function update(dt, obj) {
	            if (this.parameters.currentCooldown == 0) {
	                var config = obj.game.getConfig('heart');

	                config.pos = [Math.round(Math.random() * this.parameters.area[1][0]) + this.parameters.area[0][0], Math.round(Math.random() * this.parameters.area[1][1]) + this.parameters.area[0][1]];

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[50, 50], [700, 500]],
	            currentCooldown: 1000,
	            cooldown: 1000
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

	                obj.layer.addObject(explosionConfig);

	                obj._removeInNextTick = true;
	            }
	        }
	    },
	    triggerOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                player.parameters.health += obj.parameters.health;

	                obj._removeInNextTick = true;
	            }
	        }
	    },
	    meleeAttack: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (obj.parameters.meleeCooldown == 0) {
	                if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                    player.parameters.health -= obj.parameters.power;

	                    obj.parameters.meleeCooldown = obj.parameters.cooldown;
	                }
	            }
	        }
	    },
	    stopOnCollisionWithPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                obj.parameters.speed = 0;
	            } else {
	                obj.parameters.speed = obj._parameters.speed;
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
	                var skelet = obj.layer.game.getConfig('skelet');
	                skelet.pos = obj.pos;
	                obj.layer.addObject(skelet);

	                if (!obj.layer.game.parameters.monstersKilled) {
	                    obj.layer.game.parameters.monstersKilled = 0;
	                }
	                obj.layer.game.parameters.monstersKilled++;
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
	    canMelee: {
	        update: function update(dt, obj) {
	            obj.parameters.meleeCooldown && obj.parameters.meleeCooldown--;
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
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, player.pos)[0]);

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
	    removeOnCooldown: {
	        update: function update(dt, obj) {
	            if (obj.parameters.cooldown == 0) {
	                obj._removeInNextTick = true;
	            } else {
	                obj.parameters.cooldown--;
	            }
	        }
	    },
	    explosionLogic: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                /* var	bloodConfig = obj.layer.game.getConfig('blood');
	                 bloodConfig.pos = obj.pos;
	                 bloodConfig.id = 'blood_' + obj.id;
	                 obj.layer.addObject(bloodConfig);*/
	                obj._removeInNextTick = true;
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
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, destination)[0]);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction2;

	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20))[0]);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction3;

	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20))[0]);
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
	    },
	    countMonsterKilled: {
	        update: function update(dt, obj) {
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                kills: obj.layer.game.parameters.monstersKilled || 0
	            });
	        }
	    },
	    timer: {
	        update: function update(dt, obj) {
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                time: (obj.layer.game.parameters.gameTimer++ / 60).toFixed(2)
	            });
	        }
	    },
	    health: {
	        update: function update(dt, obj) {
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                health: obj.layer.getObjectsByType('player')[0].parameters.health
	            });
	        }
	    },
	    bestTime: {
	        init: function init(dt, obj) {
	            var obj = this.context;
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                time: (obj.layer.game.parameters.bestTime / 60).toFixed(2)
	            });
	        }
	    },
	    dynamicZIndex: {
	        update: function update(dt, obj) {
	            var newZIndex = 0;
	            obj.pos && (newZIndex += obj.pos[1]);
	            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

	            obj.zIndex = obj.pos[1] > 0 ? Math.round(newZIndex) : 0;
	        }
	    }
	};

	exports.default = config;

/***/ },
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
/* 4 */
/***/ function(module, exports) {

	var nargs = /\{([0-9a-zA-Z]+)\}/g
	var slice = Array.prototype.slice

	module.exports = template

	function template(string) {
	    var args

	    if (arguments.length === 2 && typeof arguments[1] === "object") {
	        args = arguments[1]
	    } else {
	        args = slice.call(arguments, 1)
	    }

	    if (!args || !args.hasOwnProperty) {
	        args = {}
	    }

	    return string.replace(nargs, function replaceArg(match, i, index) {
	        var result

	        if (string[index - 1] === "{" &&
	            string[index + match.length] === "}") {
	            return i
	        } else {
	            result = args.hasOwnProperty(i) ? args[i] : null
	            if (result === null || result === undefined) {
	                return ""
	            }

	            return result
	        }
	    })
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var list = ['img/sprites.png', 'img/demons.png', 'img/explosion.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/monsters2.png', 'img/mainhero2.png', 'img/grass2.png', 'img/spell.png', 'img/skeleton.png', 'img/stones.png', 'img/blood.png', 'img/tree.png', 'img/effects.png', 'img/heart.png', 'img/iceball.png', 'img/terrain.png', 'img/terrain2.png', 'img/terrain3.png', 'img/terrains.png', 'img/bsprite.png', 'img/cursor.png', 'img/sprites2.png', 'img/grass3.png'];

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
			background: 'img/terrain.png',
			init: function init() {
				var player = this.game.getConfig('player'),
				    cursor = this.game.getConfig('cursor'),
				    counter = this.game.getConfig('counter'),
				    timer = this.game.getConfig('timer'),
				    health = this.game.getConfig('health'),
				    bestTime = this.game.getConfig('bestTime');

				this.game.parameters.monstersKilled = 0;
				this.game.parameters.gameTimer = 0;

				this.addObjects([player, cursor, counter, timer, bestTime, health]);
			},
			rules: ['spawn_monster', 'spawn_heart', 'random_trees']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcyc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRwbGF5ZXIgOiB7XHJcblx0XHR6SW5kZXggOiAyLFxyXG5cdFx0aWQgOiAncGxheWVyJyxcclxuXHRcdHNwcml0ZTogWydpbWcvbWFpbmhlcm8ucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdHBvcyA6IFs0MDAsMzAwXSxcclxuXHRcdHNpemUgOiBbMjUsIDMyXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHNwZWVkIDogMTUwLFxyXG5cdFx0XHRoZWFsdGggOiAxLFxyXG5cdFx0XHRjb29sZG93bjogMTUsXHJcblx0XHRcdGZpcmVDb29sZG93biA6IDE1LFxyXG5cdFx0XHRidWxsZXRzRmlyZWQ6IDAsXHJcblx0XHRcdGRpcmVjdGlvbiA6IHt9XHJcblx0XHR9LFxyXG5cdFx0dHlwZSA6ICdwbGF5ZXInLFxyXG5cdFx0cnVsZXMgOiBbJ3BsYXllckxvZ2ljJywnc2hvb3RPbk1vdXNlRG93bicsICdtb3ZlV2l0aEtleWJvYXJkJywgJ2JpbmRQb3NpdGlvblRvTGF5ZXInLCAncGxheWVyRGVhdGgnLCAnY2FuU2hvb3QnLCAnbW92ZVRvRGlyZWN0aW9uJywgJ3JvdGF0ZVRvTW91c2UnLCAnZHluYW1pY1pJbmRleCddXHJcblx0fSxcclxuXHRleHBsb3Npb24gOiB7XHJcblx0XHR6SW5kZXggOiAxMDAwMCxcclxuXHRcdHNwcml0ZTogWydpbWcvc3ByaXRlcy5wbmcnLCBbMCwgMTE3XSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIC8vc3ByaXRlOiBbJ2ltZy9leHBsb3Npb24ucG5nJywgWzAsIDBdLCBbMzMsIDMzXSwgNSwgWzAsIDEsIDJdLCBudWxsLCB0cnVlXSxcclxuXHJcblx0XHRydWxlczogWydleHBsb3Npb25Mb2dpYyddXHJcblx0fSxcclxuXHRtb25zdGVyIDoge1xyXG5cdFx0ekluZGV4IDogMSxcclxuXHRcdGlkIDogJ21vbnN0ZXInLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9kZW1vbnMucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0c2l6ZSA6IFsyNSwyNV0sXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRzcGVlZCA6IDUwLFxyXG5cdFx0XHRkZWdyZWVTcGVlZDogMC4wMyxcclxuXHRcdFx0Y29vbGRvd24gOiA3MCAsXHJcblx0XHRcdG1lbGVlQ29vbGRvd246IDcwLFxyXG5cdFx0XHRkZWdyZWVSb3RhdGlvbiA6IDEsXHJcblx0XHRcdGhlYWx0aCA6IDYsXHJcblx0XHRcdHBvd2VyIDogMVxyXG5cdFx0fSxcclxuXHRcdHR5cGUgOiAnbW9uc3RlcicsXHJcblx0XHRydWxlcyA6IFsnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllcicsICdzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnbW9uc3RlckhlYWx0aFN0YXR1cycsICdjYW5NZWxlZScsICdyb3RhdGVCeURpcmVjdGlvbicsICdtZWxlZUF0dGFjaycsICdkeW5hbWljWkluZGV4J11cclxuXHR9LFxyXG5cdG1vbnN0ZXJCb3NzIDoge1xyXG4gICAgICAgIC8vWzI4OCwgMjAwXVxyXG5cdFx0ekluZGV4IDogMSxcclxuXHRcdGlkIDogJ21vbnN0ZXInLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9tb25zdGVyczIucG5nJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdHNpemUgOiBbMjUsIDQwXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHNwZWVkIDogMzAsXHJcblx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRkZWdyZWVSb3RhdGlvbiA6IDEsXHJcblx0XHRcdGJ1bGxldHNGaXJlZCA6IDAsXHJcblx0XHRcdGNvb2xkb3duIDogMTUwICxcclxuXHRcdFx0ZmlyZUNvb2xkb3duIDogMTUwLFxyXG5cdFx0XHRwb3dlciA6IDUsXHJcblx0XHRcdGhlYWx0aCA6IDMwXHJcblx0XHR9LFxyXG5cdFx0dHlwZSA6ICdtb25zdGVyJyxcclxuXHRcdHJ1bGVzIDogWydzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJywgJ21vbnN0ZXJCb3NzTG9naWMnLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCcsICdkeW5hbWljWkluZGV4J11cclxuXHR9LFxyXG5cdGJ1bGxldCA6IHtcclxuXHRcdHpJbmRleCA6IDMsXHJcblx0XHRpZCA6ICdidWxsZXQnLFxyXG5cdFx0Ly9zcHJpdGU6IFsnaW1nL2JzcHJpdGUucG5nJyxbIDAsIDBdLCBbMjcsIDI3XSwgMTYsIFswLCAxXV0sXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9maXJlYmFsbHNwcml0ZS5wbmcnLFsgMCwgMF0sIFszMywgMzNdLCAxNiwgWzAsIDEsIDIsIDNdXSxcclxuXHRcdHNpemUgOiBbMjAsIDIwXSxcclxuXHRcdHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHBvd2VyIDogMTAsXHJcblx0XHRcdHNwZWVkOiA0MDBcclxuXHRcdH0sXHJcblx0XHRydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdidWxsZXRNb25zdGVyQ29sbGlzaW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG5cdH0sXHJcblx0bWJ1bGxldCA6IHtcclxuXHRcdHpJbmRleCA6IDMsXHJcblx0XHRpZCA6ICdidWxsZXQnLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9lZmZlY3RzLnBuZycsWzI4OCwgMTI4XSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG5cdFx0dHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuXHRcdHNpemUgOiBbMzIsIDMyXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHBvd2VyIDogMSxcclxuXHRcdFx0c3BlZWQ6IDEwMFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2RhbWFnZU9uUGxheWVyQ29sbGlzaW9uJywgJ2Rlc3Ryb3lPblBsYXllckNvbGxpc2lvbicsICdkeW5hbWljWkluZGV4J11cclxuXHR9LFxyXG5cdGN1cnNvciA6IHtcclxuXHRcdHpJbmRleCA6IDk5OSxcclxuXHRcdGlkIDogJ2N1cnNvcicsXHJcblx0XHRwb3M6IFs0MDAsMzUwXSxcclxuXHRcdHNwcml0ZSA6IFsnaW1nL2N1cnNvci5wbmcnLCBbMCwgMF0sIFszMCwgMzBdXSxcclxuXHRcdHJ1bGVzOiBbJ2N1cnNvckxvZ2ljJ11cclxuXHR9LFxyXG5cdGJsb29kIDoge1xyXG5cdFx0ekluZGV4IDogMixcclxuXHRcdGlkIDogJ2Jsb29kJyxcclxuXHRcdHNwcml0ZSA6IFsnaW1nL2Jsb29kLnBuZycsIFswLCAwXSwgWzMyLCAxM11dLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0Y29vbGRvd24gOiA1MDBcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydyZW1vdmVPbkNvb2xkb3duJ11cclxuXHR9LFxyXG4gICAgc2tlbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgaWQgOiAnc2tlbGV0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9za2VsZXRvbi5wbmcnLCBbMCwgMF0sIFszNCwgMzRdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG5cdHRyZWUgOiB7XHJcbiAgICAgICAgaWQgOiAndHJlZScsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvdHJlZS5wbmcnLCBbMCwgMF0sIFs3NiwgNzZdXSxcclxuICAgICAgICBzaXplIDogWzcwLDcwXSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgaWQgOiAnc3RvbmVzJyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9zdG9uZXMucG5nJywgWzAsIDBdLCBbMzYsIDM2XV0sXHJcbiAgICAgICAgc2l6ZSA6IFszMCwzMF0sXHJcbiAgICAgICAgekluZGV4IDogMFxyXG4gICAgfSxcclxuXHRoZWFydCA6IHtcclxuXHRcdHpJbmRleCA6IDIsXHJcblx0XHRpZCA6ICdoZWFydCcsXHJcblx0XHRzcHJpdGUgOiBbJ2ltZy9oZWFydC5wbmcnLCBbMCwgMF0sIFszMiwgMzJdLCA1LCBbMCwgMV1dLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0aGVhbHRoIDogMVxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3RyaWdnZXJPblBsYXllckNvbGxpc2lvbiddXHJcblx0fSxcclxuXHRjb3VudGVyOiB7XHJcblx0XHRpZCA6ICdjb3VudGVyJyxcclxuXHRcdHpJbmRleCA6IDkxMCxcclxuXHRcdHBvczogWzUsIDEzXSxcclxuXHRcdHJlbmRlciA6IFwidGV4dFwiLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0d2VpZ2h0IDogXCJib2xkXCIsXHJcblx0XHRcdGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcblx0XHRcdHRlbXBsYXRlIDogXCJERU1PTlMgS0lMTEVEOiB7a2lsbHN9XCIsXHJcblx0XHRcdHNpemUgOiAxNFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ2NvdW50TW9uc3RlcktpbGxlZCddXHJcblx0fSxcclxuXHR0aW1lcjoge1xyXG5cdFx0aWQgOiAndGltZXInLFxyXG5cdFx0ekluZGV4IDogOTEwLFxyXG5cdFx0cG9zOiBbNSwgMjg1XSxcclxuXHRcdHJlbmRlciA6IFwidGV4dFwiLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0d2VpZ2h0IDogXCJib2xkXCIsXHJcblx0XHRcdGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcblx0XHRcdHRlbXBsYXRlIDogXCJUSU1FUjoge3RpbWV9XCIsXHJcblx0XHRcdHNpemUgOiAxNFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3RpbWVyJ11cclxuXHR9LFxyXG5cdGJlc3RUaW1lOiB7XHJcblx0XHRpZCA6ICdiZXN0VGltZScsXHJcblx0XHRwb3M6IFs1LCAyOTVdLFxyXG5cdFx0ekluZGV4IDogOTAwLFxyXG5cdFx0cmVuZGVyIDogXCJ0ZXh0XCIsXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHR3ZWlnaHQgOiBcImJvbGRcIixcclxuXHRcdFx0Y29sb3IgOiBcIiNFRkVGRUZcIixcclxuXHRcdFx0c2l6ZSA6IDE0LFxyXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiQkVTVCBUSU1FOiB7dGltZX1cIlxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ2Jlc3RUaW1lJ11cclxuXHR9LFxyXG5cdGhlYWx0aCA6IHtcclxuXHRcdGlkIDogJ2hlYWx0aCcsXHJcblx0XHRwb3M6IFs1LCAyM10sXHJcblx0XHR6SW5kZXggOiA5MDAsXHJcblx0XHRyZW5kZXIgOiBcInRleHRcIixcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHdlaWdodCA6IFwiYm9sZFwiLFxyXG5cdFx0XHRjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG5cdFx0XHRzaXplIDogMTQsXHJcblx0XHRcdHRlbXBsYXRlIDogXCJIRUFMVEg6IHtoZWFsdGh9XCJcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydoZWFsdGgnXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICByYW5kb21fdHJlZXM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVBvaW50SW5BcmVhKGFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogYXJlYVsxXVswXSkgKyBhcmVhWzBdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBhcmVhWzFdWzFdKSArIGFyZWFbMF1bMV1dO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy50cmVlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd0cmVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnN0b25lczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnc3RvbmVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RvbmUgPSB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBzdG9uZS5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbNzAwLCA1MDBdXSxcclxuICAgICAgICAgICAgdHJlZXM6IDMwLFxyXG4gICAgICAgICAgICBzdG9uZXM6IDIwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX21vbnN0ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9uc3RlckNvbmZpZyA9IChNYXRoLnJhbmRvbSgpICogMTAwID4gKDEwMCAtIHRoaXMucGFyYW1ldGVycy5jaGFuY2VPZkJvc3MpKSA/IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlckJvc3MnKSA6IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzFdIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSArIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDMgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdICsgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1swLCAwXSwgWzgwMCwgNjAwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRNb25zdGVyQ29vbGRvd246IDAsXHJcbiAgICAgICAgICAgIGNoYW5jZU9mQm9zcyA6IDMsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb29sZG93bjogNyxcclxuICAgICAgICAgICAgbW9uc3RlclNwYXduZWQ6IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25faGVhcnQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ2hlYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbNzAwLCA1MDBdXSxcclxuICAgICAgICAgICAgY3VycmVudENvb2xkb3duOiAxMDAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJEZWF0aDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS50cmlnZ2VyR2xvYmFsRXZlbnQoJ3BsYXllcl9kZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGFtYWdlT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIHBsYXllci5wb3MsIHBsYXllci5zaXplKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnBhcmFtZXRlcnMuaGVhbHRoIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBwbGF5ZXIucG9zO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGFyYW1ldGVycy5oZWFsdGggKz0gb2JqLnBhcmFtZXRlcnMuaGVhbHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVsZWVBdHRhY2sgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iai5wb3MsIG9iai5zaXplLCBwbGF5ZXIucG9zLCBwbGF5ZXIuc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iai5wb3MsIG9iai5zaXplLCBwbGF5ZXIucG9zLCBwbGF5ZXIuc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnNwZWVkID0gMFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuc3BlZWQgPSBvYmouX3BhcmFtZXRlcnMuc3BlZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vbnN0ZXJzID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9uc3RlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIG1vbnN0ZXJzW2ldLnBvcywgbW9uc3RlcnNbaV0uc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyc1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG1vbnN0ZXJzW2ldLnBvcztcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBtb25zdGVyc1tpXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJpbmRQb3NpdGlvblRvTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPCBvYmoubGF5ZXIucG9zWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zWzBdICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1swXSA9IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NbMV0gKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIDwgMCB8fCBvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIHx8IG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gfHwgb2JqLnBvc1swXSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVUb0RpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24sIG9iai5wYXJhbWV0ZXJzLnNwZWVkICogZHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVySGVhbHRoU3RhdHVzOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2tlbGV0ID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdza2VsZXQnKTtcclxuICAgICAgICAgICAgICAgIHNrZWxldC5wb3MgPSBvYmoucG9zO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChza2VsZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlEaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24ob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAobW91c2VQb3NpdGlvbikgPyBbbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gKyAxXSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvTW91c2UgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgb2JqLnNwcml0ZS5yb3RhdGVUb0RpcmVjdGlvbihkaXJlY3Rpb25Ub01vdXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FuU2hvb3Q6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FuTWVsZWU6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdID09IHBvc1swXSAmJiBvYmoucG9zWzFdID09IHBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IGRpcmVjdGlvbi5kaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3NMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnbWJ1bGxldF8nICsgb2JqLmlkICsgJ18nICsgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBwbGF5ZXIucG9zKVswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKys7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdXJzb3JMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbigobW91c2VQb3NpdGlvbik/W21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZU9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBleHBsb3Npb25Mb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmKG9iai5zcHJpdGUuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAvKiB2YXJcdGJsb29kQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdibG9vZCcpO1xyXG4gICAgICAgICAgICAgICAgYmxvb2RDb25maWcucG9zID0gb2JqLnBvcztcclxuICAgICAgICAgICAgICAgIGJsb29kQ29uZmlnLmlkID0gJ2Jsb29kXycgKyBvYmouaWQ7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kQ29uZmlnKTsqL1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaG9vdE9uTW91c2VEb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUubW91c2UuaXNNb3VzZURvd24oKSAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2J1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSAobW91c2VQb3NpdGlvbik/W21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIDIwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMyA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIC0yMCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKys7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMTtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbilbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgMjApKVswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyAob2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKyspO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAtMjApKVswXSk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ubGVmdCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2NSk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi51cCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Nyk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kb3duID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDgzKTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnJpZ2h0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDY4KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyKyspIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhlYWx0aCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aDogb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUpIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGR5bmFtaWNaSW5kZXg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5ld1pJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG9iai5wb3MgJiYgKG5ld1pJbmRleCArPSBvYmoucG9zWzFdKTtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZSAmJiAobmV3WkluZGV4ICs9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIpO1xyXG5cclxuICAgICAgICAgICAgb2JqLnpJbmRleCA9IChvYmoucG9zWzFdID4gMCkgPyBNYXRoLnJvdW5kKG5ld1pJbmRleCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzLmpzXG4gKiovIiwiZnVuY3Rpb24gY29sbGlkZXMoeCwgeSwgciwgYiwgeDIsIHkyLCByMiwgYjIpIHtcclxuICAgIHJldHVybiAhKHIgPj0geDIgfHwgeCA8IHIyIHx8XHJcbiAgICBiID49IHkyIHx8IHkgPCBiMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zWzBdIC0gc2l6ZVswXSAvIDIsIHBvc1sxXSAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gKyBzaXplMlswXSAvIDIsIHBvczJbMV0gKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAoZGVncmVlID0gLWRlZ3JlZSk7XHJcbiAgICBpZiAoZGVncmVlID09IHByZXZEZWdyZWUpIHtcclxuICAgICAgICByZXR1cm4gW2RlZ3JlZSwgMF07XHJcbiAgICB9IGVsc2UgaWYgKCgoZGVncmVlIDwgMCAmJiBwcmV2RGVncmVlID4gMCkgfHwgKGRlZ3JlZSA+IDAgJiYgcHJldkRlZ3JlZSA8IDApKSAmJiAoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBNYXRoLlBJKSkge1xyXG4gICAgICAgIHZhciBkZWdyZWVXaXRoU3BlZWQgPSAoKHByZXZEZWdyZWUgPiAwKSA/IHByZXZEZWdyZWUgKyBzcGVlZCA6IHByZXZEZWdyZWUgLSBzcGVlZCk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZWdyZWVXaXRoU3BlZWQgPCAtTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSBNYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCArIE1hdGguUEkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBvaW50MSwgcG9pbnQyLCBkZWdyZWUpIHtcclxuICAgIHZhciBuZXdEZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2V0RGVzdGluYXRpb24ocG9pbnQxLCBkaXJlY3Rpb24sIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbi8vXHRcdFx0cyA9IHNwZWVkICogZHQsXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbi8vXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKSB7XHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyXHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXgpIHtcclxuICAgICAgICAgICAgeSA9IChwb2ludDFbMV0gPiBwb2ludDJbMV0pID8geSAtIDEgOiB5ICsgMTtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheFxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5LS0gOiB5Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyXHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvciAtIGRlbHRheVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbi8vfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2Yob2JqKSAhPSAnb2JqZWN0JylcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG5cclxuICAgIHZhciB0ZW1wID0gb2JqLmNvbnN0cnVjdG9yKCk7IC8vIGNoYW5nZWRcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG4gICAgICAgIHRlbXBba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICAnZ2V0TW92ZWRQb2ludEJ5RGVncmVlJzogZ2V0TW92ZWRQb2ludEJ5RGVncmVlLFxyXG4gICAgJ2Nsb25lJzogY2xvbmVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iLCJ2YXIgbmFyZ3MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZ1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nKSB7XG4gICAgdmFyIGFyZ3NcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICB9XG5cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5hcmdzLCBmdW5jdGlvbiByZXBsYWNlQXJnKG1hdGNoLCBpLCBpbmRleCkge1xuICAgICAgICB2YXIgcmVzdWx0XG5cbiAgICAgICAgaWYgKHN0cmluZ1tpbmRleCAtIDFdID09PSBcIntcIiAmJlxuICAgICAgICAgICAgc3RyaW5nW2luZGV4ICsgbWF0Y2gubGVuZ3RoXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmdzLmhhc093blByb3BlcnR5KGkpID8gYXJnc1tpXSA6IG51bGxcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBsaXN0ID0gW1xyXG4gICAgJ2ltZy9zcHJpdGVzLnBuZycsXHJcbiAgICAnaW1nL2RlbW9ucy5wbmcnLFxyXG4gICAgJ2ltZy9leHBsb3Npb24ucG5nJyxcclxuICAgICdpbWcvZmlyZWJhbGxzcHJpdGUucG5nJyxcclxuICAgICdpbWcvbWFpbmhlcm8ucG5nJyxcclxuICAgICdpbWcvbW9uc3RlcnMyLnBuZycsXHJcbiAgICAnaW1nL21haW5oZXJvMi5wbmcnLFxyXG4gICAgJ2ltZy9ncmFzczIucG5nJyxcclxuICAgICdpbWcvc3BlbGwucG5nJyxcclxuICAgICdpbWcvc2tlbGV0b24ucG5nJyxcclxuICAgICdpbWcvc3RvbmVzLnBuZycsXHJcbiAgICAnaW1nL2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL3RyZWUucG5nJyxcclxuICAgICdpbWcvZWZmZWN0cy5wbmcnLFxyXG4gICAgJ2ltZy9oZWFydC5wbmcnLFxyXG4gICAgJ2ltZy9pY2ViYWxsLnBuZycsXHJcbiAgICAnaW1nL3RlcnJhaW4ucG5nJyxcclxuICAgICdpbWcvdGVycmFpbjIucG5nJyxcclxuICAgICdpbWcvdGVycmFpbjMucG5nJyxcclxuICAgICdpbWcvdGVycmFpbnMucG5nJyxcclxuICAgICdpbWcvYnNwcml0ZS5wbmcnLFxyXG4gICAgJ2ltZy9jdXJzb3IucG5nJyxcclxuICAgICdpbWcvc3ByaXRlczIucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MzLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9yZXNvdXJjZXMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbODAwLDYwMF0sXHJcblx0XHRiYWNrZ3JvdW5kOiAnaW1nL3RlcnJhaW4ucG5nJyxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXJcdHBsYXllciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3BsYXllcicpLFxyXG5cdFx0XHRcdGN1cnNvciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2N1cnNvcicpLFxyXG5cdFx0XHRcdGNvdW50ZXIgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdjb3VudGVyJyksXHJcblx0XHRcdFx0dGltZXIgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCd0aW1lcicpLFxyXG5cdFx0XHRcdGhlYWx0aCA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2hlYWx0aCcpLFxyXG5cdFx0XHRcdGJlc3RUaW1lID0gdGhpcy5nYW1lLmdldENvbmZpZygnYmVzdFRpbWUnKTtcclxuXHJcblx0XHRcdHRoaXMuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyID0gMDtcclxuXHJcblx0XHRcdHRoaXMuYWRkT2JqZWN0cyhbcGxheWVyLCBjdXJzb3IsIGNvdW50ZXIsIHRpbWVyLCBiZXN0VGltZSwgaGVhbHRoXSk7XHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnc3Bhd25fbW9uc3RlcicsICdzcGF3bl9oZWFydCcsICdyYW5kb21fdHJlZXMnXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2xheWVycy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOVpBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBMEJBOzs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=