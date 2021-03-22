import axios from 'axios'

const cart = 'https://5efabb3a80d8170016f758ee.mockapi.io/cart'

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'invalid endpoint' })
  }

  if (process.env.API_MOCK === 'enabled') {
    return res.status(201).json({ ok: true, request_body: req.body })
  }

  try {
    const { data } = await axios.post(cart, req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
