import {
  Skeleton,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Table = ({ data, columns, loading, ...props }) => {
  return (
    <ChakraTable variant="simple" {...props}>
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.key}>
              <Skeleton isLoaded={!loading}>{column.label}</Skeleton>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column) => {
              return (
                <Td key={`${column.key}-${index}`}>
                  <Skeleton isLoaded={!loading}>
                    {column.render
                      ? column.render(row, index)
                      : row[column.key]}
                  </Skeleton>
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node,
      render: PropTypes.func,
    })
  ).isRequired,
  loading: PropTypes.bool,
}

Table.defaultProps = {
  data: [],
  columns: [],
  loading: false,
}

export default Table
