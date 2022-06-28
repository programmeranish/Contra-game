var loadedImages = {};

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "/assets/images/player.png";

function checkOnTrack(player, trackObj) {
  //onTrack for checking if player is above the track or not if not player base will be ground
  let onTrack = false;
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      if (trackObj.track[y][x] === 1) {
        //calculating the position of the road
        let trackPosition = { x: x * GRID_WIDTH - trackObj.shiftTrack, y: y * GRID_HEIGHT };
        //checking if the player is above the road with player x,y, and road x,y
        if (player.playerPosition.x + player.playerSize.width >= trackPosition.x && player.playerPosition.x <= trackPosition.x + GRID_WIDTH && player.playerPosition.y + player.playerSize.height <= trackPosition.y && player.playerPosition.y + player.playerSize.height >= trackPosition.y - GRID_HEIGHT) {
          onTrack = true;
          player.move.onWater = false;
          player.baseLevel = trackPosition.y;
        }
      } else if (trackObj.track[y][x] === 8) {
        //calculating the position of the road
        let trackPosition = { x: x * GRID_WIDTH - trackObj.shiftTrack, y: y * GRID_HEIGHT };
        //checking if the player is above the road with player x,y, and road x,y
        if (player.playerPosition.x + player.playerSize.width >= trackPosition.x && player.playerPosition.x <= trackPosition.x + GRID_WIDTH && player.playerPosition.y + player.playerSize.height <= trackPosition.y && player.playerPosition.y + player.playerSize.height >= trackPosition.y - GRID_HEIGHT / 2) {
          onTrack = true;
          player.move.onWater = true;
          player.baseLevel = trackPosition.y;
        }
      }
      if (!onTrack) player.baseLevel = canvas.height;
    }
  }
}
