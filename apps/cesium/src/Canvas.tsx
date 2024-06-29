import { CesiumWidget } from '@cesium/engine'
import styled from '@emotion/styled'
import { createContext, useRef, useState, type FC, type ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import invariant from 'tiny-invariant'

import '@cesium/engine/Source/Widget/CesiumWidget.css'

export const CesiumContext = createContext<CesiumWidget | undefined>(undefined)

const Root = styled.div`
  width: 100%;
  height: 100%;
`

export const Canvas: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [cesium, setCesium] = useState<CesiumWidget>()

  useIsomorphicLayoutEffect(() => {
    invariant(ref.current != null)
    const cesium = new CesiumWidget(ref.current, {
      msaaSamples: 4,
      useBrowserRecommendedResolution: false,
      baseLayer: false,
      creditContainer: document.createElement('div')
    })
    setCesium(cesium)
    return () => {
      setTimeout(() => {
        cesium.destroy()
      }, 1000)
    }
  }, [])

  return (
    <Root ref={ref}>
      <CesiumContext.Provider value={cesium}>
        {cesium != null && children}
      </CesiumContext.Provider>
    </Root>
  )
}
