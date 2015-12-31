import resources from './resources';
import mouseModule from './mouse';
import input from './input';
import GameWindow from './objects';
import collisions from './collisions';

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
        lastTime = 0;

    var mouse = mouseModule(canvas);

    config.input = input;
    config.mouse = mouse;
    config.collisions = collisions({
        n: 6,
        width: canvas.width,
        height: canvas.height
    });

    var game = new GameWindow(config);

    function gameTimer() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        game.update(dt);
        game.render(dt);

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

