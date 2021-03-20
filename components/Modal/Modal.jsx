import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Modal = ({ children, ...props }) => (
  <ChakraModal {...props} size="3xl">
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </ChakraModal>
)

Modal.propTypes = {
  children: PropTypes.node,
}

export default Modal
