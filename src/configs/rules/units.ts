import Phaser from 'phaser';

import { moveWithSpeed } from './utils';
import gameConfigs from '../index';

import { GameObject } from '../../engine/core/object';

import { IGameRuleConfig } from './types';

export const playerDeath: IGameRuleConfig = {
  update: function(obj: GameObject) {
    if (obj.parameters.health <= 0) {
      obj.layer.state.stopBattle();
    }
  },
};

export const damageOnPlayerCollision: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const { objects } = obj.parameters.collisions;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == 'player') {
        objects[i].parameters.health =
          objects[i].parameters.health - obj.parameters.power;
        break;
      }
    }
  },
};

export const destroyOnPlayerCollision: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const { objects } = obj.parameters.collisions;


    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == 'player') {
        const explosionConfig = gameConfigs.getConfig('explosion');
        explosionConfig.pos = obj.pos.clone();

        obj.layer.addObject(explosionConfig);

        obj.layer.removeObjectOnNextTick(obj.id);
        break;
      }
    }
  },
};

export const triggerOnPlayerCollision: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const { objects } = obj.parameters.collisions;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == 'player') {
        if (
          objects[i].parameters.health < objects[i].defaultParameters.health
        ) {
          if (
            objects[i].parameters.health + obj.parameters.power <=
            objects[i].defaultParameters.health
          ) {
            objects[i].parameters.health =
              objects[i].parameters.health + obj.parameters.power;
          } else {
            objects[i].parameters.health = objects[i].defaultParameters.health;
          }
        }

        obj.layer.removeObjectOnNextTick(obj.id);
        break;
      }
    }
  },
};

export const meleeAttack: IGameRuleConfig = {
  update: function(obj: GameObject) {
    if (!obj.parameters.meleeCooldown) {
      const { objects } = obj.parameters.collisions;

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          objects[i].parameters.health =
            objects[i].parameters.health - obj.parameters.power;

          const blood = gameConfigs.getConfig('bloodSpray');
          blood.pos = objects[i].pos.clone();
          blood.pos.x += 2;
          blood.pos.y += -10;
          obj.layer.addObject(blood);

          obj.parameters.meleeCooldown = obj.parameters.cooldown;
          break;
        }
      }
    }
  },
};

export const spellExplosion: IGameRuleConfig = {
  update: function(obj: GameObject) {
    if (!obj.parameters.exploded) {
      const { objects } = obj.parameters.collisions;

      for (let i = 0, l = objects.length; i < l; i++) {
        if (objects[i].parameters.health && objects[i].type !== 'player') {
          objects[i].parameters.health =
            objects[i].parameters.health - obj.parameters.power;
          break;
        }
      }

      obj.parameters.exploded = true;
    }
  },
}

export const monsterExplosion: IGameRuleConfig = {
  update: function(obj: GameObject) {
    if (!obj.parameters.exploded) {
      const { objects } = obj.parameters.collisions;

      for (let i = 0, l = objects.length; i < l; i++) {
        if (objects[i].parameters.health) {
          objects[i].parameters.health =
            objects[i].parameters.health - obj.parameters.power;
          break;
        }
      }

      obj.parameters.exploded = true;
    }
  },
};

export const monsterExplosionCondition: IGameRuleConfig = {
  update: function(obj: GameObject) {
    function generateExplosions() {
      const pos = obj.pos.clone();
      let explosionConfig;
      const power = obj.parameters.power;
      let expl;

      obj.layer.removeObjectOnNextTick(obj.id);

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x - obj.size[0],
        pos.y - obj.size[1],
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x + obj.size[0],
        pos.y - obj.size[1],
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x - obj.size[0],
        pos.y + obj.size[1],
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x + obj.size[0],
        pos.y + obj.size[1],
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x - (3 / 2) * obj.size[0],
        pos.y,
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(
        pos.x + (3 / 2) * obj.size[0],
        pos.y,
      );
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;
    }

    if (obj.parameters.health <= 0) {
      generateExplosions();
    } else {
      const { objects } = obj.parameters.collisions;

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          generateExplosions();

          break;
        }
      }
    }
  },
};

