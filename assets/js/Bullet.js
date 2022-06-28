var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Bullet {
  constructor(x, y, sx, sy, dx, dy) {
    this.bulletPosition = { x, y };
    this.bulletDirection = { dx, dy };
    this.bulletSourceImage = { sx, sy };
    this.bulletSpeed = 4;
    this.bulletSize = { height: 50, width: 50 };
    this.drawBullet();
  }
  checkOutOfBox() {
    if (this.bulletPosition.x > canvas.width) {
      return true;
    } else if (this.bulletPosition.x < 0) {
      return true;
    } else if (this.bulletPosition.y < 0) {
      return true;
    } else if (this.bulletPosition.y > canvas.height) {
      return true;
    } else {
      return false;
    }
  }
  drawBullet() {
    ctx.drawImage(loadedImages["player"], this.bulletSourceImage.sx, this.bulletSourceImage.sy, 10, 20, this.bulletPosition.x, this.bulletPosition.y, this.bulletSize.width, this.bulletSize.height);
  }
  updatePosition() {
    console.log(this.bulletPosition.x);
    this.bulletPosition = { x: this.bulletPosition.x + this.bulletSpeed * this.bulletDirection.dx, y: this.bulletPosition.y + this.bulletSpeed * this.bulletDirection.dy };
  }
  deleteBullet() {
    delete this;
  }
}
