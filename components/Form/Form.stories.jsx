import { HStack } from '@chakra-ui/react'

import Button from '../Button'
import Form from './Form'
import FormField from './FormField'
import {
  AdvanceInput,
  SingleInput,
  SingleInputWithError,
} from './FormField.stories'

export default {
  title: 'Components/Form',
  component: Form,
}

export const Simple = () => (
  <Form>
    <SingleInput {...SingleInput.args} />
    <SingleInputWithError {...SingleInputWithError.args} />
    <AdvanceInput {...AdvanceInput.args} />
    <FormField>
      <HStack>
        <Button primary>Save</Button>
        <Button>Cancel</Button>
      </HStack>
    </FormField>
  </Form>
)
