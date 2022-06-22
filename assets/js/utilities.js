var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "../images/player.png";

function checkOnTrack(player, track) {
  if (
    player.playerPosition.x + player.playerSize.width >=
      track.trackPosition.x &&
    player.playerPosition.x - player.playerSize.width <=
      track.trackPosition.x + track.trackSize.width
  ) {
    console.log("running", track.trackPosition.y);
    player.baseLevel = track.trackPosition.y;
  } else {
    player.baseLevel = canvas.height;
  }
}
