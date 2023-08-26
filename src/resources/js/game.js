function addStartButton(game) {
    $('#bottom' + game + 'Div').append('<div class="col-md-12"><button id="' +
        game.toLowerCase() + 'StartButton" type="button" class="btn btn-lg btn-block btn-success"' +
        ' onClick=linkClick(this.id)>START GAME</button></div>'
    );
}