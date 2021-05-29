import format from 'string-template';

import { ObjectTypes } from '../objects/types';
import { GameObject } from '../../engine/core/object';
import { GameRule } from './types';

export const countMonsterKilled: GameRule = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			kills: obj.layer.state.parameters.monstersKilled || 0,
		});
	},
};

export const timer: GameRule = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2),
		});
	},
};

export const health: GameRule = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			health: obj.layer.getObjectsByType(ObjectTypes.Player)[0].parameters
				.health,
		});
	},
};

export const level: GameRule = {
	update(obj: GameObject) {
		const template = obj.parameters.template;
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

		obj.parameters.text = format(template, {
			level: player.parameters.level,
			exp: player.parameters.exp,
			levelExp: player.parameters.levelTable[player.parameters.level],
		});
	},
};

export const bestTime: GameRule = {
	init(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			time: (obj.layer.state.parameters.bestTime / 60).toFixed(2),
		});
	},
};

export const bestScore: GameRule = {
	init(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			score: obj.layer.state.parameters.bestScore,
		});
	},
};
