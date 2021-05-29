import { GameObject } from './core/object';

const generate = (config: { n: number; width: number; height: number }) => {
  const n = config.n || 6;
  const width = config.width || 800;
  const height = config.height || 600;
  const sizeX = width >> n;
  const sizeY = height >> n;
  const cellGrid = new Array(sizeX * sizeY);

  const generateMap = () => {
    for (let i = 0; i < cellGrid.length; i++) {
      cellGrid[i] = [];
    }
  };

  const getCell = (point: number[]) => {
    return point[0] + point[1] * sizeY;
  };

  const removeObject = (object: GameObject) => {
    const oldCells = object.parameters.collisions.cells;

    for (let i = 0; i < oldCells.length; i++) {
      cellGrid[oldCells[i]] &&
        cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
    }
  };

  const getPointsOfObject = (object: GameObject) => {
    const pos = object.pos!;
    const size = object.size!;
    const cells = [];
    const xIndex = size[0] >> n;
    const yIndex = size[1] >> n;

    for (let i = 0; i < 2 + xIndex; i++) {
      for (let j = 0; j < 2 + yIndex; j++) {
        cells.push(
          getCell([
            (pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex))) >> n,
            (pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex))) >> n,
          ])
        );
      }
    }

    return cells;
  };

  const updateObject = (object: GameObject) => {
    const cells = getPointsOfObject(object);
    const oldCells = object.parameters.collisions.cells;

    for (let i = 0; i < cells.length; i++) {
      if (oldCells[i] !== cells[i]) {
        cellGrid[oldCells[i]] &&
          cellGrid[oldCells[i]].splice(
            cellGrid[oldCells[i]].indexOf(object),
            1
          );
        cellGrid[cells[i]] &&
          cellGrid[cells[i]].indexOf(object) === -1 &&
          cellGrid[cells[i]].push(object);
        oldCells[i] = cells[i];
      } else {
        cellGrid[cells[i]] &&
          cellGrid[cells[i]].indexOf(object) === -1 &&
          cellGrid[cells[i]].push(object);
      }
    }
  };

  const checkCollisions = () => {
    for (let i = 0; i <= sizeX; i++) {
      for (let j = 0; j <= sizeY; j++) {
        if (cellGrid[getCell([i, j])]) {
          const objects = cellGrid[getCell([i, j])];
          const length = objects.length;

          for (let k = 0; k < length; k++) {
            for (let l = k + 1; l < length; l++) {
              if (
                boxCollides(
                  objects[k].pos,
                  objects[k].size,
                  objects[l].pos,
                  objects[l].size
                )
              ) {
                objects[k].parameters.collisions.objects.indexOf(objects[l]) ===
                  -1 &&
                  objects[k].parameters.collisions.objects.push(objects[l]);
                objects[l].parameters.collisions.objects.indexOf(objects[k]) ===
                  -1 &&
                  objects[l].parameters.collisions.objects.push(objects[k]);
              }
            }
          }
        }
      }
    }
  };

  const collides = (
    x: number,
    y: number,
    width: number,
    height: number,
    x2: number,
    y2: number,
    width2: number,
    height2: number
  ) => (x < x2 + width2 &&
    x + width > x2 &&
    y < y2 + height2 &&
    y + height > y2);

  const boxCollides = (
    pos: Phaser.Point,
    size: number[],
    pos2: Phaser.Point,
    size2: number[]
  ) =>
    collides(
      pos.x - size[0] / 2,
      pos.y - size[1] / 2,
      size[0],
      size[1],
      pos2.x - size2[0] / 2,
      pos2.y - size2[1] / 2,
      size2[0],
      size2[1]
    );

  generateMap();

  return {
    cellGrid: cellGrid,
    updateObject: updateObject,
    removeObject: removeObject,
    check: checkCollisions,
    clear: generateMap,
  };
};

export default generate;
