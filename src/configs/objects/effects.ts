import { ObjectTypes } from './types';

export const mbullet = {
  zIndex: 3,
  collisions: true,
  sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
  type: ObjectTypes.MonsterSpellElement,
  render: 'object',
  size: [32, 32],
  conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
  parameters: {
    power: 8,
    speed: 100,
  },
  rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex'],
};
export const mbullet2 = {
  zIndex: 3,
  collisions: true,
  sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
  type: ObjectTypes.MonsterSpellElement,
  render: 'object',
  size: [28, 24],
  conditions: ['monsterBoss2Bullet'],
  parameters: {
    power: 15,
    cooldown: 100,
    speed: 200,
  },
  rules: [
    'destroyAfterLeavingLayer',
    'setDirectionToPlayer',
    'rotateByDirection',
    'moveToDirection',
    'dynamicZIndex',
  ],
};
export const blood = {
  zIndex: 2,
  sprite: ['monsterBlood', [0, 0], [32, 13]],
  parameters: {
    cooldown: 500,
  },
  rules: ['removeOnCooldown'],
};
export const bloodSpray = {
  zIndex: 2,
  sprite: [
    'bloodEffect',
    [0, 0],
    [64, 64],
    15,
    [0, 1, 2, 3, 4],
    null,
    true,
    0.785,
  ],
  rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};
export const explosion = {
  render: 'object',
  size: [39, 39],
  sprite: [
    'explosions',
    [0, 0],
    [39, 39],
    16,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    null,
    true,
  ],
  rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};
export const monsterExplosion = {
  render: 'object',
  collisions: true,
  type: ObjectTypes.SpellEffect,
  conditions: ['monsterExplosion'],
  size: [39, 39],
  sprite: [
    'explosions',
    [0, 0],
    [39, 39],
    16,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    null,
    true,
  ],
  rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};

export const spellExplosion = {
  render: 'object',
  collisions: true,
  type: ObjectTypes.SpellEffect,
  conditions: ['spellExplosion'],
  size: [39, 39],
  sprite: [
    'explosions',
    [0, 0],
    [39, 39],
    16,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    null,
    true,
  ],
  rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};

export const fog = {
  render: 'fog',
  zIndex: 2500,
  type: ObjectTypes.Effect,
};
