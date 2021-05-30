import Phaser from 'phaser';

import { moveWithSpeed } from './utils';

import { ObjectTypes } from '../objects/constants';

import type { GameObject } from '../../engine/core/object';
import type { GameRule } from './types';

export const playerDeath: GameRule = {
	update(obj: GameObject) {
		if (obj.parameters.health <= 0) {
			obj.layer.state.stopBattle();
		}
	},
};

export const damageOnPlayerCollision: GameRule = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'player') {
				objects[i].parameters.health =
					objects[i].parameters.health - obj.parameters.power;
				break;
			}
		}
	},
};

export const destroyOnPlayerCollision: GameRule = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'player') {
				const expl = obj.layer.addObjectByID('explosion');
				expl.setPosition(obj.pos.clone());

				obj.layer.removeObjectOnNextTick(obj.id);
				break;
			}
		}
	},
};

export const triggerOnPlayerCollision: GameRule = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'player') {
				if (
					objects[i].parameters.health < objects[i].defaultParameters.health
				) {
					if (
						objects[i].parameters.health + obj.parameters.power <=
						objects[i].defaultParameters.health
					) {
						objects[i].parameters.health =
							objects[i].parameters.health + obj.parameters.power;
					} else {
						objects[i].parameters.health = objects[i].defaultParameters.health;
					}
				}

				obj.layer.removeObjectOnNextTick(obj.id);
				break;
			}
		}
	},
};

export const meleeAttack: GameRule = {
	update(obj: GameObject) {
		if (!obj.parameters.meleeCooldown) {
			const { objects } = obj.parameters.collisions;

			for (let i = 0; i < objects.length; i++) {
				if (objects[i].type == 'player') {
					objects[i].parameters.health =
						objects[i].parameters.health - obj.parameters.power;

					const pos = objects[i].pos.clone();
					pos.x += 2;
					pos.y += -10;
					const blood = obj.layer.addObjectByID('bloodSpray');
					blood.setPosition(pos);

					obj.parameters.meleeCooldown = obj.parameters.cooldown;
					break;
				}
			}
		}
	},
};

export const spellExplosion: GameRule = {
	update(obj: GameObject) {
		if (!obj.parameters.exploded) {
			const { objects } = obj.parameters.collisions;

			for (let i = 0, l = objects.length; i < l; i++) {
				if (objects[i].parameters.health && objects[i].type !== 'player') {
					objects[i].parameters.health =
						objects[i].parameters.health - obj.parameters.power;
					break;
				}
			}

			obj.parameters.exploded = true;
		}
	},
};

export const monsterExplosion: GameRule = {
	update(obj: GameObject) {
		if (!obj.parameters.exploded) {
			const { objects } = obj.parameters.collisions;

			for (let i = 0, l = objects.length; i < l; i++) {
				if (objects[i].parameters.health) {
					objects[i].parameters.health =
						objects[i].parameters.health - obj.parameters.power;
					break;
				}
			}

			obj.parameters.exploded = true;
		}
	},
};

const generateExplosions = (obj: GameObject) => {
	const pos = obj.pos.clone();
	const power = obj.parameters.power;
	let expl;

	obj.layer.removeObjectOnNextTick(obj.id);

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(
		new Phaser.Point(pos.x - obj.size![0], pos.y - obj.size![1])
	);
	expl.parameters.power = power;

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(
		new Phaser.Point(pos.x + obj.size![0], pos.y - obj.size![1])
	);
	expl.parameters.power = power;

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(
		new Phaser.Point(pos.x - obj.size![0], pos.y + obj.size![1])
	);
	expl.parameters.power = power;

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(
		new Phaser.Point(pos.x + obj.size![0], pos.y + obj.size![1])
	);
	expl.parameters.power = power;

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(new Phaser.Point(pos.x - (3 / 2) * obj.size![0], pos.y));
	expl.parameters.power = power;

	expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(new Phaser.Point(pos.x + (3 / 2) * obj.size![0], pos.y));
	expl.parameters.power = power;
};

