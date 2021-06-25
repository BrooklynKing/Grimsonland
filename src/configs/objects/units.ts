import * as rules from '../rules';

import { ObjectTypes } from './constants';
import { unit as unitRender, object as objectRender, sprite as spriteRender  } from '../renderers';

import type { GameObjectConfig } from '../../engine';

export const player: GameObjectConfig = {
  zIndex: 20,
  sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
  pos: [662, 534],
  size: [25, 32],
  render: unitRender,
  collisions: true,
  parameters: {
    speed: 150,
    health: 50,
    spellPower: 1,
    level: 1,
    exp: 0,
    effects: [] as string[],
    currentSpell: 'fireball',
    direction: {},
    levelTable: {
      1: 600,
      2: 1200,
      3: 2000,
      4: 3000,
      5: 4500,
      6: 6500,
      7: 9000,
      8: 13000,
      9: 20000,
    },
  },
  type: ObjectTypes.Player,
  conditions: [rules.selectSpellWithKeyboard],
  rules: [
    rules.moveWithKeyboard,
    rules.rotateToMouse,
    rules.bindPositionToLayer,
    rules.playerDeath,
    rules.moveToDirection,
    rules.dynamicZIndex,
    rules.resetSpeed,
    rules.resetEffects,
    rules.playerLevelUp,
  ],
};

export const summonGate: GameObjectConfig = {
  zIndex: 0,
  render: objectRender,
  sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
  pos: [466, 580],
  size: [25, 30],
  collisions: true,
  parameters: {
    cooldown: 80,
    exp: 3,
    chanceOfBoss: 5,
    chanceOfBoss2: 8,
    chanceOfBoomer: 20,
    health: 10,
  },
  conditions: [rules.monsterHealthStatus],
  type: ObjectTypes.Monster,
  rules: [rules.summonOnCooldown, rules.dynamicZIndex],
};

export const monster: GameObjectConfig = {
  zIndex: 1,
  sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
  size: [20, 28],
  collisions: true,
  render: unitRender,
  parameters: {
    speed: 25,
    cooldown: 70,
    scentSpeed: 120,
    scentRange: 600,
    exp: 15,
    wanderCooldown: 500,
    effects: [] as string[],
    health: 20,
    power: 5,
  },
  conditions: [rules.monsterHealthStatus, rules.stopOnCollisionWithPlayer],
  type: ObjectTypes.Monster,
  rules: [
    rules.moveToDirection,
    rules.wandererAI,
    rules.rotateByDirection,
    rules.meleeAttack,
    rules.dynamicZIndex,
    rules.resetEffects,
    rules.resetMeleeCooldown,
  ],
};
export const monsterBoomer: GameObjectConfig = {
  zIndex: 1,
  sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
  size: [20, 28],
  collisions: true,
  render: unitRender,
  parameters: {
    speed: 100,
    exp: 30,
    effects: [] as string[],
    health: 10,
    power: 10,
  },
  conditions: [rules.monsterHealthStatus, rules.monsterExplosionCondition],
  type: ObjectTypes.Monster,
  rules: [
    rules.moveToDirection,
    rules.rotateByPlayer,
    rules.setDirectionToPlayerAdvance,
    rules.dynamicZIndex,
    rules.resetSpeed,
    rules.resetEffects,
  ],
};
export const monsterBoss: GameObjectConfig = {
  zIndex: 1,
  collisions: true,
  sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
  size: [25, 40],
  render: unitRender,
  parameters: {
    speed: 50,
    exp: 60,
    cooldown: 75,
    power: 10,
    health: 50,
    effects: [] as string[],
  },
  conditions: [rules.monsterHealthStatus, rules.stopOnCollisionWithPlayer],
  type: ObjectTypes.Monster,
  rules: [
    rules.setDirectionToPlayer,
    rules.monsterBossLogic,
    rules.moveToDirection,
    rules.rotateByDirection,
    rules.dynamicZIndex,
    rules.resetSpeed,
    rules.resetEffects,
    rules.resetRangeCooldown,
  ],
};

export const monsterBoss2: GameObjectConfig = {
  zIndex: 1,
  collisions: true,
  sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
  size: [40, 45],
  render: unitRender,
  parameters: {
    speed: 15,
    cooldown: 200,
    exp: 120,
    fireRange: 300,
    power: 10,
    health: 30,
    effects: [] as string[],
  },
  conditions: [rules.monsterHealthStatus, rules.stopOnCollisionWithPlayer],
  type: ObjectTypes.Monster,
  rules: [
    rules.setDirectionToPlayer,
    rules.monsterBoss2Logic,
    rules.rotateByDirection,
    rules.dynamicZIndex,
    rules.resetSpeed,
    rules.resetEffects,
    rules.resetRangeCooldown,
  ],
};

export const heart: GameObjectConfig = {
  zIndex: 3,
  render: objectRender,
  collisions: true,
  size: [25, 25],
  sprite: ['pumpkin', [0, 0], [32, 32], 5, [0, 1]],
  conditions: [rules.triggerOnPlayerCollision],
  rules: [rules.dynamicZIndex],
  type: ObjectTypes.PowerUp,
  parameters: {
    power: 10,
  },
};

export const powerup: GameObjectConfig = {
  render: spriteRender,
  zIndex: 2,
  size: [25, 25],
  collisions: true,
  sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
  conditions: [rules.triggerOnPlayerCollisionPowerUp],
  type: ObjectTypes.PowerUp,
  parameters: {
    exp: 250,
  },
};
