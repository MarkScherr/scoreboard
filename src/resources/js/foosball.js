function startFoosball() {
    emptyFoosball();
    const centerFoosball = $('#centerFoosballDiv');
    addScoreBoard(true);
    addFoosballStartButton('Foosball');
}

function emptyFoosball() {
    $('#centerFoosballDiv').empty();
    $('#bottomFoosballDiv').empty();
}

function addFoosballStartButton() {
    $('#bottomFoosballDiv').append(`
        <div class="col-md-12">
            <button id="foosballStartButton" type="button" class="btn btn-lg btn-block btn-success" onClick=linkClick(this.id)>
                START GAME
            </button>
        </div>
    `);
}

function foosballStartAction() {
    FOOSBALL_PLAYER_ONE = new Map();
    FOOSBALL_PLAYER_TWO = new Map();
    emptyFoosball();
    addPlayerChoices(true);
}

function foosballCancelSelectAction() {
    startFoosball();
}

function playerOneFoosballChooseAction() {
    setupPlayerSelection(true, true);
}

function playerTwoFoosballChooseAction() {
    setupPlayerSelection(true, false);
}

function playerOneFoosballCreateAction() {
    setupPlayerCreation(true, true);
}

function playerTwoFoosballCreateAction() {
    setupPlayerCreation(true, false);
}

function submitPlayerOneFoosballUserAction() {
    submitUser(true, true, 'foosballUserInput');
}

function submitPlayerTwoFoosballUserAction() {
    submitUser(true, false, 'foosballUserInput');
}

function foosballStartGameAction() {
    addPlayersPlaying(true);
}

function foosballCancelGameAction() {
    startFoosball();
}

function submitFoosballScoresAction() {
    let playerOneScore = $("#playerOneFoosballScore").val();
    let playerTwoScore = $("#playerTwoFoosballScore").val();
    console.log(playerOneScore + ' <-1  2-> ' + playerTwoScore)
    if (playerOneScore === playerTwoScore || (playerOneScore != 10 && playerTwoScore != 10)) {
        alert("This is an invalid score for Foosball.  Score to 10 and then the game is over.  There can be no tie!");
        return;
    }
    postScores(FOOSBALL_PLAYER_ONE, playerOneScore, FOOSBALL_PLAYER_TWO, playerTwoScore, true);
}