export const monsterExplosionCondition: GameRule = {
	update(obj: GameObject) {
		if (obj.parameters.health <= 0) {
			generateExplosions(obj);
		} else {
			const { objects } = obj.parameters.collisions;

			for (let i = 0; i < objects.length; i++) {
				if (objects[i].type == 'player') {
					generateExplosions(obj);

					break;
				}
			}
		}
	},
};

export const stopOnCollisionWithPlayer: GameRule = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0, l = objects.length; i < l; i++) {
			if (objects[i].type == 'player') {
				obj.parameters.speed = 0;
				break;
			}
		}
	},
};

export const resetSpeed: GameRule = {
	update(obj: GameObject) {
		obj.parameters.speed = obj.defaultParameters.speed;
	},
};

export const resetEffects: GameRule = {
	update(obj: GameObject) {
		obj.parameters.effects = {};
	},
};

export const moveToDirection: GameRule = {
	update(obj: GameObject, dt: number) {
		const direction = obj.parameters.direction;

		if (direction) {
			obj.setPosition(
				moveWithSpeed(obj.pos, direction, obj.parameters.speed * dt)
			);
		}
	},
};

export const playerLevelUp: GameRule = {
	update(obj: GameObject) {
		const levelExp = obj.parameters.levelTable[obj.parameters.level];

		if (obj.parameters.levelTable[obj.parameters.level]) {
			if (
				obj.parameters.exp > obj.parameters.levelTable[obj.parameters.level]
			) {
				obj.parameters.exp = obj.parameters.exp - levelExp;
				obj.parameters.level = obj.parameters.level + 1;
				obj.parameters.spellPower = obj.parameters.spellPower + 1;
			}
		} else {
			obj.parameters.level = 'MAX';
		}
	},
};

export const monsterHealthStatus: GameRule = {
	update(obj: GameObject) {
		if (obj.parameters.health <= 0) {
			obj.layer.removeObjectOnNextTick(obj.id);

			const expl = obj.layer.addObjectByID('explosion');
			expl.setPosition(obj.pos.clone());

			const blood = obj.layer.addObjectByID('blood');
			blood.setPosition(obj.pos.clone());

			if (!obj.layer.state.parameters.monstersKilled) {
				obj.layer.state.parameters.monstersKilled = 0;
			}

			const monsterController = obj.layer.getObjectsByType(
				ObjectTypes.Controller
			)[0];
			monsterController.parameters.monsterKilled =
				monsterController.parameters.monsterKilled + 1;

			obj.layer.state.parameters.monstersKilled++;

			const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
			player.parameters.exp = player.parameters.exp + obj.parameters.exp;
		}
	},
};

export const resetRangeCooldown: GameRule = {
	update(obj: GameObject) {
		const fireCooldown = obj.parameters.fireCooldown;

		fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
	},
};

export const resetMeleeCooldown: GameRule = {
	update(obj: GameObject) {
		const meleeCooldown = obj.parameters.meleeCooldown;

		meleeCooldown && (obj.parameters.meleeCooldown = meleeCooldown - 1);
	},
};

export const monsterBossLogic: GameRule = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

		if (!obj.parameters.fireCooldown) {
			const direction = Phaser.Point.subtract(player.pos, obj.pos);

			const bull = obj.layer.addObjectByID('mbullet');
			bull.setPosition(obj.pos.clone());
			bull.parameters.direction = direction;

			bull.sprite!.setDegree(obj.pos.angle(player.pos));

			obj.parameters.fireCooldown = obj.parameters.cooldown;
		}
	},
};

export const monsterBoss2Logic: GameRule = {
	update(obj: GameObject, dt: number) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const directionToPlayer = obj.parameters.direction;

		if (Phaser.Point.distance(obj.pos, player.pos) < obj.parameters.fireRange) {
			if (!obj.parameters.fireCooldown) {
				const bull = obj.layer.addObjectByID('mbullet2');
				bull.setPosition(obj.pos.clone());
				bull.parameters.direction = directionToPlayer;

				obj.parameters.fireCooldown = obj.parameters.cooldown;
			}
		} else {
			obj.setPosition(
				moveWithSpeed(obj.pos, directionToPlayer, obj.parameters.speed * dt)
			);
		}
	},
};

