import 'phaser-shim';

class MainMenu extends Phaser.State {
    init() {
        this.menuTheme = this.sound.add('menuTheme', 0.3, true);
    }
    create() {
        var button  = this.add.button(512, 384, 'button', this.startGame, this, 2, 0 , 1, 2);
        var start = this.add.text(0, 3,'START', {
            fill: '#efefef'
        });
        var info = this.add.text(0, -150, 'Moving: WASD\nAim: Mouse\nCast spell: Mouse or Space\nSelect spell: 1,2,3 etc.', {
            fontSize : '14px',
            fill: '#efefef'
        });

        start.anchor.setTo(0.5, 0.5);
        info.anchor.setTo(0.5, 0.5);
        button.anchor.setTo(0.5, 0.5);

        button.addChild(start);
        button.addChild(info);
        this.menuTheme.play();
        //this.sound.play('mainTheme',1, true);
    }
    startGame() {
        this.game.state.start('battle');
    }
    shutdown() {
        this.menuTheme.stop();
    }
}

export default MainMenu;