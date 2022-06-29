var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Blast {
  constructor({ position, size }) {
    this.position = { x: position.x, y: position.y };
    this.size = { height: size.height, width: size.width };
    this.fps = 0;
  }
  drawBlast() {
    if (this.size.height >= 0) {
      this.size.height -= 4;
      this.size.width -= 4;
      this.position.x += 2;
      this.position.y += 2;
    }
    ctx.drawImage(
      loadedImages["blastimage"],
      0,
      0,
      701,
      617,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}
