export const cellShouldDie = (numOfNeighboors: number) => 
    numOfNeighboors <= 1 || numOfNeighboors >= 4;

export const cellShouldBeBorn = (numOfNeighboors: number) => 
    numOfNeighboors === 3;
