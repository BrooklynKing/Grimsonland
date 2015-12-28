function mouse(canvas) {
        // HITTEST: To convert the mouse position to be canvas relative.
        // BEGIN http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
    var stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0,
        stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0,
        styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0,
        styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0,
        // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
        // They will mess up mouse coordinates and this fixes that
        html = document.body.parentNode,
        htmlTop = html.offsetTop,
        htmlLeft = html.offsetLeft;

    function getMousePosition(e) {
        var element = canvas,
            offsetX = 0,
            offsetY = 0,
            mx, my;

        // Compute the total offset. It's possible to cache this if you want
        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
        // This part is not strictly necessary, it depends on your styling
        offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
        offsetY += stylePaddingTop + styleBorderTop + htmlTop;

        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;

        // We return a simple javascript object with x and y defined
        return {
            x: mx,
            y: my
        };
    }

    return {
        'getMousePosition': getMousePosition
    }
}

export default mouse;