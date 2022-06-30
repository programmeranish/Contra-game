var loadedImages = {};

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "/assets/images/player.png";

function createBlast({ x, y }) {
  blasts.push(
    new Blast({
      position: { x, y },
      size: { height: 60, width: 60 },
    })
  );
  setTimeout(() => {
    blasts.shift();
  }, 500);
}

function createEnemyBot(trackObj) {
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      let trackPosition = {
        x: x * GRID_WIDTH - trackObj.shiftTrack,
        y: y * GRID_HEIGHT,
      };

      if (trackObj.track[y][x] === 6) {
        enemyBots.push(new EnemyBot({ position: trackPosition, arrayPosition: { x, y } }));
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
        if (player.position.x + player.size.width >= trackPosition.x && player.position.x <= trackPosition.x + GRID_WIDTH && player.position.y + player.size.height <= trackPosition.y && player.position.y + player.size.height >= trackPosition.y - GRID_HEIGHT) {
          onTrack = true;
          player.move.onWater = false;
          player.baseLevel = trackPosition.y;
        }
      } else if (trackObj.track[y][x] === 3 || trackObj.track[y][x] === 4 || trackObj.track[y][x] === 5) {
        //calculating the position of the road

        //checking if the player is above the road with player x,y, and road x,y
        if (player.position.x + player.size.width >= trackPosition.x && player.position.x <= trackPosition.x + GRID_WIDTH && player.position.y + player.size.height <= trackPosition.y && player.position.y + player.size.height >= trackPosition.y - GRID_HEIGHT) {
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
        if (player.position.x + player.size.width >= trackPosition.x && player.position.x <= trackPosition.x + GRID_WIDTH && player.position.y + player.size.height <= trackPosition.y && player.position.y + player.size.height >= trackPosition.y - GRID_HEIGHT / 2) {
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
  if (bullet.shotBy != target.id) {
    let x1 = bullet.position.x;
    let y1 = bullet.position.y;
    let w1 = bullet.size.width;
    let h1 = bullet.size.height;

    let x2 = target.position.x;
    let y2 = target.position.y;
    let h2 = target.size.height;
    if (target.move.down) {
      y2 = target.position.y + target.size.height / 1.5;
      h2 = target.size.height / 3;
    } else if (target.isJumping) {
      h2 = this.size.height / 2;
    }
    let w2 = target.size.width;

    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    } else {
      return true;
    }
  } else return false;
}

function measureDistance(p1, p2) {
  return Math.abs(p2 - p1);
}
function measureAngle(player, enemy) {
  let directionX = player.position.x - enemy.position.x;
  let directionY = enemy.position.y - player.position.y;
  let dx;
  let dy;
  if (directionX > 0) {
    dx = 1;
  } else {
    dx = -1;
  }
  if (directionY > 0) {
    dy = -1;
  } else {
    dy = 1;
  }
  return { dx, dy };
}

function checkBridges(trackObj, target) {
  for (let y = 0; y < trackObj.track.length; y++) {
    for (let x = 0; x < trackObj.track[y].length; x++) {
      let trackPosition = {
        x: x * GRID_WIDTH - trackObj.shiftTrack,
        y: y * GRID_HEIGHT,
      };
      if (trackObj.track[y][x] === 3 || trackObj.track[y][x] === 4 || trackObj.track[y][x] === 5)
        if (target.id === "player") {
          if (target.position.x >= trackPosition.x) {
            setTimeout(() => {
              trackObj.track[y][x] = 0;
              createBlast(trackPosition);
            }, 5000);
          }
        }
    }
  }
}
