var World = require('three-world'),
THREE = require('three'),
ObjMtlLoader = require('./objmtlloader')

function render() {
}

World.init({ renderCallback: render, clearColor: 0x000022})

var tunnel = new THREE.Mesh(
  new THREE.CylinderGeometry(100, 100, 5000, 24, 24, true),
  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('images/space.jpg', null, function(tex) {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(5, 10)
      tex.needsUpdate = true
    }),
    side: THREE.BackSide
  })
)
tunnel.rotation.x = -Math.PI/2
World.add(tunnel)

var loader = new ObjMtlLoader(),
    player = null

loader.load('models/spaceship.obj', 'models/spaceship.mtl', function(mesh) {
  mesh.scale.set(0.2, 0.2, 0.2)
  mesh.rotation.set(0, Math.PI, 0)
  player = mesh
  player.position.set(0, -25, 0)
  World.add(player)
})

World.getScene().fog = new THREE.FogExp2(0x0000022, 0.00125)

World.start()
