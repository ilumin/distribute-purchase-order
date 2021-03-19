import axios from 'axios'
import { addDays, format } from 'date-fns'

const DATE_FORMAT = 'dd/MM/yyyy'

const products = 'https://5efabb3a80d8170016f758ee.mockapi.io/products'

const parseAvailableDate = (date, max_production) => {
  return Object.keys(max_production).map((key) => ({
    id: key,
    date: format(addDays(date, key), DATE_FORMAT),
    max_qty: max_production[key],
  }))
}

const parseResponse = (date, response) => {
  return response.map((item) => ({
    id: item.id,
    name: item.name,
    unit_price: item.price_per_unit,
    available_dates: parseAvailableDate(date, item.max_production),
  }))
}

export default async (req, res) => {
  const today = new Date()

  if (process.env.API_MOCK === 'enabled') {
    const response = require('./products.mock.json')
    return res.status(200).json(parseResponse(today, response))
  }

  try {
    const { data } = await axios.get(products)
    res.status(200).json(parseResponse(today, data))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
