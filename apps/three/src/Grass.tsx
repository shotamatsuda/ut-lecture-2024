import { Circle } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, type FC } from 'react'
import {
  Color,
  DoubleSide,
  Object3D,
  ShaderLib,
  Shape,
  UniformsUtils,
  type InstancedMesh,
  type ShaderMaterial
} from 'three'

import snoise from './snoise.glsl'

const grass = new Shape()
grass.moveTo(-0.1, 0)
grass.lineTo(0.1, 0)
grass.bezierCurveTo(0.1, 0.5, -0.1, 1, -0.1, 1)
grass.bezierCurveTo(0, 0.5, -0.1, 0, -0.1, 0)

// See: https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/meshphysical.glsl.js
const vertexShader = /* glsl */ `
uniform float uTime;

#define STANDARD
#define USE_INSTANCING

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

${snoise}

void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>

	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

  // Animation
  float power = uv.y * uv.y;
  float noise = snoise(mvPosition.xy * 0.05 + vec2(uTime));
  mvPosition.x += power * noise;
  gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`

export const Grass: FC = () => {
  const instanceCount = 1000000
  const radius = 500

  const meshRef = useRef<InstancedMesh>(null)

  useEffect(() => {
    const mesh = meshRef.current
    if (mesh == null) {
      return
    }
    const instance = new Object3D()
    for (let i = 0; i < instanceCount; ++i) {
      const r = Math.sqrt(Math.random()) * radius
      const t = Math.random() * Math.PI * 2
      instance.position.set(Math.cos(t) * r, Math.sin(t) * r, 0)
      instance.rotation.set(Math.PI / 2, Math.random() * Math.PI, 0)
      instance.scale.setScalar(5 * (1 - 0.5 * Math.random()))
      instance.updateMatrix()
      mesh.setMatrixAt(i, instance.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [instanceCount])

  const materialRef = useRef<ShaderMaterial>(null)
  useFrame(({ clock }) => {
    const material = materialRef.current
    if (material == null) {
      return
    }
    ;(material as any).isMeshStandardMaterial = true
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniformsNeedUpdate = true
  })

  return (
    <group position={[0, 0, 40]}>
      <Circle args={[radius]} receiveShadow>
        <meshStandardMaterial color='yellowgreen' />
      </Circle>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, instanceCount]}
        receiveShadow
        castShadow
      >
        <shapeGeometry args={[grass, 6]} />
        <shaderMaterial
          ref={materialRef}
          args={[
            {
              vertexShader,
              fragmentShader: ShaderLib.physical.fragmentShader,
              uniforms: UniformsUtils.merge([
                ShaderLib.standard.uniforms,
                {
                  diffuse: { value: new Color('yellowgreen') },
                  uTime: { value: 0 }
                }
              ])
            }
          ]}
          side={DoubleSide}
        />
      </instancedMesh>
      {/* {[...Array(instanceCount)].map((_, index) => {
        const r = Math.sqrt(Math.random()) * radius
        const t = Math.random() * Math.PI * 2
        return (
          <mesh
            key={index}
            position={[Math.cos(t) * r, Math.sin(t) * r, 0]}
            scale={[10, 10, 10]}
            rotation={[Math.PI / 2, Math.random() * Math.PI, 0]}
          >
            <shapeGeometry args={[grass]} />
            <meshStandardMaterial color='yellowgreen' side={DoubleSide} />
          </mesh>
        )
      })} */}
    </group>
  )
}
