var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

class Background {
  constructor() {
    this.image = this.getImage();
    console.log(this.image, "asdfasdf");
  }
  async getImage() {
    this.image = await loadImage({ url: "/assets/images/background.png" });
  }
  drawBackground() {
    ctx.drawImage(this.image, 0, 0, 100, 100, 0, 0, 300, 300);
  }
}
