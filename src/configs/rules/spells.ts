import Phaser, { Point } from 'phaser';

import { moveWithSpeed } from './../../engine/utils';
import gameConfigs from '../index';
import { GameObject } from '../../engine/core/object';

import { IGameRuleConfig } from './types';

const config: { [key: string]: IGameRuleConfig } = {
  fireball: {
    update: function(obj: GameObject) {
      const player = obj.layer.getObjectsByType('player')[0];
      const fireCooldown = obj.parameters.fireCooldown;
      const spellPower = player.parameters.spellPower;

      function createBullet(direction: Point, destination: Point) {
        const bulletConfig = gameConfigs.getConfig('bullet');
        bulletConfig.pos = player.pos.clone();

        const bull = obj.layer.addObject(bulletConfig);
        bull.parameters.direction = direction;
        bull.parameters.power = bull.parameters.power + 5 * (spellPower - 1);
        bull.sprite.setDegree(player.pos.angle(destination));
      }

      if (player.parameters.currentSpell == 'fireball') {
        if (
          obj.layer.game.input.mousePointer.isDown ||
          obj.layer.game.input.keyboard.isDown(32)
        ) {
          if (!fireCooldown) {
            const destination = new Phaser.Point(
              obj.layer.game.input.mousePointer.x,
              obj.layer.game.input.mousePointer.y,
            );
            let startDegree = 10 * (spellPower - 1);

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            for (let i = 0; i < spellPower; i++) {
              let movedPoint = destination
                .clone()
                .rotate(player.pos.x, player.pos.y, startDegree, true);

              createBullet(
                Phaser.Point.subtract(movedPoint, player.pos),
                movedPoint.clone(),
              );

              startDegree -= 20;
            }
            obj.parameters.cooldown = obj.defaultParameters.cooldown;
            obj.parameters.fireCooldown = obj.parameters.cooldown;
          }
        }
      }
      fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
  },
  hellfire: {
    update: function(obj: GameObject) {
      const player = obj.layer.getObjectsByType('player')[0];
      const fireCooldown = obj.parameters.fireCooldown;

      function createTube(pos: Phaser.Point) {
        const spellPower = player.parameters.spellPower;
        const tubeConfig = gameConfigs.getConfig('hellfireTube');
        tubeConfig.pos = pos;

        const tube = obj.layer.addObject(tubeConfig);
        tube.parameters.power = tube.parameters.power + 5 * (spellPower - 1);
      }

      if (player.parameters.currentSpell == 'hellfire') {
        if (
          obj.layer.game.input.mousePointer.isDown ||
          obj.layer.game.input.keyboard.isDown(32)
        ) {
          if (!fireCooldown) {
            const destination = new Phaser.Point(0, 1),
              point1 = moveWithSpeed(player.pos, destination, 100);

            for (let i = -10; i < 10; i++) {
              let movedPoint = point1
                .clone()
                .rotate(player.pos.x, player.pos.y, 18 * i, true);

              createTube(movedPoint);
            }

            obj.parameters.cooldown = obj.defaultParameters.cooldown;
            obj.parameters.fireCooldown = obj.parameters.cooldown;
          }
        }
      }
      fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
  },
  slowEnemies: {
    update: function(obj: GameObject) {
      const objects = obj.parameters.collisions;

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'monster') {
          const speed = objects[i].parameters.speed;
          const power = obj.parameters.power;
          const effects = objects[i].parameters.effects || [];

          if (speed < power) {
            objects[i].parameters.speed = 0;
          } else {
            objects[i].parameters.speed = speed - power;
          }

          if (effects.indexOf('frozen') == -1) {
            effects.push('frozen');
          }
        }
      }
    },
  },
  teleport: {
    update: function(obj: GameObject) {
      const player = obj.layer.getObjectsByType('player')[0];
      const fireCooldown = obj.parameters.fireCooldown;

      if (player.parameters.currentSpell == 'teleport') {
        if (
          obj.layer.game.input.mousePointer.isDown ||
          obj.layer.game.input.keyboard.isDown(32)
        ) {
          if (!fireCooldown) {
            const mouse = new Phaser.Point(
              obj.layer.game.input.mousePointer.x,
              obj.layer.game.input.mousePointer.y,
            );

            mouse.x -= obj.layer.translate.x;
            mouse.y -= obj.layer.translate.y;

            const direction = Phaser.Point.subtract(mouse, player.pos);
            const spellPower = player.parameters.spellPower;
            const destination = moveWithSpeed(
              player.pos,
              direction,
              obj.parameters.power,
            );
            const cooldown: number =
              obj.defaultParameters.cooldown - 30 * (spellPower - 1);

            let teleportGate;

            teleportGate = gameConfigs.getConfig('teleportGate');
            teleportGate.pos = player.pos.clone();

            obj.layer.addObject(teleportGate);

            teleportGate = gameConfigs.getConfig('teleportGate');
            teleportGate.pos = destination.clone();

            obj.layer.addObject(teleportGate);

            player.setPosition(destination);

            obj.parameters.cooldown = cooldown > 50 ? cooldown : 50;
            obj.parameters.fireCooldown = obj.parameters.cooldown;
          }
        }
      }
      fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
  },
  frostShard: {
    update: function(obj: GameObject) {
      const player = obj.layer.getObjectsByType('player')[0];
      const fireCooldown = obj.parameters.fireCooldown;

      if (player.parameters.currentSpell == 'frostShard') {
        if (
          obj.layer.game.input.mousePointer.isDown ||
          obj.layer.game.input.keyboard.isDown(32)
        ) {
          if (!fireCooldown) {
            const frostShard = gameConfigs.getConfig('frostShard');
            const mousePosition = new Phaser.Point(
              obj.layer.game.input.mousePointer.x,
              obj.layer.game.input.mousePointer.y,
            );
            const spellPower = player.parameters.spellPower;
            const destination = mousePosition.clone();

            destination.x -= obj.layer.translate.x;
            destination.y -= obj.layer.translate.y;

            frostShard.pos = destination.clone();

            let spellPowerBoost = 0;

            for (let i = 1; i < spellPower; i++) {
              spellPowerBoost += 50;
            }

            const fs = obj.layer.addObject(frostShard);

            fs.parameters.cooldown = fs.parameters.cooldown + spellPowerBoost;

            obj.parameters.fireCooldown = obj.parameters.cooldown;
          }
        }
      }
      fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
  },
  bulletMonsterCollision: {
    update: function(obj: GameObject) {
      const objects = obj.parameters.collisions;

      for (let i = 0, l = objects.length; i < l; i++) {
        if (objects[i].type == 'monster') {
          objects[i].parameters.health =
            objects[i].parameters.health - obj.parameters.power;

          const blood = gameConfigs.getConfig('bloodSpray');

          blood.pos = objects[i].pos.clone();
          blood.pos.x += 2;
          blood.pos.y += -10;
          obj.layer.addObject(blood);

          obj.layer.removeObjectOnNextTick(obj.id);

          break;
        }
      }
    },
  },
  hellTubeMonsterCollision: {
    update: function(obj: GameObject) {
      const objects = obj.parameters.collisions;

      for (let i = 0, l = objects.length; i < l; i++) {
        if (objects[i].type == 'monster') {
          objects[i].parameters.health =
            objects[i].parameters.health - obj.parameters.power;

          const blood = gameConfigs.getConfig('bloodSpray');

          blood.pos = objects[i].pos.clone();
          blood.pos.x += 2;
          blood.pos.y += -10;

          obj.layer.addObject(blood);

          break;
        }
      }
    },
  },
};

export default config;
