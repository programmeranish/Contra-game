var loadedImages = {};

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "/assets/images/player.png";

function createEnemyBot(trackObj) {
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      let trackPosition = {
        x: x * GRID_WIDTH - trackObj.shiftTrack,
        y: y * GRID_HEIGHT,
      };

      if (trackObj.track[y][x] === 6) {
        enemyBots.push(
          new EnemyBot({ position: trackPosition, arrayPosition: { x, y } })
        );
      }
    }
  }
}
function checkOnTrack(player, trackObj) {
  //onTrack for checking if player is above the track or not if not player base will be ground
  let onTrack = false;
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      let trackPosition = {
        x: x * GRID_WIDTH - trackObj.shiftTrack,
        y: y * GRID_HEIGHT,
      };
      if (trackObj.track[y][x] === 1) {
        //calculating the position of the road

        //checking if the player is above the road with player x,y, and road x,y
        if (
          player.position.x + player.size.width >= trackPosition.x &&
          player.position.x <= trackPosition.x + GRID_WIDTH &&
          player.position.y + player.size.height <= trackPosition.y &&
          player.position.y + player.size.height >=
            trackPosition.y - GRID_HEIGHT
        ) {
          onTrack = true;
          player.move.onWater = false;
          player.baseLevel = trackPosition.y;
        }
      } else if (trackObj.track[y][x] === 8) {
        //calculating the position of the road
        let trackPosition = {
          x: x * GRID_WIDTH - trackObj.shiftTrack,
          y: y * GRID_HEIGHT,
        };
        //checking if the player is above the road with player x,y, and road x,y
        if (
          player.position.x + player.size.width >= trackPosition.x &&
          player.position.x <= trackPosition.x + GRID_WIDTH &&
          player.position.y + player.size.height <= trackPosition.y &&
          player.position.y + player.size.height >=
            trackPosition.y - GRID_HEIGHT / 2
        ) {
          onTrack = true;
          player.move.onWater = true;
          player.baseLevel = trackPosition.y;
        }
      }
      if (!onTrack) player.baseLevel = canvas.height;
    }
  }
}

function checkEnemyCollision(player, enemy) {
  let x1 = player.position.x;
  let y1 = player.position.y;
  let w1 = player.size.width;
  let h1 = player.size.height;
  if (player.move.isJumping) {
    h1 = player.size.height / 2;
  }
  let x2 = enemy.position.x;
  let y2 = enemy.position.y;
  let w2 = enemy.size.width;
  let h2 = enemy.size.height;

  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
    return false;
  } else {
    return true;
  }
}
function checkBulletCollision(bullet, target) {
  let x1 = bullet.position.x;
  let y1 = bullet.position.y;
  let w1 = bullet.size.width;
  let h1 = bullet.size.height;

  let x2 = target.position.x;
  let y2 = target.position.y;
  let w2 = target.size.width;
  let h2 = target.size.height;

  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
    return false;
  } else {
    return true;
  }
}
