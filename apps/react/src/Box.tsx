import { alpha, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, type FC, type ReactNode } from 'react'

import { output } from './output'

const color = '#cccccc'

const Root = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing(1)};
  border: solid 1px ${color};
`

export const Box: FC<{
  name: string
  children?: ReactNode
}> = ({ name, children }) => {
  output(`Render #${name}`)

  const from = alpha(color, 0)
  const to = alpha(color, 0.5)
  const backgroundColor = useMotionValue(from)
  useEffect(() => {
    void animate([
      [backgroundColor, to, { duration: 0 }],
      [backgroundColor, from, { duration: 0.5 }]
    ])
  })

  return (
    <Root style={{ backgroundColor }}>
      <Stack spacing={1}>
        <div>#{name}</div>
        {children != null && <Stack spacing={1}>{children}</Stack>}
      </Stack>
    </Root>
  )
}
