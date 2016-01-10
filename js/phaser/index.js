import 'phaser-shim';
import {GameLayer} from '../engine/objects';
import configs from '../configs/index';
import collisions from '../engine/collisions';

var game = new Phaser.Game(1024, 768, Phaser.HEADLESS , 'main', null, null, false);

for (var i in configs) {
    game[i] = configs[i];
}
class Loading extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;
        this.game.load.spritesheet('hero', './img/mainhero.png', 32, 32);
        this.game.load.spritesheet('fireball', './img/fireballsprite.png', 33, 33);
        this.game.load.spritesheet('button', './img/buttons.png', 293, 54);
        this.game.load.image('bigMonsters', './img/bigMonsters.png');
        this.game.load.image('monsterBlood', './img/sblood.png');
        this.game.load.image('bloodEffect', './img/bloods.png');
        this.game.load.image('cursor', './img/cursor.png');
        this.game.load.image('darkBlast', './img/darkblast.png');
        this.game.load.image('demons', './img/demons.png');
        this.game.load.image('effects', './img/effects.png');
        this.game.load.image('explosions', './img/explosions.png');
        this.game.load.image('fireball', './img/fireballsprite.png');
        this.game.load.image('frostEffect', './img/frosteffect.png');
        this.game.load.image('pumpkin', './img/heart.png');
        this.game.load.image('hero', './img/mainhero.png');
        this.game.load.image('powerUp', './img/powerup2.png');
        this.game.load.image('arcaneGate', './img/spell.png');
        this.game.load.image('spellIcons', './img/spellicons.png');
        this.game.load.image('stone', './img/stones.png');
        this.game.load.image('terrain', './img/terrain.png');
        this.game.load.image('tree', './img/tree.png');
        this.game.load.audio('main', './music/main.mp3');
    }
    create() {
        this.game.state.start('menu');
    }

}

class MainMenu extends Phaser.State {
    create() {
        var button  = this.add.button(512, 384, 'button', this.startGame, this, 2, 0 , 1, 2);
        var text = this.add.text(-45, -15,'START', {
            fill: '#efefef'
        });

        button.anchor.setTo(0.5, 0.5);
        button.addChild(text);

        this.world.mainTheme = this.sound.play('main',1, true);
    }
    startGame() {
        this.game.state.start('game');
    }
}

class GameState extends Phaser.State {
    create() {
        var layerConfig = this.game.getLayerConfig('mainLayer');
        layerConfig.state = this;
        this.pause = false;
        this.collisions = collisions({
            n: 6,
            width: 1024 + 200,
            height: 768 + 200
        });

        this.layer = new GameLayer(layerConfig);
        this.game.parameters = {};
        this.game.parameters.bestTime = localStorage.getItem('bestTime') || 0;
        this.game.parameters.bestScore = localStorage.getItem('bestScore') || 0;
        this.restartButton = this.add.button(512, 384, 'button', this.restart, this, 2, 0 , 1, 2);
        this.restartButton.addChild(this.add.text(-65, -15,'RESTART', {
            fill: '#efefef'
        }));
        this.restartButton.addChild(this.add.text(-70, -70,'YOU DIED!', {
            fill: '#EF0000'
        }));
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.kill();

        this.layer.init();
    }
    showRestartMenu() {
        this.restartButton.revive();
        this.pause = true;
    }
    restart() {
        this.pause = false;
        if (this.game.parameters.gameTimer > this.game.parameters.bestTime) {
            this.game.parameters.bestTime = this.game.parameters.gameTimer;
            localStorage.setItem('bestTime', this.parameters.bestTime);
        }
        if (this.game.parameters.monstersKilled > this.game.parameters.bestScore) {
            this.game.parameters.bestScore = this.game.parameters.monstersKilled;
            localStorage.setItem('bestScore', this.game.parameters.bestScore);
        }
        this.collisions.clear();
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

game.state.add('loading', Loading, true);
game.state.add('game', GameState);
game.state.add('menu', MainMenu);


