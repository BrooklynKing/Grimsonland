import utils from './../../engine/utils';

var config = {
    random_trees: {
        init: function() {
            var obj = this.context;

            function getRandomPointInArea() {
                return [Math.round(Math.random() * obj.game.canvas.width), Math.round(Math.random() * obj.game.canvas.height)];
            }

            for (var i = 0; i < this.parameters.trees; i++) {
                var config = obj.game.getConfig('tree');

                config.pos = getRandomPointInArea(this.parameters.area);

                this.context.addObject(config);
            }

            for (var i = 0; i < this.parameters.stones; i++) {
                var config = obj.game.getConfig('stones');

                config.pos = getRandomPointInArea(this.parameters.area);

                var stone = this.context.addObject(config);
                stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }

        },
        parameters: {
            trees: 30,
            stones: 20
        }
    },
    spawn_monster: {
        update: function (dt, obj) {
            if (this.parameters.monsterSpawned < 10000) {
                if (this.parameters.currentMonsterCooldown == 0) {
                    var monsterConfig = (Math.random() * 100 > (100 - this.parameters.chanceOfBoss)) ? obj.game.getConfig('monsterBoss') : obj.game.getConfig('monster'),
                        startPosition = Math.round(Math.random() * 3);

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
            area: [[0, 0], [800, 600]],
            currentMonsterCooldown: 8,
            chanceOfBoss : 3,
            monsterCooldown: 8,
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
            area: [[50, 50], [750, 550]],
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
            area: [[50, 50], [850, 750]],
            currentCooldown: 500,
            cooldown: 500
        }
    }
};

export default config;