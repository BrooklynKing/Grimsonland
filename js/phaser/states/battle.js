import 'phaser-shim';
import collisions from '../../engine/collisions';
import {GameLayer} from '../../engine/objects';

class GameState extends Phaser.State {
    init() {
        this.battleTheme = this.sound.add('battleTheme', 0.3, true);
        this.deathTheme = this.sound.add('deathTheme', 0.3, true);
    }

    create() {
        this.pause = false;

        this.collisions = collisions({
            n: 6,
            width: 1500,
            height: 1200
        });

        this.initGameParameters();
        this.initGameLayer();
        this.initControls();


        this.battleTheme.play();
    }

    initControls() {
        this.restartButton = this.add.button(512, 384, 'button', this.restart, this, 2, 0 , 1, 2);
        this.restartButton.addChild(this.add.text(-65, -15, 'RESTART', {
            fill: '#efefef'
        }));
        this.restartButton.addChild(this.add.text(-70, -70, 'YOU DIED!', {
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
        this.bitmap = this.add.bitmapData(this.game.canvas.width, this.game.canvas.height, 'battleBitmap');

        this.image = this.add.image(0, 0, this.bitmap);

        var layerConfig = {
            id: 'mainLayer',
            size : [1324,1068],
            background: 'terrain',
            initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level','fog', 'monsterController'],
            init: function() {
                this.state.parameters.monstersKilled = 0;
                this.state.parameters.gameTimer = 0;
            },
            translate: {
                x: -150,
                y: -150
            },
            state: state,
            ctx: this.bitmap.ctx,
            rules: ['random_trees' ,'spawn_heart','spawn_powerup', 'goWithPlayer']
        };

        this.layer = new GameLayer(layerConfig);
        this.layer.init();
    }

    showRestartMenu() {
        this.battleTheme.stop();
        this.deathTheme.play();
        this.restartButton.revive();
        this.pause = true;
    }

    prepareForRender() {
        if (this.pause) {
            this.layer.render(0);
            this.bitmap.rect(0, 0, this.game.canvas.width, this.game.canvas.height, 'rgba(10,0,0,0.5)');
        } else {
            this.layer.update(this.game.time.physicsElapsed);
            this.layer.render(this.game.time.physicsElapsed);
        }
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

        this.restartButton.kill();

        this.layer.clearLayer();
        this.layer.init();
    }

    update() {
        this.prepareForRender();
    }

}

export default GameState;