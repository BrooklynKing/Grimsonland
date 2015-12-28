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

var input = {
    isDown: function (key) {
        return pressedKeys[key];
    }
};


export default input;