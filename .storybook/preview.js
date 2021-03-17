export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  layout: 'centered',
}

export const decorator = [
  (story) => <div style={{ padding: '1em' }}>{story()}</div>,
]
