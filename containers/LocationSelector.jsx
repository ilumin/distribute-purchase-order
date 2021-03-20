import { useDisclosure, useToast } from '@chakra-ui/react'
import { unwrapResult } from '@reduxjs/toolkit'
import LocationInput from 'components/LocationInput'
import LocationSelect from 'components/LocationSelect'
import Modal from 'components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, cartSelector } from 'reducers/cartSlice'
import { fetchLocations, locationSelector } from 'reducers/locationSlice'

// eslint-disable-next-line
const LocationSelector = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const isLoading = useSelector(locationSelector.isLoading)
  const cart = useSelector(cartSelector.cart)
  const validation = useSelector(cartSelector.validation)
  const locations = useSelector(locationSelector.allLocations)

  const showLocationSelect = () => {
    if (validation.locationSelect) {
      dispatch(fetchLocations())
      onOpen()
      return
    }

    toast({
      title: 'Warning',
      description: 'Please select product and date first.',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }

  const handleRemoveLocation = () => {
    // onRemoveLocation && onRemoveLocation(location)
  }

  const handleAddLocation = async (location) => {
    try {
      const result = await dispatch(
        addItem({ product: cart.product, location })
      )
      const data = unwrapResult(result)
      console.log('data:', data)
    } catch (error) {
      // console.log('error:', error)
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      onClose()
    }
  }

  return (
    <>
      <LocationInput
        locations={cart.items}
        onAppend={showLocationSelect}
        onRemove={handleRemoveLocation}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <LocationSelect
          loading={isLoading}
          locations={locations}
          onSelect={handleAddLocation}
        />
      </Modal>
    </>
  )
}

export default LocationSelector
