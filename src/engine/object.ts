import { Sprite } from './sprite';

import type { GameObjectConfig, GameRule, Render } from './types';
import type { GameLayer } from './layer';

export class GameObject {
  id: string;
  layer: GameLayer;
  pos: Phaser.Point;
  sprite?: Sprite;
  size?: number[];
  type: string;
  zIndex: number;
  shouldCheckCollisions: boolean;
  collisions: {
    objects: GameObject[];
    cells: any[];
  };
  private rules: GameRule[];
  private conditions: GameRule[];
  private renderers: Render[];

  parameters: { [key: string]: any };
  readonly defaultParameters: { readonly [key: string]: any };

  constructor(config: GameObjectConfig & { id: string; layer: GameLayer }) {
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

    this.zIndex = config.zIndex || 0;
    this.parameters = (config.parameters && { ...config.parameters }) || {};
    this.defaultParameters = { ...this.parameters };

    this.renderers = config.render
      ? Array.isArray(config.render)
        ? config.render
        : [config.render]
      : [];

    this.rules = [];
    const rulesForInit = config.rules || [];
    rulesForInit.forEach((rule) => {
      this.addRule(rule);
    });

    this.conditions = [];
    const conditionsForInit = config.conditions || [];
    conditionsForInit.forEach((condition) => {
      this.addCondition(condition);
    });

    this.collisions = {
      objects: [],
      cells: [],
    };
    this.shouldCheckCollisions = Boolean(config.collisions);

    if (this.shouldCheckCollisions) {
      this.layer.state.collisions.updateObject(this);
    }
  }

  render(dt: number) {
    this.renderers.forEach((renderer) => renderer(this, dt));
  }

  update(dt: number) {
    this.rules.forEach((rule) => rule.update?.(this, dt));
  }

  updateConditions(dt: number) {
    this.conditions.forEach((condition) => condition.update?.(this, dt));
  }

  updateCollisions() {
    if (this.shouldCheckCollisions) {
      this.collisions.objects = [];
      this.layer.state.collisions.updateObject(this);
    }
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
