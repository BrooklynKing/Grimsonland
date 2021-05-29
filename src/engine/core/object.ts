import { GameLayer } from './layer';
import { Sprite } from '../sprite';

import { IMAGES_LIST } from '../../assets/list';

import { collisions as collisionRule } from '../../configs/rules/etc';
import renders from '../../configs/renderers';

import { GameRule } from '../../configs/rules/types';

export interface IGameObjectConfig {
  pos?: Phaser.Point | [number, number];
  sprite?: [
    IMAGES_LIST,
    [number, number],
    [number, number],
    number?,
    Array<number>?,
    string?,
    boolean?,
    number?
  ];
  size?: number[];
  type: string;
  collisions?: boolean;
  zIndex?: number;
  parameters?: { [key: string]: any };
  rules?: GameRule[];
  conditions?: GameRule[];
  render?: (keyof typeof renders)[] | keyof typeof renders | false;
}

export class GameObject {
  id: string;
  layer: GameLayer;
  pos: Phaser.Point;
  sprite?: Sprite;
  size?: number[];
  type: string;
  shouldCheckCollisions: boolean;
  zIndex: number;

  private collisions?: GameRule;
  private rules: GameRule[];
  private _rulesForInit: IGameObjectConfig['rules'];
  private conditions: GameRule[];
  private _conditionsForInit: IGameObjectConfig['conditions'];
  private renderers: (keyof typeof renders)[] | false;

  parameters: { [key: string]: any };
  readonly defaultParameters: { readonly [key: string]: any };

  constructor(config: IGameObjectConfig & { id: string; layer: GameLayer }) {
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

    if (config.size) {
      this.size = config.size;
    }

    if (config.sprite) {
      this.sprite = new Sprite({
        cache: this.layer.game.cache,
        url: config.sprite[0],
        pos: new Phaser.Point(...config.sprite[1]),
        size: config.sprite[2],
        speed: config.sprite[3],
        frames: config.sprite[4],
        dir: config.sprite[5],
        once: config.sprite[6],
        degree: config.sprite[7],
      });

      this.size = config.size || this.sprite.size;
    } else if (config.size) {
      this.size = config.size;
    }

    this.type = config.type || 'default';

    this.shouldCheckCollisions = Boolean(config.collisions);
    this.zIndex = config.zIndex || 0;
    this.parameters = (config.parameters && { ...config.parameters }) || {};
    this.defaultParameters = { ...this.parameters };

    this.rules = [];
    this.conditions = [];
    this._rulesForInit = config.rules || [];
    this._conditionsForInit = config.conditions || [];

    this.renderers =
      config.render === false
        ? false
        : Array.isArray(config.render)
        ? config.render
        : [config.render || 'sprite'];

    if (this.shouldCheckCollisions) {
      this.collisions = collisionRule;
      this.collisions.init?.(this);
    }
    this._rulesForInit.forEach((rule) => {
      this.addRule(rule);
    });
    this._conditionsForInit.forEach((condition) => {
      this.addCondition(condition);
    });
  }

  render(dt: number) {
    if (this.renderers) {
      this.renderers.forEach((renderer) => renders[renderer](this, dt));
    }
  }

  update(dt: number) {
    this.rules.forEach((rule) => rule.update?.(this, dt));
  }

  updateConditions(dt: number) {
    this.conditions.forEach((condition) => condition.update?.(this, dt));
  }

  updateCollisions(dt: number) {
    this.collisions && this.collisions.update?.(this, dt);
  }

  setPosition(point: Phaser.Point) {
    this.pos.x = point.x;
    this.pos.y = point.y;
  }

  addRule(rule: GameRule) {
    rule.init?.(this);

    this.rules.push(rule);
  }

  addCondition(condition: GameRule) {
    condition.init?.(this);

    this.conditions.push(condition);
  }
}
