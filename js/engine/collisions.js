import utils from './utils'

function generate(config) {
    var n = config.n || 6,
        width = config.width || 800,
        height = config.height || 600,
        sizeX = (width) >> n,
        sizeY = (height) >> n,
        cellGrid = new Array(sizeX * sizeY);

    for (var i = 0; i < cellGrid.length; i++) {
        cellGrid[i] = [];
    }

    function generateMap() {
        for (var i = 0; i < cellGrid.length; i++) {
            cellGrid[i] = [];
        }
    }
    function getCell(point) {
        return (point[0]) + point[1] * sizeY;
    }

    function removeObject(object){
        var oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < oldCells.length; i++) {
            cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
        }
    }

    function updateObject(object) {
        var pos = object.pos,
            size = object.size,
            point1 = [(pos.x + size[0] / 2) >> n, (pos.y + size[1] / 2) >> n],
            point2 = [(pos.x - size[0] / 2) >> n, (pos.y - size[1] / 2) >> n],
            point3 = [(pos.x + size[0] / 2) >> n, (pos.y - size[1] / 2) >> n],
            point4 = [(pos.x - size[0] / 2) >> n, (pos.y + size[1] / 2) >> n],
            point5 = [pos.x >> n, pos.y >> n],
            cells = [getCell(point1), getCell(point2), getCell(point3), getCell(point4), getCell(point5)],
            oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < oldCells.length; i++) {
            if (oldCells[i] != cells[i]) {
                cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
                cellGrid[cells[i]] && (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
                oldCells[i] = cells[i];
            } else {
                cellGrid[cells[i]] && (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
            }
        }
    }

    function checkCollisions() {
        for (var i = 0; i <= sizeX; i++) {
            for (var j = 0; j <= sizeY; j++) {
                if (cellGrid[getCell([i, j])]) {
                    var objects = cellGrid[getCell([i, j])],
                        length = objects.length;

                    for (var k = 0; k < length; k++) {
                        for (var l = k + 1; l < length; l++) {
                            if (utils.boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
                                (objects[k].getParameter('collisions').indexOf(objects[l]) == -1 ) && objects[k].getParameter('collisions').push(objects[l]);
                                (objects[l].getParameter('collisions').indexOf(objects[k]) == -1 ) && objects[l].getParameter('collisions').push(objects[k]);
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        cellGrid: cellGrid,
        updateObject: updateObject,
        removeObject: removeObject,
        check: checkCollisions,
        clear: generateMap
    };
}

export default generate;