import { ChakraProvider } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import GlobalStyle from './GlobalStyles'

const Layout = ({ children }) => (
  <ChakraProvider resetCSS={true}>
    <GlobalStyle />
    <div data-testid="layout">{children}</div>
  </ChakraProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
