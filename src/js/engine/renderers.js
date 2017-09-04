function fog(obj) {
    var ctx = obj.layer.ctx;
    var x = obj.layer.getObjectsByType('player')[0].pos.x;
    var y = obj.layer.getObjectsByType('player')[0].pos.y;
    var grad = obj.layer.ctx.createRadialGradient(x, y, 0, x, y, 700);

    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.97)');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(x, y, 2000, 0, Math.PI * 2, false);
    ctx.closePath();

    ctx.fill();
}

function healthBar(obj) {
    var ctx = obj.layer.ctx;
    var x = Math.round(- obj.sprite.size[0] / 2 );
    var y = Math.round(- obj.sprite.size[1] / 2 - 7);
    var width = obj.sprite.size[0];
    var height = 3;

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
    var x = -22;
    var y = 17;
    var width = 200;
    var height = 40;
    var ctx = obj.layer.ctx;
    var player = obj.layer.getObjectsByType('player')[0];

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "rgb(220, 220, 220)";
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#DAA520";
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
    obj.sprite.update(dt);
    obj.sprite.render(ctx);
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

function shadow(obj) {
    if (obj.size) {
        var ctx = obj.layer.ctx;

        ctx.globalAlpha = 0.5;

        ctx.beginPath();
        ellipse(ctx, 0, + obj.sprite.size[1] / 2 - 3, Math.min(obj.sprite.size[0], obj.size[0]) / 2 + 8, 5, 0, 0, 2 * Math.PI);
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
            ctx.drawImage(obj.layer.game.cache.getImage('frostEffect'), -16, + (obj.sprite.size[1] / 2) - 32, 32, 32);
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

function ui(obj, dt) {
    var ctx = obj.layer.ctx;

    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    sprite(obj, dt);
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

var renders = {
    shadow,
    fog,
    expBar,
    healthBar,
    sprite,
    effects,
    ui,
    object : objectRenderer,
    text: textRender,
    spell : spellRenderer,
    unit: unitRenderer
};

export default renders;