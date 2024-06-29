import {
  DiscardEmptyTileImagePolicy,
  UrlTemplateImageryProvider
} from '@cesium/engine'
import { useEffect, type FC } from 'react'

import { useCesium } from './useCesium'

export const MapImagery: FC = () => {
  const { imageryLayers } = useCesium()

  useEffect(() => {
    const imageryProvider = new UrlTemplateImageryProvider({
      url: 'https://plateau.takram.com/tiles/light-map/{z}/{x}/{y}.webp',
      maximumLevel: 22,
      tileDiscardPolicy: new DiscardEmptyTileImagePolicy(),
      tileWidth: 512,
      tileHeight: 512
    })
    const imageryLayer = imageryLayers.addImageryProvider(imageryProvider)
    imageryProvider.errorEvent.addEventListener(() => {}) // Suppress error log
    return () => {
      imageryLayers.remove(imageryLayer)
    }
  }, [imageryLayers])

  return null
}