const createExplosion = (obj: GameObject) => {
	const pos = obj.pos.clone();
	const power = obj.parameters.power;

	const expl = obj.layer.addObjectByID('monsterExplosion');
	expl.setPosition(pos);
	expl.parameters.power = power;
};

export const monsterBoss2Bullet: GameRule = {
	update(obj: GameObject) {
		const cooldown = obj.parameters.cooldown;
		const { objects } = obj.parameters.collisions;

		if (cooldown == 0) {
			obj.layer.removeObjectOnNextTick(obj.id);

			createExplosion(obj);
			return;
		} else {
			obj.parameters.cooldown = cooldown - 1;
		}

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'player') {
				obj.layer.removeObjectOnNextTick(obj.id);

				createExplosion(obj);
				break;
			}
		}
	},
};

export const moveWithKeyboard: GameRule = {
	update(obj: GameObject) {
		const pos = obj.pos.clone();

		if (obj.layer.game.input.keyboard.isDown(68)) {
			pos.x = obj.pos.x + 1;
		}
		if (obj.layer.game.input.keyboard.isDown(65)) {
			pos.x = obj.pos.x - 1;
		}
		if (obj.layer.game.input.keyboard.isDown(83)) {
			pos.y = obj.pos.y + 1;
		}
		if (obj.layer.game.input.keyboard.isDown(87)) {
			pos.y = obj.pos.y - 1;
		}

		if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
			obj.parameters.direction = null;
		} else {
			obj.parameters.direction = Phaser.Point.subtract(pos, obj.pos);
		}
	},
};

export const selectSpellWithKeyboard: GameRule = {
	update(obj: GameObject) {
		obj.layer.game.input.keyboard.isDown(49) &&
			(obj.parameters.currentSpell = 'fireball');
		obj.layer.game.input.keyboard.isDown(50) &&
			(obj.parameters.currentSpell = 'hellfire');
		obj.layer.game.input.keyboard.isDown(51) &&
			(obj.parameters.currentSpell = 'frostShard');
		obj.layer.game.input.keyboard.isDown(52) &&
			(obj.parameters.currentSpell = 'teleport');
	},
};

export const triggerOnPlayerCollisionPowerUp: GameRule = {
	update(obj: GameObject) {
		const { objects } = obj.parameters.collisions;

		for (let i = 0; i < objects.length; i++) {
			if (objects[i].type == 'player') {
				//objects[i].parameters.spellPower', objects[i].parameters.spellPower') + obj.parameters.power'));
				objects[i].parameters.exp =
					objects[i].parameters.exp + obj.parameters.exp;
				obj.layer.removeObjectOnNextTick(obj.id);
				break;
			}
		}
	},
};

export const summonOnCooldown: GameRule = {
	update(obj: GameObject) {
		const cooldown = obj.parameters.cooldown;

		const getProperMonster = () => {
			let random = Math.random() * 100;

			if (random <= obj.parameters.chanceOfBoss) {
				return 'monsterBoss';
			} else {
				random -= obj.parameters.chanceOfBoss;
			}

			if (random <= obj.parameters.chanceOfBoss2) {
				return 'monsterBoss2';
			} else {
				random -= obj.parameters.chanceOfBoss2;
			}

			if (random <= obj.parameters.chanceOfBoomer) {
				return 'monsterBoomer';
			} else {
				random -= obj.parameters.monsterBoomer;
			}

			return 'monster';
		};

		if (cooldown == 0) {
			const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

			const monster = obj.layer.addObjectByID(getProperMonster());
			monster.setPosition(obj.pos.clone());

			if (player.parameters.level > 1) {
				monster.parameters.health =
					monster.parameters.health * 0.75 * player.parameters.level;
			}

			obj.layer.removeObjectOnNextTick(obj.id);
		} else {
			obj.parameters.cooldown = cooldown - 1;
		}
	},
};
