import { ObjectTypes } from './types';

export const monsterController = {
  render: false,
  collisions: false,
  type: ObjectTypes.Controller,
  rules: ['monsterController'],
  parameters: {
    monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
    monsterCooldown: 7,
  },
};
