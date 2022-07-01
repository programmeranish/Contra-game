class Bullet {
  constructor(x, y, sx, sy, dx, dy, shotBy) {
    this.position = { x, y };
    this.bulletDirection = { dx, dy };
    this.bulletSourceImage = { sx, sy };
    this.bulletSpeed = 4;
    this.size = { height: 50, width: 50 };
    this.shotBy = shotBy;
    this.drawBullet();
  }
  checkOutOfBox() {
    if (this.position.x > canvas.width) {
      return true;
    } else if (this.position.x < 0) {
      return true;
    } else if (this.position.y < 0) {
      return true;
    } else if (this.position.y > canvas.height) {
      return true;
    } else {
      return false;
    }
  }
  drawBullet() {
    ctx.drawImage(loadedImages["player"], this.bulletSourceImage.sx, this.bulletSourceImage.sy, 10, 20, this.position.x, this.position.y, this.size.width, this.size.height);
  }
  updatePosition() {
    this.position = { x: this.position.x + this.bulletSpeed * this.bulletDirection.dx, y: this.position.y + this.bulletSpeed * this.bulletDirection.dy };
  }
  deleteBullet() {
    delete this;
  }
}
