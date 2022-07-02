//for movement of track forward
let adjustHeightBullet = 20; //for adjusting bullet height for accurate bullet while shooting

let playerPicture = {
  running: { sx: 0, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningReverse: { sx: 397, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningShoot: { sx: 0, sy: 114, sh: 36, sw: 24, dh: 80, dw: 50, cols: 3 },
  runningReverseShoot: {
    sx: 391,
    sy: 114,
    sh: 36,
    sw: 24,
    dh: 80,
    dw: 50,
    cols: 3,
  },
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
  right: { dx: 1, dy: 0, sx: 352, sy: 0 },
  left: { dx: -1, dy: 0, sx: 352, sy: 0 },
  up: { dx: 0, dy: -1, sx: 352, sy: 0 },
  /*  */
  down: { dx: 1, dy: 0, sx: 352, sy: -5 },
  downLeft: { dx: -1, dy: 0, sx: 352, sy: -5 },
  rightUp: { dx: 1, dy: -1, sx: 352, sy: 10 },
  rightDown: { dx: 1, dy: 1, sx: 352, sy: -7 },
  leftUp: { dx: -1, dy: -1, sx: 352, sy: 10 },
  leftDown: { dx: -1, dy: 1, sx: 352, sy: -7 },
};
/**
 *
 * @param {number} x -position
 * @param {number} y -position
 * @param {object} param2 -object of direction and speeds
 * @returns
 */
function createNewBullet(x, y, { dx, dy, sx, sy }) {
  return new Bullet(x, y, sx, sy, dx, dy, "player");
}

class Player {
  constructor({ position, size, mainPlayer, playerId }) {
    this.id = "player";
    this.playerId = playerId;
    this.life = 4;
    this.score = 0;
    this.dead = false;
    this.mainPlayer = mainPlayer;
    this.trackPassVelocity = 0;
    this.fpsCount = 0;
    this.shiftRight = 0;
    this.shiftLeft = 0;
    this.shiftDown = 0;
    this.shiftUp = 0;
    this.shootShiftRight = 0;
    this.shootShiftLeft = 0;
    this.baseLevel = canvas.height;
    this.position = position;
    this.size = size;
    this.velocity = { x: 0, y: 10 };
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

  checkGameWin() {
    if (this.position.x > canvas.width && this.mainPlayer) {
      return true;
    } else return false;
  }

  checkFall() {
    if (this.position.y + this.size.height >= canvas.height) {
      return true;
    } else {
      return false;
    }
  }

  drawPlayer() {
    if (this.move.onWater && this.move.lastDirection === "right") {
      let { water } = playerPicture;
      ctx.drawImage(loadedImages["player"], water.sx, water.sy, water.sw, water.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.move.onWater && this.move.lastDirection === "left") {
      let { reverseWater } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], reverseWater.sx, reverseWater.sy, reverseWater.sw, reverseWater.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.move.down && this.move.right) {
      let { downRight } = playerPicture;
      if (this.fpsCount % 10 === 0) {
        this.shiftRight += downRight.sw;
        if (this.shiftRight >= downRight.sw * downRight.cols) {
          this.shiftRight = 0;
        }
      }

      ctx.drawImage(loadedImages["player"], downRight.sx + this.shiftRight, downRight.sy, downRight.sw, downRight.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else if (this.move.down && this.move.left) {
      let { downLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], downLeft.sx - this.shiftLeft, downLeft.sy, downLeft.sw, downLeft.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.fpsCount % 10 === 0) {
        this.shiftLeft += downLeft.sw;
        if (this.shiftLeft >= downLeft.sw * downLeft.cols) {
          this.shiftLeft = 0;
        }
      }
      this.fpsCount++;
    } else if (this.move.up && this.move.left) {
      let { upLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], upLeft.sx - this.shiftLeft, upLeft.sy, upLeft.sw, upLeft.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.fpsCount % 10 === 0) {
        this.shiftLeft += upLeft.sw;
        if (this.shiftLeft >= upLeft.sw * upLeft.cols) {
          this.shiftLeft = 0;
        }
      }
      this.fpsCount++;
    } else if (this.move.up && this.move.right) {
      let { upRight } = playerPicture;
      if (this.fpsCount % 10 === 0) {
        this.shiftRight += upRight.sw;
        if (this.shiftRight >= upRight.sw * upRight.cols) {
          this.shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], upRight.sx + this.shiftRight, upRight.sy, upRight.sw, upRight.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else if (this.move.right && this.move.shoot) {
      let { runningShoot } = playerPicture;
      if (this.fpsCount % 10 === 0) {
        this.shootShiftRight += runningShoot.sw;
        if (this.shootShiftRight >= runningShoot.sw * runningShoot.cols) {
          this.shootShiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], runningShoot.sx + this.shootShiftRight, runningShoot.sy, runningShoot.sw, runningShoot.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else if (this.move.left && this.move.shoot) {
      let { runningReverseShoot } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], runningReverseShoot.sx - this.shootShiftLeft, runningReverseShoot.sy, runningReverseShoot.sw, runningReverseShoot.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.fpsCount % 10 === 0) {
        this.shootShiftLeft += runningReverseShoot.sw;
        if (this.shootShiftLeft >= runningReverseShoot.sw * runningReverseShoot.cols) {
          this.shootShiftLeft = 0;
        }
      }
      this.fpsCount++;
    } else if (this.move.isJumping) {
      let { jump } = playerPicture;
      if (this.fpsCount % 10 === 0) {
        this.shiftRight += jump.sw;
        if (this.shiftRight >= jump.sw * jump.cols) {
          this.shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], jump.sx + this.shiftRight, jump.sy, jump.sw, jump.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else if (this.move.up) {
      let { lookUp } = playerPicture;
      ctx.drawImage(loadedImages["player"], lookUp.sx, lookUp.sy, lookUp.sw, lookUp.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.move.down && this.move.lastDirection === "right") {
      let { sleepDownRight } = playerPicture;
      ctx.drawImage(loadedImages["player"], sleepDownRight.sx, sleepDownRight.sy, sleepDownRight.sw, sleepDownRight.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.move.down && this.move.lastDirection === "left") {
      let { sleepDownLeft } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], sleepDownLeft.sx, sleepDownLeft.sy, sleepDownLeft.sw, sleepDownLeft.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    } else if (this.move.right) {
      let { running } = playerPicture;
      if (this.fpsCount % 10 === 0) {
        this.shiftRight += running.sw;
        if (this.shiftRight >= running.sw * running.cols) {
          this.shiftRight = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], running.sx + this.shiftRight, running.sy, running.sw, running.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else if (this.move.left) {
      let { runningReverse } = playerPicture;
      ctx.drawImage(loadedImages["playerreverse"], runningReverse.sx - this.shiftLeft, runningReverse.sy, runningReverse.sw, runningReverse.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.fpsCount % 10 === 0) {
        this.shiftLeft += runningReverse.sw;
        if (this.shiftLeft >= runningReverse.sw * runningReverse.cols) {
          this.shiftLeft = 0;
        }
      }
      this.fpsCount++;
    } else if (this.move.lastDirection === "left") {
      ctx.drawImage(loadedImages["playerreverse"], 397, 6, 19, 36, this.position.x, this.position.y, this.size.width, this.size.height);
    } else {
      ctx.drawImage(loadedImages["player"], 0, 6, 19, 36, this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }

  checkGroundCollision() {
    if (this.position.y + this.size.height >= this.baseLevel) {
      this.velocity.y = 0;
      this.position.y = this.baseLevel - this.size.height;
      this.move.isJumping = false;
    } else {
      this.velocity.y += GRAVITY;
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
        this.position.y += 1;
      } else if (!this.move.isJumping) {
        this.move.isJumping = true;
        this.velocity.y = -JUMP_VALUE;
      }
    }
  }
  shoot(status) {
    if (status) {
      bulletesSound.play();
      this.move.shoot = true;
      if (this.move.down && this.move.right) {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y + adjustHeightBullet, shootBulletDirection.rightDown));
      } else if (this.move.down && this.move.left) {
        bullets.push(createNewBullet(this.position.x - this.size.width, this.position.y + adjustHeightBullet, shootBulletDirection.leftDown));
      } else if (this.move.up && this.move.left) {
        bullets.push(createNewBullet(this.position.x - this.size.width, this.position.y - adjustHeightBullet, shootBulletDirection.leftUp));
      } else if (this.move.up && this.move.right) {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y - adjustHeightBullet, shootBulletDirection.rightUp));
      } else if (this.move.down && this.move.lastDirection == "left") {
        bullets.push(createNewBullet(this.position.x - this.size.width, this.position.y + adjustHeightBullet, shootBulletDirection.downLeft));
      } else if (this.move.lastDirection == "left") {
        bullets.push(createNewBullet(this.position.x - this.size.width, this.position.y, shootBulletDirection.left));
      } else if (this.move.up) {
        bullets.push(createNewBullet(this.position.x, this.position.y, shootBulletDirection.up));
      } else if (this.move.down) {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y + adjustHeightBullet, shootBulletDirection.down));
      } else if (this.move.right) {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y, shootBulletDirection.right));
      } else if (this.move.left) {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y, shootBulletDirection.left));
      } else {
        bullets.push(createNewBullet(this.position.x + this.size.width, this.position.y, shootBulletDirection.right));
      }
    } else {
      this.move.shoot = false;
    }
  }

  movePosition() {
    if (this.move.left) {
      this.velocity.x = -parseInt(PLAYER_SPEED);
    } else if (this.move.right) {
      this.velocity.x = parseInt(PLAYER_SPEED);
    } else {
      this.velocity.x = 0;
    }
  }

  updatePosition(trackObj) {
    if (this.move.right && this.mainPlayer) {
      //checking if the track is not end so that it can move forward
      if ((trackObj.track[0].length - 1) * GRID_WIDTH >= canvas.width) {
        //if track is there width of screen /3 and the track moves forward
        if (this.position.x + this.size.width >= canvas.width / 3) {
          this.velocity.x = 0;
          //stopping player to continuosly calling forward breaking it with track pass velocity
          if (this.trackPassVelocity % GRID_WIDTH === 0) {
            trackObj.moveForward();
          }
          this.trackPassVelocity += adjustHeightBullet;
        } else {
          this.velocity.x = PLAYER_SPEED;
        }
      }
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.checkGroundCollision();
    this.drawPlayer();
  }
}
