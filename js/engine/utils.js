var Victor = require('victor');

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
        _vector = new Victor(vector.x - point.x, vector.y - point.y);
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
    console.log('PISYUN KOZIA');

    return new Point(x, y);
};

function getRadians(degree) {
    return degree * Math.PI / 180;
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

function clone(obj) {
    (!obj) && (obj = {});
    return JSON.parse(JSON.stringify(obj));
}

export default {
    clone: clone,
    Line : Line,
    Point : Point,
    getRadians: getRadians,
    getDegree: getDegree,
    getDestination: getDestination,
    getDegrees: getDegrees,
    getDistance : getDistance,
    getMovedPointByDegree: getMovedPointByDegree
}