import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'


/*
Sizes
*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}

/*
BASE
*/
// Canvas


const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRation)
document.body.appendChild(renderer.domElement)


/*
Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1

// Scene
const scene = new THREE.Scene()


/*
Controls
*/

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true




const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
scene.add(cube)

/*
Animate
*/

const clock = new THREE.Clock()
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()


window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camers
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(sizes.pixelRatio)
})
