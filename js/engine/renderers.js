import utils from './utils';

function healthBar(obj) {
    var ctx = obj.layer.ctx,
        x = Math.round(- obj.sprite.size[0] / 2 ),
        y = Math.round(- obj.sprite.size[1] / 2 - 7),
        width = obj.sprite.size[0],
        height = 3;

    ctx.globalAlpha = 0.5;

    if ((obj.getParameter('health') > 0) && (obj.getDefaultParameter('health') > obj.getParameter('health'))) {
        ctx.fillStyle = "rgb(250, 0, 0)";
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x, y, Math.round(width * (obj.getParameter('health') / obj.getDefaultParameter('health'))), height);
    }

    ctx.globalAlpha = 1;
}
function expBar(obj) {
    var x = -22,
        y = 17,
        width = 200,
        height = 40,
        ctx = obj.layer.ctx;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#DAA520";

    var player = obj.layer.getObjectsByType('player')[0];

    if ( player.getParameter('levelTable')[player.getParameter('level')] ) {
        ctx.fillRect(x, y, Math.min(width, Math.round(width * (player.getParameter('exp') / player.getParameter('levelTable')[player.getParameter('level')]))), height);
    } else {
        ctx.fillRect(x, y, width, height);
    }

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
    textRender(obj);
}
function sprite(obj, dt) {
    var ctx = obj.layer.ctx;

    ctx.globalAlpha = 1;
    dt && obj.sprite.update(dt);
    obj.sprite.render(ctx);
}
function shadow(obj) {
    if (obj.size) {
        var ctx = obj.layer.ctx;

        ctx.globalAlpha = 0.5;

        ctx.beginPath();
        utils.ellipse(ctx, 0, +obj.sprite.size[1] / 2 - 3, obj.size[0] / 2 + 8, 5, utils.getRadians(0), utils.getRadians(0), utils.getRadians(360));
        ctx.fillStyle = 'black';
        ctx.fill();

        ctx.globalAlpha = 1;
    }
}
function effects(obj) {
    var ctx = obj.layer.ctx,
        effects = obj.getParameter('effects');

    for (var i = 0; i < effects.length; i++) {
        var effect = effects[i];
        if (effect == 'frozen') {
            ctx.globalAlpha = 0.8;
            ctx.drawImage(obj.layer.game.cache.getImage('frostEffect'), - obj.sprite.size[0] / 2, -8, 32, 32);
            ctx.globalAlpha = 1;
        }
    }
}

function objectRenderer(obj, dt) {
    shadow(obj);
    sprite(obj, dt);
}
function unitRenderer(obj, dt) {
    shadow(obj);
    healthBar(obj);
    sprite(obj, dt);
    effects(obj);
}
function spellRenderer(obj, dt) {
    var ctx = obj.layer.ctx,
        x = Math.round(- obj.sprite.size[0] / 2 - 4),
        y = Math.round(- obj.sprite.size[1] / 2 - 4),
        width = obj.sprite.size[0] + 8,
        height = obj.sprite.size[1] + 8;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    if (obj.id.indexOf(obj.layer.getObjectsByType('player')[0].getParameter('currentSpell')) != -1) {
        ctx.fillStyle = "rgb(0, 250, 0)";
        ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    }

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "rgb(0, 0, 0)";

    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 1;

    sprite(obj, dt);

    if (obj.getParameter('fireCooldown') > 0) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "rgb(20, 20, 20)";
        ctx.fillRect(x, Math.round(y + height - height * (obj.getParameter('fireCooldown') / obj.getParameter('cooldown'))), width, height);
        ctx.globalAlpha = 1;
    }

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
function textRender(obj) {
    var ctx = obj.layer.ctx,
        fontConfig = '';

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    (obj.getParameter('style')) && (fontConfig += obj.getParameter('style') + " ");
    (obj.getParameter('weight')) && (fontConfig += obj.getParameter('weight') + " ");
    fontConfig += (obj.getParameter('size') || 30) + 'pt ';
    fontConfig += (obj.getParameter('font') || "Arial");

    if (obj.getParameter('align')) {
        ctx.textAlign = obj.getParameter('align');
    }

    ctx.font = fontConfig;
    ctx.fillStyle = obj.getParameter('color') || "#FFF";
    ctx.fillText(obj.getParameter('text'), obj.pos.x, obj.pos.y);

    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
function cursor(obj, dt) {
    var ctx = obj.layer.ctx;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    sprite(obj, dt);
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
var renders = {
    shadow: shadow,
    expBar: expBar,
    healthBar: healthBar,
    cursor: cursor,
    sprite: sprite,
    effects: effects,
    object : objectRenderer,
    text: textRender,
    spell : spellRenderer,
    unit: unitRenderer
};

export default renders;