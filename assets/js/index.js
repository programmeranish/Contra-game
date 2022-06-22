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
      console.log("a");
      break;
    }
    case "d": {
      console.log("d");
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
      console.log("a");
      break;
    }
    case "d": {
      console.log("d");
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
