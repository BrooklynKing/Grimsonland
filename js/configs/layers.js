var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [1224,968],
		background: 'img/terrain.png',
		initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore'],
		init: function() {
			this.game.parameters.monstersKilled = 0;
			this.game.parameters.gameTimer = 0;
		},
		translate: {
			x: -100,
			y: -100
		},

		rules: ['spawn_monster', 'random_trees' ,'spawn_heart','spawn_powerup', 'goWithPlayer']
	}
};

export default config;