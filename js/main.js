var World = require('three-world')

function render() {
  // here we'll update the world on each frame
}

World.init({ renderCallback: render })

// Things will be put into the world here

World.start()
