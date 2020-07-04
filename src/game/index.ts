import Matrix, { Coords } from '../lib/Matrix';
import { cellShouldDie, cellShouldBeBorn } from './rules';

class Game {
    public matrix: Matrix<boolean>;

    constructor(gameSize: Coords) {
        this.matrix = new Matrix(gameSize.x, gameSize.y);
    }

    countCellNeighboors(coords: Coords) {
        return Matrix.getSorroundingIndexes(coords)
            .filter((coord) => this.matrix.getCell(coord))
            .length
    }

    toggleCells(cellCoords: Coords[]) {
        cellCoords.forEach((coord) => 
            this.matrix
                .setCell(coord, !this.matrix.getCell(coord)));
    }

    nextGeneration() {
        this.matrix.updateEveryCell((cell, coords) => {
            const numOfNeighboors = this.countCellNeighboors(coords);

            if (cellShouldDie(numOfNeighboors)) {
                return false;
            }

            if (cellShouldBeBorn(numOfNeighboors)) {
                return true;
            }

            return cell;
        });
    }
    
}

export default Game;
