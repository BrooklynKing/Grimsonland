var config = {
    cursor : {
        zIndex : 3000,
        render: 'cursor',
        pos: [400,350],
        sprite : ['cursor', [0, 0], [30, 30]],
        rules: ['bindPositionToMouse']
    },
    counter: {
        zIndex : 3000,
        pos: [5, 13],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#DAA520",
            template : "SCORE: {kills}",
            size : 14
        },
        rules: ['countMonsterKilled']
    },
    leftOnWaveLabel: {
        zIndex : 3000,
        pos: [5, 100],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#DAA520",
            template : "LEFT ON THIS WAVE: {count}",
            size : 14
        }
    },
    level: {
        zIndex : 3000,
        pos: [35, 45],
        render : "expBar",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            template : "LEVEL: {level}",
            size : 14
        },
        rules: ['level']
    },
    timer: {
        zIndex : 3000,
        pos: [5, 23],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#DAA520",
            template : "TIMER: {time}",
            size : 14
        },
        rules: ['timer']
    },
    bestTime: {
        pos: [5, 370],
        zIndex : 3000,
        render : "text",
        parameters : {
            weight : "bold",
            color : "#DAA520",
            size : 14,
            template : "BEST TIME: {time}"
        },
        rules: ['bestTime']
    },
    bestScore: {
        pos: [5, 380],
        zIndex : 3000,
        render : "text",
        parameters : {
            weight : "bold",
            color : "#DAA520",
            size : 14,
            template : "BEST SCORE: {score}"
        },
        rules: ['bestScore']
    }
};

export default config;