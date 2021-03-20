import styled from '@emotion/styled'

const Form = styled.form`
  .chakra-form-control {
    display: grid;
    grid-template-columns: [label] 150px [control] auto;
    margin-bottom: 1em;
  }

  .form-field-label {
    grid-column: label;
    padding-top: 0.5em;
  }
`

Form.defaultProps = {
  method: 'post',
}

export default Form
