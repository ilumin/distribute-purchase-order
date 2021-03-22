import axios from 'axios'

const locations = 'https://5efabb3a80d8170016f758ee.mockapi.io/locations'

const parseResponse = (response) => {
  return response.map((item) => ({
    id: item.id,
    name: item.name,
    fee: item.fee,
    available: item.max_dist,
    pos: {
      lat: item.lat,
      lng: item.long,
    },
  }))
}

export default async (req, res) => {
  if (process.env.API_MOCK === 'enabled') {
    return res.status(200).json(parseResponse(require('./locations.mock.json')))
  }

  try {
    const { data } = await axios.get(locations)
    res.status(200).json(parseResponse(data))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
