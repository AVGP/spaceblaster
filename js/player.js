var ObjMtlLoader = require('./objmtlloader'),
    loader = new ObjMtlLoader()

var spaceship = null

var Player = function(parent) {
  this.loaded = false
  var self = this

  if(spaceship === null) {
    loader.load('models/spaceship.obj', 'models/spaceship.mtl', function(mesh) {
      mesh.scale.set(0.2, 0.2, 0.2)
      mesh.rotation.set(0, Math.PI, 0)
      spaceship = mesh
      spaceship.position.set(0, -25, -100)
      parent.add(spaceship.clone())
      self.loaded = true
    })
  } else {
    parent.add(spaceship.clone())
    self.loaded = true
  }
}

module.exports = Player
