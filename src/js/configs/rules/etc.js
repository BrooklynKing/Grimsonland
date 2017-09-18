import utils from './../../engine/utils';
import gameConfigs from '../../configs/index';

var config = {
    bindPositionToLayer: {
        update: function () {
            var obj = this.context;

            if (obj.pos.x - obj.sprite.size[0] / 2 < obj.layer.pos.x) {
                obj.pos.x = obj.sprite.size[0] / 2;
            }
            else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.pos.x + obj.layer.size[0]) {
                obj.pos.x  = obj.layer.pos.x  + obj.layer.size[0] - obj.sprite.size[0] / 2 ;
            }

            if (obj.pos.y - obj.sprite.size[1] / 2 < obj.layer.pos.y) {
                obj.pos.y = obj.sprite.size[1] / 2;
            }
            else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.pos.y + obj.layer.size[1]) {
                obj.pos.y = obj.layer.pos.y + obj.layer.size[1] - obj.sprite.size[1] / 2;
            }
        }
    },
    destroyAfterLeavingLayer: {
        update: function () {
            var obj = this.context;

            if (obj.pos.y < -100 || obj.pos.y - obj.sprite.size[1] - 100> obj.layer.pos.y + obj.layer.size[1] || obj.pos.x - obj.sprite.size[0] - 100> obj.layer.pos.x + obj.layer.size[0] || obj.pos.x < -100) {
                obj._removeInNextTick = true;
                return false;
            }
        }
    },
    setDirectionToPlayer: {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];

            obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
        }
    },
    setDirectionToPlayerAdvance: {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var playerDirection = player.getParameter('direction');
            var oldDirection = obj.getParameter('direction');

            if (!oldDirection) {
                oldDirection = Phaser.Point.subtract(player.pos, obj.pos);
            }

            if (playerDirection == null) {
                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
            } else {
                let speed = Math.abs(Math.min(player.getParameter('speed'), Phaser.Point.distance(obj.pos, player.pos)) - 10);
                let playerNextPlace = utils.moveWithSpeed(player.pos, playerDirection, speed);
                let _dv = Phaser.Point.subtract(playerNextPlace, obj.pos).normalize();
                let _odv = oldDirection.clone().normalize();
                let _ndv = Phaser.Point.add(_odv, _dv).normalize();

                obj.setParameter('direction', _ndv);
            }
        }
    },
    wandererAI : {
        init: function () {
            const rect = new Phaser.Rectangle(100, 100, 1000, 750);
            this.context.setParameter('direction', new Phaser.Point(rect.randomX, rect.randomY));
        },
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var distance = Phaser.Point.distance(obj.pos, player.pos);

            if (distance <= obj.getParameter('scentRange')) {
                obj.setParameter('scent', true);
                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
                obj.setParameter('wanderCooldown', 0);
                obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
            } else {
                obj.setParameter('speed', obj.getDefaultParameter('speed'));
                if (!obj.getParameter('wanderCooldown')) {
                    const rect = new Phaser.Rectangle(100, 100, 1000, 750);
                    obj.setParameter('direction', Phaser.Point.subtract(new Phaser.Point(rect.randomX, rect.randomY), obj.pos));
                    obj.setParameter('wanderCooldown', Math.round(Math.random() * (obj.getDefaultParameter('wanderCooldown') - 100) + 100));
                } else {
                    obj.getParameter('wanderCooldown') && obj.setParameter('wanderCooldown', obj.getParameter('wanderCooldown') - 1);
                }
            }
        }
    },
    dynamicZIndex: {
        update: function() {
            var obj = this.context;
            var newZIndex = 0;

            obj.pos && (newZIndex += obj.pos.y);
            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

            obj.zIndex = (obj.pos.y > 0) ? Math.round(newZIndex) : 0;
        }
    },
    collisions: {
        init: function() {
            var obj = this.context;
            var collisions = obj.setParameter('collisions', []);

            collisions.cells = new Array();
            obj.layer.state.collisions.updateObject(obj);
        },
        update: function() {
            var obj = this.context;

            obj.getParameter('collisions').splice(0);
            obj.layer.state.collisions.updateObject(obj);
        }
    },
    rotateToMouse: {
        update: function () {
            var obj = this.context;
            var destination  = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            var directionToMouse = Phaser.Point.subtract(destination, obj.pos);
            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    bindPositionToMouse: {
        update : function() {
            var obj = this.context;
            var mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

            obj.setPosition(mousePosition.clone());
        }
    },
    removeOnCooldown: {
        update : function() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    },
    explosionOnCooldown: {
        update: function() {
            var obj = this.context;
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;

                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
                var expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', obj.getParameter('power'));

            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    },
    explosionAfterSpriteDone: {
        update : function () {
            var obj = this.context;

            if(obj.sprite.done) {
                obj._removeInNextTick = true;

                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
                explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
                var expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', obj.getParameter('power'));
            }
        }
    },
    destroyAfterSpriteDone: {
        update : function () {
            var obj = this.context;

            if(obj.sprite.done) {
                obj._removeInNextTick = true;
            }
        }
    },
    rotateByDirection: {
        update: function () {
            var obj = this.context;

            obj.sprite.rotateToDirection(obj.getParameter('direction'));
        }
    },
    rotateByPlayer: {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];

            obj.sprite.rotateToDirection(Phaser.Point.subtract(player.pos, obj.pos));
        }
    }
};

export default config;