var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [600,600],
		background: 'img/grass3.png',
		init: function() {
			var	playerConfig = this.game.getConfig('player');
			playerConfig.pos = [300,300];
			playerConfig.id = 'player';

			var	cursorConfig = this.game.getConfig('cursor');
			cursorConfig.pos = [300,300];
			cursorConfig.id = 'cursor';

			this.addObjects([cursorConfig, playerConfig]);
		},
		rules: ['spawn_monster']
	}
};

export default config;