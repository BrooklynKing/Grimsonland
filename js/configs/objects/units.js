var config = {
    player : {
        zIndex : 2,
        sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
        pos : [512, 384],
        size : [25, 32],
        render : 'unit',
        collisions: true,
        parameters : {
            speed : 150,
            health : 50,
            spellPower: 1,
            effects : [],
            currentSpell: 'fireball',
            direction : {}
        },
        type : 'player',
        rules : ['moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'selectSpellWithKeyboard', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monster : {
        zIndex : 1,
        sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
        size : [20,28],
        collisions: true,
        render : 'unit',
        parameters : {
            speed : 35,
            cooldown : 70 ,
            effects : [],
            meleeCooldown: 70,
            health : 20,
            power : 5
        },
        conditions : ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetMeleeCooldown']
    },
    monsterBoomer : {
        zIndex : 1,
        sprite: ['img/demons.png', [96, 128], [32, 32], 6, [0, 1, 2]],
        size : [20,28],
        collisions: true,
        render : 'unit',
        parameters : {
            speed : 100,
            effects : [],
            health : 10,
            power : 10
        },
        conditions : ['monsterHealthStatus', 'monsterExplosionCondition'],
        type : 'monster',
        rules : ['setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monsterBoss : {
        zIndex : 1,
        collisions: true,
        sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
        size : [25, 40],
        render : 'unit',
        parameters : {
            speed : 30,
            cooldown : 200 ,
            fireCooldown : 200,
            power : 10,
            health : 30,
            effects : []
        },
        conditions : ['monsterHealthStatus' , 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
    },
    heart : {
        zIndex : 3,
        render: 'object',
        collisions: true,
        sprite : ['img/heart.png', [0, 0], [32, 32], 5, [0,1]],
        conditions: ['triggerOnPlayerCollision'],
        parameters : {
            health : 10
        }
    },
    powerup : {
        zIndex : 2,
        size: [25, 25],
        //render: 'object',
        collisions: true,
        sprite : ['img/powerup2.png', [0, 0], [72, 65]],
        conditions: ['triggerOnPlayerCollisionPowerUp'],
        parameters : {
            power : 1
        }
    }
};

export default config;