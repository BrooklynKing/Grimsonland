declare namespace Phaser {
  class State {
    game: any;
    add: any;
    sound: any;
  }
  class Game {
    constructor(...any: any);
    state: State;
  }
  const CANVAS: CanvasRenderingContext2D;
  class Rectangle {
    constructor(...any: any);
    randomX: number;
    randomY: number;
  }
  class Point {
    constructor(...any: any);
    static add: any;
    static subtract: any;
    static distance: any;
    x: number;
    y: number;
    clone(): Point;
    rotate: any;
    angle(point: Point, flag: boolean): number;
  }
}

declare module 'string-template';
