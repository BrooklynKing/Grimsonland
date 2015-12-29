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
    ctx.fillText(obj.parameters.text || obj.parameters.template, obj.pos[0], obj.pos[1]);
}


var renders = {
    text: textRender
};

export default renders;