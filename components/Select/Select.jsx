import { ChevronDownIcon } from '@chakra-ui/icons'
import { Select as ChakraSelect, Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Select = ({ options, loading, ...props }) => {
  const icon = loading ? <Spinner /> : <ChevronDownIcon />
  const disabled = loading || props.disabled

  return (
    <ChakraSelect {...props} icon={icon} disabled={disabled}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </ChakraSelect>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
}

Select.defaultProps = {
  options: [],
  loading: false,
  disabled: false,
}

export default Select
