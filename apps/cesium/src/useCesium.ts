import { type CesiumWidget } from '@cesium/engine'
import { useContext } from 'react'

import { CesiumContext } from './Canvas'

export function useCesium(): CesiumWidget {
  const context = useContext(CesiumContext)
  if (context == null) {
    throw new Error()
  }
  return context
}
