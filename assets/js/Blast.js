var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Blast {
  constructor({ position, size }) {
    this.position = { x: position.x, y: position.y };
    this.size = { height: size.height, width: size.width };
  }
  drawBlast() {
    ctx.drawImage(loadedImages["blastimage"], 0, 0, 701, 617, this.position.x, this.position.y, this.size.width, this.size.height);
  }
}
