import 'phaser-shim';

class Loading extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;

        this.text = this.add.text(460, 250,'LOADING', {
            fill: '#efefef'
        });

        this.game.load.setPreloadSprite(this.game.add.image(400, 300, 'loading'));

        this.game.load.spritesheet('button', './img/buttons.png', 293, 54);

        this.game.load.image('mainmenu', './img/mainmenu.jpeg');
        this.game.load.image('deathmenu', './img/deathbackground.jpg');

        this.game.load.image('bigMonsters', './img/bigMonsters.png');
        this.game.load.image('boss', './img/boss.png');
        this.game.load.image('bossSpell', './img/bossSpell.png');
        this.game.load.image('monsterBlood', './img/sblood.png');
        this.game.load.image('bloodEffect', './img/bloods.png');
        this.game.load.image('cursor', './img/cursor.png');
        this.game.load.image('darkblast', './img/darkblast.png');
        this.game.load.image('demons', './img/demons.png');
        this.game.load.image('effects', './img/effects.png');
        this.game.load.image('explosions', './img/explosions.png');
        this.game.load.image('fireball', './img/fireballsprite.png');
        this.game.load.image('frostEffect', './img/frosteffect.png');
        this.game.load.image('pumpkin', './img/heart.png');
        this.game.load.image('hero', './img/mainhero.png');
        this.game.load.image('demons2', './img/demons2.png');
        this.game.load.image('powerUp', './img/powerup2.png');
        this.game.load.image('arcaneGate', './img/spell.png');
        this.game.load.image('spellIcons', './img/spellicons.png');
        this.game.load.image('stone', './img/stones.png');
        this.game.load.image('terrain', './img/terrain3.png');
        this.game.load.image('tree1', './img/tree1.png');
        this.game.load.image('tree2', './img/tree2.png');

        this.game.load.audio('menuTheme', './music/menu.mp3');
        this.game.load.audio('deathTheme', './music/death.mp3');
        this.game.load.audio('battleTheme', './music/battle.mp3');
    }
    create() {
        this.text.destroy();
        this.game.state.start('mainMenu');
    }

}

export default Loading;