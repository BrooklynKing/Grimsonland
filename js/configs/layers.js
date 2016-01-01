var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [900,800],
		background: 'img/terrain.png',
		init: function() {
			var	player = this.game.getConfig('player'),
				cursor = this.game.getConfig('cursor'),
				counter = this.game.getConfig('counter'),
				timer = this.game.getConfig('timer'),
				bestTime = this.game.getConfig('bestTime'),
				fireball = this.game.getConfig('fireballSpell'),
				frostShard = this.game.getConfig('frostShardSpell'),
				teleportSpell = this.game.getConfig('teleportSpell');

			this.game.parameters.monstersKilled = 0;
			this.game.parameters.gameTimer = 0;

			this.addObjects([player, cursor, counter, timer, bestTime, fireball, frostShard, teleportSpell]);
		},
		rules: ['spawn_monster', 'random_trees' ,'spawn_heart','spawn_powerup']
	}
};

export default config;