const game = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        players: ['X', 'O'],
        index: 0,
        changePlayer: function () {
            this.index = (this.index === 0 ? 1 : 0);
            let x = "X player turn!";
            let o = "O player turn!";
            document.getElementById("playerTracker").innerHTML = (this.index === 0 ? x : o);
        }
    },
    container: null,
    gameOver: false,
    winningWays: [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ],

    init: function (container_creator) {
        this.container = container_creator;
    },

    play: function (position) {
        if (this.gameOver) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.players[this.simbols.index];
            this.draw();
            let winningWays_index = this.checkWinner(this.simbols.players[this.simbols.index]);
            if (winningWays_index >= 0) {
                this.endGame();
            } else {

                this.simbols.changePlayer();
                this.checkTie();
            }
            return true;
        } else {
            return false;
        }
    },

    endGame: function () {
        this.gameOver = true;
        document.getElementById("playerTracker").innerHTML = this.simbols.players[this.simbols.index] + " Wins!";
    },

    checkWinner: function (simbol) {
        for (i in this.winningWays) {
            if (this.board[this.winningWays[i][0]] == simbol &&
                this.board[this.winningWays[i][1]] == simbol &&
                this.board[this.winningWays[i][2]] == simbol) {
                return i;
            }
        };
        return -1;

    },

    checkTie: function () {
        let blank = this.board.indexOf('');
        if (blank == -1) {
            this.gameOver = true;
            document.getElementById("playerTracker").innerHTML = "It's a tie!"
        }
        return -1;
    },

    draw: function () {
        let slot = '';
        for (i in this.board) {
            slot += '<div onclick ="game.play(' + i + ')">' + this.board[i] + '</div>';
        }
        this.container.innerHTML = slot;
    },

    start: function () {
        this.board.fill('');
        this.draw();
        this.gameOver = false;
        
    }
};

