import { Box, Skeleton } from '@chakra-ui/react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  // useJsApiLoader,
  useLoadScript,
} from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

function defaultIcon(props = {}) {
  return {
    path:
      'M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z',
    fillColor: 'green',
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 1,
    scale: 0.5,
    anchor: new window.google.maps.Point(10, 30),
    ...props,
  }
}
function unavailableIcon() {
  return defaultIcon({
    fillColor: 'gray',
  })
}

const Map = ({ markers, zoom, onRenderWindow, ...props }) => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [markerMap, setMarkerMap] = useState({})
  const [infoOpen, setInfoOpen] = useState(false)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  })

  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds()
    markers.map((place) => {
      bounds.extend(place.pos)
      return place.id
    })
    map.fitBounds(bounds)
  }

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => ({ ...prevState, [place.id]: marker }))
  }

  const markerClickHandler = (place) => {
    setSelectedPlace(place)

    if (!onRenderWindow) return

    if (infoOpen) setInfoOpen(false)

    setInfoOpen(true)
  }

  const onLoad = useCallback(function callback(map) {
    fitBounds(map)
  }, [])

  const renderInfoWindow = (place) => {
    return onRenderWindow && onRenderWindow(place)
  }

  const renderMap = () => {
    return (
      <GoogleMap
        onLoad={onLoad}
        zoom={zoom}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
      >
        {markers.map((place) => (
          <Marker
            key={place.id}
            position={place.pos}
            icon={!place.selected ? defaultIcon() : unavailableIcon()}
            onLoad={(marker) => markerLoadHandler(marker, place)}
            clickable={!place.selected}
            onClick={() => !place.selected && markerClickHandler(place)}
          />
        ))}
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            {renderInfoWindow(selectedPlace)}
          </InfoWindow>
        )}
      </GoogleMap>
    )
  }

  return (
    <Skeleton isLoaded={isLoaded}>
      <Box height={['100vh', '75vh']} width="100%" {...props}>
        {isLoaded ? renderMap() : null}
      </Box>
    </Skeleton>
  )
}

Map.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      pos: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    })
  ),
  zoom: PropTypes.number,
  onRenderWindow: PropTypes.func,
}

Map.defaultProps = {
  markers: [],
  zoom: 5,
}

export default Map
