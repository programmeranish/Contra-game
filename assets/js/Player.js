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
  updatePosition() {
    this.playerPosition.y += this.playerVelocity.y;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.playerPosition.y + this.playerSize.height >= canvas.height) {
      this.playerVelocity.y = 0;
    } else {
      this.playerVelocity.y += GRAVITY;
    }
    this.drawPlayer();
  }
}
