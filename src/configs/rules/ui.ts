import format from 'string-template';

import { ObjectTypes } from '../objects/types';
import { GameObject } from '../../engine/core/object';
import { IGameRuleConfig } from './types';

export const countMonsterKilled: IGameRuleConfig = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			kills: obj.layer.state.parameters.monstersKilled || 0,
		});
	},
};

export const timer: IGameRuleConfig = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2),
		});
	},
};

export const health: IGameRuleConfig = {
	update(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			health: obj.layer.getObjectsByType(ObjectTypes.Player)[0].parameters
				.health,
		});
	},
};

export const level: IGameRuleConfig = {
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

export const bestTime: IGameRuleConfig = {
	init(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			time: (obj.layer.state.parameters.bestTime / 60).toFixed(2),
		});
	},
};

export const bestScore: IGameRuleConfig = {
	init(obj: GameObject) {
		const template = obj.parameters.template;

		obj.parameters.text = format(template, {
			score: obj.layer.state.parameters.bestScore,
		});
	},
};
