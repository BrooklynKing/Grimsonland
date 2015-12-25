import resources from './resources';
import mouseModule from './mouse';
import inputModule from './input';
import GameWindow from './objects';

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function loadResources(list, callback) {
    resources.load(list);

    //This one is mock for AJAX, if we will have real AJAX, we just need to put this one into callback without timeout
    resources.onReady(function(){
        callback && callback();
    });
}


function createGame(config) {
    var canvas = config.canvas,
        ctx = config.ctx,
        lastTime = 0;

    var game = new GameWindow(config),
        mouse = mouseModule(canvas),
        input = inputModule(game);

    canvas.addEventListener('click', function(e) {
        game.triggerAction('eclick', e, mouse.getMousePosition(e));
    });
    canvas.addEventListener('mousemove', function(e) {
        game.parameters.mouseposition = mouse.getMousePosition(e);
    });

    function gameTimer() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        input.triggerGameActions(dt);
        game.update(dt);
        game.render(dt);

        /*ctx.font = 'bold 30px sans-serif';
        ctx.fillStyle = "#FFF";
        ctx.fillText(score, 10, 35);*/
        lastTime = now;
        requestAnimFrame(gameTimer);
    }

    function initGame() {
        loadResources(config.resources, () => {
            game.init();
            requestAnimFrame(gameTimer);
        });
    }
    return {
        model: game,
        init: initGame
    }
}

export default createGame;

