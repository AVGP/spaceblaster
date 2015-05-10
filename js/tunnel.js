var THREE = require('three')

var Tunnel = function() {
  var mesh = new THREE.Mesh(
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
  mesh.rotation.x = -Math.PI/2

  this.getMesh = function() {
    return mesh
  }

  return this;
}

module.exports = Tunnel
