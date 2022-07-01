class Background {
  constructor() {
    this.backgroundImage = "";
  }

  drawBackground() {
    this.backgroundImage = loadedImages["background"];
    // ctx.drawImage(
    //   this.backgroundImage,
    //   0,
    //   0,
    //   400,
    //   70,
    //   0,
    //   0,
    //   canvas.width,
    //   canvas.height
    // );
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
