function addStartButton(game) {
    $('#bottom' + game + 'Div').append('<div class="col-md-12"><button id="' +
        game.toLowerCase() + 'StartButton" type="button" class="btn btn-lg btn-block btn-success"' +
        ' onClick=linkClick(this.id)>START GAME</button></div>'
    );
}

function addPlayerChoices(isFoosball) {
    const centerDiv = isFoosball ? $('#centerFoosballDiv') : $('#centerShuffleDiv');
    const bottomDiv = isFoosball ? $('#bottomFoosballDiv') : $('#bottomShuffleDiv');
    let game = isFoosball ? 'foosball' : 'shuffle';
    let playerOne = isFoosball ? determinePlayerHtml(true, true) : determinePlayerHtml(false, true);
    let playerTwo = isFoosball ? determinePlayerHtml(true, false) : determinePlayerHtml(false, false);
    let playerOneMap = isFoosball ? FOOSBALL_PLAYER_ONE : SHUFFLE_PLAYER_ONE;
    let playerTwoMap = isFoosball ? FOOSBALL_PLAYER_TWO : SHUFFLE_PLAYER_TWO;
    centerDiv.append('<h2>Player 1:</h2>' + playerOne + '<br><br><h2>Player 2:</h2>' + playerTwo);
    bottomDiv.append('<div class="col-md-12" id="' + game + 'ExitButton"><button id="' + game +
    'CancelSelectButton" type="button" class="btn btn-lg btn-block btn-danger" ' +
    'onClick=linkClick(this.id)>EXIT</button></div>'
    );
    if (playerOneMap.size === 1 && playerTwoMap.size === 1) {
        bottomDiv.empty();
        addBeginAndCancelButtons(isFoosball);
    }
}

function determinePlayerHtml(isFoosball, isPlayerOne) {
    let game = isFoosball ? 'Foosball' : 'Shuffle';
    let buttonPlayer = isPlayerOne ? 'One' : 'Two';
    let playerMap = new Map();
    if (isFoosball) {
        if (isPlayerOne) {
            playerMap = FOOSBALL_PLAYER_ONE;
        } else {
            playerMap = FOOSBALL_PLAYER_TWO;
        }
    } else {
        if (isPlayerOne) {
            playerMap = SHUFFLE_PLAYER_ONE;
        } else {
            playerMap = SHUFFLE_PLAYER_TWO;
        }
    }
    return playerMap.size > 0 ?
        '<h3>' + playerMap.values().next().value + '</h3>' :
        '<button id="player' + buttonPlayer + game + 'ChooseButton" type="button" class="btn btn-lg btn-block btn-success" ' +
        'onClick=linkClick(this.id)>choose player</button><button id="player' + buttonPlayer + game + 'CreateButton" ' +
        'type="button" class="btn btn-lg btn-block btn-success" onClick=linkClick(this.id)>create player</button>';
}


function setupPlayerSelection(isFoosball, isPlayerOne) {
    isFoosball ? emptyFoosball() : emptyShuffle();
    $.ajax({
        type: 'GET',
        url: BASE_URL + '/user/findAll',
        success: function(result){
            let inputTextHtml = '<select class="select2 form-control" multiple="multiple">';
            $.each(result, function(index, type) {
                let userId = type.userId
                let userName = type.userName;
                if (isFoosball) {
                    FOOSBALL_USER_MAP.set(userId, userName);
                } else {
                    SHUFFLE_USER_MAP.set(userId, userName);
                }
                inputTextHtml = inputTextHtml + '<option value="' + userId + '"><a href="#" id="' + userId +
                    '" class="list-group-item list-group-item-action"><h3>' + userName + '</h3></a></option>';
            });
            inputTextHtml += '</select>';
            let sportDiv = isFoosball ? $("#centerFoosballDiv") : $("#centerShuffleDiv");
            sportDiv.append(inputTextHtml);
            setupSearchBox(isFoosball, isPlayerOne);
        },
        error: function() {
        }
    });
}

