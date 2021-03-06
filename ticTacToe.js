const game = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        players: ["<img height='130px' width='130px' src='/Tic-Tac-Toe/Images/x.png'>", "<img height='140px' width='140px' src='/Tic-Tac-Toe/Images/o.png'>"],
        index: 0,
        changePlayer: function () {  //Function that changes the player thats it's going to make the play, and display it on the screen
            this.index = (this.index === 0 ? 1 : 0);
            let x = "X player turn!";
            let o = "O player turn!";
            document.getElementById("playerTracker").innerHTML = (this.index === 0 ? x : o);
        }
    },
    container: null,
    gameOver: false,
    winningWays: [  //Array with every possible winning sequence
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ],

    init: function (container_creator) { //Initicial function
        this.container = container_creator;
    },

    play: function (position) {  // Function that let the user make a play and verify if the game is over with a winner or a draw
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

    endGame: function () {  //Function that ends the game and display the winner on the screen
        this.gameOver = true;
        document.getElementById("playerTracker").style.color = (this.simbols.index === 0 ? "#FF1616" : "#B8EA53");
        document.getElementById("playerTracker").innerHTML = (this.simbols.index === 0 ? "X wins!" : "O Wins!");
    },

    checkWinner: function (simbol) {  //Function that uses the winning sequences to verify if there is a winner
        for (i in this.winningWays) {
            if (this.board[this.winningWays[i][0]] == simbol &&
                this.board[this.winningWays[i][1]] == simbol &&
                this.board[this.winningWays[i][2]] == simbol) {
                return i;
            }
        };
        return -1;

    },

    checkTie: function () { //Function that verify if the game has ended without a winner (tie) and display it on the screen
        let blank = this.board.indexOf('');
        if (blank == -1) {
            this.gameOver = true;
            document.getElementById("playerTracker").innerHTML = "It's a tie!"
        }
        return -1;
    },

    draw: function () { //Function that draws the board on the screen
        let slot = '';
        for (i in this.board) {
            slot += '<div onclick ="game.play(' + i + ')">' + this.board[i] + '</div>';
        }
        this.container.innerHTML = slot;
    },

    start: function () { //Function that starts and restarts the game
        this.board.fill('');
        this.draw();
        this.gameOver = false;
        document.getElementById("playerTracker").style.color = "#200000";
        document.getElementById("playerTracker").innerHTML = (this.simbols.index === 0 ? "X player turn!" : "O player turn!");
        
    }
};

