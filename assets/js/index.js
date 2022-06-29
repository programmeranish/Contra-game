var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var bullets = [];
var enemies = [];
var blasts = [];
var enemyBots = [];

function createBlast({ x, y }) {
  blasts.push(
    new Blast({
      position: { x, y },
      size: { height: 50, width: 50 },
    })
  );
  setTimeout(() => {
    blasts.shift();
  }, 500);
}

class Gameplay {
  constructor() {
    this.backgroundImage = new Background();
    this.player = new Player({
      position: { x: 0, y: 0 },
      size: { width: 50, height: 80 },
    });
    enemies.push(new Enemy());

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
        let singleBullet = null; //bullet for return if none touches the bullet with enemy or other object
        if (enemies.length === 0) {
          singleBullet = bulletObj;
        }

        enemyBots = enemyBots.filter((enemyBot) => {
          let bot = enemyBot;
          if (checkBulletCollision(bulletObj, enemyBot)) {
            enemyBot.shoted();
            singleBullet = null;
            if (enemyBot.isDead()) {
              bot = null;
              createBlast(enemyBot.position);
            }
          }

          return bot;
        });

        enemies = enemies.filter((enemy) => {
          //checking if the bullet hits the enemy with loop again at enemies
          if (checkBulletCollision(bulletObj, enemy)) {
            createBlast(enemy.position);
            return null;
          } else {
            singleBullet = bulletObj;
            return enemy;
          }
        });
        return singleBullet;
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
        //player dies
      }
      checkOnTrack(enemy, this.trackObj);
      enemy.updatePosition(this.trackObj);
    });

    //drawing bot
    enemyBots.forEach((enemyBot) => {
      enemyBot.drawBot();
      enemyBot.shootPlayer(this.player);
    });

    //drawing black
    blasts.forEach((blast) => {
      blast.drawBlast();
    });
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
