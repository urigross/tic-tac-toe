var logic = /** @class */ (function () {
    function logic() {
    }
    logic.prototype.isClrCellInMatrix = function (Bboard, choicee, sign) {
        var YAxis = this.num2Y(choicee); // Extracts choice to Y Axis
        var XAxis = this.num2X(choicee); // Extracts choice to X Axis
        return this.isCellClear(Bboard.matrix[YAxis][XAxis], sign); // Checks is the cell is clear
    };
    logic.prototype.isCellClear = function (x, sign) {
        return x == Cell.Empty;
    };
    logic.prototype.yX2Num = function (y, x) {
        return y * 3 + x + 1;
    };
    logic.prototype.num2Y = function (y) {
        return Math.floor(y / 3.1);
    };
    logic.prototype.num2X = function (x) {
        return (x - 1) - Math.floor(x / 3.1) * 3;
    };
    logic.prototype.isFullMatrix = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (this.returnXAxisOfEmptyCell(arr[i]) != null)
                return false;
        }
        return true;
    };
    logic.prototype.returnXAxisOfEmptyCell = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (this.isCellClear(arr[i], Cell.O)) {
                return i;
            }
        }
        return null;
    };
    logic.prototype.returnYAxisOfEmptyCell = function (matrix, y) {
        for (var j = 0; j < matrix[y].length; j++) {
            if (this.isCellClear(matrix[y][j], Cell.O)) {
                return j;
            }
        }
        return null;
    };
    logic.prototype.XPosWinnerCellInRaw = function (matrix, yAxis, sign) {
        var counter = 0, emptyX = null;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[yAxis][i] == sign) {
                counter++;
            }
            if (matrix[yAxis][i] == Cell.Empty) {
                emptyX = i;
            }
        }
        if (counter == 2 && emptyX != null) {
            return emptyX; // true: return X axis of empty cell
        }
        return null; // false: null
    };
    logic.prototype.YPosWinnerCellInCol = function (matrixx, sign, xAxis) {
        var counter = 0, emptyY = null;
        for (var i = 0; i < matrixx.length; i++) {
            if (matrixx[i][xAxis] == sign) {
                counter++;
            }
            if (matrixx[i][xAxis] == Cell.Empty) {
                emptyY = i;
            }
        }
        if (counter == 2 && emptyY != null) {
            return emptyY;
        }
        return null;
    };
    // returns the number of the last cell to win the game if there isn't one - return null.  Checks raws,cols,crosses
    logic.prototype.returnNumOfWinningStep = function (BBBBBbord, sign) {
        var x, y, cross1To9Result = null, cross3To7Result = null;
        for (var i = 0; i < BBBBBbord.matrix.length; i++) {
            x = this.XPosWinnerCellInRaw(BBBBBbord.matrix, i, sign); // search for O in raw
            y = this.YPosWinnerCellInCol(BBBBBbord.matrix, sign, i); // search for O in raw
            if (x != null) {
                return this.yX2Num(i, x); // if finds in raw winning step - returns the x Axis
            }
            if (y != null) {
                return this.yX2Num(y, i); // if finds in column winning step - returns the y Axis
            }
        }
        cross1To9Result = this.cross1To9Scan(BBBBBbord.matrix, sign); // checks cross 1to9 if finds  next step  winning cell returns its number
        if (cross1To9Result != null) {
            return cross1To9Result;
        }
        cross3To7Result = this.cross3To7Scan(BBBBBbord.matrix, sign); // checks cross 3to7 - if finds next step winning cell returns its number
        return cross3To7Result != null ? cross3To7Result : null;
    };
    // checks cross 1to9- if finds next step winning cell returns its number
    logic.prototype.cross1To9Scan = function (matrix, sign) {
        var counter = 0, emptyY = null, emptyX = null, x = 0;
        for (var y = 0; y < matrix.length; y++) {
            if (matrix[y][x] == sign) {
                counter++;
            }
            if (matrix[y][x] == Cell.Empty) {
                emptyY = y, emptyX = x;
            }
            x++;
        }
        if (counter == 2 && emptyX != null && emptyY != null) {
            return this.yX2Num(emptyY, emptyX);
        }
        return null;
    };
    // checks cross 3to7 - if finds next step winning cell returns its number
    logic.prototype.cross3To7Scan = function (matrix, sign) {
        var counter = 0, emptyY = null, emptyX = null, x = matrix.length - 1;
        for (var y = 0; y < matrix.length; y++) {
            if (matrix[y][x] == sign) {
                counter++;
            }
            if (matrix[y][x] == Cell.Empty) {
                emptyY = y, emptyX = x;
            }
            x--;
        }
        if (counter == 2 && emptyY != null && emptyX != null) {
            return this.yX2Num(emptyY, emptyX);
        }
        return null;
    };
    logic.prototype.randomMinMax = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    // isWinnerRaw checks: if any of the cells got else than tagret cell means that this is not winning row.
    logic.prototype.isWinnerRaw = function (matrix, yAxis, sign) {
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[yAxis][i] != sign) {
                return false;
            }
        }
        return true;
    };
    // isWinnerCol : if finds other content than target in any of the cells return false
    logic.prototype.isWinnerCol = function (matrixx, sign, xAxis) {
        for (var i = 0; i < matrixx.length; i++) {
            if (matrixx[i][xAxis] != sign) {
                return false;
            }
        }
        return true;
    };
    //isWinnerMatrixRawCol: finds in raw and cols if there is a win.
    logic.prototype.isWinnerMatixRawCol = function (matrix, sign) {
        for (var i = 0; i < matrix.length; i++) {
            if (this.isWinnerRaw(matrix, i, sign)) {
                return true;
            }
            for (var j = 0; j < matrix[i].length; j++) {
                if (this.isWinnerCol(matrix, sign, j)) {
                    return true;
                }
            }
        }
        return false;
    };
    // checks if there is winner cross 1 to 9
    logic.prototype.is1To9Winner = function (matrix, sign) {
        var XFwd = 0, counter = 0;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][XFwd] == sign) {
                counter++;
            }
            XFwd++;
        }
        return counter == 3 ? true : false;
    };
    // checks if there is winner cross 3 to 7
    logic.prototype.is3To7Winner = function (matrix, sign) {
        var XRev = matrix.length - 1, counter = 0;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][XRev] == sign) {
                counter++;
            }
            XRev--;
        }
        return counter == 3 ? true : false; // if 3 matches return true
    };
    // general function checks if there is a win
    logic.prototype.isWinner = function (matrix, player1Cell, machine1Cell) {
        if (this.isWinnerMatixRawCol(matrix, player1Cell) || this.is1To9Winner(matrix, player1Cell) || this.is3To7Winner(matrix, player1Cell)) {
            return player1Cell; //checks if player wins rows,cols,cross
        }
        else if (this.isWinnerMatixRawCol(matrix, machine1Cell) || this.is1To9Winner(matrix, machine1Cell) || this.is3To7Winner(matrix, machine1Cell)) {
            return machine1Cell; //checks if machine wins rows,cols,cross
        }
        else {
            return Cell.Empty;
        }
    };
    return logic;
}());
//# sourceMappingURL=Logic.js.map