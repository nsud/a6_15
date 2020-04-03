const numDivs = 36;
const maxHits = 10;

let hits = 1;
let firstHitTime = 0;
let lastHitTime = 0;
let miss = 0;

function round() {

  $("div").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target").text(hits);
  //$("div").removeClass("miss");

   if (hits === 1) {
     firstHitTime = getTimestamp();
   }

  if (hits === maxHits+1) {
    lastHitTime = getTimestamp();

    endGame();
  }
}

function endGame() {
  $("#playing_space").remove();
  let totalPlayedMillis = lastHitTime - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let missTime = Number(miss*2)
  let total = Number(totalPlayedSeconds) + Number(missTime)
  $("#total-time-played").text(totalPlayedSeconds);
  $("#count-miss").text(miss);
  $("#miss-time").text(missTime);
  $("#total-time").text(total);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(".miss").text("");
    $("div").removeClass("miss");
    hits = hits + 1;
    $(".target").text("");
    round();
  }
  else {
    $(".target").addClass("miss");
    miss += 1;
    $(".miss").text("Oops!");
    round();
  }
}

function init() {
  $("#button-start").click(function() {
    round();
    $(".game-field").click(handleClick);
    $("#button-start").hide();
  });

  $("#button-reload").click(function() {
    location.reload();
    $("#button-start").show();

  });
}

$(document).ready(init);
