import { GameObject } from './object';
import { GameLayer } from './layer';
import { IGameRuleConfig } from '../../configs/rules/types';

export class GameRule {
  private inited: boolean;

  private _update: IGameRuleConfig['update'];
  private _init: IGameRuleConfig['init'];

  constructor(config: IGameRuleConfig) {
    this._update = config.update;
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
