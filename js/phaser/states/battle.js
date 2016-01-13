import 'phaser-shim';
import collisions from '../../engine/collisions';
import {GameLayer} from '../../engine/objects';

class GameState extends Phaser.State {
    init() {
        this.battleTheme = this.sound.add('battleTheme', 0.3, true);
        this.deathTheme = this.sound.add('deathTheme', 0.3, true);
        this.background = this.game.add.image(512, 768, 'deathmenu');
        this.background.anchor.set(0.5, 1);
        this.background.alpha = 0.5;
        this.background.kill();
    }
    create() {
        this.pause = false;

        this.collisions = collisions({
            n: 6,
            width: 1024 + 200,
            height: 768 + 200
        });

        this.battleTheme.play();

        this.initGameParameters();
        this.initControls();
        this.initGameLayer();
    }
    initControls() {
        this.restartButton = this.add.button(512, 384, 'button', this.restart, this, 2, 0 , 1, 2);
        this.restartButton.addChild(this.add.text(-65, -15,'RESTART', {
            fill: '#efefef'
        }));
        this.restartButton.addChild(this.add.text(-70, -70,'YOU DIED!', {
            fill: '#EF0000'
        }));
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.kill();
    }
    initGameParameters() {
        this.parameters = {};
        this.parameters.bestTime = localStorage.getItem('bestTime') || 0;
        this.parameters.bestScore = localStorage.getItem('bestScore') || 0;
    }
    initGameLayer() {
        var layerConfig = gameConfigs.getLayerConfig('mainLayer');
        layerConfig.state = this;

        this.layer = new GameLayer(layerConfig);
        this.layer.init();
    }
    showRestartMenu() {
        this.battleTheme.stop();
        this.deathTheme.play();
        this.background.revive();
        this.restartButton.revive();
        this.pause = true;
    }
    restart() {
        this.pause = false;
        this.battleTheme.play();
        this.deathTheme.stop();
        if (this.parameters.gameTimer > this.parameters.bestTime) {
            this.parameters.bestTime = this.parameters.gameTimer;
            localStorage.setItem('bestTime', this.parameters.bestTime);
        }
        if (this.parameters.monstersKilled > this.parameters.bestScore) {
            this.parameters.bestScore = this.parameters.monstersKilled;
            localStorage.setItem('bestScore', this.parameters.bestScore);
        }
        this.collisions.clear();
        this.background.kill();
        this.restartButton.kill();
        this.layer.clearLayer();
        this.layer.init();
    }
    update() {
        (!this.pause) && this.layer.update(this.game.time.physicsElapsed);
    }
    render() {
        super.render();
        (!this.pause) && this.layer.render(this.game.time.physicsElapsed);
    }
}

export default GameState;