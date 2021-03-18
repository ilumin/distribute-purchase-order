import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

import Button from '../Button'
import Modal from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const ModalContent = () => {
  useEffect(() => {
    console.log('mount content')
    return () => {
      console.log('unmount content')
    }
  }, [])

  return <div>Modal Content</div>
}

export const Simple = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent />
      </Modal>
    </div>
  )
}
