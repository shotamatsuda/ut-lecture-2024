import { type Cartesian3, type Cartographic } from '@cesium/engine'
import { atom } from 'jotai'

export const originAtom = atom<Cartographic | null>(null)
export const destinationAtom = atom<Cartographic | null>(null)
export const routesAtom = atom<Cartesian3[][]>([])
