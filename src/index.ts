import states from './states';

const game = new Phaser.Game(
  1024,
  768,
  Phaser.CANVAS,
  'main',
  null,
  false,
  false,
);

(window as any).game = game;

game.state.add('preloading', states.preLoading, true);
game.state.add('loading', states.loading);
game.state.add('battle', states.battle);
game.state.add('mainMenu', states.mainMenu);
