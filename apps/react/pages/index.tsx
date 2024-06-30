import { Button, Stack } from '@mui/material'
import { atom, useAtomValue, useSetAtom, type Atom } from 'jotai'
import { type NextPage } from 'next'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type MouseEventHandler,
  type ReactNode
} from 'react'

import { Box } from '../src/Box'
import { output } from '../src/output'

const StateControl: FC<{
  label: ReactNode
  value: number
  onClick: MouseEventHandler
}> = ({ label, value, onClick }) => (
  <Box name='body'>
    <Stack direction='row' spacing={1} alignItems='baseline'>
      <div>
        {label}: {value}
      </div>
      <Button onClick={onClick}>Update</Button>
    </Stack>
  </Box>
)

const RootState: FC<{
  state: number
  onClick: MouseEventHandler
}> = ({ state, onClick }) => {
  output('Render RootState')
  return <StateControl label='Root state' value={state} onClick={onClick} />
}

const LocalState: FC = () => {
  output(`Render LocalState`)

  const [localState, setLocalState] = useState(0)
  const updateLocalState = useCallback(() => {
    output('Callback updateLocalState')
    setLocalState(counter => counter + 1)
  }, [])

  return (
    <StateControl
      label='Local state'
      value={localState}
      onClick={updateLocalState}
    />
  )
}

const AtomState: FC<{
  stateAtom: Atom<number>
  onClick: MouseEventHandler
}> = ({ stateAtom, onClick }) => {
  output('Render AtomState')
  const state = useAtomValue(stateAtom)
  return <StateControl label='Atomic state' value={state} onClick={onClick} />
}

const Footer: FC<{
  rootState: number
  stateAtom: Atom<number>
}> = ({ rootState, stateAtom }) => {
  output('Render Footer')
  const atomState = useAtomValue(stateAtom)
  return (
    <Box name='footer'>
      <div>Root state: {rootState}</div>
      <div>Atom state: {atomState}</div>
    </Box>
  )
}

const Page: NextPage = () => {
  output('Render Page')

  useEffect(() => {
    output('Effect without dependencies')
  })

  useEffect(() => {
    output('Effect')
    return () => {
      output('Cleanup of effect')
    }
  }, [])

  const [rootState, setRootState] = useState(0)
  const updateRootState = useCallback(() => {
    output('Callback updateRootState')
    setRootState(state => state + 1)
  }, [])

  const stateAtom = useMemo(() => atom(0), [])
  const setAtomState = useSetAtom(stateAtom)
  const updateAtomState = useCallback(() => {
    output('Callback updateAtomState')
    setAtomState(state => state + 1)
  }, [setAtomState])

  return (
    <Box name='root'>
      <Box name='header' />
      <RootState state={rootState} onClick={updateRootState} />
      <LocalState />
      <AtomState stateAtom={stateAtom} onClick={updateAtomState} />
      <Footer rootState={rootState} stateAtom={stateAtom} />
    </Box>
  )
}

export default Page
