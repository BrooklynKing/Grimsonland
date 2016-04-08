var config = {
    fireballSpell: {
        zIndex : 5000,
        sprite: ['spellIcons', [0, 0], [32, 32]],
        pos : [449, 748],

        size : [32, 32],
        render : 'spell',
        parameters : {
            bulletsFired: 0,
            cooldown: 20
        },
        type : 'spell',
        rules : ['fireball']
    },
    hellfireSpell: {
        zIndex : 5000,
        sprite: ['spellIcons', [96, 0], [32, 32]],
        pos : [491, 748],

        size : [32, 32],
        render : 'spell',
        parameters : {
            bulletsFired: 0,
            cooldown: 800,
        },
        type : 'spell',
        rules : ['hellfire']
    },
    frostShardSpell: {
        zIndex : 5000,
        sprite: ['spellIcons', [224, 96], [32, 32]],
        pos : [533, 748],
        size : [32, 32],
        render : 'spell',
        parameters : {
            shardsFired: 0,
            cooldown: 500,
        },
        type : 'spell',
        rules : ['frostShard']
    },
    teleportSpell: {
        zIndex : 5000,
        sprite: ['spellIcons', [64, 32], [32, 32]],
        pos : [575, 748],
        size : [32, 32],
        render : 'spell',
        parameters : {
            power : 200,
            teleportGates : 0,
            cooldown: 200
        },
        type : 'spell',
        rules : ['teleport']
    },
    teleportGate: {
        zIndex : 0,
        render: 'object',
        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0,1]],
        pos : [466, 580],
        size : [32, 32],
        parameters : {
            cooldown: 200
        },
        type : 'spellElement',
        rules : ['removeOnCooldown', 'dynamicZIndex']
    },

    bullet : {
        zIndex : 3,
        collisions: true,
        render: 'object',
        sprite: ['fireball',[ 0, 0], [33, 33], 16, [0, 1, 2, 3]],
        size : [25, 25],
        type : 'spellElement',
        parameters : {
            power : 10,
            cooldown: 100,
            speed: 300
        },
        conditions: ['bulletMonsterCollision'],
        rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex' , 'explosionOnCooldown']
    },
    hellfireTube : {
        zIndex : 3,
        collisions: true,
        render: 'object',
        sprite: ['hellfire',[ 0, 0], [21, 58], 14, [0, 1, 2, 3, 4, 4, 3, 3, 4, 4, 3, 3, 4, 4], null, true],
        size : [50, 50],
        type : 'spellElement',
        parameters : {
            power : 10,
            cooldown: 25,
            speed: 300
        },
        conditions: ['hellTubeMonsterCollision'],
        rules : ['dynamicZIndex' , 'explosionAfterSpriteDone']
    },
    frostShard : {
        zIndex : 3,
        render: 'object',
        collisions: true,
        sprite: ['effects',[96, 0], [32, 32], 10, [0, 1, 2]],
        type : 'spellElement',
        size : [500, 500],
        parameters : {
            power : 60,
            cooldown: 200
        },
        conditions: ['slowEnemies'],
        rules : ['removeOnCooldown', 'dynamicZIndex']
    }
};

export default config;