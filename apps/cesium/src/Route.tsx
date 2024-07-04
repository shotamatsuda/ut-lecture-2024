import {
  Cartographic,
  Math as CMath,
  Color,
  ColorMaterialProperty,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType
} from '@cesium/engine'
import { decode } from '@googlemaps/polyline-codec'
import axios from 'axios'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, type FC } from 'react'

import { destinationAtom, originAtom, routesAtom } from './state'
import { useCesium } from './useCesium'

function useOriginDestination(): void {
  const { canvas, scene } = useCesium()

  const [origin, setOrigin] = useAtom(originAtom)
  const [destination, setDestination] = useAtom(destinationAtom)
  const setRoutes = useSetAtom(routesAtom)

  const originRef = useRef(origin)
  originRef.current = origin
  const destinationRef = useRef(destination)
  destinationRef.current = destination

  useEffect(() => {
    const callback: ScreenSpaceEventHandler.PositionedEventCallback = ({
      position
    }) => {
      const ray = scene.camera.getPickRay(position)
      if (ray == null) {
        return
      }
      const cartesian = scene.globe.pick(ray, scene)
      if (cartesian == null) {
        return
      }
      const cartographic = Cartographic.fromCartesian(cartesian)
      if (originRef.current == null) {
        setOrigin(cartographic)
        setDestination(null)
      } else if (destinationRef.current == null) {
        setDestination(cartographic)
      } else {
        setOrigin(null)
        setDestination(null)
        setRoutes([])
      }
    }
    const handler = new ScreenSpaceEventHandler(canvas)
    handler.setInputAction(callback, ScreenSpaceEventType.LEFT_CLICK)
    return () => {
      handler.destroy()
    }
  }, [canvas, scene, setOrigin, setDestination, setRoutes])
}

const Pin: FC<{
  location: Cartographic
}> = ({ location }) => {
  const { entities } = useCesium()

  useEffect(() => {
    const entity = entities.add({
      position: Cartographic.toCartesian(location),
      point: {
        color: Color.RED,
        pixelSize: 10
      }
    })
    return () => {
      entities.remove(entity)
    }
  }, [location, entities])

  return null
}

function useRoutes(): void {
  const origin = useAtomValue(originAtom)
  const destination = useAtomValue(destinationAtom)
  const setRoutes = useSetAtom(routesAtom)

  useEffect(() => {
    ;(async () => {
      if (origin == null || destination == null) {
        return
      }
      const response = await axios.post<{
        routes: Array<{
          polyline: {
            encodedPolyline: string
          }
        }>
      }>(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        {
          origin: {
            location: {
              latLng: {
                latitude: CMath.toDegrees(origin.latitude),
                longitude: CMath.toDegrees(origin.longitude)
              }
            }
          },
          destination: {
            location: {
              latLng: {
                latitude: CMath.toDegrees(destination.latitude),
                longitude: CMath.toDegrees(destination.longitude)
              }
            }
          },
          travelMode: 'DRIVE',
          units: 'METRIC'
        },
        {
          headers: {
            'X-Goog-Api-Key': '',
            'X-Goog-FieldMask': 'routes.polyline.encodedPolyline'
          }
        }
      )
      const result = response.data.routes.map(route =>
        decode(route.polyline.encodedPolyline).map(([latitude, longitude]) =>
          Cartographic.toCartesian(
            Cartographic.fromDegrees(longitude, latitude)
          )
        )
      )
      setRoutes(result)
    })().catch(error => {
      console.error(error)
    })
  }, [origin, destination, setRoutes])
}

export const Route: FC = () => {
  useOriginDestination()
  useRoutes()

  const origin = useAtomValue(originAtom)
  const destination = useAtomValue(destinationAtom)
  const routes = useAtomValue(routesAtom)

  const { entities } = useCesium()

  useEffect(() => {
    const polylines = routes.flatMap(route => {
      return [
        entities.add({
          polyline: {
            positions: route,
            width: 2,
            material: new ColorMaterialProperty(Color.RED),
            clampToGround: true
          }
        }),
        origin != null &&
          entities.add({
            polyline: {
              positions: [route[0], Cartographic.toCartesian(origin)],
              width: 2,
              material: new ColorMaterialProperty(Color.RED.withAlpha(0.2)),
              clampToGround: true
            }
          }),
        destination != null &&
          entities.add({
            polyline: {
              positions: [
                route[route.length - 1],
                Cartographic.toCartesian(destination)
              ],
              width: 2,
              material: new ColorMaterialProperty(Color.RED.withAlpha(0.2)),
              clampToGround: true
            }
          })
      ].filter(<T,>(value: T | false): value is T => value !== false)
    })
    return () => {
      polylines.forEach(polyline => {
        entities.remove(polyline)
      })
    }
  }, [routes, entities])

  return (
    <>
      {origin != null && <Pin location={origin} />}
      {destination != null && <Pin location={destination} />}
    </>
  )
}
