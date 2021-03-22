import { AddIcon } from '@chakra-ui/icons'
import { Box, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import Button from '../Button'
import ButtonRemove from '../ButtonRemove'
import Table from '../Table'

const LocationInput = ({
  locations,
  loading,
  onRemove,
  onAppend,
  ...props
}) => {
  const handleAppend = () => {
    onAppend && onAppend()
  }

  const handleRemove = (place) => () => {
    onRemove && onRemove(place)
  }

  const renderPlace = ({ name }) => (
    <Text fontWeight="bold" minWidth="80px">
      {name}
    </Text>
  )

  const renderQty = ({ qty, max_qty }) => (
    <NumberInput
      size="sm"
      value={qty}
      max={max_qty}
      width="80px"
      variant="unstyled"
      disabled
    >
      <NumberInputField />
    </NumberInput>
  )

  const renderTotalPrice = ({ total_price }) => (
    <NumberInput
      size="sm"
      value={total_price}
      precision={2}
      width="80px"
      variant="unstyled"
      disabled
    >
      <NumberInputField />
    </NumberInput>
  )

  const renderAppendButton = () => {
    if (onAppend)
      return (
        <Box>
          <Button
            size="sm"
            fontSize="sm"
            leftIcon={<AddIcon />}
            onClick={handleAppend}
            colorScheme="cyan"
            color="white"
          >
            Add
          </Button>
        </Box>
      )
  }

  const renderRemoveButton = (location) => (
    <ButtonRemove size="sm" fontSize="sm" onClick={handleRemove(location)} />
  )

  const columns = [
    { key: 'name', label: 'Place', render: renderPlace },
    { key: 'qty', label: 'Units', render: renderQty },
    { key: 'total_price', label: 'Cost', render: renderTotalPrice },
    {
      key: 'action',
      label: renderAppendButton(),
      render: renderRemoveButton,
    },
  ]

  return (
    <Box {...props}>
      <Table data={locations} columns={columns} loading={loading} />
    </Box>
  )
}

LocationInput.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string,
      location: PropTypes.number,
      units: PropTypes.number,
      cost: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  onAppend: PropTypes.func,
}

LocationInput.defaultProps = {
  locations: [],
  loading: false,
}

export default LocationInput
