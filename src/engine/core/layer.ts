import { GameRule } from '../../configs/rules/types';
import { GameObject, IGameObjectConfig } from './object';

import { objectConfigs, OBJECTS_ID, ObjectTypes } from '../../configs/objects';

import BattleState from '../../states/battle';

export interface IGameLayerConfig {
  id: string;
  background: string;
  state: BattleState;
  ctx: CanvasRenderingContext2D;
  initList: OBJECTS_ID[];
  translate: ITranslate;
  rules: GameRule[];
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

    this.background = this.ctx.createPattern(
      this.game.cache.getImage(config.background),
      'repeat'
    ) as CanvasPattern;

    this.size = config.size || [this.ctx.canvas.width, this.ctx.canvas.height];

    this.sortedObjects = {
      default: [],
    };
    this.objects = {};
    this.inited = false;
    this.parameters = {};
    this.rules = config.rules || [];
    this.translate = config.translate
      ? { ...config.translate }
      : { x: 0, y: 0 };
  }

  init() {
    if (!this.inited) {
      this.config.initList.forEach((objectID) => this.addObjectByID(objectID));

      this.config.init && this.config.init();

      this.rules.forEach((rule) => rule.init?.(this));

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
            Math.round(arr[i][j].pos.y)
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
      this.rules[i].update?.(this, dt);
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
      if (!id) {
        return;
      }

      const obj = this.objects[id];
      if (obj) {
        obj.shouldCheckCollisions && this.state.collisions.removeObject(obj!);
        this.removeObject(id!);
      }
    }

    Object.keys(this.sortedObjects).forEach((type: string) => {
      const sortedObjectsByType = this.sortedObjects[type];
      const existingObjects: string[] = [];
      sortedObjectsByType.forEach((id: string) => {
        if (this.objects[id]) {
          existingObjects.push(id);
        }
      });
      this.sortedObjects[type] = existingObjects;
    });
  }

  removeObjectOnNextTick(id: string) {
    this.objectsToBeRemoved.push(id);
  }

  addRule(rule: GameRule) {
    rule.init?.(this);
    this.rules.push(rule);
  }

  removeObject(id: string) {
    if (this.objects.hasOwnProperty(id)) {
      delete this.objects[id];
    }
  }

  private addObject(id: OBJECTS_ID, config: IGameObjectConfig) {
    const obj = new GameObject({
      ...config,
      layer: this,
      id: `${id}-${Math.round(
        new Date().getTime() + Math.random() * 1000001
      ).toString()}`,
    });

    const type = config.type || 'default';

    this.sortedObjects[type] = this.sortedObjects[type] || [];
    this.sortedObjects[type].push(obj.id);

    this.objects[obj.id] = obj;

    return this.objects[obj.id];
  }

  addObjectByID(id: OBJECTS_ID) {
    const config = objectConfigs[id];
    return this.addObject(id, config);
  }

  getObjectsByType(type: ObjectTypes) {
    const objectsId = this.sortedObjects[type] || [];
    const result: GameObject[] = [];

    objectsId.forEach((id) => {
      if (this.objects[id]) {
        result.push(this.objects[id]);
      }
    });

    return result;
  }

  getObjectByID(id: OBJECTS_ID) {
    return this.objects[id];
  }

  clearLayer() {
    this.objects = {};

    this.sortedObjects = {
      default: [],
    };
    this.parameters = {};
    this.inited = false;
  }
}
