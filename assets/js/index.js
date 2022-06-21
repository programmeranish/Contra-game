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
