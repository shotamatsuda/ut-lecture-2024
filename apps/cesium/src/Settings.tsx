import { Cartesian3, Color, JulianDate, ShadowMode } from '@cesium/engine'
import { useEffect, type FC } from 'react'

import { useCesium } from './useCesium'

declare module '@cesium/engine' {
  interface ShadowMap {
    _primitiveBias: {
      normalOffsetScale: number
      depthBias: number
    }
  }
}

// Flat white sky and gray ground.
// See: https://google.github.io/filament/Filament.html#annex/sphericalharmonics
const sphericalHarmonicCoefficients = [
  new Cartesian3(0.651181936264038, 0.651181936264038, 0.651181936264038), // L00, irradiance, pre-scaled base
  new Cartesian3(0.335859775543213, 0.335859775543213, 0.335859775543213), // L1-1, irradiance, pre-scaled base
  new Cartesian3(0.000000874592729, 0.000000874592729, 0.000000874592729), // L10, irradiance, pre-scaled base
  new Cartesian3(0.000000027729817, 0.000000027729817, 0.000000027729817), // L11, irradiance, pre-scaled base
  new Cartesian3(0.000000014838997, 0.000000014838997, 0.000000014838997), // L2-2, irradiance, pre-scaled base
  new Cartesian3(-0.000000005038311, -0.000000005038311, -0.000000005038311), // L2-1, irradiance, pre-scaled base
  new Cartesian3(0.000121221753943, 0.000121221753943, 0.000121221753943), // L20, irradiance, pre-scaled base
  new Cartesian3(0.000000282587223, 0.000000282587223, 0.000000282587223), // L21, irradiance, pre-scaled base
  new Cartesian3(0.000364663166692, 0.000364663166692, 0.000364663166692) // L22, irradiance, pre-scaled base
]

export const Settings: FC = () => {
  const { scene, clock } = useCesium()

  useEffect(() => {
    clock.canAnimate = false
    clock.currentTime = JulianDate.fromDate(
      new Date('2024-07-04T11:00:00+09:00')
    )
  }, [clock])

  useEffect(() => {
    scene.camera.frustum.near = 5
    scene.sphericalHarmonicCoefficients = sphericalHarmonicCoefficients

    scene.globe.baseColor = Color.BLACK
    scene.globe.maximumScreenSpaceError = 1
    scene.globe.shadows = ShadowMode.RECEIVE_ONLY

    scene.shadowMap.enabled = true
    scene.shadowMap.size = 4096
    scene.shadowMap.softShadows = true
    scene.shadowMap.darkness = 0.6
    scene.shadowMap.maximumDistance = 5000
    scene.shadowMap._primitiveBias.normalOffsetScale = 10
    scene.shadowMap._primitiveBias.depthBias = 0.0002
  }, [scene])

  return null
}
