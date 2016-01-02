var configs =
webpackJsonp_name_([1,3],[
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

	var _resources = __webpack_require__(15);

	var _resources2 = _interopRequireDefault(_resources);

	var _layers = __webpack_require__(16);

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
	        sprite: ['img/spellicons.png', [0, 0], [32, 32]],
	        pos: [470, 748],

	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            bulletsFired: 0,
	            cooldown: 10,
	            fireCooldown: 10
	        },
	        type: 'spell',
	        rules: ['fireball']
	    },
	    frostShardSpell: {
	        zIndex: 2000,
	        sprite: ['img/spellicons.png', [224, 96], [32, 32]],
	        pos: [512, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            shardsFired: 0,
	            cooldown: 50,
	            fireCooldown: 50
	        },
	        type: 'spell',
	        rules: ['frostShard']
	    },
	    teleportSpell: {
	        zIndex: 2000,
	        sprite: ['img/spellicons.png', [64, 32], [32, 32]],
	        pos: [554, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            power: 200,
	            teleportGates: 0,
	            cooldown: 200,
	            fireCooldown: 200
	        },
	        type: 'spell',
	        rules: ['teleport']
	    },
	    teleportGate: {
	        zIndex: 0,
	        render: 'object',
	        sprite: ['img/spell.png', [0, 0], [32, 32], 7, [0, 1]],
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
	    frostShard: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['img/effects.png', [96, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'spellElement',
	        size: [120, 120],
	        parameters: {
	            power: 35,
	            cooldown: 100
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
	        zIndex: 2,
	        sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
	        pos: [512, 384],
	        size: [25, 32],
	        render: 'unit',
	        collisions: true,
	        parameters: {
	            speed: 150,
	            health: 50,
	            spellPower: 1,
	            effects: [],
	            currentSpell: 'fireball',
	            direction: {}
	        },
	        type: 'player',
	        rules: ['moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'selectSpellWithKeyboard', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
	    },
	    monster: {
	        zIndex: 1,
	        sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 35,
	            cooldown: 70,
	            effects: [],
	            meleeCooldown: 70,
	            health: 20,
	            power: 5
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetMeleeCooldown']
	    },
	    monsterBoomer: {
	        zIndex: 1,
	        sprite: ['img/demons.png', [96, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 100,
	            effects: [],
	            health: 10,
	            power: 10
	        },
	        conditions: ['monsterHealthStatus', 'setDirectionToPlayerAdvance', 'monsterExplosionCondition'],
	        type: 'monster',
	        rules: ['moveToDirection', 'rotateByPlayer', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
	    },
	    monsterBoss: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
	        size: [25, 40],
	        render: 'unit',
	        parameters: {
	            speed: 30,
	            cooldown: 200,
	            fireCooldown: 200,
	            power: 10,
	            health: 30,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    heart: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
	        conditions: ['triggerOnPlayerCollision'],
	        parameters: {
	            health: 10
	        }
	    },
	    powerup: {
	        zIndex: 2,
	        size: [25, 25],
	        //render: 'object',
	        collisions: true,
	        sprite: ['img/powerup2.png', [0, 0], [72, 65]],
	        conditions: ['triggerOnPlayerCollisionPowerUp'],
	        parameters: {
	            power: 1
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
	        sprite: ['img/effects.png', [288, 128], [32, 32], 10, [0, 1, 2]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [32, 32],
	        parameters: {
	            power: 1,
	            speed: 100
	        },
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision', 'dynamicZIndex']
	    },
	    blood: {
	        zIndex: 2,
	        sprite: ['img/sblood.png', [0, 0], [32, 13]],
	        parameters: {
	            cooldown: 500
	        },
	        rules: ['removeOnCooldown']
	    },
	    bloodSpray: {
	        zIndex: 2,
	        sprite: ['img/bloods.png', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
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
	        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    },
	    monsterExplosion: {
	        render: 'object',
	        collisions: true,
	        type: 'spellEffect',
	        conditions: ['monsterExplosion'],
	        size: [39, 39],
	        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
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
	        sprite: ['img/tree.png', [0, 0], [76, 76]],
	        size: [70, 70],
	        rules: ['dynamicZIndex']
	    },
	    wall: {
	        sprite: ['img/wall2.png', [0, 0], [48, 64]],
	        size: [48, 64]
	    },
	    gate: {
	        sprite: ['img/gates2.png', [0, 0], [96, 65]],
	        size: [96, 65]
	    },
	    stones: {
	        render: 'object',
	        sprite: ['img/stones.png', [0, 0], [18, 22]],
	        size: [18, 22],
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
	        zIndex: 999,
	        pos: [400, 350],
	        sprite: ['img/cursor.png', [0, 0], [30, 30]],
	        rules: ['bindPositionToMouse']
	    },
	    counter: {
	        zIndex: 910,
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
	    timer: {
	        zIndex: 910,
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
	    bestScore: {
	        pos: [5, 380],
	        zIndex: 900,
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

	var _units = __webpack_require__(10);

	var _units2 = _interopRequireDefault(_units);

	var _layers = __webpack_require__(11);

	var _layers2 = _interopRequireDefault(_layers);

	var _ui = __webpack_require__(12);

	var _ui2 = _interopRequireDefault(_ui);

	var _etc = __webpack_require__(14);

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
	            var player = obj.layer.getObjectsByType('player')[0];
	            if (player.parameters.currentSpell == 'fireball') {
	                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
	                    if (obj.parameters.fireCooldown == 0) {
	                        var createBullet = function createBullet(direction, destination) {
	                            var bulletConfig = obj.layer.game.getConfig('bullet');
	                            bulletConfig.pos = _utils2.default.clone(player.pos);
	                            bulletConfig.parameters.direction = direction;
	                            bulletConfig.parameters.power += 5 * (player.parameters.spellPower - 1);

	                            var bull = obj.layer.addObject(bulletConfig);
	                            bull.sprite.setDegree(_utils2.default.getDegree(player.pos, destination)[0]);
	                        };

	                        var mousePosition = obj.layer.game.mouse.getMousePosition(),
	                            destination = mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1],
	                            startDegree = 10 * (player.parameters.spellPower - 1);

	                        for (var i = 0; i < player.parameters.spellPower; i++) {
	                            var direction = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));

	                            createBullet(direction, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));
	                            startDegree -= 20;
	                        }
	                        if (obj._parameters.cooldown + 5 * (player.parameters.spellPower - 1) > 30) {
	                            obj.parameters.cooldown = 30;
	                        } else {
	                            obj.parameters.cooldown = obj._parameters.cooldown + 5 * (player.parameters.spellPower - 1);
	                        }

	                        obj.parameters.fireCooldown = obj.parameters.cooldown;
	                    }
	                }
	            }
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	        }

	    },
	    slowEnemies: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'monster') {
	                    if (objects[i].parameters.speed < obj.parameters.power) {
	                        objects[i].parameters.speed = 0;
	                    } else {
	                        objects[i].parameters.speed -= obj.parameters.power;
	                    }
	                    if (objects[i].parameters.effects.indexOf('frozen') == -1) {
	                        objects[i].parameters.effects.push('frozen');
	                    }
	                }
	            }
	        }
	    },
	    teleport: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (player.parameters.currentSpell == 'teleport') {
	                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
	                    if (obj.parameters.fireCooldown == 0) {
	                        var mousePosition = obj.layer.game.mouse.getMousePosition(),
	                            direction = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1], 0)),
	                            destination = _utils2.default.getDestination(player.pos, direction, obj.parameters.power);

	                        var teleportGate = obj.layer.game.getConfig('teleportGate');
	                        teleportGate.pos = _utils2.default.clone(player.pos);

	                        obj.layer.addObject(teleportGate);

	                        var teleportGate = obj.layer.game.getConfig('teleportGate');
	                        teleportGate.pos = _utils2.default.clone(destination);

	                        obj.layer.addObject(teleportGate);

	                        player.setPosition(destination);

	                        var cooldown = obj._parameters.cooldown - 30 * (player.parameters.spellPower - 1);

	                        obj.parameters.cooldown = cooldown > 50 ? cooldown : 50;

	                        obj.parameters.fireCooldown = obj.parameters.cooldown;
	                    }
	                }
	            }
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	        }
	    },
	    frostShard: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (player.parameters.currentSpell == 'frostShard') {
	                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
	                    if (obj.parameters.fireCooldown == 0) {
	                        var frostShard = obj.layer.game.getConfig('frostShard'),
	                            mousePosition = obj.layer.game.mouse.getMousePosition(),
	                            destination = mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1];

	                        frostShard.pos = _utils2.default.clone(destination);

	                        var spellPowerBoost = 0;

	                        for (var i = 1; i < player.parameters.spellPower; i++) {
	                            spellPowerBoost += 50;
	                        }

	                        frostShard.parameters.cooldown += spellPowerBoost;

	                        obj.layer.addObject(frostShard);

	                        obj.parameters.fireCooldown = obj.parameters.cooldown;
	                    }
	                }
	            }
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	        }
	    },
	    bulletMonsterCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'monster') {
	                    objects[i].parameters.health -= obj.parameters.power;

	                    var blood = obj.layer.game.getConfig('bloodSpray');
	                    blood.pos = _utils2.default.clone(objects[i].pos);
	                    blood.pos[0] += 2;
	                    blood.pos[1] += -10;
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

	function getSpeed(start, destination, line) {
	    if (line.k == 'vert') {
	        return (destination[1] - start[1]) / line.dir;
	    } else {
	        return (destination[1] - start[1]) * Math.sqrt(Math.pow(line.k, 2) + 1) / line.dir;
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
	    return [x, y];
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
	    if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') return obj;

	    var temp = obj.constructor(); // changed

	    for (var key in obj) {
	        temp[key] = clone(obj[key]);
	    }return temp;
	}

	exports.default = {
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
	    getPointOfInterception: getPointOfInterception, getPointOfInterception: getPointOfInterception,
	    getDegreeBetweenDirections: getDegreeBetweenDirections,
	    clone: clone,
	    'getMovedPointByDegree': getMovedPointByDegree
	};

/***/ },
/* 10 */
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

	                        var blood = obj.layer.game.getConfig('bloodSpray');
	                        blood.pos = _utils2.default.clone(objects[i].pos);
	                        blood.pos[0] += 2;
	                        blood.pos[1] += -10;
	                        obj.layer.addObject(blood);

	                        obj.parameters.meleeCooldown = obj.parameters.cooldown;
	                        break;
	                    }
	                }
	            }
	        }
	    },
	    monsterExplosion: {
	        update: function update(dt, obj) {
	            if (!obj.parameters.exploded) {
	                var objects = obj.parameters.collisions;
	                for (var i = 0, l = objects.length; i < l; i++) {
	                    if (objects[i].parameters.health) {
	                        objects[i].parameters.health -= obj.parameters.power;
	                        break;
	                    }
	                }

	                obj.parameters.exploded = true;
	            }
	        }
	    },

	    monsterExplosionCondition: {
	        update: function update(dt, obj) {
	            function generateExplosions() {
	                var pos = obj.pos,
	                    explosionConfig,
	                    expl;

	                obj._removeInNextTick = true;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] - obj.size[0], pos[1] - obj.size[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] + obj.size[0], pos[1] - obj.size[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] - obj.size[0], pos[1] + obj.size[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] + obj.size[0], pos[1] + obj.size[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] - 3 / 2 * obj.size[0], pos[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;

	                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
	                explosionConfig.pos = [pos[0] + 3 / 2 * obj.size[0], pos[1]];
	                expl = obj.layer.addObject(explosionConfig);
	                expl.parameters.power = obj.parameters.power;
	            }

	            if (obj.parameters.health <= 0) {
	                generateExplosions();
	            } else {
	                var objects = obj.parameters.collisions;
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
	            var objects = obj.parameters.collisions;

	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'player') {
	                    obj.parameters.speed = 0;
	                    break;
	                }
	            }
	        }
	    },
	    resetSpeed: {
	        update: function update(dt, obj) {
	            obj.parameters.speed = obj._parameters.speed;
	        }
	    },
	    resetEffects: {
	        update: function update(dt, obj) {
	            obj.parameters.effects.splice(0);
	        }
	    },
	    moveToDirection: {
	        update: function update(dt, obj) {
	            if (obj.parameters.direction && obj.parameters.direction.dir) {
	                obj.setPosition(_utils2.default.getDestination(obj.pos, obj.parameters.direction, Math.round(obj.parameters.speed * dt)));
	            }
	        }
	    },
	    monsterHealthStatus: {
	        update: function update(dt, obj) {
	            if (obj.parameters.health <= 0) {
	                obj._removeInNextTick = true;

	                var explosionConfig = obj.layer.game.getConfig('explosion');
	                explosionConfig.pos = obj.pos;

	                obj.layer.addObject(explosionConfig);

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
	    resetRangeCooldown: {
	        update: function update(dt, obj) {
	            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	        }
	    },
	    resetMeleeCooldown: {
	        update: function update(dt, obj) {
	            obj.parameters.meleeCooldown && obj.parameters.meleeCooldown--;
	        }
	    },
	    monsterBossLogic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];
	            if (obj.parameters.fireCooldown == 0) {
	                var bulletConfig = obj.layer.game.getConfig('mbullet'),
	                    direction = _utils2.default.getDirection(obj.pos, player.pos);

	                bulletConfig.pos = _utils2.default.clone(obj.pos);

	                bulletConfig.parameters.direction = direction;
	                var bull = obj.layer.addObject(bulletConfig);

	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, player.pos)[0]);

	                obj.parameters.fireCooldown = obj.parameters.cooldown;
	            }
	        }
	    },
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            var pos = _utils2.default.clone(obj.pos);

	            obj.parameters.direction.left = obj.layer.game.input.isDown(65);
	            obj.parameters.direction.up = obj.layer.game.input.isDown(87);
	            obj.parameters.direction.down = obj.layer.game.input.isDown(83);
	            obj.parameters.direction.right = obj.layer.game.input.isDown(68);

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
	                obj.parameters.direction.b = direction.b;
	            }
	        }
	    },
	    selectSpellWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.layer.game.input.isDown(49) && (obj.parameters.currentSpell = 'fireball');
	            obj.layer.game.input.isDown(50) && (obj.parameters.currentSpell = 'frostShard');
	            obj.layer.game.input.isDown(51) && (obj.parameters.currentSpell = 'teleport');
	        }
	    },
	    triggerOnPlayerCollisionPowerUp: {
	        update: function update(dt, obj) {
	            var objects = obj.parameters.collisions;

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    objects[i].parameters.spellPower += obj.parameters.power;
	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    }
	};

	exports.default = config;

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
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea(size) {
	                return [Math.round(Math.random() * obj.game.canvas.width), Math.round(Math.random() * obj.game.canvas.height)];
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var _config = obj.game.getConfig('tree');

	                _config.pos = getRandomPointInArea(this.parameters.area);

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = obj.game.getConfig('stones');

	                _config2.pos = getRandomPointInArea(this.parameters.area);

	                var stone = this.context.addObject(_config2);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            trees: 30,
	            stones: 30
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < 10000) {
	                if (this.parameters.currentMonsterCooldown == 0) {
	                    var random = Math.random() * 100,
	                        startPosition = Math.round(Math.random() * 3),
	                        monsterConfig;

	                    if (random <= this.parameters.chanceOfBoss) {
	                        monsterConfig = obj.game.getConfig('monsterBoss');
	                    } else if (random <= this.parameters.chanceOfBoss + this.parameters.chanceOfBoomer) {
	                        monsterConfig = obj.game.getConfig('monsterBoomer');
	                    } else {
	                        monsterConfig = obj.game.getConfig('monster');
	                    }

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
	            area: [[0, 0], [1024, 768]],
	            currentMonsterCooldown: 7,
	            chanceOfBoss: 3,
	            chanceOfBoomer: 100,
	            monsterCooldown: 7000,
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
	            area: [[50, 50], [975, 715]],
	            currentCooldown: 400,
	            cooldown: 400
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
	            area: [[100, 100], [900, 715]],
	            currentCooldown: 500,
	            cooldown: 500
	        }
	    },
	    spawn_terrain: {
	        init: function init() {
	            var obj = this.context,
	                gateConfig = obj.game.getConfig('gate'),
	                wallConfig = obj.game.getConfig('wall');

	            for (var i = 0; i < 7; i++) {
	                var wallConfig = obj.game.getConfig('wall');
	                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1] / 2];
	                var wall = this.context.addObject(wallConfig);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	            gateConfig.pos = [wallConfig.pos[0] + wallConfig.size[0] / 2 + gateConfig.size[0] / 2, (gateConfig.size[1] - 3) / 2];
	            var gate = this.context.addObject(gateConfig);
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

	var config = {
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
	        init: function init() {
	            var obj = this.context;
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                time: (obj.layer.game.parameters.bestTime / 60).toFixed(2)
	            });
	        }
	    },
	    bestScore: {
	        init: function init() {
	            var obj = this.context;
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                score: obj.layer.game.parameters.bestScore
	            });
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
	    setDirectionToPlayerAdvance: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                playerDirection = player.parameters.direction,
	                oldDirection = _utils2.default.clone(obj.parameters.direction);

	            if (!oldDirection) {
	                oldDirection = _utils2.default.getDirection(obj.pos, player.pos);
	            }

	            if (playerDirection.dir == null) {
	                obj.parameters.direction = _utils2.default.getDirection(obj.pos, player.pos);
	            } else {
	                var newDirection = _utils2.default.getDirection(_utils2.default.getDestination(obj.pos, oldDirection, obj.parameters.speed / 2), _utils2.default.getDestination(player.pos, playerDirection, player.parameters.speed / 2));
	                var degreeBetween = _utils2.default.getDegreeBetweenDirections(newDirection, _utils2.default.getDirection(obj.pos, player.pos));
	                console.log(degreeBetween);
	                if (degreeBetween < 5 && degreeBetween > -5) {
	                    _utils2.default.getDirection(obj.pos, player.pos);
	                } else {
	                    obj.parameters.direction = _utils2.default.clone(newDirection);
	                }
	            }
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
	    collisions: {
	        init: function init() {
	            var obj = this.context;
	            obj.parameters.collisions = [];
	            obj.parameters.collisions.cells = new Array(4);
	            obj.layer.game.collisions.updateObject(obj);
	        },
	        update: function update(dt, obj) {
	            obj.parameters.collisions.splice(0);
	            obj.layer.game.collisions.updateObject(obj);
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
	    rotateByDirection: {
	        update: function update(dt, obj) {
	            obj.sprite.rotateToDirection(obj.parameters.direction);
	        }
	    },
	    rotateByPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.sprite.rotateToDirection(_utils2.default.getDirection(obj.pos, player.pos));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var list = ['img/sprites.png', 'img/demons.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/mainhero2.png', 'img/monsters2.png', 'img/spellicons.png', 'img/spell.png', 'img/wall2.png', 'img/powerup.png', 'img/powerup2.png', 'img/gates2.png', 'img/skeleton.png', 'img/stones.png', 'img/sblood.png', 'img/tree.png', 'img/effects.png', 'img/frosteffect.png', 'img/heart.png', 'img/heart2.png', 'img/terrain.png', 'img/bloods.png', 'img/cursor.png'];

		exports.default = list;

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
			size: [1024, 768],
			background: 'img/terrain.png',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore'],
			init: function init() {
				this.game.parameters.monstersKilled = 0;
				this.game.parameters.gameTimer = 0;
			},
			rules: ['spawn_monster', 'random_trees', 'spawn_heart', 'spawn_powerup']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9zcGVsbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdWkuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy8uLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9ldGMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMvaW5kZXgnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcy9pbmRleCc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBzcGVsbHMgZnJvbSAnLi9zcGVsbHMnO1xyXG5pbXBvcnQgdW5pdHMgZnJvbSAnLi91bml0cyc7XHJcbmltcG9ydCBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cyc7XHJcbmltcG9ydCB0ZXJyYWluIGZyb20gJy4vdGVycmFpbic7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuXHJcbnZhciBvYmplY3RzID0ge307XHJcblxyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIGVmZmVjdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVpKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB0ZXJyYWluKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGZpcmViYWxsU3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGxpY29ucy5wbmcnLCBbMCwgMF0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNDcwLCA3NDhdLFxyXG5cclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBidWxsZXRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMCxcclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWydmaXJlYmFsbCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL3NwZWxsaWNvbnMucG5nJywgWzIyNCwgOTZdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzUxMiwgNzQ4XSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzaGFyZHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Zyb3N0U2hhcmQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0U3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGxpY29ucy5wbmcnLCBbNjQsIDMyXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs1NTQsIDc0OF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAyMDAsXHJcbiAgICAgICAgICAgIHRlbGVwb3J0R2F0ZXMgOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWyd0ZWxlcG9ydCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRHYXRlOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGwucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNywgWzAsMV1dLFxyXG4gICAgICAgIHBvcyA6IFs0NjYsIDU4MF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJ1bGVzIDogWydyZW1vdmVPbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuXHJcbiAgICBidWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9maXJlYmFsbHNwcml0ZS5wbmcnLFsgMCwgMF0sIFszMywgMzNdLCAxNiwgWzAsIDEsIDIsIDNdXSxcclxuICAgICAgICBzaXplIDogWzI1LCAyNV0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnYnVsbGV0TW9uc3RlckNvbGxpc2lvbiddLFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9lZmZlY3RzLnBuZycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzEyMCwgMTIwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDM1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL21haW5oZXJvLnBuZycsIFswLCAwXSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgcG9zIDogWzUxMiwgMzg0XSxcclxuICAgICAgICBzaXplIDogWzI1LCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxNTAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDUwLFxyXG4gICAgICAgICAgICBzcGVsbFBvd2VyOiAxLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnRTcGVsbDogJ2ZpcmViYWxsJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uIDoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAncGxheWVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVdpdGhLZXlib2FyZCcsICdiaW5kUG9zaXRpb25Ub0xheWVyJywgJ3BsYXllckRlYXRoJywgJ3NlbGVjdFNwZWxsV2l0aEtleWJvYXJkJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVUb01vdXNlJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMSxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL2RlbW9ucy5wbmcnLCBbMCwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyMCwyOF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAzNSxcclxuICAgICAgICAgICAgY29vbGRvd24gOiA3MCAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgbWVsZWVDb29sZG93bjogNzAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDIwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdtZWxlZUF0dGFjaycsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0TWVsZWVDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvb21lciA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZGVtb25zLnBuZycsIFs5NiwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyMCwyOF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxMDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgaGVhbHRoIDogMTAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCdzZXREaXJlY3Rpb25Ub1BsYXllckFkdmFuY2UnLCAgJ21vbnN0ZXJFeHBsb3Npb25Db25kaXRpb24nXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlQnlQbGF5ZXInLCAnZHluYW1pY1pJbmRleCcsICdyZXNldFNwZWVkJywgJ3Jlc2V0RWZmZWN0cyddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MgOiB7XHJcbiAgICAgICAgekluZGV4IDogMSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvbW9uc3RlcnMyLnBuZycsIFswLCAwXSwgWzMyLCA1MF0sIDYsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgNDBdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDMwLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDIwMCAsXHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biA6IDIwMCxcclxuICAgICAgICAgICAgcG93ZXIgOiAxMCxcclxuICAgICAgICAgICAgaGVhbHRoIDogMzAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycgLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vbnN0ZXJCb3NzTG9naWMnLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRTcGVlZCcsICdyZXNldEVmZmVjdHMnLCAncmVzZXRSYW5nZUNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBoZWFydCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9oZWFydC5wbmcnLCBbMCwgMF0sIFszMiwgMzJdLCA1LCBbMCwxXV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBoZWFsdGggOiAxMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3dlcnVwIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgc2l6ZTogWzI1LCAyNV0sXHJcbiAgICAgICAgLy9yZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvcG93ZXJ1cDIucG5nJywgWzAsIDBdLCBbNzIsIDY1XV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL2VmZmVjdHMucG5nJyxbMjg4LCAxMjhdLCBbMzIsIDMyXSwgMTAsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2RhbWFnZU9uUGxheWVyQ29sbGlzaW9uJywgJ2Rlc3Ryb3lPblBsYXllckNvbGxpc2lvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBibG9vZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3NibG9vZC5wbmcnLCBbMCwgMF0sIFszMiwgMTNdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgYmxvb2RTcHJheSA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL2Jsb29kcy5wbmcnLCBbMCwgMF0sIFs2NCwgNjRdLCAxNSwgWzAsIDEsIDIsIDMsIDRdLCBudWxsLCB0cnVlLCAwLjc4NV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBza2VsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9za2VsZXRvbi5wbmcnLCBbMCwgMF0sIFszNCwgMzRdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9zcHJpdGVzLnBuZycsIFswLCAxMTddLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWZmZWN0JyxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVyRXhwbG9zaW9uJ10sXHJcbiAgICAgICAgc2l6ZSA6IFszOSwgMzldLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3ByaXRlcy5wbmcnLCBbMCwgMTE3XSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cclxuICAgIHRyZWUgOiB7XHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvdHJlZS5wbmcnLCBbMCwgMF0sIFs3NiwgNzZdXSxcclxuICAgICAgICBzaXplIDogWzcwLDcwXSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICB3YWxsIDoge1xyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3dhbGwyLnBuZycsIFswLCAwXSwgWzQ4LCA2NF1dLFxyXG4gICAgICAgIHNpemUgOiBbNDgsNjRdXHJcbiAgICB9LFxyXG4gICAgZ2F0ZSA6IHtcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9nYXRlczIucG5nJywgWzAsIDBdLCBbOTYsIDY1XV0sXHJcbiAgICAgICAgc2l6ZSA6IFs5Niw2NV1cclxuICAgIH0sXHJcbiAgICBzdG9uZXMgOiB7XHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9zdG9uZXMucG5nJywgWzAsIDBdLCBbMTgsIDIyXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsxOCwyMl0sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgICAgIC8vekluZGV4IDogMFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGN1cnNvciA6IHtcclxuICAgICAgICB6SW5kZXggOiA5OTksXHJcbiAgICAgICAgcG9zOiBbNDAwLDM1MF0sXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2JpbmRQb3NpdGlvblRvTW91c2UnXVxyXG4gICAgfSxcclxuICAgIGNvdW50ZXI6IHtcclxuICAgICAgICB6SW5kZXggOiA5MTAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiU0NPUkU6IHtraWxsc31cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydjb3VudE1vbnN0ZXJLaWxsZWQnXVxyXG4gICAgfSxcclxuICAgIHRpbWVyOiB7XHJcbiAgICAgICAgekluZGV4IDogOTEwLFxyXG4gICAgICAgIHBvczogWzUsIDIzXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIlRJTUVSOiB7dGltZX1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWyd0aW1lciddXHJcbiAgICB9LFxyXG4gICAgYmVzdFRpbWU6IHtcclxuICAgICAgICBwb3M6IFs1LCAzNzBdLFxyXG4gICAgICAgIHpJbmRleCA6IDkwMCxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiQkVTVCBUSU1FOiB7dGltZX1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmVzdFRpbWUnXVxyXG4gICAgfSxcclxuICAgIGJlc3RTY29yZToge1xyXG4gICAgICAgIHBvczogWzUsIDM4MF0sXHJcbiAgICAgICAgekluZGV4IDogOTAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFNDT1JFOiB7c2NvcmV9XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Jlc3RTY29yZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgbGF5ZXJzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdWkpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBldGMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID09ICdmaXJlYmFsbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbcGxheWVyLnBvc1swXSwgcGxheWVyLnBvc1sxXSAtIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREZWdyZWUgPSAxMCAqIChwbGF5ZXIucGFyYW1ldGVycy5zcGVsbFBvd2VyIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIHN0YXJ0RGVncmVlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREZWdyZWUgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5fcGFyYW1ldGVycy5jb29sZG93biArIDUgKiAocGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlciAtIDEpID4gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID0gMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb29sZG93biA9IG9iai5fcGFyYW1ldGVycy5jb29sZG93biArIDUgKiAocGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlciAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbGV0Q29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdidWxsZXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShwbGF5ZXIucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLnBvd2VyICs9IDUgKiAocGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlciAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbilbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNsb3dFbmVtaWVzIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnBhcmFtZXRlcnMuc3BlZWQgPCBvYmoucGFyYW1ldGVycy5wb3dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVlZCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5lZmZlY3RzLmluZGV4T2YoJ2Zyb3plbicpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5lZmZlY3RzLnB1c2goJ2Zyb3plbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID09ICd0ZWxlcG9ydCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICBtb3VzZVBvc2l0aW9uID0gb2JqLmxheWVyLmdhbWUubW91c2UuZ2V0TW91c2VQb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKHBsYXllci5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCAobW91c2VQb3NpdGlvbikgPyBbbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW3BsYXllci5wb3NbMF0sIHBsYXllci5wb3NbMV0gLSAxXSwgMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSB1dGlscy5nZXREZXN0aW5hdGlvbihwbGF5ZXIucG9zLCBkaXJlY3Rpb24sIG9iai5wYXJhbWV0ZXJzLnBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZWxlcG9ydEdhdGUgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ3RlbGVwb3J0R2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUucG9zID0gdXRpbHMuY2xvbmUocGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVsZXBvcnRHYXRlID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IHV0aWxzLmNsb25lKGRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zZXRQb3NpdGlvbihkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouX3BhcmFtZXRlcnMuY29vbGRvd24gLSAoMzAgKiAocGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlciAtIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID0gKGNvb2xkb3duID4gNTApID8gY29vbGRvd24gOiA1MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duLS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5wYXJhbWV0ZXJzLmN1cnJlbnRTcGVsbCA9PSAnZnJvc3RTaGFyZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyb3N0U2hhcmQgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Zyb3N0U2hhcmQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbcGxheWVyLnBvc1swXSwgcGxheWVyLnBvc1sxXSAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvc3RTaGFyZC5wb3MgPSB1dGlscy5jbG9uZShkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BlbGxQb3dlckJvb3N0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyQm9vc3QgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb3N0U2hhcmQucGFyYW1ldGVycy5jb29sZG93biArPSBzcGVsbFBvd2VyQm9vc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGZyb3N0U2hhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYmxvb2RTcHJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IHV0aWxzLmNsb25lKG9iamVjdHNbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3NbMF0gKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3NbMV0gKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJsb29kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzXG4gKiovIiwiZnVuY3Rpb24gY29sbGlkZXMoeCwgeSwgciwgYiwgeDIsIHkyLCByMiwgYjIpIHtcclxuICAgIHJldHVybiAhKHIgPj0geDIgfHwgeCA8IHIyIHx8XHJcbiAgICBiID49IHkyIHx8IHkgPCBiMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJveENvbGxpZGVzKHBvcywgc2l6ZSwgcG9zMiwgc2l6ZTIpIHtcclxuICAgIHJldHVybiBjb2xsaWRlcyhwb3NbMF0gKyBzaXplWzBdIC8gMiwgcG9zWzFdICsgc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zWzBdIC0gc2l6ZVswXSAvIDIsIHBvc1sxXSAtIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gKyBzaXplMlswXSAvIDIsIHBvczJbMV0gKyBzaXplMlsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSAtIHNpemUyWzBdIC8gMiwgcG9zMlsxXSAtIHNpemUyWzFdIC8gMik7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UmFkaWFucyhkZWdyZWUpIHtcclxuICAgIHJldHVybiBkZWdyZWUgKiBNYXRoLlBJIC8gMTgwO1xyXG59O1xyXG5mdW5jdGlvbiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyhkaXIxLCBkaXIyKXtcclxuICAgIGlmIChkaXIyLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKDEgLyBkaXIxLmsqZGlyMS5kaXIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldERlZ3JlZXMoTWF0aC5hdGFuKChkaXIyLmsgKiBkaXIyLmRpciAtIGRpcjEuayAqIGRpcjEuZGlyKSAvICgxIC0gZGlyMS5rICogZGlyMS5kaXIgKiBkaXIyLmsgKiBkaXIyLmRpcikpKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWVzKHJhZGlhbnMpIHtcclxuICAgIHJldHVybiAxODAgKiByYWRpYW5zIC8gTWF0aC5QSTtcclxufTtcclxuZnVuY3Rpb24gZ2V0RGVncmVlKHBvaW50MSwgcG9pbnQyLCBwcmV2RGVncmVlLCBzcGVlZCkge1xyXG4gICAgdmFyIGRlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSAmJiAoZGVncmVlID0gLWRlZ3JlZSk7XHJcbiAgICBpZiAoZGVncmVlID09IHByZXZEZWdyZWUpIHtcclxuICAgICAgICByZXR1cm4gW2RlZ3JlZSwgMF07XHJcbiAgICB9IGVsc2UgaWYgKCgoZGVncmVlIDwgMCAmJiBwcmV2RGVncmVlID4gMCkgfHwgKGRlZ3JlZSA+IDAgJiYgcHJldkRlZ3JlZSA8IDApKSAmJiAoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBNYXRoLlBJKSkge1xyXG4gICAgICAgIHZhciBkZWdyZWVXaXRoU3BlZWQgPSAoKHByZXZEZWdyZWUgPiAwKSA/IHByZXZEZWdyZWUgKyBzcGVlZCA6IHByZXZEZWdyZWUgLSBzcGVlZCk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZVdpdGhTcGVlZCA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGVncmVlV2l0aFNwZWVkID0gLU1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkIC0gTWF0aC5QSSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZWdyZWVXaXRoU3BlZWQgPCAtTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSBNYXRoLlBJICsgKGRlZ3JlZVdpdGhTcGVlZCArIE1hdGguUEkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2RlZ3JlZVdpdGhTcGVlZCwgTWF0aC5wb3coTWF0aC5QSSwgMikgLSBNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbKE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpID4gc3BlZWQpID8gKChwcmV2RGVncmVlID4gZGVncmVlKSA/IHByZXZEZWdyZWUgLSBzcGVlZCA6IHByZXZEZWdyZWUgKyBzcGVlZCkgOiBkZWdyZWUsIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBvaW50MSwgcG9pbnQyLCBkZWdyZWUpIHtcclxuICAgIHZhciBuZXdEZWdyZWUgPSBNYXRoLmFjb3MoKChwb2ludDJbMF0gLSBwb2ludDFbMF0pKSAvIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG4gICAgbmV3RGVncmVlID0gbmV3RGVncmVlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChuZXdEZWdyZWUgPSAzNjAgLSBuZXdEZWdyZWUpO1xyXG4gICAgbmV3RGVncmVlICs9IGRlZ3JlZTtcclxuICAgIChuZXdEZWdyZWUgPCAwKSAmJiAobmV3RGVncmVlICs9IDM2MCk7XHJcbiAgICAobmV3RGVncmVlID4gMzYwKSAmJiAobmV3RGVncmVlIC09IDM2MCk7XHJcblxyXG4gICAgdmFyIGRpciA9ICgobmV3RGVncmVlID4gMCAmJiBuZXdEZWdyZWUgPD0gOTApIHx8IChuZXdEZWdyZWUgPiAyNzAgJiYgbmV3RGVncmVlIDw9IDM2MCkpID8gMSA6IC0xO1xyXG5cclxuICAgIHZhciBkaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgazogTWF0aC50YW4obmV3RGVncmVlICogTWF0aC5QSSAvIDE4MClcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGdldERlc3RpbmF0aW9uKHBvaW50MSwgZGlyZWN0aW9uLCBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxufVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24ocG9pbnQxLCBwb2ludDIpIHtcclxuICAgIHZhciBrLCBiLCBkaXI7XHJcblxyXG4gICAgaWYgKHBvaW50MVswXSA9PSBwb2ludDJbMF0pIHtcclxuICAgICAgICBrID0gJ3ZlcnQnO1xyXG4gICAgICAgIGIgPSBwb2ludDJbMF07XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IHBvaW50WzBdICsgbGluZS5kaXIgKiBzcGVlZCAvIChNYXRoLnNxcnQoTWF0aC5wb3cobGluZS5rLCAyKSArIDEpKTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3BlZWQoc3RhcnQsIGRlc3RpbmF0aW9uLCBsaW5lKSB7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHJldHVybiAoIGRlc3RpbmF0aW9uWzFdIC0gc3RhcnRbMV0gKSAvIGxpbmUuZGlyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKCBkZXN0aW5hdGlvblsxXSAtIHN0YXJ0WzFdICkgKiAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkgLyBsaW5lLmRpcjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlbGxpcHNlKGNvbnRleHQsIGN4LCBjeSwgcngsIHJ5LCByb3QsIGFTdGFydCwgYUVuZCl7XHJcbiAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKGN4LCBjeSk7XHJcbiAgICBjb250ZXh0LnJvdGF0ZShyb3QpO1xyXG4gICAgY29udGV4dC50cmFuc2xhdGUoLXJ4LCAtcnkpO1xyXG5cclxuICAgIGNvbnRleHQuc2NhbGUocngsIHJ5KTtcclxuICAgIGNvbnRleHQuYXJjKDEsIDEsIDEsIGFTdGFydCwgYUVuZCwgZmFsc2UpO1xyXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbn1cclxuZnVuY3Rpb24gbmV4dFBvc2l0aW9uKHBvaW50MSwgcG9pbnQyLyosIHNwZWVkLCBkdCovKSB7XHJcbiAgICB2YXIgZGVsdGF4ID0gTWF0aC5hYnMocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSxcclxuICAgICAgICBkZWx0YXkgPSBNYXRoLmFicyhwb2ludDJbMV0gLSBwb2ludDFbMV0pLFxyXG4gICAgICAgIGVycm9yID0gMCxcclxuICAgICAgICBkZWx0YWVyciA9IChkZWx0YXggPiBkZWx0YXkpID8gZGVsdGF5IDogZGVsdGF4LFxyXG4gICAgICAgIHkgPSBwb2ludDFbMV0sXHJcbiAgICAgICAgeCA9IHBvaW50MVswXTtcclxuXHJcbiAgICBpZiAoZGVsdGF4ID4gZGVsdGF5KSB7XHJcbiAgICAgICAgKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4LS0gOiB4Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF4KSB7XHJcbiAgICAgICAgICAgIHkgPSAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHkgLSAxIDogeSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnI7XHJcbiAgICAgICAgaWYgKDIgKiBlcnJvciA+PSBkZWx0YXkpIHtcclxuICAgICAgICAgICAgeCA9IChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geCAtIDEgOiB4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufVxyXG5mdW5jdGlvbiBnZXRQb2ludE9mSW50ZXJjZXB0aW9uKGRpcmVjdGlvbjEsIGRpcmVjdGlvbjIpIHtcclxuICAgIHZhciB4LCB5O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24yLmsgPT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgeCA9IGRpcmVjdGlvbjIuYjtcclxuICAgICAgICB5ID0gZGlyZWN0aW9uMS5rICogZGlyZWN0aW9uMS5kaXIgKiB4ICsgZGlyZWN0aW9uMS5iO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gKGRpcmVjdGlvbjIuYiAtIGRpcmVjdGlvbjEuYikgLyAoZGlyZWN0aW9uMS5kaXIgKiBkaXJlY3Rpb24xLmsgLSBkaXJlY3Rpb24yLmRpciAqIGRpcmVjdGlvbjIuayk7XHJcbiAgICAgICAgeSA9IGRpcmVjdGlvbjEuayAqIGRpcmVjdGlvbjEuZGlyICogeCArIGRpcmVjdGlvbjEuYjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBvYmouY29uc3RydWN0b3IoKTsgLy8gY2hhbmdlZFxyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGVsbGlwc2U6IGVsbGlwc2UsXHJcbiAgICBnZXRSYWRpYW5zOiBnZXRSYWRpYW5zLFxyXG4gICAgJ2NvbGxpZGVzJzogY29sbGlkZXMsXHJcbiAgICAnYm94Q29sbGlkZXMnOiBib3hDb2xsaWRlcyxcclxuICAgICdnZXREZWdyZWUnOiBnZXREZWdyZWUsXHJcbiAgICAnbmV4dFBvc2l0aW9uJzogbmV4dFBvc2l0aW9uLFxyXG4gICAgZ2V0U3BlZWQ6IGdldFNwZWVkLFxyXG4gICAgJ2dldERlc3RpbmF0aW9uJzogZ2V0RGVzdGluYXRpb24sXHJcbiAgICAnZ2V0RGlyZWN0aW9uJzogZ2V0RGlyZWN0aW9uLFxyXG4gICAgZ2V0RGVncmVlczogZ2V0RGVncmVlcyxcclxuICAgIGdldFBvaW50T2ZJbnRlcmNlcHRpb24sZ2V0UG9pbnRPZkludGVyY2VwdGlvbixcclxuICAgIGdldERlZ3JlZUJldHdlZW5EaXJlY3Rpb25zOiBnZXREZWdyZWVCZXR3ZWVuRGlyZWN0aW9ucyxcclxuICAgIGNsb25lOiBjbG9uZSxcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWVcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcGxheWVyRGVhdGg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUudHJpZ2dlckdsb2JhbEV2ZW50KCdwbGF5ZXJfZGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhbWFnZU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggPCBvYmplY3RzW2ldLl9wYXJhbWV0ZXJzLmhlYWx0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCArIG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSBvYmplY3RzW2ldLl9wYXJhbWV0ZXJzLmhlYWx0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCArPSBvYmoucGFyYW1ldGVycy5oZWFsdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoID0gb2JqZWN0c1tpXS5fcGFyYW1ldGVycy5oZWFsdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZWxlZUF0dGFjayA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYmxvb2RTcHJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSB1dGlscy5jbG9uZShvYmplY3RzW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvc1swXSArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3NbMV0gKz0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyRXhwbG9zaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9iai5wYXJhbWV0ZXJzLmV4cGxvZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmV4cGxvZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW9uc3RlckV4cGxvc2lvbkNvbmRpdGlvbiA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRXhwbG9zaW9ucygpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBvYmoucG9zLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICBleHBsO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSAtIG9iai5zaXplWzBdLCBwb3NbMV0gLSBvYmouc2l6ZVsxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSArIG9iai5zaXplWzBdLCBwb3NbMV0gLSBvYmouc2l6ZVsxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSAtIG9iai5zaXplWzBdLCBwb3NbMV0gKyBvYmouc2l6ZVsxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSArIG9iai5zaXplWzBdLCBwb3NbMV0gKyBvYmouc2l6ZVsxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSAtIDMgLyAyICogb2JqLnNpemVbMF0sIHBvc1sxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gW3Bvc1swXSArIDMgLyAyICogb2JqLnNpemVbMF0sIHBvc1sxXV07XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5wYXJhbWV0ZXJzLnBvd2VyID0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVFeHBsb3Npb25zKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRXhwbG9zaW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRTcGVlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnNwZWVkID0gb2JqLl9wYXJhbWV0ZXJzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldEVmZmVjdHMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5lZmZlY3RzLnNwbGljZSgwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVRvRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uICYmIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24sIE1hdGgucm91bmQob2JqLnBhcmFtZXRlcnMuc3BlZWQgKiBkdCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVySGVhbHRoU3RhdHVzOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqLnBvcztcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJsb29kID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdibG9vZCcpO1xyXG4gICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqLnBvcztcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRSYW5nZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duLS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0TWVsZWVDb29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duLS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21idWxsZXQnKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsID0gb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgcGxheWVyLnBvcylbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVXaXRoS2V5Ym9hcmQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuXHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDY1KTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnVwID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDg3KTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24gPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oODMpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ucmlnaHQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNjgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdID09IHBvc1swXSAmJiBvYmoucG9zWzFdID09IHBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IGRpcmVjdGlvbi5kaXI7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uYiA9IGRpcmVjdGlvbi5iO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFNwZWxsV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDQ5KSkgJiYgKG9iai5wYXJhbWV0ZXJzLmN1cnJlbnRTcGVsbCA9ICdmaXJlYmFsbCcpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDUwKSkgJiYgKG9iai5wYXJhbWV0ZXJzLmN1cnJlbnRTcGVsbCA9ICdmcm9zdFNoYXJkJyk7XHJcbiAgICAgICAgICAgIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNTEpKSAmJiAob2JqLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID0gJ3RlbGVwb3J0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvblBvd2VyVXAgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuc3BlbGxQb3dlciArPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHJhbmRvbV90cmVlczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tUG9pbnRJbkFyZWEoc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMud2lkdGgpLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMuaGVpZ2h0KV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnRyZWVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3RyZWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMuc3RvbmVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3N0b25lcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0b25lID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy9zdG9uZS5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgdHJlZXM6IDMwLFxyXG4gICAgICAgICAgICBzdG9uZXM6IDMwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX21vbnN0ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZG9tIDw9IHRoaXMucGFyYW1ldGVycy5jaGFuY2VPZkJvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlckJvc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmRvbSA8PSB0aGlzLnBhcmFtZXRlcnMuY2hhbmNlT2ZCb3NzICsgdGhpcy5wYXJhbWV0ZXJzLmNoYW5jZU9mQm9vbWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ21vbnN0ZXJCb29tZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW3RoaXMucGFyYW1ldGVycy5hcmVhWzBdWzBdIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSwgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV0gLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW3RoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdICsgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJDb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSwgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0gKyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChtb25zdGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzAsIDBdLCBbMTAyNCAsIDc2OF1dLFxyXG4gICAgICAgICAgICBjdXJyZW50TW9uc3RlckNvb2xkb3duOiA3LFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MgOiAzLFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvb21lciA6IDEwMCxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiA3MDAwLFxyXG4gICAgICAgICAgICBtb25zdGVyU3Bhd25lZDogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9oZWFydDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygnaGVhcnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSArIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVsxXV07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFs5NzUsIDcxNV1dLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29vbGRvd246IDQwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDQwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9wb3dlcnVwOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdwb3dlcnVwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1sxMDAsIDEwMF0sIFs5MDAsIDcxNV1dLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29vbGRvd246IDUwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl90ZXJyYWluOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBnYXRlQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdnYXRlJyksXHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd3YWxsJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhbGxDb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3dhbGwnKTtcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWcucG9zID0gW3dhbGxDb25maWcuc2l6ZVswXSAqIGkgKyB3YWxsQ29uZmlnLnNpemVbMF0gLyAyLCB3YWxsQ29uZmlnLnNpemVbMV0vMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FsbCA9IHRoaXMuY29udGV4dC5hZGRPYmplY3Qod2FsbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvL3N0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhdGVDb25maWcucG9zID0gW3dhbGxDb25maWcucG9zWzBdICsgd2FsbENvbmZpZy5zaXplWzBdLyAyICsgZ2F0ZUNvbmZpZy5zaXplWzBdLzIsIChnYXRlQ29uZmlnLnNpemVbMV0gLSAzKS8yIF07XHJcbiAgICAgICAgICAgIHZhciBnYXRlID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChnYXRlQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9sYXllcnMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyKyspIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhlYWx0aCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aDogb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIHRpbWU6ICgob2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5iZXN0VGltZSkgLyA2MCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVzdFNjb3JlIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2NvcmU6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFNjb3JlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VpLmpzXG4gKiovIiwidmFyIG5hcmdzID0gL1xceyhbMC05YS16QS1aXSspXFx9L2dcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZykge1xuICAgIHZhciBhcmdzXG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHNbMV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgfVxuXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XG4gICAgICAgIGFyZ3MgPSB7fVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShuYXJncywgZnVuY3Rpb24gcmVwbGFjZUFyZyhtYXRjaCwgaSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdFxuXG4gICAgICAgIGlmIChzdHJpbmdbaW5kZXggLSAxXSA9PT0gXCJ7XCIgJiZcbiAgICAgICAgICAgIHN0cmluZ1tpbmRleCArIG1hdGNoLmxlbmd0aF0gPT09IFwifVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gYXJncy5oYXNPd25Qcm9wZXJ0eShpKSA/IGFyZ3NbaV0gOiBudWxsXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGJpbmRQb3NpdGlvblRvTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPCBvYmoubGF5ZXIucG9zWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zWzBdICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1swXSA9IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NbMV0gKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIDwgMCB8fCBvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIHx8IG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gfHwgb2JqLnBvc1swXSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyQWR2YW5jZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIHBsYXllckRpcmVjdGlvbiA9IHBsYXllci5wYXJhbWV0ZXJzLmRpcmVjdGlvbixcclxuICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvbiA9IHV0aWxzLmNsb25lKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9sZERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgb2xkRGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyRGlyZWN0aW9uLmRpciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKHV0aWxzLmdldERlc3RpbmF0aW9uKG9iai5wb3MsIG9sZERpcmVjdGlvbiwgb2JqLnBhcmFtZXRlcnMuc3BlZWQgLyAyKSwgdXRpbHMuZ2V0RGVzdGluYXRpb24ocGxheWVyLnBvcywgcGxheWVyRGlyZWN0aW9uLCBwbGF5ZXIucGFyYW1ldGVycy5zcGVlZCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWdyZWVCZXR3ZWVuID0gdXRpbHMuZ2V0RGVncmVlQmV0d2VlbkRpcmVjdGlvbnMobmV3RGlyZWN0aW9uLCB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGVncmVlQmV0d2Vlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVncmVlQmV0d2VlbiA8IDUgJiYgZGVncmVlQmV0d2VlbiA+IC01KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBsYXllci5wb3MpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IHV0aWxzLmNsb25lKG5ld0RpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHluYW1pY1pJbmRleDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbmV3WkluZGV4ID0gMDtcclxuICAgICAgICAgICAgb2JqLnBvcyAmJiAobmV3WkluZGV4ICs9IG9iai5wb3NbMV0pO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlICYmIChuZXdaSW5kZXggKz0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMik7XHJcblxyXG4gICAgICAgICAgICBvYmouekluZGV4ID0gKG9iai5wb3NbMV0gPiAwKSA/IE1hdGgucm91bmQobmV3WkluZGV4KSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbGxpc2lvbnM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zLmNlbGxzID0gbmV3IEFycmF5KDQpO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVUb01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9Nb3VzZSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlT25Db29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlclNwcml0ZURvbmU6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlEaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24ob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlQbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvZXRjLmpzXG4gKiovIiwidmFyIGxpc3QgPSBbXHJcbiAgICAnaW1nL3Nwcml0ZXMucG5nJyxcclxuICAgICdpbWcvZGVtb25zLnBuZycsXHJcbiAgICAnaW1nL2ZpcmViYWxsc3ByaXRlLnBuZycsXHJcbiAgICAnaW1nL21haW5oZXJvLnBuZycsXHJcbiAgICAnaW1nL21haW5oZXJvMi5wbmcnLFxyXG4gICAgJ2ltZy9tb25zdGVyczIucG5nJyxcclxuICAgICdpbWcvc3BlbGxpY29ucy5wbmcnLFxyXG4gICAgJ2ltZy9zcGVsbC5wbmcnLFxyXG4gICAgJ2ltZy93YWxsMi5wbmcnLFxyXG4gICAgJ2ltZy9wb3dlcnVwLnBuZycsXHJcbiAgICAnaW1nL3Bvd2VydXAyLnBuZycsXHJcbiAgICAnaW1nL2dhdGVzMi5wbmcnLFxyXG4gICAgJ2ltZy9za2VsZXRvbi5wbmcnLFxyXG4gICAgJ2ltZy9zdG9uZXMucG5nJyxcclxuICAgICdpbWcvc2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL3RyZWUucG5nJyxcclxuICAgICdpbWcvZWZmZWN0cy5wbmcnLFxyXG4gICAgJ2ltZy9mcm9zdGVmZmVjdC5wbmcnLFxyXG4gICAgJ2ltZy9oZWFydC5wbmcnLFxyXG4gICAgJ2ltZy9oZWFydDIucG5nJyxcclxuICAgICdpbWcvdGVycmFpbi5wbmcnLFxyXG4gICAgJ2ltZy9ibG9vZHMucG5nJyxcclxuICAgICdpbWcvY3Vyc29yLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9yZXNvdXJjZXMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbMTAyNCw3NjhdLFxyXG5cdFx0YmFja2dyb3VuZDogJ2ltZy90ZXJyYWluLnBuZycsXHJcblx0XHRpbml0TGlzdCA6IFsncGxheWVyJywgJ2N1cnNvcicsICdjb3VudGVyJywgJ3RpbWVyJywgJ2Jlc3RUaW1lJywgJ2ZpcmViYWxsU3BlbGwnLCAnZnJvc3RTaGFyZFNwZWxsJywgJ3RlbGVwb3J0U3BlbGwnLCAnYmVzdFNjb3JlJ10sXHJcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG5cdFx0XHR0aGlzLmdhbWUucGFyYW1ldGVycy5nYW1lVGltZXIgPSAwO1xyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3NwYXduX21vbnN0ZXInLCAncmFuZG9tX3RyZWVzJyAsJ3NwYXduX2hlYXJ0Jywnc3Bhd25fcG93ZXJ1cCddXHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvbGF5ZXJzLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsSkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUF5QkE7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9