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
        y = Math.round(- obj.sprite.size[1] / 2  - 7),
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
}
var renders = {
    text: textRender,
    unit: unitRenderer
};

export default renders;