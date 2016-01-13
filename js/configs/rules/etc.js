import utils from './../../engine/utils';
import format from 'string-template';
var Victor = require('victor');

var config = {
    bindPositionToLayer: {
        update: function (dt, obj) {
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
        update: function (dt, obj) {
            if (obj.pos.y < -100 || obj.pos.y - obj.sprite.size[1] - 100> obj.layer.pos.y + obj.layer.size[1] || obj.pos.x - obj.sprite.size[0] - 100> obj.layer.pos.x + obj.layer.size[0] || obj.pos.x < -100) {
                obj._removeInNextTick = true;
                return false;
            }
        }
    },
    setDirectionToPlayer: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            obj.setParameter('direction', new utils.Line(obj.pos, player.pos));
        }
    },
    setDirectionToPlayerAdvance: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                playerDirection = player.getParameter('direction'),
                oldDirection = obj.getParameter('direction');

            if (!oldDirection) {
                oldDirection = new utils.Line(obj.pos, player.pos);
            }

            if (playerDirection.dir == null) {
                obj.setParameter('direction', new utils.Line(obj.pos, player.pos));

            } else {
                var speed = Math.abs(Math.min(player.getParameter('speed'), utils.getDistance(obj.pos, player.pos)) - 10),
                    playerNextPlace = playerDirection.getDestination(player.pos, speed),
                    directionToPlayerNextPlace = new utils.Line(obj.pos, playerNextPlace),
                    directionToPlayerNextPlaceVector = directionToPlayerNextPlace.vector.clone().normalize(),
                    oldDirectionVector = oldDirection.vector.clone().normalize(),
                    newDirectionVector = directionToPlayerNextPlaceVector.add(oldDirectionVector).normalize(),
                    newDirection = new utils.Line(obj.pos, newDirectionVector);

                obj.setParameter('direction', newDirection);
            }
        }
    },
    wandererAI : {
        init: function (dt) {
            var topLeft = new Victor(100, 100);
            var bottomRight = new Victor(1100, 850);

            this.context.setParameter('direction', new utils.Line(this.context.pos, new utils.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
        },
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                distance = utils.getDistance(obj.pos, player.pos);

            if (distance <= obj.getParameter('scentRange')) {
                obj.setParameter('scent', true);
                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
                obj.setParameter('wanderCooldown', 0);
                obj.setParameter('direction', new utils.Line(obj.pos, player.pos));
            } else {
                obj.setParameter('speed', obj.getDefaultParameter('speed'));
                if (!obj.getParameter('wanderCooldown')) {
                    var topLeft = new Victor(100, 100);
                    var bottomRight = new Victor(1100, 850);

                    obj.setParameter('direction', new utils.Line(obj.pos, new utils.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
                    obj.setParameter('wanderCooldown', Math.round(Math.random() * (obj.getDefaultParameter('wanderCooldown') - 100) + 100));
                } else {
                    obj.getParameter('wanderCooldown') && obj.setParameter('wanderCooldown', obj.getParameter('wanderCooldown') - 1);
                }
            }
        }
    },
    dynamicZIndex: {
        update: function(dt, obj) {
            var newZIndex = 0;
            obj.pos && (newZIndex += obj.pos.y);
            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

            obj.zIndex = (obj.pos.y > 0) ? Math.round(newZIndex) : 0;
        }
    },
    collisions: {
        init: function() {
            var obj = this.context,
                collisions = obj.setParameter('collisions', []);

            collisions.cells = new Array();
            obj.layer.state.collisions.updateObject(obj);
        },
        update: function(dt, obj) {
            obj.getParameter('collisions').splice(0);
            obj.layer.state.collisions.updateObject(obj);
        }
    },
    rotateToMouse: {
        update: function (dt, obj) {
            var destination  = new utils.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            var directionToMouse = new utils.Line(obj.pos, destination);
            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    bindPositionToMouse: {
        update : function(dt, obj) {
            var mousePosition = new utils.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
            obj.setPosition(mousePosition.clone());
        }
    },
    removeOnCooldown: {
        update : function(dt, obj) {
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
            }
        }
    },
    explosionOnCooldown: {
        update: function(dt, obj) {
            var cooldown = obj.getParameter('cooldown');

            if (cooldown == 0) {
                obj._removeInNextTick = true;

                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
                explosionConfig.pos = new utils.Point([obj.pos.x, obj.pos.y]);
                var expl = obj.layer.addObject(explosionConfig);
                expl.setParameter('power', obj.getParameter('power'));

                return;
            } else {
                obj.setParameter('cooldown', cooldown - 1);
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
    rotateByDirection: {
        update: function (dt, obj) {
            obj.sprite.rotateToDirection(obj.getParameter('direction'));
        }
    },
    rotateByPlayer: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            obj.sprite.rotateToDirection(new utils.Line(obj.pos, player.pos));
        }
    }
};

export default config;