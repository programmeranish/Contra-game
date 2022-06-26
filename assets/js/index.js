class Gameplay {
  constructor() {
    this.backgroundImage = new Background();
    this.player = new Player({
      playerPosition: { x: 0, y: 0 },
      playerSize: { width: 100, height: 100 },
      playerVelocity: { x: 0, y: 10 },
    });
    this.trackObj = new Track();

    //key down event
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w": {
          break;
        }
        case "s": {
          console.log("s");
          break;
        }
        case "a": {
          console.log("moving left");
          this.player.moveLeft(true);
          this.player.movePosition();
          break;
        }
        case "d": {
          console.log("moving right");
          this.player.moveRight(true);
          break;
        }
        case "k": {
          console.log("jump");
          this.player.jump(true);
          break;
        }
        case "j": {
          console.log("shoot");
          this.player.shoot();
          break;
        }
      }
    });

    // key up event
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w": {
          break;
        }
        case "s": {
          console.log("s");
          break;
        }
        case "a": {
          this.player.moveLeft(false);
          break;
        }
        case "d": {
          this.player.moveRight(false);
          break;
        }
        case "k": {
          console.log("k");
          break;
        }
        case "j": {
          console.log("j");
          break;
        }
      }
    });
  }
  playgame() {
    this.backgroundImage.clearScreen();
    this.backgroundImage.drawBackground();
    this.trackObj.checkTracks();
    checkOnTrack(this.player, this.trackObj);
    this.player.updatePosition();
  }
}
/*
@game:starting new game and loop
*/
function startGame() {
  let game = new Gameplay();
  function play() {
    requestAnimationFrame(play);
    game.playgame();
  }
  play();
}

loadImages().then((imagesObj) => {
  loadedImages = imagesObj;
  startGame();
});
