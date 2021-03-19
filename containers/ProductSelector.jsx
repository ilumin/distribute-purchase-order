import Select from 'components/Select'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearDate,
  clearProduct,
  fetchProducts,
  productSelector,
  selectProduct,
} from 'reducers/productSlice'

const ProductSelector = () => {
  const dispatch = useDispatch()
  const productLoading = useSelector(({ product }) => product.loading)
  const allProducts = useSelector(productSelector.allProducts)

  const handleSelectProduct = (id) => {
    if (!id) {
      dispatch(clearProduct())
      dispatch(clearDate())
      return
    }

    dispatch(selectProduct(id))
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <Select
      placeholder="Select Product"
      options={allProducts.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
      loading={productLoading}
      onSelect={handleSelectProduct}
    />
  )
}

export default ProductSelector
