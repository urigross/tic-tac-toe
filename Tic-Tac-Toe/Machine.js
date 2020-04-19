// This class manages descitions of attack/block strategies/randoom play. Then write to board.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Machine = /** @class */ (function (_super) {
    __extends(Machine, _super);
    function Machine(x, y, choice, sign) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (choice === void 0) { choice = null; }
        if (sign === void 0) { sign = Cell.O; }
        return _super.call(this, x, y, choice) || this;
    }
    Machine.prototype.mPlay = function (Board1, Llogic, Player1, machineSign, humanSign) {
        Board1.winnerCell = Llogic.returnNumOfWinningStep(Board1, machineSign); // Checks if machine can win next step. Return the cell number or Nul in case Can't win next step
        if (Board1.winnerCell != null) {
            this.x = Llogic.num2X(Board1.winnerCell); // extract x axis from the next step winning cell by  number to axis function
            this.y = Llogic.num2Y(Board1.winnerCell); // extract y axis from the next step winning cell by  number to axis function
        }
        else if (Llogic.returnNumOfWinningStep(Board1, humanSign) != null) {
            Board1.winnerCell = Llogic.returnNumOfWinningStep(Board1, humanSign); // winnerCell update status
            this.x = Llogic.num2X(Board1.winnerCell); // extract x axis from the winning cell
            this.y = Llogic.num2Y(Board1.winnerCell); // extract y axis from the winning cell
        }
        else {
            do {
                this.choice = Llogic.randomMinMax(1, 9); // randoms 1-9
            } while (!Llogic.isClrCellInMatrix(Board1, this.choice, machineSign) && !Llogic.isFullMatrix(Board1.matrix)); // runs as long as matrix is not full and the cell is full
            this.y = Llogic.num2Y(this.choice); // Extracts Y Axis from number
            this.x = Llogic.num2X(this.choice); // Extracts X Axis from number     
        }
        Board1.insert2Cell(Board1, machineSign, this.y, this.x); // writes to board.
    };
    return Machine;
}(Player));
//# sourceMappingURL=Machine.js.map