export const stopOnCollisionWithPlayer: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const { objects } = obj.parameters.collisions;

    for (let i = 0, l = objects.length; i < l; i++) {
      if (objects[i].type == 'player') {
        obj.parameters.speed = 0;
        break;
      }
    }
  },
};

export const resetSpeed: IGameRuleConfig = {
  update: function(obj: GameObject) {
    obj.parameters.speed = obj.defaultParameters.speed;
  },
};

export const resetEffects: IGameRuleConfig = {
  update: function(obj: GameObject) {
    obj.parameters.effects.splice(0);
  },
};

export const moveToDirection: IGameRuleConfig = {
  update: function(obj: GameObject, dt: number) {
    const direction = obj.parameters.direction;

    if (direction) {
      obj.setPosition(
        moveWithSpeed(obj.pos, direction, obj.parameters.speed * dt),
      );
    }
  },
};

export const playerLevelUp: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const levelExp = obj.parameters.levelTable[obj.parameters.level];

    if (obj.parameters.levelTable[obj.parameters.level]) {
      if (
        obj.parameters.exp > obj.parameters.levelTable[obj.parameters.level]
      ) {
        obj.parameters.exp = obj.parameters.exp - levelExp;
        obj.parameters.level = obj.parameters.level + 1;
        obj.parameters.spellPower = obj.parameters.spellPower + 1;
      }
    } else {
      obj.parameters.level = 'MAX';
    }
  },
};

export const monsterHealthStatus: IGameRuleConfig = {
  update: function(obj: GameObject) {
    if (obj.parameters.health <= 0) {
      obj.layer.removeObjectOnNextTick(obj.id);

      const explosionConfig = gameConfigs.getConfig('explosion');
      explosionConfig.pos = obj.pos.clone();

      obj.layer.addObject(explosionConfig);

      const blood = gameConfigs.getConfig('blood');
      blood.pos = obj.pos.clone();
      obj.layer.addObject(blood);

      if (!obj.layer.state.parameters.monstersKilled) {
        obj.layer.state.parameters.monstersKilled = 0;
      }

      const monsterController = obj.layer.getObjectsByType(
        'controller',
      )[0];
      monsterController.parameters.monsterKilled =
        monsterController.parameters.monsterKilled + 1;

      obj.layer.state.parameters.monstersKilled++;

      const player = obj.layer.getObjectsByType('player')[0];
      player.parameters.exp = player.parameters.exp + obj.parameters.exp;
    }
  },
};

export const resetRangeCooldown: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const fireCooldown = obj.parameters.fireCooldown;

    fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
  },
};

export const resetMeleeCooldown: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const meleeCooldown = obj.parameters.meleeCooldown;

    meleeCooldown && (obj.parameters.meleeCooldown = meleeCooldown - 1);
  },
};

export const monsterBossLogic: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const player = obj.layer.getObjectsByType('player')[0];

    if (!obj.parameters.fireCooldown) {
      var bulletConfig = gameConfigs.getConfig('mbullet');
      const direction = Phaser.Point.subtract(player.pos, obj.pos);

      bulletConfig.pos = obj.pos.clone();
      const bull = obj.layer.addObject(bulletConfig);
      bull.parameters.direction = direction;

      bull.sprite.setDegree(obj.pos.angle(player.pos));

      obj.parameters.fireCooldown = obj.parameters.cooldown;
    }
  },
};

export const monsterBoss2Logic: IGameRuleConfig = {
  update: function(obj: GameObject, dt: number) {
    const player = obj.layer.getObjectsByType('player')[0];
    const directionToPlayer = obj.parameters.direction;

    if (Phaser.Point.distance(obj.pos, player.pos) < obj.parameters.fireRange) {
      if (!obj.parameters.fireCooldown) {
        var bulletConfig = gameConfigs.getConfig('mbullet2');
        bulletConfig.pos = obj.pos.clone();

        const bull = obj.layer.addObject(bulletConfig);

        bull.parameters.direction = directionToPlayer;

        obj.parameters.fireCooldown = obj.parameters.cooldown;
      }
    } else {
      obj.setPosition(
        moveWithSpeed(obj.pos, directionToPlayer, obj.parameters.speed * dt),
      );
    }
  },
};

