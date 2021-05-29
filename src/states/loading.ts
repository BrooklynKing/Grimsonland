import Phaser from 'phaser';

import { IMAGES, AUDIO } from '../assets/list';

class Loading extends Phaser.State {
  private text!: Phaser.Text;

  preload() {
    this.game.stage.backgroundColor = 0x0e0e0e;

    this.text = this.add.text(460, 250, 'LOADING', {
      fill: '#efefef',
    });

    this.game.load.setPreloadSprite(this.game.add.image(400, 300, 'loading'));

    this.game.load.spritesheet('button', '../assets/img/buttons.png', 293, 54);

    Object.keys(IMAGES).forEach((imageID: string) => {
      this.game.load.image(imageID, IMAGES[imageID as keyof typeof IMAGES]);
    });

    Object.keys(AUDIO).forEach((audioID: string) => {
      this.game.load.audio(audioID, AUDIO[audioID as keyof typeof AUDIO]);
    });
  }

  create() {
    this.text.destroy();
    this.game.state.start('mainMenu');
  }
}

export default Loading;
