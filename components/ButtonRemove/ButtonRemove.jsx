import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const ButtonRemove = (props) => {
  return <IconButton {...props} colorScheme="red" icon={<CloseIcon />} />
}

export default ButtonRemove
