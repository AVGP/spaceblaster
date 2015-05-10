var THREE = require('three'),
    ObjLoader = require('./objloader')

var loader = new ObjLoader()
var rockMtl = new THREE.MeshLambertMaterial({
  map: THREE.ImageUtils.loadTexture('models/lunarrock_s.png')
})

var Asteroid = function(rockType) {
  var mesh = new THREE.Object3D(), self = this

  // Speed of motion and rotation
  mesh.velocity = Math.random() * 2 + 2
  mesh.vRotation = new THREE.Vector3(Math.random(), Math.random(), Math.random())

  this.bbox = new THREE.Box3()

  loader.load('models/rock' + rockType + '.obj', function(obj) {
    obj.traverse(function(child) {
      if(child instanceof THREE.Mesh) {
        child.material = rockMtl
      }
    })

    obj.scale.set(10,10,10)

    mesh.add(obj)
    mesh.position.set(-50 + Math.random() * 100, -50 + Math.random() * 100, -1500 - Math.random() * 1500)

    self.bbox.setFromObject(obj)
    self.loaded = true
  })

  this.reset = function(z) {
    mesh.velocity = Math.random() * 2 + 2
    mesh.position.set(-50 + Math.random() * 100, -50 + Math.random() * 100, z - 1500 - Math.random() * 1500)
  }

  this.update = function(z) {
    mesh.position.z += mesh.velocity
    mesh.rotation.x += mesh.vRotation.x * 0.02;
    mesh.rotation.y += mesh.vRotation.y * 0.02;
    mesh.rotation.z += mesh.vRotation.z * 0.02;

    if(mesh.children.length > 0) this.bbox.setFromObject(mesh.children[0])

    if(mesh.position.z > z) {
      this.reset(z)
    }
  }

  this.getMesh = function() {
    return mesh
  }

  return this
}

module.exports = Asteroid
