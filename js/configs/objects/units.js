var config = {
    player : {
        zIndex : 20,
        sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
        pos : [612, 484],
        size : [25, 32],
        render : 'unit',
        collisions: true,
        parameters : {
            speed : 150,
            health : 50,
            spellPower: 1,
            level : 1,
            exp: 0,
            effects : [],
            currentSpell: 'fireball',
            direction : {},
            levelTable: {
                1 : 600,
                2 : 1200,
                3 : 2000,
                4 : 3000,
                5 : 4500,
                6 : 6500,
                7 : 8000,
                8 : 10000,
                9 : 15000
            }
        },
        type : 'player',
        conditions: ['selectSpellWithKeyboard'],
        rules : ['moveWithKeyboard', 'rotateToMouse', 'bindPositionToLayer', 'playerDeath', 'moveToDirection','dynamicZIndex', 'resetSpeed', 'resetEffects', 'playerLevelUp']
    },
    summonGate: {
        zIndex : 0,
        render: 'object',
        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0,1]],
        pos : [466, 580],
        size : [25, 30],
        collisions: true,
        parameters : {
            cooldown: 80,
            exp: 3,
            chanceOfBoss : 5,
            chanceOfBoss2 : 8,
            chanceOfBoomer : 20,
            health : 10
        },
        conditions : ['monsterHealthStatus'],
        type : 'monster',
        rules : ['summonOnCooldown', 'dynamicZIndex']
    },
    monster : {
        zIndex : 1,
        sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
        size : [20,28],
        collisions: true,
        render : 'unit',
        parameters : {
            speed : 25,
            cooldown : 70 ,
            scentSpeed: 120,
            scentRange: 600,
            exp: 15,
            wanderCooldown: 500,
            effects : [],
            health : 20,
            power : 5
        },
        conditions : [ 'monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['moveToDirection', 'wandererAI', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetEffects', 'resetMeleeCooldown']
    },
    monsterBoomer : {
        zIndex : 1,
        sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
        size : [20,28],
        collisions: true,
        render : 'unit',
        parameters : {
            speed : 100,
            exp : 30,
            effects : [],
            health : 10,
            power : 10
        },
        conditions : ['monsterHealthStatus', 'monsterExplosionCondition'],
        type : 'monster',
        rules : ['moveToDirection', 'rotateByPlayer', 'setDirectionToPlayerAdvance', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monsterBoss : {
        zIndex : 1,
        collisions: true,
        sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
        size : [25, 40],
        render : 'unit',
        parameters : {
            speed : 50,
            exp : 60,
            cooldown : 75,
            power : 10,
            health : 50,
            effects : []
        },
        conditions : ['monsterHealthStatus' , 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['setDirectionToPlayer', 'monsterBossLogic', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
    },
    monsterBoss2 : {
        zIndex : 1,
        collisions: true,
        sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
        size : [40, 45],
        render : 'unit',
        parameters : {
            speed : 15,
            cooldown : 200 ,
            exp: 120,
            fireRange : 300,
            power : 10,
            health : 30,
            effects : []
        },
        conditions : ['monsterHealthStatus' , 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['setDirectionToPlayer', 'monsterBoss2Logic', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
    },
    heart : {
        zIndex : 3,
        render: 'object',
        collisions: true,
        size: [25, 25],
        sprite : ['pumpkin', [0, 0], [32, 32], 5, [0,1]],
        conditions: ['triggerOnPlayerCollision'],
        parameters : {
            power : 10
        }
    },
    powerup : {
        zIndex : 2,
        size: [25, 25],
        //render: 'object',
        collisions: true,
        sprite : ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
        conditions: ['triggerOnPlayerCollisionPowerUp'],
        parameters : {
            exp: 250
            //power : 1
        }
    }
};

export default config;