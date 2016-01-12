var Victor = require('victor');

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r >= x2 || x < r2 ||
    b >= y2 || y < b2);
}

function Point(x, y) {
    if (Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
    } else {
        this.x = x;
        this.y = y;
    }
}

Point.prototype.clone = function() {
    return new Point(this.x, this.y);
};

function Line(point, vector){
    var _vector = vector;

    if (vector instanceof Point) {
        _vector = getVectorByTwoPoints(point, vector);
    }
    if (_vector.x != 0 && _vector.y != 0) {
        this.k = (_vector.x / _vector.y);
        this.b = (point.x - _vector.x * point.y / _vector.y);
        this.dir = (_vector.y >= 0) ? 1 : -1;
    } else if (_vector.x == 0) {
        this.k = 'vertical';
        this.b = _vector.x;
        this.dir = (_vector.y >= 0) ? 1 : -1;
    } else {
        this.k = 'horizontal';
        this.b = _vector.y;
        this.dir = (_vector.x >= 0) ? 1 : -1;
    }
    this.vector = _vector
}

Line.prototype.getDestination = function(point, speed) {
    var x, y;

    if (this.k == 'vertical') {
        x = point.x;
        y = point.y + this.dir * speed;
    } else if (this.k == 'horizontal') {
        x = point.x + this.dir * speed;
        y = point.y;
    }else {
        x = point.x + this.dir * speed * this.k / (Math.sqrt(Math.pow(this.k, 2) + 1));
        y = point.y + this.dir * speed / (Math.sqrt(Math.pow(this.k, 2) + 1));
    }
    return new Point(x, y);
};

function getVectorByTwoPoints(point1, point2) {
    return new Victor(point2.x - point1.x, point2.y - point1.y);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos.x + size[0] / 2, pos.y + size[1] / 2,
        pos.x  - size[0] / 2, pos.y  - size[1] / 2,
        pos2.x  + size2[0] / 2, pos2.y  + size2[1] / 2,
        pos2.x  - size2[0] / 2, pos2.y  - size2[1] / 2);
}

function getRadians(degree) {
    return degree * Math.PI / 180;
}

function getDegreeBetweenDirections(dir1, dir2){
    if (dir2.k == 'vert') {
        return getDegrees(Math.atan(1 / dir1.k*dir1.dir));
    } else {
        return getDegrees(Math.atan((dir2.k * dir2.dir - dir1.k * dir1.dir) / (1 - dir1.k * dir1.dir * dir2.k * dir2.dir)));
    }
}

function getDegrees(radians) {
    return 180 * radians / Math.PI;
}

function getDegree(point1, point2, prevDegree, speed) {
    var degree = Math.acos(((point2.x - point1.x)) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
    (point1.y > point2.y) && (degree = -degree);
    if (degree == prevDegree) {
        return [degree, 0];
    } else if (((degree < 0 && prevDegree > 0) || (degree > 0 && prevDegree < 0)) && (Math.abs(prevDegree - degree) > Math.PI)) {
        var degreeWithSpeed = ((prevDegree > 0) ? prevDegree + speed : prevDegree - speed);
        if (degreeWithSpeed > Math.PI) {
            degreeWithSpeed = -Math.PI + (degreeWithSpeed - Math.PI);
        } else if (degreeWithSpeed < -Math.PI) {
            degreeWithSpeed = Math.PI + (degreeWithSpeed + Math.PI);
        }
        return [degreeWithSpeed, Math.pow(Math.PI, 2) - Math.abs(prevDegree - degree)];
    } else {
        return [(Math.abs(prevDegree - degree) > speed) ? ((prevDegree > degree) ? prevDegree - speed : prevDegree + speed) : degree, Math.abs(prevDegree - degree)];
    }

}

function getMovedPointByDegree(point1, point2, degree) {
    var newDegree = Math.acos(((point2.x - point1.x)) / Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));

    newDegree = newDegree * 180 / Math.PI;
    (point1.y > point2.y) && (newDegree = 360 - newDegree);
    newDegree += degree;
    (newDegree < 0) && (newDegree += 360);
    (newDegree > 360) && (newDegree -= 360);

    var dir = ((newDegree > 0 && newDegree <= 90) || (newDegree > 270 && newDegree <= 360)) ? 1 : -1;

    var direction = {
        dir: dir,
        k: Math.tan(newDegree * Math.PI / 180)
    };

    return getDestination(point1, direction, Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)));
}

