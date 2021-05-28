import { ObjectTypes } from './types';

export const fireballSpell = {
  zIndex: 5000,
  sprite: ['spellIcons', [0, 0], [32, 32]],
  pos: [449, 748],

  size: [32, 32],
  render: 'spell',
  parameters: {
    bulletsFired: 0,
    cooldown: 20,
  },
  type: ObjectTypes.Spell,
  rules: ['fireball'],
};
export const hellfireSpell = {
  zIndex: 5000,
  sprite: ['spellIcons', [96, 0], [32, 32]],
  pos: [491, 748],

  size: [32, 32],
  render: 'spell',
  parameters: {
    bulletsFired: 0,
    cooldown: 800,
  },
  type: ObjectTypes.Spell,
  rules: ['hellfire'],
};
export const frostShardSpell = {
  zIndex: 5000,
  sprite: ['spellIcons', [224, 96], [32, 32]],
  pos: [533, 748],
  size: [32, 32],
  render: 'spell',
  parameters: {
    shardsFired: 0,
    cooldown: 500,
  },
  type: ObjectTypes.Spell,
  rules: ['frostShard'],
};
export const teleportSpell = {
  zIndex: 5000,
  sprite: ['spellIcons', [64, 32], [32, 32]],
  pos: [575, 748],
  size: [32, 32],
  render: 'spell',
  parameters: {
    power: 200,
    teleportGates: 0,
    cooldown: 200,
  },
  type: ObjectTypes.Spell,
  rules: ['teleport'],
};
export const teleportGate = {
  zIndex: 0,
  render: 'object',
  sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
  pos: [466, 580],
  size: [32, 32],
  parameters: {
    cooldown: 200,
  },
  type: ObjectTypes.SpellElement,
  rules: ['removeOnCooldown', 'dynamicZIndex'],
};

export const bullet = {
  zIndex: 3,
  collisions: true,
  render: 'object',
  sprite: ['fireball', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
  size: [25, 25],
  type: ObjectTypes.SpellElement,
  parameters: {
    power: 10,
    cooldown: 100,
    speed: 300,
  },
  conditions: ['bulletMonsterCollision'],
  rules: [
    'destroyAfterLeavingLayer',
    'moveToDirection',
    'dynamicZIndex',
    'explosionOnCooldown',
  ],
};
export const hellfireTube = {
  zIndex: 3,
  collisions: true,
  render: 'object',
  sprite: [
    'hellfire',
    [0, 0],
    [21, 58],
    14,
    [2, 3, 4, 4, 3, 2, 2, 3, 4, 4, 3, 2, 2, 3, 4, 4, 3, 2],
    null,
    false,
  ],
  size: [50, 50],
  type: ObjectTypes.SpellElement,
  parameters: {
    power: 10,
    cooldown: 150,
    speed: 300,
  },
  conditions: ['hellTubeMonsterCollision'],
  rules: ['dynamicZIndex', 'explosionOnCooldown'],
};
export const frostShard = {
  zIndex: 3,
  render: 'object',
  collisions: true,
  sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
  type: ObjectTypes.SpellElement,
  size: [500, 500],
  parameters: {
    power: 60,
    cooldown: 200,
  },
  conditions: ['slowEnemies'],
  rules: ['removeOnCooldown', 'dynamicZIndex'],
};
