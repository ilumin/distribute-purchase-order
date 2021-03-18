import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import Button from '../Button'

const LocationInfo = ({ location, onAddLocation }) => {
  const { name, available, fee } = location

  const handleAddLocation = () => {
    onAddLocation && onAddLocation(location)
  }

  return (
    <Stack>
      <HStack>
        <Text>{name}</Text>
      </HStack>
      <HStack>
        <Text>Max Unit</Text>
        <Text>{available}</Text>
      </HStack>
      <HStack>
        <Text>Fee</Text>
        <Text>{fee}</Text>
      </HStack>
      <Box>
        <Button primary onClick={handleAddLocation}>
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
  }),
  onAddLocation: PropTypes.func,
}

export default LocationInfo
