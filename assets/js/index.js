let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
let gradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0);
let inputElement = document.getElementById("number");
let mainMenuElement = document.getElementById("main_menu");
let trackEditorPage = document.getElementById("track_editor_page");

let errorMessageElement = document.createElement("div");
errorMessageElement.id = "error_message";
errorMessageElement.style.display = "none";
let successMessageElement = document.createElement("div");
successMessageElement.id = "success_message";
successMessageElement.style.display = "none";
document.body.appendChild(errorMessageElement);
document.body.appendChild(successMessageElement);
let gameWinElement = document.getElementById("game_win");
let gameOverElement = document.getElementById("game_over");
let requestAnimationFrameId;
let enemyInterval;
//help btn
document.getElementById("helpBtn").addEventListener("click", () => {
  document.getElementById("helpImage").classList.toggle("hide");
});
/**
 *
 * @param {number} id -id for number
 * @returns {object} | null
 */
async function getData(id) {
  const response = await fetch("https://contrabackend.herokuapp.com/");
  const data = await response.json();

  let gameData = null;
  data.forEach((game) => {
    if (game?.id === id) {
      gameData = game;
    }
  });
  if (gameData) return gameData;
  else {
    return null;
  }
}

//creating save button

let saveBtn = document.createElement("button");
saveBtn.innerHTML = "Save Game";
saveBtn.id = "save_btn";
saveBtn.style.display = "none";
document.body.appendChild(saveBtn);

let bullets = [];
let enemies = [];
let blasts = [];
let enemyBots = [];

function showMessage(type, message) {
  if (type === "errorMessage") {
    errorMessageElement.innerHTML = message;
    errorMessageElement.style.display = "block";
    setTimeout(() => {
      errorMessageElement.style.display = "none";
    }, 2000);
  } else if (type === "successMessage") {
    successMessageElement.innerHTML = message;
    successMessageElement.style.display = "block";
    setTimeout(() => {
      successMessageElement.style.display = "none";
    }, 2000);
  }
}

function createBlast({ x, y }) {
  blastSound.play();
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
    player.position.x = -canvas.width * 10;
    player.position.y = 0;
    player.velocity.y = -1;
    player.dead = true;
  }
}

async function saveData({ id, life, score, track }) {
  fetch("https://contrabackend.herokuapp.com/addScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    body: JSON.stringify({
      life: life,
      score: score,
      id: id,
      track: JSON.stringify(track),
    }),
  })
    .then((response) => {
      showMessage("successMessage", "Saved");
    })
    .catch((err) => {
      showMessage("errorMessage", "Error on saving");
    });
}

