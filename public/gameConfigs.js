var gameConfigs =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getLayerConfig = exports.getConfig = exports.getRuleConfig = undefined;

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(7);

	var _index4 = _interopRequireDefault(_index3);

	var _layers = __webpack_require__(16);

	var _layers2 = _interopRequireDefault(_layers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRuleConfig(id) {
	    return _index4.default[id];
	}
	function getConfig(id) {
	    var config = JSON.parse(JSON.stringify(_index2.default[id]));

	    !config.id && (config.id = id);

	    return config;
	}
	function getLayerConfig(id) {
	    return _layers2.default[id];
	}
	exports.getRuleConfig = getRuleConfig;
	exports.getConfig = getConfig;
	exports.getLayerConfig = getLayerConfig;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(2);

	var _spells2 = _interopRequireDefault(_spells);

	var _logic = __webpack_require__(32);

	var _logic2 = _interopRequireDefault(_logic);

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
	        zIndex: 5000,
	        sprite: ['spellIcons', [224, 96], [32, 32]],
	        pos: [512, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            shardsFired: 0,
	            cooldown: 2000
	        },
	        type: 'spell',
	        rules: ['frostShard']
	    },
	    teleportSpell: {
	        zIndex: 5000,
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
	    frostShard: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'spellElement',
	        size: [500, 500],
	        parameters: {
	            power: 60,
	            cooldown: 500
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
	                7: 8000,
	                8: 10000,
	                9: 15000
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
	        //render: 'object',
	        collisions: true,
	        sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
	        conditions: ['triggerOnPlayerCollisionPowerUp'],
	        parameters: {
	            exp: 250
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(8);

	var _spells2 = _interopRequireDefault(_spells);

	var _logic = __webpack_require__(33);

	var _logic2 = _interopRequireDefault(_logic);

	var _units = __webpack_require__(11);

	var _units2 = _interopRequireDefault(_units);

	var _layers = __webpack_require__(12);

	var _layers2 = _interopRequireDefault(_layers);

	var _ui = __webpack_require__(14);

	var _ui2 = _interopRequireDefault(_ui);

	var _etc = __webpack_require__(15);

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
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var createBullet = function createBullet(direction, destination) {

	                            var bulletConfig = gameConfigs.getConfig('bullet');
	                            bulletConfig.pos = player.pos.clone();

	                            var bull = obj.layer.addObject(bulletConfig);
	                            bull.setParameter('direction', direction);
	                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));

	                            bull.sprite.setDegree(_utils2.default.getDegree(player.pos, destination)[0]);
	                        };

	                        var destination = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
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
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var mouse = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	                        mouse.x -= obj.layer.translate.x;
	                        mouse.y -= obj.layer.translate.y;

	                        var direction = new _utils2.default.Line(player.pos, _utils2.default.getMovedPointByDegree(player.pos, mouse, 0)),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = direction.getDestination(player.pos, obj.getParameter('power')),
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
	                            mousePosition = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
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
	    }
	};

	exports.default = config;

