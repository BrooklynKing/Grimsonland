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
	        id: 'bullet',
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
	        id: 'spellPart',
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
	        zIndex: 3,
	        id: 'heart',
	        render: 'object',
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
	        id: 'bullet',
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
	        render: 'object',
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
	        id: 'tree',
	        sprite: ['img/tree.png', [0, 0], [76, 76]],
	        size: [70, 70],
	        rules: ['dynamicZIndex']
	    },
	    wall: {
	        id: 'wall',
	        sprite: ['img/wall2.png', [0, 0], [48, 64]],
	        size: [48, 64]
	    },
	    gate: {
	        id: 'gate',
	        sprite: ['img/gates2.png', [0, 0], [96, 65]],
	        size: [96, 65]
	    },
	    stones: {
	        id: 'stones',
	        render: 'object',
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
	                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
	                    if (obj.parameters.fireCooldown == 0) {
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
	                            startDegree = 10 * player.parameters.spellPower;

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
	                        frostShard.id = 'shard' + obj.parameters.shardsFired++;

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
	function getRadians(degree) {
	    return degree * Math.PI / 180;
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
	                var _config = obj.game.getConfig('tree');

	                _config.pos = getRandomPointInArea(this.parameters.area);

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = obj.game.getConfig('stones');

	                _config2.pos = getRandomPointInArea(this.parameters.area);

	                var stone = this.context.addObject(_config2);
	                stone.sprite.setDegree(_utils2.default.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            trees: 30,
	            stones: 0
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
	            area: [[50, 50], [750, 550]],
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
	var list = ['img/sprites.png', 'img/demons.png', 'img/fireballsprite.png', 'img/mainhero.png', 'img/mainhero2.png', 'img/mainhero3.png', 'img/monsters2.png', 'img/spellicons.png', 'img/spell.png', 'img/wall2.png', 'img/powerup.png', 'img/powerup2.png', 'img/gates2.png', 'img/skeleton.png', 'img/stones.png', 'img/sblood.png', 'img/tree.png', 'img/effects.png', 'img/frosteffect.png', 'img/heart.png', 'img/heart2.png', 'img/terrain.png', 'img/cursor.png'];

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
			size: [800, 600],
			background: 'img/terrain.png',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9zcGVsbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy90ZXJyYWluLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdWkuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9lbmdpbmUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMvbGF5ZXJzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy8uLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9ldGMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMvaW5kZXgnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcy9pbmRleCc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBzcGVsbHMgZnJvbSAnLi9zcGVsbHMnO1xyXG5pbXBvcnQgdW5pdHMgZnJvbSAnLi91bml0cyc7XHJcbmltcG9ydCBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cyc7XHJcbmltcG9ydCB0ZXJyYWluIGZyb20gJy4vdGVycmFpbic7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuXHJcbnZhciBvYmplY3RzID0ge307XHJcblxyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdW5pdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIGVmZmVjdHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVpKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB0ZXJyYWluKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuICAgIGZpcmViYWxsU3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIGlkIDogJ2ZpcmViYWxsJyxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL3NwZWxsaWNvbnMucG5nJywgWzAsIDBdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzM1NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBidWxsZXRzRmlyZWQ6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAxMCxcclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duIDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWydmaXJlYmFsbCddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBpZCA6ICdmcm9zdFNoYXJkJyxcclxuICAgICAgICBzcHJpdGU6IFsnaW1nL3NwZWxsaWNvbnMucG5nJywgWzIyNCwgOTZdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzQwMCwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzaGFyZHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiA1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Zyb3N0U2hhcmQnXVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0U3BlbGw6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIGlkIDogJ3RlbGVwb3J0U3BlbGwnLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvc3BlbGxpY29ucy5wbmcnLCBbNjQsIDMyXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs0NDQsIDU4MF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICdzcGVsbCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAyMDAsXHJcbiAgICAgICAgICAgIHRlbGVwb3J0R2F0ZXMgOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwLFxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWyd0ZWxlcG9ydCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRHYXRlOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICBpZCA6ICd0ZWxlcG9ydEdhdGUnLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9zcGVsbC5wbmcnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd246IDUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1bGxldCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIGlkIDogJ2J1bGxldCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZmlyZWJhbGxzcHJpdGUucG5nJyxbIDAsIDBdLCBbMzMsIDMzXSwgMTYsIFswLCAxLCAyLCAzXV0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMjVdLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBzcGVlZDogNDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ2J1bGxldE1vbnN0ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBmcm9zdFNoYXJkIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgaWQgOiAnc3BlbGxQYXJ0JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9lZmZlY3RzLnBuZycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzEyMCwgMTIwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDM1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBpZCA6ICdwbGF5ZXInLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvbWFpbmhlcm8ucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBwb3MgOiBbNDAwLDMwMF0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAxMCxcclxuICAgICAgICAgICAgc3BlbGxQb3dlcjogMSxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50U3BlbGw6ICdmaXJlYmFsbCcsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3BsYXllcicsXHJcbiAgICAgICAgLy9jb25kaXRpb25zIDogW10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVXaXRoS2V5Ym9hcmQnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCcsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlVG9Nb3VzZScsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgaWQgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9kZW1vbnMucG5nJywgWzAsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogNTAsXHJcbiAgICAgICAgICAgIGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDcwICxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBtZWxlZUNvb2xkb3duOiA3MCxcclxuICAgICAgICAgICAgZGVncmVlUm90YXRpb24gOiAxLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA2LFxyXG4gICAgICAgICAgICBwb3dlciA6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdjYW5NZWxlZScsICdyb3RhdGVCeURpcmVjdGlvbicsICdtZWxlZUF0dGFjaycsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zcyA6IHtcclxuICAgICAgICAvL1syODgsIDIwMF1cclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGlkIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9tb25zdGVyczIucG5nJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMzAsXHJcbiAgICAgICAgICAgIGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG4gICAgICAgICAgICBkZWdyZWVSb3RhdGlvbiA6IDEsXHJcbiAgICAgICAgICAgIGJ1bGxldHNGaXJlZCA6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duIDogMTUwICxcclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duIDogMTUwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDUsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDMwLFxyXG4gICAgICAgICAgICBlZmZlY3RzIDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmRpdGlvbnMgOiBbJ21vbnN0ZXJIZWFsdGhTdGF0dXMnICwgJ3N0b3BPbkNvbGxpc2lvbldpdGhQbGF5ZXInXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXInLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb25zdGVyQm9zc0xvZ2ljJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCcsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBoZWFydCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIGlkIDogJ2hlYXJ0JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvaGVhcnQucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNSwgWzAsMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgaGVhbHRoIDogMVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3dlcnVwIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgaWQgOiAncG93ZXJ1cCcsXHJcbiAgICAgICAgc2l6ZTogWzI1LCAyNV0sXHJcbiAgICAgICAgLy9yZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvcG93ZXJ1cDIucG5nJywgWzAsIDBdLCBbNzIsIDY1XV0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWyd0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwJ10sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgaWQgOiAnYnVsbGV0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZTogWydpbWcvZWZmZWN0cy5wbmcnLFsyODgsIDEyOF0sIFszMiwgMzJdLCAxMCwgWzAsIDEsIDJdXSxcclxuICAgICAgICB0eXBlIDogJ21vbnN0ZXJTcGVsbEVsZW1lbnQnLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMSxcclxuICAgICAgICAgICAgc3BlZWQ6IDEwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAnZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIGJsb29kIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIsXHJcbiAgICAgICAgaWQgOiAnYmxvb2QnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL3NibG9vZC5wbmcnLCBbMCwgMF0sIFszMiwgMTNdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDUwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgc2tlbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDAsXHJcbiAgICAgICAgaWQgOiAnc2tlbGV0JyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy9za2VsZXRvbi5wbmcnLCBbMCwgMF0sIFszNCwgMzRdXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93biA6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsncmVtb3ZlT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2ltZy9zcHJpdGVzLnBuZycsIFswLCAxMTddLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXSwgbnVsbCwgdHJ1ZV0sXHJcbiAgICAgICAgcnVsZXM6IFsnZGVzdHJveUFmdGVyU3ByaXRlRG9uZScsICdkeW5hbWljWkluZGV4J11cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvZWZmZWN0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblxyXG4gICAgdHJlZSA6IHtcclxuICAgICAgICBpZCA6ICd0cmVlJyxcclxuICAgICAgICBzcHJpdGUgOiBbJ2ltZy90cmVlLnBuZycsIFswLCAwXSwgWzc2LCA3Nl1dLFxyXG4gICAgICAgIHNpemUgOiBbNzAsNzBdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIHdhbGwgOiB7XHJcbiAgICAgICAgaWQgOiAnd2FsbCcsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvd2FsbDIucG5nJywgWzAsIDBdLCBbNDgsIDY0XV0sXHJcbiAgICAgICAgc2l6ZSA6IFs0OCw2NF1cclxuICAgIH0sXHJcbiAgICBnYXRlIDoge1xyXG4gICAgICAgIGlkIDogJ2dhdGUnLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnaW1nL2dhdGVzMi5wbmcnLCBbMCwgMF0sIFs5NiwgNjVdXSxcclxuICAgICAgICBzaXplIDogWzk2LDY1XVxyXG4gICAgfSxcclxuICAgIHN0b25lcyA6IHtcclxuICAgICAgICBpZCA6ICdzdG9uZXMnLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvc3RvbmVzLnBuZycsIFswLCAwXSwgWzM2LCAzNl1dLFxyXG4gICAgICAgIHNpemUgOiBbMzAsMzBdLFxyXG4gICAgICAgIHpJbmRleCA6IDBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBjdXJzb3IgOiB7XHJcbiAgICAgICAgekluZGV4IDogOTk5LFxyXG4gICAgICAgIGlkIDogJ2N1cnNvcicsXHJcbiAgICAgICAgcG9zOiBbNDAwLDM1MF0sXHJcbiAgICAgICAgc3ByaXRlIDogWydpbWcvY3Vyc29yLnBuZycsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2JpbmRQb3NpdGlvblRvTW91c2UnXVxyXG4gICAgfSxcclxuICAgIGNvdW50ZXI6IHtcclxuICAgICAgICBpZCA6ICdjb3VudGVyJyxcclxuICAgICAgICB6SW5kZXggOiA5MTAsXHJcbiAgICAgICAgcG9zOiBbNSwgMTNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiREVNT05TIEtJTExFRDoge2tpbGxzfVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2NvdW50TW9uc3RlcktpbGxlZCddXHJcbiAgICB9LFxyXG4gICAgdGltZXI6IHtcclxuICAgICAgICBpZCA6ICd0aW1lcicsXHJcbiAgICAgICAgekluZGV4IDogOTEwLFxyXG4gICAgICAgIHBvczogWzUsIDI4NV0sXHJcbiAgICAgICAgcmVuZGVyIDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJUSU1FUjoge3RpbWV9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsndGltZXInXVxyXG4gICAgfSxcclxuICAgIGJlc3RUaW1lOiB7XHJcbiAgICAgICAgaWQgOiAnYmVzdFRpbWUnLFxyXG4gICAgICAgIHBvczogWzUsIDI5NV0sXHJcbiAgICAgICAgekluZGV4IDogOTAwLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydiZXN0VGltZSddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3VpLmpzXG4gKiovIiwiaW1wb3J0IHNwZWxscyBmcm9tICcuL3NwZWxscyc7XHJcbmltcG9ydCB1bml0cyBmcm9tICcuL3VuaXRzJztcclxuaW1wb3J0IGxheWVycyBmcm9tICcuL2xheWVycyc7XHJcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcclxuaW1wb3J0IGV0YyBmcm9tICcuL2V0Yyc7XHJcblxyXG52YXIgcnVsZXMgPSB7fTtcclxuXHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHNwZWxscyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgbGF5ZXJzKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgdWkpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBldGMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcnVsZXM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgZmlyZWJhbGwgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnBhcmFtZXRlcnMuY3VycmVudFNwZWxsID09ICdmaXJlYmFsbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJ1bGUgPSBvYmosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2J1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gKG1vdXNlUG9zaXRpb24pID8gW21vdXNlUG9zaXRpb24ueCwgbW91c2VQb3NpdGlvbi55XSA6IFtwbGF5ZXIucG9zWzBdLCBwbGF5ZXIucG9zWzFdIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERlZ3JlZSA9IDEwICogKHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGF5ZXIucGFyYW1ldGVycy5zcGVsbFBvd2VyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uLCBzdGFydERlZ3JlZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbiwgc3RhcnREZWdyZWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGVncmVlIC09IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouX3BhcmFtZXRlcnMuY29vbGRvd24gKyA1ICogKHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgLSAxKSA+IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb29sZG93biA9IDMwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29vbGRvd24gPSBvYmouX3BhcmFtZXRlcnMuY29vbGRvd24gKyA1ICogKHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKHBsYXllci5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyBydWxlLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKHBsYXllci5wb3MsIGRlc3RpbmF0aW9uKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2xvd0VuZW1pZXMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ21vbnN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVlZCA8IG9iai5wYXJhbWV0ZXJzLnBvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLnNwZWVkIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmVmZmVjdHMuaW5kZXhPZignZnJvemVuJykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmVmZmVjdHMucHVzaCgnZnJvemVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbGVwb3J0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPT0gJ3RlbGVwb3J0Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLm1vdXNlLmlzTW91c2VEb3duKCkgfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVsZXBvcnRHYXRlID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCd0ZWxlcG9ydEdhdGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSBvYmoubGF5ZXIuZ2FtZS5tb3VzZS5nZXRNb3VzZVBvc2l0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ocGxheWVyLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKHBsYXllci5wb3MsIChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbcGxheWVyLnBvc1swXSwgcGxheWVyLnBvc1sxXSAtIDFdLCAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IHV0aWxzLmdldERlc3RpbmF0aW9uKHBsYXllci5wb3MsIGRpcmVjdGlvbiwgb2JqLnBhcmFtZXRlcnMucG93ZXIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSB1dGlscy5jbG9uZShwbGF5ZXIucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRHYXRlLmlkID0gJ3NoYXJkJyArIG9iai5wYXJhbWV0ZXJzLnRlbGVwb3J0R2F0ZXMrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSB1dGlscy5jbG9uZShkZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5pZCA9ICdzaGFyZCcgKyBvYmoucGFyYW1ldGVycy50ZWxlcG9ydEdhdGVzKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0UG9zaXRpb24oZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvb2xkb3duID0gb2JqLl9wYXJhbWV0ZXJzLmNvb2xkb3duIC0gKDMwICogKHBsYXllci5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgLSAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb29sZG93biA9IChjb29sZG93biA+IDUwKSA/IGNvb2xkb3duIDogNTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPSBvYmoucGFyYW1ldGVycy5jb29sZG93bjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmcm9zdFNoYXJkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPT0gJ2Zyb3N0U2hhcmQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUubW91c2UuaXNNb3VzZURvd24oKSB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcm9zdFNoYXJkID0gb2JqLmxheWVyLmdhbWUuZ2V0Q29uZmlnKCdmcm9zdFNoYXJkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gb2JqLmxheWVyLmdhbWUubW91c2UuZ2V0TW91c2VQb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSAobW91c2VQb3NpdGlvbikgPyBbbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW3BsYXllci5wb3NbMF0sIHBsYXllci5wb3NbMV0gLSAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb3N0U2hhcmQucG9zID0gdXRpbHMuY2xvbmUoZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9zdFNoYXJkLmlkID0gJ3NoYXJkJyArIG9iai5wYXJhbWV0ZXJzLnNoYXJkc0ZpcmVkKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BlbGxQb3dlckJvb3N0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcGxheWVyLnBhcmFtZXRlcnMuc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyQm9vc3QgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb3N0U2hhcmQucGFyYW1ldGVycy5jb29sZG93biArPSBzcGVsbFBvd2VyQm9vc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGZyb3N0U2hhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24tLTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdtb25zdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBvYmplY3RzW2ldLnBvcztcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBvYmplY3RzW2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3NwZWxscy5qc1xuICoqLyIsImZ1bmN0aW9uIGNvbGxpZGVzKHgsIHksIHIsIGIsIHgyLCB5MiwgcjIsIGIyKSB7XHJcbiAgICByZXR1cm4gIShyID49IHgyIHx8IHggPCByMiB8fFxyXG4gICAgYiA+PSB5MiB8fCB5IDwgYjIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBib3hDb2xsaWRlcyhwb3MsIHNpemUsIHBvczIsIHNpemUyKSB7XHJcbiAgICByZXR1cm4gY29sbGlkZXMocG9zWzBdICsgc2l6ZVswXSAvIDIsIHBvc1sxXSArIHNpemVbMV0gLyAyLFxyXG4gICAgICAgIHBvc1swXSAtIHNpemVbMF0gLyAyLCBwb3NbMV0gLSBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdICsgc2l6ZTJbMF0gLyAyLCBwb3MyWzFdICsgc2l6ZTJbMV0gLyAyLFxyXG4gICAgICAgIHBvczJbMF0gLSBzaXplMlswXSAvIDIsIHBvczJbMV0gLSBzaXplMlsxXSAvIDIpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJhZGlhbnMoZGVncmVlKSB7XHJcbiAgICByZXR1cm4gZGVncmVlICogTWF0aC5QSSAvIDE4MDtcclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWUocG9pbnQxLCBwb2ludDIsIHByZXZEZWdyZWUsIHNwZWVkKSB7XHJcbiAgICB2YXIgZGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKG5ld0RlZ3JlZSA9IDM2MCAtIG5ld0RlZ3JlZSk7XHJcbiAgICBuZXdEZWdyZWUgKz0gZGVncmVlO1xyXG4gICAgKG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuICAgIChuZXdEZWdyZWUgPiAzNjApICYmIChuZXdEZWdyZWUgLT0gMzYwKTtcclxuXHJcbiAgICB2YXIgZGlyID0gKChuZXdEZWdyZWUgPiAwICYmIG5ld0RlZ3JlZSA8PSA5MCkgfHwgKG5ld0RlZ3JlZSA+IDI3MCAmJiBuZXdEZWdyZWUgPD0gMzYwKSkgPyAxIDogLTE7XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHtcclxuICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICBrOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZ2V0RGVzdGluYXRpb24ocG9pbnQxLCBkaXJlY3Rpb24sIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDJbMF0gLSBwb2ludDFbMF0sIDIpICsgTWF0aC5wb3cocG9pbnQyWzFdIC0gcG9pbnQxWzFdLCAyKSkpO1xyXG59XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbihwb2ludDEsIHBvaW50Mikge1xyXG4gICAgdmFyIGssIGIsIGRpcjtcclxuXHJcbiAgICBpZiAocG9pbnQxWzBdID09IHBvaW50MlswXSkge1xyXG4gICAgICAgIGsgPSAndmVydCc7XHJcbiAgICAgICAgZGlyID0gKHBvaW50MlsxXSA+PSBwb2ludDFbMV0pID8gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrID0gKHBvaW50MlsxXSAtIHBvaW50MVsxXSkgLyAocG9pbnQyWzBdIC0gcG9pbnQxWzBdKTtcclxuICAgICAgICBiID0gcG9pbnQxWzFdIC0gcG9pbnQxWzBdICogaztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzBdID49IHBvaW50MVswXSkgPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICdrJzogayxcclxuICAgICAgICAnYic6IGIsXHJcbiAgICAgICAgJ2Rpcic6IGRpclxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZXN0aW5hdGlvbihwb2ludCwgbGluZSwgc3BlZWQpIHtcclxuICAgIHZhciB4LCB5O1xyXG4gICAgaWYgKGxpbmUuayA9PSAndmVydCcpIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF07XHJcbiAgICAgICAgeSA9IHBvaW50WzFdICsgbGluZS5kaXIgKiBzcGVlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IChwb2ludFswXSArIGxpbmUuZGlyICogc3BlZWQgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSkpO1xyXG4gICAgICAgIHkgPSAocG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkICogbGluZS5rIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gZWxsaXBzZShjb250ZXh0LCBjeCwgY3ksIHJ4LCByeSwgcm90LCBhU3RhcnQsIGFFbmQpe1xyXG4gICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZShjeCwgY3kpO1xyXG4gICAgY29udGV4dC5yb3RhdGUocm90KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC1yeCwgLXJ5KTtcclxuXHJcbiAgICBjb250ZXh0LnNjYWxlKHJ4LCByeSk7XHJcbiAgICBjb250ZXh0LmFyYygxLCAxLCAxLCBhU3RhcnQsIGFFbmQsIGZhbHNlKTtcclxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG59XHJcbmZ1bmN0aW9uIG5leHRQb3NpdGlvbihwb2ludDEsIHBvaW50Mi8qLCBzcGVlZCwgZHQqLykge1xyXG4gICAgdmFyIGRlbHRheCA9IE1hdGguYWJzKHBvaW50MlswXSAtIHBvaW50MVswXSksXHJcbiAgICAgICAgZGVsdGF5ID0gTWF0aC5hYnMocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSxcclxuICAgICAgICBlcnJvciA9IDAsXHJcbiAgICAgICAgZGVsdGFlcnIgPSAoZGVsdGF4ID4gZGVsdGF5KSA/IGRlbHRheSA6IGRlbHRheCxcclxuICAgICAgICB5ID0gcG9pbnQxWzFdLFxyXG4gICAgICAgIHggPSBwb2ludDFbMF07XHJcblxyXG4gICAgaWYgKGRlbHRheCA+IGRlbHRheSkge1xyXG4gICAgICAgIChwb2ludDFbMF0gPiBwb2ludDJbMF0pID8geC0tIDogeCsrO1xyXG4gICAgICAgIGVycm9yID0gZXJyb3IgKyBkZWx0YWVycjtcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG4gICAgICAgICAgICB5ID0gKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5IC0gMSA6IHkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5LS0gOiB5Kys7XHJcbiAgICAgICAgZXJyb3IgPSBlcnJvciArIGRlbHRhZXJyO1xyXG4gICAgICAgIGlmICgyICogZXJyb3IgPj0gZGVsdGF5KSB7XHJcbiAgICAgICAgICAgIHggPSAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHggLSAxIDogeCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBbeCwgeV07XHJcbn1cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZW9mKG9iaikgIT0gJ29iamVjdCcpXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuXHJcbiAgICB2YXIgdGVtcCA9IG9iai5jb25zdHJ1Y3RvcigpOyAvLyBjaGFuZ2VkXHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIG9iailcclxuICAgICAgICB0ZW1wW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XHJcbiAgICByZXR1cm4gdGVtcDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZWxsaXBzZTogZWxsaXBzZSxcclxuICAgIGdldFJhZGlhbnM6IGdldFJhZGlhbnMsXHJcbiAgICAnY29sbGlkZXMnOiBjb2xsaWRlcyxcclxuICAgICdib3hDb2xsaWRlcyc6IGJveENvbGxpZGVzLFxyXG4gICAgJ2dldERlZ3JlZSc6IGdldERlZ3JlZSxcclxuICAgICduZXh0UG9zaXRpb24nOiBuZXh0UG9zaXRpb24sXHJcbiAgICAnZ2V0RGVzdGluYXRpb24nOiBnZXREZXN0aW5hdGlvbixcclxuICAgICdnZXREaXJlY3Rpb24nOiBnZXREaXJlY3Rpb24sXHJcbiAgICAnZ2V0TW92ZWRQb2ludEJ5RGVncmVlJzogZ2V0TW92ZWRQb2ludEJ5RGVncmVlLFxyXG4gICAgJ2Nsb25lJzogY2xvbmVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9lbmdpbmUvdXRpbHMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHBsYXllckRlYXRoOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoIC09IG9iai5wYXJhbWV0ZXJzLnBvd2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG9iai5wb3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnBhcmFtZXRlcnMuaGVhbHRoIDwgb2JqZWN0c1tpXS5fcGFyYW1ldGVycy5oZWFsdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggKyBvYmoucGFyYW1ldGVycy5oZWFsdGggPD0gb2JqZWN0c1tpXS5fcGFyYW1ldGVycy5oZWFsdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggKz0gb2JqLnBhcmFtZXRlcnMuaGVhbHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCA9IG9iamVjdHNbaV0uX3BhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVsZWVBdHRhY2sgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0ucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc2V0U3BlZWQgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5zcGVlZCA9IG9iai5fcGFyYW1ldGVycy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRFZmZlY3RzIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZWZmZWN0cy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vdmVUb0RpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5kaXIpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbih1dGlscy5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24sIG9iai5wYXJhbWV0ZXJzLnNwZWVkICogZHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVySGVhbHRoU3RhdHVzOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmxvb2QgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZC5wb3MgPSBvYmoucG9zO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW5TaG9vdDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW5NZWxlZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMubWVsZWVDb29sZG93biAmJiBvYmoucGFyYW1ldGVycy5tZWxlZUNvb2xkb3duLS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5maXJlQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ21idWxsZXQnKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcGxheWVyLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ21idWxsZXRfJyArIG9iai5pZCArICdfJyArIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgcGxheWVyLnBvcylbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNjUpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXAgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oODcpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93biA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Myk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2OCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgIHBvc1swXSA9IG9iai5wb3NbMF0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93bikge1xyXG4gICAgICAgICAgICAgICAgcG9zWzFdID0gb2JqLnBvc1sxXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi51cCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzFdID0gb2JqLnBvc1sxXSAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMF0gPT0gcG9zWzBdICYmIG9iai5wb3NbMV0gPT0gcG9zWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcG9zKTtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5rID0gZGlyZWN0aW9uLms7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyID0gZGlyZWN0aW9uLmRpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3RTcGVsbFdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big0OSkpICYmIChvYmoucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPSAnZmlyZWJhbGwnKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big1MCkpICYmIChvYmoucGFyYW1ldGVycy5jdXJyZW50U3BlbGwgPSAnZnJvc3RTaGFyZCcpO1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQuaXNEb3duKDUxKSkgJiYgKG9iai5wYXJhbWV0ZXJzLmN1cnJlbnRTcGVsbCA9ICd0ZWxlcG9ydCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb25Qb3dlclVwIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5wYXJhbWV0ZXJzLnNwZWxsUG93ZXIgKz0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3VuaXRzLmpzXG4gKiovIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vLi4vZW5naW5lL3V0aWxzJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICByYW5kb21fdHJlZXM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVBvaW50SW5BcmVhKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMud2lkdGgpLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBvYmouZ2FtZS5jYW52YXMuaGVpZ2h0KV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnRyZWVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3RyZWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMuc3RvbmVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3N0b25lcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0b25lID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIHRyZWVzOiAzMCxcclxuICAgICAgICAgICAgc3RvbmVzOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX21vbnN0ZXI6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50TW9uc3RlckNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9uc3RlckNvbmZpZyA9IChNYXRoLnJhbmRvbSgpICogMTAwID4gKDEwMCAtIHRoaXMucGFyYW1ldGVycy5jaGFuY2VPZkJvc3MpKSA/IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlckJvc3MnKSA6IG9iai5nYW1lLmdldENvbmZpZygnbW9uc3RlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMF0gLSBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMF0pLCB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVsxXSAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMF0gKyBtb25zdGVyQ29uZmlnLnNwcml0ZVsyXVswXSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMV0pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMF0pLCB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSArIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5tb25zdGVyQ29vbGRvd247XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbMCwgMF0sIFs4MDAsIDYwMF1dLFxyXG4gICAgICAgICAgICBjdXJyZW50TW9uc3RlckNvb2xkb3duOiA4LFxyXG4gICAgICAgICAgICBjaGFuY2VPZkJvc3MgOiAzLFxyXG4gICAgICAgICAgICBtb25zdGVyQ29vbGRvd246IDgsXHJcbiAgICAgICAgICAgIG1vbnN0ZXJTcGF3bmVkOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX2hlYXJ0OiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdoZWFydCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMV1bMF0pICsgdGhpcy5wYXJhbWV0ZXJzLmFyZWFbMF1bMF0sIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdKSArIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzFdXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5jb29sZG93bjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbNTAsIDUwXSwgWzc1MCwgNTUwXV0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb29sZG93bjogNDAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNDAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX3Bvd2VydXA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3Bvd2VydXAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzBdKSArIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSkgKyB0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVsxXV07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFs3NTAsIDU1MF1dLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29vbGRvd246IDUwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDUwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl90ZXJyYWluOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBnYXRlQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCdnYXRlJyksXHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnID0gb2JqLmdhbWUuZ2V0Q29uZmlnKCd3YWxsJyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhbGxDb25maWcgPSBvYmouZ2FtZS5nZXRDb25maWcoJ3dhbGwnKTtcclxuICAgICAgICAgICAgICAgIHdhbGxDb25maWcucG9zID0gW3dhbGxDb25maWcuc2l6ZVswXSAqIGkgKyB3YWxsQ29uZmlnLnNpemVbMF0gLyAyLCB3YWxsQ29uZmlnLnNpemVbMV0vMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FsbCA9IHRoaXMuY29udGV4dC5hZGRPYmplY3Qod2FsbENvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAvL3N0b25lLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdhdGVDb25maWcucG9zID0gW3dhbGxDb25maWcucG9zWzBdICsgd2FsbENvbmZpZy5zaXplWzBdLyAyICsgZ2F0ZUNvbmZpZy5zaXplWzBdLzIsIChnYXRlQ29uZmlnLnNpemVbMV0gLSAzKS8yIF07XHJcbiAgICAgICAgICAgIHZhciBnYXRlID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChnYXRlQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9sYXllcnMuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgfHwgMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXIgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyKyspIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhlYWx0aCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGhlYWx0aDogb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLnBhcmFtZXRlcnMuaGVhbHRoXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUpIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvdWkuanNcbiAqKi8iLCJ2YXIgbmFyZ3MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZ1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nKSB7XG4gICAgdmFyIGFyZ3NcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICB9XG5cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5hcmdzLCBmdW5jdGlvbiByZXBsYWNlQXJnKG1hdGNoLCBpLCBpbmRleCkge1xuICAgICAgICB2YXIgcmVzdWx0XG5cbiAgICAgICAgaWYgKHN0cmluZ1tpbmRleCAtIDFdID09PSBcIntcIiAmJlxuICAgICAgICAgICAgc3RyaW5nW2luZGV4ICsgbWF0Y2gubGVuZ3RoXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmdzLmhhc093blByb3BlcnR5KGkpID8gYXJnc1tpXSA6IG51bGxcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgYmluZFBvc2l0aW9uVG9MYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA8IG9iai5sYXllci5wb3NbMF0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5wb3NbMF0gKyBvYmouc3ByaXRlLnNpemVbMF0gLyAyID4gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzBdID0gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyIDwgb2JqLmxheWVyLnBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1sxXSA9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvc1sxXSArIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMV0gPSBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlckxlYXZpbmdMYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMV0gPCAwIHx8IG9iai5wb3NbMV0gLSBvYmouc3ByaXRlLnNpemVbMV0gPiBvYmoubGF5ZXIucG9zWzFdICsgb2JqLmxheWVyLnNpemVbMV0gfHwgb2JqLnBvc1swXSAtIG9iai5zcHJpdGUuc2l6ZVswXSA+IG9iai5sYXllci5wb3NbMF0gKyBvYmoubGF5ZXIuc2l6ZVswXSB8fCBvYmoucG9zWzBdIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHluYW1pY1pJbmRleDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbmV3WkluZGV4ID0gMDtcclxuICAgICAgICAgICAgb2JqLnBvcyAmJiAobmV3WkluZGV4ICs9IG9iai5wb3NbMV0pO1xyXG4gICAgICAgICAgICBvYmouc3ByaXRlICYmIChuZXdaSW5kZXggKz0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMik7XHJcblxyXG4gICAgICAgICAgICBvYmouekluZGV4ID0gKG9iai5wb3NbMV0gPiAwKSA/IE1hdGgucm91bmQobmV3WkluZGV4KSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbGxpc2lvbnM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb2xsaXNpb25zLmNlbGxzID0gbmV3IEFycmF5KDQpO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvbGxpc2lvbnMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5jb2xsaXNpb25zLnVwZGF0ZU9iamVjdChvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVUb01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9Nb3VzZSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlT25Db29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5jb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlclNwcml0ZURvbmU6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlEaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24ob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvZXRjLmpzXG4gKiovIiwidmFyIGxpc3QgPSBbXHJcbiAgICAnaW1nL3Nwcml0ZXMucG5nJyxcclxuICAgICdpbWcvZGVtb25zLnBuZycsXHJcbiAgICAnaW1nL2ZpcmViYWxsc3ByaXRlLnBuZycsXHJcbiAgICAnaW1nL21haW5oZXJvLnBuZycsXHJcbiAgICAnaW1nL21haW5oZXJvMi5wbmcnLFxyXG4gICAgJ2ltZy9tYWluaGVybzMucG5nJyxcclxuICAgICdpbWcvbW9uc3RlcnMyLnBuZycsXHJcbiAgICAnaW1nL3NwZWxsaWNvbnMucG5nJyxcclxuICAgICdpbWcvc3BlbGwucG5nJyxcclxuICAgICdpbWcvd2FsbDIucG5nJyxcclxuICAgICdpbWcvcG93ZXJ1cC5wbmcnLFxyXG4gICAgJ2ltZy9wb3dlcnVwMi5wbmcnLFxyXG4gICAgJ2ltZy9nYXRlczIucG5nJyxcclxuICAgICdpbWcvc2tlbGV0b24ucG5nJyxcclxuICAgICdpbWcvc3RvbmVzLnBuZycsXHJcbiAgICAnaW1nL3NibG9vZC5wbmcnLFxyXG4gICAgJ2ltZy90cmVlLnBuZycsXHJcbiAgICAnaW1nL2VmZmVjdHMucG5nJyxcclxuICAgICdpbWcvZnJvc3RlZmZlY3QucG5nJyxcclxuICAgICdpbWcvaGVhcnQucG5nJyxcclxuICAgICdpbWcvaGVhcnQyLnBuZycsXHJcbiAgICAnaW1nL3RlcnJhaW4ucG5nJyxcclxuICAgICdpbWcvY3Vyc29yLnBuZydcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3Q7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9yZXNvdXJjZXMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG5cdG1haW5MYXllciA6IHtcclxuXHRcdGlkOiAnbWFpbkxheWVyJyxcclxuXHRcdHNpemUgOiBbODAwLDYwMF0sXHJcblx0XHRiYWNrZ3JvdW5kOiAnaW1nL3RlcnJhaW4ucG5nJyxcclxuXHRcdGluaXRMaXN0IDogWydwbGF5ZXInLCAnY3Vyc29yJywgJ2NvdW50ZXInLCAndGltZXInLCAnYmVzdFRpbWUnLCAnZmlyZWJhbGxTcGVsbCcsICdmcm9zdFNoYXJkU3BlbGwnLCAndGVsZXBvcnRTcGVsbCddLFxyXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyID0gMDtcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydzcGF3bl9tb25zdGVyJywgJ3JhbmRvbV90cmVlcycgLCdzcGF3bl9oZWFydCcsJ3NwYXduX3Bvd2VydXAnXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2xheWVycy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEdBO0FBQ0E7QUF5QkE7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9