import resources from './resources';
import mouseModule from './mouse';
import input from './input';
import GameWindow from './objects';
import collisions from './collisions';
import {Howl} from 'howler';

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
    var _canvas = document.createElement('canvas');
    _canvas.width = canvas.width;
    _canvas.height = canvas.width;

    config._canvas = _canvas;
    config._ctx = _canvas.getContext("2d");
    config.input = input;
    config.mouse = mouse;
    config.collisions = collisions({
        n: 7,
        width: canvas.width + 200,
        height: canvas.height + 200
    });
    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
    });

    var game = new GameWindow(config);

    var sound = new Howl({
        urls: ['music/main.mp3', 'music/main.ogg'],
        loop: true,
        volume: 0.5
    }).play();

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

