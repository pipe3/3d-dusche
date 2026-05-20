import * as THREE from 'three'

export class Scene {
  readonly renderer: THREE.WebGLRenderer
  readonly scene: THREE.Scene
  readonly camera: THREE.PerspectiveCamera

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf5f5f5)

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100)
    this.camera.position.set(0, 1, 3)

    this.setupLights()
    this.resize()
    window.addEventListener('resize', () => this.resize())
  }

  private setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 1.2)
    key.position.set(2, 4, 3)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    this.scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.4)
    fill.position.set(-2, 2, -1)
    this.scene.add(fill)
  }

  resize() {
    const parent = this.renderer.domElement.parentElement
    if (!parent) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
