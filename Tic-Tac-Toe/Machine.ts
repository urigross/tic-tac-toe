// This class manages descitions of attack/block strategies/randoom play. Then write to board.

class Machine extends Player {
    public constructor(x:number=null,y:number=null,choice:number=null,sign:Cell=Cell.O) {
        super(x, y, choice);
    } 
   

    public mPlay(Board1: Board, Llogic: logic, Player1: Human,machineSign:Cell,humanSign:Cell): void {
        Board1.winnerCell = Llogic.returnNumOfWinningStep(Board1,machineSign);        // Checks if machine can win next step. Return the cell number or Nul in case Can't win next step
        if (Board1.winnerCell != null) {                                             // If !null fill X Axis & Y axis.
            this.x = Llogic.num2X(Board1.winnerCell);    // extract x axis from the next step winning cell by  number to axis function
            this.y = Llogic.num2Y(Board1.winnerCell);    // extract y axis from the next step winning cell by  number to axis function
            

        }
        
         

        else if (Llogic.returnNumOfWinningStep(Board1, humanSign) != null) {         //case Human can win in one step
            Board1.winnerCell = Llogic.returnNumOfWinningStep(Board1, humanSign);    // winnerCell update status
            this.x = Llogic.num2X(Board1.winnerCell);                     // extract x axis from the winning cell
            this.y = Llogic.num2Y(Board1.winnerCell);                    // extract y axis from the winning cell

        }
        else {
            do {    // case machine needs to make a random move (no need to make a win move/block move)
                this.choice = Llogic.randomMinMax(1, 9);  // randoms 1-9
            }
            while (!Llogic.isClrCellInMatrix(Board1, this.choice, machineSign) && !Llogic.isFullMatrix(Board1.matrix));  // runs as long as matrix is not full and the cell is full
            this.y = Llogic.num2Y(this.choice);  // Extracts Y Axis from number
            this.x = Llogic.num2X(this.choice);  // Extracts X Axis from number     












        }
        

            Board1.insert2Cell(Board1, machineSign, this.y, this.x);  // writes to board.
    }

    
}
