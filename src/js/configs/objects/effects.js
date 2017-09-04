var config = {
    mbullet : {
        zIndex : 3,
        collisions: true,
        sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2 ,3]],
        type : 'monsterSpellElement',
        render: 'object',
        size : [32, 32],
        conditions : ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
        parameters : {
            power : 8,
            speed: 100
        },
        rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
    },
    mbullet2 : {
        zIndex : 3,
        collisions: true,
        sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
        type : 'monsterSpellElement',
        render: 'object',
        size : [28, 24],
        conditions : ['monsterBoss2Bullet'],
        parameters : {
            power : 15,
            cooldown: 100,
            speed: 200
        },
        rules : ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'rotateByDirection', 'moveToDirection', 'dynamicZIndex']
    },
    blood : {
        zIndex : 2,
        sprite : ['monsterBlood', [0, 0], [32, 13]],
        parameters : {
            cooldown : 500
        },
        rules: ['removeOnCooldown']
    },
    bloodSpray : {
        zIndex : 2,
        sprite : ['bloodEffect', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    explosion : {
        render: 'object',
        size : [39, 39],
        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    monsterExplosion : {
        render: 'object',
        collisions: true,
        type : 'spellEffect',
        conditions : ['monsterExplosion'],
        size : [39, 39],
        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
    },
    fog : {
        render: 'fog',
        zIndex: 2500,
        type : 'effect'
    }
};

export default config;