import Phaser from 'phaser';
import format from 'string-template';

import gameConfigs from '../index';
import { GameObject } from '../../engine/core/object';

import { IGameRuleConfig } from './types';

const monsterCount = [
  10,
  25,
  50,
  75,
  100,
  150,
  200,
  500,
  1000,
  2500,
  5000,
  10000,
];
const monsterCooldown = 10;
export const monsterController: IGameRuleConfig = {
  init: function(obj: GameObject) {
    obj.parameters.currentWave = 1;
    obj.parameters.monsterOnWave = monsterCount[obj.parameters.currentWave - 1];
    obj.parameters.monsterKilled = 0;
    obj.parameters.monsterSpawned = 0;

    this.leftOnWave = obj.layer.addObject(
      gameConfigs.getConfig('leftOnWaveLabel'),
    );
  },
  update: function(obj: GameObject) {
    const createSpawn = () => {
      const rect = new Phaser.Rectangle(
        100 - obj.layer.translate.x,
        100 - obj.layer.translate.y,
        800 - obj.layer.translate.x,
        550 - obj.layer.translate.y,
      );
      const summonGate = gameConfigs.getConfig('summonGate');

      summonGate.pos = new Phaser.Point(rect.randomX, rect.randomY);
      summonGate.pos.x = Math.min(1100, Math.max(50, summonGate.pos.x));
      summonGate.pos.y = Math.min(900, Math.max(50, summonGate.pos.y));
      obj.layer.addObject(summonGate);
    }

    if (obj.parameters.monsterSpawned < obj.parameters.monsterOnWave) {
      if (!obj.parameters.currentMonsterCooldown) {
        createSpawn();

        obj.parameters.monsterSpawned = obj.parameters.monsterSpawned + 1;
        obj.parameters.currentMonsterCooldown = monsterCooldown;
      } else {
        obj.parameters.currentMonsterCooldown &&
          obj.parameters.currentMonsterCooldown--;
      }
    }
    if (
      !obj.layer.getObjectsByType('monster').length &&
      obj.parameters.monsterKilled < obj.parameters.monsterSpawned
    ) {
      obj.parameters.monserSpawned = obj.parameters.monsterKilled;
    } else {
      if (obj.parameters.monsterKilled >= obj.parameters.monsterOnWave) {
        obj.parameters.currentWave = obj.parameters.currentWave + 1;
        obj.parameters.monsterSpawned = 0;
        obj.parameters.monsterOnWave =
          monsterCount[obj.parameters.currentWave - 1];
        obj.parameters.monsterKilled = 0;
      }
    }

    this.leftOnWave.parameters.text = format(
      this.leftOnWave.parameters.template,
      {
        count:
          obj.parameters.monsterKilled + '/' + obj.parameters.monsterOnWave,
      },
    );
  },
};
