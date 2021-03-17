import { Button, Input } from '@chakra-ui/react'
import { action } from '@storybook/addon-actions'

import Table from './Table'

export default {
  title: 'Components/Table',
  component: Table,
}

const Template = (args) => <Table {...args} />

const data = [
  { name: 'Red', color: '#ff0000' },
  { name: 'Green', color: '#00ff00' },
  { name: 'Blue', color: '#0000ff' },
]

const columns = [
  { key: 'name', label: 'Name' },
  {
    key: 'color',
    label: 'Color',
    render: (row) => <Input value={row.color} />,
  },
  {
    key: 'action',
    label: <Button>Header Button</Button>,
    render: (row) => (
      <Button onClick={action(`click: ${JSON.stringify(row)}`)}>Click</Button>
    ),
  },
]

export const Simple = Template.bind({})
Simple.args = {
  data,
  columns,
}

export const Loading = Template.bind({})
Loading.args = {
  data,
  columns,
  loading: true,
}
