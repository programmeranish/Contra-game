var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "../images/player.png";

function checkOnTrack(player, allTrack = []) {
  let onTrack = false;

  allTrack.forEach((track) => {
    if (
      player.playerPosition.x + player.playerSize.width >=
        track.trackPosition.x &&
      player.playerPosition.x <=
        track.trackPosition.x + track.trackSize.width &&
      player.playerPosition.y + player.playerSize.height <=
        track.trackPosition.y
    ) {
      onTrack = true;
      player.onTrack = player.baseLevel = track.trackPosition.y;
    }
  });
  if (!onTrack) player.baseLevel = canvas.height;
}