class Gameplay {
  constructor({ playerNumber, gameResource }) {
    //for saving game
    saveBtn.style.display = "block";
    saveBtn.addEventListener("click", () => {
      saveData({ life: this.players[0].life, score: this.players[0].score, track: playTrack, id: inputElement.value });
    });
    this.backgroundImage = new Background();
    this.players = [];

    for (let i = 0; i < playerNumber; i++) {
      let mainPlayer = false;
      if (i === 0) {
        mainPlayer = true;
      }
      this.players.push(
        new Player({
          position: { x: 0, y: 0 },
          size: { width: 50, height: 80 },
          mainPlayer,
          playerId: i,
        })
      );
    }

    if (gameResource) {
      this.players[0].score = gameResource.score;
      this.players[0].life = gameResource.life;
      trackArray = JSON.parse(gameResource.track);
    }
    enemies.push(new Enemy({ enemyType: "runningShoot" }));
    enemyInterval = setInterval(() => {
      enemies.push(new Enemy({ enemyType: "runningShoot" }));
    }, 6500);

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
          default: {
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
          default: {
            break;
          }
        }
      });
    }
  }

  /**
   * main continous loop
   */
  playgame() {
    this.backgroundImage.clearScreen();
    this.backgroundImage.drawBackground();
    //creating tracks
    this.trackObj.checkTracks();

    if (this.players[1]) {
      if (this.players[0].dead && this.players[1].dead) {
        window.cancelAnimationFrame(requestAnimationFrameId);
        window.clearInterval(enemyInterval);
        saveBtn.style.display = "none";
        canvas.style.display = "none";
        gameOverElement.style.display = "block";
        gameOverElement.innerHTML = `<h1>Game over<h2>Player 1:${this.players[0].score}<br>Player2:${this.players[1].score}</h2>`;
        setTimeout(() => {
          mainMenuElement.style.display = "block";
        }, 4000);
      } else if (this.players[0].dead) {
        this.players[1].mainPlayer = true;
      }
    } else {
      //single player dies
      if (this.players[0].dead) {
        window.cancelAnimationFrame(requestAnimationFrameId);
        window.clearInterval(enemyInterval);
        saveBtn.style.display = "none";
        canvas.style.display = "none";
        gameOverElement.style.display = "block";
        gameOverElement.innerHTML = `<h1>Game over<h1><h2>Player 1:${this.players[0].score}</h2>`;
        setTimeout(() => {
          mainMenuElement.style.display = "block";
        }, 4000);
      }
    }

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
              shotBotSound.play();
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
            this.players.forEach((player) => {
              player.score++;
            });
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
      if (player.checkGameWin()) {
        canvas.style.display = "none";
        saveBtn.style.display = "none";
        gameWinElement.style.display = "block";
        setTimeout(() => {
          this.removegame();
          gameWinElement.style.display = "none";
          mainMenuElement.style.display = "block";
          window.clearInterval(enemyInterval);
        }, 3000);
      }
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
    ctx.font = "18px Arial";
    gradient.addColorStop("0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText("Score", 85, 70);
    ctx.fillText(this.players[0].score, 100, 100);
    ctx.fillText("Life", 145, 70);
    ctx.fillText(this.players[0].life, 150, 100);
    if (this.players[1]) {
      gradient2.addColorStop("0", "blue");
      ctx.fillStyle = gradient2;
      ctx.fillText("Score", 185, 70);
      ctx.fillText(this.players[1].score, 200, 100);
      ctx.fillText("Life", 245, 70);
      ctx.fillText(this.players[1].life, 250, 100);
    }
  }
  removegame() {
    delete this;
  }
}

/**
 *
 * @param {number} playerNumber -number of player
 * @param {object | null} gameResource
 */
function startGame(playerNumber, gameResource = null) {
  let game = new Gameplay({ playerNumber, gameResource });
  function play() {
    requestAnimationFrameId = requestAnimationFrame(play);
    game.playgame();
  }
  play();
}

loadImages().then((imagesObj) => {
  loadedImages = imagesObj;
});

