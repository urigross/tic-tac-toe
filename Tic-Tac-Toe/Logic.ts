class logic {

    public isClrCellInMatrix(Bboard: Board, choicee: number, sign: Cell): boolean {  // checks if given cell in matrix is available
        let YAxis: number = this.num2Y(choicee);  // Extracts choice to Y Axis
        let XAxis: number = this.num2X(choicee);   // Extracts choice to X Axis
        return this.isCellClear(Bboard.matrix[YAxis][XAxis], sign);  // Checks is the cell is clear


    }

    private isCellClear(x: number, sign: Cell): boolean {   // checks if the cell is empty

        return x == Cell.Empty;
    }

    
    private yX2Num(y: number, x: number): number {   // decodes XY axis to number on board
        return y * 3 + x + 1;
    }

    public num2Y(y: number): number {  //Extracts number to Y Axis
        return Math.floor(y / 3.1);  
    }
    public num2X(x: number): number { //Extracts number to X Axis
        return (x - 1) - Math.floor(x / 3.1) * 3;    
    }

    public isFullMatrix(arr: Cell[][]): boolean {      // checks if the matrix is full
        for (let i = 0; i < arr.length; i++) {
            if (this.returnXAxisOfEmptyCell(arr[i]) != null)  

                return false;
        }
        return true;
    }
        
    private returnXAxisOfEmptyCell(arr: Cell[]): number {  // If there is empty cell in a raw - return its X Axis.
        for (let i = 0; i < arr.length; i++) {
            if (this.isCellClear(arr[i], Cell.O)) {
                return i;
            }



        }
        return null;
    }

    private returnYAxisOfEmptyCell(matrix: Cell[][], y: number): number {  // If there is empty cell in a raw - return its X Axis.
        for (let j = 0; j < matrix[y].length; j++) {
            if (this.isCellClear(matrix[y][j], Cell.O)) {
                return j;

            }
            
        }
        return null;
    }
        
    private XPosWinnerCellInRaw(matrix: Cell[][], yAxis: number, sign: Cell): number {   // returns location number of empty cell if can win in this raw. Accepts O's and X's if not-returns null.
        let counter: number = 0, emptyX: number = null;
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[yAxis][i] == sign) {   // checks chosen sign if it appears in checked cell then +1 counter
                counter++;
            }
            if (matrix[yAxis][i] == Cell.Empty) {  // if empty cell apprear recort its X Axis
                emptyX = i;
            }

        }

        if (counter == 2 && emptyX != null) {  // if 2 Cells with sign we checked apprear and Empty cell apprear

            return emptyX;  // true: return X axis of empty cell
        }

        return null;  // false: null

    }

        
    private YPosWinnerCellInCol(matrixx: Cell[][], sign: Cell, xAxis: number): number {  // return Y Axis of empty cell in a row that can win in next step. Can take X or O
        let counter: number = 0, emptyY = null;
        for (let i = 0; i < matrixx.length; i++) {

            if (matrixx[i][xAxis] == sign) {  // counts if chosen cell appear in checked cell
                counter++;
            }
            if (matrixx[i][xAxis] == Cell.Empty) {  // record the Y Axis of empty cell if found
                emptyY = i;
            }

        }
        if (counter == 2 && emptyY != null) {  // if 2 Chosen  same cells (X or O ) appear & Also an empty cell return Empty cell's Y Axis .
            return emptyY;  
        }
        return null;
    }


