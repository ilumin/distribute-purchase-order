import { configureStore } from '@reduxjs/toolkit'
import Layout from 'components/Layout'
import { Provider } from 'react-redux'
import rootReducer from 'reducers'

const store = configureStore({
  reducer: rootReducer,
})

// eslint-disable-next-line
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
