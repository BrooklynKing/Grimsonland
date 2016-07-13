import utils from './utils';
import renders from './renderers';
import Sprite from './sprite';

class GameObject {
    id:number;
    layer:GameLayer;
    pos:Phaser.Point;
    sprite:Sprite;
    type:string;
    size:Array<number>;
    zIndex:number;
    parameters:any;

    collision:any;
    private _rules:Array<GameRule|any>;
    private _conditions:Array<GameRule|any>;
    private _init:Function;
    private _isInitiated:boolean;

    private _defaultParameters:Object;
    private _isRenderNeeded:boolean;
    private _renderer:Function;
    private _update:Function;

    constructor(config:any) {
        this.layer = config.layer;
        if (config.pos instanceof Phaser.Point) {
            this.pos = config.pos.clone();
        } else {
            if (config.pos) {
                this.pos = new Phaser.Point(config.pos[0], config.pos[1]);
            } else {
                this.pos = new Phaser.Point();
            }
        }
        this.id = config.id;

        if (config.sprite) {
            this.sprite = new Sprite(this.layer.game.cache, config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
        }

        this.type = config.type;

        if (config.size || this.sprite) {
            this.size = config.size || this.sprite.size;
        }

        this.collision = !!config.collisions;
        this.zIndex = config.zIndex || 0;

        this.size = config.size;

        this._rules = config.rules || [];
        this._conditions = config.conditions || [];
        this._update = config.update;

        if (config.render) {
            if (renders[config.render]) {
                this._renderer = renders[config.render];
            } else {
                this._renderer = config.render;
            }
        } else {
            if (config.render === false) {
                this._isRenderNeeded = true;
            }
        }

        this._init = config.init;

        this.parameters = utils.clone(config.parameters);
        this._defaultParameters = utils.clone(config.parameters);

        this._isInitiated = false;
    }

    getParameter(id:string):any {
        return this._parameters[id];
    }

    setParameter(id:string, value:any):any {
        this._parameters[id] = value;
        return this._parameters[id];
    }

    getDefaultParameter(id:string):any {
        return this._defaultParameters[id];
    }

    render(dt:number) {
        if (!this._isRenderNeeded) {
            if (this._renderer) {
                if (Array.isArray(this._renderer)) {
                    for (var i:number = 0; i < this._renderer.length; i++) {
                        this._renderer[i](this, dt);
                    }
                } else {
                    this._renderer(this, dt);
                }
            } else {
                renders.sprite(this, dt);
            }
        }
    }

    init():void {
        if (!this._isInitiated) {
            this._init && this._init();

            if (this.collision) {
                this.collision = new GameRule(gameConfigs.getRuleConfig('collisions'));
                this.collision.setContext(this);
                this.collision.init();
            }

            this._rules = this._rules.map((ruleConfig) => {
                let rule = new GameRule(gameConfigs.getRuleConfig(ruleConfig));
                rule.setContext(this);
                rule.init();

                return rule;
            });

            this._conditions = this._conditions.map((conditionConfig) => {
                let condition = new GameRule(gameConfigs.getRuleConfig(conditionConfig));
                condition.setContext(this);
                condition.init();

                return condition;
            });

            this._isInitiated = true;
        }
    }

    update(dt:number):void {
        this._update && this._update();
        for (var i:number = 0; i < this._rules.length; i++) {
            this._rules[i].update(dt);
        }
    }

    updateConditions(dt:number):void {
        for (var i:number = 0; i < this._conditions.length; i++) {
            this._conditions[i].update(dt);
        }
    }

    setPosition(point:Phaser.Point):void {
        this.pos.x = point.x;
        this.pos.y = point.y;
    }

    updateCollisions(dt:number) {
        this.collision && this.collision.update(dt, this);
    }
}

class GameRule {
    id:string;
    parameters:Object;
    context:any;
    parameters: any;

    private _isInitiated:boolean;
    private _init:Function;
    private _update:Function;

    constructor(config:any) {
        this.id = config.id;
        this._update = config.update;
        this.parameters = (config.parameters && utils.clone(config.parameters)) || {};
        this._init = config.init;
        this._isInitiated = false;
        this.parameters = {};
    }

    init():void {
        if (!this._isInitiated) {
            this._init && this._init();
            this._isInitiated = true;
        }
    }

    update(dt:number):void {
        this._update && this._update(dt);
    }

    setContext(context:any):void {
        this.context = context;
    }
}

class GameLayer {
    id: string;
    state: Phaser.State;
    game: Phaser.Game;
    ctx: CanvasRenderingContext2D;
    background: CanvasPattern;
    pos: Phaser.Point;
    size: any;
    defaultTranslate: any;
    translate: any;

    private _objects: any;
    private _sortedObjects: any;
    private _objectCounter:number;
    private _initObjectList: Array<any>;
    private _isInitiated: boolean;
    private _init: Function;
    private _rules: Array<GameRule|any>;

