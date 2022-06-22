var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Track {
  constructor({ trackPosition, trackSize }) {
    this.trackSize = trackSize;
    this.trackPosition = trackPosition;
    this.drawObstacle();
  }
  drawObstacle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.trackPosition.x,
      this.trackPosition.y,
      this.trackSize.width,
      this.trackSize.height
    );
  }
}
