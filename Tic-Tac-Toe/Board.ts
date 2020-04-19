class Board {
    public matrix: Array<Cell[]> = new Array<Cell[]>(3);  //Creates main Array 3 empty cells.
    public winnerCell: number;
    



    intMainArr(Bboard: Board): void {

        this.createSubArray(Bboard, 3);  // calls to create the sub array
        this.cleanMatrixCells(Bboard);  // calls to delete cells from the matrix.

    }

    private createSubArray(Bboard:Board, subArrayLength: number): void {  //create sub arrays ( operators: array and length of the sub Array)
        for (let i = 0; i < Bboard.matrix.length; i++) {   
            Bboard.matrix[i] = new Array<number>(subArrayLength);
        }
    }

    private cleanMatrixCells(Bboard:Board): void {
        for (let i = 0; i < Bboard.matrix.length; i++) {   
            for (let j = 0; j < Bboard.matrix[i].length; j++) {  
                this.insert2Cell(Bboard,Cell.Empty,i,j);                // deleting cells from the Matrix.
            }
        }
    }
    public insert2Cell(Bboard:Board,sign: Cell, y: number, x: number): void {
        Bboard.matrix[y][x] = sign;
    }
    
}
