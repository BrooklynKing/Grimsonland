import { IMAGES_LIST } from "../assets/list";

import type { Battle } from "../states/battle";

import type { GameObject } from "./object";
import type { GameLayer, OBJECTS_ID } from "./layer";
export type Render = (obj: GameObject, dt: number) => void;

export interface GameRule {
  init?(obj: GameObject | GameLayer): void;
  update?(obj: GameObject | GameLayer, dt: number): void;
}

export interface GameObjectConfig {
  pos?: Phaser.Point | [number, number];
  sprite?: [
    IMAGES_LIST,
    [number, number],
    [number, number],
    number?,
    Array<number>?,
    string?,
    boolean?,
    number?
  ];
  size?: number[];
  type: string;
  collisions?: boolean;
  zIndex?: number;
  parameters?: { [key: string]: any };
  rules?: GameRule[];
  conditions?: GameRule[];
  render: Render[] | Render | false;
}

interface ITranslate {
  x: number;
  y: number;
}

export interface GameLayerConfig {
  id: string;
  background: string;
  state: Battle;
  ctx: CanvasRenderingContext2D;
  initList: OBJECTS_ID[];
  translate: ITranslate;
  rules: GameRule[];
  size: number[];
  init: () => void;
}
