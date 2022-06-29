var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class EnemyBot {
  constructor({ position, arrayPosition }) {
    this.id = "enemy";
    this.position = { x: position.x, y: position.y };
    this.size = { height: 60, width: 60 };
    this.health = 500;
    this.arrayPosition = { x: arrayPosition.x, y: arrayPosition.y };
    this.isActive = false;
    this.fps = 0;
  }

  drawBot() {
    ctx.drawImage(loadedImages["playerreverse"], 0, 0, 18, 40, this.position.x, this.position.y, 50, 100);
  }

  updatePosition({ position }) {
    this.position = position;
  }

  isDead() {
    if (this.health <= 0) {
      return true;
    } else {
      return false;
    }
  }
  shootPlayer(playerObj) {
    if (this.fps % 100 === 0) {
      if (measureDistance(this.position.x, playerObj.position.x) < 400) {
        this.isActive = true;
        console.log(this.health);
        let { dx, dy } = measureAngle(playerObj, this);
        console.log("shoot player ", dx, dy);
        if ((dx === -1) & (dy === -1)) {
          bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, dy, "enemy"));
        } else if (dx === -1 && dy === 1) {
          bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, dy, "enemy"));
        } else if (dx === 1 && dy === 1) {
          bullets.push(new Bullet(this.position.x, this.position.y, 352, 0, dx, dy, "enemy"));
        } else if (dx === 1 && dy === -1) {
          bullets.push(new Bullet(this.position.x + this.size.width / 2, this.position.y, 352, 0, dx, dy, "enemy"));
        } else {
          this.isActive = false;
        }
      }
    }
    this.fps++;
  }
  shoted() {
    this.health -= 50;
  }
}
