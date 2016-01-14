import utils from './../../engine/utils';
import format from 'string-template';
var Victor = require('victor');

var config = {
    random_trees: {
        init: function() {
            var obj = this.context;

            function getRandomPointInArea() {
                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
            }

            for (let i = 0; i < this.parameters.trees; i++) {
                let config = gameConfigs.getConfig('tree');

                config.pos = new utils.Point(getRandomPointInArea(this.parameters.area));

                this.context.addObject(config);
            }

            for (let i = 0; i < this.parameters.stones; i++) {
                let config = gameConfigs.getConfig('stones');

                config.pos = new utils.Point(getRandomPointInArea(this.parameters.area));

                /*var stone = */this.context.addObject(config);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }

        },
        parameters: {
            trees: 40,
            stones: 40
        }
    },
    spawn_monster: {
        init: function() {
            this.parameters.currentWave = 1;
            this.parameters.monseterOnWave = this.parameters.waveMultiplier * (this.parameters.currentWave);
            this.parameters.monsterLeft = 0;
            this.parameters.lastWaveMonsters = 0;
            this.parameters.monsterSpawned = 0;
            this.leftOnWave = this.context.addObject(gameConfigs.getConfig('leftOnWave'));
        },
        update: function (dt, obj) {
            this.parameters.monsterLeft = (obj.state.parameters.monstersKilled - this.parameters.lastWaveMonsters);
            if (this.parameters.monsterSpawned < this.parameters.waveMultiplier * (this.parameters.currentWave)) {
                if ((!this.parameters.currentMonsterCooldown)) {
                    var topLeft = new Victor(50 - obj.translate.x, 50 - obj.translate.y);
                    var bottomRight = new Victor(900 - obj.translate.x, 650 - obj.translate.y);
                    var summonGate = gameConfigs.getConfig('summonGate');

                    summonGate.pos = new utils.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());
                    summonGate.pos.x = Math.min(1150, Math.max(50, summonGate.pos.x));
                    summonGate.pos.y = Math.min(968, Math.max(50, summonGate.pos.y));
                    this.context.addObject(summonGate);

                    this.parameters.monsterSpawned++;
                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;

                } else {
                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
                }
            } else {
                if (this.parameters.monsterLeft == this.parameters.monseterOnWave  ) {
                    this.parameters.currentWave++;
                    this.parameters.monsterSpawned = 0;
                    this.parameters.monseterOnWave = this.parameters.waveMultiplier * (this.parameters.currentWave);
                    this.parameters.lastWaveMonsters = obj.state.parameters.monstersKilled;
                }
            }
            this.leftOnWave.setParameter('text', format(this.leftOnWave.getParameter('template'), {
                count: this.parameters.monsterLeft + '/' + this.parameters.monseterOnWave
            }));
        },
        parameters: {
            waveMultiplier: 25,
            monsterCooldown: 10
        }
    },
    spawn_heart: {
        update: function (dt, obj) {
            if (!this.parameters.currentCooldown) {
                var config = gameConfigs.getConfig('heart');

                var topLeft = new Victor(50, 50);
                var bottomRight = new Victor(1154, 918);

                config.pos = new utils.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;

            } else {
                this.parameters.currentCooldown--;
            }

        },
        parameters: {
            area: [[50, 50], [1154, 918]],
            cooldown: 400
        }
    },
    spawn_powerup: {
        update: function (dt, obj) {
            if (!this.parameters.currentCooldown) {
                var config = gameConfigs.getConfig('powerup');

                var topLeft = new Victor(100, 100);
                var bottomRight = new Victor(1100, 850);

                config.pos = new utils.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;

            } else {
                this.parameters.currentCooldown--;
            }

        },
        parameters: {
            area: [[100, 100], [1100, 850]],
            currentCooldown : 1100,
            cooldown: 1100
        }
    },
    spawn_terrain: {
        init: function() {
            var obj = this.context,
                gateConfig = gameConfigs.getConfig('gate'),
                wallConfig;

            for (var i = 0; i < 7; i++) {
                wallConfig = gameConfigs.getConfig('wall');
                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1]/2];
                var wall = this.context.addObject(wallConfig);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }
            gateConfig.pos = [wallConfig.pos.x + wallConfig.size[0]/ 2 + gateConfig.size[0]/2, (gateConfig.size[1] - 3)/2 ];
            var gate = this.context.addObject(gateConfig);
        }
    },
    goWithPlayer: {
        update: function(dt,obj) {
            var player = obj.getObjectsByType('player')[0],
                px = (player.pos.x + obj.translate.x) / 1024 * 100,
                py = (player.pos.y + obj.translate.y) / 768 * 100;

            if (px < 30) {
                if (obj.translate.x < 0) {
                    obj.translate.x += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (px > 70) {
                if (obj.translate.x > - 200) {
                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
                }
            }

            if (py < 25) {
                if (obj.translate.y < 0) {
                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (py > 75) {
                if (obj.translate.y > - 200) {
                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
                }
            }
        }
    }
};

export default config;