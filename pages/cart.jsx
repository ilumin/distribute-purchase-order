import { Flex, Text, useToast } from '@chakra-ui/react'
import { unwrapResult } from '@reduxjs/toolkit'
import Button from 'components/Button'
import Form from 'components/Form'
import DateSelector from 'containers/DateSelector'
import LocationSelector from 'containers/LocationSelector'
import ProductSelector from 'containers/ProductSelector'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, submitCart } from 'reducers/cartSlice'

export default function Cart() {
  const toast = useToast()
  const dispatch = useDispatch()
  const router = useRouter()
  const cart = useSelector(cartSelector.cart)

  console.log('cart:', cart)

  const handleSelectDate = (date) => {
    console.log('select date:', date)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await dispatch(submitCart())
      const response = unwrapResult(result)
      console.log('response:', response)

      router.push('/success')
    } catch (error) {
      console.error(error)

      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Distribute Product Order / Cart</title>
      </Head>
      <Flex align="center" justifyContent="center" height="100vh">
        <Form onSubmit={handleSubmit}>
          <Form.Field label="Product">
            <ProductSelector />
          </Form.Field>
          <Form.Field label="Date">
            <DateSelector onSelect={handleSelectDate} />
          </Form.Field>
          <Form.Field label="Locations">
            <LocationSelector />
          </Form.Field>
          <Form.Field
            label="Total Units"
            helpText={
              cart.date && (
                <Text>Maximum distribution unit are {cart.date.max_qty}</Text>
              )
            }
          >
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
            <Button isLoading={cart.loading} type="submit" primary>
              Submit
            </Button>
          </Form.Field>
        </Form>
      </Flex>
    </>
  )
}
