import { action } from '@storybook/addon-actions'

import LocationInfo from './LocationInfo'

export default {
  title: 'Components/LocationInfo',
  component: LocationInfo,
}

const Template = (args) => <LocationInfo {...args} />

const location = {
  name: 'Nonthaburi',
  max_units: 10000,
  fee: 500,
}

export const Simple = Template.bind({})
Simple.args = {
  location,
  onAddLocation: action(`add location ${JSON.stringify(location)}`),
}
