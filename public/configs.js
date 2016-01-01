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
	        id: 'fireball',
	        sprite: ['img/spellicons.png', [0, 0], [32, 32]],
	        pos: [356, 580],
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
	        id: 'frostShard',
	        sprite: ['img/spellicons.png', [224, 96], [32, 32]],
	        pos: [400, 580],
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
	        id: 'teleportSpell',
	        sprite: ['img/spellicons.png', [64, 32], [32, 32]],
	        pos: [444, 580],
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
	        id: 'teleportGate',
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
	        id: 'bullet',
	        collisions: true,
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
	        id: 'spellPart',
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
	        id: 'player',
	        sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
	        pos: [450, 400],
	        size: [25, 32],
	        render: 'unit',
	        collisions: true,
	        parameters: {
	            speed: 150,
	            health: 10,
	            spellPower: 1,
	            effects: [],
	            currentSpell: 'fireball',
	            direction: {}
	        },
	        type: 'player',
	        //conditions : [],
	        rules: ['moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'selectSpellWithKeyboard', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
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
	            effects: [],
	            meleeCooldown: 70,
	            degreeRotation: 1,
	            health: 6,
	            power: 1
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'moveToDirection', 'canMelee', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
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
	            health: 30,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'canShoot', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
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
	    explosion: {
	        zIndex: 10000,
	        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
	        rules: ['destroyAfterSpriteDone']
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
	        id: 'cursor',
	        pos: [400, 350],
	        sprite: ['img/cursor.png', [0, 0], [30, 30]],
	        rules: ['bindPositionToMouse']
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
	                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
	                    var createBullet = function createBullet(direction, destination) {
	                        bulletConfig.pos = _utils2.default.clone(player.pos);
	                        bulletConfig.id = 'bullet' + rule.parameters.bulletsFired++;
	                        bulletConfig.parameters.direction = direction;

	                        var bull = obj.layer.addObject(bulletConfig);
	                        bull.sprite.setDegree(_utils2.default.getDegree(player.pos, destination)[0]);
	                    };

	                    var rule = obj,
	                        bulletConfig = obj.layer.game.getConfig('bullet'),
	                        mousePosition = obj.layer.game.mouse.getMousePosition(),
	                        destination = mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1],
	                        direction = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, 0));

	                    createBullet(direction, destination);

	                    for (var i = 1; i <= player.parameters.spellPower - 1; i++) {
	                        var direction1 = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, 20 * i)),
	                            direction2 = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, -20 * i));

	                        createBullet(direction1, _utils2.default.getMovedPointByDegree(player.pos, destination, 20 * i));
	                        createBullet(direction2, _utils2.default.getMovedPointByDegree(player.pos, destination, -20 * i));
	                    }
	                    if (player.parameters.spellPower > 1) {
	                        obj.parameters.fireCooldown = obj.parameters.cooldown + 5 ^ player.parameters.spellPower;
	                    } else {
	                        obj.parameters.fireCooldown = obj.parameters.cooldown;
	                    }
	                } else {
	                    obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	                }
	            } else {
	                obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	            }
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
	                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
	                    var teleportGate = obj.layer.game.getConfig('teleportGate'),
	                        mousePosition = obj.layer.game.mouse.getMousePosition(),
	                        direction = _utils2.default.getDirection(player.pos, _utils2.default.getMovedPointByDegree(player.pos, mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1], 0)),
	                        destination = _utils2.default.getDestination(player.pos, direction, obj.parameters.power);

	                    teleportGate.pos = _utils2.default.clone(player.pos);
	                    teleportGate.id = 'shard' + obj.parameters.teleportGates++;

	                    obj.layer.addObject(teleportGate);

	                    teleportGate.pos = _utils2.default.clone(destination);
	                    teleportGate.id = 'shard' + obj.parameters.teleportGates++;

	                    obj.layer.addObject(teleportGate);

	                    player.setPosition(destination);

	                    obj.parameters.fireCooldown = obj.parameters.cooldown;
	                } else {
	                    obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	                }
	            } else {
	                obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	            }
	        }
	    },
	    frostShard: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            if (player.parameters.currentSpell == 'frostShard') {
	                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
	                    var frostShard = obj.layer.game.getConfig('frostShard'),
	                        mousePosition = obj.layer.game.mouse.getMousePosition(),
	                        destination = mousePosition ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1];

	                    frostShard.pos = _utils2.default.clone(destination);
	                    frostShard.id = 'shard' + obj.parameters.shardsFired++;

	                    var spellPowerBoost = 0;

	                    for (var i = 1; i < player.parameters.spellPower; i++) {
	                        spellPowerBoost += 50;
	                    }

	                    frostShard.parameters.cooldown += spellPowerBoost;

	                    obj.layer.addObject(frostShard);

	                    obj.parameters.fireCooldown = obj.parameters.cooldown;
	                } else {
	                    obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
	                }
	            } else {
	                obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
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
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.parameters.direction.left = obj.layer.game.input.isDown(65);
	            obj.parameters.direction.up = obj.layer.game.input.isDown(87);
	            obj.parameters.direction.down = obj.layer.game.input.isDown(83);
	            obj.parameters.direction.right = obj.layer.game.input.isDown(68);

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
	            currentMonsterCooldown: 8,
	            chanceOfBoss: 3,
	            monsterCooldown: 8,
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
	            area: [[50, 50], [850, 750]],
	            currentCooldown: 500,
	            cooldown: 500
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
	        init: function init(dt, obj) {
	            var obj = this.context;
	            obj.parameters.text = (0, _stringTemplate2.default)(obj.parameters.template, {
	                time: (obj.layer.game.parameters.bestTime / 60).toFixed(2)
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
	var list = ['img/sprites.png', 'img/demons.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/monsters2.png', 'img/spellicons.png', 'img/spell.png', 'img/wall.png', 'img/powerup.png', 'img/gates.png', 'img/skeleton.png', 'img/stones.png', 'img/sblood.png', 'img/tree.png', 'img/effects.png', 'img/frosteffect.png', 'img/heart.png', 'img/terrain.png', 'img/cursor.png'];

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
			size: [900, 800],
			background: 'img/terrain.png',
			init: function init() {
				var player = this.game.getConfig('player'),
				    cursor = this.game.getConfig('cursor'),
				    counter = this.game.getConfig('counter'),
				    timer = this.game.getConfig('timer'),
				    bestTime = this.game.getConfig('bestTime'),
				    fireball = this.game.getConfig('fireballSpell'),
				    frostShard = this.game.getConfig('frostShardSpell'),
				    teleportSpell = this.game.getConfig('teleportSpell');

				this.game.parameters.monstersKilled = 0;
				this.game.parameters.gameTimer = 0;

				this.addObjects([player, cursor, counter, timer, bestTime, fireball, frostShard, teleportSpell]);
			},
			rules: ['spawn_monster', 'random_trees', 'spawn_heart', 'spawn_powerup']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9zcGVsbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdWkuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy8uLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9ldGMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMvaW5kZXgnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcy9pbmRleCc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBzcGVsbHMgZnJvbSAnLi9zcGVsbHMnO1xyXG5pbXBvcnQgdW5pdHMgZnJvbSAnLi91bml0cyc7XHJcbmltcG9ydCBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cyc7XHJcbmltcG9ydCB0ZXJyYWluIGZyb20gJy4vdGVycmFpbic7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuXHJcbnZhciBvYmplY3RzID0ge307XHJcblxyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIGVmZmVjdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVpKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB0ZXJyYWluKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGZpcmViYWxsU3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIGlkIDogJ2ZpcmViYWxsJyxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL3NwZWxsaWNvbnMucG5nJywgWzAsIDBdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzM1NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBidWxsZXRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMCxcclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWydmaXJlYmFsbCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBpZCA6ICdmcm9zdFNoYXJkJyxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL3NwZWxsaWNvbnMucG5nJywgWzIyNCwgOTZdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzQwMCwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzaGFyZHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Zyb3N0U2hhcmQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0U3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIGlkIDogJ3RlbGVwb3J0U3BlbGwnLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGxpY29ucy5wbmcnLCBbNjQsIDMyXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs0NDQsIDU4MF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAyMDAsXHJcbiAgICAgICAgICAgIHRlbGVwb3J0R2F0ZXMgOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWyd0ZWxlcG9ydCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRHYXRlOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBpZCA6ICd0ZWxlcG9ydEdhdGUnLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGwucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNywgWzAsMV1dLFxyXG4gICAgICAgIHBvcyA6IFs0NjYsIDU4MF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJ1bGVzIDogWydyZW1vdmVPbkNvb2xkb3duJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuXHJcbiAgICBidWxsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBpZCA6ICdidWxsZXQnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9maXJlYmFsbHNwcml0ZS5wbmcnLFsgMCwgMF0sIFszMywgMzNdLCAxNiwgWzAsIDEsIDIsIDNdXSxcclxuICAgICAgICBzaXplIDogWzI1LCAyNV0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTAsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnYnVsbGV0TW9uc3RlckNvbGxpc2lvbiddLFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMyxcclxuICAgICAgICBpZCA6ICdzcGVsbFBhcnQnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9lZmZlY3RzLnBuZycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzEyMCwgMTIwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDM1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBpZCA6ICdwbGF5ZXInLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvbWFpbmhlcm8ucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBwb3MgOiBbNDUwLDQwMF0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAxMCxcclxuICAgICAgICAgICAgc3BlbGxQb3dlcjogMSxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50U3BlbGw6ICdmaXJlYmFsbCcsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3BsYXllcicsXHJcbiAgICAgICAgLy9jb25kaXRpb25zIDogW10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVXaXRoS2V5Ym9hcmQnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCcsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlVG9Nb3VzZScsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgaWQgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9kZW1vbnMucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogNTAsXHJcbiAgICAgICAgICAgIGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDcwICxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBtZWxlZUNvb2xkb3duOiA3MCxcclxuICAgICAgICAgICAgZGVncmVlUm90YXRpb24gOiAxLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA2LFxyXG4gICAgICAgICAgICBwb3dlciA6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdjYW5NZWxlZScsICdyb3RhdGVCeURpcmVjdGlvbicsICdtZWxlZUF0dGFjaycsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zcyA6IHtcclxuICAgICAgICAvL1syODgsIDIwMF1cclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGlkIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9tb25zdGVyczIucG5nJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMzAsXHJcbiAgICAgICAgICAgIGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG4gICAgICAgICAgICBkZWdyZWVSb3RhdGlvbiA6IDEsXHJcbiAgICAgICAgICAgIGJ1bGxldHNGaXJlZCA6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogMTUwICxcclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duIDogMTUwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDUsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb25zdGVyQm9zc0xvZ2ljJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCcsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBoZWFydCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIGlkIDogJ2hlYXJ0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL2hlYXJ0LnBuZycsIFswLCAwXSwgWzMyLCAzMl0sIDUsIFswLCAxXV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBoZWFsdGggOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvd2VydXAgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBpZCA6ICdwb3dlcnVwJyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3Bvd2VydXAucG5nJywgWzAsIDBdLCBbMzQsIDM0XV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgaWQgOiAnYnVsbGV0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZWZmZWN0cy5wbmcnLFsyODgsIDEyOF0sIFszMiwgMzJdLCAxMCwgWzAsIDEsIDJdXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2RhbWFnZU9uUGxheWVyQ29sbGlzaW9uJywgJ2Rlc3Ryb3lPblBsYXllckNvbGxpc2lvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBibG9vZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIGlkIDogJ2Jsb29kJyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9zYmxvb2QucG5nJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd24gOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ3JlbW92ZU9uQ29vbGRvd24nXVxyXG4gICAgfSxcclxuXHJcbiAgICBza2VsZXQgOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBpZCA6ICdza2VsZXQnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3NrZWxldG9uLnBuZycsIFswLCAwXSwgWzM0LCAzNF1dLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogMzAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydyZW1vdmVPbkNvb2xkb3duJ11cclxuICAgIH0sXHJcbiAgICBleHBsb3Npb24gOiB7XHJcbiAgICAgICAgekluZGV4IDogMTAwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9zcHJpdGVzLnBuZycsIFswLCAxMTddLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cclxuICAgIHRyZWUgOiB7XHJcbiAgICAgICAgaWQgOiAndHJlZScsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvdHJlZS5wbmcnLCBbMCwgMF0sIFs3NiwgNzZdXSxcclxuICAgICAgICBzaXplIDogWzcwLDcwXSxcclxuICAgICAgICBydWxlczogWydkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICB3YWxsIDoge1xyXG4gICAgICAgIGlkIDogJ3dhbGwnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3dhbGwucG5nJywgWzAsIDBdLCBbNjMsIDk3XV0sXHJcbiAgICAgICAgc2l6ZSA6IFs3MCw3MF1cclxuICAgIH0sXHJcbiAgICBnYXRlIDoge1xyXG4gICAgICAgIGlkIDogJ2dhdGUnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL2dhdGVzLnBuZycsIFswLCAwXSwgWzYwLCA2NF1dLFxyXG4gICAgICAgIHNpemUgOiBbNjAsNjRdXHJcbiAgICB9LFxyXG4gICAgc3RvbmVzIDoge1xyXG4gICAgICAgIGlkIDogJ3N0b25lcycsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvc3RvbmVzLnBuZycsIFswLCAwXSwgWzM2LCAzNl1dLFxyXG4gICAgICAgIHNpemUgOiBbMzAsMzBdLFxyXG4gICAgICAgIHpJbmRleCA6IDBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBjdXJzb3IgOiB7XHJcbiAgICAgICAgekluZGV4IDogOTk5LFxyXG4gICAgICAgIGlkIDogJ2N1cnNvcicsXHJcbiAgICAgICAgcG9zOiBbNDAwLDM1MF0sXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2JpbmRQb3NpdGlvblRvTW91c2UnXVxyXG4gICAgfSxcclxuICAgIGNvdW50ZXI6IHtcclxuICAgICAgICBpZCA6ICdjb3VudGVyJyxcclxuICAgICAgICB6SW5kZXggOiA5MTAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiREVNT05TIEtJTExFRDoge2tpbGxzfVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2NvdW50TW9uc3RlcktpbGxlZCddXHJcbiAgICB9LFxyXG4gICAgdGltZXI6IHtcclxuICAgICAgICBpZCA6ICd0aW1lcicsXHJcbiAgICAgICAgekluZGV4IDogOTEwLFxyXG4gICAgICAgIHBvczogWzUsIDI4NV0sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJUSU1FUjoge3RpbWV9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsndGltZXInXVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lOiB7XHJcbiAgICAgICAgaWQgOiAnYmVzdFRpbWUnLFxyXG4gICAgICAgIHBvczogWzUsIDI5NV0sXHJcbiAgICAgICAgekluZGV4IDogOTAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydiZXN0VGltZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgbGF5ZXJzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdWkpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBldGMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID09ICdmaXJlYmFsbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ1bGUgPSBvYmosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gKG1vdXNlUG9zaXRpb24pID8gW21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtwbGF5ZXIucG9zWzBdLCBwbGF5ZXIucG9zWzFdIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlQnVsbGV0KGRpcmVjdGlvbiwgZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIHJ1bGUucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24pWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIGRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gcGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlciAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uMSA9IHV0aWxzLmdldERpcmVjdGlvbihwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIDIwICogaSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMiA9IHV0aWxzLmdldERpcmVjdGlvbihwbGF5ZXIucG9zLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIC0yMCAqIGkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24xLCB1dGlscy5nZXRNb3ZlZFBvaW50QnlEZWdyZWUocGxheWVyLnBvcywgZGVzdGluYXRpb24sIDIwICogaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uMiwgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCAtMjAgKiBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIucGFyYW1ldGVycy5zcGVsbFBvd2VyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSAob2JqLnBhcmFtZXRlcnMuY29vbGRvd24gKyA1IF4gKHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2xvd0VuZW1pZXMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVlZCA8IG9iai5wYXJhbWV0ZXJzLnBvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLnNwZWVkIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmVmZmVjdHMuaW5kZXhPZignZnJvemVuJykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmVmZmVjdHMucHVzaCgnZnJvemVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPT0gJ3RlbGVwb3J0Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLm1vdXNlLmlzTW91c2VEb3duKCkgJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVsZXBvcnRHYXRlID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKHBsYXllci5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCAobW91c2VQb3NpdGlvbikgPyBbbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW3BsYXllci5wb3NbMF0sIHBsYXllci5wb3NbMV0gLSAxXSwgMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IHV0aWxzLmdldERlc3RpbmF0aW9uKHBsYXllci5wb3MsIGRpcmVjdGlvbiwgb2JqLnBhcmFtZXRlcnMucG93ZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IHV0aWxzLmNsb25lKHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5pZCA9ICdzaGFyZCcgKyBvYmoucGFyYW1ldGVycy50ZWxlcG9ydEdhdGVzKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLnBvcyA9IHV0aWxzLmNsb25lKGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUuaWQgPSAnc2hhcmQnICsgb2JqLnBhcmFtZXRlcnMudGVsZXBvcnRHYXRlcysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zZXRQb3NpdGlvbihkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID09ICdmcm9zdFNoYXJkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLm1vdXNlLmlzTW91c2VEb3duKCkgJiYgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZnJvc3RTaGFyZCA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZnJvc3RTaGFyZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gb2JqLmxheWVyLmdhbWUubW91c2UuZ2V0TW91c2VQb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbcGxheWVyLnBvc1swXSwgcGxheWVyLnBvc1sxXSAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmcm9zdFNoYXJkLnBvcyA9IHV0aWxzLmNsb25lKGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmcm9zdFNoYXJkLmlkID0gJ3NoYXJkJyArIG9iai5wYXJhbWV0ZXJzLnNoYXJkc0ZpcmVkKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcGVsbFBvd2VyQm9vc3QgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyQm9vc3QgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmcm9zdFNoYXJkLnBhcmFtZXRlcnMuY29vbGRvd24gKz0gc3BlbGxQb3dlckJvb3N0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGZyb3N0U2hhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1bGxldE1vbnN0ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAnbW9uc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwbG9zaW9uQ29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdleHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gb2JqZWN0c1tpXS5wb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLmlkID0gJ2V4cF8nICsgb2JqZWN0c1tpXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9zcGVsbHMuanNcbiAqKi8iLCJmdW5jdGlvbiBjb2xsaWRlcyh4LCB5LCByLCBiLCB4MiwgeTIsIHIyLCBiMikge1xyXG4gICAgcmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuICAgIGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94Q29sbGlkZXMocG9zLCBzaXplLCBwb3MyLCBzaXplMikge1xyXG4gICAgcmV0dXJuIGNvbGxpZGVzKHBvc1swXSArIHNpemVbMF0gLyAyLCBwb3NbMV0gKyBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3NbMF0gLSBzaXplWzBdIC8gMiwgcG9zWzFdIC0gc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSArIHNpemUyWzBdIC8gMiwgcG9zMlsxXSArIHNpemUyWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdIC0gc2l6ZTJbMF0gLyAyLCBwb3MyWzFdIC0gc2l6ZTJbMV0gLyAyKTtcclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWUocG9pbnQxLCBwb2ludDIsIHByZXZEZWdyZWUsIHNwZWVkKSB7XHJcbiAgICB2YXIgZGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKG5ld0RlZ3JlZSA9IDM2MCAtIG5ld0RlZ3JlZSk7XHJcbiAgICBuZXdEZWdyZWUgKz0gZGVncmVlO1xyXG4gICAgKG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuICAgIChuZXdEZWdyZWUgPiAzNjApICYmIChuZXdEZWdyZWUgLT0gMzYwKTtcclxuXHJcbiAgICB2YXIgZGlyID0gKChuZXdEZWdyZWUgPiAwICYmIG5ld0RlZ3JlZSA8PSA5MCkgfHwgKG5ld0RlZ3JlZSA+IDI3MCAmJiBuZXdEZWdyZWUgPD0gMzYwKSkgPyAxIDogLTE7XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHtcclxuICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICBrOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0RGVzdGluYXRpb24ocG9pbnQxLCBkaXJlY3Rpb24sIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IChwb2ludFswXSArIGxpbmUuZGlyICogc3BlZWQgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkpO1xyXG4gICAgICAgIHkgPSAocG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5leHRQb3NpdGlvbihwb2ludDEsIHBvaW50Mi8qLCBzcGVlZCwgZHQqLykge1xyXG4gICAgdmFyIGRlbHRheCA9IE1hdGguYWJzKHBvaW50MlswXSAtIHBvaW50MVswXSksXHJcbiAgICAgICAgZGVsdGF5ID0gTWF0aC5hYnMocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSxcclxuICAgICAgICBlcnJvciA9IDAsXHJcbiAgICAgICAgZGVsdGFlcnIgPSAoZGVsdGF4ID4gZGVsdGF5KSA/IGRlbHRheSA6IGRlbHRheCxcclxuICAgICAgICB5ID0gcG9pbnQxWzFdLFxyXG4gICAgICAgIHggPSBwb2ludDFbMF07XHJcblxyXG4gICAgaWYgKGRlbHRheCA+IGRlbHRheSkge1xyXG4gICAgICAgIChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geC0tIDogeCsrO1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YWVycjtcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG4gICAgICAgICAgICB5ID0gKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5IC0gMSA6IHkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5LS0gOiB5Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF5KSB7XHJcbiAgICAgICAgICAgIHggPSAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHggLSAxIDogeCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZW9mKG9iaikgIT0gJ29iamVjdCcpXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuXHJcbiAgICB2YXIgdGVtcCA9IG9iai5jb25zdHJ1Y3RvcigpOyAvLyBjaGFuZ2VkXHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIG9iailcclxuICAgICAgICB0ZW1wW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XHJcbiAgICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgJ2NvbGxpZGVzJzogY29sbGlkZXMsXHJcbiAgICAnYm94Q29sbGlkZXMnOiBib3hDb2xsaWRlcyxcclxuICAgICdnZXREZWdyZWUnOiBnZXREZWdyZWUsXHJcbiAgICAnbmV4dFBvc2l0aW9uJzogbmV4dFBvc2l0aW9uLFxyXG4gICAgJ2dldERlc3RpbmF0aW9uJzogZ2V0RGVzdGluYXRpb24sXHJcbiAgICAnZ2V0RGlyZWN0aW9uJzogZ2V0RGlyZWN0aW9uLFxyXG4gICAgJ2dldE1vdmVkUG9pbnRCeURlZ3JlZSc6IGdldE1vdmVkUG9pbnRCeURlZ3JlZSxcclxuICAgICdjbG9uZSc6IGNsb25lXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvZW5naW5lL3V0aWxzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXJEZWF0aDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS50cmlnZ2VyR2xvYmFsRXZlbnQoJ3BsYXllcl9kZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGFtYWdlT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95T25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBvYmoucG9zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCA8IG9iamVjdHNbaV0uX3BhcmFtZXRlcnMuaGVhbHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoICsgb2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IG9iamVjdHNbaV0uX3BhcmFtZXRlcnMuaGVhbHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoICs9IG9iai5wYXJhbWV0ZXJzLmhlYWx0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggPSBvYmplY3RzW2ldLl9wYXJhbWV0ZXJzLmhlYWx0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lbGVlQXR0YWNrIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnNwZWVkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldFNwZWVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuc3BlZWQgPSBvYmouX3BhcmFtZXRlcnMuc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0RWZmZWN0cyA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmVmZmVjdHMuc3BsaWNlKDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVG9EaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24odXRpbHMuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLCBvYmoucGFyYW1ldGVycy5zcGVlZCAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJsb29kID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdibG9vZCcpO1xyXG4gICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqLnBvcztcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FuU2hvb3Q6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FuTWVsZWU6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLm1lbGVlQ29vbGRvd24gJiYgb2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zc0xvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhclx0YnVsbGV0Q29uZmlnID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdtYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdtYnVsbGV0XycgKyBvYmouaWQgKyAnXycgKyBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHBsYXllci5wb3MpWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVXaXRoS2V5Ym9hcmQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDY1KTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnVwID0gb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDg3KTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24gPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oODMpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24ucmlnaHQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNjgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdID09IHBvc1swXSAmJiBvYmoucG9zWzFdID09IHBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IGRpcmVjdGlvbi5kaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0U3BlbGxXaXRoS2V5Ym9hcmQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNDkpKSAmJiAob2JqLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID0gJ2ZpcmViYWxsJyk7XHJcbiAgICAgICAgICAgIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNTApKSAmJiAob2JqLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID0gJ2Zyb3N0U2hhcmQnKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big1MSkpICYmIChvYmoucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPSAndGVsZXBvcnQnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVsbFBvd2VyICs9IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91bml0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcmFuZG9tX3RyZWVzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21Qb2ludEluQXJlYSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLmdhbWUuY2FudmFzLndpZHRoKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLmdhbWUuY2FudmFzLmhlaWdodCldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFyYW1ldGVycy50cmVlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd0cmVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnN0b25lczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdzdG9uZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdG9uZSA9IHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHN0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICB0cmVlczogMzAsXHJcbiAgICAgICAgICAgIHN0b25lczogMjBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fbW9uc3Rlcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCA8IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb25zdGVyQ29uZmlnID0gKE1hdGgucmFuZG9tKCkgKiAxMDAgPiAoMTAwIC0gdGhpcy5wYXJhbWV0ZXJzLmNoYW5jZU9mQm9zcykpID8gb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyQm9zcycpIDogb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzFdIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSArIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdICsgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QobW9uc3RlckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJDb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1swLCAwXSwgWzgwMCwgNjAwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRNb25zdGVyQ29vbGRvd246IDgsXHJcbiAgICAgICAgICAgIGNoYW5jZU9mQm9zcyA6IDMsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJDb29sZG93bjogOCxcclxuICAgICAgICAgICAgbW9uc3RlclNwYXduZWQ6IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25faGVhcnQ6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ2hlYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMV1dO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1s1MCwgNTBdLCBbNzUwLCA1NTBdXSxcclxuICAgICAgICAgICAgY3VycmVudENvb2xkb3duOiA0MDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiA0MDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fcG93ZXJ1cDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IG9iai5nYW1lLmdldENvbmZpZygncG93ZXJ1cCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMF0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKSArIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzFdXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbNTAsIDUwXSwgWzg1MCwgNzUwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb29sZG93bjogNTAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNTAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGNvdW50TW9uc3RlcktpbGxlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGtpbGxzOiBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkIHx8IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRpbWVyIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcisrKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoZWFsdGggOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFsdGg6IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXS5wYXJhbWV0ZXJzLmhlYWx0aFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVzdFRpbWUgOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLmJlc3RUaW1lKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VpLmpzXG4gKiovIiwidmFyIG5hcmdzID0gL1xceyhbMC05YS16QS1aXSspXFx9L2dcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZykge1xuICAgIHZhciBhcmdzXG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHNbMV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgfVxuXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XG4gICAgICAgIGFyZ3MgPSB7fVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShuYXJncywgZnVuY3Rpb24gcmVwbGFjZUFyZyhtYXRjaCwgaSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdFxuXG4gICAgICAgIGlmIChzdHJpbmdbaW5kZXggLSAxXSA9PT0gXCJ7XCIgJiZcbiAgICAgICAgICAgIHN0cmluZ1tpbmRleCArIG1hdGNoLmxlbmd0aF0gPT09IFwifVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gYXJncy5oYXNPd25Qcm9wZXJ0eShpKSA/IGFyZ3NbaV0gOiBudWxsXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdzdHJpbmctdGVtcGxhdGUnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGJpbmRQb3NpdGlvblRvTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPCBvYmoubGF5ZXIucG9zWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zWzBdICsgb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1swXSA9IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSAtIG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA8IG9iai5sYXllci5wb3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NbMV0gKyBvYmouc3ByaXRlLnNpemVbMV0gLyAyID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzFdIDwgMCB8fCBvYmoucG9zWzFdIC0gb2JqLnNwcml0ZS5zaXplWzFdID4gb2JqLmxheWVyLnBvc1sxXSArIG9iai5sYXllci5zaXplWzFdIHx8IG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gfHwgb2JqLnBvc1swXSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGR5bmFtaWNaSW5kZXg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5ld1pJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG9iai5wb3MgJiYgKG5ld1pJbmRleCArPSBvYmoucG9zWzFdKTtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZSAmJiAobmV3WkluZGV4ICs9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIpO1xyXG5cclxuICAgICAgICAgICAgb2JqLnpJbmRleCA9IChvYmoucG9zWzFdID4gMCkgPyBNYXRoLnJvdW5kKG5ld1pJbmRleCkgOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb2xsaXNpb25zOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucy5jZWxscyA9IG5ldyBBcnJheSg0KTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUuY29sbGlzaW9ucy51cGRhdGVPYmplY3Qob2JqKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUuY29sbGlzaW9ucy51cGRhdGVPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAobW91c2VQb3NpdGlvbikgPyBbbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gKyAxXSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvTW91c2UgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgb2JqLnNwcml0ZS5yb3RhdGVUb0RpcmVjdGlvbihkaXJlY3Rpb25Ub01vdXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmluZFBvc2l0aW9uVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbigobW91c2VQb3NpdGlvbik/W21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtvYmoucG9zWzBdLCBvYmoucG9zWzFdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZU9uQ29vbGRvd246IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkZXN0cm95QWZ0ZXJTcHJpdGVEb25lOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYob2JqLnNwcml0ZS5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvdGF0ZUJ5RGlyZWN0aW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2V0Yy5qc1xuICoqLyIsInZhciBsaXN0ID0gW1xyXG4gICAgJ2ltZy9zcHJpdGVzLnBuZycsXHJcbiAgICAnaW1nL2RlbW9ucy5wbmcnLFxyXG4gICAgJ2ltZy9maXJlYmFsbHNwcml0ZS5wbmcnLFxyXG4gICAgJ2ltZy9tYWluaGVyby5wbmcnLFxyXG4gICAgJ2ltZy9tb25zdGVyczIucG5nJyxcclxuICAgICdpbWcvc3BlbGxpY29ucy5wbmcnLFxyXG4gICAgJ2ltZy9zcGVsbC5wbmcnLFxyXG4gICAgJ2ltZy93YWxsLnBuZycsXHJcbiAgICAnaW1nL3Bvd2VydXAucG5nJyxcclxuICAgICdpbWcvZ2F0ZXMucG5nJyxcclxuICAgICdpbWcvc2tlbGV0b24ucG5nJyxcclxuICAgICdpbWcvc3RvbmVzLnBuZycsXHJcbiAgICAnaW1nL3NibG9vZC5wbmcnLFxyXG4gICAgJ2ltZy90cmVlLnBuZycsXHJcbiAgICAnaW1nL2VmZmVjdHMucG5nJyxcclxuICAgICdpbWcvZnJvc3RlZmZlY3QucG5nJyxcclxuICAgICdpbWcvaGVhcnQucG5nJyxcclxuICAgICdpbWcvdGVycmFpbi5wbmcnLFxyXG4gICAgJ2ltZy9jdXJzb3IucG5nJ1xyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGlzdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3Jlc291cmNlcy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblx0bWFpbkxheWVyIDoge1xyXG5cdFx0aWQ6ICdtYWluTGF5ZXInLFxyXG5cdFx0c2l6ZSA6IFs5MDAsODAwXSxcclxuXHRcdGJhY2tncm91bmQ6ICdpbWcvdGVycmFpbi5wbmcnLFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhclx0cGxheWVyID0gdGhpcy5nYW1lLmdldENvbmZpZygncGxheWVyJyksXHJcblx0XHRcdFx0Y3Vyc29yID0gdGhpcy5nYW1lLmdldENvbmZpZygnY3Vyc29yJyksXHJcblx0XHRcdFx0Y291bnRlciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2NvdW50ZXInKSxcclxuXHRcdFx0XHR0aW1lciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3RpbWVyJyksXHJcblx0XHRcdFx0YmVzdFRpbWUgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdiZXN0VGltZScpLFxyXG5cdFx0XHRcdGZpcmViYWxsID0gdGhpcy5nYW1lLmdldENvbmZpZygnZmlyZWJhbGxTcGVsbCcpLFxyXG5cdFx0XHRcdGZyb3N0U2hhcmQgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdmcm9zdFNoYXJkU3BlbGwnKSxcclxuXHRcdFx0XHR0ZWxlcG9ydFNwZWxsID0gdGhpcy5nYW1lLmdldENvbmZpZygndGVsZXBvcnRTcGVsbCcpO1xyXG5cclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgPSAwO1xyXG5cdFx0XHR0aGlzLmdhbWUucGFyYW1ldGVycy5nYW1lVGltZXIgPSAwO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRPYmplY3RzKFtwbGF5ZXIsIGN1cnNvciwgY291bnRlciwgdGltZXIsIGJlc3RUaW1lLCBmaXJlYmFsbCwgZnJvc3RTaGFyZCwgdGVsZXBvcnRTcGVsbF0pO1xyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3NwYXduX21vbnN0ZXInLCAncmFuZG9tX3RyZWVzJyAsJ3NwYXduX2hlYXJ0Jywnc3Bhd25fcG93ZXJ1cCddXHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvbGF5ZXJzLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RKQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEdBO0FBQ0E7QUFxQkE7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=