var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [800,600],
		background: 'img/grass2.png',
		init: function() {
			var	player = this.game.getConfig('player'),
				cursor = this.game.getConfig('cursor'),
				counter = this.game.getConfig('counter'),
				timer = this.game.getConfig('timer'),
				bestTime = this.game.getConfig('bestTime');

			this.game.parameters.monstersKilled = 0;
			this.game.parameters.gameTimer = 0;

			this.addObjects([player, cursor, counter, timer, bestTime]);
		},
		rules: ['spawn_monster']
	}
};

export default config;