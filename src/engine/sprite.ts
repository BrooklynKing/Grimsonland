export interface ISpriteConfig {
  cache: Phaser.Cache;
  url: string;
  pos: Phaser.Point;
  size: [number, number];
  speed: number;
  frames: number[];
  dir: string;
  once: boolean;
  degree: number;
}

class Sprite {
  pos: Phaser.Point;
  size: [number, number];
  done: boolean;

  private speed: number;
  private degree: number;
  private cache: Phaser.Cache;
  private url: string;
  private frames: number[];
  private frameIndex: number;
  private dir: string;
  private once: boolean;
  private defaultPosition: Phaser.Point;

  constructor({
    cache,
    pos,
    size,
    speed,
    frames,
    url,
    dir,
    once,
    degree,
  }: ISpriteConfig) {
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
    this.frameIndex = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.degree = degree || 0;
  }

  update(dt: number) {
    this.frameIndex += this.speed * dt;
  }

  setDegree(degree: number) {
    this.degree = degree;
  }

  setPosition(pos: Phaser.Point) {
    this.pos = pos;
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

    this.setPosition(new Phaser.Point(newPosition[0], newPosition[1]));
  }

  render(ctx: CanvasRenderingContext2D) {
    let frame;
    let x = this.pos.x;
    let y = this.pos.y;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this.frameIndex);

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
