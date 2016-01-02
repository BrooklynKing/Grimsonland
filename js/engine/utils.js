function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r >= x2 || x < r2 ||
    b >= y2 || y < b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0] + size[0] / 2, pos[1] + size[1] / 2,
        pos[0] - size[0] / 2, pos[1] - size[1] / 2,
        pos2[0] + size2[0] / 2, pos2[1] + size2[1] / 2,
        pos2[0] - size2[0] / 2, pos2[1] - size2[1] / 2);
}
function getRadians(degree) {
    return degree * Math.PI / 180;
};
function getDegreeBetweenDirections(dir1, dir2){
    if (dir2.k == 'vert') {
        return getDegrees(Math.atan(1 / dir1.k*dir1.dir));
    } else {
        return getDegrees(Math.atan((dir2.k * dir2.dir - dir1.k * dir1.dir) / (1 - dir1.k * dir1.dir * dir2.k * dir2.dir)));
    }
}
function getDegrees(radians) {
    return 180 * radians / Math.PI;
};
function getDegree(point1, point2, prevDegree, speed) {
    var degree = Math.acos(((point2[0] - point1[0])) / Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
    (point1[1] > point2[1]) && (degree = -degree);
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
    var newDegree = Math.acos(((point2[0] - point1[0])) / Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
    newDegree = newDegree * 180 / Math.PI;
    (point1[1] > point2[1]) && (newDegree = 360 - newDegree);
    newDegree += degree;
    (newDegree < 0) && (newDegree += 360);
    (newDegree > 360) && (newDegree -= 360);

    var dir = ((newDegree > 0 && newDegree <= 90) || (newDegree > 270 && newDegree <= 360)) ? 1 : -1;

    var direction = {
        dir: dir,
        k: Math.tan(newDegree * Math.PI / 180)
    };

    return getDestination(point1, direction, Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)));
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

function getDestination(point, line, speed) {
    var x, y;
    if (line.k == 'vert') {
        x = point[0];
        y = point[1] + line.dir * speed;
    } else {
        x = point[0] + line.dir * speed / (Math.sqrt(Math.pow(line.k, 2) + 1));
        y = point[1] + line.dir * speed * line.k / (Math.sqrt(Math.pow(line.k, 2) + 1));
    }
    return [x, y];
}

function getSpeed(start, destination, line) {
    if (line.k == 'vert') {
        return ( destination[1] - start[1] ) / line.dir;
    } else {
        return ( destination[1] - start[1] ) * (Math.sqrt(Math.pow(line.k, 2) + 1)) / line.dir;
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
    return [x, y];
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
    if (obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

export default {
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
    getPointOfInterception,getPointOfInterception,
    getDegreeBetweenDirections: getDegreeBetweenDirections,
    clone: clone,
    'getMovedPointByDegree': getMovedPointByDegree
}