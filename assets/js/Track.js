var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let trackSourceImage = {
  road: { sx: 100, sy: 100, sw: 60, sh: 60 },
  grass: { sx: 100, sy: 65, sw: 70, sh: 30 },
};

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
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
      ],
      [
        2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2,
        2, 2, 2, 2, 2,
      ],
      [
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
      ],
      [
        0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 1, 1, 1, 1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0,
        0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 2, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0,
        2, 2, 2, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0,
        2, 2, 2, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2,
        1, 1, 1, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 0, 0,
      ],
    ];
  }
  moveForward() {
    for (let y = 0; y < this.track.length; y++) {
      this.track[y].shift();
      for (let x = 0; x < this.track[y].length; x++) {}
    }
  }
  checkTracks() {
    for (let y = 0; y < this.track.length; y++) {
      for (let x = 0; x < this.track[y].length; x++) {
        if (this.track[y][x] != 0) {
          let trackPosition = { x: x * GRID_WIDTH, y: y * GRID_HEIGHT };
          switch (this.track[y][x]) {
            case 1: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "road" },
              });
              break;
            }
            case 2: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "grass" },
              });
            }
          }
        }
      }
    }
  }
  drawTrack({ trackPosition, trackDetail }) {
    ctx.drawImage(
      loadedImages[trackDetail.image],
      trackSourceImage[trackDetail.trackSource].sx,
      trackSourceImage[trackDetail.trackSource].sy,
      trackSourceImage[trackDetail.trackSource].sw,
      trackSourceImage[trackDetail.trackSource].sh,
      trackPosition.x,
      trackPosition.y,
      60,
      60
    );
  }
}
