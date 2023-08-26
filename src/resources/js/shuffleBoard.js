function startShuffleBoard() {
    emptyShuffle()
    addScoreBoard(false, 'Shuffle');
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
    emptyShuffle();
    console.log('starting the shuffs');
}