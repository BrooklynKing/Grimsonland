var config = {
    cursor : {
        zIndex : 999,
        pos: [400,350],
        sprite : ['img/cursor.png', [0, 0], [30, 30]],
        rules: ['bindPositionToMouse']
    },
    counter: {
        zIndex : 910,
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
    timer: {
        zIndex : 910,
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
        zIndex : 900,
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
        zIndex : 900,
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