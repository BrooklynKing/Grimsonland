import utils from './../../engine/utils';

var config = {
    playerDeath: {
        update: function (dt, obj) {
            if (obj.getParameter('health') <= 0) {
                obj.layer.game.triggerGlobalEvent('player_dead');
            }
        }
    },
    damageOnPlayerCollision: {
        update: function (dt, obj) {
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
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    var explosionConfig = obj.layer.game.getConfig('explosion');
                    explosionConfig.pos = obj.pos.clone();

                    obj.layer.addObject(explosionConfig);

                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    triggerOnPlayerCollision: {
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    if (objects[i].getParameter('health') < objects[i].getDefaultParameter('health')) {
                        if ( objects[i].getParameter('health') + obj.getParameter('power') <= objects[i].getDefaultParameter('health')) {
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
    meleeAttack : {
        update: function (dt, obj) {
            if (!obj.getParameter('meleeCooldown')) {
                var objects = obj.getParameter('collisions');
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].type == 'player') {
                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                        var blood = obj.layer.game.getConfig('bloodSpray');
                        blood.pos = objects[i].pos.clone();
                        blood.pos.x += 2;
                        blood.pos.y += - 10;
                        obj.layer.addObject(blood);

                        obj.setParameter('meleeCooldown', obj.getParameter('cooldown'));
                        break;
                    }
                }
            }
        }
    },
    monsterExplosion: {
        update: function (dt, obj) {
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
    monsterExplosionCondition : {
        update: function (dt, obj) {
            function generateExplosions() {
                var pos = obj.pos.clone(),
                    explosionConfig,
                    power = obj.getParameter('power'),
                    expl;

                obj._removeInNextTick = true;

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x - obj.size[0], pos.y - obj.size[1]]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x + obj.size[0], pos.y - obj.size[1]]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x - obj.size[0], pos.y + obj.size[1]]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x + obj.size[0], pos.y + obj.size[1]]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x - 3 / 2 * obj.size[0], pos.y]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x + 3 / 2 * obj.size[0], pos.y]);
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
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'player') {
                    obj.setParameter('speed', 0);
                    break;
                }
            }
        }
    },
    resetSpeed : {
        update: function (dt, obj) {
            obj.setParameter('speed', obj.getDefaultParameter('speed'));
        }
    },
    resetEffects : {
        update: function (dt, obj) {
            obj.getParameter('effects').splice(0);
        }
    },
    moveToDirection: {
        update: function (dt, obj) {
            var direction = obj.getParameter('direction');

            if (direction && direction.dir) {
                obj.setPosition(direction.getDestination(obj.pos, obj.getParameter('speed') * dt));
            }
        }
    },
    monsterHealthStatus: {
        update: function (dt, obj) {
            if (obj.getParameter('health') <= 0) {
                obj._removeInNextTick = true;

                var explosionConfig = obj.layer.game.getConfig('explosion');
                explosionConfig.pos = obj.pos.clone();

                obj.layer.addObject(explosionConfig);

                var blood = obj.layer.game.getConfig('blood');
                blood.pos = obj.pos.clone();
                obj.layer.addObject(blood);

                if (!obj.layer.game.parameters.monstersKilled) {
                    obj.layer.game.parameters.monstersKilled = 0;
                }
                obj.layer.game.parameters.monstersKilled++
            }
        }
    },
    resetRangeCooldown: {
        update: function (dt, obj) {
            var fireCooldown = obj.getParameter('fireCooldown');

            fireCooldown && obj.setParameter('fireCooldown', fireCooldown -1);
        }
    },
    resetMeleeCooldown: {
        update: function (dt, obj) {
            var meleeCooldown = obj.getParameter('meleeCooldown');
            meleeCooldown && obj.setParameter('meleeCooldown', meleeCooldown - 1);
        }
    },
    monsterBossLogic: {
        update : function(dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];
            if (!obj.getParameter('fireCooldown')) {
                var	bulletConfig = obj.layer.game.getConfig('mbullet'),
                    direction = new utils.Line(obj.pos, player.pos);

                bulletConfig.pos = obj.pos.clone();
                var bull = obj.layer.addObject(bulletConfig);
                bull.setParameter('direction', direction);
                bull.sprite.setDegree(utils.getDegree(obj.pos, player.pos)[0]);

                obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
            }
        }
    },
    monsterBoss2Logic : {
        update : function(dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                directionToPlayer = obj.getParameter('direction');

            if (utils.getDistance(obj.pos, player.pos) < obj.getParameter('fireRange')) {
                if (!obj.getParameter('fireCooldown')) {
                    var	bulletConfig = obj.layer.game.getConfig('mbullet2');
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
    monsterBoss2Bullet : {
        update: function(dt, obj) {
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

                explosionConfig = obj.layer.game.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([pos.x, pos.y]);
                expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', power);
            }
        }
    },
    moveWithKeyboard: {
        update: function (dt, obj) {
            var pos = obj.pos.clone();
            var direction = {};
            direction.left = obj.layer.game.input.isDown(65);
            direction.up = obj.layer.game.input.isDown(87);
            direction.down = obj.layer.game.input.isDown(83);
            direction.right = obj.layer.game.input.isDown(68);
            if (direction.right) {
                pos.x = obj.pos.x + 1;
            }
            if (direction.left) {
                pos.x = obj.pos.x - 1   ;
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
                obj.setParameter('direction', new utils.Line(obj.pos, pos));
            }
        }
    },
    selectSpellWithKeyboard: {
        update: function (dt, obj) {
            (obj.layer.game.input.isDown(49)) && (obj.setParameter('currentSpell', 'fireball'));
            (obj.layer.game.input.isDown(50)) && (obj.setParameter('currentSpell', 'frostShard'));
            (obj.layer.game.input.isDown(51)) && (obj.setParameter('currentSpell', 'teleport'));
        }
    },
    triggerOnPlayerCollisionPowerUp : {
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    objects[i].setParameter('spellPower', objects[i].getParameter('spellPower') + obj.getParameter('power'));
                    obj._removeInNextTick = true;
                    break;
                }
            }
        }
    },
    summonOnCooldown : {
        update: function(dt, obj) {
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;

                var random = Math.random() * 100,
                    monsterConfig;

                if (random <= obj.getParameter('chanceOfBoss2')) {
                    monsterConfig = obj.layer.game.getConfig('monsterBoss2');
                } else if (random <= obj.getParameter('chanceOfBoss')) {
                    monsterConfig = obj.layer.game.getConfig('monsterBoss');
                } else if (random <= obj.getParameter('chanceOfBoomer')) {
                    monsterConfig = obj.layer.game.getConfig('monsterBoomer');
                } else {
                    monsterConfig = obj.layer.game.getConfig('monster');
                }

                monsterConfig.pos = obj.pos.clone();

                obj.layer.addObject(monsterConfig);
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    }
};

export default config;