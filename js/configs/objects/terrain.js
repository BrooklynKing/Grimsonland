var config = {

    tree : {
        id : 'tree',
        sprite : ['img/tree.png', [0, 0], [76, 76]],
        size : [70,70],
        rules: ['dynamicZIndex']
    },
    wall : {
        id : 'wall',
        sprite : ['img/wall2.png', [0, 0], [48, 64]],
        size : [48,64]
    },
    gate : {
        id : 'gate',
        sprite : ['img/gates2.png', [0, 0], [96, 65]],
        size : [96,65]
    },
    stones : {
        id : 'stones',
        render: 'object',
        sprite : ['img/stones.png', [0, 0], [36, 36]],
        size : [30,30],
        zIndex : 0
    }
};

export default config;