import utils from './../../engine/utils';

var config = {
    random_trees: {
        init: function() {
            var obj = this.context;

            function getRandomPointInArea(size) {
                return [Math.round(Math.random() * obj.game.canvas.width), Math.round(Math.random() * obj.game.canvas.height)];
            }

            for (var i = 0; i < this.parameters.trees; i++) {
                let config = obj.game.getConfig('tree');

                config.pos = getRandomPointInArea(this.parameters.area);

                this.context.addObject(config);
            }

            for (var i = 0; i < this.parameters.stones; i++) {
                let config = obj.game.getConfig('stones');

                config.pos = getRandomPointInArea(this.parameters.area);

                var stone = this.context.addObject(config);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }

        },
        parameters: {
            trees: 30,
            stones: 30
        }
    },
    spawn_monster: {
        update: function (dt, obj) {
            if (this.parameters.monsterSpawned < 10000) {
                if (this.parameters.currentMonsterCooldown == 0) {
                    var random = Math.random() * 100,
                        startPosition = Math.round(Math.random() * 3),
                        monsterConfig;

                    if (random <= this.parameters.chanceOfBoss) {
                        monsterConfig = obj.game.getConfig('monsterBoss');
                    } else if (random <= this.parameters.chanceOfBoss + this.parameters.chanceOfBoomer) {
                        monsterConfig = obj.game.getConfig('monsterBoomer');
                    } else {
                        monsterConfig = obj.game.getConfig('monster');
                    }

                    switch (startPosition) {
                        case 0 :
                            monsterConfig.pos = [this.parameters.area[0][0] - monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
                            break;
                        case 1 :
                            monsterConfig.pos = [Math.round(Math.random() * this.parameters.area[1][0]), this.parameters.area[0][1] - monsterConfig.sprite[2][1]];
                            break;
                        case 2 :
                            monsterConfig.pos = [this.parameters.area[1][0] + monsterConfig.sprite[2][0], Math.round(Math.random() * this.parameters.area[1][1])];
                            break;
                        case 3 :
                            monsterConfig.pos = [Math.round(Math.random() * this.parameters.area[1][0]), this.parameters.area[1][1] + monsterConfig.sprite[2][1]];
                            break;
                    }
                    this.context.addObject(monsterConfig);

                    this.parameters.monsterSpawned++;
                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;

                } else {
                    this.parameters.currentMonsterCooldown--;
                }
            }
        },
        parameters: {
            area: [[0, 0], [1024 , 768]],
            currentMonsterCooldown: 7,
            chanceOfBoss : 3,
            chanceOfBoomer : 100,
            monsterCooldown: 7000,
            monsterSpawned: 0
        }
    },
    spawn_heart: {
        update: function (dt, obj) {
            if (this.parameters.currentCooldown == 0) {
                var config = obj.game.getConfig('heart');

                config.pos = [Math.round(Math.random() * this.parameters.area[1][0]) + this.parameters.area[0][0], Math.round(Math.random() * this.parameters.area[1][1]) + this.parameters.area[0][1]];

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;

            } else {
                this.parameters.currentCooldown--;
            }

        },
        parameters: {
            area: [[50, 50], [975, 715]],
            currentCooldown: 400,
            cooldown: 400
        }
    },
    spawn_powerup: {
        update: function (dt, obj) {
            if (this.parameters.currentCooldown == 0) {
                var config = obj.game.getConfig('powerup');

                config.pos = [Math.round(Math.random() * this.parameters.area[1][0]) + this.parameters.area[0][0], Math.round(Math.random() * this.parameters.area[1][1]) + this.parameters.area[0][1]];

                this.context.addObject(config);

                this.parameters.currentCooldown = this.parameters.cooldown;

            } else {
                this.parameters.currentCooldown--;
            }

        },
        parameters: {
            area: [[100, 100], [900, 715]],
            currentCooldown: 500,
            cooldown: 500
        }
    },
    spawn_terrain: {
        init: function() {
            var obj = this.context,
                gateConfig = obj.game.getConfig('gate'),
                wallConfig = obj.game.getConfig('wall');

            for (var i = 0; i < 7; i++) {
                var wallConfig = obj.game.getConfig('wall');
                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1]/2];
                var wall = this.context.addObject(wallConfig);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }
            gateConfig.pos = [wallConfig.pos[0] + wallConfig.size[0]/ 2 + gateConfig.size[0]/2, (gateConfig.size[1] - 3)/2 ];
            var gate = this.context.addObject(gateConfig);
        }
    }
};

export default config;