import 'phaser-shim';
import states from './states/index'

var game = new Phaser.Game(1024, 768, Phaser.CANVAS , 'main', null, false, false);

window.game = game;

game.state.add('preloading', states.preLoading, true);
game.state.add('loading', states.loading);
game.state.add('battle', states.battle);
game.state.add('mainMenu', states.mainMenu);
