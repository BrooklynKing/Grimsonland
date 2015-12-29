var config = {
	mainLayer : {
		id: 'mainLayer',
		size : [800,600],
		background: 'img/grass2.png',
		init: function() {
			var	playerConfig = this.game.getConfig('player');
			playerConfig.pos = [400,300];
			playerConfig.id = 'player';

			var	cursorConfig = this.game.getConfig('cursor');
			cursorConfig.pos = [400,350];
			cursorConfig.id = 'cursor';

			this.addObjects([cursorConfig, playerConfig]);
		},
		rules: ['spawn_monster']
	}
};

export default config;