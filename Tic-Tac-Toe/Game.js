// The games runs here in general area
var Game = /** @class */ (function () {
    function Game() {
        this.Board1 = new Board;
        this.Gui1 = new Gui;
        this.Player1 = new Human;
        this.LogicGame = new logic;
        this.Machine1 = new Machine;
        this.fullMatrix = false; // Represents the status of the board: True means Full Board.
        this.humanSign = Cell.X; // 
        this.machineSign = Cell.O;
    }
    Game.prototype.start = function (Game1) {
        this.Board1.intMainArr(this.Board1); // Create board , Empty board Cells
        this.Gui1.display(this.Board1, ""); //  Alert Displaying Board
        do {
            this.Player1.hPlay(this.LogicGame, this.Board1, this.Gui1, this.Machine1, this.machineSign); // Manage human prompt for play + error messsages.
            this.winner = this.LogicGame.isWinner(this.Board1.matrix, this.humanSign, this.machineSign); //checks if there is a winner and update winner status.
            this.fullMatrix = this.LogicGame.isFullMatrix(this.Board1.matrix); //checks if full matrix and update fullmatrix status
            if (this.winner == 1) {
                this.Gui1.humanWinMsg(); // human wins message
                this.Gui1.display(this.Board1, "\n                                             Human Won!"); // display win message also on board alert
                break;
            }
            if (this.fullMatrix) {
                this.Gui1.tieMsg(); // " Tie " message
                this.Gui1.display(this.Board1, "\n                                             Game Result: Tie."); // display tie message also on board alert
                break;
            }
            this.Gui1.display(this.Board1, ""); // display board status                        
            this.Machine1.mPlay(this.Board1, this.LogicGame, this.Player1, this.machineSign, this.humanSign); //machine to play mangement (sub functions with winning/defense/random actions)
            this.winner = this.LogicGame.isWinner(this.Board1.matrix, this.humanSign, this.machineSign); // checks if the is a winner and update status
            this.fullMatrix = this.LogicGame.isFullMatrix(this.Board1.matrix); // checks if tie and update status
            if (this.winner == 2) {
                this.Gui1.machineWinMsg(); // alert machine win
                this.Gui1.display(this.Board1, "\n                                             Machine Won!"); // also display machine win on board status display
                break;
            }
            if (this.fullMatrix) {
                this.Gui1.tieMsg(); // display tie message
                this.Gui1.display(this.Board1, "\n                                             Game Result: Tie."); // also display tie on board status
                break;
            }
            this.Gui1.display(this.Board1, ""); //display board status
        } while (true);
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map