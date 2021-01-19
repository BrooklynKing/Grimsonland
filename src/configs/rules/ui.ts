import format from 'string-template';

import { GameObject } from '../../engine/core/object';
import { IGameRuleConfig } from './types';

export const countMonsterKilled: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const template = obj.parameters.template;

    obj.parameters.text = format(template, {
      kills: obj.layer.state.parameters.monstersKilled || 0,
    });
  },
};

export const timer: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const template = obj.parameters.template;

    obj.parameters.text = format(template, {
      time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2),
    });
  },
};

export const health: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const template = obj.parameters.template;

    obj.parameters.text = format(template, {
      health: obj.layer.getObjectsByType('player')[0].parameters.health,
    });
  },
};

export const level: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const template = obj.parameters.template;
    const player = obj.layer.getObjectsByType('player')[0];

    obj.parameters.text = format(template, {
      level: player.parameters.level,
      exp: player.parameters.exp,
      levelExp: player.parameters.levelTable[player.parameters.level],
    });
  },
};

export const bestTime: IGameRuleConfig = {
  init: function(obj: GameObject) {
    const template = obj.parameters.template;

    obj.parameters.text = format(template, {
      time: (obj.layer.state.parameters.bestTime / 60).toFixed(2),
    });
  },
};

export const bestScore: IGameRuleConfig = {
  init: function(obj: GameObject) {
    const template = obj.parameters.template;

    obj.parameters.text = format(template, {
      score: obj.layer.state.parameters.bestScore,
    });
  },
};