    constructor(config:any) {
        this._objectCounter = 0;
        this.id = config.id;
        this.state = config.state;
        this.game = this.state.game;
        this.ctx = config.ctx;
        this._initObjectList = config.initList;
        this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
        this.pos = config.pos ? new Phaser.Point(config.pos[0], config.pos[1]) : new Phaser.Point(0, 0);
        this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
        this.defaultTranslate = config.translate || {
                x: 0,
                y: 0
            };
        this._sortedObjects = {
            'default': []
        };
        this._objects = {};
        this._rules = config.rules || [];
        this._init = config.init;
        this._isInitiated = false;
    }

    init():void {
        if (!this._isInitiated) {
            this.translate = utils.clone(this.defaultTranslate);
            for (let i = 0; i < this._initObjectList.length; i++) {
                this.addObject(gameConfigs.getConfig(this._initObjectList[i]));
            }

            this._init && this._init();

            this._rules = this._rules.map((ruleConfig) => {
                let rule = new GameRule(gameConfigs.getRuleConfig(ruleConfig));
                rule.setContext(this);
                rule.init();

                return rule;
            });

            this._isInitiated = true;
        }
    }

    render(dt:number):void {
        if (!this._isInitiated) return;

        var arr:Object = {};
        var ctx:CanvasRenderingContext2D = this.ctx;

        ctx.save();
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
        ctx.clip();
        ctx.translate(this.translate.x, this.translate.y);
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);

        for (let i in this._objects) {
            if (this._objects.hasOwnProperty(i)) {
                (arr[this._objects[i].zIndex]) || (arr[this._objects[i].zIndex] = []);
                arr[this._objects[i].zIndex].push(this._objects[i]);
            }
        }
        for (let i in arr) {
            if (arr[i]) {
                for (let j:number = 0, k = arr[i].length; j < k; j++) {
                    ctx.save();
                    ctx.translate(Math.round(arr[i][j].pos.x), Math.round(arr[i][j].pos.y));

                    arr[i][j].render(dt);

                    ctx.restore();
                }
            }
        }
        ctx.translate(-this.translate.x, -this.translate.y);
        ctx.restore();
    }

    update(dt:number):void {
        if (!this._isInitiated) return;

        for (let i in this._rules) {
            this._rules.hasOwnProperty(i) && this._rules[i].update(dt);
        }

        for (let i in this._objects) {
            this._objects[i].update(dt);
        }

        for (let i in this._objects) {
            this._objects[i].updateCollisions(dt);
        }

        this.state.collisions.check();

        for (let i in this._objects) {
            this._objects[i].updateConditions(dt);
        }

        for (let i in this._objects) {
            if (this._objects[i]._removeInNextTick) {
                this._objects[i].collision && this.state.collisions.removeObject(this._objects[i]);
                this.removeObject(this._objects[i].id);
            }
        }
    }

    removeObject(id:string):void {
        if (this._objects.hasOwnProperty(id)) {
            this._objects[id].layer = null;

            if (this._objects[id].type && this._objects[id].type != 'default') {
                this._sortedObjects[this._objects[id].type].splice(this._sortedObjects[this._objects[id].type].indexOf(id), 1);
            } else {
                this._sortedObjects['default'].splice(this._sortedObjects['default'].indexOf(id), 1);
            }
            this._objects[id] = null;

            delete this._objects[id];
        }
    }

    addObject(config:any):GameObject|boolean {
        if (this._objects.hasOwnProperty(config.id)) {
            console.error('Object with such id already exist in this layer: ', config.id);
            return false;
        }
        config.layer = this;
        config.id += (this._objectCounter++) + Math.round((new Date()).getTime() + Math.random() * 1000001);

        var _obj:GameObject = new GameObject(config);
        _obj.init();

        if (config.type && config.type != 'default') {
            (!this._sortedObjects[config.type]) && (this._sortedObjects[config.type] = []);
            this._sortedObjects[config.type].push(_obj.id);
        } else {
            this._sortedObjects['default'].push(_obj.id);
        }

        this._objects[_obj.id] = _obj;

        return this._objects[_obj.id];
    }

    getObjectsByType(type:string):Array<GameObject> {
        var objectsId:Array<string> = this._sortedObjects[type] || [];
        var result:Array<GameObject> = [];

        for (var i = 0, l = objectsId.length; i < l; i++) {
            result.push(this._objects[objectsId[i]]);
        }
        return result;
    }

    clearLayer():void {
        for (let i in this._objects) {
            this._objects.hasOwnProperty(i) && delete this._objects[i];
        }

        this._sortedObjects = {
            default: []
        };

        for (let i in this._rules) {
            this._rules.hasOwnProperty(i) && delete this._rules[i];
        }

        this._isInitiated = false;
    }
}

export default GameLayer;