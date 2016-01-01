var pressedKeys = {};

function setKey(event, status) {
    pressedKeys[event.keyCode] = status;
}

document.addEventListener('keydown', function (e) {
    setKey(e, true);
});

document.addEventListener('keyup', function (e) {
    setKey(e, false);
});

window.addEventListener('blur', function () {
    pressedKeys = {};
});

function reset() {
    pressedKeys = {};
}

function isDown(key) {
    return pressedKeys[key];
}

var input = {
    pressedKeys: pressedKeys,
    reset: reset,
    isDown: isDown
};

export default input;