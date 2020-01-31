const INFO_TEXT =
  ' MOVING: WASD\n AIM: MOUSE\n CAST SPELL: MOUSE CLICK OR SPACE\n SELECT SPELL: 1, 2, 3.';

class MainMenu extends Phaser.State {
  private menuTheme: any;
  private background: any;

  init() {
    this.menuTheme = this.sound.add('menuTheme', 0.3, true);
    this.background = this.game.add.image(512, 768, 'mainmenu');
    this.background.anchor.set(0.5, 1);
    this.background.alpha = 0.8;
  }

  create() {
    this.generateControls();

    this.menuTheme.play();
  }

  generateControls() {
    const button = this.add.button(
      512,
      384,
      'button',
      this.startGame,
      this,
      2,
      0,
      1,
      2,
    );
    const start = this.add.text(0, 3, 'START', {
      fill: '#efefef',
    });
    const info = this.add.text(-300, -300, INFO_TEXT, {
      fontSize: '20px',
      fill: '#efefef',
    });

    start.anchor.setTo(0.5, 0.5);
    info.anchor.setTo(0.5, 0.5);
    button.anchor.setTo(0.5, 0.5);

    button.addChild(start);
    button.addChild(info);
  }

  startGame() {
    this.game.state.start('battle');
  }

  shutdown() {
    this.menuTheme.stop();
  }
}

export default MainMenu;
