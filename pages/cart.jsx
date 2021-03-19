import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import Form from 'components/Form'
import DateSelector from 'containers/DateSelector'
import LocationSelector from 'containers/LocationSelector'
import ProductSelector from 'containers/ProductSelector'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from 'reducers/cartSlice'
import { fetchProducts } from 'reducers/productSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector.cart)

  console.log('cart:', cart)

  const handleSelectDate = (date) => {
    console.log('select date:', date)
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <>
      <Head>
        <title>Distribute Product Order / Cart</title>
      </Head>
      <Flex align="center" justifyContent="center" height="100vh">
        <Form>
          <Form.Field label="Product">
            <ProductSelector />
          </Form.Field>
          <Form.Field label="Date">
            <DateSelector onSelect={handleSelectDate} />
          </Form.Field>
          <Form.Field label="Locations">
            <LocationSelector />
          </Form.Field>
          <Form.Field label="Total Units">
            <Text pt={['0.5em']} pl={['1em']}>
              {cart.total_qty}
            </Text>
          </Form.Field>
          <Form.Field label="Total Cost">
            <Text pt={['0.5em']} pl={['1em']}>
              {cart.total_price}
            </Text>
          </Form.Field>
          <Form.Field>
            <Button primary>Submit</Button>
          </Form.Field>
        </Form>
      </Flex>
    </>
  )
}
