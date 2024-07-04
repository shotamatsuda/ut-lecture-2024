import { type ViewStateChangeParameters } from '@deck.gl/core/typed/controllers/controller'
import { Tile3DLayer, type Tile3DLayerProps } from '@deck.gl/geo-layers/typed'
import styled from '@emotion/styled'
import { Tiles3DLoader } from '@loaders.gl/3d-tiles'
import { type Tile3D } from '@loaders.gl/tiles'
import maplibre from 'maplibre-gl'
import { type NextPage } from 'next'
import { useCallback, useState } from 'react'
import { Map } from 'react-map-gl'

import { DeckGLOverlay } from './DeckGLOverlay'
import { lightingEffect } from './lightingEffect'

import 'maplibre-gl/dist/maplibre-gl.css'

const Root = styled.div`
  width: 100vw;
  height: 100vh;
`

// Coordinates of Tokyo station.
const position = { longitude: 139.7671, latitude: 35.6812 }

// Derive geoidal height of the above here:
// https://vldb.gsi.go.jp/sokuchi/surveycalc/geoid/calcgh/calc_f.html
const geoidalHeight = 36.6624

function overrideMaterial(tile: Tile3D): void {
  if (tile.content.gltf.materials.length > 0) {
    const [material] = tile.content.gltf.materials
    material.pbrMetallicRoughness.metallicFactor = 0
    material.pbrMetallicRoughness.roughnessFactor = 1
  }
}

const layerProps = {
  loader: Tiles3DLoader,
  onTileLoad: tile => {
    overrideMaterial(tile)
    tile.content.cartographicOrigin.z -= geoidalHeight
  }
} satisfies Partial<Tile3DLayerProps>

const layers = [
  new Tile3DLayer({
    ...layerProps,
    id: '13101',
    data: 'https://plateau.takram.com/data/plateau/13100_tokyo23ku_2020_3Dtiles_etc_1_op/01_building/13101_chiyoda-ku_2020_bldg_notexture/tileset.json'
  }),
  new Tile3DLayer({
    ...layerProps,
    id: '13102',
    data: 'https://plateau.takram.com/data/plateau/13100_tokyo23ku_2020_3Dtiles_etc_1_op/01_building/13102_chuo-ku_2020_bldg_notexture/tileset.json'
  })
]

export const Main: NextPage = () => {
  const [viewState, setViewState] = useState({
    ...position,
    zoom: 14
  })

  const handleViewStateChange = useCallback(
    (event: ViewStateChangeParameters) => {
      setViewState(event.viewState as typeof viewState)
    },
    []
  )

  return (
    <Root>
      <Map
        // @ts-expect-error Assertion
        mapLib={maplibre}
        mapStyle='https://tile.openstreetmap.jp/styles/osm-bright/style.json'
        initialViewState={viewState}
        onViewStateChange={handleViewStateChange}
      >
        <DeckGLOverlay layers={[layers]} effects={[lightingEffect]} />
      </Map>
    </Root>
  )
}
