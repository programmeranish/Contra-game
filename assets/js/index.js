var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var bullets = [];
var enemies = [];

class Gameplay {
  constructor() {
    this.backgroundImage = new Background();
    this.player = new Player({
      position: { x: 0, y: 0 },
      size: { width: 50, height: 80 },
    });
    enemies.push(new Enemy());
    this.blast = new Blast({ position: { x: 50, y: 0 }, size: { height: 50, width: 50 } });

    this.trackObj = new Track();

    this.moveDistance = 0;
    //key down event
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w": {
          this.player.move.up = true;
          break;
        }
        case "s": {
          console.log("s");
          this.player.move.down = true;
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
          this.player.shoot(true);
          break;
        }
      }
    });

    // key up event
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w": {
          this.player.move.up = false;
          break;
        }
        case "s": {
          console.log("s");
          this.player.move.down = false;
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
          this.player.shoot(false);
          break;
        }
      }
    });
  }

  /*continuouse loop running for the game
  @playgame()=> the game is playing

  //continuous looop of the game on request animation frame
  */
  playgame() {
    this.backgroundImage.clearScreen();
    this.backgroundImage.drawBackground();
    //creating tracks
    this.trackObj.checkTracks();
    //filtering bullets out of the view
    bullets = bullets.filter((bulletObj) => {
      if (!bulletObj.checkOutOfBox()) {
        //if inside bullet check collision with enemies
        let singleBullet = null;
        if (enemies.length === 0) {
          singleBullet = bulletObj;
        }
        enemies = enemies.filter((enemy) => {
          if (checkBulletCollision(bulletObj, enemy)) {
            return null;
          } else {
            singleBullet = bulletObj;
            return enemy;
          }
        });
        return singleBullet;
      } else {
        bulletObj.deleteBullet();
      }
    });
    bullets.forEach((bullet) => {
      bullet.updatePosition();
      bullet.drawBullet();
    });
    checkOnTrack(this.player, this.trackObj);
    this.player.updatePosition(this.trackObj);
    enemies.forEach((enemy) => {
      if (checkEnemyCollision(this.player, enemy)) {
        console.log("collided");
      }
      checkOnTrack(enemy, this.trackObj);
      enemy.updatePosition(this.trackObj);
    });
    this.blast.drawBlast();
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
