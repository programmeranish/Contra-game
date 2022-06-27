var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let trackPassVelocity = 0; //for movement of track forward

let playerPicture = {
  running: { sx: 0, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
};

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
    // ctx.drawImage(
    //   loadedImages["player"],
    //   100,
    //   100,
    //   100,
    //   100,
    //   100,
    //   100,
    //   100,
    //   100
    // );
    ctx.fillStyle = "red";
    ctx.fillRect(this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height);
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
