var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [1324,1068],
		background: 'terrain',
		initList : ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level','fog', 'monsterController'],
		init: function() {
			this.state.parameters.monstersKilled = 0;
			this.state.parameters.gameTimer = 0;
		},
		translate: {
			x: -150,
			y: -150
		},
		rules: ['random_trees' ,'spawn_heart','spawn_powerup', 'goWithPlayer']
	}
};

export default config;