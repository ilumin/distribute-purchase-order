import Layout from 'components/Layout'

// eslint-disable-next-line
function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
