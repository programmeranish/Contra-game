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
      size: { height: 60, width: 60 },
    })
  );
  setTimeout(() => {
    blasts.shift();
  }, 500);
}
function playerDead(player) {
  createBlast(player.position);
  if (player.life > 0) {
    player.life = player.life - 1;
    player.position.x = 0;
    player.position.y = 0;
  } else {
    console.log("gameover");
  }
}

class Gameplay {
  constructor() {
    this.backgroundImage = new Background();
    this.player = new Player({
      position: { x: 0, y: 0 },
      size: { width: 50, height: 80 },
    });

    enemies.push(new Enemy({ enemyType: "runningShoot" }));

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
          this.player.move.down = true;
          break;
        }
        case "a": {
          this.player.moveLeft(true);
          this.player.movePosition();
          break;
        }
        case "d": {
          this.player.moveRight(true);
          break;
        }
        case "k": {
          this.player.jump(true);
          break;
        }
        case "j": {
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
          break;
        }
        case "j": {
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

        //checking bullet and enemy bots collision
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

        //check enemies and bullet collision
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
        if (checkBulletCollision(bulletObj, this.player)) {
          singleBullet = null;
          playerDead(this.player);
        }
        return singleBullet;
      }
    });

    //update bullet positions
    bullets.forEach((bullet) => {
      bullet.updatePosition();
      bullet.drawBullet();
    });

    //checking player on track
    checkOnTrack(this.player, this.trackObj);
    this.player.updatePosition(this.trackObj);

    //filtering enemies on fall
    enemies = enemies.filter((enemy) => {
      if (enemy.checkFall()) {
        createBlast(enemy.position);
        return null;
      } else {
        return enemy;
      }
    });

    //checking player with enemy collision
    enemies.forEach((enemy) => {
      //automatic shooting by enemy
      enemy.shootPlayer(this.player);

      //player and enemy collision check
      if (checkEnemyCollision(this.player, enemy)) {
        playerDead(this.player);
      }
      //checking enemy on track for base
      checkOnTrack(enemy, this.trackObj);
      enemy.updatePosition(this.trackObj);
    });

    //checking if the player has fallen
    if (this.player.checkFall()) {
      playerDead(this.player);
    }

    //blasting bridges over player
    checkBridges(this.trackObj, this.player);

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