function setupPlayerCreation(isFoosball, isPlayerOne) {
    isFoosball ? emptyFoosball() : emptyShuffle;
    let game = isFoosball ? 'Foosball' : 'Shuffle'
    let player = isPlayerOne ? 'PlayerOne' : 'PlayerTwo'
    let centerDiv = isFoosball ? $("#centerFoosballDiv") : $("#centerShuffleDiv");
    let bottomDiv = isFoosball ? $("#bottomFoosballDiv") : $("#bottomShuffleDiv");
    let inputId = isFoosball ? 'foosballUserInput' : 'shuffleUserInput';
    centerDiv.append('<div class="container mt-5"><div class="row justify-content-center">' +
        '<div class="col-md-6"><div class="input-group"><input id="' + inputId + '" type="text" class="form-control" ' +
        'placeholder="Enter your name" aria-label="Enter your name"><button id="submit' + player + game + 'UserButton" class="btn btn-primary" ' +
        'type="button" onClick=linkClick(this.id)>Submit</button></div></div></div></div>');
}
function submitUser(isFoosball, isPlayerOne, inputId) {
    var data = JSON.stringify({
        userName: $('#' + inputId).val()
    });
    let centerDiv = isFoosball ? $("#centerFoosballDiv") : $("#centerShuffleDiv");
    $.ajax({
        url: BASE_URL + '/user/submit',
        type: 'POST',
        data: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        success: function(data, status) {
            let userId = data.userId;
            let userName = data.userName;
            if (isFoosball) {
                if(isPlayerOne) {
                    FOOSBALL_PLAYER_ONE.set(userId, userName);
                } else {
                    FOOSBALL_PLAYER_TWO.set(userId, userName);
                }
            } else {
                if (isPlayerOne) {
                    SHUFFLE_PLAYER_ONE.set(userId, userName);
                } else {
                    SHUFFLE_PLAYER_TWO.set(userId, userName);
                }
            }
            centerDiv.empty();
            addPlayerChoices(isFoosball);
        },
        error: function() {
            alert("Error submitting user! MARK DO SOMETHING!!!!");
            centerDiv.empty();
            addPlayerChoices(isFoosball);
        }
    });

}

function setupSearchBox(isFoosball, isPlayerOne) {
  $('.select2').select2({
    placeholder: '  Select Player...',
    width: '100`%',
    theme: 'bootstrap'
  });
  $('.select2').on('change', function() {
    isFoosball ? emptyFoosball() : emptyShuffle();
    SELECTED_LIST_ITEM = $(this).val().pop() || '';
    if (isFoosball && isPlayerOne) {
        FOOSBALL_PLAYER_ONE = new Map();
        FOOSBALL_PLAYER_ONE.set(SELECTED_LIST_ITEM, FOOSBALL_USER_MAP.get(parseInt(SELECTED_LIST_ITEM)));
    } else if (isFoosball) {
        FOOSBALL_PLAYER_TWO = new Map();
        FOOSBALL_PLAYER_TWO.set(SELECTED_LIST_ITEM, FOOSBALL_USER_MAP.get(parseInt(SELECTED_LIST_ITEM)));
    } else if (isPlayerOne) {
        SHUFFLE_PLAYER_ONE = new Map();
        SHUFFLE_PLAYER_ONE.set(SELECTED_LIST_ITEM, SHUFFLE_USER_MAP.get(parseInt(SELECTED_LIST_ITEM)));
    } else {
        SHUFFLE_PLAYER_TWO = new Map();
        SHUFFLE_PLAYER_TWO.set(SELECTED_LIST_ITEM, SHUFFLE_USER_MAP.get(parseInt(SELECTED_LIST_ITEM)));
    }
    addPlayerChoices(isFoosball);
  });
}

function addBeginAndCancelButtons(isFoosball) {
    let isValid = false;
    let bottomDiv = isFoosball ? $("#bottomFoosballDiv") : $("#bottomShuffleDiv");
    let startButtonId = isFoosball ? 'foosballStartGameButton' : 'shuffleStartGameButton';
    let cancelButtonId = isFoosball ? 'foosballCancelGameButton' : 'shuffleCancelGameButton';
    let game = isFoosball ? 'foosball' : 'shuffle';
    if (!(isFoosball ?
            isValidPlayers(FOOSBALL_PLAYER_ONE, FOOSBALL_PLAYER_TWO) :
            isValidPlayers(SHUFFLE_PLAYER_ONE, SHUFFLE_PLAYER_TWO)
    )) {
        alert("Unable to start game due to the same player being selected twice");
        if (isFoosball) {
            foosballStartAction();
        } else {
            shuffleStartAction();
        }
    } else {
        bottomDiv.append('<div class="col-md-12" id="' + game + 'StartDiv"><button id="' + startButtonId + '" type="button" ' +
        'class="btn btn-lg btn-block btn-success" onClick=linkClick(this.id)>BEGIN MATCH</button></div>' +
        '<div class="col-md-12"><button id="' + cancelButtonId + '" type="button" ' +
        'class="btn btn-lg btn-block btn-danger" onClick=linkClick(this.id)>CANCEL</button></div>'
        );
    }

}

