var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let trackSourceImage = {
  road: { sx: 100, sy: 100, sw: 60, sh: 60 },
  grass: { sx: 100, sy: 65, sw: 70, sh: 30 },
  bridgeStart: { sx: 1055, sy: 105, sw: 60, sh: 30 },
  bridge: { sx: 1075, sy: 105, sw: 60, sh: 30 },
  bridgeEnd: { sx: 1125, sy: 105, sw: 60, sh: 30 },
  enemyBot: { sx: 320, sy: 140, sw: 30, sh: 25 },
  enemyBot2: { sx: 1125, sy: 105, sw: 60, sh: 30 },
  waterTop: { sx: 1180, sy: 185, sw: 60, sh: 30 },
  water: { sx: 1110, sy: 185, sw: 60, sh: 30 },
  wall: { sx: 1188, sy: 120, sw: 60, sh: 60 },
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
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 5, 6, 7, 8, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      [8, 9, 9, 9, 1, 1, 1, 9, 9, 9, 6, 9, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [8, 8, 9, 9, 9, 9, 9, 1, 1, 9, 9, 9, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
              break;
            }
            case 3: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "bridgeStart" },
              });
              break;
            }
            case 4: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "bridge" },
              });
              break;
            }
            case 5: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "bridgeEnd" },
              });
              break;
            }
            case 6: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "enemyBot" },
              });
              break;
            }
            case 7: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "enemyBot2" },
              });
              break;
            }
            case 8: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "water" },
              });
              break;
            }
            case 9: {
              this.drawTrack({
                trackPosition,
                trackDetail: { image: "background", trackSource: "wall" },
              });
              break;
            }
          }
        }
      }
    }
  }
  drawTrack({ trackPosition, trackDetail }) {
    ctx.drawImage(loadedImages[trackDetail.image], trackSourceImage[trackDetail.trackSource].sx, trackSourceImage[trackDetail.trackSource].sy, trackSourceImage[trackDetail.trackSource].sw, trackSourceImage[trackDetail.trackSource].sh, trackPosition.x, trackPosition.y, 60, 60);
  }
}
