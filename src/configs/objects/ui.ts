import { ObjectTypes } from './constants';
import { ui as uiRender, text as textRender, expBar as expBarRender } from '../renderers';

import type { GameObject, GameObjectConfig, GameRule } from '../../engine';

const bindPositionToMouse: GameRule = {
	update(obj: GameObject) {
		const mousePosition = new Phaser.Point(
			obj.layer.game.input.mousePointer.x,
			obj.layer.game.input.mousePointer.y
		);

		obj.setPosition(mousePosition.clone());
	},
};

export const cursor: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  render: uiRender,
  pos: [400, 350],
  sprite: ['cursor', [0, 0], [30, 30]],
  rules: [bindPositionToMouse],
};


const countMonsterKilled: GameRule = {
	update(obj: GameObject) {
		obj.parameters.text = `SCORE: ${obj.layer.state.parameters.monstersKilled || 0}`;
	},
};

export const counter: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 13],
  render: textRender,
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
  },
  rules: [countMonsterKilled],
};

export const leftOnWaveLabel: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 100],
  render: textRender,
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
  },
};

const levelRule: GameRule = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

		obj.parameters.text =  `LEVEL: ${player.parameters.level}`;
	},
};

export const level: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [35, 45],
  render: expBarRender,
  parameters: {
    weight: 'bold',
    color: '#EFEFEF',
    size: 14,
  },
  rules: [levelRule],
};


const timerRule: GameRule = {
	update(obj: GameObject) {
		obj.parameters.text = `TIMER: ${(obj.layer.state.parameters.gameTimer++ / 60).toFixed(2)}`;
	},
};

export const timer: GameObjectConfig = {
  type: ObjectTypes.UI,
  zIndex: 3000,
  pos: [5, 23],
  render: textRender,
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
  },
  rules: [timerRule],
};

const bestTimeRule: GameRule = {
	init(obj: GameObject) {
		obj.parameters.text = `BEST TIME: ${(obj.layer.state.parameters.bestTime / 60).toFixed(2)}`;
	},
};

export const bestTime: GameObjectConfig = {
  type: ObjectTypes.UI,
  pos: [5, 370],
  zIndex: 3000,
  render: textRender,
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
  },
  rules: [bestTimeRule],
};

const bestScoreRule: GameRule = {
	init(obj: GameObject) {
		obj.parameters.text =`BEST SCORE: ${obj.layer.state.parameters.bestScore}`;
	},
};

export const bestScore: GameObjectConfig = {
  type: ObjectTypes.UI,
  pos: [5, 380],
  zIndex: 3000,
  render: textRender,
  parameters: {
    weight: 'bold',
    color: '#DAA520',
    size: 14,
  },
  rules: [bestScoreRule],
};
