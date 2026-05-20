import type { Variant } from '../viewer/Configurator.js'
import type { Configurator } from '../viewer/Configurator.js'

export function createVariantPanel(
  container: HTMLElement,
  variants: Variant[],
  configurator: Configurator,
) {
  const panel = document.createElement('div')
  panel.className = 'variant-panel'

  for (const variant of variants) {
    const btn = document.createElement('button')
    btn.className = 'variant-btn'
    btn.title = variant.label
    btn.style.background = variant.color ?? '#cccccc'
    btn.addEventListener('click', () => {
      panel.querySelectorAll('.variant-btn').forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      configurator.applyVariant(variant)
    })
    panel.appendChild(btn)
  }

  // Activate first variant by default
  const first = panel.querySelector<HTMLButtonElement>('.variant-btn')
  if (first) first.classList.add('active')

  container.appendChild(panel)
}
