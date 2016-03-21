var config = {
    monsterController : {
        render : false,
        collisions: false,
        parameters : {
            speed : 150
        },
        type : 'monsterController',
        rules : ['monsterController'],
        parameters: {
            monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
            monsterCooldown: 10
        }
    }
};

export default config;