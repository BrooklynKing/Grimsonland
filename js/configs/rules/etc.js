import utils from './../../engine/utils';
import format from 'string-template';

var config = {
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
    setDirectionToPlayerAdvance: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0],
                playerDirection = player.parameters.direction,
                oldDirection = utils.clone(obj.parameters.direction);

            if (!oldDirection) {
                oldDirection = utils.getDirection(obj.pos, player.pos);
            }

            if (playerDirection.dir == null) {
                obj.parameters.direction = utils.getDirection(obj.pos, player.pos);
            } else {
                var newDirection = utils.getDirection(utils.getDestination(obj.pos, oldDirection, obj.parameters.speed / 2), utils.getDestination(player.pos, playerDirection, player.parameters.speed / 2));
                var degreeBetween = utils.getDegreeBetweenDirections(newDirection, utils.getDirection(obj.pos, player.pos));

                if (degreeBetween < 5 && degreeBetween > -5) {
                    utils.getDirection(obj.pos, player.pos)
                } else {
                    obj.parameters.direction = utils.clone(newDirection);
                }
            }
        }
    },
    dynamicZIndex: {
        update: function(dt, obj) {
            var newZIndex = 0;
            obj.pos && (newZIndex += obj.pos[1]);
            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

            obj.zIndex = (obj.pos[1] > 0) ? Math.round(newZIndex) : 0;
        }
    },
    collisions: {
        init: function() {
            var obj = this.context;
            obj.parameters.collisions = [];
            obj.parameters.collisions.cells = new Array(4);
            obj.layer.game.collisions.updateObject(obj);
        },
        update: function(dt, obj) {
            obj.parameters.collisions.splice(0);
            obj.layer.game.collisions.updateObject(obj);
        }
    },
    rotateToMouse: {
        update: function (dt, obj) {
            var mousePosition = obj.layer.game.mouse.getMousePosition();

            var destination = (mousePosition) ? [mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1] + 1],
                directionToMouse = utils.getDirection(obj.pos, destination);

            obj.sprite.rotateToDirection(directionToMouse);
        }
    },
    bindPositionToMouse: {
        update : function(dt, obj) {
            var mousePosition = obj.layer.game.mouse.getMousePosition();
            obj.setPosition((mousePosition)?[mousePosition.x, mousePosition.y] : [obj.pos[0], obj.pos[1]]);
        }
    },
    removeOnCooldown: {
        update : function(dt, obj) {
            if (obj.parameters.cooldown == 0) {
                obj._removeInNextTick = true;
            } else {
                obj.parameters.cooldown--;
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
            obj.sprite.rotateToDirection(obj.parameters.direction);
        }
    },
    rotateByPlayer: {
        update: function (dt, obj) {
            var player = obj.layer.getObjectsByType('player')[0];

            obj.sprite.rotateToDirection(utils.getDirection(obj.pos, player.pos));
        }
    }
};

export default config;