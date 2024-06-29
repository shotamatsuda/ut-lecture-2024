import {
  AmbientLight,
  DirectionalLight,
  LightingEffect
} from '@deck.gl/core/typed'

export const lightingEffect = new LightingEffect({
  ambientLight: new AmbientLight({
    color: [255, 255, 255],
    intensity: 0.8
  }),
  directionalLight: new DirectionalLight({
    color: [255, 255, 255],
    intensity: 3,
    direction: [1, 1, 1]
  })
})
