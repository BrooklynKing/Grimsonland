function input(game) {
    var pressedKeys = {},
        currentGame = game;

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

    return {
        isDown: function (key) {
            return pressedKeys[key];
        }
        ,
        triggerGameActions: function (frameTime) {
            for (var i in pressedKeys) {
                if (pressedKeys.hasOwnProperty(i)) {
                    if (pressedKeys[i]) {
                        currentGame.triggerAction('key_' + i, {'dt': frameTime, 'keyStatus': true});
                    } else {
                        currentGame.triggerAction('key_' + i, {'dt': frameTime, 'keyStatus': false});
                        delete pressedKeys[i];
                    }
                }
            }
        }
    };
};

export default input;