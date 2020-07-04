export type Coords = {
    x: number;
    y: number;
};

class Matrix<T> {
    private cells: T[][];

    constructor(xSize: number, ySize: number, defaultValue: T | null = null) {
        this.cells = new Array(ySize)
            .fill([])
            .map(() => new Array(xSize)
                .fill(defaultValue))
    }

    getAllCells(): T[][] {
        return this.cells;
    }

    getCell({ x, y }: Coords): T {
        if (!this.cells[y]) return null;

        return this.cells[y][x];
    }

    setCell({ x, y }: Coords, value: T) {
        if (!this.cells[y]) return;

        this.cells[y][x] = value;
    }

    updateEveryCell(updater: (cell: T, coords: Coords) => T) {
        this.cells = this.cells
            .map((row, y) => row
                .map((cell, x) => updater(cell, { x, y })))
    }

    forEach(callback: (cell: T, coords: Coords) => void) {
        this.cells
            .forEach((row, y) => row
                .forEach((cell, x) => callback(cell, { x, y })))
    }

    static getSorroundingIndexes({ x, y }: Coords): Coords[] {
        return [
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
            { x: x,     y: y + 1 },
            { x: x,     y: y - 1 },
            { x: x + 1, y: y     },
            { x: x - 1, y: y     }
        ];
    }
}

export default Matrix;
