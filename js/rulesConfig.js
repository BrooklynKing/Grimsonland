import utils from './engine/utils';

var config = {
    spawn_monster: {
        update: function (dt, obj) {
            if (this.parameters.monsterSpawned < this.parameters.totalMonsters) {
                if (this.parameters.currentMonsterCooldown == 0) {

                    var monsterConfig = (Math.random() * 100 > 95) ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
                        randomStartPosition = Math.round(Math.random() * 3);

                    switch (randomStartPosition) {
                        case 0 :
                            monsterConfig.pos = [0 - monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];
                            break;
                        case 1 :
                            monsterConfig.pos = [Math.round(Math.random() * 1280), 0 - monsterConfig.sprite[2][1]];
                            break;
                        case 2 :
                            monsterConfig.pos = [1280 + monsterConfig.sprite[2][0], Math.round(Math.random() * 720)];
                            break;
                        case 3 :
                            monsterConfig.pos = [Math.round(Math.random() * 1280), 720 + monsterConfig.sprite[2][1]];
                            break;
                    }
                    monsterConfig.id = 'monster' + this.parameters.monsterSpawned++;
                    monsterConfig.layer = this.context;

                    this.context.addObject(monsterConfig);

                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;

                } else {
                    this.parameters.currentMonsterCooldown--;
                }
            }
        },
        parameters: {
            currentMonsterCooldown: 0,
            monsterCooldown: 5,
            monsterSpawned: 0,
            totalMonsters: 500
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
            var player = obj.layer.getObjectsByType('player')[0];

            if (utils.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
                player.triggerAction('damage', {
                    damage: obj.parameters.power
                });
            }
        }
    },
    destroyOnPlayerCollision: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            if (utils.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
                var explosionConfig = obj.layer.game.getConfig('explosion');
                explosionConfig.pos = player.pos;
                explosionConfig.id = 'exp_' + player.id;

                obj.layer.addObject(explosionConfig);

                obj._removeInNextTick = true;
            }
        }
    },
    bulletMonsterCollision: {
        update: function (dt, obj) {
            var monsters = obj.layer.getObjectsByType('monster');

            for (var i = 0, l = monsters.length; i < l; i++) {
                if (utils.boxCollides(obj.pos, obj.size, monsters[i].pos, monsters[i].size)) {
                    monsters[i].triggerAction('damage', {
                        damage: obj.parameters.power
                    });

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
                obj.layer.game.triggerGlobalEvent(obj.type + '_killed');
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
            var destination = (obj.layer.game.parameters.mouseposition) ? [obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1] + 1],
                directionToMouse = utils.getDirection(obj.pos, destination);

            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    canShoot: {
        update: function (dt, obj) {
            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
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
                obj.layer.addObject(bulletConfig);

                obj.parameters.bulletsFired++;
                obj.parameters.fireCooldown = obj.parameters.cooldown;
            }
        }
    },
    cursorLogic: {
        update : function(dt, obj) {
            obj.setPosition((obj.layer.game.parameters.mouseposition)?[obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1]]);
        }
    },
    bloodLogic: {
        update : function(dt, obj) {
            if (obj.parameters.cooldown == 0) {
                obj.layer.removeObject(obj.id);
            } else {
                obj.parameters.cooldown--;
            }
        }
    },
    explosionLogic: {
        update : function (dt, obj) {
            if(obj.sprite.done) {
                var	bloodConfig = obj.layer.game.getConfig('blood');
                bloodConfig.pos = obj.pos;
                bloodConfig.id = 'blood_' + obj.id;
                obj.layer.addObject(bloodConfig);
                obj.layer.removeObject(obj.id);
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
    }
};

export default config;