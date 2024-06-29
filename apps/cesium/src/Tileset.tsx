import {
  Cesium3DTileset,
  CustomShader,
  CustomShaderMode,
  CustomShaderTranslucencyMode,
  LightingModel,
  ShadowMode
} from '@cesium/engine'
import { useEffect, type FC } from 'react'

import { useCesium } from './useCesium'

const customShader = new CustomShader({
  mode: CustomShaderMode.MODIFY_MATERIAL,
  lightingModel: LightingModel.PBR,
  translucencyMode: CustomShaderTranslucencyMode.OPAQUE,
  fragmentShaderText: /* glsl */ `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
      material.diffuse = vec3(1.0);
      material.specular = vec3(0.0);
      material.emissive = vec3(0.0);
      material.alpha = 1.0;
    }
  `
})

export const Tileset: FC<{
  url: string
}> = ({ url }) => {
  const { scene } = useCesium()

  useEffect(() => {
    let tileset: Cesium3DTileset | undefined
    ;(async () => {
      tileset = await Cesium3DTileset.fromUrl(url, {
        shadows: ShadowMode.ENABLED,
        // @ts-expect-error Missing type
        customShader
      })
      scene.primitives.add(tileset)
    })().catch(error => {
      console.error(error)
    })
    return () => {
      if (tileset != null) {
        scene.primitives.remove(tileset)
      }
    }
  }, [url, scene])

  return null
}
