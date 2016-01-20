import utils from './utils';
import renders from './renderers';
import Sprite from './sprite';

function GameObject(config) {
    this.layer = config.layer;
    if (config.pos instanceof utils.Point) {
        this.pos = config.pos.clone();
    } else {
        this.pos = new utils.Point(config.pos);
    }
    this.id = config.id;

    if (config.sprite) {
        this.sprite = new Sprite(this.layer.game.cache, config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
    }

    this.type = config.type;

    if (config.size || this.sprite) {
        this.size = config.size || this.sprite.size;
    }

    this.collisions = config.collisions;
    this.callbacks = config.callbacks || {};
    this.zIndex = config.zIndex || 0;
    var _parameters = config.parameters || {},
        parameters = (config.parameters && utils.clone(config.parameters)) || {};

    this.size = config.size;

    this.getParameter = function(id) {
        return parameters[id];
    };
    this.setParameter = function(id, value) {
        parameters[id] = value;
        return parameters[id];
    };
    this.getDefaultParameter = function(id) {
        return _parameters[id];
    };

    this.rules = config.rules || [];
    this.conditions = config.conditions || [];
    this._update = config.update;

    if (config.render) {
        if (renders[config.render]) {
            this.customRender = renders[config.render];
        } else {
            this.customRender = config.render;
        }
    }
    this._init = config.init;

    this.inited = false;
}
GameObject.prototype.render = function (dt) {
    if (this.customRender) {
        if (Array.isArray(this.customRender)) {
            for (var i = 0; i < this.customRender.length; i++) {
                this.customRender[i](this, dt);
            }
        } else {
            this.customRender(this, dt);
        }
    } else {
        renders.sprite(this, dt);
    }
};
GameObject.prototype.init = function () {
    if (!this.inited) {
        var rules = this.rules,
            conditions = this.conditions;

        this.rules = [];
        this.conditions = [];

        this._init && this._init();

        if (this.collisions) {
            this.collisions = new GameRule(gameConfigs.getRuleConfig('collisions'));
            this.collisions.setContext(this);
            this.collisions.init();
        }

        for (let i = 0, l = rules.length; i < l; i++) {
            this.addRule(gameConfigs.getRuleConfig(rules[i]));
        }

        for (let i = 0, l = conditions.length; i < l; i++) {
            this.addCondition(gameConfigs.getRuleConfig(conditions[i]));
        }

        this.inited = true;
    }
};
GameObject.prototype.update = function (dt) {
    this._update && this._update();
    for (var i = 0; i < this.rules.length; i++) {
        this.rules[i].update(dt, this);
    }
};
GameObject.prototype.updateConditions = function(dt) {
    for (var i = 0; i < this.conditions.length; i++) {
        this.conditions[i].update(dt, this);
    }
};
GameObject.prototype.setPosition = function (point) {
    this.pos.x = point.x;
    this.pos.y = point.y;
};
GameObject.prototype.removeRule = function (id) {
    if (this.rules.hasOwnProperty(id)) {
        this.rules[id].layer = null;
        delete this.rules[id];
    }
};
GameObject.prototype.addRule = function (config) {
    if (this.rules.hasOwnProperty(config.id)) {
        console.error('Rule with such id already exist in this layer');
        return false;
    } else {
        var rule = new GameRule(config);
        rule.setContext(this);
        rule.init();
        this.rules.push(rule);
    }

    return this.rules[config.id];
};
GameObject.prototype.addCondition = function (config) {
    if (this.conditions.hasOwnProperty(config.id)) {
        console.error('Rule with such id already exist in this layer');
        return false;
    } else {
        var condition = new GameRule(config);
        condition.setContext(this);
        condition.init();
        this.conditions.push(condition);
    }

    return this.rules[config.id];
};
GameObject.prototype.updateCollisions = function(dt) {
    this.collisions && this.collisions.update(dt, this);
};

function GameRule(config) {
    this.id = config.id;
    this._update = config.update;
    this.parameters = (config.parameters && utils.clone(config.parameters)) || {};
    this._init = config.init;
    this.inited = false;
}
GameRule.prototype.init = function () {
    if (!this.inited) {
        this._init && this._init();
        this.inited = true;
    }
};
GameRule.prototype.update = function (dt, obj) {
    this._update && this._update(dt, obj);
};
GameRule.prototype.setContext = function (context) {
    this.context = context;
};

export function GameLayer(config) {
    this.objectCount = 0;
    this.id = config.id;
    this.state = config.state;
    this.game = this.state.game;
    this.ctx = config.ctx;
    this.initList = config.initList;
    this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
    this.pos = config.pos ? new utils.Point(config.pos) : new utils.Point(0, 0);
    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
    this.defaultTranslate = config.translate || {
        x: 0,
        y: 0
    };
    this.sortedObjects = {
        'default': []
    };
    this.objects = {};
    this._rules = config.rules || [];
    this._init = config.init;
    this.inited = false;
}

GameLayer.prototype.init = function () {
    if (!this.inited) {
        this.translate = utils.clone(this.defaultTranslate);
        for (let i = 0; i < this.initList.length; i++) {
            this.addObject(gameConfigs.getConfig(this.initList[i]));
        }

        this._init && this._init();

        var rules = this._rules;
        this.rules = [];

        for (let i = 0, l = rules.length; i < l; i++) {
            this.addRule(gameConfigs.getRuleConfig(rules[i]));
        }

        this.inited = true;
    }
};
GameLayer.prototype.render = function (dt) {
    if (!this.inited) return;

    var arr = {},
        ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
    ctx.clip();
    ctx.translate(this.translate.x, this.translate.y);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5 );

    for (let i in this.objects) {
        if (this.objects.hasOwnProperty(i)) {
            (arr[this.objects[i].zIndex]) || (arr[this.objects[i].zIndex] = []);
            arr[this.objects[i].zIndex].push(this.objects[i]);
        }
    }
    for (let i in arr) {
        if (arr[i]) {
            for (var j = 0, k = arr[i].length; j < k; j++) {
                ctx.save();
                ctx.translate(Math.round(arr[i][j].pos.x), Math.round(arr[i][j].pos.y));

                arr[i][j].render(dt);

                ctx.restore();
            }
        }
    }
    ctx.translate(-this.translate.x, -this.translate.y);
    ctx.restore();
};
GameLayer.prototype.update = function (dt) {
    if (!this.inited) return;
    for (let i in this.rules) {
        this.rules.hasOwnProperty(i) && this.rules[i].update(dt, this);
    }

    for (let i in this.objects) {
        this.objects[i].update(dt);
    }

    for (let i in this.objects) {
        this.objects[i].updateCollisions(dt);
    }

    this.state.collisions.check();

    for (let i in this.objects) {
        this.objects[i].updateConditions(dt);
    }

    for (let i in this.objects) {
        if (this.objects[i]._removeInNextTick) {
            this.objects[i].collisions && this.state.collisions.removeObject(this.objects[i]);
            this.removeObject(this.objects[i].id);
        }
    }
};
GameLayer.prototype.removeRule = function (id) {
    if (this.rules.hasOwnProperty(id)) {
        this.rules[id].layer = null;
        delete this.rules[id];
    }
};
GameLayer.prototype.addRule = function (config) {
    if (this.rules.hasOwnProperty(config.id)) {
        console.error('Rule with such id already exist in this layer');
        return false;
    } else {
        var rule = new GameRule(config);
        rule.setContext(this);
        rule.init();
        this.rules.push(rule);
    }
    return this.rules[config.id];
};
GameLayer.prototype.removeObject = function (id) {
    if (this.objects.hasOwnProperty(id)) {
        this.objects[id].layer = null;
        if (this.objects[id].type && this.objects[id].type != 'default') {
            this.sortedObjects[this.objects[id].type].splice(this.sortedObjects[this.objects[id].type].indexOf(id), 1);
        } else {
            this.sortedObjects['default'].splice(this.sortedObjects['default'].indexOf(id), 1);
        }
        this.objects[id] = null;
        delete this.objects[id];
    }
};
GameLayer.prototype.addObject = function (config) {
    if (this.objects.hasOwnProperty(config.id)) {
        console.error('Object with such id already exist in this layer: ', config.id);
        return false;
    }
    config.layer = this;
    config.id += (this.objectCount++) + Math.round((new Date()).getTime() + Math.random() * 1000001);
    var _obj = new GameObject(config);
    _obj.init();

    if (config.type && config.type != 'default') {
        (!this.sortedObjects[config.type]) && (this.sortedObjects[config.type] = []);
        this.sortedObjects[config.type].push(_obj.id);
    } else {
        this.sortedObjects['default'].push(_obj.id);
    }
    this.objects[_obj.id] = _obj;

    return this.objects[_obj.id];
};
GameLayer.prototype.getObjectsByType = function (type) {
    var objectsId = this.sortedObjects[type] || [],
        result = [];
    for (var i = 0, l = objectsId.length; i < l; i++) {
        result.push(this.objects[objectsId[i]]);
    }
    return result;
};
GameLayer.prototype.clearLayer = function () {
    for (let i in this.objects) {
        this.objects.hasOwnProperty(i) && delete this.objects[i];
    }
    this.sortedObjects = {
        'default': []
    };
    for (let i in this.rules) {
        this.rules.hasOwnProperty(i) && delete this.rules[i];
    }
    this.inited = false;
};
