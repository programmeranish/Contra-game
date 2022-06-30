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
    this.players = [];

    this.players.push(
      new Player({
        position: { x: 0, y: 0 },
        size: { width: 50, height: 80 },
      })
    );
    this.players.push(
      new Player({
        position: { x: 0, y: 0 },
        size: { width: 50, height: 80 },
      })
    );
    // this.players.push(
    //   new Player({
    //     position: { x: 0, y: 0 },
    //     size: { width: 50, height: 80 },
    //   })
    // );

    enemies.push(new Enemy({ enemyType: "runningShoot" }));

    this.trackObj = new Track();

    this.moveDistance = 0;
    //key down event
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w": {
          this.players[0].move.up = true;
          break;
        }
        case "s": {
          this.players[0].move.down = true;
          break;
        }
        case "a": {
          this.players[0].moveLeft(true);
          this.players[0].movePosition();
          break;
        }
        case "d": {
          this.players[0].moveRight(true);
          break;
        }
        case "k": {
          this.players[0].jump(true);
          break;
        }
        case "j": {
          this.players[0].shoot(true);
          break;
        }
      }
    });

    // key up event
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w": {
          this.players[0].move.up = false;
          break;
        }
        case "s": {
          this.players[0].move.down = false;
          break;
        }
        case "a": {
          this.players[0].moveLeft(false);
          break;
        }
        case "d": {
          this.players[0].moveRight(false);
          break;
        }
        case "k": {
          break;
        }
        case "j": {
          this.players[0].shoot(false);
          break;
        }
      }
    });
    if (this.players.length === 2) {
      window.addEventListener("keydown", (event) => {
        console.log(event.key);
        switch (event.key) {
          case "ArrowUp": {
            this.players[1].move.up = true;
            break;
          }
          case "ArrowDown": {
            this.players[1].move.down = true;
            break;
          }
          case "ArrowLeft": {
            this.players[1].moveLeft(true);
            this.players[1].movePosition();
            break;
          }
          case "ArrowRight": {
            this.players[1].moveRight(true);
            break;
          }
          case "]": {
            this.players[1].jump(true);
            break;
          }
          case "[": {
            this.players[1].shoot(true);
            break;
          }
        }
      });

      // key up event
      window.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "ArrowUp": {
            this.players[1].move.up = false;
            break;
          }
          case "ArrowDown": {
            this.players[1].move.down = false;
            break;
          }
          case "ArrowLeft": {
            this.players[1].moveLeft(false);
            break;
          }
          case "ArrowRight": {
            this.players[1].moveRight(false);
            break;
          }
          case "]": {
            break;
          }
          case "[": {
            this.players[1].shoot(false);
            break;
          }
        }
      });
    }
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

        this.players.forEach((player) => {
          //checking bullet and enemy bots collision
          enemyBots = enemyBots.filter((enemyBot) => {
            let bot = enemyBot;
            if (checkBulletCollision(bulletObj, enemyBot)) {
              enemyBot.shoted();
              player.score++;
              singleBullet = null;
              if (enemyBot.isDead()) {
                bot = null;
                createBlast(enemyBot.position);
              }
            }
            return bot;
          });
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
        this.players.forEach((player) => {
          if (checkBulletCollision(bulletObj, player)) {
            singleBullet = null;
            playerDead(player);
          }
        });
        return singleBullet;
      }
    });

    //update bullet positions
    bullets.forEach((bullet) => {
      bullet.updatePosition();
      bullet.drawBullet();
    });

    this.players.forEach((player) => {
      //checking player on track
      checkOnTrack(player, this.trackObj);
      player.updatePosition(this.trackObj);
    });

    //filtering enemies on fall
    enemies = enemies.filter((enemy) => {
      if (enemy.checkFall()) {
        createBlast(enemy.position);
        return null;
      } else {
        return enemy;
      }
    });

    this.players.forEach((player) => {
      //checking player with enemy collision
      enemies.forEach((enemy) => {
        //automatic shooting by enemy
        enemy.shootPlayer(player);

        //player and enemy collision check
        if (checkEnemyCollision(player, enemy)) {
          playerDead(player);
        }
      });

      //checking if the player has fallen
      if (player.checkFall()) {
        playerDead(player);
      }

      //blasting bridges over player
      checkBridges(this.trackObj, player);
    });
    enemies.forEach((enemy) => {
      //checking enemy on track for base
      checkOnTrack(enemy, this.trackObj);
      enemy.updatePosition(this.trackObj);
    });
    //drawing bot
    enemyBots.forEach((enemyBot) => {
      enemyBot.drawBot();
      this.players.forEach((player) => {
        enemyBot.shootPlayer(player);
      });
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
