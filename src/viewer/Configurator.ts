import * as THREE from 'three'

export interface Variant {
  id: string
  label: string
  color?: string
  metalness?: number
  roughness?: number
  /** Optional: only apply to meshes whose name includes this substring */
  meshFilter?: string
}

export class Configurator {
  private model: THREE.Group | null = null

  setModel(model: THREE.Group) {
    this.model = model
  }

  applyVariant(variant: Variant) {
    if (!this.model) return

    this.model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (variant.meshFilter && !child.name.includes(variant.meshFilter)) return

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      for (const mat of materials) {
        if (!(mat instanceof THREE.MeshStandardMaterial)) continue
        if (variant.color !== undefined) mat.color.set(variant.color)
        if (variant.metalness !== undefined) mat.metalness = variant.metalness
        if (variant.roughness !== undefined) mat.roughness = variant.roughness
        mat.needsUpdate = true
      }
    })
  }
}
