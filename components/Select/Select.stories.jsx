import Select from './Select'

export default {
  title: 'Components/Select',
  component: Select,
}

const Theme = (args) => <Select {...args} />

export const Simple = Theme.bind({})
Simple.args = {
  options: [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ],
  placeholder: 'Select Color',
}

export const Loading = Theme.bind({})
Loading.args = {
  placeholder: 'Loading ...',
  loading: true,
}
