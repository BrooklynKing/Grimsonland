import utils from './utils';

class Sprite {
    cache: any;
    url: string;
    pos: Phaser.Point;
    size: Array<number>;
    speed: number;
    frames: Array<number>;
    dir: string;
    once: boolean;
    done: boolean;
    degree: number;

    private _defaultPosition: Phaser.Point;
    private _index: number;

    constructor(cache, url, pos, size, speed, frames, dir, once, degree) {
        this.cache = cache;
        if (pos instanceof Phaser.Point) {
            this.pos = pos.clone();
        } else {
            this.pos = new Phaser.Point(pos[0], pos[1]);
        }
        this._defaultPosition = this.pos.clone();
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = utils.clone(frames);
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.done = false;
        this.degree = degree || 0;
    }

    update(dt:number):void {
        this._index += this.speed * dt;
    }

    updateConfig(config:any):void {
        if (config) {
            config.pos && (this.pos = config.pos);
            config.size && (this.size = config.size);
            config.speed && (this.speed = typeof config.speed === 'number' ? config.speed : 0);
            config.frames && (this.frames = config.frames);
            config.url && (this.url = config.url);
            config.dir && (this.dir = config.dir);
            config.once && (this.once = config.once);
            config.degree && (this.degree = config.degree);
        }
    }

    rotateToDirection(direction: Phaser.Point):void {
        var pos:any = this._defaultPosition;
        var config:any = {};
        var angle:number = direction.angle(new Phaser.Point(0, 0), true);

        if (angle > 135 || angle < -135) {
            config.pos = [pos.x, pos.y + 2 * this.size[1]]
        } else if (angle < 135 && angle > 45) {
            config.pos = [pos.x, pos.y + 3 * this.size[1]]
        } else if (angle < 45 && angle > -45) {
            config.pos = [pos.x, pos.y + this.size[1]]
        } else {
            config.pos = [pos.x, pos.y]
        }

        config.pos = new Phaser.Point(config.pos[0], config.pos[1]);

        this.updateConfig(config);
    }

    render(ctx:CanvasRenderingContext2D):void {
        var frame;
        var x = this.pos.x;
        var y = this.pos.y;

        if (this.speed > 0) {
            var max = this.frames.length;
            var idx = Math.floor(this._index);

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
        }
        else {
            x += frame * this.size[0];
        }

        ctx.rotate(this.degree);
        ctx.drawImage(
            this.cache.getImage(this.url),
            x, y,
            this.size[0], this.size[1],
            Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2),
            this.size[0], this.size[1]
        );
    }

    setDegree(degree: number):void {
        this.degree = degree;
    }
}

export default Sprite;