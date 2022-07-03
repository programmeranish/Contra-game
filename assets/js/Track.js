let playTrack = trackArray;

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
    /*0:empty space
    1:road
    2:tree
    3:bridgeStart
    4:bridge
    5:bridgeEnd
    6:enemybot
    7:enemybot2
    8:water
    9:wall
    */
    this.shiftTrack = 0;
    this.shiftTrackBy = 6;
    this.track = trackArray;
    createEnemyBot(this);
  }
  moveForward() {
    for (let y = 0; y < this.track.length; y++) {
      if (this.shiftTrack >= 60) {
        this.track[y].shift();
        playTrack = this.track;
        enemyBots.forEach((enemyBot) => {
          enemyBot.arrayPosition.x -= 1;
        });
      }
    }
    if (this.shiftTrack < 60) {
      this.shiftTrack += this.shiftTrackBy;
    } else {
      this.shiftTrack = 0;
    }
  }
  // if (this.shiftTrack <= 60) {
  //   this.shiftTrack += this.shiftTrackBy;
  // } else {
  //   this.track[y].shift();
  //   this.shiftTrack = 0;
  // }
  checkTracks() {
    for (let y = 0; y < this.track.length; y++) {
      for (let x = 0; x < this.track[y].length; x++) {
        if (this.track[y][x] != 0) {
          let trackPosition = {
            x: x * GRID_WIDTH - this.shiftTrack,
            y: y * GRID_HEIGHT,
          };
          //for enemy bot position update
          if (this.track[y][x] === 6) {
            enemyBots.forEach((enemyBot) => {
              if (enemyBot.arrayPosition.y === y) {
                enemyBot.updatePosition({ position: trackPosition });
              }
            });
          }

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
                trackDetail: {
                  image: "background",
                  trackSource: "bridgeStart",
                },
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
