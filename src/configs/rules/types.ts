import { GameObject } from '../../engine/core/object';
import { GameLayer } from '../../engine/core/layer';

export interface GameRule {
	init?(obj: GameObject | GameLayer): void;
	update?(obj: GameObject | GameLayer, dt: number): void;
}

export enum Effects {
	Frozzen = 'frozzen',
}
