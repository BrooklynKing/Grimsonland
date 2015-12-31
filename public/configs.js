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
<<<<<<< HEAD
			render: 'unit',
			collisions: true,
			parameters: {
				speed: 150,
				health: 10,
				spellPower: 1,
				cooldown: 10,
				fireCooldown: 10,
=======
			parameters: {
				speed: 150,
				health: 1,
				cooldown: 15,
				fireCooldown: 15,
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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

<<<<<<< HEAD
			rules: ['destroyAfterSpriteDone']
=======
			rules: ['explosionLogic']
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
		},
		monster: {
			zIndex: 1,
			id: 'monster',
			sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
<<<<<<< HEAD
			size: [20, 28],
			collisions: true,
			render: 'unit',
=======
			size: [25, 25],
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
			collisions: true,
			sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
			size: [25, 40],
			render: 'unit',
=======
			sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
			size: [25, 40],
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
			collisions: true,
			//sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
			sprite: ['img/fireballsprite.png', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
			size: [25, 25],
=======
			//sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
			sprite: ['img/fireballsprite.png', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
			size: [20, 20],
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 400
			},
<<<<<<< HEAD
			conditions: ['bulletMonsterCollision'],
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
=======
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'bulletMonsterCollision', 'dynamicZIndex']
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
		},
		mbullet: {
			zIndex: 3,
			id: 'bullet',
<<<<<<< HEAD
			collisions: true,
=======
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
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
=======
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
		stones: {
			id: 'stones',
			sprite: ['img/stones.png', [0, 0], [36, 36]],
			size: [30, 30],
			zIndex: 0
		},
		heart: {
			zIndex: 2,
			id: 'heart',
<<<<<<< HEAD
			collisions: true,
			sprite: ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
			conditions: ['triggerOnPlayerCollision'],
=======
			sprite: ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
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
=======
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

<<<<<<< HEAD
	            function getRandomPointInArea() {
	                return [Math.round(Math.random() * obj.game.canvas.width), Math.round(Math.random() * obj.game.canvas.height)];
=======
	            function getRandomPointInArea(area) {
	                return [Math.round(Math.random() * area[1][0]) + area[0][0], Math.round(Math.random() * area[1][1]) + area[0][1]];
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var config = obj.game.getConfig('tree');

	                config.pos = getRandomPointInArea(this.parameters.area);

	                this.context.addObject(config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
<<<<<<< HEAD
	                var config = obj.game.getConfig('stones');

=======

	                var config = obj.game.getConfig('stones');

>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
	                config.pos = getRandomPointInArea(this.parameters.area);

	                var stone = this.context.addObject(config);
	                stone.sprite.setDegree(_utils2.default.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
<<<<<<< HEAD
=======
	            area: [[50, 50], [700, 500]],
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
	            trees: 30,
	            stones: 20
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
	            monsterCooldown: 6,
=======
	            monsterCooldown: 7,
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
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
=======
	            area: [[50, 50], [700, 500]],
	            currentCooldown: 1000,
	            cooldown: 1000
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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

<<<<<<< HEAD
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    var explosionConfig = obj.layer.game.getConfig('explosion');
	                    explosionConfig.pos = obj.pos;
=======
	            if (_utils2.default.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
	                var explosionConfig = obj.layer.game.getConfig('explosion');
	                explosionConfig.pos = player.pos;
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3

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
<<<<<<< HEAD
	                var blood = obj.layer.game.getConfig('blood');
	                blood.pos = obj.pos;
	                obj.layer.addObject(blood);
=======
	                var skelet = obj.layer.game.getConfig('skelet');
	                skelet.pos = obj.pos;
	                obj.layer.addObject(skelet);
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3

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
<<<<<<< HEAD
=======
	                /* var	bloodConfig = obj.layer.game.getConfig('blood');
	                 bloodConfig.pos = obj.pos;
	                 bloodConfig.id = 'blood_' + obj.id;
	                 obj.layer.addObject(bloodConfig);*/
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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

<<<<<<< HEAD
	                createBullet(direction, destination);

	                for (var i = 1; i <= obj.parameters.spellPower - 1; i++) {
	                    var direction1 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20 * i)),
	                        direction2 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20 * i));
=======
	                bulletConfig.parameters.direction = direction1;
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, destination)[0]);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction2;

	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20))[0]);
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3

	                    createBullet(direction1, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20 * i));
	                    createBullet(direction2, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20 * i));
	                }

<<<<<<< HEAD
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
=======
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20))[0]);
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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
<<<<<<< HEAD
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
=======
>>>>>>> 040881a7da9814d685c2506c9c173c8ff9178dd3
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

