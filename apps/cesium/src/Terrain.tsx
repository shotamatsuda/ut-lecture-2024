import { CesiumTerrainProvider } from '@cesium/engine'
import { useEffect, type FC } from 'react'

import { useCesium } from './useCesium'

export const Terrain: FC = () => {
  const cesium = useCesium()
  useEffect(() => {
    ;(async () => {
      cesium.terrainProvider = await CesiumTerrainProvider.fromIonAssetId(
        770371
      )
    })().catch(error => {
      console.error(error)
    })
  }, [cesium])

  return null
}
