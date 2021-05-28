import Phaser from 'phaser';

import collisions from '../engine/collisions';
import { GameLayer, IGameLayerConfig } from '../engine/core/layer';

import rules from '../configs/rules';
import objects from '../configs/objects';

const LAYER_CONFIG: Omit<IGameLayerConfig, 'ctx' | 'state' | 'init'> = {
  id: 'mainLayer',
  size: [1324, 1068],
  background: 'terrain',
  initList: [
    objects.player,
    objects.cursor,
    objects.counter,
    objects.timer,
    objects.bestTime,
    objects.fireballSpell,
    objects.hellfireSpell,
    objects.frostShardSpell,
    objects.teleportSpell,
    objects.bestScore,
    objects.level,
    objects.fog,
    objects.monsterController,
  ],
  translate: {
    x: -150,
    y: -150,
  },
  rules: [rules.randomTrees, rules.spawnHeart, rules.spawnExp, rules.goWithPlayer],
};

class GameState extends Phaser.State {
  private battleTheme: Phaser.Sound;
  private deathTheme: Phaser.Sound;

  private restartButton: Phaser.Button;

  private bitmap: Phaser.BitmapData;
  private gameLayer: GameLayer;
  collisions: ReturnType<typeof collisions>;

  parameters: {
    bestTime: number;
    gameTimer: number;
    monstersKilled: number;
    bestScore: number;
  };

  private pauseFlag: boolean;

  init() {
    this.battleTheme = this.sound.add('battleTheme', 0.3, true);
    this.deathTheme = this.sound.add('deathTheme', 0.3, true);
  }

  create() {
    this.pauseFlag = false;

    this.collisions = collisions({
      n: 6,
      width: 1500,
      height: 1200,
    });

    this.initGameParameters();
    this.initGameLayer();
    this.initControls();

    this.battleTheme.play();
  }

  initControls() {
    this.restartButton = this.add.button(
      512,
      384,
      'button',
      this.restart,
      this,
      2,
      0,
      1,
      2,
    );

    this.restartButton.addChild(
      this.add.text(-65, -15, 'RESTART', {
        fill: '#efefef',
      }),
    );
    this.restartButton.addChild(
      this.add.text(-70, -70, 'YOU DIED!', {
        fill: '#EF0000',
      }),
    );

    this.restartButton.anchor.setTo(0.5, 0.5);
    this.restartButton.kill();
  }

  initGameParameters() {
    const bestTimeFromStorage = localStorage.getItem('bestTime');
    const bestScoreFromStorage = localStorage.getItem('bestScore');
    this.parameters = {
      monstersKilled: 0,
      gameTimer: 0,
      bestTime: bestTimeFromStorage ? parseInt(bestTimeFromStorage) || 0 : 0,
      bestScore: bestScoreFromStorage ? parseInt(bestScoreFromStorage) || 0 : 0,
    };
  }

  initGameLayer() {
    this.bitmap = this.add.bitmapData(
      this.game.canvas.width,
      this.game.canvas.height,
      'battleBitmap',
    );

    this.add.image(0, 0, this.bitmap);

    this.gameLayer = new GameLayer({
      ...LAYER_CONFIG,
      init: function() {
        this.state.parameters.monstersKilled = 0;
        this.state.parameters.gameTimer = 0;
      },
      state: this,
      ctx: this.bitmap.ctx,
    });
    this.gameLayer.init();
  }

  stopBattle() {
    this.updateBestScores();
    this.battleTheme.stop();
    this.deathTheme.play();
    this.restartButton.revive();
    this.pauseFlag = true;
  }

  updateBestScores() {
    if (this.parameters.gameTimer > this.parameters.bestTime) {
      this.parameters.bestTime = this.parameters.gameTimer;

      localStorage.setItem('bestTime', this.parameters.bestTime.toString());
    }
    if (this.parameters.monstersKilled > this.parameters.bestScore) {
      this.parameters.bestScore = this.parameters.monstersKilled;

      localStorage.setItem('bestScore', this.parameters.bestScore.toString());
    }
  }

  prepareForRender() {
    if (this.pauseFlag === true) {
      this.gameLayer.render(0);
      this.bitmap.rect(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        'rgba(10,0,0,0.5)',
      );
    } else {
      this.gameLayer.update(this.game.time.physicsElapsed);
      this.gameLayer.render(this.game.time.physicsElapsed);
    }
  }

  restart() {
    this.pauseFlag = false;

    this.battleTheme.play();
    this.deathTheme.stop();

    this.collisions.clear();

    this.restartButton.kill();

    this.gameLayer.clearLayer();
    this.gameLayer.init();
  }

  update() {
    this.prepareForRender();
  }
}

export default GameState;
