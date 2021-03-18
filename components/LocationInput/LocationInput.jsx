import { AddIcon } from '@chakra-ui/icons'
import { Box, Input } from '@chakra-ui/react'
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

  const renderUnit = ({ units }) => <Input value={units} />

  const renderCost = ({ cost }) => <Input value={cost} />

  const renderAppendButton = () => {
    if (onAppend)
      return (
        <Button leftIcon={<AddIcon />} onClick={handleAppend}>
          Add
        </Button>
      )
  }

  const renderRemoveButton = ({ location }) => (
    <ButtonRemove onClick={handleRemove(location)} />
  )

  const columns = [
    { key: 'place', label: 'Place' },
    { key: 'units', label: 'Units', render: renderUnit },
    { key: 'cost', label: 'Cost', render: renderCost },
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
