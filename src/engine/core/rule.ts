import { GameObject } from './object';
import { GameLayer } from './layer';

import { clone } from '../utils';

export interface IGameRuleConfig {
  id: string;
  update(obj: GameObject | GameLayer, dt: number): void;
  parameters: { [key: string]: any };
  init(): void;
}

export class GameRule {
  private id: string;
  private parameters: { [key: string]: any };
  private inited: boolean;
  private context: GameObject | GameLayer;

  private _update: (obj: GameObject | GameLayer, dt: number) => void;
  private _init: (obj: GameObject | GameLayer) => void;

  constructor(config: IGameRuleConfig) {
    this.id = config.id;
    this._update = config.update;
    this.parameters = (config.parameters && clone(config.parameters)) || {};
    this._init = config.init;
    this.inited = false;
  }

  init(obj: GameObject | GameLayer) {
    if (!this.inited) {
      this._init && this._init(obj);
      this.inited = true;
    }
  }

  update(obj: GameObject | GameLayer, dt: number) {
    this._update && this._update(obj, dt);
  }
}
