var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

// class Track {
//   constructor({ trackPosition, trackSize }) {
//     this.trackSize = trackSize;
//     this.trackPosition = trackPosition;
//     this.drawObstacle();
//   }
//   drawObstacle() {
//     ctx.fillStyle = "blue";
//     ctx.fillRect(
//       this.trackPosition.x,
//       this.trackPosition.y,
//       this.trackSize.width,
//       this.trackSize.height
//     );
//   }
// }
class Track {
  constructor() {
    this.track = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    ];
  }

  checkTracks() {
    for (let y = 0; y < this.track.length; y++) {
      for (let x = 0; x < this.track[y].length; x++) {
        if (this.track[y][x] != 0) {
          switch (this.track[y][x]) {
            case 1: {
              let trackPosition = { x: x * GRID_WIDTH, y: y * GRID_HEIGHT };
              let trackType = this.track[y][x];
              this.drawTrack({
                trackPosition,
                trackType: IMAGES_NAMES[trackType],
              });
            }
          }
        }
      }
    }
  }
  drawTrack({ trackPosition, trackType }) {
    ctx.drawImage(
      imagesObj[trackType],
      100,
      100,
      60,
      60,
      trackPosition.x,
      trackPosition.y,
      60,
      60
    );
  }
}
