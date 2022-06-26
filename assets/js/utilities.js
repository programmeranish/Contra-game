var loadedImages = {};

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "/assets/images/player.png";

function checkOnTrack(player, trackObj) {
  // let onTrack = false;

  // allTrack.forEach((track) => {
  //   if (
  //     player.playerPosition.x + player.playerSize.width >=
  //       track.trackPosition.x &&
  //     player.playerPosition.x <=
  //       track.trackPosition.x + track.trackSize.width &&
  //     player.playerPosition.y + player.playerSize.height <=
  //       track.trackPosition.y
  //   ) {
  //     onTrack = true;
  //     player.onTrack = player.baseLevel = track.trackPosition.y;
  //   }
  // });
  // if (!onTrack) player.baseLevel = canvas.height;
  let onTrack = false;
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      if (trackObj.track[y][x] === 1) {
        let trackPosition = { x: x * GRID_WIDTH, y: y * GRID_HEIGHT };
        if (
          player.playerPosition.x + player.playerSize.width >=
            trackPosition.x &&
          player.playerPosition.x <= trackPosition.x + GRID_WIDTH &&
          player.playerPosition.y + player.playerSize.height <=
            trackPosition.y &&
          player.playerPosition.y + player.playerSize.height >=
            trackPosition.y - GRID_HEIGHT
        ) {
          onTrack = true;
          player.baseLevel = trackPosition.y;
        }
      }
      if (!onTrack) player.baseLevel = canvas.height;
    }
  }
}

function drawImage({ image, sx, sy, sw, sh, dx, dy, dh, dw }) {
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}
