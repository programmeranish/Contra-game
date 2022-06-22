const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerSprite = document.createElement("img");
playerSprite.src = "../images/player.png";

class Player {
  constructor({ playerPosition, playerSize, playerVelocity }) {
    this.playerPosition = playerPosition;
    this.playerSize = playerSize;
    this.playerVelocity = playerVelocity;
    this.drawPlayer();
    this.move = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      shoot: false,
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
    if (this.playerPosition.y + this.playerSize.height >= canvas.height) {
      this.playerVelocity.y = 0;
    } else {
      this.playerVelocity.y += GRAVITY;
    }
  }

  move(){
    if(this.move.left){
      this.playerVelocity.x = -1
  }else{
    this.playerVelocity.x = 0;
  }

  updatePosition() {
    this.playerPosition.x += this.playerVelocity.x;

    this.playerPosition.y += this.playerVelocity.y;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.checkGroundCollision();
    this.move();
    }


    this.drawPlayer();
  }
}
