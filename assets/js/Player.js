var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Player {
  constructor({ playerPosition, playerSize, playerVelocity }) {
    this.baseLevel = canvas.height;
    this.playerPosition = playerPosition;
    this.playerSize = playerSize;
    this.playerVelocity = playerVelocity;
    this.onTrack = true;
    this.drawPlayer();
    this.move = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      shoot: false,
      isJumping: false,
    };
  }

  drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerSize.width,
      this.playerSize.height
    );
    ctx.stroke();
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
    if (status) this.move.left = true;
    else this.move.left = false;
    this.movePosition();
  }
  moveRight(status) {
    if (status) {
      this.move.right = true;
    } else {
      this.move.right = false;
    }
    this.movePosition();
  }
  jump(status) {
    if (status) {
      if (!this.move.isJumping) {
        this.move.isJumping = true;
        this.playerVelocity.y = -JUMP_VALUE;
      }
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

    this.updatePosition();
  }
  updatePosition() {
    this.playerPosition.x += this.playerVelocity.x;
    this.playerPosition.y += this.playerVelocity.y;
    this.checkGroundCollision();
    this.drawPlayer();
  }
}
