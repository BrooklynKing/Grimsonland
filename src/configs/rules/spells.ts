import Phaser, { Point } from 'phaser';

import { ObjectTypes } from '../objects/types';
import { moveWithSpeed } from './utils';
import { GameObject } from '../../engine/core/object';

import { Effects, IGameRuleConfig } from './types';

export const fireball: IGameRuleConfig = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const fireCooldown = obj.parameters.fireCooldown;
		const spellPower = player.parameters.spellPower;

		const createBullet = (direction: Point, destination: Point) => {
			const bull = obj.layer.addObjectByID('bullet');
			bull.setPosition(player.pos.clone());
			bull.parameters.direction = direction;
			bull.parameters.power = bull.parameters.power + 5 * (spellPower - 1);
			bull.sprite!.setDegree(player.pos.angle(destination));
		};

		if (player.parameters.currentSpell == 'fireball') {
			if (
				obj.layer.game.input.mousePointer.isDown ||
				obj.layer.game.input.keyboard.isDown(32)
			) {
				if (!fireCooldown) {
					const destination = new Phaser.Point(
						obj.layer.game.input.mousePointer.x,
						obj.layer.game.input.mousePointer.y
					);
					let startDegree = 10 * (spellPower - 1);

					destination.x -= obj.layer.translate.x;
					destination.y -= obj.layer.translate.y;

					for (let i = 0; i < spellPower; i++) {
						const movedPoint = destination
							.clone()
							.rotate(player.pos.x, player.pos.y, startDegree, true);

						createBullet(
							Phaser.Point.subtract(movedPoint, player.pos),
							movedPoint.clone()
						);

						startDegree -= 20;
					}
					obj.parameters.cooldown = obj.defaultParameters.cooldown;
					obj.parameters.fireCooldown = obj.parameters.cooldown;
				}
			}
		}
		fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
	},
};

export const hellfire: IGameRuleConfig = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const fireCooldown = obj.parameters.fireCooldown;

		const createTube = (pos: Phaser.Point) => {
			const spellPower = player.parameters.spellPower;

			const tube = obj.layer.addObjectByID('hellfireTube');
			tube.setPosition(pos);
			tube.parameters.power = tube.parameters.power + 5 * (spellPower - 1);
		};

		if (player.parameters.currentSpell == 'hellfire') {
			if (
				obj.layer.game.input.mousePointer.isDown ||
				obj.layer.game.input.keyboard.isDown(32)
			) {
				if (!fireCooldown) {
					const destination = new Phaser.Point(0, 1),
						point1 = moveWithSpeed(player.pos, destination, 100);

					for (let i = -10; i < 10; i++) {
						const movedPoint = point1
							.clone()
							.rotate(player.pos.x, player.pos.y, 18 * i, true);

						createTube(movedPoint);
					}

					obj.parameters.cooldown = obj.defaultParameters.cooldown;
					obj.parameters.fireCooldown = obj.parameters.cooldown;
				}
			}
		}
		fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
	},
};

export const slowEnemies: IGameRuleConfig = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'monster') {
				const speed = objects[i].parameters.speed;
				const power = obj.parameters.power;
				const effects = objects[i].parameters.effects || {};

				if (speed < power) {
					objects[i].parameters.speed = 0;
				} else {
					objects[i].parameters.speed = speed - power;
				}

				effects[Effects.Frozzen] = true;
			}
		}
	},
};
export const teleport: IGameRuleConfig = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const fireCooldown = obj.parameters.fireCooldown;

		if (player.parameters.currentSpell == 'teleport') {
			if (
				obj.layer.game.input.mousePointer.isDown ||
				obj.layer.game.input.keyboard.isDown(32)
			) {
				if (!fireCooldown) {
					const mouse = new Phaser.Point(
						obj.layer.game.input.mousePointer.x,
						obj.layer.game.input.mousePointer.y
					);

					mouse.x -= obj.layer.translate.x;
					mouse.y -= obj.layer.translate.y;

					const direction = Phaser.Point.subtract(mouse, player.pos);
					const spellPower = player.parameters.spellPower;
					const destination = moveWithSpeed(
						player.pos,
						direction,
						obj.parameters.power
					);
					const cooldown: number =
						obj.defaultParameters.cooldown - 30 * (spellPower - 1);

					const starTeleportGate = obj.layer.addObjectByID('teleportGate');
					starTeleportGate.setPosition(player.pos.clone());

					const endTeleportGate = obj.layer.addObjectByID('teleportGate');
					endTeleportGate.setPosition(destination.clone());

					player.setPosition(destination);

					obj.parameters.cooldown = cooldown > 50 ? cooldown : 50;
					obj.parameters.fireCooldown = obj.parameters.cooldown;
				}
			}
		}
		fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
	},
};

export const frostShard: IGameRuleConfig = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const fireCooldown = obj.parameters.fireCooldown;

		if (player.parameters.currentSpell == 'frostShard') {
			if (
				obj.layer.game.input.mousePointer.isDown ||
				obj.layer.game.input.keyboard.isDown(32)
			) {
				if (!fireCooldown) {
					const mousePosition = new Phaser.Point(
						obj.layer.game.input.mousePointer.x,
						obj.layer.game.input.mousePointer.y
					);
					const spellPower = player.parameters.spellPower;
					const destination = mousePosition.clone();

					destination.x -= obj.layer.translate.x;
					destination.y -= obj.layer.translate.y;

					let spellPowerBoost = 0;

					for (let i = 1; i < spellPower; i++) {
						spellPowerBoost += 50;
					}

					const fs = obj.layer.addObjectByID('frostShard');
					fs.setPosition(destination.clone());

					fs.parameters.cooldown = fs.parameters.cooldown + spellPowerBoost;

					obj.parameters.fireCooldown = obj.parameters.cooldown;
				}
			}
		}
		fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
	},
};

export const bulletMonsterCollision: IGameRuleConfig = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0, l = objects.length; i < l; i++) {
			if (objects[i].type == 'monster') {
				objects[i].parameters.health =
					objects[i].parameters.health - obj.parameters.power;

				const pos = objects[i].pos.clone();
				pos.x += 2;
				pos.y += -10;

				const blood = obj.layer.addObjectByID('bloodSpray');
				blood.setPosition(pos);

				obj.layer.removeObjectOnNextTick(obj.id);

				break;
			}
		}
	},
};

export const hellTubeMonsterCollision: IGameRuleConfig = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0, l = objects.length; i < l; i++) {
			if (objects[i].type == 'monster') {
				objects[i].parameters.health =
					objects[i].parameters.health - obj.parameters.power;

				const pos = objects[i].pos.clone();
				pos.x += 2;
				pos.y += -10;

				const blood = obj.layer.addObjectByID('bloodSpray');
				blood.setPosition(pos);
			}
		}
	},
};
