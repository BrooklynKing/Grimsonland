var config = {
    fireballSpell: {
        zIndex : 2000,
        sprite: ['spellIcons', [0, 0], [32, 32]],
        pos : [470, 748],

        size : [32, 32],
        render : 'spell',
        parameters : {
            bulletsFired: 0,
            cooldown: 10
        },
        type : 'spell',
        rules : ['fireball']
    },
    frostShardSpell: {
        zIndex : 2000,
        sprite: ['spellIcons', [224, 96], [32, 32]],
        pos : [512, 748],
        size : [32, 32],
        render : 'spell',
        parameters : {
            shardsFired: 0,
            cooldown: 75,
        },
        type : 'spell',
        rules : ['frostShard']
    },
    teleportSpell: {
        zIndex : 2000,
        sprite: ['spellIcons', [64, 32], [32, 32]],
        pos : [554, 748],
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
            cooldown: 50
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
            speed: 400
        },
        conditions: ['bulletMonsterCollision'],
        rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
    },
    frostShard : {
        zIndex : 3,
        render: 'object',
        collisions: true,
        sprite: ['effects',[96, 0], [32, 32], 10, [0, 1, 2]],
        type : 'spellElement',
        size : [500, 500],
        parameters : {
            power : 100,
            cooldown: 150
        },
        conditions: ['slowEnemies'],
        rules : ['removeOnCooldown', 'dynamicZIndex']
    }
};

export default config;