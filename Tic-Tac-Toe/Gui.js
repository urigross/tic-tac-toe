var Gui = /** @class */ (function () {
    function Gui() {
        this.index = 1;
    }
    Gui.prototype.returnCellContent = function (value) {
        switch (value) {
            case Cell.Empty: return this.index.toString();
            case Cell.X: return "X";
            case Cell.O: return "O";
        }
    };
    Gui.prototype.display = function (Bboard, strAddon) {
        var str = "";
        str = this.drawMinusRaw(19);
        for (var i = 0; i < Bboard.matrix.length; i++) {
            str += "                                          ";
            str += "|  ";
            for (var j = 0; j < Bboard.matrix[i].length; j++) {
                str += " " + this.returnCellContent(Bboard.matrix[i][j]) + "   |  ";
                this.index++;
            }
            str += "\n";
            str += this.drawMinusRaw(19);
        }
        this.index = 1;
        alert("" + (str + strAddon));
    };
    Gui.prototype.drawMinusRaw = function (value) {
        var str = "";
        str += "                                          ";
        for (var i = 1; i <= value; i++) {
            str += "-";
        }
        str += '\n';
        return str;
    };
    Gui.prototype.machineWinMsg = function () {
        alert("Machine wins the game.");
    };
    Gui.prototype.humanWinMsg = function () {
        alert("Human Wins the game.");
    };
    Gui.prototype.occupiedCellMsg = function () {
        alert("This cell is unavailable. Please Choose another cell.");
    };
    Gui.prototype.tieMsg = function () {
        alert("Game result: Tie.");
    };
    Gui.prototype.nanMsg = function () {
        alert("You entered a character which is not a number - Only numbers allowed.\n\nPlease try again.");
    };
    Gui.prototype.outOfRangeMsg = function () {
        alert("Entered number is out of range (1-9). Please try again.");
    };
    return Gui;
}());
//# sourceMappingURL=Gui.js.map