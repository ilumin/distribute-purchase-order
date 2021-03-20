import { ChevronDownIcon } from '@chakra-ui/icons'
import { Select as ChakraSelect, Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Select = ({ options, value, loading, onSelect, ...props }) => {
  const icon = loading ? <Spinner /> : <ChevronDownIcon />
  const disabled = loading || props.disabled

  const handleChange = (e) => {
    onSelect && onSelect(e.target.value)
  }

  return (
    <ChakraSelect
      {...props}
      width={['250px']}
      size={['md']}
      value={value}
      icon={icon}
      onChange={handleChange}
      disabled={disabled}
    >
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
  value: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
}

Select.defaultProps = {
  options: [],
  loading: false,
  disabled: false,
}

export default Select
