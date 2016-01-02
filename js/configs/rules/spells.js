import utils from './../../engine/utils';

var config = {
    fireball : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];
            if (player.parameters.currentSpell == 'fireball') {
                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
                    if (obj.parameters.fireCooldown == 0) {
                        var mousePosition = obj.layer.game.mouse.getMousePosition(),
                            destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1],
                            startDegree = 10 * (player.parameters.spellPower - 1);

                        for (var i = 0; i < player.parameters.spellPower; i++) {
                            let direction = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, destination, startDegree));

                            createBullet(direction, utils.getMovedPointByDegree(player.pos, destination, startDegree));
                            startDegree -= 20;
                        }
                        if (obj._parameters.cooldown + 5 * (player.parameters.spellPower - 1) > 30) {
                            obj.parameters.cooldown = 30;
                        } else {
                            obj.parameters.cooldown = obj._parameters.cooldown + 5 * (player.parameters.spellPower - 1);
                        }

                        obj.parameters.fireCooldown = obj.parameters.cooldown;

                        function createBullet(direction, destination) {
                            var bulletConfig = obj.layer.game.getConfig('bullet');
                            bulletConfig.pos = utils.clone(player.pos);
                            bulletConfig.parameters.direction = direction;
                            bulletConfig.parameters.power += 5 * (player.parameters.spellPower - 1);

                            var bull = obj.layer.addObject(bulletConfig);
                            bull.sprite.setDegree(utils.getDegree(player.pos, destination)[0]);
                        }
                    }
                }
            }
            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
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
                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
                    if (obj.parameters.fireCooldown == 0) {
                        var  mousePosition = obj.layer.game.mouse.getMousePosition(),
                            direction = utils.getDirection(player.pos, utils.getMovedPointByDegree(player.pos, (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1], 0)),
                            destination = utils.getDestination(player.pos, direction, obj.parameters.power);

                        var teleportGate = obj.layer.game.getConfig('teleportGate');
                        teleportGate.pos = utils.clone(player.pos);

                        obj.layer.addObject(teleportGate);

                        var teleportGate = obj.layer.game.getConfig('teleportGate');
                        teleportGate.pos = utils.clone(destination);

                        obj.layer.addObject(teleportGate);

                        player.setPosition(destination);

                        var cooldown = obj._parameters.cooldown - (30 * (player.parameters.spellPower - 1));

                        obj.parameters.cooldown = (cooldown > 50) ? cooldown : 50;

                        obj.parameters.fireCooldown = obj.parameters.cooldown;
                    }
                }
            }
            obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
        }
    },
    frostShard : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            if (player.parameters.currentSpell == 'frostShard') {
                if (obj.layer.game.mouse.isMouseDown() || obj.layer.game.input.isDown(32)) {
                    if (obj.parameters.fireCooldown == 0) {
                        var frostShard = obj.layer.game.getConfig('frostShard'),
                            mousePosition = obj.layer.game.mouse.getMousePosition(),
                            destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [player.pos[0], player.pos[1] - 1];

                        frostShard.pos = utils.clone(destination);

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
        update: function (dt, obj) {
            var objects = obj.parameters.collisions;
            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].parameters.health -= obj.parameters.power;

                    var blood = obj.layer.game.getConfig('bloodSpray');
                    blood.pos = utils.clone(objects[i].pos);
                    blood.pos[0] += 2;
                    blood.pos[1] += - 10;
                    obj.layer.addObject(blood);

                    obj._removeInNextTick = true;

                    break;
                }
            }
        }
    },
};

export default config;