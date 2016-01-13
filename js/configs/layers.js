var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [1224,968],
		background: 'terrain',
		initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level'],
		init: function() {
			this.state.parameters.monstersKilled = 0;
			this.state.parameters.gameTimer = 0;
		},
		translate: {
			x: -100,
			y: -100
		},
		rules: ['spawn_monster', 'random_trees' ,'spawn_heart','spawn_powerup', 'goWithPlayer']
	}
};

export default config;