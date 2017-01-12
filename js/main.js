var $hillary = $('#player1');
var $trump = $('#player2');
var $die = $('#die');
var $roll = $('#roll');
var $dieAndRoll = $('#die, #roll');
var $winnerCircle = $('#winner-circle');
var hillaryPosition = 0;
var trumpPosition = 0;
var $tiles = {};

for (var i = 1; i <= 10; i++) {
    $tiles[i] = $('#tile' + i);
}

var $currentPlayer = '';

if (Math.random() > 0.5) {
    $currentPlayer = $hillary;
} else {
    $currentPlayer = $trump;
}

$dieAndRoll.click(function() {
    $die.attr('src', './img/Dodecahedron3.gif');
    $roll.html('?');

    var num = Math.floor(Math.random() * 10 + 1);

    setTimeout(function() {
        $roll.html(num);
        movePlayer(num);
    }, 1800);
});

function movePlayer(num) {
    var newPosition = null;

    if ($currentPlayer === $hillary) {
        hillaryPosition += num;
        newPosition = hillaryPosition;
        $currentPlayer = $trump;
    } else {
        trumpPosition += num;
        newPosition = trumpPosition;
        $currentPlayer = $hillary;
    }
    if (hillaryPosition > 10 || trumpPosition > 10) {
        gameOver($currentPlayer);
        return false;
    }


    var tilePosition = $tiles[newPosition][0].getBoundingClientRect();

    $currentPlayer.css({
        top: tilePosition.top,
        left: tilePosition.left
    });


}


function gameOver($winner) {
    var circlePosition = $winnerCircle[0].getBoundingClientRect();
    $winner.css({
        top: circlePosition.top,
        left: circlePosition.left
    }).addClass('winner');

    setTimeout(function() {
        alert($winner[0].id + " wins!");
        reset();
    }, 401);

}

function reset(){
  hillaryPosition=0;
  trumpPosition=0;
  $hillary.css({
    top:'160px',
    left:'10px'
  }).removeClass('winner');
  $trump.css({
    top:'250px',
    left:'10px'
  }).removeClass('winner');
}
