import resources from './resources';

function Sprite(url, pos, size, speed, frames, dir, once, degree) {
    this.pos = pos;
    this.defaultPosition = [pos[0], pos[1]];
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
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
        spritePosition = null;

    if (direction.dir == 1) {
        (direction.k >= 1) && (spritePosition = [pos[0], pos[1]]);
        ((direction.k < 1) && (direction.k >= -1)) && (spritePosition = [pos[0], pos[1] + 2 * this.size[1]]);
        (direction.k < -1) && (spritePosition = [pos[0], pos[1] + 3 * this.size[1]]);
    } else if (direction.dir == -1) {
        (direction.k >= 1) && (spritePosition = [pos[0], pos[1] + 3 * this.size[1]]);
        ((direction.k < 1) && (direction.k >= -1)) && (spritePosition = [pos[0], pos[1] + this.size[1]]);
        (direction.k < -1) && (spritePosition = [pos[0], pos[1]]);
    }

    this.updateConfig({
        'pos': spritePosition
    });
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


    var x = this.pos[0];
    var y = this.pos[1];

    if (this.dir == 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }
    ctx.rotate(this.degree);
    ctx.drawImage(resources.get(this.url),
        x, y,
        this.size[0], this.size[1],
        -this.size[0] / 2, -this.size[1] / 2,
        this.size[0], this.size[1]);
};
Sprite.prototype.setdegree = function (degree) {
    this.degree = degree;
};

export default Sprite;