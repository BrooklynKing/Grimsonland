import resources from './resources';
import utils from './utils';
import renders from './renderers';
import Sprite from './sprite';

function GameObject(config) {
    this.pos = utils.clone(config.pos);
    this.id = config.id || ('object' + Date.now().toString());

    if (config.sprite) {
        this.sprite = new Sprite(config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
    }

    this.type = config.type;

    if (config.size || this.sprite) {
        this.size = config.size || this.sprite.size;
    }
    this.collisions = config.collisions;
    this.callbacks = config.callbacks || {};
    this.zIndex = config.zIndex || 0;
    this.parameters = (config.parameters && utils.clone(config.parameters)) || {};
    this._parameters = config.parameters;
    this.rules = config.rules || [];
    this.conditions = config.conditions || [];
    this._update = config.update;
    if (config.render) {
        if (renders[config.render]) {
            this.customRender = renders[config.render];
        }
    }
    this._init = config.init;

    this.inited = false;
}
GameObject.prototype.render = function (dt) {
    var ctx = this.layer.ctx;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    if (this.customRender) {
        this.customRender(this, dt);
    } else {
        dt && this.sprite.update(dt);
        this.sprite.render(ctx);
    }

    ctx.restore();
};
GameObject.prototype.init = function () {
    if (!this.inited) {
        var rules = this.rules,
            conditions = this.conditions;

        this.rules = [];
        this.conditions = [];

        this._init && this._init();

        if (this.collisions) {
            this.collisions = new GameRule(this.layer.game.rulesDefinition['collisions']);
            this.collisions.setContext(this);
            this.collisions.init();
        }

        for (let i = 0, l = rules.length; i < l; i++) {
            this.addRule(this.layer.game.rulesDefinition[rules[i]]);
        }

        for (let i = 0, l = conditions.length; i < l; i++) {
            this.addCondition(this.layer.game.rulesDefinition[conditions[i]]);
        }

        this.inited = true;
    }
};
GameObject.prototype.setLayer = function (layer) {
    this.layer = layer;
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
    if (this._removeInNextTick) {
        if (this.parameters.collisions) {
            this.layer.game.collisions.removeObject(this);
        }
        this.layer.removeObject(this.id);
        this._removeInNextTick = false;
    }
};
GameObject.prototype.setPosition = function (point) {
    this.pos[0] = point[0];
    this.pos[1] = point[1];
};
GameObject.prototype.triggerAction = function (action, event, mouse) {
    var object = this;

    function checkHitBox(mouse) {
        var flag;

        (object.pos[0] < mouse.x) && (object.pos[0] + object.sprite.size[0] > mouse.x) && (object.pos[1] < mouse.y) && (object.pos[1] + object.sprite.size[1] > mouse.y) && (flag = true);
        return flag;
    }

    switch (action) {
        case 'click':
            this.callbacks['click'] && checkHitBox(mouse) && this.callbacks['click'](this, event);
            break;
        case 'mousemove' :
            this.callbacks['mousemove'] && checkHitBox(mouse) && this.callbacks['mousemove'](this, event);
            this.callbacks['mouseleave'] && !checkHitBox(mouse) && this.callbacks['mouseleave'](this, event);
            break;
        default:
            this.callbacks.hasOwnProperty(action) && this.callbacks[action](this, event)
    }
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
    this._parameters = utils.clone(this.parameters);
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

function GameLayer(config) {
    this.id = config.id;
    this.ctx = config.ctx;
    this.game = config.game;
    this.background = this.ctx.createPattern(resources.get(config.background), 'repeat');
    this.pos = config.pos || [0, 0];
    this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
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
        this._init && this._init();

        var rules = this._rules;
        this.rules = [];

        for (var i = 0, l = rules.length; i < l; i++) {
            this.addRule(this.game.rulesDefinition[rules[i]]);
        }

        this.inited = true;
    }
};
GameLayer.prototype.render = function (dt) {
    var arr = [],
        ctx = this.ctx,
        canvas = ctx.canvas;

    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.clip();
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i in this.objects) {
        if (this.objects.hasOwnProperty(i)) {
            (arr[this.objects[i].zIndex]) || (arr[this.objects[i].zIndex] = []);
            arr[this.objects[i].zIndex].push(this.objects[i]);
        }
    }
    for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i]) {
            for (var j = 0, k = arr[i].length; j < k; j++) {
                arr[i][j].render(dt);
            }
        }
    }

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'black';
    ctx.lineWidth = 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.stroke();
    ctx.restore();
};
GameLayer.prototype.update = function (dt) {
    for (let i in this.rules) {
        this.rules.hasOwnProperty(i) && this.rules[i].update(dt, this);
    }

    for (let i in this.objects) {
        this.objects[i].update(dt);
    }

    for (let i in this.objects) {
        this.objects[i].updateCollisions(dt);
    }

    this.game.collisions.update();

    for (let i in this.objects) {
        this.objects[i].updateConditions(dt);
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
        delete this.objects[id];
    }
};
GameLayer.prototype.addObject = function (config) {
    if (this.objects.hasOwnProperty(config.id)) {
        console.error('Object with such id already exist in this layer: ', config.id);
        return false;
    }
    config.id = config.id + Math.round(Date.now() + Math.random() * 1000001);

    var _obj = new GameObject(config);
    _obj.setLayer(this);
    _obj.init();
    if (config.type && config.type != 'default') {
        (!this.sortedObjects[config.type]) && (this.sortedObjects[config.type] = []);
        this.sortedObjects[config.type].push(config.id);
    } else {
        this.sortedObjects['default'].push(config.id);
    }
    this.objects[config.id] = _obj;


    return this.objects[config.id];
};
GameLayer.prototype.addObjects = function (obj) {
    if (Array.isArray(obj)) {
        for (var i = 0, j = obj.length; i < j; i++) {
            this.addObject(obj[i]);
        }
    } else {
        console.error('addObjects expect array in parameters');
    }
};
GameLayer.prototype.getObjectsByType = function (type) {
    var objectsId = this.sortedObjects[type] || [],
        result = [];
    for (var i = 0, l = objectsId.length; i < l; i++) {
        result.push(this.objects[objectsId[i]]);
    }
    return result;
};
GameLayer.prototype.triggerAction = function (action, event, mouse) {
    for (var i in this.objects) {
        this.objects.hasOwnProperty(i) && this.objects[i].triggerAction(action, event, mouse);
    }
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
GameLayer.prototype.getCoordinates = function () {
    return [this.pos[0], this.pos[1], this.pos[0] + this.size[0], this.pos[1] + this.size[1]];
};

function GameWindow(config) {
    this.layers = {};
    this.ctx = config.ctx;
    this.canvas = config.canvas;
    this.collisions = config.collisions;
    this.objectsDefinition = config.objects;
    this.rulesDefinition = config.rules;
    this.layersDefinition = config.layers;
    this.input = config.input;
    this.mouse = config.mouse;
    this._handlers = {};
    this.parameters = {};
    this._init = config.init;
}
GameWindow.prototype.init = function () {
    this._init && this._init();
};
GameWindow.prototype.bindGlobalEvent = function (eventName, handler) {
    (!this._handlers[eventName]) && (this._handlers[eventName] = []);
    this._handlers[eventName].push(handler);

    return this;
};
GameWindow.prototype.triggerGlobalEvent = function (eventName, eventObject) {
    for (var i = 0, l = (this._handlers[eventName]) ? this._handlers[eventName].length : 0; i < l; i++) {
        this._handlers[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    return this;
};
GameWindow.prototype.triggerAction = function (action, event, mouse) {
    for (var i in this.layers) {
        this.layers.hasOwnProperty(i) && this.layers[i].triggerAction(action, event, mouse);
    }
};
GameWindow.prototype.getLayer = function () {
    return this.layers;
};
GameWindow.prototype.update = function (dt) {
    for (var i in this.layers) {
        this.layers.hasOwnProperty(i) && this.layers[i].update(dt);
    }
};
GameWindow.prototype.render = function (dt) {
    for (var i in this.layers) {
        this.layers.hasOwnProperty(i) && this.layers[i].render(dt);
    }
};
GameWindow.prototype.removeLayer = function (id) {
    this.layers.hasOwnProperty(id) && delete this.layers[id];
};
GameWindow.prototype.addLayers = function (obj) {
    var arr = [];
    if (Array.isArray(obj)) {
        for (var i = 0, j = obj.length; i < j; i++) {
            arr.push(this.addLayer(obj[i]));
        }
    } else {
        console.error('addLayers expect array in parameters');
    }
    return arr;
};
GameWindow.prototype.addLayer = function (obj) {
    if (this.layers.hasOwnProperty(obj.id)) {
        console.error('Layer with such id already exist in this window');
        return false;
    } else {
        obj.ctx = this.ctx;
        obj.game = this;
        this.layers[obj.id] = new GameLayer(obj);
    }

    return this.layers[obj.id];
};
GameWindow.prototype.getConfig = function (id) {
    return utils.clone(this.objectsDefinition[id]);
};
GameWindow.prototype.getLayerConfig = function (id) {
    return this.layersDefinition[id];
};

export default GameWindow