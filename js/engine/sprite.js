import utils from './utils';

function Sprite(cache, url, pos, size, speed, frames, dir, once, degree) {
    this.cache = cache;
    if (pos instanceof utils.Point) {
        this.pos = pos.clone();
    } else {
        this.pos = new utils.Point(pos);
    }
    this.defaultPosition = this.pos.clone();
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = utils.clone(frames);
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.degree = degree || 0;
}


Sprite.prototype.update = function (dt) {
    this._index += this.speed * dt;
};
Sprite.prototype.updateConfig = function (config) {
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
};
Sprite.prototype.rotateToDirection = function (direction) {
    var pos = this.defaultPosition,
        config = {};

    if (direction.dir == 1) {
        ((direction.k < 1) && (direction.k >= -1)) && (config.pos = [pos.x, pos.y]);
        (direction.k >= 1) && (config.pos = [pos.x, pos.y + 2 * this.size[1]]);
        (direction.k < -1) && (config.pos =[pos.x, pos.y + this.size[1]]);
        ( direction.k == 'vertical')  && (config.pos =[pos.x, pos.y + 3 * this.size[1]]);
        ( direction.k == 'horizontal')  && (config.pos =[pos.x, pos.y]);
    } else if (direction.dir == -1) {
        (direction.k >= 1) && (config.pos =[pos.x, pos.y + this.size[1]]);
        ((direction.k < 1) && (direction.k >= -1)) && (config.pos =[pos.x, pos.y + 3 * this.size[1]]);
        (direction.k < -1) && (config.pos = [pos.x, pos.y + 2 * this.size[1]]);
        ( direction.k == 'vertical')  && (config.pos =[pos.x, pos.y]);
        ( direction.k == 'horizontal')  && (config.pos =[pos.x, pos.y + 3 * this.size[1]]);
    }

    config.pos = new utils.Point(config.pos);
    this.updateConfig(config);
};
Sprite.prototype.render = function (ctx) {
    var frame;

    if (this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
            this.done = true;
            return;
        }
    }
    else {
        frame = 0;
    }

    var x = this.pos.x;
    var y = this.pos.y;

    if (this.dir == 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }

    ctx.rotate(this.degree);
    ctx.drawImage(this.cache.getImage(this.url),
        x, y,
        this.size[0], this.size[1],
        Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2),
        this.size[0], this.size[1]);
};
Sprite.prototype.setDegree = function (degree) {
    this.degree = degree;
};

export default Sprite;