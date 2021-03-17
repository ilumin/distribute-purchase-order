module.exports = {
  // story files
  stories: ['../**/*.stories.@(js|jsx)'],

  // storybook addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
  ],

  // customize webpack for storybook
  webpackFinal: async (config) => {
    return {
      ...config,
    }
  },
}
