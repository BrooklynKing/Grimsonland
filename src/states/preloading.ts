import Phaser from 'phaser';

class PreLoading extends Phaser.State {
  preload() {
    this.game.stage.backgroundColor = 0x0e0e0e;
    this.game.load.image('loading', '../assets/img/loading.png');
  }
  create() {
    this.game.state.start('loading');
  }
}

export default PreLoading;
