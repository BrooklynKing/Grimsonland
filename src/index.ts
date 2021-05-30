import Phaser from 'phaser';

import { PreLoading, Loading, Battle, MainMenu } from './states';

const game = new Phaser.Game(
  1024,
  768,
  Phaser.CANVAS,
  'main',
  PreLoading,
  false,
  false,
);

game.state.add('Loading', Loading);
game.state.add('Battle', Battle);
game.state.add('MainMenu', MainMenu);

window.game = game;