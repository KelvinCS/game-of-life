import P5 from "p5";
import Game from './game';
import { Coords } from './lib/Matrix';
import "p5/lib/addons/p5.dom";

import "./styles.scss";

const cellSize = 5;

let enableEvolution = false;

const calculatePosition = ({ x, y }: Coords, size: number): Coords => ({
    x: x * size,
    y: y * size
});

const createCell = (coords: Coords, size: number, p5: P5) => {
    const { x, y } = calculatePosition(coords, size);

    p5.fill(140);
    p5.strokeWeight(1);
    p5.stroke(54);
    p5.rect(x, y, size, size);
}

const game = new Game({
    x: 200,
    y: 120
});

const sketch = (p5: P5) => {

	p5.setup = () => {
		p5.createCanvas(1000, 600)
            .parent("app");

        p5.frameRate(10);
	};

    p5.mousePressed = () => {
        const x = Math.floor(p5.mouseX / cellSize);
        const y = Math.floor(p5.mouseY / cellSize);

        game.toggleCells([{ x, y }]);
    }

    p5.keyPressed = () => {
        if (p5.keyCode !== p5.ENTER) return;
        
        enableEvolution = !enableEvolution;
    }

	p5.draw = () => {
        if (enableEvolution) game.nextGeneration();

        p5.background('white');
        game.matrix.forEach((alive, coords) => {
            if (!alive) return;

            createCell(coords, cellSize, p5); 
        })

	};
};

new P5(sketch);
