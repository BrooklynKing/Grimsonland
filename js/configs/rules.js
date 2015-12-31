import utils from './../engine/utils';
import format from 'string-template';

var config = {
    collisions: {
        init: function() {
            var obj = this.context;
            obj.parameters.collisions = [];
            obj.parameters.collisions.cells = new Array(4);
            obj.layer.game.collisions.checkPlace(obj);
        },
        update: function(dt, obj) {
            obj.parameters.collisions.splice(0);
            obj.layer.game.collisions.checkPlace(obj);
        }
    },
    random_trees: {
        init: function() {
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
                stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }

        },
        parameters: {
            trees: 30,
            stones: 20
        }
    },
    spawn_monster: {
        update: function (dt, obj) {
            if (this.parameters.monsterSpawned < 10000) {
                if (this.parameters.currentMonsterCooldown == 0) {
                    var monsterConfig = (Math.random() * 100 > (100 - this.parameters.chanceOfBoss)) ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
                        startPosition = Math.round(Math.random() * 3);

                    switch (startPosition) {
                        case 0 :
                            monsterConfig.pos = [this.parameters.area[0][0] - monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
                            break;
                        case 1 :
                            monsterConfig.pos = [Math.round(Math.random() * this.parameters.area[1][0]), this.parameters.area[0][1] - monsterConfig.sprite[2][1]];
                            break;
                        case 2 :
                            monsterConfig.pos = [this.parameters.area[1][0] + monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
                            break;
                        case 3 :
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
            chanceOfBoss : 3,
            monsterCooldown: 6,
            monsterSpawned: 0
        }
    },
    spawn_heart: {
        update: function (dt, obj) {
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
        update: function (dt, obj) {
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
        update: function (dt, obj) {
            if (obj.parameters.health <= 0) {
                obj.layer.game.triggerGlobalEvent('player_dead');
            }
        }
    },
    damageOnPlayerCollision: {
        update: function (dt, obj) {
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
        update: function (dt, obj) {
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
        update: function (dt, obj) {
            var objects = obj.parameters.collisions;

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    if (objects[i].parameters.health < objects[i]._parameters.health) {
                        if (objects[i].parameters.health + obj.parameters.health <= objects[i]._parameters.health) {
                            objects[i].parameters.health += obj.parameters.health;
                        } else {
                            objects[i].parameters.health = objects[i]._parameters.health
                        }
                    }

                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    meleeAttack : {
        update: function (dt, obj) {
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
        update: function (dt, obj) {
            var objects = obj.parameters.collisions;
            obj.parameters.speed = obj._parameters.speed;
            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'player') {
                    obj.parameters.speed = 0
                    break;
                }
            }
        }
    },
    bulletMonsterCollision: {
        update: function (dt, obj) {
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
        update: function (dt, obj) {

            if (obj.pos[0] - obj.sprite.size[0] / 2 < obj.layer.pos[0]) {
                obj.pos[0] = obj.sprite.size[0] / 2;
            }
            else if (obj.pos[0] + obj.sprite.size[0] / 2 > obj.layer.pos[0] + obj.layer.size[0]) {
                obj.pos[0] = obj.layer.pos[0] + obj.layer.size[0] - obj.sprite.size[0] / 2;
            }

            if (obj.pos[1] - obj.sprite.size[1] / 2 < obj.layer.pos[1]) {
                obj.pos[1] = obj.sprite.size[1] / 2;
            }
            else if (obj.pos[1] + obj.sprite.size[1] / 2 > obj.layer.pos[1] + obj.layer.size[1]) {
                obj.pos[1] = obj.layer.pos[1] + obj.layer.size[1] - obj.sprite.size[1] / 2;
            }
        }
    },
    destroyAfterLeavingLayer: {
        update: function (dt, obj) {
            if (obj.pos[1] < 0 || obj.pos[1] - obj.sprite.size[1] > obj.layer.pos[1] + obj.layer.size[1] || obj.pos[0] - obj.sprite.size[0] > obj.layer.pos[0] + obj.layer.size[0] || obj.pos[0] < 0) {
                obj._removeInNextTick = true;
                return false;
            }
        }
    },
    setDirectionToPlayer: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            obj.parameters.direction = utils.getDirection(obj.pos, player.pos);
        }
    },
    moveToDirection: {
        update: function (dt, obj) {
            if (obj.parameters.direction.dir) {
                obj.setPosition(utils.getDestination(obj.pos, obj.parameters.direction, obj.parameters.speed * dt));
            }
        }
    },
    monsterHealthStatus: {
        update: function (dt, obj) {
            if (obj.parameters.health <= 0) {
                obj._removeInNextTick = true;
                var blood = obj.layer.game.getConfig('blood');
                blood.pos = obj.pos;
                obj.layer.addObject(blood);

                if (!obj.layer.game.parameters.monstersKilled) {
                    obj.layer.game.parameters.monstersKilled = 0;
                }
                obj.layer.game.parameters.monstersKilled++
            }
        }
    },
    rotateByDirection: {
        update: function (dt, obj) {
            obj.sprite.rotateToDirection(obj.parameters.direction);
        }
    },
    rotateToMouse: {
        update: function (dt, obj) {
            var mousePosition = obj.layer.game.mouse.getMousePosition();

            var destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] + 1],
                directionToMouse = utils.getDirection(obj.pos, destination);

            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    canShoot: {
        update: function (dt, obj) {
            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
        }
    },
    canMelee: {
        update: function (dt, obj) {
            obj.parameters.meleeCooldown && obj.parameters.meleeCooldown--;
        }
    },
    playerLogic: {
        update : function(dt, obj) {
            var pos = utils.clone(obj.pos);

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
                var direction = utils.getDirection(obj.pos, pos);
                obj.parameters.direction.k = direction.k;
                obj.parameters.direction.dir = direction.dir;
            }
        }
    },
    monsterBossLogic: {
        update : function(dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];
            if (obj.parameters.fireCooldown == 0) {
                var	bulletConfig = obj.layer.game.getConfig('mbullet'),
                    direction = utils.getDirection(obj.pos, player.pos);

                bulletConfig.pos = utils.clone(obj.pos);
                bulletConfig.id = 'mbullet_' + obj.id + '_' + obj.parameters.bulletsFired;

                bulletConfig.parameters.direction = direction;
                var bull = obj.layer.addObject(bulletConfig);
                bull.sprite.setDegree(utils.getDegree(obj.pos, player.pos)[0]);

                obj.parameters.bulletsFired++;
                obj.parameters.fireCooldown = obj.parameters.cooldown;
            }
        }
    },
    bindPositionToMouse: {
        update : function(dt, obj) {
            var mousePosition = obj.layer.game.mouse.getMousePosition();
            obj.setPosition((mousePosition)?[mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1]]);
        }
    },
    removeOnCooldown: {
        update : function(dt, obj) {
            if (obj.parameters.cooldown == 0) {
                obj._removeInNextTick = true;
            } else {
                obj.parameters.cooldown--;
            }
        }
    },
    destroyAfterSpriteDone: {
        update : function (dt, obj) {
            if(obj.sprite.done) {
                obj._removeInNextTick = true;
            }
        }
    },
    shootOnMouseDown: {
        update: function (dt, obj) {
            if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
                var	bulletConfig = obj.layer.game.getConfig('bullet'),
                    mousePosition = obj.layer.game.mouse.getMousePosition(),
                    destination = (mousePosition)?[mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] - 1];

                function createBullet(direction, destination) {
                    bulletConfig.pos = utils.clone(obj.pos);
                    bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;
                    bulletConfig.parameters.direction = direction;

                    var bull = obj.layer.addObject(bulletConfig);
                    bull.sprite.setDegree(utils.getDegree(obj.pos, destination)[0]);
                }

                var direction = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, 0));

                createBullet(direction, destination);

                for (var i = 1; i <= obj.parameters.spellPower - 1; i++) {
                    var direction1 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, 20 * i)),
                        direction2 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, -20 * i));

                    createBullet(direction1, utils.getMovedPointByDegree(obj.pos, destination, 20 * i));
                    createBullet(direction2, utils.getMovedPointByDegree(obj.pos, destination, -20 * i));
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
        update: function (dt, obj) {
            obj.parameters.direction.left = obj.layer.game.input.isDown(65);
            obj.parameters.direction.up = obj.layer.game.input.isDown(87);
            obj.parameters.direction.down = obj.layer.game.input.isDown(83);
            obj.parameters.direction.right = obj.layer.game.input.isDown(68);
        }
    },
    countMonsterKilled : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                kills: obj.layer.game.parameters.monstersKilled || 0
            });
        }
    },
    timer : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                time: ((obj.layer.game.parameters.gameTimer++) / 60).toFixed(2)
            });
        }
    },
    health : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                health: obj.layer.getObjectsByType('player')[0].parameters.health
            });
        }
    },
    bestTime : {
        init: function (dt, obj) {
            var obj = this.context;
            obj.parameters.text = format(obj.parameters.template, {
                time: ((obj.layer.game.parameters.bestTime) / 60).toFixed(2)
            });
        }
    },
    dynamicZIndex: {
        update: function(dt, obj) {
            var newZIndex = 0;
            obj.pos && (newZIndex += obj.pos[1]);
            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

            obj.zIndex = (obj.pos[1] > 0) ? Math.round(newZIndex) : 0;
        }
    },
    triggerOnPlayerCollisionPowerUp : {
        update: function (dt, obj) {
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

export default config;