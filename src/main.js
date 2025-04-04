import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as dat from 'dat.gui'
import terrainVertexShader from './shaders/terrain/vertex.glsl?raw';
import terrainFragmentShader from './shaders/terrain/fragment.glsl?raw';

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}

// Canvas
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setClearColor(0x111111, 1)
renderer.outputEncoding = THREE.sRGBEncoding //Not sure
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)
document.body.appendChild(renderer.domElement)


//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1

// Scene
const scene = new THREE.Scene()

//Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


/*
Terrain
*/
const terrain = {}
//Texture
terrain.texture = {}
terrain.texture.lineCount = 5
terrain.texture.width = 32;
terrain.texture.height = 128;
terrain.texture.canvas = document.createElement('canvas')
terrain.texture.canvas.width = terrain.texture.width
terrain.texture.canvas.height = terrain.texture.height
terrain.texture.canvas.style.position = 'fixed'
terrain.texture.canvas.style.top = 0
terrain.texture.canvas.style.left = 0
terrain.texture.canvas.style.zIndex = 1

document.body.append(terrain.texture.canvas)

terrain.texture.context = terrain.texture.canvas.getContext('2d')
terrain.texture.context.fillStyle = 'red'
terrain.texture.context.fillRect(0, Math.round(terrain.texture.height * 0), terrain.texture.width, 4)

terrain.texture.context.fillStyle = 'blue'
terrain.texture.context.fillRect(0, Math.round(terrain.texture.height * 0.4), terrain.texture.width, 4)

terrain.texture.context.fillStyle = 'green'
terrain.texture.context.fillRect(0, Math.round(terrain.texture.height * 0.9), terrain.texture.width, 4)

terrain.texture.instance = new THREE.CanvasTexture(terrain.texture.canvas)
terrain.texture.instance.wrapS = THREE.RepeatWrapping
terrain.texture.instance.wrapT = THREE.RepeatWrapping

//Geometry
terrain.geometry = new THREE.PlaneGeometry(1, 1, 500, 500)
terrain.geometry.rotateX(-Math.PI * 0.5)

//Material
terrain.material = new THREE.ShaderMaterial({
  vertexShader: terrainVertexShader,
  fragmentShader: terrainFragmentShader,
  wireframe: false,
  uniforms: {
    uElevation: { value: 2 },
    uTexture: { value: terrain.texture.instance }
  },

})

//Mesh
terrain.mesh = new THREE.Mesh(terrain.geometry, terrain.material)
terrain.mesh.scale.set(10, 10, 10)
scene.add(terrain.mesh)


// const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
// scene.add(cube)

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


// DEBUG
let test = {
  value: 10
}
const gui = new dat.GUI()
const someFolder = gui.addFolder("Some Folder")
someFolder.add(terrain.mesh.rotation, 'y', 0, Math.PI * 2)
const someOtherFolder = gui.addFolder("Some Other Folder")
