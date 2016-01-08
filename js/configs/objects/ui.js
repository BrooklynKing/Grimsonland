var config = {
    cursor : {
        zIndex : 2000,
        render: 'cursor',
        pos: [400,350],
        sprite : ['cursor', [0, 0], [30, 30]],
        rules: ['bindPositionToMouse']
    },
    counter: {
        zIndex : 2000,
        pos: [5, 13],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            template : "SCORE: {kills}",
            size : 14
        },
        rules: ['countMonsterKilled']
    },
    level: {
        zIndex : 2000,
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
        zIndex : 2000,
        pos: [5, 23],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            template : "TIMER: {time}",
            size : 14
        },
        rules: ['timer']
    },
    bestTime: {
        pos: [5, 370],
        zIndex : 2000,
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            size : 14,
            template : "BEST TIME: {time}"
        },
        rules: ['bestTime']
    },
    bestScore: {
        pos: [5, 380],
        zIndex : 2000,
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            size : 14,
            template : "BEST SCORE: {score}"
        },
        rules: ['bestScore']
    }
};

export default config;