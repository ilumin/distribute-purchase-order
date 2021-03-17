import { Stack } from '@chakra-ui/react'

import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Simple = () => (
  <Stack>
    <Button primary>Primary</Button>
    <Button>Normal</Button>
  </Stack>
)
