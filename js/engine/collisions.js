import utils from './utils'

function generate(config) {
    var n = config.n || 6,
        width = config.width || 800,
        height = config.height || 600,
        sizeX = width >> n,
        sizeY = height >> n,
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
        return point[0] + point[1] * sizeY;
    }

    function removeObject(object){
        var oldCells = object.parameters.collisions.cells;

        for (var i = 0; i < oldCells.length; i++) {
            oldCells[i] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
        }
    }

    function checkPlace(object) {
        var pos = object.pos,
            size = object.size,
            point1 = [pos[0] + size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
            point2 = [pos[0] - size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
            point3 = [pos[0] + size[0] / 2 >> n, pos[1] - size[1] / 2 >> n],
            point4 = [pos[0] - size[0] / 2 >> n, pos[1] + size[1] / 2 >> n],
            cells = [getCell(point1), getCell(point2), getCell(point3), getCell(point4)],
            oldCells = object.parameters.collisions.cells;

        if (point1[0] < 0 || point1[1] < 0 || point2[0] < 0 || point2[1] < 0 || point3[0] < 0 || point3[1] < 0 || point4[0] <0 || point4[1] < 0) {
            return;
        }
        if (point1[0] > width || point1[1] > height || point2[0] > width || point2[1] > height || point3[0] > width || point3[1] > height || point4[0] > width || point4[1] > height) {
            return;
        }
        for (var i = 0; i < oldCells.length; i++) {
            if (oldCells[i] != cells[i]) {
                oldCells[i] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
                (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
                oldCells[i] = cells[i];
            } else {
                (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
            }
        }
    }

    function update() {
        for (var i = 0; i <= sizeX; i++) {
            for (var j = 0; j <= sizeY; j++) {
                var objects = cellGrid[getCell([i, j])],
                    length = objects.length;

                for (var k = 0; k < length; k++) {
                    for (var l = k + 1; l < length; l++) {
                        if (objects[k].pos && objects[k].size && objects[l].pos && objects[l].size)
                        if (utils.boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
                            objects[k].parameters.collisions.push(objects[l]);
                            objects[l].parameters.collisions.push(objects[k]);
                        }
                    }
                }
            }
        }
    }

    return {
        cellGrid: cellGrid,
        checkPlace: checkPlace,
        removeObject: removeObject,
        update: update,
        clear: generateMap
    };
}

export default generate;