//main menu
function mainMenu() {
  canvas.style.display = "none";
  let singlePlayerBtn = document.getElementById("single_player_btn");
  let doublePlayerBtn = document.getElementById("double_player_btn");
  let trackEditorBtn = document.getElementById("track_editor");
  let continueBtn = document.getElementById("continue_btn");

  continueBtn.addEventListener("click", async () => {
    if (inputElement.value == "") {
      showMessage("errorMessage", "Empty id");
    } else {
      let data = await getData(inputElement.value);
      if (data) {
        mainMenuElement.style.display = "none";
        gameOverElement.style.display = "none";
        gameWinElement.style.display = "none";
        canvas.style.display = "block";
        startGame(1, data);
      } else {
        showMessage("errorMessage", "Cannot find game");
      }
    }
  });
  singlePlayerBtn.addEventListener("click", () => {
    if (inputElement.value == "") {
      showMessage("errorMessage", "Empty number");
    } else {
      gameOverElement.style.display = "none";
      gameWinElement.style.display = "none";
      mainMenuElement.style.display = "none";
      canvas.style.display = "block";
      startGame(1);
    }
  });
  doublePlayerBtn.addEventListener("click", () => {
    if (inputElement.value == "") {
      showMessage("errorMessage", "Empty number");
    } else {
      gameOverElement.style.display = "none";
      gameWinElement.style.display = "none";
      mainMenuElement.style.display = "none";
      canvas.style.display = "block";
      startGame(2);
    }
  });
  trackEditorBtn.addEventListener("click", () => {
    if (inputElement.value == "") {
      showMessage("errorMessage", "Empty number");
    } else {
      gameOverElement.style.display = "none";
      gameWinElement.style.display = "none";
      mainMenuElement.style.display = "none";
      displayTrackEditor();
      // startGame(2);
    }
  });
}
function displayTrackEditor() {
  let selectedId = 1;

  let body = document.body;
  let gridContainer = document.createElement("div");
  gridContainer.height = "100vh";
  body.appendChild(gridContainer);
  gridContainer.style.position = "absolute";
  gridContainer.style.top = "0px";
  gridContainer.style.left = "0px";

  //for selecting the list of items

  let grass = document.createElement("img");
  grass.style.height = "40px";
  grass.style.width = "40px";
  grass.src = "./assets/images/2.png";
  grass.style.position = "absolute";
  grass.style.bottom = "-50px";
  grass.style.left = "0px";

  grass.addEventListener("click", () => {
    selectedId = 2;
  });

  gridContainer.appendChild(grass);

  let track = document.createElement("img");
  track.style.height = "40px";
  track.style.width = "40px";
  track.src = "./assets/images/1.png";
  track.style.position = "absolute";
  track.style.bottom = "-50px";
  track.style.left = "40px";

  track.addEventListener("click", () => {
    selectedId = 1;
  });

  gridContainer.appendChild(track);

  let wall = document.createElement("img");
  wall.style.height = "40px";
  wall.style.width = "40px";
  wall.src = "./assets/images/9.png";
  wall.style.position = "absolute";
  wall.style.bottom = "-50px";
  wall.style.left = "120px";

  wall.addEventListener("click", () => {
    selectedId = 9;
  });

  gridContainer.appendChild(wall);

  let enemyBot = document.createElement("img");
  enemyBot.style.height = "40px";
  enemyBot.style.width = "40px";
  enemyBot.src = "./assets/images/6.png";
  enemyBot.style.position = "absolute";
  enemyBot.style.bottom = "-50px";
  enemyBot.style.left = "180px";

  enemyBot.addEventListener("click", () => {
    selectedId = 6;
  });

  gridContainer.appendChild(enemyBot);

  let bridge = document.createElement("img");
  bridge.style.height = "40px";
  bridge.style.width = "40px";
  bridge.src = "./assets/images/4.png";
  bridge.style.position = "absolute";
  bridge.style.bottom = "-50px";
  bridge.style.left = "240px";

  bridge.addEventListener("click", () => {
    selectedId = 4;
  });

  gridContainer.appendChild(bridge);

  let bridgeStart = document.createElement("img");
  bridgeStart.style.height = "40px";
  bridgeStart.style.width = "40px";
  bridgeStart.src = "./assets/images/3.png";
  bridgeStart.style.position = "absolute";
  bridgeStart.style.bottom = "-50px";
  bridgeStart.style.left = "300px";

  bridgeStart.addEventListener("click", () => {
    selectedId = 3;
  });

  gridContainer.appendChild(bridgeStart);

  let bridgeEnd = document.createElement("img");
  bridgeEnd.style.height = "40px";
  bridgeEnd.style.width = "40px";
  bridgeEnd.src = "./assets/images/5.png";
  bridgeEnd.style.position = "absolute";
  bridgeEnd.style.bottom = "-50px";
  bridgeEnd.style.left = "360px";

  bridgeEnd.addEventListener("click", () => {
    selectedId = 5;
  });

  gridContainer.appendChild(bridgeEnd);

  let array = [];

  for (let y = 0; y < 9; y++) {
    let arr = [];
    array.push(arr);
    for (let x = 0; x < 40; x++) {
      let imageElement = document.createElement("img");
      imageElement.style.height = "30px";
      imageElement.style.width = "30px";
      imageElement.style.border = "2px solid black";
      imageElement.style.display = "inline";

      imageElement.name = `{"y":${y},"x":${x}}`;
      imageElement.addEventListener("click", (event) => {
        event.target.src = `./assets/images/${selectedId}.png`;
        let { x, y } = JSON.parse(event.target.name);
        array[y][x] = selectedId;
      });
      gridContainer.appendChild(imageElement);
      arr.push(0);
    }
    gridContainer.appendChild(document.createElement("br"));
  }
  let playBtn = document.createElement("button");
  playBtn.innerText = "Play";
  playBtn.style.padding = "10px 20px";
  playBtn.style.borderRadius = "25px";
  playBtn.style.position = "absolute";
  playBtn.style.bottom = "-50px";
  playBtn.style.right = "0px";
  playBtn.addEventListener("click", () => {
    gridContainer.style.display = "none";
    canvas.style.display = "block";

    let data = { score: 0, life: 4, track: JSON.stringify(array) };
    startGame(1, data);
  });
  gridContainer.appendChild(playBtn);
}

mainMenu();
