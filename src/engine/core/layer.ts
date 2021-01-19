import { clone } from '../utils';
import gameConfigs from '../../configs';
import { IGameRuleConfig } from '../../configs/rules/types';
import { GameObject, IGameObjectConfig } from './object';
import { GameRule } from './rule';
import BattleState from '../../states/battle';

export interface IGameLayerConfig {
  id: string;
  background: string;
  state: BattleState;
  ctx: CanvasRenderingContext2D;
  initList: string[];
  translate: ITranslate;
  rules: string[];
  size: number[];
  init: () => void;
}

interface ITranslate {
  x: number;
  y: number;
}

export class GameLayer {
  id: string;
  ctx: CanvasRenderingContext2D;
  game: Phaser.Game;
  state: BattleState;
  initList: string[];
  background: CanvasPattern;
  size: number[];
  translate: { x: number; y: number };
  parameters: { [key: string]: any };

  private inited: boolean;

  private config: IGameLayerConfig;

  private objects: { [key: string]: GameObject };
  private sortedObjects: { [key: string]: string[] };
  private rules: GameRule[];
  private objectsToBeRemoved: string[] = [];

  constructor(config: IGameLayerConfig) {
    this.config = config;
    this.id = config.id;
    this.state = config.state;
    this.game = this.state.game;
    this.ctx = config.ctx;
    this.initList = config.initList;

    this.background = this.ctx.createPattern(
      this.game.cache.getImage(config.background),
      'repeat',
    );

    this.size = config.size || [this.ctx.canvas.width, this.ctx.canvas.height];

    this.sortedObjects = {
      default: [],
    };
    this.objects = {};
    this.inited = false;
    this.parameters = {};
  }

  init() {
    if (!this.inited) {
      this.translate = this.config.translate
        ? clone(this.config.translate)
        : { x: 0, y: 0 };
      this.config.initList.forEach(objectID =>
        this.addObject(gameConfigs.getConfig(objectID)),
      );

      this.config.init && this.config.init();

      this.rules = [];
      this.config.rules.forEach(ruleID =>
        this.addRule(gameConfigs.getRuleConfig(ruleID)),
      );

      this.inited = true;
    }
  }

  render(dt: number) {
    if (!this.inited) return;

    const arr: { [key: number]: GameObject[] } = {};
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, this.size[0], this.size[1]);
    ctx.clip();
    ctx.translate(this.translate.x, this.translate.y);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);

    for (let i in this.objects) {
      if (this.objects.hasOwnProperty(i)) {
        arr[this.objects[i].zIndex] || (arr[this.objects[i].zIndex] = []);
        arr[this.objects[i].zIndex].push(this.objects[i]);
      }
    }
    for (let i in arr) {
      if (arr[i]) {
        for (let j = 0, k = arr[i].length; j < k; j++) {
          ctx.save();
          ctx.translate(
            Math.round(arr[i][j].pos.x),
            Math.round(arr[i][j].pos.y),
          );

          arr[i][j].render(dt);

          ctx.restore();
        }
      }
    }
    ctx.translate(-this.translate.x, -this.translate.y);
    ctx.restore();
  }

  update(dt: number) {
    if (!this.inited) return;

    for (let i in this.rules) {
      this.rules.hasOwnProperty(i) && this.rules[i].update(this, dt);
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

    while (this.objectsToBeRemoved.length) {
      const id = this.objectsToBeRemoved.pop();
      const obj = this.objects[id];
      if (obj) {
        obj.shouldCheckCollisions && this.state.collisions.removeObject(obj);
        this.removeObject(id);
      }
    }
  }

  removeObjectOnNextTick(id: string) {
    this.objectsToBeRemoved.push(id);
  }

  addRule(config: IGameRuleConfig) {
    const rule = new GameRule(config);
    rule.init(this);
    this.rules.push(rule);
  }

  removeObject(id: string) {
    if (this.objects.hasOwnProperty(id)) {
      this.objects[id].layer = null;

      this.sortedObjects[this.objects[id].type].splice(
        this.sortedObjects[this.objects[id].type].indexOf(id),
        1,
      );

      this.objects[id] = null;

      delete this.objects[id];
    }
  }

  addObject(config: IGameObjectConfig) {
    config.layer = this;
    config.id += Math.round(new Date().getTime() + Math.random() * 1000001);

    const obj = new GameObject(config);
    obj.init();

    if (config.type && config.type !== 'default') {
      !this.sortedObjects[config.type] &&
        (this.sortedObjects[config.type] = []);
      this.sortedObjects[config.type].push(obj.id);
    } else {
      this.sortedObjects['default'].push(obj.id);
    }

    this.objects[obj.id] = obj;

    return this.objects[obj.id];
  }

  getObjectsByType(type: string) {
    const objectsId = this.sortedObjects[type] || [];
    const result = [];

    for (let i = 0, l = objectsId.length; i < l; i++) {
      result.push(this.objects[objectsId[i]]);
    }
    return result;
  }

  clearLayer() {
    this.objects = {};

    this.sortedObjects = {
      default: [],
    };

    this.rules = [];

    this.inited = false;
  }
}
