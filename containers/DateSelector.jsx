import Select from 'components/Select'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { productSelector } from 'reducers/productSlice'

// eslint-disable-next-line
const DateSelector = ({ onSelect }) => {
  const [value, setValue] = useState('')
  const productLoading = useSelector(({ product }) => product.loading)
  const availableDates = useSelector(productSelector.availableDates)

  const handleSelectDate = (date) => {
    const selectedDate = availableDates.find((item) => item.id === date)
    setValue(date)
    onSelect && onSelect(selectedDate)
  }

  useEffect(() => {
    // clear when availableDates are changes
    setValue('')
  }, [availableDates])

  return (
    <Select
      value={value}
      placeholder="Select Future Date"
      options={availableDates.map(({ id, date }) => ({
        label: date,
        value: id,
      }))}
      loading={productLoading}
      disabled={availableDates.length <= 0}
      onSelect={handleSelectDate}
    />
  )
}

export default DateSelector
