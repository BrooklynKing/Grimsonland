var config = {
    mbullet : {
        zIndex : 3,
        collisions: true,
        sprite: ['img/darkblast.png',[0, 0], [38, 38], 12, [0, 1, 2 ,3]],
        type : 'monsterSpellElement',
        render: 'object',
        size : [32, 32],
        conditions : ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
        parameters : {
            power : 1,
            speed: 100
        },
        rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
    },
    mbullet2 : {
        zIndex : 3,
        collisions: true,
        sprite: ['img/effects.png',[0, 0], [32, 32], 10, [0, 1, 2]],
        type : 'monsterSpellElement',
        render: 'object',
        size : [32, 32],
        conditions : ['monsterBoss2Bullet'],
        parameters : {
            power : 15,
            cooldown: 100,
            speed: 200
        },
        rules : ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'moveToDirection', 'dynamicZIndex']
    },
    summonGate: {
        zIndex : 0,
        render: 'object',
        sprite: ['img/spell.png', [0, 0], [32, 32], 7, [0,1]],
        pos : [466, 580],
        size : [25, 30],
        collisions: true,
        parameters : {
            cooldown: 80,
            chanceOfBoss : 5,
            chanceOfBoss2 : 1,
            chanceOfBoomer : 15,
            health : 10,
        },
        conditions : ['monsterHealthStatus'],
        type : 'monster',
        rules : ['summonOnCooldown', 'dynamicZIndex']
    },
    blood : {
        zIndex : 2,
        sprite : ['img/sblood.png', [0, 0], [32, 13]],
        parameters : {
            cooldown : 500
        },
        rules: ['removeOnCooldown']
    },
    bloodSpray : {
        zIndex : 2,
        sprite : ['img/bloods.png', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    skelet : {
        zIndex : 0,
        sprite : ['img/skeleton.png', [0, 0], [34, 34]],
        parameters : {
            cooldown : 300
        },
        rules: ['removeOnCooldown']
    },
    explosion : {
        render: 'object',
        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    monsterExplosion : {
        render: 'object',
        collisions: true,
        type : 'spellEffect',
        conditions : ['monsterExplosion'],
        size : [39, 39],
        sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    }
};

export default config;