export const monsterBoss2Bullet: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const cooldown = obj.parameters.cooldown;
    const { objects } = obj.parameters.collisions;

    if (cooldown == 0) {
      obj.layer.removeObjectOnNextTick(obj.id);

      createExplosion();
      return;
    } else {
      obj.parameters.cooldown = cooldown - 1;
    }

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == 'player') {
        obj.layer.removeObjectOnNextTick(obj.id);

        createExplosion();
        break;
      }
    }

    function createExplosion() {
      const pos = obj.pos.clone();
      let explosionConfig;
      const power = obj.parameters.power;
      let expl;

      explosionConfig = gameConfigs.getConfig('monsterExplosion');
      explosionConfig.pos = new Phaser.Point(pos.x, pos.y);
      expl = obj.layer.addObject(explosionConfig);
      expl.parameters.power = power;
    }
  },
};

export const moveWithKeyboard: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const pos = obj.pos.clone();

    if (obj.layer.game.input.keyboard.isDown(68)) {
      pos.x = obj.pos.x + 1;
    }
    if (obj.layer.game.input.keyboard.isDown(65)) {
      pos.x = obj.pos.x - 1;
    }
    if (obj.layer.game.input.keyboard.isDown(83)) {
      pos.y = obj.pos.y + 1;
    }
    if (obj.layer.game.input.keyboard.isDown(87)) {
      pos.y = obj.pos.y - 1;
    }

    if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
      obj.parameters.direction = null;
    } else {
      obj.parameters.direction = Phaser.Point.subtract(pos, obj.pos);
    }
  },
};

export const selectSpellWithKeyboard: IGameRuleConfig = {
  update: function(obj: GameObject) {
    obj.layer.game.input.keyboard.isDown(49) &&
      (obj.parameters.currentSpell = 'fireball');
    obj.layer.game.input.keyboard.isDown(50) &&
      (obj.parameters.currentSpell = 'hellfire');
    obj.layer.game.input.keyboard.isDown(51) &&
      (obj.parameters.currentSpell = 'frostShard');
    obj.layer.game.input.keyboard.isDown(52) &&
      (obj.parameters.currentSpell = 'teleport');
  },
};

export const triggerOnPlayerCollisionPowerUp: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const { objects } = obj.parameters.collisions;

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].type == 'player') {
        //objects[i].parameters.spellPower', objects[i].parameters.spellPower') + obj.parameters.power'));
        objects[i].parameters.exp =
          objects[i].parameters.exp + obj.parameters.exp;
        obj.layer.removeObjectOnNextTick(obj.id);
        break;
      }
    }
  },
};

export const summonOnCooldown: IGameRuleConfig = {
  update: function(obj: GameObject) {
    const cooldown = obj.parameters.cooldown;

    function getProperMonster() {
      let random = Math.random() * 100;
      let config;

      if (random <= obj.parameters.chanceOfBoss) {
        config = gameConfigs.getConfig('monsterBoss');
      } else {
        random -= obj.parameters.chanceOfBoss;
      }

      if (!config && random <= obj.parameters.chanceOfBoss2) {
        config = gameConfigs.getConfig('monsterBoss2');
      } else {
        random -= obj.parameters.chanceOfBoss2;
      }

      if (!config && random <= obj.parameters.chanceOfBoomer) {
        config = gameConfigs.getConfig('monsterBoomer');
      } else {
        random -= obj.parameters.monsterBoomer;
      }

      if (!config) {
        config = gameConfigs.getConfig('monster');
      }

      return config;
    }
    if (cooldown == 0) {
      const monsterConfig = getProperMonster();
      const player = obj.layer.getObjectsByType('player')[0];

      monsterConfig.pos = obj.pos.clone();

      const monster = obj.layer.addObject(monsterConfig);

      if (player.parameters.level > 1) {
        monster.parameters.health =
          monster.parameters.health * 0.75 * player.parameters.level;
      }

      obj.layer.removeObjectOnNextTick(obj.id);
    } else {
      obj.parameters.cooldown = cooldown - 1;
    }
  },
};
