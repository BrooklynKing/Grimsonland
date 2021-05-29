import * as rules from '../rules';
import { IGameObjectConfig } from '../../engine/core/object';
import { ObjectTypes } from './types';

export const monsterController: IGameObjectConfig = {
	render: false,
	collisions: false,
	type: ObjectTypes.Controller,
	rules: [rules.monsterController],
	parameters: {
		monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
		monsterCooldown: 7,
	},
};
