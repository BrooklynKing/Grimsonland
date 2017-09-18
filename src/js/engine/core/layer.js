import utils from '../utils';
import gameConfigs from '../../configs';

import GameObject from './object';
import GameRule from './rule';


export default class GameLayer {
  constructor(config) {
    this.objectCount = 0;
    this.id = config.id;
    this.state = config.state;
    this.game = this.state.game;
    this.ctx = config.ctx;
    this.initList = config.initList;
    this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
    this.pos = config.pos ? new Phaser.Point(config.pos[0], config.pos[1]) : new Phaser.Point(0, 0);
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

  init() {
    if (!this.inited) {
      this.translate = utils.clone(this.defaultTranslate);
      for (let i = 0; i < this.initList.length; i++) {
        this.addObject(gameConfigs.getConfig(this.initList[i]));
      }

      this._init && this._init();

      const rules = this._rules;
      this.rules = [];

      for (let i = 0, l = rules.length; i < l; i++) {
        this.addRule(gameConfigs.getRuleConfig(rules[i]));
      }

      this.inited = true;
    }
  };

  render(dt) {
    if (!this.inited) return;

    const arr = {};
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
    ctx.clip();
    ctx.translate(this.translate.x, this.translate.y);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);

    for (let i in this.objects) {
      if (this.objects.hasOwnProperty(i)) {
        (arr[this.objects[i].zIndex]) || (arr[this.objects[i].zIndex] = []);
        arr[this.objects[i].zIndex].push(this.objects[i]);
      }
    }
    for (let i in arr) {
      if (arr[i]) {
        for (let j = 0, k = arr[i].length; j < k; j++) {
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

  update(dt) {
    if (!this.inited) return;

    for (let i in this.rules) {
      this.rules.hasOwnProperty(i) && this.rules[i].update(dt);
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

  addRule(config) {
    const rule = new GameRule(config);
    rule.setContext(this);
    rule.init();
    this.rules.push(rule);
  };

  removeObject(id) {
    if (this.objects.hasOwnProperty(id)) {
      this.objects[id].layer = null;

      if (this.objects[id].type && this.objects[id].type !== 'default') {
        this.sortedObjects[this.objects[id].type].splice(this.sortedObjects[this.objects[id].type].indexOf(id), 1);
      } else {
        this.sortedObjects['default'].splice(this.sortedObjects['default'].indexOf(id), 1);
      }
      this.objects[id] = null;

      delete this.objects[id];
    }
  };

  addObject(config) {
    if (this.objects.hasOwnProperty(config.id)) {
      console.error('Object with such id already exist in this layer: ', config.id);
      return false;
    }
    config.layer = this;
    config.id += (this.objectCount++) + Math.round((new Date()).getTime() + Math.random() * 1000001);

    const _obj = new GameObject(config);
    _obj.init();

    if (config.type && config.type !== 'default') {
      (!this.sortedObjects[config.type]) && (this.sortedObjects[config.type] = []);
      this.sortedObjects[config.type].push(_obj.id);
    } else {
      this.sortedObjects['default'].push(_obj.id);
    }

    this.objects[_obj.id] = _obj;

    return this.objects[_obj.id];
  };

  getObjectsByType(type) {
    const objectsId = this.sortedObjects[type] || [];
    const result = [];

    for (let i = 0, l = objectsId.length; i < l; i++) {
      result.push(this.objects[objectsId[i]]);
    }
    return result;
  };

  clearLayer() {
    this.objects = [];

    this.sortedObjects = {
      default: []
    };

    this.rules = [];

    this.inited = false;
  }
}
