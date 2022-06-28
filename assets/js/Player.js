var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let trackPassVelocity = 0; //for movement of track forward

let playerPicture = {
  running: { sx: 0, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningReverse: { sx: 397, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningShoot: { sx: 0, sy: 114, sh: 36, sw: 24, dh: 80, dw: 50, cols: 3 },
  runningReverseShoot: { sx: 391, sy: 114, sh: 36, sw: 24, dh: 80, dw: 50, cols: 3 },
  downRight: { sx: 0, sy: 255, sh: 36, sw: 22, dh: 80, dw: 50, cols: 3 },
  downLeft: { sx: 397, sy: 255, sh: 36, sw: 22, dh: 80, dw: 50, cols: 3 },
  upRight: { sx: 0, sy: 185, sh: 36, sw: 19, dh: 80, dw: 50, cols: 3 },
  upLeft: { sx: 397, sy: 185, sh: 36, sw: 19, dh: 80, dw: 50, cols: 3 },
  lookUp: { sx: 62, sy: 5, sh: 36, sw: 19, dh: 80, dw: 50, cols: 1 },
  sleepDownLeft: { sx: 305, sy: 5, sh: 36, sw: 30, dh: 80, dw: 50, cols: 1 },
  sleepDownRight: { sx: 81, sy: 5, sh: 36, sw: 30, dh: 80, dw: 50, cols: 1 },
  jump: { sx: 116, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 4 },
  water: { sx: 86, sy: 280, sh: 36, sw: 19, dh: 80, dw: 50, cols: 1 },
  reverseWater: { sx: 311, sy: 280, sh: 36, sw: 19, dh: 80, dw: 50, cols: 1 },
};
let shootBulletDirection = {
  right: { dx: 1, dy: 0 },
  left: { dx: -1, dy: 0 },
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  rightUp: { dx: 1, dy: -1 },
  rightDown: { dx: 1, dy: 1 },
  leftUp: { dx: -1, dy: -1 },
  leftDown: { dx: -1, dy: 1 },
};
let fpsCount = 0;
let shiftRight = 0;
let shiftLeft = 0;
let shiftDown = 0;
let shiftUp = 0;
let shootShiftRight = 0;
let shootShiftLeft = 0;

function createNewBullet(x, y, { dx, dy }) {
  return new Bullet(x, y, dx, dy);
}

class Player {
  constructor({ playerPosition, playerSize, playerVelocity }) {
    this.baseLevel = canvas.height;
    this.playerPosition = playerPosition;
    this.playerSize = playerSize;
    this.playerVelocity = playerVelocity;
    this.onTrack = true;
    this.move = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      shoot: false,
      isJumping: false,
      lastDirection: "right",
      onWater: false,
    };
    this.drawPlayer();
  }
  drawPlayer() {
    if (this.move.onWater && this.move.lastDirection === "right") {
      let { water } = playerPicture;
      ctx.drawImage(loadedImages["player"], water.sx, water.sy, water.sw, water.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else if (this.move.onWater && this.move.lastDirection === "left") {
      let { reverseWater } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], reverseWater.sx, reverseWater.sy, reverseWater.sw, reverseWater.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else if (this.move.down && this.move.right) {
      let { downRight } = playerPicture;
      if (fpsCount % 10 === 0) {
        shiftRight += downRight.sw;
        if (shiftRight >= downRight.sw * downRight.cols) {
          shiftRight = 0;
        }
      }

      ctx.drawImage(loadedImages["player"], downRight.sx + shiftRight, downRight.sy, downRight.sw, downRight.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      fpsCount++;
    } else if (this.move.down && this.move.left) {
      let { downLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], downLeft.sx - shiftLeft, downLeft.sy, downLeft.sw, downLeft.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      if (fpsCount % 10 === 0) {
        shiftLeft += downLeft.sw;
        if (shiftLeft >= downLeft.sw * downLeft.cols) {
          shiftLeft = 0;
        }
      }
      fpsCount++;
    } else if (this.move.up && this.move.left) {
      let { upLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], upLeft.sx - shiftLeft, upLeft.sy, upLeft.sw, upLeft.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      if (fpsCount % 10 === 0) {
        shiftLeft += upLeft.sw;
        if (shiftLeft >= upLeft.sw * upLeft.cols) {
          shiftLeft = 0;
        }
      }
      fpsCount++;
    } else if (this.move.up && this.move.right) {
      let { upRight } = playerPicture;
      if (fpsCount % 10 === 0) {
        shiftRight += upRight.sw;
        if (shiftRight >= upRight.sw * upRight.cols) {
          shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], upRight.sx + shiftRight, upRight.sy, upRight.sw, upRight.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      fpsCount++;
    } else if (this.move.right && this.move.shoot) {
      let { runningShoot } = playerPicture;
      if (fpsCount % 10 === 0) {
        shootShiftRight += runningShoot.sw;
        if (shootShiftRight >= runningShoot.sw * runningShoot.cols) {
          shootShiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], runningShoot.sx + shootShiftRight, runningShoot.sy, runningShoot.sw, runningShoot.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      fpsCount++;
    } else if (this.move.left && this.move.shoot) {
      let { runningReverseShoot } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], runningReverseShoot.sx - shootShiftLeft, runningReverseShoot.sy, runningReverseShoot.sw, runningReverseShoot.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      if (fpsCount % 10 === 0) {
        shootShiftLeft += runningReverseShoot.sw;
        if (shootShiftLeft >= runningReverseShoot.sw * runningReverseShoot.cols) {
          shootShiftLeft = 0;
        }
      }
      fpsCount++;
    } else if (this.move.isJumping) {
      let { jump } = playerPicture;
      if (fpsCount % 10 === 0) {
        shiftRight += jump.sw;
        if (shiftRight >= jump.sw * jump.cols) {
          shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], jump.sx + shiftRight, jump.sy, jump.sw, jump.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      fpsCount++;
    } else if (this.move.up) {
      let { lookUp } = playerPicture;
      ctx.drawImage(loadedImages["player"], lookUp.sx, lookUp.sy, lookUp.sw, lookUp.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else if (this.move.down && this.move.lastDirection === "right") {
      let { sleepDownRight } = playerPicture;
      ctx.drawImage(loadedImages["player"], sleepDownRight.sx, sleepDownRight.sy, sleepDownRight.sw, sleepDownRight.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else if (this.move.down && this.move.lastDirection === "left") {
      let { sleepDownLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], sleepDownLeft.sx, sleepDownLeft.sy, sleepDownLeft.sw, sleepDownLeft.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else if (this.move.right) {
      let { running } = playerPicture;
      if (fpsCount % 10 === 0) {
        shiftRight += running.sw;
        if (shiftRight >= running.sw * running.cols) {
          shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], running.sx + shiftRight, running.sy, running.sw, running.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      fpsCount++;
    } else if (this.move.left) {
      let { runningReverse } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], runningReverse.sx - shiftLeft, runningReverse.sy, runningReverse.sw, runningReverse.sh, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
      if (fpsCount % 10 === 0) {
        shiftLeft += runningReverse.sw;
        if (shiftLeft >= runningReverse.sw * runningReverse.cols) {
          shiftLeft = 0;
        }
      }
      fpsCount++;
    } else if (this.move.lastDirection === "left") {
      ctx.drawImage(loadedImages["playerreverse"], 397, 6, 19, 36, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    } else {
      ctx.drawImage(loadedImages["player"], 0, 6, 19, 36, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
    }
  }

  checkGroundCollision() {
    if (this.playerPosition.y + this.playerSize.height >= this.baseLevel) {
      this.playerVelocity.y = 0;
      this.playerPosition.y = this.baseLevel - this.playerSize.height;
      this.move.isJumping = false;
    } else {
      this.playerVelocity.y += GRAVITY;
    }
  }
  moveLeft(status) {
    if (status) {
      this.move.left = true;
      this.move.lastDirection = "left";
    } else {
      this.move.left = false;
    }
    this.movePosition();
  }
  moveRight(status) {
    if (status) {
      this.move.right = true;
      this.move.lastDirection = "right";
    } else {
      this.move.right = false;
    }
    this.movePosition();
  }
  jump(status) {
    if (status) {
      if (this.move.down) {
        this.playerPosition.y += 1;
      } else if (!this.move.isJumping) {
        this.move.isJumping = true;
        this.playerVelocity.y = -JUMP_VALUE;
      }
    }
  }
  shoot(status) {
    if (status) {
      this.move.shoot = true;
      if (this.move.down && this.move.right) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.rightDown));
      } else if (this.move.down && this.move.left) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.leftDown));
      } else if (this.move.up && this.move.left) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.leftUp));
      } else if (this.move.up && this.move.right) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.rightUp));
      } else if (this.move.lastDirection == "left") {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.left));
      } else if (this.move.up) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.up));
      } else if (this.move.down) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.down));
      } else if (this.move.right) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.right));
      } else if (this.move.left) {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.left));
      } else {
        bullets.push(createNewBullet(this.playerPosition.x + this.playerSize.width, this.playerPosition.y, shootBulletDirection.right));
      }
    } else {
      this.move.shoot = false;
    }
  }
  sleep(status) {}

  movePosition() {
    if (this.move.left) {
      this.playerVelocity.x = -parseInt(PLAYER_SPEED);
    } else if (this.move.right) {
      this.playerVelocity.x = parseInt(PLAYER_SPEED);
    } else {
      this.playerVelocity.x = 0;
    }
  }
  updatePosition(trackObj) {
    if (this.move.right) {
      //checking if the track is not end so that it can move forward
      if ((trackObj.track[0].length - 1) * GRID_WIDTH >= canvas.width) {
        //if track is there width of screen /3 and the track moves forward
        if (this.playerPosition.x + this.playerSize.width >= canvas.width / 3) {
          this.playerVelocity.x = 0;
          //stopping player to continuosly calling forward breaking it with track pass velocity
          if (trackPassVelocity % GRID_WIDTH === 0) {
            trackObj.moveForward();
          }
          trackPassVelocity += 20;
        } else {
          this.playerVelocity.x = PLAYER_SPEED;
        }
      }
    }
    this.playerPosition.x += this.playerVelocity.x;
    this.playerPosition.y += this.playerVelocity.y;
    this.checkGroundCollision();
    this.drawPlayer();
  }
}
