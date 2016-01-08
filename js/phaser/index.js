import 'phaser-shim';
import GameWindow from '../engine/objects';
import collisions from '../engine/collisions';

var game = new Phaser.Game(1024, 768, Phaser.HEADLESS , 'main', null, null, false);
var _configs = configs.default;
var _engine = engine.default;

class Loading extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;
        this.game.load.spritesheet('hero', '/img/mainhero.png', 32, 32);
        this.game.load.spritesheet('fireball', '/img/fireballsprite.png', 33, 33);
        this.game.load.spritesheet('explosions', '/img/explosions1.png', 39, 39);
        this.game.load.image('bigMonsters', '/img/bigMonsters.png');

        this.game.load.image('monsterBlood', '/img/sblood.png');
        this.game.load.image('bloodEffect', '/img/bloods.png');
        this.game.load.image('cursor', '/img/cursor.png');
        this.game.load.image('darkBlast', '/img/darkblast.png');
        this.game.load.image('demons', '/img/demons.png');
        this.game.load.image('effects', '/img/effects.png');
        this.game.load.image('explosions', '/img/explosions.png');
        this.game.load.image('fireball', '/img/fireballsprite.png');
        this.game.load.image('frostEffect', '/img/frosteffect.png');
        this.game.load.image('pumpkin', '/img/heart.png');
        this.game.load.image('hero', '/img/mainhero.png');
        this.game.load.image('powerUp', '/img/powerup2.png');
        this.game.load.image('arcaneGate', '/img/spell.png');
        this.game.load.image('spellIcons', '/img/spellIcons.png');
        this.game.load.image('stone', '/img/stones.png');
        this.game.load.image('terrain', '/img/terrain.png');
        this.game.load.image('tree', '/img/tree.png');
        this.game.load.audio('main', '/music/main.mp3');
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

        var ctx = game.canvas.getContext("2d");
        var _collisions = collisions({
            n: 6,
            width: 1024 + 200,
            height: 768 + 200
        });

        this._game = new GameWindow({
            cache: game.cache,
            canvas: game.canvas,
            collisions: _collisions,
            ctx: ctx,
            input: game.input.keyboard,
            mouse: game.input.mousePointer,
            objects: _configs.objects,
            rules: _configs.rules,
            layers: _configs.layers,
            resources: _configs.resources
        });
    }
    startGame() {
        this.game.state.start('game');
    }
}

class GameState extends Phaser.State {
    create() {
        var game = this._game;
        var mainLayer = game.addLayer(this.getLayerConfig('mainLayer'));
        game.parameters.bestTime = localStorage.getItem('bestTime') || 0;
        game.parameters.bestScore = localStorage.getItem('bestScore') || 0;
        mainLayer.init();
        game.bindGlobalEvent('player_dead', function() {
            if (game.parameters.gameTimer > game.parameters.bestTime) {
                game.parameters.bestTime = game.parameters.gameTimer;
                localStorage.setItem('bestTime', game.parameters.bestTime);
            }
            if (game.parameters.monstersKilled > game.parameters.bestScore) {
                game.parameters.bestScore = game.parameters.monstersKilled;
                localStorage.setItem('bestScore', game.parameters.bestScore);
            }
            game.collisions.clear();
            mainLayer.clearLayer();
            mainLayer.init();
        });
    }
    update() {
        this._game.update((game.time.now - game.time.prevTime) / 1000);
    }
    render() {
        this._game.render((game.time.now - game.time.prevTime) / 1000);
    }
}

game.state.add('loading', Loading, true);
game.state.add('game', GameState);
game.state.add('menu', MainMenu);


