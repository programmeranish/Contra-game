let enemyPicture = {
  running: { sx: 228, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningReverse: { sx: 190, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  watch: { sx: 190, sy: 7, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
};
class Enemy {
  constructor({ enemyType }) {
    this.id = "enemy";
    this.position = { x: 1500, y: 0 };
    this.size = { height: 80, width: 50 };
    this.velocity = { x: 0, y: 10 };
    this.baseLevel = canvas.height;
    this.move = {
      left: true,
      right: false,
      up: false,
      down: false,
      lastDirection: "left",
      onWater: false,
    };
    this.enemyType = enemyType;

    this.shift = { right: 0, left: 0 };
    this.fpsCount = 0;
  }
  drawEnemy() {
    if (this.move.left) {
      let { runningReverse } = enemyPicture;
      ctx.drawImage(loadedImages["playerreverse"], runningReverse.sx + this.shift.left, runningReverse.sy, runningReverse.sw, runningReverse.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.fpsCount % 10 === 0) {
        this.shift.left -= runningReverse.sw;
        if (this.shift.left < -runningReverse.sw * runningReverse.cols) {
          this.shift.left = 0;
        }
      }
      this.fpsCount++;
    } else if (this.move.right) {
      let { running } = enemyPicture;
      if (this.fpsCount % 10 === 0) {
        this.shift.right += running.sw;
        if (this.shift.right >= running.sw * running.cols) {
          this.shift.right = 0;
        }
      }
      ctx.drawImage(loadedImages["player"], running.sx + this.shift.right, running.sy, running.sw, running.sh, this.position.x, this.position.y, this.size.width, this.size.height);
      this.fpsCount++;
    } else {
      let { watch } = enemyPicture;
      ctx.drawImage(loadedImages["playerreverse"], watch.sx, watch.sy, watch.sw, watch.sh, this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }

  checkGroundCollision() {
    if (this.position.y + this.size.height >= this.baseLevel) {
      this.velocity.y = 0;
      this.position.y = this.baseLevel - this.size.height;
    } else {
      this.velocity.y += GRAVITY;
    }
  }
  movePosition() {
    if (this.move.left) {
      this.velocity.x = -parseInt(ENEMY_SPEED);
    } else if (this.move.right) {
      this.velocity.x = parseInt(ENEMY_SPEED);
    } else {
      this.velocity.x = 0;
    }
  }
  checkWallCollision() {
    if (this.position.x <= 0) {
      this.move.left = false;
      this.move.right = true;
    }
  }
  shootPlayer(playerObj) {
    if (this.enemyType === "runningShoot") {
      if (this.fpsCount % 100 === 0) {
        if (measureDistance(this.position.x, playerObj.position.x) < 800) {
          this.isActive = true;
          let { dx, dy } = measureAngle(playerObj, this);
          if (dx === -1 && dy === -1 && this.move.left) {
            bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, 0, "enemy"));
          } else if (dx === -1 && dy === 1 && this.move.left) {
            bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, 0, "enemy"));
          } else if (dx === 1 && dy === 1 && this.move.right) {
            bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, 0, "enemy"));
          } else if (dx === 1 && dy === -1 && this.move.right) {
            bullets.push(new Bullet(this.position.x + this.size.width / 2, this.position.y, 352, 0, dx, 0, "enemy"));
          } else {
            this.isActive = false;
          }
        }
      }
    }
  }
  checkFall() {
    if (this.position.y + this.size.height >= canvas.height) {
      return true;
    } else if (this.move.onWater) {
      return true;
    } else {
      return false;
    }
  }
  updatePosition() {
    this.movePosition();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.checkGroundCollision();
    this.checkWallCollision();
    this.drawEnemy();
  }
  deleteEnemy() {
    delete this;
  }
}
