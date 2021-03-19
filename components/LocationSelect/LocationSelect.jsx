import { Skeleton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import LocationInfo from '../LocationInfo'
import Map from '../Map'

const LocationSelect = ({ locations, loading, onSelect }) => {
  const handleSelect = (location) => {
    onSelect && onSelect(location)
  }

  const renderLocationInfo = (location) => (
    <LocationInfo location={location} onAddLocation={handleSelect} />
  )

  return (
    <Skeleton isLoaded={!loading}>
      {!loading && (
        <Map markers={locations} onRenderWindow={renderLocationInfo} />
      )}
    </Skeleton>
  )
}

LocationSelect.propTypes = {
  locations: PropTypes.array,
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
}

LocationSelect.defaultProps = {
  locations: [],
  loading: false,
}

export default LocationSelect
