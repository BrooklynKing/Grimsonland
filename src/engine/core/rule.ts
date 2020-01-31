import GameObject from './object';
import GameLayer from './layer';

import utils from '../utils';

export default class GameRule {
  private id: string;
  private _update: (dt: number) => void;
  private _init: () => void;
  private parameters: any;
  private inited: boolean;
  private context: GameObject | GameLayer;

  constructor(config: {
    id: string;
    update(dt: number): void;
    parameters: any;
    init(): void;
  }) {
    this.id = config.id;
    this._update = config.update;
    this.parameters =
      (config.parameters && utils.clone(config.parameters)) || {};
    this._init = config.init;
    this.inited = false;
  }

  init() {
    if (!this.inited) {
      this._init && this._init();
      this.inited = true;
    }
  }

  update(dt: number) {
    this._update && this._update(dt);
  }

  setContext(context: GameObject | GameLayer) {
    this.context = context;
  }
}
