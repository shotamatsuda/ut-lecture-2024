import { type FC } from 'react'

import { Camera } from './Camera'
import { Canvas } from './Canvas'
import { MapImagery } from './MapImagery'
import { Route } from './Route'
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
      <Tileset url='https://plateau.takram.com/data/plateau/13100_tokyo23ku_2020_3Dtiles_etc_1_op/01_building/13101_chiyoda-ku_2020_bldg_notexture/tileset.json' />
      <Tileset url='https://plateau.takram.com/data/plateau/13100_tokyo23ku_2020_3Dtiles_etc_1_op/01_building/13102_chuo-ku_2020_bldg_notexture/tileset.json' />
      <Route />
    </Canvas>
  )
}
