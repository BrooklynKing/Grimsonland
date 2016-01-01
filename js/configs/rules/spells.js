import utils from './../../engine/utils';

var config = {
    fireball : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];
            if (player.parameters.currentSpell == 'fireball') {
                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
                    var rule = obj,
                        bulletConfig = obj.layer.game.getConfig('bullet'),
                        mousePosition = obj.layer.game.mouse.getMousePosition(),
                        destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1],
                        direction = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, destination, 0));

                    function createBullet(direction, destination) {
                        bulletConfig.pos = utils.clone(player.pos);
                        bulletConfig.id = 'bullet' + rule.parameters.bulletsFired++;
                        bulletConfig.parameters.direction = direction;

                        var bull = obj.layer.addObject(bulletConfig);
                        bull.sprite.setDegree(utils.getDegree(player.pos, destination)[0]);
                    }

                    createBullet(direction, destination);

                    for (var i = 1; i <= player.parameters.spellPower - 1; i++) {
                        var direction1 = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, destination, 20 * i)),
                            direction2 = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, destination, -20 * i));

                        createBullet(direction1, utils.getMovedPointByDegree(player.pos, destination, 20 * i));
                        createBullet(direction2, utils.getMovedPointByDegree(player.pos, destination, -20 * i));
                    }
                    if (player.parameters.spellPower > 1) {
                        obj.parameters.fireCooldown = (obj.parameters.cooldown + 5 ^ (player.parameters.spellPower));
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
    slowEnemies : {
        update: function (dt, obj) {
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
    teleport : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            if (player.parameters.currentSpell == 'teleport') {
                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
                    var teleportGate = obj.layer.game.getConfig('teleportGate'),
                        mousePosition = obj.layer.game.mouse.getMousePosition(),
                        direction = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1], 0)),
                        destination = utils.getDestination(player.pos, direction, obj.parameters.power);


                    teleportGate.pos = utils.clone(player.pos);
                    teleportGate.id = 'shard' + obj.parameters.teleportGates++;

                    obj.layer.addObject(teleportGate);

                    teleportGate.pos = utils.clone(destination);
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
    frostShard : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            if (player.parameters.currentSpell == 'frostShard') {
                if (obj.layer.game.mouse.isMouseDown() && obj.parameters.fireCooldown == 0) {
                    var frostShard = obj.layer.game.getConfig('frostShard'),
                        mousePosition = obj.layer.game.mouse.getMousePosition(),
                        destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1];

                    frostShard.pos = utils.clone(destination);
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
};

export default config;