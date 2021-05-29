import { IGameObjectConfig } from '../../engine/core/object';
import * as rules from '../rules';
import { ObjectTypes } from './types';

export const mbullet: IGameObjectConfig = {
	zIndex: 3,
	collisions: true,
	sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
	type: ObjectTypes.MonsterSpellElement,
	render: 'object',
	size: [32, 32],
	conditions: [rules.damageOnPlayerCollision, rules.destroyOnPlayerCollision],
	parameters: {
		power: 8,
		speed: 100,
	},
	rules: [
		rules.destroyAfterLeavingLayer,
		rules.moveToDirection,
		rules.dynamicZIndex,
	],
};

export const mbullet2: IGameObjectConfig = {
	zIndex: 3,
	collisions: true,
	sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
	type: ObjectTypes.MonsterSpellElement,
	render: 'object',
	size: [28, 24],
	conditions: [rules.monsterBoss2Bullet],
	parameters: {
		power: 15,
		cooldown: 100,
		speed: 200,
	},
	rules: [
		rules.destroyAfterLeavingLayer,
		rules.setDirectionToPlayer,
		rules.rotateByDirection,
		rules.moveToDirection,
		rules.dynamicZIndex,
	],
};

export const blood: IGameObjectConfig = {
	type: ObjectTypes.Effect,
	zIndex: 2,
	sprite: ['monsterBlood', [0, 0], [32, 13]],
	parameters: {
		cooldown: 500,
	},
	rules: [rules.removeOnCooldown],
};

export const bloodSpray: IGameObjectConfig = {
	type: ObjectTypes.Effect,
	zIndex: 2,
	sprite: [
		'bloodEffect',
		[0, 0],
		[64, 64],
		15,
		[0, 1, 2, 3, 4],
		undefined,
		true,
		0.785,
	],
	rules: [rules.destroyAfterSpriteDone, rules.dynamicZIndex],
};

export const explosion: IGameObjectConfig = {
	type: ObjectTypes.Effect,
	render: 'object',
	size: [39, 39],
	sprite: [
		'explosions',
		[0, 0],
		[39, 39],
		16,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		undefined,
		true,
	],
	rules: [rules.destroyAfterSpriteDone, rules.dynamicZIndex],
};

export const monsterExplosion: IGameObjectConfig = {
	render: 'object',
	collisions: true,
	type: ObjectTypes.SpellEffect,
	conditions: [rules.monsterExplosion],
	size: [39, 39],
	sprite: [
		'explosions',
		[0, 0],
		[39, 39],
		16,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		undefined,
		true,
	],
	rules: [rules.destroyAfterSpriteDone, rules.dynamicZIndex],
};

export const spellExplosion: IGameObjectConfig = {
	render: 'object',
	collisions: true,
	type: ObjectTypes.SpellEffect,
	conditions: [rules.spellExplosion],
	size: [39, 39],
	sprite: [
		'explosions',
		[0, 0],
		[39, 39],
		16,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		undefined,
		true,
	],
	rules: [rules.destroyAfterSpriteDone, rules.dynamicZIndex],
};

export const fog: IGameObjectConfig = {
	render: 'fog',
	zIndex: 2500,
	type: ObjectTypes.Effect,
};
