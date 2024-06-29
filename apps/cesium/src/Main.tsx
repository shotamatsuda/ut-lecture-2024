import { type FC } from 'react'

import { Camera } from './Camera'
import { Canvas } from './Canvas'
import { MapImagery } from './MapImagery'
import { Settings } from './Settings'
import { Terrain } from './Terrain'
import { Tileset } from './Tileset'

export const Main: FC = () => {
  // Coordinates of Tokyo station.
  const longitude = 139.7671
  const latitude = 35.6812

  return (
    <Canvas>
      <Settings />
      <Camera longitude={longitude} latitude={latitude} height={4000} />
      <Terrain />
      <MapImagery />
      <Tileset url='https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/notexture/tileset.json' />
      <Tileset url='https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13102_chuo-ku/notexture/tileset.json' />
    </Canvas>
  )
}
