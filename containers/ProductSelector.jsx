import Select from 'components/Select'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector, selectProduct } from 'reducers/productSlice'

const ProductSelector = () => {
  const dispatch = useDispatch()
  const productLoading = useSelector(({ product }) => product.loading)
  const allProducts = useSelector(productSelector.allProducts)

  const handleSelectProduct = (product_id) => {
    dispatch(selectProduct(product_id))
  }

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
