var config = {
    cursor : {
        zIndex : 999,
        id : 'cursor',
        pos: [400,350],
        sprite : ['img/cursor.png', [0, 0], [30, 30]],
        rules: ['bindPositionToMouse']
    },
    counter: {
        id : 'counter',
        zIndex : 910,
        pos: [5, 13],
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            template : "DEMONS KILLED: {kills}",
            size : 14
        },
        rules: ['countMonsterKilled']
    },
    timer: {
        id : 'timer',
        zIndex : 910,
        pos: [5, 285],
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
        id : 'bestTime',
        pos: [5, 295],
        zIndex : 900,
        render : "text",
        parameters : {
            weight : "bold",
            color : "#EFEFEF",
            size : 14,
            template : "BEST TIME: {time}"
        },
        rules: ['bestTime']
    }
};

export default config;