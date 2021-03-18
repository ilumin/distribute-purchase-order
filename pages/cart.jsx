import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import Button from 'components/Button'
import Form from 'components/Form'
import LocationInput from 'components/LocationInput/LocationInput'
import LocationSelect from 'components/LocationSelect/LocationSelect'
import Modal from 'components/Modal/Modal'
import Select from 'components/Select'
import Head from 'next/head'

const locations = [
  {
    available: 1000,
    fee: 100,
    id: 1,
    name: 'place1',
    pos: {
      lat: 39.09366509575983,
      lng: -94.58751660204751,
    },
  },
  {
    available: 2000,
    fee: 120,
    id: 2,
    name: 'place2',
    pos: {
      lat: 39.10894664788252,
      lng: -94.57926449532226,
    },
  },
  {
    available: 5000,
    fee: 300,
    id: 3,
    name: 'place3',
    pos: {
      lat: 39.07602397235644,
      lng: -94.5184089401211,
    },
  },
]
const products = []
const availableDate = []
const cart = {
  product: '',
  date: '',
  locations: [],
  total_qty: 0,
  total_cost: 0,
}

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const showModal = () => {
    onOpen()
  }

  const handleAppendLocation = () => {
    console.log('append location')
  }

  const handleRemoveLocation = () => {
    console.log('remove location')
  }

  return (
    <>
      <Head>
        <title>Distribute Product Order / Cart</title>
      </Head>
      <Flex align="center" justifyContent="center" height="100vh">
        <Form>
          <Form.Field label="Product">
            <Select
              placeholder="Select Product"
              options={products}
              loading={true}
            />
          </Form.Field>

          <Form.Field label="Date">
            <Select
              placeholder="Select Future Date"
              options={availableDate}
              loading={true}
            />
          </Form.Field>

          <Form.Field label="Locations">
            <LocationInput
              locations={cart.locations}
              onAppend={showModal}
              onRemove={handleRemoveLocation}
            />
          </Form.Field>
          <Form.Field label="Total Units">
            <Text pt={['0.5em']} pl={['1em']}>
              {cart.total_qty}
            </Text>
          </Form.Field>
          <Form.Field label="Total Cost">
            <Text pt={['0.5em']} pl={['1em']}>
              {cart.total_cost}
            </Text>
          </Form.Field>
          <Form.Field>
            <Button primary>Submit</Button>
          </Form.Field>
        </Form>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <LocationSelect locations={locations} onSelect={handleAppendLocation} />
      </Modal>
    </>
  )
}
