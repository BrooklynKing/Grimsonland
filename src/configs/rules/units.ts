import utils from './../../engine/utils';
import gameConfigs from '../index';

const config: any = {
  playerDeath: {
    update: function() {
      const obj = this.context;

      if (obj.getParameter('health') <= 0) {
        obj.layer.state.stopBattle();
      }
    },
  },
  damageOnPlayerCollision: {
    update: function() {
      const obj = this.context;
      const objects = obj.getParameter('collisions');

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          objects[i].setParameter(
            'health',
            objects[i].getParameter('health') - obj.getParameter('power'),
          );
          break;
        }
      }
    },
  },
  destroyOnPlayerCollision: {
    update: function() {
      const obj = this.context;
      const objects = obj.getParameter('collisions');

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          const explosionConfig = gameConfigs.getConfig('explosion');
          explosionConfig.pos = obj.pos.clone();

          obj.layer.addObject(explosionConfig);

          obj._removeInNextTick = true;
          break;
        }
      }
    },
  },
  triggerOnPlayerCollision: {
    update: function() {
      const obj = this.context;
      const objects = obj.getParameter('collisions');

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          if (
            objects[i].getParameter('health') <
            objects[i].getDefaultParameter('health')
          ) {
            if (
              objects[i].getParameter('health') + obj.getParameter('power') <=
              objects[i].getDefaultParameter('health')
            ) {
              objects[i].setParameter(
                'health',
                objects[i].getParameter('health') + obj.getParameter('power'),
              );
            } else {
              objects[i].setParameter(
                'health',
                objects[i].getDefaultParameter('health'),
              );
            }
          }

          obj._removeInNextTick = true;
          break;
        }
      }
    },
  },
  meleeAttack: {
    update: function() {
      const obj = this.context;

      if (!obj.getParameter('meleeCooldown')) {
        const objects = obj.getParameter('collisions');
        for (let i = 0; i < objects.length; i++) {
          if (objects[i].type == 'player') {
            objects[i].setParameter(
              'health',
              objects[i].getParameter('health') - obj.getParameter('power'),
            );

            const blood = gameConfigs.getConfig('bloodSpray');
            blood.pos = objects[i].pos.clone();
            blood.pos.x += 2;
            blood.pos.y += -10;
            obj.layer.addObject(blood);

            obj.setParameter('meleeCooldown', obj.getParameter('cooldown'));
            break;
          }
        }
      }
    },
  },
  monsterExplosion: {
    update: function() {
      const obj = this.context;

      if (!obj.getParameter('exploded')) {
        const objects = obj.getParameter('collisions');
        for (let i = 0, l = objects.length; i < l; i++) {
          if (objects[i].getParameter('health')) {
            objects[i].setParameter(
              'health',
              objects[i].getParameter('health') - obj.getParameter('power'),
            );
            break;
          }
        }

        obj.setParameter('exploded', true);
      }
    },
  },
  monsterExplosionCondition: {
    update: function() {
      const obj = this.context;

      function generateExplosions() {
        const pos = obj.pos.clone();
        let explosionConfig;
        const power = obj.getParameter('power');
        let expl;

        obj._removeInNextTick = true;

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x - obj.size[0],
          pos.y - obj.size[1],
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x + obj.size[0],
          pos.y - obj.size[1],
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x - obj.size[0],
          pos.y + obj.size[1],
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x + obj.size[0],
          pos.y + obj.size[1],
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x - (3 / 2) * obj.size[0],
          pos.y,
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(
          pos.x + (3 / 2) * obj.size[0],
          pos.y,
        );
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);
      }

      if (obj.getParameter('health') <= 0) {
        generateExplosions();
      } else {
        const objects = obj.getParameter('collisions');
        for (let i = 0; i < objects.length; i++) {
          if (objects[i].type == 'player') {
            generateExplosions();

            break;
          }
        }
      }
    },
  },
  stopOnCollisionWithPlayer: {
    update: function() {
      const obj = this.context;
      const objects = obj.getParameter('collisions');

      for (let i = 0, l = objects.length; i < l; i++) {
        if (objects[i].type == 'player') {
          obj.setParameter('speed', 0);
          break;
        }
      }
    },
  },
  resetSpeed: {
    update: function() {
      const obj = this.context;

      obj.setParameter('speed', obj.getDefaultParameter('speed'));
    },
  },
  resetEffects: {
    update: function() {
      const obj = this.context;

      obj.getParameter('effects').splice(0);
    },
  },
  moveToDirection: {
    update: function(dt: number) {
      const obj = this.context;
      const direction = obj.getParameter('direction');

      if (direction) {
        obj.setPosition(
          utils.moveWithSpeed(
            obj.pos,
            direction,
            obj.getParameter('speed') * dt,
          ),
        );
      }
    },
  },
  playerLevelUp: {
    update: function() {
      const obj = this.context;
      const levelExp = obj.getParameter('levelTable')[
        obj.getParameter('level')
      ];

      if (obj.getParameter('levelTable')[obj.getParameter('level')]) {
        if (
          obj.getParameter('exp') >
          obj.getParameter('levelTable')[obj.getParameter('level')]
        ) {
          obj.setParameter('exp', obj.getParameter('exp') - levelExp);
          obj.setParameter('level', obj.getParameter('level') + 1);
          obj.setParameter('spellPower', obj.getParameter('spellPower') + 1);
        }
      } else {
        obj.setParameter('level', 'MAX');
      }
    },
  },
  monsterHealthStatus: {
    update: function() {
      const obj = this.context;

      if (obj.getParameter('health') <= 0) {
        obj._removeInNextTick = true;

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
          'monsterController',
        )[0];
        monsterController.setParameter(
          'monsterKilled',
          monsterController.getParameter('monsterKilled') + 1,
        );

        obj.layer.state.parameters.monstersKilled++;

        const player = obj.layer.getObjectsByType('player')[0];
        player.setParameter(
          'exp',
          player.getParameter('exp') + obj.getParameter('exp'),
        );
      }
    },
  },
  resetRangeCooldown: {
    update: function() {
      const obj = this.context;
      const fireCooldown = obj.getParameter('fireCooldown');

      fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
    },
  },
  resetMeleeCooldown: {
    update: function() {
      const obj = this.context;
      const meleeCooldown = obj.getParameter('meleeCooldown');

      meleeCooldown && obj.setParameter('meleeCooldown', meleeCooldown - 1);
    },
  },
  monsterBossLogic: {
    update: function() {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];

      if (!obj.getParameter('fireCooldown')) {
        var bulletConfig = gameConfigs.getConfig('mbullet');
        const direction = Phaser.Point.subtract(player.pos, obj.pos);

        bulletConfig.pos = obj.pos.clone();
        const bull = obj.layer.addObject(bulletConfig);
        bull.setParameter('direction', direction);

        bull.sprite.setDegree(obj.pos.angle(player.pos));

        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
      }
    },
  },
  monsterBoss2Logic: {
    update: function(dt: number) {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];
      const directionToPlayer = obj.getParameter('direction');

      if (
        Phaser.Point.distance(obj.pos, player.pos) <
        obj.getParameter('fireRange')
      ) {
        if (!obj.getParameter('fireCooldown')) {
          var bulletConfig = gameConfigs.getConfig('mbullet2');
          bulletConfig.pos = obj.pos.clone();

          const bull = obj.layer.addObject(bulletConfig);

          bull.setParameter('direction', directionToPlayer);

          obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
        }
      } else {
        obj.setPosition(
          utils.moveWithSpeed(
            obj.pos,
            directionToPlayer,
            obj.getParameter('speed') * dt,
          ),
        );
      }
    },
  },
  monsterBoss2Bullet: {
    update: function() {
      const obj = this.context;
      const cooldown = obj.getParameter('cooldown');
      const objects = obj.getParameter('collisions');

      if (cooldown == 0) {
        obj._removeInNextTick = true;

        createExplosion();
        return;
      } else {
        obj.setParameter('cooldown', cooldown - 1);
      }

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          obj._removeInNextTick = true;

          createExplosion();
          break;
        }
      }

      function createExplosion() {
        const pos = obj.pos.clone();
        let explosionConfig;
        const power = obj.getParameter('power');
        let expl;

        explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(pos.x, pos.y);
        expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', power);
      }
    },
  },
  moveWithKeyboard: {
    update: function() {
      const obj = this.context;
      const pos = obj.pos.clone();
      const direction: any = {};

      direction.left = obj.layer.game.input.keyboard.isDown(65);
      direction.up = obj.layer.game.input.keyboard.isDown(87);
      direction.down = obj.layer.game.input.keyboard.isDown(83);
      direction.right = obj.layer.game.input.keyboard.isDown(68);

      if (direction.right) {
        pos.x = obj.pos.x + 1;
      }
      if (direction.left) {
        pos.x = obj.pos.x - 1;
      }
      if (direction.down) {
        pos.y = obj.pos.y + 1;
      }
      if (direction.up) {
        pos.y = obj.pos.y - 1;
      }

      if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
        obj.setParameter('direction', null);
      } else {
        obj.setParameter('direction', Phaser.Point.subtract(pos, obj.pos));
      }
    },
  },
  selectSpellWithKeyboard: {
    update: function() {
      const obj = this.context;

      obj.layer.game.input.keyboard.isDown(49) &&
        obj.setParameter('currentSpell', 'fireball');
      obj.layer.game.input.keyboard.isDown(50) &&
        obj.setParameter('currentSpell', 'hellfire');
      obj.layer.game.input.keyboard.isDown(51) &&
        obj.setParameter('currentSpell', 'frostShard');
      obj.layer.game.input.keyboard.isDown(52) &&
        obj.setParameter('currentSpell', 'teleport');
    },
  },
  triggerOnPlayerCollisionPowerUp: {
    update: function() {
      const obj = this.context;
      const objects = obj.getParameter('collisions');

      for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == 'player') {
          //objects[i].setParameter('spellPower', objects[i].getParameter('spellPower') + obj.getParameter('power'));
          objects[i].setParameter(
            'exp',
            objects[i].getParameter('exp') + obj.getParameter('exp'),
          );
          obj._removeInNextTick = true;
          break;
        }
      }
    },
  },
  summonOnCooldown: {
    update: function() {
      const obj = this.context;
      const cooldown = obj.getParameter('cooldown');

      function getProperMonster() {
        let random = Math.random() * 100;
        let config;

        if (random <= obj.getParameter('chanceOfBoss')) {
          config = gameConfigs.getConfig('monsterBoss');
        } else {
          random -= obj.getParameter('chanceOfBoss');
        }

        if (!config && random <= obj.getParameter('chanceOfBoss2')) {
          config = gameConfigs.getConfig('monsterBoss2');
        } else {
          random -= obj.getParameter('chanceOfBoss2');
        }

        if (!config && random <= obj.getParameter('chanceOfBoomer')) {
          config = gameConfigs.getConfig('monsterBoomer');
        } else {
          random -= obj.getParameter('monsterBoomer');
        }

        if (!config) {
          config = gameConfigs.getConfig('monster');
        }

        return config;
      }
      if (cooldown == 0) {
        let monsterConfig = getProperMonster();
        let player = obj.layer.getObjectsByType('player')[0];

        monsterConfig.pos = obj.pos.clone();

        const monster = obj.layer.addObject(monsterConfig);

        if (player.getParameter('level') > 1) {
          monster.setParameter(
            'health',
            monster.getParameter('health') *
              0.75 *
              player.getParameter('level'),
          );
        }

        obj._removeInNextTick = true;
      } else {
        obj.setParameter('cooldown', cooldown - 1);
      }
    },
  },
};

export default config;
