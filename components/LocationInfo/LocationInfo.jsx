import {
  Box,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Button from '../Button'

const LocationInfo = ({ location, onAddLocation }) => {
  const { name, available, fee, price } = location
  const [value, setValue] = useState(available)

  const handleAddLocation = () => {
    onAddLocation && onAddLocation({ ...location, qty: value })
  }

  const handleChangeQty = (value) => {
    setValue(parseInt(value) || 0)
  }

  return (
    <Stack p={0.5}>
      <HStack>
        <Heading size="md">{name}</Heading>
      </HStack>
      <HStack>
        <Text fontWeight="bold" width="60px">
          Unit
        </Text>
        <Text width="100px">
          <NumberInput
            size="sm"
            defaultValue={available}
            max={available}
            value={value}
            onChange={handleChangeQty}
          >
            <NumberInputField />
          </NumberInput>
        </Text>
      </HStack>
      <Text size="xs" color="gray.500">
        (maximum unit: {available})
      </Text>
      <HStack>
        <Text fontWeight="bold" width="60px">
          Fee
        </Text>
        <Text width="100px">
          <Input size="sm" value={fee} disabled />
        </Text>
      </HStack>
      <HStack>
        <Text fontWeight="bold" width="60px">
          Price/Unit
        </Text>
        <Text width="100px">
          <Input size="sm" value={price} disabled />
        </Text>
      </HStack>
      <HStack>
        <Text fontWeight="bold" width="60px">
          Total Price
        </Text>
        <Text width="100px">
          <Input size="sm" value={value * price + fee} disabled />
        </Text>
      </HStack>
      <Box>
        <Button size="sm" isFullWidth primary onClick={handleAddLocation}>
          Add
        </Button>
      </Box>
    </Stack>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    available: PropTypes.number,
    fee: PropTypes.number,
    price: PropTypes.number,
  }),
  onAddLocation: PropTypes.func,
}

export default LocationInfo
