var World = require('three-world'),
    THREE = require('three'),
    Tunnel = require('./tunnel'),
    Player = require('./player'),
    Asteroid = require('./asteroid')

var NUM_ASTEROIDS = 10

function render() {
  cam.position.z -= 1
  tunnel.update(cam.position.z)
  for(var i=0;i<NUM_ASTEROIDS;i++) asteroids[i].update(cam.position.z)
}

World.init({ renderCallback: render, clearColor: 0x000022})
var cam = World.getCamera()

var tunnel = new Tunnel()
World.add(tunnel.getMesh())

var player = new Player(cam)
World.add(cam)

var asteroids = []

for(var i=0;i<NUM_ASTEROIDS; i++) {
  asteroids.push(new Asteroid(Math.floor(Math.random() * 7) + 1))
  World.add(asteroids[i].getMesh())
}

World.getScene().fog = new THREE.FogExp2(0x0000022, 0.00125)

World.start()
