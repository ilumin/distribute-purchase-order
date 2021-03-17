import { action } from '@storybook/addon-actions'

import LocationInput from './LocationInput'

export default {
  title: 'Components/LocationInput',
  component: LocationInput,
}

const Template = (args) => <LocationInput {...args} />

const mock = {
  location: 1,
  place: 'Bangkok',
  units: 10000,
  cost: 500,
}
let locations = [mock]

export const Simple = Template.bind({})
Simple.args = {
  locations,
  onRemove: action('remove'),
  onAppend: action('append'),
}

export const Loading = Template.bind({})
Loading.args = {
  locations,
  onRemove: action('remove'),
  onAppend: action('append'),
  loading: true,
}
