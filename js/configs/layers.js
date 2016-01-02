var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [1024,768],
		background: 'img/terrain.png',
		initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore'],
		init: function() {
			this.game.parameters.monstersKilled = 0;
			this.game.parameters.gameTimer = 0;
		},
		rules: ['spawn_monster', 'random_trees' ,'spawn_heart','spawn_powerup']
	}
};

export default config;