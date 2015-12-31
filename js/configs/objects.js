var config = {
	player : {
		zIndex : 2,
		id : 'player',
		sprite: ['img/mainhero.png', [0, 0], [32, 32], 6, [0, 1, 2]],
		pos : [400,300],
		size : [25, 32],
		parameters : {
			speed : 150,
			health : 1,
			cooldown: 15,
			fireCooldown : 15,
			bulletsFired: 0,
			direction : {}
		},
		type : 'player',
		rules : ['playerLogic','shootOnMouseDown', 'moveWithKeyboard', 'bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse', 'dynamicZIndex']
	},
	explosion : {
		zIndex : 10000,
		sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
        //sprite: ['img/explosion.png', [0, 0], [33, 33], 5, [0, 1, 2], null, true],

		rules: ['explosionLogic']
	},
	monster : {
		zIndex : 1,
		id : 'monster',
		sprite: ['img/demons.png', [0, 128], [32, 32], 6, [0, 1, 2]],
		size : [25,25],
		parameters : {
			speed : 50,
			degreeSpeed: 0.03,
			cooldown : 70 ,
			meleeCooldown: 70,
			degreeRotation : 1,
			health : 6,
			power : 1
		},
		type : 'monster',
		rules : ['stopOnCollisionWithPlayer', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'canMelee', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex']
	},
	monsterBoss : {
        //[288, 200]
		zIndex : 1,
		id : 'monster',
		sprite: ['img/monsters2.png', [0, 0], [32, 50], 6, [0, 1, 2]],
		size : [25, 40],
		parameters : {
			speed : 30,
			degreeSpeed: 0.03,
			degreeRotation : 1,
			bulletsFired : 0,
			cooldown : 150 ,
			fireCooldown : 150,
			power : 5,
			health : 30
		},
		type : 'monster',
		rules : ['stopOnCollisionWithPlayer', 'monsterBossLogic', 'setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus','rotateByDirection', 'canShoot', 'dynamicZIndex']
	},
	bullet : {
		zIndex : 3,
		id : 'bullet',
		//sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
        sprite: ['img/fireballsprite.png',[ 0, 0], [33, 33], 16, [0, 1, 2, 3]],
		size : [20, 20],
		type : 'spellElement',
		parameters : {
			power : 10,
			speed: 400
		},
		rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'bulletMonsterCollision', 'dynamicZIndex']
	},
	mbullet : {
		zIndex : 3,
		id : 'bullet',
		sprite: ['img/effects.png',[288, 128], [32, 32], 10, [0, 1, 2]],
		type : 'monsterSpellElement',
		size : [32, 32],
		parameters : {
			power : 1,
			speed: 100
		},
		rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision', 'dynamicZIndex']
	},
	cursor : {
		zIndex : 999,
		id : 'cursor',
		pos: [400,350],
		sprite : ['img/cursor.png', [0, 0], [30, 30]],
		rules: ['cursorLogic']
	},
	blood : {
		zIndex : 2,
		id : 'blood',
		sprite : ['img/blood.png', [0, 0], [32, 13]],
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
	tree : {
        id : 'tree',
        sprite : ['img/tree.png', [0, 0], [76, 76]],
        size : [70,70],
        rules: ['dynamicZIndex']
    },
    stones : {
        id : 'stones',
        sprite : ['img/stones.png', [0, 0], [36, 36]],
        size : [30,30],
        zIndex : 0
    },
	heart : {
		zIndex : 2,
		id : 'heart',
		sprite : ['img/heart.png', [0, 0], [32, 32], 5, [0, 1]],
		parameters : {
			health : 1
		},
		rules: ['triggerOnPlayerCollision']
	},
	counter: {
		id : 'counter',
		zIndex : 910,
		pos: [5, 13],
		render : "text",
		parameters : {
			weight : "bold",
			color : "#EFEFEF",
			template : "DEMONS KILLED: {kills}",
			size : 14
		},
		rules: ['countMonsterKilled']
	},
	timer: {
		id : 'timer',
		zIndex : 910,
		pos: [5, 285],
		render : "text",
		parameters : {
			weight : "bold",
			color : "#EFEFEF",
			template : "TIMER: {time}",
			size : 14
		},
		rules: ['timer']
	},
	bestTime: {
		id : 'bestTime',
		pos: [5, 295],
		zIndex : 900,
		render : "text",
		parameters : {
			weight : "bold",
			color : "#EFEFEF",
			size : 14,
			template : "BEST TIME: {time}"
		},
		rules: ['bestTime']
	},
	health : {
		id : 'health',
		pos: [5, 23],
		zIndex : 900,
		render : "text",
		parameters : {
			weight : "bold",
			color : "#EFEFEF",
			size : 14,
			template : "HEALTH: {health}"
		},
		rules: ['health']
	}
};

export default config