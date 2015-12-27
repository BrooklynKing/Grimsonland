import utils from './engine/utils';

var config = {
        spawn_monster : {
            update : function(dt, obj){
                if (this.parameters.monsterSpawned < this.parameters.totalMonsters) {
                    if (this.parameters.currentMonsterCooldown == 0) {

                        var	monsterConfig = (Math.random() * 100 > 95)? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
                            randomStartPosition = Math.round(Math.random() * 3);

                        switch (randomStartPosition) {
                            case 0 : monsterConfig.pos = [ monsterConfig.sprite[2][0], Math.round( Math.random() * 720)]; break;
                            case 1 : monsterConfig.pos = [Math.round(  Math.random() * 1280), monsterConfig.sprite[2][1]]; break;
                            case 2 : monsterConfig.pos = [1280 - monsterConfig.sprite[2][0], Math.round( Math.random() * 720)]; break;
                            case 3 : monsterConfig.pos = [Math.round(  Math.random() * 1280), 720 - monsterConfig.sprite[2][1]]; break;
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
            parameters : {
                currentMonsterCooldown : 0,
                monsterCooldown : 5,
                monsterSpawned : 0,
                totalMonsters : 500
            }
        },
        playerDeath: {
            update: function(dt, obj) {
                if (obj.parameters.health <= 0 ) {
                    obj.layer.game.triggerGlobalEvent('player_dead');
                }
            }
        },
        damageOnPlayerCollision: {
            update: function(dt, obj) {
                var player = obj.layer.getObjectsByType('player')[0];

                if (utils.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
                    player.triggerAction('damage', {
                        damage: obj.parameters.power
                    });
                }
            }
        },
        destroyOnPlayerCollision : {
            update: function(dt, obj) {
                var player = obj.layer.getObjectsByType('player')[0];

                if (utils.boxCollides(obj.pos, obj.size, player.pos, player.size)) {
                    var	explosionConfig = obj.layer.game.getConfig('explosion');
                    explosionConfig.pos = player.pos;
                    explosionConfig.id = 'exp_' + player.id;

                    obj.layer.addObject(explosionConfig);

                    obj._removeInNextTick = true;
                }
            }
        },
        bulletMonsterCollision: {
            update: function(dt, obj) {
                var monsters = obj.layer.getObjectsByType('monster');

                for (var i = 0, l = monsters.length; i < l; i++) {
                    if (utils.boxCollides(obj.pos, obj.size, monsters[i].pos, monsters[i].size)) {
                        monsters[i].triggerAction('damage', {
                            damage: obj.parameters.power
                        });

                        var	explosionConfig = obj.layer.game.getConfig('explosion');
                        explosionConfig.pos = monsters[i].pos;
                        explosionConfig.id = 'exp_' + monsters[i].id;

                        obj.layer.addObject(explosionConfig);

                        obj._removeInNextTick = true;

                        break;
                    }
                }
            }
        },
        bindPositionToLayer : {
            update : function(dt, obj){

                if(obj.pos[0] - obj.sprite.size[0] / 2 < obj.layer.pos[0]) {
                    obj.pos[0] = obj.sprite.size[0] / 2;
                }
                else if(obj.pos[0] + obj.sprite.size[0] / 2 > obj.layer.pos[0] + obj.layer.size[0]) {
                    obj.pos[0] = obj.layer.pos[0] + obj.layer.size[0] - obj.sprite.size[0] / 2;
                }

                if(obj.pos[1] - obj.sprite.size[1] / 2 < obj.layer.pos[1]) {
                    obj.pos[1] = obj.sprite.size[1] / 2;
                }
                else if(obj.pos[1] + obj.sprite.size[1] / 2 > obj.layer.pos[1] + obj.layer.size[1]) {
                    obj.pos[1] = obj.layer.pos[1] + obj.layer.size[1] - obj.sprite.size[1] / 2;
                }
            }
        },
        destroyAfterLeavingLayer: {
            update: function(dt, obj) {
                if (obj.pos[1] < 0 || obj.pos[1] - obj.sprite.size[1] > obj.layer.pos[1] + obj.layer.size[1] || obj.pos[0] - obj.sprite.size[0] > obj.layer.pos[0] + obj.layer.size[0] || obj.pos[0] < 0) {
                    obj._removeInNextTick = true;
                    return false;
                }
            }
        },
        setDirectionToPlayer : {
            update : function(dt, obj) {
                var player = obj.layer.getObjectsByType('player')[0];

                obj.parameters.direction = utils.getDirection(obj.pos, player.pos);
            }
        },
        moveToDirection : {
            update : function(dt, obj) {
                if (obj.parameters.direction.dir) {
                    obj.setPosition(utils.getDestination(obj.pos, obj.parameters.direction, obj.parameters.speed * dt));
                }
            }
        },
        monsterHealthStatus : {
            update : function(dt, obj) {
                if (obj.parameters.health <= 0 ) {
                    obj._removeInNextTick = true;
                    obj.layer.game.triggerGlobalEvent(obj.type + '_killed');
                }
            }
        },
        rotateByDirection : {
            update : function(dt, obj) {
                obj.sprite.rotateToDirection(obj.parameters.direction);
            }
        },
        rotateToMouse : {
            update: function(dt, obj) {
                var destination = (obj.layer.game.parameters.mouseposition)?[obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1] + 1],
                    directionToMouse = utils.getDirection(obj.pos, destination);

                obj.sprite.rotateToDirection(directionToMouse);
            }
        },
        canShoot: {
            update: function(dt, obj) {
                obj.parameters.fireCooldown && obj.parameters.fireCooldown--;
            }
        }
    };

export default config;