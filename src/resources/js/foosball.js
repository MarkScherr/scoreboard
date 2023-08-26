function startFoosball() {
    emptyFoosball();
    const centerFoosball = $('#centerFoosballDiv');
    addScoreBoard(true, "Foosball");
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
    emptyFoosball();
    console.log('starting the fooses');
    addPlayerChoices();
}

function addPlayerChoices() {
    const centerFoosball = $('#centerFoosballDiv');
    let playerOne = determinePlayerHtml(true, true);
    let playerTwo = determinePlayerHtml(false, true);

    centerFoosball.append('<h2>Player 1:</h2>' + playerOne + '<br><br><h2>Player 2:</h2>' + playerTwo);
}

function determinePlayerHtml(isPlayerOne, isFoosball) {
    let game = isFoosball ? 'Foosball' : 'Shuffle';
    let buttonPlayer = isPlayerOne ? 'One' : 'Two';
    let playerMap = isPlayerOne ? FOOSBALL_PLAYER_ONE : FOOSBALL_PLAYER_TWO
    return playerMap.size > 0 ?
        '<h3>' + FOOSBALL_PLAYER_ONE['name'] + '</h3>' :
        '<button id="player' + buttonPlayer + game + 'ChooseButton" type="button" class="btn btn-lg btn-block btn-success" ' +
        'onClick=linkClick(this.id)>choose player</button><button id="player' + buttonPlayer + 'CreateButton" ' +
        'type="button" class="btn btn-lg btn-block btn-success" onClick=linkClick(this.id)>create player</button>';

}
function playerOneFoosballChooseAction() {
    chooseFoosballAction(true)
}
function chooseFoosballAction(isPlayerOne) {
    emptyFoosball();
    $.ajax({
        type: 'GET',
        url: BASE_URL + '/user/findAll',
        success: function(result){
            var inputTextHtml = '<div class="list-group" id="swipeList">';
            $.each(result, function(index, type) {
                let userId = type.userId
                let userName = type.userName;
                FOOSBALL_USER_MAP[userId] = userName;
                inputTextHtml = inputTextHtml + '<a href="#" id="' + userId +
                    '" class="list-group-item list-group-item-action"><h3>' + userName + '</h3></a>';
            });

            inputTextHtml += '</div>';
            $("#centerFoosballDiv").append(inputTextHtml);
//            setListFunctionality();
            setListAbility();
        },
        error: function() {
        }
    });
}
