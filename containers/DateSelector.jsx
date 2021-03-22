import Select from 'components/Select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector, selectDate } from 'reducers/productSlice'

// eslint-disable-next-line
const DateSelector = ({ onSelect }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const productLoading = useSelector(({ product }) => product.loading)
  const availableDates = useSelector(productSelector.availableDates)

  const handleSelectDate = (id) => {
    setValue(id)

    const selectedDate = availableDates.find((item) => item.id === id)
    dispatch(selectDate(selectedDate))

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
