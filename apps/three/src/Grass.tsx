import { Circle } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, type FC } from 'react'
import {
  DoubleSide,
  Object3D,
  Shape,
  type InstancedMesh,
  type ShaderMaterial
} from 'three'

import snoise from './snoise.glsl'

const grass = new Shape()
grass.moveTo(-0.1, 0)
grass.lineTo(0.1, 0)
grass.bezierCurveTo(0.1, 0.5, -0.1, 1, -0.1, 1)
grass.bezierCurveTo(0, 0.5, -0.1, 0, -0.1, 0)

const vertexShader = /* glsl */ `
varying vec2 vUv;
uniform float uTime;

${snoise}

void main() {
  vUv = uv;

  vec4 vertex = instanceMatrix * vec4(position, 1.0);
  float power = uv.y * uv.y;
  float noise = snoise(vertex.xy * 0.05 + vec2(uTime));
  vertex.x += power * noise;
  gl_Position = projectionMatrix * modelViewMatrix * vertex;
}
`

const fragmentShader = /* glsl */ `
varying vec2 vUv;

void main() {
  float shade = vUv.y * 0.5 + 0.5;
  gl_FragColor = vec4(vec3(0.7, 0.8, 0.4) * shade, 1.0);
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
      instance.scale.setScalar(5)
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
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniformsNeedUpdate = true
  })

  return (
    <group position={[0, 0, 40]}>
      <Circle args={[radius]}>
        <meshBasicMaterial color='yellowgreen' opacity={0.5} transparent />
      </Circle>
      <instancedMesh ref={meshRef} args={[undefined, undefined, instanceCount]}>
        <shapeGeometry args={[grass]} />
        <shaderMaterial
          ref={materialRef}
          args={[
            {
              fragmentShader,
              vertexShader,
              uniforms: {
                uTime: {
                  value: 0
                }
              }
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
