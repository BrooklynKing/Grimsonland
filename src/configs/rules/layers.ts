import Phaser from 'phaser';

import { ObjectTypes } from '../objects/constants';

import type { GameLayer } from '../../engine/core/layer';
import type { GameRule } from './types';

const TREES_COUNT = 100;
const STONES_COUNT = 100;
const HEART_SPAWN_COOLDOWN = 400;
const EXP_SPAWN_COOLDOWN = 400;

const getRandomPointInArea = (obj: GameLayer) => {
	return [
		Math.round(Math.random() * obj.size![0]),
		Math.round(Math.random() * obj.size![1]),
	];
};

export const randomTrees: GameRule = {
	init(obj: GameLayer) {
		for (let i = 0; i < TREES_COUNT; i++) {
			const point = getRandomPointInArea(obj);
			const tree = obj.addObjectByID(Math.random() > 0.5 ? 'tree2' : 'tree1');
			tree.setPosition(new Phaser.Point(point[0], point[1]));
		}

		for (let i = 0; i < STONES_COUNT; i++) {
			const point = getRandomPointInArea(obj);
			const stone = obj.addObjectByID('stones');
			stone.setPosition(new Phaser.Point(point[0], point[1]));
		}
	},
};

export const spawnHeart: GameRule = {
	update(obj: GameLayer) {
		if (!obj.parameters.spawnHeartCurrentCooldown) {
			const rect = new Phaser.Rectangle(50, 50, 1104, 868);
			const heart = obj.addObjectByID('heart');
			heart.setPosition(new Phaser.Point(rect.randomX, rect.randomY));

			obj.parameters.spawnHeartCurrentCooldown = HEART_SPAWN_COOLDOWN;
		} else {
			obj.parameters.spawnHeartCurrentCooldown--;
		}
	},
};

export const spawnExp: GameRule = {
	update(obj: GameLayer) {
		if (!obj.parameters.spawnExpCurrentCooldown) {
			const rect = new Phaser.Rectangle(100, 100, 1000, 750);
			const exp = obj.addObjectByID('powerup');
			exp.setPosition(new Phaser.Point(rect.randomX, rect.randomY));

			obj.parameters.spawnExpCurrentCooldown = EXP_SPAWN_COOLDOWN;
		} else {
			obj.parameters.spawnExpCurrentCooldown--;
		}
	},
};

export const goWithPlayer: GameRule = {
	update(obj: GameLayer, dt: number) {
		const player = obj.getObjectsByType(ObjectTypes.Player)[0];
		const px = ((player.pos.x + obj.translate.x) / 1024) * 100;
		const py = ((player.pos.y + obj.translate.y) / 768) * 100;

		if (px < 30) {
			if (obj.translate.x < 0) {
				obj.translate.x += Math.round(player.parameters.speed * dt);
			}
		}
		if (px > 70) {
			if (obj.translate.x > -300) {
				obj.translate.x -= Math.round(player.parameters.speed * dt);
			}
		}

		if (py < 25) {
			if (obj.translate.y < 0) {
				obj.translate.y += Math.round(player.parameters.speed * dt);
			}
		}
		if (py > 75) {
			if (obj.translate.y > -300) {
				obj.translate.y -= Math.round(player.parameters.speed * dt);
			}
		}
	},
};
