import Button from '../Button'
import Map from './Map'

export default {
  title: 'Components/Map',
  component: Map,
}

const Template = (args) => <Map {...args} />

const markers = [
  {
    id: 1,
    pos: { lat: 39.09366509575983, lng: -94.58751660204751 },
    name: 'place1',
  },
  {
    id: 2,
    pos: { lat: 39.10894664788252, lng: -94.57926449532226 },
    name: 'place2',
  },
  {
    id: 3,
    pos: { lat: 39.07602397235644, lng: -94.5184089401211 },
    name: 'place3',
  },
]

export const Marker = Template.bind({})
Marker.args = {
  markers,
}

export const MarkerInfo = Template.bind({})
MarkerInfo.args = {
  markers,
  onRenderWindow: (place) => (
    <div>
      <strong>{place.name}</strong>
      <Button onClick={() => console.log('select:', place)}>Click</Button>
    </div>
  ),
}
