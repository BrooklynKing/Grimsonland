var config = {
    fireballSpell: {
        zIndex : 2000,
        id : 'fireball',
        sprite: ['img/spellicons.png', [0, 0], [32, 32]],
        pos : [356, 580],
        size : [32, 32],
        render : 'spell',
        parameters : {
            bulletsFired: 0,
            cooldown: 10,
            fireCooldown : 10
        },
        type : 'spell',
        rules : ['fireball']
    },
    frostShardSpell: {
        zIndex : 2000,
        id : 'frostShard',
        sprite: ['img/spellicons.png', [224, 96], [32, 32]],
        pos : [400, 580],
        size : [32, 32],
        render : 'spell',
        parameters : {
            shardsFired: 0,
            cooldown: 50,
            fireCooldown : 50
        },
        type : 'spell',
        rules : ['frostShard']
    },
    teleportSpell: {
        zIndex : 2000,
        id : 'teleportSpell',
        sprite: ['img/spellicons.png', [64, 32], [32, 32]],
        pos : [444, 580],
        size : [32, 32],
        render : 'spell',
        parameters : {
            power : 200,
            teleportGates : 0,
            cooldown: 200,
            fireCooldown : 200
        },
        type : 'spell',
        rules : ['teleport']
    },
    teleportGate: {
        zIndex : 0,
        id : 'teleportGate',
        render: 'object',
        sprite: ['img/spell.png', [0, 0], [32, 32], 7, [0,1]],
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
        id : 'bullet',
        collisions: true,
        render: 'object',
        sprite: ['img/fireballsprite.png',[ 0, 0], [33, 33], 16, [0, 1, 2, 3]],
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
        id : 'spellPart',
        render: 'object',
        collisions: true,
        sprite: ['img/effects.png',[96, 0], [32, 32], 10, [0, 1, 2]],
        type : 'spellElement',
        size : [120, 120],
        parameters : {
            power : 35,
            cooldown: 100
        },
        conditions: ['slowEnemies'],
        rules : ['removeOnCooldown', 'dynamicZIndex']
    }
};

export default config;