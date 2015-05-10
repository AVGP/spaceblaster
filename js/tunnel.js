var THREE = require('three')

var Tunnel = function() {
  var tunnel = new THREE.Object3D(), meshes = []

  meshes.push(new THREE.Mesh(
    new THREE.CylinderGeometry(100, 100, 5000, 24, 24, true),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/space.jpg', null, function(tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(5, 10)
        tex.needsUpdate = true
      }),
      side: THREE.BackSide
    })
  ))
  meshes[0].rotation.x = -Math.PI/2
  // Adding the second mesh as a clone of the first mesh
  meshes.push(meshes[0].clone())
  meshes[1].position.z = -5000

  tunnel.add(meshes[0])
  tunnel.add(meshes[1])

  this.getMesh = function() {
    return tunnel
  }

  this.update = function(z) {
    for(var i=0; i<2; i++) {
      if(z < meshes[i].position.z - 2500) {
        meshes[i].position.z -= 10000
        break
      }
    }
  }

  return this
}

module.exports = Tunnel
