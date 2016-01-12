var configs =
webpackJsonp_name_([1,4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(7);

	var _index4 = _interopRequireDefault(_index3);

	var _resources = __webpack_require__(16);

	var _resources2 = _interopRequireDefault(_resources);

	var _layers = __webpack_require__(17);

	var _layers2 = _interopRequireDefault(_layers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    objects: _index2.default,
	    rules: _index4.default,
	    resources: _resources2.default,
	    layers: _layers2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(2);

	var _spells2 = _interopRequireDefault(_spells);

	var _units = __webpack_require__(3);

	var _units2 = _interopRequireDefault(_units);

	var _effects = __webpack_require__(4);

	var _effects2 = _interopRequireDefault(_effects);

	var _terrain = __webpack_require__(5);

	var _terrain2 = _interopRequireDefault(_terrain);

	var _ui = __webpack_require__(6);

	var _ui2 = _interopRequireDefault(_ui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var objects = {};

	Object.assign(objects, _spells2.default);
	Object.assign(objects, _units2.default);
	Object.assign(objects, _effects2.default);
	Object.assign(objects, _ui2.default);
	Object.assign(objects, _terrain2.default);

	exports.default = objects;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    fireballSpell: {
	        zIndex: 2000,
	        sprite: ['spellIcons', [0, 0], [32, 32]],
	        pos: [470, 748],

	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            bulletsFired: 0,
	            cooldown: 10
	        },
	        type: 'spell',
	        rules: ['fireball']
	    },
	    frostShardSpell: {
	        zIndex: 2000,
	        sprite: ['spellIcons', [224, 96], [32, 32]],
	        pos: [512, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            shardsFired: 0,
	            cooldown: 75
	        },
	        type: 'spell',
	        rules: ['frostShard']
	    },
	    teleportSpell: {
	        zIndex: 2000,
	        sprite: ['spellIcons', [64, 32], [32, 32]],
	        pos: [554, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            power: 200,
	            teleportGates: 0,
	            cooldown: 200
	        },
	        type: 'spell',
	        rules: ['teleport']
	    },
	    teleportGate: {
	        zIndex: 0,
	        render: 'object',
	        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
	        pos: [466, 580],
	        size: [32, 32],
	        parameters: {
	            cooldown: 50
	        },
	        type: 'spellElement',
	        rules: ['removeOnCooldown', 'dynamicZIndex']
	    },

	    bullet: {
	        zIndex: 3,
	        collisions: true,
	        render: 'object',
	        sprite: ['fireball', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
	        size: [25, 25],
	        type: 'spellElement',
	        parameters: {
	            power: 10,
	            speed: 400
	        },
	        conditions: ['bulletMonsterCollision'],
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
	    },
	    frostShard: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'spellElement',
	        size: [500, 500],
	        parameters: {
	            power: 100,
	            cooldown: 150
	        },
	        conditions: ['slowEnemies'],
	        rules: ['removeOnCooldown', 'dynamicZIndex']
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
	var config = {
	    player: {
	        zIndex: 20,
	        sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
	        pos: [612, 484],
	        size: [25, 32],
	        render: 'unit',
	        collisions: true,
	        parameters: {
	            speed: 150,
	            health: 50,
	            spellPower: 1,
	            level: 1,
	            exp: 0,
	            effects: [],
	            currentSpell: 'fireball',
	            direction: {},
	            levelTable: {
	                1: 400,
	                2: 900,
	                3: 1400,
	                4: 2100,
	                5: 2800,
	                6: 3600,
	                7: 4500,
	                8: 5400,
	                9: 6500
	            }
	        },
	        type: 'player',
	        rules: ['moveWithKeyboard', 'rotateToMouse', 'selectSpellWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'moveToDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'playerLevelUp']
	    },
	    summonGate: {
	        zIndex: 0,
	        render: 'object',
	        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
	        pos: [466, 580],
	        size: [25, 30],
	        collisions: true,
	        parameters: {
	            cooldown: 80,
	            exp: 5,
	            chanceOfBoss: 3,
	            chanceOfBoss2: 8,
	            chanceOfBoomer: 23,
	            health: 10
	        },
	        conditions: ['monsterHealthStatus'],
	        type: 'monster',
	        rules: ['summonOnCooldown', 'dynamicZIndex']
	    },
	    monster: {
	        zIndex: 1,
	        sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 25,
	            cooldown: 70,
	            scentSpeed: 120,
	            scentRange: 400,
	            exp: 20,
	            wanderCooldown: 500,
	            effects: [],
	            health: 20,
	            power: 5
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['moveToDirection', 'wandererAI', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetEffects', 'resetMeleeCooldown']
	    },
	    monsterBoomer: {
	        zIndex: 1,
	        sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 100,
	            exp: 40,
	            effects: [],
	            health: 10,
	            power: 10
	        },
	        conditions: ['monsterHealthStatus', 'monsterExplosionCondition'],
	        type: 'monster',
	        rules: ['moveToDirection', 'rotateByPlayer', 'setDirectionToPlayerAdvance', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
	    },
	    monsterBoss: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
	        size: [25, 40],
	        render: 'unit',
	        parameters: {
	            speed: 50,
	            exp: 100,
	            cooldown: 300,
	            power: 10,
	            health: 30,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'monsterBossLogic', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    monsterBoss2: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['bigMonsters', [192, 200], [32, 50], 6, [0, 1, 2]],
	        size: [25, 40],
	        render: 'unit',
	        parameters: {
	            speed: 15,
	            cooldown: 200,
	            exp: 200,
	            fireRange: 300,
	            power: 10,
	            health: 50,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'monsterBoss2Logic', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    heart: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        size: [25, 25],
	        sprite: ['pumpkin', [0, 0], [32, 32], 5, [0, 1]],
	        conditions: ['triggerOnPlayerCollision'],
	        parameters: {
	            power: 10
	        }
	    },
	    powerup: {
	        zIndex: 2,
	        size: [25, 25],
	        //render: 'object',
	        collisions: true,
	        sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
	        conditions: ['triggerOnPlayerCollisionPowerUp'],
	        parameters: {
	            exp: 1000
	            //power : 1
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    mbullet: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['img/darkblast.png', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [32, 32],
	        conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
	        parameters: {
	            power: 1,
	            speed: 100
	        },
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
	    },
	    mbullet2: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['img/effects.png', [0, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [32, 32],
	        conditions: ['monsterBoss2Bullet'],
	        parameters: {
	            power: 15,
	            cooldown: 100,
	            speed: 150
	        },
	        rules: ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'moveToDirection', 'dynamicZIndex']
	    },
	    blood: {
	        zIndex: 2,
	        sprite: ['monsterBlood', [0, 0], [32, 13]],
	        parameters: {
	            cooldown: 500
	        },
	        rules: ['removeOnCooldown']
	    },
	    bloodSpray: {
	        zIndex: 2,
	        sprite: ['bloodEffect', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    },
	    skelet: {
	        zIndex: 0,
	        sprite: ['img/skeleton.png', [0, 0], [34, 34]],
	        parameters: {
	            cooldown: 300
	        },
	        rules: ['removeOnCooldown']
	    },
	    explosion: {
	        render: 'object',
	        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], null, true],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    },
	    monsterExplosion: {
	        render: 'object',
	        collisions: true,
	        type: 'spellEffect',
	        conditions: ['monsterExplosion'],
	        size: [39, 39],
	        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
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
	var config = {

	    tree: {
	        sprite: ['tree', [0, 0], [76, 76]],
	        size: [70, 70],
	        rules: ['dynamicZIndex']
	    },
	    stones: {
	        render: 'object',
	        sprite: ['stone', [0, 0], [25, 22]],
	        size: [25, 22],
	        rules: ['dynamicZIndex']
	        //zIndex : 0
	    }
	};

	exports.default = config;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    cursor: {
	        zIndex: 2000,
	        render: 'cursor',
	        pos: [400, 350],
	        sprite: ['cursor', [0, 0], [30, 30]],
	        rules: ['bindPositionToMouse']
	    },
	    counter: {
	        zIndex: 2000,
	        pos: [5, 13],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "SCORE: {kills}",
	            size: 14
	        },
	        rules: ['countMonsterKilled']
	    },
	    level: {
	        zIndex: 2000,
	        pos: [35, 45],
	        render: "expBar",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "LEVEL: {level}",
	            size: 14
	        },
	        rules: ['level']
	    },
	    timer: {
	        zIndex: 2000,
	        pos: [5, 23],
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
	        pos: [5, 370],
	        zIndex: 2000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            size: 14,
	            template: "BEST TIME: {time}"
	        },
	        rules: ['bestTime']
	    },
	    bestScore: {
	        pos: [5, 380],
	        zIndex: 2000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            size: 14,
	            template: "BEST SCORE: {score}"
	        },
	        rules: ['bestScore']
	    }
	};

	exports.default = config;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(8);

	var _spells2 = _interopRequireDefault(_spells);

	var _units = __webpack_require__(11);

	var _units2 = _interopRequireDefault(_units);

	var _layers = __webpack_require__(12);

	var _layers2 = _interopRequireDefault(_layers);

	var _ui = __webpack_require__(13);

	var _ui2 = _interopRequireDefault(_ui);

	var _etc = __webpack_require__(15);

	var _etc2 = _interopRequireDefault(_etc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rules = {};

	Object.assign(rules, _spells2.default);
	Object.assign(rules, _units2.default);
	Object.assign(rules, _layers2.default);
	Object.assign(rules, _ui2.default);
	Object.assign(rules, _etc2.default);

	exports.default = rules;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    fireball: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'fireball') {
	                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
	                    if (!fireCooldown) {
	                        var createBullet = function createBullet(direction, destination) {

	                            var bulletConfig = obj.layer.game.getConfig('bullet');
	                            bulletConfig.pos = player.pos.clone();

	                            var bull = obj.layer.addObject(bulletConfig);
	                            bull.setParameter('direction', direction);
	                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));

	                            bull.sprite.setDegree(_utils2.default.getDegree(player.pos, destination)[0]);
	                        };

	                        var destination = new _utils2.default.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y),
	                            spellPower = player.getParameter('spellPower'),
	                            startDegree = 10 * (spellPower - 1);

	                        destination.x -= obj.layer.translate.x;
	                        destination.y -= obj.layer.translate.y;

	                        for (var i = 0; i < spellPower; i++) {
	                            var direction = new _utils2.default.Line(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));
	                            createBullet(direction, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));
	                            startDegree -= 20;
	                        }
	                        if (obj.getDefaultParameter('cooldown') + 3 * (spellPower - 1) > 30) {
	                            obj.setParameter('cooldown', 30);
	                        } else {
	                            obj.setParameter('cooldown', obj.getDefaultParameter('cooldown') + 5 * (spellPower - 1));
	                        }

	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }

	    },
	    slowEnemies: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'monster') {
	                    var speed = objects[i].getParameter('speed'),
	                        power = obj.getParameter('power'),
	                        effects = objects[i].getParameter('effects') || [];

	                    if (speed < power) {
	                        objects[i].setParameter('speed', 0);
	                    } else {
	                        objects[i].setParameter('speed', speed - power);
	                    }

	                    if (effects.indexOf('frozen') == -1) {
	                        effects.push('frozen');
	                    }
	                }
	            }
	        }
	    },
	    teleport: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'teleport') {
	                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
	                    if (!fireCooldown) {
	                        var mouse = new _utils2.default.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y);

	                        mouse.x -= obj.layer.translate.x;
	                        mouse.y -= obj.layer.translate.y;

	                        var direction = new _utils2.default.Line(player.pos, _utils2.default.getMovedPointByDegree(player.pos, mouse, 0)),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = direction.getDestination(player.pos, obj.getParameter('power')),
	                            cooldown = obj.getDefaultParameter('cooldown', cooldown) - 30 * (spellPower - 1),
	                            teleportGate;

	                        teleportGate = obj.layer.game.getConfig('teleportGate');
	                        teleportGate.pos = player.pos.clone();

	                        obj.layer.addObject(teleportGate);

	                        teleportGate = obj.layer.game.getConfig('teleportGate');
	                        teleportGate.pos = destination.clone();

	                        obj.layer.addObject(teleportGate);

	                        player.setPosition(destination);

	                        obj.setParameter('cooldown', cooldown > 50 ? cooldown : 50);
	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    frostShard: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'frostShard') {
	                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
	                    if (!fireCooldown) {
	                        var frostShard = obj.layer.game.getConfig('frostShard'),
	                            mousePosition = new _utils2.default.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = mousePosition.clone();

	                        destination.x -= obj.layer.translate.x;
	                        destination.y -= obj.layer.translate.y;

	                        frostShard.pos = destination.clone();

	                        var spellPowerBoost = 0;

	                        for (var i = 1; i < spellPower; i++) {
	                            spellPowerBoost += 50;
	                        }

	                        var fs = obj.layer.addObject(frostShard);

	                        fs.setParameter('cooldown', fs.getParameter('cooldown') + spellPowerBoost);

	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    bulletMonsterCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'monster') {
	                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

	                    var blood = obj.layer.game.getConfig('bloodSpray');
	                    blood.pos = objects[i].pos.clone();
	                    blood.pos.x += 2;
	                    blood.pos.y += -10;
	                    obj.layer.addObject(blood);

	                    obj._removeInNextTick = true;

	                    break;
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Victor = __webpack_require__(10);

	function collides(x, y, r, b, x2, y2, r2, b2) {
	    return !(r >= x2 || x < r2 || b >= y2 || y < b2);
	}

	function Point(x, y) {
	    if (Array.isArray(x)) {
	        this.x = x[0];
	        this.y = x[1];
	    } else {
	        this.x = x;
	        this.y = y;
	    }
	}

	Point.prototype.clone = function () {
	    return new Point(this.x, this.y);
	};

	function Line(point, vector) {

	    /*if (point.x == vector.x) {
	        this.k = 'vert';
	        this.b = vector.x;
	        this.dir = (vector.y >= point.y) ? 1 : -1;
	    } else {
	        this.k = (vector.y - point.y) / (vector.x - point.x);
	        this.b = point.y - point.x * this.k;
	        this.dir = (vector.x >= point.x) ? 1 : -1;
	    }*/
	    var _vector = vector;

	    if (vector instanceof Point) {
	        _vector = getVectorByTwoPoints(point, vector);
	    }
	    if (_vector.x != 0 && _vector.y != 0) {
	        this.k = _vector.x / _vector.y;
	        this.b = point.x - _vector.x * point.y / _vector.y;
	        this.dir = _vector.y >= 0 ? 1 : -1;
	    } else if (_vector.x == 0) {
	        this.k = 'vertical';
	        this.b = _vector.x;
	        this.dir = _vector.y >= 0 ? 1 : -1;
	    } else {
	        this.k = 'horizontal';
	        this.b = _vector.y;
	        this.dir = _vector.x >= 0 ? 1 : -1;
	    }
	    this.vector = _vector; //getVectorByTwoPoints(point, vector);
	}

	Line.prototype.getDestination = function (point, speed) {
	    var x, y;

	    if (this.k == 'vertical') {
	        x = point.x;
	        y = point.y + this.dir * speed;
	    } else if (this.k == 'horizontal') {
	        x = point.x + this.dir * speed;
	        y = point.y;
	    } else {
	        x = point.x + this.dir * speed * this.k / Math.sqrt(Math.pow(this.k, 2) + 1);
	        y = point.y + this.dir * speed / Math.sqrt(Math.pow(this.k, 2) + 1);
	    }
	    return new Point(x, y);
	};

	function getVectorByTwoPoints(point1, point2) {
	    return new Victor(point2.x - point1.x, point2.y - point1.y);
	}

	function boxCollides(pos, size, pos2, size2) {
	    return collides(pos.x + size[0] / 2, pos.y + size[1] / 2, pos.x - size[0] / 2, pos.y - size[1] / 2, pos2.x + size2[0] / 2, pos2.y + size2[1] / 2, pos2.x - size2[0] / 2, pos2.y - size2[1] / 2);
	}
	function getRadians(degree) {
	    return degree * Math.PI / 180;
	};
	function getDegreeBetweenDirections(dir1, dir2) {
	    if (dir2.k == 'vert') {
	        return getDegrees(Math.atan(1 / dir1.k * dir1.dir));
	    } else {
	        return getDegrees(Math.atan((dir2.k * dir2.dir - dir1.k * dir1.dir) / (1 - dir1.k * dir1.dir * dir2.k * dir2.dir)));
	    }
	}
	function getDegrees(radians) {
	    return 180 * radians / Math.PI;
	};
	function getDegree(point1, point2, prevDegree, speed) {
	    var degree = Math.acos((point2.x - point1.x) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
	    point1.y > point2.y && (degree = -degree);
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
	    var newDegree = Math.acos((point2.x - point1.x) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));

	    newDegree = newDegree * 180 / Math.PI;
	    point1.y > point2.y && (newDegree = 360 - newDegree);
	    newDegree += degree;
	    newDegree < 0 && (newDegree += 360);
	    newDegree > 360 && (newDegree -= 360);

	    var dir = newDegree > 0 && newDegree <= 90 || newDegree > 270 && newDegree <= 360 ? 1 : -1;

	    var direction = {
	        dir: dir,
	        k: Math.tan(newDegree * Math.PI / 180)
	    };

	    return getDestination(point1, direction, Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
	}
	function getDirection(point1, point2) {
	    var k, b, dir;

	    if (point1[0] == point2[0]) {
	        k = 'vert';
	        b = point2[0];
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
	function getDistance(point1, point2) {
	    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
	}
	function getDestination(point, line, speed) {
	    var x, y;
	    if (line.k == 'vert') {
	        x = point.x;
	        y = point.y + line.dir * speed;
	    } else {
	        x = point.x + line.dir * speed / Math.sqrt(Math.pow(line.k, 2) + 1);
	        y = point.y + line.dir * speed * line.k / Math.sqrt(Math.pow(line.k, 2) + 1);
	    }
	    return new Point(x, y);
	}
	function getSpeed(start, destination, line) {
	    if (line.k == 'vert') {
	        return (destination.y - start.y) / line.dir;
	    } else {
	        return (destination.y - start.y) * Math.sqrt(Math.pow(line.k, 2) + 1) / (line.dir * line.k);
	    }
	}
	function ellipse(context, cx, cy, rx, ry, rot, aStart, aEnd) {
	    context.save();
	    context.translate(cx, cy);
	    context.rotate(rot);
	    context.translate(-rx, -ry);

	    context.scale(rx, ry);
	    context.arc(1, 1, 1, aStart, aEnd, false);
	    context.restore();
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
	    return new Point(x, y);
	}
	function getPointOfInterception(direction1, direction2) {
	    var x, y;

	    if (direction2.k == 'vert') {
	        x = direction2.b;
	        y = direction1.k * direction1.dir * x + direction1.b;
	    } else {
	        x = (direction2.b - direction1.b) / (direction1.dir * direction1.k - direction2.dir * direction2.k);
	        y = direction1.k * direction1.dir * x + direction1.b;
	    }

	    return [x, y];
	}
	function clone(obj) {
	    !obj && (obj = {});
	    return JSON.parse(JSON.stringify(obj));
	}

	exports.default = {
	    Line: Line,
	    Point: Point,
	    ellipse: ellipse,
	    getRadians: getRadians,
	    'collides': collides,
	    'boxCollides': boxCollides,
	    'getDegree': getDegree,
	    'nextPosition': nextPosition,
	    getSpeed: getSpeed,
	    'getDestination': getDestination,
	    'getDirection': getDirection,
	    getDegrees: getDegrees,
	    getDistance: getDistance,
	    getPointOfInterception: getPointOfInterception, getPointOfInterception: getPointOfInterception,
	    getDegreeBetweenDirections: getDegreeBetweenDirections,
	    clone: clone,
	    'getMovedPointByDegree': getMovedPointByDegree
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	exports = module.exports = Victor;

	/**
	 * # Victor - A JavaScript 2D vector class with methods for common vector operations
	 */

	/**
	 * Constructor. Will also work without the `new` keyword
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = Victor(42, 1337);
	 *
	 * @param {Number} x Value of the x axis
	 * @param {Number} y Value of the y axis
	 * @return {Victor}
	 * @api public
	 */
	function Victor (x, y) {
		if (!(this instanceof Victor)) {
			return new Victor(x, y);
		}

		/**
		 * The X axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.x;
		 *     // => 42
		 *
		 * @api public
		 */
		this.x = x || 0;

		/**
		 * The Y axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.y;
		 *     // => 21
		 *
		 * @api public
		 */
		this.y = y || 0;
	};

	/**
	 * # Static
	 */

	/**
	 * Creates a new instance from an array
	 *
	 * ### Examples:
	 *     var vec = Victor.fromArray([42, 21]);
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromArray
	 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromArray = function (arr) {
		return new Victor(arr[0] || 0, arr[1] || 0);
	};

	/**
	 * Creates a new instance from an object
	 *
	 * ### Examples:
	 *     var vec = Victor.fromObject({ x: 42, y: 21 });
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromObject
	 * @param {Object} obj Object with the values for x and y
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromObject = function (obj) {
		return new Victor(obj.x || 0, obj.y || 0);
	};

	/**
	 * # Manipulation
	 *
	 * These functions are chainable.
	 */

	/**
	 * Adds another vector's X axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addX(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:10
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addX = function (vec) {
		this.x += vec.x;
		return this;
	};

	/**
	 * Adds another vector's Y axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addY(vec2);
	 *     vec1.toString();
	 *     // => x:10, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addY = function (vec) {
		this.y += vec.y;
		return this;
	};

	/**
	 * Adds another vector to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.add(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.add = function (vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	};

	/**
	 * Adds the given scalar to both vector axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalar(2);
	 *     vec.toString();
	 *     // => x: 3, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalar = function (scalar) {
		this.x += scalar;
		this.y += scalar;
		return this;
	};

	/**
	 * Adds the given scalar to the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarX(2);
	 *     vec.toString();
	 *     // => x: 3, y: 2
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarX = function (scalar) {
		this.x += scalar;
		return this;
	};

	/**
	 * Adds the given scalar to the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarY(2);
	 *     vec.toString();
	 *     // => x: 1, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarY = function (scalar) {
		this.y += scalar;
		return this;
	};

	/**
	 * Subtracts the X axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractX(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:50
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractX = function (vec) {
		this.x -= vec.x;
		return this;
	};

	/**
	 * Subtracts the Y axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractY(vec2);
	 *     vec1.toString();
	 *     // => x:100, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractY = function (vec) {
		this.y -= vec.y;
		return this;
	};

	/**
	 * Subtracts another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtract(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtract = function (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	};

	/**
	 * Subtracts the given scalar from both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalar(20);
	 *     vec.toString();
	 *     // => x: 80, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalar = function (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		return this;
	};

	/**
	 * Subtracts the given scalar from the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarX(20);
	 *     vec.toString();
	 *     // => x: 80, y: 200
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarX = function (scalar) {
		this.x -= scalar;
		return this;
	};

	/**
	 * Subtracts the given scalar from the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarY(20);
	 *     vec.toString();
	 *     // => x: 100, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarY = function (scalar) {
		this.y -= scalar;
		return this;
	};

	/**
	 * Divides the X axis by the x component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.divideX(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideX = function (vector) {
		this.x /= vector.x;
		return this;
	};

	/**
	 * Divides the Y axis by the y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.divideY(vec2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideY = function (vector) {
		this.y /= vector.y;
		return this;
	};

	/**
	 * Divides both vector axis by a axis values of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.divide(vec2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Victor} vector The vector to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divide = function (vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	};

	/**
	 * Divides both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalar(2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalar = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
			this.y /= scalar;
		} else {
			this.x = 0;
			this.y = 0;
		}

		return this;
	};

	/**
	 * Divides the X axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarX(2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarX = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
		} else {
			this.x = 0;
		}
		return this;
	};

	/**
	 * Divides the Y axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarY = function (scalar) {
		if (scalar !== 0) {
			this.y /= scalar;
		} else {
			this.y = 0;
		}
		return this;
	};

	/**
	 * Inverts the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertX();
	 *     vec.toString();
	 *     // => x:-100, y:50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertX = function () {
		this.x *= -1;
		return this;
	};

	/**
	 * Inverts the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertY();
	 *     vec.toString();
	 *     // => x:100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertY = function () {
		this.y *= -1;
		return this;
	};

	/**
	 * Inverts both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invert();
	 *     vec.toString();
	 *     // => x:-100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invert = function () {
		this.invertX();
		this.invertY();
		return this;
	};

	/**
	 * Multiplies the X axis by X component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyX = function (vector) {
		this.x *= vector.x;
		return this;
	};

	/**
	 * Multiplies the Y axis by Y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyY = function (vector) {
		this.y *= vector.y;
		return this;
	};

	/**
	 * Multiplies both vector axis by values from a given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.multiply(vec2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Victor} vector The vector to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiply = function (vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	};

	/**
	 * Multiplies both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalar(2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Number} The scalar to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalar = function (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	/**
	 * Multiplies the X axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarX(2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarX = function (scalar) {
		this.x *= scalar;
		return this;
	};

	/**
	 * Multiplies the Y axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarY = function (scalar) {
		this.y *= scalar;
		return this;
	};

	/**
	 * Normalize
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.normalize = function () {
		var length = this.length();

		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.divide(Victor(length, length));
		}
		return this;
	};

	Victor.prototype.norm = Victor.prototype.normalize;

	/**
	 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.limit(80, 0.9);
	 *     vec.toString();
	 *     // => x:90, y:50
	 *
	 * @param {Number} max The maximum value for both x and y axis
	 * @param {Number} factor Factor by which the axis are to be multiplied with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.limit = function (max, factor) {
		if (Math.abs(this.x) > max){ this.x *= factor; }
		if (Math.abs(this.y) > max){ this.y *= factor; }
		return this;
	};

	/**
	 * Randomizes both vector axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:67, y:73
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomize = function (topLeft, bottomRight) {
		this.randomizeX(topLeft, bottomRight);
		this.randomizeY(topLeft, bottomRight);

		return this;
	};

	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:55, y:50
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeX = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.x, bottomRight.x);
		var max = Math.max(topLeft.x, bottomRight.x);
		this.x = random(min, max);
		return this;
	};

	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:100, y:66
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeY = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.y, bottomRight.y);
		var max = Math.max(topLeft.y, bottomRight.y);
		this.y = random(min, max);
		return this;
	};

	/**
	 * Randomly randomizes either axis between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
	 *     vec.toString();
	 *     // => x:100, y:77
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
		if (!! Math.round(Math.random())) {
			this.randomizeX(topLeft, bottomRight);
		} else {
			this.randomizeY(topLeft, bottomRight);
		}
		return this;
	};

	/**
	 * Rounds both axis to an integer value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.unfloat = function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};

	/**
	 * Rounds both axis to a certain precision
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @param {Number} Precision (default: 8)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.toFixed = function (precision) {
		if (typeof precision === 'undefined') { precision = 8; }
		this.x = this.x.toFixed(precision);
		this.y = this.y.toFixed(precision);
		return this;
	};

	/**
	 * Performs a linear blend / interpolation of the X axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixX(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:100
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixX = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.x = (1 - amount) * this.x + amount * vec.x;
		return this;
	};

	/**
	 * Performs a linear blend / interpolation of the Y axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixY(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:100, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixY = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.y = (1 - amount) * this.y + amount * vec.y;
		return this;
	};

	/**
	 * Performs a linear blend / interpolation towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mix(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mix = function (vec, amount) {
		this.mixX(vec, amount);
		this.mixY(vec, amount);
		return this;
	};

	/**
	 * # Products
	 */

	/**
	 * Creates a clone of this vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = vec1.clone();
	 *
	 *     vec2.toString();
	 *     // => x:10, y:10
	 *
	 * @return {Victor} A clone of the vector
	 * @api public
	 */
	Victor.prototype.clone = function () {
		return new Victor(this.x, this.y);
	};

	/**
	 * Copies another vector's X component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyX(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:10
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyX = function (vec) {
		this.x = vec.x;
		return this;
	};

	/**
	 * Copies another vector's Y component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyY(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:10, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyY = function (vec) {
		this.y = vec.y;
		return this;
	};

	/**
	 * Copies another vector's X and Y components in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copy(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copy = function (vec) {
		this.copyX(vec);
		this.copyY(vec);
		return this;
	};

	/**
	 * Sets the vector to zero (0,0)
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *		 var1.zero();
	 *     vec1.toString();
	 *     // => x:0, y:0
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.zero = function () {
		this.x = this.y = 0;
		return this;
	};

	/**
	 * Calculates the dot product of this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.dot(vec2);
	 *     // => 23000
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Dot product
	 * @api public
	 */
	Victor.prototype.dot = function (vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	};

	Victor.prototype.cross = function (vec2) {
		return (this.x * vec2.y ) - (this.y * vec2.x );
	};

	/**
	 * Projects a vector onto another vector, setting itself to the result.
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 0);
	 *     var vec2 = new Victor(100, 100);
	 *
	 *     vec.projectOnto(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want to project this vector onto
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.projectOnto = function (vec2) {
	    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
	    this.x = coeff * vec2.x;
	    this.y = coeff * vec2.y;
	    return this;
	};


	Victor.prototype.horizontalAngle = function () {
		return Math.atan2(this.y, this.x);
	};

	Victor.prototype.horizontalAngleDeg = function () {
		return radian2degrees(this.horizontalAngle());
	};

	Victor.prototype.verticalAngle = function () {
		return Math.atan2(this.x, this.y);
	};

	Victor.prototype.verticalAngleDeg = function () {
		return radian2degrees(this.verticalAngle());
	};

	Victor.prototype.angle = Victor.prototype.horizontalAngle;
	Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
	Victor.prototype.direction = Victor.prototype.horizontalAngle;

	Victor.prototype.rotate = function (angle) {
		var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		this.x = nx;
		this.y = ny;

		return this;
	};

	Victor.prototype.rotateDeg = function (angle) {
		angle = degrees2radian(angle);
		return this.rotate(angle);
	};

	Victor.prototype.rotateTo = function(rotation) {
		return this.rotate(rotation-this.angle());
	};

	Victor.prototype.rotateToDeg = function(rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateTo(rotation);
	};

	Victor.prototype.rotateBy = function (rotation) {
		var angle = this.angle() + rotation;

		return this.rotate(angle);
	};

	Victor.prototype.rotateByDeg = function (rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateBy(rotation);
	};

	/**
	 * Calculates the distance of the X axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceX(vec2);
	 *     // => -100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceX = function (vec) {
		return this.x - vec.x;
	};

	/**
	 * Same as `distanceX()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.absDistanceX(vec2);
	 *     // => 100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceX = function (vec) {
		return Math.abs(this.distanceX(vec));
	};

	/**
	 * Calculates the distance of the Y axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => -10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceY = function (vec) {
		return this.y - vec.y;
	};

	/**
	 * Same as `distanceY()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => 10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceY = function (vec) {
		return Math.abs(this.distanceY(vec));
	};

	/**
	 * Calculates the euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distance(vec2);
	 *     // => 100.4987562112089
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distance = function (vec) {
		return Math.sqrt(this.distanceSq(vec));
	};

	/**
	 * Calculates the squared euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceSq(vec2);
	 *     // => 10100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceSq = function (vec) {
		var dx = this.distanceX(vec),
			dy = this.distanceY(vec);

		return dx * dx + dy * dy;
	};

	/**
	 * Calculates the length or magnitude of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.length();
	 *     // => 111.80339887498948
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.length = function () {
		return Math.sqrt(this.lengthSq());
	};

	/**
	 * Squared length / magnitude
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.lengthSq();
	 *     // => 12500
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y;
	};

	Victor.prototype.magnitude = Victor.prototype.length;

	/**
	 * Returns a true if vector is (0, 0)
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     vec.zero();
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isZero = function() {
		return this.x === 0 && this.y === 0;
	};

	/**
	 * Returns a true if this vector is the same as another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(100, 50);
	 *     vec1.isEqualTo(vec2);
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isEqualTo = function(vec2) {
		return this.x === vec2.x && this.y === vec2.y;
	};

	/**
	 * # Utility Methods
	 */

	/**
	 * Returns an string representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toString();
	 *     // => x:10, y:20
	 *
	 * @return {String}
	 * @api public
	 */
	Victor.prototype.toString = function () {
		return 'x:' + this.x + ', y:' + this.y;
	};

	/**
	 * Returns an array representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toArray();
	 *     // => [10, 20]
	 *
	 * @return {Array}
	 * @api public
	 */
	Victor.prototype.toArray = function () {
		return [ this.x, this.y ];
	};

	/**
	 * Returns an object representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toObject();
	 *     // => { x: 10, y: 20 }
	 *
	 * @return {Object}
	 * @api public
	 */
	Victor.prototype.toObject = function () {
		return { x: this.x, y: this.y };
	};


	var degrees = 180 / Math.PI;

	function random (min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function radian2degrees (rad) {
		return rad * degrees;
	}

	function degrees2radian (deg) {
		return deg / degrees;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    playerDeath: {
	        update: function update(dt, obj) {
	            if (obj.getParameter('health') <= 0) {
	                obj.layer.game.triggerGlobalEvent('player_dead');
	            }
	        }
	    },
	    damageOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
	                    break;
	                }
	            }
	        }
	    },
	    destroyOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    var explosionConfig = obj.layer.game.getConfig('explosion');
	                    explosionConfig.pos = obj.pos.clone();

	                    obj.layer.addObject(explosionConfig);

	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    triggerOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    if (objects[i].getParameter('health') < objects[i].getDefaultParameter('health')) {
	                        if (objects[i].getParameter('health') + obj.getParameter('power') <= objects[i].getDefaultParameter('health')) {
	                            objects[i].setParameter('health', objects[i].getParameter('health') + obj.getParameter('power'));
	                        } else {
	                            objects[i].setParameter('health', objects[i].getDefaultParameter('health'));
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
	            if (!obj.getParameter('meleeCooldown')) {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0; i < objects.length; i++) {
	                    if (objects[i].type == 'player') {
	                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

	                        var blood = obj.layer.game.getConfig('bloodSpray');
	                        blood.pos = objects[i].pos.clone();
	                        blood.pos.x += 2;
	                        blood.pos.y += -10;
	                        obj.layer.addObject(blood);

	                        obj.setParameter('meleeCooldown', obj.getParameter('cooldown'));
	                        break;
	                    }
	                }
	            }
	        }
	    },
	    monsterExplosion: {
	        update: function update(dt, obj) {
	            if (!obj.getParameter('exploded')) {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0, l = objects.length; i < l; i++) {
	                    if (objects[i].getParameter('health')) {
	                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
	                        break;
	                    }
	                }

	                obj.setParameter('exploded', true);
	            }
	        }
	    },
	    monsterExplosionCondition: {
	        update: function update(dt, obj) {
	            function generateExplosions() {
	                var pos = obj.pos.clone(),
	                    explosionConfig,
	                    power = obj.getParameter('power'),
	                    expl;

	                obj._removeInNextTick = true;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - 3 / 2 * obj.size[0], pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + 3 / 2 * obj.size[0], pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);
	            }

	            if (obj.getParameter('health') <= 0) {
	                generateExplosions();
	            } else {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0; i < objects.length; i++) {
	                    if (objects[i].type == 'player') {
	                        generateExplosions();

	                        break;
	                    }
	                }
	            }
	        }
	    },
	    stopOnCollisionWithPlayer: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'player') {
	                    obj.setParameter('speed', 0);
	                    break;
	                }
	            }
	        }
	    },
	    resetSpeed: {
	        update: function update(dt, obj) {
	            obj.setParameter('speed', obj.getDefaultParameter('speed'));
	        }
	    },
	    resetEffects: {
	        update: function update(dt, obj) {
	            obj.getParameter('effects').splice(0);
	        }
	    },
	    moveToDirection: {
	        update: function update(dt, obj) {
	            var direction = obj.getParameter('direction');

	            if (direction && direction.dir) {
	                obj.setPosition(direction.getDestination(obj.pos, obj.getParameter('speed') * dt));
	            }
	        }
	    },
	    playerLevelUp: {
	        update: function update(dt, obj) {
	            var levelExp = obj.getParameter('levelTable')[obj.getParameter('level')];
	            if (obj.getParameter('levelTable')[obj.getParameter('level')]) {
	                if (obj.getParameter('exp') > obj.getParameter('levelTable')[obj.getParameter('level')]) {
	                    obj.setParameter('exp', obj.getParameter('exp') - levelExp);
	                    obj.setParameter('level', obj.getParameter('level') + 1);
	                    obj.setParameter('spellPower', obj.getParameter('spellPower') + 1);
	                }
	            } else {
	                obj.setParameter('level', 'MAX');
	            }
	        }
	    },
	    monsterHealthStatus: {
	        update: function update(dt, obj) {
	            if (obj.getParameter('health') <= 0) {
	                obj._removeInNextTick = true;

	                var explosionConfig = obj.layer.game.getConfig('explosion');
	                explosionConfig.pos = obj.pos.clone();

	                obj.layer.addObject(explosionConfig);

	                var blood = obj.layer.game.getConfig('blood');
	                blood.pos = obj.pos.clone();
	                obj.layer.addObject(blood);

	                if (!obj.layer.game.parameters.monstersKilled) {
	                    obj.layer.game.parameters.monstersKilled = 0;
	                }
	                obj.layer.game.parameters.monstersKilled++;

	                var player = obj.layer.getObjectsByType('player')[0];
	                player.setParameter('exp', player.getParameter('exp') + obj.getParameter('exp'));
	            }
	        }
	    },
	    resetRangeCooldown: {
	        update: function update(dt, obj) {
	            var fireCooldown = obj.getParameter('fireCooldown');

	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    resetMeleeCooldown: {
	        update: function update(dt, obj) {
	            var meleeCooldown = obj.getParameter('meleeCooldown');
	            meleeCooldown && obj.setParameter('meleeCooldown', meleeCooldown - 1);
	        }
	    },
	    monsterBossLogic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];
	            if (!obj.getParameter('fireCooldown')) {
	                var bulletConfig = obj.layer.game.getConfig('mbullet'),
	                    direction = new _utils2.default.Line(obj.pos, player.pos);

	                bulletConfig.pos = obj.pos.clone();
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.setParameter('direction', direction);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, player.pos)[0]);

	                obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	            }
	        }
	    },
	    monsterBoss2Logic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                directionToPlayer = obj.getParameter('direction');

	            if (_utils2.default.getDistance(obj.pos, player.pos) < obj.getParameter('fireRange')) {
	                if (!obj.getParameter('fireCooldown')) {
	                    var bulletConfig = obj.layer.game.getConfig('mbullet2');
	                    bulletConfig.pos = obj.pos.clone();

	                    var bull = obj.layer.addObject(bulletConfig);

	                    bull.setParameter('direction', directionToPlayer);
	                    //bull.sprite.setDegree(utils.getDegree(obj.pos, player.pos)[0]);

	                    obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                }
	            } else {
	                obj.setPosition(directionToPlayer.getDestination(obj.pos, obj.getParameter('speed') * dt));
	            }
	        }
	    },
	    monsterBoss2Bullet: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');
	            var objects = obj.getParameter('collisions');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                createExplosion();
	                return;
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    obj._removeInNextTick = true;

	                    createExplosion();
	                    break;
	                }
	            }

	            function createExplosion() {
	                var pos = obj.pos.clone(),
	                    explosionConfig,
	                    power = obj.getParameter('power'),
	                    expl;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x, pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);
	            }
	        }
	    },
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            var pos = obj.pos.clone();
	            var direction = {};
	            direction.left = obj.layer.game.input.isDown(65);
	            direction.up = obj.layer.game.input.isDown(87);
	            direction.down = obj.layer.game.input.isDown(83);
	            direction.right = obj.layer.game.input.isDown(68);
	            if (direction.right) {
	                pos.x = obj.pos.x + 1;
	            }
	            if (direction.left) {
	                pos.x = obj.pos.x - 1;
	            }
	            if (direction.down) {
	                pos.y = obj.pos.y + 1;
	            }
	            if (direction.up) {
	                pos.y = obj.pos.y - 1;
	            }

	            if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
	                obj.getParameter('direction').dir = null;
	            } else {
	                //var direction = utils.getDirection(obj.pos, pos);
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, pos));
	            }
	        }
	    },
	    selectSpellWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.layer.game.input.isDown(49) && obj.setParameter('currentSpell', 'fireball');
	            obj.layer.game.input.isDown(50) && obj.setParameter('currentSpell', 'frostShard');
	            obj.layer.game.input.isDown(51) && obj.setParameter('currentSpell', 'teleport');
	        }
	    },
	    triggerOnPlayerCollisionPowerUp: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    //objects[i].setParameter('spellPower', objects[i].getParameter('spellPower') + obj.getParameter('power'));
	                    objects[i].setParameter('exp', objects[i].getParameter('exp') + obj.getParameter('exp'));
	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    summonOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var random = Math.random() * 100,
	                    player = obj.layer.getObjectsByType('player')[0],
	                    monsterConfig;

	                if (random <= obj.getParameter('chanceOfBoss2')) {
	                    monsterConfig = obj.layer.game.getConfig('monsterBoss2');
	                } else if (random <= obj.getParameter('chanceOfBoss')) {
	                    monsterConfig = obj.layer.game.getConfig('monsterBoss');
	                } else if (random <= obj.getParameter('chanceOfBoomer')) {
	                    monsterConfig = obj.layer.game.getConfig('monsterBoomer');
	                } else {
	                    monsterConfig = obj.layer.game.getConfig('monster');
	                }

	                monsterConfig.pos = obj.pos.clone();

	                var monster = obj.layer.addObject(monsterConfig);

	                if (player.getParameter('level') > 1) {
	                    monster.setParameter('health', monster.getParameter('health') * 0.75 * player.getParameter('level'));
	                }
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(10);

	var config = {
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea() {
	                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var _config = obj.game.getConfig('tree');

	                _config.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = obj.game.getConfig('stones');

	                _config2.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

	                /*var stone = */this.context.addObject(_config2);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            trees: 40,
	            stones: 40
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < 10000) {

	                if (!this.parameters.currentMonsterCooldown && this.context.getObjectsByType('monster').length < this.parameters.maxOnMap) {
	                    var topLeft = new Victor(50, 50);
	                    var bottomRight = new Victor(1154, 918);

	                    var monsterConfig = obj.game.getConfig('summonGate');
	                    monsterConfig.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                    this.context.addObject(monsterConfig);

	                    this.parameters.monsterSpawned++;
	                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	                } else {
	                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
	                }
	            }
	        },
	        parameters: {
	            area: [[50, 50], [1154, 918]],
	            maxOnMap: 200,
	            monsterCooldown: 10,
	            monsterSpawned: 0
	        }
	    },
	    spawn_heart: {
	        update: function update(dt, obj) {
	            if (!this.parameters.currentCooldown) {
	                var config = obj.game.getConfig('heart');

	                var topLeft = new Victor(50, 50);
	                var bottomRight = new Victor(1154, 918);

	                config.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[50, 50], [1154, 918]],
	            cooldown: 400
	        }
	    },
	    spawn_powerup: {
	        update: function update(dt, obj) {
	            if (!this.parameters.currentCooldown) {
	                var config = obj.game.getConfig('powerup');

	                var topLeft = new Victor(100, 100);
	                var bottomRight = new Victor(1100, 850);

	                config.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[100, 100], [1100, 850]],
	            currentCooldown: 1100,
	            cooldown: 1100
	        }
	    },
	    spawn_terrain: {
	        init: function init() {
	            var obj = this.context,
	                gateConfig = obj.game.getConfig('gate'),
	                wallConfig;

	            for (var i = 0; i < 7; i++) {
	                wallConfig = obj.game.getConfig('wall');
	                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1] / 2];
	                var wall = this.context.addObject(wallConfig);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	            gateConfig.pos = [wallConfig.pos.x + wallConfig.size[0] / 2 + gateConfig.size[0] / 2, (gateConfig.size[1] - 3) / 2];
	            var gate = this.context.addObject(gateConfig);
	        }
	    },
	    goWithPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.getObjectsByType('player')[0],
	                px = (player.pos.x + obj.translate.x) / 1024 * 100,
	                py = (player.pos.y + obj.translate.y) / 768 * 100;

	            if (px < 30) {
	                if (obj.translate.x < 0) {
	                    obj.translate.x += Math.round(player.getParameter('speed') * dt);
	                }
	            }
	            if (px > 70) {
	                if (obj.translate.x > -200) {
	                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
	                }
	            }

	            if (py < 25) {
	                if (obj.translate.y < 0) {
	                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
	                }
	            }
	            if (py > 75) {
	                if (obj.translate.y > -200) {
	                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(14);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    countMonsterKilled: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                kills: obj.layer.game.parameters.monstersKilled || 0
	            }));
	        }
	    },
	    timer: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                time: (obj.layer.game.parameters.gameTimer++ / 60).toFixed(2)
	            }));
	        }
	    },
	    health: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                health: obj.layer.getObjectsByType('player')[0].parameters.health
	            }));
	        }
	    },
	    level: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                level: player.getParameter('level'),
	                exp: player.getParameter('exp'),
	                levelExp: player.getParameter('levelTable')[player.getParameter('level')]
	            }));
	        }
	    },
	    bestTime: {
	        init: function init() {
	            var obj = this.context;
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                time: (obj.layer.game.parameters.bestTime / 60).toFixed(2)
	            }));
	        }
	    },
	    bestScore: {
	        init: function init() {
	            var obj = this.context;
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                score: obj.layer.game.parameters.bestScore
	            }));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(14);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(10);

	var config = {
	    bindPositionToLayer: {
	        update: function update(dt, obj) {
	            if (obj.pos.x - obj.sprite.size[0] / 2 < obj.layer.pos.x) {
	                obj.pos.x = obj.sprite.size[0] / 2;
	            } else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.pos.x + obj.layer.size[0]) {
	                obj.pos.x = obj.layer.pos.x + obj.layer.size[0] - obj.sprite.size[0] / 2;
	            }

	            if (obj.pos.y - obj.sprite.size[1] / 2 < obj.layer.pos.y) {
	                obj.pos.y = obj.sprite.size[1] / 2;
	            } else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.pos.y + obj.layer.size[1]) {
	                obj.pos.y = obj.layer.pos.y + obj.layer.size[1] - obj.sprite.size[1] / 2;
	            }
	        }
	    },
	    destroyAfterLeavingLayer: {
	        update: function update(dt, obj) {
	            if (obj.pos.y < -100 || obj.pos.y - obj.sprite.size[1] - 100 > obj.layer.pos.y + obj.layer.size[1] || obj.pos.x - obj.sprite.size[0] - 100 > obj.layer.pos.x + obj.layer.size[0] || obj.pos.x < -100) {
	                obj._removeInNextTick = true;
	                return false;
	            }
	        }
	    },
	    setDirectionToPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	        }
	    },
	    setDirectionToPlayerAdvance: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                playerDirection = player.getParameter('direction'),
	                oldDirection = obj.getParameter('direction');

	            if (!oldDirection) {
	                oldDirection = new _utils2.default.Line(obj.pos, player.pos);
	            }

	            if (playerDirection.dir == null) {
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	            } else {
	                var speed = Math.abs(Math.min(player.getParameter('speed'), _utils2.default.getDistance(obj.pos, player.pos)) - 10),
	                    playerNextPlace = playerDirection.getDestination(player.pos, speed),
	                    directionToPlayerNextPlace = new _utils2.default.Line(obj.pos, playerNextPlace),
	                    directionToPlayerNextPlaceVector = directionToPlayerNextPlace.vector.clone().normalize(),
	                    oldDirectionVector = oldDirection.vector.clone().normalize(),
	                    newDirectionVector = directionToPlayerNextPlaceVector.add(oldDirectionVector).normalize(),
	                    newDirection = new _utils2.default.Line(obj.pos, newDirectionVector);

	                obj.setParameter('direction', newDirection);
	            }
	        }
	    },
	    wandererAI: {
	        init: function init(dt) {
	            var topLeft = new Victor(100, 100);
	            var bottomRight = new Victor(1100, 850);

	            this.context.setParameter('direction', new _utils2.default.Line(this.context.pos, new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
	        },
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                distance = _utils2.default.getDistance(obj.pos, player.pos);

	            if (distance <= obj.getParameter('scentRange')) {
	                obj.setParameter('scent', true);
	                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
	                obj.setParameter('wanderCooldown', 0);
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	            } else {
	                obj.setParameter('speed', obj.getDefaultParameter('speed'));
	                if (!obj.getParameter('wanderCooldown')) {
	                    var topLeft = new Victor(100, 100);
	                    var bottomRight = new Victor(1100, 850);

	                    obj.setParameter('direction', new _utils2.default.Line(obj.pos, new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
	                    obj.setParameter('wanderCooldown', Math.round(Math.random() * (obj.getDefaultParameter('wanderCooldown') - 100) + 100));
	                } else {
	                    obj.getParameter('wanderCooldown') && obj.setParameter('wanderCooldown', obj.getParameter('wanderCooldown') - 1);
	                }
	            }
	        }
	    },
	    dynamicZIndex: {
	        update: function update(dt, obj) {
	            var newZIndex = 0;
	            obj.pos && (newZIndex += obj.pos.y);
	            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

	            obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
	        }
	    },
	    collisions: {
	        init: function init() {
	            var obj = this.context,
	                collisions = obj.setParameter('collisions', []);

	            collisions.cells = new Array();
	            obj.layer.game.collisions.updateObject(obj);
	        },
	        update: function update(dt, obj) {
	            obj.getParameter('collisions').splice(0);
	            obj.layer.game.collisions.updateObject(obj);
	        }
	    },
	    rotateToMouse: {
	        update: function update(dt, obj) {
	            var destination = new _utils2.default.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y);

	            destination.x -= obj.layer.translate.x;
	            destination.y -= obj.layer.translate.y;

	            var directionToMouse = new _utils2.default.Line(obj.pos, destination);
	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    bindPositionToMouse: {
	        update: function update(dt, obj) {
	            var mousePosition = new _utils2.default.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y);
	            obj.setPosition(mousePosition.clone());
	        }
	    },
	    removeOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
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
	    rotateByDirection: {
	        update: function update(dt, obj) {
	            obj.sprite.rotateToDirection(obj.getParameter('direction'));
	        }
	    },
	    rotateByPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.sprite.rotateToDirection(new _utils2.default.Line(obj.pos, player.pos));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var list = ['img/sprites.png', 'img/demons.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/monsters2.png', 'img/spellicons.png', 'img/spell.png', 'img/darkblast.png', 'img/powerup2.png', 'img/stones.png', 'img/sblood.png', 'img/tree.png', 'img/effects.png', 'img/frosteffect.png', 'img/heart.png', 'img/terrain11.png', 'img/bloods.png', 'img/cursor.png'];

		exports.default = list;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var config = {
		mainLayer: {
			id: 'mainLayer',
			size: [1224, 968],
			background: 'terrain',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level'],
			init: function init() {
				this.game.parameters.monstersKilled = 0;
				this.game.parameters.gameTimer = 0;
			},
			translate: {
				x: -100,
				y: -100
			},

			rules: ['spawn_monster', 'random_trees', 'spawn_heart', 'spawn_powerup', 'goWithPlayer']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9zcGVsbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdWkuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vdmljdG9yL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VuaXRzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2xheWVycy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy91aS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvZXRjLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3Jlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9sYXllcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9iamVjdHMgZnJvbSAnLi9vYmplY3RzL2luZGV4JztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXMvaW5kZXgnO1xyXG5pbXBvcnQgcmVzb3VyY2VzIGZyb20gJy4vcmVzb3VyY2VzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBvYmplY3RzOiBvYmplY3RzLFxyXG4gICAgICAgIHJ1bGVzOiBydWxlcyxcclxuICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgICAgICBsYXllcnM6IGxheWVyc1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgc3BlbGxzIGZyb20gJy4vc3BlbGxzJztcclxuaW1wb3J0IHVuaXRzIGZyb20gJy4vdW5pdHMnO1xyXG5pbXBvcnQgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnO1xyXG5pbXBvcnQgdGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XHJcblxyXG52YXIgb2JqZWN0cyA9IHt9O1xyXG5cclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBzcGVsbHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBlZmZlY3RzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB1aSk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdGVycmFpbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9pbmRleC5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBmaXJlYmFsbFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFswLCAwXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs0NzAsIDc0OF0sXHJcblxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGJ1bGxldHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnZmlyZWJhbGwnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbMjI0LCA5Nl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTEyLCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNoYXJkc0ZpcmVkOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnZnJvc3RTaGFyZCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbNjQsIDMyXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs1NTQsIDc0OF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAyMDAsXHJcbiAgICAgICAgICAgIHRlbGVwb3J0R2F0ZXMgOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsndGVsZXBvcnQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0R2F0ZToge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGU6IFsnYXJjYW5lR2F0ZScsIFswLCAwXSwgWzMyLCAzMl0sIDcsIFswLDFdXSxcclxuICAgICAgICBwb3MgOiBbNDY2LCA1ODBdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93bjogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBydWxlcyA6IFsncmVtb3ZlT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcblxyXG4gICAgYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydmaXJlYmFsbCcsWyAwLCAwXSwgWzMzLCAzM10sIDE2LCBbMCwgMSwgMiwgM11dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDI1XSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWydidWxsZXRNb25zdGVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZWZmZWN0cycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzUwMCwgNTAwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDE1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWydzbG93RW5lbWllcyddLFxyXG4gICAgICAgIHJ1bGVzIDogWydyZW1vdmVPbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9zcGVsbHMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG4gICAgcGxheWVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwLFxyXG4gICAgICAgIHNwcml0ZTogWydoZXJvJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBwb3MgOiBbNjEyLCA0ODRdLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDE1MCxcclxuICAgICAgICAgICAgaGVhbHRoIDogNTAsXHJcbiAgICAgICAgICAgIHNwZWxsUG93ZXI6IDEsXHJcbiAgICAgICAgICAgIGxldmVsIDogMSxcclxuICAgICAgICAgICAgZXhwOiAwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnRTcGVsbDogJ2ZpcmViYWxsJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uIDoge30sXHJcbiAgICAgICAgICAgIGxldmVsVGFibGU6IHtcclxuICAgICAgICAgICAgICAgIDEgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAyIDogOTAwLFxyXG4gICAgICAgICAgICAgICAgMyA6IDE0MDAsXHJcbiAgICAgICAgICAgICAgICA0IDogMjEwMCxcclxuICAgICAgICAgICAgICAgIDUgOiAyODAwLFxyXG4gICAgICAgICAgICAgICAgNiA6IDM2MDAsXHJcbiAgICAgICAgICAgICAgICA3IDogNDUwMCxcclxuICAgICAgICAgICAgICAgIDggOiA1NDAwLFxyXG4gICAgICAgICAgICAgICAgOSA6IDY1MDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdwbGF5ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlV2l0aEtleWJvYXJkJywgJ3JvdGF0ZVRvTW91c2UnLCdzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCcsICdiaW5kUG9zaXRpb25Ub0xheWVyJywgJ3BsYXllckRlYXRoJywgJ21vdmVUb0RpcmVjdGlvbicsJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnLCAncGxheWVyTGV2ZWxVcCddXHJcbiAgICB9LFxyXG4gICAgc3VtbW9uR2F0ZToge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGU6IFsnYXJjYW5lR2F0ZScsIFswLCAwXSwgWzMyLCAzMl0sIDcsIFswLDFdXSxcclxuICAgICAgICBwb3MgOiBbNDY2LCA1ODBdLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDMwXSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA4MCxcclxuICAgICAgICAgICAgZXhwOiA1LFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MgOiAzLFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MyIDogOCxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb29tZXIgOiAyMyxcclxuICAgICAgICAgICAgaGVhbHRoIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzdW1tb25PbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMSxcclxuICAgICAgICBzcHJpdGU6IFsnZGVtb25zJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMjUsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogNzAgLFxyXG4gICAgICAgICAgICBzY2VudFNwZWVkOiAxMjAsXHJcbiAgICAgICAgICAgIHNjZW50UmFuZ2U6IDQwMCxcclxuICAgICAgICAgICAgZXhwOiAyMCxcclxuICAgICAgICAgICAgd2FuZGVyQ29vbGRvd246IDUwMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAyMCxcclxuICAgICAgICAgICAgcG93ZXIgOiA1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWyAnbW9uc3RlckhlYWx0aFN0YXR1cycsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVRvRGlyZWN0aW9uJywgJ3dhbmRlcmVyQUknLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnbWVsZWVBdHRhY2snLCAnZHluYW1pY1pJbmRleCcsICdyZXNldEVmZmVjdHMnLCAncmVzZXRNZWxlZUNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9vbWVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2RlbW9ucycsIFs5NiwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyMCwyOF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxMDAsXHJcbiAgICAgICAgICAgIGV4cCA6IDQwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW10sXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDEwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJywgJ21vbnN0ZXJFeHBsb3Npb25Db25kaXRpb24nXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlQnlQbGF5ZXInLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXJBZHZhbmNlJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYmlnTW9uc3RlcnMnLCBbMCwgMF0sIFszMiwgNTBdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDQwXSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiA1MCxcclxuICAgICAgICAgICAgZXhwIDogMTAwLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMCAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb25zdGVyQm9zc0xvZ2ljJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0UmFuZ2VDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYmlnTW9uc3RlcnMnLCBbMTkyLCAyMDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogMjAwICxcclxuICAgICAgICAgICAgZXhwOiAyMDAsXHJcbiAgICAgICAgICAgIGZpcmVSYW5nZSA6IDMwMCxcclxuICAgICAgICAgICAgcG93ZXIgOiAxMCxcclxuICAgICAgICAgICAgaGVhbHRoIDogNTAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycgLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vbnN0ZXJCb3NzMkxvZ2ljJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnLCAncmVzZXRSYW5nZUNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBoZWFydCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzaXplOiBbMjUsIDI1XSxcclxuICAgICAgICBzcHJpdGUgOiBbJ3B1bXBraW4nLCBbMCwgMF0sIFszMiwgMzJdLCA1LCBbMCwxXV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvd2VydXAgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzaXplOiBbMjUsIDI1XSxcclxuICAgICAgICAvL3JlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGUgOiBbJ3Bvd2VyVXAnLCBbMCwgMF0sIFs3MiwgNjVdLCAxNSwgWzAsIDEsIDIsIDFdXSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3RyaWdnZXJPblBsYXllckNvbGxpc2lvblBvd2VyVXAnXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBleHA6IDEwMDBcclxuICAgICAgICAgICAgLy9wb3dlciA6IDFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VuaXRzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIG1idWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZGFya2JsYXN0LnBuZycsWzAsIDBdLCBbMzgsIDM4XSwgMTIsIFswLCAxLCAyICwzXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1idWxsZXQyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL2VmZmVjdHMucG5nJyxbMCwgMF0sIFszMiwgMzJdLCAxMCwgWzAsIDEsIDJdXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJCb3NzMkJ1bGxldCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTUsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIGJsb29kIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgc3ByaXRlIDogWydtb25zdGVyQmxvb2QnLCBbMCwgMF0sIFszMiwgMTNdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgYmxvb2RTcHJheSA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnYmxvb2RFZmZlY3QnLCBbMCwgMF0sIFs2NCwgNjRdLCAxNSwgWzAsIDEsIDIsIDMsIDRdLCBudWxsLCB0cnVlLCAwLjc4NV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBza2VsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9za2VsZXRvbi5wbmcnLCBbMCwgMF0sIFszNCwgMzRdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2V4cGxvc2lvbnMnLCBbMCwgMF0sIFszOSwgMzldLCAxNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWZmZWN0JyxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVyRXhwbG9zaW9uJ10sXHJcbiAgICAgICAgc2l6ZSA6IFszOSwgMzldLFxyXG4gICAgICAgIHNwcml0ZTogWydleHBsb3Npb25zJywgWzAsIDBdLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvZWZmZWN0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblxyXG4gICAgdHJlZSA6IHtcclxuICAgICAgICBzcHJpdGUgOiBbJ3RyZWUnLCBbMCwgMF0sIFs3NiwgNzZdXSxcclxuICAgICAgICBzaXplIDogWzcwLDcwXSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ3N0b25lJywgWzAsIDBdLCBbMjUsIDIyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwyMl0sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgICAgIC8vekluZGV4IDogMFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGN1cnNvciA6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHJlbmRlcjogJ2N1cnNvcicsXHJcbiAgICAgICAgcG9zOiBbNDAwLDM1MF0sXHJcbiAgICAgICAgc3ByaXRlIDogWydjdXJzb3InLCBbMCwgMF0sIFszMCwgMzBdXSxcclxuICAgICAgICBydWxlczogWydiaW5kUG9zaXRpb25Ub01vdXNlJ11cclxuICAgIH0sXHJcbiAgICBjb3VudGVyOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBwb3M6IFs1LCAxM10sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJTQ09SRToge2tpbGxzfVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2NvdW50TW9uc3RlcktpbGxlZCddXHJcbiAgICB9LFxyXG4gICAgbGV2ZWw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHBvczogWzM1LCA0NV0sXHJcbiAgICAgICAgcmVuZGVyIDogXCJleHBCYXJcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkxFVkVMOiB7bGV2ZWx9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnbGV2ZWwnXVxyXG4gICAgfSxcclxuICAgIHRpbWVyOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBwb3M6IFs1LCAyM10sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJUSU1FUjoge3RpbWV9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsndGltZXInXVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lOiB7XHJcbiAgICAgICAgcG9zOiBbNSwgMzcwXSxcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydiZXN0VGltZSddXHJcbiAgICB9LFxyXG4gICAgYmVzdFNjb3JlOiB7XHJcbiAgICAgICAgcG9zOiBbNSwgMzgwXSxcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFNDT1JFOiB7c2NvcmV9XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Jlc3RTY29yZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgbGF5ZXJzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdWkpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBldGMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ2ZpcmViYWxsJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLm1vdXNlLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5tb3VzZS54LCBvYmoubGF5ZXIuZ2FtZS5tb3VzZS55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSA9IDEwICogKHNwZWxsUG93ZXIgLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREZWdyZWUgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicpICsgMyAqIChzcGVsbFBvd2VyIC0gMSkgPiAzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicpICsgNSAqIChzcGVsbFBvd2VyIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIGRlc3RpbmF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gcGxheWVyLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNldFBhcmFtZXRlcigncG93ZXInLCBidWxsLmdldFBhcmFtZXRlcigncG93ZXInKSArIDUgKiAoc3BlbGxQb3dlciAtIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2xvd0VuZW1pZXMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcGVlZCA9IG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdzcGVlZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3dlciA9IG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdHMgPSBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignZWZmZWN0cycpIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPCBwb3dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlZWQnLCBzcGVlZCAtIHBvd2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlZmZlY3RzLmluZGV4T2YoJ2Zyb3plbicpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdHMucHVzaCgnZnJvemVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpID09ICd0ZWxlcG9ydCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3VzZSAgPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUubW91c2UueCwgb2JqLmxheWVyLmdhbWUubW91c2UueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZS54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2UueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIG1vdXNlLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyID0gcGxheWVyLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkaXJlY3Rpb24uZ2V0RGVzdGluYXRpb24ocGxheWVyLnBvcywgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29sZG93biA9IG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duKSAtICgzMCAqIChzcGVsbFBvd2VyIC0gMSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IHBsYXllci5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZSA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygndGVsZXBvcnRHYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSBkZXN0aW5hdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdCh0ZWxlcG9ydEdhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNldFBvc2l0aW9uKGRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgKGNvb2xkb3duID4gNTApID8gY29vbGRvd24gOiA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ2Zyb3N0U2hhcmQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUubW91c2UuaXNEb3duIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcmVDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJvc3RTaGFyZCA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZnJvc3RTaGFyZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5tb3VzZS54LCBvYmoubGF5ZXIuZ2FtZS5tb3VzZS55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IG1vdXNlUG9zaXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb3N0U2hhcmQucG9zID0gZGVzdGluYXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGVsbFBvd2VyQm9vc3QgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzcGVsbFBvd2VyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXJCb29zdCArPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZzID0gb2JqLmxheWVyLmFkZE9iamVjdChmcm9zdFNoYXJkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBmcy5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykgKyBzcGVsbFBvd2VyQm9vc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kU3ByYXknKTtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmplY3RzW2ldLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy54ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnkgKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9zcGVsbHMuanNcbiAqKi8iLCJ2YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG5mdW5jdGlvbiBjb2xsaWRlcyh4LCB5LCByLCBiLCB4MiwgeTIsIHIyLCBiMikge1xyXG4gICAgcmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuICAgIGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcclxuICAgICAgICB0aGlzLnggPSB4WzBdO1xyXG4gICAgICAgIHRoaXMueSA9IHhbMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuUG9pbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIExpbmUocG9pbnQsIHZlY3Rvcil7XHJcblxyXG4gICAgLyppZiAocG9pbnQueCA9PSB2ZWN0b3IueCkge1xyXG4gICAgICAgIHRoaXMuayA9ICd2ZXJ0JztcclxuICAgICAgICB0aGlzLmIgPSB2ZWN0b3IueDtcclxuICAgICAgICB0aGlzLmRpciA9ICh2ZWN0b3IueSA+PSBwb2ludC55KSA/IDEgOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5rID0gKHZlY3Rvci55IC0gcG9pbnQueSkgLyAodmVjdG9yLnggLSBwb2ludC54KTtcclxuICAgICAgICB0aGlzLmIgPSBwb2ludC55IC0gcG9pbnQueCAqIHRoaXMuaztcclxuICAgICAgICB0aGlzLmRpciA9ICh2ZWN0b3IueCA+PSBwb2ludC54KSA/IDEgOiAtMTtcclxuICAgIH0qL1xyXG4gICAgdmFyIF92ZWN0b3IgPSB2ZWN0b3I7XHJcblxyXG4gICAgaWYgKHZlY3RvciBpbnN0YW5jZW9mIFBvaW50KSB7XHJcbiAgICAgICAgX3ZlY3RvciA9IGdldFZlY3RvckJ5VHdvUG9pbnRzKHBvaW50LCB2ZWN0b3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKF92ZWN0b3IueCAhPSAwICYmIF92ZWN0b3IueSAhPSAwKSB7XHJcbiAgICAgICAgdGhpcy5rID0gKF92ZWN0b3IueCAvIF92ZWN0b3IueSk7XHJcbiAgICAgICAgdGhpcy5iID0gKHBvaW50LnggLSBfdmVjdG9yLnggKiBwb2ludC55IC8gX3ZlY3Rvci55KTtcclxuICAgICAgICB0aGlzLmRpciA9IChfdmVjdG9yLnkgPj0gMCkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2UgaWYgKF92ZWN0b3IueCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5rID0gJ3ZlcnRpY2FsJztcclxuICAgICAgICB0aGlzLmIgPSBfdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy5kaXIgPSAoX3ZlY3Rvci55ID49IDApID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmsgPSAnaG9yaXpvbnRhbCc7XHJcbiAgICAgICAgdGhpcy5iID0gX3ZlY3Rvci55O1xyXG4gICAgICAgIHRoaXMuZGlyID0gKF92ZWN0b3IueCA+PSAwKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHRoaXMudmVjdG9yID0gX3ZlY3Rvci8vZ2V0VmVjdG9yQnlUd29Qb2ludHMocG9pbnQsIHZlY3Rvcik7XHJcbn1cclxuXHJcbkxpbmUucHJvdG90eXBlLmdldERlc3RpbmF0aW9uID0gZnVuY3Rpb24ocG9pbnQsIHNwZWVkKSB7XHJcbiAgICB2YXIgeCwgeTtcclxuXHJcbiAgICBpZiAodGhpcy5rID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB4ID0gcG9pbnQueDtcclxuICAgICAgICB5ID0gcG9pbnQueSArIHRoaXMuZGlyICogc3BlZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuayA9PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICB4ID0gcG9pbnQueCArIHRoaXMuZGlyICogc3BlZWQ7XHJcbiAgICAgICAgeSA9IHBvaW50Lnk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50LnggKyB0aGlzLmRpciAqIHNwZWVkICogdGhpcy5rIC8gKE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgdGhpcy5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5rLCAyKSArIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRWZWN0b3JCeVR3b1BvaW50cyhwb2ludDEsIHBvaW50Mikge1xyXG4gICAgcmV0dXJuIG5ldyBWaWN0b3IocG9pbnQyLnggLSBwb2ludDEueCwgcG9pbnQyLnkgLSBwb2ludDEueSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3MueCArIHNpemVbMF0gLyAyLCBwb3MueSArIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvcy54ICAtIHNpemVbMF0gLyAyLCBwb3MueSAgLSBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3MyLnggICsgc2l6ZTJbMF0gLyAyLCBwb3MyLnkgICsgc2l6ZTJbMV0gLyAyLFxyXG4gICAgICAgIHBvczIueCAgLSBzaXplMlswXSAvIDIsIHBvczIueSAgLSBzaXplMlsxXSAvIDIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJhZGlhbnMoZGVncmVlKSB7XHJcbiAgICByZXR1cm4gZGVncmVlICogTWF0aC5QSSAvIDE4MDtcclxufTtcclxuZnVuY3Rpb24gZ2V0RGVncmVlQmV0d2VlbkRpcmVjdGlvbnMoZGlyMSwgZGlyMil7XHJcbiAgICBpZiAoZGlyMi5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiBnZXREZWdyZWVzKE1hdGguYXRhbigxIC8gZGlyMS5rKmRpcjEuZGlyKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXREZWdyZWVzKE1hdGguYXRhbigoZGlyMi5rICogZGlyMi5kaXIgLSBkaXIxLmsgKiBkaXIxLmRpcikgLyAoMSAtIGRpcjEuayAqIGRpcjEuZGlyICogZGlyMi5rICogZGlyMi5kaXIpKSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVncmVlcyhyYWRpYW5zKSB7XHJcbiAgICByZXR1cm4gMTgwICogcmFkaWFucyAvIE1hdGguUEk7XHJcbn07XHJcbmZ1bmN0aW9uIGdldERlZ3JlZShwb2ludDEsIHBvaW50MiwgcHJldkRlZ3JlZSwgc3BlZWQpIHtcclxuICAgIHZhciBkZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDIueCAtIHBvaW50MS54KSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyLnggLSBwb2ludDEueCwgMikgKyBNYXRoLnBvdyhwb2ludDIueSAtIHBvaW50MS55LCAyKSkpO1xyXG4gICAgKHBvaW50MS55ID4gcG9pbnQyLnkpICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50Mi54IC0gcG9pbnQxLngpKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDIueCAtIHBvaW50MS54LCAyKSArIE1hdGgucG93KHBvaW50Mi55IC0gcG9pbnQxLnksIDIpKSk7XHJcblxyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDEueSA+IHBvaW50Mi55KSAmJiAobmV3RGVncmVlID0gMzYwIC0gbmV3RGVncmVlKTtcclxuICAgIG5ld0RlZ3JlZSArPSBkZWdyZWU7XHJcbiAgICAobmV3RGVncmVlIDwgMCkgJiYgKG5ld0RlZ3JlZSArPSAzNjApO1xyXG4gICAgKG5ld0RlZ3JlZSA+IDM2MCkgJiYgKG5ld0RlZ3JlZSAtPSAzNjApO1xyXG5cclxuICAgIHZhciBkaXIgPSAoKG5ld0RlZ3JlZSA+IDAgJiYgbmV3RGVncmVlIDw9IDkwKSB8fCAobmV3RGVncmVlID4gMjcwICYmIG5ld0RlZ3JlZSA8PSAzNjApKSA/IDEgOiAtMTtcclxuXHJcbiAgICB2YXIgZGlyZWN0aW9uID0ge1xyXG4gICAgICAgIGRpcjogZGlyLFxyXG4gICAgICAgIGs6IE1hdGgudGFuKG5ld0RlZ3JlZSAqIE1hdGguUEkgLyAxODApXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBnZXREZXN0aW5hdGlvbihwb2ludDEsIGRpcmVjdGlvbiwgTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50Mi54IC0gcG9pbnQxLngsIDIpICsgTWF0aC5wb3cocG9pbnQyLnkgLSBwb2ludDEueSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHZhciBrLCBiLCBkaXI7XHJcblxyXG4gICAgaWYgKHBvaW50MVswXSA9PSBwb2ludDJbMF0pIHtcclxuICAgICAgICBrID0gJ3ZlcnQnO1xyXG4gICAgICAgIGIgPSBwb2ludDJbMF07XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldERpc3RhbmNlKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MS54IC0gcG9pbnQyLngsMikgKyBNYXRoLnBvdyhwb2ludDEueSAtIHBvaW50Mi55LDIpKVxyXG59XHJcbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBvaW50LCBsaW5lLCBzcGVlZCkge1xyXG4gICAgdmFyIHgsIHk7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHggPSBwb2ludC54O1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50LnggKyBsaW5lLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludC55ICsgbGluZS5kaXIgKiBzcGVlZCAqIGxpbmUuayAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0U3BlZWQoc3RhcnQsIGRlc3RpbmF0aW9uLCBsaW5lKSB7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiAoIGRlc3RpbmF0aW9uLnkgLSBzdGFydC55ICkgLyBsaW5lLmRpcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICggZGVzdGluYXRpb24ueSAtIHN0YXJ0LnkgKSAqIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKSAvKGxpbmUuZGlyICogbGluZS5rKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlbGxpcHNlKGNvbnRleHQsIGN4LCBjeSwgcngsIHJ5LCByb3QsIGFTdGFydCwgYUVuZCl7XHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKGN4LCBjeSk7XHJcbiAgICBjb250ZXh0LnJvdGF0ZShyb3QpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoLXJ4LCAtcnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUocngsIHJ5KTtcclxuICAgIGNvbnRleHQuYXJjKDEsIDEsIDEsIGFTdGFydCwgYUVuZCwgZmFsc2UpO1xyXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbn1cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF4KSB7XHJcbiAgICAgICAgICAgIHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHkgLSAxIDogeSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcclxufVxyXG5mdW5jdGlvbiBnZXRQb2ludE9mSW50ZXJjZXB0aW9uKGRpcmVjdGlvbjEsIGRpcmVjdGlvbjIpIHtcclxuICAgIHZhciB4LCB5O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24yLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IGRpcmVjdGlvbjIuYjtcclxuICAgICAgICB5ID0gZGlyZWN0aW9uMS5rICogZGlyZWN0aW9uMS5kaXIgKiB4ICsgZGlyZWN0aW9uMS5iO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gKGRpcmVjdGlvbjIuYiAtIGRpcmVjdGlvbjEuYikgLyAoZGlyZWN0aW9uMS5kaXIgKiBkaXJlY3Rpb24xLmsgLSBkaXJlY3Rpb24yLmRpciAqIGRpcmVjdGlvbjIuayk7XHJcbiAgICAgICAgeSA9IGRpcmVjdGlvbjEuayAqIGRpcmVjdGlvbjEuZGlyICogeCArIGRpcmVjdGlvbjEuYjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgKCFvYmopICYmIChvYmogPSB7fSk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgTGluZSA6IExpbmUsXHJcbiAgICBQb2ludCA6IFBvaW50LFxyXG4gICAgZWxsaXBzZTogZWxsaXBzZSxcclxuICAgIGdldFJhZGlhbnM6IGdldFJhZGlhbnMsXHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICBnZXRTcGVlZDogZ2V0U3BlZWQsXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICBnZXREZWdyZWVzOiBnZXREZWdyZWVzLFxyXG4gICAgZ2V0RGlzdGFuY2UgOiBnZXREaXN0YW5jZSxcclxuICAgIGdldFBvaW50T2ZJbnRlcmNlcHRpb24sZ2V0UG9pbnRPZkludGVyY2VwdGlvbixcclxuICAgIGdldERlZ3JlZUJldHdlZW5EaXJlY3Rpb25zOiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyxcclxuICAgIGNsb25lOiBjbG9uZSxcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWVcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFZpY3RvcjtcblxuLyoqXG4gKiAjIFZpY3RvciAtIEEgSmF2YVNjcmlwdCAyRCB2ZWN0b3IgY2xhc3Mgd2l0aCBtZXRob2RzIGZvciBjb21tb24gdmVjdG9yIG9wZXJhdGlvbnNcbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdG9yLiBXaWxsIGFsc28gd29yayB3aXRob3V0IHRoZSBgbmV3YCBrZXl3b3JkXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IFZpY3Rvcig0MiwgMTMzNyk7XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggVmFsdWUgb2YgdGhlIHggYXhpc1xuICogQHBhcmFtIHtOdW1iZXJ9IHkgVmFsdWUgb2YgdGhlIHkgYXhpc1xuICogQHJldHVybiB7VmljdG9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVmljdG9yICh4LCB5KSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBWaWN0b3IpKSB7XG5cdFx0cmV0dXJuIG5ldyBWaWN0b3IoeCwgeSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFggYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy54O1xuXHQgKiAgICAgLy8gPT4gNDJcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueCA9IHggfHwgMDtcblxuXHQvKipcblx0ICogVGhlIFkgYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy55O1xuXHQgKiAgICAgLy8gPT4gMjFcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueSA9IHkgfHwgMDtcbn07XG5cbi8qKlxuICogIyBTdGF0aWNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBhcnJheVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gVmljdG9yLmZyb21BcnJheShbNDIsIDIxXSk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NDIsIHk6MjFcbiAqXG4gKiBAbmFtZSBWaWN0b3IuZnJvbUFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBBcnJheSB3aXRoIHRoZSB4IGFuZCB5IHZhbHVlcyBhdCBpbmRleCAwIGFuZCAxIHJlc3BlY3RpdmVseVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuXHRyZXR1cm4gbmV3IFZpY3RvcihhcnJbMF0gfHwgMCwgYXJyWzFdIHx8IDApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGZyb20gYW4gb2JqZWN0XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbU9iamVjdCh7IHg6IDQyLCB5OiAyMSB9KTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB3aXRoIHRoZSB2YWx1ZXMgZm9yIHggYW5kIHlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gVGhlIG5ldyBpbnN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKG9iai54IHx8IDAsIG9iai55IHx8IDApO1xufTtcblxuLyoqXG4gKiAjIE1hbmlwdWxhdGlvblxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhcmUgY2hhaW5hYmxlLlxuICovXG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvcidzIFggYXhpcyB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGRYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggKz0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWSBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSArPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjQwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIGJvdGggdmVjdG9yIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKz0gc2NhbGFyO1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDMsIHk6IDJcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMSwgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgWCBheGlzIG9mIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0WCh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo4MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBZIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RZKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0KHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCAtPSB2ZWMueDtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSBib3RoIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXIoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAtPSBzY2FsYXI7XG5cdHRoaXMueSAtPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXJYKDIwKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiA4MCwgeTogMjAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclkoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDEwMCwgeTogMTgwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgeCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSB5IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IGEgYXhpcyB2YWx1ZXMgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAvPSB2ZWN0b3IueDtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHRcdHRoaXMueSAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueCA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHRpZiAoc2NhbGFyICE9PSAwKSB7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRYKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5OjUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRYID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBZIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRZKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6LTUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRZID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnkgKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6LTEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5pbnZlcnRYKCk7XG5cdHRoaXMuaW52ZXJ0WSgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IFggY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMiwgMCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVggPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAqPSB2ZWN0b3IueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSBZIGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlYKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55ICo9IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyBib3RoIHZlY3RvciBheGlzIGJ5IHZhbHVlcyBmcm9tIGEgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5KHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICo9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTm9ybWFsaXplXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdGlmIChsZW5ndGggPT09IDApIHtcblx0XHR0aGlzLnggPSAxO1xuXHRcdHRoaXMueSA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5kaXZpZGUoVmljdG9yKGxlbmd0aCwgbGVuZ3RoKSk7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm5vcm0gPSBWaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZTtcblxuLyoqXG4gKiBJZiB0aGUgYWJzb2x1dGUgdmVjdG9yIGF4aXMgaXMgZ3JlYXRlciB0aGFuIGBtYXhgLCBtdWx0aXBsaWVzIHRoZSBheGlzIGJ5IGBmYWN0b3JgXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGltaXQoODAsIDAuOSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo5MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggVGhlIG1heGltdW0gdmFsdWUgZm9yIGJvdGggeCBhbmQgeSBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0gZmFjdG9yIEZhY3RvciBieSB3aGljaCB0aGUgYXhpcyBhcmUgdG8gYmUgbXVsdGlwbGllZCB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxpbWl0ID0gZnVuY3Rpb24gKG1heCwgZmFjdG9yKSB7XG5cdGlmIChNYXRoLmFicyh0aGlzLngpID4gbWF4KXsgdGhpcy54ICo9IGZhY3RvcjsgfVxuXHRpZiAoTWF0aC5hYnModGhpcy55KSA+IG1heCl7IHRoaXMueSAqPSBmYWN0b3I7IH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgYm90aCB2ZWN0b3IgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemUobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjY3LCB5OjczXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemUgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVgobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjU1LCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemVYID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdHZhciBtaW4gPSBNYXRoLm1pbih0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgodG9wTGVmdC54LCBib3R0b21SaWdodC54KTtcblx0dGhpcy54ID0gcmFuZG9tKG1pbiwgbWF4KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgdGhlIHkgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemVZKG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODBgKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NjZcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVkgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LnksIGJvdHRvbVJpZ2h0LnkpO1xuXHR0aGlzLnkgPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9tbHkgcmFuZG9taXplcyBlaXRoZXIgYXhpcyBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZUFueShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NzdcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZUFueSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHRpZiAoISEgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSkge1xuXHRcdHRoaXMucmFuZG9taXplWCh0b3BMZWZ0LCBib3R0b21SaWdodCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUm91bmRzIGJvdGggYXhpcyB0byBhbiBpbnRlZ2VyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMC4yLCA1MC45KTtcbiAqXG4gKiAgICAgdmVjLnVuZmxvYXQoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo1MVxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudW5mbG9hdCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xuXHR0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGEgY2VydGFpbiBwcmVjaXNpb25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFByZWNpc2lvbiAoZGVmYXVsdDogOClcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9GaXhlZCA9IGZ1bmN0aW9uIChwcmVjaXNpb24pIHtcblx0aWYgKHR5cGVvZiBwcmVjaXNpb24gPT09ICd1bmRlZmluZWQnKSB7IHByZWNpc2lvbiA9IDg7IH1cblx0dGhpcy54ID0gdGhpcy54LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0dGhpcy55ID0gdGhpcy55LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWCBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WCA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnggPSAoMSAtIGFtb3VudCkgKiB0aGlzLnggKyBhbW91bnQgKiB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWSBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFkodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WSA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnkgPSAoMSAtIGFtb3VudCkgKiB0aGlzLnkgKyBhbW91bnQgKiB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiB0b3dhcmRzIGFub3RoZXIgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjMS5taXgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4ID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdHRoaXMubWl4WCh2ZWMsIGFtb3VudCk7XG5cdHRoaXMubWl4WSh2ZWMsIGFtb3VudCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAjIFByb2R1Y3RzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNsb25lKCk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBBIGNsb25lIG9mIHRoZSB2ZWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKHRoaXMueCwgdGhpcy55KTtcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBjb21wb25lbnQgaW4gdG8gaXRzIG93blxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDIwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY29weVgodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ID0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBZIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WSh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFggYW5kIFkgY29tcG9uZW50cyBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5KHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy5jb3B5WCh2ZWMpO1xuXHR0aGlzLmNvcHlZKHZlYyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2ZWN0b3IgdG8gemVybyAoMCwwKVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqXHRcdCB2YXIxLnplcm8oKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDowLCB5OjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnplcm8gPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCA9IHRoaXMueSA9IDA7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRvdCh2ZWMyKTtcbiAqICAgICAvLyA9PiAyMzAwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRG90IHByb2R1Y3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCAqIHZlYzIueCArIHRoaXMueSAqIHZlYzIueTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUuY3Jvc3MgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gKHRoaXMueCAqIHZlYzIueSApIC0gKHRoaXMueSAqIHZlYzIueCApO1xufTtcblxuLyoqXG4gKiBQcm9qZWN0cyBhIHZlY3RvciBvbnRvIGFub3RoZXIgdmVjdG9yLCBzZXR0aW5nIGl0c2VsZiB0byB0aGUgcmVzdWx0LlxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKlxuICogICAgIHZlYy5wcm9qZWN0T250byh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIHByb2plY3QgdGhpcyB2ZWN0b3Igb250b1xuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5wcm9qZWN0T250byA9IGZ1bmN0aW9uICh2ZWMyKSB7XG4gICAgdmFyIGNvZWZmID0gKCAodGhpcy54ICogdmVjMi54KSsodGhpcy55ICogdmVjMi55KSApIC8gKCh2ZWMyLngqdmVjMi54KSsodmVjMi55KnZlYzIueSkpO1xuICAgIHRoaXMueCA9IGNvZWZmICogdmVjMi54O1xuICAgIHRoaXMueSA9IGNvZWZmICogdmVjMi55O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLmhvcml6b250YWxBbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUudmVydGljYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy54LCB0aGlzLnkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlRGVnID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gcmFkaWFuMmRlZ3JlZXModGhpcy52ZXJ0aWNhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5hbmdsZSA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuVmljdG9yLnByb3RvdHlwZS5hbmdsZURlZyA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlRGVnO1xuVmljdG9yLnByb3RvdHlwZS5kaXJlY3Rpb24gPSBWaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYW5nbGUpIHtcblx0dmFyIG54ID0gKHRoaXMueCAqIE1hdGguY29zKGFuZ2xlKSkgLSAodGhpcy55ICogTWF0aC5zaW4oYW5nbGUpKTtcblx0dmFyIG55ID0gKHRoaXMueCAqIE1hdGguc2luKGFuZ2xlKSkgKyAodGhpcy55ICogTWF0aC5jb3MoYW5nbGUpKTtcblxuXHR0aGlzLnggPSBueDtcblx0dGhpcy55ID0gbnk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZURlZyA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHRhbmdsZSA9IGRlZ3JlZXMycmFkaWFuKGFuZ2xlKTtcblx0cmV0dXJuIHRoaXMucm90YXRlKGFuZ2xlKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG8gPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUocm90YXRpb24tdGhpcy5hbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG9EZWcgPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlVG8ocm90YXRpb24pO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeSA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHR2YXIgYW5nbGUgPSB0aGlzLmFuZ2xlKCkgKyByb3RhdGlvbjtcblxuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeURlZyA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlQnkocm90YXRpb24pO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBvZiB0aGUgWCBheGlzIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gLTEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy54IC0gdmVjLng7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWCgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuYWJzRGlzdGFuY2VYKHZlYzIpO1xuICogICAgIC8vID0+IDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVgodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBZIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0cmV0dXJuIHRoaXMueSAtIHZlYy55O1xufTtcblxuLyoqXG4gKiBTYW1lIGFzIGBkaXN0YW5jZVkoKWAgYnV0IGFsd2F5cyByZXR1cm5zIGFuIGFic29sdXRlIG51bWJlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVkodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2UodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwLjQ5ODc1NjIxMTIwODlcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlU3EodmVjMik7XG4gKiAgICAgLy8gPT4gMTAxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlU3EgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHZhciBkeCA9IHRoaXMuZGlzdGFuY2VYKHZlYyksXG5cdFx0ZHkgPSB0aGlzLmRpc3RhbmNlWSh2ZWMpO1xuXG5cdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9yIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoKCk7XG4gKiAgICAgLy8gPT4gMTExLjgwMzM5ODg3NDk4OTQ4XG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EoKSk7XG59O1xuXG4vKipcbiAqIFNxdWFyZWQgbGVuZ3RoIC8gbWFnbml0dWRlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoU3EoKTtcbiAqICAgICAvLyA9PiAxMjUwMFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoIC8gTWFnbml0dWRlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxlbmd0aFNxID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBWaWN0b3IucHJvdG90eXBlLmxlbmd0aDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJ1ZSBpZiB2ZWN0b3IgaXMgKDAsIDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYy56ZXJvKCk7XG4gKlxuICogICAgIC8vID0+IHRydWVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gMCAmJiB0aGlzLnkgPT09IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHRoaXMgdmVjdG9yIGlzIHRoZSBzYW1lIGFzIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2ZWMxLmlzRXF1YWxUbyh2ZWMyKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzRXF1YWxUbyA9IGZ1bmN0aW9uKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gdmVjMi54ICYmIHRoaXMueSA9PT0gdmVjMi55O1xufTtcblxuLyoqXG4gKiAjIFV0aWxpdHkgTWV0aG9kc1xuICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjIwXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuICd4OicgKyB0aGlzLnggKyAnLCB5OicgKyB0aGlzLnk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9BcnJheSgpO1xuICogICAgIC8vID0+IFsxMCwgMjBdXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBbIHRoaXMueCwgdGhpcy55IF07XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAsIDIwKTtcbiAqXG4gKiAgICAgdmVjLnRvT2JqZWN0KCk7XG4gKiAgICAgLy8gPT4geyB4OiAxMCwgeTogMjAgfVxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH07XG59O1xuXG5cbnZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZnVuY3Rpb24gcmFuZG9tIChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5mdW5jdGlvbiByYWRpYW4yZGVncmVlcyAocmFkKSB7XG5cdHJldHVybiByYWQgKiBkZWdyZWVzO1xufVxuXG5mdW5jdGlvbiBkZWdyZWVzMnJhZGlhbiAoZGVnKSB7XG5cdHJldHVybiBkZWcgLyBkZWdyZWVzO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3ZpY3Rvci9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMiAzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXJEZWF0aDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95T25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDwgb2JqZWN0c1tpXS5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykgPD0gb2JqZWN0c1tpXS5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lbGVlQXR0YWNrIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kU3ByYXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqZWN0c1tpXS5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnggKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnkgKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2V4cGxvZGVkJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZXhwbG9kZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uQ29uZGl0aW9uIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVFeHBsb3Npb25zKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGw7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54IC0gb2JqLnNpemVbMF0sIHBvcy55IC0gb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCArIG9iai5zaXplWzBdLCBwb3MueSAtIG9iai5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggLSBvYmouc2l6ZVswXSwgcG9zLnkgKyBvYmouc2l6ZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54ICsgb2JqLnNpemVbMF0sIHBvcy55ICsgb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCAtIDMgLyAyICogb2JqLnNpemVbMF0sIHBvcy55XSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggKyAzIC8gMiAqIG9iai5zaXplWzBdLCBwb3MueV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlRXhwbG9zaW9ucygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRXhwbG9zaW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldFNwZWVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignc3BlZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0RWZmZWN0cyA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2VmZmVjdHMnKS5zcGxpY2UoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVUb0RpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGlyZWN0aW9uLmdldERlc3RpbmF0aW9uKG9iai5wb3MsIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXllckxldmVsVXA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbEV4cCA9IG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXTtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpID4gb2JqLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW29iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZXhwJywgb2JqLmdldFBhcmFtZXRlcignZXhwJykgLSBsZXZlbEV4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCBvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlbGxQb3dlcicsIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCAnTUFYJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQrKztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnNldFBhcmFtZXRlcignZXhwJywgcGxheWVyLmdldFBhcmFtZXRlcignZXhwJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdleHAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRSYW5nZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRNZWxlZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbWVsZWVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nKTtcclxuICAgICAgICAgICAgbWVsZWVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJywgbWVsZWVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zc0xvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBwbGF5ZXIucG9zKVswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyTG9naWMgOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5nZXREaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKSA8IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVSYW5nZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21idWxsZXQyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb25Ub1BsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9idWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHBsYXllci5wb3MpWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGlyZWN0aW9uVG9QbGF5ZXIuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyQnVsbGV0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpO1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXhwbG9zaW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGw7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCwgcG9zLnldKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24ubGVmdCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2NSk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi51cCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Nyk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi5kb3duID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDgzKTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLnJpZ2h0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDY4KTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggLSAxICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24uZG93bikge1xyXG4gICAgICAgICAgICAgICAgcG9zLnkgPSBvYmoucG9zLnkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gb2JqLnBvcy55IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueCA9PSBwb3MueCAmJiBvYmoucG9zLnkgPT0gcG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcG9zKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBvcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFNwZWxsV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDQ5KSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICdmaXJlYmFsbCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big1MCkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAnZnJvc3RTaGFyZCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big1MSkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAndGVsZXBvcnQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvblBvd2VyVXAgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpICsgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2V4cCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdleHAnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN1bW1vbk9uQ29vbGRvd24gOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zczInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJCb3NzMicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb3NzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyQm9zcycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb29tZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJCb29tZXInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbW9uc3RlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtb25zdGVyID0gb2JqLmxheWVyLmFkZE9iamVjdChtb25zdGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnNldFBhcmFtZXRlcignaGVhbHRoJywgbW9uc3Rlci5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpICogMC43NSAqIHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG52YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcmFuZG9tX3RyZWVzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21Qb2ludEluQXJlYSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLnNpemVbMF0pLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouc2l6ZVsxXSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy50cmVlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd0cmVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMuc3RvbmVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3N0b25lcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKnZhciBzdG9uZSA9ICovdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy9zdG9uZS5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgdHJlZXM6IDQwLFxyXG4gICAgICAgICAgICBzdG9uZXM6IDQwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX21vbnN0ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCAxMDAwMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoIXRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duKSAmJiAodGhpcy5jb250ZXh0LmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXInKS5sZW5ndGggPCB0aGlzLnBhcmFtZXRlcnMubWF4T25NYXApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTU0LCA5MTgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9uc3RlckNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnc3VtbW9uR2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChtb25zdGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gJiYgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFsxMTU0ICwgOTE4XV0sXHJcbiAgICAgICAgICAgIG1heE9uTWFwOiAyMDAsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb29sZG93bjogMTAsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJTcGF3bmVkOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX2hlYXJ0OiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ2hlYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExNTQsIDkxOCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFsxMTU0LCA5MThdXSxcclxuICAgICAgICAgICAgY29vbGRvd246IDQwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9wb3dlcnVwOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3Bvd2VydXAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTAwLCA4NTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1sxMDAsIDEwMF0sIFsxMTAwLCA4NTBdXSxcclxuICAgICAgICAgICAgY3VycmVudENvb2xkb3duIDogMTEwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDExMDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fdGVycmFpbjoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgZ2F0ZUNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnZ2F0ZScpLFxyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd3YWxsJyk7XHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnLnBvcyA9IFt3YWxsQ29uZmlnLnNpemVbMF0gKiBpICsgd2FsbENvbmZpZy5zaXplWzBdIC8gMiwgd2FsbENvbmZpZy5zaXplWzFdLzJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhbGwgPSB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KHdhbGxDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy9zdG9uZS5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnYXRlQ29uZmlnLnBvcyA9IFt3YWxsQ29uZmlnLnBvcy54ICsgd2FsbENvbmZpZy5zaXplWzBdLyAyICsgZ2F0ZUNvbmZpZy5zaXplWzBdLzIsIChnYXRlQ29uZmlnLnNpemVbMV0gLSAzKS8yIF07XHJcbiAgICAgICAgICAgIHZhciBnYXRlID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChnYXRlQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ29XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCxvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIHB4ID0gKHBsYXllci5wb3MueCArIG9iai50cmFuc2xhdGUueCkgLyAxMDI0ICogMTAwLFxyXG4gICAgICAgICAgICAgICAgcHkgPSAocGxheWVyLnBvcy55ICsgb2JqLnRyYW5zbGF0ZS55KSAvIDc2OCAqIDEwMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChweCA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueCArPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHB4ID4gNzApIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnggPiAtIDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueCAtPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChweSA8IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS55IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueSArPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHB5ID4gNzUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnkgPiAtIDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueSAtPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9sYXllcnMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRpbWVyIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcisrKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGVhbHRoIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoOiBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0ucGFyYW1ldGVycy5oZWFsdGhcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZXZlbCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbDogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSxcclxuICAgICAgICAgICAgICAgIGV4cDogcGxheWVyLmdldFBhcmFtZXRlcignZXhwJyksXHJcbiAgICAgICAgICAgICAgICBsZXZlbEV4cCA6IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLmJlc3RUaW1lKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVzdFNjb3JlIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2NvcmU6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFNjb3JlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91aS5qc1xuICoqLyIsInZhciBuYXJncyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHJpbmcpIHtcbiAgICB2YXIgYXJnc1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIH1cblxuICAgIGlmICghYXJncyB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSkge1xuICAgICAgICBhcmdzID0ge31cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobmFyZ3MsIGZ1bmN0aW9uIHJlcGxhY2VBcmcobWF0Y2gsIGksIGluZGV4KSB7XG4gICAgICAgIHZhciByZXN1bHRcblxuICAgICAgICBpZiAoc3RyaW5nW2luZGV4IC0gMV0gPT09IFwie1wiICYmXG4gICAgICAgICAgICBzdHJpbmdbaW5kZXggKyBtYXRjaC5sZW5ndGhdID09PSBcIn1cIikge1xuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyZ3MuaGFzT3duUHJvcGVydHkoaSkgPyBhcmdzW2ldIDogbnVsbFxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGJpbmRQb3NpdGlvblRvTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnggLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDwgb2JqLmxheWVyLnBvcy54KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnggPSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3MueCArIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPiBvYmoubGF5ZXIucG9zLnggKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy54ICA9IG9iai5sYXllci5wb3MueCAgKyBvYmoubGF5ZXIuc2l6ZVswXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvcy55IC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy55ID0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zLnkgKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyID4gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueSA9IG9iai5sYXllci5wb3MueSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnkgPCAtMTAwIHx8IG9iai5wb3MueSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAtIDEwMD4gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0gfHwgb2JqLnBvcy54IC0gb2JqLnNwcml0ZS5zaXplWzBdIC0gMTAwPiBvYmoubGF5ZXIucG9zLnggKyBvYmoubGF5ZXIuc2l6ZVswXSB8fCBvYmoucG9zLnggPCAtMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllckFkdmFuY2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJEaXJlY3Rpb24gPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvbGREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyRGlyZWN0aW9uLmRpciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXIucG9zKSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5hYnMoTWF0aC5taW4ocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSwgdXRpbHMuZ2V0RGlzdGFuY2Uob2JqLnBvcywgcGxheWVyLnBvcykpIC0gMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllck5leHRQbGFjZSA9IHBsYXllckRpcmVjdGlvbi5nZXREZXN0aW5hdGlvbihwbGF5ZXIucG9zLCBzcGVlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2UgPSBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXJOZXh0UGxhY2UpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlVmVjdG9yID0gZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2UudmVjdG9yLmNsb25lKCkubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkRGlyZWN0aW9uVmVjdG9yID0gb2xkRGlyZWN0aW9uLnZlY3Rvci5jbG9uZSgpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpcmVjdGlvblZlY3RvciA9IGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlVmVjdG9yLmFkZChvbGREaXJlY3Rpb25WZWN0b3IpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIG5ld0RpcmVjdGlvblZlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YW5kZXJlckFJIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExMDAsIDg1MCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZSh0aGlzLmNvbnRleHQucG9zLCBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHV0aWxzLmdldERpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ3NjZW50UmFuZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc2NlbnQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3NjZW50U3BlZWQnKSk7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicsIDApO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignc3BlZWQnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJywgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpIC0gMTAwKSArIDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouZ2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpICYmIG9iai5zZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGR5bmFtaWNaSW5kZXg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5ld1pJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG9iai5wb3MgJiYgKG5ld1pJbmRleCArPSBvYmoucG9zLnkpO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlICYmIChuZXdaSW5kZXggKz0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMik7XHJcblxyXG4gICAgICAgICAgICBvYmouekluZGV4ID0gKG9iai5wb3MueSA+IDApID8gTWF0aC5yb3VuZChuZXdaSW5kZXgpIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29sbGlzaW9uczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9ucyA9IG9iai5zZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnLCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb2xsaXNpb25zLmNlbGxzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIG9iai5sYXllci5nYW1lLmNvbGxpc2lvbnMudXBkYXRlT2JqZWN0KG9iaik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUuY29sbGlzaW9ucy51cGRhdGVPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5tb3VzZS54LCBvYmoubGF5ZXIuZ2FtZS5tb3VzZS55KTtcclxuXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25Ub01vdXNlID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5tb3VzZS54LCBvYmoubGF5ZXIuZ2FtZS5tb3VzZS55KTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKG1vdXNlUG9zaXRpb24uY2xvbmUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZU9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgY29vbGRvd24gLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJTcHJpdGVEb25lOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYob2JqLnNwcml0ZS5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZUJ5RGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9ldGMuanNcbiAqKi8iLCJ2YXIgbGlzdCA9IFtcclxuICAgICdpbWcvc3ByaXRlcy5wbmcnLFxyXG4gICAgJ2ltZy9kZW1vbnMucG5nJyxcclxuICAgICdpbWcvZmlyZWJhbGxzcHJpdGUucG5nJyxcclxuICAgICdpbWcvbWFpbmhlcm8ucG5nJyxcclxuICAgICdpbWcvbW9uc3RlcnMyLnBuZycsXHJcbiAgICAnaW1nL3NwZWxsaWNvbnMucG5nJyxcclxuICAgICdpbWcvc3BlbGwucG5nJyxcclxuICAgICdpbWcvZGFya2JsYXN0LnBuZycsXHJcbiAgICAnaW1nL3Bvd2VydXAyLnBuZycsXHJcbiAgICAnaW1nL3N0b25lcy5wbmcnLFxyXG4gICAgJ2ltZy9zYmxvb2QucG5nJyxcclxuICAgICdpbWcvdHJlZS5wbmcnLFxyXG4gICAgJ2ltZy9lZmZlY3RzLnBuZycsXHJcbiAgICAnaW1nL2Zyb3N0ZWZmZWN0LnBuZycsXHJcbiAgICAnaW1nL2hlYXJ0LnBuZycsXHJcbiAgICAnaW1nL3RlcnJhaW4xMS5wbmcnLFxyXG4gICAgJ2ltZy9ibG9vZHMucG5nJyxcclxuICAgICdpbWcvY3Vyc29yLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9yZXNvdXJjZXMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbMTIyNCw5NjhdLFxyXG5cdFx0YmFja2dyb3VuZDogJ3RlcnJhaW4nLFxyXG5cdFx0aW5pdExpc3QgOiBbJ3BsYXllcicsICdjdXJzb3InLCAnY291bnRlcicsICd0aW1lcicsICdiZXN0VGltZScsICdmaXJlYmFsbFNwZWxsJywgJ2Zyb3N0U2hhcmRTcGVsbCcsICd0ZWxlcG9ydFNwZWxsJywgJ2Jlc3RTY29yZScsICdsZXZlbCddLFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyID0gMDtcclxuXHRcdH0sXHJcblx0XHR0cmFuc2xhdGU6IHtcclxuXHRcdFx0eDogLTEwMCxcclxuXHRcdFx0eTogLTEwMFxyXG5cdFx0fSxcclxuXHJcblx0XHRydWxlczogWydzcGF3bl9tb25zdGVyJywgJ3JhbmRvbV90cmVlcycgLCdzcGF3bl9oZWFydCcsJ3NwYXduX3Bvd2VydXAnLCAnZ29XaXRoUGxheWVyJ11cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9sYXllcnMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3p5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7O0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuS0E7QUFDQTtBQW9CQTs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9