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
	            cooldown: 75
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
	            power: 50,
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
	        sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
	        size: [40, 45],
	        render: 'unit',
	        parameters: {
	            speed: 15,
	            cooldown: 200,
	            exp: 120,
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
	    leftOnWave: {
	        zIndex: 2000,
	        pos: [5, 100],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "LEFT ON THIS WAVE: {count}",
	            size: 14
	        }
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

	var _ui = __webpack_require__(14);

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

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var random = Math.random() * 100,
	                    player = obj.layer.getObjectsByType('player')[0],
	                    monsterConfig;

	                if (random <= obj.getParameter('chanceOfBoss2')) {
	                    monsterConfig = gameConfigs.getConfig('monsterBoss2');
	                } else if (random <= obj.getParameter('chanceOfBoss')) {
	                    monsterConfig = gameConfigs.getConfig('monsterBoss');
	                } else if (random <= obj.getParameter('chanceOfBoomer')) {
	                    monsterConfig = gameConfigs.getConfig('monsterBoomer');
	                } else {
	                    monsterConfig = gameConfigs.getConfig('monster');
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
	                var _config = gameConfigs.getConfig('tree');

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
	            trees: 40,
	            stones: 40
	        }
	    },
	    spawn_monster: {
	        init: function init() {
	            this.parameters.currentWave = 1;
	            this.parameters.monseterOnWave = this.parameters.waveMultiplier * this.parameters.currentWave;
	            this.parameters.monsterLeft = 0;
	            this.parameters.lastWaveMonsters = 0;
	            this.parameters.monsterSpawned = 0;
	            this.leftOnWave = this.context.addObject(gameConfigs.getConfig('leftOnWave'));
	        },
	        update: function update(dt, obj) {
	            this.parameters.monsterLeft = obj.state.parameters.monstersKilled - this.parameters.lastWaveMonsters;
	            if (this.parameters.monsterSpawned < this.parameters.waveMultiplier * this.parameters.currentWave) {
	                if (!this.parameters.currentMonsterCooldown) {
	                    var topLeft = new Victor(50, 50);
	                    var bottomRight = new Victor(1154, 918);
	                    var summonGate = gameConfigs.getConfig('summonGate');

	                    summonGate.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                    this.context.addObject(summonGate);

	                    this.parameters.monsterSpawned++;
	                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	                } else {
	                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
	                }
	            } else {
	                if (this.parameters.monsterLeft == this.parameters.monseterOnWave) {
	                    this.parameters.currentWave++;
	                    this.parameters.monsterSpawned = 0;
	                    this.parameters.monseterOnWave = this.parameters.waveMultiplier * this.parameters.currentWave;
	                    this.parameters.lastWaveMonsters = obj.state.parameters.monstersKilled;
	                }
	            }
	            this.leftOnWave.setParameter('text', (0, _stringTemplate2.default)(this.leftOnWave.getParameter('template'), {
	                count: this.parameters.monsterLeft + '/' + this.parameters.monseterOnWave
	            }));
	        },
	        parameters: {
	            area: [[50, 50], [1154, 918]],
	            waveMultiplier: 25,
	            monsterCooldown: 10
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
	            var obj = this.context,
	                gateConfig = gameConfigs.getConfig('gate'),
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
			size: [1224, 968],
			background: 'terrain',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level'],
			init: function init() {
				this.state.parameters.monstersKilled = 0;
				this.state.parameters.gameTimer = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUNvbmZpZ3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvY29uZmlncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3NwZWxscy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2V0Yy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9sYXllcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9iamVjdHMgZnJvbSAnLi9vYmplY3RzL2luZGV4JztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXMvaW5kZXgnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmZ1bmN0aW9uIGdldFJ1bGVDb25maWcoaWQpIHtcclxuICAgIHJldHVybiBydWxlc1tpZF1cclxufVxyXG5mdW5jdGlvbiBnZXRDb25maWcoaWQpIHtcclxuICAgIHZhciBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdHNbaWRdKSk7XHJcblxyXG4gICAgKCFjb25maWcuaWQpICYmIChjb25maWcuaWQgPSBpZCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufVxyXG5mdW5jdGlvbiBnZXRMYXllckNvbmZpZyhpZCkge1xyXG4gICAgcmV0dXJuIGxheWVyc1tpZF07XHJcbn1cclxuZXhwb3J0IHtcclxuICAgIGdldFJ1bGVDb25maWcsXHJcbiAgICBnZXRDb25maWcsXHJcbiAgICBnZXRMYXllckNvbmZpZ1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgc3BlbGxzIGZyb20gJy4vc3BlbGxzJztcclxuaW1wb3J0IHVuaXRzIGZyb20gJy4vdW5pdHMnO1xyXG5pbXBvcnQgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnO1xyXG5pbXBvcnQgdGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XHJcblxyXG52YXIgb2JqZWN0cyA9IHt9O1xyXG5cclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBzcGVsbHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBlZmZlY3RzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB1aSk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdGVycmFpbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9pbmRleC5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBmaXJlYmFsbFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogNTAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFswLCAwXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs0NzAsIDc0OF0sXHJcblxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGJ1bGxldHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnZmlyZWJhbGwnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDUwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbMjI0LCA5Nl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTEyLCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNoYXJkc0ZpcmVkOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnZnJvc3RTaGFyZCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDUwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbNjQsIDMyXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs1NTQsIDc0OF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAyMDAsXHJcbiAgICAgICAgICAgIHRlbGVwb3J0R2F0ZXMgOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsndGVsZXBvcnQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0R2F0ZToge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGU6IFsnYXJjYW5lR2F0ZScsIFswLCAwXSwgWzMyLCAzMl0sIDcsIFswLDFdXSxcclxuICAgICAgICBwb3MgOiBbNDY2LCA1ODBdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93bjogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBydWxlcyA6IFsncmVtb3ZlT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcblxyXG4gICAgYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydmaXJlYmFsbCcsWyAwLCAwXSwgWzMzLCAzM10sIDE2LCBbMCwgMSwgMiwgM11dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDI1XSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDQwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWydidWxsZXRNb25zdGVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZWZmZWN0cycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzUwMCwgNTAwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDUwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2hlcm8nLCBbMCwgMF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHBvcyA6IFs2MTIsIDQ4NF0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA1MCxcclxuICAgICAgICAgICAgc3BlbGxQb3dlcjogMSxcclxuICAgICAgICAgICAgbGV2ZWwgOiAxLFxyXG4gICAgICAgICAgICBleHA6IDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgY3VycmVudFNwZWxsOiAnZmlyZWJhbGwnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gOiB7fSxcclxuICAgICAgICAgICAgbGV2ZWxUYWJsZToge1xyXG4gICAgICAgICAgICAgICAgMSA6IDYwMCxcclxuICAgICAgICAgICAgICAgIDIgOiAxMjAwLFxyXG4gICAgICAgICAgICAgICAgMyA6IDIwMDAsXHJcbiAgICAgICAgICAgICAgICA0IDogMzAwMCxcclxuICAgICAgICAgICAgICAgIDUgOiA0NTAwLFxyXG4gICAgICAgICAgICAgICAgNiA6IDY1MDAsXHJcbiAgICAgICAgICAgICAgICA3IDogODAwMCxcclxuICAgICAgICAgICAgICAgIDggOiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIDkgOiAxNTAwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3BsYXllcicsXHJcbiAgICAgICAgY29uZGl0aW9uczogWydzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCddLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlV2l0aEtleWJvYXJkJywgJ3JvdGF0ZVRvTW91c2UnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdtb3ZlVG9EaXJlY3Rpb24nLCdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3BsYXllckxldmVsVXAnXVxyXG4gICAgfSxcclxuICAgIHN1bW1vbkdhdGU6IHtcclxuICAgICAgICB6SW5kZXggOiAwLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2FyY2FuZUdhdGUnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzI1LCAzMF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93bjogODAsXHJcbiAgICAgICAgICAgIGV4cDogMyxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzIDogMyxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzMiA6IDgsXHJcbiAgICAgICAgICAgIGNoYW5jZU9mQm9vbWVyIDogMjMsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc3VtbW9uT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2RlbW9ucycsIFswLCAxMjhdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzIwLDI4XSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDI1LFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDcwICxcclxuICAgICAgICAgICAgc2NlbnRTcGVlZDogMTIwLFxyXG4gICAgICAgICAgICBzY2VudFJhbmdlOiA2MDAsXHJcbiAgICAgICAgICAgIGV4cDogMTUsXHJcbiAgICAgICAgICAgIHdhbmRlckNvb2xkb3duOiA1MDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgaGVhbHRoIDogMjAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVUb0RpcmVjdGlvbicsICd3YW5kZXJlckFJJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21lbGVlQXR0YWNrJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0TWVsZWVDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvb21lciA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIHNwcml0ZTogWydkZW1vbnMnLCBbOTYsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTAwLFxyXG4gICAgICAgICAgICBleHAgOiAzMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAxMCxcclxuICAgICAgICAgICAgcG93ZXIgOiAxMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycsICdtb25zdGVyRXhwbG9zaW9uQ29uZGl0aW9uJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVRvRGlyZWN0aW9uJywgJ3JvdGF0ZUJ5UGxheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyQWR2YW5jZScsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zcyA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2JpZ01vbnN0ZXJzJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogNTAsXHJcbiAgICAgICAgICAgIGV4cCA6IDYwLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMCAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb25zdGVyQm9zc0xvZ2ljJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0UmFuZ2VDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zcycsIFswLCAwXSwgWzk2LCA0OF0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFs0MCwgNDVdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDE1LFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDIwMCAsXHJcbiAgICAgICAgICAgIGV4cDogMTIwLFxyXG4gICAgICAgICAgICBmaXJlUmFuZ2UgOiAzMDAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDUwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydzZXREaXJlY3Rpb25Ub1BsYXllcicsICdtb25zdGVyQm9zczJMb2dpYycsICdyb3RhdGVCeURpcmVjdGlvbicsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0UmFuZ2VDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgaGVhcnQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc2l6ZTogWzI1LCAyNV0sXHJcbiAgICAgICAgc3ByaXRlIDogWydwdW1wa2luJywgWzAsIDBdLCBbMzIsIDMyXSwgNSwgWzAsMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3dlcnVwIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgc2l6ZTogWzI1LCAyNV0sXHJcbiAgICAgICAgLy9yZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlIDogWydwb3dlclVwJywgWzAsIDBdLCBbNzIsIDY1XSwgMTUsIFswLCAxLCAyLCAxXV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgZXhwOiAyNTBcclxuICAgICAgICAgICAgLy9wb3dlciA6IDFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VuaXRzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIG1idWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZGFya2JsYXN0LnBuZycsWzAsIDBdLCBbMzgsIDM4XSwgMTIsIFswLCAxLCAyICwzXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1idWxsZXQyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zc1NwZWxsJyxbMCwgMF0sIFszMCwgMjZdLCAxMCwgWzAsIDEsIDJdXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFsyOCwgMjRdLFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJCb3NzMkJ1bGxldCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTUsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIGJsb29kIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgc3ByaXRlIDogWydtb25zdGVyQmxvb2QnLCBbMCwgMF0sIFszMiwgMTNdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgYmxvb2RTcHJheSA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnYmxvb2RFZmZlY3QnLCBbMCwgMF0sIFs2NCwgNjRdLCAxNSwgWzAsIDEsIDIsIDMsIDRdLCBudWxsLCB0cnVlLCAwLjc4NV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBleHBsb3Npb24gOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGU6IFsnZXhwbG9zaW9ucycsIFswLCAwXSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdLCBudWxsLCB0cnVlXSxcclxuICAgICAgICBydWxlczogWydkZXN0cm95QWZ0ZXJTcHJpdGVEb25lJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJFeHBsb3Npb24gOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFZmZlY3QnLFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJFeHBsb3Npb24nXSxcclxuICAgICAgICBzaXplIDogWzM5LCAzOV0sXHJcbiAgICAgICAgc3ByaXRlOiBbJ2V4cGxvc2lvbnMnLCBbMCwgMF0sIFszOSwgMzldLCAxNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdLCBudWxsLCB0cnVlXSxcclxuICAgICAgICBydWxlczogWydkZXN0cm95QWZ0ZXJTcHJpdGVEb25lJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIHRyZWUgOiB7XHJcbiAgICAgICAgc3ByaXRlIDogWyd0cmVlJywgWzAsIDBdLCBbNzYsIDc2XV0sXHJcbiAgICAgICAgc2l6ZSA6IFs3MCw3MF0sXHJcbiAgICAgICAgcnVsZXM6IFsnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgc3RvbmVzIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlIDogWydzdG9uZScsIFswLCAwXSwgWzI1LCAyMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsMjJdLFxyXG4gICAgICAgIHJ1bGVzIDogWydkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBjdXJzb3IgOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICByZW5kZXI6ICdjdXJzb3InLFxyXG4gICAgICAgIHBvczogWzQwMCwzNTBdLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnY3Vyc29yJywgWzAsIDBdLCBbMzAsIDMwXV0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmluZFBvc2l0aW9uVG9Nb3VzZSddXHJcbiAgICB9LFxyXG4gICAgY291bnRlcjoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiU0NPUkU6IHtraWxsc31cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydjb3VudE1vbnN0ZXJLaWxsZWQnXVxyXG4gICAgfSxcclxuICAgIGxlZnRPbldhdmU6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHBvczogWzUsIDEwMF0sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJMRUZUIE9OIFRISVMgV0FWRToge2NvdW50fVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbGV2ZWw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHBvczogWzM1LCA0NV0sXHJcbiAgICAgICAgcmVuZGVyIDogXCJleHBCYXJcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIkxFVkVMOiB7bGV2ZWx9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnbGV2ZWwnXVxyXG4gICAgfSxcclxuICAgIHRpbWVyOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBwb3M6IFs1LCAyM10sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJUSU1FUjoge3RpbWV9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsndGltZXInXVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lOiB7XHJcbiAgICAgICAgcG9zOiBbNSwgMzcwXSxcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydiZXN0VGltZSddXHJcbiAgICB9LFxyXG4gICAgYmVzdFNjb3JlOiB7XHJcbiAgICAgICAgcG9zOiBbNSwgMzgwXSxcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFNDT1JFOiB7c2NvcmV9XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Jlc3RTY29yZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgbGF5ZXJzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdWkpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBldGMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ2ZpcmViYWxsJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSA9IDEwICogKHNwZWxsUG93ZXIgLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREZWdyZWUgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicpICsgMyAqIChzcGVsbFBvd2VyIC0gMSkgPiAzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicpICsgNSAqIChzcGVsbFBvd2VyIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIGRlc3RpbmF0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYnVsbGV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gcGxheWVyLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNldFBhcmFtZXRlcigncG93ZXInLCBidWxsLmdldFBhcmFtZXRlcigncG93ZXInKSArIDUgKiAoc3BlbGxQb3dlciAtIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2xvd0VuZW1pZXMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcGVlZCA9IG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdzcGVlZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3dlciA9IG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdHMgPSBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignZWZmZWN0cycpIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPCBwb3dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlZWQnLCBzcGVlZCAtIHBvd2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlZmZlY3RzLmluZGV4T2YoJ2Zyb3plbicpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdHMucHVzaCgnZnJvemVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpID09ICd0ZWxlcG9ydCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIuaXNEb3duIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcmVDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW91c2UgID0gbmV3IHV0aWxzLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZS54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2UueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIG1vdXNlLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyID0gcGxheWVyLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBkaXJlY3Rpb24uZ2V0RGVzdGluYXRpb24ocGxheWVyLnBvcywgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29sZG93biA9IG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duKSAtICgzMCAqIChzcGVsbFBvd2VyIC0gMSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IHBsYXllci5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZSA9IGdhbWVDb25maWdzLmdldENvbmZpZygndGVsZXBvcnRHYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSBkZXN0aW5hdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdCh0ZWxlcG9ydEdhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNldFBvc2l0aW9uKGRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgKGNvb2xkb3duID4gNTApID8gY29vbGRvd24gOiA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFBhcmFtZXRlcignY3VycmVudFNwZWxsJykgPT0gJ2Zyb3N0U2hhcmQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyb3N0U2hhcmQgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Zyb3N0U2hhcmQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXIgPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IG1vdXNlUG9zaXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLnggLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi55IC09IG9iai5sYXllci50cmFuc2xhdGUueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb3N0U2hhcmQucG9zID0gZGVzdGluYXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGVsbFBvd2VyQm9vc3QgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzcGVsbFBvd2VyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsUG93ZXJCb29zdCArPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZzID0gb2JqLmxheWVyLmFkZE9iamVjdChmcm9zdFNoYXJkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBmcy5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykgKyBzcGVsbFBvd2VyQm9vc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1bGxldE1vbnN0ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsb29kID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdibG9vZFNwcmF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqZWN0c1tpXS5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MueCArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy55ICs9IC0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXJEZWF0aDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5zaG93UmVzdGFydE1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95T25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDwgb2JqZWN0c1tpXS5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykgPD0gb2JqZWN0c1tpXS5nZXREZWZhdWx0UGFyYW1ldGVyKCdoZWFsdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lbGVlQXR0YWNrIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Jsb29kU3ByYXknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqZWN0c1tpXS5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnggKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnkgKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2V4cGxvZGVkJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZXhwbG9kZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uQ29uZGl0aW9uIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVFeHBsb3Npb25zKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGw7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54IC0gb2JqLnNpemVbMF0sIHBvcy55IC0gb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCArIG9iai5zaXplWzBdLCBwb3MueSAtIG9iai5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggLSBvYmouc2l6ZVswXSwgcG9zLnkgKyBvYmouc2l6ZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54ICsgb2JqLnNpemVbMF0sIHBvcy55ICsgb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCAtIDMgLyAyICogb2JqLnNpemVbMF0sIHBvcy55XSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggKyAzIC8gMiAqIG9iai5zaXplWzBdLCBwb3MueV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlRXhwbG9zaW9ucygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRXhwbG9zaW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldFNwZWVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignc3BlZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0RWZmZWN0cyA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2VmZmVjdHMnKS5zcGxpY2UoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVUb0RpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiAmJiBkaXJlY3Rpb24uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGlyZWN0aW9uLmdldERlc3RpbmF0aW9uKG9iai5wb3MsIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXllckxldmVsVXA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbEV4cCA9IG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXTtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpID4gb2JqLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW29iai5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZXhwJywgb2JqLmdldFBhcmFtZXRlcignZXhwJykgLSBsZXZlbEV4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCBvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlbGxQb3dlcicsIG9iai5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbGV2ZWwnLCAnTUFYJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQrKztcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0UGFyYW1ldGVyKCdleHAnLCBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdleHAnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldFJhbmdlQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldE1lbGVlQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBtZWxlZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicpO1xyXG4gICAgICAgICAgICBtZWxlZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nLCBtZWxlZUNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcbiAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgIHZhclx0YnVsbGV0Q29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHBsYXllci5wb3MpWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zczJMb2dpYyA6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25Ub1BsYXllciA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmdldERpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpIDwgb2JqLmdldFBhcmFtZXRlcignZmlyZVJhbmdlJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbWJ1bGxldDInKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIGRpcmVjdGlvblRvUGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2J1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgcGxheWVyLnBvcylbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbihkaXJlY3Rpb25Ub1BsYXllci5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmouZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zczJCdWxsZXQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVFeHBsb3Npb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gb2JqLnBvcy5jbG9uZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICBwb3dlciA9IG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbDtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54LCBwb3MueV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0ge307XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi5sZWZ0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDY1KTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLnVwID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDg3KTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLmRvd24gPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oODMpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24ucmlnaHQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oNjgpO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3MueCA9IG9iai5wb3MueCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3MueCA9IG9iai5wb3MueCAtIDEgICA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5kb3duKSB7XHJcbiAgICAgICAgICAgICAgICBwb3MueSA9IG9iai5wb3MueSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi51cCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnkgPSBvYmoucG9zLnkgLSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvcy54ID09IHBvcy54ICYmIG9iai5wb3MueSA9PSBwb3MueSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJykuZGlyID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwb3MpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcG9zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0U3BlbGxXaXRoS2V5Ym9hcmQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oNDkpKSAmJiAob2JqLnNldFBhcmFtZXRlcignY3VycmVudFNwZWxsJywgJ2ZpcmViYWxsJykpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDUwKSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICdmcm9zdFNoYXJkJykpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDUxKSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICd0ZWxlcG9ydCcpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vYmplY3RzW2ldLnNldFBhcmFtZXRlcignc3BlbGxQb3dlcicsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignZXhwJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2V4cCcpICsgb2JqLmdldFBhcmFtZXRlcignZXhwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3VtbW9uT25Db29sZG93biA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb3NzMicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvc3MyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmRvbSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJCb3NzJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmRvbSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvb21lcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvb21lcicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXIgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBtb25zdGVyLmdldFBhcmFtZXRlcignaGVhbHRoJykgKiAwLjc1ICogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91bml0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHJhbmRvbV90cmVlczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tUG9pbnRJbkFyZWEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIG9iai5zaXplWzBdKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLnNpemVbMV0pXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMudHJlZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygndHJlZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnN0b25lczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdzdG9uZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyp2YXIgc3RvbmUgPSAqL3RoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIC8vc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIHRyZWVzOiA0MCxcclxuICAgICAgICAgICAgc3RvbmVzOiA0MFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9tb25zdGVyOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50V2F2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zZXRlck9uV2F2ZSA9IHRoaXMucGFyYW1ldGVycy53YXZlTXVsdGlwbGllciAqICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubGFzdFdhdmVNb25zdGVycyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE9uV2F2ZSA9IHRoaXMuY29udGV4dC5hZGRPYmplY3QoZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdsZWZ0T25XYXZlJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPSAob2JqLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgLSB0aGlzLnBhcmFtZXRlcnMubGFzdFdhdmVNb25zdGVycyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCB0aGlzLnBhcmFtZXRlcnMud2F2ZU11bHRpcGxpZXIgKiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRXYXZlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTU0LCA5MTgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdW1tb25HYXRlID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdzdW1tb25HYXRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zID0gbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChzdW1tb25HYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gJiYgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPT0gdGhpcy5wYXJhbWV0ZXJzLm1vbnNldGVyT25XYXZlICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zZXRlck9uV2F2ZSA9IHRoaXMucGFyYW1ldGVycy53YXZlTXVsdGlwbGllciAqICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sYXN0V2F2ZU1vbnN0ZXJzID0gb2JqLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sZWZ0T25XYXZlLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0aGlzLmxlZnRPbldhdmUuZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpLCB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJMZWZ0ICsgJy8nICsgdGhpcy5wYXJhbWV0ZXJzLm1vbnNldGVyT25XYXZlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbMTE1NCAsIDkxOF1dLFxyXG4gICAgICAgICAgICB3YXZlTXVsdGlwbGllcjogMjUsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb29sZG93bjogMTBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25faGVhcnQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnaGVhcnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoNTAsIDUwKTtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTE1NCwgOTE4KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbNTAsIDUwXSwgWzExNTQsIDkxOF1dLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNDAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX3Bvd2VydXA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygncG93ZXJ1cCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b3BMZWZ0ID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExMDAsIDg1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzEwMCwgMTAwXSwgWzExMDAsIDg1MF1dLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29vbGRvd24gOiAxMTAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTEwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl90ZXJyYWluOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBnYXRlQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdnYXRlJyksXHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3dhbGwnKTtcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWcucG9zID0gW3dhbGxDb25maWcuc2l6ZVswXSAqIGkgKyB3YWxsQ29uZmlnLnNpemVbMF0gLyAyLCB3YWxsQ29uZmlnLnNpemVbMV0vMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FsbCA9IHRoaXMuY29udGV4dC5hZGRPYmplY3Qod2FsbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvL3N0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhdGVDb25maWcucG9zID0gW3dhbGxDb25maWcucG9zLnggKyB3YWxsQ29uZmlnLnNpemVbMF0vIDIgKyBnYXRlQ29uZmlnLnNpemVbMF0vMiwgKGdhdGVDb25maWcuc2l6ZVsxXSAtIDMpLzIgXTtcclxuICAgICAgICAgICAgdmFyIGdhdGUgPSB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGdhdGVDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnb1dpdGhQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgcHggPSAocGxheWVyLnBvcy54ICsgb2JqLnRyYW5zbGF0ZS54KSAvIDEwMjQgKiAxMDAsXHJcbiAgICAgICAgICAgICAgICBweSA9IChwbGF5ZXIucG9zLnkgKyBvYmoudHJhbnNsYXRlLnkpIC8gNzY4ICogMTAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHB4IDwgMzApIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnRyYW5zbGF0ZS54ICs9IE1hdGgucm91bmQocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHggPiA3MCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueCA+IC0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnRyYW5zbGF0ZS54IC09IE1hdGgucm91bmQocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHB5IDwgMjUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnRyYW5zbGF0ZS55ICs9IE1hdGgucm91bmQocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHkgPiA3NSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai50cmFuc2xhdGUueSA+IC0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnRyYW5zbGF0ZS55IC09IE1hdGgucm91bmQocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2xheWVycy5qc1xuICoqLyIsInZhciBuYXJncyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHJpbmcpIHtcbiAgICB2YXIgYXJnc1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIH1cblxuICAgIGlmICghYXJncyB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSkge1xuICAgICAgICBhcmdzID0ge31cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobmFyZ3MsIGZ1bmN0aW9uIHJlcGxhY2VBcmcobWF0Y2gsIGksIGluZGV4KSB7XG4gICAgICAgIHZhciByZXN1bHRcblxuICAgICAgICBpZiAoc3RyaW5nW2luZGV4IC0gMV0gPT09IFwie1wiICYmXG4gICAgICAgICAgICBzdHJpbmdbaW5kZXggKyBtYXRjaC5sZW5ndGhdID09PSBcIn1cIikge1xuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyZ3MuaGFzT3duUHJvcGVydHkoaSkgPyBhcmdzW2ldIDogbnVsbFxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBjb3VudE1vbnN0ZXJLaWxsZWQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBraWxsczogb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRpbWVyIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5nYW1lVGltZXIrKykgLyA2MCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhlYWx0aCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aDogb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbGV2ZWwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWw6IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsJyksXHJcbiAgICAgICAgICAgICAgICBleHA6IHBsYXllci5nZXRQYXJhbWV0ZXIoJ2V4cCcpLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxFeHAgOiBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbFRhYmxlJylbcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKV1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIHRpbWU6ICgob2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMuYmVzdFRpbWUpIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0U2NvcmUgOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzY29yZTogb2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMuYmVzdFNjb3JlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91aS5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGJpbmRQb3NpdGlvblRvTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnggLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDwgb2JqLmxheWVyLnBvcy54KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnggPSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3MueCArIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPiBvYmoubGF5ZXIucG9zLnggKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy54ICA9IG9iai5sYXllci5wb3MueCAgKyBvYmoubGF5ZXIuc2l6ZVswXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvcy55IC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3MueSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy55ID0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zLnkgKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyID4gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueSA9IG9iai5sYXllci5wb3MueSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zLnkgPCAtMTAwIHx8IG9iai5wb3MueSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAtIDEwMD4gb2JqLmxheWVyLnBvcy55ICsgb2JqLmxheWVyLnNpemVbMV0gfHwgb2JqLnBvcy54IC0gb2JqLnNwcml0ZS5zaXplWzBdIC0gMTAwPiBvYmoubGF5ZXIucG9zLnggKyBvYmoubGF5ZXIuc2l6ZVswXSB8fCBvYmoucG9zLnggPCAtMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllckFkdmFuY2U6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJEaXJlY3Rpb24gPSBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvbGREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyRGlyZWN0aW9uLmRpciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXIucG9zKSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwZWVkID0gTWF0aC5hYnMoTWF0aC5taW4ocGxheWVyLmdldFBhcmFtZXRlcignc3BlZWQnKSwgdXRpbHMuZ2V0RGlzdGFuY2Uob2JqLnBvcywgcGxheWVyLnBvcykpIC0gMTApLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllck5leHRQbGFjZSA9IHBsYXllckRpcmVjdGlvbi5nZXREZXN0aW5hdGlvbihwbGF5ZXIucG9zLCBzcGVlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2UgPSBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXJOZXh0UGxhY2UpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlVmVjdG9yID0gZGlyZWN0aW9uVG9QbGF5ZXJOZXh0UGxhY2UudmVjdG9yLmNsb25lKCkubm9ybWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkRGlyZWN0aW9uVmVjdG9yID0gb2xkRGlyZWN0aW9uLnZlY3Rvci5jbG9uZSgpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpcmVjdGlvblZlY3RvciA9IGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlVmVjdG9yLmFkZChvbGREaXJlY3Rpb25WZWN0b3IpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIG5ld0RpcmVjdGlvblZlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YW5kZXJlckFJIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExMDAsIDg1MCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBuZXcgdXRpbHMuTGluZSh0aGlzLmNvbnRleHQucG9zLCBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHV0aWxzLmdldERpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ3NjZW50UmFuZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc2NlbnQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3NjZW50U3BlZWQnKSk7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicsIDApO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignc3BlZWQnLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignc3BlZWQnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3R0b21SaWdodCA9IG5ldyBWaWN0b3IoMTEwMCwgODUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJywgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpIC0gMTAwKSArIDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouZ2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpICYmIG9iai5zZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGR5bmFtaWNaSW5kZXg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5ld1pJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG9iai5wb3MgJiYgKG5ld1pJbmRleCArPSBvYmoucG9zLnkpO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlICYmIChuZXdaSW5kZXggKz0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMik7XHJcblxyXG4gICAgICAgICAgICBvYmouekluZGV4ID0gKG9iai5wb3MueSA+IDApID8gTWF0aC5yb3VuZChuZXdaSW5kZXgpIDogMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29sbGlzaW9uczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9ucyA9IG9iai5zZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnLCBbXSk7XHJcblxyXG4gICAgICAgICAgICBjb2xsaXNpb25zLmNlbGxzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKS5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVUb01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gID0gbmV3IHV0aWxzLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSk7XHJcblxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbi54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24ueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uVG9Nb3VzZSA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZS5yb3RhdGVUb0RpcmVjdGlvbihkaXJlY3Rpb25Ub01vdXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmluZFBvc2l0aW9uVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBuZXcgdXRpbHMuUG9pbnQob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLngsIG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci55KTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKG1vdXNlUG9zaXRpb24uY2xvbmUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZU9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgY29vbGRvd24gLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJTcHJpdGVEb25lOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYob2JqLnNwcml0ZS5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZUJ5RGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9ldGMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbMTIyNCw5NjhdLFxyXG5cdFx0YmFja2dyb3VuZDogJ3RlcnJhaW4nLFxyXG5cdFx0aW5pdExpc3QgOiBbJ3BsYXllcicsICdjdXJzb3InLCAnY291bnRlcicsICd0aW1lcicsICdiZXN0VGltZScsICdmaXJlYmFsbFNwZWxsJywgJ2Zyb3N0U2hhcmRTcGVsbCcsICd0ZWxlcG9ydFNwZWxsJywgJ2Jlc3RTY29yZScsICdsZXZlbCddLFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCA9IDA7XHJcblx0XHRcdHRoaXMuc3RhdGUucGFyYW1ldGVycy5nYW1lVGltZXIgPSAwO1xyXG5cdFx0fSxcclxuXHRcdHRyYW5zbGF0ZToge1xyXG5cdFx0XHR4OiAtMTAwLFxyXG5cdFx0XHR5OiAtMTAwXHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnc3Bhd25fbW9uc3RlcicsICdyYW5kb21fdHJlZXMnICwnc3Bhd25faGVhcnQnLCdzcGF3bl9wb3dlcnVwJywgJ2dvV2l0aFBsYXllciddXHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvbGF5ZXJzLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBR0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTs7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==