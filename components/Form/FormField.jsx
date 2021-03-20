import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormField = ({
  children,
  label,
  helpText,
  required,
  error,
  ...props
}) => {
  return (
    <FormControl {...props} isInvalid={error} isRequired={required}>
      <div className="form-field-label">
        <FormLabel>{label}</FormLabel>
      </div>
      <div className="form-field-control">
        {children}
        {helpText && <FormHelperText>{helpText}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </div>
    </FormControl>
  )
}

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  helpText: PropTypes.node,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

FormField.defaultProps = {
  label: '',
  helpText: undefined,
  required: false,
  error: undefined,
}

export default FormField
