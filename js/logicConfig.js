import utils from './engine/utils';

var config = {
	player : {
		callbacks : {
			'damage' : function(obj, event) {
				obj.parameters.health -= event.damage;
			},
			'eclick' : function(obj, event) {
				if (obj.parameters.fireCooldown == 0) {
					var	bulletConfig = obj.layer.game.getConfig('bullet'),
						destination = (obj.layer.game.parameters.mouseposition)?[obj.layer.game.parameters.mouseposition.x, obj.layer.game.parameters.mouseposition.y] : [obj.pos[0], obj.pos[1] - 1],
						direction1 = utils.getDirection(obj.pos, destination),
						direction2 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, 20)),
						direction3 = utils.getDirection(obj.pos, utils.getMovedPointByDegree(obj.pos, destination, -20));

					bulletConfig.pos = utils.clone(obj.pos);
					bulletConfig.id = 'bullet' + obj.parameters.bulletsFired++;

					bulletConfig.parameters.direction = direction1;
					obj.layer.addObject(bulletConfig);

					bulletConfig.id = 'bullet' + (obj.parameters.bulletsFired++);
					bulletConfig.pos = utils.clone(obj.pos);
					bulletConfig.parameters.direction = direction2;

					obj.layer.addObject(bulletConfig);

					bulletConfig.id = 'bullet' + (obj.parameters.bulletsFired++);
					bulletConfig.pos = utils.clone(obj.pos);
					bulletConfig.parameters.direction = direction3;

					obj.layer.addObject(bulletConfig);
					obj.parameters.fireCooldown = obj.parameters.cooldown;
				}
			}
		}
	},
	monster : {
		callbacks : {
			'damage': function (obj, event) {
				obj.parameters.health -= event.damage;
			}
		}
	},
	monsterBoss : {
		callbacks : {
			'damage': function (obj, event) {
				obj.parameters.health -= event.damage;
			}
		}
	}
};

export default config;