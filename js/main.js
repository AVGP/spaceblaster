var World = require('three-world'),
    THREE = require('three'),
    Tunnel = require('./tunnel'),
    Player = require('./player'),
    Asteroid = require('./asteroid'),
    Shot = require('./shot')

var NUM_ASTEROIDS = 10

function render() {
  cam.position.z -= 1
  tunnel.update(cam.position.z)
  player.update()
  for(var i=0; i<shots.length; i++) {
    if(!shots[i].update(cam.position.z)) {
      World.getScene().remove(shots[i].getMesh())
      shots.splice(i, 1)
    }
  }
  for(var i=0; i<NUM_ASTEROIDS; i++) {
    if(!asteroids[i].loaded) continue

    asteroids[i].update(cam.position.z)
    if(player.loaded && player.bbox.isIntersectionBox(asteroids[i].bbox)) {
      asteroids[i].reset(cam.position.z)
      health -= 20
      if(health < 1) {
        World.pause()
        alert("Game over")
        window.location.reload()
      }
    }
    for(var j=0; j<shots.length; j++) {
      if(asteroids[i].bbox.isIntersectionBox(shots[j].bbox)) {
        asteroids[i].reset()
        World.getScene().remove(shots[j].getMesh())
        shots.splice(j, 1)
        break
      }
    }
  }
}

var health = 100

World.init({ renderCallback: render, clearColor: 0x000022})
var cam = World.getCamera()

var tunnel = new Tunnel()
World.add(tunnel.getMesh())

var player = new Player(cam)
World.add(cam)

var asteroids = [], shots = []

for(var i=0;i<NUM_ASTEROIDS; i++) {
  asteroids.push(new Asteroid(Math.floor(Math.random() * 5) + 1))
  World.add(asteroids[i].getMesh())
}

World.getScene().fog = new THREE.FogExp2(0x0000022, 0.00125)

World.start()

window.addEventListener('keyup', function(e) {
  var shipPosition = cam.position.clone()
  shipPosition.sub(new THREE.Vector3(0, 25, 100))

  var shot = new Shot(shipPosition)
  shots.push(shot)
  World.add(shot.getMesh())
})
