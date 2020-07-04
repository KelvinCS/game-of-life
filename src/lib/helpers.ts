import Matrix from './Matrix';

export const printMatrix = (matrix: Matrix<boolean>) => {
    const representation = matrix.getAllCells()
        .map((row) => row 
            .map(x => x ? 'A' : ' ')
            .join(' '))
        .join('\n')

    console.log(representation);
};
