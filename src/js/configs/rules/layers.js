import gameConfigs from '../../configs/index';

var config = {
    random_trees: {
        init: function() {
            var obj = this.context;

            function getRandomPointInArea() {
                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
            }

            for (let i = 0; i < this.parameters.trees; i++) {
                let config = gameConfigs.getConfig('tree' + (Math.round(Math.random()) + 1));

                let point = getRandomPointInArea(this.parameters.area);
                config.pos = new Phaser.Point(point[0], point[1]);

                this.context.addObject(config);
            }

            for (let i = 0; i < this.parameters.stones; i++) {
                let config = gameConfigs.getConfig('stones');
                let point = getRandomPointInArea(this.parameters.area);
                config.pos = new Phaser.Point(point[0], point[1]);

                /*var stone = */this.context.addObject(config);
                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
            }

        },
        parameters: {
            trees: 100,
            stones: 100
        }
    },
    spawn_heart: {
        update: function () {
            if (!this.parameters.currentCooldown) {
                var config = gameConfigs.getConfig('heart');
                const rect = new Phaser.Rectangle(50, 50, 1104, 868);
                config.pos = new Phaser.Point(rect.randomX, rect.randomY);

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
        update: function () {
            if (!this.parameters.currentCooldown) {
                var config = gameConfigs.getConfig('powerup');

                const rect = new Phaser.Rectangle(100, 100, 1000, 750);
                config.pos = new Phaser.Point(rect.randomX, rect.randomY);

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
            var gateConfig = gameConfigs.getConfig('gate'),
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
        update: function(dt) {
            var obj = this.context;
            var player = obj.getObjectsByType('player')[0];
            var px = (player.pos.x + obj.translate.x) / 1024 * 100;
            var py = (player.pos.y + obj.translate.y) / 768 * 100;

            if (px < 30) {
                if (obj.translate.x < 0) {
                    obj.translate.x += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (px > 70) {
                if (obj.translate.x > - 300) {
                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
                }
            }

            if (py < 25) {
                if (obj.translate.y < 0) {
                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
                }
            }
            if (py > 75) {
                if (obj.translate.y > - 300) {
                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
                }
            }
        }
    }
};

export default config;