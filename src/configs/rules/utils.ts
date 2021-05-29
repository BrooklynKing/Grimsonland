import Phaser from 'phaser';

export const moveWithSpeed = (
	point: Phaser.Point,
	destination: Phaser.Point,
	speed: number
): Phaser.Point =>
	Phaser.Point.add(
		point,
		destination.clone().normalize().multiply(speed, speed)
	);
