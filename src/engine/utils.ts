import Phaser from 'phaser';

export function moveWithSpeed(
  point: Phaser.Point,
  destination: any,
  speed: number,
) {
  if (!point || !destination) {
    return null;
  }

  const _destination = destination
    .clone()
    .normalize()
    .multiply(speed, speed);

  return Phaser.Point.add(point, _destination);
}

export const clone = (obj: any) => Object.assign({}, obj);

export default {
  clone: clone,
  moveWithSpeed: moveWithSpeed,
};
