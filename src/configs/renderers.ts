import { ObjectTypes } from './objects/types';
import { Effects } from './rules/types';
import { GameObject } from '../engine/core/object';

const ellipse = (
	context: CanvasRenderingContext2D,
	cx: number,
	cy: number,
	rx: number,
	ry: number,
	rot: number,
	aStart: number,
	aEnd: number
) => {
	context.save();

	context.translate(cx, cy);
	context.rotate(rot);
	context.translate(-rx, -ry);

	context.scale(rx, ry);
	context.arc(1, 1, 1, aStart, aEnd, false);

	context.restore();
};

export const fog: Render = (obj) => {
	const ctx = obj.layer.ctx;
	const x = obj.layer.getObjectsByType(ObjectTypes.Player)[0].pos.x;
	const y = obj.layer.getObjectsByType(ObjectTypes.Player)[0].pos.y;
	const grad = obj.layer.ctx.createRadialGradient(x, y, 0, x, y, 700);

	grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
	grad.addColorStop(1, 'rgba(0, 0, 0, 0.97)');
	ctx.fillStyle = grad;

	ctx.beginPath();
	ctx.arc(x, y, 2000, 0, Math.PI * 2, false);
	ctx.closePath();

	ctx.fill();
};

export const healthBar: Render = (obj) => {
	const ctx = obj.layer.ctx;
	const x = Math.round(-obj.sprite!.size[0] / 2);
	const y = Math.round(-obj.sprite!.size[1] / 2 - 7);
	const width = obj.sprite!.size[0];
	const height = 3;

	ctx.globalAlpha = 0.5;

	if (
		obj.parameters.health > 0 &&
		obj.defaultParameters.health > obj.parameters.health
	) {
		ctx.fillStyle = 'rgb(250, 0, 0)';
		ctx.fillRect(x, y, width, height);

		ctx.fillStyle = 'rgb(0, 250, 0)';
		ctx.fillRect(
			x,
			y,
			Math.round(
				width * (obj.parameters.health / obj.defaultParameters.health)
			),
			height
		);
	}

	ctx.globalAlpha = 1;
};

export const expBar: Render = (obj, dt) => {
	const x = -22;
	const y = 17;
	const width = 200;
	const height = 40;
	const ctx = obj.layer.ctx;
	const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

	ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

	ctx.globalAlpha = 0.3;
	ctx.fillStyle = 'rgb(220, 220, 220)';
	ctx.fillRect(x, y, width, height);

	ctx.globalAlpha = 1;
	ctx.fillStyle = '#DAA520';
	if (player.parameters.levelTable[player.parameters.level]) {
		ctx.fillRect(
			x,
			y,
			Math.min(
				width,
				Math.round(
					width *
						(player.parameters.exp /
							player.parameters.levelTable[player.parameters.level])
				)
			),
			height
		);
	} else {
		ctx.fillRect(x, y, width, height);
	}

	ctx.translate(obj.layer.translate.x, obj.layer.translate.y);

	text(obj, dt);
};

export const sprite: Render = (obj, dt) => {
	const ctx = obj.layer.ctx;

	ctx.globalAlpha = 1;
	obj.sprite!.update(dt);
	obj.sprite!.render(ctx);
};

export const shadow: Render = (obj) => {
	if (obj.size) {
		const ctx = obj.layer.ctx;

		ctx.globalAlpha = 0.5;

		ctx.beginPath();
		ellipse(
			ctx,
			0,
			+obj.sprite!.size[1] / 2 - 3,
			Math.min(obj.sprite!.size[0], obj.size![0]) / 2 + 8,
			5,
			0,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = 'black';
		ctx.fill();

		ctx.globalAlpha = 1;
	}
};

export const effects: Render = (obj) => {
	const ctx = obj.layer.ctx;

	if (!obj.parameters.effects) {
		return;
	}

	Object.keys(obj.parameters.effects).forEach((effect) => {
		if (effect === Effects.Frozzen) {
			ctx.globalAlpha = 0.8;
			ctx.drawImage(
				obj.layer.game.cache.getImage('frostEffect'),
				-16,
				+(obj.sprite!.size[1] / 2) - 32,
				32,
				32
			);
			ctx.globalAlpha = 1;
		}
	});
};

export const object: Render = (obj, dt) => {
	shadow(obj, dt);
	sprite(obj, dt);
};

export const unit: Render = (obj, dt) => {
	shadow(obj, dt);
	healthBar(obj, dt);
	sprite(obj, dt);
	effects(obj, dt);
};

export const spell: Render = (obj, dt) => {
	const ctx = obj.layer.ctx;
	const x = Math.round(-obj.sprite!.size[0] / 2 - 4);
	const y = Math.round(-obj.sprite!.size[1] / 2 - 4);
	const width = obj.sprite!.size[0] + 8;
	const height = obj.sprite!.size[1] + 8;

	ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

	if (
		obj.id.indexOf(
			obj.layer.getObjectsByType(ObjectTypes.Player)[0].parameters.currentSpell
		) !== -1
	) {
		ctx.fillStyle = 'rgb(0, 250, 0)';
		ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
	}

	ctx.globalAlpha = 0.4;
	ctx.fillStyle = 'rgb(0, 0, 0)';

	ctx.fillRect(x, y, width, height);

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(x, y, width, height);

	ctx.globalAlpha = 1;

	sprite(obj, dt);

	if (obj.parameters.fireCooldown > 0) {
		ctx.globalAlpha = 0.8;
		ctx.fillStyle = 'rgb(20, 20, 20)';
		ctx.fillRect(
			x,
			Math.round(
				y +
					height -
					height * (obj.parameters.fireCooldown / obj.parameters.cooldown)
			),
			width,
			height
		);
		ctx.globalAlpha = 1;
	}

	ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
};

export const ui: Render = (obj, dt) => {
	const ctx = obj.layer.ctx;

	ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
	sprite(obj, dt);
	ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
};

export const text: Render = (obj) => {
	const ctx = obj.layer.ctx;
	let fontConfig = '';

	ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

	obj.parameters.style && (fontConfig += obj.parameters.style + ' ');
	obj.parameters.weight && (fontConfig += obj.parameters.weight + ' ');

	fontConfig += (obj.parameters.size || 30) + 'pt ';
	fontConfig += obj.parameters.font || 'Arial';

	if (obj.parameters.align) {
		ctx.textAlign = obj.parameters.align;
	}

	ctx.font = fontConfig;
	ctx.fillStyle = obj.parameters.color || '#FFF';
	ctx.fillText(obj.parameters.text, obj.pos.x, obj.pos.y);

	ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
};

export type Render = (obj: GameObject, dt: number) => void;