var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [800,600],
		background: 'img/terrain.png',
		initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell'],
		init: function() {
			this.game.parameters.monstersKilled = 0;
			this.game.parameters.gameTimer = 0;
		},
		rules: ['spawn_monster', 'random_trees' ,'spawn_heart','spawn_powerup']
	}
};

export default config;