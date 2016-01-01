var config = {

    tree : {
        id : 'tree',
        sprite : ['img/tree.png', [0, 0], [76, 76]],
        size : [70,70],
        rules: ['dynamicZIndex']
    },
    wall : {
        id : 'wall',
        sprite : ['img/wall.png', [0, 0], [63, 97]],
        size : [70,70]
    },
    gate : {
        id : 'gate',
        sprite : ['img/gates.png', [0, 0], [60, 64]],
        size : [60,64]
    },
    stones : {
        id : 'stones',
        sprite : ['img/stones.png', [0, 0], [36, 36]],
        size : [30,30],
        zIndex : 0
    }
};

export default config;