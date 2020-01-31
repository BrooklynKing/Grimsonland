import utils from './utils';

class Sprite {
  private cache: any;
  private url: string;
  pos: Phaser.Point;
  size: [number, number];
  speed: number;
  private frames: number[];
  private _index: number;
  private dir: string;
  private once: boolean;
  degree: number;
  private defaultPosition: Phaser.Point;
  done: boolean;

  constructor(
    cache: any,
    url: string,
    pos: Phaser.Point,
    size: [number, number],
    speed: number,
    frames: number[],
    dir: string,
    once: boolean,
    degree: number,
  ) {
    this.cache = cache;
    if (pos instanceof Phaser.Point) {
      this.pos = pos.clone();
    } else {
      this.pos = new Phaser.Point(pos[0], pos[1]);
    }
    this.defaultPosition = this.pos.clone();
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.degree = degree || 0;
  }

  update(dt: number) {
    this._index += this.speed * dt;
  }

  setDegree(degree: number) {
    this.degree = degree;
  }

  updateConfig(config: any) {
    if (config) {
      config.pos && (this.pos = config.pos);
      config.size && (this.size = config.size);
      config.speed &&
        (this.speed = typeof config.speed === 'number' ? config.speed : 0);
      config.frames && (this.frames = config.frames);
      config.url && (this.url = config.url);
      config.dir && (this.dir = config.dir);
      config.once && (this.once = config.once);
      config.degree && (this.degree = config.degree);
    }
  }

  rotateToDirection(direction: Phaser.Point) {
    const pos = this.defaultPosition;
    let newPosition;
    const angle = direction.angle(new Phaser.Point(0, 0), true);

    if (angle > 135 || angle < -135) {
      newPosition = [pos.x, pos.y + 2 * this.size[1]];
    } else if (angle < 135 && angle > 45) {
      newPosition = [pos.x, pos.y + 3 * this.size[1]];
    } else if (angle < 45 && angle > -45) {
      newPosition = [pos.x, pos.y + this.size[1]];
    } else {
      newPosition = [pos.x, pos.y];
    }

    this.updateConfig({
      pos: new Phaser.Point(newPosition[0], newPosition[1]),
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    let frame;
    let x = this.pos.x;
    let y = this.pos.y;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this._index);

      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    if (this.dir === 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    ctx.rotate(this.degree);
    ctx.drawImage(
      this.cache.getImage(this.url),
      x,
      y,
      this.size[0],
      this.size[1],
      Math.round(-this.size[0] / 2),
      Math.round(-this.size[1] / 2),
      this.size[0],
      this.size[1],
    );
  }
}

export default Sprite;
