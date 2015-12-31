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
			render: 'unit',
			collisions: true,
			parameters: {
				speed: 150,
				health: 10,
				spellPower: 1,
				cooldown: 10,
				fireCooldown: 10,
				bulletsFired: 0,
				direction: {}
			},
			type: 'player',
			//conditions : [],
			rules: ['playerLogic', 'shootOnMouseDown', 'moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex']
		},
		explosion: {
			zIndex: 10000,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
			//sprite: ['img/explosion.png', [0, 0], [33, 33], 5, [0, 1, 2], null, true],

			rules: ['destroyAfterSpriteDone']
		},
		monster: {
			zIndex: 1,
			id: 'monster',
			sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
			size: [20, 28],
			collisions: true,
			render: 'unit',
			parameters: {
				speed: 50,
				degreeSpeed: 0.03,
				cooldown: 70,
				meleeCooldown: 70,
				degreeRotation: 1,
				health: 6,
				power: 1
			},
			conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
			type: 'monster',
			rules: ['setDirectionToPlayer', 'moveToDirection', 'canMelee', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex']
		},
		monsterBoss: {
			//[288, 200]
			zIndex: 1,
			id: 'monster',
			collisions: true,
			sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
			size: [25, 40],
			render: 'unit',
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
			conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
			type: 'monster',
			rules: ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'canShoot', 'dynamicZIndex']
		},
		bullet: {
			zIndex: 3,
			id: 'bullet',
			collisions: true,
			//sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
			sprite: ['img/fireballsprite.png', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
			size: [25, 25],
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 400
			},
			conditions: ['bulletMonsterCollision'],
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
		},
		mbullet: {
			zIndex: 3,
			id: 'bullet',
			collisions: true,
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
			rules: ['bindPositionToMouse']
		},
		blood: {
			zIndex: 2,
			id: 'blood',
			sprite: ['img/sblood.png', [0, 0], [32, 13]],
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
		wall: {
			id: 'wall',
			sprite: ['img/wall.png', [0, 0], [63, 97]],
			size: [70, 70]
		},
		gate: {
			id: 'gate',
			sprite: ['img/gates.png', [0, 0], [60, 64]],
			size: [60, 64]
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
			collisions: true,
			sprite: ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
			conditions: ['triggerOnPlayerCollision'],
			parameters: {
				health: 1
			}
		},
		powerup: {
			zIndex: 2,
			id: 'powerup',
			collisions: true,
			sprite: ['img/powerup.png', [0, 0], [34, 34]],
			conditions: ['triggerOnPlayerCollisionPowerUp'],
			parameters: {
				spellPower: 1
			}
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
	    collisions: {
	        init: function init() {
	            var obj = this.context;
	            obj.parameters.collisions = [];
	            obj.parameters.collisions.cells = new Array(4);
	            obj.layer.game.collisions.checkPlace(obj);
	        },
	        update: function update(dt, obj) {
	            obj.parameters.collisions.splice(0);
	            obj.layer.game.collisions.checkPlace(obj);
	        }
	    },
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea() {
	                return [Math.round(Math.random() * obj.game.canvas.width), Math.round(Math.random() * obj.game.canvas.height)];
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
	            trees: 30,
	            stones: 20
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < 10000) {
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
	            }
	        },
	        parameters: {
	            area: [[0, 0], [800, 600]],
	            currentMonsterCooldown: 0,
	            chanceOfBoss: 3,
	            monsterCooldown: 6,
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
	            area: [[50, 50], [750, 550]],
	            currentCooldown: 500,
	            cooldown: 500
	        }
	    },
	    spawn_powerup: {
	        update: function update(dt, obj) {
	            if (this.parameters.currentCooldown == 0) {
	                var config = obj.game.getConfig('powerup');

	                config.pos = [Math.round(Math.random() * this.parameters.area[1][0]) + this.parameters.area[0][0], Math.round(Math.random() * this.parameters.area[1][1]) + this.parameters.area[0][1]];

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[50, 50], [750, 550]],
	            currentCooldown: 500,
	            cooldown: 500
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
	            var objects = obj.parameters.collisions;
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    objects[i].parameters.health -= obj.parameters.power;
	                    break;
	                }
	            }
	        }
	    },
	    destroyOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    var explosionConfig = obj.layer.game.getConfig('explosion');
	                    explosionConfig.pos = obj.pos;

	                    obj.layer.addObject(explosionConfig);

	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    triggerOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    if (objects[i].parameters.health < objects[i]._parameters.health) {
	                        if (objects[i].parameters.health + obj.parameters.health <= objects[i]._parameters.health) {
	                            objects[i].parameters.health += obj.parameters.health;
	                        } else {
	                            objects[i].parameters.health = objects[i]._parameters.health;
	                        }
	                    }

	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    meleeAttack: {
	        update: function update(dt, obj) {
	            if (obj.parameters.meleeCooldown == 0) {
	                var objects = obj.parameters.collisions;
	                for (var i = 0; i < objects.length; i++) {
	                    if (objects[i].type == 'player') {
	                        objects[i].parameters.health -= obj.parameters.power;

	                        obj.parameters.meleeCooldown = obj.parameters.cooldown;
	                        break;
	                    }
	                }
	            }
	        }
	    },
	    stopOnCollisionWithPlayer: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;
	            obj.parameters.speed = obj._parameters.speed;
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'player') {
	                    obj.parameters.speed = 0;
	                    break;
	                }
	            }
	        }
	    },
	    bulletMonsterCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'monster') {
	                    objects[i].parameters.health -= obj.parameters.power;

	                    var explosionConfig = obj.layer.game.getConfig('explosion');
	                    explosionConfig.pos = objects[i].pos;
	                    explosionConfig.id = 'exp_' + objects[i].id;

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
	                var blood = obj.layer.game.getConfig('blood');
	                blood.pos = obj.pos;
	                obj.layer.addObject(blood);

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
	    bindPositionToMouse: {
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
	    destroyAfterSpriteDone: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                obj._removeInNextTick = true;
	            }
	        }
	    },
	    shootOnMouseDown: {
	        update: function update(dt, obj) {
	            if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
	                var createBullet = function createBullet(direction, destination) {
	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                    bulletConfig.parameters.direction = direction;

	                    var bull = obj.layer.addObject(bulletConfig);
	                    bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, destination)[0]);
	                };

	                var bulletConfig = obj.layer.game.getConfig('bullet'),
	                    mousePosition = obj.layer.game.mouse.getMousePosition(),
	                    destination = mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] - 1];

	                var direction = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 0));

	                createBullet(direction, destination);

	                for (var i = 1; i <= obj.parameters.spellPower - 1; i++) {
	                    var direction1 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20 * i)),
	                        direction2 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20 * i));

	                    createBullet(direction1, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20 * i));
	                    createBullet(direction2, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20 * i));
	                }

	                /* var direction1 = utils.getDirection(obj.pos, destination),
	                     direction2 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, 20)),
	                     direction3 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, -20));
	                   bulletConfig.pos = utils.clone(obj.pos);
	                 bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                   bulletConfig.parameters.direction = direction1;
	                 var bull = obj.layer.addObject(bulletConfig);
	                 bull.sprite.setDegree(utils.getDegree(obj.pos, destination)[0]);
	                   bulletConfig.id = 'bullet' + (obj.parameters.bulletsFired++);
	                 bulletConfig.pos = utils.clone(obj.pos);
	                 bulletConfig.parameters.direction = direction2;
	                   var bull = obj.layer.addObject(bulletConfig);
	                 bull.sprite.setDegree(utils.getDegree(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, 20))[0]);
	                   bulletConfig.id = 'bullet' + (obj.parameters.bulletsFired++);
	                 bulletConfig.pos = utils.clone(obj.pos);
	                 bulletConfig.parameters.direction = direction3;
	                   var bull = obj.layer.addObject(bulletConfig);
	                 bull.sprite.setDegree(utils.getDegree(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, -20))[0]);*/
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
	    },
	    triggerOnPlayerCollisionPowerUp: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    objects[i].parameters.spellPower += obj.parameters.spellPower;
	                    objects[i].parameters.cooldown += 5 ^ objects[i].parameters.spellPower;
	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
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
	var list = ['img/sprites.png', 'img/demons.png', 'img/explosion.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/monsters2.png', 'img/wall.png', 'img/powerup.png', 'img/gates.png', 'img/mainhero2.png', 'img/grass2.png', 'img/spell.png', 'img/skeleton.png', 'img/stones.png', 'img/sblood.png', 'img/tree.png', 'img/effects.png', 'img/heart.png', 'img/iceball.png', 'img/terrain.png', 'img/terrain2.png', 'img/terrain3.png', 'img/terrains.png', 'img/bsprite.png', 'img/cursor.png', 'img/sprites2.png', 'img/grass3.png'];

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
				    bestTime = this.game.getConfig('bestTime');

				this.game.parameters.monstersKilled = 0;
				this.game.parameters.gameTimer = 0;

				this.addObjects([player, cursor, counter, timer, bestTime]);
			},
			rules: ['spawn_monster', 'spawn_heart', 'random_trees', 'spawn_powerup']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcyc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRwbGF5ZXIgOiB7XHJcblx0XHR6SW5kZXggOiAyLFxyXG5cdFx0aWQgOiAncGxheWVyJyxcclxuXHRcdHNwcml0ZTogWydpbWcvbWFpbmhlcm8ucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdHBvcyA6IFs0MDAsMzAwXSxcclxuXHRcdHNpemUgOiBbMjUsIDMyXSxcclxuXHRcdHJlbmRlciA6ICd1bml0JyxcclxuXHRcdGNvbGxpc2lvbnM6IHRydWUsXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRzcGVlZCA6IDE1MCxcclxuXHRcdFx0aGVhbHRoIDogMTAsXHJcbiAgICAgICAgICAgIHNwZWxsUG93ZXI6IDEsXHJcblx0XHRcdGNvb2xkb3duOiAxMCxcclxuXHRcdFx0ZmlyZUNvb2xkb3duIDogMTAsXHJcblx0XHRcdGJ1bGxldHNGaXJlZDogMCxcclxuXHRcdFx0ZGlyZWN0aW9uIDoge31cclxuXHRcdH0sXHJcblx0XHR0eXBlIDogJ3BsYXllcicsXHJcblx0XHQvL2NvbmRpdGlvbnMgOiBbXSxcclxuXHRcdHJ1bGVzIDogWydwbGF5ZXJMb2dpYycsJ3Nob290T25Nb3VzZURvd24nLCAnbW92ZVdpdGhLZXlib2FyZCcsICdiaW5kUG9zaXRpb25Ub0xheWVyJywgJ3BsYXllckRlYXRoJywgJ2NhblNob290JywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVUb01vdXNlJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG5cdH0sXHJcblx0ZXhwbG9zaW9uIDoge1xyXG5cdFx0ekluZGV4IDogMTAwMDAsXHJcblx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMucG5nJywgWzAsIDExN10sIFszOSwgMzldLCAxNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdLCBudWxsLCB0cnVlXSxcclxuICAgICAgICAvL3Nwcml0ZTogWydpbWcvZXhwbG9zaW9uLnBuZycsIFswLCAwXSwgWzMzLCAzM10sIDUsIFswLCAxLCAyXSwgbnVsbCwgdHJ1ZV0sXHJcblxyXG5cdFx0cnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZSddXHJcblx0fSxcclxuXHRtb25zdGVyIDoge1xyXG5cdFx0ekluZGV4IDogMSxcclxuXHRcdGlkIDogJ21vbnN0ZXInLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9kZW1vbnMucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0c2l6ZSA6IFsyMCwyOF0sXHJcblx0XHRjb2xsaXNpb25zOiB0cnVlLFxyXG5cdFx0cmVuZGVyIDogJ3VuaXQnLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0c3BlZWQgOiA1MCxcclxuXHRcdFx0ZGVncmVlU3BlZWQ6IDAuMDMsXHJcblx0XHRcdGNvb2xkb3duIDogNzAgLFxyXG5cdFx0XHRtZWxlZUNvb2xkb3duOiA3MCxcclxuXHRcdFx0ZGVncmVlUm90YXRpb24gOiAxLFxyXG5cdFx0XHRoZWFsdGggOiA2LFxyXG5cdFx0XHRwb3dlciA6IDFcclxuXHRcdH0sXHJcblx0XHRjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJywgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuXHRcdHR5cGUgOiAnbW9uc3RlcicsXHJcblx0XHRydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2Nhbk1lbGVlJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21lbGVlQXR0YWNrJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG5cdH0sXHJcblx0bW9uc3RlckJvc3MgOiB7XHJcbiAgICAgICAgLy9bMjg4LCAyMDBdXHJcblx0XHR6SW5kZXggOiAxLFxyXG5cdFx0aWQgOiAnbW9uc3RlcicsXHJcblx0XHRjb2xsaXNpb25zOiB0cnVlLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9tb25zdGVyczIucG5nJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdHNpemUgOiBbMjUsIDQwXSxcclxuXHRcdHJlbmRlciA6ICd1bml0JyxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHNwZWVkIDogMzAsXHJcblx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRkZWdyZWVSb3RhdGlvbiA6IDEsXHJcblx0XHRcdGJ1bGxldHNGaXJlZCA6IDAsXHJcblx0XHRcdGNvb2xkb3duIDogMTUwICxcclxuXHRcdFx0ZmlyZUNvb2xkb3duIDogMTUwLFxyXG5cdFx0XHRwb3dlciA6IDUsXHJcblx0XHRcdGhlYWx0aCA6IDMwXHJcblx0XHR9LFxyXG5cdFx0Y29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycgLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG5cdFx0dHlwZSA6ICdtb25zdGVyJyxcclxuXHRcdHJ1bGVzIDogWydtb25zdGVyQm9zc0xvZ2ljJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCcsICdkeW5hbWljWkluZGV4J11cclxuXHR9LFxyXG5cdGJ1bGxldCA6IHtcclxuXHRcdHpJbmRleCA6IDMsXHJcblx0XHRpZCA6ICdidWxsZXQnLFxyXG5cdFx0Y29sbGlzaW9uczogdHJ1ZSxcclxuXHRcdC8vc3ByaXRlOiBbJ2ltZy9ic3ByaXRlLnBuZycsWyAwLCAwXSwgWzI3LCAyN10sIDE2LCBbMCwgMV1dLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZmlyZWJhbGxzcHJpdGUucG5nJyxbIDAsIDBdLCBbMzMsIDMzXSwgMTYsIFswLCAxLCAyLCAzXV0sXHJcblx0XHRzaXplIDogWzI1LCAyNV0sXHJcblx0XHR0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRwb3dlciA6IDEwLFxyXG5cdFx0XHRzcGVlZDogNDAwXHJcblx0XHR9LFxyXG5cdFx0Y29uZGl0aW9uczogWydidWxsZXRNb25zdGVyQ29sbGlzaW9uJ10sXHJcblx0XHRydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4J11cclxuXHR9LFxyXG5cdG1idWxsZXQgOiB7XHJcblx0XHR6SW5kZXggOiAzLFxyXG5cdFx0aWQgOiAnYnVsbGV0JyxcclxuXHRcdGNvbGxpc2lvbnM6IHRydWUsXHJcblx0XHRzcHJpdGU6IFsnaW1nL2VmZmVjdHMucG5nJyxbMjg4LCAxMjhdLCBbMzIsIDMyXSwgMTAsIFswLCAxLCAyXV0sXHJcblx0XHR0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG5cdFx0c2l6ZSA6IFszMiwgMzJdLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0cG93ZXIgOiAxLFxyXG5cdFx0XHRzcGVlZDogMTAwXHJcblx0XHR9LFxyXG5cdFx0cnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAnZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG5cdH0sXHJcblx0Y3Vyc29yIDoge1xyXG5cdFx0ekluZGV4IDogOTk5LFxyXG5cdFx0aWQgOiAnY3Vyc29yJyxcclxuXHRcdHBvczogWzQwMCwzNTBdLFxyXG5cdFx0c3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG5cdFx0cnVsZXM6IFsnYmluZFBvc2l0aW9uVG9Nb3VzZSddXHJcblx0fSxcclxuXHRibG9vZCA6IHtcclxuXHRcdHpJbmRleCA6IDIsXHJcblx0XHRpZCA6ICdibG9vZCcsXHJcblx0XHRzcHJpdGUgOiBbJ2ltZy9zYmxvb2QucG5nJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRjb29sZG93biA6IDUwMFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3JlbW92ZU9uQ29vbGRvd24nXVxyXG5cdH0sXHJcbiAgICBza2VsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBpZCA6ICdza2VsZXQnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3NrZWxldG9uLnBuZycsIFswLCAwXSwgWzM0LCAzNF1dLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogMzAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydyZW1vdmVPbkNvb2xkb3duJ11cclxuICAgIH0sXHJcblx0dHJlZSA6IHtcclxuICAgICAgICBpZCA6ICd0cmVlJyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy90cmVlLnBuZycsIFswLCAwXSwgWzc2LCA3Nl1dLFxyXG4gICAgICAgIHNpemUgOiBbNzAsNzBdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIHdhbGwgOiB7XHJcbiAgICAgICAgaWQgOiAnd2FsbCcsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvd2FsbC5wbmcnLCBbMCwgMF0sIFs2MywgOTddXSxcclxuICAgICAgICBzaXplIDogWzcwLDcwXVxyXG4gICAgfSxcclxuICAgIGdhdGUgOiB7XHJcbiAgICAgICAgaWQgOiAnZ2F0ZScsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvZ2F0ZXMucG5nJywgWzAsIDBdLCBbNjAsIDY0XV0sXHJcbiAgICAgICAgc2l6ZSA6IFs2MCw2NF1cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgaWQgOiAnc3RvbmVzJyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9zdG9uZXMucG5nJywgWzAsIDBdLCBbMzYsIDM2XV0sXHJcbiAgICAgICAgc2l6ZSA6IFszMCwzMF0sXHJcbiAgICAgICAgekluZGV4IDogMFxyXG4gICAgfSxcclxuXHRoZWFydCA6IHtcclxuXHRcdHpJbmRleCA6IDIsXHJcblx0XHRpZCA6ICdoZWFydCcsXHJcblx0XHRjb2xsaXNpb25zOiB0cnVlLFxyXG5cdFx0c3ByaXRlIDogWydpbWcvaGVhcnQucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNSwgWzAsIDFdXSxcclxuXHRcdGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uJ10sXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRoZWFsdGggOiAxXHJcblx0XHR9XHJcblx0fSxcclxuICAgIHBvd2VydXAgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBpZCA6ICdwb3dlcnVwJyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3Bvd2VydXAucG5nJywgWzAsIDBdLCBbMzQsIDM0XV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlbGxQb3dlciA6IDFcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cdGNvdW50ZXI6IHtcclxuXHRcdGlkIDogJ2NvdW50ZXInLFxyXG5cdFx0ekluZGV4IDogOTEwLFxyXG5cdFx0cG9zOiBbNSwgMTNdLFxyXG5cdFx0cmVuZGVyIDogXCJ0ZXh0XCIsXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHR3ZWlnaHQgOiBcImJvbGRcIixcclxuXHRcdFx0Y29sb3IgOiBcIiNFRkVGRUZcIixcclxuXHRcdFx0dGVtcGxhdGUgOiBcIkRFTU9OUyBLSUxMRUQ6IHtraWxsc31cIixcclxuXHRcdFx0c2l6ZSA6IDE0XHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnY291bnRNb25zdGVyS2lsbGVkJ11cclxuXHR9LFxyXG5cdHRpbWVyOiB7XHJcblx0XHRpZCA6ICd0aW1lcicsXHJcblx0XHR6SW5kZXggOiA5MTAsXHJcblx0XHRwb3M6IFs1LCAyODVdLFxyXG5cdFx0cmVuZGVyIDogXCJ0ZXh0XCIsXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHR3ZWlnaHQgOiBcImJvbGRcIixcclxuXHRcdFx0Y29sb3IgOiBcIiNFRkVGRUZcIixcclxuXHRcdFx0dGVtcGxhdGUgOiBcIlRJTUVSOiB7dGltZX1cIixcclxuXHRcdFx0c2l6ZSA6IDE0XHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsndGltZXInXVxyXG5cdH0sXHJcblx0YmVzdFRpbWU6IHtcclxuXHRcdGlkIDogJ2Jlc3RUaW1lJyxcclxuXHRcdHBvczogWzUsIDI5NV0sXHJcblx0XHR6SW5kZXggOiA5MDAsXHJcblx0XHRyZW5kZXIgOiBcInRleHRcIixcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHdlaWdodCA6IFwiYm9sZFwiLFxyXG5cdFx0XHRjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG5cdFx0XHRzaXplIDogMTQsXHJcblx0XHRcdHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnYmVzdFRpbWUnXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBjb2xsaXNpb25zOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5jZWxscyA9IG5ldyBBcnJheSg0KTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUuY29sbGlzaW9ucy5jaGVja1BsYWNlKG9iaik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgIG9iai5sYXllci5nYW1lLmNvbGxpc2lvbnMuY2hlY2tQbGFjZShvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByYW5kb21fdHJlZXM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVBvaW50SW5BcmVhKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMud2lkdGgpLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMuaGVpZ2h0KV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnRyZWVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3RyZWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMuc3RvbmVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3N0b25lcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0b25lID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIHRyZWVzOiAzMCxcclxuICAgICAgICAgICAgc3RvbmVzOiAyMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9tb25zdGVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkIDwgMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXJDb25maWcgPSAoTWF0aC5yYW5kb20oKSAqIDEwMCA+ICgxMDAgLSB0aGlzLnBhcmFtZXRlcnMuY2hhbmNlT2ZCb3NzKSkgPyBvYmouZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJCb3NzJykgOiBvYmouZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW3RoaXMucGFyYW1ldGVycy5hcmVhWzBdWzBdIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSwgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV0gLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW3RoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdICsgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSwgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0gKyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChtb25zdGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzAsIDBdLCBbODAwLCA2MDBdXSxcclxuICAgICAgICAgICAgY3VycmVudE1vbnN0ZXJDb29sZG93bjogMCxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzIDogMyxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiA2LFxyXG4gICAgICAgICAgICBtb25zdGVyU3Bhd25lZDogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9oZWFydDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnaGVhcnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSArIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVsxXV07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFs3NTAsIDU1MF1dLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29vbGRvd246IDUwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9wb3dlcnVwOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdwb3dlcnVwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbNzUwLCA1NTBdXSxcclxuICAgICAgICAgICAgY3VycmVudENvb2xkb3duOiA1MDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA1MDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyRGVhdGg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUudHJpZ2dlckdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhbWFnZU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggPCBvYmplY3RzW2ldLl9wYXJhbWV0ZXJzLmhlYWx0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCArIG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSBvYmplY3RzW2ldLl9wYXJhbWV0ZXJzLmhlYWx0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCArPSBvYmoucGFyYW1ldGVycy5oZWFsdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoID0gb2JqZWN0c1tpXS5fcGFyYW1ldGVycy5oZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZWxlZUF0dGFjayA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuc3BlZWQgPSBvYmouX3BhcmFtZXRlcnMuc3BlZWQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5zcGVlZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWxsZXRNb25zdGVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG9iamVjdHNbaV0ucG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5pZCA9ICdleHBfJyArIG9iamVjdHNbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmluZFBvc2l0aW9uVG9MYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA8IG9iai5sYXllci5wb3NbMF0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NbMF0gKyBvYmouc3ByaXRlLnNpemVbMF0gLyAyID4gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIDwgb2JqLmxheWVyLnBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1sxXSA9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvc1sxXSArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlckxlYXZpbmdMYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMV0gPCAwIHx8IG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gfHwgb2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSB8fCBvYmoucG9zWzBdIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVRvRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpcikge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKHV0aWxzLmdldERlc3RpbmF0aW9uKG9iai5wb3MsIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbiwgb2JqLnBhcmFtZXRlcnMuc3BlZWQgKiBkdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJIZWFsdGhTdGF0dXM6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYmxvb2QnKTtcclxuICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iai5wb3M7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZUJ5RGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZVRvTW91c2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gb2JqLmxheWVyLmdhbWUubW91c2UuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gKG1vdXNlUG9zaXRpb24pID8gW21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdICsgMV0sXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25Ub01vdXNlID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIGRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oZGlyZWN0aW9uVG9Nb3VzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhblNob290OiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duLS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbk1lbGVlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ucmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHBvc1swXSA9IG9iai5wb3NbMF0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kb3duKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMV0gPSBvYmoucG9zWzFdICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnVwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMV0gPSBvYmoucG9zWzFdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1swXSA9PSBwb3NbMF0gJiYgb2JqLnBvc1sxXSA9PSBwb3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmsgPSBkaXJlY3Rpb24uaztcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIgPSBkaXJlY3Rpb24uZGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21idWxsZXQnKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ21idWxsZXRfJyArIG9iai5pZCArICdfJyArIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgcGxheWVyLnBvcylbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmluZFBvc2l0aW9uVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbigobW91c2VQb3NpdGlvbik/W21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZU9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJTcHJpdGVEb25lOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYob2JqLnNwcml0ZS5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob290T25Nb3VzZURvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gLSAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbilbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG9iai5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uMSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIDIwICogaSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24yID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwICogaSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uMSwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAyMCAqIGkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uMiwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAtMjAgKiBpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgLyogdmFyIGRpcmVjdGlvbjEgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjIgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAyMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjMgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAtMjApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjE7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24pWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIChvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUob2JqLnBvcywgZGVzdGluYXRpb24sIDIwKSlbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwKSlbMF0pOyovXHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ubGVmdCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2NSk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi51cCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Nyk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kb3duID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDgzKTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnJpZ2h0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDY4KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyKyspIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhlYWx0aCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aDogb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUpIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGR5bmFtaWNaSW5kZXg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5ld1pJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG9iai5wb3MgJiYgKG5ld1pJbmRleCArPSBvYmoucG9zWzFdKTtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZSAmJiAobmV3WkluZGV4ICs9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIpO1xyXG5cclxuICAgICAgICAgICAgb2JqLnpJbmRleCA9IChvYmoucG9zWzFdID4gMCkgPyBNYXRoLnJvdW5kKG5ld1pJbmRleCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgKz0gb2JqLnBhcmFtZXRlcnMuc3BlbGxQb3dlcjtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuY29vbGRvd24gKz0gNSBeIG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVsbFBvd2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy5qc1xuICoqLyIsImZ1bmN0aW9uIGNvbGxpZGVzKHgsIHksIHIsIGIsIHgyLCB5MiwgcjIsIGIyKSB7XHJcbiAgICByZXR1cm4gIShyID49IHgyIHx8IHggPCByMiB8fFxyXG4gICAgYiA+PSB5MiB8fCB5IDwgYjIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBib3hDb2xsaWRlcyhwb3MsIHNpemUsIHBvczIsIHNpemUyKSB7XHJcbiAgICByZXR1cm4gY29sbGlkZXMocG9zWzBdICsgc2l6ZVswXSAvIDIsIHBvc1sxXSArIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvc1swXSAtIHNpemVbMF0gLyAyLCBwb3NbMV0gLSBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdICsgc2l6ZTJbMF0gLyAyLCBwb3MyWzFdICsgc2l6ZTJbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gLSBzaXplMlswXSAvIDIsIHBvczJbMV0gLSBzaXplMlsxXSAvIDIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERlZ3JlZShwb2ludDEsIHBvaW50MiwgcHJldkRlZ3JlZSwgc3BlZWQpIHtcclxuICAgIHZhciBkZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKGRlZ3JlZSA9IC1kZWdyZWUpO1xyXG4gICAgaWYgKGRlZ3JlZSA9PSBwcmV2RGVncmVlKSB7XHJcbiAgICAgICAgcmV0dXJuIFtkZWdyZWUsIDBdO1xyXG4gICAgfSBlbHNlIGlmICgoKGRlZ3JlZSA8IDAgJiYgcHJldkRlZ3JlZSA+IDApIHx8IChkZWdyZWUgPiAwICYmIHByZXZEZWdyZWUgPCAwKSkgJiYgKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gTWF0aC5QSSkpIHtcclxuICAgICAgICB2YXIgZGVncmVlV2l0aFNwZWVkID0gKChwcmV2RGVncmVlID4gMCkgPyBwcmV2RGVncmVlICsgc3BlZWQgOiBwcmV2RGVncmVlIC0gc3BlZWQpO1xyXG4gICAgICAgIGlmIChkZWdyZWVXaXRoU3BlZWQgPiBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IC1NYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCAtIE1hdGguUEkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVncmVlV2l0aFNwZWVkIDwgLU1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgKyBNYXRoLlBJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtkZWdyZWVXaXRoU3BlZWQsIE1hdGgucG93KE1hdGguUEksIDIpIC0gTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gWyhNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IHNwZWVkKSA/ICgocHJldkRlZ3JlZSA+IGRlZ3JlZSkgPyBwcmV2RGVncmVlIC0gc3BlZWQgOiBwcmV2RGVncmVlICsgc3BlZWQpIDogZGVncmVlLCBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9XHJcblxyXG59XHJcbmZ1bmN0aW9uIGdldE1vdmVkUG9pbnRCeURlZ3JlZShwb2ludDEsIHBvaW50MiwgZGVncmVlKSB7XHJcbiAgICB2YXIgbmV3RGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIG5ld0RlZ3JlZSA9IG5ld0RlZ3JlZSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAobmV3RGVncmVlID0gMzYwIC0gbmV3RGVncmVlKTtcclxuICAgIG5ld0RlZ3JlZSArPSBkZWdyZWU7XHJcbiAgICAobmV3RGVncmVlIDwgMCkgJiYgKG5ld0RlZ3JlZSArPSAzNjApO1xyXG4gICAgKG5ld0RlZ3JlZSA+IDM2MCkgJiYgKG5ld0RlZ3JlZSAtPSAzNjApO1xyXG5cclxuICAgIHZhciBkaXIgPSAoKG5ld0RlZ3JlZSA+IDAgJiYgbmV3RGVncmVlIDw9IDkwKSB8fCAobmV3RGVncmVlID4gMjcwICYmIG5ld0RlZ3JlZSA8PSAzNjApKSA/IDEgOiAtMTtcclxuXHJcbiAgICB2YXIgZGlyZWN0aW9uID0ge1xyXG4gICAgICAgIGRpcjogZGlyLFxyXG4gICAgICAgIGs6IE1hdGgudGFuKG5ld0RlZ3JlZSAqIE1hdGguUEkgLyAxODApXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBnZXREZXN0aW5hdGlvbihwb2ludDEsIGRpcmVjdGlvbiwgTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICB2YXIgaywgYiwgZGlyO1xyXG5cclxuICAgIGlmIChwb2ludDFbMF0gPT0gcG9pbnQyWzBdKSB7XHJcbiAgICAgICAgayA9ICd2ZXJ0JztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzFdID49IHBvaW50MVsxXSkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGsgPSAocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSAvIChwb2ludDJbMF0gLSBwb2ludDFbMF0pO1xyXG4gICAgICAgIGIgPSBwb2ludDFbMV0gLSBwb2ludDFbMF0gKiBrO1xyXG4gICAgICAgIGRpciA9IChwb2ludDJbMF0gPj0gcG9pbnQxWzBdKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgJ2snOiBrLFxyXG4gICAgICAgICdiJzogYixcclxuICAgICAgICAnZGlyJzogZGlyXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBvaW50LCBsaW5lLCBzcGVlZCkge1xyXG4gICAgdmFyIHgsIHk7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHggPSBwb2ludFswXTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gKHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKSk7XHJcbiAgICAgICAgeSA9IChwb2ludFsxXSArIGxpbmUuZGlyICogc3BlZWQgKiBsaW5lLmsgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF4KSB7XHJcbiAgICAgICAgICAgIHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHkgLSAxIDogeSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIGlmIChvYmogPT0gbnVsbCB8fCB0eXBlb2Yob2JqKSAhPSAnb2JqZWN0JylcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG5cclxuICAgIHZhciB0ZW1wID0gb2JqLmNvbnN0cnVjdG9yKCk7IC8vIGNoYW5nZWRcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG4gICAgICAgIHRlbXBba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIHJldHVybiB0ZW1wO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICAnZ2V0TW92ZWRQb2ludEJ5RGVncmVlJzogZ2V0TW92ZWRQb2ludEJ5RGVncmVlLFxyXG4gICAgJ2Nsb25lJzogY2xvbmVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iLCJ2YXIgbmFyZ3MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZ1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nKSB7XG4gICAgdmFyIGFyZ3NcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICB9XG5cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5hcmdzLCBmdW5jdGlvbiByZXBsYWNlQXJnKG1hdGNoLCBpLCBpbmRleCkge1xuICAgICAgICB2YXIgcmVzdWx0XG5cbiAgICAgICAgaWYgKHN0cmluZ1tpbmRleCAtIDFdID09PSBcIntcIiAmJlxuICAgICAgICAgICAgc3RyaW5nW2luZGV4ICsgbWF0Y2gubGVuZ3RoXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmdzLmhhc093blByb3BlcnR5KGkpID8gYXJnc1tpXSA6IG51bGxcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBsaXN0ID0gW1xyXG4gICAgJ2ltZy9zcHJpdGVzLnBuZycsXHJcbiAgICAnaW1nL2RlbW9ucy5wbmcnLFxyXG4gICAgJ2ltZy9leHBsb3Npb24ucG5nJyxcclxuICAgICdpbWcvZmlyZWJhbGxzcHJpdGUucG5nJyxcclxuICAgICdpbWcvbWFpbmhlcm8ucG5nJyxcclxuICAgICdpbWcvbW9uc3RlcnMyLnBuZycsXHJcbiAgICAnaW1nL3dhbGwucG5nJyxcclxuICAgICdpbWcvcG93ZXJ1cC5wbmcnLFxyXG4gICAgJ2ltZy9nYXRlcy5wbmcnLFxyXG4gICAgJ2ltZy9tYWluaGVybzIucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MyLnBuZycsXHJcbiAgICAnaW1nL3NwZWxsLnBuZycsXHJcbiAgICAnaW1nL3NrZWxldG9uLnBuZycsXHJcbiAgICAnaW1nL3N0b25lcy5wbmcnLFxyXG4gICAgJ2ltZy9zYmxvb2QucG5nJyxcclxuICAgICdpbWcvdHJlZS5wbmcnLFxyXG4gICAgJ2ltZy9lZmZlY3RzLnBuZycsXHJcbiAgICAnaW1nL2hlYXJ0LnBuZycsXHJcbiAgICAnaW1nL2ljZWJhbGwucG5nJyxcclxuICAgICdpbWcvdGVycmFpbi5wbmcnLFxyXG4gICAgJ2ltZy90ZXJyYWluMi5wbmcnLFxyXG4gICAgJ2ltZy90ZXJyYWluMy5wbmcnLFxyXG4gICAgJ2ltZy90ZXJyYWlucy5wbmcnLFxyXG4gICAgJ2ltZy9ic3ByaXRlLnBuZycsXHJcbiAgICAnaW1nL2N1cnNvci5wbmcnLFxyXG4gICAgJ2ltZy9zcHJpdGVzMi5wbmcnLFxyXG4gICAgJ2ltZy9ncmFzczMucG5nJ1xyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGlzdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3Jlc291cmNlcy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblx0bWFpbkxheWVyIDoge1xyXG5cdFx0aWQ6ICdtYWluTGF5ZXInLFxyXG5cdFx0c2l6ZSA6IFs4MDAsNjAwXSxcclxuXHRcdGJhY2tncm91bmQ6ICdpbWcvdGVycmFpbi5wbmcnLFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhclx0cGxheWVyID0gdGhpcy5nYW1lLmdldENvbmZpZygncGxheWVyJyksXHJcblx0XHRcdFx0Y3Vyc29yID0gdGhpcy5nYW1lLmdldENvbmZpZygnY3Vyc29yJyksXHJcblx0XHRcdFx0Y291bnRlciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2NvdW50ZXInKSxcclxuXHRcdFx0XHR0aW1lciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3RpbWVyJyksXHJcblx0XHRcdFx0YmVzdFRpbWUgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdiZXN0VGltZScpO1xyXG5cclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG5cdFx0XHR0aGlzLmdhbWUucGFyYW1ldGVycy5nYW1lVGltZXIgPSAwO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRPYmplY3RzKFtwbGF5ZXIsIGN1cnNvciwgY291bnRlciwgdGltZXIsIGJlc3RUaW1lXSk7XHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnc3Bhd25fbW9uc3RlcicsICdzcGF3bl9oZWFydCcsICdyYW5kb21fdHJlZXMnLCdzcGF3bl9wb3dlcnVwJ11cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9sYXllcnMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFaQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBO0FBNEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hmQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQTZCQTs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==