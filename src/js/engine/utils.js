function moveWithSpeed(point, destination, speed) {
    if (!point || !destination) {
        return null;
    }

    const _destination = destination.clone().normalize().multiply(speed, speed);

    return Phaser.Point.add(point, _destination);
}


function clone(obj) {
    (!obj) && (obj = {});
    
    return JSON.parse(JSON.stringify(obj));
}

export default {
    clone: clone,
    moveWithSpeed: moveWithSpeed
}