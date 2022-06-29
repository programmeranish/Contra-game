var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let enemyPicture = {
  running: { sx: 228, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningReverse: { sx: 190, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  watch: { sx: 190, sy: 7, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
};
class Enemy {
  constructor() {
    this.id = "enemy";
    this.position = { x: 220, y: 0 };
    this.size = { height: 80, width: 50 };
    this.velocity = { x: 0, y: 10 };
    this.baseLevel = canvas.height;

    this.enemyType = { 1: "shooting", 2: "running", 3: "bot" };
    this.move = {
      left: false,
      right: false,
      up: false,
      down: false,
      lastDirection: "left",
      onWater: false,
    };
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
  updatePositionEnemy() {}
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
  updatePosition(trackObj) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.checkGroundCollision();
    this.drawEnemy();
  }
  deleteEnemy() {
    delete this;
  }
}
