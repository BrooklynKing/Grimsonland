import type { GameLayer } from '../../engine/core/layer';
import type { GameObject } from '../../engine/core/object';

export interface GameRule {
	init?(obj: GameObject | GameLayer): void;
	update?(obj: GameObject | GameLayer, dt: number): void;
}
