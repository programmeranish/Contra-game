var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class EnemyBot {
  constructor({ position, arrayPosition }) {
    this.position = { x: position.x, y: position.y };
    this.size = { height: 60, width: 60 };
    this.health = 10;
    this.arrayPosition = { x: arrayPosition.x, y: arrayPosition.y };
  }

  drawBot() {
    ctx.drawImage(
      loadedImages["playerreverse"],
      0,
      0,
      50,
      50,
      this.position.x,
      this.position.y,
      50,
      50
    );
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
  shoted() {
    this.health -= 1;
  }
}
