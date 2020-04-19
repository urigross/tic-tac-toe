class Gui {

    private index: number = 1;

    private returnCellContent(value: Cell): string {
        switch (value) {

            case Cell.Empty: return this.index.toString();

            case Cell.X: return `X`;

            case Cell.O: return `O`;


        }

    }


    public display(Bboard: Board, strAddon:string): void {
        let str: string = "";

        str = this.drawMinusRaw(19);

        for (let i = 0; i < Bboard.matrix.length; i++) {
            str += "                                          ";
            str += `|  `;

            for (let j = 0; j < Bboard.matrix[i].length; j++) {

                str += ` ${this.returnCellContent(Bboard.matrix[i][j])}   |  `;
                this.index++;


            }
            str += `\n`;

            str += this.drawMinusRaw(19);


        }
        this.index = 1;
        alert(`${str+strAddon}`);
    }

    private drawMinusRaw(value: number): string {
        let str: string = "";
        str += "                                          ";

        for (let i = 1; i <= value; i++) {
            str += `-`;

        }

        str += '\n';
        return str;

    }

    public machineWinMsg(): void {
        alert(`Machine wins the game.`);
    }
    public humanWinMsg(): void {
        alert(`Human Wins the game.`);
    }
    public occupiedCellMsg(): void {
        alert(`This cell is unavailable. Please Choose another cell.`);
    }

    public tieMsg(): void {
        alert(`Game result: Tie.`);
    }
    public nanMsg(): void {
        alert(`You entered a character which is not a number - Only numbers allowed.\n
Please try again.`);
    }
    public outOfRangeMsg(): void {
        alert(`Entered number is out of range (1-9). Please try again.`)
    }
}

