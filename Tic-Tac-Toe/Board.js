var Board = /** @class */ (function () {
    function Board() {
        this.matrix = new Array(3); //Creates main Array 3 empty cells.
    }
    Board.prototype.intMainArr = function (Bboard) {
        this.createSubArray(Bboard, 3); // calls to create the sub array
        this.cleanMatrixCells(Bboard); // calls to delete cells from the matrix.
    };
    Board.prototype.createSubArray = function (Bboard, subArrayLength) {
        for (var i = 0; i < Bboard.matrix.length; i++) {
            Bboard.matrix[i] = new Array(subArrayLength);
        }
    };
    Board.prototype.cleanMatrixCells = function (Bboard) {
        for (var i = 0; i < Bboard.matrix.length; i++) {
            for (var j = 0; j < Bboard.matrix[i].length; j++) {
                this.insert2Cell(Bboard, Cell.Empty, i, j); // deleting cells from the Matrix.
            }
        }
    };
    Board.prototype.insert2Cell = function (Bboard, sign, y, x) {
        Bboard.matrix[y][x] = sign;
    };
    return Board;
}());
//# sourceMappingURL=Board.js.map