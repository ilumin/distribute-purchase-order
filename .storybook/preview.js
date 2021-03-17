import Layout from '../components/Layout'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  // layout: 'centered',
}

export const decorators = [
  (story) => (
    <Layout>
      <div style={{ padding: '1em' }}>{story()}</div>
    </Layout>
  ),
]
