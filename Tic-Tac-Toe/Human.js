// this class represents the human managment. It prompts user choice and validates it (error input & available cell) then write it to the board.
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
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(x, y, choice, sign) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (choice === void 0) { choice = null; }
        if (sign === void 0) { sign = Cell.X; }
        return _super.call(this, x, y, choice) || this;
    }
    Human.prototype.hPlay = function (LogicGame, Board1, Gui1, machine1, machineSign) {
        do {
            this.choice = Number(prompt("Enter Your move")); // prompts data
            if (isNaN(this.choice)) {
                Gui1.nanMsg(); // case true: error message
            }
            else if (this.choice < 1 || this.choice > 9) {
                Gui1.outOfRangeMsg(); // case true: error message
            }
            else if (LogicGame.isClrCellInMatrix(Board1, this.choice, machineSign)) {
                break; // case true 
            }
            else {
                Gui1.occupiedCellMsg(); // false: error occupied cell msg...
            }
        } while (true);
        this.x = LogicGame.num2X(this.choice); // number to X Axis.
        this.y = LogicGame.num2Y(this.choice); // number to Y Axis.
        Board1.insert2Cell(Board1, Cell.X, this.y, this.x); //writes  x,y to board
    };
    return Human;
}(Player));
//# sourceMappingURL=Human.js.map