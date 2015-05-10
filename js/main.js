var World  = require('three-world'),
    THREE  = require('three'),
    Tunnel = require('./tunnel'),
    Player = require('./player')

function render() {
  cam.position.z -= 1
  tunnel.update(cam.position.z)
}

World.init({ renderCallback: render, clearColor: 0x000022})
var cam = World.getCamera()

var tunnel = new Tunnel()
World.add(tunnel.getMesh())

var player = new Player(cam)
World.add(cam)

World.getScene().fog = new THREE.FogExp2(0x0000022, 0.00125)

World.start()
