import { ObjectTypes } from './types';

export const cursor = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  render: 'ui',
  pos: [400, 350],
  sprite: ['cursor', [0, 0], [30, 30]],
  rules: ['bindPositionToMouse'],
};
export const counter = {
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
  rules: ['countMonsterKilled'],
};
export const leftOnWaveLabel = {
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
export const level = {
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
  rules: ['level'],
};
export const timer = {
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
  rules: ['timer'],
};
export const bestTime = {
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
  rules: ['bestTime'],
};
export const bestScore = {
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
  rules: ['bestScore'],
};
