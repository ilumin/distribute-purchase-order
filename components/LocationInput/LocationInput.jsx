import { AddIcon } from '@chakra-ui/icons'
import { Box, NumberInput, NumberInputField } from '@chakra-ui/react'
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
    console.log('handleRemove')
    onRemove && onRemove(place)
  }

  const renderQty = ({ qty, max_qty }) => (
    <NumberInput value={qty} max={max_qty}>
      <NumberInputField />
    </NumberInput>
  )

  const renderTotalPrice = ({ total_price }) => (
    <NumberInput value={total_price} precision={2} variant="unstyled" disabled>
      <NumberInputField />
    </NumberInput>
  )

  const renderAppendButton = () => {
    if (onAppend)
      return (
        <Box margin={['-1em 0 -0.5em']}>
          <Button
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
    <ButtonRemove onClick={handleRemove(location)} />
  )

  const columns = [
    { key: 'name', label: 'Place' },
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
