import 'phaser-shim';

class PreLoading extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;
        this.game.load.image('loading', './img/loading.png');
    }
    create() {
        this.game.state.start('loading');
    }
}

export default PreLoading;