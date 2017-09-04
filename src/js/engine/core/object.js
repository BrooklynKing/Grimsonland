import utils from '../utils';
import renders from '../renderers';
import Sprite from '../sprite';
import gameConfigs from '../../configs';

import GameRule from './rule';


export default class GameObject {
  constructor(config) {
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

    this.collisions = config.collisions;
    this.callbacks = config.callbacks || {};
    this.zIndex = config.zIndex || 0;
    const _parameters = config.parameters || {};
    const parameters = (config.parameters && utils.clone(config.parameters)) || {};

    this.size = config.size;

    this.getParameter = function (id) {
      return parameters[id];
    };
    this.setParameter = function (id, value) {
      parameters[id] = value;
      return parameters[id];
    };
    this.getDefaultParameter = function (id) {
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
    } else {
      if (config.render === false) {
        this.noRender = true;
      }
    }

    this._init = config.init;

    this.inited = false;
  }

  render(dt) {
    if (!this.noRender) {
      if (this.customRender) {
        if (Array.isArray(this.customRender)) {
          this.customRender.forEach(renderer => renderer(this, dt));
        } else {
          this.customRender(this, dt);
        }
      } else {
        renders.sprite(this, dt);
      }
    }
  }

  init() {
    if (!this.inited) {
      const rules = this.rules;
      const conditions = this.conditions;

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
  }

  update(dt) {
    this._update && this._update();
    this.rules.forEach(rule => rule.update(dt));
  }

  updateConditions(dt) {
    this.conditions.forEach(condition => condition.update(dt));
  };

  setPosition(point) {
    this.pos.x = point.x;
    this.pos.y = point.y;
  }

  addRule(config) {
    const rule = new GameRule(config);
    rule.setContext(this);
    rule.init();

    this.rules.push(rule);
  }

  addCondition(config) {
    const condition = new GameRule(config);
    condition.setContext(this);
    condition.init();

    this.conditions.push(condition);
  }

  updateCollisions(dt) {
    this.collisions && this.collisions.update(dt, this);
  }
}
