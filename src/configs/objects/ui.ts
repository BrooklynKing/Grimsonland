import * as rules from '../rules';
import { GameObjectConfig } from '../../engine/core/object';
import { ObjectTypes } from './types';

export const cursor: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  render: 'ui',
  pos: [400, 350],
  sprite: ['cursor', [0, 0], [30, 30]],
  rules: [rules.bindPositionToMouse],
};

export const counter: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 13],
  render: 'text',
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    template: 'SCORE: {kills}',
    size: 14,
  },
  rules: [rules.countMonsterKilled],
};

export const leftOnWaveLabel: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 100],
  render: 'text',
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    template: 'LEFT ON THIS WAVE: {count}',
    size: 14,
  },
};

export const level: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [35, 45],
  render: 'expBar',
  parameters: {
    weight: 'bold',
    color: '#EFEFEF',
    template: 'LEVEL: {level}',
    size: 14,
  },
  rules: [rules.level],
};

export const timer: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 23],
  render: 'text',
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    template: 'TIMER: {time}',
    size: 14,
  },
  rules: [rules.timer],
};

export const bestTime: GameObjectConfig = {
  type: ObjectTypes.UI,
  pos: [5, 370],
  zIndex: 3000,
  render: 'text',
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
    template: 'BEST TIME: {time}',
  },
  rules: [rules.bestTime],
};

export const bestScore: GameObjectConfig = {
  type: ObjectTypes.UI,
  pos: [5, 380],
  zIndex: 3000,
  render: 'text',
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
    template: 'BEST SCORE: {score}',
  },
  rules: [rules.bestScore],
};