/***/ },
/* 9 */,
/* 10 */,
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
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - 3 / 2 * obj.size[0], pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
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
	                    var bulletConfig = gameConfigs.getConfig('mbullet2');
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

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
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
	                obj.getParameter('direction').dir = null;
	            } else {
	                //var direction = utils.getDirection(obj.pos, pos);
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, pos));
	            }
	        }
	    },
	    selectSpellWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.layer.game.input.keyboard.isDown(49) && obj.setParameter('currentSpell', 'fireball');
	            obj.layer.game.input.keyboard.isDown(50) && obj.setParameter('currentSpell', 'frostShard');
	            obj.layer.game.input.keyboard.isDown(51) && obj.setParameter('currentSpell', 'teleport');
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

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
	                var _config = gameConfigs.getConfig('tree' + (Math.round(Math.random()) + 1));

	                _config.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = gameConfigs.getConfig('stones');

	                _config2.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

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
	                var config = gameConfigs.getConfig('powerup');

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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

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
	            obj.layer.state.collisions.updateObject(obj);
	        },
	        update: function update(dt, obj) {
	            obj.getParameter('collisions').splice(0);
	            obj.layer.state.collisions.updateObject(obj);
	        }
	    },
	    rotateToMouse: {
	        update: function update(dt, obj) {
	            var destination = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	            destination.x -= obj.layer.translate.x;
	            destination.y -= obj.layer.translate.y;

	            var directionToMouse = new _utils2.default.Line(obj.pos, destination);
	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    bindPositionToMouse: {
	        update: function update(dt, obj) {
	            var mousePosition = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
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
	                explosionConfig.pos = new _utils2.default.Point([obj.pos.x, obj.pos.y]);
	                var expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', obj.getParameter('power'));

	                return;
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
	var config = {
		mainLayer: {
			id: 'mainLayer',
			size: [1324, 1068],
			background: 'terrain',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level', 'fog', 'monsterController'],
			init: function init() {
				this.state.parameters.monstersKilled = 0;
				this.state.parameters.gameTimer = 0;
			},
			translate: {
				x: -150,
				y: -150
			},
			rules: ['random_trees', 'spawn_heart', 'spawn_powerup', 'goWithPlayer']
		}
	};

	exports.default = config;

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    monsterController: {
	        render: false,
	        collisions: false,
	        parameters: {
	            speed: 150
	        },
	        type: 'monsterController',
	        rules: ['monsterController'],
	        parameters: {
	            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
	            monsterCooldown: 10
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(10);

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
	                var topLeft = new Victor(50 - obj.layer.translate.x, 50 - obj.layer.translate.y);
	                var bottomRight = new Victor(900 - obj.layer.translate.x, 650 - obj.layer.translate.y);
	                var summonGate = gameConfigs.getConfig('summonGate');

	                summonGate.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());
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

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUNvbmZpZ3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvY29uZmlncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3NwZWxscy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2V0Yy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9sb2dpYy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9sb2dpYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMvaW5kZXgnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcy9pbmRleCc7XHJcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xyXG5cclxuZnVuY3Rpb24gZ2V0UnVsZUNvbmZpZyhpZCkge1xyXG4gICAgcmV0dXJuIHJ1bGVzW2lkXVxyXG59XHJcbmZ1bmN0aW9uIGdldENvbmZpZyhpZCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0c1tpZF0pKTtcclxuXHJcbiAgICAoIWNvbmZpZy5pZCkgJiYgKGNvbmZpZy5pZCA9IGlkKTtcclxuXHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59XHJcbmZ1bmN0aW9uIGdldExheWVyQ29uZmlnKGlkKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzW2lkXTtcclxufVxyXG5leHBvcnQge1xyXG4gICAgZ2V0UnVsZUNvbmZpZyxcclxuICAgIGdldENvbmZpZyxcclxuICAgIGdldExheWVyQ29uZmlnXHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBzcGVsbHMgZnJvbSAnLi9zcGVsbHMnO1xyXG5pbXBvcnQgbG9naWMgZnJvbSAnLi9sb2dpYyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGVmZmVjdHMgZnJvbSAnLi9lZmZlY3RzJztcclxuaW1wb3J0IHRlcnJhaW4gZnJvbSAnLi90ZXJyYWluJztcclxuaW1wb3J0IHVpIGZyb20gJy4vdWknO1xyXG5cclxudmFyIG9iamVjdHMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgbG9naWMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIGVmZmVjdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVpKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB0ZXJyYWluKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGZpcmViYWxsU3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiA1MDAwLFxyXG4gICAgICAgIHNwcml0ZTogWydzcGVsbEljb25zJywgWzAsIDBdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzQ3MCwgNzQ4XSxcclxuXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgYnVsbGV0c0ZpcmVkOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWydmaXJlYmFsbCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogNTAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFsyMjQsIDk2XSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs1MTIsIDc0OF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc2hhcmRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAyMDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Zyb3N0U2hhcmQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0U3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiA1MDAwLFxyXG4gICAgICAgIHNwcml0ZTogWydzcGVsbEljb25zJywgWzY0LCAzMl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTU0LCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMjAwLFxyXG4gICAgICAgICAgICB0ZWxlcG9ydEdhdGVzIDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDIwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3RlbGVwb3J0J11cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydEdhdGU6IHtcclxuICAgICAgICB6SW5kZXggOiAwLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2FyY2FuZUdhdGUnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd246IDIwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJ1bGVzIDogWydyZW1vdmVPbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuXHJcbiAgICBidWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ZpcmViYWxsJyxbIDAsIDBdLCBbMzMsIDMzXSwgMTYsIFswLCAxLCAyLCAzXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMjVdLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMzAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ2J1bGxldE1vbnN0ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JyAsICdleHBsb3Npb25PbkNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBmcm9zdFNoYXJkIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydlZmZlY3RzJyxbOTYsIDBdLCBbMzIsIDMyXSwgMTAsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHNpemUgOiBbNTAwLCA1MDBdLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogNjAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnc2xvd0VuZW1pZXMnXSxcclxuICAgICAgICBydWxlcyA6IFsncmVtb3ZlT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvc3BlbGxzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIHBsYXllciA6IHtcclxuICAgICAgICB6SW5kZXggOiAyMCxcclxuICAgICAgICBzcHJpdGU6IFsnaGVybycsIFswLCAwXSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgcG9zIDogWzY2MiwgNTM0XSxcclxuICAgICAgICBzaXplIDogWzI1LCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxNTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDUwLFxyXG4gICAgICAgICAgICBzcGVsbFBvd2VyOiAxLFxyXG4gICAgICAgICAgICBsZXZlbCA6IDEsXHJcbiAgICAgICAgICAgIGV4cDogMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50U3BlbGw6ICdmaXJlYmFsbCcsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA6IHt9LFxyXG4gICAgICAgICAgICBsZXZlbFRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICAxIDogNjAwLFxyXG4gICAgICAgICAgICAgICAgMiA6IDEyMDAsXHJcbiAgICAgICAgICAgICAgICAzIDogMjAwMCxcclxuICAgICAgICAgICAgICAgIDQgOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgNSA6IDQ1MDAsXHJcbiAgICAgICAgICAgICAgICA2IDogNjUwMCxcclxuICAgICAgICAgICAgICAgIDcgOiA4MDAwLFxyXG4gICAgICAgICAgICAgICAgOCA6IDEwMDAwLFxyXG4gICAgICAgICAgICAgICAgOSA6IDE1MDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAncGxheWVyJyxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3NlbGVjdFNwZWxsV2l0aEtleWJvYXJkJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVXaXRoS2V5Ym9hcmQnLCAncm90YXRlVG9Nb3VzZScsICdiaW5kUG9zaXRpb25Ub0xheWVyJywgJ3BsYXllckRlYXRoJywgJ21vdmVUb0RpcmVjdGlvbicsJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnLCAncGxheWVyTGV2ZWxVcCddXHJcbiAgICB9LFxyXG4gICAgc3VtbW9uR2F0ZToge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGU6IFsnYXJjYW5lR2F0ZScsIFswLCAwXSwgWzMyLCAzMl0sIDcsIFswLDFdXSxcclxuICAgICAgICBwb3MgOiBbNDY2LCA1ODBdLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDMwXSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA4MCxcclxuICAgICAgICAgICAgZXhwOiAzLFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MgOiA1LFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MyIDogOCxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb29tZXIgOiAyMCxcclxuICAgICAgICAgICAgaGVhbHRoIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzdW1tb25PbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMSxcclxuICAgICAgICBzcHJpdGU6IFsnZGVtb25zJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMjUsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogNzAgLFxyXG4gICAgICAgICAgICBzY2VudFNwZWVkOiAxMjAsXHJcbiAgICAgICAgICAgIHNjZW50UmFuZ2U6IDYwMCxcclxuICAgICAgICAgICAgZXhwOiAxNSxcclxuICAgICAgICAgICAgd2FuZGVyQ29vbGRvd246IDUwMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAyMCxcclxuICAgICAgICAgICAgcG93ZXIgOiA1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWyAnbW9uc3RlckhlYWx0aFN0YXR1cycsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVRvRGlyZWN0aW9uJywgJ3dhbmRlcmVyQUknLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnbWVsZWVBdHRhY2snLCAnZHluYW1pY1pJbmRleCcsICdyZXNldEVmZmVjdHMnLCAncmVzZXRNZWxlZUNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9vbWVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2RlbW9ucycsIFs5NiwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyMCwyOF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxMDAsXHJcbiAgICAgICAgICAgIGV4cCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW10sXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDEwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJywgJ21vbnN0ZXJFeHBsb3Npb25Db25kaXRpb24nXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlQnlQbGF5ZXInLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXJBZHZhbmNlJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYmlnTW9uc3RlcnMnLCBbMCwgMF0sIFszMiwgNTBdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDQwXSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiA1MCxcclxuICAgICAgICAgICAgZXhwIDogNjAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogNzUsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDUwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb25zdGVyQm9zc0xvZ2ljJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0UmFuZ2VDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zcycsIFswLCAwXSwgWzk2LCA0OF0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFs0MCwgNDVdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDE1LFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDIwMCAsXHJcbiAgICAgICAgICAgIGV4cDogMTIwLFxyXG4gICAgICAgICAgICBmaXJlUmFuZ2UgOiAzMDAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb25zdGVyQm9zczJMb2dpYycsICdyb3RhdGVCeURpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0UmFuZ2VDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgaGVhcnQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc2l6ZTogWzI1LCAyNV0sXHJcbiAgICAgICAgc3ByaXRlIDogWydwdW1wa2luJywgWzAsIDBdLCBbMzIsIDMyXSwgNSwgWzAsMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcnVsZXM6IFsnZHluYW1pY1pJbmRleCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG93ZXJ1cCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNpemU6IFsyNSwgMjVdLFxyXG4gICAgICAgIC8vcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsncG93ZXJVcCcsIFswLCAwXSwgWzcyLCA2NV0sIDE1LCBbMCwgMSwgMiwgMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGV4cDogMjUwXHJcbiAgICAgICAgICAgIC8vcG93ZXIgOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZGFya2JsYXN0JywgWzAsIDBdLCBbMzgsIDM4XSwgMTIsIFswLCAxLCAyICwzXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDgsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1idWxsZXQyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zc1NwZWxsJywgWzAsIDBdLCBbMzAsIDI2XSwgMTAsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMjgsIDI0XSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVyQm9zczJCdWxsZXQnXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDE1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBibG9vZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnbW9uc3RlckJsb29kJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd24gOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ3JlbW92ZU9uQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIGJsb29kU3ByYXkgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzcHJpdGUgOiBbJ2Jsb29kRWZmZWN0JywgWzAsIDBdLCBbNjQsIDY0XSwgMTUsIFswLCAxLCAyLCAzLCA0XSwgbnVsbCwgdHJ1ZSwgMC43ODVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFszOSwgMzldLFxyXG4gICAgICAgIHNwcml0ZTogWydleHBsb3Npb25zJywgWzAsIDBdLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbiA6IHtcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVmZmVjdCcsXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckV4cGxvc2lvbiddLFxyXG4gICAgICAgIHNpemUgOiBbMzksIDM5XSxcclxuICAgICAgICBzcHJpdGU6IFsnZXhwbG9zaW9ucycsIFswLCAwXSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZm9nIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ2ZvZycsXHJcbiAgICAgICAgekluZGV4OiAyNTAwLFxyXG4gICAgICAgIHR5cGUgOiAnZWZmZWN0J1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIHRyZWUxIDoge1xyXG4gICAgICAgIHNwcml0ZSA6IFsndHJlZTEnLCBbMCwgMF0sIFs2MiwgODddXSxcclxuICAgICAgICBzaXplIDogWzYyLCA4OF0sXHJcbiAgICAgICAgcnVsZXM6IFsnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgdHJlZTIgOiB7XHJcbiAgICAgICAgc3ByaXRlIDogWyd0cmVlMicsIFswLCAwXSwgWzU5LCA4N11dLFxyXG4gICAgICAgIHNpemUgOiBbNjAsIDg4XSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ3N0b25lJywgWzAsIDBdLCBbMjUsIDIyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsxNSwgMjJdLFxyXG4gICAgICAgIHJ1bGVzIDogWydkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBjdXJzb3IgOiB7XHJcbiAgICAgICAgekluZGV4IDogMzAwMCxcclxuICAgICAgICByZW5kZXI6ICdjdXJzb3InLFxyXG4gICAgICAgIHBvczogWzQwMCwzNTBdLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnY3Vyc29yJywgWzAsIDBdLCBbMzAsIDMwXV0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmluZFBvc2l0aW9uVG9Nb3VzZSddXHJcbiAgICB9LFxyXG4gICAgY291bnRlcjoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0RBQTUyMFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiU0NPUkU6IHtraWxsc31cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydjb3VudE1vbnN0ZXJLaWxsZWQnXVxyXG4gICAgfSxcclxuICAgIGxlZnRPbldhdmVMYWJlbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTAwXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNEQUE1MjBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkxFRlQgT04gVEhJUyBXQVZFOiB7Y291bnR9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZXZlbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcG9zOiBbMzUsIDQ1XSxcclxuICAgICAgICByZW5kZXIgOiBcImV4cEJhclwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiTEVWRUw6IHtsZXZlbH1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydsZXZlbCddXHJcbiAgICB9LFxyXG4gICAgdGltZXI6IHtcclxuICAgICAgICB6SW5kZXggOiAzMDAwLFxyXG4gICAgICAgIHBvczogWzUsIDIzXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNEQUE1MjBcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIlRJTUVSOiB7dGltZX1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWyd0aW1lciddXHJcbiAgICB9LFxyXG4gICAgYmVzdFRpbWU6IHtcclxuICAgICAgICBwb3M6IFs1LCAzNzBdLFxyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjREFBNTIwXCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNCxcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkJFU1QgVElNRToge3RpbWV9XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Jlc3RUaW1lJ11cclxuICAgIH0sXHJcbiAgICBiZXN0U2NvcmU6IHtcclxuICAgICAgICBwb3M6IFs1LCAzODBdLFxyXG4gICAgICAgIHpJbmRleCA6IDMwMDAsXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjREFBNTIwXCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNCxcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkJFU1QgU0NPUkU6IHtzY29yZX1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmVzdFNjb3JlJ11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdWkuanNcbiAqKi8iLCJpbXBvcnQgc3BlbGxzIGZyb20gJy4vc3BlbGxzJ1xyXG5pbXBvcnQgbG9naWMgZnJvbSAnLi9sb2dpYyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIGxvZ2ljKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgc3BlbGxzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBsYXllcnMpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCB1aSk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIGV0Yyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBydWxlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBmaXJlYmFsbCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnKSA9PSAnZmlyZWJhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlciA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGVncmVlID0gMTAgKiAoc3BlbGxQb3dlciAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24ueCAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnkgLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVsbFBvd2VyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIHN0YXJ0RGVncmVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIHN0YXJ0RGVncmVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSAtPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykgKyAzICogKHNwZWxsUG93ZXIgLSAxKSA+IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIDMwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykgKyA1ICogKHNwZWxsUG93ZXIgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgZGVzdGluYXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbGV0Q29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdidWxsZXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSBwbGF5ZXIucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIGJ1bGwuZ2V0UGFyYW1ldGVyKCdwb3dlcicpICsgNSAqIChzcGVsbFBvd2VyIC0gMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24pWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzbG93RW5lbWllcyA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwZWVkID0gb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ3NwZWVkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvd2VyID0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0cyA9IG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdlZmZlY3RzJykgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGVlZCA8IHBvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdzcGVlZCcsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdzcGVlZCcsIHNwZWVkIC0gcG93ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVmZmVjdHMuaW5kZXhPZignZnJvemVuJykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0cy5wdXNoKCdmcm96ZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ3RlbGVwb3J0Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3VzZSAgPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZS55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgbW91c2UsIDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRpcmVjdGlvbi5nZXREZXN0aW5hdGlvbihwbGF5ZXIucG9zLCBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2xkb3duID0gb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgY29vbGRvd24pIC0gKDMwICogKHNwZWxsUG93ZXIgLSAxKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3RlbGVwb3J0R2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUucG9zID0gcGxheWVyLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdCh0ZWxlcG9ydEdhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IGRlc3RpbmF0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24oZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCAoY29vbGRvd24gPiA1MCkgPyBjb29sZG93biA6IDUwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnKSA9PSAnZnJvc3RTaGFyZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIuaXNEb3duIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcmVDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJvc3RTaGFyZCA9IGdhbWVDb25maWdzLmdldENvbmZpZygnZnJvc3RTaGFyZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlciA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gbW91c2VQb3NpdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24ueCAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnkgLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvc3RTaGFyZC5wb3MgPSBkZXN0aW5hdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwZWxsUG93ZXJCb29zdCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNwZWxsUG93ZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlckJvb3N0ICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnMgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGZyb3N0U2hhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnMuc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGZzLmdldFBhcmFtZXRlcignY29vbGRvd24nKSArIHNwZWxsUG93ZXJCb29zdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Jsb29kU3ByYXknKTtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmplY3RzW2ldLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy54ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnkgKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9zcGVsbHMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHBsYXllckRlYXRoOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLnNob3dSZXN0YXJ0TWVudSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhbWFnZU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgPCBvYmplY3RzW2ldLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpICsgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSA8PSBvYmplY3RzW2ldLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpICsgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVsZWVBdHRhY2sgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYmxvb2RTcHJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmplY3RzW2ldLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MueCArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MueSArPSAtIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJFeHBsb3Npb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignZXhwbG9kZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdleHBsb2RlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJFeHBsb3Npb25Db25kaXRpb24gOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZUV4cGxvc2lvbnMoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gb2JqLnBvcy5jbG9uZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICBwb3dlciA9IG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbDtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggLSBvYmouc2l6ZVswXSwgcG9zLnkgLSBvYmouc2l6ZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54ICsgb2JqLnNpemVbMF0sIHBvcy55IC0gb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCAtIG9iai5zaXplWzBdLCBwb3MueSArIG9iai5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggKyBvYmouc2l6ZVswXSwgcG9zLnkgKyBvYmouc2l6ZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54IC0gMyAvIDIgKiBvYmouc2l6ZVswXSwgcG9zLnldKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCArIDMgLyAyICogb2JqLnNpemVbMF0sIHBvcy55XSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVFeHBsb3Npb25zKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVFeHBsb3Npb25zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0U3BlZWQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdzcGVlZCcpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRFZmZlY3RzIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignZWZmZWN0cycpLnNwbGljZSgwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVRvRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gb2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uICYmIGRpcmVjdGlvbi5kaXIpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbihkaXJlY3Rpb24uZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheWVyTGV2ZWxVcDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGxldmVsRXhwID0gb2JqLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW29iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldO1xyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW29iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignZXhwJykgPiBvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbFRhYmxlJylbb2JqLmdldFBhcmFtZXRlcignbGV2ZWwnKV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdleHAnLCBvYmouZ2V0UGFyYW1ldGVyKCdleHAnKSAtIGxldmVsRXhwKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdsZXZlbCcsIG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJykgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJywgb2JqLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdsZXZlbCcsICdNQVgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVySGVhbHRoU3RhdHVzOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignaGVhbHRoJykgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYmxvb2QnKTtcclxuICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXJDb250cm9sbGVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXJDb250cm9sbGVyJylbMF07XHJcbiAgICAgICAgICAgICAgICBtb25zdGVyQ29udHJvbGxlci5zZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnLCBtb25zdGVyQ29udHJvbGxlci5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnKSArIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKys7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnNldFBhcmFtZXRlcignZXhwJywgcGxheWVyLmdldFBhcmFtZXRlcignZXhwJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdleHAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRSYW5nZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRNZWxlZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbWVsZWVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nKTtcclxuICAgICAgICAgICAgbWVsZWVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJywgbWVsZWVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zc0xvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBwbGF5ZXIucG9zKVswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyTG9naWMgOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5nZXREaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKSA8IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVSYW5nZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21idWxsZXQyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb25Ub1BsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9idWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHBsYXllci5wb3MpWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGlyZWN0aW9uVG9QbGF5ZXIuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyQnVsbGV0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpO1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXhwbG9zaW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGw7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCwgcG9zLnldKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24ubGVmdCA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big2NSk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi51cCA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big4Nyk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi5kb3duID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDgzKTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLnJpZ2h0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDY4KTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggLSAxICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24uZG93bikge1xyXG4gICAgICAgICAgICAgICAgcG9zLnkgPSBvYmoucG9zLnkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gb2JqLnBvcy55IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueCA9PSBwb3MueCAmJiBvYmoucG9zLnkgPT0gcG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcG9zKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBvcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFNwZWxsV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDQ5KSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICdmaXJlYmFsbCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big1MCkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAnZnJvc3RTaGFyZCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big1MSkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAndGVsZXBvcnQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvblBvd2VyVXAgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpICsgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2V4cCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdleHAnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN1bW1vbk9uQ29vbGRvd24gOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFByb3Blck1vbnN0ZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvc3MnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tIC09IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcgJiYgcmFuZG9tIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zczInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvc3MyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbSAtPSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvc3MyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZyAmJiByYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb29tZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvb21lcicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb20gLT0gb2JqLmdldFBhcmFtZXRlcignbW9uc3RlckJvb21lcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlckNvbmZpZyA9IGdldFByb3Blck1vbnN0ZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXIgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBtb25zdGVyLmdldFBhcmFtZXRlcignaGVhbHRoJykgKiAwLjc1ICogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91bml0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHJhbmRvbV90cmVlczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tUG9pbnRJbkFyZWEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIG9iai5zaXplWzBdKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLnNpemVbMV0pXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMudHJlZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygndHJlZScgKyAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSArIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy5zdG9uZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnc3RvbmVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qdmFyIHN0b25lID0gKi90aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvL3N0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICB0cmVlczogMTAwLFxyXG4gICAgICAgICAgICBzdG9uZXM6IDEwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9oZWFydDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdoZWFydCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3Rvcig1MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTU0LCA5MTgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbMTE1NCwgOTE4XV0sXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA0MDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fcG93ZXJ1cDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdwb3dlcnVwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbMTAwLCAxMDBdLCBbMTEwMCwgODUwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb29sZG93biA6IDExMDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX3RlcnJhaW46IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGdhdGVDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2dhdGUnKSxcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWc7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnd2FsbCcpO1xyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZy5wb3MgPSBbd2FsbENvbmZpZy5zaXplWzBdICogaSArIHdhbGxDb25maWcuc2l6ZVswXSAvIDIsIHdhbGxDb25maWcuc2l6ZVsxXS8yXTtcclxuICAgICAgICAgICAgICAgIHZhciB3YWxsID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdCh3YWxsQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIC8vc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2F0ZUNvbmZpZy5wb3MgPSBbd2FsbENvbmZpZy5wb3MueCArIHdhbGxDb25maWcuc2l6ZVswXS8gMiArIGdhdGVDb25maWcuc2l6ZVswXS8yLCAoZ2F0ZUNvbmZpZy5zaXplWzFdIC0gMykvMiBdO1xyXG4gICAgICAgICAgICB2YXIgZ2F0ZSA9IHRoaXMuY29udGV4dC5hZGRPYmplY3QoZ2F0ZUNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdvV2l0aFBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmouZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBweCA9IChwbGF5ZXIucG9zLnggKyBvYmoudHJhbnNsYXRlLngpIC8gMTAyNCAqIDEwMCxcclxuICAgICAgICAgICAgICAgIHB5ID0gKHBsYXllci5wb3MueSArIG9iai50cmFuc2xhdGUueSkgLyA3NjggKiAxMDA7XHJcblxyXG4gICAgICAgICAgICBpZiAocHggPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnggKz0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChweCA+IDcwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS54ID4gLSAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnggLT0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocHkgPCAyNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnkgKz0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChweSA+IDc1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS55ID4gLSAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHJhbnNsYXRlLnkgLT0gTWF0aC5yb3VuZChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzXG4gKiovIiwidmFyIG5hcmdzID0gL1xceyhbMC05YS16QS1aXSspXFx9L2dcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZykge1xuICAgIHZhciBhcmdzXG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHNbMV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgfVxuXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XG4gICAgICAgIGFyZ3MgPSB7fVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShuYXJncywgZnVuY3Rpb24gcmVwbGFjZUFyZyhtYXRjaCwgaSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdFxuXG4gICAgICAgIGlmIChzdHJpbmdbaW5kZXggLSAxXSA9PT0gXCJ7XCIgJiZcbiAgICAgICAgICAgIHN0cmluZ1tpbmRleCArIG1hdGNoLmxlbmd0aF0gPT09IFwifVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gYXJncy5oYXNPd25Qcm9wZXJ0eShpKSA/IGFyZ3NbaV0gOiBudWxsXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGNvdW50TW9uc3RlcktpbGxlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGtpbGxzOiBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCB8fCAwXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcisrKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGVhbHRoIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgaGVhbHRoOiBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0ucGFyYW1ldGVycy5oZWFsdGhcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsZXZlbCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbDogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSxcclxuICAgICAgICAgICAgICAgIGV4cDogcGxheWVyLmdldFBhcmFtZXRlcignZXhwJyksXHJcbiAgICAgICAgICAgICAgICBsZXZlbEV4cCA6IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5iZXN0VGltZSkgLyA2MCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlc3RTY29yZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5iZXN0U2NvcmVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG52YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgYmluZFBvc2l0aW9uVG9MYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueCAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPCBvYmoubGF5ZXIucG9zLngpIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueCA9IG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvcy54ICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3MueCArIG9iai5sYXllci5zaXplWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnggID0gb2JqLmxheWVyLnBvcy54ICArIG9iai5sYXllci5zaXplWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnkgLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIDwgb2JqLmxheWVyLnBvcy55KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnkgPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3MueSArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPiBvYmoubGF5ZXIucG9zLnkgKyBvYmoubGF5ZXIuc2l6ZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy55ID0gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlckxlYXZpbmdMYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueSA8IC0xMDAgfHwgb2JqLnBvcy55IC0gb2JqLnNwcml0ZS5zaXplWzFdIC0gMTAwPiBvYmoubGF5ZXIucG9zLnkgKyBvYmoubGF5ZXIuc2l6ZVsxXSB8fCBvYmoucG9zLnggLSBvYmouc3ByaXRlLnNpemVbMF0gLSAxMDA+IG9iai5sYXllci5wb3MueCArIG9iai5sYXllci5zaXplWzBdIHx8IG9iai5wb3MueCA8IC0xMDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXIucG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyQWR2YW5jZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIHBsYXllckRpcmVjdGlvbiA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgb2xkRGlyZWN0aW9uID0gb2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9sZERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgb2xkRGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJEaXJlY3Rpb24uZGlyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSBNYXRoLmFicyhNYXRoLm1pbihwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVlZCcpLCB1dGlscy5nZXREaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKSkgLSAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyTmV4dFBsYWNlID0gcGxheWVyRGlyZWN0aW9uLmdldERlc3RpbmF0aW9uKHBsYXllci5wb3MsIHNwZWVkKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25Ub1BsYXllck5leHRQbGFjZSA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllck5leHRQbGFjZSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2VWZWN0b3IgPSBkaXJlY3Rpb25Ub1BsYXllck5leHRQbGFjZS52ZWN0b3IuY2xvbmUoKS5ub3JtYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICBvbGREaXJlY3Rpb25WZWN0b3IgPSBvbGREaXJlY3Rpb24udmVjdG9yLmNsb25lKCkubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlyZWN0aW9uVmVjdG9yID0gZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2VWZWN0b3IuYWRkKG9sZERpcmVjdGlvblZlY3Rvcikubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgbmV3RGlyZWN0aW9uVmVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXdEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhbmRlcmVyQUkgOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKHRoaXMuY29udGV4dC5wb3MsIG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSkpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gdXRpbHMuZ2V0RGlzdGFuY2Uob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gb2JqLmdldFBhcmFtZXRlcignc2NlbnRSYW5nZScpKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzY2VudCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignc2NlbnRTcGVlZCcpKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJywgMCk7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXIucG9zKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdzcGVlZCcpKTtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTAwLCA4NTApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAob2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykgLSAxMDApICsgMTAwKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykgJiYgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHluYW1pY1pJbmRleDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbmV3WkluZGV4ID0gMDtcclxuICAgICAgICAgICAgb2JqLnBvcyAmJiAobmV3WkluZGV4ICs9IG9iai5wb3MueSk7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUgJiYgKG5ld1pJbmRleCArPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyKTtcclxuXHJcbiAgICAgICAgICAgIG9iai56SW5kZXggPSAob2JqLnBvcy55ID4gMCkgPyBNYXRoLnJvdW5kKG5ld1pJbmRleCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb2xsaXNpb25zOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25zID0gb2JqLnNldFBhcmFtZXRlcignY29sbGlzaW9ucycsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2VsbHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLmNvbGxpc2lvbnMudXBkYXRlT2JqZWN0KG9iaik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLmNvbGxpc2lvbnMudXBkYXRlT2JqZWN0KG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZVRvTW91c2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KTtcclxuXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25Ub01vdXNlID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpO1xyXG4gICAgICAgICAgICBvYmouc2V0UG9zaXRpb24obW91c2VQb3NpdGlvbi5jbG9uZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlT25Db29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGV4cGxvc2lvbk9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW29iai5wb3MueCwgb2JqLnBvcy55XSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgY29vbGRvd24gLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJTcHJpdGVEb25lOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYob2JqLnNwcml0ZS5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZUJ5RGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9ldGMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbMTMyNCwxMDY4XSxcclxuXHRcdGJhY2tncm91bmQ6ICd0ZXJyYWluJyxcclxuXHRcdGluaXRMaXN0IDogWydwbGF5ZXInLCAnY3Vyc29yJywgJ2NvdW50ZXInLCAndGltZXInLCAnYmVzdFRpbWUnLCAnZmlyZWJhbGxTcGVsbCcsICdmcm9zdFNoYXJkU3BlbGwnLCAndGVsZXBvcnRTcGVsbCcsICdiZXN0U2NvcmUnLCAnbGV2ZWwnLCdmb2cnLCAnbW9uc3RlckNvbnRyb2xsZXInXSxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG5cdFx0XHR0aGlzLnN0YXRlLnBhcmFtZXRlcnMuZ2FtZVRpbWVyID0gMDtcclxuXHRcdH0sXHJcblx0XHR0cmFuc2xhdGU6IHtcclxuXHRcdFx0eDogLTE1MCxcclxuXHRcdFx0eTogLTE1MFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3JhbmRvbV90cmVlcycgLCdzcGF3bl9oZWFydCcsJ3NwYXduX3Bvd2VydXAnLCAnZ29XaXRoUGxheWVyJ11cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9sYXllcnMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG4gICAgbW9uc3RlckNvbnRyb2xsZXIgOiB7XHJcbiAgICAgICAgcmVuZGVyIDogZmFsc2UsXHJcbiAgICAgICAgY29sbGlzaW9uczogZmFsc2UsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlckNvbnRyb2xsZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb25zdGVyQ29udHJvbGxlciddLFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgbW9uc3RlckNvdW50OiBbMTAsIDI1LCA1MCwgNzUsIDEwMCwgMTUwLCAyMDAsIDUwMCwgMTAwMCwgMjUwMCwgNTAwMCwgMTAwMDBdLFxyXG4gICAgICAgICAgICBtb25zdGVyQ29vbGRvd246IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9sb2dpYy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIG1vbnN0ZXJDb250cm9sbGVyIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScsIDEpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyT25XYXZlJywgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb3VudFsgb2JqLmdldFBhcmFtZXRlcignY3VycmVudFdhdmUnKSAtIDFdKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlcktpbGxlZCcsIDApO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyU3Bhd25lZCcsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRPbldhdmUgPSB0aGlzLmNvbnRleHQubGF5ZXIuYWRkT2JqZWN0KGdhbWVDb25maWdzLmdldENvbmZpZygnbGVmdE9uV2F2ZUxhYmVsJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3Bhd24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoNTAgLSBvYmoubGF5ZXIudHJhbnNsYXRlLngsIDUwIC0gb2JqLmxheWVyLnRyYW5zbGF0ZS55KTtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoOTAwIC0gb2JqLmxheWVyLnRyYW5zbGF0ZS54LCA2NTAgLSBvYmoubGF5ZXIudHJhbnNsYXRlLnkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1bW1vbkdhdGUgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3N1bW1vbkdhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdW1tb25HYXRlLnBvcyA9IG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICBzdW1tb25HYXRlLnBvcy54ID0gTWF0aC5taW4oMTEwMCwgTWF0aC5tYXgoNTAsIHN1bW1vbkdhdGUucG9zLngpKTtcclxuICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zLnkgPSBNYXRoLm1pbig5MDAsIE1hdGgubWF4KDUwLCBzdW1tb25HYXRlLnBvcy55KSk7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHN1bW1vbkdhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLmdldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnKSA8IG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJPbldhdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlU3Bhd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnLCBvYmouZ2V0UGFyYW1ldGVyKCdtb25zdGVyU3Bhd25lZCcpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gJiYgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdtb25zdGVyS2lsbGVkJykgPj0gb2JqLmdldFBhcmFtZXRlcignbW9uc3Rlck9uV2F2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY3VycmVudFdhdmUnLCBvYmouZ2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbW9uc3RlclNwYXduZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtb25zdGVyT25XYXZlJywgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb3VudFtvYmouZ2V0UGFyYW1ldGVyKCdjdXJyZW50V2F2ZScpIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnLCAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE9uV2F2ZS5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGhpcy5sZWZ0T25XYXZlLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKSwge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJLaWxsZWQnKSArICcvJyArIG9iai5nZXRQYXJhbWV0ZXIoJ21vbnN0ZXJPbldhdmUnKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb3VudDogWzEwLCAyNSwgNTAsIDc1LCAxMDAsIDE1MCwgMjAwLCA1MDAsIDEwMDAsIDI1MDAsIDUwMDAsIDEwMDAwXSxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiAxMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2xvZ2ljLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25aQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTs7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==