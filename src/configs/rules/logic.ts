import Phaser from 'phaser';

import { ObjectTypes } from '../objects/constants';

import type { GameObject, GameRule } from '../../engine';

const monsterCount = [
	10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000,
];
const monsterCooldown = 10;
export const monsterController: GameRule = {
	init(obj: GameObject) {
		obj.parameters.currentWave = 1;
		obj.parameters.monsterOnWave = monsterCount[obj.parameters.currentWave - 1];
		obj.parameters.monsterKilled = 0;
		obj.parameters.monsterSpawned = 0;
		obj.parameters.leftOnWaveId = obj.layer.addObjectByID('leftOnWaveLabel').id;
	},
	update(obj: GameObject) {
		const createSpawn = () => {
			const rect = new Phaser.Rectangle(
				100 - obj.layer.translate.x,
				100 - obj.layer.translate.y,
				800 - obj.layer.translate.x,
				550 - obj.layer.translate.y
			);

			const pos = new Phaser.Point(
				Math.min(1100, Math.max(50, rect.randomX)),
				Math.min(900, Math.max(50, rect.randomY))
			);
			const gate = obj.layer.addObjectByID('summonGate');
			gate.setPosition(pos);
		};

		if (obj.parameters.monsterSpawned < obj.parameters.monsterOnWave) {
			if (!obj.parameters.currentMonsterCooldown) {
				createSpawn();

				obj.parameters.monsterSpawned = obj.parameters.monsterSpawned + 1;
				obj.parameters.currentMonsterCooldown = monsterCooldown;
			} else {
				obj.parameters.currentMonsterCooldown &&
					obj.parameters.currentMonsterCooldown--;
			}
		}
		if (
			!obj.layer.getObjectsByType(ObjectTypes.Monster).length &&
			obj.parameters.monsterKilled < obj.parameters.monsterSpawned
		) {
			obj.parameters.monsterSpawned = obj.parameters.monsterKilled;
		} else {
			if (obj.parameters.monsterKilled >= obj.parameters.monsterOnWave) {
				obj.parameters.currentWave = obj.parameters.currentWave + 1;
				obj.parameters.monsterSpawned = 0;
				obj.parameters.monsterOnWave =
					monsterCount[obj.parameters.currentWave - 1];
				obj.parameters.monsterKilled = 0;
			}
		}

		const leftOnWave = obj.layer.getObjectByID(obj.parameters.leftOnWaveId);
		leftOnWave.parameters.text = `LEFT ON THIS WAVE: ${obj.parameters.monsterKilled + '/' + obj.parameters.monsterOnWave}`;
	},
};
