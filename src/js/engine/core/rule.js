import utils from '../utils';


export default class GameRule {
  constructor(config) {
    this.id = config.id;
    this._update = config.update;
    this.parameters = (config.parameters && utils.clone(config.parameters)) || {};
    this._init = config.init;
    this.inited = false;
  }

  init() {
    if (!this.inited) {
      this._init && this._init();
      this.inited = true;
    }
  };

  update(dt) {
    this._update && this._update(dt);
  };

  setContext(context) {
    this.context = context;
  };
}
