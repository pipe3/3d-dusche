import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Scene } from './Scene.js'

export function setupControls(scene: Scene): OrbitControls {
  const controls = new OrbitControls(scene.camera, scene.renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 0.5
  controls.maxDistance = 8
  controls.maxPolarAngle = Math.PI / 1.8
  controls.target.set(0, 0.8, 0)
  controls.update()
  return controls
}
