var gameConfigs =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getConfig = exports.getRuleConfig = undefined;

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(8);

	var _index4 = _interopRequireDefault(_index3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRuleConfig(id) {
	    return _index4.default[id];
	}

	function getConfig(id) {
	    var config = JSON.parse(JSON.stringify(_index2.default[id]));

	    !config.id && (config.id = id);

	    return config;
	}

	exports.getRuleConfig = getRuleConfig;
	exports.getConfig = getConfig;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(2);

	var _spells2 = _interopRequireDefault(_spells);

	var _logic = __webpack_require__(3);

	var _logic2 = _interopRequireDefault(_logic);

	var _units = __webpack_require__(4);

	var _units2 = _interopRequireDefault(_units);

	var _effects = __webpack_require__(5);

	var _effects2 = _interopRequireDefault(_effects);

	var _terrain = __webpack_require__(6);

	var _terrain2 = _interopRequireDefault(_terrain);

	var _ui = __webpack_require__(7);

	var _ui2 = _interopRequireDefault(_ui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var objects = {};

	Object.assign(objects, _logic2.default);
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
	        zIndex: 5000,
	        sprite: ['spellIcons', [0, 0], [32, 32]],
	        pos: [449, 748],

	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            bulletsFired: 0,
	            cooldown: 20
	        },
	        type: 'spell',
	        rules: ['fireball']
	    },
	    hellfireSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [96, 0], [32, 32]],
	        pos: [491, 748],

	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            bulletsFired: 0,
	            cooldown: 800
	        },
	        type: 'spell',
	        rules: ['hellfire']
	    },
	    frostShardSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [224, 96], [32, 32]],
	        pos: [533, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            shardsFired: 0,
	            cooldown: 500
	        },
	        type: 'spell',
	        rules: ['frostShard']
	    },
	    teleportSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [64, 32], [32, 32]],
	        pos: [575, 748],
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
	            cooldown: 200
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
	            cooldown: 100,
	            speed: 300
	        },
	        conditions: ['bulletMonsterCollision'],
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex', 'explosionOnCooldown']
	    },
	    hellfireTube: {
	        zIndex: 3,
	        collisions: true,
	        render: 'object',
	        sprite: ['hellfire', [0, 0], [21, 58], 14, [0, 1, 2, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4], null, true],
	        size: [50, 50],
	        type: 'spellElement',
	        parameters: {
	            power: 10,
	            cooldown: 25,
	            speed: 300
	        },
	        conditions: ['hellTubeMonsterCollision'],
	        rules: ['dynamicZIndex', 'explosionAfterSpriteDone']
	    },
	    frostShard: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'spellElement',
	        size: [500, 500],
	        parameters: {
	            power: 60,
	            cooldown: 200
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
	    monsterController: {
	        render: false,
	        collisions: false,
	        type: 'monsterController',
	        rules: ['monsterController'],
	        parameters: {
	            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
	            monsterCooldown: 7
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
	    player: {
	        zIndex: 20,
	        sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
	        pos: [662, 534],
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
	                1: 600,
	                2: 1200,
	                3: 2000,
	                4: 3000,
	                5: 4500,
	                6: 6500,
	                7: 9000,
	                8: 13000,
	                9: 20000
	            }
	        },
	        type: 'player',
	        conditions: ['selectSpellWithKeyboard'],
	        rules: ['moveWithKeyboard', 'rotateToMouse', 'bindPositionToLayer', 'playerDeath', 'moveToDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'playerLevelUp']
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
	            exp: 3,
	            chanceOfBoss: 5,
	            chanceOfBoss2: 8,
	            chanceOfBoomer: 20,
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
	            scentRange: 600,
	            exp: 15,
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
	            exp: 30,
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
	            exp: 60,
	            cooldown: 75,
	            power: 10,
	            health: 50,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'monsterBossLogic', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    monsterBoss2: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
	        size: [40, 45],
	        render: 'unit',
	        parameters: {
	            speed: 15,
	            cooldown: 200,
	            exp: 120,
	            fireRange: 300,
	            power: 10,
	            health: 30,
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
	        rules: ['dynamicZIndex'],
	        parameters: {
	            power: 10
	        }
	    },
	    powerup: {
	        zIndex: 2,
	        size: [25, 25],
	        collisions: true,
	        sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
	        conditions: ['triggerOnPlayerCollisionPowerUp'],
	        parameters: {
	            exp: 250
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
	var config = {
	    mbullet: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [32, 32],
	        conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
	        parameters: {
	            power: 8,
	            speed: 100
	        },
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
	    },
	    mbullet2: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [28, 24],
	        conditions: ['monsterBoss2Bullet'],
	        parameters: {
	            power: 15,
	            cooldown: 100,
	            speed: 200
	        },
	        rules: ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'rotateByDirection', 'moveToDirection', 'dynamicZIndex']
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
	    explosion: {
	        render: 'object',
	        size: [39, 39],
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
	    },
	    fog: {
	        render: 'fog',
	        zIndex: 2500,
	        type: 'effect'
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
	    tree1: {
	        sprite: ['tree1', [0, 0], [62, 87]],
	        size: [62, 88],
	        rules: ['dynamicZIndex']
	    },
	    tree2: {
	        sprite: ['tree2', [0, 0], [59, 87]],
	        size: [60, 88],
	        rules: ['dynamicZIndex']
	    },
	    stones: {
	        render: 'object',
	        sprite: ['stone', [0, 0], [25, 22]],
	        size: [15, 22],
	        rules: ['dynamicZIndex']
	    }
	};

	exports.default = config;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    cursor: {
	        zIndex: 3000,
	        render: 'cursor',
	        pos: [400, 350],
	        sprite: ['cursor', [0, 0], [30, 30]],
	        rules: ['bindPositionToMouse']
	    },
	    counter: {
	        zIndex: 3000,
	        pos: [5, 13],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#DAA520",
	            template: "SCORE: {kills}",
	            size: 14
	        },
	        rules: ['countMonsterKilled']
	    },
	    leftOnWaveLabel: {
	        zIndex: 3000,
	        pos: [5, 100],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#DAA520",
	            template: "LEFT ON THIS WAVE: {count}",
	            size: 14
	        }
	    },
	    level: {
	        zIndex: 3000,
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
	        zIndex: 3000,
	        pos: [5, 23],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#DAA520",
	            template: "TIMER: {time}",
	            size: 14
	        },
	        rules: ['timer']
	    },
	    bestTime: {
	        pos: [5, 370],
	        zIndex: 3000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#DAA520",
	            size: 14,
	            template: "BEST TIME: {time}"
	        },
	        rules: ['bestTime']
	    },
	    bestScore: {
	        pos: [5, 380],
	        zIndex: 3000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#DAA520",
	            size: 14,
	            template: "BEST SCORE: {score}"
	        },
	        rules: ['bestScore']
	    }
	};

	exports.default = config;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(9);

	var _spells2 = _interopRequireDefault(_spells);

	var _logic = __webpack_require__(11);

	var _logic2 = _interopRequireDefault(_logic);

	var _units = __webpack_require__(14);

	var _units2 = _interopRequireDefault(_units);

	var _layers = __webpack_require__(15);

	var _layers2 = _interopRequireDefault(_layers);

	var _ui = __webpack_require__(16);

	var _ui2 = _interopRequireDefault(_ui);

	var _etc = __webpack_require__(17);

	var _etc2 = _interopRequireDefault(_etc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rules = {};

	Object.assign(rules, _logic2.default);
	Object.assign(rules, _spells2.default);
	Object.assign(rules, _units2.default);
	Object.assign(rules, _layers2.default);
	Object.assign(rules, _ui2.default);
	Object.assign(rules, _etc2.default);

	exports.default = rules;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    fireball: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'fireball') {
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var createBullet = function createBullet(direction, destination) {

	                            var bulletConfig = gameConfigs.getConfig('bullet');
	                            bulletConfig.pos = player.pos.clone();

	                            var bull = obj.layer.addObject(bulletConfig);
	                            bull.setParameter('direction', direction);
	                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));
	                            bull.sprite.setDegree(player.pos.angle(destination));
	                        };

	                        var destination = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
	                            spellPower = player.getParameter('spellPower'),
	                            startDegree = 10 * (spellPower - 1);

	                        destination.x -= obj.layer.translate.x;
	                        destination.y -= obj.layer.translate.y;

	                        for (var i = 0; i < spellPower; i++) {
	                            var movedPoint = destination.clone().rotate(player.pos.x, player.pos.y, startDegree, true);
	                            //let direction = new utils.Line(player.pos, movedPoint);
	                            createBullet(Phaser.Point.subtract(movedPoint, player.pos), movedPoint.clone());
	                            startDegree -= 20;
	                        }
	                        /* if (obj.getDefaultParameter('cooldown') + 3 * (spellPower - 1) > 30) {
	                             obj.setParameter('cooldown', 30);
	                         } else {
	                             obj.setParameter('cooldown', obj.getDefaultParameter('cooldown') + 5 * (spellPower - 1));
	                         }*/
	                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }

	    },
	    hellfire: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'hellfire') {
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var createTube = function createTube(pos) {

	                            var tubeConfig = gameConfigs.getConfig('hellfireTube');
	                            tubeConfig.pos = pos;

	                            var tube = obj.layer.addObject(tubeConfig);
	                            tube.setParameter('power', tube.getParameter('power') + 5 * (spellPower - 1));
	                        };

	                        var destination = new Phaser.Point(0, 1),
	                            point1 = _utils2.default.moveWithSpeed(player.pos, destination, 100),
	                            spellPower = player.getParameter('spellPower');

	                        for (var i = -10; i < 10; i++) {
	                            var movedPoint = point1.clone().rotate(player.pos.x, player.pos.y, 18 * i, true);
	                            //let direction = new utils.Line(player.pos, movedPoint);
	                            createTube(movedPoint);
	                        }

	                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
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
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var mouse = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	                        mouse.x -= obj.layer.translate.x;
	                        mouse.y -= obj.layer.translate.y;

	                        var direction = Phaser.Point.subtract(mouse, player.pos),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = _utils2.default.moveWithSpeed(player.pos, direction, obj.getParameter('power')),
	                            cooldown = obj.getDefaultParameter('cooldown', cooldown) - 30 * (spellPower - 1),
	                            teleportGate;

	                        teleportGate = gameConfigs.getConfig('teleportGate');
	                        teleportGate.pos = player.pos.clone();

	                        obj.layer.addObject(teleportGate);

	                        teleportGate = gameConfigs.getConfig('teleportGate');
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
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var frostShard = gameConfigs.getConfig('frostShard'),
	                            mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
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

	                    var blood = gameConfigs.getConfig('bloodSpray');
	                    blood.pos = objects[i].pos.clone();
	                    blood.pos.x += 2;
	                    blood.pos.y += -10;
	                    obj.layer.addObject(blood);

	                    obj._removeInNextTick = true;

	                    break;
	                }
	            }
	        }
	    },
	    hellTubeMonsterCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'monster') {
	                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

	                    var blood = gameConfigs.getConfig('bloodSpray');
	                    blood.pos = objects[i].pos.clone();
	                    blood.pos.x += 2;
	                    blood.pos.y += -10;
	                    obj.layer.addObject(blood);

	                    break;
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(12);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(13);

	var config = {
	    monsterController: {
	        init: function init() {
	            var obj = this.context;
	            obj.setParameter('currentWave', 1);
	            obj.setParameter('monsterOnWave', this.parameters.monsterCount[obj.getParameter('currentWave') - 1]);
	            obj.setParameter('monsterKilled', 0);
	            obj.setParameter('monsterSpawned', 0);
	            this.leftOnWave = this.context.layer.addObject(gameConfigs.getConfig('leftOnWaveLabel'));
	        },
	        update: function update(dt, obj) {
	            var obj = this.context;

	            function createSpawn() {
	                var topLeft = new Victor(100 - obj.layer.translate.x, 100 - obj.layer.translate.y);
	                var bottomRight = new Victor(900 - obj.layer.translate.x, 650 - obj.layer.translate.y);
	                var summonGate = gameConfigs.getConfig('summonGate');
	                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();

	                summonGate.pos = new Phaser.Point(coords[0], coords[1]);
	                summonGate.pos.x = Math.min(1100, Math.max(50, summonGate.pos.x));
	                summonGate.pos.y = Math.min(900, Math.max(50, summonGate.pos.y));
	                obj.layer.addObject(summonGate);
	            }

	            if (obj.getParameter('monsterSpawned') < obj.getParameter('monsterOnWave')) {
	                if (!this.parameters.currentMonsterCooldown) {
	                    createSpawn();

	                    obj.setParameter('monsterSpawned', obj.getParameter('monsterSpawned') + 1);
	                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	                } else {
	                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
	                }
	            } else {
	                if (obj.getParameter('monsterKilled') >= obj.getParameter('monsterOnWave')) {
	                    obj.setParameter('currentWave', obj.getParameter('currentWave') + 1);
	                    obj.setParameter('monsterSpawned', 0);
	                    obj.setParameter('monsterOnWave', this.parameters.monsterCount[obj.getParameter('currentWave') - 1]);
	                    obj.setParameter('monsterKilled', 0);
	                }
	            }
	            this.leftOnWave.setParameter('text', (0, _stringTemplate2.default)(this.leftOnWave.getParameter('template'), {
	                count: obj.getParameter('monsterKilled') + '/' + obj.getParameter('monsterOnWave')
	            }));
	        },
	        parameters: {
	            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
	            monsterCooldown: 10
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    playerDeath: {
	        update: function update(dt, obj) {
	            if (obj.getParameter('health') <= 0) {
	                obj.layer.state.showRestartMenu();
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
	                    var explosionConfig = gameConfigs.getConfig('explosion');
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

	                        var blood = gameConfigs.getConfig('bloodSpray');
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

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x - obj.size[0], pos.y - obj.size[1]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x + obj.size[0], pos.y - obj.size[1]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x - obj.size[0], pos.y + obj.size[1]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x + obj.size[0], pos.y + obj.size[1]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x - 3 / 2 * obj.size[0], pos.y);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x + 3 / 2 * obj.size[0], pos.y);
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

	            if (direction) {
	                obj.setPosition(_utils2.default.moveWithSpeed(obj.pos, direction, obj.getParameter('speed') * dt));
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

	                var explosionConfig = gameConfigs.getConfig('explosion');
	                explosionConfig.pos = obj.pos.clone();

	                obj.layer.addObject(explosionConfig);

	                var blood = gameConfigs.getConfig('blood');
	                blood.pos = obj.pos.clone();
	                obj.layer.addObject(blood);

	                if (!obj.layer.state.parameters.monstersKilled) {
	                    obj.layer.state.parameters.monstersKilled = 0;
	                }

	                var monsterController = obj.layer.getObjectsByType('monsterController')[0];
	                monsterController.setParameter('monsterKilled', monsterController.getParameter('monsterKilled') + 1);

	                obj.layer.state.parameters.monstersKilled++;
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
	                var bulletConfig = gameConfigs.getConfig('mbullet'),
	                    direction = Phaser.Point.subtract(player.pos, obj.pos);

	                bulletConfig.pos = obj.pos.clone();
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.setParameter('direction', direction);

	                bull.sprite.setDegree(obj.pos.angle(player.pos));

	                obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	            }
	        }
	    },
	    monsterBoss2Logic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                directionToPlayer = obj.getParameter('direction');

	            if (Phaser.Point.distance(obj.pos, player.pos) < obj.getParameter('fireRange')) {
	                if (!obj.getParameter('fireCooldown')) {
	                    var bulletConfig = gameConfigs.getConfig('mbullet2');
	                    bulletConfig.pos = obj.pos.clone();

	                    var bull = obj.layer.addObject(bulletConfig);

	                    bull.setParameter('direction', directionToPlayer);
	                    //bull.sprite.setDegree(utils.getDegree(obj.pos, player.pos)[0]);

	                    obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                }
	            } else {
	                obj.setPosition(_utils2.default.moveWithSpeed(obj.pos, directionToPlayer, obj.getParameter('speed') * dt));
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

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(pos.x, pos.y);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);
	            }
	        }
	    },
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            var pos = obj.pos.clone();
	            var direction = {};
	            direction.left = obj.layer.game.input.keyboard.isDown(65);
	            direction.up = obj.layer.game.input.keyboard.isDown(87);
	            direction.down = obj.layer.game.input.keyboard.isDown(83);
	            direction.right = obj.layer.game.input.keyboard.isDown(68);
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
	                obj.setParameter('direction', null);
	            } else {
	                obj.setParameter('direction', Phaser.Point.subtract(pos, obj.pos));
	            }
	        }
	    },
	    selectSpellWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.layer.game.input.keyboard.isDown(49) && obj.setParameter('currentSpell', 'fireball');
	            obj.layer.game.input.keyboard.isDown(50) && obj.setParameter('currentSpell', 'hellfire');
	            obj.layer.game.input.keyboard.isDown(51) && obj.setParameter('currentSpell', 'frostShard');
	            obj.layer.game.input.keyboard.isDown(52) && obj.setParameter('currentSpell', 'teleport');
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
	            function getProperMonster() {
	                var random = Math.random() * 100,
	                    config;

	                if (random <= obj.getParameter('chanceOfBoss')) {
	                    config = gameConfigs.getConfig('monsterBoss');
	                } else {
	                    random -= obj.getParameter('chanceOfBoss');
	                }
	                if (!config && random <= obj.getParameter('chanceOfBoss2')) {
	                    config = gameConfigs.getConfig('monsterBoss2');
	                } else {
	                    random -= obj.getParameter('chanceOfBoss2');
	                }
	                if (!config && random <= obj.getParameter('chanceOfBoomer')) {
	                    config = gameConfigs.getConfig('monsterBoomer');
	                } else {
	                    random -= obj.getParameter('monsterBoomer');
	                }

	                if (!config) {
	                    config = gameConfigs.getConfig('monster');
	                }

	                return config;
	            }
	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var monsterConfig = getProperMonster(),
	                    player = obj.layer.getObjectsByType('player')[0];

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(12);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(13);

	var config = {
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea() {
	                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var _config = gameConfigs.getConfig('tree' + (Math.round(Math.random()) + 1));

	                var point = getRandomPointInArea(this.parameters.area);
	                _config.pos = new Phaser.Point(point[0], point[1]);

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = gameConfigs.getConfig('stones');
	                var point = getRandomPointInArea(this.parameters.area);
	                _config2.pos = new Phaser.Point(point[0], point[1]);

	                /*var stone = */this.context.addObject(_config2);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            trees: 100,
	            stones: 100
	        }
	    },
	    spawn_heart: {
	        update: function update(dt, obj) {
	            if (!this.parameters.currentCooldown) {
	                var config = gameConfigs.getConfig('heart');

	                var topLeft = new Victor(50, 50);
	                var bottomRight = new Victor(1154, 918);
	                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();
	                config.pos = new Phaser.Point(coords[0], coords[1]);

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
	                var config = gameConfigs.getConfig('powerup');

	                var topLeft = new Victor(100, 100);
	                var bottomRight = new Victor(1100, 850);
	                var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();
	                config.pos = new Phaser.Point(coords[0], coords[1]);

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
	            var gateConfig = gameConfigs.getConfig('gate'),
	                wallConfig;

	            for (var i = 0; i < 7; i++) {
	                wallConfig = gameConfigs.getConfig('wall');
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
	                if (obj.translate.x > -300) {
	                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
	                }
	            }

	            if (py < 25) {
	                if (obj.translate.y < 0) {
	                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
	                }
	            }
	            if (py > 75) {
	                if (obj.translate.y > -300) {
	                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(12);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    countMonsterKilled: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                kills: obj.layer.state.parameters.monstersKilled || 0
	            }));
	        }
	    },
	    timer: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2)
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
	                time: (obj.layer.state.parameters.bestTime / 60).toFixed(2)
	            }));
	        }
	    },
	    bestScore: {
	        init: function init() {
	            var obj = this.context;
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                score: obj.layer.state.parameters.bestScore
	            }));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(12);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(13);

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

	            obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
	        }
	    },
	    setDirectionToPlayerAdvance: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                playerDirection = player.getParameter('direction'),
	                oldDirection = obj.getParameter('direction');

	            if (!oldDirection) {
	                oldDirection = Phaser.Point.subtract(player.pos, obj.pos);
	            }

	            if (playerDirection == null) {
	                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
	            } else {
	                var speed = Math.abs(Math.min(player.getParameter('speed'), Phaser.Point.distance(obj.pos, player.pos)) - 10);
	                var playerNextPlace = _utils2.default.moveWithSpeed(player.pos, playerDirection, speed);
	                var _dv = Phaser.Point.subtract(playerNextPlace, obj.pos).normalize();
	                var _odv = oldDirection.clone().normalize();
	                var _ndv = Phaser.Point.add(_odv, _dv).normalize();

	                obj.setParameter('direction', _ndv);
	            }
	        }
	    },
	    wandererAI: {
	        init: function init(dt) {
	            var topLeft = new Victor(100, 100);
	            var bottomRight = new Victor(1100, 850);
	            var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();
	            this.context.setParameter('direction', new Phaser.Point(coords[0], coords[1]));
	        },
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                distance = Phaser.Point.distance(obj.pos, player.pos);

	            if (distance <= obj.getParameter('scentRange')) {
	                obj.setParameter('scent', true);
	                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
	                obj.setParameter('wanderCooldown', 0);
	                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
	            } else {
	                obj.setParameter('speed', obj.getDefaultParameter('speed'));
	                if (!obj.getParameter('wanderCooldown')) {
	                    var topLeft = new Victor(100, 100);
	                    var bottomRight = new Victor(1100, 850);
	                    var coords = Victor(10, 20).randomize(topLeft, bottomRight).toArray();

	                    obj.setParameter('direction', Phaser.Point.subtract(new Phaser.Point(coords[0], coords[1]), obj.pos));
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
	            obj.layer.state.collisions.updateObject(obj);
	        },
	        update: function update(dt, obj) {
	            obj.getParameter('collisions').splice(0);
	            obj.layer.state.collisions.updateObject(obj);
	        }
	    },
	    rotateToMouse: {
	        update: function update(dt, obj) {
	            var destination = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	            destination.x -= obj.layer.translate.x;
	            destination.y -= obj.layer.translate.y;

	            var directionToMouse = Phaser.Point.subtract(destination, obj.pos);
	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    bindPositionToMouse: {
	        update: function update(dt, obj) {
	            var mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
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
	    explosionOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
	                var expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', obj.getParameter('power'));
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }
	        }
	    },
	    explosionAfterSpriteDone: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                obj._removeInNextTick = true;

	                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
	                var expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', obj.getParameter('power'));
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

	            obj.sprite.rotateToDirection(Phaser.Point.subtract(player.pos, obj.pos));
	        }
	    }
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUNvbmZpZ3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvY29uZmlncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdWkuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2xvZ2ljLmpzIiwid2VicGFjazovLy8uLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi92aWN0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2V0Yy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMvaW5kZXgnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcy9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBnZXRSdWxlQ29uZmlnKGlkKSB7XHJcbiAgICByZXR1cm4gcnVsZXNbaWRdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbmZpZyhpZCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0c1tpZF0pKTtcclxuXHJcbiAgICAoIWNvbmZpZy5pZCkgJiYgKGNvbmZpZy5pZCA9IGlkKTtcclxuXHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgZ2V0UnVsZUNvbmZpZyxcclxuICAgIGdldENvbmZpZyxcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljJztcclxuaW1wb3J0IHVuaXRzIGZyb20gJy4vdW5pdHMnO1xyXG5pbXBvcnQgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnO1xyXG5pbXBvcnQgdGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XHJcblxyXG52YXIgb2JqZWN0cyA9IHt9O1xyXG5cclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBsb2dpYyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgc3BlbGxzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB1bml0cyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgZWZmZWN0cyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdWkpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHRlcnJhaW4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0cztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvaW5kZXguanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGxTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDUwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbMCwgMF0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNDQ5LCA3NDhdLFxyXG5cclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBidWxsZXRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAyMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2ZpcmViYWxsJ11cclxuICAgIH0sXHJcbiAgICBoZWxsZmlyZVNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogNTAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFs5NiwgMF0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNDkxLCA3NDhdLFxyXG5cclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBidWxsZXRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA4MDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnaGVsbGZpcmUnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDUwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbMjI0LCA5Nl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTMzLCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNoYXJkc0ZpcmVkOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNTAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Zyb3N0U2hhcmQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0U3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiA1MDAwLFxyXG4gICAgICAgIHNwcml0ZTogWydzcGVsbEljb25zJywgWzY0LCAzMl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTc1LCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMjAwLFxyXG4gICAgICAgICAgICB0ZWxlcG9ydEdhdGVzIDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDIwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3RlbGVwb3J0J11cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydEdhdGU6IHtcclxuICAgICAgICB6SW5kZXggOiAwLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2FyY2FuZUdhdGUnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd246IDIwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJ1bGVzIDogWydyZW1vdmVPbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuXHJcbiAgICBidWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ZpcmViYWxsJyxbIDAsIDBdLCBbMzMsIDMzXSwgMTYsIFswLCAxLCAyLCAzXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMjVdLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMzAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ2J1bGxldE1vbnN0ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JyAsICdleHBsb3Npb25PbkNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBoZWxsZmlyZVR1YmUgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2hlbGxmaXJlJyxbIDAsIDBdLCBbMjEsIDU4XSwgMTQsIFswLCAxLCAyLCAzLCA0LCA0LCAzLCAzLCA0LCA0LCAzLCAzLCA0LCA0XSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgc2l6ZSA6IFs1MCwgNTBdLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjUsXHJcbiAgICAgICAgICAgIHNwZWVkOiAzMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnaGVsbFR1YmVNb25zdGVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2R5bmFtaWNaSW5kZXgnICwgJ2V4cGxvc2lvbkFmdGVyU3ByaXRlRG9uZSddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZWZmZWN0cycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzUwMCwgNTAwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDYwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtb25zdGVyQ29udHJvbGxlciA6IHtcclxuICAgICAgICByZW5kZXIgOiBmYWxzZSxcclxuICAgICAgICBjb2xsaXNpb25zOiBmYWxzZSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXJDb250cm9sbGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW9uc3RlckNvbnRyb2xsZXInXSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb3VudDogWzEwLCAyNSwgNTAsIDc1LCAxMDAsIDE1MCwgMjAwLCA1MDAsIDEwMDAsIDI1MDAsIDUwMDAsIDEwMDAwXSxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiA3XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9sb2dpYy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2hlcm8nLCBbMCwgMF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHBvcyA6IFs2NjIsIDUzNF0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA1MCxcclxuICAgICAgICAgICAgc3BlbGxQb3dlcjogMSxcclxuICAgICAgICAgICAgbGV2ZWwgOiAxLFxyXG4gICAgICAgICAgICBleHA6IDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgY3VycmVudFNwZWxsOiAnZmlyZWJhbGwnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gOiB7fSxcclxuICAgICAgICAgICAgbGV2ZWxUYWJsZToge1xyXG4gICAgICAgICAgICAgICAgMSA6IDYwMCxcclxuICAgICAgICAgICAgICAgIDIgOiAxMjAwLFxyXG4gICAgICAgICAgICAgICAgMyA6IDIwMDAsXHJcbiAgICAgICAgICAgICAgICA0IDogMzAwMCxcclxuICAgICAgICAgICAgICAgIDUgOiA0NTAwLFxyXG4gICAgICAgICAgICAgICAgNiA6IDY1MDAsXHJcbiAgICAgICAgICAgICAgICA3IDogOTAwMCxcclxuICAgICAgICAgICAgICAgIDggOiAxMzAwMCxcclxuICAgICAgICAgICAgICAgIDkgOiAyMDAwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3BsYXllcicsXHJcbiAgICAgICAgY29uZGl0aW9uczogWydzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCddLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlV2l0aEtleWJvYXJkJywgJ3JvdGF0ZVRvTW91c2UnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdtb3ZlVG9EaXJlY3Rpb24nLCdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3BsYXllckxldmVsVXAnXVxyXG4gICAgfSxcclxuICAgIHN1bW1vbkdhdGU6IHtcclxuICAgICAgICB6SW5kZXggOiAwLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2FyY2FuZUdhdGUnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzI1LCAzMF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93bjogODAsXHJcbiAgICAgICAgICAgIGV4cDogMyxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzIDogNSxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzMiA6IDgsXHJcbiAgICAgICAgICAgIGNoYW5jZU9mQm9vbWVyIDogMjAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc3VtbW9uT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2RlbW9ucycsIFswLCAxMjhdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzIwLDI4XSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDI1LFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDcwICxcclxuICAgICAgICAgICAgc2NlbnRTcGVlZDogMTIwLFxyXG4gICAgICAgICAgICBzY2VudFJhbmdlOiA2MDAsXHJcbiAgICAgICAgICAgIGV4cDogMTUsXHJcbiAgICAgICAgICAgIHdhbmRlckNvb2xkb3duOiA1MDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgaGVhbHRoIDogMjAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVUb0RpcmVjdGlvbicsICd3YW5kZXJlckFJJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21lbGVlQXR0YWNrJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0TWVsZWVDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvb21lciA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIHNwcml0ZTogWydkZW1vbnMnLCBbOTYsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTAwLFxyXG4gICAgICAgICAgICBleHAgOiAzMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAxMCxcclxuICAgICAgICAgICAgcG93ZXIgOiAxMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycsICdtb25zdGVyRXhwbG9zaW9uQ29uZGl0aW9uJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVRvRGlyZWN0aW9uJywgJ3JvdGF0ZUJ5UGxheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyQWR2YW5jZScsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zcyA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2JpZ01vbnN0ZXJzJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogNTAsXHJcbiAgICAgICAgICAgIGV4cCA6IDYwLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDc1LFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA1MCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJyAsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW9uc3RlckJvc3NMb2dpYycsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCcsICdyZXNldFNwZWVkJywgJ3Jlc2V0RWZmZWN0cycsICdyZXNldFJhbmdlQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzMiA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2Jvc3MnLCBbMCwgMF0sIFs5NiwgNDhdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbNDAsIDQ1XSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxNSxcclxuICAgICAgICAgICAgY29vbGRvd24gOiAyMDAgLFxyXG4gICAgICAgICAgICBleHA6IDEyMCxcclxuICAgICAgICAgICAgZmlyZVJhbmdlIDogMzAwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAzMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJyAsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW9uc3RlckJvc3MyTG9naWMnLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCcsICdyZXNldFNwZWVkJywgJ3Jlc2V0RWZmZWN0cycsICdyZXNldFJhbmdlQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIGhlYXJ0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNpemU6IFsyNSwgMjVdLFxyXG4gICAgICAgIHNwcml0ZSA6IFsncHVtcGtpbicsIFswLCAwXSwgWzMyLCAzMl0sIDUsIFswLDFdXSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3RyaWdnZXJPblBsYXllckNvbGxpc2lvbiddLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2R5bmFtaWNaSW5kZXgnXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvd2VydXAgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzaXplOiBbMjUsIDI1XSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsncG93ZXJVcCcsIFswLCAwXSwgWzcyLCA2NV0sIDE1LCBbMCwgMSwgMiwgMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGV4cDogMjUwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZGFya2JsYXN0JywgWzAsIDBdLCBbMzgsIDM4XSwgMTIsIFswLCAxLCAyICwzXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDgsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1idWxsZXQyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zc1NwZWxsJywgWzAsIDBdLCBbMzAsIDI2XSwgMTAsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMjgsIDI0XSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVyQm9zczJCdWxsZXQnXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDE1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBibG9vZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnbW9uc3RlckJsb29kJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd24gOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ3JlbW92ZU9uQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIGJsb29kU3ByYXkgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzcHJpdGUgOiBbJ2Jsb29kRWZmZWN0JywgWzAsIDBdLCBbNjQsIDY0XSwgMTUsIFswLCAxLCAyLCAzLCA0XSwgbnVsbCwgdHJ1ZSwgMC43ODVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFszOSwgMzldLFxyXG4gICAgICAgIHNwcml0ZTogWydleHBsb3Npb25zJywgWzAsIDBdLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbiA6IHtcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVmZmVjdCcsXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckV4cGxvc2lvbiddLFxyXG4gICAgICAgIHNpemUgOiBbMzksIDM5XSxcclxuICAgICAgICBzcHJpdGU6IFsnZXhwbG9zaW9ucycsIFswLCAwXSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZm9nIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ2ZvZycsXHJcbiAgICAgICAgekluZGV4OiAyNTAwLFxyXG4gICAgICAgIHR5cGUgOiAnZWZmZWN0J1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIHRyZWUxIDoge1xyXG4gICAgICAgIHNwcml0ZSA6IFsndHJlZTEnLCBbMCwgMF0sIFs2MiwgODddXSxcclxuICAgICAgICBzaXplIDogWzYyLCA4OF0sXHJcbiAgICAgICAgcnVsZXM6IFsnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgdHJlZTIgOiB7XHJcbiAgICAgICAgc3ByaXRlIDogWyd0cmVlMicsIFswLCAwXSwgWzU5LCA4N11dLFxyXG4gICAgICAgIHNpemUgOiBbNjAsIDg4XSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ3N0b25lJywgWzAsIDBdLCBbMjUsIDIyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsxNSwgMjJdLFxyXG4gICAgICAgIHJ1bGVzIDogWydkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBjdXJzb3IgOiB7XHJcbiAgICAgICAgekluZGV4IDogMzAwMCxcclxuICAgICAgICByZW5kZXI6ICdjdXJzb3InLFxyXG4gICAgICAgIHBvczogWzQwMCwzNTBdLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnY3Vyc29yJywgWzAsIDBdLCBbMzAsIDMwXV0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmluZFBvc2l0aW9uVG9Nb3VzZSddXHJcbiAgICB9LFxyXG4gICAgY291bnRlcjoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0RBQTUyMFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiU0NPUkU6IHtraWxsc31cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydjb3VudE1vbnN0ZXJLaWxsZWQnXVxyXG4gICAgfSxcclxuICAgIGxlZnRPbldhdmVMYWJlbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTAwXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNEQUE1MjBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkxFRlQgT04gVEhJUyBXQVZFOiB7Y291bnR9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZXZlbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbMzUsIDQ1XSxcclxuICAgICAgICByZW5kZXIgOiBcImV4cEJhclwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiTEVWRUw6IHtsZXZlbH1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydsZXZlbCddXHJcbiAgICB9LFxyXG4gICAgdGltZXI6IHtcclxuICAgICAgICB6SW5kZXggOiAzMDAwLFxyXG4gICAgICAgIHBvczogWzUsIDIzXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNEQUE1MjBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIlRJTUVSOiB7dGltZX1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWyd0aW1lciddXHJcbiAgICB9LFxyXG4gICAgYmVzdFRpbWU6IHtcclxuICAgICAgICBwb3M6IFs1LCAzNzBdLFxyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjREFBNTIwXCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNCxcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkJFU1QgVElNRToge3RpbWV9XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Jlc3RUaW1lJ11cclxuICAgIH0sXHJcbiAgICBiZXN0U2NvcmU6IHtcclxuICAgICAgICBwb3M6IFs1LCAzODBdLFxyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjREFBNTIwXCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNCxcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkJFU1QgU0NPUkU6IHtzY29yZX1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmVzdFNjb3JlJ11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdWkuanNcbiAqKi8iLCJpbXBvcnQgc3BlbGxzIGZyb20gJy4vc3BlbGxzJ1xyXG5pbXBvcnQgbG9naWMgZnJvbSAnLi9sb2dpYyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIGxvZ2ljKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgc3BlbGxzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBsYXllcnMpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCB1aSk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIGV0Yyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBmaXJlYmFsbCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnKSA9PSAnZmlyZWJhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9IG5ldyBQaGFzZXIuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSA9IDEwICogKHNwZWxsUG93ZXIgLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRQb2ludCA9IGRlc3RpbmF0aW9uLmNsb25lKCkucm90YXRlKHBsYXllci5wb3MueCwgcGxheWVyLnBvcy55LCBzdGFydERlZ3JlZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShwbGF5ZXIucG9zLCBtb3ZlZFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJ1bGxldChQaGFzZXIuUG9pbnQuc3VidHJhY3QobW92ZWRQb2ludCwgcGxheWVyLnBvcyksIG1vdmVkUG9pbnQuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSAtPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIC8qIGlmIChvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nKSArIDMgKiAoc3BlbGxQb3dlciAtIDEpID4gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgMzApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nKSArIDUgKiAoc3BlbGxQb3dlciAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIGRlc3RpbmF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYnVsbGV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gcGxheWVyLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNldFBhcmFtZXRlcigncG93ZXInLCBidWxsLmdldFBhcmFtZXRlcigncG93ZXInKSArIDUgKiAoc3BlbGxQb3dlciAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZShwbGF5ZXIucG9zLmFuZ2xlKGRlc3RpbmF0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgaGVsbGZpcmUgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ2hlbGxmaXJlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSBuZXcgUGhhc2VyLlBvaW50KDAsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQxID0gdXRpbHMubW92ZVdpdGhTcGVlZChwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbiwgMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gLTEwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkUG9pbnQgPSBwb2ludDEuY2xvbmUoKS5yb3RhdGUocGxheWVyLnBvcy54LCBwbGF5ZXIucG9zLnksIDE4ICogaSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShwbGF5ZXIucG9zLCBtb3ZlZFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVR1YmUobW92ZWRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVUdWJlKHBvcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0dWJlQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdoZWxsZmlyZVR1YmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1YmVDb25maWcucG9zID0gcG9zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0dWJlID0gb2JqLmxheWVyLmFkZE9iamVjdCh0dWJlQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1YmUuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHR1YmUuZ2V0UGFyYW1ldGVyKCdwb3dlcicpICsgNSAqIChzcGVsbFBvd2VyIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNsb3dFbmVtaWVzIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAnbW9uc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignc3BlZWQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RzID0gb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2VmZmVjdHMnKSB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkIDwgcG93ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgc3BlZWQgLSBwb3dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWZmZWN0cy5pbmRleE9mKCdmcm96ZW4nKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RzLnB1c2goJ2Zyb3plbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnKSA9PSAndGVsZXBvcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdXNlICA9IG5ldyBQaGFzZXIuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZS55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBQaGFzZXIuUG9pbnQuc3VidHJhY3QobW91c2UsIHBsYXllci5wb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlciA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gdXRpbHMubW92ZVdpdGhTcGVlZChwbGF5ZXIucG9zLCBkaXJlY3Rpb24sIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vbGRvd24gPSBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93bikgLSAoMzAgKiAoc3BlbGxQb3dlciAtIDEpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZSA9IGdhbWVDb25maWdzLmdldENvbmZpZygndGVsZXBvcnRHYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSBwbGF5ZXIucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3RlbGVwb3J0R2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUucG9zID0gZGVzdGluYXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zZXRQb3NpdGlvbihkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIChjb29sZG93biA+IDUwKSA/IGNvb2xkb3duIDogNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmcm9zdFNoYXJkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpID09ICdmcm9zdFNoYXJkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcm9zdFNoYXJkID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdmcm9zdFNoYXJkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IFBoYXNlci5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlciA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gbW91c2VQb3NpdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24ueCAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnkgLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvc3RTaGFyZC5wb3MgPSBkZXN0aW5hdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwZWxsUG93ZXJCb29zdCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNwZWxsUG93ZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlckJvb3N0ICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnMgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGZyb3N0U2hhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnMuc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGZzLmdldFBhcmFtZXRlcignY29vbGRvd24nKSArIHNwZWxsUG93ZXJCb29zdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Jsb29kU3ByYXknKTtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmplY3RzW2ldLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy54ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnkgKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGVsbFR1YmVNb25zdGVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAnbW9uc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYmxvb2RTcHJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iamVjdHNbaV0ucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnggKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MueSArPSAtIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3NwZWxscy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIG1vbnN0ZXJDb250cm9sbGVyIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScsIDEpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyT25XYXZlJywgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb3VudFsgb2JqLmdldFBhcmFtZXRlcignY3VycmVudFdhdmUnKSAtIDFdKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlcktpbGxlZCcsIDApO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyU3Bhd25lZCcsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRPbldhdmUgPSB0aGlzLmNvbnRleHQubGF5ZXIuYWRkT2JqZWN0KGdhbWVDb25maWdzLmdldENvbmZpZygnbGVmdE9uV2F2ZUxhYmVsJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3Bhd24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwIC0gb2JqLmxheWVyLnRyYW5zbGF0ZS54LCAxMDAgLSBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3Rvcig5MDAgLSBvYmoubGF5ZXIudHJhbnNsYXRlLngsIDY1MCAtIG9iai5sYXllci50cmFuc2xhdGUueSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VtbW9uR2F0ZSA9IGdhbWVDb25maWdzLmdldENvbmZpZygnc3VtbW9uR2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvb3JkcyA9IFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zID0gbmV3IFBoYXNlci5Qb2ludChjb29yZHNbMF0sIGNvb3Jkc1sxXSk7XHJcbiAgICAgICAgICAgICAgICBzdW1tb25HYXRlLnBvcy54ID0gTWF0aC5taW4oMTEwMCwgTWF0aC5tYXgoNTAsIHN1bW1vbkdhdGUucG9zLngpKTtcclxuICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zLnkgPSBNYXRoLm1pbig5MDAsIE1hdGgubWF4KDUwLCBzdW1tb25HYXRlLnBvcy55KSk7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHN1bW1vbkdhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnKSA8IG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJPbldhdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlU3Bhd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnLCBvYmouZ2V0UGFyYW1ldGVyKCdtb25zdGVyU3Bhd25lZCcpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gJiYgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdtb25zdGVyS2lsbGVkJykgPj0gb2JqLmdldFBhcmFtZXRlcignbW9uc3Rlck9uV2F2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY3VycmVudFdhdmUnLCBvYmouZ2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyT25XYXZlJywgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb3VudFtvYmouZ2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScpIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnLCAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE9uV2F2ZS5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGhpcy5sZWZ0T25XYXZlLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKSwge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnKSArICcvJyArIG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJPbldhdmUnKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb3VudDogWzEwLCAyNSwgNTAsIDc1LCAxMDAsIDE1MCwgMjAwLCA1MDAsIDEwMDAsIDI1MDAsIDUwMDAsIDEwMDAwXSxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiAxMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2xvZ2ljLmpzXG4gKiovIiwidmFyIG5hcmdzID0gL1xceyhbMC05YS16QS1aXSspXFx9L2dcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZykge1xuICAgIHZhciBhcmdzXG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHNbMV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgfVxuXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XG4gICAgICAgIGFyZ3MgPSB7fVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShuYXJncywgZnVuY3Rpb24gcmVwbGFjZUFyZyhtYXRjaCwgaSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdFxuXG4gICAgICAgIGlmIChzdHJpbmdbaW5kZXggLSAxXSA9PT0gXCJ7XCIgJiZcbiAgICAgICAgICAgIHN0cmluZ1tpbmRleCArIG1hdGNoLmxlbmd0aF0gPT09IFwifVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gYXJncy5oYXNPd25Qcm9wZXJ0eShpKSA/IGFyZ3NbaV0gOiBudWxsXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gVmljdG9yO1xuXG4vKipcbiAqICMgVmljdG9yIC0gQSBKYXZhU2NyaXB0IDJEIHZlY3RvciBjbGFzcyB3aXRoIG1ldGhvZHMgZm9yIGNvbW1vbiB2ZWN0b3Igb3BlcmF0aW9uc1xuICovXG5cbi8qKlxuICogQ29uc3RydWN0b3IuIFdpbGwgYWxzbyB3b3JrIHdpdGhvdXQgdGhlIGBuZXdgIGtleXdvcmRcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gVmljdG9yKDQyLCAxMzM3KTtcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBWYWx1ZSBvZiB0aGUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0geSBWYWx1ZSBvZiB0aGUgeSBheGlzXG4gKiBAcmV0dXJuIHtWaWN0b3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBWaWN0b3IgKHgsIHkpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFZpY3RvcikpIHtcblx0XHRyZXR1cm4gbmV3IFZpY3Rvcih4LCB5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgWCBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLng7XG5cdCAqICAgICAvLyA9PiA0MlxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy54ID0geCB8fCAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgWSBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLnk7XG5cdCAqICAgICAvLyA9PiAyMVxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy55ID0geSB8fCAwO1xufTtcblxuLyoqXG4gKiAjIFN0YXRpY1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBmcm9tIGFuIGFycmF5XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbUFycmF5KFs0MiwgMjFdKTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFycmF5IHdpdGggdGhlIHggYW5kIHkgdmFsdWVzIGF0IGluZGV4IDAgYW5kIDEgcmVzcGVjdGl2ZWx5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IFRoZSBuZXcgaW5zdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKGFyclswXSB8fCAwLCBhcnJbMV0gfHwgMCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBvYmplY3RcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IFZpY3Rvci5mcm9tT2JqZWN0KHsgeDogNDIsIHk6IDIxIH0pO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjQyLCB5OjIxXG4gKlxuICogQG5hbWUgVmljdG9yLmZyb21PYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHdpdGggdGhlIHZhbHVlcyBmb3IgeCBhbmQgeVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIG5ldyBWaWN0b3Iob2JqLnggfHwgMCwgb2JqLnkgfHwgMCk7XG59O1xuXG4vKipcbiAqICMgTWFuaXB1bGF0aW9uXG4gKlxuICogVGhlc2UgZnVuY3Rpb25zIGFyZSBjaGFpbmFibGUuXG4gKi9cblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWCBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFgodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6MTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IncyBZIGF4aXMgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkWSh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeTo0MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCB0byBhZGQgdG8gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGQodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ICs9IHZlYy54O1xuXHR0aGlzLnkgKz0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gYm90aCB2ZWN0b3IgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAzLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHRoaXMueSArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogMlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgdGhlIGdpdmVuIHNjYWxhciB0byB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEsIDIpO1xuICpcbiAqICAgICB2ZWMuYWRkU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAxLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBYIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggLT0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIFkgYXhpcyBvZiBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5zdWJ0cmFjdFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3QodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6ODAsIHk6MjBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhcigyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogODAsIHk6IDE4MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdFNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclgoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAyMDBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjLnN1YnRyYWN0U2NhbGFyWSgyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMTAwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSB4IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVYID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggLz0gdmVjdG9yLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIHRoZSBZIGF4aXMgYnkgdGhlIHkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5kaXZpZGVZKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgYSBheGlzIHZhbHVlcyBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6MjVcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnkgLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFgoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4Oi0xMDAsIHk6NTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFggPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFkoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFkgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueSAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgYm90aCBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuaW52ZXJ0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5Oi01MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLmludmVydFgoKTtcblx0dGhpcy5pbnZlcnRZKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgWCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5WCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IFkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdmFsdWVzIGZyb20gYSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHkodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggKj0gdmVjdG9yLng7XG5cdHRoaXMueSAqPSB2ZWN0b3IueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgYm90aCB2ZWN0b3IgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAqPSBzY2FsYXI7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMueCA9IDE7XG5cdFx0dGhpcy55ID0gMDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRpdmlkZShWaWN0b3IobGVuZ3RoLCBsZW5ndGgpKTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUubm9ybSA9IFZpY3Rvci5wcm90b3R5cGUubm9ybWFsaXplO1xuXG4vKipcbiAqIElmIHRoZSBhYnNvbHV0ZSB2ZWN0b3IgYXhpcyBpcyBncmVhdGVyIHRoYW4gYG1heGAsIG11bHRpcGxpZXMgdGhlIGF4aXMgYnkgYGZhY3RvcmBcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5saW1pdCg4MCwgMC45KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjkwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBmb3IgYm90aCB4IGFuZCB5IGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgRmFjdG9yIGJ5IHdoaWNoIHRoZSBheGlzIGFyZSB0byBiZSBtdWx0aXBsaWVkIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobWF4LCBmYWN0b3IpIHtcblx0aWYgKE1hdGguYWJzKHRoaXMueCkgPiBtYXgpeyB0aGlzLnggKj0gZmFjdG9yOyB9XG5cdGlmIChNYXRoLmFicyh0aGlzLnkpID4gbWF4KXsgdGhpcy55ICo9IGZhY3RvcjsgfVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyBib3RoIHZlY3RvciBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NjcsIHk6NzNcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR0aGlzLnJhbmRvbWl6ZVgodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21pemVzIHRoZSB5IGF4aXMgd2l0aCBhIHZhbHVlIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplWChuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTUsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVggPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueCwgYm90dG9tUmlnaHQueCk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR0aGlzLnggPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVkobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo2NlxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplWSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR2YXIgbWluID0gTWF0aC5taW4odG9wTGVmdC55LCBib3R0b21SaWdodC55KTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHRoaXMueSA9IHJhbmRvbShtaW4sIG1heCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21seSByYW5kb21pemVzIGVpdGhlciBheGlzIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplQW55KG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo3N1xuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplQW55ID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdGlmICghISBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpKSB7XG5cdFx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGFuIGludGVnZXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS51bmZsb2F0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG5cdHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdW5kcyBib3RoIGF4aXMgdG8gYSBjZXJ0YWluIHByZWNpc2lvblxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAuMiwgNTAuOSk7XG4gKlxuICogICAgIHZlYy51bmZsb2F0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NTFcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gUHJlY2lzaW9uIChkZWZhdWx0OiA4KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b0ZpeGVkID0gZnVuY3Rpb24gKHByZWNpc2lvbikge1xuXHRpZiAodHlwZW9mIHByZWNpc2lvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgcHJlY2lzaW9uID0gODsgfVxuXHR0aGlzLnggPSB0aGlzLngudG9GaXhlZChwcmVjaXNpb24pO1xuXHR0aGlzLnkgPSB0aGlzLnkudG9GaXhlZChwcmVjaXNpb24pO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBYIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhYID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueCA9ICgxIC0gYW1vdW50KSAqIHRoaXMueCArIGFtb3VudCAqIHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBZIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WSh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhZID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueSA9ICgxIC0gYW1vdW50KSAqIHRoaXMueSArIGFtb3VudCAqIHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXggPSBmdW5jdGlvbiAodmVjLCBhbW91bnQpIHtcblx0dGhpcy5taXhYKHZlYywgYW1vdW50KTtcblx0dGhpcy5taXhZKHZlYywgYW1vdW50KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICMgUHJvZHVjdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY2xvbmUoKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IEEgY2xvbmUgb2YgdGhlIHZlY3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIG5ldyBWaWN0b3IodGhpcy54LCB0aGlzLnkpO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBYIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WCh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFkgY29tcG9uZW50IGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHlZKHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSA9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBhbmQgWSBjb21wb25lbnRzIGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHkodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjIwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLmNvcHlYKHZlYyk7XG5cdHRoaXMuY29weVkodmVjKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZlY3RvciB0byB6ZXJvICgwLDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICpcdFx0IHZhcjEuemVybygpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjAsIHk6MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuemVybyA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gdGhpcy55ID0gMDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZG90KHZlYzIpO1xuICogICAgIC8vID0+IDIzMDAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEb3QgcHJvZHVjdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gdGhpcy54ICogdmVjMi54ICsgdGhpcy55ICogdmVjMi55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uICh2ZWMyKSB7XG5cdHJldHVybiAodGhpcy54ICogdmVjMi55ICkgLSAodGhpcy55ICogdmVjMi54ICk7XG59O1xuXG4vKipcbiAqIFByb2plY3RzIGEgdmVjdG9yIG9udG8gYW5vdGhlciB2ZWN0b3IsIHNldHRpbmcgaXRzZWxmIHRvIHRoZSByZXN1bHQuXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqXG4gKiAgICAgdmVjLnByb2plY3RPbnRvKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gcHJvamVjdCB0aGlzIHZlY3RvciBvbnRvXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnByb2plY3RPbnRvID0gZnVuY3Rpb24gKHZlYzIpIHtcbiAgICB2YXIgY29lZmYgPSAoICh0aGlzLnggKiB2ZWMyLngpKyh0aGlzLnkgKiB2ZWMyLnkpICkgLyAoKHZlYzIueCp2ZWMyLngpKyh2ZWMyLnkqdmVjMi55KSk7XG4gICAgdGhpcy54ID0gY29lZmYgKiB2ZWMyLng7XG4gICAgdGhpcy55ID0gY29lZmYgKiB2ZWMyLnk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZURlZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHJhZGlhbjJkZWdyZWVzKHRoaXMuaG9yaXpvbnRhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLngsIHRoaXMueSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnZlcnRpY2FsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLnZlcnRpY2FsQW5nbGUoKSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGU7XG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlRGVnID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWc7XG5WaWN0b3IucHJvdG90eXBlLmRpcmVjdGlvbiA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHR2YXIgbnggPSAodGhpcy54ICogTWF0aC5jb3MoYW5nbGUpKSAtICh0aGlzLnkgKiBNYXRoLnNpbihhbmdsZSkpO1xuXHR2YXIgbnkgPSAodGhpcy54ICogTWF0aC5zaW4oYW5nbGUpKSArICh0aGlzLnkgKiBNYXRoLmNvcyhhbmdsZSkpO1xuXG5cdHRoaXMueCA9IG54O1xuXHR0aGlzLnkgPSBueTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlRGVnID0gZnVuY3Rpb24gKGFuZ2xlKSB7XG5cdGFuZ2xlID0gZGVncmVlczJyYWRpYW4oYW5nbGUpO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUbyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJldHVybiB0aGlzLnJvdGF0ZShyb3RhdGlvbi10aGlzLmFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUb0RlZyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVUbyhyb3RhdGlvbik7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5ID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHZhciBhbmdsZSA9IHRoaXMuYW5nbGUoKSArIHJvdGF0aW9uO1xuXG5cdHJldHVybiB0aGlzLnJvdGF0ZShhbmdsZSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5RGVnID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVCeShyb3RhdGlvbik7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWCh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiB0aGlzLnggLSB2ZWMueDtcbn07XG5cbi8qKlxuICogU2FtZSBhcyBgZGlzdGFuY2VYKClgIGJ1dCBhbHdheXMgcmV0dXJucyBhbiBhYnNvbHV0ZSBudW1iZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5hYnNEaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWCh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgdGhlIFkgYXhpcyBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IC0xMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy55IC0gdmVjLnk7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWSgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IDEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDAuNDk4NzU2MjExMjA4OVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2UgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxKHZlYykpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VTcSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VTcSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dmFyIGR4ID0gdGhpcy5kaXN0YW5jZVgodmVjKSxcblx0XHRkeSA9IHRoaXMuZGlzdGFuY2VZKHZlYyk7XG5cblx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb3IgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGgoKTtcbiAqICAgICAvLyA9PiAxMTEuODAzMzk4ODc0OTg5NDhcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IExlbmd0aCAvIE1hZ25pdHVkZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKTtcbn07XG5cbi8qKlxuICogU3F1YXJlZCBsZW5ndGggLyBtYWduaXR1ZGVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGhTcSgpO1xuICogICAgIC8vID0+IDEyNTAwXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoU3EgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IFZpY3Rvci5wcm90b3R5cGUubGVuZ3RoO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHZlY3RvciBpcyAoMCwgMClcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmVjLnplcm8oKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgdGhlIHNhbWUgYXMgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYzEuaXNFcXVhbFRvKHZlYzIpO1xuICpcbiAqICAgICAvLyA9PiB0cnVlXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaXNFcXVhbFRvID0gZnVuY3Rpb24odmVjMikge1xuXHRyZXR1cm4gdGhpcy54ID09PSB2ZWMyLnggJiYgdGhpcy55ID09PSB2ZWMyLnk7XG59O1xuXG4vKipcbiAqICMgVXRpbGl0eSBNZXRob2RzXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gJ3g6JyArIHRoaXMueCArICcsIHk6JyArIHRoaXMueTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b0FycmF5KCk7XG4gKiAgICAgLy8gPT4gWzEwLCAyMF1cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9PYmplY3QoKTtcbiAqICAgICAvLyA9PiB7IHg6IDEwLCB5OiAyMCB9XG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfTtcbn07XG5cblxudmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5mdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmZ1bmN0aW9uIHJhZGlhbjJkZWdyZWVzIChyYWQpIHtcblx0cmV0dXJuIHJhZCAqIGRlZ3JlZXM7XG59XG5cbmZ1bmN0aW9uIGRlZ3JlZXMycmFkaWFuIChkZWcpIHtcblx0cmV0dXJuIGRlZyAvIGRlZ3JlZXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vdmljdG9yL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcGxheWVyRGVhdGg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUuc2hvd1Jlc3RhcnRNZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGFtYWdlT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8IG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpIDw9IG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZWxlZUF0dGFjayA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsb29kID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdibG9vZFNwcmF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iamVjdHNbaV0ucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy54ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy55ICs9IC0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCdleHBsb2RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2V4cGxvZGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbkNvbmRpdGlvbiA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRXhwbG9zaW9ucygpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBvYmoucG9zLmNsb25lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvd2VyID0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCAtIG9iai5zaXplWzBdLCBwb3MueSAtIG9iai5zaXplWzFdKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCArIG9iai5zaXplWzBdLCBwb3MueSAtIG9iai5zaXplWzFdKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCAtIG9iai5zaXplWzBdLCBwb3MueSArIG9iai5zaXplWzFdKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCArIG9iai5zaXplWzBdLCBwb3MueSArIG9iai5zaXplWzFdKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCAtIDMgLyAyICogb2JqLnNpemVbMF0sIHBvcy55KTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb3MueCArIDMgLyAyICogb2JqLnNpemVbMF0sIHBvcy55KTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUV4cGxvc2lvbnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUV4cGxvc2lvbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRTcGVlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3NwZWVkJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldEVmZmVjdHMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouZ2V0UGFyYW1ldGVyKCdlZmZlY3RzJykuc3BsaWNlKDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVG9EaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5tb3ZlV2l0aFNwZWVkKG9iai5wb3MsIGRpcmVjdGlvbiwgIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXllckxldmVsVXA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbEV4cCA9IG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXTtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpID4gb2JqLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW29iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZXhwJywgb2JqLmdldFBhcmFtZXRlcignZXhwJykgLSBsZXZlbEV4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCBvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlbGxQb3dlcicsIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCAnTUFYJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtb25zdGVyQ29udHJvbGxlciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdtb25zdGVyQ29udHJvbGxlcicpWzBdO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlckNvbnRyb2xsZXIuc2V0UGFyYW1ldGVyKCdtb25zdGVyS2lsbGVkJywgbW9uc3RlckNvbnRyb2xsZXIuZ2V0UGFyYW1ldGVyKCdtb25zdGVyS2lsbGVkJykgKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCsrO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZXRQYXJhbWV0ZXIoJ2V4cCcsIHBsYXllci5nZXRQYXJhbWV0ZXIoJ2V4cCcpICsgb2JqLmdldFBhcmFtZXRlcignZXhwJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0UmFuZ2VDb29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0TWVsZWVDb29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1lbGVlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJyk7XHJcbiAgICAgICAgICAgIG1lbGVlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicsIG1lbGVlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3NMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21idWxsZXQnKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBQaGFzZXIuUG9pbnQuc3VidHJhY3QocGxheWVyLnBvcywgb2JqLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKG9iai5wb3MuYW5nbGUocGxheWVyLnBvcykpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzMkxvZ2ljIDoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvUGxheWVyID0gb2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoUGhhc2VyLlBvaW50LmRpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpIDwgb2JqLmdldFBhcmFtZXRlcignZmlyZVJhbmdlJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbWJ1bGxldDInKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvblRvUGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2J1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgcGxheWVyLnBvcylbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5tb3ZlV2l0aFNwZWVkKG9iai5wb3MsIGRpcmVjdGlvblRvUGxheWVyLCBvYmouZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zczJCdWxsZXQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVFeHBsb3Npb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gb2JqLnBvcy5jbG9uZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICBwb3dlciA9IG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbDtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgUGhhc2VyLlBvaW50KHBvcy54LCBwb3MueSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVXaXRoS2V5Ym9hcmQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSB7fTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLmxlZnQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oNjUpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24udXAgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oODcpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24uZG93biA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big4Myk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi5yaWdodCA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big2OCk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24ucmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHBvcy54ID0gb2JqLnBvcy54ICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgIHBvcy54ID0gb2JqLnBvcy54IC0gMSAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gb2JqLnBvcy55ICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uLnVwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3MueSA9IG9iai5wb3MueSAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnggPT0gcG9zLnggJiYgb2JqLnBvcy55ID09IHBvcy55KSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIFBoYXNlci5Qb2ludC5zdWJ0cmFjdChwb3MsIG9iai5wb3MpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3RTcGVsbFdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big0OSkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAnZmlyZWJhbGwnKSk7XHJcbiAgICAgICAgICAgIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oNTApKSAmJiAob2JqLnNldFBhcmFtZXRlcignY3VycmVudFNwZWxsJywgJ2hlbGxmaXJlJykpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDUxKSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICdmcm9zdFNoYXJkJykpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDUyKSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICd0ZWxlcG9ydCcpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlbGxQb3dlcicsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignZXhwJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2V4cCcpICsgb2JqLmdldFBhcmFtZXRlcignZXhwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3VtbW9uT25Db29sZG93biA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UHJvcGVyTW9uc3RlcigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyQm9zcycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb20gLT0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb3NzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZyAmJiByYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb3NzMicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyQm9zczInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tIC09IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zczInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnICYmIHJhbmRvbSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvb21lcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyQm9vbWVyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbSAtPSBvYmouZ2V0UGFyYW1ldGVyKCdtb25zdGVyQm9vbWVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyQ29uZmlnID0gZ2V0UHJvcGVyTW9uc3RlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbW9uc3RlciA9IG9iai5sYXllci5hZGRPYmplY3QobW9uc3RlckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsJykgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG1vbnN0ZXIuZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAqIDAuNzUgKiBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgY29vbGRvd24gLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VuaXRzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG52YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcmFuZG9tX3RyZWVzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21Qb2ludEluQXJlYSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLnNpemVbMF0pLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouc2l6ZVsxXSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy50cmVlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCd0cmVlJyArIChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpICsgMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgUGhhc2VyLlBvaW50KHBvaW50WzBdLCBwb2ludFsxXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy5zdG9uZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnc3RvbmVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSk7XHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChwb2ludFswXSwgcG9pbnRbMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qdmFyIHN0b25lID0gKi90aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvL3N0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICB0cmVlczogMTAwLFxyXG4gICAgICAgICAgICBzdG9uZXM6IDEwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9oZWFydDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdoZWFydCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3Rvcig1MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTU0LCA5MTgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvb3JkcyA9IFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyBQaGFzZXIuUG9pbnQoY29vcmRzWzBdLCBjb29yZHNbMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbMTE1NCwgOTE4XV0sXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA0MDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fcG93ZXJ1cDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdwb3dlcnVwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb29yZHMgPSBWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgUGhhc2VyLlBvaW50KGNvb3Jkc1swXSwgY29vcmRzWzFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbMTAwLCAxMDBdLCBbMTEwMCwgODUwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb29sZG93biA6IDExMDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX3RlcnJhaW46IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGdhdGVDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2dhdGUnKSxcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWc7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnd2FsbCcpO1xyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZy5wb3MgPSBbd2FsbENvbmZpZy5zaXplWzBdICogaSArIHdhbGxDb25maWcuc2l6ZVswXSAvIDIsIHdhbGxDb25maWcuc2l6ZVsxXS8yXTtcclxuICAgICAgICAgICAgICAgIHZhciB3YWxsID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdCh3YWxsQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIC8vc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2F0ZUNvbmZpZy5wb3MgPSBbd2FsbENvbmZpZy5wb3MueCArIHdhbGxDb25maWcuc2l6ZVswXS8gMiArIGdhdGVDb25maWcuc2l6ZVswXS8yLCAoZ2F0ZUNvbmZpZy5zaXplWzFdIC0gMykvMiBdO1xyXG4gICAgICAgICAgICB2YXIgZ2F0ZSA9IHRoaXMuY29udGV4dC5hZGRPYmplY3QoZ2F0ZUNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdvV2l0aFBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmouZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBweCA9IChwbGF5ZXIucG9zLnggKyBvYmoudHJhbnNsYXRlLngpIC8gMTAyNCAqIDEwMCxcclxuICAgICAgICAgICAgICAgIHB5ID0gKHBsYXllci5wb3MueSArIG9iai50cmFuc2xhdGUueSkgLyA3NjggKiAxMDA7XHJcblxyXG4gICAgICAgICAgICBpZiAocHggPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnggKz0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChweCA+IDcwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS54ID4gLSAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnggLT0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocHkgPCAyNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnkgKz0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChweSA+IDc1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS55ID4gLSAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnkgLT0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGNvdW50TW9uc3RlcktpbGxlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGtpbGxzOiBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCB8fCAwXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcisrKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGVhbHRoIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoOiBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0ucGFyYW1ldGVycy5oZWFsdGhcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZXZlbCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbDogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSxcclxuICAgICAgICAgICAgICAgIGV4cDogcGxheWVyLmdldFBhcmFtZXRlcignZXhwJyksXHJcbiAgICAgICAgICAgICAgICBsZXZlbEV4cCA6IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5iZXN0VGltZSkgLyA2MCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlc3RTY29yZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5iZXN0U2NvcmVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG52YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgYmluZFBvc2l0aW9uVG9MYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueCAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPCBvYmoubGF5ZXIucG9zLngpIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueCA9IG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvcy54ICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3MueCArIG9iai5sYXllci5zaXplWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnggID0gb2JqLmxheWVyLnBvcy54ICArIG9iai5sYXllci5zaXplWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnkgLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIDwgb2JqLmxheWVyLnBvcy55KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnkgPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3MueSArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPiBvYmoubGF5ZXIucG9zLnkgKyBvYmoubGF5ZXIuc2l6ZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy55ID0gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlckxlYXZpbmdMYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueSA8IC0xMDAgfHwgb2JqLnBvcy55IC0gb2JqLnNwcml0ZS5zaXplWzFdIC0gMTAwPiBvYmoubGF5ZXIucG9zLnkgKyBvYmoubGF5ZXIuc2l6ZVsxXSB8fCBvYmoucG9zLnggLSBvYmouc3ByaXRlLnNpemVbMF0gLSAxMDA+IG9iai5sYXllci5wb3MueCArIG9iai5sYXllci5zaXplWzBdIHx8IG9iai5wb3MueCA8IC0xMDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBQaGFzZXIuUG9pbnQuc3VidHJhY3QocGxheWVyLnBvcywgb2JqLnBvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllckFkdmFuY2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJEaXJlY3Rpb24gPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvbGREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IFBoYXNlci5Qb2ludC5zdWJ0cmFjdChwbGF5ZXIucG9zLCBvYmoucG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckRpcmVjdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBQaGFzZXIuUG9pbnQuc3VidHJhY3QocGxheWVyLnBvcywgb2JqLnBvcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwZWVkID0gTWF0aC5hYnMoTWF0aC5taW4ocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSwgUGhhc2VyLlBvaW50LmRpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpKSAtIDEwKTtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJOZXh0UGxhY2UgPSB1dGlscy5tb3ZlV2l0aFNwZWVkKHBsYXllci5wb3MsIHBsYXllckRpcmVjdGlvbiwgc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9kdiA9IFBoYXNlci5Qb2ludC5zdWJ0cmFjdChwbGF5ZXJOZXh0UGxhY2UsIG9iai5wb3MpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9vZHYgPSBvbGREaXJlY3Rpb24uY2xvbmUoKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBfbmR2ID0gUGhhc2VyLlBvaW50LmFkZChfb2R2LCBfZHYpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIF9uZHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhbmRlcmVyQUkgOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuICAgICAgICAgICAgdmFyIGNvb3JkcyA9IFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgUGhhc2VyLlBvaW50KGNvb3Jkc1swXSwgY29vcmRzWzFdKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IFBoYXNlci5Qb2ludC5kaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdzY2VudFJhbmdlJykpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NjZW50JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdzY2VudFNwZWVkJykpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCAwKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIFBoYXNlci5Qb2ludC5zdWJ0cmFjdChwbGF5ZXIucG9zLCBvYmoucG9zKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdzcGVlZCcpKTtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTAwLCA4NTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb29yZHMgPSBWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgUGhhc2VyLlBvaW50LnN1YnRyYWN0KG5ldyBQaGFzZXIuUG9pbnQoY29vcmRzWzBdLCBjb29yZHNbMV0pLCBvYmoucG9zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAob2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykgLSAxMDApICsgMTAwKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykgJiYgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHluYW1pY1pJbmRleDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbmV3WkluZGV4ID0gMDtcclxuICAgICAgICAgICAgb2JqLnBvcyAmJiAobmV3WkluZGV4ICs9IG9iai5wb3MueSk7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUgJiYgKG5ld1pJbmRleCArPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyKTtcclxuXHJcbiAgICAgICAgICAgIG9iai56SW5kZXggPSAob2JqLnBvcy55ID4gMCkgPyBNYXRoLnJvdW5kKG5ld1pJbmRleCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb2xsaXNpb25zOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25zID0gb2JqLnNldFBhcmFtZXRlcignY29sbGlzaW9ucycsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2VsbHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLmNvbGxpc2lvbnMudXBkYXRlT2JqZWN0KG9iaik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLmNvbGxpc2lvbnMudXBkYXRlT2JqZWN0KG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZVRvTW91c2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSBuZXcgUGhhc2VyLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSk7XHJcblxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uVG9Nb3VzZSA9IFBoYXNlci5Qb2ludC5zdWJ0cmFjdChkZXN0aW5hdGlvbiwgb2JqLnBvcyk7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oZGlyZWN0aW9uVG9Nb3VzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJpbmRQb3NpdGlvblRvTW91c2U6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbmV3IFBoYXNlci5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpO1xyXG4gICAgICAgICAgICBvYmouc2V0UG9zaXRpb24obW91c2VQb3NpdGlvbi5jbG9uZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlT25Db29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGV4cGxvc2lvbk9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgUGhhc2VyLlBvaW50KG9iai5wb3MueCwgb2JqLnBvcy55KTtcclxuICAgICAgICAgICAgICAgIHZhciBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGV4cGxvc2lvbkFmdGVyU3ByaXRlRG9uZToge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmKG9iai5zcHJpdGUuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IFBoYXNlci5Qb2ludChvYmoucG9zLngsIG9iai5wb3MueSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlclNwcml0ZURvbmU6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlEaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24ob2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVCeVBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oUGhhc2VyLlBvaW50LnN1YnRyYWN0KHBsYXllci5wb3MsIG9iai5wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9ldGMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7Ozs7OztBQUFBO0FBT0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6eUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTs7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==