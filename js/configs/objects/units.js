var config = {
    player : {
        zIndex : 2,
        id : 'player',
        sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
        pos : [400,300],
        size : [25, 32],
        render : 'unit',
        collisions: true,
        parameters : {
            speed : 150,
            health : 10,
            spellPower: 1,
            effects : [],
            currentSpell: 'fireball',
            direction : {}
        },
        type : 'player',
        //conditions : [],
        rules : ['moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'selectSpellWithKeyboard', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monster : {
        zIndex : 1,
        id : 'monster',
        sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
        size : [20,28],
        collisions: true,
        render : 'unit',
        parameters : {
            speed : 50,
            degreeSpeed: 0.03,
            cooldown : 70 ,
            effects : [],
            meleeCooldown: 70,
            degreeRotation : 1,
            health : 6,
            power : 1
        },
        conditions : ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['setDirectionToPlayer', 'moveToDirection', 'canMelee', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    monsterBoss : {
        //[288, 200]
        zIndex : 1,
        id : 'monster',
        collisions: true,
        sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
        size : [25, 40],
        render : 'unit',
        parameters : {
            speed : 30,
            degreeSpeed: 0.03,
            degreeRotation : 1,
            bulletsFired : 0,
            cooldown : 150 ,
            fireCooldown : 150,
            power : 5,
            health : 30,
            effects : []
        },
        conditions : ['monsterHealthStatus' , 'stopOnCollisionWithPlayer'],
        type : 'monster',
        rules : ['monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'rotateByDirection', 'canShoot', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
    },
    heart : {
        zIndex : 3,
        id : 'heart',
        render: 'object',
        collisions: true,
        sprite : ['img/heart.png', [0, 0], [32, 32], 5, [0,1]],
        conditions: ['triggerOnPlayerCollision'],
        parameters : {
            health : 1
        }
    },
    powerup : {
        zIndex : 2,
        id : 'powerup',
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