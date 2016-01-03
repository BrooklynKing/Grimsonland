import utils from './../../engine/utils';
import format from 'string-template';

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

            collisions.cells = new Array(4);
            obj.layer.game.collisions.updateObject(obj);
        },
        update: function(dt, obj) {
            obj.getParameter('collisions').splice(0);
            obj.layer.game.collisions.updateObject(obj);
        }
    },
    rotateToMouse: {
        update: function (dt, obj) {
            var destination  = obj.layer.game.mouse.getMousePosition().clone();

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            var directionToMouse = new utils.Line(obj.pos, destination);

            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    bindPositionToMouse: {
        update : function(dt, obj) {
            var mousePosition = obj.layer.game.mouse.getMousePosition();
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