import * as THREE from 'three'
import { Scene } from './viewer/Scene.js'
import { loadModel } from './viewer/ModelLoader.js'
import { setupControls } from './viewer/Controls.js'
import { Configurator } from './viewer/Configurator.js'
import { createVariantPanel } from './ui/VariantPanel.js'
import type { Variant } from './viewer/Configurator.js'
import './style.css'

const canvas = document.getElementById('viewer') as HTMLCanvasElement
const uiContainer = document.getElementById('ui') as HTMLElement

const scene = new Scene(canvas)
const controls = setupControls(scene)
const configurator = new Configurator()

// Example variants — replace with real finish data
const variants: Variant[] = [
  { id: 'chrome',      label: 'Chrom',       color: '#c8c8c8', metalness: 0.9, roughness: 0.15 },
  { id: 'gold',        label: 'Gold',        color: '#c8a84b', metalness: 0.9, roughness: 0.2  },
  { id: 'brushed',     label: 'Gebürstet',   color: '#a0a0a0', metalness: 0.8, roughness: 0.4  },
  { id: 'matte-black', label: 'Mattschwarz', color: '#2a2a2a', metalness: 0.5, roughness: 0.7  },
]

createVariantPanel(uiContainer, variants, configurator)

function buildPlaceholder(): THREE.Group {
  const group = new THREE.Group()
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.8, 0.8),
    new THREE.MeshStandardMaterial({ color: '#c8c8c8', metalness: 0.9, roughness: 0.15 })
  )
  mesh.castShadow = true
  group.add(mesh)
  return group
}

async function init() {
  const modelUrl = '/models/dusche.glb'
  let model: THREE.Group

  try {
    const res = await fetch(modelUrl, { method: 'HEAD' })
    model = res.ok ? await loadModel(modelUrl) : buildPlaceholder()
  } catch {
    model = buildPlaceholder()
  }

  scene.scene.add(model)
  configurator.setModel(model)

  if (variants[0]) configurator.applyVariant(variants[0])

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    scene.render()
  }
  animate()
}

init()