function isValidPlayers(playerOneMap, playerTwoMap) {
    return playerOneMap.values().next().value !== playerTwoMap.values().next().value;
}

function addPlayersPlaying(isFoosball) {
    let game = isFoosball ? 'foosball' : 'shuffle';
    let centerDiv = isFoosball ? $("#centerFoosballDiv") : $("#centerShuffleDiv");
    let bottomDiv = isFoosball ? $("#bottomFoosballDiv") : $("#bottomShuffleDiv");
    let submitButtonId = isFoosball ? 'submitFoosballScoresButton' : 'submitShuffleScoresButton';
    let playerOneScoreId = isFoosball ? 'playerOneFoosballScore' : 'playerOneShuffleScore';
    let playerTwoScoreId = isFoosball ? 'playerTwoFoosballScore' : 'playerTwoShuffleScore';
    let playerOne = isFoosball ?
        FOOSBALL_PLAYER_ONE.values().next().value :
        SHUFFLE_PLAYER_ONE.values().next().value;
    let playerTwo = isFoosball ?
        FOOSBALL_PLAYER_TWO.values().next().value :
        SHUFFLE_PLAYER_TWO.values().next().value;
    centerDiv.empty();
    bottomDiv.empty();
    centerDiv.append('<div class="container mt-5"><div class="row"><div class="col-md-6">' +
    '<h3 class="text-center">' + playerOne + '</h3><div class="input-group mb-3"><input type="number" ' +
    'class="form-control" id="' + playerOneScoreId + '" placeholder="Enter score for ' + playerOne + '" aria-label="Enter score for ' + playerOne +
    '" aria-describedby="player1-score" inputmode="numeric"></div></div><div class="col-md-6">' +
    '<h3 class="text-center">' + playerTwo + '</h3><div class="input-group mb-3"><input type="number" ' +
    'class="form-control" id="' + playerTwoScoreId + '" placeholder="Enter score for ' + playerTwo + '" aria-label="Enter score for ' +
    playerTwo + '" aria-describedby="player2-score" inputmode="numeric"></div></div>' +
    '<div class="col-md-12 text-center"><button class="btn btn-lg btn-block btn-success" ' +
    'type="button" id="' + submitButtonId + '" onClick=linkClick(this.id)>Complete Game</button></div></div>'
    );
    $('#bottomFoosballDiv').append('<div class="col-md-12" id="' + game + 'ExitButton"><button ' +
    'id="' + game + 'CancelSelectButton" type="button" class="btn btn-lg btn-block btn-danger" ' +
    'onClick=linkClick(this.id)>EXIT</button></div>'
    );
}

function postScores(playerOneMap, playerOneScore, playerTwoMap, playerTwoScore, isFoosball) {
     let data = JSON.stringify([
                convertScoresToPlayed(playerOneMap, playerOneScore, playerTwoScore, isFoosball),
                convertScoresToPlayed(playerTwoMap, playerTwoScore, playerOneScore, isFoosball)
     ]);
     console.log(data);
     $.ajax({
        url: BASE_URL + '/played/submit',
        type: 'POST',
        data: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        success: function(data, status) {
            alert("Successfully submitted Scores!");
            isFoosball ? startFoosball() : startShuffleBoard();
        },
        error: function() {
            alert("Error submitting Scores! MARK DO SOMETHING!!!!");
            isFoosball ? startFoosball() : startShuffleBoard();
        }
    });
}

function convertScoresToPlayed(playerMap, playerScore, opponentScore, isFoosball) {
    return {
        'isWin': parseInt(playerScore) > parseInt(opponentScore),
        'pointsFor': playerScore,
        'pointsAgainst': opponentScore,
        'userId': [...playerMap.keys()][0],
        'isFoosball': isFoosball
    }
}