var config = {
    mbullet : {
        zIndex : 3,
        id : 'bullet',
        collisions: true,
        sprite: ['img/effects.png',[288, 128], [32, 32], 10, [0, 1, 2]],
        type : 'monsterSpellElement',
        render: 'object',
        size : [32, 32],
        parameters : {
            power : 1,
            speed: 100
        },
        rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision', 'dynamicZIndex']
    },
    blood : {
        zIndex : 2,
        id : 'blood',
        sprite : ['img/sblood.png', [0, 0], [32, 13]],
        parameters : {
            cooldown : 500
        },
        rules: ['removeOnCooldown']
    },
    skelet : {
        zIndex : 0,
        id : 'skelet',
        sprite : ['img/skeleton.png', [0, 0], [34, 34]],
        parameters : {
            cooldown : 300
        },
        rules: ['removeOnCooldown']
    },
    explosion : {
        render: 'object',
        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    }
};

export default config;