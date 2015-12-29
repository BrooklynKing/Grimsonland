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
			sprite: ['img/sprites2.png', [0, 0], [32, 32], 6, [0, 1, 2]],
			pos: [400, 300],
			size: [30, 30],
			parameters: {
				speed: 150,
				health: 1,
				cooldown: 15,
				fireCooldown: 15,
				bulletsFired: 0,
				direction: {}
			},
			type: 'player',
			rules: ['playerLogic', 'shootOnMouseDown', 'moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse']
		},
		explosion: {
			zIndex: 3,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
			rules: ['explosionLogic']
		},
		monster: {
			zIndex: 1,
			id: 'monster',
			sprite: ['img/sprites2.png', [0, 128], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 50,
				degreeSpeed: 0.03,
				degreeRotation: 1,
				health: 6,
				power: 1
			},
			type: 'monster',
			rules: ['setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'damageOnPlayerCollision', 'rotateByDirection', 'canShoot']
		},
		monsterBoss: {
			zIndex: 1,
			id: 'monster',
			sprite: ['img/sprites2.png', [192, 128], [32, 32], 6, [0, 1, 2]],
			size: [30, 30],
			parameters: {
				speed: 30,
				degreeSpeed: 0.03,
				degreeRotation: 1,
				bulletsFired: 0,
				cooldown: 70,
				fireCooldown: 20,
				power: 5,
				health: 30
			},
			type: 'monster',
			rules: ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'rotateByDirection', 'canShoot']
		},
		bullet: {
			zIndex: 2,
			id: 'bullet',
			sprite: ['img/bsprite.png', [0, 0], [27, 27], 16, [0, 1]],
			size: [20, 20],
			type: 'spellElement',
			parameters: {
				power: 10,
				speed: 400
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'bulletMonsterCollision']
		},
		mbullet: {
			zIndex: 2,
			id: 'bullet',
			sprite: ['img/iceball.png', [0, 0], [15, 16], 16, [0, 1, 2]],
			type: 'monsterSpellElement',
			size: [12, 12],
			parameters: {
				power: 1,
				speed: 150
			},
			rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision']
		},
		cursor: {
			zIndex: 999,
			id: 'cursor',
			pos: [400, 350],
			sprite: ['img/cursor.png', [0, 0], [30, 30]],
			rules: ['cursorLogic']
		},
		blood: {
			zIndex: 0,
			id: 'blood',
			sprite: ['img/blood.png', [0, 0], [32, 13]],
			parameters: {
				cooldown: 500
			},
			rules: ['bloodLogic']
		},
		counter: {
			id: 'counter',
			zIndex: 910,
			pos: [10, 20],
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				template: "DEMONS KILLED: {kills}",
				size: 20
			},
			rules: ['countMonsterKilled']
		},
		timer: {
			id: 'timer',
			zIndex: 910,
			pos: [10, 34],
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				template: "TIMER: {time}",
				size: 20
			},
			rules: ['timer']
		},
		bestTime: {
			id: 'bestTime',
			pos: [10, 290],
			zIndex: 900,
			render: "text",
			parameters: {
				weight: "bold",
				color: "#EFEFEF",
				size: 20,
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
	    playerShootOnMouseClick: {
	        init: function init() {
	            var obj = this.context;
	            this.context.layer.game.bindGlobalEvent('eclick', function () {
	                if (obj.parameters.fireCooldown == 0) {
	                    var bulletConfig = obj.layer.game.getConfig('bullet'),
	                        mousePosition = obj.layer.game.mouse.getMousePosition(),
	                        destination = mousePosition ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] - 1],
	                        direction1 = _utils2.default.getDirection(obj.pos, destination),
	                        direction2 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, 20)),
	                        direction3 = _utils2.default.getDirection(obj.pos, _utils2.default.getMovedPointByDegree(obj.pos, destination, -20));

	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;

	                    bulletConfig.parameters.direction = direction1;
	                    obj.layer.addObject(bulletConfig);

	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.parameters.direction = direction2;

	                    obj.layer.addObject(bulletConfig);

	                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                    bulletConfig.pos = _utils2.default.clone(obj.pos);
	                    bulletConfig.parameters.direction = direction3;

	                    obj.layer.addObject(bulletConfig);
	                    obj.parameters.fireCooldown = obj.parameters.cooldown;
	                }
	            });
	        }
	    },
	    spawn_monster: {
	        update: function update(dt, obj) {
	            if (this.parameters.monsterSpawned < this.parameters.totalMonsters) {
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
	            area: [[0, 0], [1280, 720]],
	            currentMonsterCooldown: 0,
	            chanceOfBoss: 5,
	            monsterCooldown: 5,
	            monsterSpawned: 0,
	            totalMonsters: 500
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
	                explosionConfig.id = 'exp_' + player.id;

	                obj.layer.addObject(explosionConfig);

	                obj._removeInNextTick = true;
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
	                obj.layer.addObject(bulletConfig);

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
	    bloodLogic: {
	        update: function update(dt, obj) {
	            if (obj.parameters.cooldown == 0) {
	                obj.layer.removeObject(obj.id);
	            } else {
	                obj.parameters.cooldown--;
	            }
	        }
	    },
	    explosionLogic: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                var bloodConfig = obj.layer.game.getConfig('blood');
	                bloodConfig.pos = obj.pos;
	                bloodConfig.id = 'blood_' + obj.id;
	                obj.layer.addObject(bloodConfig);
	                obj.layer.removeObject(obj.id);
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
	                obj.layer.addObject(bulletConfig);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction2;

	                obj.layer.addObject(bulletConfig);

	                bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
	                bulletConfig.pos = _utils2.default.clone(obj.pos);
	                bulletConfig.parameters.direction = direction3;

	                obj.layer.addObject(bulletConfig);
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
	var list = ['img/sprites.png', 'img/grass2.png', 'img/blood.png', 'img/desert.png', 'img/iceball.png', 'img/bsprite.png', 'img/cursor.png', 'img/sprites2.png', 'img/grass3.png'];

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
			background: 'img/grass2.png',
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
			rules: ['spawn_monster']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9jb25maWdzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcnVsZXMuanMiLCJ3ZWJwYWNrOi8vL2pzL2VuZ2luZS91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9zdHJpbmctdGVtcGxhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL2xheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JqZWN0cyBmcm9tICcuL29iamVjdHMnO1xyXG5pbXBvcnQgcnVsZXMgZnJvbSAnLi9ydWxlcyc7XHJcbmltcG9ydCByZXNvdXJjZXMgZnJvbSAnLi9yZXNvdXJjZXMnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9iamVjdHM6IG9iamVjdHMsXHJcbiAgICBydWxlczogcnVsZXMsXHJcbiAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgIGxheWVyczogbGF5ZXJzXHJcbn07XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2luZGV4LmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRwbGF5ZXIgOiB7XHJcblx0XHR6SW5kZXggOiAyLFxyXG5cdFx0aWQgOiAncGxheWVyJyxcclxuXHRcdHNwcml0ZTogWydpbWcvc3ByaXRlczIucG5nJywgWzAsIDBdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuXHRcdHBvcyA6IFs0MDAsMzAwXSxcclxuXHRcdHNpemUgOiBbMzAsMzBdLFxyXG5cdFx0cGFyYW1ldGVycyA6IHtcclxuXHRcdFx0c3BlZWQgOiAxNTAsXHJcblx0XHRcdGhlYWx0aCA6IDEsXHJcblx0XHRcdGNvb2xkb3duOiAxNSxcclxuXHRcdFx0ZmlyZUNvb2xkb3duIDogMTUsXHJcblx0XHRcdGJ1bGxldHNGaXJlZDogMCxcclxuXHRcdFx0ZGlyZWN0aW9uIDoge31cclxuXHRcdH0sXHJcblx0XHR0eXBlIDogJ3BsYXllcicsXHJcblx0XHRydWxlcyA6IFsncGxheWVyTG9naWMnLCdzaG9vdE9uTW91c2VEb3duJywgJ21vdmVXaXRoS2V5Ym9hcmQnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdjYW5TaG9vdCcsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlVG9Nb3VzZSddXHJcblx0fSxcclxuXHRleHBsb3Npb24gOiB7XHJcblx0XHR6SW5kZXggOiAzLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzLnBuZycsIFswLCAxMTddLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXSwgbnVsbCwgdHJ1ZV0sXHJcblx0XHRydWxlczogWydleHBsb3Npb25Mb2dpYyddXHJcblx0fSxcclxuXHRtb25zdGVyIDoge1xyXG5cdFx0ekluZGV4IDogMSxcclxuXHRcdGlkIDogJ21vbnN0ZXInLFxyXG5cdFx0c3ByaXRlOiBbJ2ltZy9zcHJpdGVzMi5wbmcnLCBbMCwgMTI4XSwgWzMyLCAzMl0sIDYsIFswLCAxLCAyXV0sXHJcblx0XHRzaXplIDogWzMwLDMwXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHNwZWVkIDogNTAsXHJcblx0XHRcdGRlZ3JlZVNwZWVkOiAwLjAzLFxyXG5cdFx0XHRkZWdyZWVSb3RhdGlvbiA6IDEsXHJcblx0XHRcdGhlYWx0aCA6IDYsXHJcblx0XHRcdHBvd2VyIDogMVxyXG5cdFx0fSxcclxuXHRcdHR5cGUgOiAnbW9uc3RlcicsXHJcblx0XHRydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnZGFtYWdlT25QbGF5ZXJDb2xsaXNpb24nLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnY2FuU2hvb3QnXVxyXG5cdH0sXHJcblx0bW9uc3RlckJvc3MgOiB7XHJcblx0XHR6SW5kZXggOiAxLFxyXG5cdFx0aWQgOiAnbW9uc3RlcicsXHJcblx0XHRzcHJpdGU6IFsnaW1nL3Nwcml0ZXMyLnBuZycsIFsxOTIsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG5cdFx0c2l6ZSA6IFszMCwzMF0sXHJcblx0XHRwYXJhbWV0ZXJzIDoge1xyXG5cdFx0XHRzcGVlZCA6IDMwLFxyXG5cdFx0XHRkZWdyZWVTcGVlZDogMC4wMyxcclxuXHRcdFx0ZGVncmVlUm90YXRpb24gOiAxLFxyXG5cdFx0XHRidWxsZXRzRmlyZWQgOiAwLFxyXG5cdFx0XHRjb29sZG93biA6IDcwICxcclxuXHRcdFx0ZmlyZUNvb2xkb3duIDogMjAsXHJcblx0XHRcdHBvd2VyIDogNSxcclxuXHRcdFx0aGVhbHRoIDogMzBcclxuXHRcdH0sXHJcblx0XHR0eXBlIDogJ21vbnN0ZXInLFxyXG5cdFx0cnVsZXMgOiBbJ21vbnN0ZXJCb3NzTG9naWMnLCAnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCdyb3RhdGVCeURpcmVjdGlvbicsICdjYW5TaG9vdCddXHJcblx0fSxcclxuXHRidWxsZXQgOiB7XHJcblx0XHR6SW5kZXggOiAyLFxyXG5cdFx0aWQgOiAnYnVsbGV0JyxcclxuXHRcdHNwcml0ZTogWydpbWcvYnNwcml0ZS5wbmcnLFsgMCwgMF0sIFsyNywgMjddLCAxNiwgWzAsIDFdXSxcclxuXHRcdHNpemUgOiBbMjAsIDIwXSxcclxuXHRcdHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHBvd2VyIDogMTAsXHJcblx0XHRcdHNwZWVkOiA0MDBcclxuXHRcdH0sXHJcblx0XHRydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ21vdmVUb0RpcmVjdGlvbicsICdidWxsZXRNb25zdGVyQ29sbGlzaW9uJ11cclxuXHR9LFxyXG5cdG1idWxsZXQgOiB7XHJcblx0XHR6SW5kZXggOiAyLFxyXG5cdFx0aWQgOiAnYnVsbGV0JyxcclxuXHRcdHNwcml0ZTogWydpbWcvaWNlYmFsbC5wbmcnLFswLCAwXSwgWzE1LCAxNl0sIDE2LCBbMCwgMSwgMl1dLFxyXG5cdFx0dHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuXHRcdHNpemUgOiBbMTIsIDEyXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHBvd2VyIDogMSxcclxuXHRcdFx0c3BlZWQ6IDE1MFxyXG5cdFx0fSxcclxuXHRcdHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2RhbWFnZU9uUGxheWVyQ29sbGlzaW9uJywgJ2Rlc3Ryb3lPblBsYXllckNvbGxpc2lvbiddXHJcblx0fSxcclxuXHRjdXJzb3IgOiB7XHJcblx0XHR6SW5kZXggOiA5OTksXHJcblx0XHRpZCA6ICdjdXJzb3InLFxyXG5cdFx0cG9zOiBbNDAwLDM1MF0sXHJcblx0XHRzcHJpdGUgOiBbJ2ltZy9jdXJzb3IucG5nJywgWzAsIDBdLCBbMzAsIDMwXV0sXHJcblx0XHRydWxlczogWydjdXJzb3JMb2dpYyddXHJcblx0fSxcclxuXHRibG9vZCA6IHtcclxuXHRcdHpJbmRleCA6IDAsXHJcblx0XHRpZCA6ICdibG9vZCcsXHJcblx0XHRzcHJpdGUgOiBbJ2ltZy9ibG9vZC5wbmcnLCBbMCwgMF0sIFszMiwgMTNdXSxcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdGNvb2xkb3duIDogNTAwXHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnYmxvb2RMb2dpYyddXHJcblx0fSxcclxuXHRjb3VudGVyOiB7XHJcblx0XHRpZCA6ICdjb3VudGVyJyxcclxuXHRcdHpJbmRleCA6IDkxMCxcclxuXHRcdHBvczogWzEwLCAyMF0sXHJcblx0XHRyZW5kZXIgOiBcInRleHRcIixcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHdlaWdodCA6IFwiYm9sZFwiLFxyXG5cdFx0XHRjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiREVNT05TIEtJTExFRDoge2tpbGxzfVwiLFxyXG5cdFx0XHRzaXplIDogMjBcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydjb3VudE1vbnN0ZXJLaWxsZWQnXVxyXG5cdH0sXHJcblx0dGltZXI6IHtcclxuXHRcdGlkIDogJ3RpbWVyJyxcclxuXHRcdHpJbmRleCA6IDkxMCxcclxuXHRcdHBvczogWzEwLCAzNF0sXHJcblx0XHRyZW5kZXIgOiBcInRleHRcIixcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHdlaWdodCA6IFwiYm9sZFwiLFxyXG5cdFx0XHRjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG5cdFx0XHR0ZW1wbGF0ZSA6IFwiVElNRVI6IHt0aW1lfVwiLFxyXG5cdFx0XHRzaXplIDogMjBcclxuXHRcdH0sXHJcblx0XHRydWxlczogWyd0aW1lciddXHJcblx0fSxcclxuXHRiZXN0VGltZToge1xyXG5cdFx0aWQgOiAnYmVzdFRpbWUnLFxyXG5cdFx0cG9zOiBbMTAsIDI5MF0sXHJcblx0XHR6SW5kZXggOiA5MDAsXHJcblx0XHRyZW5kZXIgOiBcInRleHRcIixcclxuXHRcdHBhcmFtZXRlcnMgOiB7XHJcblx0XHRcdHdlaWdodCA6IFwiYm9sZFwiLFxyXG5cdFx0XHRjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG5cdFx0XHRzaXplIDogMjAsXHJcblx0XHRcdHRlbXBsYXRlIDogXCJCRVNUIFRJTUU6IHt0aW1lfVwiXHJcblx0XHR9LFxyXG5cdFx0cnVsZXM6IFsnYmVzdFRpbWUnXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXJTaG9vdE9uTW91c2VDbGljazoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGF5ZXIuZ2FtZS5iaW5kR2xvYmFsRXZlbnQoJ2VjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2J1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gb2JqLmxheWVyLmdhbWUubW91c2UuZ2V0TW91c2VQb3NpdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gLSAxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uMSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjIgPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgdXRpbHMuZ2V0TW92ZWRQb2ludEJ5RGVncmVlKG9iai5wb3MsIGRlc3RpbmF0aW9uLCAyMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24zID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnYnVsbGV0JyArIG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24xO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyAob2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkKyspO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gZGlyZWN0aW9uMztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fbW9uc3Rlcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCA8IHRoaXMucGFyYW1ldGVycy50b3RhbE1vbnN0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb25zdGVyQ29uZmlnID0gKE1hdGgucmFuZG9tKCkgKiAxMDAgPiAoMTAwIC0gdGhpcy5wYXJhbWV0ZXJzLmNoYW5jZU9mQm9zcykpID8gb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyQm9zcycpIDogb2JqLmdhbWUuZ2V0Q29uZmlnKCdtb25zdGVyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVswXVswXSAtIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzBdWzFdIC0gbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFt0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSArIG1vbnN0ZXJDb25maWcuc3ByaXRlWzJdWzBdLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQ29uZmlnLnBvcyA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBhcmFtZXRlcnMuYXJlYVsxXVswXSksIHRoaXMucGFyYW1ldGVycy5hcmVhWzFdWzFdICsgbW9uc3RlckNvbmZpZy5zcHJpdGVbMl1bMV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93biA9IHRoaXMucGFyYW1ldGVycy5tb25zdGVyQ29vbGRvd247XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudE1vbnN0ZXJDb29sZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIGFyZWE6IFtbMCwgMF0sIFsxMjgwLCA3MjBdXSxcclxuICAgICAgICAgICAgY3VycmVudE1vbnN0ZXJDb29sZG93bjogMCxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzIDogNSxcclxuICAgICAgICAgICAgbW9uc3RlckNvb2xkb3duOiA1LFxyXG4gICAgICAgICAgICBtb25zdGVyU3Bhd25lZDogMCxcclxuICAgICAgICAgICAgdG90YWxNb25zdGVyczogNTAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXllckRlYXRoOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5nYW1lLnRyaWdnZXJHbG9iYWxFdmVudCgncGxheWVyX2RlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYW1hZ2VPblBsYXllckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5ib3hDb2xsaWRlcyhvYmoucG9zLCBvYmouc2l6ZSwgcGxheWVyLnBvcywgcGxheWVyLnNpemUpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGFyYW1ldGVycy5oZWFsdGggLT0gb2JqLnBhcmFtZXRlcnMucG93ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmJveENvbGxpZGVzKG9iai5wb3MsIG9iai5zaXplLCBwbGF5ZXIucG9zLCBwbGF5ZXIuc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IHBsYXllci5wb3M7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBwbGF5ZXIuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVsbGV0TW9uc3RlckNvbGxpc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1vbnN0ZXJzID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ21vbnN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9uc3RlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuYm94Q29sbGlkZXMob2JqLnBvcywgb2JqLnNpemUsIG1vbnN0ZXJzW2ldLnBvcywgbW9uc3RlcnNbaV0uc2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyc1tpXS5wYXJhbWV0ZXJzLmhlYWx0aCAtPSBvYmoucGFyYW1ldGVycy5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnZXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG1vbnN0ZXJzW2ldLnBvcztcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcuaWQgPSAnZXhwXycgKyBtb25zdGVyc1tpXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kUG9zaXRpb25Ub0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3NbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDwgb2JqLmxheWVyLnBvc1swXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1swXSA9IG9iai5zcHJpdGUuc2l6ZVswXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvc1swXSArIG9iai5zcHJpdGUuc2l6ZVswXSAvIDIgPiBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3NbMF0gPSBvYmoubGF5ZXIucG9zWzBdICsgb2JqLmxheWVyLnNpemVbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1sxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPCBvYmoubGF5ZXIucG9zWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zWzFdID0gb2JqLnNwcml0ZS5zaXplWzFdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zWzFdICsgb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvc1sxXSA9IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBvc1sxXSA8IDAgfHwgb2JqLnBvc1sxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSA+IG9iai5sYXllci5wb3NbMV0gKyBvYmoubGF5ZXIuc2l6ZVsxXSB8fCBvYmoucG9zWzBdIC0gb2JqLnNwcml0ZS5zaXplWzBdID4gb2JqLmxheWVyLnBvc1swXSArIG9iai5sYXllci5zaXplWzBdIHx8IG9iai5wb3NbMF0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldERpcmVjdGlvblRvUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVG9EaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZGlyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24odXRpbHMuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLCBvYmoucGFyYW1ldGVycy5zcGVlZCAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckhlYWx0aFN0YXR1czoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxheWVyLmdhbWUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVCeURpcmVjdGlvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZS5yb3RhdGVUb0RpcmVjdGlvbihvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVUb01vdXNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKSA/IFttb3VzZVBvc2l0aW9uLngsIG1vdXNlUG9zaXRpb24ueV0gOiBbb2JqLnBvc1swXSwgb2JqLnBvc1sxXSArIDFdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9Nb3VzZSA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBvYmouc3ByaXRlLnJvdGF0ZVRvRGlyZWN0aW9uKGRpcmVjdGlvblRvTW91c2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW5TaG9vdDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93bi0tO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zWzBdID0gb2JqLnBvc1swXSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3NbMF0gPSBvYmoucG9zWzBdIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvc1sxXSA9IG9iai5wb3NbMV0gLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmoucG9zWzBdID09IHBvc1swXSAmJiBvYmoucG9zWzFdID09IHBvc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uayA9IGRpcmVjdGlvbi5rO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmRpciA9IGRpcmVjdGlvbi5kaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3NMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHV0aWxzLmdldERpcmVjdGlvbihvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucG9zID0gdXRpbHMuY2xvbmUob2JqLnBvcyk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcuaWQgPSAnbWJ1bGxldF8nICsgb2JqLmlkICsgJ18nICsgb2JqLnBhcmFtZXRlcnMuYnVsbGV0c0ZpcmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9IG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGN1cnNvckxvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmxvb2RMb2dpYzoge1xyXG4gICAgICAgIHVwZGF0ZSA6IGZ1bmN0aW9uKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5yZW1vdmVPYmplY3Qob2JqLmlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmNvb2xkb3duLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uTG9naWM6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIHZhclx0Ymxvb2RDb25maWcgPSBvYmoubGF5ZXIuZ2FtZS5nZXRDb25maWcoJ2Jsb29kJyk7XHJcbiAgICAgICAgICAgICAgICBibG9vZENvbmZpZy5wb3MgPSBvYmoucG9zO1xyXG4gICAgICAgICAgICAgICAgYmxvb2RDb25maWcuaWQgPSAnYmxvb2RfJyArIG9iai5pZDtcclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2RDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLnJlbW92ZU9iamVjdChvYmouaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNob290T25Nb3VzZURvd246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5tb3VzZS5pc01vdXNlRG93bigpICYmIG9iai5wYXJhbWV0ZXJzLmZpcmVDb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IG9iai5sYXllci5nYW1lLmdldENvbmZpZygnYnVsbGV0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VQb3NpdGlvbiA9IG9iai5sYXllci5nYW1lLm1vdXNlLmdldE1vdXNlUG9zaXRpb24oKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IChtb3VzZVBvc2l0aW9uKT9bbW91c2VQb3NpdGlvbi54LCBtb3VzZVBvc2l0aW9uLnldIDogW29iai5wb3NbMF0sIG9iai5wb3NbMV0gLSAxXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24xID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIGRlc3RpbmF0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24yID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgMjApKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24zID0gdXRpbHMuZ2V0RGlyZWN0aW9uKG9iai5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShvYmoucG9zLCBkZXN0aW5hdGlvbiwgLTIwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHV0aWxzLmNsb25lKG9iai5wb3MpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLmlkID0gJ2J1bGxldCcgKyBvYmoucGFyYW1ldGVycy5idWxsZXRzRmlyZWQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXRDb25maWcucGFyYW1ldGVycy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24xO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjI7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5pZCA9ICdidWxsZXQnICsgKG9iai5wYXJhbWV0ZXJzLmJ1bGxldHNGaXJlZCsrKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSB1dGlscy5jbG9uZShvYmoucG9zKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wYXJhbWV0ZXJzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjM7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChidWxsZXRDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZmlyZUNvb2xkb3duID0gb2JqLnBhcmFtZXRlcnMuY29vbGRvd247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMuZGlyZWN0aW9uLmxlZnQgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oNjUpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24udXAgPSBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5pc0Rvd24oODcpO1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy5kaXJlY3Rpb24uZG93biA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big4Myk7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLmRpcmVjdGlvbi5yaWdodCA9IG9iai5sYXllci5nYW1lLmlucHV0LmlzRG93big2OCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvdW50TW9uc3RlcktpbGxlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5wYXJhbWV0ZXJzLnRleHQgPSBmb3JtYXQob2JqLnBhcmFtZXRlcnMudGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGtpbGxzOiBvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkIHx8IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRpbWVyIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgb2JqLnBhcmFtZXRlcnMudGV4dCA9IGZvcm1hdChvYmoucGFyYW1ldGVycy50ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGltZTogKChvYmoubGF5ZXIuZ2FtZS5wYXJhbWV0ZXJzLmdhbWVUaW1lcisrKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBvYmoucGFyYW1ldGVycy50ZXh0ID0gZm9ybWF0KG9iai5wYXJhbWV0ZXJzLnRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5nYW1lLnBhcmFtZXRlcnMuYmVzdFRpbWUpIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMuanNcbiAqKi8iLCJmdW5jdGlvbiBjb2xsaWRlcyh4LCB5LCByLCBiLCB4MiwgeTIsIHIyLCBiMikge1xyXG4gICAgcmV0dXJuICEociA+PSB4MiB8fCB4IDwgcjIgfHxcclxuICAgIGIgPj0geTIgfHwgeSA8IGIyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94Q29sbGlkZXMocG9zLCBzaXplLCBwb3MyLCBzaXplMikge1xyXG4gICAgcmV0dXJuIGNvbGxpZGVzKHBvc1swXSArIHNpemVbMF0gLyAyLCBwb3NbMV0gKyBzaXplWzFdIC8gMixcclxuICAgICAgICBwb3NbMF0gLSBzaXplWzBdIC8gMiwgcG9zWzFdIC0gc2l6ZVsxXSAvIDIsXHJcbiAgICAgICAgcG9zMlswXSArIHNpemUyWzBdIC8gMiwgcG9zMlsxXSArIHNpemUyWzFdIC8gMixcclxuICAgICAgICBwb3MyWzBdIC0gc2l6ZTJbMF0gLyAyLCBwb3MyWzFdIC0gc2l6ZTJbMV0gLyAyKTtcclxufVxyXG5mdW5jdGlvbiBnZXREZWdyZWUocG9pbnQxLCBwb2ludDIsIHByZXZEZWdyZWUsIHNwZWVkKSB7XHJcbiAgICB2YXIgZGVncmVlID0gTWF0aC5hY29zKCgocG9pbnQyWzBdIC0gcG9pbnQxWzBdKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQyWzBdIC0gcG9pbnQxWzBdLCAyKSArIE1hdGgucG93KHBvaW50MlsxXSAtIHBvaW50MVsxXSwgMikpKTtcclxuICAgIChwb2ludDFbMV0gPiBwb2ludDJbMV0pICYmIChkZWdyZWUgPSAtZGVncmVlKTtcclxuICAgIGlmIChkZWdyZWUgPT0gcHJldkRlZ3JlZSkge1xyXG4gICAgICAgIHJldHVybiBbZGVncmVlLCAwXTtcclxuICAgIH0gZWxzZSBpZiAoKChkZWdyZWUgPCAwICYmIHByZXZEZWdyZWUgPiAwKSB8fCAoZGVncmVlID4gMCAmJiBwcmV2RGVncmVlIDwgMCkpICYmIChNYXRoLmFicyhwcmV2RGVncmVlIC0gZGVncmVlKSA+IE1hdGguUEkpKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZVdpdGhTcGVlZCA9ICgocHJldkRlZ3JlZSA+IDApID8gcHJldkRlZ3JlZSArIHNwZWVkIDogcHJldkRlZ3JlZSAtIHNwZWVkKTtcclxuICAgICAgICBpZiAoZGVncmVlV2l0aFNwZWVkID4gTWF0aC5QSSkge1xyXG4gICAgICAgICAgICBkZWdyZWVXaXRoU3BlZWQgPSAtTWF0aC5QSSArIChkZWdyZWVXaXRoU3BlZWQgLSBNYXRoLlBJKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlZ3JlZVdpdGhTcGVlZCA8IC1NYXRoLlBJKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZVdpdGhTcGVlZCA9IE1hdGguUEkgKyAoZGVncmVlV2l0aFNwZWVkICsgTWF0aC5QSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZGVncmVlV2l0aFNwZWVkLCBNYXRoLnBvdyhNYXRoLlBJLCAyKSAtIE1hdGguYWJzKHByZXZEZWdyZWUgLSBkZWdyZWUpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFsoTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSkgPiBzcGVlZCkgPyAoKHByZXZEZWdyZWUgPiBkZWdyZWUpID8gcHJldkRlZ3JlZSAtIHNwZWVkIDogcHJldkRlZ3JlZSArIHNwZWVkKSA6IGRlZ3JlZSwgTWF0aC5hYnMocHJldkRlZ3JlZSAtIGRlZ3JlZSldO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUocG9pbnQxLCBwb2ludDIsIGRlZ3JlZSkge1xyXG4gICAgdmFyIG5ld0RlZ3JlZSA9IE1hdGguYWNvcygoKHBvaW50MlswXSAtIHBvaW50MVswXSkpIC8gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbiAgICBuZXdEZWdyZWUgPSBuZXdEZWdyZWUgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgJiYgKG5ld0RlZ3JlZSA9IDM2MCAtIG5ld0RlZ3JlZSk7XHJcbiAgICBuZXdEZWdyZWUgKz0gZGVncmVlO1xyXG4gICAgKG5ld0RlZ3JlZSA8IDApICYmIChuZXdEZWdyZWUgKz0gMzYwKTtcclxuICAgIChuZXdEZWdyZWUgPiAzNjApICYmIChuZXdEZWdyZWUgLT0gMzYwKTtcclxuXHJcbiAgICB2YXIgZGlyID0gKChuZXdEZWdyZWUgPiAwICYmIG5ld0RlZ3JlZSA8PSA5MCkgfHwgKG5ld0RlZ3JlZSA+IDI3MCAmJiBuZXdEZWdyZWUgPD0gMzYwKSkgPyAxIDogLTE7XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHtcclxuICAgICAgICBkaXI6IGRpcixcclxuICAgICAgICBrOiBNYXRoLnRhbihuZXdEZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXREZXN0aW5hdGlvbihwb2ludDEsIGRpcmVjdGlvbiwgTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50MlswXSAtIHBvaW50MVswXSwgMikgKyBNYXRoLnBvdyhwb2ludDJbMV0gLSBwb2ludDFbMV0sIDIpKSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHBvaW50MSwgcG9pbnQyKSB7XHJcbiAgICB2YXIgaywgYiwgZGlyO1xyXG5cclxuICAgIGlmIChwb2ludDFbMF0gPT0gcG9pbnQyWzBdKSB7XHJcbiAgICAgICAgayA9ICd2ZXJ0JztcclxuICAgICAgICBkaXIgPSAocG9pbnQyWzFdID49IHBvaW50MVsxXSkgPyAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGsgPSAocG9pbnQyWzFdIC0gcG9pbnQxWzFdKSAvIChwb2ludDJbMF0gLSBwb2ludDFbMF0pO1xyXG4gICAgICAgIGIgPSBwb2ludDFbMV0gLSBwb2ludDFbMF0gKiBrO1xyXG4gICAgICAgIGRpciA9IChwb2ludDJbMF0gPj0gcG9pbnQxWzBdKSA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgJ2snOiBrLFxyXG4gICAgICAgICdiJzogYixcclxuICAgICAgICAnZGlyJzogZGlyXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBvaW50LCBsaW5lLCBzcGVlZCkge1xyXG4gICAgdmFyIHgsIHk7XHJcbiAgICBpZiAobGluZS5rID09ICd2ZXJ0Jykge1xyXG4gICAgICAgIHggPSBwb2ludFswXTtcclxuICAgICAgICB5ID0gcG9pbnRbMV0gKyBsaW5lLmRpciAqIHNwZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gcG9pbnRbMF0gKyBsaW5lLmRpciAqIHNwZWVkIC8gKE1hdGguc3FydChNYXRoLnBvdyhsaW5lLmssIDIpICsgMSkpO1xyXG4gICAgICAgIHkgPSBwb2ludFsxXSArIGxpbmUuZGlyICogc3BlZWQgKiBsaW5lLmsgLyAoTWF0aC5zcXJ0KE1hdGgucG93KGxpbmUuaywgMikgKyAxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0UG9zaXRpb24ocG9pbnQxLCBwb2ludDIvKiwgc3BlZWQsIGR0Ki8pIHtcclxuICAgIHZhciBkZWx0YXggPSBNYXRoLmFicyhwb2ludDJbMF0gLSBwb2ludDFbMF0pLFxyXG4gICAgICAgIGRlbHRheSA9IE1hdGguYWJzKHBvaW50MlsxXSAtIHBvaW50MVsxXSksXHJcbiAgICAgICAgZXJyb3IgPSAwLFxyXG4gICAgICAgIGRlbHRhZXJyID0gKGRlbHRheCA+IGRlbHRheSkgPyBkZWx0YXkgOiBkZWx0YXgsXHJcbiAgICAgICAgeSA9IHBvaW50MVsxXSxcclxuLy9cdFx0XHRzID0gc3BlZWQgKiBkdCxcclxuICAgICAgICB4ID0gcG9pbnQxWzBdO1xyXG5cclxuLy9cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcclxuICAgIGlmIChkZWx0YXggPiBkZWx0YXkpIHtcclxuICAgICAgICAocG9pbnQxWzBdID4gcG9pbnQyWzBdKSA/IHgtLSA6IHgrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnJcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheCkge1xyXG4gICAgICAgICAgICB5ID0gKHBvaW50MVsxXSA+IHBvaW50MlsxXSkgPyB5IC0gMSA6IHkgKyAxO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yIC0gZGVsdGF4XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAocG9pbnQxWzFdID4gcG9pbnQyWzFdKSA/IHktLSA6IHkrKztcclxuICAgICAgICBlcnJvciA9IGVycm9yICsgZGVsdGFlcnJcclxuICAgICAgICBpZiAoMiAqIGVycm9yID49IGRlbHRheSkge1xyXG4gICAgICAgICAgICB4ID0gKHBvaW50MVswXSA+IHBvaW50MlswXSkgPyB4IC0gMSA6IHggKyAxO1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yIC0gZGVsdGF5XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuLy99XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59XHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZihvYmopICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBvYmouY29uc3RydWN0b3IoKTsgLy8gY2hhbmdlZFxyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopXHJcbiAgICAgICAgdGVtcFtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgICdjb2xsaWRlcyc6IGNvbGxpZGVzLFxyXG4gICAgJ2JveENvbGxpZGVzJzogYm94Q29sbGlkZXMsXHJcbiAgICAnZ2V0RGVncmVlJzogZ2V0RGVncmVlLFxyXG4gICAgJ25leHRQb3NpdGlvbic6IG5leHRQb3NpdGlvbixcclxuICAgICdnZXREZXN0aW5hdGlvbic6IGdldERlc3RpbmF0aW9uLFxyXG4gICAgJ2dldERpcmVjdGlvbic6IGdldERpcmVjdGlvbixcclxuICAgICdnZXRNb3ZlZFBvaW50QnlEZWdyZWUnOiBnZXRNb3ZlZFBvaW50QnlEZWdyZWUsXHJcbiAgICAnY2xvbmUnOiBjbG9uZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2VuZ2luZS91dGlscy5qc1xuICoqLyIsInZhciBuYXJncyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHJpbmcpIHtcbiAgICB2YXIgYXJnc1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIH1cblxuICAgIGlmICghYXJncyB8fCAhYXJncy5oYXNPd25Qcm9wZXJ0eSkge1xuICAgICAgICBhcmdzID0ge31cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobmFyZ3MsIGZ1bmN0aW9uIHJlcGxhY2VBcmcobWF0Y2gsIGksIGluZGV4KSB7XG4gICAgICAgIHZhciByZXN1bHRcblxuICAgICAgICBpZiAoc3RyaW5nW2luZGV4IC0gMV0gPT09IFwie1wiICYmXG4gICAgICAgICAgICBzdHJpbmdbaW5kZXggKyBtYXRjaC5sZW5ndGhdID09PSBcIn1cIikge1xuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyZ3MuaGFzT3duUHJvcGVydHkoaSkgPyBhcmdzW2ldIDogbnVsbFxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIGxpc3QgPSBbXHJcbiAgICAnaW1nL3Nwcml0ZXMucG5nJyxcclxuICAgICdpbWcvZ3Jhc3MyLnBuZycsXHJcbiAgICAnaW1nL2Jsb29kLnBuZycsXHJcbiAgICAnaW1nL2Rlc2VydC5wbmcnLFxyXG4gICAgJ2ltZy9pY2ViYWxsLnBuZycsXHJcbiAgICAnaW1nL2JzcHJpdGUucG5nJyxcclxuICAgICdpbWcvY3Vyc29yLnBuZycsXHJcbiAgICAnaW1nL3Nwcml0ZXMyLnBuZycsXHJcbiAgICAnaW1nL2dyYXNzMy5wbmcnXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcmVzb3VyY2VzLmpzXG4gKiovIiwidmFyIGNvbmZpZyA9IHtcclxuXHRtYWluTGF5ZXIgOiB7XHJcblx0XHRpZDogJ21haW5MYXllcicsXHJcblx0XHRzaXplIDogWzgwMCw2MDBdLFxyXG5cdFx0YmFja2dyb3VuZDogJ2ltZy9ncmFzczIucG5nJyxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXJcdHBsYXllciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ3BsYXllcicpLFxyXG5cdFx0XHRcdGN1cnNvciA9IHRoaXMuZ2FtZS5nZXRDb25maWcoJ2N1cnNvcicpLFxyXG5cdFx0XHRcdGNvdW50ZXIgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCdjb3VudGVyJyksXHJcblx0XHRcdFx0dGltZXIgPSB0aGlzLmdhbWUuZ2V0Q29uZmlnKCd0aW1lcicpLFxyXG5cdFx0XHRcdGJlc3RUaW1lID0gdGhpcy5nYW1lLmdldENvbmZpZygnYmVzdFRpbWUnKTtcclxuXHJcblx0XHRcdHRoaXMuZ2FtZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuXHRcdFx0dGhpcy5nYW1lLnBhcmFtZXRlcnMuZ2FtZVRpbWVyID0gMDtcclxuXHJcblx0XHRcdHRoaXMuYWRkT2JqZWN0cyhbcGxheWVyLCBjdXJzb3IsIGNvdW50ZXIsIHRpbWVyLCBiZXN0VGltZV0pO1xyXG5cdFx0fSxcclxuXHRcdHJ1bGVzOiBbJ3NwYXduX21vbnN0ZXInXVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL2xheWVycy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN1VBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBV0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==