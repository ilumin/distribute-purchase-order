import LocationSelect from './LocationSelect'

export default {
  title: 'Components/LocationSelect',
  component: LocationSelect,
}

const Template = (args) => <LocationSelect {...args} />

const locations = [
  {
    id: 1,
    pos: { lat: 39.09366509575983, lng: -94.58751660204751 },
    name: 'place1',
    available: 1000,
    fee: 100,
  },
  {
    id: 2,
    pos: { lat: 39.10894664788252, lng: -94.57926449532226 },
    name: 'place2',
    available: 2000,
    fee: 120,
  },
  {
    id: 3,
    pos: { lat: 39.07602397235644, lng: -94.5184089401211 },
    name: 'place3',
    available: 5000,
    fee: 300,
  },
]

export const Simple = Template.bind({})
Simple.args = {
  locations,
}
