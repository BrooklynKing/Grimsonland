import utils from './../../engine/utils';
import format from 'string-template';

var config = {
    countMonsterKilled : {
        update: function (dt, obj) {
            var template = obj.getParameter('template');
            obj.setParameter('text', format(template, {
                kills: obj.layer.state.parameters.monstersKilled || 0
            }));
        }
    },
    timer : {
        update: function (dt, obj) {
            var template = obj.getParameter('template');
            obj.setParameter('text', format(template, {
                time: ((obj.layer.state.parameters.gameTimer++) / 60).toFixed(2)
            }));
        }
    },
    health : {
        update: function (dt, obj) {
            var template = obj.getParameter('template');
            obj.setParameter('text', format(template, {
                health: obj.layer.getObjectsByType('player')[0].parameters.health
            }));
        }
    },
    level : {
        update: function (dt, obj) {
            var template = obj.getParameter('template');
            var player = obj.layer.getObjectsByType('player')[0];

            obj.setParameter('text', format(template, {
                level: player.getParameter('level'),
                exp: player.getParameter('exp'),
                levelExp : player.getParameter('levelTable')[player.getParameter('level')]
            }));
        }
    },
    bestTime : {
        init: function () {
            var obj = this.context;
            var template = obj.getParameter('template');
            obj.setParameter('text', format(template, {
                time: ((obj.layer.state.parameters.bestTime) / 60).toFixed(2)
            }));
        }
    },
    bestScore : {
        init: function () {
            var obj = this.context;
            var template = obj.getParameter('template');
            obj.setParameter('text', format(template, {
                score: obj.layer.state.parameters.bestScore
            }));
        }
    }
};

export default config;