import utils from './../../engine/utils';

var config = {
    fireball : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'fireball') {
                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
                    if (!fireCooldown) {
                        var destination  = new utils.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y),
                            spellPower = player.getParameter('spellPower'),
                            startDegree = 10 * (spellPower - 1);

                        destination.x -= obj.layer.translate.x;
                        destination.y -= obj.layer.translate.y;

                        for (var i = 0; i < spellPower; i++) {
                            let direction = new utils.Line(player.pos, utils.getMovedPointByDegree(player.pos, destination, startDegree));
                            createBullet(direction, utils.getMovedPointByDegree(player.pos, destination, startDegree));
                            startDegree -= 20;
                        }
                        if (obj.getDefaultParameter('cooldown') + 3 * (spellPower - 1) > 30) {
                            obj.setParameter('cooldown', 30);
                        } else {
                            obj.setParameter('cooldown', obj.getDefaultParameter('cooldown') + 5 * (spellPower - 1));
                        }

                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));

                        function createBullet(direction, destination) {

                            var bulletConfig = obj.layer.game.getConfig('bullet');
                            bulletConfig.pos = player.pos.clone();

                            var bull = obj.layer.addObject(bulletConfig);
                            bull.setParameter('direction', direction);
                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));

                            bull.sprite.setDegree(utils.getDegree(player.pos, destination)[0]);
                        }
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }

    },
    slowEnemies : {
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'monster') {
                    var speed = objects[i].getParameter('speed'),
                        power = obj.getParameter('power'),
                        effects = objects[i].getParameter('effects') || [];

                    if (speed < power) {
                        objects[i].setParameter('speed', 0);
                    } else {
                        objects[i].setParameter('speed', speed - power);
                    }

                    if (effects.indexOf('frozen') == -1) {
                        effects.push('frozen');
                    }
                }
            }
        }
    },
    teleport : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'teleport') {
                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
                    if (!fireCooldown) {
                        var mouse  = new utils.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y);

                        mouse.x -= obj.layer.translate.x;
                        mouse.y -= obj.layer.translate.y;

                        var direction = new utils.Line(player.pos, utils.getMovedPointByDegree(player.pos, mouse, 0)),
                            spellPower = player.getParameter('spellPower'),
                            destination = direction.getDestination(player.pos, obj.getParameter('power')),
                            cooldown = obj.getDefaultParameter('cooldown', cooldown) - (30 * (spellPower - 1)),
                            teleportGate;

                        teleportGate = obj.layer.game.getConfig('teleportGate');
                        teleportGate.pos = player.pos.clone();

                        obj.layer.addObject(teleportGate);

                        teleportGate = obj.layer.game.getConfig('teleportGate');
                        teleportGate.pos = destination.clone();

                        obj.layer.addObject(teleportGate);

                        player.setPosition(destination);

                        obj.setParameter('cooldown', (cooldown > 50) ? cooldown : 50);
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    frostShard : {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'frostShard') {
                if (obj.layer.game.mouse.isDown || obj.layer.game.input.isDown(32)) {
                    if (!fireCooldown) {
                        var frostShard = obj.layer.game.getConfig('frostShard'),
                            mousePosition = new utils.Point(obj.layer.game.mouse.x, obj.layer.game.mouse.y),
                            spellPower = player.getParameter('spellPower'),
                            destination = mousePosition.clone();

                        destination.x -= obj.layer.translate.x;
                        destination.y -= obj.layer.translate.y;

                        frostShard.pos = destination.clone();

                        var spellPowerBoost = 0;

                        for (var i = 1; i < spellPower; i++) {
                            spellPowerBoost += 50;
                        }

                        var fs = obj.layer.addObject(frostShard);

                        fs.setParameter('cooldown', fs.getParameter('cooldown') + spellPowerBoost);

                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    bulletMonsterCollision: {
        update: function (dt, obj) {
            var objects = obj.getParameter('collisions');
            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                    var blood = obj.layer.game.getConfig('bloodSpray');
                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += - 10;
                    obj.layer.addObject(blood);

                    obj._removeInNextTick = true;

                    break;
                }
            }
        }
    }
};

export default config;