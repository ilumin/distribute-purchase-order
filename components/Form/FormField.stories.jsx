import { Simple as LocationInput } from '../LocationInput/LocationInput.stories'
import { Simple as SimpleSelect } from '../Select/Select.stories'
import FormField from './FormField'

export default {
  title: 'Components/FormField',
  component: FormField,
}

const Template = (args) => <FormField {...args} />

export const SingleInput = Template.bind({})
SingleInput.args = {
  children: <SimpleSelect {...SimpleSelect.args} />,
  label: 'Color',
  helpText: 'Pick RGB',
}

export const SingleInputWithError = Template.bind({})
SingleInputWithError.args = {
  children: <SimpleSelect {...SimpleSelect.args} />,
  label: 'Color',
  helpText: 'Pick RGB',
  required: true,
  error: 'Please select color.',
}

export const AdvanceInput = Template.bind({})
AdvanceInput.args = {
  children: <LocationInput {...LocationInput.args} />,
  label: 'Location',
}
