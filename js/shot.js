var THREE = require('three')

var shotMtl = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
})

var Shot = function(initialPos) {
  this.mesh = new THREE.Mesh(
    new THREE.SphereGeometry(3, 16, 16),
    shotMtl
  )
  this.mesh.position.copy(initialPos)

  this.bbox = new THREE.Box3()

  this.getMesh = function() {
    return this.mesh
  }

  this.update = function(z) {
    this.mesh.position.z -= 10
    this.bbox.setFromObject(this.mesh)

    if(Math.abs(this.mesh.position.z - z) > 1000) {
      return false
      delete this.mesh
    }

    return true
  }

  return this
}

module.exports = Shot
