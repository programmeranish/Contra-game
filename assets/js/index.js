let player = new Player({
  playerPosition: { x: 0, y: 0 },
  playerSize: { width: 100, height: 100 },
  playerVelocity: { x: 0, y: 10 },
});

function play() {
  requestAnimationFrame(play);
  player.updatePosition();
}
play();

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
      player.moveLeft(true);
      player.movePosition();
      break;
    }
    case "d": {
      console.log("moving right");
      player.moveRight(true);
      break;
    }
    case "k": {
      console.log("jump");
      player.jump(true);
      break;
    }
    case "j": {
      console.log("shoot");
      player.shoot();
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
      player.moveLeft(false);
      break;
    }
    case "d": {
      player.moveRight(false);
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
