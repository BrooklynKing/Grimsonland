var config = {
		player : {
			zIndex : 2,
			id : 'player',
			sprite: ['img/sprites2.png', [0, 0], [32, 32], 6, [0, 1, 2]],
			size : [30,30],
			parameters : {
				speed : 150,
				health : 1,
				cooldown: 10,
				fireCooldown : 10,
				bulletsFired: 0,
				direction : {}
			},
			type : 'player',
			rules : ['bindPositionToLayer', 'playerDeath', 'canShoot', 'moveToDirection', 'rotateToMouse']
		},
		explosion : {
			zIndex : 3,
			sprite: ['img/sprites.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true]
		},
		monster : {
			zIndex : 1,
			sprite: ['img/sprites2.png', [0, 128], [32, 32], 6, [0, 1, 2]],
			size : [30,30],
			parameters : {
				speed : 50,
				degreeSpeed: 0.03,
				degreeRotation : 1,
				health : 6,
				power : 1
			},
			type : 'monster',
			rules : ['setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus', 'damageOnPlayerCollision', 'rotateByDirection', 'canShoot'],
		},
		monsterBoss : {
			zIndex : 1,
			sprite: ['img/sprites2.png', [192, 128], [32, 32], 6, [0, 1, 2]],
			size : [30,30],
			parameters : {
				speed : 30,
				degreeSpeed: 0.03,
				degreeRotation : 1,
				bulletsFired : 0,
				cooldown : 70 ,
				fireCooldown : 20,
				power : 5,
				health : 30
			},
			type : 'monster',
			rules : ['setDirectionToPlayer', 'moveToDirection', 'monsterHealthStatus','rotateByDirection', 'canShoot'],
		},
		bullet : {
			zIndex : 2,
			sprite: ['img/bsprite.png',[ 0, 0], [27, 27], 16, [0, 1]],
			size : [20, 20],
			type : 'spellElement',
			parameters : {
				power : 10,
				speed: 350
			},
			rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnMonsterCollision', 'destroyOnMonsterCollision']
		},
		mbullet : {
			zIndex : 2,
			sprite: ['img/iceball.png',[0, 0], [15, 16], 16, [0, 1, 2]],
			type : 'monsterSpellElement',
			size : [12, 12],
			parameters : {
				power : 1,
				speed: 150
			},
			rules : ['destroyAfterLeavingLayer', 'moveToDirection', 'damageOnPlayerCollision', 'destroyOnPlayerCollision']
		},
		cursor : {
			zIndex : 999,
			sprite : ['img/cursor.png', [0, 0], [30, 30]]
		},
		blood : {
			zIndex : 0,
			sprite : ['img/blood.png', [0, 0], [32, 13]],
			parameters : {
				cooldown : 500
			}
		}
	};

export default config