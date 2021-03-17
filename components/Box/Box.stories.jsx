import { action } from '@storybook/addon-actions'

const Box = (props) => <div {...props} />

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    children: { control: 'text' },
    onClick: { control: { disable: true } },
  },
}

const Template = (args) => <Box {...args} />

export const Simple = Template.bind({})
Simple.args = {
  children: 'yikes',
  onClick: action('button clicked'),
}
