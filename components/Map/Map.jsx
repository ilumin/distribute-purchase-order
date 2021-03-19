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
            onLoad={(marker) => markerLoadHandler(marker, place)}
            onClick={() => markerClickHandler(place)}
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
      <Box height={['50vh']} width="100%" {...props}>
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
