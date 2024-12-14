function startShuffleBoard() {
    emptyShuffle()
    addScoreBoard(false);
    addShuffleStartButton();
}

function emptyShuffle() {
    $('#centerShuffleDiv').empty();
    $('#bottomShuffleDiv').empty();
}

function addShuffleStartButton() {
    $('#bottomShuffleDiv').append(`
            <button id="shuffleStartButton" type="button" class="btn btn-lg btn-success" onClick=linkClick(this.id)>
                START GAME
            </button>
    `);
}
function shuffleStartAction() {
    SHUFFLE_PLAYER_ONE = new Map();
    SHUFFLE_PLAYER_TWO = new Map();
    emptyShuffle();
    addPlayerChoices(false);
}

function shuffleCancelSelectAction() {
    startShuffleBoard();
}

function playerOneShuffleChooseAction() {
    setupPlayerSelection(false, true);
}

function playerTwoShuffleChooseAction() {
    setupPlayerSelection(false, false);
}

function playerOneShuffleCreateAction() {
    setupPlayerCreation(false, true);
}

function playerTwoShuffleCreateAction() {
    setupPlayerCreation(false, false);
}

function submitPlayerOneShuffleUserAction() {
    submitUser(false, true, 'shuffleUserInput');
}

function submitPlayerTwoShuffleUserAction() {
    submitUser(false, false, 'shuffleUserInput');
}

function shuffleStartGameAction() {
    addPlayersPlaying(false);
}

function shuffleCancelGameAction() {
    startShuffleBoard();
}

function submitShuffleScoresAction() {
    let playerOneScore = $("#playerOneShuffleScore").val();
    let playerTwoScore = $("#playerTwoShuffleScore").val();
    if (playerOneScore === playerTwoScore || (playerOneScore != 10 && playerTwoScore != 10)) {
        alert("This is an invalid score for Shuffleboard.  Score to 21 and then the game is over.  There can be no tie!");
        return;
    }
    postScores(SHUFFLE_PLAYER_ONE, playerOneScore, SHUFFLE_PLAYER_TWO, playerTwoScore, false);
}