import { useDisclosure, useToast } from '@chakra-ui/react'
import LocationInput from 'components/LocationInput'
import LocationSelect from 'components/LocationSelect'
import Modal from 'components/Modal'
import { useSelector } from 'react-redux'
import { cartSelector } from 'reducers/cartSlice'
import { locationSelector } from 'reducers/locationSlice'

// eslint-disable-next-line
const LocationSelector = ({ onRemoveLocation, onAddLocation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cart = useSelector(cartSelector.cart)
  const validation = useSelector(cartSelector.validation)
  const locations = useSelector(locationSelector.allLocations)

  const showLocationSelect = () => {
    if (validation.locationSelect) return void onOpen()

    toast({
      title: 'Warning',
      description: 'Please select product and date first.',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }

  const handleRemoveLocation = () => {
    onRemoveLocation && onRemoveLocation(location)
  }

  const handleAddLocation = () => {
    onAddLocation && onAddLocation(location)
  }

  return (
    <>
      <LocationInput
        locations={cart.items}
        onAppend={showLocationSelect}
        onRemove={handleRemoveLocation}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <LocationSelect locations={locations} onSelect={handleAddLocation} />
      </Modal>
    </>
  )
}

export default LocationSelector