function getDirection(point1, point2) {
    var k, b, dir;

    if (point1[0] == point2[0]) {
        k = 'vert';
        b = point2[0];
        dir = (point2[1] >= point1[1]) ? 1 : -1;
    } else {
        k = (point2[1] - point1[1]) / (point2[0] - point1[0]);
        b = point1[1] - point1[0] * k;
        dir = (point2[0] >= point1[0]) ? 1 : -1;
    }
    return {
        'k': k,
        'b': b,
        'dir': dir
    }
}

function getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x,2) + Math.pow(point1.y - point2.y,2))
}

function getDestination(point, line, speed) {
    var x, y;
    if (line.k == 'vert') {
        x = point.x;
        y = point.y + line.dir * speed;
    } else {
        x = point.x + line.dir * speed / (Math.sqrt(Math.pow(line.k, 2) + 1));
        y = point.y + line.dir * speed * line.k / (Math.sqrt(Math.pow(line.k, 2) + 1));
    }
    return new Point(x, y);
}

function getSpeed(start, destination, line) {
    if (line.k == 'vert') {
        return ( destination.y - start.y ) / line.dir;
    } else {
        return ( destination.y - start.y ) * (Math.sqrt(Math.pow(line.k, 2) + 1)) /(line.dir * line.k);
    }
}

function ellipse(context, cx, cy, rx, ry, rot, aStart, aEnd){
    context.save();
    context.translate(cx, cy);
    context.rotate(rot);
    context.translate(-rx, -ry);

    context.scale(rx, ry);
    context.arc(1, 1, 1, aStart, aEnd, false);
    context.restore();
}

function nextPosition(point1, point2/*, speed, dt*/) {
    var deltax = Math.abs(point2[0] - point1[0]),
        deltay = Math.abs(point2[1] - point1[1]),
        error = 0,
        deltaerr = (deltax > deltay) ? deltay : deltax,
        y = point1[1],
        x = point1[0];

    if (deltax > deltay) {
        (point1[0] > point2[0]) ? x-- : x++;
        error = error + deltaerr;
        if (2 * error >= deltax) {
            y = (point1[1] > point2[1]) ? y - 1 : y + 1;
        }
    } else {
        (point1[1] > point2[1]) ? y-- : y++;
        error = error + deltaerr;
        if (2 * error >= deltay) {
            x = (point1[0] > point2[0]) ? x - 1 : x + 1;
        }

    }
    return new Point(x, y);
}

function getPointOfInterception(direction1, direction2) {
    var x, y;

    if (direction2.k == 'vert') {
        x = direction2.b;
        y = direction1.k * direction1.dir * x + direction1.b;
    } else {
        x = (direction2.b - direction1.b) / (direction1.dir * direction1.k - direction2.dir * direction2.k);
        y = direction1.k * direction1.dir * x + direction1.b;
    }

    return [x, y];
}

function clone(obj) {
    (!obj) && (obj = {});
    return JSON.parse(JSON.stringify(obj));
}

export default {
    Line : Line,
    Point : Point,
    ellipse: ellipse,
    getRadians: getRadians,
    'collides': collides,
    'boxCollides': boxCollides,
    'getDegree': getDegree,
    'nextPosition': nextPosition,
    getSpeed: getSpeed,
    'getDestination': getDestination,
    'getDirection': getDirection,
    getDegrees: getDegrees,
    getDistance : getDistance,
    getPointOfInterception,getPointOfInterception,
    getDegreeBetweenDirections: getDegreeBetweenDirections,
    clone: clone,
    'getMovedPointByDegree': getMovedPointByDegree
}