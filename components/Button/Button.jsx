import { Button as ChakraButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Button = ({ children, primary, ...props }) => {
  const colorScheme = primary ? 'blue' : 'gray'

  return (
    <ChakraButton colorScheme={colorScheme} {...props}>
      {children}
    </ChakraButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool,
}

export default Button
