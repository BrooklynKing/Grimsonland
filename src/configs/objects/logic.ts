import * as rules from '../rules';

import { ObjectTypes } from './constants';

import type { GameObjectConfig } from '../../engine/core/object';

export const monsterController: GameObjectConfig = {
	render: false,
	collisions: false,
	type: ObjectTypes.Controller,
	rules: [rules.monsterController],
	parameters: {
		monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
		monsterCooldown: 7,
	},
};
