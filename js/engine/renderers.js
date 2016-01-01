import resources from './resources';

function textRender(obj) {
    var ctx = obj.layer.ctx,
        fontConfig = '';

    (obj.parameters.style) && (fontConfig += obj.parameters.style + " ");
    (obj.parameters.weight) && (fontConfig += obj.parameters.weight + " ");
    fontConfig += (obj.parameters.size || 30) + 'pt ';
    fontConfig += (obj.parameters.font || "Arial");

    if (obj.parameters.align) {
        ctx.textAlign = obj.parameters.align;
    }

    ctx.font = fontConfig;
    ctx.fillStyle = obj.parameters.color || "#FFF";
    ctx.fillText(obj.parameters.text, obj.pos[0], obj.pos[1]);
}

function unitRenderer(obj, dt) {
    var ctx = obj.layer.ctx,
        x = Math.round(- obj.sprite.size[0] / 2 ),
        y = Math.round(- obj.sprite.size[1] / 2 - 7),
        width = obj.sprite.size[0],
        height = 3;

    ctx.globalAlpha = 0.5;

    if ((obj.parameters.health > 0) && (obj._parameters.health > obj.parameters.health)) {
        ctx.fillStyle = "rgb(250, 0, 0)";
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x, y, Math.round(width * (obj.parameters.health / obj._parameters.health)), height);
    }

    ctx.globalAlpha = 1;
    dt && obj.sprite.update(dt);
    obj.sprite.render(ctx);

    for (var i = 0; i < obj.parameters.effects.length; i++) {
        var effect = obj.parameters.effects[i];
        if (effect == 'frozen') {
            ctx.globalAlpha = 0.8;
            ctx.drawImage(resources.get('img/frosteffect.png'), - obj.sprite.size[0] / 2, -8, 32, 32);
            ctx.globalAlpha = 1;
        }
    }
}

function spellRenderer(obj, dt) {
    var ctx = obj.layer.ctx,
        x = Math.round(- obj.sprite.size[0] / 2 - 4),
        y = Math.round(- obj.sprite.size[1] / 2 - 4),
        width = obj.sprite.size[0] + 8,
        height = obj.sprite.size[1] + 8;
    if (obj.id.indexOf(obj.layer.getObjectsByType('player')[0].parameters.currentSpell) != -1) {
        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    }
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "rgb(0, 0, 0)";

    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 1;
    dt && obj.sprite.update(dt);
    obj.sprite.render(ctx);

    if (obj.parameters.fireCooldown > 0) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "rgb(20, 20, 20)";
        ctx.fillRect(x, Math.round(y + height - height * (obj.parameters.fireCooldown / obj.parameters.cooldown)), width, height);
        ctx.globalAlpha = 1;
    }
}
var renders = {
    text: textRender,
    spell : spellRenderer,
    unit: unitRenderer
};

export default renders;