import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    outDir: 'dist',
  },
})
