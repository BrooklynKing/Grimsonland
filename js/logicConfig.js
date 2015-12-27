import utils from './engine/utils';

var config = {
	player : {
		callbacks : {
			'damage' : function(obj, event) {
				console.log(event);
				obj.parameters.health -= event.damage;
				console.log(obj.parameters.health, event.damage);
			},
			'eclick' : function(obj, event){
				if (obj.parameters.fireCooldown == 0) {
					var	bulletConfig = obj.layer.game.getConfig('bullet'),
						mainLayer = obj.layer,
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
			},
			'key_65' : function(obj, event) {
				obj.parameters.direction.left = event.keyStatus;
			},
			'key_87' : function(obj, event) {
				obj.parameters.direction.up = event.keyStatus;
			},
			'key_83' : function(obj, event) {
				obj.parameters.direction.down = event.keyStatus;
			},
			'key_68' : function(obj, event) {
				obj.parameters.direction.right = event.keyStatus;
			}
		},
		update : function(dt) {
			var pos = utils.clone(this.pos);

			if (this.parameters.direction.right) {
				pos[0] = this.pos[0] + 1;
			}
			if (this.parameters.direction.left) {
				pos[0] = this.pos[0] - 1;
			}
			if (this.parameters.direction.down) {
				pos[1] = this.pos[1] + 1;
			}
			if (this.parameters.direction.up) {
				pos[1] = this.pos[1] - 1;
			}
			if (this.pos[0] == pos[0] && this.pos[1] == pos[1]) {
				this.parameters.direction.dir = null;
			} else {
				var direction = utils.getDirection(this.pos, pos);
				this.parameters.direction.k = direction.k;
				this.parameters.direction.dir = direction.dir;
			}
		}
	},
	explosion : {
		update : function (dt) {
			if(this.sprite.done) {
				var	bloodConfig = this.layer.game.getConfig('blood');
				bloodConfig.pos = this.pos;
				bloodConfig.id = 'blood_' + this.id;
				this.layer.addObject( bloodConfig);
				this.layer.removeObject(this.id);
			}
		}
	},
	monster : {
		callbacks : {
			'damage': function (obj, event) {
				obj.parameters.health -= event.damage;
			},
		},
	},
	monsterBoss : {
		callbacks : {
			'damage': function (obj, event) {
				obj.parameters.health -= event.damage;
			}
		},
		update : function(dt, obj) {
			var player = this.layer.getObjectsByType('player')[0];
			if (this.parameters.fireCooldown == 0) {
				var	bulletConfig = this.layer.game.getConfig('mbullet'),
					direction = utils.getDirection(this.pos, player.pos);

				bulletConfig.pos = utils.clone(this.pos);
				bulletConfig.id = 'mbullet_' + this.id + '_' + this.parameters.bulletsFired;

				bulletConfig.parameters.direction = direction;
				this.layer.addObject(bulletConfig);

				this.parameters.bulletsFired++;
				this.parameters.fireCooldown = this.parameters.cooldown;
			}
		}
	},
	cursor : {
		update : function(dt) {
			this.setPosition((this.layer.game.parameters.mouseposition)?[this.layer.game.parameters.mouseposition.x, this.layer.game.parameters.mouseposition.y] : [this.pos[0], this.pos[1]]);
		}
	},
	blood : {
		update : function(dt) {
			if (this.parameters.cooldown == 0) {
				this.layer.removeObject(this.id);
			} else {
				this.parameters.cooldown--;
			}
		}
	}
};

export default config;