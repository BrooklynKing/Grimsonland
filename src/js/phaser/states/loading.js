class Loading extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;

        this.text = this.add.text(460, 250,'LOADING', {
            fill: '#efefef'
        });

        this.game.load.setPreloadSprite(this.game.add.image(400, 300, 'loading'));

        this.game.load.spritesheet('button', './assets/img/buttons.png', 293, 54);

        this.game.load.image('mainmenu', './assets/img/mainmenu.jpeg');
        this.game.load.image('deathmenu', './assets/img/deathbackground.jpg');
        this.game.load.image('bigMonsters', './assets/img/bigMonsters.png');
        this.game.load.image('boss', './assets/img/boss.png');
        this.game.load.image('bossSpell', './assets/img/bossSpell.png');
        this.game.load.image('monsterBlood', './assets/img/sblood.png');
        this.game.load.image('bloodEffect', './assets/img/bloods.png');
        this.game.load.image('cursor', './assets/img/cursor.png');
        this.game.load.image('darkblast', './assets/img/darkblast.png');
        this.game.load.image('demons', './assets/img/demons.png');
        this.game.load.image('effects', './assets/img/effects.png');
        this.game.load.image('explosions', './assets/img/explosions.png');
        this.game.load.image('fireball', './assets/img/fireballsprite.png');
        this.game.load.image('hellfire', './assets/img/hellfire.png');
        this.game.load.image('frostEffect', './assets/img/frosteffect.png');
        this.game.load.image('pumpkin', './assets/img/heart.png');
        this.game.load.image('hero', './assets/img/mainhero.png');
        this.game.load.image('powerUp', './assets/img/powerup2.png');
        this.game.load.image('arcaneGate', './assets/img/spell.png');
        this.game.load.image('spellIcons', './assets/img/spellicons.png');
        this.game.load.image('stone', './assets/img/stones.png');
        this.game.load.image('terrain', './assets/img/terrain.png');
        this.game.load.image('tree1', './assets/img/tree1.png');
        this.game.load.image('tree2', './assets/img/tree2.png');

        this.game.load.audio('menuTheme', './assets/music/menu.mp3');
        this.game.load.audio('deathTheme', './assets/music/death.mp3');
        this.game.load.audio('battleTheme', './assets/music/battle.mp3');
    }

    create() {
        this.text.destroy();
        this.game.state.start('mainMenu');
    }

}

export default Loading;