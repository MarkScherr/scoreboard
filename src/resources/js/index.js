$(document).ready(function() {
    startFoosball();
    startShuffleBoard();
});

const BASE_URL = 'http://localhost:8080'
let FOOSBALL_PLAYER_ONE = new Map();
let FOOSBALL_PLAYER_TWO = new Map();
let SHUFFLE_PLAYER_ONE = new Map();
let SHUFFLE_PLAYER_TWO = new Map();
var SELECTED_LIST_ITEM = '';
let FOOSBALL_USER_MAP = new Map();
let SHUFFLE_USER_MAP = new Map();
const TOP_SCORE_MAXIMUM = 10

function linkClick(id) {
    name = id.slice(0, -6);
    window[name + "Action"]();
}

function setListFunctionality() {
    $('.list-group').on('click', '> a', function(e) {
        var $this = $(this);
        var clickedDivId = $this.attr('id');

        // Remove 'active' class from all other list items
        $('.list-group a').not($this).removeClass('active');

        if($this.hasClass('active')) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
            SELECTED_LIST_ITEM = clickedDivId;
        }
        e.preventDefault();
    });


    $('.list-group .collapse').on('click', '> a', function(e) {
        var $this = $(this),
        $parent = $this.parent('.collapse');
        $parent.find('.active').removeClass('active');
        $this.addClass('active');
    });
}