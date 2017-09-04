var config = {
    monsterController : {
        render : false,
        collisions: false,
        type : 'monsterController',
        rules : ['monsterController'],
        parameters: {
            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
            monsterCooldown: 7
        }
    }
};

export default config;