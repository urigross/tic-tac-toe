// this class represents the human managment. It prompts user choice and validates it (error input & available cell) then write it to the board.


class Human extends Player {

    public constructor(x: number = null, y: number = null, choice: number = null, sign: Cell = Cell.X) {
        super(x, y, choice);
    }
    

    

    public hPlay(LogicGame: logic, Board1: Board, Gui1: Gui, machine1:Machine,machineSign:Cell): void {


        do {  // this loop prompts choice from user and validates it.

            this.choice = Number(prompt(`Enter Your move`));  // prompts data
            if (isNaN(this.choice)) {   // NaN check
                Gui1.nanMsg();   // case true: error message
            }
            else if (this.choice < 1 || this.choice > 9) {   // number bounderies check
                Gui1.outOfRangeMsg();  // case true: error message
            }
            else if (LogicGame.isClrCellInMatrix(Board1, this.choice, machineSign)) {   // checks if choice is to empty cell.
                break;  // case true 
            }
            else {
                Gui1.occupiedCellMsg();  // false: error occupied cell msg...
            }
            
        }

        while (true)
        
        this.x = LogicGame.num2X(this.choice);  // number to X Axis.
        this.y = LogicGame.num2Y(this.choice);   // number to Y Axis.
        Board1.insert2Cell(Board1, Cell.X, this.y, this.x); //writes  x,y to board

    }
    
}






