import utils from './utils'

function generate(config) {
    var n = config.n || 6,
        width = config.width || 800,
        height = config.height || 600,
        sizeX = (width) >> n,
        sizeY = (height) >> n,
        cellGrid = new Array(sizeX * sizeY);

    generateMap();

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
            cells = [],
            oldCells = object.getParameter('collisions').cells,
            xIndex = size[0] >> n,
            yIndex = size[1] >> n;

        for (var i = 0; i < 2 + xIndex; i++) {
            for (var j = 0; j < 2 + yIndex; j++) {
                cells.push(getCell([
                    (pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex))) >> n,
                    (pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex))) >> n
                ]));
            }
        }

        for (var i = 0; i < cells.length; i++) {
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