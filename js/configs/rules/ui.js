import utils from './../../engine/utils';
import format from 'string-template';

var config = {
    countMonsterKilled : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                kills: obj.layer.game.parameters.monstersKilled || 0
            });
        }
    },
    timer : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                time: ((obj.layer.game.parameters.gameTimer++) / 60).toFixed(2)
            });
        }
    },
    health : {
        update: function (dt, obj) {
            obj.parameters.text = format(obj.parameters.template, {
                health: obj.layer.getObjectsByType('player')[0].parameters.health
            });
        }
    },
    bestTime : {
        init: function (dt, obj) {
            var obj = this.context;
            obj.parameters.text = format(obj.parameters.template, {
                time: ((obj.layer.game.parameters.bestTime) / 60).toFixed(2)
            });
        }
    }
};

export default config;