// returns the number of the last cell to win the game if there isn't one - return null.  Checks raws,cols,crosses
    public returnNumOfWinningStep(BBBBBbord: Board, sign: Cell): number {   
        let x: number, y: number, cross1To9Result: number = null, cross3To7Result: number = null;

        for (let i = 0; i < BBBBBbord.matrix.length; i++) {
            
            x = this.XPosWinnerCellInRaw(BBBBBbord.matrix, i, sign);  // search for O in raw
            y = this.YPosWinnerCellInCol(BBBBBbord.matrix, sign, i);  // search for O in raw

            if (x != null) {
                return this.yX2Num(i, x);  // if finds in raw winning step - returns the x Axis
            }

            if (y != null) {
                return this.yX2Num(y, i);  // if finds in column winning step - returns the y Axis
            }

        }
        cross1To9Result = this.cross1To9Scan(BBBBBbord.matrix, sign);  // checks cross 1to9 if finds  next step  winning cell returns its number
        if (cross1To9Result != null) {
            return cross1To9Result;
        }
        cross3To7Result = this.cross3To7Scan(BBBBBbord.matrix, sign); // checks cross 3to7 - if finds next step winning cell returns its number

        return cross3To7Result != null ? cross3To7Result : null;

    }

    // checks cross 1to9- if finds next step winning cell returns its number
    cross1To9Scan(matrix: Cell[][], sign: Cell): number { // cross scan 1 to 9
        let counter: number = 0, emptyY: number = null, emptyX: number = null, x: number = 0;
        for (let y = 0; y < matrix.length; y++) {

            if (matrix[y][x] == sign) {  // if finds the target sign adds counter
                counter++;
            }

            if (matrix[y][x] == Cell.Empty) {  //if finds empty cell gets its x/y Axis
                emptyY = y, emptyX = x;
            }
            x++;

        }
        
        if (counter == 2 && emptyX != null && emptyY != null) {  // if finds 2 of the target cells & 1 empty cell =>return the number of the empty cell. if not - return null
            return this.yX2Num(emptyY, emptyX);
        }
        return null;

    }
    
        // checks cross 3to7 - if finds next step winning cell returns its number

    cross3To7Scan(matrix: Cell[][], sign: Cell): number { 

        let counter: number = 0, emptyY: number = null, emptyX: number = null, x: number = matrix.length - 1;
        for (let y = 0; y < matrix.length; y++) {    // y axis  accending

            if (matrix[y][x] == sign) {  // if meets target cell counter++
                counter++;
            }
            if (matrix[y][x] == Cell.Empty) { // if empty cell get x/y Axis
                emptyY = y, emptyX = x;
            }
            x--;
        }
        

        if (counter == 2 && emptyY != null && emptyX != null) {  //if target cell appear 2 times + empty cell then return empty cell's x/y Axis
            return this.yX2Num(emptyY, emptyX);

        }

        return null;
    }
    

    public randomMinMax(min: number, max: number): number {   // gets nin and max values in numbers. Return a rand num from min to max
        return min + Math.floor(Math.random() * (max - min + 1));
    }


    // isWinnerRaw checks: if any of the cells got else than tagret cell means that this is not winning row.
    private isWinnerRaw(matrix: Cell[][], yAxis: number, sign: Cell): boolean {   // 

        for (let i = 0; i < matrix.length; i++) {  
            if (matrix[yAxis][i] != sign) {   // if finds else than target cell return false
                return false;
            }


        }
        return true;
    }

    // isWinnerCol : if finds other content than target in any of the cells return false
    private isWinnerCol(matrixx: Cell[][], sign: Cell, xAxis: number): boolean {

        for (let i = 0; i < matrixx.length; i++) {

            if (matrixx[i][xAxis] != sign) {
                return false;
            }
            
        }
        return true;
    }


    //isWinnerMatrixRawCol: finds in raw and cols if there is a win.
    private isWinnerMatixRawCol(matrix: Cell[][], sign: Cell): boolean {
        for (let i = 0; i < matrix.length;i++) {
            if (this.isWinnerRaw(matrix, i, sign)) {   // check if there is a winner raw
                return true;
            }
            
            for (let j = 0; j < matrix[i].length; j++) {
                if (this.isWinnerCol(matrix, sign, j)) {  // checks if there is a winner col
                    return true;
                }

            }
            
        }

        return false;
    }



    // checks if there is winner cross 1 to 9
    private is1To9Winner(matrix: Cell[][], sign: Cell): boolean {      
        let XFwd: number = 0, counter:number=0;
        
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][XFwd] == sign) {   // checks match to target
                counter++;
                
            }
            XFwd++;
        }
        return counter == 3 ? true: false;
    }


    // checks if there is winner cross 3 to 7

    private is3To7Winner(matrix: Cell[][], sign: Cell): boolean {
        let XRev: number = matrix.length-1, counter:number=0;

        for (let i = 0; i < matrix.length; i++) {
            
            if (matrix[i][XRev] == sign) {   // checks if matches the target 
                counter++;
            }
            XRev--;
        }
        return counter == 3 ? true : false;   // if 3 matches return true

    }

    // general function checks if there is a win
    public isWinner(matrix: Cell[][], player1Cell: Cell, machine1Cell: Cell): Cell {
        if (this.isWinnerMatixRawCol(matrix, player1Cell) || this.is1To9Winner(matrix, player1Cell) || this.is3To7Winner(matrix, player1Cell)) {
            return player1Cell;    //checks if player wins rows,cols,cross
        }
        else if (this.isWinnerMatixRawCol(matrix, machine1Cell) || this.is1To9Winner(matrix, machine1Cell) || this.is3To7Winner(matrix, machine1Cell)) {

            return machine1Cell;  //checks if machine wins rows,cols,cross
        }
        else {
        
            return Cell.Empty;
        }
               
    }
        
}



































