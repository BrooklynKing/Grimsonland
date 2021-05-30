import * as rules from '../rules';
import { GameObjectConfig } from '../../engine/core/object';
import { ObjectTypes } from './types';

export const tree1: GameObjectConfig = {
	type: ObjectTypes.Terrain,
	sprite: ['tree1', [0, 0], [62, 87]],
	size: [62, 88],
	rules: [rules.dynamicZIndex],
};

export const tree2: GameObjectConfig = {
  type: ObjectTypes.Terrain,
	sprite: ['tree2', [0, 0], [59, 87]],
	size: [60, 88],
	rules: [rules.dynamicZIndex],
};

export const stones: GameObjectConfig = {
	type: ObjectTypes.Terrain,
	render: 'object',
	sprite: ['stone', [0, 0], [25, 22]],
	size: [15, 22],
	rules: [rules.dynamicZIndex],
};
