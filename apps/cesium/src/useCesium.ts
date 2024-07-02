import { useContext } from 'react'

import { CesiumContext } from './Canvas'
import { type CesiumRoot } from './CesiumRoot'

export function useCesium(): CesiumRoot {
  const context = useContext(CesiumContext)
  if (context == null) {
    throw new Error()
  }
  return context
}
