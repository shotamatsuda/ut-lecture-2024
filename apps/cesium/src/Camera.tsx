import { Cartesian3, HeadingPitchRoll } from '@cesium/engine'
import { useEffect, type FC } from 'react'

import { useCesium } from './useCesium'

export const Camera: FC<{
  longitude: number
  latitude: number
  height: number
}> = ({ longitude, latitude, height }) => {
  const { camera } = useCesium()

  useEffect(() => {
    camera.setView({
      destination: Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: new HeadingPitchRoll(0, -Math.PI / 2, 0)
    })
  }, [longitude, latitude, height, camera])

  return null
}
