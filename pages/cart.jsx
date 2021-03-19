import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import Form from 'components/Form'
import DateSelector from 'containers/DateSelector'
import LocationSelector from 'containers/LocationSelector'
import ProductSelector from 'containers/ProductSelector'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { cartSelector } from 'reducers/cartSlice'

export default function Cart() {
  const cart = useSelector(cartSelector.cart)

  console.log('cart:', cart)

  const handleSelectDate = (date) => {
    console.log('select date:', date)
  }

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
