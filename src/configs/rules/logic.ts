import format from 'string-template';

import gameConfigs from '../index';

const config: any = {
  monsterController: {
    init: function() {
      const obj = this.context;

      obj.setParameter('currentWave', 1);
      obj.setParameter(
        'monsterOnWave',
        this.parameters.monsterCount[obj.getParameter('currentWave') - 1],
      );
      obj.setParameter('monsterKilled', 0);
      obj.setParameter('monsterSpawned', 0);

      this.leftOnWave = this.context.layer.addObject(
        gameConfigs.getConfig('leftOnWaveLabel'),
      );
    },
    update: function() {
      const obj = this.context;

      function createSpawn() {
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

      if (
        obj.getParameter('monsterSpawned') < obj.getParameter('monsterOnWave')
      ) {
        if (!this.parameters.currentMonsterCooldown) {
          createSpawn();

          obj.setParameter(
            'monsterSpawned',
            obj.getParameter('monsterSpawned') + 1,
          );
          this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
        } else {
          this.parameters.currentMonsterCooldown &&
            this.parameters.currentMonsterCooldown--;
        }
      } else {
        if (
          obj.getParameter('monsterKilled') >= obj.getParameter('monsterOnWave')
        ) {
          obj.setParameter('currentWave', obj.getParameter('currentWave') + 1);
          obj.setParameter('monsterSpawned', 0);
          obj.setParameter(
            'monsterOnWave',
            this.parameters.monsterCount[obj.getParameter('currentWave') - 1],
          );
          obj.setParameter('monsterKilled', 0);
        }
      }

      this.leftOnWave.setParameter(
        'text',
        format(this.leftOnWave.getParameter('template'), {
          count:
            obj.getParameter('monsterKilled') +
            '/' +
            obj.getParameter('monsterOnWave'),
        }),
      );
    },
    parameters: {
      monsterCount: [
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
      ],
      monsterCooldown: 10,
    },
  },
};

export default config;
