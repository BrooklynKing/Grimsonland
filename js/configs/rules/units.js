import utils from './../../engine/utils';

var config = {
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

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'player') {
                    obj.parameters.speed = 0;
                    break;
                }
            }
        }
    },
    resetSpeed : {
        update: function (dt, obj) {
            obj.parameters.speed = obj._parameters.speed;
        }
    },
    resetEffects : {
        update: function (dt, obj) {
            obj.parameters.effects.splice(0);
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
    moveWithKeyboard: {
        update: function (dt, obj) {
            obj.parameters.direction.left = obj.layer.game.input.isDown(65);
            obj.parameters.direction.up = obj.layer.game.input.isDown(87);
            obj.parameters.direction.down = obj.layer.game.input.isDown(83);
            obj.parameters.direction.right = obj.layer.game.input.isDown(68);

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
    selectSpellWithKeyboard: {
        update: function (dt, obj) {
            (obj.layer.game.input.isDown(49)) && (obj.parameters.currentSpell = 'fireball');
            (obj.layer.game.input.isDown(50)) && (obj.parameters.currentSpell = 'frostShard');
            (obj.layer.game.input.isDown(51)) && (obj.parameters.currentSpell = 'teleport');
        }
    },
    triggerOnPlayerCollisionPowerUp : {
        update: function (dt, obj) {
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

export default config;