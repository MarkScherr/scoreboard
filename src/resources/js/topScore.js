function addScoreBoard(isFoosball) {
    let game = isFoosball ? 'Foosball' : 'Shuffle'
    let list = game.toLowerCase() + 'HighScoreList';
    $('#center' + game + 'Div').append('<ul id="' + list + '" class="list-unstyled players"></ul>');
    let highScores = []
    $.ajax({
        type: 'GET',
        url: BASE_URL + '/user/highScores/' + isFoosball,
        success: function(resultList){
            $.each(resultList, function(index, type) {
                currentMap = new Map();
                currentMap.set('userName', type.userName);
                currentMap.set('wins', type.wins);
                currentMap.set('losses', type.losses);
//                if (highScores.length <= TOP_SCORE_MAXIMUM) {
                    highScores.push(currentMap);
//                }
            });
            updateHighScoreDisplay(highScores, list);
        },
        error: function() {
        }
    });
}

function updateHighScoreDisplay(highScores, list) {
    const highScoreList = $('#'+ list);
    let index = 0;
    highScores.forEach((map) => {
        console.log(map.get('userName'));
        index++;
        highScoreList.append('<li><h3>' + index + '. '+ map.get('userName') + ' (' + map.get('wins') + ' - ' + map.get('losses') + ')</h3></li>');
    });
}