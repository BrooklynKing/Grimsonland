import Phaser from 'phaser';

export function moveWithSpeed(
  point: Phaser.Point,
  destination: Phaser.Point,
  speed: number,
):  Phaser.Point {
  const _destination = destination
    .clone()
    .normalize()
    .multiply(speed, speed);

  return Phaser.Point.add(point, _destination);
}