var config = {

    tree : {
        sprite : ['img/tree.png', [0, 0], [76, 76]],
        size : [70,70],
        rules: ['dynamicZIndex']
    },
    wall : {
        sprite : ['img/wall2.png', [0, 0], [48, 64]],
        size : [48,64]
    },
    gate : {
        sprite : ['img/gates2.png', [0, 0], [96, 65]],
        size : [96,65]
    },
    stones : {
        render: 'object',
        sprite : ['img/stones.png', [0, 0], [18, 22]],
        size : [18,22],
        rules : ['dynamicZIndex']
        //zIndex : 0
    }
};

export default config;